import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How often should I change my spray booth filters?',
    answer: 'Most exhaust filters (paint arrestors) should be changed when airflow noticeably decreases or paint begins to bleed through — typically every 1–4 weeks depending on volume. Intake and ceiling filters last 3–6 months. We offer scheduled reorder reminders so you never run out.',
  },
  {
    question: 'What size paint booth filters do you carry?',
    answer: 'We stock standard sizes like 20x20, 20x25, 24x24, and many more. We also offer custom-cut filters to fit any booth. Visit our Shop by Size page or contact us for a perfect fit.',
  },
  {
    question: 'Do you offer bulk or wholesale pricing?',
    answer: 'Yes! We offer volume discounts for shops that order regularly. Contact us for a custom quote — most multi-booth shops save 15–25% with bulk orders.',
  },
  {
    question: "What's the difference between fiberglass and tacky panel filters?",
    answer: 'Fiberglass paint arrestors are economical exhaust filters that capture overspray with progressive-density media. Tacky panel filters use an adhesive coating for superior particle capture on the intake side, keeping your booth air cleaner for a better finish.',
  },
  {
    question: 'How fast do you ship filters?',
    answer: 'Most orders ship within 1–2 business days. We offer nationwide shipping with typical delivery in 3–5 business days. Need it faster? Contact us for expedited options.',
  },
  {
    question: 'Can you match filters from my current supplier?',
    answer: "Absolutely. Tell us your booth make/model and current filter dimensions, and we'll match or recommend the best replacement. Most customers find our filters perform as well or better at a lower price.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export const FAQ = () => {
  return (
    <section className="py-20 px-4 bg-[#0d0d0d]/5/30 relative">
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
            Everything you need to know about our spray booth filters
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
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
      </div>
    </section>
  );
};
