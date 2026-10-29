import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { hubArticles } from '@/data/hubArticles';
import {
  merchantReturnPolicy,
  offerShippingDetails,
  resolveRouteSeo,
} from '@shared/seoText.mjs';

describe('document SEO limits', () => {
  it('keeps the homepage indexable and distinct from a not-found title', () => {
    const home = resolveRouteSeo('/');
    expect(home.noindex).toBe(false);
    expect(home.canonical).toBe('/');
    expect(home.title.toLowerCase()).not.toContain('not found');
    expect(home.description.toLowerCase()).not.toContain('does not exist');
  });

  it('keeps the exhaust description led by exhaust filters and within 140-160 characters', () => {
    const seo = resolveRouteSeo('/exhaust-filters');
    expect(seo.description.toLowerCase().startsWith('exhaust filters')).toBe(true);
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description.length).toBeGreaterThanOrEqual(140);
    expect(seo.description.length).toBeLessThanOrEqual(160);
  });

  it('canonicalizes the duplicate booth URLs that do not get the impressions', () => {
    expect(resolveRouteSeo('/accudraft-paint-booth-filters').canonical).toBe('/shop-by-booth/accudraft');
    expect(resolveRouteSeo('/shop-by-booth/global-finishing-solutions', { brandName: 'Global Finishing Solutions' }).canonical).toBe('/gfs-paint-booth-filters');
    expect(resolveRouteSeo('/accudraft-paint-booth-filters').title).not.toBe(
      resolveRouteSeo('/shop-by-booth/accudraft', { brandName: 'Accudraft' }).title,
    );
  });

  it('noindexes membership products, test handles, and the duplicate type indexes', () => {
    expect(resolveRouteSeo('/product/bronze-membership', { productTitle: 'Bronze Membership' }).noindex).toBe(true);
    expect(resolveRouteSeo('/product/test', { productTitle: 'Test' }).noindex).toBe(true);
    expect(resolveRouteSeo('/product/platinum', { productTitle: 'Platinum' }).noindex).toBe(true);
    expect(resolveRouteSeo('/shop-by-type').noindex).toBe(true);
    expect(resolveRouteSeo('/shop-by-booth-type').noindex).toBe(true);
    expect(resolveRouteSeo('/category/pre-filters').noindex).toBe(true);
  });

  it('publishes return method, restocking fees, and handling time without a made-up shipping rate', () => {
    const policy = merchantReturnPolicy();
    const shipping = offerShippingDetails();
    expect(policy.returnMethod).toBe('https://schema.org/ReturnByMail');
    expect(policy.returnFees).toBe('https://schema.org/RestockingFees');
    expect(policy.merchantReturnDays).toBe(5);
    expect(shipping.deliveryTime.handlingTime).toMatchObject({ minValue: 1, maxValue: 2, unitCode: 'DAY' });
    expect(shipping).not.toHaveProperty('shippingRate');
  });
});

describe('hub guides', () => {
  it('stays between 800 and 1500 words of unique guide copy', () => {
    for (const article of Object.values(hubArticles)) {
      const words = [article.heading, ...article.paragraphs, ...article.faqs.flatMap((faq) => [faq.question, faq.answer])]
        .join(' ')
        .split(/\s+/)
        .filter(Boolean);
      expect(words.length, article.id).toBeGreaterThanOrEqual(800);
      expect(words.length, article.id).toBeLessThanOrEqual(1500);
    }
  });
});

describe('analytics install', () => {
  it('loads GA4 once and leaves the existing GTM and Ads tags in place', () => {
    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    expect(html).toContain('GTM-MDQHN829');
    expect(html).toContain("gtag('config', 'G-BJH1BXTH78', { send_page_view: false })");
    expect(html).toContain("gtag('config', 'AW-18447673060', { send_page_view: false })");
    expect(html.match(/G-BJH1BXTH78/g)?.length).toBeGreaterThanOrEqual(2);
  });
});
