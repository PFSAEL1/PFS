import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Truck, ShoppingCart, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

// PFS VANGUARD variant info
const PFS_VANGUARD_VARIANT_ID = 'gid://shopify/ProductVariant/52571260452996';
const PFS_VANGUARD_PRODUCT_ID = 'gid://shopify/Product/10419381207172';

export default function PfsVanguard() {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const handleAddToCart = () => {
    addItem({
      variantId: PFS_VANGUARD_VARIANT_ID,
      productId: PFS_VANGUARD_PRODUCT_ID,
      title: 'PFS VANGUARD™ Complete Booth Protection Kit',
      variantTitle: 'Default',
      price: { amount: '595.00', currencyCode: 'USD' },
      quantity,
      image: undefined,
      handle: 'pfs-vanguard-complete-booth-protection-kit',
    });
    toast.success('PFS VANGUARD™ Kit added to cart');
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="PFS VANGUARD™ Complete Booth Protection Kit | PFS Filters"
        description="PFS VANGUARD™ Complete Booth Protection Kit includes premium Booth Coating and Glass Shield Coating. Protect booth surfaces and viewing glass from overspray buildup."
        canonical="https://pfsfilters.com/consumables/pfs-vanguard"
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Consumables', href: '/consumables' }, { label: 'PFS VANGUARD™' }]} />
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
              <p className="text-white/25 text-sm">Product photography in progress</p>
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
                  Booth Kit
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white pfs-heading-animate mt-2">PFS VANGUARD™</h1>
                <p className="text-white/50 text-lg mt-2">Complete Booth Protection Kit</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-400">$595.00</span>
                <span className="text-white/40 text-sm">USD</span>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-white/70 leading-relaxed">
                  Includes two professional-grade products designed to help keep your spray booth in peak condition. This kit contains our premium Booth Coating and Glass Shield Coating, giving you everything needed to protect both booth surfaces and viewing glass.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Together, these products help reduce paint buildup, simplify cleaning, maintain clear visibility, and keep your booth looking and performing its best.
                </p>
              </div>

              {/* Kit contents */}
              <div className="space-y-3 border-t border-white/10 pt-5">
                <p className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-2">Kit Includes:</p>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Sparkles className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Premium Booth Coating</span>
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <ShieldCheck className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Glass Shield Coating</span>
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
                  className="w-full bg-blue-500 text-white hover:bg-blue-500/90 font-bold text-base py-6 gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — ${(595 * quantity).toFixed(2)}
                </Button>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 mt-6">
                <p className="text-white/50 text-xs leading-relaxed">
                  <strong className="text-white/70">Professional Use:</strong> PFS VANGUARD™ is designed for professional paint booth operators. For best results, follow the included application instructions. Product imagery coming soon.
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
