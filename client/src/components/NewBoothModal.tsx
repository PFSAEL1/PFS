// NewBoothModal.tsx — 4-tab booth setup form
// Tabs: Customer & Booth | Filter Positions | Ship-To Address | Contact & Schedule
// Matches the design from the original Lovable build.

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { X, Plus, Trash2, Layers, ChevronRight, ChevronLeft, RefreshCw, Copy, Check, Link2 } from 'lucide-react';
import ShopifyProductPicker from './ShopifyProductPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FilterPosition {
  id?: string;
  position_number: number;
  position_type: string;
  dimensions: string;
  quantity: number;
  shopify_product_id: string;
  shopify_variant_id: string;
  shopify_product_title: string;
  notes: string;
}

interface BoothSetup {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booth_manufacturer: string;
  booth_model: string;
  notes: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  primary_contact_name: string;
  contact_email: string;
  contact_phone: string;
  is_member: boolean;
  membership_tier: string;
  auto_reorder: boolean;
  interval_type: string;
  change_interval_days: number;
  change_interval_type: string;
  last_filter_change: string;
  first_reminder_date: string;
}

interface Props {
  booth: BoothSetup | null;
  onClose: () => void;
  onSaved: () => void;
}

const TABS = ['Customer & Booth', 'Filter Positions', 'Ship-To Address', 'Contact & Schedule'];

const MANUFACTURERS = [
  'Accudraft', 'Binks', 'Blowtherm', 'Car-O-Liner', 'Col-Met',
  'Garmat', 'Global Finishing Solutions', 'Junair', 'Nordson',
  'PFS', 'Spraybake', 'Spray Systems', 'USI Italia', 'Other'
];

const MEMBERSHIP_TIERS = [
  { value: '', label: 'No Membership' },
  { value: 'bronze', label: 'Bronze (3% off)' },
  { value: 'silver', label: 'Silver (5% off)' },
  { value: 'gold', label: 'Gold (5% off)' },
  { value: 'platinum', label: 'Platinum (5% off)' },
];

const POSITION_TYPES = [
  'Exhaust/Paint Arrestor', 'Intake/Ceiling', 'Cross Draft Intake',
  'Side Draft Intake', 'Downdraft Intake', 'Pit Filter', 'Recirculation', 'Other'
];

const DIMENSIONS = [
  '16x20', '16x25', '20x20', '20x25', '24x24', '24x30',
  '25x25', '25x30', '20x20x2', '24x24x2', 'Custom'
];

const defaultBooth: BoothSetup = {
  customer_name: '', customer_email: '', customer_phone: '',
  booth_manufacturer: '', booth_model: '', notes: '',
  address_line1: '', address_line2: '', city: '', state: '', zip_code: '',
  primary_contact_name: '', contact_email: '', contact_phone: '',
  is_member: false, membership_tier: '', auto_reorder: false,
  interval_type: 'calendar_days', change_interval_days: 90,
  change_interval_type: 'quick', last_filter_change: '', first_reminder_date: ''
};

const defaultPosition = (num: number): FilterPosition => ({
  position_number: num, position_type: 'Exhaust/Paint Arrestor',
  dimensions: '20x20', quantity: 1, shopify_product_id: '',
  shopify_variant_id: '', shopify_product_title: '', notes: ''
});

export default function NewBoothModal({ booth, onClose, onSaved }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BoothSetup>(booth ? { ...defaultBooth, ...booth } : defaultBooth);
  const [positions, setPositions] = useState<FilterPosition[]>([defaultPosition(1)]);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [generatingLink, setGeneratingLink] = useState(false);

  useEffect(() => {
    if (booth?.id) {
      // Load existing filter positions
      supabase
        .from('filter_positions')
        .select('*')
        .eq('booth_id', booth.id)
        .order('position_number')
        .then(({ data }) => {
          if (data && data.length > 0) setPositions(data.map(p => ({
            ...p,
            dimensions: p.dimensions || '20x20',
            shopify_product_id: p.shopify_product_id || '',
            shopify_variant_id: (p as any).shopify_variant_id || '',
            shopify_product_title: p.shopify_product_title || '',
            notes: p.notes || ''
          })));
        });
    }
  }, [booth]);

  const updateForm = (field: keyof BoothSetup, value: string | boolean | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updatePosition = (index: number, field: keyof FilterPosition, value: string | number) => {
    setPositions(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const addPosition = () => {
    setPositions(prev => [...prev, defaultPosition(prev.length + 1)]);
  };

  const removePosition = (index: number) => {
    if (positions.length <= 1) return;
    setPositions(prev => prev.filter((_, i) => i !== index).map((p, i) => ({ ...p, position_number: i + 1 })));
  };

  const handleSave = async () => {
    if (!form.customer_name.trim()) { toast.error('Customer name is required'); setActiveTab(0); return; }
    if (!form.booth_manufacturer.trim()) { toast.error('Booth manufacturer is required'); setActiveTab(0); return; }

    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      // Only send valid booth_setups columns - exclude nested relations and auto-generated fields
      const boothData: Record<string, any> = {
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        booth_manufacturer: form.booth_manufacturer,
        booth_model: form.booth_model,
        notes: form.notes,
        address_line1: form.address_line1,
        address_line2: form.address_line2,
        city: form.city,
        state: form.state,
        zip_code: form.zip_code,
        primary_contact_name: form.primary_contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        is_member: form.is_member,
        membership_tier: form.membership_tier,
        auto_reorder: form.auto_reorder,
        interval_type: form.interval_type,
        change_interval_days: Number(form.change_interval_days) || 90,
        change_interval_type: form.change_interval_type,
        last_filter_change: form.last_filter_change || null,
        first_reminder_date: form.first_reminder_date || null,
        created_by: session?.user.id,
      };

      let boothId = booth?.id;

      if (boothId) {
        const { error } = await supabase.from('booth_setups').update(boothData).eq('id', boothId);
        if (error) throw error;
        // Delete old positions and re-insert
        await supabase.from('filter_positions').delete().eq('booth_id', boothId);
      } else {
        const { data, error } = await supabase.from('booth_setups').insert(boothData).select().single();
        if (error) throw error;
        boothId = data.id;
      }

      // Insert filter positions
      if (positions.length > 0 && boothId) {
        const posData = positions.map(p => ({
          booth_id: boothId,
          position_number: p.position_number,
          position_type: p.position_type,
          dimensions: p.dimensions || null,
          quantity: Number(p.quantity),
          shopify_product_id: p.shopify_product_id || null,
          shopify_variant_id: p.shopify_variant_id || null,
          shopify_product_title: p.shopify_product_title || null,
          notes: p.notes || null,
        }));
        const { error: posError } = await supabase.from('filter_positions').insert(posData);
        if (posError) throw posError;
      }

      // If member with a tier, upsert their membership record
      if (form.is_member && form.membership_tier && form.customer_email) {
        const discountCodes: Record<string, string> = {
          bronze: 'MEMBER_BRONZE_3',
          silver: 'MEMBER_SILVER_5',
          gold: 'MEMBER_GOLD_5',
          platinum: 'MEMBER_PLATINUM_5',
        };
        const { error: memberError } = await supabase.from('memberships').upsert({
          user_email: form.customer_email,
          tier: form.membership_tier,
          status: 'active',
          discount_code: discountCodes[form.membership_tier] || '',
        }, { onConflict: 'user_email' });
        if (memberError) console.warn('Membership save warning:', memberError);
      }

      // Send invite email to customer (only for new booths with an email)
      let hasInviteLink = false;
      if (!booth?.id && form.customer_email) {
        try {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          const inviteResp = await fetch('/api/invite-customer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentSession?.access_token}`,
            },
            body: JSON.stringify({ email: form.customer_email }),
          });
          const inviteResult = await inviteResp.json();
          if (inviteResult.success) {
            if (inviteResult.inviteLink) {
              setInviteLink(inviteResult.inviteLink);
              hasInviteLink = true;
              toast.success('Booth created & invite link generated!');
            } else if (inviteResult.alreadyExists) {
              toast.success('Booth created! Customer already has an account.');
            } else {
              toast.success(`Booth created & invite sent to ${form.customer_email}`);
            }
          } else {
            toast.success('Booth created! (Invite email could not be sent)');
            console.warn('Invite failed:', inviteResult.error);
          }
        } catch (inviteErr) {
          // Don't fail the whole save if invite fails
          toast.success('Booth created! (Invite email could not be sent)');
          console.warn('Invite error:', inviteErr);
        }
      } else {
        toast.success(booth?.id ? 'Booth setup updated!' : 'Booth setup created!');
      }
      // Only close if we don't have an invite link to show
      if (!hasInviteLink) onSaved();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save booth setup');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      toast.success('Invite link copied to clipboard!');
      setTimeout(() => setLinkCopied(false), 3000);
    }
  };

  // If invite link is available, show the link panel instead of the form
  if (inviteLink) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { onSaved(); }} />
        <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Customer Invite Link</h2>
            <button onClick={() => { onSaved(); }} className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center">
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
          <p className="text-sm text-white/60 mb-4">
            Booth created successfully! An invite email was sent to <span className="text-blue-400">{form.customer_email}</span>. 
            You can also copy the link below to send it manually:
          </p>
          <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-lg p-3">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="flex-1 bg-transparent text-sm text-white/80 outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                linkCopied
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {linkCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => { onSaved(); }} className="bg-blue-600 hover:bg-blue-500 text-white text-sm">
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="text-base font-semibold text-white">
            {booth?.id ? 'Edit Booth Setup' : 'New Customer Booth Setup'}
          </h2>
          <div className="flex items-center gap-2">
            {booth?.id && form.customer_email && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  setGeneratingLink(true);
                  try {
                    const { data: { session } } = await supabase.auth.getSession();
                    const resp = await fetch('/api/invite-customer', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.access_token}`,
                      },
                      body: JSON.stringify({ email: form.customer_email }),
                    });
                    const result = await resp.json();
                    if (result.success && result.inviteLink) {
                      setInviteLink(result.inviteLink);
                    } else if (result.success && result.alreadyExists) {
                      // Generate a magic link / password reset instead
                      setInviteLink(`https://www.pfsfilters.com/auth`);
                      toast.info('Customer already has an account. Share the login page link.');
                    } else {
                      toast.error('Could not generate invite link');
                    }
                  } catch (err) {
                    toast.error('Failed to generate link');
                  } finally {
                    setGeneratingLink(false);
                  }
                }}
                disabled={generatingLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-medium transition-all disabled:opacity-50"
              >
                {generatingLink ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Link2 className="w-3.5 h-3.5" />}
                Share Invite Link
              </button>
            )}
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/8 px-6 pt-3">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`px-3 pb-3 text-sm font-medium border-b-2 transition-colors mr-1 ${
                activeTab === i
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Tab 0: Customer & Booth */}
          {activeTab === 0 && (
            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-xs mb-1.5 block">Customer Name *</Label>
                <Input value={form.customer_name} onChange={e => updateForm('customer_name', e.target.value)}
                  placeholder="Company or customer name"
                  className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Customer Email</Label>
                  <Input value={form.customer_email} onChange={e => updateForm('customer_email', e.target.value)}
                    placeholder="email@example.com" type="email"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Customer Phone</Label>
                  <Input value={form.customer_phone} onChange={e => updateForm('customer_phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Booth Manufacturer *</Label>
                  <select value={form.booth_manufacturer} onChange={e => updateForm('booth_manufacturer', e.target.value)}
                    className="w-full h-9 rounded-md bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select manufacturer</option>
                    {MANUFACTURERS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Booth Model</Label>
                  <Input value={form.booth_model} onChange={e => updateForm('booth_model', e.target.value)}
                    placeholder="e.g. Ultra XD"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_member} onChange={e => updateForm('is_member', e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-[#0d0d0d] accent-blue-500" />
                  <span className="text-sm text-white/70">Member (auto-reorder eligible)</span>
                </label>
                {form.is_member && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.auto_reorder} onChange={e => updateForm('auto_reorder', e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-[#0d0d0d] accent-blue-500" />
                    <span className="text-sm text-white/70">Enable Auto-Reorder</span>
                  </label>
                )}
              </div>
              {form.is_member && (
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Membership Tier / Discount Level</Label>
                  <select value={form.membership_tier} onChange={e => updateForm('membership_tier', e.target.value)}
                    className="w-full h-9 rounded-md bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    {MEMBERSHIP_TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <p className="text-xs text-white/40 mt-1">This sets the discount level the customer sees when they log in.</p>
                </div>
              )}
              <div>
                <Label className="text-white/70 text-xs mb-1.5 block">Notes</Label>
                <Textarea value={form.notes} onChange={e => updateForm('notes', e.target.value)}
                  placeholder="Any additional notes about this booth setup..."
                  rows={3}
                  className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25 resize-none" />
              </div>
            </div>
          )}

          {/* Tab 1: Filter Positions */}
          {activeTab === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Filter Positions</span>
                </div>
                <Button size="sm" variant="outline" onClick={addPosition}
                  className="border-white/10 bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 text-white/70 text-xs gap-1.5 h-7">
                  <Plus className="w-3 h-3" /> Add Another Position
                </Button>
              </div>

              {positions.map((pos, i) => (
                <div key={i} className="bg-[#0d0d0d] border border-white/8 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-400">Position {i + 1}</span>
                    {positions.length > 1 && (
                      <button onClick={() => removePosition(i)}
                        className="w-6 h-6 rounded-md bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label className="text-white/60 text-xs mb-1.5 block">Position Type</Label>
                      <select value={pos.position_type} onChange={e => updatePosition(i, 'position_type', e.target.value)}
                        className="w-full h-9 rounded-md bg-[#111] border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {POSITION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-white/60 text-xs mb-1.5 block">Dimensions</Label>
                      <select value={pos.dimensions} onChange={e => updatePosition(i, 'dimensions', e.target.value)}
                        className="w-full h-9 rounded-md bg-[#111] border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {DIMENSIONS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label className="text-white/60 text-xs mb-1.5 block">Quantity</Label>
                      <Input type="number" min={1} value={pos.quantity || ''}
                        onFocus={e => e.target.select()}
                        onChange={e => updatePosition(i, 'quantity', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                        className="bg-[#111] border-white/10 text-white" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">Shopify Product</Label>
                    <ShopifyProductPicker
                      value={pos.shopify_product_title ? { product_id: pos.shopify_product_id, variant_id: pos.shopify_variant_id, title: pos.shopify_product_title } : null}
                      onChange={val => {
                        updatePosition(i, 'shopify_product_id', val?.product_id || '');
                        updatePosition(i, 'shopify_variant_id', val?.variant_id || '');
                        updatePosition(i, 'shopify_product_title', val?.title || '');
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-white/60 text-xs mb-1.5 block">Notes</Label>
                    <Input value={pos.notes} onChange={e => updatePosition(i, 'notes', e.target.value)}
                      placeholder="Optional notes for this position..."
                      className="bg-[#111] border-white/10 text-white placeholder:text-white/25" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Ship-To Address */}
          {activeTab === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-xs mb-1.5 block">Address Line 1</Label>
                <Input value={form.address_line1} onChange={e => updateForm('address_line1', e.target.value)}
                  placeholder="123 Main St"
                  className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
              </div>
              <div>
                <Label className="text-white/70 text-xs mb-1.5 block">Address Line 2</Label>
                <Input value={form.address_line2} onChange={e => updateForm('address_line2', e.target.value)}
                  placeholder="Suite 200"
                  className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Label className="text-white/70 text-xs mb-1.5 block">City</Label>
                  <Input value={form.city} onChange={e => updateForm('city', e.target.value)}
                    placeholder="City"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">State</Label>
                  <Input value={form.state} onChange={e => updateForm('state', e.target.value)}
                    placeholder="CA"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">ZIP Code</Label>
                  <Input value={form.zip_code} onChange={e => updateForm('zip_code', e.target.value)}
                    placeholder="90210"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Contact & Schedule */}
          {activeTab === 3 && (
            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-xs mb-1.5 block">Primary Contact Name</Label>
                <Input value={form.primary_contact_name} onChange={e => updateForm('primary_contact_name', e.target.value)}
                  placeholder="John Smith"
                  className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Contact Email for Reminders</Label>
                  <Input value={form.contact_email} onChange={e => updateForm('contact_email', e.target.value)}
                    placeholder="john@example.com" type="email"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                  <p className="text-xs text-white/30 mt-1">This is where auto-reorder emails will be sent</p>
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1.5 block">Contact Phone</Label>
                  <Input value={form.contact_phone} onChange={e => updateForm('contact_phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-[#0d0d0d] border-white/10 text-white placeholder:text-white/25" />
                </div>
              </div>

              <div className="pt-2 border-t border-white/8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center">
                    <span className="text-[10px] text-blue-400">⏱</span>
                  </div>
                  <span className="text-sm font-medium text-white">Auto-Reorder Settings</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/70 text-xs mb-1.5 block">Interval Type</Label>
                    <select value={form.interval_type} onChange={e => updateForm('interval_type', e.target.value)}
                      className="w-full h-9 rounded-md bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="calendar_days">Calendar Days</option>
                      <option value="business_days">Business Days</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-white/70 text-xs mb-1.5 block">Change Interval (days)</Label>
                      <Input type="number" min={1} value={form.change_interval_days}
                        onChange={e => updateForm('change_interval_days', parseInt(e.target.value) || 90)}
                        className="bg-[#0d0d0d] border-white/10 text-white" />
                    </div>
                    <div className="w-24">
                      <Label className="text-white/70 text-xs mb-1.5 block">&nbsp;</Label>
                      <select value={form.change_interval_type} onChange={e => updateForm('change_interval_type', e.target.value)}
                        className="w-full h-9 rounded-md bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="quick">Quick</option>
                        <option value="standard">Standard</option>
                        <option value="heavy">Heavy Use</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <Label className="text-white/70 text-xs mb-1.5 block">Last Filter Change</Label>
                    <Input type="date" value={form.last_filter_change}
                      onChange={e => updateForm('last_filter_change', e.target.value)}
                      className="bg-[#0d0d0d] border-white/10 text-white" />
                  </div>
                  <div>
                    <Label className="text-white/70 text-xs mb-1.5 block">First Reminder Date</Label>
                    <Input type="date" value={form.first_reminder_date}
                      onChange={e => updateForm('first_reminder_date', e.target.value)}
                      className="bg-[#0d0d0d] border-white/10 text-white" />
                    <p className="text-xs text-white/30 mt-1">When should we send the first reorder email?</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/8">
          <Button variant="outline" onClick={activeTab > 0 ? () => setActiveTab(activeTab - 1) : onClose}
            className="border-white/10 bg-[#0d0d0d]/5 hover:bg-[#0d0d0d]/10 text-white/70 gap-1.5 text-sm">
            {activeTab > 0 ? <><ChevronLeft className="w-4 h-4" /> Back</> : 'Cancel'}
          </Button>
          <div className="flex items-center gap-2">
            {/* Step dots */}
            <div className="flex items-center gap-1.5 mr-2">
              {TABS.map((_, i) => (
                <div key={i} onClick={() => setActiveTab(i)}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                    i === activeTab ? 'bg-blue-500 w-3' : i < activeTab ? 'bg-blue-500/50' : 'bg-[#0d0d0d]/15'
                  }`} />
              ))}
            </div>
            {activeTab < TABS.length - 1 ? (
              <Button onClick={() => setActiveTab(activeTab + 1)}
                className="bg-blue-600 hover:bg-blue-500 text-white gap-1.5 text-sm">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={saving}
                className="bg-blue-600 hover:bg-blue-500 text-white gap-1.5 text-sm min-w-[120px]">
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {saving ? 'Saving...' : booth?.id ? 'Update Booth' : 'Create Booth'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
