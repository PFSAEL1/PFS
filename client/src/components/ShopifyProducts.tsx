import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import {
  cacheShopifyProducts,
  filterShopifyProducts,
  getImmediateShopifyProducts,
  searchShopifyProducts,
} from '@/lib/productCatalog';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { getProductBadges } from '@/lib/productSignals';
import { usePricing } from '@/hooks/usePricing';
import { consumableProducts } from '@/pages/Consumables';
import { localAvifSrcSet, shopProductCardImageSrcSet, shopProductCardImageUrl, shopifyImageAltText } from '@/lib/imageUrls';
import { LineupCard, formatFromPrice, plainText, tintFor } from '@/components/Lineup';

const FALLBACK_IMAGE = '/images/filters/fiberglass-arrestors.png';

interface ShopifyProductsProps {
  categoryFilter?: string | null;
  sizeFilter?: string | null;
  textQuery?: string | null;
}

export const ShopifyProducts = ({ categoryFilter, sizeFilter, textQuery }: ShopifyProductsProps = {}) => {
  const [products, setProducts] = useState<ShopifyProduct[]>(() =>
    filterShopifyProducts(getImmediateShopifyProducts(), categoryFilter, sizeFilter),
  );
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const { discountPercent, tier } = usePricing();

  useEffect(() => {
    let active = true;
    let started = false;
    let fallbackTimer: number | undefined;
    let idleId: number | undefined;
    const immediateProducts = getImmediateShopifyProducts();
    setProducts(filterShopifyProducts(immediateProducts, categoryFilter, sizeFilter));
    setError(null);

    const refreshProducts = () => {
      if (started) return;
      started = true;

      fetchProducts(50)
        .then((data) => {
          if (!active) return;
          cacheShopifyProducts(data);
          setProducts(filterShopifyProducts(data, categoryFilter, sizeFilter));
        })
        .catch(() => {
          if (active && immediateProducts.length === 0) {
            setError('Failed to load products. Please try again.');
          }
        });
    };

    const scheduleIdleRefresh = () => {
      fallbackTimer = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(refreshProducts, { timeout: 6000 });
        } else {
          refreshProducts();
        }
      }, 6000);
    };

    const interactionEvents = ['scroll', 'click', 'touchstart', 'pointerdown', 'keydown'];
    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, refreshProducts, { once: true, passive: true, capture: true });
    });

    if (document.readyState === 'complete') {
      scheduleIdleRefresh();
    } else {
      window.addEventListener('load', scheduleIdleRefresh, { once: true });
    }

    return () => {
      active = false;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      window.removeEventListener('load', scheduleIdleRefresh);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, refreshProducts, { capture: true });
      });
    };
  }, [categoryFilter, sizeFilter]);

  const visibleProducts = textQuery?.trim()
    ? searchShopifyProducts(products, textQuery, 48)
    : products;

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
    toast.success(`${product.node.title} added to cart`);
    setCartOpen(true);
  };

  if (error) {
    return (
      <div className="text-center py-12 text-white/70">
        <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>{error}</p>
      </div>
    );
  }

  if (visibleProducts.length === 0) {
    return (
      <div className="text-center py-12 text-white/70">
        <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p>No products found{textQuery ? ` for "${textQuery}"` : ''}{categoryFilter ? ` for "${categoryFilter}"` : ''}{sizeFilter ? ` in size "${sizeFilter}"` : ''}.</p>
      </div>
    );
  }

  return (
    <>
      {/* Member pricing banner - large centered hero announcement */}
      {discountPercent > 0 && tier && (
        <div className="mb-10 relative overflow-hidden rounded-3xl border border-white/10">
          {/* Animated gradient background */}
          <div className="absolute inset-0" style={{
            background: tier === 'gold'
              ? 'radial-gradient(ellipse at center, rgba(234,179,8,0.18) 0%, rgba(161,98,7,0.06) 70%, transparent 100%)'
              : tier === 'platinum'
              ? 'radial-gradient(ellipse at center, rgba(148,163,184,0.18) 0%, rgba(100,116,139,0.06) 70%, transparent 100%)'
              : 'radial-gradient(ellipse at center, rgba(192,192,192,0.15) 0%, rgba(107,114,128,0.05) 70%, transparent 100%)'
          }} />
          {/* Shimmer sweep */}
          <div className="absolute inset-0 opacity-40" style={{
            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }} />
          {/* Breathing glow ring behind badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: tier === 'gold'
              ? 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)'
              : tier === 'platinum'
              ? 'radial-gradient(circle, rgba(148,163,184,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192,192,192,0.15) 0%, transparent 70%)',
            animation: 'breathe 2.5s ease-in-out infinite',
          }} />
          <div className="relative px-8 py-5 flex flex-col items-center text-center gap-2">
            {/* Tier medal badge */}
            <img src={`/images/badges/badge_${tier}.png`} alt={`${tier} Member Badge`} className="w-36 h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]" width={144} height={144} loading="lazy" decoding="async" />

            <p className="text-white/50 text-sm max-w-md">
              Your <span className="font-bold text-white/90">{discountPercent}%</span> member discount is automatically applied to all prices below
            </p>
          </div>
          {/* CSS animations */}
          <style>{`
            @keyframes shimmer {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
            }
            @keyframes breathe {
              0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
              50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
            }
          `}</style>
        </div>
      )}
      <div className="lineup-grid">
        {visibleProducts.map((product, index) => {
          const variant = product.node.variants.edges[0]?.node;
          const imageNode = product.node.images.edges[0]?.node;
          const image = imageNode?.url || FALLBACK_IMAGE;
          const cardSrc = shopProductCardImageUrl(product.node.handle, image, 640);
          const cardSrcSet = shopProductCardImageSrcSet(product.node.handle, image);
          const cardAvif = localAvifSrcSet(cardSrc, cardSrcSet);
          const amounts = product.node.variants.edges
            .map((edge) => parseFloat(edge.node.price?.amount || ''))
            .filter((amount) => amount > 0);
          const priced = formatFromPrice(amounts, discountPercent);
          const inStock = Boolean(variant) && (variant?.availableForSale ?? true);
          const badges = getProductBadges(product);
          const badge = badges.some((item) => item.tone === 'new')
            ? 'New'
            : badges.some((item) => item.tone === 'reorder')
              ? 'Popular'
              : null;
          const sizes = '(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 78vw';

          return (
            <LineupCard
              key={product.node.id}
              href={`/product/${product.node.handle}`}
              title={product.node.title}
              description={plainText(product.node.description)}
              image={cardSrc}
              imageSrcSet={cardSrcSet}
              avifSrcSet={cardAvif}
              alt={shopifyImageAltText(imageNode, product.node.title)}
              tint={tintFor(`${product.node.productType} ${product.node.title} ${(product.node.tags || []).join(' ')}`, index)}
              width={640}
              height={640}
              sizes={sizes}
              loading={index < 2 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              badge={badge}
              price={priced?.price}
              comparePrice={priced?.compare}
              buyLabel={inStock ? 'Buy' : 'Sold out'}
              buyDisabled={!inStock}
              onBuy={() => handleAddToCart(product)}
            />
          );
        })}
        {!categoryFilter && !sizeFilter && !textQuery?.trim() && consumableProducts.map((cp, index) => (
          <LineupCard
            key={cp.id}
            href={cp.href}
            title={cp.title}
            description={plainText(cp.description || cp.subtitle)}
            image={cp.image || FALLBACK_IMAGE}
            alt={cp.title}
            tint={tintFor(cp.title, index)}
            width={640}
            height={640}
            badge={cp.badge === 'New' ? 'New' : null}
            price={formatFromPrice([cp.price])?.price}
            buyLabel="Buy"
            buyHref={cp.href}
          />
        ))}
      </div>
    </>
  );
};
