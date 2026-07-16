import { useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { useCartStore } from '@/stores/cartStore';
import { Crown, Check, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Memberships', url: 'https://pfsfilters.com/memberships' },
]);

const tiers = [
  {
    name: 'Bronze',
    price: '$29/mo',
    discount: '3%',
    spendTarget: 'Best for shops spending $300–600/mo',
    color: 'bg-white/3 border-white/10',
    badge: 'bg-white/8 text-white/60',
    accentColor: 'amber',
    variantId: 'gid://shopify/ProductVariant/52521774448772',
    productId: 'gid://shopify/Product/10402239021188',
    handle: 'bronze-membership',
    features: [
      '3% discount on all orders',
      'Priority email support',
      'Filter change reminders',
      'Order history tracking',
    ],
  },
  {
    name: 'Silver',
    price: '$49/mo',
    discount: '5%',
    spendTarget: 'Best for shops spending $600–1,200/mo',
    color: 'bg-[#4d9fff]/5 border-[#4d9fff]/25',
    badge: 'bg-[#4d9fff]/10 text-[#4d9fff]',
    accentColor: 'blue',
    variantId: 'gid://shopify/ProductVariant/52521764323460',
    productId: 'gid://shopify/Product/10402238693508',
    handle: 'silver-membership',
    features: [
      '5% discount on all orders',
      'Priority phone & email support',
      'Filter change reminders',
      'Booth filter database',
      'Auto-reorder scheduling',
    ],
    popular: true,
  },
  {
    name: 'Gold',
    price: '$79/mo',
    discount: '5%',
    spendTarget: 'Best for shops spending $1,200–2,500/mo',
    color: 'bg-white/3 border-white/12',
    badge: 'bg-white/8 text-white/70',
    accentColor: 'yellow',
    variantId: 'gid://shopify/ProductVariant/52521764716676',
    productId: 'gid://shopify/Product/10402238857348',
    handle: 'gold-membership',
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
    price: '$149/mo',
    discount: '5% + Free Shipping',
    spendTarget: 'High-volume shops + custom sourcing',
    color: 'bg-white/5 border-white/15',
    badge: 'bg-white/10 text-white/80',
    accentColor: 'purple',
    variantId: 'gid://shopify/ProductVariant/52521781985412',
    productId: 'gid://shopify/Product/10402239283332',
    handle: 'platinum',
    features: [
      'Custom filter sourcing',
      '5% discount on all orders',
      'Free shipping on all orders',
      'Dedicated account manager',
      'AI filter scanner access',
      'Full booth filter database',
      'Auto-reorder scheduling',
      'Monthly filter set included',
    ],
  },
];

export default function Memberships() {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleAddToCart = (tier: typeof tiers[0]) => {
    setLoadingTier(tier.name);

    // Extract the price number from the display string (e.g., "$49/mo" -> "49.00")
    const priceAmount = tier.price.replace('$', '').replace('/mo', '').trim() + '.00';

    addItem({
      variantId: tier.variantId,
      productId: tier.productId,
      title: `${tier.name} Membership`,
      variantTitle: 'Monthly',
      price: { amount: priceAmount, currencyCode: 'USD' },
      quantity: 1,
      handle: tier.handle,
    });

    toast.success(`${tier.name} Membership added to cart`);
    setLoadingTier(null);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Filter Memberships - Save on Every Order"
        description="Join PFS Filters membership for exclusive discounts, auto-reorder scheduling, AI filter scanner, and dedicated support. Plans from $29/month. Save 3-5% on every order."
        canonical="https://pfsfilters.com/memberships"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-6">
        <Breadcrumb items={[{ label: 'Memberships' }]} />
      </div>

      {/* Hero */}
      <section className="pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <span className="eyebrow-brand border rounded-full text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              <Crown className="h-3.5 w-3.5" />
              Membership Plans
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
            Save More, Order Smarter
          </h1>
          <p className="text-xl text-white/70">
            Join hundreds of shops that use PFS Filters memberships to automate their filter program, save on every order, and never run out of filters again.
          </p>
        </div>
      </section>

      {/* Savings banner */}
      <section className="px-4 mb-8">
        <div className="max-w-4xl mx-auto bg-blue-950 border border-blue-800/50 text-blue-300 text-sm text-center py-2.5 rounded-lg">
          Average member saves $340/year vs. buying ad-hoc — calculated across active memberships.
        </div>
      </section>

      {/* Arc divider */}
      <div className="arc-divider arc-divider-up" />

      {/* Pricing cards */}
      <section className="section-glow tex-dots py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`relative border-2 ${tier.color} bg-[#0d0d0d] ${tier.popular ? 'ring-2 ring-[#4d9fff]/50' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#4d9fff] text-black gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <Badge className={`w-fit mb-2 ${tier.badge}`}>{tier.name}</Badge>
                <CardTitle className="text-2xl">{tier.price}</CardTitle>
                <p className="text-white/45 text-xs">{tier.spendTarget}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{f}</span>
                  </div>
                ))}
                {tier.popular ? (
                  <button
                    onClick={() => handleAddToCart(tier)}
                    disabled={loadingTier === tier.name}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-[#4d9fff] text-black hover:bg-[#6aadff] py-3 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-50"
                  >
                    {loadingTier === tier.name ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>Add to Cart <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(tier)}
                    disabled={loadingTier === tier.name}
                    className="w-full mt-4 flex items-center justify-center gap-2 border border-white/15 text-white/65 hover:border-white/30 hover:text-white/90 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-50"
                  >
                    {loadingTier === tier.name ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>Add to Cart <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Arc divider */}
      <div className="arc-divider arc-divider-down" />

      {/* FAQ */}
      <section className="section-darker tex-lines py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Membership FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, memberships can be cancelled at any time with no cancellation fees. Your benefits continue until the end of your billing period.' },
              { q: 'How are discounts applied?', a: 'Discounts are automatically applied at checkout using your membership discount code. No manual entry required.' },
              { q: 'What is the AI Filter Scanner?', a: 'Our AI scanner lets you photograph your existing filters to instantly identify them and add replacements to your cart. Available on Gold and Platinum plans.' },
              { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.' },
            ].map((item) => (
              <div key={item.q} className="bg-[#0d0d0d] border border-white/[0.08] rounded-xl p-5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-white/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
