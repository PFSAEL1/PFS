import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const pageSource = readFileSync(new URL('./AutomotivePaintBoothFilters.tsx', import.meta.url), 'utf8');
const appSource = readFileSync(new URL('../App.tsx', import.meta.url), 'utf8');
const footerSource = readFileSync(new URL('../components/Footer.tsx', import.meta.url), 'utf8');
const filterDatabaseSource = readFileSync(new URL('./FilterDatabase.tsx', import.meta.url), 'utf8');
const generatorSource = readFileSync(new URL('../../../scripts/generate-seo-assets.mjs', import.meta.url), 'utf8');

const ROUTE = '/industries/automotive-paint-booth-filters';

describe('automotive paint booth SEO landing page', () => {
  it('is registered in the client router, footer, and static route generator', () => {
    expect(appSource).toContain(`path="${ROUTE}"`);
    expect(footerSource).toContain(`href: '${ROUTE}'`);
    expect(filterDatabaseSource).toContain(`href="${ROUTE}"`);
    expect(generatorSource).toContain(`path: '${ROUTE}'`);
    expect(generatorSource).toContain(`route.path === '${ROUTE}'`);
  });

  it('provides unique metadata and crawlable collection, breadcrumb, and FAQ schema', () => {
    expect(pageSource).toContain('Automotive Paint Booth Filters | PFS Filters');
    expect(pageSource).toContain(`const PAGE_URL = 'https://www.pfsfilters.com${ROUTE}'`);
    expect(pageSource).toContain("'@type': 'CollectionPage'");
    expect(pageSource).toContain("'@type': 'WebSite'");
    expect(pageSource).toContain("provider: { '@id': 'https://www.pfsfilters.com/#store' }");
    expect(pageSource).toContain("'@type': 'BreadcrumbList'");
    expect(pageSource).toContain("'@type': 'FAQPage'");
    expect(generatorSource).toContain('automotiveIndustryFallback');
    expect(generatorSource).toContain('const faqItems = automotiveFilterFaqs.map');
    expect(generatorSource).toContain('${faqItems}');
  });

  it('links the automotive journey to each primary filter stage and fitment support', () => {
    expect(pageSource).toContain("href: '/intake-filters'");
    expect(pageSource).toContain("href: '/ceiling-filters'");
    expect(pageSource).toContain("href: '/exhaust-filters'");
    expect(pageSource).toContain('href="/filter-finder"');
    expect(pageSource).toContain('href="/contact"');
  });

  it('preserves evidence and compliance boundaries', () => {
    expect(pageSource).toContain('There is no universal replacement interval');
    expect(pageSource).toContain('does not by itself make a booth or facility compliant');
    expect(pageSource).not.toMatch(/guaranteed fit|guaranteed compliance|certified compliant|fits every booth|best filter company/i);
  });
});
