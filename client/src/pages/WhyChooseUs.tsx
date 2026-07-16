import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import {
  Shield, Truck, Star, Wrench, Award, TrendingUp, CheckCircle, ArrowRight,
} from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Why Choose Us', url: 'https://pfsfilters.com/why-choose-us' },
]);

const features = [
  { icon: Shield, title: 'Proven Quality', description: 'Every filter meets rigorous quality standards for overspray capture efficiency, airflow resistance, and service life.' },
  { icon: Truck, title: 'Fast Nationwide Shipping', description: 'Most orders ship within 1–2 business days with delivery in 3–5 business days anywhere in the US.' },
  { icon: TrendingUp, title: 'Competitive Pricing', description: 'Direct-from-manufacturer pricing means you get premium quality at competitive prices, with bulk discounts available.' },
  { icon: Star, title: 'Expert Recommendations', description: "Tell us your booth make/model and we'll recommend the exact filters you need. No guesswork required." },
  { icon: Award, title: 'PFS Heritage', description: 'Backed by decades of spray booth expertise from PFS, a trusted name in the industry since our founding.' },
  { icon: Wrench, title: 'Expert Support', description: 'Comprehensive technical support and guidance to help you select the perfect filters for your specific application.' },
];

const benefits = [
  'Managed booth filter database — we track every position for you',
  'Auto-reorder scheduling tied to your actual change intervals',
  'AI-powered filter identification — scan to reorder instantly',
  'Membership discounts up to 5% plus free monthly filter sets',
  'Booth-specific recommendations — we know your exact model',
  'PFS-backed expertise: 30+ years building the booths these filters go in',
];

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Why Choose PFS Filters | Premium Spray Booth Filtration Expert"
        description="Choose PFS Filters for premium paint booth filters backed by PFS expertise. Industry-leading quality, custom filtration solutions, expert technical support, and competitive pricing on all spray booth filters."
        canonical="https://pfsfilters.com/why-choose-us"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-6">
        <Breadcrumb items={[{ label: 'Why Choose Us' }]} />
      </div>

      {/* Hero */}
      <section className="pb-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white pfs-heading-animate">
            Why Choose PFS Filters?
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto">
            Premium <strong>spray booth filtration solutions</strong> backed by decades of PFS expertise, delivering superior air quality and finish protection.
          </p>
        </div>
      </section>

      {/* Arc divider */}
      <div className="arc-divider arc-divider-up" />

      {/* Features grid */}
      <section className="section-glow tex-dots py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="p-3 bg-white/5 rounded-xl w-fit mb-4">
                    <f.icon className="h-6 w-6 text-white/60" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Arc divider */}
      <div className="arc-divider arc-divider-down" />

      {/* Benefits list */}
      <section className="section-darker tex-lines py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Everything You Need to Run a Cleaner Booth</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 bg-[#0d0d0d] border border-white/8 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arc divider */}
      <div className="arc-divider arc-divider-up" />

      {/* CTA */}
      <section className="section-raised py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white pfs-heading-animate">Ready to Upgrade Your Filtration?</h2>
          <p className="text-white/60 mb-8">
            Join 1,000+ shops that trust PFS Filters for their spray booth filtration needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                Get a Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
