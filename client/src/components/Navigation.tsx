import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Menu, X, User, ChevronDown, Sparkles, Filter } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import { CartDrawer } from './CartDrawer';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/abc-filters-logo_a66e6869.png';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [location] = useLocation();
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

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border' : 'bg-background/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src={LOGO_URL} alt="ABC Filters by PFS" className="h-8 w-auto" />
              <span className="font-bold text-lg text-primary hidden sm:block">ABC Filters</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {/* Shop dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">
                  Shop <ChevronDown className="w-3 h-3" />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-lg shadow-lg py-1 z-50">
                    <Link href="/shop" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">All Products</Link>
                    <Link href="/shop-by-type" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Shop by Type</Link>
                    <Link href="/shop-by-size" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Shop by Size</Link>
                    <Link href="/brands" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Brands</Link>
                    <Link href="/filter-compatibility" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Filter Compatibility</Link>
                  </div>
                )}
              </div>
              <Link href="/why-choose-us" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">Why Us</Link>
              <Link href="/memberships" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">Memberships</Link>
              <Link href="/blog" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">Blog</Link>
              <Link href="/filter-scanner" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">
                <Sparkles className="w-3 h-3 text-primary" /> AI Scanner
              </Link>
              <Link href="/contact" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">Contact</Link>
              {isAdmin && (
                <Link href="/analytics" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors text-primary">Analytics</Link>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-md hover:bg-accent transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {totalItems}
                  </Badge>
                )}
              </button>

              {/* Auth */}
              <div className="hidden md:block">
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="gap-1">
                      <User className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Sign In</Button>
                  </Link>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden border-t border-border py-3 space-y-1 bg-background">
              <Link href="/shop" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">All Products</Link>
              <Link href="/shop-by-type" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Shop by Type</Link>
              <Link href="/shop-by-size" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Shop by Size</Link>
              <Link href="/brands" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Brands</Link>
              <Link href="/filter-compatibility" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Filter Compatibility</Link>
              <Link href="/why-choose-us" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Why Choose Us</Link>
              <Link href="/memberships" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Memberships</Link>
              <Link href="/blog" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Blog</Link>
              <Link href="/filter-scanner" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded transition-colors">
                <Sparkles className="w-4 h-4" /> AI Scanner
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors">Contact</Link>
              {isAdmin && (
                <Link href="/analytics" className="block px-4 py-2 text-sm hover:bg-accent rounded transition-colors text-primary">Analytics</Link>
              )}
              <div className="px-4 pt-2 flex gap-2">
                <Link href="/contact" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm">Get a Quote</Button>
                </Link>
                {user ? (
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">Dashboard</Button>
                  </Link>
                ) : (
                  <Link href="/auth" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">Sign In</Button>
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
