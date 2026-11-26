import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { pageCopyHtml } from '../../../scripts/page-copy.mjs';
import { filterFinderCrawlerSections } from '../../../shared/airflowPages.mjs';

const forbidden = /product\.description|radial-gradient|bg-\[#|not in the PFS Filters catalog|Built toManage/;

describe('prerender copy stays free of source code', () => {
  it('does not copy ProductDetail source into product pages', () => {
    for (const edge of snapshot as Array<{ node: { handle: string } }>) {
      const html = pageCopyHtml(`/product/${edge.node.handle}`);
      expect(html, edge.node.handle).not.toMatch(forbidden);
    }
  });

  it('keeps a space in the homepage prerender heading', () => {
    expect(pageCopyHtml('/filter-finder')).not.toMatch(/className|=>|function /);
    const finder = filterFinderCrawlerSections().flatMap((section) => [section.heading, ...section.paragraphs]).join(' ');
    expect(finder).not.toMatch(/className|=>|function /);
    const words = finder.replace(/\{(\/[^|}]+)\|([^}]+)\}/g, '$2').split(/\s+/).filter(Boolean);
    expect(words.length).toBeGreaterThanOrEqual(800);
    const generator = readFileSync(new URL('../../../scripts/generate-seo-assets.mjs', import.meta.url), 'utf8');
    expect(generator).toMatch(/Built to<\/span>\s+<span[^>]*>Manage Your Entire Booth/);
    expect(generator).not.toContain('Built to</span><span');
  });
});
