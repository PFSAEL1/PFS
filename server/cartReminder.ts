import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

export type ReminderItem = {
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  quantity: number;
  price: { amount: string; currencyCode: string };
  image?: string;
  sellingPlanId?: string;
  sellingPlanName?: string;
  sellingPlanPrice?: { amount: string; currencyCode: string };
  purchaseType?: 'one-time' | 'subscription';
};

const TOKEN_PATTERN = /^[a-zA-Z0-9_-]{32,128}$/;
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VARIANT_PATTERN = /^gid:\/\/shopify\/ProductVariant\/\d+$/;
const HOST = 'https://www.pfsfilters.com';

export function databaseReady() {
  return !!process.env.SUPABASE_SERVICE_ROLE_KEY
    && !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)
    && (process.env.CART_REMINDER_SECRET?.length || 0) >= 32;
}
export function configured() {
  return process.env.CART_REMINDER_ENABLED === 'true' && databaseReady() && !!process.env.RESEND_API_KEY;
}

export function adminDb() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY || '', {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function hash(value: string) {
  return createHash('sha256').update(value).digest('hex');
}
export function secretHash(kind: string, value: string) {
  return createHmac('sha256', process.env.CART_REMINDER_SECRET || '')
    .update(`${kind}:${value}`).digest('hex');
}
function encryptionKey() {
  return createHmac('sha256', process.env.CART_REMINDER_SECRET || '').update('cart-email-encryption-v1').digest();
}
export function encryptEmail(email: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(email, 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64url');
}
export function decryptEmail(ciphertext: string) {
  const raw = Buffer.from(ciphertext, 'base64url');
  if (raw.length < 29) throw new Error('Invalid encrypted email');
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), raw.subarray(0, 12));
  decipher.setAuthTag(raw.subarray(12, 28));
  return Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString('utf8');
}
export function normalizeEmail(value: unknown) {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && EMAIL_PATTERN.test(email) ? email : null;
}
export function validBrowserToken(value: unknown): value is string {
  return typeof value === 'string' && TOKEN_PATTERN.test(value);
}
export function signedLink(kind: 'recover' | 'unsubscribe', id: string) {
  return `${id}.${secretHash(kind, id)}`;
}
export function verifyLink(kind: 'recover' | 'unsubscribe', token: unknown) {
  if (typeof token !== 'string' || token.length > 160) return null;
  const [id, signature, extra] = token.split('.');
  if (extra || !UUID_PATTERN.test(id) || !/^[a-f0-9]{64}$/.test(signature || '')) return null;
  const expected = secretHash(kind, id);
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ? id : null;
}

export function parseLines(value: unknown): Array<{ variantId: string; quantity: number; sellingPlanId?: string }> | null {
  if (!Array.isArray(value) || !value.length || value.length > 40) return null;
  const lines: Array<{ variantId: string; quantity: number; sellingPlanId?: string }> = [];
  for (const raw of value) {
    if (!raw || typeof raw !== 'object') return null;
    const item = raw as Record<string, any>;
    if (!VARIANT_PATTERN.test(item.variantId || '')
      || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 100
      || (item.sellingPlanId && !/^gid:\/\/shopify\/SellingPlan\/\d+$/.test(item.sellingPlanId))) return null;
    lines.push({ variantId: item.variantId, quantity: item.quantity,
      ...(item.sellingPlanId ? { sellingPlanId: item.sellingPlanId } : {}) });
  }
  return lines;
}

// Shopify is the only source for names, handles, price and selling-plan legitimacy.
export async function verifiedShopifyItems(lines: NonNullable<ReturnType<typeof parseLines>>): Promise<ReminderItem[]> {
  const domain = process.env.VITE_SHOPIFY_DOMAIN;
  const token = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !/^[a-z0-9.-]+\.myshopify\.com$/.test(domain) || !token) throw new Error('Shopify catalog not configured');
  const ids = [...new Set(lines.map(line => line.variantId))];
  const query = `query ReminderVariants($ids: [ID!]!) { nodes(ids: $ids) { ... on ProductVariant {
    id title availableForSale price { amount currencyCode } image { url }
    product { id title handle images(first: 1) { edges { node { url } } } }
    sellingPlanAllocations(first: 30) { edges { node {
      sellingPlan { id name } priceAdjustments { price { amount currencyCode } }
    } } }
  } } }`;
  const response = await fetch(`https://${domain}/api/2024-04/graphql.json`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables: { ids } }), signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Shopify catalog HTTP ${response.status}`);
  const payload = await response.json() as any;
  if (payload.errors?.length || !Array.isArray(payload.data?.nodes)) throw new Error('Shopify catalog lookup failed');
  const byId = new Map<string, any>(payload.data.nodes.filter((node: any) => node?.id).map((node: any) => [node.id, node]));
  return lines.map(line => {
    const node = byId.get(line.variantId);
    if (!node?.availableForSale || !node.product?.id || !node.product?.handle || !node.price?.amount) throw new Error('Cart item is unavailable');
    const allocation = line.sellingPlanId ? node.sellingPlanAllocations?.edges?.find((edge: any) => edge.node?.sellingPlan?.id === line.sellingPlanId)?.node : null;
    if (line.sellingPlanId && !allocation) throw new Error('Cart subscription is unavailable');
    return {
      variantId: node.id, productId: node.product.id,
      handle: node.product.handle, title: node.product.title,
      variantTitle: node.title, quantity: line.quantity,
      price: node.price,
      image: node.image?.url || node.product.images?.edges?.[0]?.node?.url,
      ...(allocation ? { purchaseType: 'subscription' as const, sellingPlanId: allocation.sellingPlan.id,
        sellingPlanName: allocation.sellingPlan.name,
        sellingPlanPrice: allocation.priceAdjustments?.[0]?.price } : {}),
    };
  });
}

export function escaped(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));
}

export function emailContent(id: string, items: ReminderItem[]) {
  const returnUrl = `${HOST}/shop#recover=${encodeURIComponent(signedLink('recover', id))}`;
  const unsubscribeUrl = `${HOST}/api/cart-reminder-unsubscribe?token=${encodeURIComponent(signedLink('unsubscribe', id))}`;
  const rows = items.slice(0, 5).map(item => `<tr><td style="padding:12px 16px;border-bottom:1px solid #e7ecf2;color:#182537;font-weight:bold">${escaped(item.title)}${item.variantTitle && item.variantTitle !== 'Default Title' ? `<br><small style="color:#64758b">${escaped(item.variantTitle)}</small>` : ''}</td><td style="padding:12px 16px;border-bottom:1px solid #e7ecf2;text-align:right;color:#64758b">Qty ${item.quantity}</td></tr>`).join('');
  const extra = items.length > 5 ? `<p style="font-size:13px;color:#64758b">Plus ${items.length - 5} more item(s) in your cart.</p>` : '';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:24px 10px;background:#eef2f6;color:#172334;font-family:Arial,Helvetica,sans-serif"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #dfe6ee;border-radius:12px"><tr><td style="background:#0b111b;text-align:center;padding:24px;border-bottom:3px solid #3b82f6"><img src="${HOST}/images/email/pfs-logo.png" width="210" height="64" alt="PFS Filters" style="width:210px;height:auto;max-width:100%;border:0"></td></tr><tr><td style="padding:32px 24px"><p style="font-size:11px;color:#3b72ba;text-transform:uppercase;letter-spacing:.15em;font-weight:bold">A quick note from PFS Filters</p><h1 style="font-size:32px;line-height:1.15;margin:12px 0 18px;color:#101b2b">Your filters are waiting.</h1><p style="font-size:16px;line-height:1.6;color:#425267">You left something in your cart. If you’re still looking for the right filters, your picks are ready for a final look before checkout.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fb;border:1px solid #e7ecf2;border-radius:8px">${rows}</table>${extra}<a href="${returnUrl}" style="display:block;background:#3478ef;border-radius:9px;padding:17px 12px;text-align:center;text-decoration:none;color:#fff;font-size:16px;font-weight:bold;margin-top:24px">Return to your cart &rarr;</a><p style="font-size:13px;color:#708199;text-align:center">Double-check your sizes and quantities before placing an order.</p></td></tr><tr><td style="padding:22px;background:#f6f8fb;text-align:center;font-size:12px;line-height:1.7;color:#64758b">Need help with the right size? Call <a href="tel:8554967969">855-496-7969</a>.<br>PFS Filters · 1400 Airport Blvd, Santa Rosa, CA 95403<br><a href="${unsubscribeUrl}">Unsubscribe from cart reminders</a></td></tr></table></body></html>`;
  const text = `Your filters are waiting.\n\nYou left something in your cart. Your picks are ready for a final look before checkout.\n\n${items.map(item => `${item.title} — Qty ${item.quantity}`).join('\n')}\n\nReturn to your cart: ${returnUrl}\nDouble-check sizes and quantities before placing an order. Need help? Call 855-496-7969.\n\nPFS Filters, 1400 Airport Blvd, Santa Rosa, CA 95403\nUnsubscribe: ${unsubscribeUrl}`;
  return { html, text, returnUrl, unsubscribeUrl };
}
