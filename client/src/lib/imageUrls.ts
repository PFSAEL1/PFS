const SHOPIFY_IMAGE_HOST = 'cdn.shopify.com';

const SHOP_PRODUCT_THUMBNAILS: Record<string, string> = {
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs': '/images/shop-thumbnails/22-gram-fiberglass-pads.webp',
  '20x20-paint-arrestor-holding-grids-w-tips-each': '/images/shop-thumbnails/holding-grid.webp',
  '20x20-paint-pockets-paint-arrestor-30-cs': '/images/shop-thumbnails/paint-pockets.webp',
  '20x100x2-22-gram-fiberglass-exhaust-roll-1-cs': '/images/shop-thumbnails/22-gram-fiberglass-roll.webp',
};

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
  return SHOP_PRODUCT_THUMBNAILS[handle] || sizedShopifyImageUrl(fallbackSrc, width);
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
  if (localThumbnail) return `${localThumbnail} 480w`;

  return shopifyImageSrcSet(fallbackSrc);
}

export function shopifyImageAltText(
  image: { altText?: string | null } | null | undefined,
  fallback: string,
): string {
  const altText = image?.altText?.trim();
  return altText || fallback;
}
