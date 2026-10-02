import { randomUUID } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminDb, configured, encryptEmail, hash, normalizeEmail, parseLines, secretHash, validBrowserToken, verifiedShopifyItems } from '../server/cartReminder.js';

const ALLOWED_ORIGINS = new Set(['https://www.pfsfilters.com', 'https://pfsfilters.com']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!configured()) return res.status(503).json({ error: 'Cart reminders are not available yet' });
  const origin = req.headers.origin;
  const previewOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  if (!origin || (!ALLOWED_ORIGINS.has(origin) && origin !== previewOrigin && !(process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin)))) {
    return res.status(403).json({ error: 'Invalid origin' });
  }
  const body = req.body;
  if (!body || typeof body !== 'object' || !validBrowserToken(body.browserToken)) {
    return res.status(400).json({ error: 'Invalid cart session' });
  }
  if (JSON.stringify(body).length > 16_000) return res.status(413).json({ error: 'Cart request too large' });
  const tokenHash = hash(body.browserToken);
  const db = adminDb();
  try {
    if (body.action === 'checkout' || body.action === 'cancel') {
      const status = body.action === 'checkout' ? 'checkout_started' : 'cancelled';
      const { data: changed, error } = await db.from('cart_reminders')
        .update({ status, ...(status === 'checkout_started' ? { checkout_started_at: new Date().toISOString() } : {}), updated_at: new Date().toISOString() })
        .eq('browser_token_hash', tokenHash).in('status', status === 'checkout_started' ? ['pending'] : ['pending', 'claimed']).select('id');
      if (error) throw error;
      if (status === 'checkout_started' && !changed?.length) {
        const { data: latest, error: latestError } = await db.from('cart_reminders')
          .select('status,attempted_at').eq('browser_token_hash', tokenHash).maybeSingle();
        if (latestError) throw latestError;
        if (latest?.status === 'claimed') {
          if (!latest.attempted_at || Date.now() - new Date(latest.attempted_at).getTime() < 2 * 60_000) {
            return res.status(409).json({ error: 'A cart reminder is being processed. Please try checkout in a moment.' });
          }
          const { error: staleError } = await db.from('cart_reminders')
            .update({ status: 'checkout_started', checkout_started_at: new Date().toISOString(), updated_at: new Date().toISOString() })
            .eq('browser_token_hash', tokenHash).eq('status', 'claimed');
          if (staleError) throw staleError;
        }
      }
      return res.status(200).json({ ok: true });
    }
    if (body.action !== 'opt_in' && body.action !== 'sync') return res.status(400).json({ error: 'Invalid action' });
    const lines = parseLines(body.lines);
    if (!lines) return res.status(400).json({ error: 'Invalid cart items' });
    const { data: existing, error: lookupError } = await db.from('cart_reminders')
      .select('id,item_fingerprint,status').eq('browser_token_hash', tokenHash).maybeSingle();
    if (lookupError) throw lookupError;
    if (existing?.status !== undefined && existing.status !== 'pending') {
      return res.status(409).json({ error: 'This cart reminder is already closed' });
    }

    let email: string | null = null;
    let emailHash: string | null = null;
    if (!existing) {
      if (body.action !== 'opt_in' || body.consent !== true || body.companyWebsite) {
        return res.status(400).json({ error: 'Explicit opt-in is required' });
      }
      email = normalizeEmail(body.email);
      if (!email) return res.status(400).json({ error: 'Enter a valid email address' });
      emailHash = secretHash('email', email);
      const { data: suppression, error: suppressionError } = await db.from('cart_reminder_suppressions')
        .select('email_hash').eq('email_hash', emailHash).maybeSingle();
      if (suppressionError) throw suppressionError;
      if (suppression) return res.status(200).json({ ok: true });

      // Rate-limit before hitting the Shopify Storefront API. Origin alone is not authentication.
      const forwarded = req.headers['x-forwarded-for'];
      const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
      const bucket = `${new Date().toISOString().slice(0, 10)}:${secretHash('ip', ip)}`;
      const { data: allowed, error: limitError } = await db.rpc('reserve_cart_reminder_optin', { p_bucket: bucket, p_limit: 20 });
      if (limitError) throw limitError;
      if (!allowed) return res.status(200).json({ ok: true });
      const { data: recent, error: recentError } = await db.from('cart_reminders').select('id')
        .eq('email_hash', emailHash).gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()).limit(2);
      if (recentError) throw recentError;
      if ((recent || []).length >= 2) return res.status(200).json({ ok: true });
    }

    const items = await verifiedShopifyItems(lines);
    const fingerprint = hash(JSON.stringify(lines));
    if (existing) {
      // Repeated reads of unchanged items never postpone the 24-hour inactivity timer.
      if (existing.item_fingerprint !== fingerprint) {
        const { data: updated, error } = await db.from('cart_reminders')
          .update({ items, item_fingerprint: fingerprint, last_activity_at: new Date().toISOString(), updated_at: new Date().toISOString() })
          .eq('id', existing.id).eq('status', 'pending').select('id');
        if (error) throw error;
        if (!updated?.length) return res.status(409).json({ error: 'Cart reminder could not be updated' });
      }
      return res.status(200).json({ ok: true });
    }
    const { error } = await db.from('cart_reminders').insert({
      id: randomUUID(), browser_token_hash: tokenHash, email_ciphertext: encryptEmail(email!), email_hash: emailHash!,
      items, item_fingerprint: fingerprint, status: 'pending', consent_version: 'cart-one-reminder-v1',
    });
    if (error) throw error;
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error('Cart reminder request failed', error instanceof Error ? error.message : 'unknown');
    return res.status(503).json({ error: 'Reminder unavailable, please try again' });
  }
}
