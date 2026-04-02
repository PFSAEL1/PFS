// ABC Filters iOS — Account / Orders Page v6
// Tesla-style dark UI. Unauthenticated users see a sign-in prompt (no redirect).
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { supabase } from '@/lib/supabase';
import { useMembership } from '@/hooks/useMembership';
import { User, Crown, ShoppingBag, LogOut, Settings, ChevronRight, Package, ArrowRight, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/abc-filters-logo_a66e6869.png';

function SignInPrompt() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#000' }}>
      <SEO title="Account — ABC Filters" description="Sign in to view your orders and account." noIndex />
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <img src={LOGO_URL} alt="ABC Filters" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        <div className="w-9" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
          <User className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.5)' }} />
        </div>
        <h1 className="text-white text-[22px] font-bold text-center mb-2">Sign in to your account</h1>
        <p className="text-[14px] text-center mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
          View your orders, manage your membership, and access exclusive discounts.
        </p>
        <div className="w-full rounded-2xl overflow-hidden mb-8" style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)' }}>
          {[
            { icon: Package, text: 'Track and reorder past orders' },
            { icon: Crown, text: 'Manage your membership tier' },
            { icon: Star, text: 'Unlock member-only discounts' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,102,204,0.15)' }}>
                <item.icon className="w-4 h-4" style={{ color: '#0066cc' }} />
              </div>
              <p className="text-[14px] text-white">{item.text}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/auth')} className="w-full py-3.5 rounded-2xl text-[15px] font-semibold mb-3 transition-transform active:scale-95" style={{ background: '#fff', color: '#000' }}>
          Sign In
        </button>
        <button onClick={() => navigate('/auth?mode=signup')} className="w-full py-3.5 rounded-2xl text-[15px] font-semibold transition-transform active:scale-95" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.12)' }}>
          Create Account
        </button>
      </div>
    </div>
  );
}

function AccountContent() {
  const [, navigate] = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const { membership, loading: membershipLoading } = useMembership();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || '');
      setUserName(data.user?.user_metadata?.full_name || '');
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
    navigate('/');
  };

  const tierLabel = membership?.tier ? membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1) : 'Free';
  const tierColors: Record<string, string> = { bronze: '#cd7f32', silver: '#a8a9ad', gold: '#ffd700', platinum: '#4fc3f7' };
  const tierColor = tierColors[membership?.tier || ''] || 'rgba(255,255,255,0.4)';

  return (
    <div className="min-h-screen safe-bottom" style={{ background: '#000' }}>
      <SEO title="Account — ABC Filters" description="Manage your ABC Filters account." noIndex />
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <img src={LOGO_URL} alt="ABC Filters" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        <button onClick={handleSignOut} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
      <div className="px-4 pb-24">
        <div className="rounded-2xl p-4 mb-4 mt-2" style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <User className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.5)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[16px] font-semibold truncate">{userName || 'Account'}</p>
              <p className="text-[13px] truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{userEmail}</p>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Crown className="w-3 h-3" style={{ color: tierColor }} />
              <span className="text-[11px] font-semibold" style={{ color: tierColor }}>{tierLabel}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)' }}>
          {[
            { icon: ShoppingBag, label: 'My Orders', sub: 'View order history', href: '/orders' },
            { icon: Crown, label: 'Membership', sub: membershipLoading ? 'Loading...' : tierLabel + ' plan', href: '/memberships' },
            { icon: Settings, label: 'Settings', sub: 'Account preferences', href: '/settings' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <div className="flex items-center gap-3 px-4 py-3.5 transition-opacity active:opacity-70" style={{ borderBottom: i < 2 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,102,204,0.12)' }}>
                  <item.icon className="w-4 h-4" style={{ color: '#0066cc' }} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-[14px] font-medium">{item.label}</p>
                  <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
              </div>
            </Link>
          ))}
        </div>
        {!membershipLoading && !membership?.tier && (
          <Link href="/memberships">
            <div className="rounded-2xl p-4 flex items-center gap-3 transition-opacity active:opacity-70" style={{ background: 'linear-gradient(135deg, rgba(0,102,204,0.2) 0%, rgba(0,60,120,0.15) 100%)', border: '0.5px solid rgba(0,102,204,0.3)' }}>
              <Crown className="w-8 h-8 flex-shrink-0" style={{ color: '#0066cc' }} />
              <div className="flex-1">
                <p className="text-white text-[14px] font-semibold">Upgrade to Pro</p>
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Get discounts, priority shipping and AI scanner</p>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#0066cc' }} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsSignedIn(!!data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'rgba(255,255,255,0.3)' }} />
      </div>
    );
  }

  return isSignedIn ? <AccountContent /> : <SignInPrompt />;
}
