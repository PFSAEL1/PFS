import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (req.body?.secret !== 'pfs-fix-2026') return res.status(403).json({ error: 'Forbidden' });
  if (!SHOPIFY_ADMIN_TOKEN) return res.status(500).json({ error: 'Admin token not configured' });

  const variantId = req.body?.variantId || '52549337317508';

  try {
    // Step 1: Get the inventory item ID for the variant
    const variantResp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/variants/${variantId}.json`,
      { headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN } }
    );
    const variantData = await variantResp.json() as any;
    
    if (!variantResp.ok) {
      return res.status(500).json({ error: 'Failed to get variant', details: variantData });
    }

    const inventoryItemId = variantData.variant?.inventory_item_id;
    const currentPolicy = variantData.variant?.inventory_policy;
    const currentManagement = variantData.variant?.inventory_management;
    
    // Step 2: Get locations
    const locResp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/locations.json`,
      { headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN } }
    );
    const locData = await locResp.json() as any;
    const locationId = locData.locations?.[0]?.id;

    // Step 3: Get current inventory level
    const invResp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/inventory_levels.json?inventory_item_ids=${inventoryItemId}`,
      { headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN } }
    );
    const invData = await invResp.json() as any;

    // Step 4: Try to set inventory to 999
    const setResp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/inventory_levels/set.json`,
      {
        method: 'POST',
        headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ location_id: locationId, inventory_item_id: inventoryItemId, available: 999 })
      }
    );
    const setData = await setResp.json() as any;

    // Step 5: Also try to set inventory_policy to "continue" (sell when out of stock)
    const updateResp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/variants/${variantId}.json`,
      {
        method: 'PUT',
        headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN, 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant: { id: parseInt(variantId), inventory_policy: 'continue', inventory_management: 'shopify' } })
      }
    );
    const updateData = await updateResp.json() as any;

    return res.status(200).json({
      variant: { inventoryItemId, currentPolicy, currentManagement },
      location: { id: locationId, name: locData.locations?.[0]?.name },
      currentInventory: invData,
      setInventoryResult: setData,
      updateVariantResult: { status: updateResp.status, policy: updateData.variant?.inventory_policy }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
