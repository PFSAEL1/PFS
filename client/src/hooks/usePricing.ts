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
 * Uses the Supabase session to determine if user is logged in,
 * then checks their membership tier for discount percentage.
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

        // Check membership from Supabase
        const { data: memberData } = await supabase
          .from('memberships')
          .select('tier, status, discount_code')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .single();

        if (memberData) {
          const discountMap: Record<string, number> = {
            bronze: 3,
            silver: 5,
            gold: 5,
            platinum: 5,
          };
          setPricing({
            discountPercent: discountMap[memberData.tier] || 0,
            discountCode: memberData.discount_code || null,
            tier: memberData.tier,
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
