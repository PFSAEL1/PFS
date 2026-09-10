const SHOPIFY_IMAGE_HOST = 'cdn.shopify.com';

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

export function shopifyImageAltText(
  image: { altText?: string | null } | null | undefined,
  fallback: string,
): string {
  const altText = image?.altText?.trim();
  return altText || fallback;
}
