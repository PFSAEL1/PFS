import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_STORE = 'abc-filter-splash-rwyxj.myshopify.com';
const PRODUCT_ID = 'gid://shopify/Product/10413119733892';
const VARIANT_ID = 'gid://shopify/ProductVariant/52549337317508';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { secret, action } = req.body || {};
  if (secret !== 'pfs-admin-fix-2024') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const results: any = {};

    // Step 1: Read the product with correct 2024-04 fields
    const productResult = await adminGraphQL(`{
      product(id: "${PRODUCT_ID}") {
        id
        title
        status
        variants(first: 5) {
          edges {
            node {
              id
              title
              inventoryPolicy
              inventoryQuantity
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
        }
      }
    }`);
    results.product = productResult;

    // Step 2: Try to set inventoryPolicy to CONTINUE (sell when out of stock)
    const setBulkPolicy = await adminGraphQL(`
      mutation {
        productVariantsBulkUpdate(
          productId: "${PRODUCT_ID}"
          variants: [{
            id: "${VARIANT_ID}"
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
    `);
    results.setBulkPolicy = setBulkPolicy;

    // Step 3: Try to disable inventory tracking on the inventory item
    if (productResult?.data?.product?.variants?.edges?.[0]?.node?.inventoryItem?.id) {
      const inventoryItemId = productResult.data.product.variants.edges[0].node.inventoryItem.id;
      
      const disableTracking = await adminGraphQL(`
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
      `);
      results.disableTracking = disableTracking;
    }

    // Step 4: If we can't read the product, try to set inventory quantity directly
    if (productResult?.errors) {
      // Try inventorySetQuantities with a guessed inventory item ID
      const setQty = await adminGraphQL(`
        mutation {
          inventorySetQuantities(input: {
            reason: "correction"
            name: "available"
            quantities: [{
              inventoryItemId: "gid://shopify/InventoryItem/54651534614660"
              locationId: "gid://shopify/Location/105453527172"
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
      `);
      results.setQtyBlind = setQty;
    }

    // Step 5: Also try draft order approach
    if (action === 'draft_order') {
      const draftOrder = await adminGraphQL(`
        mutation {
          draftOrderCreate(input: {
            lineItems: [{
              variantId: "${VARIANT_ID}"
              quantity: 1
            }]
          }) {
            draftOrder {
              id
              invoiceUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `);
      results.draftOrder = draftOrder;
    }

    return res.status(200).json(results);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
