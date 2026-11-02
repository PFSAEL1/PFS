import shopifyCollections from '@/data/shopifyCollections.json' with { type: 'json' };
import type { ShopifyProduct } from '@/lib/shopify';
import { bundledShopifyProducts } from '@/lib/productCatalog';

export const AEROSPACE_NESHAP_CATEGORY = 'aerospace-neshap-filters';
export const AEROSPACE_NESHAP_PARENT_HANDLE = 'aerospace-neshap-319-5-pocket-bag-filter-merv-14-15';

type CollectionRecord = {
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  handles?: string[];
};

const collections = shopifyCollections as Record<string, CollectionRecord>;

export function aerospaceNeshapProducts(): ShopifyProduct[] {
  const handles = collections[AEROSPACE_NESHAP_CATEGORY]?.handles || [];
  const byHandle = new Map(bundledShopifyProducts.map((product) => [product.node.handle, product]));
  return handles
    .map((handle) => byHandle.get(handle))
    .filter((product): product is ShopifyProduct => Boolean(product));
}
