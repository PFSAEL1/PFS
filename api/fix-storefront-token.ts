import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Secret key to prevent unauthorized access
  if (req.body?.secret !== 'pfs-fix-2026') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!SHOPIFY_ADMIN_TOKEN) {
    return res.status(500).json({ error: 'Admin token not configured' });
  }

  try {
    // Use Admin API to create a new Storefront Access Token with proper scopes
    const response = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query: `
            mutation storefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
              storefrontAccessTokenCreate(input: $input) {
                storefrontAccessToken {
                  id
                  title
                  accessToken
                  accessScopes { handle }
                }
                userErrors { field message }
              }
            }
          `,
          variables: {
            input: {
              title: "PFS Filters Headless v2"
            }
          }
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
