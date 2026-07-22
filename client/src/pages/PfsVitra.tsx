import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

export default function PfsVitra() {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const handleAddToCart = () => {
    addItem({
      variantId: 'gid://shopify/ProductVariant/52548822925444',
      productId: 'gid://shopify/Product/10412763971716',
      title: 'PFS VITRA',
      variantTitle: 'Glass Shield Washable Coating',
      price: { amount: '80.00', currencyCode: 'USD' },
      quantity: 1,
      image: null,
      handle: 'pfs-vitra',
    });
    toast.success('PFS VITRA added to cart');
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="PFS VITRA - Glass Shield Washable Coating | PFS Filters"
        description="PFS VITRA washable glass shield coating. Protect your paint booth glass from overspray. Easy to apply, easy to wash off. Available from PFS Filters."
        canonical="https://pfsfilters.com/consumables/pfs-vitra"
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
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] aspect-square flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-white/30" />
              </div>
              <p className="text-white/40 text-lg font-medium mb-1">Image Coming Soon</p>
              <p className="text-white/25 text-sm">Product design in progress</p>
              {/* PFS Logo watermark */}
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent_e33888bf.png"
                alt="PFS Filters"
                className="w-32 opacity-20 mt-8"
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
                  <span>Ships same day on orders before 2pm PST</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-500 text-white hover:bg-blue-500/90 font-bold text-base py-6 gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — $80.00
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

      <Footer />
    </div>
  );
}
