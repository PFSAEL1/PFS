import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchProductByHandle, fetchRelatedProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { createProductSchema, createBreadcrumbSchema } from '@/lib/structuredData';
import { ShoppingCart, Loader2, Package, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { ProductSpecs } from '@/components/ProductSpecs';
import { PfsBoothCompatibility } from '@/components/PfsBoothCompatibility';
import { ProductBadges } from '@/components/ProductBadge';
import { getProductBadges } from '@/lib/productSignals';

const FALLBACK_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-product_42a81f27.jpg';

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ReturnType<typeof Object.create> | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number; show: boolean }>({ x: 50, y: 50, show: false });
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle).then((data) => {
      setProduct(data);
      if (data?.variants?.edges?.[0]) {
        setSelectedVariantId(data.variants.edges[0].node.id);
      }
      fetchRelatedProducts(data?.id || '', 4).then(setRelatedProducts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080808] text-white">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <Package className="h-16 w-16 mx-auto mb-4 text-white/50 opacity-30" />
          <h1 className="text-3xl font-bold mb-4 text-white pfs-heading-animate">Product Not Found</h1>
          <Link href="/shop"><Button>Browse All Products</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants?.edges?.find((e: { node: { id: string } }) => e.node.id === selectedVariantId)?.node
    || product.variants?.edges?.[0]?.node;
  const images = product.images?.edges || [];
  const price = selectedVariant?.price?.amount ? parseFloat(selectedVariant.price.amount).toFixed(2) : '—';
  const currency = selectedVariant?.price?.currencyCode || 'USD';
  const inStock = selectedVariant?.availableForSale ?? true;
  const mainImage = images[selectedImage]?.node?.url || FALLBACK_IMAGE;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://pfsfilters.com' },
    { name: 'Shop', url: 'https://pfsfilters.com/shop' },
    { name: product.title, url: `https://pfsfilters.com/product/${handle}` },
  ]);

  const productSchema = createProductSchema({
    name: product.title,
    description: product.description,
    image: mainImage,
    price,
    currency,
    url: `https://pfsfilters.com/product/${handle}`,
    availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  });

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      image: mainImage,
      handle: handle || '',
    });
    toast.success(`${product.title} added to cart`);
    setCartOpen(true);
  };

  const handleAddRelatedToCart = (rp: ShopifyProduct) => {
    const variant = rp.node.variants?.edges?.[0]?.node;
    if (!variant) return;
    addItem({
      variantId: variant.id,
      productId: rp.node.id,
      title: rp.node.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: rp.node.images?.edges?.[0]?.node?.url || FALLBACK_IMAGE,
      handle: rp.node.handle,
    });
    toast.success(`${rp.node.title} added to cart`);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a' }}>
      <SEO
        title={`${product.title} - PFS Filters`}
        description={product.description || `Buy ${product.title} from PFS Filters. Premium paint booth filtration products with fast nationwide shipping.`}
        canonical={`https://pfsfilters.com/product/${handle}`}
        ogImage={mainImage}
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, productSchema] }}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 md:px-4 pt-28 pb-20">
        <div className="[&_*]:!text-[#9aa0a6] [&_a:hover]:!text-white">
          <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: product.title }]} />
        </div>
        <Link href="/shop">
          <Button variant="ghost" size="sm" className="gap-2 mb-6 -ml-2 text-[#bdbdbd] hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div
              className="group/zoom relative aspect-square overflow-hidden shadow-xl mb-4 cursor-zoom-in"
              style={{ backgroundColor: '#161616', backgroundImage: 'radial-gradient(circle at 50% 42%, rgba(80,90,110,0.18), rgba(13,13,13,0) 62%)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                  show: true,
                });
              }}
              onMouseLeave={() => setZoom((z) => ({ ...z, show: false }))}
            >
              <ProductBadges badges={getProductBadges(product)} />
              <img src={mainImage} alt={product.title} className="relative z-[1] w-full h-full object-cover" />
              {/* Zoom-detail circle (desktop) */}
              <div
                className={`pointer-events-none absolute hidden md:block h-44 w-44 rounded-full border-2 border-white/70 shadow-2xl ring-1 ring-black/30 transition-opacity duration-150 ${zoom.show ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: `calc(${zoom.x}% - 88px)`,
                  top: `calc(${zoom.y}% - 88px)`,
                  backgroundImage: `url(${mainImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '250%',
                  backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                  backgroundColor: '#161616',
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-white/10'}`}
                  >
                    <img src={img.node.url} alt={img.node.altText || product.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{product.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-blue-400">${price}</span>
              <span className="text-white/50">{currency}</span>
              {inStock ? (
                <Badge className="bg-green-100 text-green-800">In Stock</Badge>
              ) : (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>

            {product.description && (
              <p className="text-white/70 leading-relaxed mb-6">{product.description}</p>
            )}

            {/* Variant selector */}
            {product.variants?.edges?.length > 1 && (
              <div className="mb-6">
                <p className="font-semibold mb-2 text-white">Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((edge: { node: { id: string; title: string; availableForSale: boolean } }) => (
                    <button
                      key={edge.node.id}
                      onClick={() => setSelectedVariantId(edge.node.id)}
                      className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-colors ${
                        selectedVariantId === edge.node.id
                          ? 'border-blue-400 bg-blue-500/15 text-blue-300'
                          : 'border-[#3a3a3a] bg-[#1a1a1a] text-white/85 hover:border-blue-400/60 hover:bg-[#202020]'
                      } ${!edge.node.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!edge.node.availableForSale}
                    >
                      {edge.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-white/10 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-accent transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-accent transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                className="flex-1 bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2"
                size="lg"
                onClick={handleAddToCart}
                disabled={!inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-2 pt-6">
              {[
                { icon: Truck, label: 'Fast Shipping', sub: '1-2 day processing' },
                { icon: Shield, label: 'Quality Guaranteed', sub: 'Or we make it right' },
                { icon: Package, label: 'Custom Sizes', sub: 'Cut to spec' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3" style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
                  <item.icon className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white/90">{item.label}</p>
                  <p className="text-xs text-white/55">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical specifications */}
        <ProductSpecs product={product} />

        {/* PFS booth compatibility */}
        <PfsBoothCompatibility product={product} />

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <Card key={rp.node.id} className="flex flex-col bg-[#161616] border border-white/[0.07] hover:border-blue-400/40 hover:shadow-md transition-all overflow-hidden">
                  <Link href={`/product/${rp.node.handle}`} className="cursor-pointer">
                    <div className="aspect-square overflow-hidden bg-[#1e1e1e]">
                      <img
                        src={rp.node.images.edges[0]?.node.url || FALLBACK_IMAGE}
                        alt={rp.node.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <CardContent className="flex flex-1 flex-col p-3">
                    <Link href={`/product/${rp.node.handle}`} className="cursor-pointer">
                      <p className="font-medium text-sm line-clamp-2">{rp.node.title}</p>
                      <p className="text-blue-400 font-bold text-sm mt-1">
                        ${parseFloat(rp.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </Link>
                    <button
                      onClick={() => handleAddRelatedToCart(rp)}
                      className="mt-3 w-full rounded-lg bg-[#2563eb] py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#1d4ed8]"
                      style={{ padding: '10px', borderRadius: '8px' }}
                    >
                      Add to Cart
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
