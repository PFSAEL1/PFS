// CategoryPage — PFS Filters
// Shows products filtered by category slug (e.g., /category/fiberglass-arrestors)
// Uses Shopify collection-based fetch with tag-based fallback

import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2, Package, ArrowLeft, Wind, Filter } from 'lucide-react';
import { usePricing, getDiscountedPrice } from '@/hooks/usePricing';
import {
  fetchProductsByCategory,
  CATEGORY_COLLECTION_MAP,
  productMatchesCategory,
  ShopifyProduct,
} from '@/lib/shopify';
import { bundledShopifyProducts } from '@/lib/productCatalog';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { ProductBadges } from '@/components/ProductBadge';
import { getProductBadges } from '@/lib/productSignals';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { shopifyImageAltText, shopifyImageSrcSet, sizedShopifyImageUrl } from '@/lib/imageUrls';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';
const Footer = lazy(() => import('@/components/Footer').then((module) => ({ default: module.Footer })));

function getBundledCategoryProducts(categorySlug?: string) {
  if (!categorySlug) return [];
  return bundledShopifyProducts
    .filter((product) => !product.node.title.toLowerCase().includes('membership'))
    .filter((product) => productMatchesCategory(product, categorySlug));
}

function DeferredFooter() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (showFooter) return;
    const interactionEvents = ['scroll', 'click', 'touchstart', 'pointerdown', 'keydown'] as const;

    const revealFooter = () => setShowFooter(true);
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, revealFooter);
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, revealFooter, { once: true, passive: true });
    });

    return () => {
      removeInteractionListeners();
    };
  }, [showFooter]);

  if (!showFooter) return <div style={{ minHeight: 420 }} aria-hidden="true" />;

  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>(() => getBundledCategoryProducts(slug));
  const [loading, setLoading] = useState(() => getBundledCategoryProducts(slug).length === 0);
  const [error, setError] = useState<string | null>(null);
  const { discountPercent } = usePricing();
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const categoryInfo = slug ? CATEGORY_COLLECTION_MAP[slug] : null;

  useEffect(() => {
    if (!slug) return;
    let active = true;
    let started = false;
    let fallbackTimer: number | undefined;
    let idleId: number | undefined;
    const immediateProducts = getBundledCategoryProducts(slug);

    setProducts(immediateProducts);
    setLoading(immediateProducts.length === 0);
    setError(null);

    const refreshProducts = () => {
      if (started) return;
      started = true;
      if (immediateProducts.length === 0) setLoading(true);

      fetchProductsByCategory(slug)
      .then((data) => {
        if (!active) return;
        setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')));
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        if (immediateProducts.length === 0) {
          setError('Failed to load products. Please try again.');
          setLoading(false);
        }
      });
    };

    if (immediateProducts.length === 0) {
      refreshProducts();
    } else {
      const scheduleIdleRefresh = () => {
        fallbackTimer = window.setTimeout(() => {
          if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(refreshProducts, { timeout: 6000 });
          } else {
            refreshProducts();
          }
        }, 6000);
      };
      const interactionEvents = ['scroll', 'click', 'touchstart', 'pointerdown', 'keydown'] as const;
      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, refreshProducts, { once: true, passive: true, capture: true });
      });
      if (document.readyState === 'complete') {
        scheduleIdleRefresh();
      } else {
        window.addEventListener('load', scheduleIdleRefresh, { once: true });
      }

      return () => {
        active = false;
        if (fallbackTimer) window.clearTimeout(fallbackTimer);
        if (idleId && 'cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleId);
        }
        window.removeEventListener('load', scheduleIdleRefresh);
        interactionEvents.forEach((eventName) => {
          window.removeEventListener(eventName, refreshProducts, { capture: true });
        });
      };
    }

    return () => {
      active = false;
    };
  }, [slug]);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    addItem({
      variantId: variant.id,
      productId: product.node.id,
      title: product.node.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: product.node.images.edges[0]?.node.url,
      handle: product.node.handle,
    });
    toast.success(`${product.node.title} added to cart`);
    setCartOpen(true);
  };

  const title = categoryInfo?.title || (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Category');
  const description = categoryInfo?.description || 'Browse our selection of premium paint booth filters.';
  const position = categoryInfo?.position || '';

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.pfsfilters.com' },
    { name: 'Shop by Type', url: 'https://www.pfsfilters.com/shop-by-type' },
    { name: title, url: `https://www.pfsfilters.com/category/${slug}` },
  ]);

  const positionColor = position === 'EXHAUST'
    ? 'bg-white/8 border-white/20 text-white/70'
    : position === 'INTAKE'
    ? 'bg-[#4d9fff]/10 border-[#4d9fff]/30 text-[#4d9fff]'
    : 'bg-white/5 border-white/15 text-white/50';

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title={`${title} - Paint Booth Filters | PFS Filters`}
        description={description}
        canonical={`https://www.pfsfilters.com/category/${slug}`}
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Shop by Type', href: '/shop-by-type' },
              { label: title },
            ]}
          />

          {/* Page header */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              {position && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${positionColor}`}>
                  {position === 'INTAKE' && <Wind className="h-3 w-3" />}
                  {position === 'EXHAUST' && <Filter className="h-3 w-3" />}
                  {position}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
              {title}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Products - raised */}
      <section className="section-raised tex-dots py-12 px-4">
        <div className="max-w-7xl mx-auto">

        {/* Info bar */}
        {!loading && !error && products.length > 0 && (
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '12px 0',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <span className="shrink-0">
              {`${products.length} product${products.length !== 1 ? 's' : ''}`}
            </span>
            <span className="text-center">Custom cuts available on all sizes — contact us</span>
            <Link href="/contact" className="shrink-0 hover:text-white transition-colors">
              Need help choosing? Chat with us
            </Link>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16 text-white/50">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="mb-4">{error}</p>
            <Button
              variant="outline"
              className="border-white/20 text-white/60 hover:text-white"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state — no matching products */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto mb-4 text-white/20" />
            <h2 className="text-xl font-semibold text-white/60 mb-2">No products found</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              We couldn't find any products in this category right now. Browse all products or check back soon.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/shop">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Browse All Products
                </Button>
              </Link>
              <Link href="/shop-by-type">
                <Button variant="outline" className="border-white/20 text-white/60 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Categories
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && products.length > 0 && (
          <div
            className={`grid gap-6 ${
              products.length < 4
                ? 'sm:grid-cols-2 lg:grid-cols-3'
                : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {products.map((product, index) => {
              const variant = product.node.variants.edges[0]?.node;
              const imageNode = product.node.images.edges[0]?.node;
              const image = imageNode?.url || FALLBACK_IMAGE;
              const shouldLoadEarly = index < 2;
              const shouldPrioritizeImage = index === 0;
              const originalPrice = variant?.price.amount ? parseFloat(variant.price.amount) : 0;
              const price = originalPrice > 0 ? originalPrice.toFixed(2) : '—';
              const currency = variant?.price.currencyCode || 'USD';
              const inStock = variant?.availableForSale ?? true;

              return (
                <div key={product.node.id} className="glow-card group">
                  <Link href={`/product/${product.node.handle}`}>
                    <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
                      <ProductBadges badges={getProductBadges(product)} />
                      <img
                        src={sizedShopifyImageUrl(image, 480)}
                        srcSet={shopifyImageSrcSet(image)}
                        sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                        alt={shopifyImageAltText(imageNode, product.node.title)}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        width={480}
                        height={480}
                        loading={shouldLoadEarly ? 'eager' : 'lazy'}
                        fetchPriority={shouldPrioritizeImage ? 'high' : 'auto'}
                        decoding="async"
                        style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.node.handle}`}>
                      <h3 className="font-semibold text-sm leading-tight mb-1 hover:text-blue-400 transition-colors line-clamp-2">
                        {product.node.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2 mb-3">
                      {discountPercent > 0 && originalPrice > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-400">${getDiscountedPrice(originalPrice, discountPercent).toFixed(2)}</span>
                          <span className="text-xs line-through text-white/40">${price}</span>
                          <span className="text-xs font-normal text-white/50">{currency}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-blue-400">
                          ${price} <span className="text-xs font-normal text-white/50">{currency}</span>
                        </span>
                      )}
                      {!inStock && (
                        <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-blue-500 text-white hover:bg-blue-500/90 gap-2"
                      onClick={() => handleAddToCart(product)}
                      disabled={!inStock}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back to categories */}
        {!loading && (
          <div className="mt-14 pt-10 border-t border-white/8">
            <Link href="/shop-by-type">
              <Button variant="ghost" className="text-white/40 hover:text-white gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Filter Types
              </Button>
            </Link>
          </div>
        )}
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <DeferredFooter />
    </div>
  );
}
