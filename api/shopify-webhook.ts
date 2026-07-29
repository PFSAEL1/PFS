import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || "";

function verifyShopifyWebhook(rawBody: string, hmacHeader: string): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET) return true;
  const hash = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");
  return hash === hmacHeader;
}

/**
 * Normalize an email by ensuring the domain has a valid TLD.
 * If the domain part has no dot (e.g. "colemanelectricalservice"), append ".com".
 */
function normalizeEmail(email: string): string {
  if (!email) return email;
  const lower = email.toLowerCase().trim();
  const atIdx = lower.indexOf("@");
  if (atIdx === -1) return lower;

  const localPart = lower.slice(0, atIdx);
  const domainPart = lower.slice(atIdx + 1);

  // If domain has no TLD (no dot), append .com
  if (!domainPart.includes(".")) {
    return `${localPart}@${domainPart}.com`;
  }
  return lower;
}

/**
 * Fuzzy match: try to find a site account that matches the order's customer.
 * Strategies:
 *   1. Normalized email match (fix missing .com etc.)
 *   2. Name-based: "Ryan Fevold" → search for emails containing "ryan.fevold"
 *   3. Full name metadata match
 */
async function fuzzyMatchAccount(
  supabase: any,
  customerName: string,
  customerEmail: string
): Promise<string | null> {
  try {
    const { data: { users }, error } = await supabase.auth.admin.listUsers({
      perPage: 1000,
    });

    if (error || !users || users.length === 0) {
      console.log("[Webhook Fuzzy] No users found or error:", error?.message);
      return null;
    }

    const normalizedOrderEmail = normalizeEmail(customerEmail);

    // Strategy 1: Check if normalized email matches a user
    const normalizedMatch = users.find(
      (u: any) => u.email && normalizeEmail(u.email) === normalizedOrderEmail
    );
    if (normalizedMatch) {
      console.log(`[Webhook Fuzzy] Normalized match: "${customerEmail}" → ${normalizedMatch.email}`);
      return normalizedMatch.email.toLowerCase();
    }

    // Strategy 2: Name-based matching
    if (customerName && customerName.trim().length >= 3) {
      const nameParts = customerName.trim().toLowerCase().split(/\s+/);
      if (nameParts.length >= 2) {
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        const patterns = [
          `${firstName}.${lastName}`,
          `${firstName}${lastName}`,
          `${firstName[0]}${lastName}`,
          `${lastName}.${firstName}`,
        ];

        for (const pattern of patterns) {
          const match = users.find((u: any) => {
            if (!u.email) return false;
            const emailLocal = u.email.toLowerCase().split("@")[0];
            return emailLocal === pattern || emailLocal.includes(pattern);
          });
          if (match) {
            console.log(`[Webhook Fuzzy] Name pattern match: "${customerName}" → ${match.email} (pattern: ${pattern})`);
            return match.email.toLowerCase();
          }
        }
      }
    }

    // Strategy 3: Full name metadata match
    if (customerName && customerName.trim().length >= 3) {
      const nameMatch = users.find((u: any) => {
        const meta = u.user_metadata;
        if (!meta?.full_name) return false;
        return meta.full_name.toLowerCase().trim() === customerName.toLowerCase().trim();
      });
      if (nameMatch) {
        console.log(`[Webhook Fuzzy] Metadata name match: "${customerName}" → ${nameMatch.email}`);
        return nameMatch.email.toLowerCase();
      }
    }

    return null;
  } catch (err: any) {
    console.error("[Webhook Fuzzy] Error:", err.message);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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
    const rawEmail = order.email || order.contact_email || "";
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

    // Determine the best email to store:
    // 1. First normalize the checkout email (fix missing .com)
    // 2. Then try fuzzy matching to find the actual site account
    let resolvedEmail = normalizeEmail(rawEmail);

    const matchedAccountEmail = await fuzzyMatchAccount(
      supabase,
      customerName,
      rawEmail
    );

    if (matchedAccountEmail) {
      // Use the matched account email so the order shows up in their dashboard
      resolvedEmail = matchedAccountEmail;
    }

    // Build order record
    const orderRecord: any = {
      shopify_order_id: order.id.toString(),
      order_number: order.order_number?.toString() || order.name || "",
      customer_email: resolvedEmail,
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
    const { error } = await supabase
      .from("customer_orders")
      .upsert(orderRecord, { onConflict: "shopify_order_id" });

    if (error) {
      console.error("Failed to save order:", error);
      return res.status(500).json({ error: "Failed to save order", details: error.message });
    }

    console.log(`Order ${orderRecord.order_number} saved for ${resolvedEmail} (original: ${rawEmail})`);
    return res.status(200).json({ success: true, order_number: orderRecord.order_number });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
}
