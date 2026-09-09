import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, Building2, CheckCircle2, ExternalLink, FileCheck2, Filter, Phone, ShieldCheck } from 'lucide-react';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const PATH = '/california/carb-paint-booth-filter-compliance';

const FAQS = [
  {
    question: 'Is there one universally CARB-compliant paint booth filter?',
    answer: 'No. A filter is one component of a booth and ventilation system. Facility requirements can depend on the coating process, booth design, installation, airflow, maintenance, records, permit conditions, and rules enforced by the local air district.',
  },
  {
    question: 'Who regulates paint booth air emissions in California?',
    answer: 'The California Air Resources Board oversees statewide air-quality programs, while local air districts implement and enforce many stationary-source permitting and air-pollution requirements. A facility should identify its local district and review its permit and applicable rules.',
  },
  {
    question: 'What filter information should a facility keep?',
    answer: 'Keep the product identity, manufacturer documentation, installed position, dimensions, purchase and change records, inspection observations, relevant pressure readings, and any test or permit documents required for the specific operation.',
  },
  {
    question: 'Can PFS Filters certify my facility?',
    answer: 'No. PFS Filters can provide available product information and help identify candidate media. The facility and its qualified advisers are responsible for verifying regulatory, permit, testing, installation, and operating requirements.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    createBreadcrumbSchema([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Paint Booth Filters', url: `${SITE}/paint-booth-filters` },
      { name: 'California Paint Booth Filter Compliance', url: `${SITE}${PATH}` },
    ]),
    createFAQSchema(FAQS),
  ],
};

const OFFICIAL_RESOURCES = [
  {
    label: 'California Air Resources Board: California air districts',
    href: 'https://ww2.arb.ca.gov/california-air-districts',
    description: 'Find the local air district responsible for your facility location.',
  },
  {
    label: 'California Air Resources Board',
    href: 'https://ww2.arb.ca.gov/',
    description: 'Start with statewide air-quality programs and official agency information.',
  },
  {
    label: 'Electronic Code of Federal Regulations: 40 CFR Part 63',
    href: 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-63',
    description: 'Review federal National Emission Standards for Hazardous Air Pollutants and applicable subparts.',
  },
  {
    label: 'EPA Method 319',
    href: 'https://www.epa.gov/emc/method-319-determination-filtration-efficiency-paint-overspray-arrestors',
    description: 'Official EPA test-method information for paint overspray arrestors in applicable aerospace contexts.',
  },
];

export default function CaliforniaCarbCompliance() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="California Paint Booth Filter Compliance: CARB & Air Districts"
        description="Understand how CARB, California air districts, facility permits, and product documentation relate to paint booth filter selection and maintenance."
        canonical={`${SITE}${PATH}`}
        structuredData={structuredData}
      />
      <Navigation />

      <main>
        <section className="section-darker relative overflow-hidden px-4 pb-16 pt-28">
          <div className="pointer-events-none absolute right-0 top-14 opacity-[0.045]">
            <img src="/images/brands/pfs-logo-wide.png" alt="" className="w-[560px] max-w-[60vw]" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <Breadcrumb items={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: 'California Compliance Guide' }]} />
            <div className="mt-5 max-w-4xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                <ShieldCheck className="h-3.5 w-3.5" /> California regulatory guide
              </span>
              <h1 className="pfs-heading-animate mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                California Paint Booth Filter Compliance: CARB, Air Districts &amp; Facility Permits
              </h1>
              <p className="pfs-sub-animate max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
                Use this guide to organize filter information and ask better questions. It does not turn a product page into a compliance certificate or replace the facility permit, regulator, equipment documentation, or qualified professional advice.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4">
          <div className="mx-auto -mt-3 mb-3 flex max-w-4xl gap-3 rounded-xl border border-amber-300/25 bg-amber-300/[0.06] p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
            <p className="text-sm leading-relaxed text-white/70">
              <strong className="text-white">Important:</strong> PFS Filters does not represent that a filter by itself makes a facility “CARB compliant.” Compliance is site- and process-specific and may involve state, local, and federal requirements.
            </p>
          </div>
        </section>

        <div className="arc-divider arc-divider-up" />

        <section className="section-raised tex-dots px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="section-label"><span>Three layers to verify</span></p>
              <h2 className="mb-4 text-3xl font-bold">Who sets the requirements?</h2>
              <p className="leading-relaxed text-white/60">California facilities should identify every layer that applies before using a product claim as evidence.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Statewide programs',
                  text: 'CARB oversees statewide air-quality programs and coordinates with California’s local air districts. State rules do not eliminate local permitting or operating requirements.',
                },
                {
                  icon: Building2,
                  title: 'Local air district',
                  text: 'Local air districts implement and enforce many stationary-source rules and permits. The correct district depends on the facility address, not the filter supplier.',
                },
                {
                  icon: FileCheck2,
                  title: 'Facility permit and process',
                  text: 'The booth, coatings, spray equipment, ventilation, operating practices, maintenance, records, and permit conditions determine what the facility must document and maintain.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="glow-card p-6">
                  <Icon className="mb-4 h-7 w-7 text-blue-400" />
                  <h3 className="mb-3 text-xl font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-down" />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="section-label"><span>Filter documentation</span></p>
              <h2 className="mb-4 text-3xl font-bold">Build a record for the exact installed media</h2>
              <p className="mb-6 leading-relaxed text-white/60">A useful record connects the product to the installed booth stage and the operating requirement. A marketing category such as “exhaust filter” is not enough.</p>
              <div className="space-y-3">
                {[
                  'Booth manufacturer, model, serial or equipment tag',
                  'Filter stage and location in the airflow path',
                  'Product name, label, part number, construction, and dimensions',
                  'Manufacturer technical documents or test reports when required',
                  'Installation date, inspections, change date, and disposal record',
                  'Relevant pressure or manometer readings and permit references',
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm text-white/65">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7">
              <Filter className="mb-5 h-8 w-8 text-blue-400" />
              <h2 className="mb-4 text-2xl font-bold">How PFS can help</h2>
              <p className="mb-5 text-sm leading-relaxed text-white/60">PFS can review the booth details, identify current catalog candidates, and provide product information that is actually available. If a request depends on an exact efficiency, Method 319 result, customer specification, or multi-stage system, PFS will flag that documentation requirement rather than inventing a match.</p>
              <div className="flex flex-col gap-3">
                <Link href="/neshap-compliant-paint-booth-filters"><Button className="w-full gap-2 bg-blue-700 text-white hover:bg-blue-600">Read the NESHAP guide <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/contact"><Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/5"><Phone className="h-4 w-4" /> Request documentation help</Button></Link>
              </div>
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-up" />

        <section className="section-raised tex-lines px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <p className="section-label"><span>Official resources</span></p>
            <h2 className="mb-3 text-3xl font-bold">Start with the regulator and the current rule text</h2>
            <p className="mb-8 max-w-3xl text-white/55">These links are provided for research. The facility should confirm which requirements apply and whether more current guidance or permit language controls.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {OFFICIAL_RESOURCES.map((resource) => (
                <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="glow-card group block p-5">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="font-bold group-hover:text-blue-300">{resource.label}</h3>
                    <ExternalLink className="h-4 w-4 shrink-0 text-blue-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/50">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-down" />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="section-label"><span>Common questions</span></p>
            <h2 className="mb-8 text-3xl font-bold">California paint booth filter compliance FAQ</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                  <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="arc-divider arc-divider-up" />
      <Footer />
    </div>
  );
}
