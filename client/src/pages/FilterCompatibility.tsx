import { useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Search, CheckCircle, ArrowRight } from 'lucide-react';
import { MobileHeader } from '@/components/MobileHeader';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Filter Compatibility', url: 'https://abcfilters.net/filter-compatibility' },
]);

const popularBooths = [
  'Global Finishing Solutions (GFS)',
  'Spray Systems / Col-Met',
  'Accudraft',
  'Garmat',
  'Binks / Devilbiss',
  'Nordson',
  'Blowtherm',
  'Saima Meccanica',
  'PFS Spray Booths',
  'Custom / Unknown',
];

export default function FilterCompatibility() {
  const [boothMake, setBoothMake] = useState('');
  const [boothModel, setBoothModel] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen safe-bottom">
      <MobileHeader title="Filter Compatibility" showBack={false} />
      <SEO
        title="Paint Booth Filter Compatibility Guide - Find Filters for Your Booth"
        description="Find compatible paint booth filters for your specific spray booth make and model. We match filters for GFS, Accudraft, Garmat, Binks, Col-Met, PFS, and all major brands."
        canonical="https://abcfilters.net/filter-compatibility"
        structuredData={breadcrumbSchema}
      />
      <div className="px-4 pt-4 pb-16 max-w-4xl">
        <Breadcrumb items={[{ label: 'Filter Compatibility' }]} />
        <div className="text-center mb-12">
          <h1 className="text-[26px] font-bold tracking-tight mb-4">Filter Compatibility Finder</h1>
          <p className="text-[14px] text-muted-foreground">
            Tell us your booth make and model and we'll find the exact filters that fit — or cut custom ones to spec.
          </p>
        </div>

        {!submitted ? (
          <Card className="max-w-2xl mx-auto mb-12">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="booth-make">Booth Make / Brand</Label>
                  <Input
                    id="booth-make"
                    value={boothMake}
                    onChange={(e) => setBoothMake(e.target.value)}
                    placeholder="e.g. Global Finishing Solutions, Accudraft, PFS..."
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="booth-model">Booth Model (optional)</Label>
                  <Input
                    id="booth-model"
                    value={boothModel}
                    onChange={(e) => setBoothModel(e.target.value)}
                    placeholder="e.g. Performer, Ultra, XL..."
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Search className="h-4 w-4" /> Find Compatible Filters
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto mb-12 border-green-800/50 bg-green-900/20">
            <CardContent className="pt-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">We'll Find Your Filters!</h2>
              <p className="text-muted-foreground mb-6">
                We've received your booth information for <strong>{boothMake}</strong>{boothModel ? ` ${boothModel}` : ''}. Our team will identify the exact filters for your booth and follow up within 1 business day.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/shop">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    Browse All Filters <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Search Again</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular booth brands */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Booth Brands We Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {popularBooths.map((brand) => (
              <button
                key={brand}
                onClick={() => { setBoothMake(brand); setSubmitted(false); }}
                className="p-3 text-sm text-center bg-card border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
