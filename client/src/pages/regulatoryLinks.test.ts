import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const californiaPage = readFileSync(new URL('./CaliforniaCarbCompliance.tsx', import.meta.url), 'utf8');
const neshapPage = readFileSync(new URL('./NeshapCompliantPaintBoothFilters.tsx', import.meta.url), 'utf8');

const retiredMethod319Url = 'https://www.epa.gov/emc/method-319-determination-filtration-efficiency-paint-overspray-arrestors';
const currentMethod319Url = 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-63/appendix-Appendix%20A%20to%20Part%2063';

describe('regulatory reference links', () => {
  it.each([
    ['California compliance page', californiaPage],
    ['NESHAP guide', neshapPage],
  ])('uses the current Method 319 reference on the %s', (_label, source) => {
    expect(source).toContain(currentMethod319Url);
    expect(source).not.toContain(retiredMethod319Url);
  });
});
