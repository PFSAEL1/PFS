import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { ShopifyProducts } from '@/components/ShopifyProducts';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import faqData from '@/data/faqData.json';
import { fetchProductByHandle } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const ShopBelowFold = lazy(() =>
  import('@/components/ShopBelowFold').then((module) => ({ default: module.ShopBelowFold })),
);

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com/' },
  { name: 'Shop', url: 'https://www.pfsfilters.com/shop' },
]);

const shopFaqs = faqData.filter((item) => [
  'How do I find the correct paint booth filter for my booth?',
  'What is the difference between intake and exhaust paint booth filters?',
  'Do you carry common paint booth filter sizes?',
  'Can PFS Filters help with a custom or hard-to-find size?',
  'How quickly do paint booth filter orders ship?',
  'How does Subscribe and Save work?',
].includes(item.question));

const shopSchema = {
  '@context': 'https://schema.org',
  '@graph': [breadcrumbSchema, createFAQSchema(shopFaqs)],
};

export default function Shop() {
  const [location] = useLocation();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategoryFilter(params.get('category'));
    setSizeFilter(params.get('size'));
  }, [location]);

  useEffect(() => {
    if (!window.location.hash.startsWith('#recover=')) return;
    const token = window.location.hash.slice('#recover='.length);
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    let active = true;
    const restore = async () => {
      try {
        const response = await fetch(`/api/cart-reminder-recover?token=${encodeURIComponent(decodeURIComponent(token))}`, { cache: 'no-store' });
        if (!response.ok) throw new Error('This cart link is unavailable or has expired.');
        const payload = await response.json() as { lines: Array<{ variantId: string; handle: string; quantity: number; sellingPlanId?: string }> };
        if (!Array.isArray(payload.lines) || payload.lines.length > 40) throw new Error('Invalid cart link');
        const restored = await Promise.all(payload.lines.map(async line => {
          const product = await fetchProductByHandle(line.handle);
          const variant = product?.variants?.edges?.find((edge: { node: { id: string } }) => edge.node.id === line.variantId)?.node;
          if (!variant?.availableForSale || !Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.quantity > 100) return null;
          const allocation = line.sellingPlanId ? variant.sellingPlanAllocations?.edges?.find((edge: { node: { sellingPlan: { id: string } } }) => edge.node.sellingPlan.id === line.sellingPlanId)?.node : null;
          if (line.sellingPlanId && !allocation) return null;
          return {
            variantId: variant.id, productId: product.id, title: product.title,
            variantTitle: variant.title, price: variant.price, quantity: line.quantity,
            image: product.images?.edges?.[0]?.node?.url, handle: product.handle,
            ...(allocation ? { purchaseType: 'subscription' as const, sellingPlanId: allocation.sellingPlan.id,
              sellingPlanName: allocation.sellingPlan.name, sellingPlanPrice: allocation.priceAdjustments?.[0]?.price } : {}),
          };
        }));
        if (!active) return;
        const items = restored.filter((item): item is NonNullable<typeof item> => !!item);
        if (!items.length) throw new Error('These cart items are no longer available.');
        const store = useCartStore.getState();
        for (const item of items) store.addItem(item);
        store.setCartOpen(true);
        toast.success(`Restored ${items.length} item${items.length === 1 ? '' : 's'} at current catalog prices. Review before checkout.`);
        if (items.length < payload.lines.length) toast.info('Some items were no longer available and were not restored.');
      } catch (error) {
        if (active) toast.error(error instanceof Error ? error.message : 'Unable to restore the cart.');
      }
    };
    void restore();
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Shop Paint Booth Filters, Intake & Exhaust Media"
        description="Shop fiberglass paint arrestors, tacky intake panels, ceiling media, MERV filters, roll media, and booth-specific replacements. Stocked items typically process in 1–2 business days."
        canonical="https://www.pfsfilters.com/shop"
        structuredData={shopSchema}
      />
      <Navigation />

      {/* Header section - darker base */}
      <section className="section-darker pt-28 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop' }]} />
          <div className="text-center mb-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
              Shop Paint Booth Filters
            </h1>
            <p className="text-lg text-white/50 max-w-3xl mx-auto">
              Browse <strong>spray booth filters</strong> and <strong>paint arrestors</strong> for intake, ceiling, prefilter, and exhaust stages. Confirm the booth position and exact dimensions before ordering.
            </p>
          </div>
        </div>
      </section>


      {/* Products grid - raised section */}
      <section className="section-raised tex-dots py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <ShopifyProducts categoryFilter={categoryFilter} sizeFilter={sizeFilter} />
        </div>
      </section>


      <Suspense fallback={<div className="section-glow min-h-[520px]" aria-label="Loading shop guidance" />}>
        <ShopBelowFold />
      </Suspense>
    </div>
  );
}
