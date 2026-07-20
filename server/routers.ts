import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";

// Shopify Admin API helper
async function shopifyAdminRequest(query: string, variables?: Record<string, unknown>) {
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;

  if (!adminToken) {
    throw new Error('SHOPIFY_ADMIN_TOKEN not configured');
  }

  const url = `https://${shopDomain}/admin/api/2024-04/graphql.json`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Admin API error: ${response.status}`);
  }

  return response.json();
}

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  orders: router({
    // Get customer's past orders from Shopify
    list: protectedProcedure
      .input(z.object({ limit: z.number().min(1).max(50).default(10) }).optional())
      .query(async ({ ctx, input }) => {
        const userEmail = ctx.user.email;
        if (!userEmail) {
          return { orders: [], error: 'No email associated with account' };
        }

        try {
          const limit = input?.limit || 10;
          const data = await shopifyAdminRequest(`
            query GetCustomerOrders($query: String!, $first: Int!) {
              customers(first: 1, query: $query) {
                edges {
                  node {
                    id
                    email
                    orders(first: $first, sortKey: CREATED_AT, reverse: true) {
                      edges {
                        node {
                          id
                          name
                          createdAt
                          totalPriceSet {
                            shopMoney {
                              amount
                              currencyCode
                            }
                          }
                          displayFinancialStatus
                          displayFulfillmentStatus
                          lineItems(first: 10) {
                            edges {
                              node {
                                title
                                quantity
                                originalUnitPriceSet {
                                  shopMoney {
                                    amount
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `, { query: `email:${userEmail}`, first: limit });

          const customer = data?.data?.customers?.edges?.[0]?.node;
          if (!customer) {
            return { orders: [] };
          }

          const orders = customer.orders.edges.map((edge: any) => ({
            id: edge.node.id,
            order_number: edge.node.name,
            created_at: edge.node.createdAt,
            total_price: edge.node.totalPriceSet.shopMoney.amount,
            currency: edge.node.totalPriceSet.shopMoney.currencyCode,
            financial_status: edge.node.displayFinancialStatus?.toLowerCase() || 'unknown',
            fulfillment_status: edge.node.displayFulfillmentStatus?.toLowerCase() || 'unfulfilled',
            items: edge.node.lineItems.edges.map((li: any) => ({
              title: li.node.title,
              quantity: li.node.quantity,
              price: li.node.originalUnitPriceSet?.shopMoney?.amount || '0',
            })),
          }));

          return { orders };
        } catch (error) {
          console.error('[Orders] Failed to fetch from Shopify:', error);
          return { orders: [], error: 'Failed to fetch orders' };
        }
      }),

    // Get customer's discount code / membership pricing
    pricing: protectedProcedure.query(async ({ ctx }) => {
      const userEmail = ctx.user.email;
      if (!userEmail) {
        return { discountCode: null, discountPercent: 0 };
      }

      try {
        // Look up customer in Shopify to get their tags (which indicate membership tier)
        const data = await shopifyAdminRequest(`
          query GetCustomerTags($query: String!) {
            customers(first: 1, query: $query) {
              edges {
                node {
                  id
                  email
                  tags
                  metafields(first: 10, namespace: "pfs") {
                    edges {
                      node {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        `, { query: `email:${userEmail}` });

        const customer = data?.data?.customers?.edges?.[0]?.node;
        if (!customer) {
          return { discountCode: null, discountPercent: 0, tier: null };
        }

        // Check tags for membership tier
        const tags: string[] = customer.tags || [];
        let tier: string | null = null;
        let discountPercent = 0;
        let discountCode: string | null = null;

        if (tags.includes('platinum')) {
          tier = 'platinum'; discountPercent = 10;
        } else if (tags.includes('gold')) {
          tier = 'gold'; discountPercent = 10;
        } else if (tags.includes('silver')) {
          tier = 'silver'; discountPercent = 8;
        } else if (tags.includes('bronze')) {
          tier = 'bronze'; discountPercent = 6;
        }

        // Check metafields for custom discount code
        const discountMeta = customer.metafields?.edges?.find(
          (e: any) => e.node.key === 'discount_code'
        );
        if (discountMeta) {
          discountCode = discountMeta.node.value;
        }

        return { discountCode, discountPercent, tier };
      } catch (error) {
        console.error('[Pricing] Failed to fetch from Shopify:', error);
        return { discountCode: null, discountPercent: 0, tier: null };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
