import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import { isGuidePath, productSchemaExtras } from '@shared/seoText.mjs';
import { mainFallbackWordCount, pageCopyHtml, renderLlmsTxt } from '../../../scripts/page-copy.mjs';

const repoRoot = fileURLToPath(new URL('../../..', import.meta.url));

describe('answer engine files', () => {
  it('gives named crawlers the same disallows as the wildcard group', () => {
    const robots = readFileSync(new URL('../../../client/public/robots.txt', import.meta.url), 'utf8');
    expect(robots).toContain('Sitemap: https://www.pfsfilters.com/sitemap.xml');
    const group = robots.split(/\n\s*\n/).find((block) => block.includes('User-agent: *'));
    expect(group).toBeTruthy();
    for (const agent of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Bingbot', 'Applebot', 'Applebot-Extended', 'Google-Extended', 'DuckAssistBot', 'Amazonbot', 'meta-externalagent', 'CCBot']) {
      expect(group).toContain(`User-agent: ${agent}`);
    }
    for (const rule of ['Disallow: /api/', 'Disallow: /auth', 'Disallow: /dashboard', 'Disallow: /filter-database']) {
      expect(group).toContain(rule);
    }
    expect(robots).not.toMatch(/User-agent: GPTBot\nAllow: \/\n\n/);
  });

  it('does not run IndexNow during the build and refuses a live ping without confirmation', () => {
    const pkg = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'));
    expect(pkg.scripts.build).not.toContain('indexnow');
    expect(() => execFileSync(process.execPath, ['scripts/indexnow.mjs'], {
      cwd: repoRoot,
      encoding: 'utf8',
      env: { ...process.env, INDEXNOW_CONFIRM_PRODUCTION: '' },
    })).toThrow(/INDEXNOW_CONFIRM_PRODUCTION/);
    const dryRun = execFileSync(process.execPath, ['scripts/indexnow.mjs', '--dry-run'], { cwd: repoRoot, encoding: 'utf8' });
    expect(dryRun).toContain('www.pfsfilters.com');
    expect(dryRun).not.toContain('api.indexnow.org');
  });

  it('keeps the llms.txt phone and does not claim NESHAP compliance', () => {
    const llms = renderLlmsTxt();
    expect(llms).toContain('Phone: 855-496-7969');
    expect(llms).toContain('1400 Airport Blvd, Santa Rosa, CA 95403');
    expect(llms.toLowerCase()).toContain('does not claim');
    expect(llms).not.toMatch(/30\+ years|years in business/i);
    expect(llms).toContain('/spray-booth-filters');
    expect(llms).toContain('/georgia/spray-booth-filters');
    expect(llms).toContain('/guides/filter-size-chart');
    expect(llms).toContain('/agents.md');
    expect(llms).not.toMatch(/EPD-compliant/i);
    const workflow = readFileSync(new URL('../../../.github/workflows/indexnow.yml', import.meta.url), 'utf8');
    expect(workflow).toContain('Production – abc-filter-splash');
    expect(workflow).toContain('workflow_dispatch');
  });

  it('puts the full FAQ and a full blog article in the prerender copy', () => {
    const faq = pageCopyHtml('/faq');
    const article = pageCopyHtml('/blog/how-often-change-paint-booth-filters');
    expect(mainFallbackWordCount(`<main data-seo-fallback>${faq}</main>`)).toBeGreaterThanOrEqual(250);
    expect(mainFallbackWordCount(`<main data-seo-fallback>${article}</main>`)).toBeGreaterThanOrEqual(250);
    expect(article).toContain('A calendar can help organize inspections');
    expect(article).not.toMatch(/…<\/p>/);
    expect(isGuidePath('/exhaust-filters')).toBe(true);
    expect(isGuidePath('/product/example')).toBe(false);
  });

  it('sets mpn only from a real SKU or vendor part', () => {
    const fromSku = productSchemaExtras({
      title: 'Example 22 gram fiberglass pad',
      productType: 'Paint Arrestor',
      description: 'Fiberglass exhaust pad.',
      tags: ['Case of 50'],
      variants: { edges: [{ node: { title: '20x20x2 50/CS', sku: 'PFS-EXAMPLE', price: { amount: '10.00' } } }] },
    });
    expect(fromSku.mpn).toBe('PFS-EXAMPLE');
    expect(fromSku.category).toBe('Paint Arrestor');
    expect(fromSku.additionalProperty?.map((row: { name: string }) => row.name)).toEqual(expect.arrayContaining(['Gram weight', 'Media', 'Size', 'Pack quantity']));
    expect(JSON.stringify(fromSku)).not.toMatch(/gtin|aggregateRating|review/i);

    const blank = productSchemaExtras({
      title: 'Unidentified coating',
      description: 'No part number is recorded.',
      variants: { edges: [{ node: { title: 'Default Title', sku: '', id: 'gid://shopify/ProductVariant/1' } }] },
    });
    expect(blank.mpn).toBeUndefined();

    const parker = productSchemaExtras({
      title: 'Parker LoadTECH',
      description: 'Parker part 1136513, model PLT4-M14-13-PH.',
      productType: 'Filter',
      variants: { edges: [{ node: { title: 'Case of 3', sku: 'PFS-PLT4-M14-13-PH-3PK' } }] },
    });
    expect(parker.mpn).toBe('1136513');
  });
});
