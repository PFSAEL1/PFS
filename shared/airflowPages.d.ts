declare module '@shared/airflowPages.mjs' {
  export const NATIONAL_LINE: string;
  export function filterFinderCrawlerSections(): Array<{
    heading: string;
    paragraphs: string[];
  }>;
  export function airflowPages(): Array<{
    path: string;
    title: string;
    h1: string;
    description: string;
    lede: string;
    faqs: { question: string; answer: string }[];
    sections: { heading: string; paragraphs: string[] }[];
  }>;
}
