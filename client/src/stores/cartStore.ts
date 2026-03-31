import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout } from '@/lib/shopify';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  cachedCheckoutUrl: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
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
          const existing = state.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              cachedCheckoutUrl: null,
            };
          }
          return { items: [...state.items, item], cachedCheckoutUrl: null };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
          cachedCheckoutUrl: null,
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
          cachedCheckoutUrl: null,
        }));
      },

      clearCart: () => set({ items: [], cachedCheckoutUrl: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      setCartOpen: (open) => set({ isCartOpen: open }),

      createCheckout: async (discountCode?: string) => {
        const { items, cachedCheckoutUrl } = get();
        if (items.length === 0) return null;

        if (cachedCheckoutUrl && !discountCode) return cachedCheckoutUrl;

        set({ isLoading: true });
        try {
          const checkoutUrl = await createStorefrontCheckout(items, discountCode);
          if (!discountCode) set({ cachedCheckoutUrl: checkoutUrl });
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
