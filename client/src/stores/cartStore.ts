import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout, getCartLineKey } from '@/lib/shopify';
import { CART_REMINDERS_ENABLED, postReminder } from '@/lib/cartReminderClient';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  cachedCheckoutUrl: string | null;
  reminderToken: string | null;
  reminderOptIn: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (lineKey: string) => Promise<void>;
  updateQuantity: (lineKey: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setReminderOptIn: (token: string) => void;
  disableReminder: () => void;
  setLoading: (loading: boolean) => void;
  setCartOpen: (open: boolean) => void;
  createCheckout: (discountCode?: string) => Promise<string | null>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isCartOpen: false,
      cachedCheckoutUrl: null,
      reminderToken: null,
      reminderOptIn: false,

      setReminderOptIn: (token) => set({ reminderToken: token, reminderOptIn: true }),
      disableReminder: () => set({ reminderToken: null, reminderOptIn: false }),

      addItem: (item) => {
        set((state) => {
          const lineKey = getCartLineKey(item);
          const existing = state.items.find((i) => getCartLineKey(i) === lineKey);
          if (existing) {
            return {
              items: state.items.map((i) =>
                getCartLineKey(i) === lineKey
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              cachedCheckoutUrl: null,
            };
          }
          return { items: [...state.items, item], cachedCheckoutUrl: null };
        });
      },

      removeItem: async (lineKey) => {
        const state = get();
        const remaining = state.items.filter((item) => getCartLineKey(item) !== lineKey);
        if (!remaining.length && state.reminderOptIn && state.reminderToken && CART_REMINDERS_ENABLED) {
          await postReminder('cancel', state.reminderToken, []);
          get().disableReminder();
        }
        set((state) => ({
          items: state.items.filter((i) => getCartLineKey(i) !== lineKey),
          cachedCheckoutUrl: null,
        }));
      },

      updateQuantity: async (lineKey, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(lineKey);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            getCartLineKey(i) === lineKey ? { ...i, quantity } : i
          ),
          cachedCheckoutUrl: null,
        }));
      },

      clearCart: async () => {
        const state = get();
        if (CART_REMINDERS_ENABLED && state.reminderOptIn && state.reminderToken) {
          await postReminder('cancel', state.reminderToken, []);
        }
        set({ items: [], cachedCheckoutUrl: null, reminderOptIn: false, reminderToken: null });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setCartOpen: (open) => set({ isCartOpen: open }),

      createCheckout: async (discountCode?: string) => {
        const { items, reminderOptIn, reminderToken } = get();
        if (items.length === 0) return null;

        // Shopify's checkout recovery takes over here. Fail closed to avoid two emails.
        if (CART_REMINDERS_ENABLED && reminderOptIn && reminderToken) {
          await postReminder('checkout', reminderToken, items);
          get().disableReminder();
        }
        // Always create a fresh checkout to ensure discount code is applied
        set({ isLoading: true });
        try {
          const checkoutUrl = await createStorefrontCheckout(items, discountCode);
          set({ cachedCheckoutUrl: checkoutUrl });
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: 'shopify-cart' }
  )
);
