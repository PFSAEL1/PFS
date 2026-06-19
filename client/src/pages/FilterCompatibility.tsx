import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Search, ArrowRight, CheckCircle2, Wind, Layers, Filter as FilterIcon, ShoppingCart } from 'lucide-react';
import {
  ALL_BRANDS,
  matchBrand,
  getBrand,
  shopLink,
  type BrandCompat,
} from '@/lib/boothCompat';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Filter Compatibility', url: 'https://pfsfilters.com/filter-compatibility' },
]);

// Icon + accent per filter category
const CAT_META: Record<string, { icon: any; accent: string; ring: string }> = {
  'Ceiling / Intake Filter': { icon: Layers, accent: 'text-sky-300', ring: 'bg-sky-500/10 border-sky-500/20' },
  'Intake Filter': { icon: Wind, accent: 'text-teal-300', ring: 'bg-teal-500/10 border-teal-500/20' },
  'Exhaust / Arrestor Filter': { icon: FilterIcon, accent: 'text-blue-300', ring: 'bg-blue-500/10 border-blue-500/20' },
  'Pre-Filter': { icon: FilterIcon, accent: 'text-emerald-300', ring: 'bg-emerald-500/10 border-emerald-500/20' },
};

export default function FilterCompatibility() {
  const [query, setQuery] = useState('');
  const [boothModel, setBoothModel] = useState('');
  const [result, setResult] = useState<BrandCompat | null>(null);
  const [searched, setSearched] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_BRANDS.filter((b) => b.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const runSearch = (brandInput?: string) => {
    const input = brandInput ?? query;
    const match = matchBrand(input);
    setSearched(true);
    if (match) {
      setResult(match);
      setNoMatch(false);
      setQuery(match.brand);
    } else {
      setResult(null);
      setNoMatch(true);
    }
  };

  const pickBrand = (brand: string) => {
    setQuery(brand);
    const b = getBrand(brand);
    setResult(b);
    setSearched(true);
    setNoMatch(!b);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Paint Booth Filter Compatibility Finder - Find Filters for Your Booth"
        description="Instantly find the right paint booth filters for your spray booth. Brand-matched ceiling, intake, exhaust/arrestor and pre-filter sizes for GFS, Garmat, Blowtherm, SprayBake, Accudraft, Binks and more."
        canonical="https://pfsfilters.com/filter-compatibility"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb items={[{ label: 'Filter Compatibility' }]} />

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Filter Compatibility Finder</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Select your booth brand and instantly see the filter types and sizes it uses — matched to filters we stock and cut to spec.
          </p>
        </div>

        {/* Search box */}
        <Card className="max-w-2xl mx-auto mb-6 bg-[#111] border-white/10">
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => { e.preventDefault(); runSearch(); }}
              className="space-y-4"
            >
              <div className="space-y-1.5 relative">
                <Label htmlFor="booth-make" className="text-white/90">Booth Make / Brand</Label>
                <Input
                  id="booth-make"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
                  placeholder="Start typing: Garmat, GFS, Blowtherm, SprayBake..."
                  className="bg-[#0c0c0c] border-white/15 text-white placeholder:text-white/40"
                  autoComplete="off"
                />
                {suggestions.length > 0 && !searched && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-[#161616] border border-white/10 rounded-lg overflow-hidden shadow-xl">
                    {suggestions.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => pickBrand(s)}
                        className="w-full text-left px-4 py-2.5 text-sm text-white/85 hover:bg-blue-500/15 hover:text-white transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="booth-model" className="text-white/90">Booth Model (optional)</Label>
                <Input
                  id="booth-model"
                  value={boothModel}
                  onChange={(e) => setBoothModel(e.target.value)}
                  placeholder="e.g. Performer, Ultra XL..."
                  className="bg-[#0c0c0c] border-white/15 text-white placeholder:text-white/40"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white gap-2">
                <Search className="h-4 w-4" /> Find Compatible Filters
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-2 mb-4 text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium text-white/90">
                Filters commonly used in <span className="font-bold text-white">{result.brand}</span> booths{boothModel ? ` (${boothModel})` : ''}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {result.categories.map((cat) => {
                const meta = CAT_META[cat.category] || CAT_META['Exhaust / Arrestor Filter'];
                const Icon = meta.icon;
                return (
                  <Card key={cat.category} className="bg-[#121212] border-white/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${meta.ring}`}>
                          <Icon className={`w-4.5 h-4.5 ${meta.accent}`} />
                        </div>
                        <h3 className="font-semibold text-white">{cat.category}</h3>
                      </div>
                      <p className="text-xs uppercase tracking-wide text-white/60 mb-2">Common sizes</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cat.common_sizes.map((s) => (
                          <Link key={s} href={shopLink(cat.category, s)}>
                            <span className="inline-block px-2.5 py-1 rounded-md text-xs bg-white/[0.06] border border-white/10 text-white/85 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-white transition-colors cursor-pointer">
                              {s}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link href={shopLink(cat.category)}>
                        <Button size="sm" variant="outline" className="w-full border-white/15 text-white/90 hover:bg-blue-500/15 hover:text-white gap-1.5">
                          <ShoppingCart className="w-3.5 h-3.5" /> Shop {cat.category.split(' / ')[0]}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#0e0e0e] p-5 text-center">
              <p className="text-sm text-white/80 mb-3">
                Don't see your exact size? We cut ceiling filters, rolls, and pads to any spec.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/shop">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                    Browse All Filters <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/15 text-white/90 hover:bg-white/5">
                    Request a Custom Cut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* No match -> lead-capture fallback */}
        {searched && noMatch && (
          <Card className="max-w-2xl mx-auto mb-12 bg-[#111] border-white/10">
            <CardContent className="pt-7 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">We'll match it for you</h2>
              <p className="text-white/80 mb-6">
                We don't have <strong className="text-white">{query}</strong>{boothModel ? ` ${boothModel}` : ''} in our quick-match list yet, but our team matches filters for every booth brand. Browse our filters or send us your booth details and we'll identify the exact fit — and cut custom sizes to spec.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/shop">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                    Browse All Filters <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/15 text-white/90 hover:bg-white/5">
                    Contact Us for a Match
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Brand grid */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-center text-white">Booth Brands We Match</h2>
          <p className="text-sm text-white/70 text-center mb-6">Tap a brand for instant filter recommendations.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALL_BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => pickBrand(brand)}
                className={`p-3 text-sm text-center rounded-lg border transition-all ${
                  result?.brand === brand
                    ? 'border-blue-400/50 bg-blue-500/15 text-white'
                    : 'bg-[#0d0d0d] border-white/10 text-white/85 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
