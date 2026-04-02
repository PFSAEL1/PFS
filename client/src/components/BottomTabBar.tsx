// ABC Filters iOS — Bottom Tab Bar v4
// Tesla-grade: pill active indicator, SF Pro icons, glass morphism
import { useLocation } from 'wouter';
import { Home, ShoppingBag, Scan, Package, User } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useHaptics } from '@/hooks/useHaptics';

const TABS = [
  { label: 'Home',    icon: Home,        path: '/' },
  { label: 'Shop',    icon: ShoppingBag, path: '/shop' },
  { label: 'Scanner', icon: Scan,        path: '/filter-scanner' },
  { label: 'Orders',  icon: Package,     path: '/dashboard' },
  { label: 'Account', icon: User,        path: '/auth' },
];

export const BottomTabBar = () => {
  const [location, navigate] = useLocation();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const { trigger } = useHaptics();

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <nav className="tab-bar">
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          const showBadge = tab.path === '/shop' && cartCount > 0;
          return (
            <button
              key={tab.path}
              onClick={() => { trigger('light'); navigate(tab.path); }}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all btn-press relative"
              style={{
                background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                minWidth: 56,
              }}>
              <div className="relative">
                <Icon
                  className="w-[22px] h-[22px] transition-all"
                  style={{
                    color: active ? '#fff' : 'rgba(255,255,255,0.40)',
                    strokeWidth: active ? 2.2 : 1.8,
                  }}
                />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1"
                    style={{ background: '#0066cc' }}>
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] font-semibold tracking-tight transition-all"
                style={{ color: active ? '#fff' : 'rgba(255,255,255,0.38)' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
