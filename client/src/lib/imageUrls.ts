const SHOPIFY_IMAGE_HOST = 'cdn.shopify.com';

export const DEFAULT_PRODUCT_IMAGE = '/images/filters/fiberglass-arrestors.png';

const SHOP_PRODUCT_THUMBNAILS: Record<string, { src: string; width: number }> = {
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs': { src: '/images/shop-thumbnails/22-gram-fiberglass-pads.webp', width: 480 },
  '20x20-paint-arrestor-holding-grids-w-tips-each': { src: '/images/shop-thumbnails/holding-grid.webp', width: 480 },
  '20x20-paint-pockets-paint-arrestor-30-cs': { src: '/images/shop-thumbnails/paint-pockets.webp', width: 480 },
  '20x100x2-22-gram-fiberglass-exhaust-roll-1-cs': { src: '/images/shop-thumbnails/22-gram-fiberglass-roll.webp', width: 480 },
  'pleated-air-filters-merv-10': { src: '/images/shop-thumbnails/merv-10-pleated-filter.jpg', width: 320 },
  '36x100-15-gram-fiberglass-paint-arrestor-roll-1-cs': { src: '/images/shop-thumbnails/15-gram-fiberglass-roll.webp', width: 480 },
  'bronze-membership': { src: '/images/products/membership-bronze-720.png', width: 720 },
  'silver-membership': { src: '/images/products/membership-silver-720.png', width: 720 },
  'gold-membership': { src: '/images/products/membership-gold-720.png', width: 720 },
  'platinum-membership': { src: '/images/products/membership-platinum-720.png', width: 720 },
  'koch-biomax-hepa-9999-23-375x23-375x11-5': { src: '/images/products/koch/koch-biomax-hepa-9999-galvanized.png', width: 400 },
  'koch-spraystop-stk10-61x90-roll': { src: '/images/products/koch/koch-spraystop-stk10-roll.png', width: 400 },
};

// Lightweight, snapshot-free lookup — safe to import anywhere (including
// App.tsx's always-eager bundle) since this map carries no product data,
// just a handful of handle -> local-asset entries.
export function getLocalProductThumbnail(handle: string): { src: string; width: number } | undefined {
  return SHOP_PRODUCT_THUMBNAILS[handle];
}

export function getProductFallbackImage(handle: string): string {
  return SHOP_PRODUCT_THUMBNAILS[handle]?.src || DEFAULT_PRODUCT_IMAGE;
}

export function sizedShopifyImageUrl(src: string, width: number): string {
  if (!src || width <= 0) return src;

  try {
    const url = new URL(src);
    if (!url.hostname.includes(SHOPIFY_IMAGE_HOST)) return src;

    url.searchParams.set('width', String(width));
    return url.toString();
  } catch {
    return src;
  }
}

export function shopProductCardImageUrl(handle: string, fallbackSrc: string, width = 480): string {
  return SHOP_PRODUCT_THUMBNAILS[handle]?.src || sizedShopifyImageUrl(fallbackSrc, width);
}

export function shopifyImageSrcSet(src: string, widths = [320, 480, 640]): string | undefined {
  if (!src) return undefined;

  try {
    const url = new URL(src);
    if (!url.hostname.includes(SHOPIFY_IMAGE_HOST)) return undefined;
  } catch {
    return undefined;
  }

  return widths.map((width) => `${sizedShopifyImageUrl(src, width)} ${width}w`).join(', ');
}

export function shopProductCardImageSrcSet(handle: string, fallbackSrc: string): string | undefined {
  const localThumbnail = SHOP_PRODUCT_THUMBNAILS[handle];
  if (localThumbnail) return `${localThumbnail.src} ${localThumbnail.width}w`;

  return shopifyImageSrcSet(fallbackSrc);
}

export function shopifyImageAltText(
  image: { altText?: string | null } | null | undefined,
  fallback: string,
): string {
  const altText = image?.altText?.trim();
  return altText || fallback;
}
