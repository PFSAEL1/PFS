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
const heroPoster = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/pfs-final-thicker-gentle-dust-hero-poster-92179f90.jpg?v=1788567595';
const today = new Date().toISOString().slice(0, 10);
const mode = process.argv[2] || '--source';

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
    output = output.replace('</head>', `    <link rel="preload" as="image" href="${heroPoster}" fetchpriority="high" />\n  </head>`);
  }

  const detail = route.price ? `<p>Starting at $${escapeHtml(route.price)} USD. Check the live product page for current variants, pricing, and availability.</p>` : '';
  const imageMarkup = route.image ? `<img src="${escapeHtml(route.image)}" alt="${title}" width="640" height="640" style="max-width:320px;width:100%;height:auto;border-radius:12px" />` : '';
  const fallback = `<main data-seo-fallback style="min-height:100vh;background:#040404;color:#fff;font-family:Arial,sans-serif;padding:64px 24px"><div style="max-width:880px;margin:0 auto"><p style="color:#60a5fa;font-weight:700">PFS FILTERS</p><h1 style="font-size:clamp(2rem,6vw,4rem);line-height:1.05">${title}</h1><p style="max-width:760px;color:#c4c8d0;font-size:1.1rem;line-height:1.7">${description}</p>${detail}${imageMarkup}<p><a href="/shop" style="color:#60a5fa">Shop paint booth filters</a> · <a href="/filter-finder" style="color:#60a5fa">Find my filter</a> · <a href="/faq" style="color:#60a5fa">Filter FAQ</a> · <a href="/contact" style="color:#60a5fa">Contact PFS</a></p></div></main>`;
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
