import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simple secret to prevent random access
  const secret = req.query.secret || req.headers["x-migration-secret"];
  if (secret !== "pfs-migrate-2024") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: "Missing Supabase config" });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const results: string[] = [];

  try {
    // Step 1: Add linked_email column (using raw SQL via rpc if available, otherwise use a workaround)
    // Since we can't run DDL via PostgREST, we'll try to insert/update with the column
    // If the column doesn't exist, we'll use a different approach

    // First, let's try to read the table to check if linked_email exists
    const { data: testData, error: testError } = await supabase
      .from("customer_orders")
      .select("linked_email")
      .limit(1);

    if (testError && testError.message.includes("does not exist")) {
      // Column doesn't exist - we need to add it via SQL
      // Try using the Supabase Management API or pg_net extension
      const { error: rpcError } = await supabase.rpc("exec_sql", {
        sql: "ALTER TABLE customer_orders ADD COLUMN IF NOT EXISTS linked_email TEXT; CREATE INDEX IF NOT EXISTS idx_customer_orders_linked_email ON customer_orders(linked_email);"
      });

      if (rpcError) {
        // RPC doesn't exist either - try raw SQL via the pg endpoint
        results.push(`Column add via RPC failed: ${rpcError.message}`);
        
        // Alternative: use the REST API to call a function we create
        // For now, report that manual intervention is needed for DDL
        results.push("MANUAL_DDL_NEEDED: Run 'ALTER TABLE customer_orders ADD COLUMN IF NOT EXISTS linked_email TEXT;' in SQL Editor");
      } else {
        results.push("Column linked_email added successfully");
      }
    } else if (!testError) {
      results.push("Column linked_email already exists");
    } else {
      results.push(`Test query error: ${testError.message}`);
    }

    // Step 2: Try to update order #1018 with linked_email (if column exists)
    const { error: updateError } = await supabase
      .from("customer_orders")
      .update({ linked_email: "ryan.fevold@colemanelectricalservice.com" })
      .eq("order_number", "1018");

    if (updateError) {
      results.push(`Order #1018 update failed: ${updateError.message}`);
    } else {
      results.push("Order #1018 linked to ryan.fevold@colemanelectricalservice.com");
    }

    // Step 3: Also update the RLS policy (needs DDL - report if needed)
    results.push("NOTE: RLS policy update requires DDL. Current workaround: Dashboard queries use service role or .or() filter");

    // Step 4: List all orders to show current state
    const { data: orders, error: ordersError } = await supabase
      .from("customer_orders")
      .select("order_number, customer_email, customer_name, linked_email")
      .order("order_date", { ascending: false })
      .limit(10);

    if (orders) {
      results.push(`Current orders: ${JSON.stringify(orders, null, 2)}`);
    }

    return res.status(200).json({ success: true, results });
  } catch (err: any) {
    return res.status(500).json({ error: err.message, results });
  }
}
