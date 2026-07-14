import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || "";

function verifyShopifyWebhook(rawBody: string, hmacHeader: string): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET) return true; // Skip verification if no secret configured
  const hash = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");
  return hash === hmacHeader;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Verify webhook signature (optional but recommended)
    const hmacHeader = req.headers["x-shopify-hmac-sha256"] as string;
    const rawBody = JSON.stringify(req.body);
    
    if (SHOPIFY_WEBHOOK_SECRET && hmacHeader && !verifyShopifyWebhook(rawBody, hmacHeader)) {
      console.error("Webhook signature verification failed");
      return res.status(401).json({ error: "Invalid signature" });
    }

    const order = req.body;

    if (!order || !order.id) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    // Extract order info
    const customerEmail = order.email || order.contact_email || "";
    const customerName = order.customer
      ? `${order.customer.first_name || ""} ${order.customer.last_name || ""}`.trim()
      : (order.billing_address?.name || "");

    // Build line items
    const items = (order.line_items || []).map((item: any) => ({
      title: item.title || "",
      variant_title: item.variant_title || "",
      quantity: item.quantity || 1,
      price: item.price || "0.00",
      sku: item.sku || "",
      product_id: item.product_id?.toString() || "",
    }));

    // Build order record
    const orderRecord = {
      shopify_order_id: order.id.toString(),
      order_number: order.order_number?.toString() || order.name || "",
      customer_email: customerEmail.toLowerCase(),
      customer_name: customerName,
      total_price: order.total_price || "0.00",
      subtotal_price: order.subtotal_price || "0.00",
      total_tax: order.total_tax || "0.00",
      total_discounts: order.total_discounts || "0.00",
      currency: order.currency || "USD",
      financial_status: order.financial_status || "pending",
      fulfillment_status: order.fulfillment_status || "unfulfilled",
      items: JSON.stringify(items),
      shipping_address: order.shipping_address
        ? JSON.stringify({
            address1: order.shipping_address.address1 || "",
            address2: order.shipping_address.address2 || "",
            city: order.shipping_address.city || "",
            province: order.shipping_address.province || "",
            zip: order.shipping_address.zip || "",
            country: order.shipping_address.country || "",
          })
        : null,
      order_date: order.created_at || new Date().toISOString(),
      discount_codes: order.discount_codes
        ? JSON.stringify(order.discount_codes)
        : null,
    };

    // Save to Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { error } = await supabase
      .from("customer_orders")
      .upsert(orderRecord, { onConflict: "shopify_order_id" });

    if (error) {
      console.error("Failed to save order:", error);
      return res.status(500).json({ error: "Failed to save order", details: error.message });
    }

    console.log(`Order ${orderRecord.order_number} saved for ${customerEmail}`);
    return res.status(200).json({ success: true, order_number: orderRecord.order_number });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
}
