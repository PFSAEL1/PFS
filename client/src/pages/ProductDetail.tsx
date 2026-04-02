// ABC Filters iOS — Product Detail v4
// Tesla-grade: full-bleed image, sticky add-to-cart, premium typography
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { ArrowLeft, ShoppingCart, Package, Check, ChevronRight, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [, navigate] = useLocation();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle)
      .then((data: ShopifyProduct['node']) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIdx]?.node;
    if (!variant) return;
    setAdding(true);
    addItem({
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: product.images.edges[selectedImage]?.node.url,
      handle: product.handle,
    });
    toast.success('Added to cart!', { description: product.title });
    // Open cart immediately — no delay
    setCartOpen(true);
    setTimeout(() => setAdding(false), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-72 shimmer" />
        <div className="px-4 pt-5 space-y-3">
          <div className="h-6 w-3/4 rounded-xl shimmer" />
          <div className="h-4 w-1/3 rounded-xl shimmer" />
          <div className="h-4 rounded-xl shimmer mt-4" />
          <div className="h-4 w-5/6 rounded-xl shimmer" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
          style={{ background: 'oklch(0.16 0.006 240)', border: '0.5px solid oklch(0.28 0.010 240)' }}>
          <Package className="w-8 h-8 text-muted-foreground/40" />
        </div>
        <p className="text-[15px] font-semibold mb-1">Product not found</p>
        <button onClick={() => navigate('/shop')}
          className="mt-4 px-5 py-2.5 rounded-2xl text-[13px] font-semibold btn-press"
          style={{ background: 'oklch(0.60 0.22 232)', color: 'white' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const price = selectedVariant?.price?.amount ? parseFloat(selectedVariant.price.amount).toFixed(2) : '—';
  const inStock = selectedVariant?.availableForSale ?? true;
  const mainImage = images[selectedImage]?.node.url;

  return (
    <div className="min-h-screen bg-background" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 34px) + 100px)' }}>
      {/* ── Back button (floating over image) ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ paddingTop: 'env(safe-area-inset-top, 44px)', paddingBottom: 12 }}>
        <button
          onClick={() => navigate('/shop')}
          className="w-10 h-10 rounded-2xl flex items-center justify-center btn-press"
          style={{ background: 'oklch(0.09 0.006 240 / 0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '0.5px solid oklch(1 0 0 / 0.12)' }}>
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setCartOpen(true)}
          className="w-10 h-10 rounded-2xl flex items-center justify-center btn-press"
          style={{ background: 'oklch(0.09 0.006 240 / 0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '0.5px solid oklch(1 0 0 / 0.12)' }}>
          <ShoppingCart className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* ── Full-bleed product image ── */}
      <div className="relative product-img-bg" style={{ height: 320 }}>
        {mainImage
          ? <img src={mainImage} alt={product.title} className="w-full h-full object-contain p-8" />
          : <div className="w-full h-full flex items-center justify-center"><Package className="w-16 h-16 text-muted-foreground/30" /></div>
        }
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 mt-3 overflow-x-auto scrollbar-none">
          {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden btn-press"
              style={{
                border: `1.5px solid ${selectedImage === i ? 'oklch(0.60 0.22 232)' : 'oklch(0.25 0.010 240)'}`,
                background: 'oklch(0.13 0.008 240)',
              }}>
              <img src={img.node.url} alt="" className="w-full h-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}

      {/* ── Product info ── */}
      <div className="px-4 mt-4">
        {/* Title & price */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h1 className="text-[20px] font-bold tracking-tight leading-tight flex-1">{product.title}</h1>
          <span className="text-[22px] font-black text-primary flex-shrink-0">${price}</span>
        </div>

        {/* Stars placeholder */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: 'oklch(0.75 0.18 80)' }} />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">5.0 (Premium Quality)</span>
        </div>

        {/* Stock status */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full" style={{ background: inStock ? 'oklch(0.65 0.18 160)' : 'oklch(0.577 0.245 27.325)' }} />
          <span className="text-[12px] font-medium" style={{ color: inStock ? 'oklch(0.65 0.18 160)' : 'oklch(0.577 0.245 27.325)' }}>
            {inStock ? 'In Stock — Ships 1-2 Days' : 'Out of Stock'}
          </span>
        </div>

        {/* Variants */}
        {variants.length > 1 && (
          <div className="mb-5">
            <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((v: { node: { id: string; title: string } }, i: number) => (
                <button
                  key={v.node.id}
                  onClick={() => setSelectedVariantIdx(i)}
                  className="px-3.5 py-2 rounded-xl text-[12px] font-semibold btn-press"
                  style={{
                    background: selectedVariantIdx === i ? 'oklch(0.60 0.22 232)' : 'oklch(0.16 0.006 240)',
                    color: selectedVariantIdx === i ? 'white' : 'oklch(0.70 0.008 240)',
                    border: `0.5px solid ${selectedVariantIdx === i ? 'transparent' : 'oklch(0.28 0.010 240)'}`,
                  }}>
                  {v.node.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="mb-5">
            <p className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</p>
            <p className="text-[14px] leading-relaxed" style={{ color: 'oklch(0.68 0.008 240)' }}>
              {product.description.slice(0, 280)}{product.description.length > 280 ? '...' : ''}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="rounded-2xl p-4 mb-5"
          style={{ background: 'oklch(0.13 0.008 240)', border: '0.5px solid oklch(0.25 0.010 240)' }}>
          {['Premium filtration media', 'Fast 1-2 day shipping', 'Quality guaranteed', 'Expert support available'].map((feat) => (
            <div key={feat} className="flex items-center gap-3 py-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'oklch(0.60 0.22 232 / 0.15)' }}>
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[13px]" style={{ color: 'oklch(0.75 0.006 240)' }}>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sticky Add to Cart ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 34px) + 12px)',
          background: 'oklch(0.09 0.006 240 / 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '0.5px solid oklch(0.22 0.008 240 / 0.8)',
          paddingTop: 12,
        }}>
        <button
          onClick={handleAddToCart}
          disabled={!inStock || adding}
          className="w-full py-4 rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 btn-press disabled:opacity-40"
          style={{ background: adding ? 'oklch(0.65 0.18 160)' : 'oklch(0.60 0.22 232)', color: 'white' }}>
          {adding ? (
            <><Check className="w-5 h-5" /> Added to Cart</>
          ) : (
            <><ShoppingCart className="w-5 h-5" /> Add to Cart — ${price}</>
          )}
        </button>
      </div>
    </div>
  );
}
