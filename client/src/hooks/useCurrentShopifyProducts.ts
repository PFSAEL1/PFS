import { useEffect, useState } from 'react';
import { fetchProducts, type ShopifyProduct } from '@/lib/shopify';
import {
  cacheShopifyProducts,
  getImmediateShopifyProducts,
} from '@/lib/productCatalog';

export function useCurrentShopifyProducts(): ShopifyProduct[] {
  const [products, setProducts] = useState<ShopifyProduct[]>(() => getImmediateShopifyProducts());

  useEffect(() => {
    let active = true;
    let started = false;
    let fallbackTimer: number | undefined;
    let idleId: number | undefined;
    const immediateProducts = getImmediateShopifyProducts();
    setProducts(immediateProducts);

    const refreshProducts = () => {
      if (started) return;
      started = true;

      fetchProducts(50)
        .then((liveProducts) => {
          if (!active || liveProducts.length === 0) return;
          cacheShopifyProducts(liveProducts);
          setProducts(liveProducts);
        })
        .catch(() => {
          // Keep the immediate bundled or cached catalog; product pages remain the
          // source of truth for the selected variant and checkout availability.
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
  }, []);

  return products;
}
