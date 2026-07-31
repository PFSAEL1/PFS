import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Factory } from 'lucide-react';
import { BOOTH_BRANDS, BOOTH_TYPES, type BoothType, getBrandsByType } from '@/data/boothBrands';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Booth Type', url: 'https://pfsfilters.com/shop-by-booth-type' },
]);

const TYPE_DETAILS: Record<BoothType, { filterNeeds: string; bestFor: string; color: string }> = {
  'downdraft': {
    filterNeeds: 'Ceiling diffusion media + exhaust arrestors + pre-filters',
    bestFor: 'High-end collision, dealership, and OEM refinishing',
    color: 'from-blue-500/20 to-blue-600/5',
  },
  'crossdraft': {
    filterNeeds: 'Intake panels (front/side) + exhaust arrestors (rear wall)',
    bestFor: 'Independent shops, industrial coating, budget-conscious operations',
    color: 'from-orange-500/20 to-orange-600/5',
  },
  'semi-downdraft': {
    filterNeeds: 'Partial ceiling media + rear exhaust arrestors',
    bestFor: 'Shops wanting better finish than crossdraft without pit installation',
    color: 'from-purple-500/20 to-purple-600/5',
  },
  'side-downdraft': {
    filterNeeds: 'Ceiling media + side-wall exhaust arrestors',
    bestFor: 'Facilities without floor pits that need downdraft-quality results',
    color: 'from-cyan-500/20 to-cyan-600/5',
  },
  'open-face': {
    filterNeeds: 'Rear wall exhaust arrestors (no intake filtration required)',
    bestFor: 'Parts painting, touch-up work, small component finishing',
    color: 'from-emerald-500/20 to-emerald-600/5',
  },
  'prep-station': {
    filterNeeds: 'Ceiling panels + exhaust filters for dust containment',
    bestFor: 'Sanding, masking, prep work adjacent to paint booths',
    color: 'from-amber-500/20 to-amber-600/5',
  },
};

export default function ShopByBoothType() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Shop Paint Booth Filters by Booth Type — Downdraft, Crossdraft, Semi-Downdraft | PFS Filters"
        description="Find the right filters for your booth airflow type. Browse replacement filters for downdraft, crossdraft, semi-downdraft, side-downdraft, open face, and prep station spray booths."
        canonical="https://pfsfilters.com/shop-by-booth-type"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop by Booth Type' }]} />
          <div className="mb-4">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Airflow Configurations</p>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
              Shop by Booth Type
            </h1>
            <p className="text-lg text-white/70 max-w-3xl">
              Your booth's airflow pattern determines which filters go where. Select your configuration below to see the filter positions and compatible brands.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Booth type cards */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {(Object.entries(BOOTH_TYPES) as [BoothType, typeof BOOTH_TYPES[BoothType]][]).map(([type, info]) => {
              const brands = getBrandsByType(type);
              const details = TYPE_DETAILS[type];
              return (
                <div key={type} className="border border-white/8 bg-white/[0.03] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]">
                  {/* Visual header */}
                  <div className={`bg-gradient-to-br ${details.color} p-6 border-b border-white/5`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl">{info.icon}</span>
                      <span className="text-xs bg-white/10 text-white/60 border border-white/15 px-2.5 py-1 rounded-full">
                        {brands.length} brands
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">{info.label}</h2>
                    <p className="text-sm text-white/60 leading-relaxed">{info.description}</p>
                  </div>
                  {/* Details */}
                  <div className="p-6">
                    <div className="space-y-3 mb-5">
                      <div>
                        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Filter Needs</span>
                        <p className="text-sm text-white/70 mt-0.5">{details.filterNeeds}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Best For</span>
                        <p className="text-sm text-white/70 mt-0.5">{details.bestFor}</p>
                      </div>
                    </div>
                    {/* Brand chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {brands.slice(0, 6).map(b => (
                        <Link key={b.slug} href={`/shop-by-booth/${b.slug}`}>
                          <span className="text-xs bg-white/5 text-white/60 border border-white/8 px-2 py-0.5 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
                            {b.name}
                          </span>
                        </Link>
                      ))}
                      {brands.length > 6 && (
                        <span className="text-xs text-white/40 px-1">+{brands.length - 6} more</span>
                      )}
                    </div>
                    <Link href={`/shop-by-booth?type=${type}`}>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-white/15 text-white/80 font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm">
                        Browse {info.label} Booths <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Airflow explainer */}
      <div className="arc-divider arc-divider-down" />
      <section className="section-glow tex-lines py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Understanding Booth Airflow</h2>
          <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Why it matters</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Airflow direction determines where contaminants travel and where filters must be placed. Using the wrong filter position or type leads to poor finish quality and wasted material.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Intake vs Exhaust</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  <span className="text-white/80">Intake filters</span> clean incoming air before it reaches the vehicle. <span className="text-white/80">Exhaust filters</span> capture overspray before air exits the booth.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Not sure?</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  If you know your booth brand and model, use our <Link href="/filter-compatibility" className="text-[#4d9fff] hover:underline">Filter Finder</Link> to get exact filter recommendations. Or <Link href="/contact" className="text-[#4d9fff] hover:underline">contact us</Link> for help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />
      <Footer />
    </div>
  );
}
