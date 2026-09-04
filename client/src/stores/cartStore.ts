import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout, getCartLineKey } from '@/lib/shopify';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  cachedCheckoutUrl: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (lineKey: string) => void;
  updateQuantity: (lineKey: string, quantity: number) => void;
  clearCart: () => void;
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

      removeItem: (lineKey) => {
        set((state) => ({
          items: state.items.filter((i) => getCartLineKey(i) !== lineKey),
          cachedCheckoutUrl: null,
        }));
      },

      updateQuantity: (lineKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(lineKey);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            getCartLineKey(i) === lineKey ? { ...i, quantity } : i
          ),
          cachedCheckoutUrl: null,
        }));
      },

      clearCart: () => set({ items: [], cachedCheckoutUrl: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      setCartOpen: (open) => set({ isCartOpen: open }),

      createCheckout: async (discountCode?: string) => {
        const { items } = get();
        if (items.length === 0) return null;

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
