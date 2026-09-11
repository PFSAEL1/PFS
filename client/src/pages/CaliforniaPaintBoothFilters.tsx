import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, CheckCircle2, ExternalLink, Info, MapPin, Phone } from 'lucide-react';
import { CALIFORNIA_LANDING_PAGES } from '@/data/isaacLandingPages';
import { shopifyImageSrcSet, sizedShopifyImageUrl } from '@/lib/imageUrls';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';
const LOGO_URL = '/images/brands/pfs-logo-wide-420.webp';
const Footer = lazy(() => import('@/components/Footer').then((module) => ({ default: module.Footer })));

function DeferredFooter() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timerId: number | undefined;

    const revealFooter = () => setShowFooter(true);
    const scheduleFooter = () => {
      timerId = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(revealFooter, { timeout: 3000 });
        } else {
          revealFooter();
        }
      }, 2500);
    };

    if (document.readyState === 'complete') {
      scheduleFooter();
    } else {
      window.addEventListener('load', scheduleFooter, { once: true });
    }

    return () => {
      window.removeEventListener('load', scheduleFooter);
      if (timerId !== undefined) window.clearTimeout(timerId);
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!showFooter) return null;

  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
}

const FILTER_PATHS = [
  {
    href: '/exhaust-filters',
    title: 'Exhaust Filters',
    description: 'Fiberglass pads and rolls, Paint Pockets, and accordion-style arrestor media.',
    image: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/Turquoiseairfilterpadoncheckeredbackground.png?v=1775866495',
  },
  {
    href: '/intake-filters',
    title: 'Intake Filters',
    description: 'Tacky panels, pleated filters, and other catalog media for incoming-air stages.',
    image: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/tacky-panel-green_7675d2dd-699a-43c3-995e-43de1e536727.png?v=1775862087',
  },
  {
    href: '/ceiling-filters',
    title: 'Ceiling Filters',
    description: 'Diffusion media for applicable downdraft and semi-downdraft booth configurations.',
    image: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cotton_roll_transparent.png?v=1778259131',
  },
  {
    href: '/andreae-paint-booth-filters',
    title: 'Accordion Filters',
    description: 'Andreae-style pad and roll variants shown in the current PFS catalog.',
    image: 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/ChatGPTImageMay8_2026_02_21_15PM.png?v=1778275424',
  },
];

export default function CaliforniaPaintBoothFilters() {
  const { slug } = useParams<{ slug: string }>();
  const config = slug ? CALIFORNIA_LANDING_PAGES[slug] : undefined;

  if (!config) {
    return (
      <div className="min-h-screen bg-[#040404] text-white">
        <SEO title="California Service Page Not Found" description="This California paint booth filter page is not available." noIndex />
        <Navigation />
        <main className="mx-auto max-w-3xl px-4 pb-20 pt-36 text-center">
          <h1 className="mb-4 text-4xl font-bold">California service page not found</h1>
          <Link href="/paint-booth-filters" className="text-blue-400 hover:text-blue-300">Browse paint booth filters</Link>
        </main>
        <DeferredFooter />
      </div>
    );
  }

  const faqItems = [
    {
      question: `Does PFS Filters serve ${config.region}?`,
      answer: `Yes. PFS Filters accepts online and quote requests from ${config.region}. Product availability and order timing depend on the current catalog, quantity, freight needs, and whether the item is standard or custom.`,
    },
    {
      question: 'How do I identify the correct paint booth filter?',
      answer: 'Record the booth manufacturer and model, filter position, label or part number, media construction, and nominal and actual dimensions. PFS can review photos and measurements when the online catalog does not resolve the request.',
    },
    {
      question: 'Does buying a filter make a California facility compliant?',
      answer: 'No. Compliance depends on the complete booth and ventilation system, coating process, installation, maintenance, records, permits, and applicable air-district rules. Confirm requirements with the facility permit and the relevant regulator.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      createBreadcrumbSchema([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Paint Booth Filters', url: `${SITE}/paint-booth-filters` },
        { name: config.region, url: `${SITE}${config.path}` },
      ]),
      createFAQSchema(faqItems),
    ],
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO title={config.title} description={config.description} canonical={`${SITE}${config.path}`} structuredData={structuredData} />
      <Navigation />

      <main>
        <section className="section-darker relative overflow-hidden px-4 pb-16 pt-28">
          <div className="pointer-events-none absolute right-0 top-16 opacity-[0.045]">
            <img
              src={LOGO_URL}
              alt=""
              className="w-[540px] max-w-[60vw]"
              width={420}
              height={127}
              decoding="async"
            />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <Breadcrumb items={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: config.region }]} />
            <div className="mt-5 max-w-4xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                <MapPin className="h-3.5 w-3.5" /> {config.eyebrow}
              </span>
              <h1 className="pfs-heading-animate mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">{config.h1}</h1>
              <p className="pfs-sub-animate max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">{config.introduction}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/paint-booth-filters"><Button className="gap-2 bg-blue-700 px-7 py-6 text-white hover:bg-blue-600">Browse filter categories <ArrowRight className="h-4 w-4" /></Button></Link>
                <Link href="/contact"><Button variant="outline" className="gap-2 border-white/20 px-7 py-6 text-white hover:bg-white/5"><Phone className="h-4 w-4" /> Request help</Button></Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {config.cities.map((city) => <span key={city} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">{city}</span>)}
              </div>
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-up" />

        <section className="section-raised tex-dots px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-9 max-w-3xl">
              <p className="section-label"><span>Regional applications</span></p>
              <h2 className="mb-4 text-3xl font-bold">Filtration support for {config.region}</h2>
              <p className="mb-4 leading-relaxed text-white/60">{config.localContext}</p>
              <p className="leading-relaxed text-white/60">{config.operationsContext}</p>
              <a href={config.regionalSource.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">
                {config.regionalSource.label} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.industries.map((industry) => (
                <div key={industry} className="glow-card flex items-start gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                  <p className="font-semibold text-white/80">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-down" />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 max-w-3xl">
              <p className="section-label"><span>Shop by filter stage</span></p>
              <h2 className="mb-3 text-3xl font-bold">Start with the function, then confirm the fit</h2>
              <p className="text-white/55">These visual category paths narrow the catalog. Check current options and availability on the product page, then verify the installed media before purchase.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {FILTER_PATHS.map((item) => (
                <Link key={item.href} href={item.href}>
                  <article className="glow-card group h-full overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                      <img
                        src={sizedShopifyImageUrl(item.image, 480)}
                        srcSet={shopifyImageSrcSet(item.image)}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                        alt={`${item.title} for paint booth applications`}
                        className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                        width={480}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="auto"
                      />
                    </div>
                    <div className="border-t border-white/5 p-5">
                      <h3 className="mb-2 text-lg font-bold group-hover:text-blue-300">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-white/50">{item.description}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-up" />

        <section className="section-raised tex-lines px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="section-label"><span>California compliance boundary</span></p>
              <h2 className="mb-4 text-3xl font-bold">The filter is only one part of the regulated system</h2>
              <div className="flex gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.055] p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
                <p className="text-sm leading-relaxed text-white/65">California requirements can involve the California Air Resources Board, a local air district, the facility permit, coating rules, booth design, ventilation, operating practices, maintenance, and records. PFS does not label a product as universally “CARB compliant.”</p>
              </div>
              <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Link href="/california/carb-paint-booth-filter-compliance" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">Read the California compliance guide <ArrowRight className="h-4 w-4" /></Link>
                <a href={config.regulatorySource.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300">{config.regulatorySource.label} <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.07] p-7">
              <img src={LOGO_URL} alt="PFS Filters" className="mb-6 h-10 w-auto" width={420} height={127} loading="lazy" decoding="async" />
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Santa Rosa, California</p>
              <h2 className="mb-3 text-2xl font-bold">A California-based team with nationwide ordering</h2>
              <p className="mb-5 text-sm leading-relaxed text-white/60">PFS Filters operates from 1400 Airport Blvd, Santa Rosa, CA 95403. Contact the team for filter identification, product questions, custom requests, or multi-booth planning.</p>
              <a href="tel:+18554967969"><Button className="w-full bg-blue-700 text-white hover:bg-blue-600">Call 855-496-7969</Button></a>
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-down" />

        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <p className="section-label"><span>Common questions</span></p>
            <h2 className="mb-8 text-3xl font-bold">Ordering paint booth filters in {config.region}</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
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
      <DeferredFooter />
    </div>
  );
}
