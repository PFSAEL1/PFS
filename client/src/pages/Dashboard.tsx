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
import { trpc } from '@/lib/trpc';
import { useMembership } from '@/hooks/useMembership';
import { TierMedal } from '@/components/TierMedal';
import NewBoothModal from '@/components/NewBoothModal';
import {
  User, Crown, ShoppingBag, LogOut, Settings, ArrowRight,
  Layers, Plus, Edit2, Package, Loader2, Calendar, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface BoothSetup {
  id: string;
  customer_name: string;
  customer_email: string;
  booth_manufacturer: string;
  booth_model: string;
  notes: string;
  auto_reorder: boolean;
  change_interval_days: number;
  last_filter_change: string;
  created_at: string;
}

interface FilterPosition {
  id: string;
  booth_id: string;
  position_number: number;
  position_type: string;
  dimensions: string;
  quantity: number;
  shopify_product_title: string;
  notes: string;
}

interface OrderItem {
  title: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total_price: string;
  financial_status: string;
  fulfillment_status: string;
  items: OrderItem[];
}

function DashboardContent() {
  const [, navigate] = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const { membership, loading: membershipLoading } = useMembership();
  const [booths, setBooths] = useState<BoothSetup[]>([]);
  const [boothPositions, setBoothPositions] = useState<Record<string, FilterPosition[]>>({});
  const [boothLoading, setBoothLoading] = useState(true);
  const [showBoothModal, setShowBoothModal] = useState(false);
  const [editingBooth, setEditingBooth] = useState<BoothSetup | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email || '');
      setUserName(data.user?.user_metadata?.full_name || '');
    });
    fetchBooths();
    fetchOrders();
  }, []);

  const fetchBooths = async () => {
    setBoothLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: boothData } = await supabase
        .from('booth_setups')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false });

      if (boothData && boothData.length > 0) {
        setBooths(boothData);
        // Fetch filter positions for each booth
        const positionsMap: Record<string, FilterPosition[]> = {};
        for (const booth of boothData) {
          const { data: positions } = await supabase
            .from('filter_positions')
            .select('*')
            .eq('booth_id', booth.id)
            .order('position_number');
          if (positions) {
            positionsMap[booth.id] = positions;
          }
        }
        setBoothPositions(positionsMap);
      }
    } catch (err) {
      console.error('Error fetching booths:', err);
    } finally {
      setBoothLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Collect all emails associated with this user
      const emails: string[] = [];
      if (user.email) emails.push(user.email.toLowerCase());

      // Also check booth_setups for a linked shopify_email
      const { data: boothData } = await supabase
        .from('booth_setups')
        .select('shopify_email')
        .eq('customer_email', user.email);
      if (boothData) {
        for (const b of boothData) {
          if (b.shopify_email && !emails.includes(b.shopify_email.toLowerCase())) {
            emails.push(b.shopify_email.toLowerCase());
          }
        }
      }

      // Query customer_orders table by email match OR linked_email (fuzzy match)
      const { data: orderData } = await supabase
        .from('customer_orders')
        .select('*')
        .or(emails.map(e => `customer_email.eq.${e}`).concat(emails.map(e => `linked_email.eq.${e}`)).join(','))
        .order('order_date', { ascending: false })
        .limit(20);

      if (orderData && orderData.length > 0) {
        // Deduplicate by shopify_order_id
        const seen = new Set<string>();
        const unique = orderData.filter((o: any) => {
          const key = o.shopify_order_id || o.id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        // Map to the Order interface
        const mapped: Order[] = unique.map((o: any) => ({
          id: o.id,
          order_number: o.order_number || '',
          created_at: o.order_date || o.created_at,
          total_price: o.total_price || '0.00',
          financial_status: o.financial_status || 'pending',
          fulfillment_status: o.fulfillment_status || 'unfulfilled',
          items: typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []),
        }));
        setOrders(mapped);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleBoothSaved = () => {
    setShowBoothModal(false);
    setEditingBooth(null);
    fetchBooths();
    toast.success('Booth saved successfully!');
  };

  const tierColors: Record<string, string> = {
    bronze: 'bg-amber-100 text-amber-800',
    silver: 'bg-[#111] text-slate-800',
    gold: 'bg-yellow-100 text-yellow-800',
    platinum: 'bg-purple-100 text-purple-800',
  };

  // Calculate total filters needed per booth
  const getTotalFilters = (boothId: string) => {
    const positions = boothPositions[boothId] || [];
    return positions.reduce((sum, p) => sum + p.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO title="Dashboard - PFS Filters Account" description="Manage your PFS Filters account, memberships, and orders." noIndex />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-24 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white pfs-heading-animate">
                Welcome back{userName ? `, ${userName.split(' ')[0]}` : ''}!
              </h1>
              <p className="text-white/50">{userEmail}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Main content - raised */}
      <section className="section-raised tex-grain py-10 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Top cards row */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile card */}
          <Card className="bg-[#111] border-white/8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <User className="h-4 w-4 text-blue-400" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-white">{userName || 'No name set'}</p>
              <p className="text-sm text-white/50">{userEmail}</p>
              <Button variant="outline" size="sm" className="mt-3 gap-2 w-full border-white/10 text-white/70 hover:text-white">
                <Settings className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Membership card */}
          <Card className="bg-[#111] border-white/8">
            <CardHeader className="pb-1 pt-4">
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <Crown className="h-4 w-4 text-blue-400" /> Membership
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {membershipLoading ? (
                <p className="text-sm text-white/50">Loading...</p>
              ) : membership ? (
                <>
                  <div className="flex items-center gap-2">
                    <img src={`/images/badges/badge_${membership.tier}.png`} alt={`${membership.tier} Member Badge`} className="w-24 h-auto object-contain" />
                    <div>
                      <p className="text-sm text-white/50">
                        Status: <span className={membership.status === 'active' ? 'text-green-400 font-medium' : 'text-red-400'}>{membership.status}</span>
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {{ bronze: '6%', silver: '8%', gold: '10%', platinum: '10%' }[membership.tier]} discount applied at checkout
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/50 mb-3">No active membership</p>
                  <Link href="/memberships">
                    <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-2">
                      Upgrade <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          {/* Manage Subscriptions */}
          <Card className="bg-[#111] border-white/8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <RefreshCw className="h-4 w-4 text-blue-400" /> Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/50 mb-3">Manage, pause, or cancel your Auto Delivery subscriptions</p>
              <a href="https://pfsfilters.myshopify.com/account" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-2">
                  Manage Subscriptions <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Quick shop */}
          <Card className="bg-[#111] border-white/8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <ShoppingBag className="h-4 w-4 text-blue-400" /> Quick Shop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/50 mb-3">Browse our full catalog</p>
              <Link href="/shop">
                <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-2">
                  Shop Now <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Membership benefits */}
        {membership?.status === 'active' && (
          <Card className="bg-blue-500/5 border-blue-500/20 mb-8">
            <CardContent className="pt-6">
              <h2 className="font-bold text-lg mb-3 text-white">Your Membership Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/80">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{{ bronze: '6%', silver: '8%', gold: '10%', platinum: '10%' }[membership.tier]} discount on all orders</span>
                </div>
                {membership.tier === 'platinum' && (
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Free shipping on all orders</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-white/80">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Priority customer support</span>
                </div>
                {['gold', 'platinum'].includes(membership.tier) && (
                  <div className="flex items-center gap-2 text-white/80">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>AI Filter Scanner access</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booth Profile Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-400" /> My Booth Setup
            </h2>
            <Button
              size="sm"
              onClick={() => { setEditingBooth(null); setShowBoothModal(true); }}
              className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
            >
              <Plus className="h-4 w-4" /> Add Booth
            </Button>
          </div>

          {boothLoading ? (
            <Card className="bg-[#111] border-white/8">
              <CardContent className="py-8 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              </CardContent>
            </Card>
          ) : booths.length === 0 ? (
            <Card className="bg-[#111] border-white/8">
              <CardContent className="py-8 text-center">
                <Layers className="h-12 w-12 mx-auto mb-3 text-white/20" />
                <p className="text-white/50 mb-3">No booth configured yet</p>
                <p className="text-sm text-white/30 mb-4">Set up your booth to track filter positions, quantities, and reorder schedules.</p>
                <Button
                  size="sm"
                  onClick={() => { setEditingBooth(null); setShowBoothModal(true); }}
                  className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
                >
                  <Plus className="h-4 w-4" /> Set Up Your Booth
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {booths.map((booth) => {
                const positions = boothPositions[booth.id] || [];
                const totalFilters = getTotalFilters(booth.id);
                return (
                  <Card key={booth.id} className="bg-[#111] border-white/8">
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-white text-lg">
                            {booth.booth_manufacturer} {booth.booth_model}
                          </h3>
                          <p className="text-sm text-white/40">
                            {totalFilters} total filters per set &middot; {positions.length} position{positions.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setEditingBooth(booth as any); setShowBoothModal(true); }}
                          className="gap-1.5 border-white/10 text-white/70 hover:text-white"
                        >
                          <Edit2 className="h-3.5 w-3.5" /> Edit
                        </Button>
                      </div>

                      {/* Filter positions table */}
                      {positions.length > 0 && (
                        <div className="rounded-lg overflow-hidden border border-white/8">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white/5 text-white/60">
                                <th className="text-left px-4 py-2.5 font-medium">#</th>
                                <th className="text-left px-4 py-2.5 font-medium">Position Type</th>
                                <th className="text-left px-4 py-2.5 font-medium">Size</th>
                                <th className="text-center px-4 py-2.5 font-medium">Qty</th>
                                <th className="text-left px-4 py-2.5 font-medium">Product</th>
                              </tr>
                            </thead>
                            <tbody>
                              {positions.map((pos) => (
                                <tr key={pos.id} className="border-t border-white/5 hover:bg-white/3">
                                  <td className="px-4 py-2.5 text-white/50">{pos.position_number}</td>
                                  <td className="px-4 py-2.5 text-white/80">{pos.position_type}</td>
                                  <td className="px-4 py-2.5 text-white/80">{pos.dimensions}</td>
                                  <td className="px-4 py-2.5 text-center">
                                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                      {pos.quantity}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-2.5 text-white/60 text-xs">
                                    {pos.shopify_product_title || '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Auto-reorder info */}
                      {booth.auto_reorder && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-green-400/80">
                          <Calendar className="h-4 w-4" />
                          <span>Auto-reorder every {booth.change_interval_days} days</span>
                          {booth.last_filter_change && (
                            <span className="text-white/30 ml-2">
                              Last change: {new Date(booth.last_filter_change).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Past Orders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-blue-400" /> Order History
          </h2>

          {ordersLoading ? (
            <Card className="bg-[#111] border-white/8">
              <CardContent className="py-8 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              </CardContent>
            </Card>
          ) : orders.length === 0 ? (
            <Card className="bg-[#111] border-white/8">
              <CardContent className="py-8 text-center">
                <Package className="h-12 w-12 mx-auto mb-3 text-white/20" />
                <p className="text-white/50 mb-2">No orders yet</p>
                <p className="text-sm text-white/30 mb-4">Your Shopify order history will appear here once you place your first order.</p>
                <Link href="/shop">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
                    <ShoppingBag className="h-4 w-4" /> Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order.id} className="bg-[#111] border-white/8">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Order #{order.order_number}</p>
                        <p className="text-sm text-white/40">
                          {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${order.total_price}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge className={
                            order.financial_status === 'paid'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }>
                            {order.financial_status}
                          </Badge>
                          {order.fulfillment_status && (
                            <Badge className={
                              order.fulfillment_status === 'fulfilled'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-white/10 text-white/60 border-white/20'
                            }>
                              {order.fulfillment_status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        {order.items.slice(0, 3).map((item, i) => (
                          <p key={i} className="text-sm text-white/50">
                            {item.quantity}x {item.title}
                          </p>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-xs text-white/30 mt-1">+{order.items.length - 3} more items</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />

      {/* Booth Modal */}
      {showBoothModal && (
        <NewBoothModal
          booth={editingBooth as any}
          onClose={() => { setShowBoothModal(false); setEditingBooth(null); }}
          onSaved={handleBoothSaved}
        />
      )}
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
