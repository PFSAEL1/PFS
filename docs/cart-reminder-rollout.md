# PFS Filters — one-time cart reminder rollout

**Status: draft implementation, deliberately off.** Do not turn on either feature flag or email sending until all checks below pass. This is separate from Shopify's already-active abandoned-checkout automation. The PFS headless cart otherwise lives only in the visitor's browser and has no pre-checkout email address.

## Intended behavior

- Optional guest email field and **unchecked** consent in the cart. Checkout still works without opting in.
- One email for a consented cart, at the first daily run **at least 24 hours** after its last item/quantity/plan change. On a once-daily Vercel schedule, delivery may be roughly 24–48 hours after inactivity, and is not guaranteed at an exact hour.
- A checkout-start or cleared cart cancels PFS's pending reminder; Shopify's existing abandoned-checkout automation can then take over. A single email per address is reserved for 14 days, preventing concurrent/double sends.
- Secure, purpose-specific links: one to restore current Shopify-priced available items, the other to opt out. Email addresses are encrypted at rest. Cart details are deleted after 60 days; minimal keyed suppression fingerprints and old unsubscribe-link mappings remain to honor opt-outs.
- The server refuses new opt-ins unless database, sender, secret, and the explicit server flag are present; the cart UI is separately hidden behind a compile-time flag.

## Required before activation

1. **Domain:** The owner or DNS manager must add the exact records currently displayed by Resend for the pending `updates.pfsfilters.com` domain and wait for **Verified** status. The authoritative DNS nameservers for `pfsfilters.com` are GoDaddy `domaincontrol.com`; no GoDaddy session/authority has been provided. Preserve the existing root MX and `orders@pfsfilters.com` inbox. Do not invent DNS record values from this document.
2. **Sender:** Create a restricted Resend sending API key in the owner's account, place it only in the Vercel project secret `RESEND_API_KEY`, and verify a test message to an owner-controlled mailbox before enabling any shopper email. Never put it in source, chat, or a public `VITE_` variable. The account was created, but a key is not connected. Ensure the sending address `cart@updates.pfsfilters.com` is permitted and reply-to remains `orders@pfsfilters.com`.
3. **Database:** Review/apply `supabase/migrations/20261002_cart_reminders.sql` to the verified PFS Supabase project `prdyxyxvtjnamyggdjlx`; check only schema/permissions, not customer records. Confirm service-role-only tables, atomic per-cart/per-email claim, suppression, and rate-limit RPC. Supply Vercel's existing `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` privately.
4. **Orders and checkout suppression:** A read-only `limit=0` schema probe confirmed the production `customer_orders` columns `id`, `customer_email`, `created_at`, `order_date`, `customer_name`, and `subtotal_price`; no records were read. The connected Shopify app currently reports **zero ORDERS_CREATE subscriptions**; a working, HMAC-verified order signal is needed to catch purchases outside this browser's checkout path. The current webhook code accepts a missing HMAC and expects columns not declared in its tracked base migration; do not assume it is safe or operating. Fix and test before enabling email.
5. **Abuse protection:** The current endpoint has explicit consent, honeypot, keyed per-IP daily limits, an email cap, request-size limit, and server-verified Shopify variants. A spoofable Origin header is **not** authentication. Add and validate a first-party bot challenge or comparable edge protection and delivery monitoring before opening guest email submission on the public site.
6. **Secrets and flags:** Set a unique random `CART_REMINDER_SECRET` of at least 32 characters (server only) and a distinct `CRON_SECRET` for Vercel's protected cron endpoints. The cart secret also derives AES encryption and link signatures; rotating it without first draining old records invalidates old messages/links. Keep `CART_REMINDER_ENABLED` unset/false and `VITE_CART_REMINDERS_ENABLED` unset/false until the complete preflight passes. When ready, configure both flags as `true` and deploy a fresh build (the client flag is compiled into JS). Never enable only one flag.
7. **Functional QA:** From an owner-controlled test inbox, verify unchecked consent sends no request; explicit opt-in stores a private record; the cart edits update eligibility; clearing/checking out prevents PFS's reminder; a mocked 24-hour-old cart produces **one** message, not two under concurrent crons; a genuine order suppresses it; unsubscribe persists after cart deletion; recovery restores only available Shopify-priced items. Never test with a real customer's address, submit a paid order, or run the production sender manually on unreviewed customer records.
8. **Operations:** Set an alert for a failed daily sender/retention cron, pending-cart backlog, rejected/complaint messages, and records remaining in `claimed`/`failed`. The sender currently processes up to 25 old carts per invocation; check projected volume and increase capacity or use a worker/queue if necessary. Vercel cron execution is best-effort and does not retry automatically. The 60-day retention job is separate from sending, so mail-provider outages cannot indefinitely retain cart details.

## Verified local development checks

- `pnpm check`, `pnpm test`, `pnpm build`, and `git diff --check` on the isolated branch.
- Desktop Chromium and iPhone WebKit tested the **local-only flagged build** with mocked opt-in/cancel APIs: consent begins unchecked, entering an email alone sends nothing, explicit opt-in sends only Shopify IDs/quantity, and unchecking cancels it. No email was sent.
- Desktop/iPhone signed-link simulation restored a public Shopify product at the current catalog price and removed the URL fragment. This is **not** an end-to-end mail/DNS test.

## Reference

- [Shopify abandoned checkouts](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/abandoned-checkouts)
- [Resend domain/subdomain recommendation](https://resend.com/docs/knowledge-base/is-it-better-to-send-emails-from-a-subdomain-or-the-root-domain)
- [Vercel cron limits](https://vercel.com/docs/cron-jobs/usage-and-pricing)
