import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Crown, RefreshCw } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { usePricing } from '@/hooks/usePricing';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

const AUTO_DELIVERY_DISCOUNT = 5; // 5% off for auto delivery

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
  const { discountPercent, discountCode, tier } = usePricing();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate item price considering auto delivery discount
  const getItemDisplayPrice = (item: typeof items[0]) => {
    const originalPrice = parseFloat(item.price.amount);
    if (item.sellingPlanId) {
      return originalPrice * (1 - AUTO_DELIVERY_DISCOUNT / 100);
    }
    return originalPrice;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + getItemDisplayPrice(item) * item.quantity,
    0
  );

  // Calculate discounted subtotal for member discount (on top of auto delivery)
  const discountedSubtotal = discountPercent > 0
    ? subtotal * (1 - discountPercent / 100)
    : subtotal;

  const handleCheckout = async () => {
    try {
      // Auto-apply member discount code at checkout if available
      const checkoutUrl = await createCheckout(discountCode || undefined);
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
            items.map((item) => {
              const originalPrice = parseFloat(item.price.amount);
              const itemPrice = getItemDisplayPrice(item);
              const isSubscription = !!item.sellingPlanId;

              return (
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
                    {/* Auto Delivery badge */}
                    {isSubscription && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <RefreshCw className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">Auto Delivery</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] px-1 py-0">
                          -{AUTO_DELIVERY_DISCOUNT}%
                        </Badge>
                      </div>
                    )}
                    {/* Price display */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm font-semibold ${isSubscription ? 'text-green-400' : 'text-blue-400'}`}>
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </span>
                      {isSubscription && (
                        <span className="text-xs line-through text-white/40">
                          ${(originalPrice * item.quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
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
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            {/* Member discount banner */}
            {discountPercent > 0 && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <Crown className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-xs text-green-300">
                  {tier?.charAt(0).toUpperCase()}{tier?.slice(1)} member — {discountPercent}% discount applied
                </span>
              </div>
            )}

            {/* Auto delivery savings summary */}
            {items.some(i => i.sellingPlanId) && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <RefreshCw className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-xs text-green-300">
                  Auto Delivery savings ({AUTO_DELIVERY_DISCOUNT}% off) included
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotal</span>
              {discountPercent > 0 ? (
                <div className="text-right">
                  <span className="text-white/40 line-through text-xs mr-2">${subtotal.toFixed(2)}</span>
                  <span className="font-semibold text-green-400">${discountedSubtotal.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              )}
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
