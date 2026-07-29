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

/**
 * Fuzzy match: try to find a site account that matches the order's customer name.
 * Strategies (in order):
 *   1. Exact email match (already handled by customer_email field)
 *   2. Name-based: "Ryan Fevold" → search for emails containing "ryan.fevold" or "rfevold"
 *   3. Last name + first initial pattern
 *   4. Partial name in email local part
 */
async function fuzzyMatchAccount(
  supabase: any,
  customerName: string,
  customerEmail: string
): Promise<string | null> {
  if (!customerName || customerName.trim().length < 3) return null;

  const nameParts = customerName.trim().toLowerCase().split(/\s+/);
  if (nameParts.length < 2) return null;

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  // Build search patterns to look for in auth.users emails
  const patterns = [
    `${firstName}.${lastName}`,     // ryan.fevold
    `${firstName}${lastName}`,      // ryanfevold
    `${firstName[0]}${lastName}`,   // rfevold
    `${lastName}.${firstName}`,     // fevold.ryan
    `${lastName}${firstName[0]}`,   // fevoldr
  ];

  try {
    // Use admin API to list users and search by email patterns
    // We'll search for users whose email contains our patterns
    const { data: { users }, error } = await supabase.auth.admin.listUsers({
      perPage: 1000,
    });

    if (error || !users || users.length === 0) {
      console.log("[Webhook Fuzzy] No users found or error:", error?.message);
      return null;
    }

    // Don't match if the order email already exactly matches a user
    const exactMatch = users.find(
      (u: any) => u.email?.toLowerCase() === customerEmail.toLowerCase()
    );
    if (exactMatch) {
      // Already an exact match - no fuzzy needed
      return null;
    }

    // Try each pattern against all user emails
    for (const pattern of patterns) {
      const match = users.find((u: any) => {
        if (!u.email) return false;
        const emailLocal = u.email.toLowerCase().split("@")[0];
        return emailLocal === pattern || emailLocal.includes(pattern);
      });
      if (match) {
        console.log(
          `[Webhook Fuzzy] Matched "${customerName}" → ${match.email} (pattern: ${pattern})`
        );
        return match.email.toLowerCase();
      }
    }

    // Additional strategy: check if user's full_name metadata matches
    const nameMatch = users.find((u: any) => {
      const meta = u.user_metadata;
      if (!meta?.full_name) return false;
      const metaName = meta.full_name.toLowerCase().trim();
      const orderName = customerName.toLowerCase().trim();
      return metaName === orderName;
    });
    if (nameMatch) {
      console.log(
        `[Webhook Fuzzy] Matched "${customerName}" → ${nameMatch.email} (full_name metadata)`
      );
      return nameMatch.email.toLowerCase();
    }

    console.log(`[Webhook Fuzzy] No match found for "${customerName}"`);
    return null;
  } catch (err: any) {
    console.error("[Webhook Fuzzy] Error during fuzzy match:", err.message);
    return null;
  }
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

    // Initialize Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fuzzy match: try to find the site account this order belongs to
    const linkedEmail = await fuzzyMatchAccount(
      supabase,
      customerName,
      customerEmail
    );

    // Build order record
    const orderRecord: any = {
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

    // If fuzzy match found a different account, store the linked email
    if (linkedEmail && linkedEmail !== customerEmail.toLowerCase()) {
      orderRecord.linked_email = linkedEmail;
      console.log(`[Webhook] Order ${orderRecord.order_number}: linked "${customerEmail}" → "${linkedEmail}" via fuzzy match`);
    }

    // Save to Supabase
    const { error } = await supabase
      .from("customer_orders")
      .upsert(orderRecord, { onConflict: "shopify_order_id" });

    if (error) {
      console.error("Failed to save order:", error);
      return res.status(500).json({ error: "Failed to save order", details: error.message });
    }

    console.log(`Order ${orderRecord.order_number} saved for ${customerEmail}${linkedEmail ? ` (linked to ${linkedEmail})` : ''}`);
    return res.status(200).json({ success: true, order_number: orderRecord.order_number, linked_email: linkedEmail || null });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
}
