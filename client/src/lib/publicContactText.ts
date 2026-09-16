const PUBLIC_ORDER_EMAIL = /\borders@pfsfilters\.com\b/gi;

export function removePublicEmail(value: string): string {
  return value
    .replace(/\bpriority\s+phone\s*(?:&|and)\s*email\s+support\b/gi, 'Priority phone support')
    .replace(/\bpriority\s+email\s+support\b/gi, 'Priority phone support')
    .replace(/\bemail\s+support\b/gi, 'Phone support')
    .replace(/\bemail\s+or\s+give\s+us\s+a\s+call\.?\s*/gi, 'give us a call. ')
    .replace(/\bemail\s+us\s+or\s+call\b/gi, 'call')
    .replace(PUBLIC_ORDER_EMAIL, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([.!?])\s*([.!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function sanitizeProductContact<T extends { node: { description: string } }>(product: T): T {
  return {
    ...product,
    node: {
      ...product.node,
      description: removePublicEmail(product.node.description || ''),
    },
  } as T;
}
