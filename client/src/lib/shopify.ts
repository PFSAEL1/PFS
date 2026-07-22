// Shopify Storefront API integration
// Uses environment variables for store domain and access token
// Safari-compatible: includes retry logic and proper error handling

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    tags: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  image?: string;
  handle: string;
  sellingPlanId?: string;
}

// Category slug → Shopify collection handle mapping
export const CATEGORY_COLLECTION_MAP: Record<string, { collectionHandle: string; title: string; description: string; position: string }> = {
  'fiberglass-arrestors': {
    collectionHandle: 'fiberglass-paint-arrestors',
    title: 'Fiberglass Paint Arrestors',
    description: 'Progressive-density glass fiber media captures overspray before it exits the booth. The industry standard for exhaust filtration.',
    position: 'EXHAUST',
  },
  'tacky-panels': {
    collectionHandle: 'tacky-panel-filters',
    title: 'Tacky Panel Filters',
    description: 'Adhesive-coated panels trap dust, debris, and airborne particles at the intake. Keeps contaminants out of your booth.',
    position: 'INTAKE',
  },
  'ceiling-blankets': {
    collectionHandle: 'ceiling-blankets',
    title: 'Ceiling Blankets',
    description: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor.',
    position: 'INTAKE',
  },
  'roll-media': {
    collectionHandle: 'roll-media',
    title: 'Roll Media',
    description: 'Continuous roll filtration cut to any length for any booth configuration. Available in multiple densities for both intake and exhaust.',
    position: 'INTAKE / EXHAUST',
  },
  'merv-filters': {
    collectionHandle: 'merv-rated-filters',
    title: 'MERV-Rated Filters',
    description: 'High-efficiency filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options for industrial operations.',
    position: 'INTAKE',
  },
  'polyester-media': {
    collectionHandle: 'polyester-media',
    title: 'Polyester Media',
    description: 'Durable synthetic filtration media with excellent moisture resistance. Ideal for high-humidity environments and water-based coatings.',
    position: 'EXHAUST',
  },
};

// Tag-based fallback mapping when collections don't exist
// Maps category slug → keywords to match against product tags, type, and title
export const CATEGORY_TAG_MAP: Record<string, string[]> = {
  'fiberglass-arrestors': ['fiberglass', 'paint arrestor', 'arrestor', 'exhaust filter'],
  'tacky-panels': ['tacky', 'tacky panel', 'panel filter'],
  'ceiling-blankets': ['ceiling', 'ceiling blanket', 'blanket'],
  'roll-media': ['roll', 'roll media', 'media roll'],
  'merv-filters': ['merv', 'merv-10', 'merv-13', 'merv10', 'merv13'],
  'polyester-media': ['polyester', 'synthetic media'],
};

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '5e357a0ae8e9906edb44ef570a4ed219';

async function storefrontApiRequest(query: string, variables?: Record<string, unknown>) {
  const url = `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`;
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
        credentials: 'omit',
        mode: 'cors',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON response from Shopify');
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error('Failed to fetch from Shopify after retries');
}

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  productType
  tags
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 3) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        price {
          amount
          currencyCode
        }
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
  options {
    name
    values
  }
`;

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

const GET_COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
      sellingPlanGroups(first: 5) {
        edges {
          node {
            name
            options {
              name
              values
            }
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  description
                  options {
                    name
                    value
                  }
                  priceAdjustments {
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                      ... on SellingPlanFixedAmountPriceAdjustment {
                        adjustmentAmount {
                          amount
                          currencyCode
                        }
                      }
                      ... on SellingPlanFixedPriceAdjustment {
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  recurringDeliveries
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        discountCodes { applicable code }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

export async function fetchProducts(limit = 50): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(GET_PRODUCTS_QUERY, { first: limit });
  return data?.data?.products?.edges || [];
}

/**
 * Fetch products by category slug.
 * First tries to fetch from a Shopify collection (by collection handle).
 * If the collection doesn't exist or returns no products, falls back to
 * tag/title/productType-based filtering on all products.
 */
export async function fetchProductsByCategory(categorySlug: string, limit = 50): Promise<ShopifyProduct[]> {
  const categoryInfo = CATEGORY_COLLECTION_MAP[categorySlug];

  if (categoryInfo) {
    // Try collection-based fetch first
    try {
      const data = await storefrontApiRequest(GET_COLLECTION_PRODUCTS_QUERY, {
        handle: categoryInfo.collectionHandle,
        first: limit,
      });
      const products = data?.data?.collectionByHandle?.products?.edges;
      if (products && products.length > 0) {
        return products;
      }
    } catch {
      // Fall through to tag-based filtering
    }
  }

  // Fallback: fetch all products and filter by tags/productType/title
  const allProducts = await fetchProducts(250);
  const tags = CATEGORY_TAG_MAP[categorySlug] || [];

  if (tags.length === 0) {
    return allProducts;
  }

  return allProducts.filter((product) => {
    const productTags = (product.node.tags || []).map((t: string) => t.toLowerCase());
    const productType = (product.node.productType || '').toLowerCase();
    const productTitle = product.node.title.toLowerCase();

    return tags.some((tag) => {
      const t = tag.toLowerCase();
      return productTags.some(pt => pt.includes(t)) ||
        productType.includes(t) ||
        productTitle.includes(t);
    });
  });
}

export async function fetchProductByHandle(handle: string) {
  const data = await storefrontApiRequest(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle;
}

export async function fetchRelatedProducts(currentProductId: string, limit = 4): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(GET_PRODUCTS_QUERY, { first: limit + 5 });
  const products = data?.data?.products?.edges || [];
  return products.filter((p: ShopifyProduct) => p.node.id !== currentProductId).slice(0, limit);
}

// Variant IDs that need direct checkout URL (bypasses Storefront Cart API issues)
const DIRECT_CHECKOUT_VARIANTS: Record<string, string> = {
  'gid://shopify/ProductVariant/52549337317508': '52549337317508', // PFS VITRA
};

export async function createStorefrontCheckout(items: CartItem[], discountCode?: string): Promise<string> {
  // Separate items into regular (Storefront Cart API) and direct-checkout items
  const regularItems = items.filter(item => !DIRECT_CHECKOUT_VARIANTS[item.variantId]);
  const directItems = items.filter(item => DIRECT_CHECKOUT_VARIANTS[item.variantId]);

  // If ALL items are direct-checkout items, use Shopify's direct /checkout URL
  if (regularItems.length === 0 && directItems.length > 0) {
    const lineParams = directItems.map((item, i) => {
      const numericId = DIRECT_CHECKOUT_VARIANTS[item.variantId];
      return `line_items[${i}][variant_id]=${numericId}&line_items[${i}][quantity]=${item.quantity}`;
    }).join('&');
    let url = `https://pfsfilters.myshopify.com/checkout?${lineParams}`;
    if (discountCode) url += `&discount=${encodeURIComponent(discountCode)}`;
    console.log('[Shopify Cart] Using direct checkout URL for special items:', url);
    return url;
  }

  // If there's a mix of regular + direct items, build a combined direct checkout URL
  // (the Storefront Cart API would drop the direct items)
  if (directItems.length > 0 && regularItems.length > 0) {
    const allItems = [...regularItems, ...directItems];
    const lineParams = allItems.map((item, i) => {
      const numericId = DIRECT_CHECKOUT_VARIANTS[item.variantId] || item.variantId.split('/').pop();
      return `line_items[${i}][variant_id]=${numericId}&line_items[${i}][quantity]=${item.quantity}`;
    }).join('&');
    let url = `https://pfsfilters.myshopify.com/checkout?${lineParams}`;
    if (discountCode) url += `&discount=${encodeURIComponent(discountCode)}`;
    console.log('[Shopify Cart] Using direct checkout URL for mixed cart:', url);
    return url;
  }

  // Standard flow: all regular items go through Storefront Cart API
  const lines = regularItems.map(item => {
    const line: { quantity: number; merchandiseId: string; sellingPlanId?: string } = {
      quantity: item.quantity,
      merchandiseId: item.variantId,
    };
    if (item.sellingPlanId) {
      line.sellingPlanId = item.sellingPlanId;
    }
    return line;
  });

  const input: Record<string, unknown> = { lines };
  if (discountCode) input.discountCodes = [discountCode];
  console.log('[Shopify Cart] Creating cart with discountCode:', discountCode);

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, { input });

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  const cart = cartData.data.cartCreate.cart;
  console.log('[Shopify Cart] Discount codes in response:', JSON.stringify(cart.discountCodes));
  console.log('[Shopify Cart] Cart total:', cart.cost?.totalAmount?.amount, 'subtotal:', cart.cost?.subtotalAmount?.amount);
  if (!cart.checkoutUrl) throw new Error('No checkout URL returned from Shopify');

  // Verify discount was applied in the cart
  const discountApplied = cart.discountCodes?.some((d: { applicable: boolean }) => d.applicable);
  console.log('[Shopify Cart] Discount applied in cart:', discountApplied);

  if (discountCode && !discountApplied) {
    console.warn('[Shopify Cart] Discount code was sent but NOT marked as applicable!');
  }

  // Use the cart's checkout URL directly — the discount is embedded in the cart object
  console.log('[Shopify Cart] Checkout URL:', cart.checkoutUrl);
  return cart.checkoutUrl;
}
