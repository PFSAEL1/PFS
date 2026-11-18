import { useLocation } from 'wouter';
import { GuideArticle } from '@/components/GuideArticle';
import { bundledShopifyProducts } from '@/lib/productCatalog';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { industryPages } from '@shared/industryPages.mjs';
import NotFound from '@/pages/NotFound';

const products = bundledShopifyProducts.map((product) => product.node);

export default function IndustryLanding() {
  const [location] = useLocation();
  const page = industryPages(products).find((item) => item.path === location);
  if (!page) return <NotFound />;
  const canonical = `https://www.pfsfilters.com${page.path}`;
  return (
    <GuideArticle
      title={page.title}
      description={page.description}
      canonical={canonical}
      h1={page.h1}
      lede={page.description}
      crumbs={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: page.h1 }]}
      sections={page.sections}
      faqs={page.faqs}
      links={[
        { href: '/paint-booth-filters', label: 'Paint booth filters' },
        { href: '/exhaust-filters', label: 'Paint booth exhaust filters' },
        { href: '/shop-by-type', label: 'Shop filters by type' },
        { href: '/industries/automotive-paint-booth-filters', label: 'Automotive paint booth filters' },
        { href: '/guides/filter-size-chart', label: 'Filter size chart' },
        { href: '/bulk-paint-booth-filters', label: 'Bulk paint booth filter orders' },
        { href: '/filter-rotation-program', label: 'Filter rotation program' },
      ]}
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.pfsfilters.com/' },
            { name: 'Paint Booth Filters', url: 'https://www.pfsfilters.com/paint-booth-filters' },
            { name: page.h1, url: canonical },
          ]),
          createFAQSchema(page.faqs),
        ],
      }}
    />
  );
}
