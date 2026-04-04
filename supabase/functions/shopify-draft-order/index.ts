// Supabase Edge Function: shopify-draft-order
// Creates a Shopify draft order for a booth customer and optionally sends the invoice email.
// Mode: 'reminder' = create draft + send invoice email
//       'auto_reorder' = create draft + complete it (charges customer if payment method on file)
// Env vars required: SHOPIFY_ADMIN_TOKEN, SHOPIFY_SHOP_DOMAIN
// Deployed with --no-verify-jwt so the function handles auth internally

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify the caller is an authenticated admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

    const supabase = createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify admin role
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user) {
      console.error('Auth error:', userError);
      return new Response(JSON.stringify({ error: 'Not authenticated', details: userError?.message }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const body = await req.json();
    const { booth_id, mode } = body; // mode: 'reminder' | 'auto_reorder'

    if (!booth_id || !mode) {
      return new Response(JSON.stringify({ error: 'Missing booth_id or mode' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Fetch booth data with filter positions
    const { data: booth, error: boothError } = await supabaseAdmin
      .from('booth_setups')
      .select('*, filter_positions(*)')
      .eq('id', booth_id)
      .single();

    if (boothError || !booth) {
      console.error('Booth fetch error:', boothError);
      return new Response(JSON.stringify({ error: 'Booth not found', details: boothError?.message }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const shopDomain = Deno.env.get('SHOPIFY_SHOP_DOMAIN') ?? 'abc-filter-splash-rwyxj.myshopify.com';
    const adminToken = Deno.env.get('SHOPIFY_ADMIN_TOKEN') ?? '';

    if (!adminToken) {
      return new Response(JSON.stringify({ error: 'Shopify Admin token not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Build line items from filter positions
    // IMPORTANT: Shopify REST API requires EITHER variant_id (no title/price)
    // OR custom line item (title + price, no variant_id). Never mix them.
    const lineItems = (booth.filter_positions || []).map((pos: any) => {
      const variantId = pos.shopify_variant_id;
      // Extract numeric ID from GID format (gid://shopify/ProductVariant/12345) or plain number
      let numericVariantId: number | null = null;
      if (variantId) {
        const match = String(variantId).match(/(\d+)$/);
        if (match) numericVariantId = parseInt(match[1], 10);
      }
      if (numericVariantId) {
        // Use Shopify product variant — no title/price allowed
        return {
          variant_id: numericVariantId,
          quantity: pos.quantity || 1
        };
      } else {
        // Custom line item — title + price required, no variant_id
        return {
          title: pos.shopify_product_title || `Filter - ${pos.position_type}${pos.dimensions ? ` ${pos.dimensions}` : ''}`,
          quantity: pos.quantity || 1,
          price: '0.00'
        };
      }
    });

    // If no filter positions, create a generic line item
    if (lineItems.length === 0) {
      lineItems.push({
        title: `Filter Replacement - ${booth.booth_manufacturer}${booth.booth_model ? ` ${booth.booth_model}` : ''}`,
        quantity: 1,
        price: '0.00'
      });
    }

    const customerEmail = booth.contact_email || booth.customer_email;
    const customerName = booth.customer_name;

    // Build draft order payload
    const draftOrderPayload: any = {
      draft_order: {
        line_items: lineItems,
        customer: booth.shopify_customer_id
          ? { id: booth.shopify_customer_id }
          : undefined,
        email: customerEmail,
        note: `Filter replacement reminder for ${booth.booth_manufacturer || ''}${booth.booth_model ? ` ${booth.booth_model}` : ''} at ${[booth.address_line1, booth.city, booth.state].filter(Boolean).join(', ')}`,
        tags: mode === 'auto_reorder' ? 'auto-reorder,abc-filters' : 'reminder,abc-filters',
        shipping_address: booth.address_line1 ? {
          first_name: customerName.split(' ')[0] || customerName,
          last_name: customerName.split(' ').slice(1).join(' ') || '',
          address1: booth.address_line1,
          address2: booth.address_line2 || '',
          city: booth.city || '',
          province: booth.state || '',
          zip: booth.zip_code || '',
          country: 'US'
        } : undefined
      }
    };

    // Create the draft order
    const createResp = await fetch(
      `https://${shopDomain}/admin/api/2024-01/draft_orders.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': adminToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(draftOrderPayload)
      }
    );

    if (!createResp.ok) {
      const errText = await createResp.text();
      console.error('Shopify draft order creation failed:', errText);
      return new Response(JSON.stringify({ error: 'Failed to create Shopify draft order', details: errText }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { draft_order } = await createResp.json();
    const draftOrderId = draft_order.id;

    let result: any = { draft_order_id: draftOrderId, mode };

    if (mode === 'reminder') {
      // Wait for Shopify to finish calculating the draft order before sending invoice
      // (Shopify returns "order has not finished calculating" if we send too quickly)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Send invoice email to customer
      const invoicePayload = {
        draft_order_invoice: {
          to: customerEmail,
          subject: `Your ABC Filters Replacement Order`,
          custom_message: `Hi ${customerName},\n\nIt's time to replace the filters for your ${booth.booth_manufacturer || 'spray booth'}${booth.booth_model ? ` ${booth.booth_model}` : ''}. Your draft order is ready for review.\n\nThank you for choosing ABC Filters!`
        }
      };
      console.log('Sending invoice to:', customerEmail, 'for draft order:', draftOrderId);
      const sendResp = await fetch(
        `https://${shopDomain}/admin/api/2024-01/draft_orders/${draftOrderId}/send_invoice.json`,
        {
          method: 'POST',
          headers: {
            'X-Shopify-Access-Token': adminToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(invoicePayload)
        }
      );
      const invoiceRespText = await sendResp.text();
      console.log('Invoice send response:', sendResp.status, invoiceRespText.substring(0, 200));
      result.invoice_sent = sendResp.ok;
      if (!sendResp.ok) {
        result.invoice_error = invoiceRespText;
      }
    } else if (mode === 'auto_reorder') {
      // Complete the draft order (creates a real order)
      const completeResp = await fetch(
        `https://${shopDomain}/admin/api/2024-01/draft_orders/${draftOrderId}/complete.json`,
        {
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': adminToken,
            'Content-Type': 'application/json'
          }
        }
      );
      if (completeResp.ok) {
        const { draft_order: completed } = await completeResp.json();
        result.order_id = completed.order_id;
        result.order_completed = true;
      } else {
        const errText = await completeResp.text();
        result.order_completed = false;
        result.complete_error = errText;
      }
    }

    // Update booth with last draft order ID and next reminder date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + (booth.change_interval_days || 90));

    await supabaseAdmin
      .from('booth_setups')
      .update({
        last_draft_order_id: String(draftOrderId),
        next_reminder_date: nextDate.toISOString().split('T')[0]
      })
      .eq('id', booth_id);

    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Edge function error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
