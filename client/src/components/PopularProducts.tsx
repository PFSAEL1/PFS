import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export const PopularProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    fetchProducts(8)
      .then((data) => {
        setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-[#0d0d0d]/5/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">Popular Products</h2>
            <p className="text-white/50">Best-selling filters trusted by body shops nationwide</p>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="gap-2 hidden md:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const variant = product.node.variants.edges[0]?.node;
            const image = product.node.images.edges[0]?.node.url || FALLBACK_IMAGE;
            const price = variant?.price.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
            return (
              <Card key={product.node.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href={`/product/${product.node.handle}`}>
                  <div className="aspect-square overflow-hidden bg-[#0d0d0d]/5/30">
                    <img
                      src={image}
                      alt={product.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/product/${product.node.handle}`}>
                    <h3 className="font-semibold text-sm leading-tight mb-2 hover:text-blue-400 transition-colors line-clamp-2">
                      {product.node.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-blue-400">${price}</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link href="/shop">
            <Button variant="outline" className="gap-2">View All Products <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
