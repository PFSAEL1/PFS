import { beforeEach, describe, expect, it, vi } from 'vitest';
import { randomUUID } from 'node:crypto';
import {
  configured, decryptEmail, emailContent, encryptEmail, normalizeEmail,
  parseLines, signedLink, verifyLink, verifiedShopifyItems,
} from './cartReminder';

beforeEach(() => {
  process.env.CART_REMINDER_SECRET = 'test-secret-not-for-production-at-least-32-characters';
});

describe('cart reminder privacy and safety', () => {
  it('is off unless the explicit server-side enable flag and service key exist', () => {
    const previous = process.env.CART_REMINDER_ENABLED;
    process.env.CART_REMINDER_ENABLED = 'false';
    expect(configured()).toBe(false);
    process.env.CART_REMINDER_ENABLED = previous;
  });

  it('accepts only compact Shopify IDs, bounded quantities and selling plans, discarding injected copy', () => {
    expect(parseLines([{
      variantId: 'gid://shopify/ProductVariant/123', quantity: 2,
      title: '<script>spoofed</script>', price: { amount: '0.01' },
    }])).toEqual([{ variantId: 'gid://shopify/ProductVariant/123', quantity: 2 }]);
    expect(parseLines([{ variantId: 'gid://shopify/ProductVariant/123', quantity: 101 }])).toBeNull();
    expect(parseLines([{ variantId: 'gid://shopify/Customer/123', quantity: 1 }])).toBeNull();
    expect(parseLines(Array(41).fill({ variantId: 'gid://shopify/ProductVariant/123', quantity: 1 }))).toBeNull();
  });

  it('uses Shopify catalog data, never client-submitted names or prices', async () => {
    const priorDomain = process.env.VITE_SHOPIFY_DOMAIN;
    const priorToken = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
    process.env.VITE_SHOPIFY_DOMAIN = 'test-shop.myshopify.com';
    process.env.VITE_SHOPIFY_STOREFRONT_TOKEN = 'test-token';
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true, json: async () => ({ data: { nodes: [{
        id: 'gid://shopify/ProductVariant/123', title: '20 in × 20 in', availableForSale: true,
        price: { amount: '120.84', currencyCode: 'USD' },
        product: { id: 'gid://shopify/Product/99', title: 'Verified filter', handle: 'verified-filter', images: { edges: [] } },
        sellingPlanAllocations: { edges: [] },
      }] } }),
    } as Response);
    try {
      const lines = parseLines([{ variantId: 'gid://shopify/ProductVariant/123', quantity: 2, title: '<script>bad</script>' }]);
      expect(lines).not.toBeNull();
      const [item] = await verifiedShopifyItems(lines!);
      expect(item.title).toBe('Verified filter');
      expect(item.price.amount).toBe('120.84');
      expect(JSON.stringify(item)).not.toContain('script');
    } finally {
      fetchMock.mockRestore();
      process.env.VITE_SHOPIFY_DOMAIN = priorDomain;
      process.env.VITE_SHOPIFY_STOREFRONT_TOKEN = priorToken;
    }
  });

  it('normalizes email and encrypts it with authentication', () => {
    expect(normalizeEmail('  ORDER@Example.COM ')).toBe('order@example.com');
    expect(normalizeEmail('not-email')).toBeNull();
    const encrypted = encryptEmail('order@example.com');
    expect(encrypted).not.toContain('order@example.com');
    expect(decryptEmail(encrypted)).toBe('order@example.com');
    expect(() => decryptEmail(encrypted.slice(0, -3) + 'aaa')).toThrow();
  });

  it('uses purpose-bound signed recovery and opt-out tokens', () => {
    const id = randomUUID();
    const recover = signedLink('recover', id);
    expect(verifyLink('recover', recover)).toBe(id);
    expect(verifyLink('unsubscribe', recover)).toBeNull();
    expect(verifyLink('recover', recover.slice(0, -1) + (recover.endsWith('a') ? 'b' : 'a'))).toBeNull();
  });

  it('escapes verified product names in HTML and includes an unsubscribe link and postal address', () => {
    const { html, text, returnUrl, unsubscribeUrl } = emailContent(randomUUID(), [{
      variantId: 'gid://shopify/ProductVariant/1', productId: 'gid://shopify/Product/1', handle: 'filter',
      title: 'Filter <script>alert(1)</script>', variantTitle: 'Default Title',
      quantity: 1, price: { amount: '5.00', currencyCode: 'USD' },
    }]);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('1400 Airport Blvd');
    expect(returnUrl).toContain('/shop#recover=');
    expect(unsubscribeUrl).toContain('/api/cart-reminder-unsubscribe?token=');
    expect(text).toContain('Unsubscribe:');
    expect(text).not.toContain('$5.00');
  });
});
