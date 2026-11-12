import { Link } from 'wouter';
import { Phone, Search } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Section = { heading: string; paragraphs: string[] };
type Faq = { question: string; answer: string };
type Crumb = { label: string; href?: string };

export function GuideArticle({
  title,
  description,
  canonical,
  h1,
  lede,
  crumbs,
  sections,
  faqs,
  links,
  structuredData,
}: {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  lede: string;
  crumbs: Crumb[];
  sections: Section[];
  faqs: Faq[];
  links: { href: string; label: string }[];
  structuredData?: Record<string, unknown>;
}) {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO title={title} description={description} canonical={canonical} structuredData={structuredData} />
      <Navigation />
      <section className="section-darker px-4 pb-14 pt-28">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={crumbs} />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">{lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/filter-finder">
                <Button className="gap-2 bg-blue-500 text-white hover:bg-blue-400">
                  <Search className="h-4 w-4" /> Find My Filter
                </Button>
              </Link>
              <a href="tel:855-496-7969">
                <Button variant="outline" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" /> 855-496-7969
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section-raised tex-dots px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 leading-relaxed text-white/70">{paragraph}</p>
              ))}
            </section>
          ))}
          {links.length > 0 && (
            <nav aria-label="Related filters">
              <h2 className="text-2xl font-bold">Related pages</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-blue-400 hover:underline">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {faqs.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Questions</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-xl border border-white/10 px-4">
                    <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-white/70">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
