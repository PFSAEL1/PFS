import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useMembership } from '@/hooks/useMembership';
import { User, Crown, ShoppingBag, LogOut, Settings, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

function DashboardContent() {
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
    toast.success('Signed out successfully');
    navigate('/');
  };

  const tierColors: Record<string, string> = {
    bronze: 'bg-amber-100 text-amber-800',
    silver: 'bg-[#111] text-slate-800',
    gold: 'bg-yellow-100 text-yellow-800',
    platinum: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO title="Dashboard - PFS Filters Account" description="Manage your PFS Filters account, memberships, and orders." noIndex />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back{userName ? `, ${userName.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-white/50">{userEmail}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-blue-400" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{userName || 'No name set'}</p>
              <p className="text-sm text-white/50">{userEmail}</p>
              <Button variant="outline" size="sm" className="mt-3 gap-2 w-full">
                <Settings className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Membership card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Crown className="h-4 w-4 text-blue-400" /> Membership
              </CardTitle>
            </CardHeader>
            <CardContent>
              {membershipLoading ? (
                <p className="text-sm text-white/50">Loading...</p>
              ) : membership ? (
                <>
                  <Badge className={tierColors[membership.tier] || 'bg-[#0d0d0d]/5'}>
                    {membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1)} Member
                  </Badge>
                  <p className="text-sm text-white/50 mt-2">
                    Status: <span className={membership.status === 'active' ? 'text-green-600 font-medium' : 'text-destructive'}>{membership.status}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/50 mb-3">No active membership</p>
                  <Link href="/memberships">
                    <Button size="sm" className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2">
                      Upgrade <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick shop */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingBag className="h-4 w-4 text-blue-400" /> Quick Shop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/50 mb-3">Browse our full catalog</p>
              <Link href="/shop">
                <Button size="sm" className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2">
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Membership benefits */}
        {membership?.status === 'active' && (
          <Card className="bg-blue-500/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="font-bold text-lg mb-3">Your Membership Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>
                    {membership.tier === 'bronze' ? '3%' : '5%'} discount on all orders
                  </span>
                </div>
                {membership.tier === 'platinum' && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Free shipping on all orders</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Priority customer support</span>
                </div>
                {['gold', 'platinum'].includes(membership.tier) && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>AI Filter Scanner access</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
