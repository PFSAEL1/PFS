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
- [x] Verify pfsfilters.com and www.pfsfilters.com both show Valid Configuration in Vercel (site is live; Vercel recommends updating A record to 216.198.79.1 but old IP still works)

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

## Bug Fixes (Apr 11, 2026)
- [x] Fix WhyChooseUs page blue heading on live Vercel build (was old GitHub commit; pushed all heading fixes to GitHub)
- [x] Update all page titles/OG tags from "ABC Filters by PFS" to "PFS Filters" (iOS share sheet fix — pushed to GitHub/Vercel)

## Favicon & Social Preview (Apr 11, 2026)
- [x] Create favicon.ico and favicon.png from PFS logo
- [x] Create Apple touch icon (180x180) for iPhone home screen
- [x] Generate Open Graph preview image (1200x630) with PFS branding for rich link previews
- [x] Upload all assets to CDN and wire up meta tags in index.html

## Video Fix (Apr 11, 2026)
- [x] Remove play button / controls from hero video — should autoplay, loop, muted, no controls

## SEO Fixes (Apr 20, 2026)
- [x] Fix sitemap.xml — change all URLs from abcfilters.net to pfsfilters.com
- [x] Add category pages to sitemap (fiberglass-arrestors, tacky-panels, intake-filters, exhaust-filters, ceiling-blankets, roll-media)
- [x] Add lastmod dates to all sitemap entries
- [x] Fix robots.txt — change sitemap URL from abcfilters.net to pfsfilters.com
- [x] Add sameAs social links to Organization schema in structuredData.ts
- [x] Handle blog pages in sitemap (blog pages are fully built with real content — kept in sitemap)

## Content Updates (Apr 22, 2026)
- [x] Update phone number to 855-496-7969 across all files
- [x] Verify orders@pfsfilters.com email is correct across all files (was orders@abcfilters.net on main branch — fixed)
- [x] Fix WhyChooseUs blue gradient heading to clean white Tesla-style (fixed on main branch — was deploying old code)
