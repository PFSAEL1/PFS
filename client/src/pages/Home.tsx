/**
 * Home — Tesla-inspired premium dark design
 * Full-bleed hero, category sections with large images, horizontal scroll products
 * Pure black background, white text, minimal chrome
 */
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
};

// Real product images from Shopify
const HERO_BG = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/rd-filter.png?v=1761696515';
const FIBERGLASS_IMG = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/rd-filter.png?v=1761696515';
const TACKY_IMG = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/tacky-panel-green.png?v=1762177124';
const CEILING_IMG = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/fiberglass-roll-blue.png?v=1762177124';
const MERV_IMG = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/merv-10-filter.png?v=1762177124';
const GRIDS_IMG = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/filter-grids.jpg?v=1761696515';

const CATEGORIES = [
  {
    label: 'Fiberglass Exhaust Filters',
    sub: 'Superior overspray capture',
    href: '/shop?category=fiberglass',
    img: FIBERGLASS_IMG,
    bg: '#0a0a0a',
  },
  {
    label: 'Tacky Panel Filters',
    sub: 'Enhanced adhesion technology',
    href: '/shop?category=tacky',
    img: TACKY_IMG,
    bg: '#0d0d0d',
  },
  {
    label: 'Ceiling Blankets & Rolls',
    sub: 'Downdraft booth systems',
    href: '/shop?category=ceiling',
    img: CEILING_IMG,
    bg: '#0a0a0a',
  },
  {
    label: 'MERV-Rated Intake Filters',
    sub: 'Clean air, clean results',
    href: '/shop?category=intake',
    img: MERV_IMG,
    bg: '#0d0d0d',
  },
];

const TRUST_STATS = [
  { value: '1,200+', label: 'Shops Served' },
  { value: '30+', label: 'Years Experience' },
  { value: '50+', label: 'Filter Types' },
  { value: '1–2 Day', label: 'Shipping' },
];

export default function Home() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    fetchProducts(50).then((data) => {
      setProducts(data.filter((p) => !p.node.title.toLowerCase().includes('membership')));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
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
        title="ABC Filters — Premium Paint Booth Filtration"
        description="Premium spray booth filters. Fiberglass arrestors, tacky panels, intake/exhaust filters. Fast shipping, custom sizes. Trusted by 1,200+ shops nationwide."
        canonical="https://abcfilters.net/"
        structuredData={combinedSchema}
      />
      <Navigation />

      {/* HERO — Full bleed, dark, product-forward */}
      <section style={{
        paddingTop: '56px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'oklch(0.05 0 0)',
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '9/11',
          position: 'relative',
          maxHeight: '85vh',
          overflow: 'hidden',
        }}>
          <img
            src="https://cdn.shopify.com/s/files/1/0972/9815/3604/files/rd-filter.png?v=1761696515"
            alt="ABC Filters — Premium Paint Booth Filtration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              background: 'oklch(0.08 0 0)',
              display: 'block',
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.95) 100%)',
          }} />
          {/* Hero text */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 20px 32px',
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 8px',
              color: 'white',
            }}>
              Filter Your Booth.<br />Protect Your Work.
            </h1>
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.65)',
              margin: '0 0 20px',
              lineHeight: 1.4,
            }}>
              Premium spray booth filtration trusted by 1,200+ shops nationwide.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/shop">
                <button style={{
                  background: 'white',
                  color: 'black',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '13px 24px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}>
                  Shop Now
                </button>
              </Link>
              <Link href="/contact">
                <button style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '6px',
                  padding: '13px 24px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}>
                  Get a Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section style={{
        background: 'oklch(0.08 0 0)',
        borderTop: '1px solid oklch(0.14 0 0)',
        borderBottom: '1px solid oklch(0.14 0 0)',
        padding: '20px 0',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          textAlign: 'center',
        }}>
          {TRUST_STATS.map((stat, i) => (
            <div key={i} style={{
              padding: '12px 8px',
              borderRight: i < 3 ? '1px solid oklch(0.14 0 0)' : 'none',
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'white' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.50)', marginTop: '2px', lineHeight: 1.3 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY — Tesla-style full-width sections */}
      <section style={{ padding: '0' }}>
        <div style={{ padding: '32px 20px 16px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
            Shop by Category
          </h2>
        </div>

        {CATEGORIES.map((cat, i) => (
          <Link key={i} href={cat.href} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              overflow: 'hidden',
              background: cat.bg,
              marginBottom: '2px',
            }}>
              <img
                src={cat.img}
                alt={cat.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '20px',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
              }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.60)', marginTop: '3px' }}>
                  {cat.sub}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* FEATURED PRODUCTS — Horizontal scroll like Tesla */}
      <section style={{ padding: '32px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 16px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
            Featured Products
          </h2>
          <Link href="/shop" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', textDecoration: 'none' }}>
            See All
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.40)' }}>
            Loading products...
          </div>
        ) : (
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            gap: '2px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}>
            {products.slice(0, 8).map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node.url;
              const price = variant?.price?.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
              const inStock = variant?.availableForSale ?? true;

              return (
                <div
                  key={product.node.id}
                  style={{
                    scrollSnapAlign: 'start',
                    flexShrink: 0,
                    width: 'calc(50vw - 24px)',
                    minWidth: '160px',
                    maxWidth: '220px',
                    marginRight: '12px',
                  }}
                >
                  <Link href={`/product/${product.node.handle}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'oklch(0.06 0 0)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
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
                              padding: '12px',
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
                        {/* Add button */}
                        {inStock && (
                          <button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                            style={{
                              position: 'absolute',
                              bottom: '8px',
                              right: '8px',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'rgba(0,0,0,0.55)',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(0,0,0,0.20)',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '18px',
                              lineHeight: 1,
                            }}
                          >
                            +
                          </button>
                        )}
                      </div>
                      {/* Product info */}
                      <div style={{ padding: '10px 10px 12px' }}>
                        <div style={{
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.85)',
                          fontWeight: 500,
                          lineHeight: 1.3,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '4px',
                        }}>
                          {product.node.title}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>
                          ${price}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* MEMBERSHIPS BANNER */}
      <section style={{ padding: '32px 20px' }}>
        <Link href="/memberships" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, oklch(0.15 0 0) 0%, oklch(0.12 0 0) 100%)',
            border: '1px solid oklch(0.22 0 0)',
            borderRadius: '12px',
            padding: '28px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Auto-Reorder Program
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px', color: 'white' }}>
              Never Run Out of Filters
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', margin: '0 0 20px', lineHeight: 1.5 }}>
              Join 1,200+ shops on our membership program. Auto-reorder on your schedule, save up to 20%.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: 'black',
              borderRadius: '6px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              View Memberships
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* ALL PRODUCTS GRID */}
      <section style={{ padding: '0 0 32px' }}>
        <div style={{ padding: '0 20px 16px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
            All Products
          </h2>
        </div>
        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2px',
          }}>
            {products.map((product) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node.url;
              const price = variant?.price?.amount ? parseFloat(variant.price.amount).toFixed(2) : '—';
              const inStock = variant?.availableForSale ?? true;

              return (
                <div key={product.node.id} style={{ background: 'oklch(0.08 0 0)', position: 'relative' }}>
                  <Link href={`/product/${product.node.handle}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      background: 'oklch(0.10 0 0)',
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
                      {/* Add button */}
                      {inStock && (
                        <button
                          onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.20)',
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
                    <div style={{ padding: '12px 14px 14px' }}>
                      <div style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.85)',
                        fontWeight: 500,
                        lineHeight: 1.3,
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
      </section>

      {/* WHY ABC FILTERS */}
      <section style={{
        background: 'oklch(0.08 0 0)',
        borderTop: '1px solid oklch(0.14 0 0)',
        padding: '40px 20px',
      }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
          Why ABC Filters
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { icon: '🏭', title: '30+ Years of Expertise', desc: 'A division of PFS Spray Booths — the industry leader in paint booth filtration.' },
            { icon: '🚚', title: 'Ships in 1–2 Business Days', desc: 'Fast nationwide shipping. Most orders leave our warehouse same day.' },
            { icon: '📐', title: 'Custom Sizes Available', desc: 'Need a non-standard size? We cut filters to your exact booth specifications.' },
            { icon: '🔄', title: 'Auto-Reorder Program', desc: 'Set it and forget it. Never run out of filters with our membership program.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
