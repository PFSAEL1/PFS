import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { ShopifyProducts } from '@/components/ShopifyProducts';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import faqData from '@/data/faqData.json';

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

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Products grid - raised section */}
      <section className="section-raised tex-dots py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <ShopifyProducts categoryFilter={categoryFilter} sizeFilter={sizeFilter} />
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Suspense fallback={<div className="section-glow min-h-[520px]" aria-label="Loading shop guidance" />}>
        <ShopBelowFold />
      </Suspense>
    </div>
  );
}
