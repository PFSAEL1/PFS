import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('[Consumable Checkout] SHOPIFY_ADMIN_TOKEN not configured');
    return res.status(500).json({ error: 'Checkout service unavailable' });
  }

  const { variantId, quantity = 1 } = req.body || {};

  if (!variantId) {
    return res.status(400).json({ error: 'Missing variantId' });
  }

  // Extract numeric variant ID from GID format or plain number
  const match = String(variantId).match(/(\d+)$/);
  const numericId = match ? parseInt(match[1], 10) : parseInt(variantId, 10);

  if (!numericId || isNaN(numericId)) {
    return res.status(400).json({ error: 'Invalid variantId' });
  }

  try {
    // Create draft order via Shopify Admin REST API
    const draftPayload = {
      draft_order: {
        line_items: [{ variant_id: numericId, quantity: Math.max(1, quantity) }],
        use_customer_default_address: true
      }
    };

    const createResp = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/draft_orders.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(draftPayload)
      }
    );

    if (!createResp.ok) {
      const errText = await createResp.text();
      console.error('[Consumable Checkout] Draft order failed:', createResp.status, errText);
      return res.status(500).json({ error: 'Failed to create checkout', details: errText });
    }

    const data = await createResp.json();
    const draftOrder = data.draft_order;

    if (!draftOrder || !draftOrder.invoice_url) {
      console.error('[Consumable Checkout] No invoice_url in response:', JSON.stringify(data));
      return res.status(500).json({ error: 'Checkout URL not available' });
    }

    return res.status(200).json({
      success: true,
      checkoutUrl: draftOrder.invoice_url,
      orderId: draftOrder.id
    });
  } catch (error: any) {
    console.error('[Consumable Checkout] Error:', error?.message || error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
