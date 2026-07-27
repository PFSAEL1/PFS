import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_DOMAIN = 'pfsfilters.myshopify.com';

/**
 * Server-side checkout URL resolver for PFS VITRA and other products
 * that can't use the Storefront Cart API.
 * 
 * The problem: Shopify's Online Store theme redirects /cart/ URLs to the
 * headless storefront when accessed from a browser. But server-side requests
 * don't execute theme JS, so we can get the real checkout redirect.
 * 
 * IMPORTANT: We only follow the FIRST redirect (to shop.app) and return that URL.
 * We do NOT follow the full chain because that would consume the checkout token,
 * making it invalid when the browser tries to use it.
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

    // Hit the /cart/ URL server-side (theme JS doesn't execute)
    // ONLY get the first redirect - do NOT follow further to avoid consuming the token
    const response = await fetch(cartUrl, { redirect: 'manual' });
    const location = response.headers.get('location');

    if (response.status !== 302 || !location) {
      console.error('[Direct Checkout] No redirect from /cart/:', response.status);
      return res.status(500).json({ error: 'Failed to create cart - no redirect received' });
    }

    console.log('[Direct Checkout] Got redirect URL (first 100 chars):', location.substring(0, 100));

    // Return the first redirect URL directly to the browser.
    // This is typically a shop.app URL that will handle the checkout flow.
    // The browser follows the redirect chain itself with a fresh session,
    // so the checkout token is NOT consumed prematurely.
    return res.status(200).json({ success: true, checkoutUrl: location });
  } catch (error: any) {
    console.error('[Direct Checkout] Error:', error?.message || error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
