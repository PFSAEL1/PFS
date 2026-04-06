import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Crown } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

export const CartDrawer = () => {
  const {
    items,
    isLoading,
    isCartOpen,
    updateQuantity,
    removeItem,
    createCheckout,
    clearCart,
    setCartOpen,
  } = useCartStore();

  const [, navigate] = useLocation();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const checkoutUrl = await createCheckout();
      if (checkoutUrl) {
        toast.success('Redirecting to checkout...');
        window.location.href = checkoutUrl;
      }
    } catch {
      toast.error('Failed to create checkout. Please try again.');
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
            {totalItems > 0 && (
              <Badge className="ml-1 bg-blue-500 text-blue-400-foreground">{totalItems}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? 'Your cart is empty'
              : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-white/50 gap-3">
              <ShoppingCart className="h-12 w-12 opacity-30" />
              <p className="text-sm">No items yet</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCartOpen(false);
                  navigate('/shop');
                }}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-3 p-3 bg-white/5/30 rounded-lg">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  {item.variantTitle && item.variantTitle !== 'Default Title' && (
                    <p className="text-xs text-white/50">{item.variantTitle}</p>
                  )}
                  <p className="text-sm font-semibold text-blue-400 mt-1">
                    ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-6 h-6 rounded border border-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-6 h-6 rounded border border-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-white/50">Shipping calculated at checkout</p>
            <Button
              className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
              {isLoading ? 'Processing...' : 'Checkout'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-white/50 hover:text-destructive"
              onClick={() => { clearCart(); toast.success('Cart cleared'); }}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
