import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getBoothGuide, listBoothGuides } from '@shared/boothFilterGuides.mjs';
import { resolveRouteSeo } from '@shared/seoText.mjs';

const heroSource = readFileSync(new URL('../components/Hero.tsx', import.meta.url), 'utf8');
const homeSource = readFileSync(new URL('../pages/Home.tsx', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../index.css', import.meta.url), 'utf8');
const brandSource = readFileSync(new URL('../pages/BrandDetail.tsx', import.meta.url), 'utf8');

describe('booth filter guides from the model CSV', () => {
  const guides = listBoothGuides();

  it('publishes a guide only for on-site brands with verified rows', () => {
    expect(guides).toHaveLength(42);
    expect(getBoothGuide('junair')).toBeNull();
    expect(getBoothGuide('marathon-finishing')).toBeNull();
    expect(getBoothGuide('rohner')).toBeNull();
    expect(guides.map((guide) => guide.slug)).not.toContain('viking');
    const serialized = JSON.stringify(guides);
    expect(serialized).not.toContain('38.5x62');
    expect(serialized).not.toContain('not on site');
    expect(serialized).not.toMatch(/NESHAP|compliant|CARB|OSHA/i);
    expect(getBoothGuide('accudraft')?.rows.some((row) => row.size === '44x136.25')).toBe(true);
    expect(getBoothGuide('garmat-usa')?.rows.some((row) => row.size === '16x20x66')).toBe(true);
    expect(getBoothGuide('usi-italia')?.rows.some((row) => row.size.includes('78x134'))).toBe(false);
  });

  it('gives each published brand a unique intro, a size table, and 3-4 FAQs', () => {
    const intros = new Set<string>();
    const questions = new Set<string>();
    for (const guide of guides) {
      expect(guide.intro.length).toBeGreaterThan(200);
      expect(guide.rows.length).toBeGreaterThan(0);
      expect(guide.faqs.length).toBeGreaterThanOrEqual(3);
      expect(guide.faqs.length).toBeLessThanOrEqual(4);
      expect(guide.metaDescription.length).toBeGreaterThanOrEqual(140);
      expect(guide.metaDescription.length).toBeLessThanOrEqual(160);
      intros.add(guide.intro);
      for (const faq of guide.faqs) {
        expect(questions.has(faq.question)).toBe(false);
        questions.add(faq.question);
        expect(faq.answer.length).toBeGreaterThan(40);
      }
      const seo = resolveRouteSeo(`/shop-by-booth/${guide.slug}`, { brandName: guide.name });
      expect(seo.description).toBe(guide.metaDescription);
      expect(seo.title.length).toBeLessThanOrEqual(60);
    }
    expect(intros.size).toBe(guides.length);
  });

  it('leaves brands without verified rows on the original page copy', () => {
    expect(brandSource).toContain('models listed here');
    expect(brandSource).toContain('getBoothGuide(brand.slug)');
    expect(brandSource).toContain("'@type': 'FAQPage'");
  });
});

describe('homepage image priority and font swap', () => {
  it('reserves hero and card space and prioritizes the mobile hero image', () => {
    expect(heroSource).toContain('fetchPriority="high"');
    expect(heroSource).toContain('sizes="(max-width: 767px) 100vw, 1600px"');
    expect(heroSource).toContain('width={960}');
    expect(heroSource).toContain('height={540}');
    expect(heroSource).toContain("aspectRatio: '16 / 9'");
    expect(heroSource).toContain('HERO_POSTER_MOBILE} 960w');
    expect(heroSource).toContain('pfs-hero-poster-mobile.webp');
    expect(homeSource).toContain('home-filter-card');
    expect(homeSource).toContain('width={960}');
    expect(homeSource).toContain('height={644}');
    expect(homeSource).toContain("aspectRatio: '960 / 644'");
    expect(cssSource).toContain('font-display: swap');
  });
});
