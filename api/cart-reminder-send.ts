import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminDb, configured, decryptEmail, emailContent } from '../server/cartReminder';

export const config = { maxDuration: 60 };
const DAY = 24 * 60 * 60 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!configured() || !process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Reminder sender not configured' });
  const db = adminDb();
  const dueBefore = new Date(Date.now() - DAY).toISOString();
  let sent = 0, skipped = 0, failed = 0;
  try {
    const { data: carts, error } = await db.from('cart_reminders')
      .select('id,email_ciphertext,email_hash,items,consent_at,last_activity_at,status')
      .eq('status', 'pending').lte('last_activity_at', dueBefore)
      .order('last_activity_at', { ascending: true }).limit(25);
    if (error) throw error;
    for (const cart of carts || []) {
      // Claim with an atomic database transition. Never automatically retry an ambiguous send.
      const { data: claimed, error: claimError } = await db.rpc('claim_cart_reminder', { p_id: cart.id, p_due_before: dueBefore });
      if (claimError) throw claimError;
      if (!claimed) { skipped++; continue; }
      try {
        const email = decryptEmail(cart.email_ciphertext);
        const { data: suppression, error: suppressError } = await db.from('cart_reminder_suppressions')
          .select('email_hash').eq('email_hash', cart.email_hash).maybeSingle();
        if (suppressError) throw suppressError;
        const { data: alreadySent, error: alreadyError } = await db.from('cart_reminders')
          .select('id').eq('email_hash', cart.email_hash)
          .neq('id', cart.id).gte('sent_at', new Date(Date.now() - 14 * DAY).toISOString()).limit(1);
        if (alreadyError) throw alreadyError;
        const { data: orders, error: orderError } = await db.from('customer_orders')
          .select('id').ilike('customer_email', email).gte('created_at', cart.consent_at).limit(1);
        if (orderError) throw orderError; // Fail closed if order suppression cannot be verified.
        const { data: latest, error: latestError } = await db.from('cart_reminders')
          .select('status,checkout_started_at').eq('id', cart.id).single();
        if (latestError) throw latestError;
        if (suppression || alreadySent?.length || orders?.length || latest.status !== 'claimed' || latest.checkout_started_at) {
          await db.from('cart_reminders').update({ status: 'cancelled', updated_at: new Date().toISOString() })
            .eq('id', cart.id).eq('status', 'claimed');
          skipped++;
          continue;
        }
        const { error: linkError } = await db.from('cart_reminder_unsubscribe_links')
          .upsert({ id: cart.id, email_hash: cart.email_hash }, { onConflict: 'id' });
        if (linkError) throw linkError;
        const { html, text, unsubscribeUrl } = emailContent(cart.id, cart.items);
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': `pfs-cart-reminder-${cart.id}`,
          },
          body: JSON.stringify({
            from: 'PFS Filters <cart@updates.pfsfilters.com>',
            to: [email], reply_to: 'orders@pfsfilters.com',
            subject: 'Your PFS Filters cart is ready when you are', html, text,
            headers: {
              'List-Unsubscribe': `<${unsubscribeUrl}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
          }),
          signal: AbortSignal.timeout(15_000),
        });
        if (!response.ok) throw new Error(`Resend rejected request: HTTP ${response.status}`);
        const payload = await response.json() as { id?: string };
        const { error: savedError } = await db.from('cart_reminders')
          .update({ status: 'sent', sent_at: new Date().toISOString(), resend_message_id: payload.id || null, updated_at: new Date().toISOString() })
          .eq('id', cart.id).eq('status', 'claimed');
        if (savedError) throw savedError;
        sent++;
      } catch (error) {
        failed++;
        console.error('Cart reminder dispatch failed:', cart.id, error instanceof Error ? error.message : 'unknown');
        // Even on timeout, the provider may have accepted the message. Never blindly retry.
        await db.from('cart_reminders').update({ status: 'failed', updated_at: new Date().toISOString() })
          .eq('id', cart.id).eq('status', 'claimed');
      }
      // Resend permits only a few requests per second on small accounts.
      await new Promise(resolve => setTimeout(resolve, 550));
    }
    return res.status(200).json({ checked: carts?.length || 0, sent, skipped, failed });
  } catch (error) {
    console.error('Cart reminder job failed', error instanceof Error ? error.message : 'unknown');
    return res.status(503).json({ error: 'Job unavailable', sent, skipped, failed });
  }
}
