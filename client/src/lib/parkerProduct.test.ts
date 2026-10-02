import { existsSync, readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { PARKER_CASE_HANDLE, PARKER_SHORT_DESCRIPTION, ParkerProductDetails } from '@/components/ParkerProductDetails';
import { getLocalProductThumbnail, shopProductCardImageUrl } from '@/lib/imageUrls';

const root = new URL('../../../', import.meta.url);
const product = snapshot.find(({ node }) => node.handle === PARKER_CASE_HANDLE)?.node;
const variant = product?.variants.edges[0]?.node;
const imagePath = '/images/products/parker/loadtech-merv14-manufacturer-photo.jpg';

function source(path: string) {
  return readFileSync(new URL(path, root), 'utf8');
}

describe('Parker LoadTECH case listing', () => {
  it('uses the exact single-header Parker item, not the initially linked no-header item', () => {
    expect(product?.id).toBe('gid://shopify/Product/15400350220420');
    expect(product?.vendor).toBe('Parker');
    expect(product?.title).toContain('Single Header (Case of 3)');
    expect(product?.description).toContain('PLT4-M14-13-PH');
    expect(product?.description).toContain('1136513');
    expect(JSON.stringify(product)).not.toContain('1136403');
    expect(JSON.stringify(product)).not.toContain('PLT4-M14-13-NH');
    expect(product?.tags).toContain('Case of 3');
  });

  it('prices a full case of three at the approved 30% cost markup', () => {
    expect(variant?.id).toBe('gid://shopify/ProductVariant/67596876578948');
    expect(variant?.sku).toBe('PFS-PLT4-M14-13-PH-3PK');
    expect(Math.round(7197 * 3 * 1.30)).toBe(28068);
    expect(variant?.price).toEqual({ amount: '280.68', currencyCode: 'USD' });
    expect(product?.priceRange.minVariantPrice.amount).toBe('280.68');
    expect(product?.description).toContain('quantity one is one case');
    expect(variant?.sellingPlanAllocations?.edges).toEqual([]);
  });

  it('shows only a genuine Parker-issued brochure photo with representative-series alt text', () => {
    expect(product?.images.edges).toHaveLength(1);
    expect(product?.images.edges[0].node.url).toContain('cdn.shopify.com');
    expect(product?.images.edges[0].node.altText).toContain('manufacturer product photograph representative of the series');
    expect(getLocalProductThumbnail(PARKER_CASE_HANDLE)?.src).toBe(imagePath);
    expect(shopProductCardImageUrl(PARKER_CASE_HANDLE, 'https://cdn.shopify.com/example.jpg')).toBe(imagePath);
    const photo = readFileSync(new URL(`client/public${imagePath}`, root));
    expect([...photo.subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);
    expect(photo.length).toBeGreaterThan(10_000);
    expect(existsSync(new URL('client/public/images/products/parker/loadtech-single-header-schematic.png', root))).toBe(false);
    expect(existsSync(new URL('client/public/images/products/parker/loadtech-single-header-schematic.svg', root))).toBe(false);
  });

  it('uses a short PFS summary and keeps longer technical information in a closed, accessible panel', () => {
    expect(PARKER_SHORT_DESCRIPTION).toContain('PFS Filters offers');
    expect(PARKER_SHORT_DESCRIPTION).toContain('case of three');
    expect(PARKER_SHORT_DESCRIPTION.length).toBeLessThan(380);
    const closed = renderToStaticMarkup(createElement(ParkerProductDetails));
    expect(closed).toContain('Product details &amp; specifications');
    expect(closed).toContain('aria-expanded="false"');
    expect(closed).not.toContain('Manufacturer initial resistance');
    const detailSource = source('client/src/components/ParkerProductDetails.tsx');
    expect(detailSource).toContain('aria-controls={panelId}');
    expect(detailSource).toContain('0.51 in. w.g.');
    expect(detailSource).toContain('37 sq ft');
    expect(source('client/src/pages/ProductDetail.tsx')).toContain('isParkerCase && <ParkerProductDetails />');
  });

  it('says available to order without fabricating on-hand stock or lead time', () => {
    expect(variant?.availableForSale).toBe(true);
    expect(product?.description).toContain('Not on-hand stock');
    expect(product?.description).toContain('Shipping calculated separately');
    expect(product?.description).not.toMatch(/3.week|in.stock|ships in|freight included/i);
    const page = source('client/src/pages/ProductDetail.tsx');
    const generator = source('scripts/generate-seo-assets.mjs');
    expect(page).toContain('>Available to order</Badge>');
    expect(page).toContain("isParkerCase ? 'https://schema.org/BackOrder'");
    expect(page).toContain('!isParkerCase && <PfsBoothCompatibility product={product} />');
    expect(page).toContain("isParkerCase ? 'pr-16 md:pr-0' : ''");
    expect(generator).toContain("isParkerCase\n    ? 'https://schema.org/BackOrder'");
  });
});
