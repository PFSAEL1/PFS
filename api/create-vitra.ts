import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_STORE = 'abc-filter-splash-rwyxj.myshopify.com';

async function adminGraphQL(query: string, variables?: any) {
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!token) throw new Error('No SHOPIFY_ADMIN_TOKEN');
  const res = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

async function adminREST(endpoint: string, method: string = 'GET', body?: any) {
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!token) throw new Error('No SHOPIFY_ADMIN_TOKEN');
  const options: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-04/${endpoint}`, options);
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : null };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, action } = req.body || {};
  if (secret !== 'pfs-admin-fix-2024') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    if (action === 'check_scopes') {
      // Check what we can access
      const shopResult = await adminREST('shop.json');
      const productsResult = await adminREST('products.json?limit=1');
      const inventoryResult = await adminREST('inventory_levels.json?limit=1');
      return res.json({
        shop: shopResult.status,
        products: productsResult.status,
        inventory: inventoryResult.status,
        shopData: shopResult.body?.shop?.name,
        productsData: productsResult.status === 200 ? 'has access' : productsResult.body,
        inventoryData: inventoryResult.status === 200 ? 'has access' : inventoryResult.body,
      });
    }

    if (action === 'create_product') {
      // Try to create a new PFS VITRA product with inventory tracking DISABLED
      const productData = {
        product: {
          title: 'PFS VITRA V2',
          body_html: '<p>Advanced air purification system for paint booth environments. The PFS VITRA uses cutting-edge filtration technology to ensure clean, safe air quality during painting operations.</p>',
          vendor: 'PFS Filters',
          product_type: 'Air Purification',
          status: 'active',
          variants: [
            {
              price: '80.00',
              sku: 'PFS-VITRA-V2',
              inventory_management: null, // Don't track inventory!
              inventory_policy: 'continue', // Continue selling even if "out of stock"
              requires_shipping: true,
              taxable: true,
            }
          ],
          published: true,
        }
      };

      const result = await adminREST('products.json', 'POST', productData);
      return res.json({
        success: result.status === 201,
        status: result.status,
        product: result.body?.product ? {
          id: result.body.product.id,
          title: result.body.product.title,
          variant_id: result.body.product.variants?.[0]?.id,
          variant_gid: `gid://shopify/ProductVariant/${result.body.product.variants?.[0]?.id}`,
        } : null,
        error: result.status !== 201 ? result.body : null,
      });
    }

    if (action === 'fix_existing') {
      // Try to update the existing product's variant to not track inventory
      const variantUpdate = {
        variant: {
          id: 52549337317508,
          inventory_management: null, // Stop tracking inventory
          inventory_policy: 'continue', // Continue selling
        }
      };
      const result = await adminREST('variants/52549337317508.json', 'PUT', variantUpdate);
      return res.json({
        success: result.status === 200,
        status: result.status,
        data: result.body,
      });
    }

    if (action === 'publish_product') {
      // Publish a product to the Headless sales channel
      const { product_id } = req.body;
      // Get the publication (sales channel) ID
      const pubResult = await adminGraphQL(`{
        publications(first: 10) {
          edges {
            node {
              id
              name
            }
          }
        }
      }`);
      return res.json({ publications: pubResult });
    }

    return res.json({ error: 'Unknown action. Use: check_scopes, create_product, fix_existing, publish_product' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
