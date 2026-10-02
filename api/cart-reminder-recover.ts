import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminDb, databaseReady, verifyLink } from '../server/cartReminder.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!databaseReady()) return res.status(503).json({ error: 'Recovery is unavailable' });
  const id = verifyLink('recover', req.query.token);
  if (!id) return res.status(400).json({ error: 'Invalid link' });
  try {
    const { data: cart, error } = await adminDb().from('cart_reminders')
      .select('items,status,created_at').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!cart || !['pending', 'sent'].includes(cart.status)
      || Date.now() - new Date(cart.created_at).getTime() > 30 * 24 * 60 * 60 * 1000) {
      return res.status(404).json({ error: 'This cart link has expired' });
    }
    return res.status(200).json({ lines: cart.items.map((item: { variantId: string; quantity: number; handle: string; sellingPlanId?: string }) => ({
      variantId: item.variantId, quantity: item.quantity, handle: item.handle,
      ...(item.sellingPlanId ? { sellingPlanId: item.sellingPlanId } : {}),
    })) });
  } catch (error) {
    console.error('Cart restore failed', error instanceof Error ? error.message : 'unknown');
    return res.status(503).json({ error: 'Please try again' });
  }
}
