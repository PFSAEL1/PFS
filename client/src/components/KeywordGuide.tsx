import { Link } from 'wouter';
import { createFAQSchema } from '@/lib/structuredData';

export type KeywordFaq = { question: string; answer: string };
export type KeywordLink = { href: string; label: string };

export function KeywordGuide({
  paragraphs,
  faqs,
  links,
}: {
  paragraphs: string[];
  faqs: KeywordFaq[];
  links: KeywordLink[];
}) {
  return (
    <div className="keyword-guide">
      <div className="keyword-guide-copy">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      {links.length > 0 ? (
        <ul className="keyword-guide-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      ) : null}
      <h2>Questions</h2>
      <div className="keyword-faqs">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function faqGraph(faqs: KeywordFaq[]) {
  return createFAQSchema(faqs);
}
