import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type MembershipStatus = 'active' | 'cancelled' | 'expired';

export interface Membership {
  id: string;
  user_id: string;
  tier: MembershipTier;
  status: MembershipStatus;
  started_at: string;
  expires_at: string | null;
}

export const useMembership = () => {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const [{ data: roleData }, { data: memberData }] = await Promise.all([
          supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle(),
          supabase.from('memberships').select('*').eq('user_id', user.id).maybeSingle(),
        ]);

        setIsAdmin(!!roleData);
        setMembership(memberData as Membership);
      } catch (err) {
        console.error('Error fetching membership:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembership();
  }, []);

  const hasActiveMembership = () => membership?.status === 'active';

  const getMemberDiscount = () => {
    if (!hasActiveMembership()) return 0;
    const discounts: Record<MembershipTier, number> = {
      bronze: 0.03, silver: 0.05, gold: 0.05, platinum: 0.05,
    };
    return discounts[membership!.tier] || 0;
  };

  return { membership, loading, isAdmin, hasActiveMembership, getMemberDiscount };
};
