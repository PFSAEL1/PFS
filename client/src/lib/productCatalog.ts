import productSnapshot from '@/data/shopifyProductSnapshot.json';
import type { ShopifyProduct } from '@/lib/shopify';

const PRODUCT_CACHE_KEY = 'pfs-shopify-products-v1';
const PRODUCT_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

interface ProductCache {
  savedAt: number;
  products: ShopifyProduct[];
}

export const bundledShopifyProducts = productSnapshot as unknown as ShopifyProduct[];

export function filterShopifyProducts(
  products: ShopifyProduct[],
  categoryFilter?: string | null,
  sizeFilter?: string | null,
): ShopifyProduct[] {
  let filtered = products.filter(
    (product) => !product.node.title.toLowerCase().includes('membership'),
  );

  if (categoryFilter) {
    const category = categoryFilter.toLowerCase();
    filtered = filtered.filter((product) => {
      const tags = (product.node.tags || []).map((tag) => tag.toLowerCase());
      const type = (product.node.productType || '').toLowerCase();
      const title = product.node.title.toLowerCase();
      return (
        tags.some((tag) => tag.includes(category)) ||
        type.includes(category) ||
        title.includes(category)
      );
    });
  }

  if (sizeFilter) {
    const size = sizeFilter.toLowerCase().replace(/\s+/g, '');
    filtered = filtered.filter((product) => {
      const title = product.node.title.toLowerCase().replace(/\s+/g, '');
      const variants = product.node.variants.edges.map((variant) =>
        variant.node.title.toLowerCase().replace(/\s+/g, ''),
      );
      return title.includes(size) || variants.some((variant) => variant.includes(size));
    });
  }

  return filtered;
}

export function getImmediateShopifyProducts(): ShopifyProduct[] {
  if (typeof window === 'undefined') return bundledShopifyProducts;

  try {
    const cached = window.localStorage.getItem(PRODUCT_CACHE_KEY);
    if (!cached) return bundledShopifyProducts;

    const parsed = JSON.parse(cached) as ProductCache;
    const cacheIsFresh =
      Array.isArray(parsed.products) &&
      parsed.products.length > 0 &&
      Date.now() - parsed.savedAt < PRODUCT_CACHE_MAX_AGE_MS;

    return cacheIsFresh ? parsed.products : bundledShopifyProducts;
  } catch {
    return bundledShopifyProducts;
  }
}

export function cacheShopifyProducts(products: ShopifyProduct[]): void {
  if (typeof window === 'undefined' || products.length === 0) return;

  try {
    const cache: ProductCache = { savedAt: Date.now(), products };
    window.localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // The bundled snapshot still guarantees an immediate catalog when storage is unavailable.
  }
}
