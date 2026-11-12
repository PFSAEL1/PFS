import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { hubArticles } from '@/data/hubArticles';
import snapshot from '@/data/shopifyProductSnapshot.json';
import {
  lowestPriceVariant,
  merchantReturnPolicy,
  normalizeOfferPrice,
  offerShippingDetails,
  productOffer,
  resolveRouteSeo,
  schemaSkuFromVariant,
} from '@shared/seoText.mjs';
import { createItemListSchema, createProductSchema } from '@/lib/structuredData';

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
    expect(resolveRouteSeo('/shop-by-type').noindex).toBe(false);
    expect(resolveRouteSeo('/shop-by-type').canonical).toBe('/shop-by-type');
    expect(resolveRouteSeo('/shop-by-booth-type').noindex).toBe(true);
    expect(resolveRouteSeo('/category/pre-filters').noindex).toBe(true);
  });

  it('publishes a Google-supported return fee and a US shipping rate', () => {
    const policy = merchantReturnPolicy();
    const shipping = offerShippingDetails();
    expect(policy.returnMethod).toBe('https://schema.org/ReturnByMail');
    expect(policy.returnFees).toBe('https://schema.org/ReturnFeesCustomerResponsibility');
    expect(policy.restockingFee).toBe(25);
    expect(policy.merchantReturnDays).toBe(5);
    expect(policy.merchantReturnLink).toBe('https://www.pfsfilters.com/returns');
    expect(shipping.shippingDestination.addressCountry).toBe('US');
    expect(shipping.shippingRate).toMatchObject({ currency: 'USD', value: '40.76' });
    expect(shipping.deliveryTime.handlingTime).toMatchObject({ minValue: 1, maxValue: 2, unitCode: 'DAY' });
    expect(shipping.deliveryTime.transitTime).toMatchObject({ minValue: 1, maxValue: 4, unitCode: 'DAY' });
  });

  it('targets paint booth filter walls, rolls, and paint shop filters in document metadata', () => {
    const filters = resolveRouteSeo('/paint-booth-filters');
    const shop = resolveRouteSeo('/shop');
    const rolls = resolveRouteSeo('/category/roll-media');
    const rollProduct = resolveRouteSeo('/product/20x100x2-22-gram-fiberglass-exhaust-roll-1-cs', {
      productTitle: '22-Gram Fiberglass Paint Arrestor Roll, 1/CS',
    });
    expect(filters.title).toContain('Paint Booth Filters');
    expect(filters.title.toLowerCase()).toContain('filter walls');
    expect(filters.description.toLowerCase()).toContain('paint booth filter walls');
    expect(shop.title.toLowerCase()).toContain('paint shop filters');
    expect(shop.description.toLowerCase()).toContain('paint shop filters');
    expect(rolls.title.toLowerCase()).toContain('paint booth filter rolls');
    expect(rolls.description.toLowerCase()).toContain('paint booth filter roll');
    expect(rollProduct.title.toLowerCase()).toContain('paint booth filter roll');
    expect(rollProduct.description.toLowerCase()).toContain('paint booth filter roll');
    for (const record of [filters, shop, rolls, rollProduct]) {
      expect(record.title.length).toBeLessThanOrEqual(60);
      expect(record.description.length).toBeGreaterThanOrEqual(140);
      expect(record.description.length).toBeLessThanOrEqual(160);
    }
  });

  it('keeps a product offer complete when Shopify leaves the SKU blank', () => {
    const schema = createProductSchema({
      name: 'Example Filter',
      description: 'Example booth filter',
      image: '/images/filters/fiberglass-arrestors.png',
      price: '80.0',
      currency: 'USD',
      handle: 'example-filter',
      url: 'https://www.pfsfilters.com/product/example-filter',
    }) as {
      sku: string;
      brand: { name: string };
      image: string;
      offers: {
        price: string;
        priceCurrency: string;
        availability: string;
        url: string;
        priceValidUntil: string;
        hasMerchantReturnPolicy: { returnFees: string };
        shippingDetails: { shippingRate: { currency: string } };
      };
    };
    expect(schema.sku).toBe('example-filter');
    expect(schema.brand).toMatchObject({ name: 'PFS Filters' });
    expect(schema.image).toBe('https://www.pfsfilters.com/images/filters/fiberglass-arrestors.png');
    expect(schema.offers).toMatchObject({
      price: '80.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.pfsfilters.com/product/example-filter',
    });
    expect(schema.offers.priceValidUntil).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(schema.offers.hasMerchantReturnPolicy.returnFees).toBe('https://schema.org/ReturnFeesCustomerResponsibility');
    expect(schema.offers.shippingDetails.shippingRate.currency).toBe('USD');
  });

  it('puts offers on product nodes inside an item list', () => {
    const list = createItemListSchema([{
      name: 'Example Filter',
      url: 'https://www.pfsfilters.com/product/example-filter',
      image: '/images/filters/fiberglass-arrestors.png',
      price: '12.5',
      currency: 'USD',
      handle: 'example-filter',
    }]);
    const listed = list.itemListElement[0].item as { offers: { price: string; priceCurrency: string }; sku: string };
    expect(listed.offers.price).toBe('12.50');
    expect(listed.offers.priceCurrency).toBe('USD');
    expect(listed.sku).toBe('example-filter');
  });

  it('keeps shop-by-type, Garmat, intake, and arrestor pads on distinct queries', () => {
    const byType = resolveRouteSeo('/shop-by-type');
    const garmat = resolveRouteSeo('/garmat-paint-booth-filters');
    const intake = resolveRouteSeo('/intake-filters');
    const pads = resolveRouteSeo('/category/fiberglass-arrestors');
    expect(byType.canonical).toBe('/shop-by-type');
    expect(byType.noindex).toBe(false);
    expect(byType.title.toLowerCase()).not.toContain('paint booth filters');
    expect(byType.title.toLowerCase()).toContain('pads');
    expect(byType.description.toLowerCase()).toContain('paint booth filters hub');
    expect(garmat.title).toContain('Garmat Paint Booth Filters');
    expect(garmat.description.toLowerCase()).toContain('replacement intake and exhaust');
    expect(intake.title.toLowerCase()).toContain('paint booth intake filters');
    expect(intake.description.toLowerCase().startsWith('paint booth intake filters')).toBe(true);
    expect(pads.title.toLowerCase()).toContain('paint arrestor pads');
    expect(pads.description.toLowerCase()).toContain('paint arrestor pads');
    for (const record of [byType, garmat, intake, pads]) {
      expect(record.title.length).toBeLessThanOrEqual(60);
      expect(record.description.length).toBeGreaterThanOrEqual(140);
      expect(record.description.length).toBeLessThanOrEqual(160);
    }
  });

  it('gives every catalog product a priced offer and does not invent ratings', () => {
    const products = snapshot as Array<{ node: {
      handle: string;
      title: string;
      vendor?: string;
      priceRange?: { minVariantPrice?: { amount?: string } };
      variants?: { edges?: Array<{ node?: { id?: string; sku?: string | null; price?: { amount?: string } } }> };
    } }>;
    expect(products.length).toBeGreaterThan(8);
    for (const { node } of products) {
      const variant = lowestPriceVariant(node);
      const price = normalizeOfferPrice(variant?.price?.amount ?? node.priceRange?.minVariantPrice?.amount);
      const offer = productOffer({
        price,
        currency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `https://www.pfsfilters.com/product/${node.handle}`,
      });
      expect(price, node.handle).toMatch(/^\d+\.\d{2}$/);
      expect(Number(price), node.handle).toBeGreaterThan(0);
      expect(offer.priceCurrency).toBe('USD');
      expect(offer.url).toContain(`/product/${node.handle}`);
      expect(offer.priceValidUntil).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(offer).not.toHaveProperty('review');
      expect(offer).not.toHaveProperty('aggregateRating');
      expect(schemaSkuFromVariant(variant, node.handle).length, node.handle).toBeGreaterThan(0);
    }
  });

  it('redirects known dead filter URLs to live pages', () => {
    const config = JSON.parse(readFileSync(new URL('../../../vercel.json', import.meta.url), 'utf8'));
    const redirects = new Map(
      config.routes
        .filter((route: { headers?: { Location?: string } }) => route.headers?.Location)
        .map((route: { src: string; headers: { Location: string } }) => [route.src, route.headers.Location]),
    );
    expect(redirects.get('^/paint-booth-filter/?$')).toBe('/paint-booth-filters');
    expect(redirects.get('^/paint-booth-filter-wall/?$')).toBe('/paint-booth-filters');
    expect(redirects.get('^/paint-shop-filters/?$')).toBe('/shop');
    expect(redirects.get('^/roll-media/?$')).toBe('/category/roll-media');
    expect(redirects.get('^/category/rolls?/?$')).toBe('/category/roll-media');
    expect(redirects.get('^/light/shop/?$')).toBe('/shop');
    expect(redirects.get('^/(?:policies/)?refund-policy/?$')).toBe('/returns');
    expect(redirects.get('/product/test/?')).toBe('/shop');
    expect(redirects.get('/product/platinum/?')).toBe('/memberships');
    expect(redirects.get('^/(?:spraybooth-filters|spray-booth-filter)/?$')).toBe('/spray-booth-filters');
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
