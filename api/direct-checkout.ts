import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_DOMAIN = 'pfsfilters.myshopify.com';

/**
 * Server-side checkout URL resolver for PFS VITRA and other products
 * that can't use the Storefront Cart API.
 * 
 * The Shopify Online Store theme ("Hydrogen Redirect Theme") redirects all
 * /cart/ and /checkout paths to the headless storefront. But the actual
 * checkout pages at /checkouts/cn/... are NOT affected by the theme redirect.
 * 
 * This endpoint:
 * 1. Hits Shopify's /cart/VARIANT:QTY endpoint (server-side, no theme JS runs)
 * 2. Follows the redirect chain to get the final /checkouts/ URL
 * 3. Returns that URL to the client for direct navigation
 */
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

  const { variantId, quantity = 1, discountCode } = req.body || {};

  if (!variantId) {
    return res.status(400).json({ error: 'Missing variantId' });
  }

  // Extract numeric variant ID from GID format or plain number
  const match = String(variantId).match(/(\d+)$/);
  const numericId = match ? match[1] : String(variantId);

  if (!numericId || !/^\d+$/.test(numericId)) {
    return res.status(400).json({ error: 'Invalid variantId' });
  }

  try {
    // Build the cart URL
    let cartUrl = `https://${SHOPIFY_DOMAIN}/cart/${numericId}:${quantity}`;
    if (discountCode) {
      cartUrl += `?discount=${encodeURIComponent(discountCode)}`;
    }

    console.log('[Direct Checkout] Fetching cart URL:', cartUrl);

    // Step 1: Hit the /cart/ URL (server-side, theme JS doesn't execute)
    const response1 = await fetch(cartUrl, { redirect: 'manual' });
    const location1 = response1.headers.get('location');

    if (response1.status !== 302 || !location1) {
      console.error('[Direct Checkout] Step 1 failed:', response1.status);
      return res.status(500).json({ error: 'Failed to create cart' });
    }

    console.log('[Direct Checkout] Step 1 redirect to:', location1.substring(0, 80));

    // Step 2: Follow the Shop Pay redirect to get the actual checkout URL
    const response2 = await fetch(location1, { redirect: 'manual' });
    const location2 = response2.headers.get('location');

    if (response2.status !== 302 || !location2) {
      // If Shop Pay doesn't redirect, the first location might already be the checkout
      if (location1.includes('/checkouts/')) {
        return res.status(200).json({ success: true, checkoutUrl: location1 });
      }
      console.error('[Direct Checkout] Step 2 failed:', response2.status);
      return res.status(500).json({ error: 'Failed to resolve checkout URL' });
    }

    console.log('[Direct Checkout] Step 2 redirect to:', location2.substring(0, 80));

    // The final URL should be the /checkouts/ URL
    if (location2.includes('/checkouts/')) {
      return res.status(200).json({ success: true, checkoutUrl: location2 });
    }

    // If there's another redirect, follow it
    const response3 = await fetch(location2, { redirect: 'manual' });
    const location3 = response3.headers.get('location');

    if (location3 && location3.includes('/checkouts/')) {
      return res.status(200).json({ success: true, checkoutUrl: location3 });
    }

    // Fallback: return the last known good URL
    console.error('[Direct Checkout] Could not find /checkouts/ URL in redirect chain');
    return res.status(200).json({ success: true, checkoutUrl: location2 || location1 });
  } catch (error: any) {
    console.error('[Direct Checkout] Error:', error?.message || error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
