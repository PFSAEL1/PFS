# ABC Filter Splash - Architecture Analysis

## Auth System
The project has TWO auth systems:
1. **Manus OAuth** (server-side) — used for the main app session via `/api/oauth/callback`, stores users in MySQL via drizzle. This is the "real" auth for the deployed Vercel app.
2. **Supabase** (client-side) — used in the Auth.tsx page, Dashboard, ProtectedRoute, NewBoothModal, and membership hooks. This connects to project `reiuenraycfonsrdrjgg`.

The client-side pages (Auth, Dashboard, ProtectedRoute) use Supabase auth. The server-side uses Manus OAuth.

## Key Files
- `client/src/lib/shopify.ts` — Storefront API (domain: abc-filter-splash-rwyxj.myshopify.com, token: 5e357a0ae8e9906edb44ef570a4ed219)
- `client/src/lib/supabase.ts` — Supabase client (project: reiuenraycfonsrdrjgg, needs env vars)
- `client/src/pages/Auth.tsx` — Login/signup with Supabase
- `client/src/pages/Dashboard.tsx` — Customer dashboard (membership, profile, quick shop)
- `client/src/components/NewBoothModal.tsx` — Booth setup form (4 tabs: Customer & Booth, Filter Positions, Ship-To, Contact & Schedule)
- `client/src/hooks/useMembership.ts` — Fetches membership tier from Supabase
- `client/src/pages/ProductDetail.tsx` — Product page with Add to Cart
- `client/src/stores/cartStore.ts` — Zustand cart with Shopify checkout

## What Needs Building
1. **Subscribe & Save** — Add `sellingPlanGroups` to the product query, build UI selector
2. **Booth Profile in Dashboard** — Show booth setup, filter counts per position
3. **Past Orders** — Need Shopify Customer API (requires admin token on server-side)
4. **Membership Pricing** — Already partially built (useMembership hook has discount %), need to show adjusted prices in shop/product pages
5. **Fix Login** — The Supabase auth needs proper env vars configured in Vercel

## Shopify API Version
Currently using `2024-01`. Selling plans require at least `2023-07`.
