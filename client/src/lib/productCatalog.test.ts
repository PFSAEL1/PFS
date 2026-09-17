import { describe, expect, it } from 'vitest';
import {
  bundledShopifyProducts,
  filterShopifyProducts,
  getImmediateShopifyProducts,
  searchShopifyProducts,
} from './productCatalog';

function makeProduct(overrides: {
  title: string;
  handle?: string;
  productType?: string;
  tags?: string[];
  variantTitle?: string;
  sku?: string;
  description?: string;
}) {
  return {
    node: {
      id: `gid://shopify/Product/${overrides.title}`,
      title: overrides.title,
      handle: overrides.handle || overrides.title.toLowerCase().replace(/\s+/g, '-'),
      description: overrides.description || '',
      productType: overrides.productType || '',
      tags: overrides.tags || [],
      priceRange: { minVariantPrice: { amount: '10.00', currencyCode: 'USD' } },
      images: { edges: [] },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/1',
              title: overrides.variantTitle || 'Default Title',
              sku: overrides.sku || null,
              price: { amount: '10.00', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [],
            },
          },
        ],
      },
      selectedOrFirstAvailableVariant: { id: 'gid://shopify/ProductVariant/1' },
      options: [],
    },
  };
}

describe('instant Shopify product catalog', () => {
  it('ships a non-empty catalog for the first render without waiting for the network', () => {
    expect(bundledShopifyProducts.length).toBeGreaterThan(0);
    expect(getImmediateShopifyProducts()).toEqual(bundledShopifyProducts);
  });

  it('removes membership products and preserves ordinary products', () => {
    const products = [
      makeProduct({ title: 'Gold Membership' }),
      makeProduct({ title: 'Fiberglass Paint Arrestor' }),
    ];

    expect(filterShopifyProducts(products)).toHaveLength(1);
    expect(filterShopifyProducts(products)[0].node.title).toBe('Fiberglass Paint Arrestor');
  });

  it('removes Shopify copies of consumables rendered as canonical cards', () => {
    const products = [
      makeProduct({
        title: 'PFS Paint Booth Absorbent Mat Roll — 32 in × 50 ft',
        handle: 'pfs-paint-booth-absorbent-mat-roll-32x50',
      }),
      makeProduct({ title: 'PFS VITRA', handle: 'pfs-vitra' }),
      makeProduct({
        title: 'PFS VANGUARD Complete Booth Protection Kit',
        handle: 'pfs-vanguard-complete-booth-protection-kit',
      }),
      makeProduct({ title: 'Fiberglass Paint Arrestor' }),
    ];

    expect(filterShopifyProducts(products).map((product) => product.node.handle)).toEqual([
      'fiberglass-paint-arrestor',
    ]);
  });

  it('applies category and normalized size filters to the immediate catalog', () => {
    const products = [
      makeProduct({
        title: 'Fiberglass Paint Arrestor',
        productType: 'Exhaust Filter',
        tags: ['fiberglass'],
        variantTitle: '20 x 20 x 2',
      }),
      makeProduct({ title: 'Tacky Intake Panel', tags: ['tacky'] }),
    ];

    expect(filterShopifyProducts(products, 'fiberglass', '20x20')).toHaveLength(1);
    expect(filterShopifyProducts(products, 'tacky', '20x20')).toHaveLength(0);
  });

  it('searches titles, keywords, compact dimensions, and variant SKUs', () => {
    const products = [
      makeProduct({
        title: 'Fiberglass Paint Arrestor Pads',
        productType: 'Exhaust Filter',
        tags: ['fiberglass', 'paint booth'],
        variantTitle: '20" x 20" x 2" 50/CS',
        sku: 'PFS-FG-2020',
      }),
      makeProduct({
        title: 'Tacky Intake Panel',
        productType: 'Intake Filter',
        tags: ['tacky'],
        variantTitle: '24 x 24',
      }),
    ];

    expect(searchShopifyProducts(products, 'fiberglass 20x20')[0].node.title).toBe(
      'Fiberglass Paint Arrestor Pads',
    );
    expect(searchShopifyProducts(products, 'PFS-FG-2020')[0].node.title).toBe(
      'Fiberglass Paint Arrestor Pads',
    );
    expect(searchShopifyProducts(products, 'intake')[0].node.title).toBe('Tacky Intake Panel');
  });

  it('requires every search term and excludes membership products', () => {
    const products = [
      makeProduct({ title: 'Gold Membership' }),
      makeProduct({ title: 'Fiberglass Paint Arrestor', variantTitle: '20 x 20' }),
      makeProduct({ title: 'Fiberglass Paint Arrestor', variantTitle: '24 x 24' }),
    ];

    expect(searchShopifyProducts(products, 'fiberglass 20x20')).toHaveLength(1);
    expect(searchShopifyProducts(products, 'membership')).toHaveLength(0);
  });

  it('does not treat a numeric keyword as a partial number match', () => {
    const products = [
      makeProduct({ title: 'Pleated Air Filter MERV 10' }),
      makeProduct({ title: 'Aerospace Bag Filter MERV 14', description: 'CG100 media' }),
    ];

    expect(searchShopifyProducts(products, 'MERV 10').map((product) => product.node.title)).toEqual([
      'Pleated Air Filter MERV 10',
    ]);
  });
});
