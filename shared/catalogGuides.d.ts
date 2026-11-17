declare module '@shared/catalogGuides.mjs' {
  export type GuideSection = { heading: string; paragraphs: string[] };
  export type GuideFaq = { question: string; answer: string };
  export const CROSSREF_PAGES: Array<{ slug: string; path: string; h1: string; also?: string }>;
  export const GUIDE_PAGES: Array<{ path: string; h1: string }>;
  export function crossRefSections(page: { slug: string; h1: string; also?: string }, products: unknown[]): GuideSection[];
  export function crossRefFaqs(page: { slug: string; also?: string }): GuideFaq[];
  export function sizeChartSections(products: unknown[]): GuideSection[];
  export function sizeChartFaqs(): GuideFaq[];
  export function andreaeSections(products: unknown[]): GuideSection[];
  export function andreaeFaqs(products: unknown[]): GuideFaq[];
  export function measureSections(): GuideSection[];
  export function measureFaqs(): GuideFaq[];
  export function comparisonSections(products: unknown[]): GuideSection[];
  export function comparisonFaqs(): GuideFaq[];
  export function shippingSections(products: unknown[]): GuideSection[];
  export function shippingFaqs(): GuideFaq[];
}
