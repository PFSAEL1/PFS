import type { CartItem } from './shopify';

export const CART_REMINDERS_ENABLED = String(import.meta.env.VITE_CART_REMINDERS_ENABLED) === 'true';

export function newReminderToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function reminderLines(items: CartItem[]) {
  return items.map(({ variantId, quantity, sellingPlanId }) => ({
    variantId, quantity, ...(sellingPlanId ? { sellingPlanId } : {}),
  }));
}

export async function postReminder(
  action: 'opt_in' | 'sync' | 'checkout' | 'cancel',
  browserToken: string,
  items: CartItem[],
  extras?: { email?: string; consent?: true; companyWebsite?: string },
): Promise<void> {
  if (!CART_REMINDERS_ENABLED) return;
  const response = await fetch('/api/cart-reminder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, browserToken, lines: reminderLines(items), ...extras }),
    credentials: 'same-origin',
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error('We could not save your reminder preference. Please try again.');
}
