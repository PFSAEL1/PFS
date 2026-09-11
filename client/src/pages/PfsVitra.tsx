import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';

// PFS VITRA variant info — same format as Shopify products
const PFS_VITRA_VARIANT_ID = 'gid://shopify/ProductVariant/52571232206980';
const PFS_VITRA_PRODUCT_ID = 'gid://shopify/Product/10419370885252';
const Footer = lazy(() => import('@/components/Footer').then((module) => ({ default: module.Footer })));

function DeferredFooter() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (showFooter) return;
    const interactionEvents = ['scroll', 'click', 'touchstart', 'pointerdown', 'keydown'] as const;
    let observer: IntersectionObserver | undefined;

    const revealFooter = () => setShowFooter(true);
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, revealFooter);
      });
    };

    if ('IntersectionObserver' in window && sentinelRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) revealFooter();
        },
        { rootMargin: '900px 0px' },
      );
      observer.observe(sentinelRef.current);
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, revealFooter, { once: true, passive: true });
    });

    return () => {
      observer?.disconnect();
      removeInteractionListeners();
    };
  }, [showFooter]);

  if (!showFooter) return <div ref={sentinelRef} style={{ minHeight: 420 }} aria-hidden="true" />;

  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
}

export default function PfsVitra() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      const [{ useCartStore }, { toast }] = await Promise.all([
        import('@/stores/cartStore'),
        import('sonner'),
      ]);
      const { addItem, setCartOpen } = useCartStore.getState();
      addItem({
        variantId: PFS_VITRA_VARIANT_ID,
        productId: PFS_VITRA_PRODUCT_ID,
        title: 'PFS VITRA',
        variantTitle: 'Default',
        price: { amount: '80.00', currencyCode: 'USD' },
        quantity,
        image: undefined,
        handle: 'pfs-vitra',
      });
      toast.success('PFS VITRA added to cart');
      setCartOpen(true);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="PFS VITRA - Glass Shield Washable Coating | PFS Filters"
        description="PFS VITRA washable glass shield coating. Protect your paint booth glass from overspray. Easy to apply, easy to wash off. Available from PFS Filters."
        canonical="https://www.pfsfilters.com/consumables/pfs-vitra"
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Consumables', href: '/consumables' }, { label: 'PFS VITRA' }]} />
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Product section */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Image placeholder */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] aspect-square min-h-[320px] flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-white/30" />
              </div>
              <p className="text-white/40 text-lg font-medium mb-1">Image Coming Soon</p>
              <p className="text-white/25 text-sm">Product design in progress</p>
              {/* PFS Logo watermark */}
              <img
                src="/images/brands/pfs-logo-wide-420.webp"
                alt="PFS Filters"
                className="w-32 opacity-20 mt-8"
                width={420}
                height={127}
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                  Consumables
                </span>
                <h1 className="text-4xl font-extrabold text-white pfs-heading-animate mt-2">PFS VITRA</h1>
                <p className="text-white/50 text-lg mt-2">Glass Shield Washable Coating</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-400">$80.00</span>
                <span className="text-white/40 text-sm">USD</span>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-white/70 leading-relaxed">
                  PFS VITRA is a professional-grade washable glass shield coating designed to protect your paint booth windows and glass surfaces from overspray buildup. Easy to apply, easy to remove — keeps your booth visibility crystal clear.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <ShieldCheck className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Professional-grade protection</span>
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Truck className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Stocked items typically process in 1–2 business days</span>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <span className="text-white/60 text-sm">Quantity:</span>
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-white/60 hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-white font-medium min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-white/60 hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-blue-500 text-white hover:bg-blue-500/90 font-bold text-base py-6 gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isAdding ? 'Adding...' : `Add to Cart — $${(80 * quantity).toFixed(2)}`}
                </Button>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mt-6">
                <p className="text-white/50 text-xs leading-relaxed">
                  <strong className="text-white/70">Note:</strong> PFS VITRA is currently being rebranded under the PFS Filters label. Product packaging and imagery will be updated soon. The product formulation remains the same premium quality you expect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <DeferredFooter />
    </div>
  );
}
