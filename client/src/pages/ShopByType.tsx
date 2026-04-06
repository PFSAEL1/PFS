// ShopByType — PFS Filters Dark Theme
// Correct intake/exhaust/ceiling/roll labels for spray booth filter positions
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Wind, Filter, Layers, Grid3X3, ArrowRight, Zap, Droplets } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Type', url: 'https://pfsfilters.com/shop-by-type' },
]);

const filterTypes = [
  {
    icon: Filter,
    title: 'Fiberglass Paint Arrestors',
    position: 'EXHAUST',
    positionColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    desc: 'The most popular choice for exhaust filtration. Progressive-density glass fiber media captures overspray efficiently before it exits the booth. Available in standard and custom sizes.',
    href: '/category/fiberglass-arrestors',
    tags: ['Exhaust', 'High Volume', 'Cost-Effective'],
    accent: 'blue',
  },
  {
    icon: Layers,
    title: 'Tacky Panel Filters',
    position: 'INTAKE',
    positionColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    desc: 'Adhesive-coated filters for superior particle capture. Ideal for intake filtration — keeps dust, debris, and contaminants out of your booth to protect finish quality.',
    href: '/category/tacky-panels',
    tags: ['Intake', 'High Efficiency', 'Premium'],
    accent: 'emerald',
  },
  {
    icon: Grid3X3,
    title: 'Ceiling Blankets',
    position: 'INTAKE',
    positionColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    desc: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor for a flawless finish.',
    href: '/category/ceiling-blankets',
    tags: ['Intake', 'Ceiling', 'Downdraft'],
    accent: 'purple',
  },
  {
    icon: Wind,
    title: 'Roll Media',
    position: 'INTAKE / EXHAUST',
    positionColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    desc: 'Continuous roll filtration for custom-cut applications. Cut to any length for any booth configuration. Available in multiple densities for both intake and exhaust positions.',
    href: '/category/roll-media',
    tags: ['Custom Cut', 'Flexible', 'Bulk'],
    accent: 'cyan',
  },
  {
    icon: Zap,
    title: 'MERV-Rated Filters',
    position: 'INTAKE',
    positionColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    desc: 'High-efficiency filters rated by MERV standard for precise particle capture. Ideal for industrial coating operations with strict air quality requirements.',
    href: '/category/merv-filters',
    tags: ['MERV-10', 'MERV-13', 'Industrial'],
    accent: 'yellow',
  },
  {
    icon: Droplets,
    title: 'Polyester Media',
    position: 'EXHAUST',
    positionColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    desc: 'Durable synthetic filtration media with excellent moisture resistance. Great for high-humidity environments and water-based coatings in exhaust positions.',
    href: '/category/polyester-media',
    tags: ['Synthetic', 'Moisture Resistant', 'Durable'],
    accent: 'rose',
  },
];

const accentMap: Record<string, string> = {
  blue: 'group-hover:border-blue-500/40 group-hover:bg-blue-500/5',
  emerald: 'group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5',
  purple: 'group-hover:border-purple-500/40 group-hover:bg-purple-500/5',
  cyan: 'group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5',
  yellow: 'group-hover:border-yellow-500/40 group-hover:bg-yellow-500/5',
  rose: 'group-hover:border-rose-500/40 group-hover:bg-rose-500/5',
};

const iconAccentMap: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-400/10 group-hover:bg-blue-400/20',
  emerald: 'text-emerald-400 bg-emerald-400/10 group-hover:bg-emerald-400/20',
  purple: 'text-purple-400 bg-purple-400/10 group-hover:bg-purple-400/20',
  cyan: 'text-cyan-400 bg-cyan-400/10 group-hover:bg-cyan-400/20',
  yellow: 'text-yellow-400 bg-yellow-400/10 group-hover:bg-yellow-400/20',
  rose: 'text-rose-400 bg-rose-400/10 group-hover:bg-rose-400/20',
};

export default function ShopByType() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Shop Paint Booth Filters by Type - Intake, Exhaust, Ceiling & More"
        description="Browse paint booth filters by type: fiberglass paint arrestors (exhaust), tacky panel filters (intake), ceiling blankets, roll media, and MERV-rated filters."
        canonical="https://pfsfilters.com/shop-by-type"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb items={[{ label: 'Shop by Type' }]} />

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Filter className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Filter Types</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4">Shop by Filter Type</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            Different positions in your spray booth require different filter types. Each card shows whether it's an <span className="text-emerald-400 font-semibold">Intake</span> or <span className="text-orange-400 font-semibold">Exhaust</span> filter.
          </p>
        </div>

        {/* Filter type grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filterTypes.map((type) => (
            <Link key={type.title} href={type.href}>
              <div className={`group border border-white/8 bg-[#0d0d0d] rounded-2xl p-6 h-full cursor-pointer transition-all duration-300 ${accentMap[type.accent]}`}>
                {/* Position badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${type.positionColor}`}>
                    {type.position}
                  </div>
                </div>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors ${iconAccentMap[type.accent]}`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <h2 className="font-bold text-lg mb-2 text-white group-hover:text-white/90">{type.title}</h2>
                <p className="text-sm text-white/40 leading-relaxed mb-4">{type.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {type.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 text-white/50 border border-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white/60 group-hover:text-white transition-all group-hover:gap-2.5">
                  Browse Products <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Intake vs Exhaust explainer */}
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Wind className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-emerald-400">Intake Filters</h3>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">Intake filters are positioned where air enters the booth — typically the ceiling, side walls, or front panels. They keep dust, insects, and airborne debris out so your paint job stays clean.</p>
          </div>
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Filter className="h-4 w-4 text-orange-400" />
              </div>
              <h3 className="font-bold text-orange-400">Exhaust Filters</h3>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">Exhaust filters capture paint overspray before it exits the booth through the exhaust plenum or pit. They protect your exhaust fan and keep your facility compliant with air quality regulations.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
