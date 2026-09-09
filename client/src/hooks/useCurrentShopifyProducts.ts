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
    const immediateProducts = getImmediateShopifyProducts();
    setProducts(immediateProducts);

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

    return () => {
      active = false;
    };
  }, []);

  return products;
}
