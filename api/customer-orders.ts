import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN || 'abc-filter-splash-rwyxj.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

async function shopifyAdminRequest(query: string, variables: Record<string, any> = {}) {
  const url = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2024-04/graphql.json`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the request is from an authenticated user via Supabase
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user || !user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = user.email;

  if (!SHOPIFY_ADMIN_TOKEN) {
    return res.status(500).json({ error: 'Shopify admin token not configured' });
  }

  try {
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
    `, { query: `email:${userEmail}`, first: 10 });

    const customer = data?.data?.customers?.edges?.[0]?.node;
    if (!customer) {
      return res.status(200).json({ orders: [] });
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

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('[Customer Orders] Failed to fetch from Shopify:', error);
    return res.status(500).json({ error: 'Failed to fetch orders', orders: [] });
  }
}
