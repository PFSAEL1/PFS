import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
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
  if (!response.ok) {
    const text = await response.text();
    console.error('[Shopify API] Error:', response.status, text);
    throw new Error(`Shopify API error: ${response.status}`);
  }
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

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[Customer Orders] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ error: 'Server configuration error', orders: [] });
  }

  const token = authHeader.replace('Bearer ', '');
  
  // Use service role key to verify the user's JWT token (VITE_ vars not available at runtime)
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user || !user.email) {
    console.error('[Customer Orders] Auth error:', authError?.message || 'No user/email');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = user.email;

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('[Customer Orders] SHOPIFY_ADMIN_TOKEN not configured');
    return res.status(500).json({ error: 'Shopify admin token not configured', orders: [] });
  }

  try {
    // Check if user has an alternate Shopify email in booth_setups or memberships
    let shopifyEmail = userEmail;
    
    const { data: boothData } = await supabaseAdmin
      .from('booth_setups')
      .select('shopify_email')
      .eq('customer_email', userEmail)
      .not('shopify_email', 'is', null)
      .limit(1)
      .single();
    
    if (boothData?.shopify_email) {
      shopifyEmail = boothData.shopify_email;
    } else {
      // Fallback: check memberships table
      const { data: memberData } = await supabaseAdmin
        .from('memberships')
        .select('shopify_email')
        .eq('user_email', userEmail)
        .not('shopify_email', 'is', null)
        .limit(1)
        .single();
      
      if (memberData?.shopify_email) {
        shopifyEmail = memberData.shopify_email;
      }
    }

    console.log(`[Customer Orders] Searching Shopify for email: ${shopifyEmail} (user: ${userEmail})`);

    // Search Shopify by the resolved email (may differ from login email)
    const emailsToSearch = [shopifyEmail];
    if (shopifyEmail !== userEmail) {
      emailsToSearch.push(userEmail); // Also search by login email as fallback
    }

    let allOrders: any[] = [];

    for (const searchEmail of emailsToSearch) {
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
      `, { query: `email:${searchEmail}`, first: 10 });

      if (data.errors) {
        console.error('[Customer Orders] GraphQL errors:', JSON.stringify(data.errors));
        continue;
      }

      const customer = data?.data?.customers?.edges?.[0]?.node;
      if (customer) {
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
        allOrders.push(...orders);
      }
    }

    // Deduplicate orders by id
    const uniqueOrders = Array.from(new Map(allOrders.map(o => [o.id, o])).values());

    return res.status(200).json({ orders: uniqueOrders });
  } catch (error: any) {
    console.error('[Customer Orders] Failed to fetch from Shopify:', error?.message || error);
    return res.status(500).json({ error: 'Failed to fetch orders', orders: [] });
  }
}
