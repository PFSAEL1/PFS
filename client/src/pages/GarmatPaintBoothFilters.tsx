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
import { Info, Wind, Filter, Layers, Clock, Phone, ArrowRight } from 'lucide-react';
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
  const cycle = garmat?.replacementCycle;

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Garmat Paint Booth Replacement Filters — In Stock, Ships Fast | PFS Filters"
        description="Replacement filter sizes for Garmat paint booths by model — 3000 Series, 700 Series, Blackhawk, Chinook II, Zephyr. Match a size to PFS booth media."
        canonical="https://www.pfsfilters.com/garmat-paint-booth-filters"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header + H1 */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
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
              Replacement Filters for Garmat Paint Booths — In Stock
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              PFS Filters stocks the ceiling, exhaust, and prefilter media that Garmat downdraft
              booths use, cut to common Garmat sizes. Find your model below, confirm the size on your
              current filter, and match it to the right media.
            </p>
          </div>
        </div>
      </section>

      {/* Not-affiliated note */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto -mt-2 mb-2 rounded-xl border border-white/12 bg-white/[0.03] p-4 flex gap-3">
          <Info className="h-5 w-5 text-white/40 shrink-0 mt-0.5" />
          <p className="text-sm text-white/60 leading-relaxed">
            PFS Filters is not affiliated with Garmat USA. &quot;Garmat&quot; is used here to identify
            the booth these replacement filters fit. Sizes below are a reference from public booth
            data — booth configurations and retrofits vary, so verify the size printed on your filter
            or measured at the frame before ordering.
          </p>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Filter sizes by Garmat model */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Garmat filter sizes by model</h2>
          <p className="text-white/45 text-sm mb-6 max-w-2xl">
            {garmat?.description}
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

          {cycle && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-blue-400" /> Typical replacement (public guidance):
              </span>
              {cycle.intake && <span>intake {cycle.intake}</span>}
              {cycle.exhaust && <span>exhaust {cycle.exhaust}</span>}
              {cycle.ceiling && <span>ceiling {cycle.ceiling}</span>}
            </div>
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
            Garmat exhaust positions are often 20&quot;×20&quot; or 20&quot;×25&quot; — see{' '}
            <Link href="/andreae-paint-booth-filters" className="text-blue-400 hover:text-blue-300">
              Andreae accordion filters
            </Link>{' '}
            for a higher-efficiency option.
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
              Garmat USA builds downdraft spray booths for automotive refinish, dealership, and fleet
              shops across North America. Its booths use three filter positions: ceiling diffusion
              media in the roof plenum, exhaust arrestor media on the outlet, and a prefilter ahead of
              the ceiling media on many models.
            </p>
            <p>
              PFS Filters does not sell a &quot;Garmat&quot; kit. It stocks the filter media that
              downdraft booths use, cut to the sizes those models take. The table above lists the
              ceiling, exhaust, and prefilter sizes recorded for the 3000 Series, 700 Series,
              Blackhawk, Chinook II, and Zephyr. Confirm the size printed on your current filter or
              measured at the frame before ordering — the sizes here are a starting point, not a
              guaranteed fit.
            </p>
            <p>
              To match a size to media: ceiling openings such as 38&quot;×62&quot;, 38&quot;×67&quot;,
              and 38&quot;×107&quot; pair with{' '}
              <Link href="/ceiling-filters" className="text-blue-400 hover:text-blue-300">ceiling diffusion media</Link>;
              20&quot;×20&quot; and 20&quot;×25&quot; exhaust positions pair with{' '}
              <Link href="/exhaust-filters" className="text-blue-400 hover:text-blue-300">fiberglass paint arrestors</Link>{' '}
              or Andreae accordion filters; prefilter positions such as 24&quot;×24&quot; pair with
              pleated MERV panels. If your model is not listed or a size is unusual, use the{' '}
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
