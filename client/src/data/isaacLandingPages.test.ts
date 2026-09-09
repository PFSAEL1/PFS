import { describe, expect, it } from 'vitest';
import {
  CALIFORNIA_COMPLIANCE_PATH,
  CALIFORNIA_LANDING_PAGES,
  OEM_LANDING_PAGES,
} from './isaacLandingPages';

describe('Isaac SEO landing-page registry', () => {
  it('contains every remaining dedicated OEM route exactly once', () => {
    const paths = Object.values(OEM_LANDING_PAGES).map((page) => page.path);

    expect(paths).toEqual([
      '/accudraft-paint-booth-filters',
      '/gfs-paint-booth-filters',
      '/col-met-paint-booth-filters',
      '/pfs-spray-booth-filters',
    ]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('contains eight unique regional California routes plus the compliance guide', () => {
    const pages = Object.values(CALIFORNIA_LANDING_PAGES);
    const paths = pages.map((page) => page.path);

    expect(pages).toHaveLength(8);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => path.startsWith('/california/'))).toBe(true);
    expect(CALIFORNIA_COMPLIANCE_PATH).toBe('/california/carb-paint-booth-filter-compliance');
  });

  it('keeps every regional page unique and locally useful', () => {
    const pages = Object.values(CALIFORNIA_LANDING_PAGES);

    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.introduction)).size).toBe(pages.length);
    expect(pages.every((page) => page.cities.length >= 5)).toBe(true);
    expect(pages.every((page) => page.industries.length >= 4)).toBe(true);
  });

  it('avoids prohibited universal or unsupported marketing claims', () => {
    const content = JSON.stringify({ OEM_LANDING_PAGES, CALIFORNIA_LANDING_PAGES });

    expect(content).not.toMatch(/authorized distributor/i);
    expect(content).not.toMatch(/guaranteed fit/i);
    expect(content).not.toMatch(/ships same day/i);
    expect(content).not.toMatch(/every brand|every size/i);
    expect(content).not.toMatch(/universally CARB compliant/i);
  });
});
