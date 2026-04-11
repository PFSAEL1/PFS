# ABC Filters / PFS Filters — Project TODO

## Category Filtering & Headings (Session Apr 11, 2026)
- [x] Add `productType` and `tags` fields to Shopify Storefront API queries
- [x] Add `fetchProductsByCategory()` function with collection-based fetch + tag fallback
- [x] Add `CATEGORY_COLLECTION_MAP` and `CATEGORY_TAG_MAP` for slug-to-collection mapping
- [x] Create `CategoryPage.tsx` — dedicated page for each category slug with filtered products
- [x] Wire `/category/:slug` route to `CategoryPage` in `App.tsx` (was previously using `Shop`)
- [x] Update `ShopifyProducts` component to accept `categoryFilter` and `sizeFilter` props
- [x] Update `Shop.tsx` to read `?category=` and `?size=` query params and pass to `ShopifyProducts`
- [x] Replace all blue gradient/faded headings with Tesla-style clean white text + fade-up animation
- [x] Add global `pfs-heading-animate`, `pfs-sub-animate`, `pfs-grid-animate` CSS animation classes

## Domain (In Progress)
- [ ] Verify pfsfilters.com and www.pfsfilters.com both show Valid Configuration in Vercel

## Welcome Email Automation (Not Started)
- [ ] Set up Resend email service
- [ ] Create `send-welcome-email` Supabase Edge Function
- [ ] Wire into `NewBoothModal.tsx` on new booth save

## Shopify Draft Order Verification (Not Started)
- [ ] Test `shopify-draft-order` Supabase Edge Function with new Admin API token

## Previously Completed
- [x] Shopify Draft Order Invoice Email Liquid template installed in Shopify
- [x] Welcome email template built with real PFS logo
- [x] New Shopify Admin API token created and saved to Supabase
- [x] pfsfilters.com domain added to Vercel, DNS configured
