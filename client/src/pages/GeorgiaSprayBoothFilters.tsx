import { Link } from 'wouter';
import { ArrowRight, Info, MapPin, Phone } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { georgiaFaqs, georgiaSections } from '@shared/guideCopy.mjs';

const canonical = 'https://www.pfsfilters.com/georgia/spray-booth-filters';
const title = 'Georgia Spray Booth Filter Shipping | PFS';
const description = 'PFS Filters ships spray booth filters to Georgia from 1400 Airport Blvd, Santa Rosa, CA 95403. Same U.S. catalog. No Georgia storefront. Call 855-496-7969.';

export default function GeorgiaSprayBoothFilters() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.pfsfilters.com/' },
        { name: 'Spray Booth Filters', url: 'https://www.pfsfilters.com/spray-booth-filters' },
        { name: 'Georgia', url: canonical },
      ]),
      createFAQSchema(georgiaFaqs),
      {
        '@type': 'Service',
        name: 'Spray booth filter shipping to Georgia',
        serviceType: 'Online filter orders shipped within the United States',
        url: canonical,
        areaServed: { '@type': 'State', name: 'Georgia' },
        provider: {
          '@type': 'Organization',
          name: 'PFS Filters',
          telephone: '+1-855-496-7969',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1400 Airport Blvd',
            addressLocality: 'Santa Rosa',
            addressRegion: 'CA',
            postalCode: '95403',
            addressCountry: 'US',
          },
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO title={title} description={description} canonical={canonical} structuredData={structuredData} />
      <Navigation />
      <main>
        <section className="section-darker px-4 pb-16 pt-28">
          <div className="mx-auto max-w-6xl">
            <Breadcrumb items={[{ label: 'Spray Booth Filters', href: '/spray-booth-filters' }, { label: 'Georgia' }]} />
            <div className="mt-5 max-w-4xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                <MapPin className="h-3.5 w-3.5" /> Ships from Santa Rosa
              </span>
              <h1 className="pfs-heading-animate mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">Spray Booth Filters for Georgia Shops</h1>
              <p className="pfs-sub-animate max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">PFS Filters is in Santa Rosa, California, and ships the same catalog to Georgia. There is no Georgia storefront and no compliance title on this page.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/spray-booth-filters"><Button className="gap-2 bg-blue-700 px-7 py-6 text-white hover:bg-blue-600">Spray booth filter guide <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/contact"><Button variant="outline" className="gap-2 border-white/20 px-7 py-6 text-white hover:bg-white/5"><Phone className="h-4 w-4" /> Request help</Button></Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section-raised tex-dots px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            {georgiaSections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-3xl font-bold">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)} className="mb-4 leading-relaxed text-white/60">{paragraph}</p>)}
              </section>
            ))}
          </div>
        </section>
        <section className="section-raised tex-lines px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="flex gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.055] p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                <p className="text-sm leading-relaxed text-white/65">This page does not call any filter compliant with a Georgia rule. Match the booth stage and the measured size, then order the catalog product. Permits stay with the facility.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.07] p-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Santa Rosa, California</p>
              <h2 className="mb-3 text-2xl font-bold">Orders ship from the same address</h2>
              <p className="mb-5 text-sm leading-relaxed text-white/60">PFS Filters operates from 1400 Airport Blvd, Santa Rosa, CA 95403. Call 855-496-7969 for an unlisted size or a freight question.</p>
              <a href="tel:+18554967969"><Button className="w-full bg-blue-700 text-white hover:bg-blue-600">Call 855-496-7969</Button></a>
            </div>
          </div>
        </section>
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl space-y-4">
            <h2 className="mb-8 text-3xl font-bold">Ordering from Georgia</h2>
            {georgiaFaqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-white/60">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
