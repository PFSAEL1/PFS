import productSnapshot from '@/data/shopifyProductSnapshot.json';
import type { ShopifyProduct } from '@/lib/shopify';
import { removePublicEmail, sanitizeProductContact } from '@/lib/publicContactText';

const PRODUCT_CACHE_KEY = 'pfs-shopify-products-v1';
const PRODUCT_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const CONSUMABLE_HANDLES_RENDERED_SEPARATELY = new Set([
  'pfs-paint-booth-absorbent-mat-roll-32x50',
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

const PREFILTER_TERMS = ['pre-filter', 'prefilter', 'pre filter', 'first stage', 'pleated', 'merv 10', 'merv-10'];

const SHOP_CATEGORY_TERMS: Record<string, string[]> = {
  exhaust: ['exhaust', 'fiberglass', 'andreae', 'paint pocket'],
  intake: ['intake', 'tacky'],
  ceiling: ['ceiling', 'diffusion'],
  'pre-filters': PREFILTER_TERMS,
  prefilters: PREFILTER_TERMS,
  prefilter: PREFILTER_TERMS,
  'pre-filter': PREFILTER_TERMS,
};

function catalogText(product: ShopifyProduct): string {
  const node = product.node;
  return [
    node.title,
    node.productType,
    node.description,
    ...(node.tags || []),
    ...node.variants.edges.map((edge) => `${edge.node.title} ${edge.node.sku || ''}`),
  ].join(' ').toLowerCase();
}

function compactSize(value: string): string {
  return value.toLowerCase().replace(/[″”"'′]/g, '').replace(/×/g, 'x').replace(/\s+/g, '');
}

function sizeMatches(haystack: string, size: string): boolean {
  const escaped = size.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`${escaped}(?!\\d)`).test(haystack);
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
    const terms = SHOP_CATEGORY_TERMS[category] || [category];
    filtered = filtered.filter((product) => {
      const haystack = catalogText(product);
      return terms.some((term) => haystack.includes(term));
    });
  }

  if (sizeFilter) {
    const size = compactSize(sizeFilter);
    filtered = filtered.filter((product) => {
      const title = compactSize(product.node.title);
      const variants = product.node.variants.edges.map((variant) => compactSize(variant.node.title));
      return sizeMatches(title, size) || variants.some((variant) => sizeMatches(variant, size));
    });
  }

  return filtered;
}

export function listShopSizes(products: ShopifyProduct[]): string[] {
  const sizes = new Set<string>();
  for (const product of products) {
    const titles = [product.node.title, ...product.node.variants.edges.map((edge) => edge.node.title)];
    for (const title of titles) {
      const compact = compactSize(title);
      for (const match of compact.matchAll(/(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)/g)) {
        const width = Number(match[1]);
        const height = Number(match[2]);
        if (width < 10 || width > 96 || height < 10 || height > 150) continue;
        if ((height === 100 || height === 300) && width <= 45) continue;
        sizes.add(`${match[1]}x${match[2]}`);
      }
    }
  }
  return [...sizes].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
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
