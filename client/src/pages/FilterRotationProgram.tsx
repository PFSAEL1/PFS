import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ContactForm } from '@/components/ContactForm';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { filterRotationFaqs } from '@shared/seoText.mjs';
import { Phone, RefreshCw } from 'lucide-react';

const SITE = 'https://www.pfsfilters.com';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: `${SITE}/` },
  { name: 'PFS Filter Rotation Program', url: `${SITE}/filter-rotation-program` },
]);

const faqSchema = createFAQSchema(filterRotationFaqs);

const steps = [
  {
    step: '01',
    title: 'We review the booth',
    body: 'The starting point is the booth model, each filter stage, the coatings you run, and how many hours the booth actually sprays. That review picks the media and shows which stage loads first.',
  },
  {
    step: '02',
    title: 'We set the cadence',
    body: 'The replacement rhythm follows your spray load. A heavy primer week is not treated the same as a light color week, and exhaust is not put on the same clock as intake.',
  },
  {
    step: '03',
    title: 'Media ships ahead of the change',
    body: 'Replacement filters leave on that cadence, so the shop is not placing a rush order after the bank is already packed. You still confirm the media before the first shipment.',
  },
  {
    step: '04',
    title: 'The change can ride with service',
    body: 'When a preventive maintenance visit is already on the calendar, the filter swap can be scheduled with it. Production staff are not left to pull a loaded bank in the middle of a job.',
  },
];

const benefits = [
  {
    title: 'Airflow stays closer to the booth design',
    body: 'Changing media before it is solid keeps face velocity from sagging in the middle of a production week.',
  },
  {
    title: 'One schedule for every stage',
    body: 'Intake, ceiling, and exhaust can sit on one list, including shops that run more than one booth or more than one site.',
  },
  {
    title: 'A quote instead of a guessed discount',
    body: 'Volume is priced from the filters you use. This page does not publish a rate, a kit price, or a part number.',
  },
  {
    title: 'Fewer mid-week scrambles',
    body: 'The gauge still decides an early change. The program is there so a normal cycle is not a last-minute order.',
  },
];

export default function FilterRotationProgram() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="PFS Filter Rotation Program | PFS Filters"
        description="The PFS Filter Rotation Program sets a booth filter cadence from your spray load and ships media on that schedule. Request a quote to enroll a shop or fleet."
        canonical="https://www.pfsfilters.com/filter-rotation-program"
        structuredData={{ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, faqSchema] }}
      />
      <Navigation />

      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'PFS Filter Rotation Program' }]} />
          <div className="max-w-3xl mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
              <RefreshCw className="h-3 w-3" /> Scheduled supply
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              PFS Filter Rotation Program
            </h1>
            <p className="text-lg text-white/60 max-w-2xl pfs-sub-animate">
              A scheduled way to keep booth filters ahead of the load. PFS sets the cadence from your booth and your spray hours, ships the media before the bank is used up, and can time the change with a service visit.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#quote">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                  Request a Quote
                </Button>
              </a>
              <a href="tel:855-496-7969">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                  <Phone className="h-4 w-4" />
                  855-496-7969
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How the program works</h2>
          <p className="text-white/60 max-w-3xl mb-8 leading-relaxed">
            The program is for collision shops, fleets, and production lines that spray often enough to know a filter will load. It is not a coupon and it is not the monthly Subscribe and Save option on a single product page.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="glow-card p-6">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">{item.step}</p>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Why shops use it</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => (
              <div key={item.title} className="glow-card p-6">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 leading-relaxed mt-8 max-w-3xl">
            Filter families for PFS booths are listed on the manufacturer’s filter page at{' '}
            <a
              href="https://pfsspraybooths.com/parts/filters/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              pfsspraybooths.com/parts/filters
            </a>
            . Membership plans in the shop are a separate offer.{' '}
            <Link href="/memberships" className="text-blue-400 hover:text-blue-300">View memberships</Link>
            {' '}or{' '}
            <Link href="/pfs-spray-booth-filters" className="text-blue-400 hover:text-blue-300">review PFS booth stages</Link>.
          </p>
        </div>
      </section>

      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Questions about filter rotation</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {filterRotationFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`rotation-${index}`}
                className="rounded-xl border border-white/10 bg-[#0d0d0d] px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="quote" className="section-raised tex-grain !py-0 px-0 contact-page">
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}
