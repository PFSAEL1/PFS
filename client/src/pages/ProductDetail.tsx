/**
 * ProductDetail — Tesla-inspired product page
 * Dark background, full-width product image, clean typography
 * Variant selector, quantity, add to cart
 */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { fetchProductByHandle, fetchRelatedProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { createProductSchema, createBreadcrumbSchema } from '@/lib/structuredData';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';

const FALLBACK_IMAGE = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/rd-filter.png?v=1761696515';

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ReturnType<typeof Object.create> | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    setSelectedImage(0);
    setQuantity(1);
    fetchProductByHandle(handle).then((data) => {
      setProduct(data);
      if (data?.variants?.edges?.[0]) {
        setSelectedVariantId(data.variants.edges[0].node.id);
      }
      fetchRelatedProducts(data?.id || '', 4).then(setRelatedProducts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div style={{ background: 'oklch(0.05 0 0)', minHeight: '100vh', color: 'white' }}>
        <Navigation />
        <div style={{ paddingTop: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.30)' }}>
            <div style={{ fontSize: '14px' }}>Loading product...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ background: 'oklch(0.05 0 0)', minHeight: '100vh', color: 'white' }}>
        <Navigation />
        <div style={{ paddingTop: '56px', padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Product Not Found</h1>
          <Link href="/shop">
            <button style={{
              background: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '16px',
            }}>
              Browse All Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants?.edges?.find(
    (e: { node: { id: string } }) => e.node.id === selectedVariantId
  )?.node || product.variants?.edges?.[0]?.node;

  const images = product.images?.edges || [];
  const price = selectedVariant?.price?.amount ? parseFloat(selectedVariant.price.amount).toFixed(2) : '—';
  const currency = selectedVariant?.price?.currencyCode || 'USD';
  const inStock = selectedVariant?.availableForSale ?? true;
  const mainImage = images[selectedImage]?.node?.url || FALLBACK_IMAGE;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://abcfilters.net' },
    { name: 'Shop', url: 'https://abcfilters.net/shop' },
    { name: product.title, url: `https://abcfilters.net/product/${handle}` },
  ]);

  const productSchema = createProductSchema({
    name: product.title,
    description: product.description,
    image: mainImage,
    price,
    currency,
    url: `https://abcfilters.net/product/${handle}`,
    availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  });

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      image: mainImage,
      handle: handle || '',
    });
    toast.success('Added to cart');
    setCartOpen(true);
  };

  return (
    <div style={{ background: 'oklch(0.05 0 0)', minHeight: '100vh', color: 'white' }}>
      <SEO
        title={`${product.title} — ABC Filters`}
        description={product.description || `Buy ${product.title} from ABC Filters. Premium paint booth filtration with fast nationwide shipping.`}
        canonical={`https://abcfilters.net/product/${handle}`}
        ogImage={mainImage}
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, productSchema] }}
      />
      <Navigation />

      <div style={{ paddingTop: '56px' }}>
        {/* Main product image — full width, light bg like Tesla */}
        <div style={{
          width: '100%',
          aspectRatio: '1/1',
          background: '#f0f0f0',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={mainImage}
            alt={product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '24px',
              display: 'block',
            }}
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div style={{
            display: 'flex',
            gap: '2px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            background: '#e8e8e8',
          }}>
            {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  flexShrink: 0,
                  width: '72px',
                  height: '72px',
                  background: selectedImage === i ? '#d0d0d0' : '#e8e8e8',
                  border: selectedImage === i ? '2px solid #333' : '2px solid transparent',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  padding: '4px',
                }}
              >
                <img
                  src={img.node.url}
                  alt={img.node.altText || product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Product info */}
        <div style={{ padding: '24px 20px' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            margin: '0 0 12px',
            color: 'white',
          }}>
            {product.title}
          </h1>

          {/* Price + stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>
              ${price}
            </span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>{currency}</span>
            {inStock ? (
              <span style={{
                background: 'rgba(52,199,89,0.15)',
                color: '#34c759',
                fontSize: '12px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '4px',
              }}>
                In Stock
              </span>
            ) : (
              <span style={{
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.45)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '4px',
              }}>
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.60)',
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}>
              {product.description}
            </p>
          )}

          {/* Variant selector */}
          {product.variants?.edges?.length > 1 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)', marginBottom: '10px', fontWeight: 500 }}>
                Options
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.variants.edges.map((edge: { node: { id: string; title: string; availableForSale: boolean } }) => (
                  <button
                    key={edge.node.id}
                    onClick={() => setSelectedVariantId(edge.node.id)}
                    disabled={!edge.node.availableForSale}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: edge.node.availableForSale ? 'pointer' : 'not-allowed',
                      opacity: edge.node.availableForSale ? 1 : 0.4,
                      background: selectedVariantId === edge.node.id ? 'white' : 'oklch(0.14 0 0)',
                      color: selectedVariantId === edge.node.id ? 'black' : 'rgba(255,255,255,0.80)',
                      border: selectedVariantId === edge.node.id ? 'none' : '1px solid oklch(0.22 0 0)',
                    }}
                  >
                    {edge.node.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)', marginBottom: '10px', fontWeight: 500 }}>
              Quantity
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'oklch(0.14 0 0)',
                  border: '1px solid oklch(0.22 0 0)',
                  borderRight: 'none',
                  borderRadius: '6px 0 0 6px',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Minus size={14} />
              </button>
              <div style={{
                width: '60px',
                height: '44px',
                background: 'oklch(0.12 0 0)',
                border: '1px solid oklch(0.22 0 0)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'oklch(0.14 0 0)',
                  border: '1px solid oklch(0.22 0 0)',
                  borderLeft: 'none',
                  borderRadius: '0 6px 6px 0',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            style={{
              width: '100%',
              padding: '16px',
              background: inStock ? 'white' : 'oklch(0.20 0 0)',
              color: inStock ? 'black' : 'rgba(255,255,255,0.30)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              letterSpacing: '-0.01em',
              marginBottom: '12px',
            }}
          >
            <ShoppingCart size={18} />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Trust badges */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginTop: '20px',
          }}>
            {[
              { icon: <Truck size={16} />, label: '1–2 Day Ship' },
              { icon: <Shield size={16} />, label: 'Quality Assured' },
              { icon: <RotateCcw size={16} />, label: 'Easy Returns' },
            ].map((badge, i) => (
              <div key={i} style={{
                background: 'oklch(0.10 0 0)',
                border: '1px solid oklch(0.16 0 0)',
                borderRadius: '8px',
                padding: '10px 8px',
                textAlign: 'center',
              }}>
                <div style={{ color: 'rgba(255,255,255,0.60)', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>
                  {badge.icon}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.3 }}>
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'oklch(0.14 0 0)', margin: '0 20px' }} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ padding: '24px 0 32px' }}>
            <div style={{ padding: '0 20px 16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                Related Products
              </h2>
            </div>
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              gap: '12px',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}>
              {relatedProducts.map((rp) => {
                const rpVariant = rp.node.variants.edges[0]?.node;
                const rpImage = rp.node.images.edges[0]?.node.url;
                const rpPrice = rpVariant?.price?.amount ? parseFloat(rpVariant.price.amount).toFixed(2) : '—';

                return (
                  <Link
                    key={rp.node.id}
                    href={`/product/${rp.node.handle}`}
                    style={{
                      scrollSnapAlign: 'start',
                      flexShrink: 0,
                      width: 'calc(50vw - 28px)',
                      minWidth: '140px',
                      maxWidth: '200px',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{
                      background: 'oklch(0.06 0 0)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        background: '#f0f0f0',
                        overflow: 'hidden',
                      }}>
                        {rpImage ? (
                          <img
                            src={rpImage}
                            alt={rp.node.title}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#f0f0f0' }} />
                        )}
                      </div>
                      <div style={{ padding: '10px' }}>
                        <div style={{
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.80)',
                          lineHeight: 1.3,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '4px',
                        }}>
                          {rp.node.title}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>
                          ${rpPrice}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
