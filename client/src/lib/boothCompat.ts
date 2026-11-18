// boothCompat.ts — public booth -> filter compatibility lookup
// Data derived from real PFS / G&C service records (brand-level only; no customer data).
import compatData from '@/data/boothCompatibility.json';

export interface CompatCategory {
  category: string;
  common_sizes: string[];
}
export interface BrandCompat {
  brand: string;
  categories: CompatCategory[];
}

const DATA = compatData as Record<string, BrandCompat>;

// All brands sorted alphabetically for the picker
export const ALL_BRANDS: string[] = Object.keys(DATA).sort((a, b) =>
  a.localeCompare(b)
);

// Map our normalized filter categories -> existing /category route slugs
const CATEGORY_SLUG: Record<string, string> = {
  'Ceiling / Intake Filter': 'ceiling-blankets',
  'Intake Filter': 'ceiling-blankets',
  'Exhaust / Arrestor Filter': 'fiberglass-arrestors',
  'Pre-Filter': 'roll-media',
};

export function categorySlug(category: string): string {
  return CATEGORY_SLUG[category] || 'fiberglass-arrestors';
}

// Build a shoppable link: filter the shop by category (+ size when we have a clean size)
export function shopLink(category: string, size?: string): string {
  if (size) return '/shop-by-size';
  const slug = categorySlug(category);
  return slug === 'pre-filters' ? '/prefilters' : `/category/${slug}`;
}

// Normalize user text -> a known brand key (fuzzy: substring both directions)
export function matchBrand(input: string): BrandCompat | null {
  if (!input) return null;
  const q = input.trim().toLowerCase();
  if (!q) return null;
  // exact-ish
  for (const key of Object.keys(DATA)) {
    if (key.toLowerCase() === q) return DATA[key];
  }
  // contains
  const aliases: Record<string, string> = {
    gfs: 'Global Finishing Solutions (GFS)',
    global: 'Global Finishing Solutions (GFS)',
    'global finishing': 'Global Finishing Solutions (GFS)',
    devilbiss: 'Binks / DeVilbiss',
    binks: 'Binks / DeVilbiss',
    'spray bake': 'SprayBake',
    spraybake: 'SprayBake',
    usi: 'USI / ITALIA',
    italia: 'USI / ITALIA',
  };
  if (aliases[q] && DATA[aliases[q]]) return DATA[aliases[q]];
  for (const [alias, key] of Object.entries(aliases)) {
    if ((q.includes(alias) || alias.includes(q)) && DATA[key]) return DATA[key];
  }
  for (const key of Object.keys(DATA)) {
    const k = key.toLowerCase();
    if (k.includes(q) || q.includes(k.split(' ')[0])) return DATA[key];
  }
  return null;
}

export function getBrand(brand: string): BrandCompat | null {
  return DATA[brand] || null;
}
