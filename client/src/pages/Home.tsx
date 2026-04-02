// ABC Filters iOS — Home Screen v6
// Design: Tesla Shop — pure black, full-bleed cinematic images, horizontal scroll product cards
// Fix: logo header, correct category hrefs, new dramatic CDN images, no cart delay
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Search, Plus } from 'lucide-react';
import { toast } from 'sonner';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/abc-filters-logo_a66e6869.png';

const CATEGORY_SECTIONS = [
  {
    label: 'Fiberglass Arrestors',
    sub: 'High-capacity exhaust filtration',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-fiberglass-arrestor_eb8937a7.png',
    href: '/shop?filter=Fiberglass',
  },
  {
    label: 'Tacky Panel Filters',
    sub: 'Superior particle capture',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-tacky-panel_fe479d85.png',
    href: '/shop?filter=Tacky',
  },
  {
    label: 'Ceiling Blankets',
    sub: 'Overhead intake filtration',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-ceiling-blanket_ffe5ee02.png',
    href: '/shop?filter=Ceiling',
  },
  {
    label: 'Roll Media',
    sub: 'Continuous roll filtration',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-fiberglass-roll_33b1a861.png',
    href: '/shop?filter=Roll',
  },
  {
    label: 'MERV Intake Filters',
    sub: 'Intake, exhaust, MERV-rated',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-merv-filter_171d3935.png',
    href: '/shop?filter=MERV',
  },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [featuredProducts, setFeaturedProducts] = useState<ShopifyProduct[]>([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    fetchProducts(8).then((data) => {
      setFeaturedProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')).slice(0, 8));
      setProductsLoaded(true);
    }).catch(() => setProductsLoaded(true));
  }, []);

  const handleQuickAdd = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    addItem({
      variantId: variant.id,
      productId: product.node.id,
      title: product.node.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: product.node.images.edges[0]?.node.url,
      handle: product.node.handle,
    });
    toast.success('Added to cart', { description: product.node.title });
    setCartOpen(true); // instant — no delay
  };

  return (
    <div className="min-h-screen safe-bottom" style={{ background: '#000' }}>
      <SEO title="ABC Filters" description="Shop premium paint booth filters." canonical="https://abcfilters.net" />

      {/* HEADER — logo instead of text */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <img src={LOGO_URL} alt="ABC Filters" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
        <button
          onClick={() => navigate('/shop')}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)' }}>
          <Search className="w-[18px] h-[18px] text-white" />
        </button>
      </div>

      {/* HERO — full-bleed cinematic */}
      <Link href={CATEGORY_SECTIONS[0].href}>
        <div className="relative w-full overflow-hidden mt-2" style={{ height: 430 }}>
          <img
            src={CATEGORY_SECTIONS[0].image}
            alt="Fiberglass Arrestors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.88) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-7">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>ABC Filters</p>
            <h1 className="text-white text-[28px] font-bold leading-tight tracking-tight mb-5">
              The Only Filter Program<br />That Manages Your Booth
            </h1>
            <div className="flex gap-3">
              <button
                onClick={(e) => { e.preventDefault(); navigate('/shop'); }}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.92)', color: '#000' }}>
                Shop Now
              </button>
              <button
                onClick={(e) => { e.preventDefault(); navigate('/memberships'); }}
                className="px-5 py-2.5 rounded-full text-[14px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.10)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)' }}>
                Memberships
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* POPULAR PRODUCTS */}
      <div className="mt-8">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-white text-[20px] font-bold tracking-tight">Popular Products</h2>
          <Link href="/shop">
            <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>See All</span>
          </Link>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {!productsLoaded
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0" style={{ width: 190 }}>
                <div className="rounded-2xl" style={{ height: 190, background: '#1a1a1a' }} />
                <div className="mt-2 space-y-1.5">
                  <div className="h-3 rounded" style={{ background: '#1a1a1a', width: '100%' }} />
                  <div className="h-3 rounded" style={{ background: '#1a1a1a', width: 64 }} />
                </div>
              </div>
            ))
            : featuredProducts.map((product) => {
              const p = product.node;
              const price = p.priceRange?.minVariantPrice?.amount;
              const img = p.images?.edges?.[0]?.node?.url;
              const inStock = p.variants?.edges?.[0]?.node?.availableForSale ?? true;
              return (
                <Link key={p.id} href={`/product/${p.handle}`}>
                  <div className="flex-shrink-0" style={{ width: 190 }}>
                    {/* Dark bg product card — transparent/blend style */}
                    <div
                      className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                      style={{ height: 190, background: '#111' }}>
                      {img
                        ? <img
                            src={img}
                            alt={p.title}
                            className="w-full h-full object-contain p-4"
                            style={{ mixBlendMode: 'luminosity' }}
                          />
                        : <div className="w-full h-full" style={{ background: '#1a1a1a' }} />
                      }
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        disabled={!inStock}
                        className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '0.5px solid rgba(255,255,255,0.2)' }}>
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="pt-2.5 pb-1">
                      <p className="text-white text-[13px] font-medium leading-snug" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.title}</p>
                      {price && (
                        <p className="text-[13px] font-normal mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>${parseFloat(price).toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

      {/* CATEGORY SECTIONS — full-bleed with correct links */}
      {CATEGORY_SECTIONS.slice(1).map((cat) => (
        <Link key={cat.label} href={cat.href}>
          <div className="relative w-full overflow-hidden mt-4" style={{ height: 300 }}>
            <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0.88) 100%)' }} />
            <div className="absolute bottom-0 left-0 px-5 pb-5">
              <h2 className="text-white text-[22px] font-bold tracking-tight leading-tight">{cat.label}</h2>
              <p className="text-[13px] mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{cat.sub}</p>
              <div className="mt-3">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-[12px] font-semibold"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.25)' }}>
                  Shop {cat.label} →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* QUICK ACCESS */}
      <div className="px-4 mt-8 mb-6">
        <h2 className="text-white text-[20px] font-bold tracking-tight mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Scan Your Filter', sub: 'AI-powered ID', href: '/filter-scanner', emoji: '🔍' },
            { label: 'Memberships', sub: 'Save on every order', href: '/memberships', emoji: '⭐' },
            { label: 'Contact Us', sub: 'Expert support', href: '/contact', emoji: '📞' },
            { label: 'All Products', sub: 'Browse catalog', href: '/shop', emoji: '📦' },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <div
                className="rounded-2xl p-4 transition-all active:scale-95"
                style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.07)' }}>
                <div className="text-2xl mb-2">{action.emoji}</div>
                <p className="text-white text-[13px] font-semibold leading-tight">{action.label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>{action.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
