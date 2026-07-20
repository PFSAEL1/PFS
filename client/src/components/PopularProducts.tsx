// PopularProducts — PFS Filters Tesla-Style Horizontal Slider
// Swipeable on mobile, arrow-navigable on desktop
// Fetches real Shopify products with Add to Cart
import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, ArrowRight, ArrowLeft, Loader2, ChevronRight } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { usePricing, getDiscountedPrice } from '@/hooks/usePricing';
import { toast } from 'sonner';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export const PopularProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { discountPercent } = usePricing();
  const [addingId, setAddingId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    fetchProducts(12)
      .then((data) => {
        setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')).slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    setAddingId(product.node.id);
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
    setTimeout(() => {
      setAddingId(null);
      setCartOpen(true);
    }, 600);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-14 section-raised">
      {/* Header */}
      <div className="px-4 max-w-7xl mx-auto flex items-end justify-between mb-8">
        <div>
          <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Best Sellers</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white pfs-heading-animate">
            Popular Products
          </h2>
          <p className="text-white/30 text-sm mt-1">Trusted by 1,200+ body shops nationwide</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Desktop arrow controls */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all flex items-center justify-center text-white/60 hover:text-white"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all flex items-center justify-center text-white/60 hover:text-white"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <Link href="/shop">
            <span className="hidden md:flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Slider */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-white/30" />
        </div>
      ) : products.length === 0 ? null : (
        <>
          <div className="max-w-7xl mx-auto px-4">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
              const originalPrice = variant?.price.amount ? parseFloat(variant.price.amount) : 0;
              const memberPrice = discountPercent > 0 ? getDiscountedPrice(originalPrice, discountPercent) : originalPrice;
              const price = originalPrice > 0 ? originalPrice.toFixed(2) : null;
              const isAdding = addingId === product.node.id;

              return (
                <div
                  key={product.node.id}
                  className="flex-none w-[220px] md:w-[240px] snap-start"
                >
                  <div className="glow-card flex flex-col h-full">
                    {/* Product image */}
                    <Link href={`/product/${product.node.handle}`}>
                      <div className="product-img-wrap aspect-square overflow-hidden relative cursor-pointer">
                        <img
                          src={image}
                          alt={product.node.title}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <Link href={`/product/${product.node.handle}`}>
                        <h3 className="text-sm font-semibold text-white/85 leading-snug line-clamp-2 hover:text-white transition-colors cursor-pointer">
                          {product.node.title}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mt-auto">
                        {price ? (
                          discountPercent > 0 ? (
                            <div className="flex items-center gap-2">
                              <span className="text-base font-bold text-blue-400">${memberPrice.toFixed(2)}</span>
                              <span className="text-xs line-through text-white/40">${price}</span>
                            </div>
                          ) : (
                            <span className="text-base font-bold text-white">${price}</span>
                          )
                        ) : (
                          <span className="text-sm text-white/30">—</span>
                        )}
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdding}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 glow-add-btn ${isAdding ? 'btn-adding' : 'btn-active'}`}
                      >
                        {isAdding ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-3.5 w-3.5" />
                        )}
                        {isAdding ? 'Adding…' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* "View All" end card */}
            <div className="flex-none w-[160px] snap-start flex items-center justify-center">
              <Link href="/shop">
                <div className="flex flex-col items-center gap-3 text-white/30 hover:text-white/60 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full border border-white/10 group-hover:border-white/25 flex items-center justify-center transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">View All<br />Products</span>
                </div>
              </Link>
            </div>
          </div>

          </div>{/* close max-w-7xl wrapper */}

          {/* Mobile "View All" link */}
          <div className="px-4 mt-4 md:hidden">
            <Link href="/shop">
              <span className="flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                View all products <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
