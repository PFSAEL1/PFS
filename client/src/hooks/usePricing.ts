import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PricingInfo {
  discountPercent: number;
  discountCode: string | null;
  tier: string | null;
  loading: boolean;
}

/**
 * Hook that checks if the logged-in user has a membership discount.
 * 
 * Strategy:
 * 1. First checks Supabase `memberships` table (local cache)
 * 2. Then calls the server-side Shopify pricing endpoint (source of truth)
 *    which reads customer tags from Shopify Admin API
 * 3. Uses whichever returns a valid discount (Shopify takes priority)
 * 
 * This means: if you tag a customer in Shopify with "bronze"/"silver"/"gold"/"platinum",
 * they'll see their discounted prices when logged in on the site.
 */
export function usePricing(): PricingInfo {
  const [pricing, setPricing] = useState<PricingInfo>({
    discountPercent: 0,
    discountCode: null,
    tier: null,
    loading: true,
  });

  useEffect(() => {
    const checkPricing = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setPricing({ discountPercent: 0, discountCode: null, tier: null, loading: false });
          return;
        }

        // Strategy 1: Check Supabase memberships table (fast local lookup)
        let localTier: string | null = null;
        let localDiscount = 0;
        let localCode: string | null = null;

        try {
          // Try by user_id first, then by email (admin assigns by email)
          let memberData = null;
          const { data: byId } = await supabase
            .from('memberships')
            .select('tier, status, discount_code')
            .eq('user_id', session.user.id)
            .eq('status', 'active')
            .single();
          memberData = byId;

          if (!memberData && session.user.email) {
            const { data: byEmail } = await supabase
              .from('memberships')
              .select('tier, status, discount_code')
              .eq('user_email', session.user.email)
              .eq('status', 'active')
              .single();
            memberData = byEmail;
          }

          if (memberData) {
            const discountMap: Record<string, number> = {
              bronze: 6,
              silver: 8,
              gold: 10,
              platinum: 10,
            };
            localTier = memberData.tier;
            localDiscount = discountMap[memberData.tier] || 0;
            localCode = memberData.discount_code || null;

            // Fallback: generate code from tier if no custom code stored
            if (!localCode && localTier) {
              const codeMap: Record<string, string> = {
                bronze: 'MEMBER_BRONZE_6',
                silver: 'MEMBER_SILVER_8',
                gold: 'MEMBER_GOLD_10',
                platinum: 'MEMBER_PLATINUM_10',
              };
              localCode = codeMap[localTier] || null;
            }
          }
        } catch {
          // Table might not exist yet or no membership found — that's fine
        }

        // Strategy 2: Check Shopify-based pricing via server endpoint (source of truth)
        // This reads customer tags from Shopify Admin API
        try {
          const resp = await fetch('/api/trpc/orders.pricing', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
          });
          if (resp.ok) {
            const json = await resp.json();
            const shopifyData = json?.result?.data;
            if (shopifyData && shopifyData.discountPercent > 0) {
              // Shopify is source of truth — use it
              // Ensure we always have a discount code
              let finalCode = shopifyData.discountCode || localCode;
              if (!finalCode && shopifyData.tier) {
                const codeMap: Record<string, string> = {
                  bronze: 'MEMBER_BRONZE_6',
                  silver: 'MEMBER_SILVER_8',
                  gold: 'MEMBER_GOLD_10',
                  platinum: 'MEMBER_PLATINUM_10',
                };
                finalCode = codeMap[shopifyData.tier] || null;
              }
              setPricing({
                discountPercent: shopifyData.discountPercent,
                discountCode: finalCode,
                tier: shopifyData.tier || localTier,
                loading: false,
              });
              return;
            }
          }
        } catch {
          // Server endpoint might not be available — fall back to local data
        }

        // Fall back to Supabase local data
        if (localDiscount > 0) {
          setPricing({
            discountPercent: localDiscount,
            discountCode: localCode,
            tier: localTier,
            loading: false,
          });
        } else {
          setPricing({ discountPercent: 0, discountCode: null, tier: null, loading: false });
        }
      } catch {
        setPricing({ discountPercent: 0, discountCode: null, tier: null, loading: false });
      }
    };

    checkPricing();
  }, []);

  return pricing;
}

/**
 * Helper to calculate discounted price
 */
export function getDiscountedPrice(originalPrice: number, discountPercent: number): number {
  if (discountPercent <= 0) return originalPrice;
  return originalPrice * (1 - discountPercent / 100);
}
