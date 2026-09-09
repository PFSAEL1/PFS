// NeshapCompliantPaintBoothFilters — /neshap-compliant-paint-booth-filters
// Priority 7 page from the SEO handoff (DOCX).
//
// COMPLIANCE-SENSITIVE. No product in the bundled Shopify snapshot is labeled,
// tagged, tested, or described as "NESHAP 6H rated" or "compliant" — the only
// NESHAP-adjacent products are the aerospace Method 319 final-stage bags/panels.
// So this page carries NO compliance badges on products, NO "6H-rated" labels,
// and NO claim that any filter by itself makes a facility compliant. Body copy
// reuses PFS's own established wording (faqData.json, the Method 319 blog post,
// llms.txt). The two-tier structure follows the DOCX:
//   1. NESHAP 6H (surface coating) — explanation + the real exhaust arrestor
//      media PFS stocks, with View-product links only.
//   2. Aerospace & Method 319 — no grid, no prices, no buy button, call/contact.

import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Plane, Phone, ArrowRight, Info } from 'lucide-react';
import { bundledShopifyProducts } from '@/lib/productCatalog';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const PAGE_PATH = '/neshap-compliant-paint-booth-filters';
const FALLBACK_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

const ARRESTOR_TITLE_HINT = /fiberglass|paint arrestor|paint pockets|accordion/i;

const exhaustArrestors = bundledShopifyProducts
  .filter((product) => {
    const node = product.node;
    const title = node.title.toLowerCase();
    const type = (node.productType || '').toLowerCase();
    const tags = (node.tags || []).map((tag) => tag.toLowerCase());
    if (title.includes('membership')) return false;
    if (type === 'accessories' || type === 'consumables') return false;
    return tags.includes('exhaust-filters') || ARRESTOR_TITLE_HINT.test(node.title);
  })
  .map((product) => {
    const node = product.node;
    const amount = node.priceRange?.minVariantPrice?.amount;
    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      image: node.images?.edges?.[0]?.node?.url ?? FALLBACK_IMAGE,
      minPrice: amount ? parseFloat(amount) : null,
      currency: node.priceRange?.minVariantPrice?.currencyCode ?? 'USD',
      sizes: node.variants?.edges?.length ?? 0,
    };
  });

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: `${SITE}/` },
  { name: 'Paint Booth Filters', url: `${SITE}/paint-booth-filters` },
  { name: 'NESHAP Compliant Paint Booth Filters', url: `${SITE}${PAGE_PATH}` },
]);

export default function NeshapCompliantPaintBoothFilters() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="NESHAP Compliant Paint Booth Filters — 6H & Method 319 | PFS Filters"
        description="NESHAP compliant paint booth filters: how Subpart 6H and Method 319 relate to booth exhaust filtration, and what a facility is responsible for verifying."
        canonical="https://www.pfsfilters.com/neshap-compliant-paint-booth-filters"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header + H1 */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Paint Booth Filters', href: '/paint-booth-filters' },
              { label: 'NESHAP Compliant Filters' },
            ]}
          />
          <div className="max-w-3xl mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              <ShieldAlert className="h-3 w-3" /> EPA NESHAP
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              NESHAP Compliant Paint Booth Filters — Standard &amp; Aerospace Systems
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              How EPA NESHAP rules relate to spray booth exhaust filtration — the standard Subpart 6H
              surface-coating rule, the aerospace Method 319 test method, and the arrestor media PFS
              Filters stocks.
            </p>
          </div>
        </div>
      </section>

      {/* Prominent disclaimer */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto -mt-2 mb-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 flex gap-3">
          <Info className="h-5 w-5 text-amber-300/90 shrink-0 mt-0.5" />
          <p className="text-sm text-white/70 leading-relaxed">
            PFS Filters supplies filter media. A filter by itself does not make a facility compliant
            with NESHAP or EPA Method 319. Compliance depends on the complete system, installation,
            airflow, coating process, testing, recordkeeping, and the permit conditions that apply —
            and the facility is responsible for verifying its own obligations.
          </p>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Section 1 — NESHAP 6H (surface coating) */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Standard NESHAP 6H — surface coating operations</h2>
            <p className="text-white/60 leading-relaxed">
              Subpart 6H (40 CFR Part 63, Subpart HHHHHH) is the area-source NESHAP that covers most
              auto body and miscellaneous surface coating shops. It calls for spray-applied coating to
              be done in a booth or enclosure with exhaust filtration and references a filter
              capture-efficiency requirement. The exhaust arrestor media below is the kind used on the
              exhaust stage of these booths. It is offered as filter media only — confirm that the
              media, size, and installation you choose meet the requirement that applies to your
              operation.
            </p>
          </div>

          <h3 className="sr-only">Exhaust arrestor media in stock</h3>
          {exhaustArrestors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {exhaustArrestors.map((product) => (
                <div key={product.id} className="glow-card group">
                  <Link href={`/product/${product.handle}`}>
                    <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
                      <img
                        src={product.image}
                        alt={`${product.title} — paint booth exhaust arrestor media`}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.handle}`}>
                      <h4 className="font-semibold text-sm leading-tight mb-1 hover:text-blue-400 transition-colors line-clamp-2">
                        {product.title}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between mt-2 mb-3">
                      <span className="font-bold text-blue-400">
                        {product.minPrice != null ? `From $${product.minPrice.toFixed(2)}` : 'See options'}{' '}
                        <span className="text-xs font-normal text-white/50">{product.currency}</span>
                      </span>
                      {product.sizes > 1 && (
                        <span className="text-xs text-white/40">{product.sizes} sizes</span>
                      )}
                    </div>
                    <Link href={`/product/${product.handle}`}>
                      <Button size="sm" className="w-full bg-blue-500 text-white hover:bg-blue-500/90 gap-2">
                        View product <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/50">Exhaust arrestor media is listed in the shop.</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/exhaust-filters">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                All exhaust filters
              </Button>
            </Link>
            <Link href="/andreae-paint-booth-filters">
              <Button variant="ghost" className="text-white/50 hover:text-white gap-2">
                Andreae accordion filters
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      {/* Section 2 — Aerospace & Method 319 (no grid, no prices, no buy button) */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
            <Plane className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400/90 uppercase tracking-wider">Aerospace</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Aerospace &amp; Method 319 Compliance Systems</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Aerospace manufacturing and rework facilities fall under a different NESHAP (40 CFR Part
              63, Subpart GG) and often run multi-stage exhaust systems configured to the coatings and
              airflow of the specific application. Product statements in this area are usually tied to
              EPA Method 319, a laboratory test method for paint overspray arrestor filtration
              efficiency — not a facility-wide guarantee.
            </p>
            <p>
              A Method 319 reference should be tied to evidence for the exact product, media, or
              multi-stage configuration that was tested, and to the installation, airflow, sealing,
              and maintenance conditions that apply. If your facility has an aerospace or Method 319
              requirement, talk to PFS so the media and configuration can be matched to it and the
              PFS Spray Booths engineering team can spec a multi-stage system where one is needed.
            </p>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a href="tel:+18554967969">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                <Phone className="h-4 w-4" />
                Call (855) 496-7969
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                Contact PFS Filters
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white/40 mt-4">
            See also{' '}
            <Link href="/industries/aerospace-paint-booth-filters" className="text-blue-400 hover:text-blue-300">
              aerospace paint booth filtration
            </Link>{' '}
            and the{' '}
            <Link href="/aerospace" className="text-blue-400 hover:text-blue-300">
              aerospace filter catalog
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* SEO copy block */}
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">About NESHAP and paint booth filters</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              &quot;NESHAP compliant paint booth filters&quot; is a search term more than a product
              category. NESHAP — the National Emission Standards for Hazardous Air Pollutants — is a
              set of EPA rules, and two of them commonly come up around spray booths.
            </p>
            <p>
              Subpart 6H (40 CFR Part 63, Subpart HHHHHH) is the area-source rule that covers most
              auto body and miscellaneous surface coating shops. It calls for spray-applied coating to
              be done in a booth or enclosure with exhaust filtration and references a filter
              capture-efficiency requirement. The exhaust arrestor media on this page — fiberglass
              paint arrestors, Paint Pockets, and Andreae accordion filters — is the kind of media
              used on that exhaust stage.
            </p>
            <p>
              Subpart GG covers aerospace manufacturing and rework. Those facilities often run
              multi-stage exhaust systems, and product claims there are usually tied to EPA Method
              319, a laboratory test method for arrestor filtration efficiency rather than a
              facility-wide guarantee.
            </p>
            <p>
              In both cases, a filter by itself does not make a facility compliant. Compliance depends
              on the complete system, the installation, airflow, the coating process, testing,
              recordkeeping, and the permit conditions that apply. PFS Filters can help identify media
              for a system; the facility is responsible for verifying its own regulatory obligations
              and required performance.
            </p>
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
              { href: '/exhaust-filters', label: 'Paint booth exhaust filters', sub: 'Fiberglass, Paint Pockets & Andreae' },
              { href: '/andreae-paint-booth-filters', label: 'Andreae accordion filters', sub: 'AF223, AF423, AF813, AF923 and more' },
              { href: '/intake-filters', label: 'Paint booth intake filters', sub: 'Tacky panels & ceiling media' },
              { href: '/ceiling-filters', label: 'Paint booth ceiling filters', sub: 'Downdraft diffusion media' },
              { href: '/industries/aerospace-paint-booth-filters', label: 'Aerospace paint booth filtration', sub: 'Multi-stage systems & Method 319' },
            ].map((card) => (
              <Link key={card.href} href={card.href}>
                <div className="glow-card group h-full p-5 cursor-pointer">
                  <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{card.label}</p>
                  <p className="text-white/45 text-sm mt-1">{card.sub}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/prefilters" className="text-sm text-blue-400 hover:text-blue-300">
              How prefilters extend filter life &rarr;
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      <Footer />
    </div>
  );
}
