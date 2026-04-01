/**
 * Navigation — Tesla-inspired minimal dark nav
 * Pure black, white text, back arrow + title + search + menu
 * Sticky at top, no clutter
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from './CartDrawer';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/abc-filters-logo_a66e6869.png';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=fiberglass', label: 'Fiberglass' },
  { href: '/shop?category=tacky', label: 'Tacky Panels' },
  { href: '/shop?category=intake', label: 'Intake Filters' },
  { href: '/shop?category=ceiling', label: 'Ceiling Blankets' },
  { href: '/memberships', label: 'Memberships' },
  { href: '/why-choose-us', label: 'Why ABC Filters' },
  { href: '/contact', label: 'Contact' },
];

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, navigate] = useLocation();
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isHome = location === '/';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'oklch(0.05 0 0)',
          borderBottom: '1px solid oklch(0.15 0 0)',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}
      >
        {/* Left: Logo or Back */}
        {isHome ? (
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src={LOGO_URL} alt="ABC Filters" style={{ height: '28px', width: 'auto' }} />
          </Link>
        ) : (
          <button
            onClick={() => window.history.back()}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '16px',
              padding: '8px 0',
              cursor: 'pointer',
            }}
          >
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8 2L2 8L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Center: Title */}
        <span style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontWeight: 600,
          fontSize: '17px',
          letterSpacing: '-0.01em',
          pointerEvents: 'none',
        }}>
          {isHome ? 'ABC Filters' : location === '/shop' ? 'Shop' : location.startsWith('/product/') ? 'Product' : 'ABC Filters'}
        </span>

        {/* Right: Search + Cart + Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ background: 'none', border: 'none', color: 'white', padding: '4px', cursor: 'pointer', display: 'flex' }}
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setCartOpen(true)}
            style={{ background: 'none', border: 'none', color: 'white', padding: '4px', cursor: 'pointer', display: 'flex', position: 'relative' }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'white',
                color: 'black',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'white', padding: '4px', cursor: 'pointer', display: 'flex' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: '56px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'oklch(0.08 0 0)',
          borderBottom: '1px solid oklch(0.15 0 0)',
          padding: '12px 16px',
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search filters, sizes, types..."
              style={{
                flex: 1,
                background: 'oklch(0.13 0 0)',
                border: '1px solid oklch(0.22 0 0)',
                borderRadius: '8px',
                color: 'white',
                padding: '10px 14px',
                fontSize: '16px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'white',
                color: 'black',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Full-screen menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '56px',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: 'oklch(0.05 0 0)',
          overflowY: 'auto',
        }}>
          <div style={{ padding: '8px 0' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '17px',
                  fontWeight: 500,
                  borderBottom: '1px solid oklch(0.12 0 0)',
                }}
              >
                {link.label}
                <ChevronRight size={16} style={{ color: 'oklch(0.50 0 0)' }} />
              </Link>
            ))}
            <Link
              href="/auth"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                color: 'oklch(0.70 0 0)',
                textDecoration: 'none',
                fontSize: '17px',
                fontWeight: 500,
                borderBottom: '1px solid oklch(0.12 0 0)',
              }}
            >
              Sign In / Account
              <ChevronRight size={16} style={{ color: 'oklch(0.40 0 0)' }} />
            </Link>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
};
