import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Search, ArrowRight, MapPin, Factory, ChevronDown, X, Star } from 'lucide-react';
import { BOOTH_BRANDS, BOOTH_TYPES, type BoothType, type BoothBrand } from '@/data/boothBrands';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Booth', url: 'https://pfsfilters.com/shop-by-booth' },
]);

// Logo mapping for brands that have logos
const BRAND_LOGOS: Record<string, string> = {
  'pfs-filters': '/images/brands/pfs-filters.png',
  'accudraft': '/images/brands/accudraft.png',
  'garmat-usa': '/images/brands/garmat-usa.png',
  'col-met': '/images/brands/col-met.png',
  'global-finishing-solutions': '/images/brands/global-finishing-solutions.png',
  'blowtherm': '/images/brands/blowtherm.png',
  'junair': '/images/brands/junair.png',
  'nova-verta': '/images/brands/nova-verta.png',
  'devilbiss': '/images/brands/devilbiss.png',
  'usi-italia': '/images/brands/usi-italia.png',
  'spraybake': '/images/brands/spraybake.png',
  'eagle': '/images/brands/eagle.png',
  'saima': '/images/brands/saima.png',
};

export default function ShopByBooth() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<BoothType | ''>('');

  const filtered = useMemo(() => {
    let brands = [...BOOTH_BRANDS];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      brands = brands.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.country?.toLowerCase().includes(q) ||
        b.industries.some(i => i.toLowerCase().includes(q)) ||
        b.models.some(m => m.name.toLowerCase().includes(q))
      );
    }
    if (typeFilter) {
      brands = brands.filter(b => b.models.some(m => m.type === typeFilter));
    }
    return brands.sort((a, b) => a.name.localeCompare(b.name));
  }, [query, typeFilter]);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Shop Paint Booth Filters by Booth Brand — Find Filters for Your Booth | PFS Filters"
        description="Find replacement filters for 40+ spray booth brands including Garmat, GFS, Col-Met, Accudraft, Blowtherm, and more. Select your booth brand and model to see compatible ceiling, intake, and exhaust filters."
        canonical="https://pfsfilters.com/shop-by-booth"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop by Booth' }]} />
          <div className="mb-4">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Booth Compatibility</p>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
              Shop by Booth Brand
            </h1>
            <p className="text-lg text-white/70 max-w-3xl">
              Select your spray booth manufacturer to find the exact replacement filters that fit. We stock compatible ceiling media, intake panels, exhaust arrestors, and pre-filters for <span className="text-white font-medium">{BOOTH_BRANDS.length}+ booth brands</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* PFS Featured Card */}
      <section className="section-raised tex-dots pt-8 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/shop">
            <div className="group relative overflow-hidden border-2 border-[#4d9fff]/40 bg-gradient-to-r from-[#4d9fff]/10 via-[#4d9fff]/5 to-transparent rounded-2xl p-6 mb-8 cursor-pointer transition-all duration-300 hover:border-[#4d9fff]/60 hover:shadow-[0_0_40px_rgba(77,159,255,0.15)]">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4d9fff]/5 rounded-full blur-3xl" />
              <div className="relative flex items-center gap-6">
                <div className="flex-shrink-0 w-32 h-20 bg-white/10 rounded-xl flex items-center justify-center p-3 border border-white/10">
                  <img src="/images/brands/pfs-filters.png" alt="PFS Filters" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-[#4d9fff] fill-[#4d9fff]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4d9fff]">Our Brand</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">PFS Filters</h2>
                  <p className="text-white/60 text-sm">Premium filtration media engineered for every spray booth. Universal compatibility, superior performance.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[#4d9fff] font-semibold group-hover:gap-3 transition-all">
                  Shop All Products <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Search & Filter bar */}
      <section className="section-raised tex-dots py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search booth brand, model, or country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {/* Type filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as BoothType | '')}
                className="appearance-none pl-4 pr-10 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 cursor-pointer min-w-[200px]"
              >
                <option value="" className="bg-[#111]">All Booth Types</option>
                {Object.entries(BOOTH_TYPES).map(([key, val]) => (
                  <option key={key} value={key} className="bg-[#111]">{val.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-white/50 mb-6">
            Showing {filtered.length} booth brand{filtered.length !== 1 ? 's' : ''}
            {typeFilter && <span> with <span className="text-white/70">{BOOTH_TYPES[typeFilter].label}</span> models</span>}
          </p>

          {/* Brand grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((brand) => (
              <BrandCard key={brand.slug} brand={brand} typeFilter={typeFilter} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg mb-2">No booths found matching your search.</p>
              <p className="text-white/40 text-sm">Try a different brand name or remove filters.</p>
              <p className="text-white/40 text-sm mt-4">
                Don't see your booth? <Link href="/contact" className="text-[#4d9fff] hover:underline">Contact us</Link> — we can source filters for any booth.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <div className="arc-divider arc-divider-down" />
      <section className="section-glow tex-lines py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Not sure which filters you need?</h2>
          <p className="text-white/60 mb-6">Our team can identify the exact filters for your booth — just tell us the brand and model.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact">
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors">
                Get Help Choosing
              </button>
            </Link>
            <Link href="/filter-compatibility">
              <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors">
                Use Filter Finder Tool
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />
      <Footer />
    </div>
  );
}

function BrandCard({ brand, typeFilter }: { brand: BoothBrand; typeFilter: BoothType | '' }) {
  const modelCount = typeFilter
    ? brand.models.filter(m => m.type === typeFilter).length
    : brand.models.length;

  const boothTypes = [...new Set(brand.models.map(m => m.type))];
  const logoSrc = BRAND_LOGOS[brand.slug];

  return (
    <Link href={`/shop-by-booth/${brand.slug}`}>
      <div className="group border border-white/8 bg-white/[0.03] rounded-2xl overflow-hidden h-full cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]">
        {/* Logo area */}
        <div className="h-28 bg-white/[0.02] border-b border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${brand.name} logo`}
              className="max-h-16 max-w-[80%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="text-center">
              <span className="text-2xl font-bold text-white/30 group-hover:text-white/50 transition-colors">
                {brand.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
              </span>
            </div>
          )}
          {/* Country badge */}
          {brand.country && (
            <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-white/40 bg-black/40 backdrop-blur-sm border border-white/8 px-2 py-0.5 rounded-full">
              <MapPin className="h-2.5 w-2.5" /> {brand.country}
            </span>
          )}
        </div>

        {/* Info area */}
        <div className="p-4">
          <h3 className="font-bold text-base text-white group-hover:text-white/90 mb-2">{brand.name}</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {boothTypes.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] bg-white/5 text-white/50 border border-white/8 px-2 py-0.5 rounded-full capitalize">
                {BOOTH_TYPES[t].label}
              </span>
            ))}
            {boothTypes.length > 3 && (
              <span className="text-[10px] text-white/40">+{boothTypes.length - 3}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Factory className="h-3.5 w-3.5" /> {modelCount} model{modelCount !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-white/50 group-hover:text-white transition-all group-hover:gap-2">
              View <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
