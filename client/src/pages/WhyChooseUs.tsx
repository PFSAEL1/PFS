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
  { icon: Shield, title: 'Catalog Transparency', description: 'Product pages show current variants, pricing, availability, and catalog details without invented test figures or identifiers.' },
  { icon: Truck, title: 'Fulfillment Clarity', description: 'Stocked items typically process in 1–2 business days; custom, freight, special-order, and backordered timing varies.' },
  { icon: TrendingUp, title: 'Volume Quote Path', description: 'Facilities can request a documented quote for multi-booth or volume needs instead of relying on an assumed discount.' },
  { icon: Star, title: 'Fitment Review', description: "Send the booth make and model, filter position, actual dimensions, and a clear photo so we can review the available options." },
  { icon: Award, title: 'PFS Heritage', description: 'Backed by decades of spray booth expertise from PFS, a trusted name in the industry since our founding.' },
  { icon: Wrench, title: 'Product Support', description: 'Get help reviewing catalog products, custom requests, order questions, and the details needed before purchase.' },
];

const benefits = [
  'Managed booth filter database — we track every position for you',
  'Monthly Shopify subscriptions with 5% off on eligible products',
  'Photo-assisted candidate review with fitment verification',
  'Membership and subscription programs presented separately',
  'Booth-specific review using model, position, and dimensions',
  'PFS-backed expertise: 30+ years building the booths these filters go in',
];

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Why Choose PFS Filters | Premium Spray Booth Filtration Expert"
        description="Choose PFS Filters for paint booth filter catalog transparency, fitment review, qualified fulfillment guidance, and support backed by PFS Spray Booths experience."
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
            Paint booth filtration products backed by decades of PFS experience, with clearer catalog data and a review path when fitment is uncertain.
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
            Browse current products or send the booth details for help reviewing a custom or hard-to-find request.
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
