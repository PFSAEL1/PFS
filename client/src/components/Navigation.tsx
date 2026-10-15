// Navigation — PFS Filters Dark Theme
// Pure black header, large prominent PFS logo, electric blue accents
// All functionality preserved: cart, auth, admin, products dropdown, mobile menu

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Menu, X, User, ChevronDown, Search } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

const LOGO_URL = '/images/brands/pfs-logo-wide-420.webp';

const NAV_MENUS: Array<{
  id: string;
  label: string;
  columns: Array<{ title: string; links: Array<[string, string]> }>;
}> = [
  {
    id: 'shop',
    label: 'Shop',
    columns: [
      {
        title: 'By stage',
        links: [
          ['/exhaust-filters', 'Exhaust'],
          ['/intake-filters', 'Intake'],
          ['/ceiling-filters', 'Ceiling'],
          ['/prefilters', 'Prefilters'],
          ['/andreae-paint-booth-filters', 'Andreae'],
          ['/shop', 'All products'],
        ],
      },
      {
        title: 'Find a fit',
        links: [
          ['/filter-finder', 'Filter Finder'],
          ['/shop-by-booth', 'Booth brand'],
          ['/shop-by-booth-type', 'Booth type'],
          ['/shop-by-size', 'Size'],
          ['/shop-by-filter-type', 'Filter type'],
          ['/brands', 'Brands'],
        ],
      },
      {
        title: 'Also',
        links: [
          ['/consumables', 'Consumables'],
          ['/filter-scanner', 'AI scanner'],
        ],
      },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    columns: [
      {
        title: 'Applications',
        links: [
          ['/industries/automotive-paint-booth-filters', 'Automotive'],
          ['/industries/aerospace-paint-booth-filters', 'Aerospace & MRO'],
          ['/aerospace', 'Aerospace catalog'],
          ['/paint-booth-filters', 'Paint booth filters'],
          ['/neshap-compliant-paint-booth-filters', 'NESHAP guide'],
        ],
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    columns: [
      {
        title: 'Resources',
        links: [
          ['/faq', 'FAQ'],
          ['/blog', 'Guides'],
          ['/why-choose-us', 'Why PFS'],
          ['/memberships', 'Memberships'],
          ['/contact', 'Contact'],
        ],
      },
    ],
  },
];
const CartDrawer = lazy(() => import('./CartDrawer').then((module) => ({ default: module.CartDrawer })));
const ProductSearchDialog = lazy(() => import('./ProductSearchDialog'));

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let authTimerId: number | undefined;
    let fallbackTimerId: number | undefined;
    const interactionEvents = ['scroll', 'click', 'touchstart', 'pointerdown', 'keydown'] as const;

    const loadAuthState = async () => {
      const { supabase } = await import('@/lib/supabase');
      if (cancelled) return;
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      setUser(data.user);
      if (data.user) {
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin')
          .maybeSingle()
          .then(({ data: roleData }) => {
            if (!cancelled) setIsAdmin(!!roleData);
        });
      }
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, triggerAuthLoad);
      });
    };

    const scheduleAuthLoad = () => {
      removeInteractionListeners();
      if (fallbackTimerId !== undefined) {
        globalThis.clearTimeout(fallbackTimerId);
        fallbackTimerId = undefined;
      }
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadAuthState, { timeout: 3500 });
      } else {
        authTimerId = globalThis.setTimeout(loadAuthState, 1800) as unknown as number;
      }
    };

    const triggerAuthLoad = () => {
      if (cancelled || idleId !== undefined || authTimerId !== undefined) return;
      scheduleAuthLoad();
    };

    const scheduleFallback = () => {
      fallbackTimerId = globalThis.setTimeout(() => {
        fallbackTimerId = undefined;
        triggerAuthLoad();
      }, 15000) as unknown as number;
    };

    const waitForInteraction = () => {
      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, triggerAuthLoad, { once: true, passive: true });
      });
      scheduleFallback();
    };

    if (document.readyState === 'complete') waitForInteraction();
    else window.addEventListener('load', waitForInteraction, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', waitForInteraction);
      removeInteractionListeners();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (authTimerId !== undefined) globalThis.clearTimeout(authTimerId);
      if (fallbackTimerId !== undefined) globalThis.clearTimeout(fallbackTimerId);
    };
  }, []);

  useEffect(() => { setIsOpen(false); setOpenMenu(null); setIsSearchOpen(false); }, [location]);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]');
      if (isTyping) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(false);
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', openSearch);
    return () => window.removeEventListener('keydown', openSearch);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/98 backdrop-blur-md border-b border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-black/95 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-24">

            {/* Logo — large and prominent */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="PFS Filters"
                className="h-16 w-auto"
                width={420}
                height={127}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </Link>

            <div className="hidden items-center gap-1 md:flex" ref={shopDropdownRef}>
              {NAV_MENUS.map((menu) => (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.id)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === menu.id}
                    onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                    className="flex min-h-11 items-center gap-1 rounded-md px-3 text-sm font-medium text-white hover:bg-white/5"
                  >
                    {menu.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenu === menu.id ? 'rotate-180' : ''}`} />
                  </button>
                  {openMenu === menu.id && (
                    <div className={`absolute left-0 top-full z-50 mt-1 grid gap-6 rounded-xl border border-white/10 bg-[#0c0c0c] p-5 shadow-2xl ${menu.columns.length > 1 ? 'w-[34rem] grid-cols-3' : 'w-64 grid-cols-1'}`}>
                      {menu.columns.map((column) => (
                        <div key={column.title}>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{column.title}</p>
                          {column.links.map(([href, label]) => (
                            <Link key={href} href={href} className="flex min-h-11 items-center rounded-md px-2 text-sm text-white/85 hover:bg-white/5 hover:text-white">
                              {label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isAdmin && (
                <Link href="/filter-database" className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-[#4d9fff] hover:bg-white/5">
                  Filter DB
                </Link>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold border-white/20 text-white/80 hover:bg-white/10 hover:text-white bg-transparent transition-[background-color,box-shadow,transform,opacity]"
                  >
                    Get a Quote
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    size="sm"
                    className="min-h-11 font-semibold bg-[#0081f2] hover:bg-[#1a91ff] text-white transition-[background-color,box-shadow,transform,opacity]"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1.5" />
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#4d9fff] text-white border-0">
                    {totalItems}
                  </Badge>
                )}
              </button>

              {/* Auth */}
              <div className="hidden md:block">
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="gap-1 border-white/20 text-white/80 hover:bg-white/10 hover:text-white bg-transparent">
                      <User className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 font-semibold">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="!w-[30px] h-[30px]" /> : <Menu className="!w-[30px] h-[30px]" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="mobile-nav-menu flex max-h-[74vh] flex-col items-stretch overflow-y-auto overflow-x-hidden border-t border-white/10 bg-black py-3 md:hidden">
              {NAV_MENUS.map((menu) => (
                <div key={menu.id} className="px-2 py-1">
                  <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{menu.label}</p>
                  {menu.columns.flatMap((column) => column.links).map(([href, label]) => (
                    <Link key={href} href={href} className="flex min-h-11 items-center rounded-lg px-3 text-sm text-white hover:bg-white/5">
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
              {isAdmin && (
                <Link href="/filter-database" className="mx-2 flex min-h-11 items-center rounded-lg px-3 text-sm text-[#4d9fff] hover:bg-white/5">Filter Database (Admin)</Link>
              )}
              <div className="px-4 pt-3 pb-1 flex gap-2">
                <Link href="/contact" className="flex-1">
                  <Button className="w-full bg-[#4d9fff] hover:bg-[#6aadff] text-white" size="sm">Get a Quote</Button>
                </Link>
                {user ? (
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full border-white/20 text-white/80 bg-transparent" size="sm">Dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/auth" className="flex-1">
                    <Button className="w-full bg-white text-black hover:bg-white/90" size="sm">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <button
        type="button"
        onClick={() => {
          setIsOpen(false);
          setOpenMenu(null);
          setIsSearchOpen(true);
        }}
        className="search-fab-pulse fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8bc0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-6 md:right-6 md:h-[84px] md:w-[84px]"
        aria-label="Search products"
        title="Search products (Ctrl+K)"
      >
        <span className="search-fab-pulse-surface" aria-hidden="true" />
        <Search className="search-fab-pulse-icon h-7 w-7 md:h-[42px] md:w-[42px]" aria-hidden="true" />
      </button>
      {isCartOpen && (
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      )}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <ProductSearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
        </Suspense>
      )}
    </>
  );
};
