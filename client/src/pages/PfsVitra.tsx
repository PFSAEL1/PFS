import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Truck, ShoppingCart, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

// PFS VITRA Shopify Product ID (numeric)
const SHOPIFY_PRODUCT_ID = '10413119733892';
const SHOPIFY_DOMAIN = 'abc-filter-splash-rwyxj.myshopify.com';
const STOREFRONT_TOKEN = '5e357a0ae8e9906edb44ef570a4ed219';

export default function PfsVitra() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const buyClientRef = useRef<any>(null);

  useEffect(() => {
    // Load Shopify Buy SDK
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize the Buy SDK client
      if ((window as any).ShopifyBuy) {
        const client = (window as any).ShopifyBuy.buildClient({
          domain: SHOPIFY_DOMAIN,
          storefrontAccessToken: STOREFRONT_TOKEN,
        });
        buyClientRef.current = client;
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const client = buyClientRef.current;
      if (!client) {
        throw new Error('Shop client not loaded yet. Please wait a moment and try again.');
      }

      // Fetch the product using the Buy SDK
      const productId = `gid://shopify/Product/${SHOPIFY_PRODUCT_ID}`;
      const product = await client.product.fetch(productId);
      
      if (!product || !product.variants || product.variants.length === 0) {
        throw new Error('Product not found');
      }

      const variant = product.variants[0];

      // Create a checkout using the Buy SDK (this bypasses the Storefront Cart API)
      const checkout = await client.checkout.create();
      
      // Add the item to the checkout
      const lineItemsToAdd = [{
        variantId: variant.id,
        quantity: quantity,
      }];
      
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      
      if (updatedCheckout && updatedCheckout.webUrl) {
        toast.success('Redirecting to checkout...');
        window.location.href = updatedCheckout.webUrl;
      } else {
        throw new Error('Failed to create checkout');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Unable to process checkout. Please try again or contact us.');
    } finally {
      setLoading(false);
    }
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
                  onClick={handleBuyNow}
                  disabled={loading}
                  className="w-full bg-blue-500 text-white hover:bg-blue-500/90 font-bold text-base py-6 gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Buy Now — ${(80 * quantity).toFixed(2)}
                    </>
                  )}
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
