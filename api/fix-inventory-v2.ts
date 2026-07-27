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
  // Simple auth
  const { secret, action } = req.body || {};
  if (secret !== 'pfs-admin-fix-2024') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const results: any = {};

    // Step 1: Check what scopes we have by trying different queries
    // Try shop query (basic scope)
    const shopResult = await adminGraphQL('{ shop { name myshopifyDomain } }');
    results.shop = shopResult;

    // Step 2: Try to read the product
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
              inventoryManagement
              inventoryQuantity
              inventoryItem {
                id
                tracked
              }
            }
          }
        }
      }
    }`);
    results.product = productResult;

    // Step 3: If we can read the product, try to update it
    if (!productResult.errors) {
      // Try to set inventoryPolicy to CONTINUE (allow selling when out of stock)
      const updateVariant = await adminGraphQL(`
        mutation {
          productVariantUpdate(input: {
            id: "${VARIANT_ID}"
            inventoryPolicy: CONTINUE
          }) {
            productVariant {
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
      results.updateVariant = updateVariant;

      // Try to disable inventory tracking
      if (productResult.data?.product?.variants?.edges?.[0]?.node?.inventoryItem?.id) {
        const inventoryItemId = productResult.data.product.variants.edges[0].node.inventoryItem.id;
        const updateInventoryItem = await adminGraphQL(`
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
        results.updateInventoryItem = updateInventoryItem;
      }
    } else {
      // If we can't read products, try just the mutations blindly
      results.note = "Cannot read product, trying mutations blindly";
      
      const updateVariant = await adminGraphQL(`
        mutation {
          productVariantUpdate(input: {
            id: "${VARIANT_ID}"
            inventoryPolicy: CONTINUE
          }) {
            productVariant {
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
      results.updateVariantBlind = updateVariant;
    }

    // Step 4: Also try to create a draft order as alternative checkout
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
