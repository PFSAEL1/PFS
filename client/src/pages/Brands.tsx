import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Award } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com' },
  { name: 'Brands', url: 'https://www.pfsfilters.com/brands' },
]);

const brands = [
  {
    name: 'PFS Filters',
    description: 'PFS Filters catalog products and replacement guidance, backed by the PFS Spray Booths team in Santa Rosa, California.',
    specialty: 'Spray Booth Specialists',
    href: '/shop',
  },
  {
    name: 'Andover Healthcare',
    description: 'Fiberglass and synthetic filter-media products represented in the current PFS catalog. Verify the product record and application before ordering.',
    specialty: 'Industrial Grade Media',
    href: '/shop',
  },
  {
    name: 'Koch Filter',
    description: 'MERV-rated filtration products represented in the current PFS catalog. Confirm the stage, rating, depth, and dimensions required by the equipment.',
    specialty: 'MERV-Rated Filters',
    href: '/shop',
  },
  {
    name: 'Permatron',
    description: 'Synthetic filtration products represented in the current PFS catalog. Use the current product data rather than a brand name alone to select media.',
    specialty: 'Synthetic Media',
    href: '/shop',
  },
];

const boothGuides = [
  { name: 'PFS Spray Booths', href: '/pfs-spray-booth-filters', description: 'Direct model and fitment-review path through the PFS team.' },
  { name: 'Garmat', href: '/garmat-paint-booth-filters', description: 'Model, filter-stage, and measurement guidance for Garmat booths.' },
  { name: 'Accudraft', href: '/accudraft-paint-booth-filters', description: 'Filter-stage guidance and a documented replacement-review workflow.' },
  { name: 'Global Finishing Solutions', href: '/gfs-paint-booth-filters', description: 'GFS booth family and filter-position guidance with fitment boundaries.' },
  { name: 'Col-Met', href: '/col-met-paint-booth-filters', description: 'Guidance for enclosed booths, open-face booths, and prep stations.' },
];

export default function Brands() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Filter Brands - PFS Filters, Koch, Permatron & More"
        description="Browse paint booth filter and media brands represented in the current PFS Filters catalog. Verify the product record, filter stage, and dimensions before ordering."
        canonical="https://www.pfsfilters.com/brands"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Brands' }]} />
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 mb-4">
              <Award className="h-3.5 w-3.5 text-white/50" />
              <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Trusted Brands</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Filter Brands We Carry</h1>
            <p className="text-xl text-white/50 max-w-2xl">
              Browse manufacturers represented in the current catalog, then verify the product record, filter stage, and dimensions before ordering.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Brand cards - raised */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {brands.map((brand) => (
              <div key={brand.name} className="border border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-bold text-xl text-white">{brand.name}</h2>
                  <span className="text-xs bg-white/5 text-white/50 border border-white/10 px-2 py-1 rounded-full">{brand.specialty}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{brand.description}</p>
                <Link href={brand.href}>
                  <Button variant="outline" size="sm" className="gap-2 border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent">
                    Shop Products <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <section className="section-glow tex-lines py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-9">
            <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Booth manufacturer guides</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Replacement guidance by booth brand</h2>
            <p className="text-white/55 leading-relaxed">Use these pages to identify the likely filter stage and organize model information. Confirm the installed media, label, and actual dimensions before ordering.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boothGuides.map((guide) => (
              <Link key={guide.href} href={guide.href}>
                <div className="glow-card group h-full p-5">
                  <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors mb-2">{guide.name}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{guide.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400">Open guide <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      <Footer />
    </div>
  );
}
