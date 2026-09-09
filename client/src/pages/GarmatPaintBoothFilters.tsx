// GarmatPaintBoothFilters — /garmat-paint-booth-filters
// Priority 8 (OEM) page from the SEO handoff (DOCX).
//
// Real Garmat data DOES exist in the repo: boothBrands.ts has a full
// `garmat-usa` entry with five models and their ceiling / exhaust / prefilter
// sizes, plus a replacement-cycle guide. No Shopify product is tagged as
// "fits Garmat", so this page does NOT claim product compatibility or any
// Garmat affiliation — it presents the repo's own booth-size reference data
// and points each filter position to the relevant PFS media page, the filter
// finder, and contact/quote. Framing matches the existing /shop-by-booth
// pages ("replacement filter media for <brand> booths").

import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Info, Wind, Filter, Layers, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { getBrandBySlug } from '@/data/boothBrands';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const PAGE_PATH = '/garmat-paint-booth-filters';
const BRAND_DETAIL_PATH = '/shop-by-booth/garmat-usa';

const garmat = getBrandBySlug('garmat-usa');

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: `${SITE}/` },
  { name: 'Shop by Booth', url: `${SITE}/shop-by-booth` },
  { name: 'Garmat Paint Booth Filters', url: `${SITE}${PAGE_PATH}` },
]);

const POSITION_LINKS: { key: 'ceiling' | 'exhaust' | 'intake' | 'prefilter'; label: string; href: string }[] = [
  { key: 'ceiling', label: 'Ceiling media', href: '/ceiling-filters' },
  { key: 'exhaust', label: 'Exhaust arrestor', href: '/exhaust-filters' },
  { key: 'intake', label: 'Intake media', href: '/intake-filters' },
  { key: 'prefilter', label: 'Prefilter', href: '/prefilters' },
];

export default function GarmatPaintBoothFilters() {
  const models = garmat?.models ?? [];

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Garmat Paint Booth Filter Guide | PFS Filters"
        description="Review model and filter-stage guidance for Garmat paint booths, then verify the installed filter label, construction, position, and dimensions before ordering."
        canonical="https://www.pfsfilters.com/garmat-paint-booth-filters"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header + H1 */}
      <section className="section-darker relative overflow-hidden pt-28 pb-10 px-4">
        <div className="pointer-events-none absolute -right-16 top-20 hidden opacity-[0.035] lg:block">
          <img src="/images/brands/pfs-logo-wide.png" alt="" className="w-[620px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <Breadcrumb
            items={[
              { label: 'Shop by Booth', href: '/shop-by-booth' },
              { label: 'Garmat Paint Booth Filters' },
            ]}
          />
          <div className="max-w-3xl mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#4d9fff]/30 bg-[#4d9fff]/10 text-xs font-bold uppercase tracking-wider text-[#4d9fff] mb-4">
              <Wind className="h-3 w-3" /> Garmat USA · Downdraft
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              Replacement Filter Guidance for Garmat Paint Booths
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              Use the model reference to organize a filter review, then confirm the installed label,
              construction, position, and actual dimensions. A model name or common size alone does
              not prove that a catalog product fits a specific booth configuration.
            </p>
          </div>
        </div>
      </section>

      {/* Not-affiliated note */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto -mt-2 mb-2 rounded-xl border border-white/12 bg-white/[0.03] p-4 flex gap-3">
          <Info className="h-5 w-5 text-white/40 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-white/60 leading-relaxed">
              PFS Filters is not affiliated with Garmat USA. &quot;Garmat&quot; is used here to identify
              the booth being serviced. Sizes below are an internal reference for organizing a review —
              booth configurations and retrofits vary, so verify the size printed on your filter
              or measured at the frame before ordering.
            </p>
            <a href="https://www.garmatspraybooths.com/3000-series" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-blue-200">
              Official Garmat 3000 Series information <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Filter sizes by Garmat model */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Garmat filter sizes by model</h2>
          <p className="text-white/45 text-sm mb-6 max-w-2xl">
            Recorded model and stage information is guidance only. Confirm it against the installed equipment and current manufacturer documentation.
          </p>

          {models.length > 0 ? (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">Ceiling, exhaust, and prefilter sizes for Garmat paint booth models</caption>
                  <thead>
                    <tr className="text-left text-white/40 text-xs uppercase tracking-wider">
                      <th scope="col" className="px-4 py-3 font-semibold">Model</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Ceiling</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Exhaust</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Prefilter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => (
                      <tr key={model.name} className="border-t border-white/[0.07] align-top">
                        <td className="px-4 py-3 text-white/85 font-medium whitespace-nowrap">{model.name}</td>
                        <td className="px-4 py-3 text-white/65">{(model.filters.ceiling ?? []).join(', ') || '—'}</td>
                        <td className="px-4 py-3 text-white/65">{(model.filters.exhaust ?? []).join(', ') || '—'}</td>
                        <td className="px-4 py-3 text-white/65">{(model.filters.prefilter ?? []).join(', ') || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-white/50">Garmat model data is available through the full booth guide.</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={BRAND_DETAIL_PATH}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                Full Garmat booth filter guide
              </Button>
            </Link>
            <Link href="/filter-finder">
              <Button variant="ghost" className="text-white/50 hover:text-white gap-2">
                Use the filter finder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      {/* Match a size to media */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Match a Garmat filter position to media</h2>
          <p className="text-white/45 text-sm mb-6 max-w-2xl">
            Once you have the size, go to the media page for that position. Confirm the exact
            dimensions against the product before ordering.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POSITION_LINKS.map((pos) => (
              <Link key={pos.key} href={pos.href}>
                <div className="glow-card group h-full p-5 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    {pos.key === 'ceiling' && <Layers className="h-4 w-4 text-blue-400" />}
                    {pos.key === 'exhaust' && <Filter className="h-4 w-4 text-blue-400" />}
                    {pos.key === 'intake' && <Wind className="h-4 w-4 text-blue-400" />}
                    {pos.key === 'prefilter' && <Layers className="h-4 w-4 text-blue-400" />}
                    <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{pos.label}</p>
                  </div>
                  <p className="text-white/45 text-sm">
                    {pos.key === 'ceiling' && 'Downdraft ceiling diffusion media'}
                    {pos.key === 'exhaust' && 'Fiberglass, Paint Pockets & Andreae arrestors'}
                    {pos.key === 'intake' && 'Tacky panels & intake media'}
                    {pos.key === 'prefilter' && 'First-stage protection for ceiling media'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-white/40 mt-4">
            If the installed filter is an accordion construction, see{' '}
            <Link href="/andreae-paint-booth-filters" className="text-blue-400 hover:text-blue-300">
              Andreae accordion filters
            </Link>{' '}
            for the variants and current product information shown in the PFS catalog.
          </p>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* SEO copy block */}
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Garmat paint booth filters — how to order the right size</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Garmat booth configurations may include ceiling, exhaust, intake, and prefilter stages.
              The stage layout depends on the model, installed options, and later modifications, so
              the equipment and current filter must be inspected before replacement.
            </p>
            <p>
              PFS Filters does not represent a universal &quot;Garmat&quot; kit. The table above lists
              internal reference records for the 3000 Series, 700 Series,
              Blackhawk, Chinook II, and Zephyr. Confirm the size printed on your current filter or
              measured at the frame before ordering — the sizes here are a starting point, not a
              guaranteed fit.
            </p>
            <p>
              To narrow a candidate, start with the filter stage: review{' '}
              <Link href="/ceiling-filters" className="text-blue-400 hover:text-blue-300">ceiling diffusion media</Link>,{' '}
              <Link href="/exhaust-filters" className="text-blue-400 hover:text-blue-300">exhaust arrestors</Link>,
              intake filters, or prefilter guidance as appropriate. Match the media construction as
              well as the dimensions. If your model is not listed or a size is unusual, use the{' '}
              <Link href="/filter-finder" className="text-blue-400 hover:text-blue-300">filter finder</Link>{' '}
              or{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">contact PFS</Link>{' '}
              for help and a quote.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/filter-finder">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                Find my filter <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                <Phone className="h-4 w-4" />
                Contact PFS for a quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      {/* Related pages */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Related filter pages</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/paint-booth-filters', label: 'All paint booth filters', sub: 'Intake, ceiling, prefilter & exhaust' },
              { href: '/shop-by-booth', label: 'Shop by booth brand', sub: 'Filter guidance by manufacturer' },
              { href: '/exhaust-filters', label: 'Paint booth exhaust filters', sub: 'Fiberglass, Paint Pockets & Andreae' },
              { href: '/intake-filters', label: 'Paint booth intake filters', sub: 'Tacky panels & ceiling media' },
              { href: '/ceiling-filters', label: 'Paint booth ceiling filters', sub: 'Downdraft diffusion media by size' },
              { href: '/prefilters', label: 'Paint booth prefilters', sub: 'First-stage media guidance' },
            ].map((card) => (
              <Link key={card.href} href={card.href}>
                <div className="glow-card group h-full p-5 cursor-pointer">
                  <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{card.label}</p>
                  <p className="text-white/45 text-sm mt-1">{card.sub}</p>
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
