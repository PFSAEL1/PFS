// Prefilters — /prefilters
// Priority 6 page from the SEO handoff (DOCX).
//
// The bundled Shopify snapshot contains NO product labeled or tagged as a
// prefilter / pre-filter / first-stage filter. Per the handoff rules this is a
// guidance page with no product grid — it explains what a prefilter does, where
// it sits in a booth, and links to the real filter-media pages. No products,
// prices, availability, or efficiency percentages are invented here. The
// No percentage improvement is claimed without product- and system-specific evidence.

import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Layers, ArrowRight, Phone } from 'lucide-react';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: `${SITE}/` },
  { name: 'Paint Booth Filters', url: `${SITE}/paint-booth-filters` },
  { name: 'Paint Booth Prefilters', url: `${SITE}/prefilters` },
]);

const RELATED = [
  { href: '/paint-booth-filters', label: 'All paint booth filters', sub: 'Intake, ceiling, prefilter & exhaust' },
  { href: '/intake-filters', label: 'Paint booth intake filters', sub: 'Tacky panels & ceiling media' },
  { href: '/ceiling-filters', label: 'Paint booth ceiling filters', sub: 'Downdraft diffusion media by size' },
  { href: '/exhaust-filters', label: 'Paint booth exhaust filters', sub: 'Fiberglass, Paint Pockets & Andreae' },
  { href: '/category/merv-filters', label: 'MERV-rated filters', sub: 'Pleated panels for air-makeup units' },
  { href: '/category/tacky-panels', label: 'Tacky panel filters', sub: 'Adhesive-coated intake panels' },
];

export default function Prefilters() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Prefilters & First-Stage Filter Guidance"
        description="Learn where paint booth prefilters and first-stage media may be used, what details to verify, and when a multi-stage arrangement needs review."
        canonical="https://www.pfsfilters.com/prefilters"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header + H1 */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Paint Booth Filters', href: '/paint-booth-filters' },
              { label: 'Prefilters' },
            ]}
          />
          <div className="max-w-3xl mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              <Layers className="h-3 w-3" /> First stage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              Paint Booth Prefilters &amp; First-Stage Filter Guidance
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              A prefilter is a first-stage filter used ahead of downstream media when the booth or
              air-makeup system is designed for that arrangement. Learn what it does, where it may sit,
              and which details must be verified before choosing media.
            </p>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Main content — SEO copy block (this page has no product grid) */}
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">How paint booth prefilters work</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              A prefilter is a first-stage filter that sits ahead of a more expensive final filter.
              Its job is to catch the larger particles — dust, lint, insects, coarse overspray — so
              the ceiling media or exhaust arrestor downstream only has to handle the fine material.
              A correctly specified first stage may reduce coarse loading on downstream media. The
              actual effect depends on the system, media, airflow, contaminants, sealing, operating
              conditions, and maintenance practices; no universal life-extension percentage applies.
            </p>
            <p>
              Where a prefilter goes depends on the booth. In a downdraft booth it usually sits above
              the ceiling diffusion media in the plenum. On an air-makeup unit it is the first panel
              in the bank, ahead of the final MERV filter. On the exhaust side, a lighter arrestor
              pad is sometimes run in front of a denser final media for the same reason.
            </p>
            <p>
              PFS Filters does not currently stock a product labeled specifically as a
              &quot;prefilter.&quot; If you are setting up a two-stage arrangement, tell us the booth
              and the downstream filter and we will help match a first-stage media to it. Custom
              requests can be reviewed when the current catalog does not show a suitable option.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/contact">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                <Phone className="h-4 w-4" />
                Ask about a two-stage setup
              </Button>
            </Link>
            <Link href="/paint-booth-filters">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                All paint booth filters
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      {/* Related filter media */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Filter media by stage</h2>
          <p className="text-white/45 text-sm mb-6 max-w-2xl">
            Browse related media by booth stage. Do not substitute a lighter grade as a prefilter
            unless the equipment documentation or a qualified system review supports that arrangement.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RELATED.map((card) => (
              <Link key={card.href} href={card.href}>
                <div className="glow-card group h-full p-5 cursor-pointer">
                  <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{card.label}</p>
                  <p className="text-white/45 text-sm mt-1">{card.sub}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/shop">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                Browse all filters <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                <Phone className="h-4 w-4" />
                Contact PFS Filters
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      <Footer />
    </div>
  );
}
