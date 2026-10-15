#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'client', 'public');
const distDir = path.join(root, 'dist', 'public');
const productFile = path.join(root, 'client', 'src', 'data', 'shopifyProductSnapshot.json');
const kochProductDetailsFile = path.join(root, 'client', 'src', 'data', 'kochProductDetails.json');
const faqFile = path.join(root, 'client', 'src', 'data', 'faqData.json');
const blogFile = path.join(root, 'client', 'src', 'lib', 'blogData.ts');
const brandsFile = path.join(root, 'client', 'src', 'data', 'boothBrands.ts');
const origin = 'https://www.pfsfilters.com';
const logoUrl = '/images/brands/pfs-logo-wide-420.webp';
const heroPosterMobile = '/media/pfs-hero-poster-mobile.webp';
const heroPosterDesktop = '/media/pfs-hero-poster-desktop.webp';
const heroPosterPreload = `<link rel="preload" as="image" href="/media/pfs-hero-poster-mobile.avif" type="image/avif" media="(max-width: 767px)" fetchpriority="high" />\n    <link rel="preload" as="image" href="/media/pfs-hero-poster-desktop.avif" type="image/avif" media="(min-width: 768px)" fetchpriority="high" />`;
const logoPreload = `<link rel="preload" as="image" href="${logoUrl}" type="image/webp" fetchpriority="high" />`;
const defaultProductImage = '/images/filters/fiberglass-arrestors.png';
const today = new Date().toISOString().slice(0, 10);
const mode = process.argv[2] || '--source';
const shopProductThumbnails = {
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs': { src: '/images/shop-thumbnails/22-gram-fiberglass-pads.webp', width: 480 },
  '20x20-paint-arrestor-holding-grids-w-tips-each': { src: '/images/shop-thumbnails/holding-grid.webp', width: 480 },
  '20x20-paint-pockets-paint-arrestor-30-cs': { src: '/images/shop-thumbnails/paint-pockets.webp', width: 480 },
  '20x100x2-22-gram-fiberglass-exhaust-roll-1-cs': { src: '/images/shop-thumbnails/22-gram-fiberglass-roll.webp', width: 480 },
  'pleated-air-filters-merv-10': { src: '/images/shop-thumbnails/merv-10-pleated-filter.jpg', width: 320 },
  '36x100-15-gram-fiberglass-paint-arrestor-roll-1-cs': { src: '/images/shop-thumbnails/15-gram-fiberglass-roll.webp', width: 480 },
  'bronze-membership': { src: '/images/products/membership-bronze-720.png', width: 720 },
  'silver-membership': { src: '/images/products/membership-silver-720.png', width: 720 },
  'gold-membership': { src: '/images/products/membership-gold-720.png', width: 720 },
  'platinum-membership': { src: '/images/products/membership-platinum-720.png', width: 720 },
  'koch-biomax-hepa-9999-23-375x23-375x11-5': { src: '/images/products/koch/koch-biomax-hepa-9999-transparent.png', width: 960 },
  'koch-spraystop-stk10-61x90-roll': { src: '/images/products/koch/koch-spraystop-stk10-transparent.png', width: 960 },
  'parker-loadtech-merv14-20x20x4-single-header-case-3': { src: '/images/products/parker/loadtech-merv14-manufacturer-cutout.png', width: 531 },
  'afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6': { src: '/images/products/afc/afc-blue-poly-cube-2-pocket-restored.webp', width: 960 },
};

const removePublicEmail = (value = '') => String(value)
  .replace(/\bpriority\s+phone\s*(?:&|and)\s*email\s+support\b/gi, 'Priority phone support')
  .replace(/\bpriority\s+email\s+support\b/gi, 'Priority phone support')
  .replace(/\bemail\s+support\b/gi, 'Phone support')
  .replace(/\bemail\s+or\s+give\s+us\s+a\s+call\.?\s*/gi, 'give us a call. ')
  .replace(/\bemail\s+us\s+or\s+call\b/gi, 'call')
  .replace(/\borders@pfsfilters\.com\b/gi, '')
  .replace(/\s+([,.;:!?])/g, '$1')
  .replace(/([.!?])\s*([.!?])/g, '$1')
  .replace(/\s{2,}/g, ' ')
  .trim();
const products = JSON.parse(fs.readFileSync(productFile, 'utf8')).map((edge) => ({
  ...edge.node,
  description: removePublicEmail(edge.node.description || ''),
}));
const kochProductDetails = JSON.parse(fs.readFileSync(kochProductDetailsFile, 'utf8'));
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
  return localThumbnail?.src || sizedImageUrl(fallback, width) || defaultProductImage;
};
const shopProductCardSrcset = (product) => {
  const localThumbnail = shopProductThumbnails[product.handle];
  const fallback = product.images?.edges?.[0]?.node?.url;
  return localThumbnail
    ? `${localThumbnail.src} ${localThumbnail.width}w`
    : shopifySrcset(fallback) || `${defaultProductImage} 800w`;
};
const avifVariant = (src = '') => {
  if (!src.startsWith('/')) return '';
  const candidate = src.replace(/\.(webp|png|jpe?g)$/i, '.avif');
  if (candidate === src) return '';
  return fs.existsSync(path.join(publicDir, candidate.slice(1))) ? candidate : '';
};
const avifSrcset = (srcset = '') => {
  if (!srcset || srcset.includes('cdn.shopify.com')) return '';
  const converted = srcset.split(',').map((part) => {
    const [url, descriptor] = part.trim().split(/\s+/);
    const avif = avifVariant(url);
    return avif ? `${avif}${descriptor ? ` ${descriptor}` : ''}` : '';
  });
  return converted.every(Boolean) ? converted.join(', ') : '';
};
const lcpPreloadTag = (href, srcset, sizes) => {
  const avifHref = avifVariant(href);
  const source = avifHref || href;
  const set = avifHref ? (avifSrcset(srcset) || avifHref) : srcset;
  const type = source.endsWith('.avif')
    ? ' type="image/avif"'
    : source.endsWith('.webp')
      ? ' type="image/webp"'
      : source.endsWith('.jpg') || source.endsWith('.jpeg')
        ? ' type="image/jpeg"'
        : '';
  return `<link rel="preload" as="image" href="${escapeHtml(source)}"${type}${set ? ` imagesrcset="${escapeHtml(set)}" imagesizes="${sizes}"` : ''} fetchpriority="high" />`;
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
  { slug: 'fiberglass-arrestors', title: 'Fiberglass Paint Arrestors', description: 'Fiberglass paint arrestor pads and roll media for spray booth exhaust filtration. Products shown here are explicitly identified as fiberglass in the catalog.' },
  { slug: 'tacky-panels', title: 'Tacky Panel Filters', description: 'Adhesive-coated panels trap dust, debris, and airborne particles at the intake. Keeps contaminants out of your booth.' },
  { slug: 'ceiling-blankets', title: 'Ceiling Blankets', description: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor.' },
  { slug: 'roll-media', title: 'Roll Media', description: 'Roll filtration media in current catalog widths, lengths, and constructions. Confirm the intended filter stage and dimensions before ordering.' },
  { slug: 'merv-filters', title: 'MERV-Rated Filters', description: 'High-efficiency filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options for industrial operations.' },
  { slug: 'polyester-media', title: 'Polyester Media', description: 'Durable synthetic filtration media with excellent moisture resistance. Ideal for high-humidity environments and water-based coatings.' },
  { slug: 'pre-filters', title: 'Pre-Filters', description: 'First-stage filtration that extends the life of your primary ceiling media by up to 50%. Catches large particles before they reach expensive diffusion blankets.' },
];

const staticRoutes = [
  { path: '/', title: 'Paint Booth Filters for Every Booth Brand | PFS Filters', description: 'Paint booth filters for every booth brand — exhaust, intake, ceiling, prefilter, and Andreae. Backed by 30+ years of PFS Spray Booths. In stock, ships fast.', h1: 'A Filter Program Built to Manage Your Entire Booth', priority: '1.0', changefreq: 'weekly' },
  { path: '/auth', title: 'Sign In - PFS Filters Account', description: 'Sign in to your PFS Filters account to manage orders, track memberships, and access exclusive discounts.', noindex: true },
  { path: '/thank-you', title: 'Thank You - PFS Filters', description: 'Thanks for reaching out to PFS Filters. Our team has received your message and will get back to you shortly.', noindex: true },
  { path: '/submit-review', title: 'Submit a Review - PFS Filters', description: 'Share your experience with PFS Filters. Leave a review to help other shops find the right paint booth filters.', noindex: true },
  { path: '/dashboard', title: 'Dashboard - PFS Filters Account', description: 'Manage your PFS Filters account, memberships, and orders.', noindex: true },
  { path: '/filter-database', title: 'Filter Database | PFS Filters', description: 'Administrative filter database.', noindex: true },
  { path: '/shop', title: 'Shop Paint Booth Filters, Intake & Exhaust Media | PFS Filters', description: 'Shop fiberglass paint arrestors, tacky intake panels, ceiling media, MERV filters, roll media, and booth-specific replacements. Stocked items typically process in 1–2 business days.', h1: 'Shop Paint Booth Filters', priority: '1.0', changefreq: 'daily' },
  { path: '/paint-booth-filters', title: 'Paint Booth Filters by Type, Size & Booth | PFS Filters', description: 'Browse paint booth intake, ceiling, prefilter, and exhaust media by type, size, and booth brand. Get sizing help and 5% Subscribe & Save on eligible products.', h1: 'Paint Booth Filters for Intake, Ceiling, Prefilter & Exhaust Stages', priority: '0.9', changefreq: 'monthly' },
  { path: '/andreae-paint-booth-filters', title: 'Andreae Paint Booth Filters — AF Pad & Roll Variants | PFS Filters', description: 'Review current Andreae-style accordion paint arrestor variants, including AF213, AF223, AF413, AF423, AF813, AF923, AF113, and AF123.', h1: 'Andreae Paint Booth Filters — Current Pad & Roll Variants', priority: '0.9', changefreq: 'monthly' },
  { path: '/exhaust-filters', title: 'Paint Booth Exhaust Filters | PFS Filters', description: 'Compare fiberglass paint arrestor pads and rolls, Paint Pockets, and Andreae-style accordion media. Check current options and availability on each product page.', h1: 'Paint Booth Exhaust Filters — Fiberglass, Paint Pockets & Andreae Style', priority: '0.9', changefreq: 'weekly' },
  { path: '/intake-filters', title: 'Paint Booth Intake Filters — Tacky, Pleated & Ceiling Media | PFS Filters', description: 'Compare tacky panels, ceiling diffusion media, MERV-rated pleated filters, and pocket bag filters. Verify the equipment stage and dimensions before ordering.', h1: 'Paint Booth Intake Filters — Tacky Panels & Ceiling Media', priority: '0.9', changefreq: 'weekly' },
  { path: '/ceiling-filters', title: 'Paint Booth Ceiling Filters — Downdraft Diffusion Media | PFS Filters', description: 'Compare paint booth ceiling diffusion media and current size variants for applicable downdraft and semi-downdraft systems. Verify the grid before ordering.', h1: 'Paint Booth Ceiling Filters for Downdraft Booths', priority: '0.9', changefreq: 'weekly' },
  { path: '/prefilters', title: 'Paint Booth Prefilters & First-Stage Filter Guidance | PFS Filters', description: 'Learn where paint booth prefilters and first-stage media may be used, what details to verify, and when a multi-stage arrangement needs review.', h1: 'Paint Booth Prefilters & First-Stage Filter Guidance', priority: '0.7', changefreq: 'monthly' },
  { path: '/neshap-compliant-paint-booth-filters', title: 'NESHAP Paint Booth Filter Guide — Subpart 6H & Method 319 | PFS Filters', description: 'Learn how EPA Subpart 6H and Method 319 relate to paint booth exhaust filtration, product evidence, and facility responsibilities.', h1: 'NESHAP Paint Booth Filter Guide — Standard & Aerospace Systems', priority: '0.8', changefreq: 'monthly' },
  { path: '/garmat-paint-booth-filters', title: 'Garmat Paint Booth Filter Guide | PFS Filters', description: 'Review model and filter-stage guidance for Garmat paint booths, then verify the installed filter label, construction, position, and dimensions before ordering.', h1: 'Replacement Filter Guidance for Garmat Paint Booths', priority: '0.8', changefreq: 'monthly' },
  { path: '/accudraft-paint-booth-filters', title: 'Accudraft Paint Booth Filter Guide | PFS Filters', description: 'Review filter-stage and model guidance for Accudraft paint booths, then verify the current filter label, position, and dimensions before ordering.', h1: 'Replacement Filter Guidance for Accudraft Paint Booths', priority: '0.8', changefreq: 'monthly' },
  { path: '/gfs-paint-booth-filters', title: 'GFS Paint Booth Filter Guide | PFS Filters', description: 'Review filter-stage and model guidance for Global Finishing Solutions paint booths, then confirm the model, position, and dimensions before ordering.', h1: 'Replacement Filter Guidance for Global Finishing Solutions Booths', priority: '0.8', changefreq: 'monthly' },
  { path: '/col-met-paint-booth-filters', title: 'Col-Met / RTT Paint Booth Filter Guide | PFS Filters', description: 'Review model and filter-stage guidance for Col-Met paint booths and prep stations. Verify installed media and dimensions before ordering.', h1: 'Replacement Filter Guidance for Col-Met / RTT Paint Booths', priority: '0.8', changefreq: 'monthly' },
  { path: '/pfs-spray-booth-filters', title: 'PFS Spray Booth Replacement Filter Guide | PFS Filters', description: 'Find intake, ceiling, exhaust, and prefilter guidance for PFS Spray Booths. Send the model and serial details to PFS for fitment review.', h1: 'Replacement Filter Guidance for PFS Spray Booths', priority: '0.9', changefreq: 'monthly' },
  { path: '/california/north-bay-paint-booth-filters', title: 'North Bay Paint Booth Filters | PFS Filters Santa Rosa', description: 'Paint booth filter ordering and fitment support for Santa Rosa, Petaluma, Sonoma County, Marin County, and the North Bay from PFS Filters.', h1: 'Paint Booth Filters for the North Bay and Sonoma County', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/bay-area-paint-booth-filters', title: 'Bay Area Paint Booth Filters | San Jose & Peninsula', description: 'Paint booth filter selection and ordering support for San Jose, the Peninsula, East Bay, and greater San Francisco Bay Area finishing operations.', h1: 'Paint Booth Filters for the Bay Area and San Jose', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/sacramento-paint-booth-filters', title: 'Sacramento Paint Booth Filters | PFS Filters', description: 'Paint booth filter ordering and selection support for Sacramento, West Sacramento, Roseville, and Capital Region fleet and finishing operations.', h1: 'Paint Booth Filters for Sacramento and the Capital Region', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/carb-paint-booth-filter-compliance', title: 'California Paint Booth Filter Guide | PFS Filters', description: 'Understand how CARB, California air districts, facility permits, and product documentation relate to paint booth filter selection and maintenance.', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/napa-valley-paint-booth-filters', title: 'Napa Valley Paint Booth Filters | PFS Filters', description: 'Paint booth filter guidance for Napa Valley winery equipment, agricultural, collision, and facility refinishing operations.', h1: 'Paint Booth Filters for Napa Valley Finishing Operations', priority: '0.7', changefreq: 'monthly' },
  { path: '/california/central-valley-paint-booth-filters', title: 'Central Valley Paint Booth Filters | Fresno & PFS', description: 'Paint booth filter support for Fresno and Central Valley agricultural, trucking, construction-equipment, and industrial finishing operations.', h1: 'Paint Booth Filters for Fresno and the Central Valley', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/bakersfield-paint-booth-filters', title: 'Bakersfield Paint Booth Filters | PFS Filters', description: 'Paint booth filter selection support for Bakersfield and Kern County energy-service, agricultural, fleet, truck, and collision operations.', h1: 'Paint Booth Filters for Bakersfield and Kern County', priority: '0.7', changefreq: 'monthly' },
  { path: '/california/san-diego-paint-booth-filters', title: 'San Diego Paint Booth Filters | PFS Filters', description: 'Paint booth filter guidance for San Diego aerospace, defense, marine, automotive, and industrial finishing operations.', h1: 'Paint Booth Filters for San Diego County', priority: '0.8', changefreq: 'monthly' },
  { path: '/california/los-angeles-paint-booth-filters', title: 'Los Angeles Paint Booth Filters | PFS Filters', description: 'Paint booth filter ordering and fitment support for Los Angeles County collision, fleet, fabrication, aerospace, and entertainment finishing work.', h1: 'Paint Booth Filters for Los Angeles County', priority: '0.8', changefreq: 'monthly' },
  { path: '/filter-finder', title: 'Paint Booth Filter Finder by Booth, Stage & Size | PFS Filters', description: 'Narrow paint booth filter options by booth type, brand, model, filter stage, and size. Verify the product record and actual dimensions before ordering.', h1: 'What kind of booth do you have?', priority: '0.9', changefreq: 'monthly' },
  { path: '/shop-by-size', title: 'Shop Paint Booth Filters by Size - 20x20, 20x25, Custom Cuts | PFS Filters', description: 'Browse current paint booth filter variants by size. Confirm actual dimensions and request a review for custom or hard-to-find products before ordering.', h1: 'Find Your Filter Size', priority: '0.8', changefreq: 'weekly' },
  { path: '/shop-by-type', title: 'Shop Paint Booth Filters by Type - Intake, Exhaust, Ceiling & More | PFS Filters', description: 'Browse paint booth filters by type: fiberglass paint arrestors (exhaust), tacky panel filters (intake), ceiling blankets, roll media, and MERV-rated filters.', h1: 'Shop by Filter Type', priority: '0.8', changefreq: 'weekly' },
  { path: '/shop-by-filter-type', title: 'Shop Paint Booth Filters by Filter Type — Fiberglass, Ceiling, Intake, Exhaust | PFS Filters', description: 'Browse paint booth filters by type: fiberglass paint arrestors, ceiling diffusion media, tacky intake panels, polyester pads, MERV-rated pleated filters, roll media, pre-filters, and aerospace HEPA media.', h1: 'Shop by Filter Type', priority: '0.8', changefreq: 'monthly' },
  { path: '/shop-by-booth', title: 'Paint Booth Filter Guidance by Booth Brand | PFS Filters', description: 'Review model and filter-stage guidance for major spray booth brands. Confirm the booth model, filter position, product record, and actual dimensions before ordering.', h1: 'Shop by Booth Brand', priority: '0.9', changefreq: 'monthly' },
  { path: '/shop-by-booth-type', title: 'Paint Booth Filter Guidance by Airflow Type | PFS Filters', description: 'Compare typical filter positions for downdraft, crossdraft, semi-downdraft, side-downdraft, open-face, and prep-station booths, then verify the model and dimensions.', h1: 'Choose Your Airflow', priority: '0.8', changefreq: 'monthly' },
  { path: '/brands', title: 'Paint Booth Filter Brands - PFS Filters, Koch, Permatron & More', description: 'Browse paint booth filter and media brands represented in the current PFS Filters catalog. Verify the product record, filter stage, and dimensions before ordering.', h1: 'Filter Brands We Carry', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', title: 'Paint Booth Filter FAQ: Sizes, Types, Replacement & Shipping | PFS Filters', description: 'Straight answers from PFS Filters about spray booth filter types, sizing, replacement schedules, shipping, subscriptions, returns, and aerospace filtration.', h1: 'Paint Booth Filter Questions, Answered', priority: '0.9', changefreq: 'monthly' },
  { path: '/blog', title: 'Spray Booth Maintenance & Filter Guide - Expert Tips & How-To | PFS Filters', description: 'Expert advice on paint booth filters, maintenance schedules, filter selection, and troubleshooting. Learn from industry professionals with 20+ years experience.', h1: 'Spray Booth Knowledge Center', priority: '0.8', changefreq: 'monthly' },
  { path: '/why-choose-us', title: 'Why Choose PFS Filters | Premium Spray Booth Filtration Expert', description: 'Choose PFS Filters for paint booth filter catalog transparency, fitment review, qualified fulfillment guidance, and support backed by PFS Spray Booths experience.', h1: 'Why Choose PFS Filters?', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', title: 'Contact PFS Filters - Get a Custom Quote or Filter Help', description: 'Contact PFS Filters for custom filter quotes, bulk pricing, or technical support. Call 855-496-7969 or use our request form. We match any booth make/model.', h1: 'Get In Touch', priority: '0.7', changefreq: 'monthly' },
  { path: '/returns', title: 'Returns & Refunds Policy | PFS Filters', description: 'Review the PFS Filters return policy for unopened packages, the five-business-day return window, shipping-cost deductions, and the 25% restocking fee.', h1: 'Returns & Refunds Policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/privacy-policy', title: 'Privacy Policy - PFS Filters', description: 'Read the PFS Filters privacy policy to understand how we collect, use, and protect your personal information.', h1: 'Privacy Policy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms-of-service', title: 'Terms of Service - PFS Filters', description: 'Read the PFS Filters terms governing website use, orders, Subscribe & Save, shipping, returns, product guidance, and customer accounts.', h1: 'Terms of Service', priority: '0.2', changefreq: 'yearly' },
  { path: '/memberships', title: 'Paint Booth Filter Memberships - Save on Every Order | PFS Filters', description: 'Join PFS Filters membership for exclusive discounts, auto-reorder scheduling, AI filter scanner, and dedicated support. Plans from $29/month. Save 6-10% on every order.', h1: 'Save More, Order Smarter', priority: '0.5', changefreq: 'monthly' },
  { path: '/consumables', title: 'Consumables - Paint Booth Supplies | PFS Filters', description: 'Shop paint booth consumables from PFS Filters, including absorbent mat rolls, glass shield coatings, and booth maintenance supplies.', h1: 'Booth Consumables', priority: '0.6', changefreq: 'monthly' },
  { path: '/consumables/pfs-vitra', title: 'PFS VITRA - Glass Shield Washable Coating | PFS Filters', description: 'PFS VITRA washable glass shield coating. Protect your paint booth glass from overspray. Easy to apply, easy to wash off. Available from PFS Filters.', h1: 'PFS VITRA', priority: '0.5', changefreq: 'monthly' },
  { path: '/consumables/pfs-vanguard', title: 'PFS VANGUARD™ Complete Booth Protection Kit | PFS Filters', description: 'PFS VANGUARD™ Complete Booth Protection Kit includes premium Booth Coating and Glass Shield Coating. Protect booth surfaces and viewing glass from overspray buildup.', h1: 'PFS VANGUARD™', priority: '0.5', changefreq: 'monthly' },
  { path: '/aerospace', title: 'Aerospace Paint Booth Filters | HEPA-XFP, NESHAP 319 Bags & MRO Media | PFS Filters', description: 'Shop aerospace-grade paint booth filtration: HEPA-XFP multi-pocket bags, NESHAP 319 final-stage filters, CG100 2-pocket bags, ME/PT intake panels, SFR blankets & CPA roll media. Built for MRO and aircraft finishing.', h1: 'Aerospace Paint Booth Filters', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/aerospace-paint-booth-filters', title: 'Aerospace Paint Booth Filters & MRO Filtration | PFS Filters', description: 'Premium aerospace paint booth filtration solutions. Shop ceiling diffusion media and request custom multi-stage exhaust systems for MRO and aircraft finishing.', h1: 'Aerospace & Aircraft Paint Booth Filtration', priority: '0.9', changefreq: 'monthly' },
  { path: '/industries/automotive-paint-booth-filters', title: 'Automotive Paint Booth Filters | PFS Filters', description: 'Compare automotive paint booth intake, ceiling, prefilter, and exhaust filters. Verify booth configuration, stage, dimensions, and fit with PFS guidance.', priority: '0.9', changefreq: 'monthly' },
  { path: '/filter-scanner', title: 'Photo-Assisted Paint Booth Filter Review | PFS Filters', description: 'Use a filter photo to narrow catalog candidates, then verify the booth position, label, and actual dimensions before ordering.', h1: 'Filter Scanner', priority: '0.5', changefreq: 'monthly' },
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

const automotiveFilterFaqs = [
  {
    question: 'How do I identify the correct automotive paint booth filter?',
    answer: 'Start with the booth manufacturer and model, the exact filter position, the existing filter or opening dimensions, airflow direction, and any label or part number. A clear photo can help narrow candidates, but appearance alone does not prove fitment.',
  },
  {
    question: 'What is the difference between intake and exhaust filters?',
    answer: 'Intake filters are used in documented incoming-air stages, while exhaust filters or paint arrestors are used in documented overspray-capture stages. The correct media depends on the installed booth design and product requirements; the two stages are not automatically interchangeable.',
  },
  {
    question: 'How often should automotive booth filters be replaced?',
    answer: 'There is no universal interval. Use the booth and filter manufacturer instructions, applicable pressure or manometer readings, operating hours, coating load, inspection results, permit conditions, and facility procedures.',
  },
  {
    question: 'Does a replacement filter make a paint booth compliant?',
    answer: 'No filter by itself establishes facility compliance. Compliance depends on the complete booth, ventilation, coating process, installation, maintenance, permits, and applicable rules. Obtain qualified site-specific guidance when compliance is in question.',
  },
  {
    question: 'Can PFS help with an uncertain or custom filter request?',
    answer: 'Yes. Send the booth make and model, filter position, actual dimensions, current part number when available, quantity, and clear photos. PFS can review the request against the current catalog and available product information.',
  },
];

const categoryRoutes = categories.map((category) => ({
  path: `/category/${category.slug}`,
  title: `${category.title} - Paint Booth Filters | PFS Filters`,
  description: category.description,
  h1: category.title,
  priority: '0.9',
  changefreq: 'weekly',
}));

const brandRoutes = brandSlugs.map((slug) => ({
  path: `/shop-by-booth/${slug}`,
  title: `${slug === 'global-finishing-solutions' ? 'GFS' : titleCase(slug)} Paint Booth Filter Guide | PFS Filters`,
  description: `Review filter positions and replacement guidance for ${titleCase(slug)} spray booths. Confirm the installed model, stage, and dimensions before ordering.`,
  h1: `${slug === 'global-finishing-solutions' ? 'Global Finishing Solutions' : titleCase(slug)} Paint Booth Filters`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const blogRoutes = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} | PFS Filters`,
  description: post.excerpt,
  h1: post.title,
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
  const kochDetails = kochProductDetails[product.handle];
  const isParkerCase = product.handle === 'parker-loadtech-merv14-20x20x4-single-header-case-3';
  const isAfcCase = product.handle === 'afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6';
  const imagePath = shopProductCardImage(product, 800);
  const image = imagePath.startsWith('/') ? absoluteUrl(imagePath) : imagePath;
  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode || 'USD';
  const availability = (isParkerCase || isAfcCase)
    ? 'https://schema.org/BackOrder'
    : product.variants?.edges?.some((edge) => edge.node.availableForSale)
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';
  const pathname = `/product/${product.handle}`;
  // sku / vendor come from the Shopify snapshot; guarded so the schema still
  // validates for older snapshots taken before those fields were queried.
  const sku = product.variants?.edges?.[0]?.node?.sku || undefined;
  const brandName = product.vendor || 'PFS Filters';
  const imageNode = product.images?.edges?.[0]?.node;
  return {
    path: pathname,
    title: kochDetails?.seoTitle || (product.handle === 'swiss-flow-downdraft-ceiling-diffusion-media-600g-ultra-premium'
      ? 'Swiss Flow 600G Ceiling Media | PFS Filters'
      : `${product.title} | PFS Filters`),
    description: kochDetails?.seoDescription || truncate(product.description || `Shop ${product.title} from PFS Filters.`),
    h1: product.title,
    priority: '0.9',
    changefreq: 'weekly',
    ogType: 'product',
    image,
    imageWidth: kochDetails ? 960 : undefined,
    imageHeight: kochDetails ? 960 : undefined,
    imageAlt: imageNode?.altText || product.title,
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
          merchantReturnDays: 5,
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

const automotiveRoute = staticRoutes.find((route) => route.path === '/industries/automotive-paint-booth-filters');
if (automotiveRoute) {
  automotiveRoute.schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'PFS Filters',
        url: `${origin}/`,
        publisher: { '@id': `${origin}/#store` },
      },
      {
        '@type': 'CollectionPage',
        '@id': `${origin}/industries/automotive-paint-booth-filters#webpage`,
        name: 'Automotive Paint Booth Filters',
        description: automotiveRoute.description,
        url: absoluteUrl(automotiveRoute.path),
        isPartOf: { '@id': `${origin}/#website` },
        provider: { '@id': `${origin}/#store` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
          { '@type': 'ListItem', position: 3, name: 'Automotive Paint Booth Filters', item: absoluteUrl(automotiveRoute.path) },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: automotiveFilterFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

const aerospaceIndustryRoute = staticRoutes.find((route) => route.path === '/industries/aerospace-paint-booth-filters');
if (aerospaceIndustryRoute) {
  aerospaceIndustryRoute.schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'PFS Filters',
        url: `${origin}/`,
        publisher: { '@id': `${origin}/#store` },
      },
      {
        '@type': 'CollectionPage',
        '@id': `${origin}/industries/aerospace-paint-booth-filters#webpage`,
        name: 'Aerospace Paint Booth Filters & Multi-Stage Filtration',
        description: aerospaceIndustryRoute.description,
        url: absoluteUrl(aerospaceIndustryRoute.path),
        isPartOf: { '@id': `${origin}/#website` },
        provider: { '@id': `${origin}/#store` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters` },
          { '@type': 'ListItem', position: 3, name: 'Aerospace Paint Booth Filtration', item: absoluteUrl(aerospaceIndustryRoute.path) },
        ],
      },
    ],
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

const primaryNavigation = [
  ['/', 'Home'],
  ['/shop', 'All Products'],
  ['/shop-by-filter-type', 'Shop by Filter Type'],
  ['/shop-by-booth', 'Shop by Booth Brand'],
  ['/shop-by-booth-type', 'Shop by Booth Type'],
  ['/shop-by-size', 'Shop by Size'],
  ['/filter-finder', 'Filter Finder'],
  ['/consumables', 'Consumables'],
  ['/industries/automotive-paint-booth-filters', 'Automotive Filters'],
  ['/industries/aerospace-paint-booth-filters', 'Aerospace Filters'],
  ['/blog', 'Guides'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
];

const footerNavigation = [
  ['/why-choose-us', 'Why Choose Us'],
  ['/memberships', 'Memberships'],
  ['/returns', 'Returns & Refunds'],
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms-of-service', 'Terms of Service'],
  ['/california/north-bay-paint-booth-filters', 'California Service Areas'],
  ['/california/carb-paint-booth-filter-compliance', 'California Compliance Guide'],
];

function routeHeading(route) {
  if (route.h1) return route.h1;
  return route.title
    .replace(/\s+\|\s+(?:PFS Filters|PFS)$/i, '')
    .replace(/\s+—\s+PFS$/i, '');
}

function routeLabel(route) {
  if (route.path.startsWith('/product/')) return route.title.replace(/\s+\|\s+PFS Filters$/i, '');
  return routeHeading(route);
}

function breadcrumbItems(route) {
  if (route.path === '/') return [];

  const items = [['/', 'Home']];
  if (route.path.startsWith('/product/')) items.push(['/shop', 'Shop']);
  else if (route.path.startsWith('/category/')) items.push(['/shop-by-filter-type', 'Filter Types']);
  else if (route.path.startsWith('/shop-by-booth/')) items.push(['/shop-by-booth', 'Booth Brands']);
  else if (route.path.startsWith('/blog/')) items.push(['/blog', 'Guides']);
  else if (route.path.startsWith('/california/')) items.push(['/california/north-bay-paint-booth-filters', 'California']);
  else if (route.path.startsWith('/industries/')) items.push(['/paint-booth-filters', 'Paint Booth Filters']);
  else if (route.path.startsWith('/consumables/')) items.push(['/consumables', 'Consumables']);

  items.push([route.path, routeLabel(route)]);
  return items;
}

function navigationFallback() {
  const links = primaryNavigation
    .map(([href, label]) => `<a href="${href}" style="color:#e5e7eb;text-decoration:none;font-size:14px;font-weight:700;white-space:nowrap">${label}</a>`)
    .join('');
  return `<header data-seo-navigation>
    <nav aria-label="Primary" style="position:fixed;inset:0 0 auto;z-index:100;background:rgba(0,0,0,.96);border-bottom:1px solid rgba(255,255,255,.1)">
      <div style="max-width:1280px;margin:0 auto;padding:0 16px">
        <div style="min-height:96px;display:flex;align-items:center;gap:24px">
          <a href="/" aria-label="PFS Filters home" style="flex:0 0 auto"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;width:198px;max-width:36vw;height:auto" /></a>
          <div style="display:flex;align-items:center;gap:18px;overflow:auto;padding:12px 0">${links}</div>
        </div>
      </div>
    </nav>
  </header>`;
}

function breadcrumbsFallback(route) {
  const items = breadcrumbItems(route);
  if (items.length === 0) return '';
  const list = items.map(([href, label], index) => {
    const current = index === items.length - 1;
    return `<li style="display:inline">${current ? `<span aria-current="page">${escapeHtml(label)}</span>` : `<a href="${href}" style="color:#93c5fd">${escapeHtml(label)}</a>`}${current ? '' : ' <span aria-hidden="true">›</span> '}</li>`;
  }).join('');
  return `<nav data-seo-breadcrumbs aria-label="Breadcrumb" style="position:static;background:#050505;border:0;padding:112px 24px 16px;color:#c4c8d0;font-family:Arial,sans-serif;font-size:14px"><ol style="max-width:1280px;margin:0 auto;padding:0;list-style:none">${list}</ol></nav>`;
}

function footerFallback() {
  const quickLinks = [...primaryNavigation, ...footerNavigation]
    .filter(([href], index, list) => list.findIndex(([candidate]) => candidate === href) === index)
    .map(([href, label]) => `<li><a href="${href}" style="color:#c4c8d0">${label}</a></li>`)
    .join('');
  const routeDirectory = routes
    .filter((route) => !route.noindex)
    .map((route) => `<li><a href="${route.path}" style="color:#9ca3af">${escapeHtml(routeLabel(route))}</a></li>`)
    .join('');

  return `<footer data-seo-footer style="background:#080808;color:#fff;border-top:1px solid rgba(255,255,255,.1);padding:48px 24px;font-family:Arial,sans-serif">
    <div style="max-width:1280px;margin:0 auto">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px">
        <section><h2 style="font-size:20px;margin:0 0 12px">PFS Filters</h2><p style="color:#9ca3af;line-height:1.6">Paint booth filtration products and fitment support backed by the PFS Spray Booths team.</p></section>
        <nav aria-label="Footer" style="position:static;background:transparent;border:0"><h2 style="font-size:16px;margin:0 0 12px">Quick Links</h2><ul style="display:grid;gap:8px;margin:0;padding-left:18px">${quickLinks}</ul></nav>
        <section><h2 style="font-size:16px;margin:0 0 12px">Contact</h2><p style="color:#9ca3af;line-height:1.6"><a href="tel:855-496-7969" style="color:#c4c8d0">855-496-7969</a><br />1400 Airport Blvd<br />Santa Rosa, CA 95403</p></section>
      </div>
      <details style="margin-top:32px;border-top:1px solid rgba(255,255,255,.1);padding-top:20px">
        <summary style="cursor:pointer;font-weight:700;color:#e5e7eb">Browse all filters and guides</summary>
        <nav aria-label="Complete site directory" style="position:static;background:transparent;border:0"><ul style="columns:280px auto;column-gap:32px;margin:20px 0 0;padding-left:18px;line-height:1.8">${routeDirectory}</ul></nav>
      </details>
    </div>
  </footer>`;
}

function sitemapXml() {
  const entries = routes.filter((route) => !route.noindex).map((route) => {
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
  const main = `# PFS Filters\n\n> PFS Filters sells paint booth filters and industrial filtration products backed by the PFS Spray Booths team in Santa Rosa, California.\n\n## Primary resources\n\n- [Shop all paint booth filters](${origin}/shop)\n- [Filter finder by booth and size](${origin}/filter-finder)\n- [Shop by booth manufacturer](${origin}/shop-by-booth)\n- [Paint booth filter FAQ](${origin}/faq)\n- [Guides and maintenance resources](${origin}/blog)\n- [Aerospace paint booth filtration](${origin}/industries/aerospace-paint-booth-filters)\n- [Contact PFS Filters](${origin}/contact)\n- [Returns policy](${origin}/returns)\n\n## Business facts\n\n- Address: 1400 Airport Blvd, Santa Rosa, CA 95403, United States\n- Phone: 855-496-7969\n- Parent organization: PFS Spray Booths\n- Service area: United States\n- Most stocked orders are processed in 1–2 business days; freight, custom, and special-order timing varies.\n- Opened packages are not returnable. Unopened packages may be returned within five business days for a refund less shipping costs and a 25% restocking fee.\n\n## Important product guidance\n\nIntake filters clean incoming air. Exhaust filters capture paint overspray. Correct selection depends on the booth, filter position, dimensions, airflow, media type, and coating process. PFS Filters does not claim that a product by itself makes a facility compliant with EPA Method 319, NESHAP, or a permit.\n`;
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
      image: (() => {
        const image = shopProductCardImage(product, 800);
        return image?.startsWith('/') ? absoluteUrl(image) : image || null;
      })(),
      variants: product.variants?.edges?.map((edge) => ({
        name: edge.node.title,
        sku: edge.node.sku || null,
        price: edge.node.price,
        availableForSale: edge.node.availableForSale,
      })) || [],
    })),
  }, null, 2) + '\n';
}

function shopFallback(title, description) {
  const visibleProducts = products
    .filter((product) => !product.title.toLowerCase().includes('membership'));
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
            ${imageUrl ? `<picture>${avifSrcset(srcset) ? `<source type="image/avif" srcset="${escapeHtml(avifSrcset(srcset))}" sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" />` : ''}<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)" alt="${escapeHtml(alt)}" width="480" height="480" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" fetchpriority="${index === 0 ? 'high' : 'auto'}" style="width:100%;height:100%;object-fit:contain;padding:12px;box-sizing:border-box;filter:brightness(.95) contrast(1.05)" /></picture>` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280">Image Coming Soon</div>`}
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
      <img src="${logoUrl}" alt="" aria-hidden="true" width="420" height="127" decoding="async" style="position:absolute;right:0;top:64px;width:min(540px,60vw);height:auto;opacity:.045" />
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
      <img src="${logoUrl}" alt="" aria-hidden="true" width="420" height="127" decoding="async" style="position:absolute;right:0;top:64px;width:min(540px,60vw);height:auto;opacity:.045" />
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
        <h1 style="margin:0 0 16px;font-size:clamp(2.6rem,10vw,3.5rem);line-height:1.05;font-weight:800;letter-spacing:0;color:#fff">Nova Verta Paint Booth Filters</h1>
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
        <h1 style="margin:0 0 16px;font-size:clamp(2.25rem,7vw,3rem);line-height:1.15;font-weight:800;color:#fff">Fiberglass vs. Tacky Panel Filters</h1>
        <p style="max-width:768px;margin:0 0 24px;color:rgba(255,255,255,.7);font-family:Arial,sans-serif;font-size:20px;line-height:1.5">Fiberglass paint arrestors and tackified panel media are not automatically interchangeable. Compare the documented filter stage, dimensions, media, airflow direction, and equipment requirements before ordering.</p>
        <p style="margin:0 0 40px;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,.7)">By <strong style="color:#fff">PFS Filters Editorial Team</strong></p>
        <div style="aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#151515">
          <img src="/images/cat_fiberglass_arrestors.png" alt="Fiberglass and tacky panel filter media comparison" width="1280" height="720" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block" />
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

function automotiveIndustryFallback() {
  const stages = [
    ['Intake & Prefilter Media', '/intake-filters', 'Review documented incoming-air stages, airflow direction, depth, and actual dimensions.'],
    ['Ceiling & Diffusion Media', '/ceiling-filters', 'Compare media for the installed ceiling or supply-air stage in applicable booth configurations.'],
    ['Exhaust & Overspray Arrestors', '/exhaust-filters', 'Review fiberglass, pocket, and accordion-style media for documented overspray-capture stages.'],
    ['Filter Finder', '/filter-finder', 'Start with the booth type, manufacturer, model, stage, dimensions, and existing product information.'],
  ];
  const cards = stages.map(([name, href, copy]) => `<article style="border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.035);padding:24px">
      <h2 style="margin:0 0 10px;color:#fff;font-size:22px;line-height:1.2">${name}</h2>
      <p style="margin:0 0 16px;color:rgba(255,255,255,.62);font-family:Arial,sans-serif;font-size:15px;line-height:1.6">${copy}</p>
      <a href="${href}" style="color:#60a5fa;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none">Review this stage →</a>
    </article>`).join('');
  const faqItems = automotiveFilterFaqs.map((faq) => `<article style="border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.025);padding:20px">
      <h3 style="margin:0 0 8px;color:#fff;font-size:18px;line-height:1.3">${escapeHtml(faq.question)}</h3>
      <p style="margin:0;color:rgba(255,255,255,.62);font-family:Arial,sans-serif;font-size:15px;line-height:1.65">${escapeHtml(faq.answer)}</p>
    </article>`).join('');

  return `<main data-seo-fallback id="automotive-industry-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <nav style="border-bottom:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.95)">
      <div style="height:96px;max-width:1280px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between">
        <a href="/" aria-label="PFS Filters home"><img src="${logoUrl}" alt="PFS Filters" width="420" height="127" fetchpriority="high" decoding="async" style="display:block;height:64px;width:auto" /></a>
        <a href="/shop" style="color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:9px 14px;font-family:Arial,sans-serif;font-weight:700;font-size:14px">Shop Filters</a>
      </div>
    </nav>
    <section style="padding:64px 16px;background:radial-gradient(circle at 50% 20%,rgba(59,130,246,.14),transparent 55%),#050505">
      <div style="max-width:960px;margin:0 auto;text-align:center">
        <p style="margin:0 0 16px;color:#60a5fa;font-family:Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Automotive Finishing</p>
        <h1 style="margin:0 0 18px;font-size:clamp(3rem,10vw,4.5rem);line-height:.98;font-weight:800;color:#fff">Automotive Paint Booth Filters</h1>
        <p style="max-width:800px;margin:0 auto;color:rgba(255,255,255,.65);font-family:Arial,sans-serif;font-size:19px;line-height:1.65">Compare intake, ceiling, prefilter, and exhaust media for automotive paint booths. Start with the booth configuration and filter stage, then verify dimensions and product requirements before ordering.</p>
        <p style="margin:28px 0 0;font-family:Arial,sans-serif"><a href="/shop" style="display:inline-flex;min-height:44px;align-items:center;border-radius:8px;background:#3b82f6;padding:0 20px;color:#fff;font-weight:700;text-decoration:none">Shop Current Filters</a> <a href="/contact" style="display:inline-flex;min-height:44px;align-items:center;margin-left:10px;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:0 20px;color:#fff;font-weight:700;text-decoration:none">Request Fitment Review</a></p>
      </div>
    </section>
    <section style="padding:56px 16px;background:#0d0d0d">
      <div style="max-width:1120px;margin:0 auto">
        <h2 style="margin:0 0 10px;text-align:center;color:#fff;font-size:32px">Compare the Installed Filter Stage First</h2>
        <p style="max-width:720px;margin:0 auto 32px;text-align:center;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;line-height:1.6">A size match alone does not establish fit or suitability. Use the current booth documentation and product record for the stage being replaced.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px">${cards}</div>
      </div>
    </section>
    <section style="padding:56px 16px;background:#050505">
      <div style="max-width:880px;margin:0 auto">
        <h2 style="margin:0 0 18px;color:#fff;font-size:30px">Information to Gather Before Ordering</h2>
        <ul style="margin:0;padding-left:22px;color:rgba(255,255,255,.65);font-family:Arial,sans-serif;font-size:16px;line-height:1.9">
          <li>Booth manufacturer, model, serial or equipment-tag information</li>
          <li>Booth configuration and exact filter position</li>
          <li>Installed opening and existing filter width, height, and depth</li>
          <li>Frame style, media format, airflow direction, labels, and part numbers</li>
          <li>Clear photos and the quantity required</li>
        </ul>
        <p style="margin:24px 0 0;border:1px solid rgba(251,146,60,.25);border-radius:12px;background:rgba(251,146,60,.06);padding:18px;color:rgba(255,255,255,.65);font-family:Arial,sans-serif;line-height:1.65">There is no universal replacement interval, and a replacement filter does not by itself establish facility compliance. Follow the booth and filter instructions and obtain site-specific review when needed.</p>
      </div>
    </section>
    <section style="padding:56px 16px;background:#0d0d0d">
      <div style="max-width:880px;margin:0 auto">
        <h2 style="margin:0 0 10px;text-align:center;color:#fff;font-size:32px">Automotive Filter Questions</h2>
        <p style="margin:0 auto 28px;text-align:center;color:rgba(255,255,255,.55);font-family:Arial,sans-serif;line-height:1.6">Practical answers for identifying, measuring, and replacing paint booth filter media.</p>
        <div style="display:grid;gap:12px">${faqItems}</div>
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

function kochProductDetailsFallback(handle) {
  const details = kochProductDetails[handle];
  if (!details) return '';

  const highlights = details.highlights.map((item) => `
    <div style="padding:12px;border:1px solid rgba(255,255,255,.07);border-radius:10px;background:rgba(255,255,255,.025)">
      <div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45)">${escapeHtml(item.label)}</div>
      <div style="margin-top:4px;font-size:14px;line-height:1.5;color:rgba(255,255,255,.9)">${escapeHtml(item.value)}</div>
    </div>`).join('');
  const sections = details.sections.map((section) => {
    const paragraphs = section.paragraphs.map((paragraph) => `<p style="margin:8px 0 0;color:rgba(255,255,255,.7);font-size:14px;line-height:1.65">${escapeHtml(paragraph)}</p>`).join('');
    const bullets = section.bullets.length
      ? `<ul style="margin:8px 0 0;padding-left:20px;color:rgba(255,255,255,.7);font-size:14px;line-height:1.65">${section.bullets.map((bullet) => `<li style="margin-top:6px">${escapeHtml(bullet)}</li>`).join('')}</ul>`
      : '';
    return `<section style="margin-top:20px"><h2 style="margin:0;color:#fff;font-size:16px">${escapeHtml(section.heading)}</h2>${paragraphs}${bullets}</section>`;
  }).join('');

  return `<details style="margin:0 0 24px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#111;overflow:hidden">
    <summary style="cursor:pointer;padding:16px 20px;color:#fff;font-weight:700">${escapeHtml(details.title)}<span style="display:block;margin-top:5px;color:rgba(255,255,255,.6);font-size:14px;font-weight:400;line-height:1.5">${escapeHtml(details.summary)}</span></summary>
    <div style="padding:4px 20px 20px;border-top:1px solid rgba(255,255,255,.1)">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-top:16px">${highlights}</div>
      ${sections}
      <p style="margin:20px 0 0;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.5);font-size:12px;line-height:1.5">${escapeHtml(details.sourceLabel)} · <a href="/contact" style="color:#60a5fa">Contact PFS Filters</a> for fit or submittal help.</p>
    </div>
  </details>`;
}

// Generic, data-driven fallback for ANY /product/:handle route — looks the
// handle up in the parsed snapshot instead of hardcoding per-product markup.
function genericProductFallback(route) {
  const handle = route.path.replace('/product/', '');
  const product = products.find((p) => p.handle === handle);
  const title = product?.title || route.title;
  const description = product?.description || route.description;
  const variant = product?.variants?.edges?.[0]?.node;
  const priceAmount = variant?.price?.amount ?? product?.priceRange?.minVariantPrice?.amount;
  const numericPrice = Number(priceAmount);
  const price = Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : null;
  const currency = variant?.price?.currencyCode || product?.priceRange?.minVariantPrice?.currencyCode || 'USD';
  const inStock = variant ? variant.availableForSale : true;
  const imageUrl = product ? shopProductCardImage(product, 800) : '';
  const srcset = product ? shopProductCardSrcset(product) : '';
  const isMembershipProduct = handle.endsWith('-membership');
  const isKochProduct = !!kochProductDetails[handle];
  const productDetailsMarkup = kochProductDetailsFallback(handle);
  const imageAlt = isMembershipProduct
    ? `${title} membership badge`
    : product?.images?.edges?.[0]?.node?.altText || title;

  const priceMarkup = price
    ? `<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <span style="font-size:28px;font-weight:700;color:#60a5fa">$${price}</span>
            <span style="color:rgba(255,255,255,.5)">${escapeHtml(currency)}</span>
            <span style="font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;background:${inStock ? 'rgba(34,197,94,.15)' : 'rgba(255,255,255,.1)'};color:${inStock ? '#4ade80' : 'rgba(255,255,255,.6)'}">${inStock ? 'Available to Order' : 'Currently Unavailable'}</span>
          </div>`
    : '';
  const descriptionMarkup = description
    ? `<p style="margin:0 0 24px;max-width:560px;color:rgba(255,255,255,.7);font-size:16px;line-height:1.6">${escapeHtml(truncate(description, 400))}</p>`
    : '';
  const productAvif = avifSrcset(srcset) || avifVariant(imageUrl);
  const imageMarkup = imageUrl
    ? `<picture>${productAvif ? `<source type="image/avif" srcset="${escapeHtml(productAvif)}" sizes="(min-width: 1024px) 50vw, 100vw" />` : ''}<img src="${escapeHtml(imageUrl)}"${srcset ? ` srcset="${escapeHtml(srcset)}"` : ''} sizes="(min-width: 1024px) 50vw, 100vw" alt="${escapeHtml(imageAlt)}" width="${isMembershipProduct ? 720 : isKochProduct ? 960 : 800}" height="${isMembershipProduct ? 960 : isKochProduct ? 960 : 800}" loading="eager" fetchpriority="high" decoding="async" style="width:100%;height:100%;max-width:${isKochProduct ? '400px' : 'none'};max-height:${isKochProduct ? '400px' : 'none'};object-fit:${isMembershipProduct || isKochProduct ? 'contain' : 'cover'};${isMembershipProduct ? 'padding:24px;box-sizing:border-box;' : ''}display:block" /></picture>`
    : '';

  return `<main data-seo-fallback id="product-fallback" style="min-height:100vh;background:#040404;color:#fff;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif">
    <div style="height:48px;background:linear-gradient(to bottom,#050505,#0d0d0d)"></div>
    <section style="padding:40px 16px;background:#0d0d0d">
      <div style="max-width:1280px;margin:0 auto;display:grid;gap:48px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
        <div>
          <div style="aspect-ratio:1/1;border-radius:12px;overflow:hidden;background:#161616;border:1px solid rgba(255,255,255,.07);margin-bottom:16px;${isKochProduct ? 'display:flex;align-items:center;justify-content:center;' : ''}">
            ${imageMarkup}
          </div>
        </div>
        <div style="font-family:Arial,sans-serif">
          <h1 style="margin:0 0 12px;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-size:clamp(1.75rem,6vw,2.25rem);line-height:1.15;font-weight:800;color:#fff">${escapeHtml(title)}</h1>
          ${priceMarkup}
          ${descriptionMarkup}
          ${productDetailsMarkup}
          <div style="min-height:48px;max-width:420px;border-radius:8px;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:800">Add to Cart</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:32px;max-width:420px">
            ${['Fulfillment Timing', 'Sizing Help', 'Custom Requests'].map((label) => `<div style="min-height:76px;text-align:center;padding:12px;background:#161616;border:1px solid rgba(255,255,255,.07);border-radius:10px"><p style="margin:0;font-size:12px;font-weight:600;color:rgba(255,255,255,.9)">${label}</p></div>`).join('')}
          </div>
        </div>
      </div>
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
  const indexableRouteCount = routes.filter((route) => !route.noindex).length;
  console.log(`Generated source SEO assets for ${indexableRouteCount} indexable routes.`);
}

function replaceMeta(html, route) {
  const url = absoluteUrl(route.path);
  const image = route.image || 'https://www.pfsfilters.com/media/pfs-hero-poster-desktop.webp';
  const imageWidth = route.imageWidth || 1600;
  const imageHeight = route.imageHeight || 900;
  const imageAlt = escapeHtml(route.imageAlt || route.title);
  const title = escapeHtml(route.title);
  const description = escapeHtml(stripMarkdown(route.description));
  const robots = route.noindex
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  let output = html
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title data-seo-generated>${title}</title>`)
    .replace(/<meta[^>]+name="description"[^>]*>/i, `<meta data-seo-generated name="description" content="${description}" />`)
    .replace(/<meta[^>]+name="robots"[^>]*>/i, `<meta data-seo-generated name="robots" content="${robots}" />`)
    .replace(/<link[^>]+rel="canonical"[^>]*>/i, `<link data-seo-generated rel="canonical" href="${escapeHtml(url)}" />`)
    .replace(/<meta[^>]+property="og:title"[^>]*>/i, `<meta data-seo-generated property="og:title" content="${title}" />`)
    .replace(/<meta[^>]+property="og:description"[^>]*>/i, `<meta data-seo-generated property="og:description" content="${description}" />`)
    .replace(/<meta[^>]+property="og:type"[^>]*>/i, `<meta data-seo-generated property="og:type" content="${route.ogType || 'website'}" />`)
    .replace(/<meta[^>]+property="og:url"[^>]*>/i, `<meta data-seo-generated property="og:url" content="${escapeHtml(url)}" />`)
    .replace(/<meta[^>]+property="og:image"[^>]*>/i, `<meta data-seo-generated property="og:image" content="${escapeHtml(image)}" />`)
    .replace(/<meta[^>]+property="og:image:width"[^>]*>/i, `<meta data-seo-generated property="og:image:width" content="${imageWidth}" />`)
    .replace(/<meta[^>]+property="og:image:height"[^>]*>/i, `<meta data-seo-generated property="og:image:height" content="${imageHeight}" />`)
    .replace(/<meta[^>]+property="og:image:alt"[^>]*>/i, `<meta data-seo-generated property="og:image:alt" content="${imageAlt}" />`)
    .replace(/<meta[^>]+name="twitter:title"[^>]*>/i, `<meta data-seo-generated name="twitter:title" content="${title}" />`)
    .replace(/<meta[^>]+name="twitter:description"[^>]*>/i, `<meta data-seo-generated name="twitter:description" content="${description}" />`)
    .replace(/<meta[^>]+name="twitter:image"[^>]*>/i, `<meta data-seo-generated name="twitter:image" content="${escapeHtml(image)}" />`)
    .replace(/<meta[^>]+name="twitter:image:alt"[^>]*>/i, `<meta data-seo-generated name="twitter:image:alt" content="${imageAlt}" />`);

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
        `$1    ${lcpPreloadTag(preloadImage, preloadSrcset, '(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)')}\n`,
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
  if (route.path.startsWith('/product/')) {
    const handle = route.path.replace('/product/', '');
    const product = products.find((p) => p.handle === handle);
    const preloadImage = product ? shopProductCardImage(product, 800) : '';
    const preloadSrcset = product ? shopProductCardSrcset(product) : '';
    if (preloadImage) {
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    ${lcpPreloadTag(preloadImage, preloadSrcset, '(min-width: 1024px) 50vw, 100vw')}\n    ${logoPreload}\n`,
      );
    } else {
      output = output.replace(
        /(<meta name="viewport"[^>]*>\r?\n)/i,
        `$1    ${logoPreload}\n`,
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
  const heading = escapeHtml(routeHeading(route));
  const fallback = route.path === '/'
    ? `<main data-seo-fallback><section id="home"><div><picture><source media="(max-width: 767px)" type="image/avif" srcset="/media/pfs-hero-poster-mobile.avif" /><source media="(min-width: 768px)" type="image/avif" srcset="/media/pfs-hero-poster-desktop.avif" /><source media="(max-width: 767px)" type="image/webp" srcset="${heroPosterMobile}" /><img src="${heroPosterDesktop}" alt="" aria-hidden="true" width="1600" height="900" fetchpriority="high" decoding="async" /></picture><div class="hero-vignette"></div></div><div><div><div class="eyebrow-brand">A Division of PFS Spray Booths — 30+ Years of Expertise</div><h1 class="hero-headline"><span class="hero-tier1">A Filter Program Built to</span><span class="hero-tier2">Manage Your Entire Booth</span></h1><p>Auto-reorder on your schedule. Booth-specific filter tracking. Backed by 30+ years of PFS Spray Booths expertise. Keep routine filter replacement organized.</p><p><a href="/shop" style="color:#93c5fd;font-weight:700">Shop Filters Now</a> · <a href="/contact" style="color:#93c5fd;font-weight:700">Get a Custom Quote</a></p></div></div></section></main>`
    : route.path === '/auth'
    ? `<main data-seo-fallback id="auth-fallback" style="min-height:100vh;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif"><div style="width:min(384px,calc(100% - 32px));border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#111;padding:32px;text-align:center;box-sizing:border-box"><img src="/images/brands/pfs-logo-wide.png" alt="PFS Filters" width="250" height="76" fetchpriority="high" style="display:block;width:250px;max-width:100%;height:auto;margin:0 auto 24px;filter:brightness(1.4) drop-shadow(0 0 20px rgba(59,130,246,.3))" /><p style="margin:0;color:rgba(255,255,255,.7);font-size:14px">Loading secure sign-in…</p></div></main>`
    : route.path === '/shop'
    ? shopFallback(title, description)
    : route.path === '/intake-filters'
    ? intakeFallback(routeHeading(route), route.description)
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
    : route.path === '/industries/automotive-paint-booth-filters'
    ? automotiveIndustryFallback()
    : route.path === '/aerospace'
    ? aerospaceFallback()
    : route.path === '/shop-by-booth/nova-verta'
    ? novaVertaFallback()
    : route.path === '/blog/fiberglass-vs-tacky-panel-filters'
    ? fiberglassVsTackyBlogFallback()
    : route.path.startsWith('/product/')
    ? genericProductFallback(route)
    : `<main data-seo-fallback style="min-height:100vh;background:#040404;color:#fff;font-family:Arial,sans-serif;padding:48px 24px"><div style="max-width:880px;margin:0 auto"><p style="color:#60a5fa;font-weight:700">PFS FILTERS</p><h1 style="font-size:clamp(2rem,6vw,4rem);line-height:1.05">${heading}</h1><p style="max-width:760px;color:#c4c8d0;font-size:1.1rem;line-height:1.7">${description}</p>${detail}${imageMarkup}<p><a href="/shop" style="color:#60a5fa">Shop paint booth filters</a> · <a href="/filter-finder" style="color:#60a5fa">Find my filter</a> · <a href="/faq" style="color:#60a5fa">Filter FAQ</a> · <a href="/contact" style="color:#60a5fa">Contact PFS</a></p></div></main>`;
  const pageBody = route.noindex
    ? fallback
    : `${navigationFallback()}${breadcrumbsFallback(route)}${fallback}${footerFallback()}`;
  return output.replace('<div id="root"></div>', `<div id="root">${pageBody}</div>`);
}

function validateDistPages() {
  const indexablePaths = new Set(routes.filter((route) => !route.noindex).map((route) => route.path));
  const discoveredPaths = new Set();

  for (const route of routes) {
    const file = routeFile(route.path);
    const html = fs.readFileSync(file, 'utf8');
    const expectedTitle = `<title data-seo-generated>${escapeHtml(route.title)}</title>`;
    const expectedDescription = `name="description" content="${escapeHtml(stripMarkdown(route.description))}"`;
    const expectedCanonical = `rel="canonical" href="${escapeHtml(absoluteUrl(route.path))}"`;
    const requiredMarkers = ['data-seo-fallback', expectedTitle, expectedDescription, expectedCanonical];
    if (!route.noindex) requiredMarkers.push('<h1', 'data-seo-navigation', 'data-seo-footer');
    if (!route.noindex && route.path !== '/') requiredMarkers.push('data-seo-breadcrumbs');

    const missing = requiredMarkers.filter((marker) => !html.includes(marker));
    if (missing.length > 0) {
      throw new Error(`Invalid prerender for ${route.path}: missing ${missing.join(', ')}`);
    }

    if (!route.noindex) {
      const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
      const actualHeading = h1Match?.[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const expectedHeading = escapeHtml(routeHeading(route)).replace(/\s+/g, ' ').trim();
      if (actualHeading !== expectedHeading) {
        throw new Error(`Invalid prerender H1 for ${route.path}: expected "${expectedHeading}", received "${actualHeading || ''}"`);
      }
    }

    for (const match of html.matchAll(/<a\s[^>]*href=["']([^"']+)["']/gi)) {
      const href = match[1].split(/[?#]/, 1)[0];
      if (href === '/' || href.startsWith('/')) discoveredPaths.add(href);
    }
  }

  const undiscovered = [...indexablePaths].filter((pathname) => !discoveredPaths.has(pathname));
  if (undiscovered.length > 0) {
    throw new Error(`Prerendered HTML does not link to: ${undiscovered.join(', ')}`);
  }

  console.log(`Verified initial HTML metadata, H1s, breadcrumbs, and ${discoveredPaths.size} internal destinations.`);
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
  validateDistPages();
  console.log(`Generated static metadata and fallback HTML for ${routes.length} routes plus 404.html.`);
}

if (mode === '--source') writeSourceAssets();
else if (mode === '--dist') writeDistPages();
else throw new Error(`Unknown mode: ${mode}`);
