# PFS Website — Page Template Reference

## Template #1 — Industrial Pages
**Used for:** All industry-type pages (Aerospace, Aircraft, Truck Booths, and any other industry vertical)
**Reference page:** Aerospace page (locked as canonical Template #1)

### Required Sections (in order)
1. Hero section (full-bleed image, headline, subhead, CTA buttons)
2. Certification/compliance carousel (untouched — do NOT modify)
3. Product/feature highlights
4. Specs / sizes section
5. Gallery
6. CTA section
7. **TrustedBy logo strip** (Stripe-style, white background, real colored logos) ← REQUIRED
8. Footer

### Notes
- When personalizing any industrial page with new pics/renders, use this template structure exactly.
- The TrustedBy component (`<TrustedBy />`) must always be present on Template #1 pages.

---

## Template #2 — Integration & Automation Pages
**Used for:** All integration and automation product pages
**Identical to Template #1 EXCEPT:** No TrustedBy logo strip

### Required Sections (in order)
1. Hero section
2. Certification/compliance carousel
3. Feature highlights
4. Specs / sizes section
5. Gallery
6. CTA section — **CTA text: "Talk to an Engineer"** (not "Get Pricing")
7. Footer

### Notes
- No `<TrustedBy />` component on Template #2 pages.
- CTA is always "Talk to an Engineer" on automation pages.

---

## Template #3 — All Other Products
**Used for:** Enclosed paint booths, powder coating systems, open face booths, prep stations, mixing rooms, parts booths, and all non-industrial/non-automation products

### Required Sections (in order)
1. Hero section
2. Certification/compliance carousel
3. Feature highlights
4. Specs / sizes section (airflow diagram here if applicable — see below)
5. Gallery
6. CTA section — **CTA text: "Get Pricing"**
7. Footer

### Airflow Diagram Rule
- **Animated airflow diagram:** ONLY on enclosed paint booth pages (cross-flow, semi-downdraft, downdraft, heated variants)
- **NOT on:** Open face booths, prep stations, mixing rooms, powder coating systems, parts booths

### Notes
- No `<TrustedBy />` component on Template #3 pages.
- CTA is always "Get Pricing" on Template #3 pages.

---

## Paint Booths Section — Product Cards
The paint booths hub page must include the following product cards:
1. Cross-Flow Paint Booths
2. Semi-Downdraft Paint Booths
3. Downdraft Paint Booths
4. Heated Paint Booths
5. Aircraft Paint Booths
6. **Parts Booths** ← NEW — small parts spray booths (to be added)

---

## Semi-Downdraft Airflow Pattern (from hand sketch)
Air enters from the **top-left** (ceiling/upper wall intake plenum), flows **downward** inside the booth,
travels **horizontally along the floor** toward the right wall,
enters a **side exhaust plenum** on the right wall, travels **upward** through the plenum,
exits through the **top of the right-side exhaust stack** above the booth.

Component: `<SemiDowndraftDiagram />` — animated SVG, interactive (movable/pannable like CrossFlowDiagram)
