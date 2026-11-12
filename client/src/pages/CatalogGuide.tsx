import { useParams } from 'wouter';
import { GuideArticle } from '@/components/GuideArticle';
import { bundledShopifyProducts } from '@/lib/productCatalog';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import {
  CROSSREF_PAGES,
  andreaeFaqs,
  andreaeSections,
  comparisonFaqs,
  comparisonSections,
  crossRefFaqs,
  crossRefSections,
  measureFaqs,
  measureSections,
  shippingFaqs,
  shippingSections,
  sizeChartFaqs,
  sizeChartSections,
} from '@shared/catalogGuides.mjs';
import NotFound from '@/pages/NotFound';

const products = bundledShopifyProducts.map((product) => product.node);

const STATIC = [
  { path: '/guides/filter-size-chart', h1: 'Paint Booth Filter Size Chart', sections: sizeChartSections(products), faqs: sizeChartFaqs() },
  { path: '/guides/andreae-af-numbers', h1: 'Andreae AF Number Guide', sections: andreaeSections(products), faqs: andreaeFaqs(products) },
  { path: '/guides/how-to-measure-paint-booth-filters', h1: 'How to Measure a Paint Booth Filter', sections: measureSections(), faqs: measureFaqs() },
  { path: '/guides/andreae-vs-fiberglass-vs-paint-pockets', h1: 'Andreae, Fiberglass, and Paint Pockets', sections: comparisonSections(products), faqs: comparisonFaqs() },
  { path: '/guides/shipping-and-freight', h1: 'Shipping and Freight for Paint Booth Filters', sections: shippingSections(products), faqs: shippingFaqs() },
];

export default function CatalogGuide() {
  const params = useParams<{ slug: string }>();
  const path = `/guides/${params.slug || ''}`;
  const cross = CROSSREF_PAGES.find((page) => page.path === path);
  const page = cross
    ? { h1: cross.h1, sections: crossRefSections(cross, products), faqs: crossRefFaqs(cross) }
    : STATIC.find((item) => item.path === path);
  if (!page) return <NotFound />;

  const canonical = `https://www.pfsfilters.com${path}`;
  return (
    <GuideArticle
      title={`${page.h1} | PFS Filters`}
      description="Recorded filter rows and catalog prices from PFS Filters. Directory sizes are not confirmed fitment."
      canonical={canonical}
      h1={page.h1}
      lede="Built from the PFS booth directory and the current catalog. Measure the opening before ordering. Rows are not marked as confirmed fitment."
      crumbs={[{ label: 'Guides', href: '/guides/filter-size-chart' }, { label: page.h1 }]}
      sections={page.sections}
      faqs={page.faqs}
      links={[
        { href: '/shop-by-booth', label: 'Booth brand directory' },
        { href: '/filter-part-numbers', label: 'Part numbers' },
        { href: '/paint-booth-filters', label: 'Paint booth filters' },
        { href: '/spray-booth-filters', label: 'Spray booth filters' },
        { href: '/guides/shipping-and-freight', label: 'Shipping and freight' },
      ]}
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.pfsfilters.com/' },
            { name: page.h1, url: canonical },
          ]),
          createFAQSchema(page.faqs),
        ],
      }}
    />
  );
}
