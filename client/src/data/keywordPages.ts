import pages from '@/data/keywordPages.json';
import type { KeywordFaq, KeywordLink } from '@/components/KeywordGuide';

export type KeywordPage = {
  paragraphs: string[];
  faqs: KeywordFaq[];
  links: KeywordLink[];
};

export type SizingGuide = KeywordPage & {
  rows: string[][];
};

export const shopKeyword = pages.shop satisfies KeywordPage;
export const sprayKeyword = pages.spray satisfies KeywordPage;
export const arrestorKeyword = pages.arrestor satisfies KeywordPage;
export const rollKeyword = pages.roll satisfies KeywordPage;
export const neshapKeyword = pages.neshap satisfies KeywordPage;
export const sizingGuide = pages.sizing satisfies SizingGuide;

export const categoryKeywords: Record<string, KeywordPage> = {
  'fiberglass-arrestors': arrestorKeyword,
  'roll-media': rollKeyword,
};
