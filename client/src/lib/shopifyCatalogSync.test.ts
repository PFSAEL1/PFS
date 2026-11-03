import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import snapshot from '@/data/shopifyProductSnapshot.json';
import { refreshSnapshotImages } from '../../../scripts/sync-shopify-catalog.mjs';

const CPA_HANDLE = '96x50-cpa-polyester-overspray-filter-roll';
const CURRENT_CPA_IMAGE = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cpa-polyester-overspray-filter-roll.jpg?v=1793648755';
const CURRENT_CPA_ALT = '96 in x 50 ft CPA white polyester paint overspray filter roll for spray booths';
const DELETED_CPA_FILE = 'cpa-polyester-overspray-media.jpg';

const liveCpaImages = {
  edges: [{ node: { url: CURRENT_CPA_IMAGE, altText: CURRENT_CPA_ALT } }],
};

describe('Shopify catalog image refresh', () => {
  it('replaces a deleted Shopify CDN file with the current Storefront image', () => {
    const existing = {
      edges: [{
        node: {
          url: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cpa-polyester-overspray-media.jpg?v=1793641507',
          altText: 'old alt',
        },
      }],
    };
    expect(refreshSnapshotImages(existing, liveCpaImages)).toEqual(liveCpaImages);
  });

  it('keeps a snapshot image when only the Shopify cache-buster changed', () => {
    const existing = {
      edges: [{ node: { url: `${CURRENT_CPA_IMAGE.split('?')[0]}?v=1`, altText: CURRENT_CPA_ALT } }],
    };
    expect(refreshSnapshotImages(existing, liveCpaImages)).toBe(existing);
  });

  it('keeps curated local image paths', () => {
    const existing = { edges: [{ node: { url: '/images/products/koch/koch-biomax-hepa-9999-transparent.png', altText: null } }] };
    const live = { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/tMGZRKiGpTZdZLNo.png?v=1790359211', altText: 'Koch' } }] };
    expect(refreshSnapshotImages(existing, live)).toBe(existing);
  });

  it('does not invent an image for a product stored without one', () => {
    const existing = { edges: [] };
    expect(refreshSnapshotImages(existing, liveCpaImages)).toBe(existing);
  });

  it('does not clear a snapshot image when Storefront returns none', () => {
    expect(refreshSnapshotImages(liveCpaImages, { edges: [] })).toBe(liveCpaImages);
  });

  it('stores the current CPA roll image in the committed snapshot', () => {
    const product = snapshot.find((entry) => entry.node.handle === CPA_HANDLE)?.node;
    const image = product?.images.edges[0]?.node;
    expect(image?.url).toBe(CURRENT_CPA_IMAGE);
    expect(image?.altText).toBe(CURRENT_CPA_ALT);
    expect(JSON.stringify(snapshot)).not.toContain(DELETED_CPA_FILE);
    const syncSource = readFileSync(new URL('../../../scripts/sync-shopify-catalog.mjs', import.meta.url), 'utf8');
    expect(syncSource).toContain('refreshSnapshotImages(edge.node.images, live.images)');
  });
});
