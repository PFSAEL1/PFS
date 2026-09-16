import { describe, expect, it } from 'vitest';
import { removePublicEmail } from './publicContactText';

describe('removePublicEmail', () => {
  it('replaces public ordering email instructions with phone-only copy', () => {
    expect(removePublicEmail(
      'If your size is not listed, email or give us a call. orders@pfsfilters.com 855-496-7969',
    )).toBe('If your size is not listed, give us a call. 855-496-7969');
  });

  it('replaces membership email support wording', () => {
    expect(removePublicEmail('Priority phone & email support')).toBe('Priority phone support');
    expect(removePublicEmail('Priority email support')).toBe('Priority phone support');
  });
});
