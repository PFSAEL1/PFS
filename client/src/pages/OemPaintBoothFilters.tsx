import { Link, useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, CheckCircle2, ExternalLink, Filter, Info, Layers, Phone, Wind } from 'lucide-react';
import { getBrandBySlug, BOOTH_TYPES, type BoothModel } from '@/data/boothBrands';
import { OEM_LANDING_PAGES } from '@/data/isaacLandingPages';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';

const FILTER_LINKS = [
  { href: '/intake-filters', label: 'Intake filters', description: 'Tacky panels, pleated filters, and incoming-air media', icon: Wind },
  { href: '/ceiling-filters', label: 'Ceiling filters', description: 'Diffusion media for applicable downdraft and semi-downdraft systems', icon: Layers },
  { href: '/exhaust-filters', label: 'Exhaust filters', description: 'Fiberglass, Paint Pockets, and accordion-style arrestor media', icon: Filter },
  { href: '/prefilters', label: 'Prefilter guidance', description: 'First-stage media and multi-stage selection considerations', icon: CheckCircle2 },
];

function formatFilterStages(model: BoothModel) {
  const entries = [
    ['Intake', model.filters.intake],
    ['Ceiling', model.filters.ceiling],
    ['Exhaust', model.filters.exhaust],
    ['Prefilter', model.filters.prefilter],
  ] as const;

  return entries.filter(([, sizes]) => sizes && sizes.length > 0);
}

export default function OemPaintBoothFilters() {
  const [location] = useLocation();
  const config = OEM_LANDING_PAGES[location];
  const brand = config ? getBrandBySlug(config.brandSlug) : undefined;

  if (!config) {
    return (
      <div className="min-h-screen bg-[#040404] text-white">
        <SEO title="Booth Guide Not Found" description="This paint booth manufacturer guide is not available." noIndex />
        <Navigation />
        <main className="mx-auto max-w-3xl px-4 pb-20 pt-36 text-center">
          <h1 className="mb-4 text-4xl font-bold">Booth guide not found</h1>
          <Link href="/shop-by-booth" className="text-blue-400 hover:text-blue-300">Browse all booth brands</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: `${SITE}/` },
    { name: 'Shop by Booth', url: `${SITE}/shop-by-booth` },
    { name: `${config.shortName} Paint Booth Filters`, url: `${SITE}${config.path}` },
  ]);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title={config.title}
        description={config.description}
        canonical={`${SITE}${config.path}`}
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      <main>
        <section className="section-darker relative overflow-hidden px-4 pb-14 pt-28">
          <div className="pointer-events-none absolute -right-16 top-20 hidden opacity-[0.035] lg:block">
            <img src="/images/brands/pfs-logo-wide.png" alt="" className="w-[620px]" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <Breadcrumb items={[{ label: 'Shop by Booth', href: '/shop-by-booth' }, { label: `${config.shortName} Filters` }]} />
            <div className="mt-5 max-w-4xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                <Building2 className="h-3.5 w-3.5" /> {config.eyebrow}
              </span>
              <h1 className="pfs-heading-animate mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {config.h1}
              </h1>
              <p className="pfs-sub-animate max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
                {config.introduction}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/filter-finder">
                  <Button className="gap-2 bg-blue-700 px-7 py-6 text-white hover:bg-blue-600">
                    Start with the filter finder <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="gap-2 border-white/20 px-7 py-6 text-white hover:bg-white/5">
                    <Phone className="h-4 w-4" /> Request a fitment review
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4">
          <div className="mx-auto -mt-3 mb-3 flex max-w-4xl gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.055] p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-200" />
            <div>
              <p className="text-sm leading-relaxed text-white/65">
                {config.affiliated ? (
                  <>PFS Filters and PFS Spray Booths share the same team, but the booth model alone is not enough to confirm a replacement. Verify the equipment tag, filter stage, construction, and actual dimensions.</>
                ) : (
                  <>PFS Filters is not affiliated with {config.brandName}. Manufacturer names identify the equipment being serviced. Model and size information is guidance only; configurations, options, and retrofits can vary.</>
                )}
              </p>
              <a href={config.officialSource.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-blue-200">
                {config.officialSource.label} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-up" />

        <section className="section-raised tex-dots px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-9 max-w-3xl">
              <p className="section-label"><span>Selection workflow</span></p>
              <h2 className="mb-3 text-3xl font-bold">Confirm the booth before choosing media</h2>
              <p className="leading-relaxed text-white/60">{config.selectionGuidance}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {['Booth manufacturer and model', 'Filter position in the airflow path', 'Current label and media construction', 'Nominal and actual dimensions'].map((item, index) => (
                <div key={item} className="glow-card p-5">
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-sm font-bold text-blue-300">{index + 1}</span>
                  <p className="font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-down" />

        {brand && brand.models.length > 0 && (
          <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 max-w-3xl">
                <p className="section-label"><span>Model reference</span></p>
                <h2 className="mb-3 text-3xl font-bold">Recorded {config.shortName} booth families and filter stages</h2>
                <p className="text-white/55">Use these records to organize a review, not as a fitment guarantee. Confirm against the installed equipment and current manufacturer documentation.</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {brand.models.map((model) => (
                  <article key={model.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold">{config.shortName} {model.name}</h3>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50">{BOOTH_TYPES[model.type]?.label ?? model.type}</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {formatFilterStages(model).map(([label, sizes]) => (
                        <div key={label} className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-300">{label}</p>
                          <p className="text-sm leading-relaxed text-white/65">{sizes?.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="arc-divider arc-divider-up" />

        <section className="section-raised tex-lines px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="section-label"><span>Browse by stage</span></p>
              <h2 className="mb-3 text-3xl font-bold">Review candidate PFS filter categories</h2>
              <p className="text-white/55">These links narrow the catalog by function. The customer must still confirm construction, dimensions, and application details before ordering.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FILTER_LINKS.map(({ href, label, description, icon: Icon }) => (
                <Link key={href} href={href}>
                  <div className="glow-card group h-full p-5">
                    <Icon className="mb-4 h-6 w-6 text-blue-400" />
                    <h3 className="mb-2 font-bold group-hover:text-blue-300">{label}</h3>
                    <p className="text-sm leading-relaxed text-white/50">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="arc-divider arc-divider-down" />

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="section-label"><span>Applications</span></p>
              <h2 className="mb-4 text-3xl font-bold">Where {config.shortName} booth guidance is used</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {config.industries.map((industry) => (
                  <div key={industry} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-white/65">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" /> {industry}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/[0.07] p-7">
              <img src="/images/brands/pfs-logo-wide.png" alt="PFS Filters" className="mb-6 h-10 w-auto" />
              <h2 className="mb-3 text-2xl font-bold">Need PFS to review the details?</h2>
              <p className="mb-6 text-sm leading-relaxed text-white/60">Send the model, equipment tag, filter stage, label, photos, and dimensions. PFS will separate likely catalog matches from items that require more information.</p>
              <div className="flex flex-col gap-3">
                <Link href="/contact"><Button className="w-full bg-blue-700 text-white hover:bg-blue-600">Request a fitment review</Button></Link>
                <a href="tel:+18554967969"><Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5">Call 855-496-7969</Button></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="arc-divider arc-divider-up" />
      <Footer />
    </div>
  );
}
