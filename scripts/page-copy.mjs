/**
 * Plain-text page bodies for the non-JS prerender and llms-full.txt.
 * Copy comes from the same data files and components the React pages render.
 * Nothing here is truncated mid-sentence, and no compliance claim is added.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { listBoothGuides } from '../shared/boothFilterGuides.mjs';
import { filterRotationFaqs } from '../shared/seoText.mjs';
import {
  georgiaFaqs,
  georgiaSections,
  sprayBoothFaqs,
  sprayBoothSections,
  thinPageSupplements,
} from '../shared/guideCopy.mjs';
import {
  CROSSREF_PAGES,
  andreaeFaqs,
  andreaeSections,
  comparisonFaqs,
  comparisonSections,
  crossRefFaqs,
  crossRefSections,
  measureFaqs,
  measureSections,
  shippingFaqs,
  shippingSections,
  sizeChartFaqs,
  sizeChartSections,
} from '../shared/catalogGuides.mjs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://www.pfsfilters.com';
const moduleCache = new Map();

function loadTs(relativePath) {
  if (moduleCache.has(relativePath)) return moduleCache.get(relativePath);
  const outfile = path.join(os.tmpdir(), `pfs-seo-${Buffer.from(relativePath).toString('hex')}.cjs`);
  esbuild.buildSync({
    absWorkingDir: root,
    entryPoints: [path.join(root, relativePath)],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    outfile,
    logLevel: 'silent',
  });
  const loaded = require(outfile);
  moduleCache.set(relativePath, loaded);
  return loaded;
}

const { hubArticles } = loadTs('client/src/data/hubArticles.ts');
const { categoryGuides } = loadTs('client/src/data/categoryGuides.ts');
const { OEM_LANDING_PAGES, CALIFORNIA_LANDING_PAGES } = loadTs('client/src/data/isaacLandingPages.ts');
const { blogPosts } = loadTs('client/src/lib/blogData.ts');
const { BOOTH_BRANDS, BOOTH_TYPES } = loadTs('client/src/data/boothBrands.ts');
const { getProductSpecs, getPfsBoothCompatibility } = loadTs('client/src/lib/productSignals.ts');

const products = JSON.parse(fs.readFileSync(path.join(root, 'client/src/data/shopifyProductSnapshot.json'), 'utf8'))
  .map((edge) => edge.node);
const faqs = JSON.parse(fs.readFileSync(path.join(root, 'client/src/data/faqData.json'), 'utf8'));
const kochDetails = JSON.parse(fs.readFileSync(path.join(root, 'client/src/data/kochProductDetails.json'), 'utf8'));
const collections = JSON.parse(fs.readFileSync(path.join(root, 'client/src/data/shopifyCollections.json'), 'utf8'));

const HUB_BY_PATH = {
  '/paint-booth-filters': 'paint-booth-filters',
  '/exhaust-filters': 'exhaust',
  '/intake-filters': 'intake',
  '/ceiling-filters': 'ceiling',
  '/andreae-paint-booth-filters': 'andreae',
  '/neshap-compliant-paint-booth-filters': 'neshap',
};

const PAGE_SOURCE = {
  '/': ['client/src/pages/Home.tsx'],
  '/prefilters': ['client/src/pages/Prefilters.tsx'],
  '/filter-rotation-program': ['client/src/pages/FilterRotationProgram.tsx'],
  '/california/carb-paint-booth-filter-compliance': ['client/src/pages/CaliforniaCarbCompliance.tsx'],
  '/garmat-paint-booth-filters': ['client/src/pages/GarmatPaintBoothFilters.tsx'],
  '/why-choose-us': ['client/src/pages/WhyChooseUs.tsx'],
  '/contact': ['client/src/pages/Contact.tsx', 'client/src/components/ContactForm.tsx'],
  '/returns': ['client/src/pages/Returns.tsx'],
  '/privacy-policy': ['client/src/pages/PrivacyPolicy.tsx'],
  '/terms-of-service': ['client/src/pages/TermsOfService.tsx'],
  '/memberships': ['client/src/pages/Memberships.tsx'],
  '/filter-finder': ['client/src/pages/FilterFinder.tsx'],
  '/filter-scanner': ['client/src/pages/FilterScanner.tsx'],
  '/filter-part-numbers': ['client/src/pages/FilterPartNumbers.tsx'],
  '/shop-by-size': ['client/src/pages/ShopBySize.tsx'],
  '/shop-by-type': ['client/src/pages/ShopByType.tsx'],
  '/shop-by-filter-type': ['client/src/pages/ShopByFilterType.tsx'],
  '/shop-by-booth': ['client/src/pages/ShopByBooth.tsx'],
  '/shop-by-booth-type': ['client/src/pages/ShopByBoothType.tsx'],
  '/brands': ['client/src/pages/Brands.tsx'],
  '/consumables': ['client/src/pages/Consumables.tsx'],
  '/consumables/pfs-vitra': ['client/src/pages/PfsVitra.tsx'],
  '/consumables/pfs-vanguard': ['client/src/pages/PfsVanguard.tsx'],
  '/aerospace': ['client/src/pages/Aerospace.tsx'],
  '/industries/aerospace-paint-booth-filters': ['client/src/pages/AerospaceHub.tsx'],
  '/industries/automotive-paint-booth-filters': ['client/src/pages/AutomotivePaintBoothFilters.tsx'],
  '/blog': ['client/src/pages/Blog.tsx'],
  '/faq': ['client/src/pages/FAQPage.tsx'],
  '/shop': ['client/src/pages/Shop.tsx'],
  '/paint-booth-filters': ['client/src/pages/PaintBoothFilters.tsx'],
  '/exhaust-filters': ['client/src/pages/ExhaustFilters.tsx'],
  '/intake-filters': ['client/src/pages/IntakeFilters.tsx'],
  '/ceiling-filters': ['client/src/pages/CeilingFilters.tsx'],
  '/andreae-paint-booth-filters': ['client/src/pages/AndreaePaintBoothFilters.tsx'],
  '/neshap-compliant-paint-booth-filters': ['client/src/pages/NeshapCompliantPaintBoothFilters.tsx'],
};

const CATEGORY_TERMS = {
  'fiberglass-arrestors': ['fiberglass'],
  'tacky-panels': ['tacky', '5kr1'],
  'ceiling-blankets': ['ceiling', 'diffusion', 'swiss flow'],
  'roll-media': ['roll'],
  'merv-filters': ['merv'],
  'polyester-media': ['polyester', 'spraystop', 'afc'],
  'pre-filters': ['pre-filter', 'prefilter'],
  'powder-booth-filters': ['pulse-jet cartridge'],
  'activated-carbon-media': ['activated carbon voc media'],
  'paint-arrest-systems': ['paint arrest system kit'],
  'pfs-oem-replacement-kits': ['pfs oem replacement kit'],
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeEntities(value = '') {
  return String(value)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

export function plainText(value = '') {
  return decodeEntities(String(value))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function visibleWordCount(value = '') {
  const text = plainText(String(value).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' '));
  return text ? text.split(' ').length : 0;
}

export function mainFallbackWordCount(html = '') {
  const match = String(html).match(/<main data-seo-fallback[\s\S]*?<\/main>/i);
  return match ? visibleWordCount(match[0]) : 0;
}

function uniqueParagraphs(paragraphs) {
  const seen = new Set();
  const result = [];
  for (const paragraph of paragraphs) {
    const text = plainText(paragraph);
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(text);
  }
  return result;
}

function markdownParagraphs(markdown = '') {
  const normalized = String(markdown)
    .replace(/\r\n/g, '\n')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/[*_`]/g, '');
  return uniqueParagraphs(normalized.split(/\n\s*\n/));
}

function isProse(text) {
  const clean = plainText(text);
  if (!clean || clean.length < 24) return false;
  if (!/[a-z]{3}/i.test(clean)) return false;
  if (/[{}<>]|className|function |import |const |=>/.test(clean)) return false;
  if (/^(https?:|\/)/.test(clean)) return false;
  if (clean.split(' ').length < 4) return false;
  return true;
}

function textFromSource(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!fs.existsSync(absolute)) return [];
  const source = fs.readFileSync(absolute, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*import .*$/gm, ' ');
  const chunks = [];
  for (const match of source.matchAll(/>([^<>{}]+)</g)) {
    if (isProse(match[1])) chunks.push(match[1]);
  }
  const stringPattern = /(?:body|answer|description|introduction|excerpt|note|copy|summary|question|title|label|sub|text|value|placeholder)\s*[:=]\s*(['"`])([\s\S]*?)\1/g;
  for (const match of source.matchAll(stringPattern)) {
    if (isProse(match[2])) chunks.push(match[2]);
  }
  for (const match of source.matchAll(/'((?:\\'|[^'\n]){40,})'/g)) {
    const text = match[1].replace(/\\'/g, "'");
    if (isProse(text)) chunks.push(text);
  }
  return uniqueParagraphs(chunks);
}

function sourceParagraphs(pathname) {
  const files = [...(PAGE_SOURCE[pathname] || [])];
  if (pathname.startsWith('/california/')) files.push('client/src/pages/CaliforniaPaintBoothFilters.tsx');
  if (OEM_LANDING_PAGES[pathname]) files.push('client/src/pages/OemPaintBoothFilters.tsx');
  if (pathname.startsWith('/category/')) files.push('client/src/pages/CategoryPage.tsx');
  if (pathname.startsWith('/product/')) files.push('client/src/pages/ProductDetail.tsx');
  if (pathname.startsWith('/blog/')) files.push('client/src/pages/BlogPost.tsx');
  return uniqueParagraphs([...new Set(files)].flatMap((file) => textFromSource(file)));
}

function productByHandle(handle) {
  return products.find((product) => product.handle === handle);
}

function sellableProducts() {
  return products.filter((product) => !/membership/i.test(product.title || '') && !String(product.handle || '').endsWith('-membership'));
}

function productsForCategory(slug) {
  const handles = collections[slug]?.handles;
  if (handles?.length) {
    return handles.map((handle) => productByHandle(handle)).filter(Boolean);
  }
  const terms = CATEGORY_TERMS[slug] || [slug.replace(/-/g, ' ')];
  return sellableProducts().filter((product) => {
    const haystack = `${product.title} ${(product.tags || []).join(' ')} ${product.productType || ''}`.toLowerCase();
    return terms.some((term) => haystack.includes(term));
  });
}

function variantSentences(product) {
  return (product.variants?.edges || []).map((edge) => {
    const variant = edge.node || {};
    const title = variant.title && variant.title.toLowerCase() !== 'default title' ? variant.title : product.title;
    const sentences = [`Catalog option: ${title}.`];
    if (variant.sku) sentences.push(`SKU ${variant.sku}.`);
    if (variant.price?.amount) sentences.push(`Snapshot price ${variant.price.amount} ${variant.price.currencyCode || 'USD'}.`);
    if (typeof variant.availableForSale === 'boolean') {
      sentences.push(variant.availableForSale
        ? 'The catalog snapshot marks this option available for sale.'
        : 'The catalog snapshot marks this option unavailable.');
    }
    return sentences.join(' ');
  });
}

function productParagraphs(product) {
  if (!product) return [];
  const paragraphs = [];
  if (product.description) paragraphs.push(product.description);
  if (product.productType) paragraphs.push(`Product type: ${product.productType}.`);
  paragraphs.push(...variantSentences(product));
  for (const spec of getProductSpecs(product)) paragraphs.push(`${spec.label}: ${spec.value}.`);
  const booths = getPfsBoothCompatibility(product);
  for (const row of booths) paragraphs.push(`${row.booth}, ${row.position}: ${row.note}`);
  if (booths.length) {
    paragraphs.push('This is filter-family guidance, not an exact fit guarantee. Confirm the booth version, filter position, and dimensions before ordering.');
  }
  const details = kochDetails[product.handle];
  if (details) {
    if (details.summary) paragraphs.push(details.summary);
    for (const highlight of details.highlights || []) {
      if (highlight?.label && highlight?.value) paragraphs.push(`${highlight.label}: ${highlight.value}.`);
    }
    for (const section of details.sections || []) {
      paragraphs.push(...(section.paragraphs || []), ...(section.bullets || []));
    }
  }
  if (product.handle === 'afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6') {
    paragraphs.push(...textFromSource('client/src/components/AfcProductDetails.tsx'));
  }
  if (product.handle === 'parker-loadtech-merv14-20x20x4-single-header-case-3') {
    paragraphs.push(...textFromSource('client/src/components/ParkerProductDetails.tsx'));
  }
  return uniqueParagraphs(paragraphs);
}

function faqParagraphs(items) {
  return uniqueParagraphs(items.flatMap((item) => [item.question, item.answer]));
}

function hubSections(id) {
  const article = hubArticles[id];
  if (!article) return [];
  return [
    { heading: article.heading, paragraphs: article.paragraphs },
    { heading: 'Questions about this filter guide', paragraphs: faqParagraphs(article.faqs || []) },
  ];
}

function brandRecord(slug) {
  return BOOTH_BRANDS.find((brand) => brand.slug === slug);
}

function brandModelParagraphs(brand, label) {
  if (!brand) return [];
  const paragraphs = [];
  if (brand.description) paragraphs.push(brand.description);
  if (brand.industries?.length) paragraphs.push(`Industries recorded for ${brand.name}: ${brand.industries.join(', ')}.`);
  for (const model of brand.models || []) {
    const airflow = BOOTH_TYPES[model.type]?.label || model.type;
    const stages = [
      ['Intake', model.filters?.intake],
      ['Ceiling', model.filters?.ceiling],
      ['Exhaust', model.filters?.exhaust],
      ['Prefilter', model.filters?.prefilter],
    ].filter(([, sizes]) => sizes?.length);
    const stageText = stages.map(([name, sizes]) => `${name} ${sizes.join(', ')}`).join('; ');
    paragraphs.push(`${label || brand.name} ${model.name} is recorded as ${airflow}.${stageText ? ` Filter stages on this reference: ${stageText}.` : ''}`);
  }
  if (brand.replacementCycle) {
    const cycle = Object.entries(brand.replacementCycle).map(([stage, value]) => `${stage} ${value}`).join(', ');
    if (cycle) paragraphs.push(`Replacement-cycle notes recorded for ${brand.name}: ${cycle}.`);
  }
  const airflowTypes = [...new Set((brand.models || []).map((model) => model.type))];
  for (const type of airflowTypes) {
    const info = BOOTH_TYPES[type];
    if (info?.description) paragraphs.push(`${info.label}: ${info.description}`);
  }
  paragraphs.push(`${brand.name} models listed here: ${(brand.models || []).map((model) => model.name).join(', ')}. Confirm the installed model, filter position, and measured size before ordering.`);
  return paragraphs;
}

function guideParagraphs(guide) {
  if (!guide) return [];
  const paragraphs = [guide.intro];
  for (const row of guide.rows || []) {
    paragraphs.push(`${row.model} ${row.position}: ${row.filterType} at ${row.size}${row.qty ? `, quantity ${row.qty}` : ''}.`);
  }
  paragraphs.push(...faqParagraphs(guide.faqs || []));
  return paragraphs;
}

function partNumberParagraphs() {
  const paragraphs = [];
  for (const product of sellableProducts()) {
    const href = `/product/${product.handle}`;
    for (const edge of product.variants?.edges || []) {
      const sku = String(edge.node?.sku || '').trim();
      if (sku) paragraphs.push(`${sku} is the PFS catalog SKU for ${product.title} (${href}).`);
      const title = edge.node?.title || '';
      const code = title.match(/\bAF\d{3}\b|\bC2PPEB[A-Z0-9-]+\b|\bPLT4-[A-Z0-9-]+\b|\b1136513\b/i);
      if (code) paragraphs.push(`${code[0]} is recorded on ${product.title} in the variant titled ${title}.`);
    }
    const parker = String(product.description || '').match(/Parker part\s+([0-9]+)/i);
    if (parker) paragraphs.push(`${parker[1]} is the Parker part in the ${product.title} description.`);
    const afc = String(product.description || '').match(/AFC filter number\s+([A-Z0-9-]+)/i);
    if (afc) paragraphs.push(`${afc[1]} is the AFC filter number in the ${product.title} description.`);
  }
  return uniqueParagraphs(paragraphs);
}

function blogBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function pageSections(pathname) {
  const sections = [];
  const push = (heading, paragraphs) => {
    const body = uniqueParagraphs(paragraphs);
    if (body.length) sections.push({ heading, paragraphs: body });
  };

  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    const post = blogBySlug(pathname.slice('/blog/'.length));
    if (post) {
      push(post.title, [post.excerpt, ...markdownParagraphs(post.content), ...faqParagraphs(post.faqs || [])]);
    }
  } else if (pathname.startsWith('/product/')) {
    push('Catalog record', productParagraphs(productByHandle(pathname.slice('/product/'.length))));
  } else if (pathname.startsWith('/category/')) {
    const slug = pathname.slice('/category/'.length);
    const guide = categoryGuides[slug];
    if (guide) push(guide.heading, [...guide.paragraphs, ...(guide.links || []).map((link) => link.label)]);
    push('Products in this category', productsForCategory(slug).flatMap((product) => productParagraphs(product)));
  } else if (pathname.startsWith('/shop-by-booth/')) {
    const slug = pathname.slice('/shop-by-booth/'.length);
    const guide = listBoothGuides().find((item) => item.slug === slug);
    push(guide?.name || slug, guideParagraphs(guide));
    push('Booth reference', brandModelParagraphs(brandRecord(slug)));
  } else if (OEM_LANDING_PAGES[pathname]) {
    const config = OEM_LANDING_PAGES[pathname];
    const brand = brandRecord(config.brandSlug);
    push(config.h1, [
      config.introduction,
      config.selectionGuidance,
      config.affiliated
        ? 'PFS Filters and PFS Spray Booths share the same team, but the booth model alone is not enough to confirm a replacement. Verify the equipment tag, filter stage, construction, and actual dimensions.'
        : `PFS Filters is not affiliated with ${config.brandName}. Manufacturer names identify the equipment being serviced. Model and size information is guidance only; configurations, options, and retrofits can vary.`,
      config.industries?.length ? `Applications named on this guide: ${config.industries.join(', ')}.` : '',
      `Official source linked from this page: ${config.officialSource.label}.`,
    ]);
    push(`Recorded ${config.shortName} booth families and filter stages`, [
      'Use these records to organize a review, not as a fitment guarantee. Confirm against the installed equipment and current manufacturer documentation.',
      ...brandModelParagraphs(brand, config.shortName),
    ]);
  } else if (pathname.startsWith('/california/') && pathname !== '/california/carb-paint-booth-filter-compliance') {
    const config = Object.values(CALIFORNIA_LANDING_PAGES).find((page) => page.path === pathname);
    if (config) {
      push(config.h1, [
        config.introduction,
        config.localContext,
        config.operationsContext,
        `Cities and areas named on this page: ${config.cities.join(', ')}.`,
        `Finishing work named on this page: ${config.industries.join(', ')}.`,
        `Regional source linked from this page: ${config.regionalSource.label}.`,
        `Regulatory source linked from this page: ${config.regulatorySource.label}.`,
      ]);
    }
  } else if (pathname === '/faq') {
    push('Paint booth filter questions', faqParagraphs(faqs));
  } else if (pathname === '/blog') {
    push('Guides', blogPosts.flatMap((post) => [post.title, post.excerpt, ...markdownParagraphs(post.content).slice(0, 1)]));
  } else if (pathname === '/shop') {
    push('Catalog', sellableProducts().flatMap((product) => [`${product.title}.`, product.description || '']));
  } else if (pathname === '/filter-part-numbers') {
    push('Catalog identifiers', partNumberParagraphs());
  } else if (pathname === '/filter-rotation-program') {
    push('Filter rotation questions', faqParagraphs(filterRotationFaqs));
  } else if (pathname === '/shop-by-size') {
    push('Catalog sizes', sellableProducts().map((product) => {
      const options = (product.variants?.edges || [])
        .map((edge) => edge.node?.title)
        .filter((title) => title && title.toLowerCase() !== 'default title');
      return options.length
        ? `${product.title} is listed in these catalog options: ${options.join(', ')}.`
        : `${product.title}.`;
    }));
  } else if (pathname === '/shop-by-booth') {
    push('Booth brands', BOOTH_BRANDS.flatMap((brand) => [
      `${brand.name}: ${brand.description}`,
      `${brand.name} lists ${brand.models.length} model${brand.models.length === 1 ? '' : 's'} in this directory.`,
    ]));
  } else if (pathname === '/garmat-paint-booth-filters') {
    push('Garmat model reference', brandModelParagraphs(brandRecord('garmat-usa'), 'Garmat'));
  } else if (HUB_BY_PATH[pathname]) {
    sections.push(...hubSections(HUB_BY_PATH[pathname]));
  }

  if (pathname === '/spray-booth-filters') {
    for (const section of sprayBoothSections) push(section.heading, section.paragraphs);
    push('Spray booth filter questions', faqParagraphs(sprayBoothFaqs));
  } else if (pathname === '/georgia/spray-booth-filters') {
    for (const section of georgiaSections) push(section.heading, section.paragraphs);
    push('Georgia shipping questions', faqParagraphs(georgiaFaqs));
  }

  const extra = thinPageSupplements[pathname];
  if (extra) {
    for (const section of extra) push(section.heading, section.paragraphs);
  }

  const prose = sourceParagraphs(pathname);
  if (prose.length) push('', prose);
  return sections
    .map((section) => ({ heading: section.heading, paragraphs: uniqueParagraphs(section.paragraphs) }))
    .filter((section) => section.paragraphs.length);
}

export function pageCopyHtml(pathname) {
  const sections = pageSections(pathname);
  if (!sections.length) return '';
  const body = sections.map((section) => {
    const heading = section.heading ? `<h2 style="margin:28px 0 8px;font-size:1.35rem;line-height:1.25;color:#fff">${escapeHtml(section.heading)}</h2>` : '';
    const paragraphs = section.paragraphs.map((paragraph) => `<p style="margin:0 0 14px">${escapeHtml(paragraph)}</p>`).join('');
    return `${heading}${paragraphs}`;
  }).join('');
  return `<section data-seo-copy style="max-width:880px;margin:8px auto 0;padding:8px 24px 40px;color:#c4c8d0;font-family:Arial,sans-serif;font-size:16px;line-height:1.7">${body}</section>`;
}

export function renderLlmsTxt() {
  return `# PFS Filters

> PFS Filters (pfsfilters.com) sells paint booth filters online: intake and ceiling diffusion media, tacky intake panels, fiberglass and accordion (Andreae-style) exhaust arrestors, paint pockets, roll media, pocket/bag filters, MERV and HEPA final filters, and aerospace exhaust filter media. It is the filter division of PFS Spray Booths (pfsspraybooths.com), a paint booth builder in Santa Rosa, California, and ships within the United States.

## Business facts
- Business: PFS Filters, a division of PFS Spray Booths
- Address: 1400 Airport Blvd, Santa Rosa, CA 95403, United States
- Phone: 855-496-7969
- Service area: United States (online orders); booth sales and service via PFS Spray Booths
- Ordering: online checkout on pfsfilters.com; call for sizes not listed, custom cuts, and freight orders
- Processing: most stocked orders are processed in 1–2 business days; freight, custom, and special-order timing varies
- Returns: opened packages are not returnable; unopened packages may be returned within five business days for a refund less shipping costs and a 25% restocking fee

## How to choose a paint booth filter
- [Paint booth filters by stage (intake, ceiling, prefilter, exhaust)](${origin}/paint-booth-filters)
- [Spray booth filters: intake, ceiling, exhaust, and multi-stage media](${origin}/spray-booth-filters)
- [Paint booth filter walls, rolls, and pads](${origin}/paint-booth-filters)
- [Roll media](${origin}/category/roll-media)
- [Exhaust filters: fiberglass, paint pockets, accordion](${origin}/exhaust-filters)
- [Intake filters: tacky panels and pleats](${origin}/intake-filters)
- [Ceiling filters for downdraft booths](${origin}/ceiling-filters)
- [Prefilters](${origin}/prefilters)
- [Filter finder by booth type, brand, and size](${origin}/filter-finder)
- [Filter part number cross reference](${origin}/filter-part-numbers)
- [Paint booth filter FAQ](${origin}/faq)

## Filters by booth brand
- [All booth brand guides with model-by-model filter sizes](${origin}/shop-by-booth)
- [Garmat](${origin}/shop-by-booth/garmat-usa)
- [Accudraft](${origin}/shop-by-booth/accudraft)
- [Global Finishing Solutions (GFS)](${origin}/gfs-paint-booth-filters)
- [Col-Met](${origin}/shop-by-booth/col-met)
- [Blowtherm](${origin}/shop-by-booth/blowtherm)
- [PFS Spray Booths](${origin}/shop-by-booth/pfs-spray-booths)
${BOOTH_BRANDS.map((brand) => `- [${brand.name} paint booth filters](${origin}/shop-by-booth/${brand.slug})`).join('\n')}

## Where orders ship
- [Santa Rosa, California address and phone](${origin}/contact)
- [Spray booth filters shipped to Georgia from Santa Rosa](${origin}/georgia/spray-booth-filters)
- Address: 1400 Airport Blvd, Santa Rosa, CA 95403. Online orders ship within the United States. There is no Georgia storefront.

## California pages
- [North Bay](${origin}/california/north-bay-paint-booth-filters)
- [Bay Area](${origin}/california/bay-area-paint-booth-filters)
- [Sacramento](${origin}/california/sacramento-paint-booth-filters)
- [Napa Valley](${origin}/california/napa-valley-paint-booth-filters)
- [Central Valley](${origin}/california/central-valley-paint-booth-filters)
- [Bakersfield](${origin}/california/bakersfield-paint-booth-filters)
- [San Diego](${origin}/california/san-diego-paint-booth-filters)
- [Los Angeles](${origin}/california/los-angeles-paint-booth-filters)
- [California compliance boundary](${origin}/california/carb-paint-booth-filter-compliance)

## Guides
- [Filter size chart](${origin}/guides/filter-size-chart)
- [Andreae AF numbers in the catalog](${origin}/guides/andreae-af-numbers)
- [How to measure a paint booth filter](${origin}/guides/how-to-measure-paint-booth-filters)
- [Andreae, fiberglass, and Paint Pockets](${origin}/guides/andreae-vs-fiberglass-vs-paint-pockets)
- [Shipping and freight](${origin}/guides/shipping-and-freight)
- [Part number cross reference](${origin}/filter-part-numbers)
${CROSSREF_PAGES.map((page) => `- [${page.h1}](${origin}${page.path})`).join('\n')}
- [Agent instructions (no checkout)](${origin}/agents.md)

## Filters by media brand
- [Andreae accordion filters: AF213, AF223, AF413, AF423 pads; AF813, AF923, AF113, AF123 rolls](${origin}/andreae-paint-booth-filters)
- [Filter brands carried](${origin}/brands)

## Aerospace and regulated coatings
- [NESHAP 6H and Method 319 filter guide](${origin}/neshap-compliant-paint-booth-filters)
- [Aerospace paint booth filtration](${origin}/industries/aerospace-paint-booth-filters)
- Note: PFS Filters does not claim that any filter by itself makes a facility compliant with EPA Method 319, NESHAP Subpart HHHHHH, or a permit. Compliance depends on the full system, testing documentation, operation, and recordkeeping.

## Programs
- [Filter Rotation Program: scheduled filter replacement by booth](${origin}/filter-rotation-program)
- [Memberships](${origin}/memberships)

## Guides
${blogPosts.map((post) => `- [${post.title}](${origin}/blog/${post.slug})`).join('\n')}

## Machine-readable
- [Full text of guides, FAQ, and catalog](${origin}/llms-full.txt)
- [XML sitemap](${origin}/sitemap.xml)
- [Product catalog JSON](${origin}/products.json)
- [RSS feed](${origin}/feed.xml)
`;
}

function headingBlock(title, paragraphs) {
  const body = uniqueParagraphs(paragraphs).join('\n\n');
  return body ? `## ${title}\n\n${body}\n` : '';
}

export function renderLlmsFullTxt() {
  const faq = faqs.map((item) => `### ${item.question}\n\n${plainText(item.answer)}`).join('\n\n');
  const guides = blogPosts.map((post) => {
    const extra = (post.faqs || []).map((item) => `Question: ${item.question}\n\n${plainText(item.answer)}`).join('\n\n');
    return `## ${post.title}\n\nPublished: ${post.date}\n\n${plainText(post.excerpt)}\n\n${markdownParagraphs(post.content).join('\n\n')}${extra ? `\n\n${extra}` : ''}\n`;
  }).join('\n');
  const brands = listBoothGuides().map((guide) => headingBlock(guide.name, guideParagraphs(guide))).join('\n');
  const sprayGuide = [...sprayBoothSections.map((section) => headingBlock(section.heading, section.paragraphs)), headingBlock('Spray booth filter questions', faqParagraphs(sprayBoothFaqs))].join('\n');
  const georgiaGuide = [...georgiaSections.map((section) => headingBlock(section.heading, section.paragraphs)), headingBlock('Georgia shipping questions', faqParagraphs(georgiaFaqs))].join('\n');
  const generatedGuides = [
    ...CROSSREF_PAGES.map((page) => headingBlock(page.h1, [...crossRefSections(page, products).flatMap((section) => section.paragraphs), ...faqParagraphs(crossRefFaqs(page))])),
    headingBlock('Paint Booth Filter Size Chart', [...sizeChartSections(products).flatMap((section) => section.paragraphs), ...faqParagraphs(sizeChartFaqs())]),
    headingBlock('Andreae AF Number Guide', [...andreaeSections(products).flatMap((section) => section.paragraphs), ...faqParagraphs(andreaeFaqs(products))]),
    headingBlock('How to Measure a Paint Booth Filter', [...measureSections().flatMap((section) => section.paragraphs), ...faqParagraphs(measureFaqs())]),
    headingBlock('Andreae, Fiberglass, and Paint Pockets', [...comparisonSections(products).flatMap((section) => section.paragraphs), ...faqParagraphs(comparisonFaqs())]),
    headingBlock('Shipping and Freight', [...shippingSections(products).flatMap((section) => section.paragraphs), ...faqParagraphs(shippingFaqs())]),
  ].join('\n');
  const brandReference = BOOTH_BRANDS.map((brand) => headingBlock(brand.name, brandModelParagraphs(brand))).join('\n');
  const catalog = sellableProducts().map((product) => {
    const lines = productParagraphs(product);
    return `### ${product.title}\n\n- URL: ${origin}/product/${product.handle}\n\n${lines.join('\n\n')}\n`;
  }).join('\n');
  return `${renderLlmsTxt()}\n# Frequently asked questions\n\n${faq}\n\n# Spray booth filters\n\n${sprayGuide}\n# Georgia shipping\n\n${georgiaGuide}\n# Generated guides\n\n${generatedGuides}\n# Published guides\n\n${guides}\n# Booth brand guides\n\n${brands}\n# Booth brand reference\n\n${brandReference}\n# Product catalog\n\n${catalog}`;
}
