// CeilingFilters — /ceiling-filters
// Priority 5 category page from the SEO handoff (DOCX).
// Product grid renders immediately from the cached/bundled Shopify catalog and
// silently refreshes from Storefront API. The catalog
// carries two downdraft ceiling diffusion media products; both are shown.

import { useMemo } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Wind, ArrowDown, Phone, ArrowRight } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/shopify';
import { useCurrentShopifyProducts } from '@/hooks/useCurrentShopifyProducts';
import { createBreadcrumbSchema, createItemListSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const PAGE_PATH = '/ceiling-filters';
const FALLBACK_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

const CEILING_TITLE_HINT = /ceiling|downdraft|diffusion/i;

const getCeilingProducts = (products: ShopifyProduct[]) => products
  .filter((product) => {
    const node = product.node;
    const title = node.title.toLowerCase();
    const type = (node.productType || '').toLowerCase();
    const tags = (node.tags || []).map((tag) => tag.toLowerCase());
    if (title.includes('membership')) return false;
    if (type === 'accessories' || type === 'consumables') return false;
    return tags.some((t) => /ceiling|diffusion|blanket/.test(t)) || CEILING_TITLE_HINT.test(node.title);
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
  { name: 'Paint Booth Ceiling Filters', url: `${SITE}${PAGE_PATH}` },
]);

export default function CeilingFilters() {
  const products = useCurrentShopifyProducts();
  const ceilingProducts = useMemo(() => getCeilingProducts(products), [products]);
  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, createItemListSchema(
      ceilingProducts.map((product) => ({
        name: product.title,
        url: `${SITE}/product/${product.handle}`,
        image: product.image,
        price: product.minPrice?.toFixed(2) ?? '',
        currency: product.currency,
      })),
    )],
  }), [ceilingProducts]);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Ceiling Filters — Downdraft Diffusion Media"
        description="Compare paint booth ceiling diffusion media and current size variants for applicable downdraft and semi-downdraft systems. Verify the grid before ordering."
        canonical="https://www.pfsfilters.com/ceiling-filters"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Header + H1 (above the product grid) */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Paint Booth Filters', href: '/paint-booth-filters' },
              { label: 'Ceiling Filters' },
            ]}
          />
          <div className="max-w-3xl mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#4d9fff]/30 bg-[#4d9fff]/10 text-xs font-bold uppercase tracking-wider text-[#4d9fff] mb-4">
              <ArrowDown className="h-3 w-3" /> Downdraft intake
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              Paint Booth Ceiling Filters for Downdraft Booths
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              Overhead diffusion media that spreads intake air evenly across the booth ceiling in
              applicable downdraft and semi-downdraft booths. Browse the current catalog options, then
              measure your ceiling grid opening before ordering.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <Wind className="h-3.5 w-3.5 text-blue-400" /> Availability shown by product and variant
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wind className="h-3.5 w-3.5 text-blue-400" /> Cut sizes, blankets &amp; rolls
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      {/* Product grid */}
      <section className="section-raised tex-dots py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Ceiling filter products in the current catalog</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6 text-[13px] text-white/50 border-b border-white/[0.06] pb-3">
            <span>{`${ceilingProducts.length} ceiling filter product${ceilingProducts.length !== 1 ? 's' : ''}`}</span>
            <span className="text-center">Custom and unusual sizes require review — contact us</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Need help choosing?
            </Link>
          </div>

          {ceilingProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
              {ceilingProducts.map((product) => (
                <div key={product.id} className="glow-card group">
                  <Link href={`/product/${product.handle}`}>
                    <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
                      <img
                        src={product.image}
                        alt={`${product.title} — paint booth ceiling diffusion media`}
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
              <p className="mb-4">Ceiling filter products are listed in the shop.</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">About paint booth ceiling filters</h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              Paint booth ceiling filters are the intake stage in a downdraft or semi-downdraft
              booth. Air is drawn in through the roof, passes through a layer of diffusion media, and
              moves toward the booth exhaust. The installed media must match the equipment design,
              support grid, airflow direction, and manufacturer specifications.
            </p>
            <p>
              The current PFS catalog includes Ceiling Diffusion Media (L560) and Swiss Flow
              Downdraft Ceiling Diffusion Media (600G). Review the product record for current variant
              names, format, price, and availability; do not infer interchangeability from the word
              “ceiling” alone.
            </p>
            <p>
              Ceiling media is sized to the ceiling grid opening, not the booth footprint, so measure
              the frame or your existing media before ordering. Many shops also run a{' '}
              <Link href="/category/pre-filters" className="text-blue-400 hover:text-blue-300">
                pre-filter
              </Link>{' '}
              prefilter stage above the ceiling media when the equipment is designed for it.{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                Contact PFS
              </Link>{' '}
              for custom sizes or help matching media to your booth.
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
              { href: '/exhaust-filters', label: 'Paint booth exhaust filters', sub: 'Fiberglass, Paint Pockets & Andreae' },
              { href: '/category/ceiling-blankets', label: 'Ceiling blankets', sub: 'Overhead intake media by size' },
              { href: '/category/pre-filters', label: 'Pre-filters', sub: 'First-stage protection for ceiling media' },
              { href: '/shop-by-booth-type', label: 'Shop by booth type', sub: 'Downdraft, crossdraft & semi-downdraft' },
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
