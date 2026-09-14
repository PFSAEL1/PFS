import { describe, expect, it } from 'vitest';
import { resolveProductVariantId, productVariantSearch } from './productVariant';

const product = { variants: { edges: [
  { node: { id: 'gid://shopify/ProductVariant/51737934168196' } },
  { node: { id: 'gid://shopify/ProductVariant/51737934135428' } },
] } };

describe('Shopping variant links', () => {
  it('selects the advertised 100-case option instead of the first 50-case option', () => {
    expect(resolveProductVariantId(product, '51737934135428')).toBe('gid://shopify/ProductVariant/51737934135428');
  });
  it('preserves the requested option when the live product list is refreshed or reordered', () => {
    const refreshed = { variants: { edges: [...product.variants.edges].reverse() } };
    expect(resolveProductVariantId(refreshed, '51737934168196')).toBe('gid://shopify/ProductVariant/51737934168196');
  });
  it('accepts full Shopify IDs and safely handles invalid or missing products', () => {
    expect(resolveProductVariantId(product, product.variants.edges[1].node.id)).toBe(product.variants.edges[1].node.id);
    expect(resolveProductVariantId(product, 'not-this-product')).toBe(product.variants.edges[0].node.id);
    expect(resolveProductVariantId(null, '51737934135428')).toBeNull();
  });
  it('keeps ad attribution parameters when changing sizes', () => {
    const search = new URLSearchParams(productVariantSearch('?gclid=abc&utm_source=google&variant=old', product.variants.edges[1].node.id));
    expect(search.get('gclid')).toBe('abc');
    expect(search.get('utm_source')).toBe('google');
    expect(search.getAll('variant')).toEqual(['51737934135428']);
  });
});
