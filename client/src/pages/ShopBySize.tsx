import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Ruler, ArrowRight, Star } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Size', url: 'https://pfsfilters.com/shop-by-size' },
]);

const sizes = [
  { size: '20x20', desc: 'Most common for small booths', popular: true },
  { size: '20x25', desc: 'Standard automotive booth size', popular: true },
  { size: '24x24', desc: 'Medium industrial applications' },
  { size: '25x25', desc: 'Square format, versatile use' },
  { size: '20x30', desc: 'Extended exhaust coverage' },
  { size: '24x30', desc: 'Large booth exhaust panels' },
  { size: '25x30', desc: 'High-volume shop standard' },
  { size: '30x30', desc: 'Large format industrial' },
  { size: '24x48', desc: 'Wide-format ceiling panels' },
  { size: '25x48', desc: 'Full-width ceiling coverage' },
  { size: 'Custom', desc: 'Cut to your exact specifications', custom: true },
];

export default function ShopBySize() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Shop Paint Booth Filters by Size - 20x20, 20x25, Custom Cuts"
        description="Find the right paint booth filter by size. We stock 20x20, 20x25, 24x24, 25x25 and many more standard sizes. Custom-cut filters available for any booth configuration."
        canonical="https://pfsfilters.com/shop-by-size"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb items={[{ label: 'Shop by Size' }]} />
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Ruler className="h-3.5 w-3.5 text-white/80" />
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Filter Sizes</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Find Your Filter Size</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            Select your filter dimensions to find the right product. Can't find your size? We cut custom filters to spec.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {sizes.map((item) => (
            <Link key={item.size} href={item.custom ? '/contact' : `/shop?size=${item.size}`}>
              <div className={`group cursor-pointer rounded-2xl p-5 text-center transition-all duration-300 border ${
                item.popular
                  ? 'border-white/20 bg-white/4 hover:border-white/35 hover:bg-white/6'
                  : item.custom
                  ? 'border-dashed border-white/20 bg-white/3 hover:border-white/40 hover:bg-white/5'
                  : 'border-white/8 bg-[#0d0d0d] hover:border-white/20 hover:bg-white/5'
              }`}>
                <p className={`text-2xl font-bold mb-1 ${item.popular ? 'text-white/80' : item.custom ? 'text-white/60' : 'text-white'}`}>
                  {item.size}
                </p>
                <p className="text-xs text-white/70 mb-3">{item.desc}</p>
                {item.popular && (
                  <span className="inline-flex items-center gap-1 text-xs bg-blue-500/15 text-white/80 border border-blue-500/20 px-2 py-0.5 rounded-full">
                    <Star className="h-2.5 w-2.5" /> Popular
                  </span>
                )}
                {item.custom && (
                  <span className="text-xs bg-white/8 text-white/50 border border-white/10 px-2 py-0.5 rounded-full">Request Quote</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Custom size CTA */}
        <div className="max-w-2xl mx-auto text-center bg-[#0d0d0d] border border-white/10 rounded-2xl p-10">
          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
            <Ruler className="h-7 w-7 text-white/80" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Need a Custom Size?</h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            We cut filters to any dimension. Tell us your booth make/model or exact measurements and we'll get you a perfect fit — usually ships same day.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-black hover:bg-white/90 text-white font-bold gap-2">
              Request Custom Size <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
