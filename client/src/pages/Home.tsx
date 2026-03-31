// ABC Filters — Home Page
// Design: Clean industrial, primary blue #0066cc, white bg, bold typography
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { SocialProofBanner } from '@/components/SocialProofBanner';
import { Hero } from '@/components/Hero';
import { PopularProducts } from '@/components/PopularProducts';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { Reviews } from '@/components/Reviews';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';
import { CheckCircle, Package, TrendingUp, Wrench } from 'lucide-react';

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Buy Paint Booth Filters - Premium Spray Booth Filtration Systems"
        description="Shop premium paint booth filters from ABC Filters by PFS. Fiberglass arrestors, tacky panels, intake/exhaust filters for automotive & industrial spray booths. Fast shipping, custom sizes available."
        canonical="https://abcfilters.net/"
        structuredData={combinedSchema}
      />
      <SocialProofBanner />
      <Navigation />
      <Hero />
      <PopularProducts />
      <CategoryNavigation />
      <Reviews />

      {/* About / SEO-rich section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Premium Paint Booth Filters for Every Application
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  ABC Filters is your trusted source for high-quality <strong className="text-foreground">paint booth filters</strong>, <strong className="text-foreground">spray booth filtration systems</strong>, and <strong className="text-foreground">industrial air filtration solutions</strong>. As a division of PFS Spray Booths, we bring decades of expertise in automotive refinishing, industrial coating, and woodworking filtration.
                </p>
                <p>
                  Our comprehensive product line includes <strong className="text-foreground">fiberglass paint arrestors</strong>, <strong className="text-foreground">tacky panel filters</strong>, <strong className="text-foreground">intake filters</strong>, <strong className="text-foreground">exhaust filters</strong>, <strong className="text-foreground">ceiling filters</strong>, and <strong className="text-foreground">roll media</strong> designed to capture overspray and maintain optimal air quality.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: TrendingUp, title: '99% Overspray Capture', desc: 'Industry-leading efficiency' },
                  { icon: CheckCircle, title: 'Extended Filter Life', desc: 'Reduces replacement costs' },
                  { icon: Wrench, title: 'Custom Sizes Available', desc: 'Perfect fit guaranteed' },
                  { icon: Package, title: 'Fast Nationwide Shipping', desc: 'Quick delivery to your shop' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids-holding_4f822e87.jpg"
                alt="ABC Filters paint booth filter products"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg">
                <p className="text-2xl font-bold">1,000+</p>
                <p className="text-sm text-primary-foreground/80">Shops Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <StickyMobileCTA />
      <Footer />
    </div>
  );
}
