const STALE_CHUNK_RELOAD_KEY = 'pfs:stale-chunk-reload';

let reloadScheduledForPage: string | null = null;

function errorMessage(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return String(error ?? '');
}

export function isStaleChunkError(error: unknown): boolean {
  const message = errorMessage(error).toLowerCase();
  return [
    'failed to fetch dynamically imported module',
    'error loading dynamically imported module',
    'importing a module script failed',
    'chunkloaderror',
    'loading chunk',
    'failed to load module script',
  ].some((fragment) => message.includes(fragment));
}

function currentPageKey(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function recoverFromStaleChunk(error: unknown): boolean {
  if (!isStaleChunkError(error) || typeof window === 'undefined') return false;

  const pageKey = currentPageKey();
  let previousAttempt: string | null = null;

  try {
    previousAttempt = window.sessionStorage.getItem(STALE_CHUNK_RELOAD_KEY);
  } catch {
    // Session storage can be unavailable in privacy-restricted browsers.
  }

  if (previousAttempt === pageKey || reloadScheduledForPage === pageKey) {
    return false;
  }

  reloadScheduledForPage = pageKey;
  try {
    window.sessionStorage.setItem(STALE_CHUNK_RELOAD_KEY, pageKey);
  } catch {
    // The in-memory guard still prevents a reload loop for this document.
  }

  window.location.reload();
  return true;
}

export function clearStaleChunkRecovery(): void {
  reloadScheduledForPage = null;
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(STALE_CHUNK_RELOAD_KEY);
  } catch {
    // No action is needed when session storage is unavailable.
  }
}

export async function importWithChunkRecovery<T>(
  importer: () => Promise<T>,
): Promise<T> {
  try {
    const importedModule = await importer();
    clearStaleChunkRecovery();
    return importedModule;
  } catch (error) {
    if (recoverFromStaleChunk(error)) {
      // Keep React Suspense mounted while the browser replaces this document.
      return new Promise<T>(() => undefined);
    }
    throw error;
  }
}

export const staleChunkRecoveryStorageKey = STALE_CHUNK_RELOAD_KEY;
