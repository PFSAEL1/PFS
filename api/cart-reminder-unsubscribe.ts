import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminDb, databaseReady, escaped, verifyLink } from '../server/cartReminder.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).send('Method not allowed');
  if (!databaseReady()) return res.status(503).send('Reminders are not available');
  const token = req.query.token;
  const id = verifyLink('unsubscribe', token);
  if (!id) return res.status(400).send('Invalid unsubscribe link');
  const db = adminDb();
  if (req.method === 'GET') {
    const action = `/api/cart-reminder-unsubscribe?token=${encodeURIComponent(String(token))}`;
    return res.status(200).send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe from PFS cart reminders</title></head><body style="font:16px Arial,sans-serif;max-width:540px;margin:12vh auto;padding:20px;color:#172334"><h1>Cart reminder preferences</h1><p>Stop emails reminding you about an unfinished PFS Filters cart.</p><form method="post" action="${escaped(action)}"><button type="submit" style="background:#3478ef;color:white;border:0;padding:14px 20px;border-radius:7px;cursor:pointer">Unsubscribe</button></form></body></html>`);
  }
  try {
    const { data: link, error } = await db.from('cart_reminder_unsubscribe_links').select('email_hash').eq('id', id).maybeSingle();
    if (error) throw error;
    const { data: current, error: currentError } = link ? { data: null, error: null }
      : await db.from('cart_reminders').select('email_hash').eq('id', id).maybeSingle();
    if (currentError) throw currentError;
    const cart = link || current;
    if (cart) {
      const { error: writeError } = await db.from('cart_reminder_suppressions')
        .upsert({ email_hash: cart.email_hash }, { onConflict: 'email_hash' });
      if (writeError) throw writeError;
      const { error: cancelError } = await db.from('cart_reminders')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('email_hash', cart.email_hash).in('status', ['pending', 'claimed']);
      if (cancelError) throw cancelError;
    }
    return res.status(200).send('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Unsubscribed</title></head><body style="font:16px Arial,sans-serif;max-width:540px;margin:12vh auto;padding:20px"><h1>You’re unsubscribed.</h1><p>You will not receive more PFS Filters cart reminder emails.</p></body></html>');
  } catch (error) {
    console.error('Cart reminder opt-out failed', error instanceof Error ? error.message : 'unknown');
    return res.status(503).send('Please try again later');
  }
}
