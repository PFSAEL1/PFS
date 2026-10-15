import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { sizingGuide } from '@/data/keywordPages';

const faqs = sizingGuide.faqs;

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com/' },
  { name: 'How to Size Paint Booth Filters', url: 'https://www.pfsfilters.com/how-to-size-paint-booth-filters' },
]);

const rows = sizingGuide.rows;

export default function FilterSizingGuide() {
  return (
    <div className="page-shell">
      <SEO
        title="How to Size Paint Booth Filters"
        description="Measure the paint booth filter opening: pad width, height, and depth, or roll width and length. Match 20×20 pads, 20×100 and 36×100 rolls, and ceiling media before you order."
        canonical="https://www.pfsfilters.com/how-to-size-paint-booth-filters"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbSchema, createFAQSchema(faqs)],
        }}
      />
      <Navigation />
      <article className="section-darker px-4 pb-16 pt-28">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb items={[{ label: 'How to Size Paint Booth Filters' }]} />
          <p className="hero-kicker">Sizing</p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            How to Size Paint Booth Filters
          </h1>
          <div className="keyword-guide-copy">
            {sizingGuide.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>
                {paragraph.includes('Filter Finder') ? (
                  <>
                    {paragraph.replace(' The Filter Finder narrows brand and stage. It does not replace the tape measure.', '')}{' '}
                    The <Link href="/filter-finder">Filter Finder</Link> narrows brand and stage. It does not replace the tape measure.
                  </>
                ) : paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="sizing-table">
              <caption>What to measure for each paint booth filter stage</caption>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Where to measure</th>
                  <th>Record</th>
                  <th>Catalog example</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="keyword-guide-links">
            {sizingGuide.links.map((link) => (
              <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>

          <h2 className="mb-4 mt-12 text-2xl font-semibold">Questions</h2>
          <div className="keyword-faqs">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
