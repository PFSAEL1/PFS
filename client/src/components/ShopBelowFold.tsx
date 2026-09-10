import { Link } from 'wouter';
import { ArrowRight, Package } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import faqData from '@/data/faqData.json';

const shopFaqs = faqData.filter((item) => [
  'How do I find the correct paint booth filter for my booth?',
  'What is the difference between intake and exhaust paint booth filters?',
  'Do you carry common paint booth filter sizes?',
  'Can PFS Filters help with a custom or hard-to-find size?',
  'How quickly do paint booth filter orders ship?',
  'How does Subscribe and Save work?',
].includes(item.question));

export const ShopBelowFold = () => (
  <>
    {/* SEO content block - glow section */}
    <section className="section-glow py-16 px-4">
      <div className="max-w-4xl mx-auto glow-card p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="glow-icon">
            <Package className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Paint Booth Filter Types and Sizes</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
        </div>
        <div className="space-y-4 text-white/50 leading-relaxed">
          <p>
            Browse current <strong className="text-foreground">paint booth filters</strong>, including <strong className="text-foreground">fiberglass paint arrestors</strong>, <strong className="text-foreground">tacky panel filters</strong>, <strong className="text-foreground">ceiling blankets</strong>, <strong className="text-foreground">roll media</strong>, and <strong className="text-foreground">filter accessories</strong>. Product pages show the available catalog variants, current price, and availability.
          </p>
          <p>
            Common catalog options include <strong className="text-foreground">20x20 paint booth filters</strong>, <strong className="text-foreground">20x25 filters</strong>, and multi-size product families. For a custom or hard-to-find item, send the booth model, filter position, exact dimensions, and a clear photo so the PFS team can review the request.
          </p>
        </div>
      </div>
    </section>

    <section className="section-raised px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">Buyer guidance</p>
            <h2 className="mt-2 text-3xl font-bold">Before You Order a Paint Booth Filter</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/60">
              Confirm the booth, filter position, and exact dimensions. These answers cover the questions our team hears most often.
            </p>
          </div>
          <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
            View all filter questions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {shopFaqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`shop-faq-${index}`} className="rounded-xl border border-white/10 bg-[#0d0d0d] px-5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-white/70">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    <Footer />
  </>
);
