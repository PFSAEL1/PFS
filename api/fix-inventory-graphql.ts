import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (req.body?.secret !== 'pfs-fix-2026') return res.status(403).json({ error: 'Forbidden' });
  if (!SHOPIFY_ADMIN_TOKEN) return res.status(500).json({ error: 'Admin token not configured' });

  const variantGid = req.body?.variantGid || 'gid://shopify/ProductVariant/52549337317508';
  const productGid = req.body?.productGid || 'gid://shopify/Product/10413119733892';

  const results: any = { steps: [] };

  try {
    // Step 1: Try to set inventory_policy to "continue" using productVariantUpdate
    // This allows selling even when out of stock
    const variantUpdateMutation = `
      mutation {
        productVariantUpdate(input: {
          id: "${variantGid}"
          inventoryPolicy: CONTINUE
        }) {
          productVariant {
            id
            inventoryPolicy
            inventoryManagement
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const step1Resp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: variantUpdateMutation }),
      }
    );
    const step1Data = await step1Resp.json() as any;
    results.steps.push({ name: 'productVariantUpdate (CONTINUE policy)', status: step1Resp.status, data: step1Data });

    // Step 2: Try to disable inventory tracking entirely
    const disableTrackingMutation = `
      mutation {
        productVariantUpdate(input: {
          id: "${variantGid}"
          inventoryManagement: null
        }) {
          productVariant {
            id
            inventoryPolicy
            inventoryManagement
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const step2Resp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: disableTrackingMutation }),
      }
    );
    const step2Data = await step2Resp.json() as any;
    results.steps.push({ name: 'productVariantUpdate (disable tracking)', status: step2Resp.status, data: step2Data });

    // Step 3: Try inventoryItemUpdate to disable tracking at the item level
    // First get the inventory item ID
    const getItemQuery = `
      query {
        productVariant(id: "${variantGid}") {
          id
          inventoryItem {
            id
            tracked
          }
          inventoryPolicy
          inventoryManagement
        }
      }
    `;

    const step3Resp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: getItemQuery }),
      }
    );
    const step3Data = await step3Resp.json() as any;
    results.steps.push({ name: 'query variant info', status: step3Resp.status, data: step3Data });

    const inventoryItemId = step3Data?.data?.productVariant?.inventoryItem?.id;

    if (inventoryItemId) {
      // Step 4: Set tracked to false on the inventory item
      const untrackMutation = `
        mutation {
          inventoryItemUpdate(id: "${inventoryItemId}", input: {
            tracked: false
          }) {
            inventoryItem {
              id
              tracked
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const step4Resp = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: untrackMutation }),
        }
      );
      const step4Data = await step4Resp.json() as any;
      results.steps.push({ name: 'inventoryItemUpdate (untrack)', status: step4Resp.status, data: step4Data });

      // Step 5: Also try to set quantity high just in case
      const setQuantityMutation = `
        mutation {
          inventorySetQuantities(input: {
            name: "available"
            reason: "correction"
            quantities: [{
              inventoryItemId: "${inventoryItemId}"
              locationId: "gid://shopify/Location/104571969668"
              quantity: 999
            }]
          }) {
            inventoryAdjustmentGroup {
              reason
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const step5Resp = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: setQuantityMutation }),
        }
      );
      const step5Data = await step5Resp.json() as any;
      results.steps.push({ name: 'inventorySetQuantities (999)', status: step5Resp.status, data: step5Data });
    }

    return res.status(200).json(results);
  } catch (error: any) {
    return res.status(500).json({ error: error.message, results });
  }
}
