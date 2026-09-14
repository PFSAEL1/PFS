import type { VercelRequest, VercelResponse } from '@vercel/node';

// Start with the core pads and tacky panels. Rolls, memberships, test products,
// and aerospace assemblies require separate product-data review.
export const MERCHANT_HANDLES = [
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs',
  '20x20x2-15-gram-fiberglass-paint-arrestor-pads-50-cs',
  '300-series-tacky-filter-panel',
] as const;
const SITE = 'https://www.pfsfilters.com';

type FeedVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  price: { amount: string; currencyCode: string };
  image?: { url: string } | null;
};
export type FeedProduct = {
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string } | null;
  variants: { nodes: FeedVariant[]; pageInfo: { hasNextPage: boolean } };
};

const xml = (value: string) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const tag = (name: string, value: string) => `<g:${name}>${xml(value)}</g:${name}>`;

export function buildMerchantFeed(products: FeedProduct[]) {
  const items: string[] = [];
  const seen = new Set<string>();
  for (const handle of MERCHANT_HANDLES) {
    const product = products.find((p) => p.handle === handle);
    if (!product || product.variants.pageInfo.hasNextPage) {
      throw new Error('Incomplete Shopify product data');
    }
    for (const variant of product.variants.nodes) {
      const id = variant.id.split('/').pop() || '';
      const image = variant.image?.url || product.featuredImage?.url;
      // PFS fulfills through suppliers; Shopify quantities are not physical stock.
      // Owner confirmed typical total delivery of 3–5 business days (2026-09-14).
      // Orderability governs these reviewed core offers; actual supplier shortages
      // must be reflected by disabling the affected offer before advertising it.
      if (!/^\d+$/.test(id) || seen.has(id) || !image?.startsWith('https://') ||
          !product.title.trim() || !product.description.trim() ||
          !/^\d+(\.\d{1,2})?$/.test(variant.price.amount) ||
          Number(variant.price.amount) <= 0 || variant.price.currencyCode !== 'USD' ||
          typeof variant.availableForSale !== 'boolean' || typeof variant.currentlyNotInStock !== 'boolean') {
        throw new Error('Invalid Shopify offer data');
      }
      seen.add(id);
      const title = `${product.title} — ${variant.title}`.slice(0, 150);
      const link = `${SITE}/product/${encodeURIComponent(handle)}?variant=${id}`;
      items.push(`<item>${[
        tag('id', `pfs_${id}`), tag('title', title),
        tag('description', product.description.slice(0, 5000)),
        tag('link', link), tag('image_link', image),
        tag('price', `${Number(variant.price.amount).toFixed(2)} USD`),
        tag('availability', variant.availableForSale ? 'in_stock' : 'out_of_stock'),
        tag('condition', 'new'),
        tag('custom_label_0', handle === '300-series-tacky-filter-panel' ? 'tacky_intake' : 'fiberglass_pads'),
      ].join('')}</item>`);
    }
  }
  if (!items.length) throw new Error('No eligible offers; review product data');
  return {
    count: items.length,
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>PFS Filters Products</title><link>${SITE}</link><description>Current US fiberglass pad and tacky intake offers</description>${items.join('\n')}</channel></rss>`,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  const domain = process.env.VITE_SHOPIFY_DOMAIN || process.env.SHOPIFY_SHOP_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !/^[a-z0-9-]+\.myshopify\.com$/.test(domain) || !token) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).send('Product feed configuration incomplete');
  }
  try {
    const products: FeedProduct[] = [];
    for (const handle of MERCHANT_HANDLES) {
      const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
        body: JSON.stringify({
          query: `query MerchantProduct($handle: String!) @inContext(country: US, language: EN) {
            product(handle: $handle) {
              handle title description featuredImage { url }
              variants(first: 250) {
                pageInfo { hasNextPage }
                nodes { id title availableForSale currentlyNotInStock price { amount currencyCode } image { url } }
              }
            }
          }`, variables: { handle },
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error('Shopify unavailable');
      const result = await response.json();
      if (result.errors?.length || !result.data?.product) throw new Error('Shopify product unavailable');
      products.push(result.data.product);
    }
    const feed = buildMerchantFeed(products);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
    res.setHeader('X-PFS-Offer-Count', String(feed.count));
    return req.method === 'HEAD' ? res.status(200).end() : res.status(200).send(feed.xml);
  } catch {
    // Never publish stale snapshot prices or an empty successful feed on errors.
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).send('Product feed temporarily unavailable; review Shopify data');
  }
}
