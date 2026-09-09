// AndreaePaintBoothFilters — /andreae-paint-booth-filters
// Priority 1 landing page from the SEO handoff (DOCX).
// Product data renders immediately from the cached/bundled Shopify catalog and
// silently refreshes from Storefront API. No prices, SKUs, or specs are invented.

import { useMemo } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Layers, Wind, ShieldCheck, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { useCurrentShopifyProducts } from '@/hooks/useCurrentShopifyProducts';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const ANDREAE_HANDLE = 'accordion-style-paint-arrestors';
const PRODUCT_PATH = `/product/${ANDREAE_HANDLE}`;
const FALLBACK_IMAGE = '/images/brands/pfs-logo-wide.png';

const FAQS = [
  {
    question: 'Which Andreae-style filter variants are shown by PFS Filters?',
    answer:
      'The current catalog lists AF213 and AF223 in 20"x20", AF413 and AF423 in 20"x25", and AF813, AF923, AF113 and AF123 in roll form. Current pricing and availability are shown by variant on the product page. If your size is not listed, contact PFS Filters.',
  },
  {
    question: 'How is an Andreae accordion filter different from a fiberglass paint arrestor?',
    answer:
      'Fiberglass arrestor pads and folded accordion filters use different media constructions. The accordion path changes how overspray is collected across the filter. Compare manufacturer documentation, booth requirements, coatings, airflow, and current operating results rather than assuming one construction is automatically better for every process.',
  },
  {
    question: 'Does an Andreae filter make my paint booth NESHAP compliant?',
    answer:
      'No single filter makes a facility compliant. Exhaust-filter selection is one input into how well a booth captures overspray, but compliance with EPA Method 319, NESHAP, or a local air permit depends on the full system and your process. Contact PFS Filters if you have a specific testing or documentation requirement.',
  },
];

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: `${SITE}/` },
  { name: 'Paint Booth Filters', url: `${SITE}/paint-booth-filters` },
  { name: 'Andreae Paint Booth Filters', url: `${SITE}/andreae-paint-booth-filters` },
]);

const faqSchema = createFAQSchema(FAQS);

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [breadcrumbSchema, faqSchema],
};

export default function AndreaePaintBoothFilters() {
  const products = useCurrentShopifyProducts();
  const andreaeProduct = products.find((product) => product.node.handle === ANDREAE_HANDLE)?.node;
  const models = useMemo(() => (andreaeProduct?.variants?.edges ?? []).map((edge) => ({
    label: edge.node.title,
    price: edge.node.price?.amount ? parseFloat(edge.node.price.amount) : null,
    currency: edge.node.price?.currencyCode ?? 'USD',
  })), [andreaeProduct]);
  const minPrice = andreaeProduct?.priceRange?.minVariantPrice?.amount
    ? parseFloat(andreaeProduct.priceRange.minVariantPrice.amount)
    : null;
  const productImage = andreaeProduct?.images?.edges?.[0]?.node?.url ?? FALLBACK_IMAGE;
  const priceLabel = minPrice != null ? `$${minPrice.toFixed(2)}` : null;

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Andreae Paint Booth Filters — AF Pad & Roll Variants"
        description="Review current Andreae-style accordion paint arrestor variants, including AF213, AF223, AF413, AF423, AF813, AF923, AF113, and AF123."
        canonical="https://www.pfsfilters.com/andreae-paint-booth-filters"
        ogType="website"
        ogImage={productImage}
        structuredData={structuredData}
      />
      <Navigation />

      {/* Hero */}
      <section className="section-darker pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <Breadcrumb
            items={[
              { label: 'Paint Booth Filters', href: '/paint-booth-filters' },
              { label: 'Andreae Paint Booth Filters' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
              <Layers className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400/90 uppercase tracking-wider">
                Andreae Accordion Filters
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-white pfs-heading-animate leading-tight">
              Andreae Paint Booth Filters — Current Pad &amp; Roll Variants
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed pfs-sub-animate">
              The PFS catalog includes accordion-style paint arrestor variants in 20&quot;x20&quot;,
              20&quot;x25&quot;, and roll formats. Compare the exact variant name, dimensions, case
              quantity, price, and current availability before ordering.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              <Link href={PRODUCT_PATH}>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2 px-8 py-6 text-base font-semibold">
                  Shop Andreae Filters <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 gap-2 px-8 py-6 text-base"
                >
                  <Phone className="h-4 w-4" />
                  Ask about sizing
                </Button>
              </Link>
              <a href="https://www.andreaefilters.com/our-technology/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-blue-300 hover:text-blue-200">
                Andreae technology overview <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-sm text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-400" /> Availability shown by variant
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wind className="h-3.5 w-3.5 text-blue-400" /> Exhaust-stage overspray media
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" /> Backed by PFS Spray Booths
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

          {/* Current catalog variants */}
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Andreae-style variants in the current catalog</h2>
            <p className="text-white/45 max-w-2xl">
              The table renders immediately from the cached catalog and refreshes from Shopify in the
              background. Confirm selected-variant pricing, availability, case quantity, construction,
              and booth dimensions on the product page.
            </p>
          </div>

          {models.length > 0 ? (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">Andreae accordion filter sizes stocked by PFS Filters</caption>
                  <thead>
                    <tr className="text-left text-white/40 text-xs uppercase tracking-wider">
                      <th scope="col" className="px-5 py-3 font-semibold">Size &amp; model</th>
                      <th scope="col" className="px-5 py-3 font-semibold">From</th>
                      <th scope="col" className="px-5 py-3 font-semibold"><span className="sr-only">Link</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => (
                      <tr key={model.label} className="border-t border-white/[0.07]">
                        <td className="px-5 py-3 text-white/85">{model.label}</td>
                        <td className="px-5 py-3 text-blue-400 font-semibold whitespace-nowrap">
                          {model.price != null ? `$${model.price.toFixed(2)} ${model.currency}` : '—'}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <Link
                            href={PRODUCT_PATH}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                          >
                            View <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/50">
              <p className="mb-4">Andreae accordion filter sizes are listed on the product page.</p>
              <Link href={PRODUCT_PATH}>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">View Andreae Filters</Button>
              </Link>
            </div>
          )}

          {/* Main product card */}
          {andreaeProduct && (
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <Link href={PRODUCT_PATH} className="shrink-0">
                <img
                  src={productImage}
                  alt="Andreae accordion style paint booth exhaust filter"
                  className="h-28 w-28 object-contain rounded-lg bg-white/5 p-2"
                  loading="lazy"
                />
              </Link>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">{andreaeProduct.title}</h3>
                <p className="text-white/50 text-sm mt-1">
                  {priceLabel ? `From ${priceLabel} — ` : ''}accordion paint arrestor media for booth
                  exhaust. Multiple sizes and roll options.
                </p>
              </div>
              <Link href={PRODUCT_PATH} className="shrink-0">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
                  View product <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      {/* Why shops choose Andreae — explanatory block */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">How accordion filters differ from fiberglass pads</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Andreae-style accordion filters use a folded collection path rather than a flat
              fiberglass pad. That construction changes how overspray travels through and loads the
              media. Product- and process-specific performance should be supported by the applicable
              manufacturer documentation or test data.
            </p>
            <p>
              A shop may compare accordion and fiberglass media when reviewing overspray loading,
              change practices, booth pressure, disposal volume, and operating cost. The outcome
              depends on coatings, spray volume, airflow, installation, and maintenance —{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                talk to us
              </Link>{' '}
              if you want help comparing against{' '}
              <Link href="/category/fiberglass-arrestors" className="text-blue-400 hover:text-blue-300">
                fiberglass paint arrestors
              </Link>
              .
            </p>
            <p>
              A note on compliance: exhaust-filter choice is one factor in how well a booth captures
              overspray, but a filter by itself does not make a facility compliant with EPA Method
              319, NESHAP, or a local air permit. If your operation carries a specific testing or
              documentation requirement, contact PFS — we can help match media to your booth and
              process, or involve the{' '}
              <Link
                href="/industries/aerospace-paint-booth-filters"
                className="text-blue-400 hover:text-blue-300"
              >
                PFS Spray Booths engineering team
              </Link>{' '}
              for multi-stage systems.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/paint-booth-filters">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                All paint booth filters
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" className="text-white/50 hover:text-white gap-2">
                Filter FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* FAQ */}
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Andreae filter questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.question} className="border-b border-white/10 pb-6">
                <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href={PRODUCT_PATH}>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                Shop Andreae Filters <ArrowRight className="h-4 w-4" />
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

      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
