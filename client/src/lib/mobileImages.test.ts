import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_PRODUCT_IMAGE, getProductFallbackImage } from './imageUrls';

const shopByTypeSource = readFileSync(new URL('../pages/ShopByType.tsx', import.meta.url), 'utf8');
const productDetailSource = readFileSync(new URL('../pages/ProductDetail.tsx', import.meta.url), 'utf8');
const lightHomeSource = readFileSync(new URL('../pages/light/LightHome.tsx', import.meta.url), 'utf8');
const lightShopByTypeSource = readFileSync(new URL('../pages/light/LightShopByType.tsx', import.meta.url), 'utf8');
const indexSource = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const generatorSource = readFileSync(new URL('../../../scripts/generate-seo-assets.mjs', import.meta.url), 'utf8');

const DEAD_IMAGE_HOST = ['d2xsxph8kpxj0f', 'cloudfront', 'net'].join('.');

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return ['.ts', '.tsx', '.html', '.mjs'].includes(extname(entry.name)) ? [path] : [];
  });
}

describe('mobile-safe storefront images', () => {
  it('contains no references to the expired CloudFront image host', () => {
    const roots = [
      new URL('../', import.meta.url).pathname,
      new URL('../../index.html', import.meta.url).pathname,
      new URL('../../../scripts/generate-seo-assets.mjs', import.meta.url).pathname,
    ];
    const files = roots.flatMap((path) => (extname(path) ? [path] : sourceFiles(path)));

    for (const file of files) {
      expect(readFileSync(file, 'utf8'), file).not.toContain(DEAD_IMAGE_HOST);
    }
  });

  it('uses first-party category images on the filter-type page', () => {
    for (const image of [
      '/images/cat_fiberglass_arrestors.png',
      '/images/cat_tacky_panels.png',
      '/images/cat_ceiling_blankets.png',
      '/images/cat_roll_media.png',
      '/images/filters/merv-pleated.jpg',
    ]) {
      expect(shopByTypeSource).toContain(`image: '${image}'`);
      expect(existsSync(new URL(`../../public${image}`, import.meta.url)), image).toBe(true);
    }
  });

  it.each([
    ['bronze-membership', '/images/products/membership-bronze-720.png'],
    ['silver-membership', '/images/products/membership-silver-720.png'],
    ['gold-membership', '/images/products/membership-gold-720.png'],
    ['platinum-membership', '/images/products/membership-platinum-720.png'],
  ])('uses the local portrait artwork for %s', (handle, image) => {
    expect(getProductFallbackImage(handle)).toBe(image);
    const bytes = readFileSync(new URL(`../../public${image}`, import.meta.url));
    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(bytes.readUInt32BE(16)).toBe(720);
    expect(bytes.readUInt32BE(20)).toBe(960);
  });

  it('renders membership artwork without cropping and keeps a local generic fallback', () => {
    expect(DEFAULT_PRODUCT_IMAGE).toBe('/images/filters/fiberglass-arrestors.png');
    expect(productDetailSource).toContain("handle.endsWith('-membership')");
    expect(productDetailSource).toContain("'object-contain p-6 md:p-10'");
  });

  it('does not substitute misleading filter photos in light-theme prototypes', () => {
    expect(lightHomeSource).toContain('const PFS_PARTICULATE = "/images/filters/aerospace-hepa.png"');
    expect(lightHomeSource).toContain('PRODUCT_IMAGE_UNAVAILABLE');
    expect(lightShopByTypeSource).toContain('const ROLL_MEDIA_IMG = "/images/cat_roll_media.png"');
    expect(lightShopByTypeSource).toContain('PRODUCT_IMAGE_UNAVAILABLE');
    expect(lightShopByTypeSource).not.toContain('img: RENSA_PARTICULATE');
  });

  it('uses first-party favicon and social-preview files', () => {
    for (const image of ['/favicon-32.png', '/favicon-512.png', '/apple-touch-icon.png']) {
      expect(indexSource).toContain(`href="${image}"`);
      expect(existsSync(new URL(`../../public${image}`, import.meta.url)), image).toBe(true);
    }
    expect(indexSource).toContain('https://www.pfsfilters.com/media/pfs-hero-poster-desktop.webp');
    expect(generatorSource).toContain('https://www.pfsfilters.com/media/pfs-hero-poster-desktop.webp');
  });
});
