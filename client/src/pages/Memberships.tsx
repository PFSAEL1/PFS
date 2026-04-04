import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Crown, Check, ArrowRight, Sparkles } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Memberships', url: 'https://abcfilters.net/memberships' },
]);

const tiers = [
  {
    name: 'Bronze',
    price: '$29/mo',
    discount: '3%',
    color: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
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
    color: 'bg-slate-50 border-slate-200',
    badge: 'bg-slate-100 text-slate-800',
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
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800',
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
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-800',
    features: [
      '5% discount on all orders',
      'Free shipping on all orders',
      'Dedicated account manager',
      'AI filter scanner access',
      'Full booth filter database',
      'Auto-reorder scheduling',
      'Monthly filter set included',
      'Custom filter sourcing',
    ],
  },
];

export default function Memberships() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Paint Booth Filter Memberships - Save on Every Order"
        description="Join ABC Filters membership for exclusive discounts, auto-reorder scheduling, AI filter scanner, and dedicated support. Plans from $29/month. Save 3-5% on every order."
        canonical="https://abcfilters.net/memberships"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-6">
        <Breadcrumb items={[{ label: 'Memberships' }]} />
      </div>

      {/* Hero */}
      <section className="pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Membership Plans</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Save More, Order Smarter
          </h1>
          <p className="text-xl text-muted-foreground">
            Join hundreds of shops that use ABC Filters memberships to automate their filter program, save on every order, and never run out of filters again.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`relative border-2 ${tier.color} ${tier.popular ? 'ring-2 ring-primary' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <Badge className={`w-fit mb-2 ${tier.badge}`}>{tier.name}</Badge>
                <CardTitle className="text-2xl">{tier.price}</CardTitle>
                <p className="text-sm text-muted-foreground">Save <strong>{tier.discount}</strong> on every order</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
                <Link href="/auth">
                  <Button
                    className={`w-full mt-4 gap-2 ${tier.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Membership FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, memberships can be cancelled at any time with no cancellation fees. Your benefits continue until the end of your billing period.' },
              { q: 'How are discounts applied?', a: 'Discounts are automatically applied at checkout using your membership discount code. No manual entry required.' },
              { q: 'What is the AI Filter Scanner?', a: 'Our AI scanner lets you photograph your existing filters to instantly identify them and add replacements to your cart. Available on Gold and Platinum plans.' },
              { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.' },
            ].map((item) => (
              <div key={item.q} className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
