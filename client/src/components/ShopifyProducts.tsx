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
      {/* Member pricing banner */}
      {discountPercent > 0 && tier && (
        <div className="mb-6 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            {tier.charAt(0).toUpperCase() + tier.slice(1)} Member
          </Badge>
          <span className="text-sm text-green-300/80">
            Your {discountPercent}% member discount is reflected in prices below
          </span>
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
