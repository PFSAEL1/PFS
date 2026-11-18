declare module '@shared/industryPages.mjs' {
  export type IndustrySection = { heading: string; paragraphs: string[] };
  export type IndustryFaq = { question: string; answer: string };
  export type IndustryPage = {
    path: string;
    h1: string;
    title: string;
    description: string;
    faqs: IndustryFaq[];
    sections: IndustrySection[];
  };
  export function industryPages(products: unknown[]): IndustryPage[];
}
