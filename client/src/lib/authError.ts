const NETWORK_ERROR_PATTERNS = [
  'failed to fetch',
  'network request failed',
  'load failed',
];

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;

  const message = error.message.trim();
  if (!message) return fallback;

  const normalized = message.toLowerCase();
  if (NETWORK_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern))) {
    return "We couldn't reach the sign-in service. Please try again in a moment or contact PFS Filters if this continues.";
  }

  return message;
}
