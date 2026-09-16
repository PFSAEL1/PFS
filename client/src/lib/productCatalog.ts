import productSnapshot from '@/data/shopifyProductSnapshot.json';
import type { ShopifyProduct } from '@/lib/shopify';
import { removePublicEmail, sanitizeProductContact } from '@/lib/publicContactText';

const PRODUCT_CACHE_KEY = 'pfs-shopify-products-v1';
const PRODUCT_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const CONSUMABLE_HANDLES_RENDERED_SEPARATELY = new Set([
  'pfs-vitra',
  'pfs-vanguard-complete-booth-protection-kit',
]);

interface ProductCache {
  savedAt: number;
  products: ShopifyProduct[];
}

export const bundledShopifyProducts = (productSnapshot as unknown as ShopifyProduct[])
  .map(sanitizeProductContact);

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[×✕]/g, 'x')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function searchableForms(value: string): [string, string] {
  const normalized = normalizeSearchText(value);
  return [normalized, normalized.replace(/\s+/g, '')];
}

function fieldIncludes(field: string, term: string): boolean {
  const [normalizedField, compactField] = searchableForms(field);
  const [normalizedTerm, compactTerm] = searchableForms(term);
  if (/^\d+$/.test(normalizedTerm)) {
    return normalizedField.split(' ').includes(normalizedTerm);
  }
  return normalizedField.includes(normalizedTerm) || compactField.includes(compactTerm);
}

/**
 * Rank catalog products against shopper language, including compact dimensions
 * such as "20x20", variant names, SKUs, tags, and product descriptions.
 */
export function searchShopifyProducts(
  products: ShopifyProduct[],
  query: string,
  limit = 8,
): ShopifyProduct[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return products
    .filter((product) => !product.node.title.toLowerCase().includes('membership'))
    .map((product) => {
      const node = product.node;
      const variants = node.variants.edges.map((edge) => edge.node);
      const title = node.title || '';
      const description = removePublicEmail(node.description || '');
      const productType = node.productType || '';
      const vendor = node.vendor || '';
      const tags = node.tags || [];
      const variantFields = variants.flatMap((variant) => [
        variant.title || '',
        variant.sku || '',
        ...(variant.selectedOptions || []).flatMap((option) => [option.name, option.value]),
      ]);
      const fields = [title, description, productType, vendor, node.handle, ...tags, ...variantFields];

      if (!terms.every((term) => fields.some((field) => fieldIncludes(field, term)))) {
        return { product, score: -1 };
      }

      let score = 0;
      if (fieldIncludes(title, normalizedQuery)) score += 120;
      if (normalizeSearchText(title).startsWith(normalizedQuery)) score += 40;
      if (fieldIncludes(node.handle, normalizedQuery)) score += 45;
      if (fieldIncludes(productType, normalizedQuery)) score += 55;
      if (tags.some((tag) => fieldIncludes(tag, normalizedQuery))) score += 50;
      if (variantFields.some((field) => fieldIncludes(field, normalizedQuery))) score += 65;
      if (fieldIncludes(description, normalizedQuery)) score += 20;

      for (const term of terms) {
        if (fieldIncludes(title, term)) score += 24;
        if (tags.some((tag) => fieldIncludes(tag, term))) score += 14;
        if (variantFields.some((field) => fieldIncludes(field, term))) score += 16;
        if (fieldIncludes(productType, term) || fieldIncludes(vendor, term)) score += 10;
        if (fieldIncludes(description, term)) score += 3;
      }

      return { product, score };
    })
    .filter((result) => result.score >= 0)
    .sort((a, b) => b.score - a.score || a.product.node.title.localeCompare(b.product.node.title))
    .slice(0, Math.max(0, limit))
    .map((result) => result.product);
}

export function getBundledProductByHandle(handle?: string) {
  if (!handle) return null;
  return bundledShopifyProducts.find((p) => p.node.handle === handle)?.node ?? null;
}

export function filterShopifyProducts(
  products: ShopifyProduct[],
  categoryFilter?: string | null,
  sizeFilter?: string | null,
): ShopifyProduct[] {
  let filtered = products.filter((product) => (
    !product.node.title.toLowerCase().includes('membership') &&
    !CONSUMABLE_HANDLES_RENDERED_SEPARATELY.has(product.node.handle)
  ));

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

    return cacheIsFresh ? parsed.products.map(sanitizeProductContact) : bundledShopifyProducts;
  } catch {
    return bundledShopifyProducts;
  }
}

export function cacheShopifyProducts(products: ShopifyProduct[]): void {
  if (typeof window === 'undefined' || products.length === 0) return;

  try {
    const cache: ProductCache = { savedAt: Date.now(), products: products.map(sanitizeProductContact) };
    window.localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // The bundled snapshot still guarantees an immediate catalog when storage is unavailable.
  }
}
