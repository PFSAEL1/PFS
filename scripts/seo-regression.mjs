#!/usr/bin/env node
// Compares the built site with live https://www.pfsfilters.com.
// Fails the build when an existing URL, canonical, snippet, or crawler link regresses.
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist', 'public');
const origin = 'https://www.pfsfilters.com';
const productionSitemap = `${origin}/sitemap.xml`;

// Keyword pages whose title, description, or H1 may differ from production.
// Every other existing URL must keep those three fields.
const intentionalPaths = new Set([
  '/shop',
  '/paint-booth-filters',
  '/category/fiberglass-arrestors',
  '/category/roll-media',
  '/neshap-compliant-paint-booth-filters',
]);

const failures = [];
const changes = [];

const fail = (message) => failures.push(message);

const decode = (value = '') => value
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
  .replace(/\s+/g, ' ')
  .trim();

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'));
  return match ? decode(match[2]) : '';
};

const tag = (html, pattern) => html.match(pattern)?.[0] || '';

const pathnameOf = (href) => {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return null;
  try {
    const url = new URL(href, origin);
    if (url.hostname !== 'www.pfsfilters.com' && url.hostname !== 'pfsfilters.com') return null;
    const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
    return pathname || '/';
  } catch {
    return null;
  }
};

const walk = (node, visit) => {
  if (Array.isArray(node)) {
    node.forEach((item) => walk(item, visit));
    return;
  }
  if (!node || typeof node !== 'object') return;
  visit(node);
  Object.values(node).forEach((value) => walk(value, visit));
};

const jsonLd = (html) => {
  const blocks = [];
  for (const match of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      blocks.push({ parseError: error.message });
    }
  }
  return blocks;
};

const schemaTypes = (blocks) => {
  const types = new Set();
  for (const block of blocks) {
    walk(block, (node) => {
      const value = node['@type'];
      const list = Array.isArray(value) ? value : value ? [value] : [];
      list.forEach((type) => types.add(String(type)));
    });
  }
  return types;
};

const productNodes = (blocks) => {
  const products = [];
  for (const block of blocks) {
    walk(block, (node) => {
      const value = node['@type'];
      const list = Array.isArray(value) ? value : [value];
      if (list.includes('Product') && (node.name || node.offers)) products.push(node);
    });
  }
  return products;
};

const offerOf = (product) => {
  const offers = product.offers;
  if (Array.isArray(offers)) return offers[0] || null;
  return offers && typeof offers === 'object' ? offers : null;
};

const inspect = (html) => {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const description = attr(tag(html, /<meta\b[^>]*name=["']description["'][^>]*>/i), 'content');
  const canonical = attr(tag(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/i), 'href');
  const robots = attr(tag(html, /<meta\b[^>]*name=["']robots["'][^>]*>/i), 'content');
  const h1 = decode(((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/<[^>]+>/g, ' '));
  const hreflang = [...html.matchAll(/<link\b[^>]*hreflang=["']([^"']+)["'][^>]*>/gi)].map((match) => {
    const link = match[0];
    return `${decode(match[1])}|${attr(link, 'href')}`;
  }).sort();
  const blocks = jsonLd(html);
  const links = new Set();
  for (const match of html.matchAll(/<a\s[^>]*href\s*=\s*(["'])([\s\S]*?)\1/gi)) {
    const pathname = pathnameOf(decode(match[2]));
    if (pathname) links.add(pathname);
  }
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '));
  return {
    title,
    description,
    canonical,
    robots,
    h1,
    hreflang,
    blocks,
    types: schemaTypes(blocks),
    products: productNodes(blocks),
    links,
    words: text ? text.split(' ').filter(Boolean).length : 0,
    noindex: /noindex/i.test(robots),
  };
};

const readSitemap = (file) => {
  const xml = fs.readFileSync(file, 'utf8');
  const check = spawnSync('python3', ['-c', 'import sys, xml.etree.ElementTree as ET\nET.parse(sys.argv[1])\n', file], { encoding: 'utf8' });
  if (check.status !== 0) fail(`${file} is not valid XML: ${check.stderr.trim()}`);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  if (!xml.includes('<urlset')) fail(`${file} is missing <urlset>`);
  if (new Set(locs).size !== locs.length) fail(`${file} contains duplicate <loc> entries`);
  return { xml, locs };
};

const disallows = (text) => {
  const rules = [];
  let agent = '*';
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (/^user-agent:/i.test(trimmed)) agent = trimmed.split(':').slice(1).join(':').trim();
    if (/^disallow:/i.test(trimmed)) rules.push(`${agent} ${trimmed.split(':').slice(1).join(':').trim()}`);
  }
  return rules;
};

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'User-Agent': 'PFS-SEO-regression', Accept: 'text/html,application/xml,text/plain' },
  });
  const body = await response.text();
  return { status: response.status, location: response.headers.get('location'), body };
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

const branchFile = (pathname) => pathname === '/'
  ? path.join(distDir, 'index.html')
  : path.join(distDir, `${pathname.replace(/^\//, '')}.html`);

const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));

const isRedirect = (status) => {
  const code = Number(status);
  return code >= 300 && code < 400;
};

const redirectStatus = (pathname) => {
  for (const route of vercel.routes || []) {
    if (!isRedirect(route.status) || !route.src) continue;
    const expression = new RegExp(`^${route.src}$`);
    if (expression.test(pathname)) return Number(route.status);
  }
  return null;
};

async function localStatuses(pathsToCheck) {
  const port = 4188;
  const child = spawn('node', ['e2e/preview-server.mjs'], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: 'ignore',
  });
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try {
      const probe = await fetch(`http://127.0.0.1:${port}/`, { redirect: 'manual' });
      await probe.arrayBuffer();
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  try {
    return await mapPool(pathsToCheck, 12, async (pathname) => {
      const response = await fetch(`http://127.0.0.1:${port}${pathname}`, { redirect: 'manual' });
      await response.arrayBuffer();
      return { pathname, status: response.status, location: response.headers.get('location') };
    });
  } finally {
    child.kill();
  }
}

async function main() {
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    fail('dist/public is missing. Run the production build before the SEO regression.');
  }

  const branchSitemap = readSitemap(path.join(distDir, 'sitemap.xml'));
  const publicSitemap = readSitemap(path.join(root, 'client', 'public', 'sitemap.xml'));
  if (branchSitemap.locs.join('\n') !== publicSitemap.locs.join('\n')) {
    fail('dist/public/sitemap.xml does not match client/public/sitemap.xml');
  }

  const productionSitemapResponse = await fetchText(productionSitemap);
  if (productionSitemapResponse.status !== 200) fail(`Production sitemap returned ${productionSitemapResponse.status}`);
  const productionXmlFile = path.join('/tmp', 'pfs-production-sitemap.xml');
  fs.writeFileSync(productionXmlFile, productionSitemapResponse.body);
  const liveSitemap = readSitemap(productionXmlFile);
  const productionPaths = liveSitemap.locs.map((loc) => {
    const pathname = pathnameOf(loc);
    if (!pathname) fail(`Production sitemap loc is not on www: ${loc}`);
    if (!loc.startsWith(`${origin}/`) && loc !== `${origin}/`) fail(`Production sitemap loc is not a www URL: ${loc}`);
    return pathname;
  });
  if (productionPaths.length !== 125) fail(`Expected 125 production sitemap URLs, found ${productionPaths.length}`);

  const branchPaths = branchSitemap.locs.map((loc) => {
    if (!loc.startsWith(`${origin}/`) && loc !== `${origin}/`) fail(`Branch sitemap loc is not a www URL: ${loc}`);
    return pathnameOf(loc);
  });
  const productionSet = new Set(productionPaths);
  const branchSet = new Set(branchPaths);
  for (const pathname of productionSet) {
    if (!branchSet.has(pathname)) fail(`Branch sitemap dropped ${pathname}`);
  }
  const added = [...branchSet].filter((pathname) => !productionSet.has(pathname)).sort();
  const allowedAdded = new Set(['/how-to-size-paint-booth-filters']);
  for (const pathname of added) {
    if (!allowedAdded.has(pathname)) fail(`Branch sitemap added ${pathname}, which is not a known new page`);
  }
  if (!added.includes('/how-to-size-paint-booth-filters')) fail('Branch sitemap is missing /how-to-size-paint-booth-filters');

  const robotsResponse = await fetchText(`${origin}/robots.txt`);
  if (robotsResponse.status !== 200) fail(`Production robots.txt returned ${robotsResponse.status}`);
  const branchRobots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
  if (!branchRobots.includes('Sitemap: https://www.pfsfilters.com/sitemap.xml')) {
    fail('robots.txt no longer references https://www.pfsfilters.com/sitemap.xml');
  }
  const productionDisallow = new Set(disallows(robotsResponse.body));
  for (const rule of disallows(branchRobots)) {
    if (!productionDisallow.has(rule)) fail(`robots.txt newly disallows ${rule}`);
  }

  for (const route of vercel.routes || []) {
    if (!isRedirect(route.status)) continue;
    const known = (route.src === '/(.+)/' && Number(route.status) === 301)
      || (route.src === '/filter-compatibility' && Number(route.status) === 308);
    if (!known) fail(`vercel.json has an unexpected redirect: ${route.status} ${route.src}`);
  }
  for (const pathname of productionSet) {
    const status = redirectStatus(pathname);
    if (status) fail(`${pathname} matches a new redirect (${status})`);
  }

  const local = await localStatuses([...productionSet, ...added]);
  for (const result of local) {
    if (result.status !== 200 || result.location) {
      fail(`${result.pathname} served ${result.status}${result.location ? ` -> ${result.location}` : ''} instead of 200`);
    }
  }

  const productionPages = await mapPool([...productionSet], 8, async (pathname) => {
    const response = await fetchText(`${origin}${pathname === '/' ? '/' : pathname}`);
    return { pathname, ...response };
  });

  for (const page of productionPages) {
    if (page.status !== 200 || page.location) {
      fail(`Production ${page.pathname} returned ${page.status}${page.location ? ` -> ${page.location}` : ''}`);
      continue;
    }
    const file = branchFile(page.pathname);
    if (!fs.existsSync(file)) {
      fail(`Missing prerendered HTML for ${page.pathname}`);
      continue;
    }
    const before = inspect(page.body);
    const after = inspect(fs.readFileSync(file, 'utf8'));
    const canonicalPath = pathnameOf(before.canonical);
    const branchCanonicalPath = pathnameOf(after.canonical);
    if (!before.canonical.startsWith(origin)) fail(`Production canonical for ${page.pathname} is not www: ${before.canonical}`);
    if (after.canonical !== before.canonical) {
      fail(`Canonical changed for ${page.pathname}: ${before.canonical} -> ${after.canonical}`);
    }
    if (canonicalPath !== page.pathname || branchCanonicalPath !== page.pathname) {
      fail(`Canonical path for ${page.pathname} is ${after.canonical}`);
    }
    if (before.hreflang.join('\n') !== after.hreflang.join('\n')) {
      fail(`hreflang changed for ${page.pathname}`);
    }
    if (!before.noindex && after.noindex) fail(`noindex added on ${page.pathname}`);
    if (after.noindex) fail(`Indexed URL ${page.pathname} is noindex`);
    for (const field of ['title', 'description', 'h1']) {
      if (!after[field]) fail(`${field} is blank on ${page.pathname}`);
      if (!before[field]) continue;
      if (before[field] !== after[field]) {
        const row = { path: page.pathname, field, before: before[field], after: after[field] };
        if (intentionalPaths.has(page.pathname)) changes.push(row);
        else fail(`${field} changed on ${page.pathname}: "${before[field]}" -> "${after[field]}"`);
      }
    }
    for (const type of before.types) {
      if (!after.types.has(type)) fail(`Structured data @type ${type} dropped on ${page.pathname}`);
    }
    if (before.blocks.some((block) => block.parseError)) fail(`Production JSON-LD on ${page.pathname} did not parse`);
    if (after.blocks.some((block) => block.parseError)) fail(`Branch JSON-LD on ${page.pathname} did not parse`);
    if (before.products.length > 0) {
      if (after.products.length === 0) fail(`Product structured data dropped on ${page.pathname}`);
      const beforeOffer = offerOf(before.products[0]);
      const afterOffer = offerOf(after.products[0]);
      for (const offerField of ['price', 'priceCurrency', 'availability']) {
        if (beforeOffer?.[offerField] != null && (afterOffer?.[offerField] == null || afterOffer[offerField] === '')) {
          fail(`Product offer ${offerField} dropped on ${page.pathname}`);
        }
      }
      if (beforeOffer?.price != null && afterOffer?.price != null && String(beforeOffer.price) !== String(afterOffer.price)) {
        fail(`Product offer price changed on ${page.pathname}: ${beforeOffer.price} -> ${afterOffer.price}`);
      }
      if (!after.products[0].name) fail(`Product name dropped on ${page.pathname}`);
    }
    for (const link of before.links) {
      if (link.startsWith('/product/') && !after.links.has(link)) {
        fail(`Product link ${link} removed from prerendered ${page.pathname}`);
      }
    }
    if (after.words < Math.floor(before.words * 0.8)) {
      fail(`Prerendered text on ${page.pathname} shrank from ${before.words} to ${after.words} words`);
    }
    const productAnchors = [...after.links].filter((link) => link.startsWith('/product/'));
    if ([...before.links].some((link) => link.startsWith('/product/')) && productAnchors.length === 0) {
      fail(`${page.pathname} no longer has real product <a href> links`);
    }
  }

  for (const pathname of added) {
    const file = branchFile(pathname);
    const html = fs.readFileSync(file, 'utf8');
    const page = inspect(html);
    if (page.canonical !== `${origin}${pathname}`) fail(`New page canonical is ${page.canonical}`);
    if (page.noindex || !page.title || !page.description || !page.h1) fail(`New page ${pathname} is missing indexable metadata`);
    if (!html.includes('data-keyword-guide') || !html.includes('<table')) fail(`Sizing guide is missing its copy or table`);
  }

  const report = {
    productionUrls: productionPaths.length,
    branchUrls: branchPaths.length,
    added,
    changes,
    failures,
  };
  const reportPath = path.join('/tmp', 'seo-regression-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`Production sitemap URLs: ${productionPaths.length}`);
  console.log(`Branch sitemap URLs: ${branchPaths.length}`);
  console.log(`Added: ${added.join(', ') || '(none)'}`);
  if (changes.length) {
    console.log('\nIntentional metadata changes:');
    console.log('| Path | Field | Production | Branch |');
    console.log('| --- | --- | --- | --- |');
    for (const change of changes) {
      console.log(`| ${change.path} | ${change.field} | ${change.before.replace(/\|/g, '/')} | ${change.after.replace(/\|/g, '/')} |`);
    }
  } else {
    console.log('No title, description, or H1 changes on the keyword pages.');
  }
  if (failures.length) {
    console.error(`\n${failures.length} SEO regression${failures.length === 1 ? '' : 's'}:`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log('\nSEO regression check passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
