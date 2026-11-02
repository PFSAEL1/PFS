declare module '@shared/boothFilterGuides.mjs' {
  export type BoothFilterRow = {
    model: string;
    position: string;
    filterType: string;
    size: string;
    qty: string;
  };

  export type BoothFaq = {
    question: string;
    answer: string;
  };

  export type BoothGuide = {
    slug: string;
    name: string;
    intro: string;
    rows: BoothFilterRow[];
    faqs: BoothFaq[];
    metaDescription: string;
  };

  export function getBoothGuide(slug: string): BoothGuide | null;
  export function listBoothGuides(): BoothGuide[];
}
