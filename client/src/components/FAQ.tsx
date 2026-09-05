import { Link } from 'wouter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, HelpCircle } from 'lucide-react';
import faqData from '@/data/faqData.json';
import { createFAQSchema } from '@/lib/structuredData';

const featuredQuestions = [
  'How do I find the correct paint booth filter for my booth?',
  'How often should paint booth filters be changed?',
  'Do you carry common paint booth filter sizes?',
  'What is the difference between intake and exhaust paint booth filters?',
  'How quickly do paint booth filter orders ship?',
  'Can PFS Filters help with a custom or hard-to-find size?',
];

const faqs = faqData.filter((item) => featuredQuestions.includes(item.question));
const faqSchema = createFAQSchema(faqs);

export const FAQ = () => {
  return (
    <section className="section-glow tex-dots py-20 px-4 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-primary/20 mb-4">
            <HelpCircle className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-white/70 text-lg">
            Straight answers about selecting and replacing spray booth filters
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={`item-${i}`}
              className="bg-[#0d0d0d] border border-white/10 rounded-lg px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/70 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-7 text-center">
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
            Browse the complete filter FAQ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
