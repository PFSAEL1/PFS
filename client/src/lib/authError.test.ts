import { describe, expect, it } from 'vitest';
import { getAuthErrorMessage } from './authError';

describe('getAuthErrorMessage', () => {
  it.each([
    'Failed to fetch',
    'Network request failed',
    'Load failed',
    '  FAILED TO FETCH  ',
  ])('maps %s to a helpful service message', (message) => {
    expect(getAuthErrorMessage(new TypeError(message), 'Sign in failed')).toBe(
      "We couldn't reach the sign-in service. Please try again in a moment or contact PFS Filters if this continues.",
    );
  });

  it('preserves useful authentication errors', () => {
    class AuthApiError extends Error {}

    expect(getAuthErrorMessage(new AuthApiError('Invalid login credentials'), 'Sign in failed')).toBe(
      'Invalid login credentials',
    );
  });

  it('uses the operation fallback for empty errors', () => {
    expect(getAuthErrorMessage(new Error(''), 'Sign in failed')).toBe('Sign in failed');
  });

  it('uses the operation fallback for non-errors', () => {
    expect(getAuthErrorMessage({ message: 'unknown' }, 'Sign in failed')).toBe('Sign in failed');
  });
});
