-- Add linked_email column for fuzzy-matched order linking
ALTER TABLE customer_orders ADD COLUMN IF NOT EXISTS linked_email TEXT;

-- Index for faster lookups by linked_email
CREATE INDEX IF NOT EXISTS idx_customer_orders_linked_email ON customer_orders(linked_email);

-- Update RLS policy to allow users to see orders linked to their email
DROP POLICY IF EXISTS "Users can view own orders" ON customer_orders;
CREATE POLICY "Users can view own orders" ON customer_orders
  FOR SELECT USING (
    customer_email = auth.jwt() ->> 'email'
    OR linked_email = auth.jwt() ->> 'email'
  );
