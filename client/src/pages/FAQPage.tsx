import { Link } from 'wouter';
import { HelpCircle, Mail, Phone, Search, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import faqData from '@/data/faqData.json';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com/' },
  { name: 'Paint Booth Filter FAQ', url: 'https://www.pfsfilters.com/faq' },
]);

const faqSchema = createFAQSchema(faqData);
const groupedFaqs = Object.entries(
  faqData.reduce<Record<string, typeof faqData>>((groups, item) => {
    (groups[item.category] ||= []).push(item);
    return groups;
  }, {}),
);

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Paint Booth Filter FAQ: Sizes, Types, Replacement & Shipping"
        description="Straight answers from PFS Filters about spray booth filter types, sizing, replacement schedules, shipping, subscriptions, returns, and aerospace filtration."
        canonical="https://www.pfsfilters.com/faq"
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, faqSchema] }}
      />
      <Navigation />

      <section className="section-darker px-4 pb-14 pt-28">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={[{ label: 'Paint Booth Filter FAQ' }]} />
          <div className="mt-8 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-400">
              <ShieldCheck className="h-4 w-4" />
              Answers from paint booth specialists
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Paint Booth Filter Questions, Answered
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              Practical guidance for selecting, replacing, ordering, and maintaining spray booth filters. If your booth or application is unusual, our team can review the details with you before you buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/filter-finder">
                <Button className="gap-2 bg-blue-500 text-white hover:bg-blue-400">
                  <Search className="h-4 w-4" /> Find My Filter
                </Button>
              </Link>
              <a href="mailto:orders@pfsfilters.com">
                <Button variant="outline" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10">
                  <Mail className="h-4 w-4" /> Ask an Expert
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      <section className="section-raised tex-dots px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          {groupedFaqs.map(([category, questions]) => (
            <section key={category} aria-labelledby={`faq-${category.replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
                  <HelpCircle className="h-5 w-5 text-blue-400" />
                </div>
                <h2 id={`faq-${category.replace(/\s+/g, '-').toLowerCase()}`} className="text-2xl font-bold">
                  {category}
                </h2>
              </div>
              <Accordion type="single" collapsible className="space-y-3">
                {questions.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`${category}-${index}`}
                    className="rounded-xl border border-white/10 bg-[#0d0d0d] px-5"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-4xl text-base leading-relaxed text-white/70">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />

      <section className="section-glow px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Still need help matching a filter?</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-white/60">
            Send the booth make and model, filter position, dimensions, and a clear photo. We will help identify the closest available option or review a custom-size request.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="tel:855-496-7969">
              <Button className="gap-2 bg-blue-500 text-white hover:bg-blue-400">
                <Phone className="h-4 w-4" /> 855-496-7969
              </Button>
            </a>
            <a href="mailto:orders@pfsfilters.com">
              <Button variant="outline" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10">
                <Mail className="h-4 w-4" /> orders@pfsfilters.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
