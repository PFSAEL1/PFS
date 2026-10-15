// Home.tsx — PFS Filters Homepage
// Redesigned per handoff spec: dark SaaS aesthetic, section rhythm, no prices on homepage
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { SocialProofBanner } from '@/components/SocialProofBanner';
import { Hero } from '@/components/Hero';
import { HomeFilterFinder } from '@/components/HomeFilterFinder';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { organizationSchema, storeSchema, websiteSchema } from '@/lib/structuredData';
import { Link } from 'wouter';
import { ClipboardList, Package, RefreshCw } from 'lucide-react';

const CategoryNavigation = lazy(() =>
  import('@/components/CategoryNavigation').then((module) => ({ default: module.CategoryNavigation })),
);
const TopMovers = lazy(() =>
  import('@/components/TopMovers').then((module) => ({ default: module.TopMovers })),
);
const FAQ = lazy(() =>
  import('@/components/FAQ').then((module) => ({ default: module.FAQ })),
);
const Footer = lazy(() =>
  import('@/components/Footer').then((module) => ({ default: module.Footer })),
);

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [storeSchema, organizationSchema, websiteSchema],
};

function DeferredHomeSection({
  children,
  minHeight,
}: {
  children: ReactNode;
  minHeight: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '700px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (isVisible) {
    return <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense>;
  }

  return <div ref={ref} style={{ minHeight }} aria-hidden="true" />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#040404]">
      <SEO
        title="Paint Booth Filters for Every Booth Brand | PFS Filters"
        description="Paint booth filters for every booth brand — exhaust, intake, ceiling, prefilter, and Andreae. Backed by 30+ years of PFS Spray Booths. In stock, ships fast."
        canonical="https://www.pfsfilters.com/"
        structuredData={combinedSchema}
      />
      <Navigation />

      {/* 1. Hero — untouched */}
      <div className="pt-24">
        <SocialProofBanner />
      </div>
      <Hero />
      <section className="relative z-10 px-4 pb-16 pt-8">
        <div className="mx-auto max-w-7xl">
          <HomeFilterFinder />
        </div>
      </section>

      {/* 2. Trust strip is inside SocialProofBanner — bg handled there */}

      {/* 3. Filters in Action — three feature rectangles */}
      <section className="section-glow tex-dots py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-3">
            <span className="eyebrow-teal border rounded-full text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              Our Filters in Action
            </span>
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-semibold text-center mt-2">
            Built for real booths. Proven in the field.
          </h2>
          <p className="text-white/60 text-sm text-center mt-2 mb-10">
            Every filter ships from the same team that builds the booths.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Exhaust',
                subtitle: 'Fiberglass arrestors and exhaust rolls',
                image: '/images/home_exhaust_filters-640.webp',
                srcSet: '/images/home_exhaust_filters-640.webp 640w, /images/home_exhaust_filters-960.webp 960w',
                alt: 'PFS booth interior with a fiberglass exhaust filter wall',
                href: '/exhaust-filters',
                cta: 'Shop exhaust',
              },
              {
                title: 'Intake',
                subtitle: 'Tacky panels and intake pads',
                image: '/images/home_intake_pads-640.webp',
                srcSet: '/images/home_intake_pads-640.webp 640w, /images/home_intake_pads-960.webp 960w',
                alt: 'PFS Zenith booth with green ceiling intake pads installed',
                href: '/intake-filters',
                cta: 'Shop intake',
              },
              {
                title: 'Ceiling',
                subtitle: 'Diffusion blankets for downdraft booths',
                image: '/images/home_intake_blankets-640.webp',
                srcSet: '/images/home_intake_blankets-640.webp 640w, /images/home_intake_blankets-960.webp 960w',
                alt: 'Aircraft in a PFS downdraft booth with ceiling intake blankets overhead',
                href: '/ceiling-filters',
                cta: 'Shop ceiling',
              },
              {
                title: 'Prefilters',
                subtitle: 'First-stage media ahead of the primary filter',
                image: '/images/filters/pre-filters.webp',
                srcSet: '/images/filters/pre-filters.webp 800w',
                alt: 'Paint booth prefilter media',
                href: '/shop?category=pre-filters',
                cta: 'Shop prefilters',
              },
            ].map((card) => (
              <Link key={card.title} href={card.href}>
                <div className="relative rounded-xl overflow-hidden border border-white/[0.10] cursor-pointer group hover:border-[#0081f2]/70 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,129,242,0.35)] transition-[transform,box-shadow,border-color] duration-200 h-[320px] md:h-[420px]">
                  <img
                    src={card.image}
                    srcSet={card.srcSet}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    alt={card.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    width={960}
                    height={644}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <p className="text-white font-bold text-xl leading-tight">{card.title}</p>
                    <p className="text-white/75 text-sm mt-1">{card.subtitle}</p>
                    <span className="inline-flex items-center gap-2 mt-3 border border-transparent bg-[#4d9fff] text-black text-sm font-semibold px-5 py-2.5 rounded-lg group-hover:bg-[#6aadff] group-hover:border-blue-500/50 group-hover:shadow-[0_20px_70px_-12px_rgba(59,130,246,0.75)] transition-[transform,box-shadow,background-color,border-color] duration-200">{card.cta} <span className="text-base">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <DeferredHomeSection minHeight={520}>
        <TopMovers />
      </DeferredHomeSection>

      <DeferredHomeSection minHeight={900}>
        <CategoryNavigation />
      </DeferredHomeSection>


      {/* 6. How It Works — raised, lined texture */}
      <section className="section-raised tex-lines tex-grain py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-3">
            <span className="eyebrow-brand border rounded-full text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-white text-2xl font-semibold text-center mt-2 mb-12">
            Set up in minutes. Never run out again.
          </h2>

          {/* 3 Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Dashed connector line (desktop only) */}
            <div className="hidden md:block absolute top-[54px] left-[16.67%] right-[16.67%] border-t border-dashed border-white/10 z-0" />

            {[
              {
                num: '01',
                icon: ClipboardList,
                title: 'Tell us your booth',
                body: 'Enter your booth make, model, filter position, and dimensions. We narrow the options and flag details to confirm.',
              },
              {
                num: '02',
                icon: Package,
                title: 'Confirm the filter',
                body: 'Review the size and booth stage before ordering, or ask PFS for help with custom and hard-to-find items.',
              },
              {
                num: '03',
                icon: RefreshCw,
                title: 'Never run out again',
                body: 'Booth-specific tracking tells you when to change. Auto-reorder handles the rest before you run low.',
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center gap-3 relative z-10">
                <span className="text-white/15 text-xs font-mono tracking-widest mb-1">{step.num}</span>
                <div className="w-[72px] h-[72px] rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
                  <step.icon className="h-9 w-9 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-base mt-3">{step.title}</h3>
                <p className="text-white/60 text-sm mt-2 max-w-[220px]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. Booth Brand Compatibility Strip */}
      <section className="section-darker tex-dots py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/25 text-xs tracking-widest font-medium uppercase">Compatible With</p>
          <p className="text-white/60 text-sm mt-2 mb-8">Replacement guidance for many major booth brands</p>

          <div className="flex flex-wrap justify-center gap-3">
            {['Accudraft', 'Garmat', 'GFS', 'Blowtherm', 'Col-Met', 'Spray Systems'].map((brand) => (
              <span
                key={brand}
                className="border border-white/10 text-white/45 text-sm px-5 py-2 rounded-full hover:border-white/25 hover:text-white/65 transition-colors duration-200 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>

          <p className="text-white/25 text-xs mt-8">
            Filter kits available for 40+ booth makes and models — don't see yours?{' '}
            <Link href="/contact">
              <span className="text-blue-400/70 hover:text-blue-400 transition-colors cursor-pointer">Contact us →</span>
            </Link>
          </p>
        </div>
      </section>


      <section className="section-raised tex-grain py-16 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ec5ff]">Subscribe &amp; Save</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold text-white md:text-3xl">
            Monthly reorders on eligible products, confirmed at checkout.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            Eligible products can be purchased on a monthly Shopify subscription with 5% off. The subscription terms are shown and confirmed at checkout, one-time purchase stays available, and eligible subscriptions are managed through the Shopify account portal.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/shop" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0081f2] px-5 text-sm font-semibold text-white hover:bg-[#1a91ff]">
              Shop eligible filters
            </Link>
            <Link href="/paint-booth-filters" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10">
              Read how Subscribe &amp; Save works
            </Link>
          </div>
        </div>
      </section>


      {/* 9. FAQ */}
      <DeferredHomeSection minHeight={620}>
        <FAQ />
      </DeferredHomeSection>


      {/* 10. Footer */}
      <StickyMobileCTA />
      <DeferredHomeSection minHeight={900}>
        <Footer />
      </DeferredHomeSection>
    </div>
  );
}
