import { useEffect } from 'react';
import { CART_REMINDERS_ENABLED, postReminder } from '@/lib/cartReminderClient';
import { useCartStore } from '@/stores/cartStore';

export function CartReminderActivity() {
  const items = useCartStore(state => state.items);
  const token = useCartStore(state => state.reminderToken);
  const optedIn = useCartStore(state => state.reminderOptIn);
  useEffect(() => {
    if (!CART_REMINDERS_ENABLED || !optedIn || !token) return;
    let cancelled = false;
    const synchronize = async () => {
      try {
        await postReminder(items.length ? 'sync' : 'cancel', token, items);
        if (!cancelled && !items.length) useCartStore.getState().disableReminder();
      } catch {
        // Keep the session for the next retry; never fabricate a successful opt-out.
        console.warn('Cart reminder preference could not be updated.');
      }
    };
    void synchronize();
    return () => { cancelled = true; };
  }, [items, token, optedIn]);
  return null;
}
