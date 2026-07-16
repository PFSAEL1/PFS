// FilterDatabase.tsx — PFS Filters Admin Panel
// Design: Dark professional dashboard matching the PFS Filters brand.
// Admin-only. Accessible at /filter-database. Hidden from public nav.
// Features: Members / Non-Members tabs, customer booth list, add/edit/delete,
//           CSV import/export, send reminder draft orders, auto-reorder members.

import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import {
  Database, Plus, Search, Download, Upload, Eye, Users, Crown,
  Trash2, Send, RefreshCw, ChevronRight, Filter, Calendar, X,
  MapPin, Phone, Mail, Building2, AlertCircle, CheckCircle2, Clock,
  BellRing, Zap, BellOff, Copy, Check, Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import NewBoothModal from '@/components/NewBoothModal';

interface BoothSetup {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  booth_manufacturer: string;
  booth_model: string | null;
  is_member: boolean;
  auto_reorder: boolean;
  order_mode: 'off' | 'reminder' | 'auto_reorder' | null;
  shopify_customer_id: string | null;
  last_draft_order_id: string | null;
  city: string | null;
  state: string | null;
  contact_email: string | null;
  next_reminder_date: string | null;
  last_filter_change: string | null;
  change_interval_days: number;
  created_at: string;
  filter_positions?: FilterPosition[];
}

interface FilterPosition {
  id: string;
  position_type: string;
  dimensions: string | null;
  quantity: number;
  shopify_product_title: string | null;
}

type TabType = 'all' | 'members' | 'non-members';

export default function FilterDatabase() {
  const [, navigate] = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [booths, setBooths] = useState<BoothSetup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [showNewBoothModal, setShowNewBoothModal] = useState(false);
  const [editingBooth, setEditingBooth] = useState<any>(null);
  const [selectedBooths, setSelectedBooths] = useState<Set<string>>(new Set());
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);
  const [updatingMode, setUpdatingMode] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [inviteLinkModal, setInviteLinkModal] = useState<{ email: string; link: string } | null>(null);

  // Check admin access
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/auth'); return; }
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();
      if (!data) { navigate('/'); return; }
      setIsAdmin(true);
    };
    checkAdmin();
  }, [navigate]);

  const fetchBooths = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('booth_setups')
        .select(`*, filter_positions(*)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setBooths(data || []);
    } catch (err) {
      toast.error('Failed to load booth setups');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchBooths();
  }, [isAdmin, fetchBooths]);

  const filteredBooths = booths.filter(b => {
    const matchesSearch =
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.customer_email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.booth_manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.booth_model || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'members' && b.is_member) ||
      (activeTab === 'non-members' && !b.is_member);
    return matchesSearch && matchesTab;
  });

  const membersCount = booths.filter(b => b.is_member).length;
  const nonMembersCount = booths.filter(b => !b.is_member).length;

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this booth setup? This cannot be undone.')) return;
    const { error } = await supabase.from('booth_setups').delete().eq('id', id);
    if (error) { toast.error('Failed to delete'); return; }
    toast.success('Booth setup deleted');
    fetchBooths();
  };

  const handleGetInviteLink = async (booth: BoothSetup) => {
    if (!booth.customer_email) {
      toast.error('No email address for this customer');
      return;
    }
    setGeneratingLink(booth.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const resp = await fetch('/api/invite-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ email: booth.customer_email }),
      });
      const result = await resp.json();
      if (result.success && result.inviteLink) {
        setInviteLinkModal({ email: booth.customer_email, link: result.inviteLink });
      } else if (result.success && result.alreadyExists) {
        // User exists but no link returned — try generating a recovery link
        toast.info('Customer already has an account. A password reset link was generated.');
      } else {
        toast.error(result.error || 'Failed to generate invite link');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate invite link');
    } finally {
      setGeneratingLink(null);
    }
  };

  const handleCopyInviteLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    toast.success('Invite link copied!');
    setTimeout(() => setCopiedLink(null), 3000);
  };

  const handleSendReminder = async (booth: BoothSetup) => {
    const mode = booth.order_mode && booth.order_mode !== 'off' ? booth.order_mode : null;
    if (!mode) {
      toast.error('Set an order mode (Reminder or Auto-Reorder) before sending');
      return;
    }
    setSendingReminder(booth.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const resp = await fetch(
        `${SUPABASE_URL}/functions/v1/shopify-draft-order`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ booth_id: booth.id, mode })
        }
      );

      const result = await resp.json();
      if (!resp.ok || !result.success) {
        throw new Error(result.error || 'Failed to create draft order');
      }

      if (mode === 'reminder') {
        toast.success(`Invoice sent to ${booth.contact_email || booth.customer_email || booth.customer_name}`);
      } else {
        toast.success(`Auto-reorder completed — Shopify order created`);
      }
      fetchBooths();
    } catch (err: any) {
      toast.error(err.message || 'Failed to send order');
    } finally {
      setSendingReminder(null);
    }
  };

  const handleSetOrderMode = async (booth: BoothSetup, newMode: 'off' | 'reminder' | 'auto_reorder') => {
    setUpdatingMode(booth.id);
    try {
      const { error } = await supabase
        .from('booth_setups')
        .update({ order_mode: newMode })
        .eq('id', booth.id);
      if (error) throw error;
      const label = newMode === 'off' ? 'Off' : newMode === 'reminder' ? 'Reminder' : 'Auto-Reorder';
      toast.success(`Order mode set to ${label}`);
      fetchBooths();
    } catch {
      toast.error('Failed to update order mode');
    } finally {
      setUpdatingMode(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Customer Name', 'Email', 'Phone', 'Manufacturer', 'Model', 'Member', 'City', 'State', 'Next Reminder', 'Order Mode'];
    const rows = filteredBooths.map(b => [
      b.customer_name, b.customer_email || '', b.customer_phone || '',
      b.booth_manufacturer, b.booth_model || '',
      b.is_member ? 'Yes' : 'No', b.city || '', b.state || '',
      b.next_reminder_date || '', b.order_mode || 'off'
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'abc-filters-customers.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  const getReminderStatus = (booth: BoothSetup) => {
    if (!booth.next_reminder_date) return { color: 'text-gray-400', label: 'Not set', icon: Clock };
    const days = Math.ceil((new Date(booth.next_reminder_date).getTime() - Date.now()) / 86400000);
    if (days < 0) return { color: 'text-red-400', label: `${Math.abs(days)}d overdue`, icon: AlertCircle };
    if (days <= 14) return { color: 'text-amber-400', label: `${days}d`, icon: AlertCircle };
    return { color: 'text-emerald-400', label: `${days}d`, icon: CheckCircle2 };
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#040404]">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      {/* Header */}
      <div className="border-b border-white/8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Filter Database</h1>
                <p className="text-xs text-white/70">Manage customer booth setups, filter positions &amp; change schedules</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={handleExportCSV}
                className="border-white/10 bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 text-white/70 text-xs gap-1.5">
                <Download className="w-3.5 h-3.5" /> CSV Template
              </Button>
              <Button variant="outline" size="sm"
                className="border-white/10 bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 text-white/70 text-xs gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Import Customers (CSV)
              </Button>
              <Button variant="outline" size="sm"
                className="border-white/10 bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 text-white/70 text-xs gap-1.5">
                <Eye className="w-3.5 h-3.5" /> View Product IDs
              </Button>
              <Button size="sm" onClick={() => { setEditingBooth(null); setShowNewBoothModal(true); }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5">
                <Plus className="w-3.5 h-3.5" /> New Booth Setup
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total Customers', value: booths.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Members', value: membersCount, icon: Crown, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Non-Members', value: nonMembersCount, icon: Filter, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          ].map(stat => (
            <Card key={stat.label} className="bg-[#111] border-white/8">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-1 bg-[#111] border border-white/8 rounded-lg p-1">
            {(['all', 'members', 'non-members'] as TabType[]).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}>
                {tab === 'members' && <Crown className="w-3 h-3 inline mr-1 text-amber-400" />}
                {tab === 'all' ? `All (${booths.length})` : tab === 'members' ? `Members (${membersCount})` : `Non-Members (${nonMembersCount})`}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/60" />
            <Input
              placeholder="Search by customer, manufacturer, model..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#111] border-white/10 text-white placeholder:text-white/25 text-sm h-9"
            />
          </div>
        </div>

        {/* Customer list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
          </div>
        ) : filteredBooths.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#0d0d0d]/5 flex items-center justify-center mb-4">
              <Database className="w-7 h-7 text-white/20" />
            </div>
            <p className="text-white/70 text-sm mb-1">No booth setups yet</p>
            <p className="text-white/25 text-xs mb-6">Get started by adding your first customer booth setup.</p>
            <Button size="sm" onClick={() => setShowNewBoothModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" /> Add First Booth
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBooths.map(booth => {
              const reminder = getReminderStatus(booth);
              const ReminderIcon = reminder.icon;
              const currentMode = booth.order_mode || 'off';
              const canSend = currentMode !== 'off';
              return (
                <div key={booth.id}
                  onClick={() => { setEditingBooth(booth); setShowNewBoothModal(true); }}
                  className="group bg-[#111] border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-blue-300">
                          {booth.customer_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-white text-sm">{booth.customer_name}</h3>
                          {booth.is_member && (
                            <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-[10px] px-1.5 py-0 gap-1">
                              <Crown className="w-2.5 h-2.5" /> Member
                            </Badge>
                          )}
                          {currentMode === 'reminder' && (
                            <Badge className="bg-blue-500/15 text-blue-300 border-blue-500/20 text-[10px] px-1.5 py-0 gap-1">
                              <BellRing className="w-2.5 h-2.5" /> Reminder
                            </Badge>
                          )}
                          {currentMode === 'auto_reorder' && (
                            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/20 text-[10px] px-1.5 py-0 gap-1">
                              <Zap className="w-2.5 h-2.5" /> Auto-Reorder
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:flex-wrap text-xs text-white/70">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 flex-shrink-0" />
                            {booth.booth_manufacturer}{booth.booth_model ? ` · ${booth.booth_model}` : ''}
                          </span>
                          {(booth.city || booth.state) && (
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              {[booth.city, booth.state].filter(Boolean).join(', ')}
                            </span>
                          )}
                          {booth.customer_email && (
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              {booth.customer_email}
                            </span>
                          )}
                          {booth.customer_phone && (
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Phone className="w-3 h-3 flex-shrink-0" />
                              {booth.customer_phone}
                            </span>
                          )}
                        </div>
                        {booth.filter_positions && booth.filter_positions.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {booth.filter_positions.map((pos) => (
                              <span key={pos.id} className="text-[10px] bg-[#0d0d0d]/5 border border-white/8 rounded-md px-2 py-0.5 text-white/50">
                                {pos.position_type}{pos.dimensions ? ` ${pos.dimensions}` : ''} ×{pos.quantity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side: reminder status + order mode toggle + actions */}
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2 flex-shrink-0 w-full sm:w-auto ml-[52px] sm:ml-0">
                      <div className={`flex items-center gap-1 text-xs ${reminder.color}`}>
                        <ReminderIcon className="w-3.5 h-3.5" />
                        <span>{reminder.label}</span>
                      </div>

                      {/* Order mode toggle — always visible */}
                      <div className="flex items-center rounded-md border border-white/10 overflow-hidden text-[10px]">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSetOrderMode(booth, 'off'); }}
                          disabled={updatingMode === booth.id}
                          title="Off — no automated orders"
                          className={`px-2 py-1 flex items-center gap-1 transition-colors ${
                            currentMode === 'off'
                              ? 'bg-[#0d0d0d]/15 text-white/80'
                              : 'bg-transparent text-white/60 hover:text-white/60'
                          }`}>
                          <BellOff className="w-2.5 h-2.5" /> Off
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSetOrderMode(booth, 'reminder'); }}
                          disabled={updatingMode === booth.id}
                          title="Send invoice reminder email via Shopify draft order"
                          className={`px-2 py-1 flex items-center gap-1 transition-colors border-l border-white/10 ${
                            currentMode === 'reminder'
                              ? 'bg-blue-500/25 text-blue-300'
                              : 'bg-transparent text-white/60 hover:text-white/60'
                          }`}>
                          <BellRing className="w-2.5 h-2.5" /> Remind
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSetOrderMode(booth, 'auto_reorder'); }}
                          disabled={updatingMode === booth.id}
                          title="Auto-complete order and charge customer"
                          className={`px-2 py-1 flex items-center gap-1 transition-colors border-l border-white/10 ${
                            currentMode === 'auto_reorder'
                              ? 'bg-emerald-500/25 text-emerald-300'
                              : 'bg-transparent text-white/60 hover:text-white/60'
                          }`}>
                          <Zap className="w-2.5 h-2.5" /> Auto
                        </button>
                      </div>

                      <div className="hidden sm:flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline"
                          onClick={(e) => { e.stopPropagation(); handleSendReminder(booth); }}
                          disabled={sendingReminder === booth.id || !canSend}
                          title={canSend ? `Send ${currentMode === 'reminder' ? 'invoice reminder' : 'auto-reorder'} now` : 'Select Remind or Auto mode first'}
                          className="h-7 px-2 border-white/10 bg-[#0d0d0d]/5 hover:bg-blue-500/20 hover:border-blue-500/30 text-white/60 hover:text-blue-300 text-xs gap-1 disabled:opacity-30 disabled:cursor-not-allowed">
                          {sendingReminder === booth.id
                            ? <RefreshCw className="w-3 h-3 animate-spin" />
                            : <Send className="w-3 h-3" />}
                          Send
                        </Button>
                        <Button size="sm" variant="outline"
                          onClick={(e) => { e.stopPropagation(); handleGetInviteLink(booth); }}
                          disabled={generatingLink === booth.id || !booth.customer_email}
                          title={booth.customer_email ? 'Get invite/password link for customer' : 'No email set'}
                          className="h-7 px-2 border-white/10 bg-[#0d0d0d]/5 hover:bg-blue-500/20 hover:border-blue-500/30 text-white/60 hover:text-blue-300 text-xs gap-1 disabled:opacity-30">
                          {generatingLink === booth.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Link2 className="w-3 h-3" />}
                          Link
                        </Button>
                        <Button size="sm" variant="outline"
                          onClick={(e) => { e.stopPropagation(); setEditingBooth(booth); setShowNewBoothModal(true); }}
                          className="h-7 px-2 border-white/10 bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 text-white/60 text-xs gap-1">
                          <ChevronRight className="w-3 h-3" /> Edit
                        </Button>
                        <Button size="sm" variant="outline"
                          onClick={(e) => { e.stopPropagation(); handleDelete(booth.id); }}
                          className="h-7 px-2 border-white/10 bg-[#0d0d0d]/5 hover:bg-red-500/20 hover:border-red-500/30 text-white/70 hover:text-red-400 text-xs">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Invite Link Modal */}
      {inviteLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setInviteLinkModal(null)} />
          <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Customer Invite Link</h2>
              <button onClick={() => setInviteLinkModal(null)} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center">
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Share this link with <span className="text-blue-400">{inviteLinkModal.email}</span> so they can set their password and log in:
            </p>
            <div className="flex items-center gap-2 bg-[#040404] border border-white/10 rounded-lg p-3">
              <input
                type="text"
                readOnly
                value={inviteLinkModal.link}
                className="flex-1 bg-transparent text-sm text-white/80 outline-none truncate"
              />
              <button
                onClick={() => handleCopyInviteLink(inviteLinkModal.link)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  copiedLink === inviteLinkModal.link
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {copiedLink === inviteLinkModal.link ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedLink === inviteLinkModal.link ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setInviteLinkModal(null)} className="bg-blue-600 hover:bg-blue-500 text-white text-sm">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New/Edit Booth Modal */}
      {showNewBoothModal && (
        <NewBoothModal
          booth={editingBooth}
          onClose={() => { setShowNewBoothModal(false); setEditingBooth(null); }}
          onSaved={() => { setShowNewBoothModal(false); setEditingBooth(null); fetchBooths(); }}
        />
      )}
    </div>
  );
}
