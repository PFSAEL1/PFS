// ShopByType — PFS Filters Tesla-Style Dark Theme
// Real product photos, monochrome silver/white/steel-blue palette
// Correct intake/exhaust position labels
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Wind, Filter } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Type', url: 'https://pfsfilters.com/shop-by-type' },
]);

const filterTypes = [
  {
    title: 'Fiberglass Paint Arrestors',
    position: 'EXHAUST',
    desc: 'Progressive-density glass fiber media captures overspray before it exits the booth. The industry standard for exhaust filtration — cost-effective, high-capacity, and available in all standard sizes.',
    href: '/category/fiberglass-arrestors',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png',
    tags: ['Exhaust', 'High Volume', 'Cost-Effective'],
  },
  {
    title: 'Tacky Panel Filters',
    position: 'INTAKE',
    desc: 'Adhesive-coated panels trap dust, debris, and airborne particles at the intake. Keeps contaminants out of your booth so your finish stays flawless from the first coat.',
    href: '/category/tacky-panels',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png',
    tags: ['Intake', 'High Efficiency', 'Premium'],
  },
  {
    title: 'Ceiling Blankets',
    position: 'INTAKE',
    desc: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor — critical for a dust-free paint environment.',
    href: '/category/ceiling-blankets',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp',
    tags: ['Intake', 'Ceiling', 'Downdraft'],
  },
  {
    title: 'Roll Media',
    position: 'INTAKE / EXHAUST',
    desc: 'Continuous roll filtration cut to any length for any booth configuration. Available in multiple densities for both intake and exhaust positions — ideal for bulk orders.',
    href: '/category/roll-media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
    tags: ['Custom Cut', 'Flexible', 'Bulk'],
  },
  {
    title: 'MERV-Rated Filters',
    position: 'INTAKE',
    desc: 'High-efficiency filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options for industrial coating operations with strict air quality requirements.',
    href: '/category/merv-filters',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/merv-10-filter_b09cab34.png',
    tags: ['MERV-10', 'MERV-13', 'Industrial'],
  },
  {
    title: 'Polyester Media',
    position: 'EXHAUST',
    desc: 'Durable synthetic filtration media with excellent moisture resistance. Ideal for high-humidity environments and water-based coatings in exhaust positions.',
    href: '/category/polyester-media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids_294ef927.jpg',
    tags: ['Synthetic', 'Moisture Resistant', 'Durable'],
  },
];

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
          <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Filter Types</p>
          <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
            Shop by Filter Type
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Each position in your spray booth requires a specific filter type. Cards show whether a filter is for <span className="text-white/70 font-medium">Intake</span> or <span className="text-white/70 font-medium">Exhaust</span>.
          </p>
        </div>

        {/* Filter type grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filterTypes.map((type) => (
            <Link key={type.title} href={type.href}>
              <div className="group border border-white/8 bg-[#0d0d0d] rounded-2xl overflow-hidden h-full cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-[#111] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                {/* Product image */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                  />
                  {/* Position badge overlay */}
                  <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${
                    type.position === 'EXHAUST'
                      ? 'bg-white/8 border-white/20 text-white/70'
                      : type.position === 'INTAKE'
                      ? 'bg-[#4d9fff]/10 border-[#4d9fff]/30 text-[#4d9fff]'
                      : 'bg-white/5 border-white/15 text-white/50'
                  }`}>
                    {type.position}
                  </div>
                </div>
                {/* Content */}
                <div className="p-5 border-t border-white/5">
                  <h2 className="font-bold text-base text-white mb-2 group-hover:text-white/90">{type.title}</h2>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{type.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {type.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/5 text-white/70 border border-white/8 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-white/50 group-hover:text-white transition-all group-hover:gap-2.5">
                    Browse Products <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Intake vs Exhaust explainer */}
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          <div className="bg-[#0d0d0d] border border-white/8 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#4d9fff]/10 border border-[#4d9fff]/20 flex items-center justify-center">
                <Wind className="h-4 w-4 text-[#4d9fff]" />
              </div>
              <h3 className="font-bold text-white">Intake Filters</h3>
              <span className="ml-auto text-xs text-[#4d9fff] border border-[#4d9fff]/20 bg-[#4d9fff]/8 px-2 py-0.5 rounded-full">INTAKE</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">Positioned where air enters the booth — ceiling, side walls, or front panels. They keep dust, insects, and airborne debris out so your paint job stays clean.</p>
          </div>
          <div className="bg-[#0d0d0d] border border-white/8 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                <Filter className="h-4 w-4 text-white/60" />
              </div>
              <h3 className="font-bold text-white">Exhaust Filters</h3>
              <span className="ml-auto text-xs text-white/50 border border-white/15 bg-white/5 px-2 py-0.5 rounded-full">EXHAUST</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">Capture paint overspray before it exits through the exhaust plenum or pit. Protect your exhaust fan and keep your facility compliant with air quality regulations.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
