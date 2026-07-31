import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Wind, Filter, Layers, Box, Ruler, Droplets } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Filter Type', url: 'https://pfsfilters.com/shop-by-filter-type' },
]);

const filterCategories = [
  {
    title: 'Fiberglass Paint Arrestors',
    position: 'EXHAUST',
    desc: 'Progressive-density glass fiber media that captures overspray before it exits the booth. The industry workhorse — cost-effective, high-capacity, and available in pads, rolls, and cases.',
    href: '/category/fiberglass-arrestors',
    icon: Filter,
    sizes: ['20"×20"', '20"×25"', '24"×24"', 'Roll: 36"×300\'', 'Roll: 41"×300\''],
    tags: ['Exhaust', 'High Volume', 'Most Popular'],
  },
  {
    title: 'Ceiling Diffusion Media',
    position: 'INTAKE',
    desc: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, uniform laminar airflow from ceiling to floor — critical for a dust-free paint environment.',
    href: '/category/ceiling-blankets',
    icon: Layers,
    sizes: ['38"×62"', '38"×107"', '48"×108"', '51"×128"', '59"×149"'],
    tags: ['Intake', 'Ceiling', 'Downdraft'],
  },
  {
    title: 'Tacky Intake Panels',
    position: 'INTAKE',
    desc: 'Adhesive-coated panels trap dust, debris, and airborne particles at the intake. Keeps contaminants out of your booth so your finish stays flawless from the first coat.',
    href: '/category/tacky-panels',
    icon: Wind,
    sizes: ['20"×20"', '20"×25"', '24"×24"'],
    tags: ['Intake', 'High Efficiency', 'Premium'],
  },
  {
    title: 'Polyester Exhaust Pads',
    position: 'EXHAUST',
    desc: 'Durable synthetic filtration media with excellent moisture resistance. Ideal for high-humidity environments, water-based coatings, and shops needing longer filter life.',
    href: '/category/polyester-media',
    icon: Droplets,
    sizes: ['20"×20"', '20"×25"', '24"×24"', 'Roll: 48"×300\''],
    tags: ['Synthetic', 'Moisture Resistant', 'Long Life'],
  },
  {
    title: 'MERV-Rated Pleated Filters',
    position: 'INTAKE',
    desc: 'High-efficiency pleated filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options for industrial coating operations with strict air quality requirements.',
    href: '/category/merv-filters',
    icon: Box,
    sizes: ['20"×20"×2"', '20"×25"×2"', '24"×24"×2"', '20"×20"×4"'],
    tags: ['MERV-10', 'MERV-13', 'Industrial'],
  },
  {
    title: 'Roll Media',
    position: 'INTAKE / EXHAUST',
    desc: 'Continuous roll filtration cut to any length for any booth configuration. Available in fiberglass, polyester, and synthetic blends for both intake and exhaust positions.',
    href: '/category/roll-media',
    icon: Ruler,
    sizes: ['36"×300\'', '41"×300\'', '48"×300\'', '60"×300\'', '96"×50\''],
    tags: ['Custom Cut', 'Bulk', 'Flexible'],
  },
  {
    title: 'Pre-Filters',
    position: 'INTAKE',
    desc: 'First-stage filtration that extends the life of your primary ceiling media. Catches large particles before they reach your expensive diffusion blankets.',
    href: '/shop?category=pre-filters',
    icon: Filter,
    sizes: ['20"×20"×2"', '24"×24"×2"', '24"×24"×4"'],
    tags: ['Pre-Filter', 'Cost Savings', 'Protection'],
  },
  {
    title: 'Aerospace & HEPA Media',
    position: 'INTAKE / EXHAUST',
    desc: 'High-efficiency filtration for aerospace, MRO, and chromate-capture applications. HEPA-XFP multi-pocket bags, NESHAP 319 final-stage bags, and CPA roll media.',
    href: '/aerospace',
    icon: Layers,
    sizes: ['20"×25"×12"', '24"×24"×12"', '20"×20"×15"', '96"×50\''],
    tags: ['HEPA', 'NESHAP 319', 'Aerospace'],
  },
];

export default function ShopByFilterType() {
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
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop by Filter Type' }]} />
          <div className="mb-4">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Filter Categories</p>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
              Shop by Filter Type
            </h1>
            <p className="text-lg text-white/70 max-w-3xl">
              Each position in your spray booth requires a specific filter type. Cards show whether a filter is for <span className="text-white font-medium">Intake</span> (incoming air) or <span className="text-white font-medium">Exhaust</span> (overspray capture).
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Filter type grid */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {filterCategories.map((type) => {
              const Icon = type.icon;
              return (
                <Link key={type.title} href={type.href}>
                  <div className="group border border-white/8 bg-white/[0.03] rounded-2xl p-6 h-full cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white/60" />
                        </div>
                        <div>
                          <h2 className="font-bold text-base text-white group-hover:text-white/90">{type.title}</h2>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${
                        type.position === 'EXHAUST'
                          ? 'bg-white/8 border-white/20 text-white/70'
                          : type.position === 'INTAKE'
                          ? 'bg-[#4d9fff]/10 border-[#4d9fff]/30 text-[#4d9fff]'
                          : 'bg-white/5 border-white/15 text-white/50'
                      }`}>
                        {type.position}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mb-4">{type.desc}</p>
                    {/* Common sizes */}
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">Common Sizes</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {type.sizes.map((size) => (
                          <span key={size} className="text-xs bg-white/5 text-white/60 border border-white/8 px-2 py-0.5 rounded-full">{size}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {type.tags.map((tag) => (
                          <span key={tag} className="text-xs text-white/40">{tag}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-sm font-semibold text-white/50 group-hover:text-white transition-all group-hover:gap-2">
                        Shop <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intake vs Exhaust explainer */}
      <div className="arc-divider arc-divider-down" />
      <section className="section-glow tex-lines py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#4d9fff]/10 border border-[#4d9fff]/20 flex items-center justify-center">
                  <Wind className="h-4 w-4 text-[#4d9fff]" />
                </div>
                <h3 className="font-bold text-white">Intake Filters</h3>
                <span className="ml-auto text-xs text-[#4d9fff] border border-[#4d9fff]/20 bg-[#4d9fff]/8 px-2 py-0.5 rounded-full">INTAKE</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">Positioned where air enters the booth — ceiling, side walls, or front panels. They keep dust, insects, and airborne debris out so your paint job stays clean. Includes ceiling media, tacky panels, and pre-filters.</p>
            </div>
            <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white/60" />
                </div>
                <h3 className="font-bold text-white">Exhaust Filters</h3>
                <span className="ml-auto text-xs text-white/50 border border-white/15 bg-white/5 px-2 py-0.5 rounded-full">EXHAUST</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">Capture paint overspray before it exits through the exhaust plenum or pit. Protect your exhaust fan, keep your facility compliant with air quality regulations, and prevent environmental contamination.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />
      <Footer />
    </div>
  );
}
