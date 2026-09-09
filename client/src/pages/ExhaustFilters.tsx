// ExhaustFilters — /exhaust-filters
// Priority 3 category page from the SEO handoff (DOCX).
// Product grid is built only from the bundled Shopify snapshot — no invented
// products, prices, SKUs, availability, or compliance claims. The curated set
// is fiberglass paint arrestors, Paint Pockets, and Andreae accordion media
// (the exhaust-stage media families the catalog actually carries).

import { useMemo } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Filter, Wind, Phone, ArrowRight } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';
import { useCurrentShopifyProducts } from '@/hooks/useCurrentShopifyProducts';
import { createBreadcrumbSchema, createItemListSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const PAGE_PATH = '/exhaust-filters';
const FALLBACK_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

const EXHAUST_TITLE_HINT = /fiberglass|paint arrestor|paint pockets|accordion/i;

const getExhaustProducts = (products: ShopifyProduct[]) => products
  .filter((product) => {
    const node = product.node;
    const title = node.title.toLowerCase();
    const type = (node.productType || '').toLowerCase();
    const tags = (node.tags || []).map((tag) => tag.toLowerCase());
    if (title.includes('membership')) return false;
    if (type === 'accessories' || type === 'consumables') return false;
    return tags.includes('exhaust-filters') || EXHAUST_TITLE_HINT.test(node.title);
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
      sizes: (node.variants?.edges?.length ?? 0),
    };
  });

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: `${SITE}/` },
  { name: 'Paint Booth Filters', url: `${SITE}/paint-booth-filters` },
  { name: 'Paint Booth Exhaust Filters', url: `${SITE}${PAGE_PATH}` },
]);

export default function ExhaustFilters() {
  const products = useCurrentShopifyProducts();
  const exhaustProducts = useMemo(() => getExhaustProducts(products), [products]);
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, createItemListSchema(
      exhaustProducts.map((product) => ({
        name: product.title,
        url: `${SITE}/product/${product.handle}`,
        image: product.image,
        price: product.minPrice?.toFixed(2) ?? '',
        currency: product.currency,
      })),
    )],
  }), [exhaustProducts]);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Exhaust Filters — Fiberglass, Paint Pockets & Andreae"
        description="Compare fiberglass paint arrestor pads and rolls, Paint Pockets, and Andreae-style accordion media. Check current options and availability on each product page."
        canonical="https://www.pfsfilters.com/exhaust-filters"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Header + H1 (above the product grid) */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Paint Booth Filters', href: '/paint-booth-filters' },
              { label: 'Exhaust Filters' },
            ]}
          />
          <div className="max-w-3xl mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              <Filter className="h-3 w-3" /> Exhaust stage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              Paint Booth Exhaust Filters — Fiberglass, Paint Pockets &amp; Andreae Style
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              Overspray arrestor media for the outlet side of the booth. Browse the fiberglass,
              Paint Pockets, and Andreae-style options shown in the PFS catalog, then confirm your
              filter frame size before ordering.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-blue-400" /> Availability shown by product and variant
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wind className="h-3.5 w-3.5 text-blue-400" /> Pads, rolls &amp; accordion media
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Product grid */}
      <section className="section-raised tex-dots py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Exhaust filter products in the current catalog</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6 text-[13px] text-white/50 border-b border-white/[0.06] pb-3">
            <span>{`${exhaustProducts.length} exhaust filter product${exhaustProducts.length !== 1 ? 's' : ''}`}</span>
            <span className="text-center">Custom and unusual sizes require review — contact us</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Need help choosing?
            </Link>
          </div>

          {exhaustProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {exhaustProducts.map((product) => (
                <div key={product.id} className="glow-card group">
                  <Link href={`/product/${product.handle}`}>
                    <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
                      <img
                        src={product.image}
                        alt={`${product.title} — paint booth exhaust filter media`}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.handle}`}>
                      <h3 className="font-semibold text-sm leading-tight mb-1 hover:text-blue-400 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
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
                      <Button
                        size="sm"
                        className="w-full bg-blue-500 text-white hover:bg-blue-500/90 gap-2"
                      >
                        View product <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white/50">
              <p className="mb-4">Exhaust filter products are listed in the shop.</p>
              <Link href="/shop">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Browse all products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      {/* SEO copy block — BELOW the product grid */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">About paint booth exhaust filters</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Paint booth exhaust filters sit on the outlet side of the booth and capture paint
              overspray before air passes into the exhaust plenum, fan, and ductwork. PFS Filters
              lists several media families used on paint-booth exhaust stages.
            </p>
            <p>
              <Link href="/category/fiberglass-arrestors" className="text-blue-400 hover:text-blue-300">
                Fiberglass paint arrestor
              </Link>{' '}
              pads and rolls are the common, lower-cost option — a tapered-density glass-fiber mat
              sold here in 15-gram and 22-gram product variants, in pads and continuous rolls.
              Paint Pockets is another arrestor construction represented in the current catalog.
            </p>
            <p>
              <Link href="/andreae-paint-booth-filters" className="text-blue-400 hover:text-blue-300">
                Andreae accordion filters
              </Link>{' '}
              use a folded, multi-stage construction that differs from single-stage fiberglass media.
              Full variant names, prices, and current availability are on the dedicated Andreae page.
            </p>
            <p>
              Media choice depends on your coatings, spray volume, booth airflow, and how often you
              change filters today. Confirm the filter frame size and booth dimensions before
              ordering, and{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                contact PFS
              </Link>{' '}
              for custom cuts or help matching media to your booth.
            </p>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Related filter types */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Related filter types</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/paint-booth-filters', label: 'All paint booth filters', sub: 'Intake, ceiling, prefilter & exhaust' },
              { href: '/intake-filters', label: 'Paint booth intake filters', sub: 'Tacky panels & ceiling media' },
              { href: '/andreae-paint-booth-filters', label: 'Andreae accordion filters', sub: 'AF223, AF423, AF813, AF923 and more' },
              { href: '/category/fiberglass-arrestors', label: 'Fiberglass paint arrestors', sub: 'Pads and rolls, 15g and 22g' },
              { href: '/category/polyester-media', label: 'Polyester filter media', sub: 'Synthetic media for moisture resistance' },
              { href: '/category/roll-media', label: 'Roll media', sub: 'Cut-to-length intake and exhaust rolls' },
            ].map((card) => (
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

      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
