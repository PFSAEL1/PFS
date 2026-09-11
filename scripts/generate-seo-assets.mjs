#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'client', 'public');
const distDir = path.join(root, 'dist', 'public');
const productFile = path.join(root, 'client', 'src', 'data', 'shopifyProductSnapshot.json');
const faqFile = path.join(root, 'client', 'src', 'data', 'faqData.json');
const blogFile = path.join(root, 'client', 'src', 'lib', 'blogData.ts');
const brandsFile = path.join(root, 'client', 'src', 'data', 'boothBrands.ts');
const origin = 'https://www.pfsfilters.com';
const logoUrl = '/images/brands/pfs-logo-wide-420.webp';
const heroPosterMobile = '/media/pfs-hero-poster-mobile.webp';
const heroPosterDesktop = '/media/pfs-hero-poster-desktop.webp';
const heroPosterPreload = `<link rel="preload" as="image" href="${heroPosterMobile}" type="image/webp" media="(max-width: 767px)" fetchpriority="high" />`;
const logoPreload = `<link rel="preload" as="image" href="${logoUrl}" type="image/webp" fetchpriority="high" />`;
const today = new Date().toISOString().slice(0, 10);
const mode = process.argv[2] || '--source';
const shopProductThumbnails = {
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs': { src: '/images/shop-thumbnails/22-gram-fiberglass-pads.webp', width: 480 },
  '20x20-paint-arrestor-holding-grids-w-tips-each': { src: '/images/shop-thumbnails/holding-grid.webp', width: 480 },
  '20x20-paint-pockets-paint-arrestor-30-cs': { src: '/images/shop-thumbnails/paint-pockets.webp', width: 480 },
  '20x100x2-22-gram-fiberglass-exhaust-roll-1-cs': { src: '/images/shop-thumbnails/22-gram-fiberglass-roll.webp', width: 480 },
  'pleated-air-filters-merv-10': { src: '/images/shop-thumbnails/merv-10-pleated-filter.jpg', width: 320 },
};

const products = JSON.parse(fs.readFileSync(productFile, 'utf8')).map((edge) => edge.node);
const faqs = JSON.parse(fs.readFileSync(faqFile, 'utf8'));
const blogSource = fs.readFileSync(blogFile, 'utf8');
const brandsSource = fs.readFileSync(brandsFile, 'utf8');

const escapeXml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const escapeHtml = (value = '') => escapeXml(value);
const stripMarkdown = (value = '') => String(value).replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();
const truncate = (value, length = 158) => {
  const clean = stripMarkdown(value);
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length - 1).replace(/\s+\S*$/, '')}…`;
};
const titleCase = (slug) => slug.split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : '').join(' ');
const absoluteUrl = (pathname) => pathname === '/' ? `${origin}/` : `${origin}${pathname}`;
const routeFile = (pathname) => pathname === '/'
  ? path.join(distDir, 'index.html')
  : path.join(distDir, `${pathname.replace(/^\//, '')}.html`);
const sizedImageUrl = (src, width) => {
  if (!src || !width) return src;
  try {
    const url = new URL(src);
    if (!url.hostname.includes('cdn.shopify.com')) return src;
    url.searchParams.set('width', String(width));
    return url.toString();
  } catch {
    return src;
  }
};
const shopifySrcset = (src, widths = [320, 480, 640]) => {
  if (!src) return '';
  try {
    const url = new URL(src);
    if (!url.hostname.includes('cdn.shopify.com')) return '';
  } catch {
    return '';
  }
  return widths.map((width) => `${sizedImageUrl(src, width)} ${width}w`).join(', ');
};
const shopProductCardImage = (product, width = 480) => {
  const localThumbnail = shopProductThumbnails[product.handle];
  const fallback = product.images?.edges?.[0]?.node?.url;
  return localThumbnail?.src || sizedImageUrl(fallback, width);
};
const shopProductCardSrcset = (product) => {
  const localThumbnail = shopProductThumbnails[product.handle];
  const fallback = product.images?.edges?.[0]?.node?.url;
  return localThumbnail ? `${localThumbnail.src} ${localThumbnail.width}w` : shopifySrcset(fallback);
};
const productMatchesCategory = (product, category) => {
  const normalizedCategory = category.toLowerCase();
  const tags = (product.tags || []).map((tag) => tag.toLowerCase());
  const type = (product.productType || '').toLowerCase();
  const title = product.title.toLowerCase();
  return (
    tags.some((tag) => tag.includes(normalizedCategory)) ||
    type.includes(normalizedCategory) ||
    title.includes(normalizedCategory)
  );
};
const firstAerospaceProduct = products.find((product) => productMatchesCategory(product, 'aerospace'));
const categoryTagMap = {
  'ceiling-blankets': ['ceiling', 'ceiling blanket', 'blanket'],
  'roll-media': ['roll', 'roll media', 'media roll'],
  'merv-filters': ['merv', 'merv-10', 'merv-13', 'merv10', 'merv13'],
};
const productMatchesCategorySlug = (product, categorySlug) => {
  const tags = (product.tags || []).map((tag) => tag.toLowerCase());
  const type = (product.productType || '').toLowerCase();
  const title = product.title.toLowerCase();
  const fields = [...tags, type, title];
  const terms = categoryTagMap[categorySlug] || [];
  return terms.some((term) => fields.some((field) => field.includes(term)));
};
const ceilingBlanketsProducts = products.filter((product) => productMatchesCategorySlug(product, 'ceiling-blankets'));
const firstCeilingBlanketsProduct = ceilingBlanketsProducts.find((product) => product.images?.edges?.[0]?.node?.url);
const rollMediaProducts = products.filter((product) => productMatchesCategorySlug(product, 'roll-media'));
const firstRollMediaProduct = rollMediaProducts.find((product) => product.images?.edges?.[0]?.node?.url);
const mervFilterProducts = products.filter((product) => productMatchesCategorySlug(product, 'merv-filters'));
const firstMervFilterProduct = mervFilterProducts.find((product) => product.images?.edges?.[0]?.node?.url);

function deferMainStylesheet(html) {
  return html.replace(
    /<link rel="stylesheet" crossorigin href="([^"]+)">/i,
    '<link rel="preload" as="style" crossorigin href="$1">\n    <link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'">\n    <noscript><link rel="stylesheet" crossorigin href="$1"></noscript>',
  );
}

const blogPosts = [];
const blogPattern = /\{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",[\s\S]*?date:\s*"([^"]+)"/g;
for (const match of blogSource.matchAll(blogPattern)) {
  blogPosts.push({ slug: match[1], title: match[2], excerpt: match[3], date: match[4] });
}

const brandSlugs = [...new Set([...brandsSource.matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1]))];

const categories = [
  { slug: 'fiberglass-arrestors', title: 'Fiberglass Paint Arrestors', description: 'Fiberglass exhaust filters and paint arrestor media for overspray capture in automotive and industrial spray booths.' },
  { slug: 'tacky-panels', title: 'Tacky Panel Filters', description: 'Adhesive-treated intake panels that capture dust before it reaches the spray area and fresh finishes.' },
  { slug: 'ceiling-blankets', title: 'Paint Booth Ceiling Filters', description: 'Ceiling diffusion media and intake blankets for clean, even airflow in downdraft and semi-downdraft booths.' },
  { slug: 'roll-media', title: 'Paint Booth Filter Roll Media', description: 'Fiberglass, polyester, and specialty roll media in widths and lengths for intake and exhaust applications.' },
  { slug: 'merv-filters', title: 'MERV-Rated Paint Booth Filters', description: 'MERV-rated pleated intake filters for air-makeup systems, spray booths, and industrial finishing operations.' },
  { slug: 'polyester-media', title: 'Polyester Filter Media', description: 'Synthetic polyester filter media for moisture-resistant intake, exhaust, and prefilter applications.' },
  { slug: 'pre-filters', title: 'Paint Booth Pre-Filters', description: 'First-stage prefilters that capture larger particles and help protect downstream ceiling or final filters.' },
];

const staticRoutes = [
  { path: '/', title: 'Paint Booth Filters, Media & Fitment Help | PFS Filters', description: 'Shop paint booth exhaust, intake, ceiling, prefilter, and accordion-style media with product data and fitment-review support from PFS Filters.', priority: '1.0', changefreq: 'weekly' },
  { path: '/shop', title: 'Shop Paint Booth Filters, Intake & Exhaust Media | PFS Filters', description: 'Shop fiberglass paint arrestors, tacky intake panels, ceiling media, MERV filters, roll media, and booth-specific replacements.', priority: '1.0', changefreq: 'daily' },
  { path: '/paint-booth-filters', title: 'Paint Booth Filters by Type, Size & Booth | PFS Filters', description: 'Browse paint booth intake, ceiling, prefilter, and exhaust media by type, size, and booth brand. Get sizing help and 5% Subscribe & Save on eligible products.', priority: '0.9', changefreq: 'monthly' },
  { path: '/andreae-paint-booth-filters', title: 'Andreae Paint Booth Filters — AF Pad & Roll Variants | PFS', description: 'Review current Andreae-style accordion paint arrestor variants, including AF213, AF223, AF413, AF423, AF813, AF923, AF113, and AF123.', priority: '0.9', changefreq: 'monthly' },
  { path: '/exhaust-filters', title: 'Paint Booth Exhaust Filters — Fiberglass, Paint Pockets & Andreae | PFS', description: 'Compare fiberglass paint arrestor pads and rolls, Paint Pockets, and Andreae-style accordion media. Check options and availability on each product page.', priority: '0.9', changefreq: 'weekly' },
  { path: '/intake-filters', title: 'Paint Booth Intake Filters — Tacky, Pleated & Ceiling Media | PFS', description: 'Compare tacky panels, ceiling diffusion media, MERV-rated pleated filters, and pocket bag filters. Verify the equipment stage and dimensions before ordering.', priority: '0.9', changefreq: 'weekly' },
  { path: '/ceiling-filters', title: 'Paint Booth Ceiling Filters — Downdraft Diffusion Media | PFS', description: 'Compare paint booth ceiling diffusion media and current size variants for applicable downdraft and semi-downdraft systems. Verify the grid before ordering.', priority: '0.9', changefreq: 'weekly' },
  { path: '/prefilters', title: 'Paint Booth Prefilters & First-Stage Filter Guidance | PFS', description: 'Learn where paint booth prefilters and first-stage media may be used, what details to verify, and when a multi-stage arrangement needs review.', priority: '0.7', changefreq: 'monthly' },
  { path: '/neshap-compliant-paint-booth-filters', title: 'NESHAP Paint Booth Filter Guide — Subpart 6H & Method 319 | PFS', description: 'Learn how EPA Subpart 6H and Method 319 relate to paint booth exhaust filtration, product evidence, and facility responsibilities.', priority: '0.8', changefreq: 'monthly' },
  { path: '/garmat-paint-booth-filters', title: 'Garmat Paint Booth Filter Guide | PFS Filters', description: 'Review model and filter-stage guidance for Garmat paint booths, then verify the installed filter label, construction, position, and dimensions before ordering.', priority: '0.8', changefreq: 'monthly' },
  { path: '/accudraft-paint-booth-filters', title: 'Accudraft Paint Booth Filter Guide | PFS Filters', description: 'Review filter-stage and model guidance for Accudraft paint booths, then verify the current filter label, position, and dimensions before ordering.', priority: '0.8', changefreq: 'monthly' },
  { path: '/gfs-paint-booth-filters', title: 'GFS Paint Booth Filter Guide | PFS Filters', description: 'Review filter-stage and model guidance for Global Finishing Solutions paint booths, then confirm the model, position, and dimensions before ordering.', priority: '0.8', changefreq: 'monthly' },
  { path: '/col-met-paint-booth-filters', title: 'Col-Met Paint Booth Filter Guide | PFS Filters', description: 'Review model and filter-stage guidance for Col-Met paint booths and prep stations. Verify installed media and dimensions before ordering.', priority: '0.8', changefreq: 'monthly' },
  { path: '/pfs-spray-booth-filters', title: 'PFS Spray Booth Replacement Filter Guide | PFS Filters', description: 'Find intake, ceiling, exhaust, and prefilter guidance for PFS Spray Booths. Send the model and serial details to PFS for fitment review.', priority: '0.9', changefreq: 'monthly' },
  { path: '/california/north-bay-paint-booth-filters', title: 'North Bay Paint Booth Filters | PFS Filters Santa Rosa', description: 'Paint booth filter ordering and fitment support for Santa Rosa, Petaluma, Sonoma County, Marin County, and the North Bay from PFS Filters.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/bay-area-paint-booth-filters', title: 'Bay Area Paint Booth Filters | San Jose & Peninsula', description: 'Paint booth filter selection and ordering support for San Jose, the Peninsula, East Bay, and greater San Francisco Bay Area finishing operations.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/sacramento-paint-booth-filters', title: 'Sacramento Paint Booth Filters | PFS Filters', description: 'Paint booth filter ordering and selection support for Sacramento, West Sacramento, Roseville, and Capital Region fleet and finishing operations.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/carb-paint-booth-filter-compliance', title: 'California Paint Booth Filter Compliance: CARB & Air Districts | PFS', description: 'Understand how CARB, California air districts, facility permits, and product documentation relate to paint booth filter selection and maintenance.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/napa-valley-paint-booth-filters', title: 'Napa Valley Paint Booth Filters | PFS Filters', description: 'Paint booth filter guidance for Napa Valley winery equipment, agricultural, collision, and facility refinishing operations.', priority: '0.7', changefreq: 'monthly' },
  { path: '/california/central-valley-paint-booth-filters', title: 'Central Valley Paint Booth Filters | Fresno & PFS', description: 'Paint booth filter support for Fresno and Central Valley agricultural, trucking, construction-equipment, and industrial finishing operations.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/bakersfield-paint-booth-filters', title: 'Bakersfield Paint Booth Filters | PFS Filters', description: 'Paint booth filter selection support for Bakersfield and Kern County energy-service, agricultural, fleet, truck, and collision operations.', priority: '0.7', changefreq: 'monthly' },
  { path: '/california/san-diego-paint-booth-filters', title: 'San Diego Paint Booth Filters | PFS Filters', description: 'Paint booth filter guidance for San Diego aerospace, defense, marine, automotive, and industrial finishing operations.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/los-angeles-paint-booth-filters', title: 'Los Angeles Paint Booth Filters | PFS Filters', description: 'Paint booth filter ordering and fitment support for Los Angeles County collision, fleet, fabrication, aerospace, and entertainment finishing work.', priority: '0.8', changefreq: 'monthly' },
  { path: '/filter-finder', title: 'Paint Booth Filter Finder by Booth, Stage & Size | PFS Filters', description: 'Narrow paint booth filter options by booth type, brand, model, filter stage, and size. Verify the product record and actual dimensions before ordering.', priority: '0.9', changefreq: 'monthly' },
  { path: '/shop-by-size', title: 'Shop Paint Booth Filters by Size | PFS Filters', description: 'Find common paint booth filter sizes and request help with custom or hard-to-find dimensions.', priority: '0.8', changefreq: 'weekly' },
  { path: '/shop-by-type', title: 'Shop Paint Booth Filters by Type | PFS Filters', description: 'Browse fiberglass arrestors, tacky panels, ceiling blankets, roll media, MERV filters, and prefilters.', priority: '0.8', changefreq: 'weekly' },
  { path: '/shop-by-filter-type', title: 'Paint Booth Filter Types: Intake, Exhaust & Ceiling | PFS', description: 'Compare paint booth filter media by function, construction, and typical booth position.', priority: '0.8', changefreq: 'monthly' },
  { path: '/shop-by-booth', title: 'Paint Booth Filter Guidance by Booth Brand | PFS Filters', description: 'Review model and filter-stage guidance for major spray booth brands. Confirm the booth model, filter position, product record, and actual dimensions before ordering.', priority: '0.9', changefreq: 'monthly' },
  { path: '/shop-by-booth-type', title: 'Paint Booth Filter Guidance by Airflow Type | PFS Filters', description: 'Compare typical filter positions for downdraft, crossdraft, semi-downdraft, side-downdraft, open-face, and prep-station booths, then verify the model and dimensions.', priority: '0.8', changefreq: 'monthly' },
  { path: '/brands', title: 'Paint Booth Filter Brands & Compatibility | PFS Filters', description: 'Browse booth and filtration brands supported by the PFS Filters replacement catalog.', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', title: 'Paint Booth Filter FAQ: Types, Sizes & Replacement | PFS', description: 'Answers about paint booth filter types, sizing, replacement, shipping, subscriptions, returns, and aerospace filtration.', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', title: 'Paint Booth Filter Guides & Maintenance Resources | PFS', description: 'Read practical spray booth filtration, maintenance, compliance, and product-selection guidance from PFS Filters.', priority: '0.8', changefreq: 'monthly' },
  { path: '/why-choose-us', title: 'Why PFS Filters: Paint Booth Expertise & Support', description: 'Learn how PFS Filters combines a focused filter catalog with 30+ years of PFS Spray Booths experience.', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', title: 'Contact PFS Filters | Sizing, Quotes & Order Help', description: 'Ask PFS Filters for product matching, custom-size options, order help, or a multi-booth filtration quote.', priority: '0.7', changefreq: 'monthly' },
  { path: '/returns', title: 'Returns & Refunds Policy | PFS Filters', description: 'Review eligibility, timing, restocking fees, exclusions, and contact instructions for PFS Filters returns.', priority: '0.4', changefreq: 'yearly' },
  { path: '/privacy-policy', title: 'Privacy Policy | PFS Filters', description: 'Read the PFS Filters privacy policy and learn how information is handled on the website.', priority: '0.2', changefreq: 'yearly' },
  { path: '/memberships', title: 'PFS Filters Memberships & Shop Benefits', description: 'Review PFS Filters membership options and account benefits. Memberships are separate from product subscriptions.', priority: '0.5', changefreq: 'monthly' },
  { path: '/consumables', title: 'Paint Booth Consumables | PFS Filters', description: 'Shop finishing consumables and booth support products supplied by the PFS team.', priority: '0.6', changefreq: 'monthly' },
  { path: '/consumables/pfs-vitra', title: 'PFS Vitra Paint Booth Consumables', description: 'Review PFS Vitra consumables for professional paint booth and finishing operations.', priority: '0.5', changefreq: 'monthly' },
  { path: '/consumables/pfs-vanguard', title: 'PFS Vanguard Paint Booth Consumables', description: 'Review PFS Vanguard consumables for professional paint booth and finishing operations.', priority: '0.5', changefreq: 'monthly' },
  { path: '/aerospace', title: 'Aerospace Paint Booth Filtration Products | PFS Filters', description: 'Browse filtration panels, blankets, pocket bags, and roll media for aerospace finishing operations.', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/aerospace-paint-booth-filters', title: 'Aerospace Paint Booth Filters & Multi-Stage Filtration | PFS', description: 'Learn about multi-stage aerospace paint booth filtration, NESHAP considerations, and available PFS filter media.', priority: '0.9', changefreq: 'monthly' },
  { path: '/filter-scanner', title: 'Photo-Assisted Paint Booth Filter Review | PFS Filters', description: 'Use a filter photo to narrow catalog candidates, then verify the booth position, label, and actual dimensions before ordering.', priority: '0.5', changefreq: 'monthly' },
];

const paintBoothFilterFaqs = [
  {
    question: 'How fast do filters ship?',
    answer: 'Stocked items typically process in 1–2 business days. Custom, specialty, freight, and backordered items may require additional time; confirm the current product page or contact PFS Filters for an order-specific estimate.',
  },
  {
    question: 'What is Subscribe & Save?',
    answer: 'Eligible products can be purchased on a monthly Shopify subscription with 5% off. The subscription terms must be shown and confirmed at checkout, and customers can manage eligible subscriptions through the Shopify account portal.',
  },
  {
    question: 'How do I know which filter fits my booth?',
    answer: 'Confirm the booth manufacturer and model, filter position, and actual dimensions. Browse by filter type or booth brand, then contact PFS Filters when a part number or fitment detail needs review.',
  },
  {
    question: 'Do you cover all booth brands or just PFS?',
    answer: 'PFS Filters provides catalog and replacement guidance for PFS and multiple major booth brands, including Garmat, Accudraft, GFS, Col-Met, and Blowtherm. Compatibility depends on the booth model, stage, and dimensions.',
  },
  {
    question: 'How often should I replace exhaust filters?',
    answer: 'There is no universal replacement interval. Follow the booth and filter manufacturer instructions, differential-pressure or manometer readings, operating conditions, coating load, and documented visual inspections.',
  },
  {
    question: 'Does buying a filter make a booth CARB or OSHA compliant?',
    answer: 'No filter by itself makes a facility compliant. Compliance depends on the complete booth, ventilation, operating conditions, coating process, maintenance, permits, and applicable rules. Request product documentation and consult a qualified professional for your facility.',
  },
  {
    question: 'Can I order in bulk?',
    answer: 'Yes. Bulk pricing available. Call 855-496-7969 to discuss pricing for your facility\'s volume.',
  },
];

const categoryRoutes = categories.map((category) => ({
  path: `/category/${category.slug}`,
  title: `${category.title} | PFS Filters`,
  description: category.description,
  priority: '0.9',
  changefreq: 'weekly',
}));

const brandRoutes = brandSlugs.map((slug) => ({
  path: `/shop-by-booth/${slug}`,
  title: `${titleCase(slug)} Paint Booth Filters & Replacements | PFS`,
  description: `Find replacement filter positions, common sizes, and filter guidance for ${titleCase(slug)} paint booths. Verify the model and dimensions before ordering.`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const blogRoutes = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} | PFS Filters`,
  description: truncate(post.excerpt),
  priority: '0.7',
  changefreq: 'yearly',
  lastmod: post.date,
  ogType: 'article',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { '@type': 'Organization', name: 'PFS Filters' },
    publisher: { '@type': 'Organization', name: 'PFS Filters', logo: { '@type': 'ImageObject', url: `${origin}/images/brands/pfs-logo-wide.png` } },
  },
}));

const productRoutes = products.map((product) => {
  const image = product.images?.edges?.[0]?.node?.url;
  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode || 'USD';
  const availability = product.variants?.edges?.some((edge) => edge.node.availableForSale)
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';
  const pathname = `/product/${product.handle}`;
  // sku / vendor come from the Shopify snapshot; guarded so the schema still
  // validates for older snapshots taken before those fields were queried.
  const sku = product.variants?.edges?.[0]?.node?.sku || undefined;
  const brandName = product.vendor || 'PFS Filters';
  return {
    path: pathname,
    title: `${product.title} | PFS Filters`,
    description: truncate(product.description || `Shop ${product.title} from PFS Filters.`),
    priority: '0.9',
    changefreq: 'weekly',
    ogType: 'product',
    image,
    price,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: stripMarkdown(product.description),
      image: image ? [image] : undefined,
      url: absoluteUrl(pathname),
      ...(sku ? { sku } : {}),
      brand: { '@type': 'Brand', name: brandName },
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability,
        itemCondition: 'https://schema.org/NewCondition',
        url: absoluteUrl(pathname),
        seller: { '@type': 'Organization', name: 'PFS Filters' },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 10,
          returnMethod: 'https://schema.org/ReturnByMail',
        },
      },
    },
  };
});

const faqRoute = staticRoutes.find((route) => route.path === '/faq');
faqRoute.schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const paintBoothFiltersRoute = staticRoutes.find((route) => route.path === '/paint-booth-filters');
if (paintBoothFiltersRoute) {
  paintBoothFiltersRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: paintBoothFilterFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

const andreaeRoute = staticRoutes.find((route) => route.path === '/andreae-paint-booth-filters');
if (andreaeRoute) {
  andreaeRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
      { '@type': 'ListItem', position: 3, name: 'Andreae Paint Booth Filters', item: absoluteUrl('/andreae-paint-booth-filters') },
    ],
  };
}

const exhaustRoute = staticRoutes.find((route) => route.path === '/exhaust-filters');
if (exhaustRoute) {
  exhaustRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
      { '@type': 'ListItem', position: 3, name: 'Paint Booth Exhaust Filters', item: absoluteUrl('/exhaust-filters') },
    ],
  };
}

const intakeRoute = staticRoutes.find((route) => route.path === '/intake-filters');
if (intakeRoute) {
  intakeRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
      { '@type': 'ListItem', position: 3, name: 'Paint Booth Intake Filters', item: absoluteUrl('/intake-filters') },
    ],
  };
}

const ceilingRoute = staticRoutes.find((route) => route.path === '/ceiling-filters');
if (ceilingRoute) {
  ceilingRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
      { '@type': 'ListItem', position: 3, name: 'Paint Booth Ceiling Filters', item: absoluteUrl('/ceiling-filters') },
    ],
  };
}

const prefiltersRoute = staticRoutes.find((route) => route.path === '/prefilters');
if (prefiltersRoute) {
  prefiltersRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
      { '@type': 'ListItem', position: 3, name: 'Paint Booth Prefilters', item: absoluteUrl('/prefilters') },
    ],
  };
}

const neshapRoute = staticRoutes.find((route) => route.path === '/neshap-compliant-paint-booth-filters');
if (neshapRoute) {
  neshapRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
      { '@type': 'ListItem', position: 3, name: 'NESHAP Compliant Paint Booth Filters', item: absoluteUrl('/neshap-compliant-paint-booth-filters') },
    ],
  };
}

const garmatRoute = staticRoutes.find((route) => route.path === '/garmat-paint-booth-filters');
if (garmatRoute) {
  garmatRoute.schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop by Booth', item: `${origin}/shop-by-booth` },
      { '@type': 'ListItem', position: 3, name: 'Garmat Paint Booth Filters', item: absoluteUrl('/garmat-paint-booth-filters') },
    ],
  };
}

const routes = [...staticRoutes, ...categoryRoutes, ...brandRoutes, ...blogRoutes, ...productRoutes];

function sitemapXml() {
  const entries = routes.map((route) => {
    const image = route.image ? `\n    <image:image><image:loc>${escapeXml(route.image)}</image:loc><image:title>${escapeXml(route.title)}</image:title></image:image>` : '';
    return `  <url>\n    <loc>${escapeXml(absoluteUrl(route.path))}</loc>\n    <lastmod>${route.lastmod || today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>${image}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>\n`;
}

function rssXml() {
  const items = blogPosts.map((post) => `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</link>\n      <guid isPermaLink="true">${escapeXml(absoluteUrl(`/blog/${post.slug}`))}</guid>\n      <description>${escapeXml(post.excerpt)}</description>\n      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>\n    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>PFS Filters Guides & Resources</title>\n    <link>${origin}/blog</link>\n    <description>Paint booth filter selection, maintenance, and compliance guidance from PFS Filters.</description>\n    <language>en-us</language>\n${items}\n  </channel>\n</rss>\n`;
}

function llmsText(full = false) {
  const main = `# PFS Filters\n\n> PFS Filters sells paint booth filters and industrial filtration products backed by the PFS Spray Booths team in Santa Rosa, California.\n\n## Primary resources\n\n- [Shop all paint booth filters](${origin}/shop)\n- [Filter finder by booth and size](${origin}/filter-finder)\n- [Shop by booth manufacturer](${origin}/shop-by-booth)\n- [Paint booth filter FAQ](${origin}/faq)\n- [Guides and maintenance resources](${origin}/blog)\n- [Aerospace paint booth filtration](${origin}/industries/aerospace-paint-booth-filters)\n- [Contact PFS Filters](${origin}/contact)\n- [Returns policy](${origin}/returns)\n\n## Business facts\n\n- Address: 1400 Airport Blvd, Santa Rosa, CA 95403, United States\n- Phone: 855-496-7969\n- Email: orders@pfsfilters.com\n- Parent organization: PFS Spray Booths\n- Service area: United States\n- Most stocked orders are processed in 1–2 business days; freight, custom, and special-order timing varies.\n- Eligible unused standard items may be returned within 10 days and are subject to the published policy.\n\n## Important product guidance\n\nIntake filters clean incoming air. Exhaust filters capture paint overspray. Correct selection depends on the booth, filter position, dimensions, airflow, media type, and coating process. PFS Filters does not claim that a product by itself makes a facility compliant with EPA Method 319, NESHAP, or a permit.\n`;
  if (!full) return `${main}\n## Machine-readable resources\n\n- [XML sitemap](${origin}/sitemap.xml)\n- [Product catalog JSON](${origin}/products.json)\n- [RSS feed](${origin}/feed.xml)\n`;

  const productList = products.map((product) => {
    const price = product.priceRange?.minVariantPrice?.amount;
    const type = product.productType || 'Paint booth filtration product';
    return `### ${product.title}\n\n- URL: ${absoluteUrl(`/product/${product.handle}`)}\n- Type: ${type}\n- Starting price in snapshot: $${price || 'Contact PFS'} USD\n- Summary: ${truncate(product.description, 260)}\n`;
  }).join('\n');
  const faqList = faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join('\n\n');
  const articleList = blogPosts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`).join('\n');
  const boothLinks = brandSlugs.map((slug) => `- [${titleCase(slug)} replacement filter guide](${absoluteUrl(`/shop-by-booth/${slug}`)})`).join('\n');
  return `${main}\n# Product catalog\n\n${productList}\n# Frequently asked questions\n\n${faqList}\n\n# Published guides\n\n${articleList}\n\n# Booth manufacturer compatibility guides\n\n${boothLinks}\n`;
}

function publicProductJson() {
  return JSON.stringify({
    generatedAt: new Date().toISOString(),
    source: `${origin}/shop`,
    notice: 'Prices and availability can change. Confirm the current product page before purchasing.',
    products: products.map((product) => ({
      name: product.title,
      url: absoluteUrl(`/product/${product.handle}`),
      description: stripMarkdown(product.description),
      productType: product.productType || null,
      tags: product.tags || [],
      startingPrice: product.priceRange?.minVariantPrice || null,
      image: product.images?.edges?.[0]?.node?.url || null,
      variants: product.variants?.edges?.map((edge) => ({
        name: edge.node.title,
        price: edge.node.price,
        availableForSale: edge.node.availableForSale,
      })) || [],
    })),
  }, null, 2) + '\n';
}

function shopFallback(title, description) {
  const visibleProducts = products
    .filter((product) => !product.title.toLowerCase().includes('membership'))
    .slice(0, 4);
  const cards = visibleProducts.map((product, index) => {
    const imageNode = product.images?.edges?.[0]?.node;
    const imageUrl = shopProductCardImage(product, 480);
    const srcset = shopProductCardSrcset(product);
    const firstVariant = product.variants?.edges?.[0]?.node;
    const price = firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount;
    const currency = firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD';
    const alt = imageNode?.altText || product.title;
    return `<article style="position:relative;overflow:hidden;border:1px solid #333;border-radius:12px;background:linear-gradient(135deg,#212121,#1a1a1a)">
        <a href="/product/${escapeHtml(product.handle)}" style="color:inherit;text-decoration:none">
          <div style="aspect-ratio:1/1;background:linear-gradient(135deg,#1f1f1f,#151515);border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;overflow:hidden">
            ${imageUrl ? `<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" alt="${escapeHtml(alt)}" width="480" height="480" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'auto'}" style="width:100%;height:100%;object-fit:contain;padding:12px;box-sizing:border-box;filter:brightness(.95) contrast(1.05)" />` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280">Image Coming Soon</div>`}
          </div>
          <div style="padding:16px">
            <h2 style="min-height:40px;margin:0 0 12px;font-size:15px;line-height:1.3;font-weight:700;color:#fff">${escapeHtml(product.title)}</h2>
            <p style="margin:0 0 14px;color:#60a5fa;font-weight:800">$${escapeHtml(price || '')} <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,.7)">${escapeHtml(currency)}</span></p>
            <span style="display:flex;align-items:center;justify-content:center;min-height:36px;border-radius:8px;background:#3b82f6;color:#fff;font-size:14px;font-weight:700">View Product</span>
          </div>
        </a>
      </article>`;
  }).join('');

  return `<main data-seo-fallback id="shop-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <section style="padding:112px 16px 16px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-size:14px">Home / Shop</p>
        <div style="text-align:center;margin:0 auto 16px;max-width:840px">
          <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.25rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">Shop Paint Booth Filters</h1>
          <p style="margin:0 auto;color:rgba(255,255,255,.62);font-size:18px;line-height:1.6">${description}</p>
        </div>
      </div>
    </section>
    <div style="height:88px;background:linear-gradient(to bottom,#050505,#0d0d0d)"></div>
    <section style="padding:24px 16px 56px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">${cards}</div>
      <p style="max-width:1280px;margin:24px auto 0;color:rgba(255,255,255,.55);font-size:15px;line-height:1.6">Product data is shown from the PFS Filters catalog snapshot. Confirm live variants, pricing, and availability on each product page before ordering.</p>
    </section>
  </main>`;
}

function intakeFallback(title, description) {
  return `<main data-seo-fallback id="intake-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px">Shop</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-size:14px">Paint Booth Filters / Intake Filters</p>
        <div style="max-width:760px">
          <span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:999px;border:1px solid rgba(77,159,255,.3);background:rgba(77,159,255,.1);color:#4d9fff;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;margin-bottom:16px">Intake stage</span>
          <h1 style="margin:0 0 16px;font-size:clamp(2.6rem,10vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">${escapeHtml(title)}</h1>
          <p style="margin:0;color:rgba(255,255,255,.62);font-size:18px;line-height:1.6;max-width:720px">${escapeHtml(description)}</p>
          <p style="margin:24px 0 0;color:rgba(255,255,255,.55);font-size:15px;line-height:1.6"><a href="/shop" style="color:#60a5fa;font-weight:700">Browse intake products</a> · <a href="/filter-finder" style="color:#60a5fa;font-weight:700">Find my filter</a> · <a href="/contact" style="color:#60a5fa;font-weight:700">Contact PFS</a></p>
        </div>
      </div>
    </section>
  </main>`;
}

function ceilingBlanketsFallback(title, description) {
  const cards = ceilingBlanketsProducts.slice(0, 2).map((product, index) => {
    const imageNode = product.images?.edges?.[0]?.node;
    const imageUrl = shopProductCardImage(product, 480);
    const srcset = shopProductCardSrcset(product);
    const firstVariant = product.variants?.edges?.[0]?.node;
    const price = firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount;
    const currency = firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD';
    const alt = imageNode?.altText || product.title;
    return `<article style="overflow:hidden;border:1px solid #333;border-radius:12px;background:linear-gradient(135deg,#212121,#1a1a1a)">
        <a href="/product/${escapeHtml(product.handle)}" style="color:inherit;text-decoration:none">
          <div style="aspect-ratio:1/1;background:linear-gradient(135deg,#1f1f1f,#151515);border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;overflow:hidden">
            ${imageUrl ? `<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" alt="${escapeHtml(alt)}" width="480" height="480" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'auto'}" style="width:100%;height:100%;object-fit:contain;padding:12px;box-sizing:border-box;filter:brightness(.95) contrast(1.05)" />` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280">Image Coming Soon</div>'}
          </div>
          <div style="padding:16px">
            <h2 style="min-height:40px;margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:700;color:#fff">${escapeHtml(product.title)}</h2>
            <p style="margin:0 0 14px;color:#60a5fa;font-family:Arial,sans-serif;font-weight:800">${price ? `$${escapeHtml(price)} <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,.7)">${escapeHtml(currency)}</span>` : 'Current catalog item'}</p>
            <span style="display:flex;align-items:center;justify-content:center;min-height:36px;border-radius:8px;background:#3b82f6;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700">View Product</span>
          </div>
        </a>
      </article>`;
  }).join('');

  return `<main data-seo-fallback id="ceiling-blankets-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop-by-type" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Categories</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Shop by Type / ${escapeHtml(title)}</p>
        <span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:999px;border:1px solid rgba(77,159,255,.3);background:rgba(77,159,255,.1);color:#4d9fff;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;margin-bottom:16px">Intake</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">${escapeHtml(title)}</h1>
        <p style="max-width:672px;margin:0;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:18px;line-height:1.55">${escapeHtml(description)}</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:32px 16px 56px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">${cards}</div>
    </section>
  </main>`;
}

function rollMediaFallback(title, description) {
  const cards = rollMediaProducts.slice(0, 2).map((product, index) => {
    const imageNode = product.images?.edges?.[0]?.node;
    const imageUrl = shopProductCardImage(product, 480);
    const srcset = shopProductCardSrcset(product);
    const firstVariant = product.variants?.edges?.[0]?.node;
    const price = firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount;
    const currency = firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD';
    const alt = imageNode?.altText || product.title;
    return `<article style="overflow:hidden;border:1px solid #333;border-radius:12px;background:linear-gradient(135deg,#212121,#1a1a1a)">
        <a href="/product/${escapeHtml(product.handle)}" style="color:inherit;text-decoration:none">
          <div style="aspect-ratio:1/1;background:linear-gradient(135deg,#1f1f1f,#151515);border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;overflow:hidden">
            ${imageUrl ? `<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" alt="${escapeHtml(alt)}" width="480" height="480" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'auto'}" style="width:100%;height:100%;object-fit:contain;padding:12px;box-sizing:border-box;filter:brightness(.95) contrast(1.05)" />` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280">Image Coming Soon</div>'}
          </div>
          <div style="padding:16px">
            <h2 style="min-height:40px;margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:700;color:#fff">${escapeHtml(product.title)}</h2>
            <p style="margin:0 0 14px;color:#60a5fa;font-family:Arial,sans-serif;font-weight:800">${price ? `$${escapeHtml(price)} <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,.7)">${escapeHtml(currency)}</span>` : 'Current catalog item'}</p>
            <span style="display:flex;align-items:center;justify-content:center;min-height:36px;border-radius:8px;background:#3b82f6;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700">View Product</span>
          </div>
        </a>
      </article>`;
  }).join('');

  return `<main data-seo-fallback id="roll-media-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop-by-type" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Categories</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Shop by Type / ${escapeHtml(title)}</p>
        <span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:999px;border:1px solid rgba(77,159,255,.3);background:rgba(77,159,255,.1);color:#4d9fff;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;margin-bottom:16px">Intake / Exhaust</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">${escapeHtml(title)}</h1>
        <p style="max-width:672px;margin:0;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:18px;line-height:1.55">${escapeHtml(description)}</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:32px 16px 56px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">${cards}</div>
    </section>
  </main>`;
}

function mervFiltersFallback(title, description) {
  const cards = mervFilterProducts.slice(0, 2).map((product, index) => {
    const imageNode = product.images?.edges?.[0]?.node;
    const imageUrl = shopProductCardImage(product, 480);
    const srcset = shopProductCardSrcset(product);
    const firstVariant = product.variants?.edges?.[0]?.node;
    const price = firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount;
    const currency = firstVariant?.price?.currencyCode || product.priceRange?.minVariantPrice?.currencyCode || 'USD';
    const alt = imageNode?.altText || product.title;
    return `<article style="overflow:hidden;border:1px solid #333;border-radius:12px;background:linear-gradient(135deg,#212121,#1a1a1a)">
        <a href="/product/${escapeHtml(product.handle)}" style="color:inherit;text-decoration:none">
          <div style="aspect-ratio:1/1;background:linear-gradient(135deg,#1f1f1f,#151515);border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;overflow:hidden">
            ${imageUrl ? `<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" alt="${escapeHtml(alt)}" width="480" height="480" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'auto'}" style="width:100%;height:100%;object-fit:contain;padding:12px;box-sizing:border-box;filter:brightness(.95) contrast(1.05)" />` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280">Image Coming Soon</div>'}
          </div>
          <div style="padding:16px">
            <h2 style="min-height:40px;margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:700;color:#fff">${escapeHtml(product.title)}</h2>
            <p style="margin:0 0 14px;color:#60a5fa;font-family:Arial,sans-serif;font-weight:800">${price ? `$${escapeHtml(price)} <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,.7)">${escapeHtml(currency)}</span>` : 'Current catalog item'}</p>
            <span style="display:flex;align-items:center;justify-content:center;min-height:36px;border-radius:8px;background:#3b82f6;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700">View Product</span>
          </div>
        </a>
      </article>`;
  }).join('');

  return `<main data-seo-fallback id="merv-filters-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop-by-type" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Categories</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Shop by Type / ${escapeHtml(title)}</p>
        <span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:999px;border:1px solid rgba(77,159,255,.3);background:rgba(77,159,255,.1);color:#4d9fff;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;margin-bottom:16px">Intake</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">${escapeHtml(title)}</h1>
        <p style="max-width:672px;margin:0;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:18px;line-height:1.55">${escapeHtml(description)}</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:32px 16px 56px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">${cards}</div>
    </section>
  </main>`;
}

function northBayFallback(description) {
  return `<main data-seo-fallback id="north-bay-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/paint-booth-filters" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px">Filters</a>
        </div>
      </div>
    </nav>
    <section style="position:relative;overflow:hidden;padding:112px 16px 64px;background:#050505">
      <img src="${logoUrl}" alt="" width="420" height="127" decoding="async" style="position:absolute;right:0;top:64px;width:min(540px,60vw);height:auto;opacity:.045" />
      <div style="position:relative;max-width:1280px;margin:0 auto">
        <p style="margin:0 0 20px;color:rgba(255,255,255,.55);font-size:14px">Paint Booth Filters / North Bay and Sonoma County</p>
        <div style="max-width:880px">
          <span style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid rgba(96,165,250,.25);background:rgba(96,165,250,.1);color:#93c5fd;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px">PFS home region</span>
          <h1 style="margin:0 0 20px;font-size:clamp(2.6rem,10vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">Paint Booth Filters for the North Bay and Sonoma County</h1>
          <p style="margin:0;color:rgba(255,255,255,.65);font-size:20px;line-height:1.65;max-width:780px">${escapeHtml(description)}</p>
          <p style="margin:28px 0 0;color:rgba(255,255,255,.55);font-size:15px;line-height:1.6"><a href="/paint-booth-filters" style="color:#60a5fa;font-weight:700">Browse filter categories</a> · <a href="/contact" style="color:#60a5fa;font-weight:700">Request help</a></p>
        </div>
      </div>
    </section>
  </main>`;
}

function losAngelesFallback() {
  return `<main data-seo-fallback id="los-angeles-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/paint-booth-filters" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px">Filters</a>
        </div>
      </div>
    </nav>
    <section style="position:relative;overflow:hidden;padding:112px 16px 64px;background:#050505">
      <img src="${logoUrl}" alt="" width="420" height="127" decoding="async" style="position:absolute;right:0;top:64px;width:min(540px,60vw);height:auto;opacity:.045" />
      <div style="position:relative;max-width:1280px;margin:0 auto">
        <p style="margin:0 0 20px;color:rgba(255,255,255,.55);font-size:14px">Paint Booth Filters / Los Angeles County</p>
        <div style="max-width:880px">
          <span style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid rgba(96,165,250,.25);background:rgba(96,165,250,.1);color:#93c5fd;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px">Southern California support</span>
          <h1 style="margin:0 0 20px;font-size:clamp(2.6rem,10vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">Paint Booth Filters for Los Angeles County</h1>
          <p style="margin:0;color:rgba(255,255,255,.65);font-size:20px;line-height:1.65;max-width:780px">Los Angeles County supports a wide range of spray-finishing work, from collision and fleet operations to fabrication, aerospace supply, and specialty entertainment projects. High variety makes accurate filter records more useful than broad brand-only assumptions.</p>
          <p style="margin:28px 0 0;color:rgba(255,255,255,.55);font-size:15px;line-height:1.6"><a href="/paint-booth-filters" style="color:#60a5fa;font-weight:700">Browse filter categories</a> · <a href="/contact" style="color:#60a5fa;font-weight:700">Request help</a></p>
          <p style="margin:28px 0 0;color:rgba(255,255,255,.52);font-size:13px;line-height:1.4">Los Angeles · Long Beach · South Bay · San Fernando Valley · Los Angeles County</p>
        </div>
      </div>
    </section>
  </main>`;
}

function filterFinderFallback() {
  const boothTypes = [
    ['Downdraft', 'Air enters from the ceiling plenum and exits through floor grates or a pit.'],
    ['Crossdraft', 'Air flows horizontally from intake doors or a front wall to exhaust filters.'],
    ['Semi-Downdraft', 'Air enters from the front ceiling area and exits low in the rear wall.'],
    ['Side-Downdraft', 'Air enters from the ceiling and exits through side-wall exhaust plenums.'],
    ['Open Face', 'Open front with filtered exhaust through the rear wall for smaller parts.'],
    ['Prep Station', 'Open work area for sanding, masking, and prep work with filtered airflow.'],
  ];
  const cards = boothTypes.map(([label, copy]) => `<article style="overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#0a0a0a">
      <div style="height:176px;padding:16px;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,rgba(255,255,255,.025),transparent)">
        <div style="position:relative;width:100%;max-width:280px;height:100%;border:2px solid rgba(255,255,255,.45);border-radius:4px">
          <div style="position:absolute;left:12%;right:12%;top:18%;height:2px;background:rgba(96,165,250,.72)"></div>
          <div style="position:absolute;left:12%;right:12%;top:48%;height:2px;background:rgba(96,165,250,.72)"></div>
          <div style="position:absolute;left:12%;right:12%;top:78%;height:2px;background:rgba(96,165,250,.72)"></div>
          <div style="position:absolute;right:-10px;top:20%;bottom:20%;width:12px;border:1px solid rgba(251,146,60,.55);background:rgba(251,146,60,.12)"></div>
        </div>
      </div>
      <div style="padding:20px;border-top:1px solid rgba(255,255,255,.05)">
        <h2 style="margin:0 0 6px;color:#fff;font-size:24px;line-height:1;font-weight:800">${label}</h2>
        <p style="min-height:40px;margin:0 0 12px;color:rgba(255,255,255,.6);font-family:Arial,sans-serif;font-size:14px;line-height:1.45">${copy}</p>
        <p style="margin:0;color:rgba(147,197,253,.88);font-family:Arial,sans-serif;font-size:12px">Select booth type</p>
      </div>
    </article>`).join('');

  return `<main data-seo-fallback id="filter-finder-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px">Shop</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 32px;background:linear-gradient(180deg,#0a1628,#040404)">
      <div style="max-width:1024px;margin:0 auto;text-align:center">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Home / Filter Finder</p>
        <span style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid rgba(59,130,246,.24);background:rgba(59,130,246,.1);color:#93c5fd;font-family:Arial,sans-serif;font-size:12px;font-weight:700;margin-bottom:16px">FILTER FINDER · STEP 1 OF 4</span>
        <h1 style="margin:0 0 12px;font-size:clamp(2.6rem,11vw,4.5rem);line-height:.92;font-weight:800;letter-spacing:0;text-transform:uppercase;color:#fff">What kind of booth do you have?</h1>
        <p style="max-width:672px;margin:0 auto;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:18px;line-height:1.55">Pick the booth airflow type that matches yours. We use this to narrow to brands and models that fit.</p>
      </div>
    </section>
    <section style="padding:0 16px 64px">
      <div style="max-width:1152px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${cards}</div>
    </section>
  </main>`;
}

function filterScannerFallback() {
  const steps = [
    ['1', 'Take a Photo', 'Photograph your existing filter — front, back, or the label.'],
    ['2', 'Review Candidates', 'Image analysis can narrow possible catalog matches but does not prove fitment.'],
    ['3', 'Verify and Order', 'Confirm the filter stage, label, and actual dimensions before adding a product to your cart.'],
  ];
  const cards = steps.map(([step, title, copy]) => `<article style="min-height:210px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.03);padding:24px;text-align:center">
      <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:16px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;color:#60a5fa;font-size:20px;font-weight:800">${step}</div>
      <h2 style="margin:0 0 8px;color:#fff;font-size:22px;line-height:1;font-weight:800">${title}</h2>
      <p style="margin:0;color:rgba(255,255,255,.58);font-family:Arial,sans-serif;font-size:14px;line-height:1.45">${copy}</p>
    </article>`).join('');

  return `<main data-seo-fallback id="filter-scanner-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/memberships" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Memberships</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:896px;margin:0 auto;text-align:center">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Home / AI Filter Scanner</p>
        <span style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid rgba(59,130,246,.22);background:rgba(59,130,246,.1);color:#60a5fa;font-family:Arial,sans-serif;font-size:14px;font-weight:700;margin-bottom:16px">AI-Powered</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">Filter Scanner</h1>
        <p style="max-width:672px;margin:0 auto;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:20px;line-height:1.55">Photograph the filter and label to narrow catalog candidates. Verify the booth position and actual dimensions before ordering.</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:32px 16px 56px;background:#0d0d0d">
      <div style="max-width:896px;margin:0 auto">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px">${cards}</div>
        <article style="min-height:260px;border-radius:14px;border:1px solid rgba(59,130,246,.22);background:linear-gradient(135deg,rgba(59,130,246,.07),rgba(59,130,246,.12));padding:32px;text-align:center">
          <h2 style="margin:0 0 10px;color:#fff;font-size:28px;line-height:1;font-weight:800">Available on Gold & Platinum Plans</h2>
          <p style="max-width:448px;margin:0 auto 22px;color:rgba(255,255,255,.58);font-family:Arial,sans-serif;font-size:16px;line-height:1.55">The AI Filter Scanner is included with Gold and Platinum memberships. Upgrade today to unlock instant filter identification, plus discounts on every order.</p>
          <p style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:0"><a href="/memberships" style="min-height:40px;min-width:184px;border-radius:8px;background:#3b82f6;display:inline-flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:800">View Membership Plans</a><a href="/auth" style="min-height:40px;min-width:152px;border-radius:8px;border:1px solid rgba(255,255,255,.22);display:inline-flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:800">Sign In to Your Account</a></p>
        </article>
      </div>
    </section>
  </main>`;
}

function polyesterMediaFallback(title, description) {
  return `<main data-seo-fallback id="polyester-media-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop-by-type" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Categories</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Shop by Type / ${escapeHtml(title)}</p>
        <span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;margin-bottom:16px">Exhaust</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.5rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">${escapeHtml(title)}</h1>
        <p style="max-width:672px;margin:0;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:18px;line-height:1.55">${escapeHtml(description)}</p>
      </div>
    </section>
    <div style="height:100px;background:linear-gradient(to bottom,#050505,#0d0d0d)"></div>
    <section style="padding:48px 16px 56px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;text-align:center;padding:64px 0">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 16px;display:block">
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
          <path d="M12 22V12" />
          <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
          <path d="m7.5 4.27 9 5.15" />
        </svg>
        <h2 style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:20px;font-weight:600;color:rgba(255,255,255,.6)">No products found</h2>
        <p style="margin:0 auto 24px;max-width:448px;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:16px;line-height:1.5">We couldn't find any products in this category right now. Browse all products or check back soon.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="/shop" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 16px;border-radius:8px;background:#3b82f6;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:700">Browse All Products</a>
          <a href="/shop-by-type" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 16px;border-radius:8px;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.6);text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:700">All Categories</a>
        </div>
      </div>
    </section>
  </main>`;
}

function novaVertaFallback() {
  return `<main data-seo-fallback id="nova-verta-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop-by-booth" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Booth Brands</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Shop by Booth / Nova Verta</p>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap">
          <span style="font-family:Arial,sans-serif;font-size:12px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.05);color:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.1)">Italy</span>
          <span style="font-family:Arial,sans-serif;font-size:12px;padding:4px 10px;border-radius:999px;background:rgba(77,159,255,.1);color:#4d9fff;border:1px solid rgba(77,159,255,.2)">Downdraft</span>
        </div>
        <h1 style="margin:0 0 16px;font-size:clamp(2.6rem,10vw,3.5rem);line-height:1.05;font-weight:800;letter-spacing:0;color:#fff">Nova Verta Booth Filters</h1>
        <p style="max-width:768px;margin:0;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:18px;line-height:1.55">Premium Italian booth manufacturer specializing in high-efficiency downdraft systems. Known for their advanced curing technology and energy-saving designs favored by luxury and exotic vehicle shops.</p>
        <div style="display:flex;flex-wrap:wrap;gap:16px;margin-top:24px;font-family:Arial,sans-serif">
          <span style="font-size:14px;color:rgba(255,255,255,.5)">Ceiling: <span style="color:rgba(255,255,255,.7)">6–12 months</span></span>
          <span style="font-size:14px;color:rgba(255,255,255,.5)">Intake: <span style="color:rgba(255,255,255,.7)">30–45 days</span></span>
          <span style="font-size:14px;color:rgba(255,255,255,.5)">Exhaust: <span style="color:rgba(255,255,255,.7)">70–100 days</span></span>
        </div>
      </div>
    </section>
    <div style="height:100px;background:linear-gradient(to bottom,#050505,#0d0d0d)"></div>
    <section style="padding:56px 16px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto">
        <h2 style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:24px;font-weight:700;color:#fff">Nova Verta Models</h2>
        <p style="margin:0 0 32px;color:rgba(255,255,255,.5);font-family:Arial,sans-serif;font-size:14px">Click any filter size to go directly to that product. Sizes marked with a call icon require a quote.</p>
        <div style="border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);border-radius:16px;padding:24px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
            <div>
              <h3 style="margin:0;font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:#fff">Nova Verta Verto</h3>
              <span style="font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,.4)">Downdraft Booth</span>
            </div>
            <span style="font-family:Arial,sans-serif;font-size:12px;padding:4px 10px;border-radius:999px;background:rgba(77,159,255,.1);color:#4d9fff;border:1px solid rgba(77,159,255,.2)">Downdraft</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px">
            <div style="border:1px solid rgba(56,189,248,.2);background:rgba(56,189,248,.1);border-radius:12px;padding:12px">
              <span style="font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#7dd3fc">Ceiling / Diffusion Media</span>
              <div style="margin-top:8px;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,.8)">38"×107"<br />38"×67"</div>
            </div>
            <div style="border:1px solid rgba(59,130,246,.2);background:rgba(59,130,246,.1);border-radius:12px;padding:12px">
              <span style="font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#93c5fd">Exhaust Arrestors</span>
              <div style="margin-top:8px;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,.8)">20"×20"<br />20"×25"</div>
            </div>
            <div style="border:1px solid rgba(16,185,129,.2);background:rgba(16,185,129,.1);border-radius:12px;padding:12px">
              <span style="font-family:Arial,sans-serif;font-size:12px;font-weight:600;color:#6ee7b7">Pre-Filters</span>
              <div style="margin-top:8px;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,.8)">24"×24"×2"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>`;
}

function fiberglassVsTackyBlogFallback() {
  return `<main data-seo-fallback id="fiberglass-vs-tacky-blog-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/blog" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Blog</a>
        </div>
      </div>
    </nav>
    <section style="padding:96px 16px 24px;background:#050505">
      <div style="max-width:896px;margin:0 auto;font-family:Arial,sans-serif">
        <p style="margin:0 0 8px;font-size:14px;color:rgba(255,255,255,.5)">Home › Blog › <span style="color:rgba(255,255,255,.8)">Fiberglass vs. Tacky Panel Filters</span></p>
        <span style="display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.6);font-size:14px;font-weight:600">← Back to Blog</span>
      </div>
    </section>
    <div style="height:100px;background:linear-gradient(to bottom,#050505,#0d0d0d)"></div>
    <section style="padding:48px 16px;background:#0d0d0d">
      <div style="max-width:896px;margin:0 auto">
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:16px;font-family:Arial,sans-serif">
          <span style="font-size:12px;font-weight:600;padding:3px 10px;border-radius:6px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.85)">Product Guide</span>
          <span style="font-size:14px;color:rgba(255,255,255,.7)">5 min read</span>
          <span style="font-size:14px;color:rgba(255,255,255,.7)">September 5, 2026</span>
        </div>
        <h1 style="margin:0 0 16px;font-size:clamp(2.25rem,7vw,3rem);line-height:1.15;font-weight:800;color:#fff">Fiberglass vs. Tacky Panel Filters: How to Compare the Application</h1>
        <p style="max-width:768px;margin:0 0 24px;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:20px;line-height:1.5">Fiberglass paint arrestors and tackified panel media are not automatically interchangeable. Compare the documented filter stage, dimensions, media, airflow direction, and equipment requirements before ordering.</p>
        <p style="margin:0 0 40px;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,.7)">By <strong style="color:#fff">PFS Filters Editorial Team</strong></p>
        <div style="aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#151515">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png" alt="Fiberglass vs. Tacky Panel Filters: How to Compare the Application" width="1280" height="720" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block" />
        </div>
      </div>
    </section>
  </main>`;
}

function brandsFallback() {
  const brandCards = [
    ['PFS Filters', 'PFS Filters catalog products and replacement guidance, backed by the PFS Spray Booths team in Santa Rosa, California.', 'Spray Booth Specialists'],
    ['Andover Healthcare', 'Fiberglass and synthetic filter-media products represented in the current PFS catalog. Verify the product record and application before ordering.', 'Industrial Grade Media'],
    ['Koch Filter', 'MERV-rated filtration products represented in the current PFS catalog. Confirm the stage, rating, depth, and dimensions required by the equipment.', 'MERV-Rated Filters'],
    ['Permatron', 'Synthetic filtration products represented in the current PFS catalog. Use the current product data rather than a brand name alone to select media.', 'Synthetic Media'],
  ];
  const cards = brandCards.map(([name, copy, specialty]) => `<article style="border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);border-radius:16px;padding:24px;min-height:190px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px">
        <h2 style="margin:0;color:#fff;font-size:26px;line-height:1;font-weight:800">${name}</h2>
        <span style="display:inline-flex;align-items:center;min-height:26px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:rgba(255,255,255,.55);padding:4px 8px;font-family:Arial,sans-serif;font-size:12px;white-space:nowrap">${specialty}</span>
      </div>
      <p style="margin:0 0 18px;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:14px;line-height:1.6">${copy}</p>
      <a href="/shop" style="display:inline-flex;align-items:center;min-height:34px;border:1px solid rgba(255,255,255,.2);border-radius:8px;color:rgba(255,255,255,.75);text-decoration:none;padding:7px 12px;font-family:Arial,sans-serif;font-size:13px;font-weight:700">Shop Products</a>
    </article>`).join('');

  return `<main data-seo-fallback id="brands-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px">Shop</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Home / Brands</p>
        <span style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:rgba(255,255,255,.6);font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px">Trusted Brands</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.5rem);line-height:.92;font-weight:800;letter-spacing:0;text-transform:uppercase;color:#fff">Filter Brands We Carry</h1>
        <p style="max-width:672px;margin:0;color:rgba(255,255,255,.5);font-family:Arial,sans-serif;font-size:20px;line-height:1.55">Browse manufacturers represented in the current catalog, then verify the product record, filter stage, and dimensions before ordering.</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:56px 16px;background:#0d0d0d">
      <div style="max-width:896px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px">${cards}</div>
    </section>
  </main>`;
}

function vitraFallback() {
  return `<main data-seo-fallback id="vitra-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px">Shop</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto">
        <p style="margin:0;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Home / Consumables / PFS VITRA</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:56px 16px;background:#0d0d0d">
      <div style="max-width:1024px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;align-items:start">
        <div style="aspect-ratio:1/1;min-height:320px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(255,255,255,.03);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px">
          <div style="width:80px;height:80px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);margin-bottom:24px"></div>
          <p style="margin:0 0 4px;color:rgba(255,255,255,.4);font-family:Arial,sans-serif;font-size:18px;font-weight:700">Image Coming Soon</p>
          <p style="margin:0;color:rgba(255,255,255,.25);font-family:Arial,sans-serif;font-size:14px">Product design in progress</p>
          <img src="${logoUrl}" alt="PFS Filters" width="420" height="127" decoding="async" style="width:128px;height:auto;opacity:.2;margin-top:32px" />
        </div>
        <div style="min-height:520px">
          <span style="display:inline-flex;align-items:center;min-height:26px;padding:4px 12px;border-radius:999px;border:1px solid rgba(59,130,246,.22);background:rgba(59,130,246,.1);color:#60a5fa;font-family:Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px">Consumables</span>
          <h1 style="margin:8px 0 8px;color:#fff;font-size:clamp(3rem,12vw,4.25rem);line-height:.95;font-weight:800;letter-spacing:0">PFS VITRA</h1>
          <p style="margin:0 0 24px;color:rgba(255,255,255,.5);font-family:Arial,sans-serif;font-size:20px">Glass Shield Washable Coating</p>
          <div style="display:flex;align-items:baseline;gap:12px;min-height:52px;margin-bottom:24px">
            <span style="color:#60a5fa;font-size:44px;font-weight:800">$80.00</span>
            <span style="color:rgba(255,255,255,.4);font-family:Arial,sans-serif;font-size:14px">USD</span>
          </div>
          <p style="min-height:112px;margin:0;padding-top:20px;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:16px;line-height:1.7">PFS VITRA is a professional-grade washable glass shield coating designed to protect your paint booth windows and glass surfaces from overspray buildup. Easy to apply, easy to remove — keeps your booth visibility crystal clear.</p>
          <div style="min-height:72px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:16px">
            <span style="color:rgba(255,255,255,.6);font-family:Arial,sans-serif;font-size:14px">Quantity:</span>
            <div style="width:116px;height:42px;border:1px solid rgba(255,255,255,.2);border-radius:8px"></div>
          </div>
          <div style="min-height:56px;margin-top:16px;border-radius:10px;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:#fff;font-family:Arial,sans-serif;font-size:16px;font-weight:800">Add to Cart — $80.00</div>
          <div style="min-height:86px;margin-top:24px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);padding:16px;color:rgba(255,255,255,.5);font-family:Arial,sans-serif;font-size:12px;line-height:1.6">PFS VITRA is currently being rebranded under the PFS Filters label. Product packaging and imagery will be updated soon.</div>
        </div>
      </div>
    </section>
  </main>`;
}

function aerospaceFallback() {
  const product = firstAerospaceProduct;
  const imageNode = product?.images?.edges?.[0]?.node;
  const imageUrl = product ? shopProductCardImage(product, 480) : '';
  const srcset = product ? shopProductCardSrcset(product) : '';
  const price = product?.priceRange?.minVariantPrice?.amount;
  const currency = product?.priceRange?.minVariantPrice?.currencyCode || 'USD';
  const alt = imageNode?.altText || product?.title || 'Aerospace-grade filtration media';
  const card = product ? `<article style="overflow:hidden;border:1px solid #333;border-radius:12px;background:linear-gradient(135deg,#212121,#1a1a1a)">
        <a href="/product/${escapeHtml(product.handle)}" style="color:inherit;text-decoration:none">
          <div style="aspect-ratio:1/1;background:linear-gradient(135deg,#1f1f1f,#151515);border-bottom:1px solid #292929;display:flex;align-items:center;justify-content:center;overflow:hidden">
            ${imageUrl ? `<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" alt="${escapeHtml(alt)}" width="480" height="480" loading="eager" decoding="async" fetchpriority="high" style="width:100%;height:100%;object-fit:contain;padding:12px;box-sizing:border-box;filter:brightness(.95) contrast(1.05)" />` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280">Image Coming Soon</div>'}
          </div>
          <div style="padding:16px">
            <h2 style="min-height:40px;margin:0 0 12px;font-family:Arial,sans-serif;font-size:15px;line-height:1.3;font-weight:700;color:#fff">${escapeHtml(product.title)}</h2>
            <p style="margin:0 0 14px;color:#60a5fa;font-family:Arial,sans-serif;font-weight:800">${price ? `$${escapeHtml(price)} <span style="font-size:12px;font-weight:400;color:rgba(255,255,255,.7)">${escapeHtml(currency)}</span>` : 'Aerospace filtration media'}</p>
            <span style="display:flex;align-items:center;justify-content:center;min-height:36px;border-radius:8px;background:#3b82f6;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700">View Product</span>
          </div>
        </a>
      </article>` : '';

  return `<main data-seo-fallback id="aerospace-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.95);border-bottom:1px solid rgba(255,255,255,.08)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="height:96px;display:flex;align-items:center;justify-content:space-between">
          <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
          <a href="/shop" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Shop</a>
        </div>
      </div>
    </nav>
    <section style="padding:112px 16px 40px;background:#050505">
      <div style="max-width:1280px;margin:0 auto;text-align:center">
        <p style="margin:0 0 16px;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;font-size:14px">Industries / Aerospace Filters</p>
        <span style="display:inline-flex;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid rgba(59,130,246,.22);background:rgba(59,130,246,.1);color:rgba(255,255,255,.8);font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px">Aerospace & MRO Filtration</span>
        <h1 style="margin:0 0 16px;font-size:clamp(3rem,12vw,4.25rem);line-height:.95;font-weight:800;letter-spacing:0;color:#fff">Aerospace Paint Booth Filters</h1>
        <p style="max-width:768px;margin:0 auto;color:rgba(255,255,255,.62);font-family:Arial,sans-serif;font-size:20px;line-height:1.55">High-efficiency filtration media engineered for aircraft finishing, MRO hangars, and NESHAP-regulated aerospace environments. From ceiling diffusion to multi-stage exhaust capture.</p>
        <p style="max-width:672px;margin:12px auto 0;color:rgba(255,255,255,.36);font-family:Arial,sans-serif;font-size:14px;line-height:1.5">HEPA-XFP™ multi-pocket bags · NESHAP 319 final-stage bags · CG100 2-pocket bags · ME/PT intake panels · SFR blankets · CPA roll media</p>
      </div>
    </section>
    <div style="height:48px;background:linear-gradient(180deg,#050505,#0d0d0d)"></div>
    <section style="padding:32px 16px 56px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">${card}</div>
    </section>
  </main>`;
}

function writeSourceAssets() {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml());
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssXml());
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsText(false));
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsText(true));
  fs.writeFileSync(path.join(publicDir, 'products.json'), publicProductJson());
  console.log(`Generated source SEO assets for ${routes.length} indexable routes.`);
}

function replaceMeta(html, route) {
  const url = absoluteUrl(route.path);
  const image = route.image || 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/og-preview-f5HJPTtYv8nuyE689iUjcf.png';
  const title = escapeHtml(route.title);
  const description = escapeHtml(truncate(route.description));
  let output = html
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title data-seo-generated>${title}</title>`)
    .replace(/<meta[^>]+name="description"[^>]*>/i, `<meta data-seo-generated name="description" content="${description}" />`)
    .replace(/<meta[^>]+name="robots"[^>]*>/i, '<meta data-seo-generated name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />')
    .replace(/<link[^>]+rel="canonical"[^>]*>/i, `<link data-seo-generated rel="canonical" href="${escapeHtml(url)}" />`)
    .replace(/<meta[^>]+property="og:title"[^>]*>/i, `<meta data-seo-generated property="og:title" content="${title}" />`)
    .replace(/<meta[^>]+property="og:description"[^>]*>/i, `<meta data-seo-generated property="og:description" content="${description}" />`)
    .replace(/<meta[^>]+property="og:type"[^>]*>/i, `<meta data-seo-generated property="og:type" content="${route.ogType || 'website'}" />`)
    .replace(/<meta[^>]+property="og:url"[^>]*>/i, `<meta data-seo-generated property="og:url" content="${escapeHtml(url)}" />`)
    .replace(/<meta[^>]+property="og:image"[^>]*>/i, `<meta data-seo-generated property="og:image" content="${escapeHtml(image)}" />`)
    .replace(/<meta[^>]+name="twitter:title"[^>]*>/i, `<meta data-seo-generated name="twitter:title" content="${title}" />`)
    .replace(/<meta[^>]+name="twitter:description"[^>]*>/i, `<meta data-seo-generated name="twitter:description" content="${description}" />`)
    .replace(/<meta[^>]+name="twitter:image"[^>]*>/i, `<meta data-seo-generated name="twitter:image" content="${escapeHtml(image)}" />`);

  if (route.schema) {
    output = output.replace('</head>', `    <script data-seo-generated type="application/ld+json">${JSON.stringify(route.schema).replace(/</g, '\\u003c')}</script>\n  </head>`);
  }
  if (route.path === '/') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${heroPosterPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/shop') {
    const firstProduct = products.find((product) => product.images?.edges?.[0]?.node?.url);
    if (firstProduct) {
      const preloadImage = shopProductCardImage(firstProduct, 480);
      const preloadSrcset = shopProductCardSrcset(firstProduct);
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    <link rel="preload" as="image" href="${escapeHtml(preloadImage)}"${preloadSrcset ? ` imagesrcset="${escapeHtml(preloadSrcset)}" imagesizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"` : ''} fetchpriority="high" />\n`,
      );
    }
    output = deferMainStylesheet(output);
  }
  if (route.path === '/intake-filters') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/category/ceiling-blankets') {
    if (firstCeilingBlanketsProduct) {
      const preloadImage = shopProductCardImage(firstCeilingBlanketsProduct, 480);
      const preloadSrcset = shopProductCardSrcset(firstCeilingBlanketsProduct);
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    <link rel="preload" as="image" href="${escapeHtml(preloadImage)}"${preloadSrcset ? ` imagesrcset="${escapeHtml(preloadSrcset)}" imagesizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"` : ''} fetchpriority="high" />\n`,
      );
    }
    output = deferMainStylesheet(output);
  }
  if (route.path === '/category/roll-media') {
    if (firstRollMediaProduct) {
      const preloadImage = shopProductCardImage(firstRollMediaProduct, 480);
      const preloadSrcset = shopProductCardSrcset(firstRollMediaProduct);
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    <link rel="preload" as="image" href="${escapeHtml(preloadImage)}"${preloadImage.endsWith('.webp') ? ' type="image/webp"' : ''}${preloadSrcset ? ` imagesrcset="${escapeHtml(preloadSrcset)}" imagesizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"` : ''} fetchpriority="high" />\n`,
      );
    }
    output = deferMainStylesheet(output);
  }
  if (route.path === '/category/merv-filters') {
    if (firstMervFilterProduct) {
      const preloadImage = shopProductCardImage(firstMervFilterProduct, 480);
      const preloadSrcset = shopProductCardSrcset(firstMervFilterProduct);
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    <link rel="preload" as="image" href="${escapeHtml(preloadImage)}"${preloadImage.endsWith('.jpg') || preloadImage.endsWith('.jpeg') ? ' type="image/jpeg"' : ''}${preloadSrcset ? ` imagesrcset="${escapeHtml(preloadSrcset)}" imagesizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"` : ''} fetchpriority="high" />\n`,
      );
    }
    output = deferMainStylesheet(output);
  }
  if (route.path === '/blog/fiberglass-vs-tacky-panel-filters') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/shop-by-booth/nova-verta') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/category/polyester-media') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/california/north-bay-paint-booth-filters') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/california/los-angeles-paint-booth-filters') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/filter-finder') {
    output = deferMainStylesheet(output);
  }
  if (route.path === '/filter-scanner') {
    output = deferMainStylesheet(output);
  }
  if (route.path === '/brands') {
    output = deferMainStylesheet(output);
  }
  if (route.path === '/consumables/pfs-vitra') {
    output = output.replace(
      /(<meta name="viewport"[^>]*>\r?\n)/i,
      `$1    ${logoPreload}\n`,
    );
    output = deferMainStylesheet(output);
  }
  if (route.path === '/aerospace') {
    if (firstAerospaceProduct) {
      const preloadImage = shopProductCardImage(firstAerospaceProduct, 480);
      const preloadSrcset = shopProductCardSrcset(firstAerospaceProduct);
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    <link rel="preload" as="image" href="${escapeHtml(preloadImage)}"${preloadSrcset ? ` imagesrcset="${escapeHtml(preloadSrcset)}" imagesizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"` : ''} fetchpriority="high" />\n`,
      );
    }
    output = deferMainStylesheet(output);
  }

  const detail = route.price ? `<p>Starting at $${escapeHtml(route.price)} USD. Check the live product page for current variants, pricing, and availability.</p>` : '';
  const imageMarkup = route.image ? `<img src="${escapeHtml(route.image)}" alt="${title}" width="640" height="640" style="max-width:320px;width:100%;height:auto;border-radius:12px" />` : '';
  const fallback = route.path === '/'
    ? `<main data-seo-fallback><section id="home"><div><picture><source media="(max-width: 767px)" srcset="${heroPosterMobile}" /><img src="${heroPosterDesktop}" alt="" width="1600" height="900" fetchpriority="high" /></picture><div class="hero-vignette"></div></div><div><div><div class="eyebrow-brand">A Division of PFS Spray Booths — 30+ Years of Expertise</div><h1 class="hero-headline"><span class="hero-tier1">A Filter Program Built to</span><span class="hero-tier2">Manage Your Entire Booth</span></h1><p>Auto-reorder on your schedule. Booth-specific filter tracking. Backed by 30+ years of PFS Spray Booths expertise. Keep routine filter replacement organized.</p><p><a href="/shop" style="color:#93c5fd;font-weight:700">Shop Filters Now</a> · <a href="/contact" style="color:#93c5fd;font-weight:700">Get a Custom Quote</a></p></div></div></section></main>`
    : route.path === '/shop'
    ? shopFallback(title, description)
    : route.path === '/intake-filters'
    ? intakeFallback(title, description)
    : route.path === '/category/ceiling-blankets'
    ? ceilingBlanketsFallback('Ceiling Blankets', 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor.')
    : route.path === '/category/roll-media'
    ? rollMediaFallback('Roll Media', 'Roll filtration media in current catalog widths, lengths, and constructions. Confirm the intended filter stage and dimensions before ordering.')
    : route.path === '/category/merv-filters'
    ? mervFiltersFallback('MERV-Rated Filters', 'High-efficiency filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options for industrial operations.')
    : route.path === '/category/polyester-media'
    ? polyesterMediaFallback('Polyester Media', 'Durable synthetic filtration media with excellent moisture resistance. Ideal for high-humidity environments and water-based coatings.')
    : route.path === '/california/north-bay-paint-booth-filters'
    ? northBayFallback(description)
    : route.path === '/california/los-angeles-paint-booth-filters'
    ? losAngelesFallback()
    : route.path === '/filter-finder'
    ? filterFinderFallback()
    : route.path === '/filter-scanner'
    ? filterScannerFallback()
    : route.path === '/brands'
    ? brandsFallback()
    : route.path === '/consumables/pfs-vitra'
    ? vitraFallback()
    : route.path === '/aerospace'
    ? aerospaceFallback()
    : route.path === '/shop-by-booth/nova-verta'
    ? novaVertaFallback()
    : route.path === '/blog/fiberglass-vs-tacky-panel-filters'
    ? fiberglassVsTackyBlogFallback()
    : `<main data-seo-fallback style="min-height:100vh;background:#040404;color:#fff;font-family:Arial,sans-serif;padding:64px 24px"><div style="max-width:880px;margin:0 auto"><p style="color:#60a5fa;font-weight:700">PFS FILTERS</p><h1 style="font-size:clamp(2rem,6vw,4rem);line-height:1.05">${title}</h1><p style="max-width:760px;color:#c4c8d0;font-size:1.1rem;line-height:1.7">${description}</p>${detail}${imageMarkup}<p><a href="/shop" style="color:#60a5fa">Shop paint booth filters</a> · <a href="/filter-finder" style="color:#60a5fa">Find my filter</a> · <a href="/faq" style="color:#60a5fa">Filter FAQ</a> · <a href="/contact" style="color:#60a5fa">Contact PFS</a></p></div></main>`;
  return output.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

function writeDistPages() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) throw new Error(`Missing built template: ${templatePath}`);
  const template = fs.readFileSync(templatePath, 'utf8');
  for (const route of routes) {
    const targetFile = routeFile(route.path);
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, replaceMeta(template, route));
  }

  const notFound = replaceMeta(template, {
    path: '/404',
    title: 'Page Not Found | PFS Filters',
    description: 'The requested page does not exist. Browse paint booth filters, use the filter finder, or contact PFS Filters for help.',
  })
    .replace('index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1', 'noindex,nofollow')
    .replace('<div id="root">', '<div id="root" data-http-status="404">');
  fs.writeFileSync(path.join(distDir, '404.html'), notFound);
  console.log(`Generated static metadata and fallback HTML for ${routes.length} routes plus 404.html.`);
}

if (mode === '--source') writeSourceAssets();
else if (mode === '--dist') writeDistPages();
else throw new Error(`Unknown mode: ${mode}`);
