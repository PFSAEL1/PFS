import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const heroSource = readFileSync(new URL('./Hero.tsx', import.meta.url), 'utf8');
const consumablesSource = readFileSync(new URL('../pages/Consumables.tsx', import.meta.url), 'utf8');
const vanguardSource = readFileSync(new URL('../pages/PfsVanguard.tsx', import.meta.url), 'utf8');
const vanguardImage = readFileSync(
  new URL('../../public/images/products/pfs-vanguard-kit-user-2026-09.png', import.meta.url),
);

const VANGUARD_IMAGE = '/images/products/pfs-vanguard-kit-user-2026-09.png';

describe('homepage quote and Vanguard product image', () => {
  it('routes the homepage custom quote control to the contact page', () => {
    expect(heroSource).toMatch(/<Button[\s\S]*?asChild[\s\S]*?<Link href="\/contact">[\s\S]*?Get a Custom Quote/);
    expect(heroSource).not.toContain('scrollToContact');
  });

  it('uses the supplied versioned Vanguard image across the curated product views', () => {
    expect(consumablesSource).toContain(`image: '${VANGUARD_IMAGE}'`);
    expect(vanguardSource).toContain(`const PFS_VANGUARD_IMAGE = '${VANGUARD_IMAGE}'`);
    expect(vanguardSource).toContain('width={1374}');
    expect(vanguardSource).toContain('height={1145}');
  });

  it('keeps the supplied Vanguard asset as a 1374 by 1145 RGBA PNG', () => {
    expect(vanguardImage.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(vanguardImage.readUInt32BE(16)).toBe(1374);
    expect(vanguardImage.readUInt32BE(20)).toBe(1145);
    expect(vanguardImage[25]).toBe(6);
  });
});
