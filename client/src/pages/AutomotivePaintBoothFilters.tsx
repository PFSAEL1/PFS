import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter,
  Gauge,
  Phone,
  Ruler,
  ShieldCheck,
  Wind,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';

const PAGE_URL = 'https://www.pfsfilters.com/industries/automotive-paint-booth-filters';

const FILTER_STAGES = [
  {
    title: 'Intake & Prefilter Media',
    description: 'Review tackified panels, pleated filters, and other documented incoming-air stages. Confirm the booth manual, airflow direction, depth, and actual dimensions before ordering.',
    href: '/intake-filters',
    linkLabel: 'Compare intake filters',
    icon: Wind,
  },
  {
    title: 'Ceiling & Diffusion Media',
    description: 'For downdraft and semi-downdraft booths, review ceiling media by the installed frame or blanket dimensions and the equipment requirements for the supply-air stage.',
    href: '/ceiling-filters',
    linkLabel: 'Compare ceiling filters',
    icon: Filter,
  },
  {
    title: 'Exhaust & Overspray Arrestors',
    description: 'Compare fiberglass, pocket, and accordion-style exhaust media only within the filter stage and application documented for the product and booth.',
    href: '/exhaust-filters',
    linkLabel: 'Compare exhaust filters',
    icon: ShieldCheck,
  },
];

const SELECTION_INPUTS = [
  ['Booth configuration', 'Record whether the booth is crossdraft, downdraft, semi-downdraft, side-downdraft, open-face, or another documented design.'],
  ['Filter position', 'Identify the exact intake, prefilter, ceiling, exhaust, or other stage. Filters that look similar are not automatically interchangeable.'],
  ['Dimensions and fit', 'Measure the installed opening and the existing filter. Record width, height, depth, frame style, media format, and airflow direction.'],
  ['Existing identification', 'Photograph labels and record the booth make, model, serial or tag information, and any filter or part number available.'],
  ['Operating information', 'Follow the booth and filter instructions for pressure readings, inspections, coating load, and change-out decisions. There is no universal replacement interval.'],
] as const;

const FAQS = [
  {
    question: 'How do I identify the correct automotive paint booth filter?',
    answer: 'Start with the booth manufacturer and model, the exact filter position, the existing filter or opening dimensions, airflow direction, and any label or part number. A clear photo can help narrow candidates, but appearance alone does not prove fitment.',
  },
  {
    question: 'What is the difference between intake and exhaust filters?',
    answer: 'Intake filters are used in documented incoming-air stages, while exhaust filters or paint arrestors are used in documented overspray-capture stages. The correct media depends on the installed booth design and product requirements; the two stages are not automatically interchangeable.',
  },
  {
    question: 'How often should automotive booth filters be replaced?',
    answer: 'There is no universal interval. Use the booth and filter manufacturer instructions, applicable pressure or manometer readings, operating hours, coating load, inspection results, permit conditions, and facility procedures.',
  },
  {
    question: 'Does a replacement filter make a paint booth compliant?',
    answer: 'No filter by itself establishes facility compliance. Compliance depends on the complete booth, ventilation, coating process, installation, maintenance, permits, and applicable rules. Obtain qualified site-specific guidance when compliance is in question.',
  },
  {
    question: 'Can PFS help with an uncertain or custom filter request?',
    answer: 'Yes. Send the booth make and model, filter position, actual dimensions, current part number when available, quantity, and clear photos. PFS can review the request against the current catalog and available product information.',
  },
] as const;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.pfsfilters.com/#website',
      name: 'PFS Filters',
      url: 'https://www.pfsfilters.com/',
      publisher: { '@id': 'https://www.pfsfilters.com/#store' },
    },
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'Automotive Paint Booth Filters',
      description: 'Automotive paint booth filter selection guidance for intake, ceiling, prefilter, and exhaust stages, with sizing and fitment review from PFS Filters.',
      url: PAGE_URL,
      isPartOf: { '@id': 'https://www.pfsfilters.com/#website' },
      about: [
        { '@type': 'Thing', name: 'Automotive paint booth filters' },
        { '@type': 'Thing', name: 'Spray booth intake filters' },
        { '@type': 'Thing', name: 'Paint overspray arrestors' },
      ],
      provider: { '@id': 'https://www.pfsfilters.com/#store' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pfsfilters.com/' },
        { '@type': 'ListItem', position: 2, name: 'Paint Booth Filters', item: 'https://www.pfsfilters.com/paint-booth-filters' },
        { '@type': 'ListItem', position: 3, name: 'Automotive Paint Booth Filters', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

export default function AutomotivePaintBoothFilters() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Automotive Paint Booth Filters | PFS Filters"
        description="Compare automotive paint booth intake, ceiling, prefilter, and exhaust filters. Verify booth configuration, stage, dimensions, and fit with PFS guidance."
        canonical={PAGE_URL}
        structuredData={structuredData}
      />
      <Navigation />

      <section className="section-darker relative overflow-hidden px-4 pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: 'Automotive' }]} />
          <div className="mx-auto mt-7 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
              <Car className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">Automotive Finishing</span>
            </div>
            <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Automotive Paint Booth Filters
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
              Find intake, ceiling, prefilter, and exhaust media for automotive refinishing and production environments. Start with the booth configuration and filter stage, then verify dimensions and product requirements before ordering.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild className="gap-2 bg-blue-500 px-8 py-6 text-base font-semibold text-white hover:bg-blue-600">
                <Link href="/shop">
                  Shop Current Filters <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-white/20 px-8 py-6 text-base text-white hover:bg-white/5">
                <Link href="/filter-finder">
                  Find by Booth & Stage
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-raised tex-dots px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Filter-stage pathway</p>
            <h2 className="mb-3 text-3xl font-bold text-white">Compare the Installed Stage First</h2>
            <p className="mx-auto max-w-2xl text-white/50">
              A size match alone does not establish fit or suitability. Use the current booth documentation and product record for the stage you are replacing.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {FILTER_STAGES.map((stage) => (
              <article key={stage.title} className="glow-card flex h-full flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                  <stage.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{stage.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-white/55">{stage.description}</p>
                <Link href={stage.href} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
                  {stage.linkLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-darker px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
              <Ruler className="h-6 w-6 text-orange-400" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">Information to Gather Before Ordering</h2>
            <p className="mb-6 leading-relaxed text-white/55">
              The fastest path to a useful match is a complete record of the installed filter and booth. Keep these details with each filter position so future replacements can be reviewed consistently.
            </p>
            <Button asChild variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/5">
              <Link href="/contact">
                <Phone className="h-4 w-4" /> Request Fitment Review
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {SELECTION_INPUTS.map(([title, description], index) => (
              <article key={title} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">{index + 1}</div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-raised px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <Gauge className="mx-auto mb-4 h-8 w-8 text-blue-400" />
            <h2 className="mb-3 text-3xl font-bold text-white">Use Conditions, Not a Universal Calendar</h2>
            <p className="mx-auto max-w-3xl leading-relaxed text-white/55">
              Change-out timing varies with the booth, filter stage, coating load, operating hours, airflow, pressure readings, media, and facility requirements. Inspect and document each stage under the applicable booth and filter instructions.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Inspect', 'Look for damage, gaps, bypass, improper orientation, visible loading, or other conditions identified by the applicable instructions.'],
              ['Record', 'Track installation dates, operating context, inspection results, relevant pressure readings, and replacement dates by booth and stage.'],
              ['Verify', 'When changing media or products, compare documented stage, dimensions, construction, airflow direction, and equipment requirements.'],
            ].map(([title, description]) => (
              <article key={title} className="rounded-xl border border-white/10 bg-black/20 p-6">
                <CheckCircle2 className="mb-3 h-5 w-5 text-green-400" />
                <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{description}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-orange-400/20 bg-orange-400/[0.06] p-5 text-sm leading-relaxed text-white/60">
            A replacement filter does not by itself make a booth or facility compliant. The complete installation, ventilation, coating process, maintenance, permits, and applicable rules require site-specific review.
          </p>
        </div>
      </section>

      <section className="section-darker px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">Automotive Filter Questions</h2>
            <p className="text-white/50">Practical answers for identifying, measuring, and replacing paint booth filter media.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <article key={faq.question} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.03]"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  {openFaq === index ? <ChevronUp className="h-5 w-5 shrink-0 text-blue-400" /> : <ChevronDown className="h-5 w-5 shrink-0 text-white/40" />}
                </button>
                {openFaq === index && <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{faq.answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow-bg px-4 py-16 text-center">
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-black text-white md:text-4xl">Need Help Matching an Automotive Booth Filter?</h2>
          <p className="mb-8 text-lg leading-relaxed text-white/60">
            Send the booth make and model, filter stage, actual dimensions, current part number, quantity, and clear photos. PFS will review the request against the current catalog and available product information.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="gap-2 bg-blue-500 px-8 py-6 text-white hover:bg-blue-600">
              <Link href="/contact"><Phone className="h-4 w-4" /> Contact PFS</Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 border-white/20 px-8 py-6 text-white hover:bg-white/5">
              <Link href="/shop">Shop Filters <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
