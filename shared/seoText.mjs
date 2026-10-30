/**
 * Shared document titles, descriptions, canonicals, and merchant-listing facts.
 * Titles are keyword-led and at most 60 characters.
 * Descriptions are 140–160 characters.
 * Shipping rate and transit time are not published, so they are not invented.
 */

export const REVALIDATE_SECONDS = 86400;
export const BRAND_SUFFIX = ' | PFS Filters';

export const CANONICAL_OVERRIDES = {
  '/accudraft-paint-booth-filters': '/shop-by-booth/accudraft',
  '/shop-by-booth/global-finishing-solutions': '/gfs-paint-booth-filters',
  '/shop-by-type': '/shop-by-filter-type',
  '/shop-by-booth-type': '/shop-by-booth',
  '/filter-compatibility': '/filter-finder',
};

export const NOINDEX_PATHS = new Set([
  '/auth',
  '/thank-you',
  '/submit-review',
  '/dashboard',
  '/filter-database',
  '/shop-by-type',
  '/shop-by-booth-type',
  '/category/pre-filters',
  '/404',
]);

const PRODUCT_TITLES = {
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs': '22-Gram Fiberglass Arrestor Pads | PFS Filters',
  '20x20-paint-arrestor-holding-grids-w-tips-each': '20x20 Paint Arrestor Holding Grids | PFS Filters',
  '20x20-paint-pockets-paint-arrestor-30-cs': 'Paint Pockets Arrestor Media | PFS Filters',
  '20x100x2-22-gram-fiberglass-exhaust-roll-1-cs': '22-Gram Fiberglass Exhaust Rolls | PFS Filters',
  'pleated-air-filters-merv-10': 'Pleated MERV 10 Intake Filters | PFS Filters',
  '20x20x2-15-gram-fiberglass-paint-arrestor-pads-50-cs': '15-Gram Fiberglass Arrestor Pads | PFS Filters',
  '36x100-15-gram-fiberglass-paint-arrestor-roll-1-cs': '15-Gram Fiberglass Exhaust Rolls | PFS Filters',
  '300-series-tacky-filter-panel': '300 Series Tacky Intake Panels | PFS Filters',
  '5kr1-series-premium-intake': '5KR1 Series Premium Intake | PFS Filters',
  'aerospace-neshap-319-5-pocket-bag-filter-merv-14-15': 'Aerospace NESHAP 319 Filter Bags | PFS Filters',
  'ceiling-diffusion-media': 'Ceiling Diffusion Media | PFS Filters',
  'swiss-flow-downdraft-ceiling-diffusion-media-600g-ultra-premium': 'Swiss Flow 600G Ceiling Media | PFS Filters',
  'accordion-style-paint-arrestors': 'Andreae Accordion Paint Arrestors | PFS Filters',
  '23-25-x-47-x-8-6-pocket-bag-filter-4-cs': '6-Pocket Bag Filter 23.25x47x8 | PFS Filters',
  'silver-membership': 'Silver Membership | PFS Filters',
  'gold-membership': 'Gold Membership | PFS Filters',
  'bronze-membership': 'Bronze Membership | PFS Filters',
  'platinum-membership': 'Platinum Membership | PFS Filters',
  'pfs-vitra': 'PFS VITRA Booth Glass Coating | PFS Filters',
  'pfs-vanguard-complete-booth-protection-kit': 'PFS VANGUARD Booth Protection Kit | PFS Filters',
  'pfs-paint-booth-absorbent-mat-roll-32x50': 'PFS Absorbent Mat Roll 32x50 | PFS Filters',
  'koch-biomax-hepa-9999-23-375x23-375x11-5': 'Koch BioMAX HEPA 99.99% Filter | PFS Filters',
  'koch-spraystop-stk10-61x90-roll': 'Koch SprayStop STK-10 Roll | PFS Filters',
  'parker-loadtech-merv14-20x20x4-single-header-case-3': 'Parker LoadTECH MERV 14 20x20x4 | PFS Filters',
  'afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6': 'AFC Blue Poly Exhaust Cube 20x20 | PFS Filters',
};

const BLOG_TITLES = {
  'how-often-change-paint-booth-filters': 'How Often to Change Booth Filters | PFS Filters',
  'fiberglass-vs-tacky-panel-filters': 'Fiberglass vs Tacky Panel Filters | PFS Filters',
  'paint-booth-maintenance-checklist': 'Paint Booth Filter Maintenance | PFS Filters',
  'aerospace-paint-booth-compliance-method-319': 'EPA Method 319 Filter Guide | PFS Filters',
  'booth-filter-replacement-intervals': 'Booth Filter Change Intervals | PFS Filters',
  'clogged-paint-booth-filters': 'What Clogged Booth Filters Do | PFS Filters',
  'how-to-choose-booth-filters': 'How to Choose Booth Filters | PFS Filters',
  'booth-filter-maintenance-checklist': 'Booth Filter Maintenance List | PFS Filters',
};

export const filterRotationFaqs = [
  {
    question: 'How does the PFS Filter Rotation Program work?',
    answer: 'PFS reviews the booth model, the filter stages in use, and how heavily the booth is sprayed. From that, a replacement cadence is set, media ships on that cadence, and the change can be lined up with a maintenance visit.',
  },
  {
    question: 'What do shops get from a filter rotation schedule?',
    answer: 'Media arrives before the bank is packed solid, which keeps a busy week from being spent on a rush order. A shop with several booths can keep every stage on one schedule and one point of contact. The price is quoted for the media you actually use.',
  },
  {
    question: 'Is filter rotation the same as Subscribe and Save?',
    answer: 'No. Subscribe and Save is the monthly option shown on eligible product pages in the shop. The rotation program is a scheduled supply for the stages on your booth, arranged with PFS. They are separate.',
  },
  {
    question: 'What should I send to start the program?',
    answer: 'Send the booth make and model, each filter position, the measured size, about how long a set lasts today, and a clear photo of the installed media. PFS will confirm the media before the first shipment.',
  },
  {
    question: 'Where are PFS booth filter types described?',
    answer: 'The booth manufacturer lists exhaust, intake, ceiling, paint-arrest, carbon, and OEM kit types at https://pfsspraybooths.com/parts/filters/. This store ships the replacement media and can quote a rotation schedule.',
  },
];

export function breadcrumbNodes(path, leafName) {
  const normalized = path === '/' ? '/' : String(path || '/').replace(/\/$/, '');
  if (normalized === '/') return [];
  const items = [{ name: 'Home', path: '/' }];
  if (normalized.startsWith('/product/')) items.push({ name: 'Shop', path: '/shop' });
  else if (normalized.startsWith('/category/')) items.push({ name: 'Filter Types', path: '/shop-by-filter-type' });
  else if (normalized.startsWith('/shop-by-booth/')) items.push({ name: 'Booth Brands', path: '/shop-by-booth' });
  else if (normalized.startsWith('/blog/')) items.push({ name: 'Guides', path: '/blog' });
  else if (normalized.startsWith('/california/')) items.push({ name: 'California', path: '/california/north-bay-paint-booth-filters' });
  else if (normalized.startsWith('/industries/')) items.push({ name: 'Paint Booth Filters', path: '/paint-booth-filters' });
  else if (normalized.startsWith('/consumables/')) items.push({ name: 'Consumables', path: '/consumables' });
  else if (normalized.startsWith('/filter-part-numbers')) items.push({ name: 'Shop', path: '/shop' });
  items.push({ name: leafName || 'PFS Filters', path: normalized });
  return items;
}

export const ROUTE_SEO = {
  '/': {
    title: 'Paint Booth Filters for Every Booth Brand | PFS Filters',
    description: 'Paint booth filters for exhaust, intake, ceiling, and prefilter stages. PFS Filters in Santa Rosa ships stocked media, typically processed in 1–2 business days.',
  },
  '/shop': {
    title: 'Shop Paint Booth Filters & Media | PFS Filters',
    description: 'Shop paint booth filters: fiberglass arrestors, tacky panels, ceiling media, MERV 10 pleats, and rolls. Confirm the stage and dimensions before ordering.',
  },
  '/paint-booth-filters': {
    title: 'Paint Booth Filters by Stage | PFS Filters',
    description: 'Paint booth filters for intake, ceiling, prefilter, and exhaust stages. Compare catalog media by position, then confirm the booth model and actual size.',
  },
  '/andreae-paint-booth-filters': {
    title: 'Andreae Paint Booth Filters | PFS Filters',
    description: 'Andreae accordion paint booth filters in the catalog: AF213, AF223, AF413, AF423 pads and AF813, AF923, AF113, AF123 rolls. Confirm the frame size.',
  },
  '/exhaust-filters': {
    title: 'Paint Booth Exhaust Filters | PFS Filters',
    description: 'Exhaust filters for paint booths: 15- and 22-gram fiberglass pads and rolls, Paint Pockets, and Andreae accordion media. Confirm the frame size first.',
  },
  '/intake-filters': {
    title: 'Paint Booth Intake Filters | PFS Filters',
    description: 'Intake filters for paint booths include 300 Series tacky panels, 5KR1 panels, MERV 10 pleats, and pocket bags. Confirm the inlet stage and size.',
  },
  '/ceiling-filters': {
    title: 'Paint Booth Ceiling Filters | PFS Filters',
    description: 'Ceiling filters for downdraft paint booths: L560 diffusion media and Swiss Flow 600G blankets in the sizes listed on each product page. Measure the grid.',
  },
  '/prefilters': {
    title: 'Paint Booth Prefilters Guide | PFS Filters',
    description: 'Paint booth prefilters are first-stage media used only where the booth calls for them. The catalog has no separate pre-filter collection; confirm the stage.',
  },
  '/neshap-compliant-paint-booth-filters': {
    title: 'NESHAP 6H Paint Booth Filters | PFS Filters',
    description: 'NESHAP 6H paint booth filter guide for Subpart HHHHHH and Method 319. A filter alone does not make a facility compliant. Review the catalog media.',
  },
  '/garmat-paint-booth-filters': {
    title: 'Garmat Paint Booth Filters | PFS Filters',
    description: 'Garmat paint booth filters: review model, stage, and dimensions, then match intake, ceiling, or exhaust media in the PFS catalog before ordering.',
  },
  '/accudraft-paint-booth-filters': {
    title: 'Accudraft Filter Stage Guide | PFS Filters',
    description: 'Accudraft filter stage notes for Titan, Italia, MX, and prep models. The booth-brand guide is the canonical page. Confirm the installed filter before ordering.',
  },
  '/gfs-paint-booth-filters': {
    title: 'GFS Paint Booth Filters | PFS Filters',
    description: 'GFS paint booth filters for Global Finishing Solutions booths. Confirm the model, filter position, and measured size, then compare current catalog media.',
  },
  '/col-met-paint-booth-filters': {
    title: 'Col-Met Paint Booth Filters | PFS Filters',
    description: 'Col-Met paint booth filters and prep-station guidance. Confirm the model, stage, and dimensions, then review intake, ceiling, and exhaust catalog media.',
  },
  '/pfs-spray-booth-filters': {
    title: 'PFS Spray Booth Filters | PFS Filters',
    description: 'PFS spray booth filters from the same Santa Rosa team that builds the booths. Send the model, serial or tag, stage, and dimensions for a fitment review.',
  },
  '/california/north-bay-paint-booth-filters': {
    title: 'North Bay Paint Booth Filters | PFS Filters',
    description: 'North Bay paint booth filters from PFS Filters in Santa Rosa for Sonoma County, Marin, and Petaluma shops. Confirm stage and dimensions before ordering.',
  },
  '/california/bay-area-paint-booth-filters': {
    title: 'Bay Area Paint Booth Filters | PFS Filters',
    description: 'Bay Area paint booth filters for San Jose, the Peninsula, and the East Bay. Order from the PFS catalog and confirm the booth stage and actual size.',
  },
  '/california/sacramento-paint-booth-filters': {
    title: 'Sacramento Paint Booth Filters | PFS Filters',
    description: 'Sacramento paint booth filters for Capital Region fleet and refinish shops. Browse the PFS catalog, then confirm the booth model, stage, and dimensions.',
  },
  '/california/carb-paint-booth-filter-compliance': {
    title: 'California Paint Booth Filter Rules | PFS Filters',
    description: 'California paint booth filter guide covering how permits, air districts, and product records relate to filter selection. A filter alone is not compliance.',
  },
  '/california/napa-valley-paint-booth-filters': {
    title: 'Napa Valley Paint Booth Filters | PFS Filters',
    description: 'Napa Valley paint booth filters for winery, agricultural, and collision finishing. Confirm the booth stage and measured size before ordering from PFS.',
  },
  '/california/central-valley-paint-booth-filters': {
    title: 'Central Valley Paint Booth Filters | PFS Filters',
    description: 'Central Valley paint booth filters for Fresno agricultural, trucking, and industrial shops. Confirm the filter stage and dimensions before you order.',
  },
  '/california/bakersfield-paint-booth-filters': {
    title: 'Bakersfield Paint Booth Filters | PFS Filters',
    description: 'Bakersfield paint booth filters for Kern County energy, fleet, and collision work. Review catalog media, then confirm the stage and actual dimensions.',
  },
  '/california/san-diego-paint-booth-filters': {
    title: 'San Diego Paint Booth Filters | PFS Filters',
    description: 'San Diego paint booth filters for aerospace, marine, and automotive finishing. Confirm the booth model, filter stage, and measured size before ordering.',
  },
  '/california/los-angeles-paint-booth-filters': {
    title: 'Los Angeles Paint Booth Filters | PFS Filters',
    description: 'Los Angeles paint booth filters for collision, fleet, and fabrication shops. Browse the PFS catalog and confirm the stage and dimensions before ordering.',
  },
  '/filter-finder': {
    title: 'Paint Booth Filter Finder | PFS Filters',
    description: 'Paint booth filter finder by airflow, brand, model, stage, and size. Use it to narrow catalog options, then verify the installed filter before ordering.',
  },
  '/shop-by-size': {
    title: 'Paint Booth Filters by Size | PFS Filters',
    description: 'Paint booth filters by size, including 20x20, 20x25, and 24x24 variants plus rolls and blankets. Sizes not listed need a PFS fitment review before ordering.',
  },
  '/shop-by-type': {
    title: 'Filters by Booth Position | PFS Filters',
    description: 'Filters by booth position point to the same type index as the filter-type page. Use intake, exhaust, ceiling, and roll links, then confirm the installed stage.',
    noindex: true,
    canonical: '/shop-by-filter-type',
  },
  '/shop-by-filter-type': {
    title: 'Shop Paint Booth Filters by Type | PFS Filters',
    description: 'Shop paint booth filters by type: fiberglass arrestors, ceiling media, tacky panels, pleated filters, and rolls. Confirm the stage and size before ordering.',
  },
  '/shop-by-booth': {
    title: 'Paint Booth Filters by Brand | PFS Filters',
    description: 'Paint booth filters by brand for Accudraft, Garmat, GFS, Col-Met, and other booth makers. Confirm the model, stage, and dimensions before you order.',
  },
  '/shop-by-booth-type': {
    title: 'Filters by Booth Airflow Type | PFS Filters',
    description: 'Filters by booth airflow type illustrate downdraft, crossdraft, and prep layouts. Brand and model still decide the filter. Start from the booth-brand index.',
    noindex: true,
    canonical: '/shop-by-booth',
  },
  '/brands': {
    title: 'Paint Booth Filter Brands | PFS Filters',
    description: 'Paint booth filter brands in the PFS catalog, including media lines sold for intake and exhaust stages. Confirm the product record and dimensions before ordering.',
  },
  '/faq': {
    title: 'Paint Booth Filter FAQ | PFS Filters',
    description: 'Paint booth filter FAQ on sizing, intake versus exhaust, replacement signs, shipping, returns, and subscriptions. Answers use the current PFS catalog and policies.',
  },
  '/blog': {
    title: 'Paint Booth Filter Guides | PFS Filters',
    description: 'Paint booth filter guides on replacement timing, intake versus exhaust media, maintenance records, and EPA Method 319. Confirm the booth manual before you act.',
  },
  '/why-choose-us': {
    title: 'Why Shops Choose PFS Filters | PFS Filters',
    description: 'Why shops choose PFS Filters: catalog transparency, fitment review, and support from the PFS Spray Booths team at 1400 Airport Blvd in Santa Rosa, California.',
  },
  '/contact': {
    title: 'Contact PFS Filters | Filter Help',
    description: 'Contact PFS Filters at 855-496-7969 for paint booth filter fitment, bulk quotes, or a size that is not listed. Send the booth model, stage, and dimensions.',
  },
  '/returns': {
    title: 'Returns and Refunds Policy | PFS Filters',
    description: 'Returns of unopened packages are accepted within five business days. Refunds deduct shipping costs and a 25% restocking fee. Opened packages are not returnable.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | PFS Filters',
    description: 'Privacy policy for PFS Filters covering information collected for orders, accounts, and site use, and how that information is used to process paint booth filter orders.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | PFS Filters',
    description: 'Terms of service for PFS Filters orders, Subscribe and Save, shipping estimates, returns, and product guidance. Stocked orders typically process in 1–2 business days.',
  },
  '/memberships': {
    title: 'Paint Booth Filter Memberships | PFS Filters',
    description: 'Paint booth filter memberships from PFS Filters. Plan price, discount, and included tools are shown on this page. Confirm the current offer before you subscribe.',
  },
  '/filter-rotation-program': {
    title: 'PFS Filter Rotation Program | PFS Filters',
    description: 'The PFS Filter Rotation Program sets a booth filter cadence from your spray load and ships media on that schedule. Request a quote to enroll a shop or fleet.',
  },
  '/consumables': {
    title: 'Paint Booth Consumables | PFS Filters',
    description: 'Paint booth consumables from PFS Filters, including the absorbent mat roll, PFS VITRA glass coating, and the VANGUARD kit. Confirm the product page before ordering.',
  },
  '/consumables/pfs-vitra': {
    title: 'PFS VITRA Glass Shield Coating | PFS Filters',
    description: 'PFS VITRA is a washable glass shield coating for paint booth windows. Details and price are on the product page. Confirm the current listing before you order.',
  },
  '/consumables/pfs-vanguard': {
    title: 'PFS VANGUARD Booth Kit | PFS Filters',
    description: 'PFS VANGUARD is a booth protection kit with booth coating and glass shield coating. Review the product page for what is included and the current price.',
  },
  '/aerospace': {
    title: 'Aerospace Paint Booth Filters | PFS Filters',
    description: 'Aerospace paint booth filters in the catalog include NESHAP 319 panels and bags, HEPA-XFP bags, CG100 bags, and related media. Confirm the tested configuration.',
  },
  '/industries/aerospace-paint-booth-filters': {
    title: 'Aerospace MRO Paint Booth Filters | PFS Filters',
    description: 'Aerospace MRO paint booth filters and multi-stage exhaust notes. Method 319 evidence applies only to the tested media and installation, not every facility.',
  },
  '/industries/automotive-paint-booth-filters': {
    title: 'Automotive Paint Booth Filters | PFS Filters',
    description: 'Automotive paint booth filters for intake, ceiling, and exhaust stages. Confirm the booth make, model, filter position, and actual dimensions before ordering.',
  },
  '/filter-scanner': {
    title: 'Paint Booth Filter Photo Review | PFS Filters',
    description: 'Paint booth filter photo review can narrow catalog candidates. It does not prove fitment. Confirm the stage, label, and actual dimensions before you order.',
  },
  '/filter-part-numbers': {
    title: 'Filter Part Number Cross Reference | PFS Filters',
    description: 'Filter part number cross reference for SKUs and Andreae, Parker, Koch, and AFC numbers in the PFS catalog. fil-epp-2020-w is not in the current catalog.',
  },
  '/auth': {
    title: 'Sign In | PFS Filters',
    description: 'Sign in to a PFS Filters account to review orders and membership details. Account pages are not indexed. Call 855-496-7969 if you need help with an order.',
    noindex: true,
  },
  '/thank-you': {
    title: 'Thank You | PFS Filters',
    description: 'Thank you for contacting PFS Filters. This confirmation page is not indexed. Call 855-496-7969 if you need to add booth model, stage, or dimension details.',
    noindex: true,
  },
  '/submit-review': {
    title: 'Submit a Review | PFS Filters',
    description: 'Submit a review of PFS Filters. This form is not indexed, and unpublished reviews are not used as ratings on product pages. Call 855-496-7969 with order questions.',
    noindex: true,
  },
  '/dashboard': {
    title: 'Account Dashboard | PFS Filters',
    description: 'Account dashboard for PFS Filters memberships and orders. This page is not indexed. Call 855-496-7969 if you cannot access an order or subscription.',
    noindex: true,
  },
  '/filter-database': {
    title: 'Filter Database | PFS Filters',
    description: 'Internal filter database for PFS Filters account tools. This page is not indexed. Customers can browse the public catalog or call 855-496-7969 for fitment help.',
    noindex: true,
  },
  '/404': {
    title: 'Page Not Found | PFS Filters',
    description: 'Page not found on PFS Filters. Browse paint booth filters by type, size, or booth brand, or call 855-496-7969 so the team can review the filter you need.',
    noindex: true,
  },
};

const CATEGORY_SEO = {
  'fiberglass-arrestors': {
    title: 'Fiberglass Paint Arrestors | PFS Filters',
    description: 'Fiberglass paint arrestors in 15-gram and 22-gram pads and rolls. Sizes are listed on each product. Confirm the exhaust frame before ordering from PFS Filters.',
  },
  'tacky-panels': {
    title: 'Tacky Panel Intake Filters | PFS Filters',
    description: 'Tacky panel intake filters in the catalog include 300 Series and 5KR1 panels. Confirm the inlet opening and link or single-frame style before you order.',
  },
  'ceiling-blankets': {
    title: 'Ceiling Diffusion Media Filters | PFS Filters',
    description: 'Ceiling diffusion media filters for downdraft booths, including L560 and Swiss Flow 600G sizes listed on the product pages. Measure the ceiling grid first.',
  },
  'roll-media': {
    title: 'Paint Booth Roll Media | PFS Filters',
    description: 'Paint booth roll media in the catalog includes fiberglass exhaust rolls, Paint Pockets roll, and other listed widths. Confirm the stage and roll length first.',
  },
  'merv-filters': {
    title: 'MERV Rated Paint Booth Filters | PFS Filters',
    description: 'MERV rated paint booth filters in the catalog include MERV 10 pleats and a Parker LoadTECH MERV 14 cell. Confirm the required rating and housing size first.',
  },
  'polyester-media': {
    title: 'Polyester Paint Booth Media | PFS Filters',
    description: 'Polyester paint booth media in the catalog includes the AFC blue poly exhaust cube and Koch SprayStop STK-10 roll. Confirm the stage and dimensions first.',
  },
  'pre-filters': {
    title: 'Paint Booth Pre-Filter Guide | PFS Filters',
    description: 'Paint booth pre-filter guidance: this catalog has no products tagged as pre-filters. Use a documented intake stage only where the booth specifies it.',
    noindex: true,
  },
  'powder-booth-filters': {
    title: 'Powder Booth Filters | PFS Filters',
    description: 'Three-stage panels and pulse-jet cartridges for powder booths. None are stocked with prices or part numbers. Send the model and size to request a quote.',
  },
  'activated-carbon-media': {
    title: 'Activated Carbon VOC Media | PFS Filters',
    description: 'Activated carbon VOC media holds solvent vapor after a particulate filter. No prices or part numbers are listed. Request a quote with housing size and airflow.',
  },
  'paint-arrest-systems': {
    title: 'Paint Arrest Systems | PFS Filters',
    description: 'Paint arrest systems stack overspray media for heavy spray loads. Catalog arrestors are sold separately. Request a quote for a multi-stage exhaust set.',
  },
  'pfs-oem-replacement-kits': {
    title: 'PFS OEM Replacement Kits | PFS Filters',
    description: 'OEM replacement kits match intake, ceiling, and exhaust media to a PFS booth. Kits are quoted from the model and tag. No kit prices or part numbers are listed.',
  },
};

export function isBlockedProductHandle(handle = '') {
  return handle === 'test' || handle === 'platinum';
}

export function isMembershipHandle(handle = '') {
  return handle.endsWith('-membership');
}

export function productTitle(handle, fallbackTitle = '') {
  if (PRODUCT_TITLES[handle]) return PRODUCT_TITLES[handle];
  const stem = String(fallbackTitle)
    .replace(/\s+\|\s+PFS Filters$/i, '')
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  const full = `${stem}${BRAND_SUFFIX}`;
  if (full.length <= 60) return full;
  const max = 60 - BRAND_SUFFIX.length;
  let cut = stem.slice(0, max).replace(/\s+\S*$/, '').replace(/[,:\-]\s*$/, '').trim();
  if (cut.length < 12) cut = stem.slice(0, max).trim();
  return `${cut}${BRAND_SUFFIX}`;
}

export function blogTitle(slug, fallbackTitle = '') {
  if (BLOG_TITLES[slug]) return BLOG_TITLES[slug];
  return productTitle(slug, fallbackTitle);
}

export function brandGuideTitle(name, slug) {
  if (slug === 'global-finishing-solutions') return 'GFS Booth Model Filter Guide | PFS Filters';
  if (slug === 'accudraft') return 'Accudraft Paint Booth Filters | PFS Filters';
  if (slug === 'garmat-usa') return 'Garmat USA Booth Filter Guide | PFS Filters';
  if (slug === 'col-met') return 'Col-Met Booth Model Filters | PFS Filters';
  if (slug === 'pfs-spray-booths') return 'PFS Booth Model Filter Guide | PFS Filters';
  const options = [
    `${name} Paint Booth Filters | PFS Filters`,
    `${name} Booth Filters | PFS Filters`,
    `${name} Filters | PFS Filters`,
  ];
  return options.find((title) => title.length <= 60) || productTitle(slug, `${name} Filters`);
}

export function brandGuideDescription(name) {
  return fitDescription(
    `${name} paint booth filter guide. Review the models and stages listed here, then confirm the installed filter label and actual dimensions before ordering from PFS.`,
  );
}

export function categorySeo(slug) {
  return CATEGORY_SEO[slug] || null;
}

function stripMarkdown(value = '') {
  return String(value).replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();
}

export function fitDescription(input) {
  let text = stripMarkdown(input);
  const pads = [
    ' Confirm the current product page before ordering.',
    ' Call PFS Filters at 855-496-7969.',
  ];
  let padIndex = 0;
  while (text.length < 140 && padIndex < pads.length) {
    const pad = pads[padIndex];
    padIndex += 1;
    if (text.length + pad.length <= 160) text += pad;
    else text = `${text}${pad}`.slice(0, 160).replace(/\s+\S*$/, '').trim();
  }
  if (text.length > 160) {
    const sliced = text.slice(0, 160);
    const space = sliced.lastIndexOf(' ');
    text = (space >= 140 ? sliced.slice(0, space) : sliced).trim();
  }
  if (text.length < 140) {
    text = `${text} Santa Rosa, CA.`.replace(/\s+/g, ' ').trim();
  }
  if (text.length > 160) text = text.slice(0, 160).replace(/\s+\S*$/, '').trim();
  return text;
}

export function productDescription(title, description) {
  const clean = stripMarkdown(description);
  const lead = clean ? `${title}. ${clean}` : `Shop ${title} from PFS Filters.`;
  return fitDescription(lead);
}

export function merchantReturnPolicy() {
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 5,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/RestockingFees',
  };
}

export function offerShippingDetails() {
  return {
    '@type': 'OfferShippingDetails',
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'US',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 2,
        unitCode: 'DAY',
      },
    },
  };
}

export function resolveRouteSeo(path, extras = {}) {
  const normalized = path === '/' ? '/' : String(path || '/').replace(/\/$/, '');
  const preset = ROUTE_SEO[normalized];
  const handle = normalized.startsWith('/product/') ? normalized.slice('/product/'.length) : '';
  const blogSlug = normalized.startsWith('/blog/') ? normalized.slice('/blog/'.length) : '';
  const categorySlug = normalized.startsWith('/category/') ? normalized.slice('/category/'.length) : '';
  const brandSlug = normalized.startsWith('/shop-by-booth/') ? normalized.slice('/shop-by-booth/'.length) : '';

  let title = preset?.title || extras.title || 'PFS Filters';
  let description = preset?.description || extras.description || '';
  let noindex = Boolean(preset?.noindex || extras.noindex || NOINDEX_PATHS.has(normalized));
  let canonical = preset?.canonical || CANONICAL_OVERRIDES[normalized] || normalized;

  if (handle) {
    if (isBlockedProductHandle(handle) || isMembershipHandle(handle)) noindex = true;
    title = productTitle(handle, extras.productTitle || extras.title || handle);
    description = productDescription(extras.productTitle || title, extras.description || description);
  } else if (blogSlug && blogSlug !== '') {
    title = blogTitle(blogSlug, extras.title || blogSlug);
    description = fitDescription(extras.description || description);
  } else if (categorySlug) {
    const category = categorySeo(categorySlug);
    if (category) {
      title = category.title;
      description = fitDescription(category.description);
      if (category.noindex) noindex = true;
    } else {
      title = productTitle(categorySlug, extras.title || categorySlug);
      description = fitDescription(extras.description || description);
    }
  } else if (brandSlug) {
    title = brandGuideTitle(extras.brandName || brandSlug, brandSlug);
    description = brandGuideDescription(extras.brandName || brandSlug);
  } else if (!preset) {
    title = productTitle(normalized, extras.title || 'PFS Filters');
    description = fitDescription(extras.description || description || 'Paint booth filters from PFS Filters.');
  } else {
    description = fitDescription(description);
  }

  if (isBlockedProductHandle(handle)) noindex = true;

  return {
    path: normalized,
    title,
    description,
    noindex,
    canonical,
  };
}

export function assertSeoRecord(record) {
  const errors = [];
  if (!record.title || record.title.length > 60) {
    errors.push(`${record.path} title (${record.title?.length || 0}): ${record.title}`);
  }
  if (!record.description || record.description.length < 140 || record.description.length > 160) {
    errors.push(`${record.path} description (${record.description?.length || 0}): ${record.description}`);
  }
  return errors;
}
