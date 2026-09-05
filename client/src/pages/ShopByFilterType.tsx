import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Wind, Filter } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Filter Type', url: 'https://pfsfilters.com/shop-by-filter-type' },
]);

const filterCategories = [
  {
    title: 'Fiberglass Paint Arrestors',
    position: 'EXHAUST',
    desc: 'Progressive-density glass fiber media that captures overspray before it exits the booth. The industry workhorse for automotive and industrial finishing.',
    href: '/category/fiberglass-arrestors',
    image: '/images/filters/fiberglass-arrestors.png',
    tags: ['Most Popular', 'High Volume'],
    featured: true,
  },
  {
    title: 'Ceiling Diffusion Media',
    position: 'INTAKE',
    desc: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, uniform laminar airflow from ceiling to floor.',
    href: '/category/ceiling-blankets',
    image: '/images/filters/ceiling-diffusion.jpg',
    tags: ['Downdraft', 'Premium'],
    featured: true,
  },
  {
    title: 'Tacky Intake Panels',
    position: 'INTAKE',
    desc: 'Adhesive-coated panels trap dust, debris, and airborne particles at the intake. Keeps contaminants out for a flawless finish.',
    href: '/category/tacky-panels',
    image: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/tacky-panel-green_7675d2dd-699a-43c3-995e-43de1e536727.png?v=1775862087',
    tags: ['High Efficiency', 'Premium'],
    featured: false,
  },
  {
    title: 'Polyester Exhaust Pads',
    position: 'EXHAUST',
    desc: 'Durable synthetic filtration with excellent moisture resistance. Ideal for high-humidity environments and water-based coatings.',
    href: '/category/polyester-media',
    image: '/images/filters/polyester-exhaust.png',
    tags: ['Moisture Resistant', 'Long Life'],
    featured: false,
  },
  {
    title: 'MERV-Rated Pleated Filters',
    position: 'INTAKE',
    desc: 'High-efficiency pleated filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options available.',
    href: '/category/merv-filters',
    image: '/images/filters/merv-pleated.jpg',
    tags: ['MERV-10', 'MERV-13', 'Industrial'],
    featured: false,
  },
  {
    title: 'Roll Media',
    position: 'INTAKE / EXHAUST',
    desc: 'Roll filtration media in the widths, lengths, and constructions shown in the current catalog. Verify the intended filter stage before ordering.',
    href: '/category/roll-media',
    image: '/images/filters/roll-media.jpg',
    tags: ['Roll Media', 'Bulk'],
    featured: false,
  },
  {
    title: 'Pre-Filters',
    position: 'INTAKE',
    desc: 'First-stage filtration that extends the life of your primary ceiling media. Catches large particles before they reach expensive diffusion blankets.',
    href: '/shop?category=pre-filters',
    image: '/images/filters/pre-filters.webp',
    tags: ['Cost Savings', 'Protection'],
    featured: false,
  },
  {
    title: 'Aerospace & HEPA Media',
    position: 'INTAKE / EXHAUST',
    desc: 'High-efficiency filtration for aerospace, MRO, and chromate-capture applications. HEPA-XFP multi-pocket bags and NESHAP 319 final-stage bags.',
    href: '/aerospace',
    image: '/images/filters/aerospace-hepa.png',
    tags: ['HEPA', 'NESHAP 319', 'Aerospace'],
    featured: false,
  },
];

function PositionBadge({ position }: { position: string }) {
  const style = position === 'EXHAUST'
    ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    : position === 'INTAKE'
    ? 'bg-[#4d9fff]/20 text-[#4d9fff] border-[#4d9fff]/30'
    : 'bg-purple-500/20 text-purple-400 border-purple-500/30';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${style}`}>
      {position}
    </span>
  );
}

export default function ShopByFilterType() {
  const featured = filterCategories.filter(c => c.featured);
  const rest = filterCategories.filter(c => !c.featured);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Shop Paint Booth Filters by Filter Type — Fiberglass, Ceiling, Intake, Exhaust | PFS Filters"
        description="Browse paint booth filters by type: fiberglass paint arrestors, ceiling diffusion media, tacky intake panels, polyester pads, MERV-rated pleated filters, roll media, pre-filters, and aerospace HEPA media."
        canonical="https://pfsfilters.com/shop-by-filter-type"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop by Filter Type' }]} />
          <div className="mb-4">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Filter Categories</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
              Shop by Filter Type
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Each position in your spray booth requires a specific filter type. Select a category below to browse available sizes and options.
            </p>
          </div>
        </div>
      </section>

      {/* Featured - 2 large hero cards */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((cat) => (
              <Link key={cat.title} href={cat.href}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#4d9fff]/40 transition-all duration-300 cursor-pointer h-[420px]">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                  {/* Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Position badge */}
                  <div className="absolute top-5 right-5 z-20">
                    <PositionBadge position={cat.position} />
                  </div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 z-20">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#4d9fff] transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80">{tag}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-2 text-[#4d9fff] font-semibold text-sm group-hover:gap-3 transition-all">
                        Shop <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining categories - 3-column image cards */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((cat) => (
              <Link key={cat.title} href={cat.href}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#4d9fff]/40 transition-all duration-300 cursor-pointer h-[340px]">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10" />
                  {/* Image */}
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Position badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <PositionBadge position={cat.position} />
                  </div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#4d9fff] transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-white/60 text-xs mb-3 line-clamp-2">{cat.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/70">{tag}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1.5 text-[#4d9fff] font-semibold text-sm group-hover:gap-2.5 transition-all">
                        Shop <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Intake vs Exhaust explainer */}
      <section className="px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#4d9fff]/10 to-transparent border border-[#4d9fff]/20 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#4d9fff]/15 border border-[#4d9fff]/25 flex items-center justify-center">
                  <Wind className="h-5 w-5 text-[#4d9fff]" />
                </div>
                <h3 className="text-xl font-bold text-white">Intake Filters</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Positioned where air enters the booth — ceiling, side walls, or front panels. They keep dust, insects, and airborne debris out so your paint job stays clean. Includes ceiling media, tacky panels, and pre-filters.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
                  <Filter className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Exhaust Filters</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Capture paint overspray before it exits through the exhaust plenum or pit. Protect your exhaust fan, keep your facility compliant with air quality regulations, and prevent environmental contamination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
