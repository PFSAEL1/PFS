import { GuideArticle } from '@/components/GuideArticle';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { bulkFaqs, bulkSections } from '@shared/guideCopy.mjs';

const PAGE_URL = 'https://www.pfsfilters.com/bulk-paint-booth-filters';

export default function BulkPaintBoothFilters() {
  return (
    <GuideArticle
      title="Bulk Paint Booth Filter Orders | PFS"
      description="Bulk paint booth filter orders for lines and multi-site shops. Case and roll prices are on the product pages. Volume pricing and payment terms are by phone."
      canonical={PAGE_URL}
      h1="Bulk Paint Booth Filter Orders"
      lede="Case and roll prices stay on the product pages. Volume pricing and payment terms are only by phone."
      crumbs={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: 'Bulk Orders' }]}
      sections={bulkSections}
      faqs={bulkFaqs}
      links={[
        { href: '/filter-rotation-program', label: 'Filter rotation program' },
        { href: '/guides/shipping-and-freight', label: 'Shipping and freight' },
        { href: '/industries/industrial-paint-booth-filters', label: 'Industrial paint booth filters' },
        { href: '/industries/truck-and-fleet-paint-booth-filters', label: 'Truck and fleet paint booth filters' },
        { href: '/industries/automotive-paint-booth-filters', label: 'Automotive paint booth filters' },
        { href: '/shop', label: 'Shop the catalog' },
      ]}
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.pfsfilters.com/' },
            { name: 'Paint Booth Filters', url: 'https://www.pfsfilters.com/paint-booth-filters' },
            { name: 'Bulk Paint Booth Filter Orders', url: PAGE_URL },
          ]),
          createFAQSchema(bulkFaqs),
        ],
      }}
    />
  );
}
