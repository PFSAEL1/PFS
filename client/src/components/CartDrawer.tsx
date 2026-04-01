/**
 * CartDrawer — Tesla-inspired dark slide-out cart
 * Pure black, white text, minimal chrome
 */
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, X } from 'lucide-react';
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

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.70)',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '420px',
        background: 'oklch(0.07 0 0)',
        borderLeft: '1px solid oklch(0.15 0 0)',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          borderBottom: '1px solid oklch(0.14 0 0)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingCart size={20} color="white" />
            <span style={{ fontSize: '17px', fontWeight: 600, color: 'white' }}>
              Cart {totalItems > 0 && (
                <span style={{
                  background: 'white',
                  color: 'black',
                  borderRadius: '10px',
                  padding: '1px 7px',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginLeft: '6px',
                }}>
                  {totalItems}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.60)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              color: 'rgba(255,255,255,0.30)',
              gap: '12px',
            }}>
              <ShoppingCart size={40} />
              <p style={{ fontSize: '14px' }}>Your cart is empty</p>
              <button
                onClick={() => { setCartOpen(false); navigate('/shop'); }}
                style={{
                  background: 'white',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => (
                <div key={item.variantId} style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  background: 'oklch(0.11 0 0)',
                  borderRadius: '8px',
                }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        background: 'oklch(0.14 0 0)',
                        padding: '4px',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.90)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      margin: '0 0 2px',
                    }}>
                      {item.title}
                    </p>
                    {item.variantTitle && item.variantTitle !== 'Default Title' && (
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.40)', margin: '0 0 4px' }}>
                        {item.variantTitle}
                      </p>
                    )}
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', margin: '0 0 8px' }}>
                      ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '4px',
                          background: 'oklch(0.18 0 0)',
                          border: '1px solid oklch(0.24 0 0)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'white', minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '4px',
                          background: 'oklch(0.18 0 0)',
                          border: '1px solid oklch(0.24 0 0)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,59,48,0.70)',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout footer */}
        {items.length > 0 && (
          <div style={{
            borderTop: '1px solid oklch(0.14 0 0)',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)' }}>Subtotal</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>${subtotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.30)', marginBottom: '16px' }}>
              Shipping calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '15px',
                background: isLoading ? 'oklch(0.25 0 0)' : 'white',
                color: isLoading ? 'rgba(255,255,255,0.40)' : 'black',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ExternalLink size={16} />}
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
            <button
              onClick={() => { clearCart(); toast.success('Cart cleared'); }}
              style={{
                width: '100%',
                padding: '10px',
                background: 'none',
                color: 'rgba(255,255,255,0.35)',
                border: 'none',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};
