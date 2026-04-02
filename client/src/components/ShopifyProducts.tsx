// ABC Filters iOS App — Product Grid
// Design: Tesla-grade dark cards, precision layout, smooth interactions
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Package, Plus, ChevronRight } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export const ShopifyProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    fetchProducts(50)
      .then((data) => {
        setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products. Please try again.');
        setLoading(false);
      });
  }, []);

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
    toast.success(`Added to cart`, { description: product.node.title });
    setCartOpen(true);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 pt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-border/60 animate-fade-in" style={{animationDelay: `${i * 80}ms`}}>
            <div className="h-40 shimmer" />
            <div className="p-3 space-y-2">
              <div className="h-3 rounded shimmer" />
              <div className="h-3 w-3/4 rounded shimmer" />
              <div className="h-8 rounded-xl shimmer mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          <Package className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {products.map((product, i) => {
        const variant = product.node.variants.edges[0]?.node;
        const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
        const price = variant?.price.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
        const inStock = variant?.availableForSale ?? true;

        return (
          <div
            key={product.node.id}
            className="bg-card border border-border/60 rounded-2xl overflow-hidden animate-slide-up"
            style={{animationDelay: `${i * 50}ms`, animationFillMode: 'both'}}
          >
            {/* Product Image */}
            <Link href={`/product/${product.node.handle}`}>
              <div className="relative bg-muted/20 h-40 flex items-center justify-center p-3 btn-press">
                <img
                  src={image}
                  alt={product.node.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                {!inStock && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-muted-foreground bg-background/80 px-2 py-1 rounded-full border border-border">
                      Out of Stock
                    </span>
                  </div>
                )}
                {/* View detail arrow */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/60 border border-border/50 flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-3">
              <Link href={`/product/${product.node.handle}`}>
                <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-tight mb-2">
                  {product.node.title}
                </p>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">${price}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!inStock}
                  className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center btn-press disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Add to cart"
                >
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
