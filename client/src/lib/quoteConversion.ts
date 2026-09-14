const KEY = 'pfs.pendingQuoteSubmission';
const MAX_AGE_MS = 30 * 60 * 1000;
export const QUOTE_CONVERSION_DESTINATION = 'AW-18447673060/gTAlCK2EzfccEOTNxNxE';
type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

// A validated submission gets a random, non-personal reference. Zoho must return
// that reference to this browser before we count the submission as a conversion.
export function prepareQuoteReturn(storage: StorageLike, id: string, now = Date.now()) {
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(id)) throw new Error('Invalid submission reference');
  storage.setItem(KEY, JSON.stringify({ id, createdAt: now }));
  return `https://www.pfsfilters.com/thank-you?submission=${encodeURIComponent(id)}`;
}

export function consumeQuoteReturn(storage: StorageLike, href: string, now = Date.now()): string | null {
  const url = new URL(href);
  if (url.pathname !== '/thank-you') return null;
  const id = url.searchParams.get('submission');
  if (!id) return null;
  try {
    const pending = JSON.parse(storage.getItem(KEY) || 'null');
    if (!pending || pending.id !== id || typeof pending.createdAt !== 'number') return null;
    storage.removeItem(KEY);
    const age = now - pending.createdAt;
    return age >= 0 && age <= MAX_AGE_MS ? id : null;
  } catch {
    return null;
  }
}
