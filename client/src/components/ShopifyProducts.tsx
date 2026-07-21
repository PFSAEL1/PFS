import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2, Package } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { ProductBadges } from '@/components/ProductBadge';
import { getProductBadges } from '@/lib/productSignals';
import { usePricing, getDiscountedPrice } from '@/hooks/usePricing';
import { TierMedal } from '@/components/TierMedal';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

interface ShopifyProductsProps {
  categoryFilter?: string | null;
  sizeFilter?: string | null;
}

export const ShopifyProducts = ({ categoryFilter, sizeFilter }: ShopifyProductsProps = {}) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { discountPercent, tier } = usePricing();

  useEffect(() => {
    setLoading(true);
    fetchProducts(50)
      .then((data) => {
        let filtered = data.filter((p) => !p.node.title.toLowerCase().includes('membership'));

        if (categoryFilter) {
          const cat = categoryFilter.toLowerCase();
          filtered = filtered.filter((p) => {
            const tags = (p.node.tags || []).map((t: string) => t.toLowerCase());
            const type = (p.node.productType || '').toLowerCase();
            const title = p.node.title.toLowerCase();
            return tags.some(t => t.includes(cat)) || type.includes(cat) || title.includes(cat);
          });
        }

        if (sizeFilter) {
          const size = sizeFilter.toLowerCase().replace(/\s+/g, '');
          filtered = filtered.filter((p) => {
            const title = p.node.title.toLowerCase().replace(/\s+/g, '');
            const variants = p.node.variants.edges.map(v =>
              v.node.title.toLowerCase().replace(/\s+/g, '')
            );
            return title.includes(size) || variants.some(v => v.includes(size));
          });
        }

        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products. Please try again.');
        setLoading(false);
      });
  }, [categoryFilter, sizeFilter]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-white/70">
        <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-white/70">
        <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>No products found{categoryFilter ? ` for "${categoryFilter}"` : ''}{sizeFilter ? ` in size "${sizeFilter}"` : ''}.</p>
      </div>
    );
  }

  return (
    <>
      {/* Member pricing banner - large centered hero announcement */}
      {discountPercent > 0 && tier && (
        <div className="mb-10 relative overflow-hidden rounded-3xl border border-white/10">
          {/* Animated gradient background */}
          <div className="absolute inset-0" style={{
            background: tier === 'gold'
              ? 'radial-gradient(ellipse at center, rgba(234,179,8,0.18) 0%, rgba(161,98,7,0.06) 70%, transparent 100%)'
              : tier === 'platinum'
              ? 'radial-gradient(ellipse at center, rgba(148,163,184,0.18) 0%, rgba(100,116,139,0.06) 70%, transparent 100%)'
              : 'radial-gradient(ellipse at center, rgba(192,192,192,0.15) 0%, rgba(107,114,128,0.05) 70%, transparent 100%)'
          }} />
          {/* Shimmer sweep */}
          <div className="absolute inset-0 opacity-40" style={{
            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }} />
          {/* Breathing glow ring behind badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: tier === 'gold'
              ? 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)'
              : tier === 'platinum'
              ? 'radial-gradient(circle, rgba(148,163,184,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192,192,192,0.15) 0%, transparent 70%)',
            animation: 'breathe 2.5s ease-in-out infinite',
          }} />
          <div className="relative px-8 py-5 flex flex-col items-center text-center gap-2">
            {/* Tier medal badge */}
            <img src={`/images/badges/badge_${tier}.png`} alt={`${tier} Member Badge`} className="w-36 h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]" />

            <p className="text-white/50 text-sm max-w-md">
              Your <span className="font-bold text-white/90">{discountPercent}%</span> member discount is automatically applied to all prices below
            </p>
          </div>
          {/* CSS animations */}
          <style>{`
            @keyframes shimmer {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
            }
            @keyframes breathe {
              0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
            }
          `}</style>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const variant = product.node.variants.edges[0]?.node;
          const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
          const originalPrice = variant?.price.amount ? parseFloat(variant.price.amount) : 0;
          const memberPrice = discountPercent > 0 ? getDiscountedPrice(originalPrice, discountPercent) : originalPrice;
          const currency = variant?.price.currencyCode || 'USD';
          const inStock = variant?.availableForSale ?? true;

          return (
            <div key={product.node.id} className="glow-card group">
              <Link href={`/product/${product.node.handle}`}>
                <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
                  <ProductBadges badges={getProductBadges(product)} />
                  {/* Subscribe & Save diagonal ribbon - non-members only */}
                  {discountPercent === 0 && (
                    <div className="pointer-events-none absolute right-0 top-0 z-10 overflow-hidden w-[120px] h-[120px]">
                      {/* Ribbon */}
                      <div className="absolute top-0 right-0 w-[170px] text-center rotate-45 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 shadow-lg" style={{ top: '20px', right: '-45px' }}>
                        {/* Traveling light sweep */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%, transparent 100%)', backgroundSize: '200% 100%', animation: 'ribbon-light-sweep 2.5s ease-in-out infinite' }} />
                        </div>
                        {/* Folded edges */}
                        <div className="absolute left-0 bottom-0 w-0 h-0 border-t-[3px] border-t-blue-800 border-l-[3px] border-l-transparent" />
                        <div className="absolute right-0 bottom-0 w-0 h-0 border-t-[3px] border-t-blue-800 border-r-[3px] border-r-transparent" />
                        <span className="relative block text-[9px] font-bold text-white tracking-wider py-[5px] uppercase drop-shadow-sm">
                          Subscribe & Save
                        </span>
                      </div>
                    </div>
                  )}
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
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-400">
                      ${memberPrice.toFixed(2)} <span className="text-xs font-normal text-white/70">{currency}</span>
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-xs line-through text-white/30">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {!inStock && (
                    <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2"
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
    </>
  );
};
