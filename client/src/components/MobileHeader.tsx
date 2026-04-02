// ABC Filters iOS App — Mobile Page Header
// iOS-style navigation header with back button support
import { useLocation } from 'wouter';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  transparent?: boolean;
  rightElement?: React.ReactNode;
}

export const MobileHeader = ({
  title,
  showBack = false,
  showCart = false,
  transparent = false,
  rightElement,
}: MobileHeaderProps) => {
  const [, navigate] = useLocation();
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={cn(
        "text-white",
        'sticky top-0 z-40 flex items-center justify-between px-4 h-12 transition-all duration-200',
        transparent
          ? 'bg-transparent'
          : 'backdrop-blur-xl border-b'
      )}
      style={{ paddingTop: 'max(0px, env(safe-area-inset-top, 0px) - 44px)', background: transparent ? 'transparent' : 'rgba(0,0,0,0.92)', borderBottomColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Left: Back button or spacer */}
      <div className="w-10">
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-0.5 text-primary font-medium text-sm btn-press"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Center: Title */}
      <h1 className="text-sm font-semibold text-foreground tracking-tight">{title}</h1>

      {/* Right: Cart or custom element */}
      <div className="w-10 flex justify-end">
        {showCart && (
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center btn-press"
          >
            <ShoppingCart className="w-4 h-4 text-foreground stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        )}
        {rightElement}
      </div>
    </div>
  );
};
