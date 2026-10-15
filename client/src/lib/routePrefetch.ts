const loaders: Record<string, () => Promise<unknown>> = {
  '/shop': () => import('@/pages/Shop'),
  '/blog': () => import('@/pages/Blog'),
  '/contact': () => import('@/pages/Contact'),
  '/thank-you': () => import('@/pages/ThankYou'),
  '/why-choose-us': () => import('@/pages/WhyChooseUs'),
  '/memberships': () => import('@/pages/Memberships'),
  '/auth': () => import('@/pages/Auth'),
  '/dashboard': () => import('@/pages/Dashboard'),
  '/returns': () => import('@/pages/Returns'),
  '/privacy-policy': () => import('@/pages/PrivacyPolicy'),
  '/terms-of-service': () => import('@/pages/TermsOfService'),
  '/filter-scanner': () => import('@/pages/FilterScanner'),
  '/shop-by-size': () => import('@/pages/ShopBySize'),
  '/shop-by-type': () => import('@/pages/ShopByType'),
  '/brands': () => import('@/pages/Brands'),
  '/submit-review': () => import('@/pages/SubmitReview'),
  '/filter-database': () => import('@/pages/FilterDatabase'),
  '/paint-booth-filters': () => import('@/pages/PaintBoothFilters'),
  '/andreae-paint-booth-filters': () => import('@/pages/AndreaePaintBoothFilters'),
  '/exhaust-filters': () => import('@/pages/ExhaustFilters'),
  '/intake-filters': () => import('@/pages/IntakeFilters'),
  '/ceiling-filters': () => import('@/pages/CeilingFilters'),
  '/prefilters': () => import('@/pages/Prefilters'),
  '/neshap-compliant-paint-booth-filters': () => import('@/pages/NeshapCompliantPaintBoothFilters'),
  '/garmat-paint-booth-filters': () => import('@/pages/GarmatPaintBoothFilters'),
  '/accudraft-paint-booth-filters': () => import('@/pages/OemPaintBoothFilters'),
  '/gfs-paint-booth-filters': () => import('@/pages/OemPaintBoothFilters'),
  '/col-met-paint-booth-filters': () => import('@/pages/OemPaintBoothFilters'),
  '/pfs-spray-booth-filters': () => import('@/pages/OemPaintBoothFilters'),
  '/california/carb-paint-booth-filter-compliance': () => import('@/pages/CaliforniaCarbCompliance'),
  '/faq': () => import('@/pages/FAQPage'),
  '/filter-finder': () => import('@/pages/FilterFinder'),
  '/filter-compatibility': () => import('@/pages/FilterFinder'),
  '/shop-by-booth': () => import('@/pages/ShopByBooth'),
  '/shop-by-booth-type': () => import('@/pages/ShopByBoothType'),
  '/shop-by-filter-type': () => import('@/pages/ShopByFilterType'),
  '/consumables': () => import('@/pages/Consumables'),
  '/consumables/pfs-vitra': () => import('@/pages/PfsVitra'),
  '/consumables/pfs-vanguard': () => import('@/pages/PfsVanguard'),
  '/aerospace': () => import('@/pages/Aerospace'),
  '/industries/automotive-paint-booth-filters': () => import('@/pages/AutomotivePaintBoothFilters'),
  '/industries/aerospace-paint-booth-filters': () => import('@/pages/AerospaceHub'),
};

const prefixLoaders: Array<[string, () => Promise<unknown>]> = [
  ['/product/', () => import('@/pages/ProductDetail')],
  ['/blog/', () => import('@/pages/BlogPost')],
  ['/category/', () => import('@/pages/CategoryPage')],
  ['/shop-by-booth/', () => import('@/pages/BrandDetail')],
  ['/california/', () => import('@/pages/CaliforniaPaintBoothFilters')],
];

const started = new Set<string>();

export function prefetchRoute(href: string | null | undefined) {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return;
  const path = href.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
  if (started.has(path)) return;
  const loader = loaders[path] || prefixLoaders.find(([prefix]) => path.startsWith(prefix))?.[1];
  if (!loader) return;
  started.add(path);
  loader().catch(() => {
    started.delete(path);
  });
}

export function installRoutePrefetch() {
  if (typeof window === 'undefined' || window.__pfsPrefetchInstalled) return;
  window.__pfsPrefetchInstalled = true;

  const fromEvent = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;
    prefetchRoute(anchor.getAttribute('href'));
  };

  document.addEventListener('pointerover', fromEvent, { passive: true });
  document.addEventListener('focusin', fromEvent);
  document.addEventListener('touchstart', fromEvent, { passive: true });
}

declare global {
  interface Window {
    __pfsPrefetchInstalled?: boolean;
  }
}
