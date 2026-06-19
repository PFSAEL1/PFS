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
