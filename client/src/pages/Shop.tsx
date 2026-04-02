// ABC Filters iOS — Shop Screen v6
// Design: Tesla Shop — pure black, white product image cards, minimal header, filter pills
import { useState, useEffect, useRef } from 'react';
import { Link, useSearch } from 'wouter';
import { SEO } from '@/components/SEO';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Search, Plus, X, ShoppingCart, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

const FILTER_PILLS = ['All', 'Fiberglass', 'Tacky Panel', 'Ceiling', 'Intake', 'Exhaust', 'MERV', 'Roll'];

export default function Shop() {
  const searchString = useSearch();
  const urlFilter = new URLSearchParams(searchString).get('filter') || 'All';
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filtered, setFiltered] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(urlFilter);

  // Sync filter pill with URL param when navigating from category links
  useEffect(() => {
    const pill = FILTER_PILLS.find(p => p !== 'All' && urlFilter.toLowerCase().includes(p.toLowerCase()));
    setActiveFilter(pill || (urlFilter !== 'All' ? urlFilter : 'All'));
  }, [urlFilter]);
  const searchRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    fetchProducts(60)
      .then((data) => {
        const result = data.filter((p) => !p.node.title.toLowerCase().includes('membership'));
        setProducts(result);
        setFiltered(result);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load products. Please try again.'); setLoading(false); });
  }, []);

  useEffect(() => {
    let result = products;
    if (activeFilter !== 'All') {
      result = result.filter((p) =>
        p.node.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.node.productType?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.node.tags?.some((t: string) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.node.title.toLowerCase().includes(q) ||
        p.node.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, activeFilter, products]);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
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
  };

  return (
    <div className="min-h-screen safe-bottom" style={{ background: '#000' }}>
      <SEO title="Shop All Filters — ABC Filters" description="Browse spray booth filters." canonical="https://abcfilters.net/shop" />

      {/* HEADER — Tesla style: back left, title center, cart right */}
      <div className="px-4 pt-4 pb-3" style={{ background: '#000' }}>
        <div className="flex items-center justify-between mb-3">
          <Link href="/">
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <span className="text-white text-[17px] font-semibold tracking-tight">Shop</span>
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <ShoppingCart className="w-[18px] h-[18px] text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1" style={{ background: '#0066cc' }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(255,255,255,0.35)' }} />
          <input
            ref={searchRef}
            type="search"
            placeholder="Search filters, sizes, types..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl text-[14px] text-white outline-none"
            style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.10)', caretColor: '#fff' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium"
              style={activeFilter === pill
                ? { background: '#fff', color: '#000' }
                : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', border: '0.5px solid rgba(255,255,255,0.12)' }
              }>
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="px-4 pb-8">
        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="rounded-2xl" style={{ height: 190, background: '#1a1a1a' }} />
                <div className="mt-2 space-y-1.5">
                  <div className="h-3 rounded" style={{ background: '#1a1a1a', width: '80%' }} />
                  <div className="h-3 rounded" style={{ background: '#1a1a1a', width: 60 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.45)' }}>No products found</p>
            <button onClick={() => { setSearch(''); setActiveFilter('All'); }} className="mt-4 px-5 py-2 rounded-full text-[13px] font-medium text-white" style={{ background: 'rgba(255,255,255,0.10)' }}>
              Clear filters
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <p className="text-[12px] font-medium mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((product) => {
                const p = product.node;
                const price = p.priceRange?.minVariantPrice?.amount;
                const img = p.images?.edges?.[0]?.node?.url;
                const inStock = p.variants?.edges?.[0]?.node?.availableForSale ?? true;
                return (
                  <Link key={p.id} href={`/product/${p.handle}`}>
                    <div>
                      {/* Dark bg product image — transparent/blend style */}
                      <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{ height: 190, background: '#111' }}>
                        {img
                          ? <img src={img} alt={p.title} className="w-full h-full object-contain p-3" style={{ mixBlendMode: 'luminosity' }} />
                          : <div className="w-full h-full" style={{ background: '#1a1a1a' }} />
                        }
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!inStock}
                          className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-transform active:scale-90"
                          style={{ background: 'rgba(255,255,255,0.15)', border: '0.5px solid rgba(255,255,255,0.2)' }}>
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                        {!inStock && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.7)' }}>
                            Out of stock
                          </div>
                        )}
                      </div>
                      {/* Name + price on black */}
                      <div className="pt-2 pb-1">
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
          </>
        )}
      </div>
    </div>
  );
}
