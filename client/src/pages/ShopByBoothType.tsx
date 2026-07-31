import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Wind, ArrowDown, ArrowDownRight, Layers } from 'lucide-react';
import { BOOTH_BRANDS, BOOTH_TYPES, type BoothType, getBrandsByType } from '@/data/boothBrands';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Booth Type', url: 'https://pfsfilters.com/shop-by-booth-type' },
]);

const TYPE_CARDS: {
  type: BoothType;
  image: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  filterNeeds: string;
}[] = [
  {
    type: 'downdraft',
    image: '/images/booth-types/full-downdraft-3d.webp',
    badge: 'BEST FINISH QUALITY',
    badgeColor: 'bg-red-600',
    features: [
      'Full ceiling plenum intake',
      'Raised grated floor exhaust',
      'Cleanest airflow pattern',
      'Premium automotive & aerospace',
    ],
    filterNeeds: 'Ceiling diffusion media + exhaust arrestors + pre-filters',
  },
  {
    type: 'crossdraft',
    image: '/images/booth-types/crossflow-3d.webp',
    badge: 'MOST COMMON',
    badgeColor: 'bg-blue-600',
    features: [
      'Horizontal front-to-rear airflow',
      'Front intake / rear exhaust',
      'Most economical option',
      'Ideal for auto body shops',
    ],
    filterNeeds: 'Intake panels (front/side) + exhaust arrestors (rear wall)',
  },
  {
    type: 'semi-downdraft',
    image: '/images/booth-types/semi-downdraft-3d.webp',
    badge: 'MID-RANGE',
    badgeColor: 'bg-purple-600',
    features: [
      'Ceiling intake at front half',
      'Rear floor-level exhaust',
      'Better finish than crossdraft',
      'No full pit required',
    ],
    filterNeeds: 'Partial ceiling media + rear exhaust arrestors',
  },
  {
    type: 'side-downdraft',
    image: '/images/booth-types/side-downdraft-3d.webp',
    badge: 'NO PIT REQUIRED',
    badgeColor: 'bg-cyan-600',
    features: [
      'Ceiling intake',
      'Side wall fan plenum exhaust',
      'Drop on existing slab',
      'Retrofit & lease-friendly',
    ],
    filterNeeds: 'Ceiling media + side-wall exhaust arrestors',
  },
  {
    type: 'open-face',
    image: '/images/booth-types/heated-booth.webp',
    features: [
      'Open-front design',
      'Rear wall exhaust only',
      'Lower cost, faster throughput',
      'Parts & touch-up work',
    ],
    filterNeeds: 'Rear wall exhaust arrestors (no intake filtration required)',
  },
  {
    type: 'prep-station',
    image: '/images/booth-types/raised-basement-3d.webp',
    features: [
      'Controlled dust containment',
      'Ceiling panels + exhaust',
      'Adjacent to paint booths',
      'Sanding & masking work',
    ],
    filterNeeds: 'Ceiling panels + exhaust filters for dust containment',
  },
];

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

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#040404] to-[#040404]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4d9fff]/5 rounded-full blur-[120px] animate-pulse" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Shop by Booth Type' }]} />
          <div className="text-center mt-6">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.3em] mb-4 animate-fade-in">
              Airflow Configurations
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-5 text-white tracking-tight">
              Choose Your Airflow
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Your booth's airflow pattern determines which filters go where. Select your configuration to find exact filter matches.
            </p>
          </div>
        </div>
      </section>

      {/* Booth Type Cards - Premium Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TYPE_CARDS.map((card, index) => {
              const info = BOOTH_TYPES[card.type];
              const brands = getBrandsByType(card.type);
              return (
                <Link key={card.type} href={`/shop-by-booth?type=${card.type}`}>
                  <div 
                    className="group relative border border-white/[0.06] bg-[#0a0a0a] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(77,159,255,0.08)] hover:-translate-y-1 cursor-pointer h-full flex flex-col"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                      <img
                        src={card.image}
                        alt={`${info.label} paint booth airflow diagram`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                      
                      {/* Badge */}
                      {card.badge && (
                        <div className={`absolute top-3 left-3 ${card.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg`}>
                          {card.badge}
                        </div>
                      )}
                      
                      {/* Brand count */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white/80 text-xs px-2.5 py-1 rounded-full border border-white/10">
                        {brands.length} brands
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#4d9fff] transition-colors">
                        {info.label}
                      </h2>
                      
                      {/* Features list */}
                      <div className="space-y-1.5 mb-4 flex-1">
                        {card.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#4d9fff]/60" />
                            <span className="text-xs text-white/55">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Filter needs */}
                      <div className="border-t border-white/[0.06] pt-3 mb-4">
                        <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Filters Needed</span>
                        <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{card.filterNeeds}</p>
                      </div>

                      {/* Brand chips */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {brands.slice(0, 4).map(b => (
                          <span key={b.slug} className="text-[10px] bg-white/[0.04] text-white/50 border border-white/[0.08] px-2 py-0.5 rounded-full">
                            {b.name}
                          </span>
                        ))}
                        {brands.length > 4 && (
                          <span className="text-[10px] text-white/30 px-1">+{brands.length - 4} more</span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 text-white/80 font-medium rounded-xl group-hover:bg-[#4d9fff]/10 group-hover:border-[#4d9fff]/30 group-hover:text-white transition-all text-sm">
                        Browse Filters <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Airflow Explainer Section */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Understanding Booth Airflow</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              The right airflow configuration ensures optimal finish quality and proper filter placement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#4d9fff]/10 flex items-center justify-center mb-4">
                <Wind className="h-5 w-5 text-[#4d9fff]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Why It Matters</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Airflow direction determines where contaminants travel and where filters must be placed. Wrong placement leads to poor finish quality.
              </p>
            </div>
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#4d9fff]/10 flex items-center justify-center mb-4">
                <Layers className="h-5 w-5 text-[#4d9fff]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Intake vs Exhaust</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                <span className="text-white/70">Intake filters</span> clean incoming air before it reaches the vehicle. <span className="text-white/70">Exhaust filters</span> capture overspray before air exits.
              </p>
            </div>
            <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#4d9fff]/10 flex items-center justify-center mb-4">
                <ArrowDown className="h-5 w-5 text-[#4d9fff]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Not Sure?</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Know your booth brand? Use our <Link href="/shop-by-booth" className="text-[#4d9fff] hover:underline">Shop by Brand</Link> page or <Link href="/contact" className="text-[#4d9fff] hover:underline">contact us</Link> for expert help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
