import { describe, expect, it } from 'vitest';
import collections from '@/data/shopifyCollections.json';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { productMatchesCategory, type ShopifyProduct } from '@/lib/shopify';
import { resolveRouteSeo } from '@shared/seoText.mjs';
import { AEROSPACE_NESHAP_PARENT_HANDLE, aerospaceNeshapProducts } from '@/lib/aerospaceCollection';

const REQUIRED_HANDLES = [
  '20x20-neshap-319-final-stage-panel-filter-20-cs',
  '20x25-neshap-319-final-stage-panel-filter-20-cs',
  '20x20x12-neshap-319-final-stage-5-pocket-bag-filter-6-cs',
  '20x25x12-neshap-319-final-stage-5-pocket-bag-filter-6-cs',
  '24x24x12-neshap-319-final-stage-6-pocket-bag-filter-6-cs',
  '20x20x15-neshap-319-final-stage-2-pocket-bag-filter-6-cs',
  '20x25x15-neshap-319-final-stage-2-pocket-bag-filter-6-cs',
  '53x112-volz-sfr-ceiling-filter-blanket-4-bag',
  '20x20x15-cg100-2-pocket-bag-filter-8-cs',
  '24x24x12-hepa-xfp-6000-6-pocket-bag-filter-5-cs',
  '20x20-me-pt-aerospace-exhaust-panel-filter-24-cs',
  '20x20x12-hepa-xfp-6-pocket-bag-filter-5-cs',
  '96x50-cpa-polyester-overspray-filter-roll',
];

const products = snapshot as unknown as ShopifyProduct[];

describe('aerospace NESHAP catalog', () => {
  it('keeps the original multi-size product and adds the 13 individual products', () => {
    const handles = products.map((product) => product.node.handle);
    expect(handles).toContain(AEROSPACE_NESHAP_PARENT_HANDLE);
    for (const handle of REQUIRED_HANDLES) {
      expect(handles).toContain(handle);
    }
    expect(aerospaceNeshapProducts().map((product) => product.node.handle)).toEqual(REQUIRED_HANDLES);
  });

  it('publishes Shopify SEO fields for a new product and the collection', () => {
    const product = products.find((entry) => entry.node.handle === REQUIRED_HANDLES[0])?.node;
    expect(product?.seo?.title).toBeTruthy();
    const seo = resolveRouteSeo(`/product/${product?.handle}`, {
      productTitle: product?.title,
      seoTitle: product?.seo?.title,
      seoDescription: product?.seo?.description,
    });
    expect(seo.title).toBe(product?.seo?.title);
    expect(seo.description).toBe(product?.seo?.description);
    expect(seo.canonical).toBe(`/product/${REQUIRED_HANDLES[0]}`);
    expect(seo.noindex).toBe(false);

    const category = resolveRouteSeo('/category/aerospace-neshap-filters');
    expect(category.title).toBe(collections['aerospace-neshap-filters'].seoTitle);
    expect(category.description).toBe(collections['aerospace-neshap-filters'].seoDescription);
  });

  it('does not let Shopify SEO replace a curated product title', () => {
    const seo = resolveRouteSeo('/product/pleated-air-filters-merv-10', {
      productTitle: 'Pleated Air Filters MERV 10',
      seoTitle: 'Should Not Win | PFS Filters',
      seoDescription: 'This Shopify description should not replace the curated meta description for an existing catalog product page.',
    });
    expect(seo.title).toBe('Pleated MERV 10 Intake Filters | PFS Filters');
  });

  it('matches only collection members on the aerospace category', () => {
    const member = products.find((product) => product.node.handle === REQUIRED_HANDLES[0]);
    const original = products.find((product) => product.node.handle === AEROSPACE_NESHAP_PARENT_HANDLE);
    expect(member && productMatchesCategory(member, 'aerospace-neshap-filters')).toBe(true);
    expect(original && productMatchesCategory(original, 'aerospace-neshap-filters')).toBe(false);
  });
});
