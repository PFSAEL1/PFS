// ABC Filters iOS App — Memberships Page
// Tesla-grade dark: tier cards with dark backgrounds and accent borders
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { MobileHeader } from '@/components/MobileHeader';
import { Crown, Check, Sparkles, Zap, Star } from 'lucide-react';

const tiers = [
  {
    name: 'Bronze',
    price: '$29',
    period: '/mo',
    discount: '3% off all orders',
    icon: Star,
    accentColor: 'oklch(0.65 0.15 55)',
    borderColor: 'oklch(0.65 0.15 55 / 0.4)',
    bgColor: 'oklch(0.65 0.15 55 / 0.08)',
    features: [
      '3% discount on all orders',
      'Priority email support',
      'Filter change reminders',
      'Order history tracking',
    ],
  },
  {
    name: 'Silver',
    price: '$49',
    period: '/mo',
    discount: '5% off all orders',
    icon: Sparkles,
    accentColor: 'oklch(0.75 0.04 240)',
    borderColor: 'oklch(0.75 0.04 240 / 0.5)',
    bgColor: 'oklch(0.75 0.04 240 / 0.08)',
    popular: true,
    features: [
      '5% discount on all orders',
      'Priority phone & email support',
      'Filter change reminders',
      'Booth filter database',
      'Auto-reorder scheduling',
    ],
  },
  {
    name: 'Gold',
    price: '$79',
    period: '/mo',
    discount: '5% off + monthly set',
    icon: Crown,
    accentColor: 'oklch(0.78 0.18 85)',
    borderColor: 'oklch(0.78 0.18 85 / 0.5)',
    bgColor: 'oklch(0.78 0.18 85 / 0.08)',
    features: [
      '5% discount on all orders',
      'Dedicated account manager',
      'AI filter scanner access',
      'Booth filter database',
      'Auto-reorder scheduling',
      'Monthly filter set included',
    ],
  },
  {
    name: 'Platinum',
    price: '$149',
    period: '/mo',
    discount: '10% off + full service',
    icon: Zap,
    accentColor: 'oklch(0.62 0.20 230)',
    borderColor: 'oklch(0.62 0.20 230 / 0.5)',
    bgColor: 'oklch(0.62 0.20 230 / 0.08)',
    features: [
      '10% discount on all orders',
      'White-glove account service',
      'AI filter scanner access',
      'Unlimited custom sizes',
      'Auto-reorder scheduling',
      'Monthly filter set included',
      'On-site consultation (annual)',
    ],
  },
];

export default function Memberships() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Membership Plans - ABC Filters"
        description="Join an ABC Filters membership and save on every order. Bronze, Silver, Gold, and Platinum tiers available."
        canonical="https://abcfilters.net/memberships"
      />
      <MobileHeader title="Memberships" />

      <div className="px-4 pb-8">
        {/* Header */}
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{background:'oklch(0.62 0.20 230 / 0.12)',border:'1px solid oklch(0.62 0.20 230 / 0.3)'}}>
            <Crown className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Save on Every Order</span>
          </div>
          <h1 className="text-2xl font-black text-foreground mb-2">Choose Your Plan</h1>
          <p className="text-sm text-muted-foreground">Unlock discounts, priority support, and exclusive perks.</p>
        </div>

        {/* Tier cards */}
        <div className="space-y-4">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div key={tier.name}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: tier.bgColor,
                  border: `1.5px solid ${tier.popular ? tier.borderColor : 'oklch(1 0 0 / 0.08)'}`,
                }}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-2xl rounded-tr-3xl text-[10px] font-bold uppercase tracking-wider"
                    style={{background: tier.accentColor, color:'oklch(0.08 0.008 240)'}}>
                    Most Popular
                  </div>
                )}
                <div className="p-5">
                  {/* Tier header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{background: tier.bgColor, border:`1px solid ${tier.borderColor}`}}>
                      <Icon className="w-5 h-5" style={{color: tier.accentColor}} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">{tier.name}</h3>
                      <p className="text-xs" style={{color: tier.accentColor}}>{tier.discount}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="text-2xl font-black" style={{color: tier.accentColor}}>{tier.price}</span>
                      <span className="text-xs text-muted-foreground">{tier.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-5">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{background: tier.bgColor, border:`1px solid ${tier.borderColor}`}}>
                          <Check className="w-2.5 h-2.5" style={{color: tier.accentColor}} />
                        </div>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/auth">
                    <button
                      className="w-full h-11 rounded-2xl font-bold text-sm btn-press transition-all"
                      style={{
                        background: tier.popular ? tier.accentColor : 'transparent',
                        color: tier.popular ? 'oklch(0.08 0.008 240)' : tier.accentColor,
                        border: `1.5px solid ${tier.accentColor}`,
                      }}>
                      Get {tier.name}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-6 px-4">
          All plans include a 30-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
