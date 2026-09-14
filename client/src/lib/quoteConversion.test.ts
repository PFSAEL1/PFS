import { describe, expect, it } from 'vitest';
import { consumeQuoteReturn, prepareQuoteReturn } from './quoteConversion';

function storage() {
  const data = new Map<string, string>();
  return { getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value); },
    removeItem: (key: string) => { data.delete(key); } };
}
const id = '12345678-1234-4321-8765-123456789012';
describe('quote conversion return guard', () => {
  it('ignores ordinary thank-you visits and returns without a matching submission', () => {
    const s = storage();
    expect(consumeQuoteReturn(s, 'https://www.pfsfilters.com/thank-you')).toBeNull();
    expect(consumeQuoteReturn(s, `https://www.pfsfilters.com/thank-you?submission=${id}`)).toBeNull();
  });
  it('counts a matching return once, not again on refresh', () => {
    const s = storage(); const url = prepareQuoteReturn(s, id, 1000);
    expect(consumeQuoteReturn(s, url, 2000)).toBe(id);
    expect(consumeQuoteReturn(s, url, 3000)).toBeNull();
  });
  it('rejects mismatched references, wrong routes and expired submissions', () => {
    const s = storage(); const url = prepareQuoteReturn(s, id, 1000);
    expect(consumeQuoteReturn(s, url.replace(id, 'other-reference-123'), 2000)).toBeNull();
    expect(consumeQuoteReturn(s, url.replace('/thank-you', '/contact'), 2000)).toBeNull();
    expect(consumeQuoteReturn(s, url, 31 * 60 * 1000)).toBeNull();
  });
  it('does not treat corrupt storage as a lead', () => {
    const s = storage(); s.setItem('pfs.pendingQuoteSubmission', '{bad');
    expect(consumeQuoteReturn(s, `https://www.pfsfilters.com/thank-you?submission=${id}`)).toBeNull();
  });
});
