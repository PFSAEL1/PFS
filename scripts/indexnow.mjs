#!/usr/bin/env node
/**
 * Submit the production sitemap to IndexNow (https://www.indexnow.org/documentation).
 *
 * This is not part of the site build. Run it only after a production deploy:
 *   INDEXNOW_CONFIRM_PRODUCTION=1 node scripts/indexnow.mjs
 * A GitHub Action does that when a deployment to the Production environment succeeds.
 *
 *   node scripts/indexnow.mjs --dry-run
 * prints the payload and does not call the network.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'client', 'public');
const host = 'www.pfsfilters.com';
const dryRun = process.argv.includes('--dry-run');

function keyFile() {
  const matches = fs.readdirSync(publicDir).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  if (matches.length !== 1) {
    throw new Error(`Expected one IndexNow key file in client/public, found ${matches.length}`);
  }
  const key = matches[0].replace(/\.txt$/, '');
  const body = fs.readFileSync(path.join(publicDir, matches[0]), 'utf8').trim();
  if (body !== key) throw new Error('IndexNow key file contents do not match its filename');
  return key;
}

function sitemapUrls() {
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (!urls.length) throw new Error('Sitemap has no URLs');
  const foreign = urls.filter((url) => !url.startsWith(`https://${host}/`));
  if (foreign.length) throw new Error(`Sitemap contains non-production URLs: ${foreign.slice(0, 3).join(', ')}`);
  return urls;
}

const key = keyFile();
const urlList = sitemapUrls();
const payload = {
  host,
  key,
  keyLocation: `https://${host}/${key}.txt`,
  urlList,
};

if (dryRun) {
  console.log(JSON.stringify({ ...payload, urlList: urlList.length }, null, 2));
  process.exit(0);
}

if (process.env.INDEXNOW_CONFIRM_PRODUCTION !== '1') {
  console.error('Refusing to ping IndexNow. Set INDEXNOW_CONFIRM_PRODUCTION=1 only for a production deploy. The site build does not do this.');
  process.exit(1);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});
const text = await response.text();
if (response.status !== 200 && response.status !== 202) {
  console.error(`IndexNow responded ${response.status}: ${text.slice(0, 500)}`);
  process.exit(1);
}
console.log(`IndexNow accepted ${urlList.length} URLs (${response.status}).`);
