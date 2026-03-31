import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2, Package } from 'lucide-react';
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
    toast.success(`${product.node.title} added to cart`);
    setCartOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const variant = product.node.variants.edges[0]?.node;
        const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
        const price = variant?.price.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
        const currency = variant?.price.currencyCode || 'USD';
        const inStock = variant?.availableForSale ?? true;

        return (
          <Card key={product.node.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <Link href={`/product/${product.node.handle}`}>
              <div className="aspect-square overflow-hidden bg-muted/30">
                <img
                  src={image}
                  alt={product.node.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/product/${product.node.handle}`}>
                <h3 className="font-semibold text-sm leading-tight mb-1 hover:text-primary transition-colors line-clamp-2">
                  {product.node.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-2 mb-3">
                <span className="font-bold text-primary">
                  ${price} <span className="text-xs font-normal text-muted-foreground">{currency}</span>
                </span>
                {!inStock && (
                  <Badge variant="secondary" className="text-xs">Out of Stock</Badge>
                )}
              </div>
              <Button
                size="sm"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => handleAddToCart(product)}
                disabled={!inStock}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
