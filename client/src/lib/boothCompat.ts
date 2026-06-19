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
  const slug = categorySlug(category);
  // Only pass a size param when it looks like a clean panel size (e.g. 20"×20", 20"×25")
  // Roll / case specs are left off so the shop shows the whole category.
  let url = `/shop?category=${encodeURIComponent(slug)}`;
  if (size) {
    const clean = size.replace(/["”]/g, '').replace(/×/g, 'x').trim();
    const panel = clean.match(/^(\d{1,2})\s*x\s*(\d{1,2})(?:\s*x\s*(\d))?$/i);
    if (panel) {
      url += `&size=${encodeURIComponent(`${panel[1]}x${panel[2]}${panel[3] ? 'x' + panel[3] : ''}`)}`;
    }
  }
  return url;
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
