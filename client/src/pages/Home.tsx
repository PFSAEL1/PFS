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

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 2. Trust strip is inside SocialProofBanner — bg handled there */}

      {/* 3. Filters in Action — #080808 */}
      <section className="py-20 px-4" style={{ backgroundColor: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-3">
            <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              Our Filters in Action
            </span>
          </div>
          <h2 className="text-white text-2xl font-semibold text-center mt-2">
            Built for real booths. Proven in the field.
          </h2>
          <p className="text-white/60 text-sm text-center mt-2 mb-10">
            Every filter ships from the same team that builds the booths.
          </p>

          {/* Photo Grid: 2-col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Photo 1 — Large, spans both rows on left */}
            <div className="md:row-span-2 relative rounded-xl overflow-hidden border border-white/[0.08] group">
              <img
                src="/images/PFS_7.jpg"
                alt="Ceiling intake blankets in downdraft booth"
                className="w-full h-[320px] md:h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-white font-medium text-sm">Ceiling Intake Blankets</p>
                <p className="text-white/60 text-xs">Downdraft booth — PFS installed</p>
                <Link href="/category/ceiling-blankets">
                  <span className="text-blue-400 text-xs font-medium mt-1 inline-block hover:text-blue-300 transition-colors">Shop Ceiling Blankets →</span>
                </Link>
              </div>
            </div>

            {/* Photo 2 — Top right */}
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] group">
              <img
                src="/images/Spray-booth_2.webp"
                alt="Fiberglass exhaust arrestors in semi-downdraft booth"
                className="w-full h-[250px] object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-white font-medium text-sm">Fiberglass Exhaust Arrestors</p>
                <p className="text-white/60 text-xs">Semi-downdraft configuration</p>
                <Link href="/category/fiberglass-arrestors">
                  <span className="text-blue-400 text-xs font-medium mt-1 inline-block hover:text-blue-300 transition-colors">Shop Arrestors →</span>
                </Link>
              </div>
            </div>

            {/* Photo 3 — Bottom right */}
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] group">
              <img
                src="/images/PFS_1.webp"
                alt="Exhaust filter wall in powder coat booth"
                className="w-full h-[250px] object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-white font-medium text-sm">Exhaust Filter Wall</p>
                <p className="text-white/60 text-xs">Powder coat booth — full media load</p>
                <Link href="/category/fiberglass-arrestors">
                  <span className="text-blue-400 text-xs font-medium mt-1 inline-block hover:text-blue-300 transition-colors">Shop Exhaust Filters →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Photo 4 — Full width banner */}
          <div className="relative rounded-xl overflow-hidden border border-white/[0.08] mt-4">
            <img
              src="/images/Interior_crossflow.jpg"
              alt="Large-scale industrial crossflow booth"
              className="w-full h-[200px] md:h-[280px] object-cover"
              style={{ objectPosition: 'center 40%' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%)' }} />
            <div className="absolute top-1/2 -translate-y-1/2 left-6 z-10 max-w-xs">
              <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-[10px] tracking-widest font-medium px-3 py-1 inline-flex items-center uppercase">
                Large-Scale Installations
              </span>
              <p className="text-white font-medium text-base mt-3 leading-snug">
                From body shops to aerospace facilities — PFS filters every booth we build.
              </p>
              <Link href="/contact">
                <span className="inline-block border border-white/20 text-white/80 hover:border-white/40 hover:text-white px-5 py-2 rounded-lg text-sm mt-3 transition-colors duration-150">
                  Get a Custom Quote →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 4. Shop by Category — #0e0e0e */}
      <CategoryNavigation />

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 5. Top Movers — #080808 */}
      <TopMovers />

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 6. How It Works — #0e0e0e */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-3">
            <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
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

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 7. Booth Brand Compatibility Strip — #080808 */}
      <section className="py-14 px-4" style={{ backgroundColor: '#080808' }}>
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

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 8. Membership Banner — #0e0e0e */}
      <section className="py-16 px-4" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-4xl mx-auto px-6 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left */}
          <div>
            <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
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

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 9. FAQ — #080808 */}
      <FAQ />

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.04]" />

      {/* 10. Footer — #0e0e0e */}
      <StickyMobileCTA />
      <Footer />
    </div>
  );
}
