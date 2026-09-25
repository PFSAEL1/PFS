import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import kochProductDetails from '@/data/kochProductDetails.json';
import productSnapshot from '@/data/shopifyProductSnapshot.json';

const repoRoot = new URL('../../../', import.meta.url);
const productDetailSource = readFileSync(new URL('client/src/pages/ProductDetail.tsx', repoRoot), 'utf8');
const seoSource = readFileSync(new URL('client/src/components/SEO.tsx', repoRoot), 'utf8');
const imageUrlSource = readFileSync(new URL('client/src/lib/imageUrls.ts', repoRoot), 'utf8');
const generatorSource = readFileSync(new URL('scripts/generate-seo-assets.mjs', repoRoot), 'utf8');
const indexSource = readFileSync(new URL('client/index.html', repoRoot), 'utf8');

const products = productSnapshot.map((edge) => edge.node);
const byHandle = new Map(products.map((product) => [product.handle, product]));

const expectedProducts = [
  {
    handle: 'koch-biomax-hepa-9999-23-375x23-375x11-5',
    id: 'gid://shopify/Product/10514140528772',
    variantId: 'gid://shopify/ProductVariant/52904722890884',
    sku: 'PFS-HBM232311',
    price: '280.63',
    image: '/images/products/koch/koch-biomax-hepa-9999-galvanized.png',
    dimensions: [400, 400],
    sha256: '9717d4da5d8d6efdeb8174abbc668fea7bd486b997dc6c69635232c4b34357e1',
  },
  {
    handle: 'koch-spraystop-stk10-61x90-roll',
    id: 'gid://shopify/Product/10514140561540',
    variantId: 'gid://shopify/ProductVariant/52904722923652',
    sku: 'PFS-STKM6190',
    price: '242.37',
    image: '/images/products/koch/koch-spraystop-stk10-roll.png',
    dimensions: [400, 400],
    sha256: 'a2f5787a06181c9481574152a491fbd77ca74d2860334f4ced82fc690193b84c',
  },
] as const;

function pngDimensions(pathname: string): [number, number] {
  const buffer = readFileSync(new URL(`client/public${pathname}`, repoRoot));
  expect(buffer.subarray(1, 4).toString()).toBe('PNG');
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

describe('Koch catalog products', () => {
  it.each(expectedProducts)('bundles exact Shopify identifiers, SKU, price, and local image for $handle', (expected) => {
    const product = byHandle.get(expected.handle);
    expect(product).toBeDefined();
    expect(product?.id).toBe(expected.id);
    expect(product?.vendor).toBe('Koch Filter');
    expect(product?.images.edges[0]?.node.url).toBe(expected.image);

    const variant = product?.variants.edges[0]?.node;
    expect(variant?.id).toBe(expected.variantId);
    expect(variant?.sku).toBe(expected.sku);
    expect(variant?.price.amount).toBe(expected.price);
    expect(variant?.availableForSale).toBe(true);
    expect(variant?.sellingPlanAllocations?.edges).toEqual([]);
  });

  it.each(expectedProducts)('ships a real square PNG for $handle', (expected) => {
    const publicPath = new URL(`client/public${expected.image}`, repoRoot);
    expect(existsSync(publicPath)).toBe(true);
    expect(pngDimensions(expected.image)).toEqual(expected.dimensions);
    expect(createHash('sha256').update(readFileSync(publicPath)).digest('hex')).toBe(expected.sha256);
  });

  it('keeps the BioMAX supplied-spec conflict transparent and item-specific', () => {
    const details = kochProductDetails['koch-biomax-hepa-9999-23-375x23-375x11-5'];
    const copy = JSON.stringify(details);
    expect(copy).toContain('99.99% on 0.3 µm particles');
    expect(copy).toContain('18-gauge galvanized steel');
    expect(copy).toContain('generic supplied specification references 26-gauge');
    expect(copy).toContain('requested 18-gauge item configuration');
    expect(copy).not.toContain('99.999%');
  });

  it('documents STK-10 airflow direction, progressive density, and manufacturer test context', () => {
    const details = kochProductDetails['koch-spraystop-stk10-61x90-roll'];
    const copy = JSON.stringify(details);
    expect(copy).toContain('543-061-90M');
    expect(copy).toContain('0.5 in');
    expect(copy).toContain('Red upstream; purple downstream');
    expect(copy).toContain('Progressive-density');
    expect(copy).toContain('Up to 96% removal efficiency in the manufacturer’s STK-10 data');
  });

  it('renders the collapsible details beside purchase controls and preserves compact Catalog Details', () => {
    expect(productDetailSource).toContain('<KochProductDetails handle={handle} />');
    expect(productDetailSource).toContain('<ProductSpecs product={product} />');
    expect(productDetailSource.indexOf('<KochProductDetails handle={handle} />')).toBeLessThan(
      productDetailSource.indexOf('<ProductSpecs product={product} />'),
    );
    expect(productDetailSource).toContain('const isKochProduct = !!kochDetails');
    expect(productDetailSource).toContain('setProduct(data || immediate)');
    expect(productDetailSource).toContain('ogImageWidth={isKochProduct ? 400 : undefined}');
    expect(productDetailSource).toContain('ogImageHeight={isKochProduct ? 400 : undefined}');
    expect(productDetailSource).toContain('ogImageAlt={mainImageAlt}');
    expect(seoSource).toContain('property="og:image:width"');
    expect(seoSource).toContain('name="twitter:image:alt"');
  });

  it('uses first-party Koch assets in hydrated and generated static pages', () => {
    for (const expected of expectedProducts) {
      expect(imageUrlSource).toContain(`'${expected.handle}': { src: '${expected.image}'`);
      expect(generatorSource).toContain(`'${expected.handle}': { src: '${expected.image}'`);
    }
    expect(generatorSource).toContain('function kochProductDetailsFallback(handle)');
    expect(generatorSource).toContain('<details style=');
    expect(generatorSource).toContain('imageWidth: kochDetails ? 400 : undefined');
    expect(generatorSource).toContain('imageHeight: kochDetails ? 400 : undefined');
    expect(generatorSource).toContain('imageAlt: imageNode?.altText || product.title');
    expect(generatorSource).toContain('property="og:image:width" content="${imageWidth}"');
    expect(generatorSource).toContain('name="twitter:image:alt" content="${imageAlt}"');
    expect(indexSource).toContain('name="twitter:image:alt"');
  });

  it('keeps Koch search titles concise and descriptions product-specific', () => {
    for (const details of Object.values(kochProductDetails)) {
      expect(details.seoTitle.length).toBeLessThanOrEqual(65);
      expect(details.seoDescription.length).toBeLessThanOrEqual(160);
      expect(details.seoDescription).toContain('Koch');
    }
  });
});
