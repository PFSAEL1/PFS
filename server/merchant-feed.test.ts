import { afterEach, describe, expect, it, vi } from 'vitest';
import handler, { buildMerchantFeed, MERCHANT_HANDLES, type FeedProduct } from '../api/merchant-feed';

const products = (): FeedProduct[] => MERCHANT_HANDLES.map((handle, index) => ({
  handle, title: 'Fiberglass & Intake', description: 'Size <20> & case details',
  featuredImage: { url: 'https://cdn.shopify.com/image.jpg' },
  variants: { pageInfo: { hasNextPage: false }, nodes: [{
    id: `gid://shopify/ProductVariant/${index + 1}`, title: '20"x20" 100/CS',
    availableForSale: true, currentlyNotInStock: false, price: { amount: '175.82', currencyCode: 'USD' },
  }] },
}));

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe('Merchant Center feed', () => {
  it('exports exact variant prices, case sizes, links, and escaped XML', () => {
    const feed = buildMerchantFeed(products());
    expect(feed.count).toBe(3);
    expect(feed.xml).toContain('<g:price>175.82 USD</g:price>');
    expect(feed.xml).toContain('?variant=1</g:link>');
    expect(feed.xml).toContain('20&quot;x20&quot; 100/CS');
    expect(feed.xml).toContain('Size &lt;20&gt; &amp; case details');
    expect(feed.xml).not.toContain('<g:gtin>');
    expect(feed.xml).not.toContain('<g:shipping>');
  });
  it('uses supplier orderability rather than unmaintained Shopify quantities', () => {
    const input = products();
    input[0].variants.nodes[0].currentlyNotInStock = true;
    input[1].variants.nodes[0].availableForSale = false;
    const feed = buildMerchantFeed(input);
    expect(feed.count).toBe(3);
    expect(feed.xml).toContain('<g:id>pfs_1</g:id>');
    expect(feed.xml).toContain('<g:availability>in_stock</g:availability>');
    expect(feed.xml).toContain('<g:availability>out_of_stock</g:availability>');
  });
  it('fails instead of publishing incomplete data or wrong currency', () => {
    expect(() => buildMerchantFeed(products().slice(1))).toThrow();
    const input = products();
    input[0].variants.nodes[0].price.currencyCode = 'CAD';
    expect(() => buildMerchantFeed(input)).toThrow();
    const paged = products();
    paged[0].variants.pageInfo.hasNextPage = true;
    expect(() => buildMerchantFeed(paged)).toThrow();
  });
  it('holds the new single-frame option until its shipping rule is reviewed', () => {
    const input = products();
    input[2].variants.nodes.push({ ...input[2].variants.nodes[0], id: 'gid://shopify/ProductVariant/52580764909700' });
    const feed = buildMerchantFeed(input);
    expect(feed.count).toBe(3);
    expect(feed.xml).not.toContain('52580764909700');
    expect(feed.xml).toContain('<g:shipping_label>pfs_core_supplier</g:shipping_label>');
  });
  it('fails if no variants are returned', () => {
    const input = products();
    input.forEach(p => p.variants.nodes = []);
    expect(() => buildMerchantFeed(input)).toThrow('No eligible offers');
  });
  it('returns an uncached 503 on Shopify errors without leaking credentials', async () => {
    vi.stubEnv('VITE_SHOPIFY_DOMAIN', 'pfsfilters.myshopify.com');
    vi.stubEnv('VITE_SHOPIFY_STOREFRONT_TOKEN', 'test-token');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const res: any = { setHeader: vi.fn(), status: vi.fn().mockReturnThis(), send: vi.fn(), end: vi.fn() };
    await handler({ method: 'GET' } as any, res);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(res.send.mock.calls[0][0]).not.toContain('test-token');
  });
});
