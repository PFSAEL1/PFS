import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

async function graphql(query: string) {
  const resp = await fetch(
    `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }
  );
  return resp.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (req.body?.secret !== 'pfs-fix-2026') return res.status(403).json({ error: 'Forbidden' });
  if (!SHOPIFY_ADMIN_TOKEN) return res.status(500).json({ error: 'Admin token not configured' });

  const variantGid = 'gid://shopify/ProductVariant/52549337317508';
  const productGid = 'gid://shopify/Product/10413119733892';
  const results: any[] = [];

  try {
    // Step 1: Get the inventory item ID and current state
    const infoQuery = `
      query {
        productVariant(id: "${variantGid}") {
          id
          title
          inventoryPolicy
          inventoryItem {
            id
            tracked
            inventoryLevels(first: 5) {
              edges {
                node {
                  id
                  location {
                    id
                    name
                  }
                  quantities(names: ["available"]) {
                    name
                    quantity
                  }
                }
              }
            }
          }
        }
      }
    `;
    const info = await graphql(infoQuery) as any;
    results.push({ step: 'get_info', data: info });

    const inventoryItemId = info?.data?.productVariant?.inventoryItem?.id;
    const tracked = info?.data?.productVariant?.inventoryItem?.tracked;
    const currentPolicy = info?.data?.productVariant?.inventoryPolicy;
    const levels = info?.data?.productVariant?.inventoryItem?.inventoryLevels?.edges;
    const locationId = levels?.[0]?.node?.location?.id;

    // Step 2: Set inventory policy to CONTINUE (sell when out of stock)
    const policyMutation = `
      mutation {
        productVariantsBulkUpdate(
          productId: "${productGid}"
          variants: [{
            id: "${variantGid}"
            inventoryPolicy: CONTINUE
          }]
        ) {
          productVariants {
            id
            inventoryPolicy
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    const policyResult = await graphql(policyMutation) as any;
    results.push({ step: 'set_policy_continue', data: policyResult });

    // Step 3: Untrack inventory (set tracked to false)
    if (inventoryItemId) {
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
      const untrackResult = await graphql(untrackMutation) as any;
      results.push({ step: 'untrack_inventory', data: untrackResult });
    }

    // Step 4: Also try to set quantity to 999 if we have a location
    if (inventoryItemId && locationId) {
      const setQtyMutation = `
        mutation {
          inventorySetQuantities(input: {
            name: "available"
            reason: "correction"
            quantities: [{
              inventoryItemId: "${inventoryItemId}"
              locationId: "${locationId}"
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
      const qtyResult = await graphql(setQtyMutation) as any;
      results.push({ step: 'set_quantity_999', data: qtyResult });
    }

    return res.status(200).json({ success: true, results });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, results });
  }
}
