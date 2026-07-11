-- Booth Setups table: stores customer booth configurations
CREATE TABLE IF NOT EXISTS booth_setups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  booth_manufacturer TEXT NOT NULL DEFAULT '',
  booth_model TEXT NOT NULL DEFAULT '',
  notes TEXT DEFAULT '',
  auto_reorder BOOLEAN DEFAULT false,
  change_interval_days INTEGER DEFAULT 90,
  last_filter_change TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Filter Positions table: stores individual filter positions within a booth
CREATE TABLE IF NOT EXISTS filter_positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booth_id UUID NOT NULL REFERENCES booth_setups(id) ON DELETE CASCADE,
  position_number INTEGER NOT NULL DEFAULT 1,
  position_type TEXT NOT NULL DEFAULT 'exhaust',
  dimensions TEXT DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 1,
  shopify_product_id TEXT,
  shopify_product_title TEXT,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer Orders table: cached/synced from Shopify for quick dashboard display
CREATE TABLE IF NOT EXISTS customer_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  order_number TEXT NOT NULL,
  shopify_order_id TEXT UNIQUE,
  total_price TEXT NOT NULL DEFAULT '0.00',
  currency TEXT DEFAULT 'USD',
  financial_status TEXT DEFAULT 'pending',
  fulfillment_status TEXT DEFAULT 'unfulfilled',
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Memberships table: tracks customer membership tiers
CREATE TABLE IF NOT EXISTS memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tier TEXT NOT NULL DEFAULT 'bronze',
  status TEXT NOT NULL DEFAULT 'active',
  discount_code TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_booth_setups_email ON booth_setups(customer_email);
CREATE INDEX IF NOT EXISTS idx_filter_positions_booth ON filter_positions(booth_id);
CREATE INDEX IF NOT EXISTS idx_customer_orders_email ON customer_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON memberships(user_id);

-- Row Level Security
ALTER TABLE booth_setups ENABLE ROW LEVEL SECURITY;
ALTER TABLE filter_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policies: users can only see their own data
CREATE POLICY "Users can view own booths" ON booth_setups
  FOR SELECT USING (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can insert own booths" ON booth_setups
  FOR INSERT WITH CHECK (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update own booths" ON booth_setups
  FOR UPDATE USING (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can delete own booths" ON booth_setups
  FOR DELETE USING (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can view own filter positions" ON filter_positions
  FOR SELECT USING (
    booth_id IN (SELECT id FROM booth_setups WHERE customer_email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Users can insert own filter positions" ON filter_positions
  FOR INSERT WITH CHECK (
    booth_id IN (SELECT id FROM booth_setups WHERE customer_email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Users can update own filter positions" ON filter_positions
  FOR UPDATE USING (
    booth_id IN (SELECT id FROM booth_setups WHERE customer_email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Users can delete own filter positions" ON filter_positions
  FOR DELETE USING (
    booth_id IN (SELECT id FROM booth_setups WHERE customer_email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Users can view own orders" ON customer_orders
  FOR SELECT USING (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can view own membership" ON memberships
  FOR SELECT USING (user_id = auth.uid());
