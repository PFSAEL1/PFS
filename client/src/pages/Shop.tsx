import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ShopifyProducts } from '@/components/ShopifyProducts';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Package } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop', url: 'https://pfsfilters.com/shop' },
]);

export default function Shop() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Shop All Paint Booth Filters - In Stock & Ready to Ship"
        description="Browse 50+ spray booth filters in stock. Fiberglass arrestors (20x20, 20x25), tacky panels, MERV-rated intake filters & exhaust filters. Same-day shipping on most orders. Custom sizes cut to spec."
        canonical="https://pfsfilters.com/shop"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb items={[{ label: 'Shop' }]} />
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Shop Paint Booth Filters
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-3xl mx-auto">
            Premium <strong>spray booth filters</strong> and <strong>paint arrestors</strong> engineered for superior overspray capture. All products tested, quality assured, and shipped fast nationwide.
          </p>
        </div>
        <ShopifyProducts />

        {/* SEO content block */}
        <div className="max-w-4xl mx-auto glow-card p-8 mt-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="glow-icon">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Complete Paint Booth Filtration Solutions</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </div>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              Browse our comprehensive selection of <strong className="text-foreground">paint booth filters</strong>, including <strong className="text-foreground">fiberglass paint arrestors</strong>, <strong className="text-foreground">tacky panel filters</strong>, <strong className="text-foreground">ceiling blankets</strong>, <strong className="text-foreground">roll media</strong>, and <strong className="text-foreground">filter accessories</strong>. Whether you operate an automotive body shop, industrial coating facility, or woodworking spray booth, we have the right filtration products for your application.
            </p>
            <p>
              All our <strong className="text-foreground">spray booth filters</strong> are manufactured to meet or exceed industry standards for overspray capture efficiency, air flow resistance, and service life. Available in standard sizes like <strong className="text-foreground">20x20 paint booth filters</strong>, <strong className="text-foreground">20x25 filters</strong>, and custom dimensions to fit any booth configuration.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
