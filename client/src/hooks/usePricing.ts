import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PricingInfo {
  discountPercent: number;
  discountCode: string | null;
  tier: string | null;
  loading: boolean;
}

// Centralized discount configuration
const DISCOUNT_MAP: Record<string, number> = {
  bronze: 6,
  silver: 8,
  gold: 10,
  platinum: 10,
};

const CODE_MAP: Record<string, string> = {
  bronze: 'MEMBER_BRONZE_6',
  silver: 'MEMBER_SILVER_8',
  gold: 'MEMBER_GOLD_10',
  platinum: 'MEMBER_PLATINUM_10',
};

/**
 * Hook that checks if the logged-in user has a membership discount.
 * 
 * Reads directly from Supabase `memberships` table — no server endpoint needed.
 * The discount code is always derived from the tier name for reliability.
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

        // Check Supabase memberships table by user_id first, then by email
        let memberData: { tier: string; status: string; discount_code?: string } | null = null;

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

        if (memberData && memberData.tier) {
          const tier = memberData.tier.toLowerCase();
          const discountPercent = DISCOUNT_MAP[tier] || 0;
          // Always generate the code from the tier — most reliable approach
          const discountCode = CODE_MAP[tier] || null;

          console.log('[usePricing] Member found:', { tier, discountPercent, discountCode });

          setPricing({
            discountPercent,
            discountCode,
            tier,
            loading: false,
          });
        } else {
          console.log('[usePricing] No active membership found');
          setPricing({ discountPercent: 0, discountCode: null, tier: null, loading: false });
        }
      } catch (err) {
        console.error('[usePricing] Error:', err);
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
