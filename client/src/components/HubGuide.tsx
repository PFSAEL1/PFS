import { useState } from 'react';
import { Link } from 'wouter';
import { hubArticles, type HubFaq } from '@/data/hubArticles';
import { createFAQSchema } from '@/lib/structuredData';

export function hubFaqSchema(id: string) {
  const article = hubArticles[id];
  if (!article) return null;
  return createFAQSchema(article.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })));
}

function FaqList({ faqs }: { faqs: HubFaq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-10 space-y-3">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Questions about this filter guide</h2>
      {faqs.map((faq, index) => (
        <div key={faq.question} className="bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(open === index ? null : index)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
          >
            <h3 className="text-base font-semibold text-white pr-4">{faq.question}</h3>
            <span className="text-white/40" aria-hidden="true">{open === index ? '−' : '+'}</span>
          </button>
          {open === index && (
            <div className="px-6 pb-4 text-white/60 leading-relaxed">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function HubGuide({ id, showFaq = true }: { id: string; showFaq?: boolean }) {
  const article = hubArticles[id];
  if (!article) return null;
  const schema = showFaq ? hubFaqSchema(id) : null;
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">{article.heading}</h2>
        <div className="space-y-4 text-white/60 leading-relaxed">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p>
            Related pages:{' '}
            <Link href="/exhaust-filters" className="text-blue-400 hover:text-blue-300">exhaust filters</Link>,{' '}
            <Link href="/intake-filters" className="text-blue-400 hover:text-blue-300">intake filters</Link>,{' '}
            <Link href="/ceiling-filters" className="text-blue-400 hover:text-blue-300">ceiling filters</Link>,{' '}
            <Link href="/andreae-paint-booth-filters" className="text-blue-400 hover:text-blue-300">Andreae filters</Link>,{' '}
            <Link href="/neshap-compliant-paint-booth-filters" className="text-blue-400 hover:text-blue-300">NESHAP guide</Link>,{' '}
            <Link href="/filter-part-numbers" className="text-blue-400 hover:text-blue-300">part numbers</Link>,{' '}
            <Link href="/filter-rotation-program" className="text-blue-400 hover:text-blue-300">filter rotation</Link>,{' '}
            <Link href="/blog/booth-filter-replacement-intervals" className="text-blue-400 hover:text-blue-300">replacement intervals</Link>,{' '}
            <Link href="/blog/booth-filter-maintenance-checklist" className="text-blue-400 hover:text-blue-300">maintenance checklist</Link>.
          </p>
        </div>
        {showFaq && <FaqList faqs={article.faqs} />}
        {schema && (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        )}
      </div>
    </section>
  );
}
