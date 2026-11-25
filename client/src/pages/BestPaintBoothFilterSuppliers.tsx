import { GuideArticle } from '@/components/GuideArticle';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { supplierFaqs, supplierSections } from '@shared/catalogGuides.mjs';

const PAGE_URL = 'https://www.pfsfilters.com/best-paint-booth-filter-suppliers';

export default function BestPaintBoothFilterSuppliers() {
  return (
    <GuideArticle
      title="Choose a Paint Booth Filter Supplier | PFS"
      description="How to choose a paint booth filter supplier in the US: catalog media, a booth-brand directory, shipping from Santa Rosa, and quotes by phone. Not a ranking."
      canonical={PAGE_URL}
      h1="How to Choose a Paint Booth Filter Supplier"
      lede="Criteria buyers use, and what PFS Filters publishes. This page is not a ranking."
      crumbs={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: 'Choosing a Supplier' }]}
      sections={supplierSections()}
      faqs={supplierFaqs()}
      links={[
        { href: '/paint-booth-filters', label: 'Paint booth filters' },
        { href: '/shop-by-booth', label: 'Booth brand directory' },
        { href: '/filter-rotation-program', label: 'Filter rotation program' },
        { href: '/bulk-paint-booth-filters', label: 'Bulk orders by phone' },
        { href: '/guides/shipping-and-freight', label: 'Shipping and freight' },
        { href: '/california/north-bay-paint-booth-filters', label: 'North Bay paint booth filters' },
        { href: '/industries/automotive-paint-booth-filters', label: 'Automotive paint booth filters' },
      ]}
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.pfsfilters.com/' },
            { name: 'Paint Booth Filters', url: 'https://www.pfsfilters.com/paint-booth-filters' },
            { name: 'How to Choose a Paint Booth Filter Supplier', url: PAGE_URL },
          ]),
          createFAQSchema(supplierFaqs()),
        ],
      }}
    />
  );
}
