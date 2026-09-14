type VariantProduct = {
  variants?: { edges?: Array<{ node: { id: string } }> };
} | null | undefined;

/** Accept Shopify numeric IDs in shareable URLs and full IDs from older links. */
export function resolveProductVariantId(product: VariantProduct, requested: string | null) {
  const variants = product?.variants?.edges ?? [];
  const match = requested && variants.find(({ node }) => (
    node.id === requested || node.id.split('/').pop() === requested
  ));
  return (match ? match.node.id : variants[0]?.node.id) ?? null;
}

export function productVariantSearch(search: string, variantId: string) {
  const params = new URLSearchParams(search);
  params.set('variant', variantId.split('/').pop() || variantId);
  return `?${params.toString()}`;
}
