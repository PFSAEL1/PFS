// Navigation — PFS Filters Dark Theme
// Pure black header, large prominent PFS logo, electric blue accents
// All functionality preserved: cart, auth, admin, products dropdown, mobile menu

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Menu, X, User, ChevronDown, Sparkles } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import { CartDrawer } from './CartDrawer';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent_e33888bf.png';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
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
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .eq('role', 'admin')
          .maybeSingle()
          .then(({ data: roleData }) => setIsAdmin(!!roleData));
      }
    });
  }, []);

  useEffect(() => { setIsOpen(false); setShopOpen(false); }, [location]);

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
                className="h-28 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-md hover:bg-white/5">
                Home
              </Link>

              {/* Products dropdown */}
              <div className="relative" ref={shopDropdownRef}>
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                  Products <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#111] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-3 py-1.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Shop</div>
                    <Link href="/shop" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      All Products
                    </Link>
                    <Link href="/shop-by-type" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Shop by Type
                    </Link>
                    <Link href="/shop-by-size" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Shop by Size
                    </Link>
                    <Link href="/brands" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Brands
                    </Link>
                    <Link href="/filter-compatibility" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      Filter Compatibility
                    </Link>
                    <div className="border-t border-white/10 my-1.5 mx-3"></div>
                    <div className="px-3 py-1.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Consumables</div>
                    <Link href="/consumables/pfs-vitra" className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      PFS VITRA
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

              <Link href="/paint-booth-filters" className="px-3 py-2 text-sm font-semibold text-orange-500 hover:text-orange-300 transition-colors rounded-md hover:bg-white/5">Filters</Link>
              <Link href="/memberships" className="px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-md hover:bg-white/5">
                Memberships
              </Link>
              <Link href="/filter-scanner" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-md hover:bg-white/5">
                <Sparkles className="w-4 h-4 text-[#4d9fff]" /> AI Scanner
              </Link>
              <Link href="/contact" className="px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-md hover:bg-white/5">
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
              <div className="hidden md:flex items-center gap-2">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30 bg-transparent transition-all"
                  >
                    Get a Quote
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    size="sm"
                    className="font-semibold bg-[#4d9fff] hover:bg-[#6aadff] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all"
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
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden border-t border-white/10 py-3 space-y-0.5 bg-black">
              <Link href="/paint-booth-filters" className="block px-4 py-2.5 text-sm font-semibold text-orange-500 hover:text-orange-300 hover:bg-white/5 rounded-lg transition-colors">Shop Filters</Link>
              <Link href="/shop" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">All Products</Link>
              <Link href="/shop-by-type" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Shop by Type</Link>
              <Link href="/shop-by-size" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Shop by Size</Link>
              <Link href="/brands" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Brands</Link>
              <Link href="/filter-compatibility" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Filter Compatibility</Link>
              <Link href="/consumables/pfs-vitra" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">PFS VITRA (Consumables)</Link>
              <Link href="/why-choose-us" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Why Choose Us</Link>
              <Link href="/memberships" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Memberships</Link>
              <Link href="/blog" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Blog</Link>
              <Link href="/filter-scanner" className="flex items-center gap-2 px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Sparkles className="w-4 h-4 text-[#4d9fff]" /> AI Scanner
              </Link>
              <Link href="/contact" className="block px-4 py-2.5 text-sm text-white hover:text-white hover:bg-white/5 rounded-lg transition-colors">Contact</Link>
              {isAdmin && (
                <Link href="/filter-database" className="block px-4 py-2.5 text-sm text-[#4d9fff] hover:text-blue-300 hover:bg-white/5 rounded-lg transition-colors">Filter Database (Admin)</Link>
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
      <CartDrawer />
    </>
  );
};
