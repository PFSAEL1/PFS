/**
 * Shop — Tesla-inspired product catalog
 * Dark background, search bar, category pills, product grid
 * Real Shopify products with add-to-cart
 */
import { useEffect, useState, useMemo } from 'react';
import { Link, useSearch } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Fiberglass', value: 'fiberglass' },
  { label: 'Tacky Panels', value: 'tacky' },
  { label: 'Intake / MERV', value: 'intake' },
  { label: 'Rolls', value: 'roll' },
  { label: 'Accessories', value: 'grid' },
];

function matchCategory(title: string, cat: string): boolean {
  if (!cat) return true;
  const t = title.toLowerCase();
  if (cat === 'fiberglass') return t.includes('fiberglass') && !t.includes('roll');
  if (cat === 'tacky') return t.includes('tacky');
  if (cat === 'intake') return t.includes('merv') || t.includes('pleated') || t.includes('intake');
  if (cat === 'roll') return t.includes('roll');
  if (cat === 'grid') return t.includes('grid') || t.includes('pocket') || t.includes('accessor');
  return true;
}

export default function Shop() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  // Parse URL params
  const searchString = useSearch();
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const cat = params.get('category') || '';
    const q = params.get('q') || '';
    setActiveCategory(cat);
    setSearchQuery(q);
  }, [searchString]);

  useEffect(() => {
    fetchProducts(50).then((data) => {
      setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = matchCategory(p.node.title, activeCategory);
      const matchesSearch = !searchQuery || p.node.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
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
    toast.success('Added to cart');
    setCartOpen(true);
  };

  return (
    <div style={{ background: 'oklch(0.05 0 0)', minHeight: '100vh', color: 'white' }}>
      <SEO
        title="Shop Paint Booth Filters — ABC Filters"
        description="Browse 50+ spray booth filters. Fiberglass arrestors, tacky panels, MERV intake filters. Same-day shipping. Custom sizes available."
        canonical="https://abcfilters.net/shop"
      />
      <Navigation />

      {/* Page header */}
      <div style={{ paddingTop: '56px' }}>
        <div style={{ padding: '24px 20px 0' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Shop
          </h1>

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.40)',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search filters, sizes, types..."
              style={{
                width: '100%',
                background: 'oklch(0.12 0 0)',
                border: '1px solid oklch(0.20 0 0)',
                borderRadius: '10px',
                color: 'white',
                padding: '11px 36px 11px 36px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.40)',
                  cursor: 'pointer',
                  display: 'flex',
                  padding: '4px',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: '4px',
            marginBottom: '4px',
          }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  flexShrink: 0,
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: activeCategory === cat.value ? 'white' : 'oklch(0.12 0 0)',
                  color: activeCategory === cat.value ? 'black' : 'rgba(255,255,255,0.70)',
                  border: activeCategory === cat.value ? 'none' : '1px solid oklch(0.20 0 0)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div style={{ padding: '12px 20px 8px', fontSize: '13px', color: 'rgba(255,255,255,0.40)' }}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.30)' }}>
            <div style={{ fontSize: '14px' }}>Loading products...</div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>No products found</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
              Try a different search or category
            </div>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory(''); }}
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
              Clear Filters
            </button>
          </div>
        )}

        {/* Product grid — 2 columns like Tesla */}
        {!loading && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2px',
            marginTop: '8px',
          }}>
            {filtered.map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node.url;
              const price = variant?.price?.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
              const inStock = variant?.availableForSale ?? true;

              return (
                <div key={product.node.id} style={{ background: 'oklch(0.06 0 0)', position: 'relative' }}>
                  <Link href={`/product/${product.node.handle}`} style={{ textDecoration: 'none', display: 'block' }}>
                    {/* Product image — light bg like Tesla */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      background: '#f0f0f0',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      {image ? (
                        <img
                          src={image}
                          alt={product.node.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: '16px',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'rgba(255,255,255,0.20)',
                          fontSize: '12px',
                        }}>
                          No Image
                        </div>
                      )}

                      {/* Out of stock badge */}
                      {!inStock && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'rgba(255,255,255,0.60)',
                          fontSize: '10px',
                          padding: '3px 7px',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}>
                          Out of Stock
                        </div>
                      )}

                      {/* Add to cart button */}
                      {inStock && (
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(0,0,0,0.20)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '20px',
                            lineHeight: 1,
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* Product info */}
                    <div style={{ padding: '12px 14px 16px' }}>
                      <div style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.85)',
                        fontWeight: 500,
                        lineHeight: 1.35,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        marginBottom: '6px',
                      }}>
                        {product.node.title}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                        ${price}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom padding */}
        <div style={{ height: '40px' }} />
      </div>

      <Footer />
    </div>
  );
}
