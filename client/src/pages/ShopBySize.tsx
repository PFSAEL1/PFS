import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Ruler, ArrowRight } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Shop by Size', url: 'https://abcfilters.net/shop-by-size' },
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
    <div className="min-h-screen">
      <SEO
        title="Shop Paint Booth Filters by Size - 20x20, 20x25, Custom Cuts"
        description="Find the right paint booth filter by size. We stock 20x20, 20x25, 24x24, 25x25 and many more standard sizes. Custom-cut filters available for any booth configuration."
        canonical="https://abcfilters.net/shop-by-size"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Breadcrumb items={[{ label: 'Shop by Size' }]} />
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Ruler className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Shop by Size</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Find Your Filter Size</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your filter dimensions to find the right product. Can't find your size? We cut custom filters to spec.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {sizes.map((item) => (
            <Link key={item.size} href={item.custom ? '/contact' : `/shop?size=${item.size}`}>
              <Card className={`group hover:shadow-md transition-all cursor-pointer h-full ${item.popular ? 'border-primary/30 bg-primary/5' : ''} ${item.custom ? 'border-dashed border-primary/40' : ''}`}>
                <CardContent className="pt-6 pb-5 text-center">
                  <p className={`text-2xl font-bold mb-1 ${item.popular ? 'text-primary' : ''}`}>{item.size}</p>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  {item.popular && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Popular</span>}
                  {item.custom && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Request Quote</span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Custom size CTA */}
        <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
          <Ruler className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Need a Custom Size?</h2>
          <p className="text-muted-foreground mb-6">
            We cut filters to any dimension. Tell us your booth make/model or exact measurements and we'll get you a perfect fit.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Request Custom Size <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
