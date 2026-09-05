import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clearStaleChunkRecovery,
  isStaleChunkError,
  recoverFromStaleChunk,
  staleChunkRecoveryStorageKey,
} from './chunkRecovery';

function createStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
}

afterEach(() => {
  clearStaleChunkRecovery();
  vi.unstubAllGlobals();
});

describe('stale chunk recovery', () => {
  it('recognizes Vite and browser dynamic-import failures without matching ordinary errors', () => {
    expect(
      isStaleChunkError(
        new TypeError(
          'Failed to fetch dynamically imported module: https://www.pfsfilters.com/assets/Consumables-old.js',
        ),
      ),
    ).toBe(true);
    expect(isStaleChunkError(new Error('ChunkLoadError: Loading chunk 42 failed'))).toBe(true);
    expect(isStaleChunkError(new Error('A product request failed'))).toBe(false);
  });

  it('reloads once for the current page and blocks a reload loop', () => {
    const reload = vi.fn();
    const sessionStorage = createStorage();
    vi.stubGlobal('window', {
      location: {
        pathname: '/consumables',
        search: '?view=all',
        hash: '',
        reload,
      },
      sessionStorage,
    });

    const error = new TypeError(
      'Failed to fetch dynamically imported module: /assets/Consumables-old.js',
    );

    expect(recoverFromStaleChunk(error)).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(staleChunkRecoveryStorageKey)).toBe(
      '/consumables?view=all',
    );

    expect(recoverFromStaleChunk(error)).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
