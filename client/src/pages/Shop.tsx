import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { ShopifyProducts } from '@/components/ShopifyProducts';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { getImmediateShopifyProducts, listShopSizes } from '@/lib/productCatalog';
import { LineupHeader } from '@/components/Lineup';
import { KeywordGuide } from '@/components/KeywordGuide';
import { shopKeyword } from '@/data/keywordPages';
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
  '@graph': [breadcrumbSchema, createFAQSchema([...shopFaqs, ...shopKeyword.faqs])],
};

const SHOP_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Exhaust', value: 'exhaust' },
  { label: 'Intake', value: 'intake' },
  { label: 'Ceiling', value: 'ceiling' },
  { label: 'Prefilter', value: 'pre-filters' },
];

export default function Shop() {
  const [location, setLocation] = useLocation();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [textQuery, setTextQuery] = useState('');
  const sizeOptions = useMemo(() => listShopSizes(getImmediateShopifyProducts()), []);

  const writeFilters = (category: string | null, size: string | null) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (size) params.set('size', size);
    const query = params.toString();
    setCategoryFilter(category);
    setSizeFilter(size);
    setLocation(query ? `/shop?${query}` : '/shop');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategoryFilter(params.get('category'));
    setSizeFilter(params.get('size'));
    setTextQuery(params.get('q') || '');
  }, [location]);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Filters | Arrestor Pads, Rolls, Intake and Ceiling"
        description="Shop paint booth filters: 20×20×2 22-gram arrestor pads, 20×100 and 36×100 exhaust rolls, Paint Pockets, tacky panels, ceiling media, and MERV 10 prefilters."
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
            <p className="serif-note mx-auto mb-3 max-w-3xl text-2xl text-[#ececec]">
              Arrestor pads, exhaust rolls, tacky panels, ceiling media, and MERV 10 prefilters.
            </p>
            <p className="text-lg text-white/50 max-w-3xl mx-auto">
              Browse spray booth filters and paint arrestors for intake, ceiling, prefilter, and exhaust stages. Confirm the booth position and exact dimensions before ordering.
            </p>
          </div>
        </div>
      </section>


      {/* Products grid - raised section */}
      <section className="section-raised py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <label htmlFor="shop-search" className="mb-2 block text-sm text-white/70">Search</label>
              <input
                id="shop-search"
                type="search"
                value={textQuery}
                onChange={(event) => setTextQuery(event.target.value)}
                placeholder="Search by size, material, or name"
                className="min-h-11 w-full rounded-lg border border-white/15 bg-black/40 px-4 text-base text-white outline-none placeholder:text-white/40 focus:border-blue-500"
              />
            </div>
            <div className="shop-chip-bar">
              <p id="shop-type-label" className="mb-2 text-sm text-white/70">Type</p>
              <div className="flex flex-wrap gap-2" role="group" aria-labelledby="shop-type-label">
                {SHOP_FILTERS.map((filter) => {
                  const active = (categoryFilter || '') === filter.value || (filter.value === 'pre-filters' && (categoryFilter === 'prefilter' || categoryFilter === 'prefilters'));
                  return (
                    <button
                      key={filter.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => writeFilters(filter.value || null, sizeFilter)}
                      className={`min-h-11 rounded-full border px-4 text-sm font-medium ${active ? 'border-blue-600 bg-blue-600 text-white' : 'border-white/15 bg-black/40 text-white/80 hover:border-white/40'}`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label htmlFor="shop-size" className="mb-2 block text-sm text-white/70">Size</label>
              <select
                id="shop-size"
                value={sizeFilter || ''}
                onChange={(event) => writeFilters(categoryFilter, event.target.value || null)}
                className="min-h-11 w-full rounded-lg border border-white/15 bg-black/40 px-3 text-base text-white sm:max-w-xs"
              >
                <option value="">All sizes</option>
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <LineupHeader title="Find your filter." href="/shop-by-type" linkLabel="Shop by type" />
          <ShopifyProducts categoryFilter={categoryFilter} sizeFilter={sizeFilter} textQuery={textQuery} />
          <KeywordGuide paragraphs={shopKeyword.paragraphs} faqs={shopKeyword.faqs} links={shopKeyword.links} />
        </div>
      </section>


      <Suspense fallback={<div className="section-glow min-h-[520px]" aria-label="Loading shop guidance" />}>
        <ShopBelowFold />
      </Suspense>
    </div>
  );
}
