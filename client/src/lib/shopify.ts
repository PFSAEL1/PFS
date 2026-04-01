// Shopify Storefront API integration
// Uses environment variables for store domain and access token

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
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
}

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '5e357a0ae8e9906edb44ef570a4ed219';

async function storefrontApiRequest(query: string, variables?: Record<string, unknown>) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
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

export async function fetchProductByHandle(handle: string) {
  const data = await storefrontApiRequest(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle;
}

export async function fetchRelatedProducts(currentProductId: string, limit = 4): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(GET_PRODUCTS_QUERY, { first: limit + 5 });
  const products = data?.data?.products?.edges || [];
  return products.filter((p: ShopifyProduct) => p.node.id !== currentProductId).slice(0, limit);
}

export async function createStorefrontCheckout(items: CartItem[], discountCode?: string): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const input: Record<string, unknown> = { lines };
  if (discountCode) input.discountCodes = [discountCode];

  const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, { input });

  if (cartData.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  const cart = cartData.data.cartCreate.cart;
  if (!cart.checkoutUrl) throw new Error('No checkout URL returned from Shopify');

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  if (discountCode) url.searchParams.set('discount', discountCode);

  return url.toString();
}
