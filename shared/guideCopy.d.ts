declare module '@shared/guideCopy.mjs' {
  export type GuideSection = { heading: string; paragraphs: string[] };
  export type GuideFaq = { question: string; answer: string };

  export const sprayBoothFaqs: GuideFaq[];
  export const sprayBoothSections: GuideSection[];
  export const georgiaFaqs: GuideFaq[];
  export const georgiaSections: GuideSection[];
  export function sprayBoothWordCount(): number;
  export function georgiaWordCount(): number;
}
