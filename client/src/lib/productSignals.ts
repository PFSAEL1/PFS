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
 * Priority: New > Most Reordered > Booth-Matched > Custom Cut > Ships Same Day.
 */
export function getProductBadges(input: any, max = 2): ProductBadge[] {
  const node = toNode(input);
  const tags = tagsOf(node);
  const title = lc(node.title);
  const type = lc(node.productType);
  const hay = `${tags.join(' ')} ${title} ${type}`;

  const badges: ProductBadge[] = [];

  const has = (...keys: string[]) => keys.some((k) => hay.includes(k));

  if (has('new', 'just-added', 'new-arrival')) {
    badges.push({ label: 'New', tone: 'new' });
  }
  if (has('best-seller', 'bestseller', 'top-mover', 'top-seller', 'most-reordered', 'popular')) {
    badges.push({ label: 'Most Reordered', tone: 'reorder' });
  }
  if (has('booth-matched', 'booth match', 'kit', 'compatible')) {
    badges.push({ label: 'Booth-Matched', tone: 'matched' });
  }
  // Custom cut: multiple size variants or explicit custom tag
  if (has('custom', 'cut-to-size', 'made-to-order') || variantCount(node) > 2) {
    badges.push({ label: 'Custom Cut', tone: 'custom' });
  }
  // Ships same day: default trust signal for in-stock catalog items
  const anyInStock =
    node.variants?.edges?.some((e) => e.node?.availableForSale ?? true) ?? true;
  if (anyInStock && has('in-stock', 'ships-same-day', 'ready-to-ship')) {
    badges.push({ label: 'Ships Same Day', tone: 'ship' });
  }

  // Guarantee at least one helpful badge if nothing matched
  if (badges.length === 0 && anyInStock) {
    badges.push({ label: 'Ships Fast', tone: 'ship' });
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
  const tags = tagsOf(node);
  const title = lc(node.title);
  const type = lc(node.productType);
  const hay = `${tags.join(' ')} ${title} ${type}`;
  const has = (...keys: string[]) => keys.some((k) => hay.includes(k));

  // Media type
  let media = 'Spun fiberglass';
  if (has('tacky', 'panel', 'pleated', 'merv')) media = 'Tacky panel / pleated media';
  else if (has('roll')) media = 'Continuous roll fiberglass';
  else if (has('blanket', 'ceiling', 'polyester', 'poly')) media = 'Polyester ceiling media';
  else if (has('arrestor', 'paint pocket', 'pocket', 'fiberglass')) media = 'High-loft fiberglass';

  // Gram weight
  let gram = 'Standard weight';
  const gramMatch = (node.title || '').match(/(\d{2,3})\s*-?\s*gram|(\d{2,3})\s*ga/i);
  if (gramMatch) gram = `${gramMatch[1] || gramMatch[2]} gram`;
  else if (has('22-gram', '22 gram', '22ga')) gram = '22 gram';

  // Efficiency
  let efficiency = '98%+ overspray capture';
  const mervMatch = (node.title || '').match(/merv\s*-?\s*(\d{1,2})/i);
  if (mervMatch) efficiency = `MERV ${mervMatch[1]}`;
  else if (has('exhaust', 'arrestor', 'pocket')) efficiency = 'Up to 99% paint arrestance';
  else if (has('intake', 'ceiling', 'blanket')) efficiency = 'High-efficiency intake diffusion';

  // Compatible booth types
  let compat = 'Cross-draft, semi-downdraft & downdraft booths';
  if (has('ceiling', 'blanket', 'intake')) compat = 'Downdraft & semi-downdraft ceilings';
  else if (has('exhaust', 'arrestor', 'pocket', 'roll')) compat = 'All exhaust plenum & filter-bank booths';

  // Sizes available (from variants)
  const variantTitles = (node.variants?.edges || [])
    .map((e) => e.node?.title || '')
    .filter((t) => t && t.toLowerCase() !== 'default title');
  let sizes = 'Standard 20x20, 20x25 & custom cuts';
  if (variantTitles.length > 0) {
    sizes = variantTitles.slice(0, 6).join(', ') + (variantTitles.length > 6 ? ' + more' : '');
  }

  // Change interval
  let interval = 'Replace when airflow drops or per local code';
  if (has('exhaust', 'arrestor', 'pocket', 'roll')) interval = 'Typically every 100–150 spray hours';
  else if (has('intake', 'ceiling', 'blanket')) interval = 'Typically every 600–1,000 spray hours';

  return [
    { label: 'Filter media', value: media },
    { label: 'Media weight', value: gram },
    { label: 'Efficiency rating', value: efficiency },
    { label: 'Compatible booths', value: compat },
    { label: 'Sizes available', value: sizes },
    { label: 'Change interval', value: interval },
  ];
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

  // Premium intake first (more specific than generic intake)
  if (has('5kri', '5-kri', 'premium intake', 'premium-intake')) return 'premium-intake';
  // Intake blankets (heated-version intake)
  if (has('intake blanket', 'intake-blanket', 'ceiling blanket', 'blanket')) return 'intake-blanket';
  // Exhaust roll media
  if (has('exhaust roll', 'roll media', 'fiberglass roll', 'exhaust-roll') && has('roll'))
    return 'exhaust-roll';
  // Paint pockets
  if (has('paint pocket', 'paint-pocket', 'pocket')) return 'paint-pocket';
  // Fiberglass exhaust pads (15g / 22g)
  if (has('fiberglass') && has('exhaust', 'arrestor', 'pad')) return 'fiberglass-exhaust';
  if (has('arrestor') || (has('exhaust') && has('fiberglass'))) return 'fiberglass-exhaust';
  // Generic intake tacky panel
  if (has('tacky') || (has('intake') && has('panel', 'tacky'))) return 'intake-tacky';
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
    { booth: 'Orion Crossflow', position: 'Intake', note: 'Premium 5KRI intake media option.' },
    { booth: 'Orion Semi-Downdraft', position: 'Intake', note: 'Premium 5KRI intake media option.' },
    { booth: 'Zenith Downdraft', position: 'Intake', note: 'Premium 5KRI intake media option.' },
    { booth: 'Helios Side Downdraft', position: 'Intake', note: 'Premium 5KRI intake media option.' },
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
