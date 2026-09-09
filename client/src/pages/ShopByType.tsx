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
  { name: 'Home', url: 'https://www.pfsfilters.com' },
  { name: 'Shop by Type', url: 'https://www.pfsfilters.com/shop-by-type' },
]);

const filterTypes = [
  {
    title: 'Paint Booth Exhaust Filters',
    position: 'EXHAUST',
    desc: 'Browse fiberglass pads and rolls, Paint Pockets, and accordion-style arrestor media shown in the current PFS catalog.',
    href: '/exhaust-filters',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png',
    tags: ['Fiberglass', 'Paint Pockets', 'Andreae Style'],
  },
  {
    title: 'Paint Booth Intake Filters',
    position: 'INTAKE',
    desc: 'Compare tacky panels, pleated filters, pocket bags, and ceiling media used in applicable incoming-air stages.',
    href: '/intake-filters',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png',
    tags: ['Tacky Panels', 'Pleated', 'Pocket Bags'],
  },
  {
    title: 'Paint Booth Ceiling Filters',
    position: 'INTAKE',
    desc: 'Review ceiling diffusion media for applicable downdraft and semi-downdraft booths, then confirm construction and dimensions.',
    href: '/ceiling-filters',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp',
    tags: ['Ceiling', 'Diffusion Media', 'Confirm Size'],
  },
  {
    title: 'Roll Media',
    position: 'INTAKE / EXHAUST',
    desc: 'Roll filtration media in the widths, lengths, and constructions shown in the current catalog. Confirm the filter stage, media, and dimensions before ordering.',
    href: '/category/roll-media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
    tags: ['Roll Media', 'Multiple Sizes', 'Bulk'],
  },
  {
    title: 'MERV-Rated Filters',
    position: 'INTAKE',
    desc: 'Browse pleated filters using the MERV ratings and dimensions shown in the current product record, then confirm the required equipment stage.',
    href: '/category/merv-filters',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/merv-10-filter_b09cab34.png',
    tags: ['MERV-10', 'MERV-13', 'Industrial'],
  },
  {
    title: 'Andreae-Style Accordion Filters',
    position: 'EXHAUST',
    desc: 'See the current pad and roll variants for accordion-style paint arrestor media, with catalog pricing and availability.',
    href: '/andreae-paint-booth-filters',
    image: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/ChatGPTImageMay8_2026_02_21_15PM.png?v=1778275424',
    tags: ['Accordion', 'Pads', 'Rolls'],
  },
  {
    title: 'Pre-Filters',
    position: 'INTAKE',
    desc: 'Learn how a documented first-stage filter can reduce loading on downstream media when the booth or air-makeup system is designed for it.',
    href: '/prefilters',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
    tags: ['First Stage', 'System-Specific', 'Verify Media'],
  },
];

export default function ShopByType() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Shop Paint Booth Filters by Type - Intake, Exhaust, Ceiling & More"
        description="Browse paint booth filters by type: fiberglass paint arrestors (exhaust), tacky panel filters (intake), ceiling blankets, roll media, and MERV-rated filters."
        canonical="https://www.pfsfilters.com/shop-by-type"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop by Type' }]} />
          <div className="mb-4">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Filter Types</p>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
              Shop by Filter Type
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Each position in your spray booth requires a specific filter type. Cards show whether a filter is for <span className="text-white/70 font-medium">Intake</span> or <span className="text-white/70 font-medium">Exhaust</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Filter type grid - raised */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filterTypes.map((type) => (
              <Link key={type.title} href={type.href}>
                <div className="group border border-white/8 bg-white/[0.03] rounded-2xl overflow-hidden h-full cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
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
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      {/* Intake vs Exhaust explainer - glow */}
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
              <p className="text-sm text-white/70 leading-relaxed">Positioned where air enters the booth — ceiling, side walls, or front panels. They keep dust, insects, and airborne debris out so your paint job stays clean.</p>
            </div>
            <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white/60" />
                </div>
                <h3 className="font-bold text-white">Exhaust Filters</h3>
                <span className="ml-auto text-xs text-white/50 border border-white/15 bg-white/5 px-2 py-0.5 rounded-full">EXHAUST</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">Capture paint overspray before air passes into the exhaust plenum or pit. Filter selection is one part of a complete booth, ventilation, maintenance, and compliance program.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      <Footer />
    </div>
  );
}
