import { describe, expect, it } from 'vitest';
import {
  bundledShopifyProducts,
  filterShopifyProducts,
  getImmediateShopifyProducts,
} from './productCatalog';

function makeProduct(overrides: {
  title: string;
  productType?: string;
  tags?: string[];
  variantTitle?: string;
}) {
  return {
    node: {
      id: `gid://shopify/Product/${overrides.title}`,
      title: overrides.title,
      handle: overrides.title.toLowerCase().replace(/\s+/g, '-'),
      description: '',
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
});
