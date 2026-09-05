// TopMovers — PFS Filters
// 4-across discovery grid with product badges, price, and inline Add to Cart.
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Loader2, ShoppingCart } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { usePricing, getDiscountedPrice } from '@/hooks/usePricing';
import { toast } from 'sonner';
import { ProductBadges } from '@/components/ProductBadge';
import { getProductBadges } from '@/lib/productSignals';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export const TopMovers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { discountPercent } = usePricing();
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
      <section className="section-darker py-16 px-4">
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-white/30" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="section-darker tex-lines py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex justify-center mb-3">
          <span className="eyebrow-brand border rounded-full text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
            Featured Filters
          </span>
        </div>
        <h2 className="text-white text-2xl font-semibold text-center mt-2">
          Popular filter media and booth essentials
        </h2>
        <p className="text-white/70 text-sm text-center mt-2 mb-8">
          Compare current products, sizes, prices, and availability.
        </p>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => {
            const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
            const variant = product.node.variants.edges[0]?.node;
            const originalPrice = variant?.price?.amount ? parseFloat(variant.price.amount) : 0;
            const price = originalPrice > 0 ? originalPrice.toFixed(2) : '—';
            const inStock = variant?.availableForSale ?? true;
            return (
              <Link key={product.node.id} href={`/product/${product.node.handle}`}>
                <div className="group bg-[#1a1a1a] border border-white/[0.08] rounded-xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full flex flex-col">
                  {/* Image area */}
                  <div className="product-img-wrap relative h-[190px] flex items-center justify-center p-4">
                    <ProductBadges badges={getProductBadges(product)} />
                    <img
                      src={image}
                      alt={product.node.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Card body */}
                  <div className="px-4 pb-4 pt-3 flex flex-col flex-1">
                    <h3 className="text-white font-medium text-sm leading-snug line-clamp-2">
                      {product.node.title}
                    </h3>

                    <div className="mt-auto pt-3">
                      <div className="flex items-center justify-between mb-2.5">
                        {discountPercent > 0 && originalPrice > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold text-base">${getDiscountedPrice(originalPrice, discountPercent).toFixed(2)}</span>
                            <span className="text-xs line-through text-white/40">${price}</span>
                          </div>
                        ) : (
                          <span className="text-blue-400 font-bold text-base">${price}</span>
                        )}
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
