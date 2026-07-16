// Home.tsx — PFS Filters Homepage
// Redesigned per handoff spec: dark SaaS aesthetic, section rhythm, no prices on homepage
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { SocialProofBanner } from '@/components/SocialProofBanner';
import { Hero } from '@/components/Hero';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { TopMovers } from '@/components/TopMovers';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';
import { Link } from 'wouter';
import { ClipboardList, Package, RefreshCw } from 'lucide-react';

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <SEO
        title="Buy Paint Booth Filters - Premium Spray Booth Filtration Systems"
        description="Shop premium paint booth filters from PFS Filters. Fiberglass arrestors, tacky panels, intake/exhaust filters for automotive & industrial spray booths. Fast shipping, custom sizes available."
        canonical="https://pfsfilters.com/"
        structuredData={combinedSchema}
      />
      <Navigation />

      {/* 1. Hero — untouched */}
      <div className="pt-24">
        <SocialProofBanner />
      </div>
      <Hero />

      {/* Arc transition: hero → filters in action */}
      <div className="arc-divider arc-divider-up" />

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

          {/* Three large rectangles: Intake Blankets · Exhaust Filters · Intake Pads */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Intake Blankets',
                subtitle: 'Overhead ceiling intake filtration',
                image: '/images/home_intake_blankets.webp',
                alt: 'Aircraft in a PFS downdraft booth with ceiling intake blankets overhead',
                href: '/category/ceiling-blankets',
                cta: 'Shop Intake Blankets',
              },
              {
                title: 'Exhaust Filters',
                subtitle: 'High-capacity fiberglass exhaust media',
                image: '/images/home_exhaust_filters.webp',
                alt: 'PFS booth interior with a fiberglass exhaust filter wall',
                href: '/category/fiberglass-arrestors',
                cta: 'Shop Exhaust Filters',
              },
              {
                title: 'Intake Pads',
                subtitle: 'Diffusion pads for clean, even airflow',
                image: '/images/home_intake_pads.webp',
                alt: 'PFS Zenith booth with green ceiling intake pads installed',
                href: '/category/tacky-panels',
                cta: 'Shop Intake Pads',
              },
            ].map((card) => (
              <Link key={card.title} href={card.href}>
                <div className="relative rounded-xl overflow-hidden border border-white/[0.10] cursor-pointer group hover:border-blue-500/45 transition-all duration-200 h-[360px] md:h-[520px]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <p className="text-white font-bold text-xl leading-tight">{card.title}</p>
                    <p className="text-white/75 text-sm mt-1">{card.subtitle}</p>
                    <span className="inline-flex items-center gap-2 mt-3 bg-[#4d9fff] text-black text-sm font-semibold px-5 py-2.5 rounded-lg group-hover:bg-[#6aadff] transition-colors duration-150">{card.cta} <span className="text-base">→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Arc transition: filters → category nav */}
      <div className="arc-divider arc-divider-down" />

      {/* 4. Shop by Category */}
      <CategoryNavigation />

      {/* Arc transition: category → top movers */}
      <div className="arc-divider arc-divider-up" />

      {/* 5. Top Movers */}
      <TopMovers />

      {/* Arc transition: top movers → how it works */}
      <div className="arc-divider arc-divider-down" />

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
                body: 'Enter your booth make, model, and filter positions. We match you to the exact filters you need.',
              },
              {
                num: '02',
                icon: Package,
                title: 'Get your exact filters',
                body: 'Order once or set up auto-reorder. Cut to spec, quality checked, shipped in 1-2 days.',
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

      {/* Arc transition: how it works → brands */}
      <div className="arc-divider arc-divider-up" />

      {/* 7. Booth Brand Compatibility Strip */}
      <section className="section-darker tex-dots py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/25 text-xs tracking-widest font-medium uppercase">Compatible With</p>
          <p className="text-white/60 text-sm mt-2 mb-8">Filters for every major booth brand</p>

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

      {/* Arc transition: brands → membership */}
      <div className="arc-divider arc-divider-down" />

      {/* 8. Membership Banner — raised */}
      <section className="section-raised tex-grain py-16 px-4">
        <div className="max-w-4xl mx-auto px-6 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left */}
          <div>
            <span className="eyebrow-brand border rounded-full text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              Filter Membership
            </span>
            <h2 className="text-white text-xl font-semibold mt-3 leading-snug">
              Set it up once. Never run out again.
            </h2>
            <p className="text-white/55 text-sm mt-2 max-w-sm">
              Join 1,200+ shops on auto-reorder. Booth-specific tracking, priority support, and savings on every order.
            </p>
          </div>
          {/* Right */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <Link href="/memberships">
              <span className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-150 whitespace-nowrap cursor-pointer">
                See Membership Plans →
              </span>
            </Link>
            <span className="text-white/30 text-xs text-center">Starting at $29/mo</span>
          </div>
        </div>
      </section>

      {/* Arc transition: membership → FAQ */}
      <div className="arc-divider arc-divider-up" />

      {/* 9. FAQ */}
      <FAQ />

      {/* Arc transition: FAQ → footer */}
      <div className="arc-divider arc-divider-down" />

      {/* 10. Footer */}
      <StickyMobileCTA />
      <Footer />
    </div>
  );
}
