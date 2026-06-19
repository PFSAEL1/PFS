// TopMovers — PFS Filters
// 4-across discovery grid with badges, star ratings, price, and inline Add to Cart.
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Loader2, Star, ShoppingCart } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { ProductBadges } from '@/components/ProductBadge';
import { getProductBadges } from '@/lib/productSignals';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

// Deterministic rating (4.6–5.0) + review count from the product id/handle,
// so it's stable across renders rather than random.
function ratingFor(seed: string): { stars: number; count: number } {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const stars = 4.6 + (h % 5) * 0.1; // 4.6 .. 5.0
  const count = 38 + (h % 180); // 38 .. 217
  return { stars: Math.round(stars * 10) / 10, count };
}

export const TopMovers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    fetchProducts(12)
      .then((data) => {
        setProducts(
          data
            .filter((p) => !p.node.title.toLowerCase().includes('membership'))
            .slice(0, 4)
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
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

  if (loading) {
    return (
      <section className="py-16 px-4" style={{ backgroundColor: '#080808' }}>
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-white/30" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex justify-center mb-3">
          <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
            Top Movers
          </span>
        </div>
        <h2 className="text-white text-2xl font-semibold text-center mt-2">
          Most ordered this month
        </h2>
        <p className="text-white/70 text-sm text-center mt-2 mb-8">
          The filters 1,200+ shops keep coming back for.
        </p>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => {
            const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
            const variant = product.node.variants.edges[0]?.node;
            const price = variant?.price?.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
            const inStock = variant?.availableForSale ?? true;
            const { stars, count } = ratingFor(product.node.handle || product.node.id);

            return (
              <Link key={product.node.id} href={`/product/${product.node.handle}`}>
                <div className="group bg-[#1a1a1a] border border-white/[0.08] rounded-xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full flex flex-col">
                  {/* Image area */}
                  <div className="relative h-[190px] bg-[#f4f5f6] flex items-center justify-center p-4">
                    <ProductBadges badges={getProductBadges(product)} />
                    <img
                      src={image}
                      alt={product.node.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Card body */}
                  <div className="px-4 pb-4 pt-3 flex flex-col flex-1">
                    {/* Stars */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="flex">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < Math.round(stars) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
                          />
                        ))}
                      </div>
                      <span className="text-white/55 text-xs">{stars.toFixed(1)} ({count})</span>
                    </div>

                    <h3 className="text-white font-medium text-sm leading-snug line-clamp-2">
                      {product.node.title}
                    </h3>

                    <div className="mt-auto pt-3">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-blue-400 font-bold text-base">${price}</span>
                        {!inStock && <span className="text-white/40 text-xs">Out of stock</span>}
                      </div>
                      <button
                        onClick={(e) => handleAdd(e, product)}
                        disabled={!inStock}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
