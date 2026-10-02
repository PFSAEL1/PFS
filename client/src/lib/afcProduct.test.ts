import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { AFC_CASE_HANDLE, AFC_SHORT_DESCRIPTION, AfcProductDetails } from '@/components/AfcProductDetails';
import { getLocalProductThumbnail, shopProductCardImageUrl } from '@/lib/imageUrls';

const root = new URL('../../../', import.meta.url);
const product = snapshot.find(({ node }) => node.handle === AFC_CASE_HANDLE)?.node;
const variant = product?.variants.edges[0]?.node;
const imagePath = '/images/products/afc/afc-blue-poly-cube-2-pocket-20x20x15-6cs.png';
const source = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('AFC blue polyester two-pocket case-of-six listing', () => {
  it('uses the owner-supplied no-header product identity and case configuration', () => {
    expect(snapshot.filter(({ node }) => node.handle === AFC_CASE_HANDLE)).toHaveLength(1);
    expect(product?.id).toBe('gid://shopify/Product/15400364802180');
    expect(product?.vendor).toBe('AFC Filters');
    expect(product?.title).toContain('No Header (Case of 6)');
    expect(product?.description).toContain('C2PPEB202015-6');
    expect(product?.description).toContain('MERV 11 per supplied product specifications');
    expect(product?.description).toContain('20 × 20 × 15 in');
    expect(product?.tags).toContain('Case of 6');
  });

  it('prices one full case at the supplied PFS staff-list price, not one filter', () => {
    expect(variant?.id).toBe('gid://shopify/ProductVariant/67596909183108');
    expect(variant?.sku).toBe('PFS-C2PPEB202015-6');
    expect(variant?.price).toEqual({ amount: '194.92', currencyCode: 'USD' });
    expect(product?.priceRange.minVariantPrice.amount).toBe('194.92');
    expect(product?.description).toContain('cart quantity one is one case');
    expect(variant?.sellingPlanAllocations?.edges).toEqual([]);
  });

  it('serves the authentic owner-supplied AFC photo on a true alpha background', () => {
    expect(product?.images.edges).toHaveLength(1);
    expect(product?.images.edges[0].node.url).toContain('MyOUGWdVFAGESXdG.png');
    expect(product?.images.edges[0].node.altText).toContain('Owner-supplied product photo');
    expect(getLocalProductThumbnail(AFC_CASE_HANDLE)?.src).toBe(imagePath);
    expect(shopProductCardImageUrl(AFC_CASE_HANDLE, 'https://cdn.shopify.com/example.png')).toBe(imagePath);
    const png = readFileSync(new URL(`client/public${imagePath}`, root));
    expect([...png.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([223, 255]);
    expect(png[25]).toBe(6);
  });

  it('keeps the PFS summary short and the longer details collapsed by default', () => {
    expect(AFC_SHORT_DESCRIPTION).toContain('PFS Filters offers');
    expect(AFC_SHORT_DESCRIPTION.length).toBeLessThan(320);
    const closed = renderToStaticMarkup(createElement(AfcProductDetails));
    expect(closed).toContain('Product details &amp; specifications');
    expect(closed).toContain('aria-expanded="false"');
    expect(closed).not.toContain('Pocket count');
    const details = source('client/src/components/AfcProductDetails.tsx');
    expect(details).toContain('Six filters per case');
    expect(details).toContain('MERV 11, per supplied product specifications');
    const page = source('client/src/pages/ProductDetail.tsx');
    expect(page).toContain('isAfcCase && <AfcProductDetails />');
    expect(page).toContain('!isAfcCase && <PfsBoothCompatibility product={product} />');
  });

  it('is orderable without fabricating on-hand stock, packed weight or shipping time', () => {
    expect(variant?.availableForSale).toBe(true);
    expect(product?.description).toContain('no on-hand stock or fulfillment time is promised');
    expect(product?.description).toContain('Shipping calculated separately');
    expect(product?.description).not.toMatch(/ships in|3.week|stock: [1-9]/i);
    const page = source('client/src/pages/ProductDetail.tsx');
    const generator = source('scripts/generate-seo-assets.mjs');
    expect(page).toContain("isParkerCase || isAfcCase ? 'https://schema.org/BackOrder'");
    expect(generator).toContain('const availability = (isParkerCase || isAfcCase)');
  });
});
