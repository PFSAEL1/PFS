// CategoryPage — PFS Filters
// Shows products filtered by category slug (e.g., /category/fiberglass-arrestors)
// Uses Shopify collection-based fetch with tag-based fallback

import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2, Package, ArrowLeft, Wind, Filter } from 'lucide-react';
import {
  fetchProductsByCategory,
  CATEGORY_COLLECTION_MAP,
  ShopifyProduct,
} from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

// CSS animation keyframes injected once
const ANIMATION_STYLE = `
@keyframes pfs-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pfs-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.pfs-heading-animate {
  animation: pfs-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.pfs-sub-animate {
  animation: pfs-fade-up 0.65s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.pfs-grid-animate {
  animation: pfs-fade-in 0.5s 0.25s ease both;
}
`;

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const styleInjected = useRef(false);

  const categoryInfo = slug ? CATEGORY_COLLECTION_MAP[slug] : null;

  // Inject animation styles once
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const style = document.createElement('style');
    style.textContent = ANIMATION_STYLE;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetchProductsByCategory(slug)
      .then((data) => {
        setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products. Please try again.');
        setLoading(false);
      });
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
    { name: 'Home', url: 'https://pfsfilters.com' },
    { name: 'Shop by Type', url: 'https://pfsfilters.com/shop-by-type' },
    { name: title, url: `https://pfsfilters.com/category/${slug}` },
  ]);

  const positionColor = position === 'EXHAUST'
    ? 'bg-white/8 border-white/20 text-white/70'
    : position === 'INTAKE'
    ? 'bg-[#4d9fff]/10 border-[#4d9fff]/30 text-[#4d9fff]'
    : 'bg-white/5 border-white/15 text-white/50';

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title={`${title} - Paint Booth Filters | PFS Filters`}
        description={description}
        canonical={`https://pfsfilters.com/category/${slug}`}
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb
          items={[
            { label: 'Shop by Type', href: '/shop-by-type' },
            { label: title },
          ]}
        />

        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {position && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${positionColor}`}>
                {position === 'INTAKE' && <Wind className="h-3 w-3" />}
                {position === 'EXHAUST' && <Filter className="h-3 w-3" />}
                {position}
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate">
            {title}
          </h1>
          <p className="text-lg text-white/45 max-w-2xl pfs-sub-animate">
            {description}
          </p>
        </div>

        {/* Product count */}
        {!loading && !error && (
          <p className="text-sm text-white/30 mb-6">
            {products.length === 0
              ? 'No products found in this category'
              : `${products.length} product${products.length !== 1 ? 's' : ''}`}
          </p>
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
            <p className="text-white/35 mb-6 max-w-md mx-auto">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pfs-grid-animate">
            {products.map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
              const price = variant?.price.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
              const currency = variant?.price.currencyCode || 'USD';
              const inStock = variant?.availableForSale ?? true;

              return (
                <div key={product.node.id} className="glow-card group">
                  <Link href={`/product/${product.node.handle}`}>
                    <div className="product-img-wrap aspect-square overflow-hidden cursor-pointer">
                      <img
                        src={image}
                        alt={product.node.title}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
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
                      <span className="font-bold text-blue-400">
                        ${price} <span className="text-xs font-normal text-white/50">{currency}</span>
                      </span>
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

      <Footer />
    </div>
  );
}
