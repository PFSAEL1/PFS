import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminDb } from '../server/cartReminder.js';

const DAY = 24 * 60 * 60 * 1000;
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL)) {
    return res.status(503).json({ error: 'Database unavailable' });
  }
  try {
    const db = adminDb();
    const [carts, rateLimits, claims] = await Promise.all([
      db.from('cart_reminders').delete().lt('created_at', new Date(Date.now() - 60 * DAY).toISOString()),
      db.from('cart_reminder_rate_limits').delete().lt('expires_at', new Date().toISOString()),
      db.from('cart_reminder_send_claims').delete().lt('claimed_at', new Date(Date.now() - 30 * DAY).toISOString()),
    ]);
    if (carts.error || rateLimits.error || claims.error) throw carts.error || rateLimits.error || claims.error;
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Cart reminder retention failed', error instanceof Error ? error.message : 'unknown');
    return res.status(503).json({ error: 'Retention unavailable' });
  }
}
