import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { getLocalProductThumbnail, shopProductCardImageUrl } from '@/lib/imageUrls';

const root = new URL('../../../', import.meta.url);
const handle = 'parker-loadtech-merv14-20x20x4-single-header-case-3';
const product = snapshot.find(({ node }) => node.handle === handle)?.node;
const variant = product?.variants.edges[0]?.node;
const imagePath = '/images/products/parker/loadtech-single-header-schematic.png';

function source(path: string) {
  return readFileSync(new URL(path, root), 'utf8');
}

describe('Parker LoadTECH case listing', () => {
  it('uses the exact single-header Parker item, rather than the linked no-header item', () => {
    expect(product?.id).toBe('gid://shopify/Product/15400350220420');
    expect(product?.vendor).toBe('Parker');
    expect(product?.title).toContain('Single Header (Case of 3)');
    expect(product?.description).toContain('PLT4-M14-13-PH');
    expect(product?.description).toContain('1136513');
    expect(JSON.stringify(product)).not.toContain('1136403');
    expect(JSON.stringify(product)).not.toContain('PLT4-M14-13-NH');
    expect(product?.tags).toContain('Case of 3');
  });

  it('prices the entire case at the owner-approved 30% markup, not per filter', () => {
    expect(variant?.id).toBe('gid://shopify/ProductVariant/67596876578948');
    expect(variant?.sku).toBe('PFS-PLT4-M14-13-PH-3PK');
    expect(Math.round(7197 * 3 * 1.30)).toBe(28068);
    expect(variant?.price).toEqual({ amount: '280.68', currencyCode: 'USD' });
    expect(product?.priceRange.minVariantPrice.amount).toBe('280.68');
    expect(product?.description).toContain('quantity one is one case');
    expect(variant?.sellingPlanAllocations?.edges).toEqual([]);
  });

  it('shows only a PFS-owned, labeled illustration, not an incorrect no-header photo', () => {
    expect(product?.images.edges).toHaveLength(1);
    expect(product?.images.edges[0].node.url).toBe(imagePath);
    expect(product?.images.edges[0].node.altText).toContain('not a product photo');
    expect(getLocalProductThumbnail(handle)?.src).toBe(imagePath);
    expect(shopProductCardImageUrl(handle, 'https://cdn.shopify.com/example.png')).toBe(imagePath);
    const png = readFileSync(new URL(`client/public${imagePath}`, root));
    expect(png.subarray(1, 4).toString()).toBe('PNG');
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([960, 960]);
    expect(createHash('sha256').update(png).digest('hex')).toMatch(/^[a-f0-9]{64}$/);
    expect(source('client/public/images/products/parker/loadtech-single-header-schematic.svg')).toContain('NOT A PRODUCT PHOTOGRAPH');
  });

  it('does not promise on-hand stock, current supplier timing, or freight-included pricing', () => {
    expect(variant?.availableForSale).toBe(true);
    expect(product?.description).toContain('Not on-hand stock');
    expect(product?.description).toContain('Shipping calculated separately');
    expect(product?.description).not.toMatch(/3.week|in.stock|ships in|freight included/i);
    const page = source('client/src/pages/ProductDetail.tsx');
    const generator = source('scripts/generate-seo-assets.mjs');
    expect(page).toContain('Available to order · not on hand');
    expect(page).toContain("isParkerCase ? 'https://schema.org/BackOrder'");
    expect(page).toContain('!isParkerCase && <PfsBoothCompatibility product={product} />');
    expect(generator).toContain("isParkerCase\n    ? 'https://schema.org/BackOrder'");
  });
});
