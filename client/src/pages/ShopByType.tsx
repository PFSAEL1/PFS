// Real product photos, monochrome silver/white/steel-blue palette
// Correct intake/exhaust position labels
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/imageUrls';
import { Wind, Filter } from 'lucide-react';
import { LineupCard, LineupCarousel, tintFor } from '@/components/Lineup';

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
    image: '/images/cat_fiberglass_arrestors.png',
    tags: ['Fiberglass', 'Paint Pockets', 'Andreae Style'],
  },
  {
    title: 'Paint Booth Intake Filters',
    position: 'INTAKE',
    desc: 'Compare tacky panels, pleated filters, pocket bags, and ceiling media used in applicable incoming-air stages.',
    href: '/intake-filters',
    image: '/images/cat_tacky_panels.png',
    tags: ['Tacky Panels', 'Pleated', 'Pocket Bags'],
  },
  {
    title: 'Paint Booth Ceiling Filters',
    position: 'INTAKE',
    desc: 'Review ceiling diffusion media for applicable downdraft and semi-downdraft booths, then confirm construction and dimensions.',
    href: '/ceiling-filters',
    image: '/images/cat_ceiling_blankets.png',
    tags: ['Ceiling', 'Diffusion Media', 'Confirm Size'],
  },
  {
    title: 'Roll Media',
    position: 'INTAKE / EXHAUST',
    desc: 'Roll filtration media in the widths, lengths, and constructions shown in the current catalog. Confirm the filter stage, media, and dimensions before ordering.',
    href: '/category/roll-media',
    image: '/images/cat_roll_media.png',
    tags: ['Roll Media', 'Multiple Sizes', 'Bulk'],
  },
  {
    title: 'MERV-Rated Filters',
    position: 'INTAKE',
    desc: 'Browse pleated filters using the MERV ratings and dimensions shown in the current product record, then confirm the required equipment stage.',
    href: '/category/merv-filters',
    image: '/images/filters/merv-pleated.jpg',
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
    image: '/images/cat_roll_media.png',
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
          <div className="mb-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="normal-case text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Shop by Filter Type
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/70">
                Each position in your spray booth requires a specific filter type. Cards show whether a filter is for intake or exhaust.
              </p>
            </div>
            <Link href="/shop" className="inline-flex min-h-11 shrink-0 items-center text-base font-medium text-[#0081f2] hover:underline md:text-lg">
              Shop all <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>


      {/* Filter type grid - raised */}
      <section className="section-raised py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <LineupCarousel label="Filter types">
            {filterTypes.map((type, index) => (
              <LineupCard
                key={type.title}
                href={type.href}
                title={type.title}
                description={type.desc}
                kicker={type.position === 'INTAKE / EXHAUST' ? 'Intake / Exhaust' : type.position === 'EXHAUST' ? 'Exhaust' : 'Intake'}
                image={type.image}
                alt={type.title}
                tint={tintFor(`${type.title} ${type.position}`, index)}
                width={900}
                height={900}
                sizes="300px"
                loading={index < 2 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                fallbackSrc={DEFAULT_PRODUCT_IMAGE}
              />
            ))}
          </LineupCarousel>
        </div>
      </section>


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


      <Footer />
    </div>
  );
}
