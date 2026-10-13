import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const pageSource = readFileSync(new URL('./AerospaceHub.tsx', import.meta.url), 'utf8');
const generatorSource = readFileSync(new URL('../../../scripts/generate-seo-assets.mjs', import.meta.url), 'utf8');

describe('aerospace hub breadcrumbs', () => {
  it('links the parent breadcrumb to the paint booth filters page', () => {
    expect(pageSource).toContain("label: 'Paint Booth Filters', href: '/paint-booth-filters'");
    expect(pageSource).not.toContain("label: 'Industries', href: '#'");
  });

  it('uses the same parent in client and generated breadcrumb schema', () => {
    const expectedItem = "name: 'Paint Booth Filters', item: 'https://www.pfsfilters.com/paint-booth-filters'";
    expect(pageSource).toContain(expectedItem);
    expect(generatorSource).toContain("name: 'Paint Booth Filters', item: `${origin}/paint-booth-filters`");
  });
});
