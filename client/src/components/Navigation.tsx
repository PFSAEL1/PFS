// Navigation — PFS Filters Dark Theme
// Pure black header, large prominent PFS logo, electric blue accents
// All functionality preserved: cart, auth, admin, products dropdown, mobile menu

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Menu, X, User, ChevronDown, Search } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

const LOGO_URL = '/images/brands/pfs-logo-wide-420.webp';
const CartDrawer = lazy(() => import('./CartDrawer').then((module) => ({ default: module.CartDrawer })));
const ProductSearchDialog = lazy(() => import('./ProductSearchDialog'));

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target as Node)) {
        setShopOpen(false);
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

  useEffect(() => { setIsOpen(false); setShopOpen(false); setIsSearchOpen(false); }, [location]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

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
        className="site-nav fixed top-0 left-0 right-0 z-50"
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

            {/* Desktop Nav */}
            <div className="nav-pills hidden md:flex">
              <Link href="/" className={`nav-pill${location === '/' ? ' is-active' : ''}`}>
                Home
              </Link>

              {/* Products dropdown */}
              <div className="relative" ref={shopDropdownRef}>
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="nav-pill"
                >
                  Products <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-1 max-h-[86vh] w-64 overflow-y-auto overscroll-contain bg-[#111] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-3 py-1.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Shop</div>
                    <Link href="/shop" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      All Products
                    </Link>
                    <Link href="/shop-by-filter-type" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Shop by Filter Type
                    </Link>
                    <Link href="/shop-by-booth" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Shop by Booth Brand
                    </Link>
                    <Link href="/shop-by-booth-type" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Shop by Booth Type
                    </Link>
                    <Link href="/shop-by-size" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Shop by Size
                    </Link>
                    <Link href="/brands" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Brands
                    </Link>
                    <Link href="/filter-finder" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Filter Finder Tool
                    </Link>
                    <Link href="/how-to-size-paint-booth-filters" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      How to Size a Filter
                    </Link>
                    <Link href="/consumables" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Consumables
                    </Link>
                    <Link href="/industries/automotive-paint-booth-filters" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Automotive Filters
                    </Link>
                    <Link href="/industries/aerospace-paint-booth-filters" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Aerospace & MRO Filters
                    </Link>
                    <div className="border-t border-white/10 my-1.5 mx-3"></div>
                    <div className="px-3 py-1.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Info</div>
                    <Link href="/why-choose-us" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Why Choose Us
                    </Link>
                    <Link href="/blog" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Blog
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/shop" className={`nav-pill${location === '/shop' ? ' is-active' : ''}`}>Filters</Link>
              <Link href="/memberships" className={`nav-pill${location === '/memberships' ? ' is-active' : ''}`}>
                Memberships
              </Link>
              <Link href="/filter-scanner" className={`nav-pill${location === '/filter-scanner' ? ' is-active' : ''}`}>
                Filter Scanner
              </Link>
              <Link href="/contact" className={`nav-pill${location === '/contact' ? ' is-active' : ''}`}>
                Contact
              </Link>
              {isAdmin && (
                <Link href="/filter-database" className="px-3 py-2 text-sm font-medium text-[#4d9fff] hover:text-blue-300 transition-colors rounded-md hover:bg-white/5">
                  Filter DB
                </Link>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="header-cta hidden items-center gap-2 xl:flex">
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
                    className="font-semibold bg-[#4d9fff] hover:bg-[#6aadff] text-white transition-[background-color,box-shadow,transform,opacity]"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1.5" />
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
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
                className="md:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="!w-[30px] h-[30px]" /> : <Menu className="!w-[30px] h-[30px]" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && createPortal(
            <div id="mobile-menu" className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Menu" style={{ position: 'fixed', inset: 0, zIndex: 80, background: '#1a1c20', color: '#ececec' }}>
              <div className="flex items-center justify-between">
                <img src={LOGO_URL} alt="PFS Filters" width={420} height={127} style={{ height: 48, width: 'auto' }} />
                <button type="button" className="nav-pill" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mobile-overlay-links">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop Filters</Link>
                <Link href="/shop-by-filter-type">Shop by Filter Type</Link>
                <Link href="/shop-by-booth">Shop by Booth Brand</Link>
                <Link href="/shop-by-booth-type">Shop by Booth Type</Link>
                <Link href="/shop-by-size">Shop by Size</Link>
                <Link href="/brands">Brands</Link>
                <Link href="/filter-finder">Filter Finder</Link>
                <Link href="/how-to-size-paint-booth-filters">How to Size a Filter</Link>
                <Link href="/consumables">Consumables</Link>
                <Link href="/industries/automotive-paint-booth-filters">Automotive Filters</Link>
                <Link href="/industries/aerospace-paint-booth-filters">Aerospace and MRO Filters</Link>
                <Link href="/why-choose-us">Why Choose Us</Link>
                <Link href="/memberships">Memberships</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/filter-scanner">Filter Scanner</Link>
                <Link href="/contact">Contact</Link>
                {isAdmin && <Link href="/filter-database">Filter Database</Link>}
                {user ? <Link href="/dashboard">Dashboard</Link> : <Link href="/auth">Sign In</Link>}
              </div>
            </div>,
            document.body,
          )}
        </div>
      </nav>
      <button
        type="button"
        onClick={() => {
          setIsOpen(false);
          setShopOpen(false);
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
