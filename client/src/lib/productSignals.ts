// productSignals.ts — derive Dyson-style badges and a technical spec table
// from real Shopify product attributes (tags, productType, title, variants).
// No fabricated data: everything is inferred from what the product actually has,
// with conservative, accurate defaults for a filtration catalog.

export type ProductBadge = {
  label: string;
  tone: 'reorder' | 'ship' | 'matched' | 'new' | 'custom';
};

type AnyProductNode = {
  title?: string;
  productType?: string;
  tags?: string[];
  variants?: { edges?: Array<{ node?: { title?: string; availableForSale?: boolean } }> };
  description?: string;
};

// Accept either a raw node or an edge ({ node })
function toNode(input: any): AnyProductNode {
  if (input && input.node) return input.node as AnyProductNode;
  return (input || {}) as AnyProductNode;
}

function lc(s?: string) {
  return (s || '').toLowerCase();
}

function tagsOf(node: AnyProductNode): string[] {
  return (node.tags || []).map((t) => lc(t));
}

function variantCount(node: AnyProductNode): number {
  return node.variants?.edges?.length || 0;
}

/**
 * Returns up to `max` badges for a product, highest priority first.
 * Priority: New > Most Reordered > Booth-Matched > Custom Cut.
 */
export function getProductBadges(input: any, max = 2): ProductBadge[] {
  const node = toNode(input);
  const tags = tagsOf(node);
  const badges: ProductBadge[] = [];

  const hasTag = (...keys: string[]) => keys.some((key) => tags.some((tag) => tag.includes(key)));

  if (hasTag('new', 'just-added', 'new-arrival')) {
    badges.push({ label: 'New', tone: 'new' });
  }
  if (hasTag('best-seller', 'bestseller', 'top-mover', 'top-seller', 'most-reordered', 'popular')) {
    badges.push({ label: 'Most Reordered', tone: 'reorder' });
  }
  if (hasTag('booth-matched', 'booth match')) {
    badges.push({ label: 'Booth-Matched', tone: 'matched' });
  }
  // Custom cut: multiple size variants or explicit custom tag
  if (hasTag('custom', 'cut-to-size', 'made-to-order') || variantCount(node) > 2) {
    badges.push({ label: 'View Sizes', tone: 'custom' });
  }
  return badges.slice(0, max);
}

export type SpecRow = { label: string; value: string };

/**
 * Build a technical spec table from product attributes. Values are inferred
 * from tags/title/type with accurate filtration defaults; size list comes from
 * real variant titles when available.
 */
export function getProductSpecs(input: any): SpecRow[] {
  const node = toNode(input);
  const variantTitles = (node.variants?.edges || [])
    .map((e) => e.node?.title || '')
    .filter((t) => t && t.toLowerCase() !== 'default title');
  const specs: SpecRow[] = [];
  if (node.productType?.trim()) specs.push({ label: 'Product type', value: node.productType.trim() });
  if (variantTitles.length > 0) {
    specs.push({
      label: 'Catalog options',
      value: variantTitles.slice(0, 8).join(', ') + (variantTitles.length > 8 ? ' + more' : ''),
    });
  }
  const variantEdges = node.variants?.edges || [];
  if (variantEdges.length > 0) {
    specs.push({
      label: 'Current catalog status',
      value: variantEdges.some((edge) => edge.node?.availableForSale === true) ? 'Available to order' : 'Currently unavailable',
    });
  }

  return specs;
}

// ---------------------------------------------------------------------------
// PFS Booth Compatibility
// Maps a filter product to the PFS-branded booths it's used in, and the role
// it plays (intake / premium intake / heated intake / exhaust). Sourced from
// PFS booth filter-compatibility notes (Orion Crossflow, Orion Semi-Downdraft,
// Zenith Downdraft, Helios Side Downdraft).
// ---------------------------------------------------------------------------

export type BoothCompatRole = {
  booth: string; // e.g. "Orion Crossflow"
  position: 'Intake' | 'Exhaust';
  note: string; // human-readable usage note
};

// Detect the "filter role" of a product from its title/tags/type.
type FilterRole =
  | 'intake-tacky'
  | 'premium-intake' // 5KRI premium intake
  | 'intake-blanket' // heated-version intake blankets
  | 'fiberglass-exhaust' // 15g / 22g exhaust pads
  | 'paint-pocket' // paint pockets 20x20
  | 'exhaust-roll' // exhaust roll media (Zenith)
  | null;

function detectFilterRole(input: any): FilterRole {
  const node = toNode(input);
  const tags = tagsOf(node);
  const title = lc(node.title);
  const type = lc(node.productType);
  const hay = `${tags.join(' ')} ${title} ${type}`;
  const has = (...keys: string[]) => keys.some((k) => hay.includes(k));

  // --- Exclusions: hardware/accessories are not filters ---
  // Holding grids, frames, tips, clips, etc. mount filters but aren't a filter
  // media themselves, so they should not show a booth-compatibility section.
  if (has('holding grid', 'holding-grids', 'holding grids', 'grid', 'frame', 'clip', 'accessor'))
    return null;

  // --- Premium intake (most specific) ---
  // Catch both 5KRI (letter i) and 5KR1 (digit one) variants.
  if (has('5kri', '5kr1', '5-kri', '5-kr1', '5 kr', 'premium intake', 'premium-intake'))
    return 'premium-intake';

  // --- Intake bag / pocket BAG filters are INTAKE, not exhaust paint-pockets ---
  // "Pocket bag filter" + MERV / intake / aerospace NESHAP are pre-filter intake
  // bag filters used on the air-supply side, distinct from exhaust paint pockets.
  if (has('bag filter', 'pocket bag', 'bag', 'neshap')) return 'premium-intake';

  // --- Ceiling diffusion media / intake blankets (heated-version intake) ---
  if (has('ceiling diffusion', 'diffusion media', 'ceiling media', 'intake blanket',
          'intake-blanket', 'ceiling blanket', 'blanket', 'swiss flow', 'downdraft ceiling'))
    return 'intake-blanket';

  // --- Exhaust roll media ---
  if (has('roll') && has('arrestor', 'fiberglass', 'exhaust', 'roll media', 'roll-media'))
    return 'exhaust-roll';

  // --- Paint pockets (exhaust) ---
  if (has('paint pocket', 'paint-pocket', 'paint pockets')) return 'paint-pocket';

  // --- Fiberglass exhaust pads / arrestors (15g / 22g / accordion) ---
  if (has('fiberglass') && has('exhaust', 'arrestor', 'pad')) return 'fiberglass-exhaust';
  if (has('accordion') && has('arrestor')) return 'fiberglass-exhaust';
  if (has('arrestor') || (has('exhaust') && has('fiberglass'))) return 'fiberglass-exhaust';

  // --- Pleated / tacky intake panels ---
  if (has('tacky', 'pleated', 'merv')) return 'intake-tacky';
  if (has('intake') && has('panel', 'tacky', 'filter')) return 'intake-tacky';
  if (has('intake')) return 'intake-tacky';
  return null;
}

// Booth roles per filter role, encoding the PFS compatibility notes.
const ROLE_TO_BOOTHS: Record<Exclude<FilterRole, null>, BoothCompatRole[]> = {
  'intake-tacky': [
    { booth: 'Orion Crossflow', position: 'Intake', note: 'Standard 20×20 intake tacky filter.' },
    { booth: 'Orion Semi-Downdraft', position: 'Intake', note: 'Standard (non-heated) 20×20 intake tacky filter.' },
    { booth: 'Zenith Downdraft', position: 'Intake', note: '20×20 intake tacky filter (heated & non-heated).' },
    { booth: 'Helios Side Downdraft', position: 'Intake', note: '20×20 intake tacky filter.' },
  ],
  'premium-intake': [
    { booth: 'Orion Crossflow', position: 'Intake', note: 'Premium intake / pre-filter media option (5KR1 panel or pocket-bag).' },
    { booth: 'Orion Semi-Downdraft', position: 'Intake', note: 'Premium intake / pre-filter media option (5KR1 panel or pocket-bag).' },
    { booth: 'Zenith Downdraft', position: 'Intake', note: 'Premium intake / pre-filter media option (5KR1 panel or pocket-bag).' },
    { booth: 'Helios Side Downdraft', position: 'Intake', note: 'Premium intake / pre-filter media option (5KR1 panel or pocket-bag).' },
  ],
  'intake-blanket': [
    { booth: 'Orion Semi-Downdraft', position: 'Intake', note: 'Heated-version intake blanket (or 20×20 intake).' },
    { booth: 'Zenith Downdraft', position: 'Intake', note: 'Heated-version alternate intake filter.' },
    { booth: 'Helios Side Downdraft', position: 'Intake', note: 'Heated-version intake blanket (alternate to 20×20 intake).' },
  ],
  'fiberglass-exhaust': [
    { booth: 'Orion Crossflow', position: 'Exhaust', note: '20×20 fiberglass exhaust filter — 15g or 22g.' },
    { booth: 'Orion Semi-Downdraft', position: 'Exhaust', note: '20×20 fiberglass exhaust filter — 15g or 22g.' },
    { booth: 'Helios Side Downdraft', position: 'Exhaust', note: '20×20 fiberglass exhaust filter — 15g or 22g.' },
  ],
  'paint-pocket': [
    { booth: 'Orion Crossflow', position: 'Exhaust', note: '20×20 paint pocket exhaust option.' },
    { booth: 'Orion Semi-Downdraft', position: 'Exhaust', note: '20×20 paint pocket exhaust option.' },
    { booth: 'Helios Side Downdraft', position: 'Exhaust', note: '20×20 paint pocket exhaust option.' },
  ],
  'exhaust-roll': [
    { booth: 'Zenith Downdraft', position: 'Exhaust', note: 'Exhaust roll media — 22g or 15g as needed.' },
  ],
};

/**
 * Returns the PFS booths a product is compatible with, or [] if the product
 * isn't a recognized PFS-booth filter type.
 */
export function getPfsBoothCompatibility(input: any): BoothCompatRole[] {
  const role = detectFilterRole(input);
  if (!role) return [];
  return ROLE_TO_BOOTHS[role] || [];
}
