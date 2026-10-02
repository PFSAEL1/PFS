import { existsSync, readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { AFC_CASE_HANDLE, AFC_SHORT_DESCRIPTION, AfcProductDetails } from '@/components/AfcProductDetails';
import { getLocalProductThumbnail, shopProductCardImageUrl } from '@/lib/imageUrls';

const root = new URL('../../../', import.meta.url);
const product = snapshot.find(({ node }) => node.handle === AFC_CASE_HANDLE)?.node;
const variant = product?.variants.edges[0]?.node;
const imagePath = '/images/products/afc/afc-blue-poly-cube-2-pocket-restored.webp';
const source = (path: string) => readFileSync(new URL(path, root), 'utf8');

describe('AFC blue polyester two-pocket case-of-six listing', () => {
  it('uses the owner-supplied no-header product identity and case configuration', () => {
    expect(snapshot.filter(({ node }) => node.handle === AFC_CASE_HANDLE)).toHaveLength(1);
    expect(product?.id).toBe('gid://shopify/Product/15400364802180');
    expect(product?.vendor).toBe('AFC Filters');
    expect(product?.title).toBe('AFC 2-Pocket Blue Poly Exhaust Cube — 20 × 20 × 15 in (Case of 6)');
    expect(product?.title).not.toContain('No Header');
    expect(product?.description).toContain('no galvanized steel header');
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

  it('serves the enhanced owner-supplied AFC photo on a true alpha background', () => {
    expect(product?.images.edges).toHaveLength(1);
    expect(product?.images.edges[0].node.url).toContain('xvKEWYmcRnYaDWJv.png');
    expect(product?.images.edges[0].node.altText).toContain('Enhanced owner-supplied photograph');
    expect(getLocalProductThumbnail(AFC_CASE_HANDLE)?.src).toBe(imagePath);
    expect(getLocalProductThumbnail(AFC_CASE_HANDLE)?.width).toBe(960);
    expect(shopProductCardImageUrl(AFC_CASE_HANDLE, 'https://cdn.shopify.com/example.png')).toBe(imagePath);
    const photo = readFileSync(new URL(`client/public${imagePath}`, root));
    expect(photo.toString('ascii', 0, 4)).toBe('RIFF');
    expect(photo.toString('ascii', 8, 12)).toBe('WEBP');
    expect(photo.length).toBeGreaterThan(80_000);
    expect(existsSync(new URL('client/public/images/products/afc/afc-blue-poly-cube-2-pocket-20x20x15-6cs.png', root))).toBe(false);
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
