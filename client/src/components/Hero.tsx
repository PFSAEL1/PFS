import { Link } from 'wouter';
import { CircleHelp, ShoppingBag, Truck, Shield } from 'lucide-react';

const HERO_POSTER_MOBILE = '/media/pfs-hero-poster-mobile.webp';
const HERO_POSTER_DESKTOP = '/media/pfs-hero-poster-desktop.webp';

export const Hero = () => {
  return (
    <header>
      <section id="home" className="relative flex min-h-[32rem] items-end overflow-hidden bg-black md:min-h-[36rem]">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={HERO_POSTER_MOBILE} />
            <img
              src={HERO_POSTER_DESKTOP}
              alt=""
              className="absolute inset-0 block h-full w-full object-cover object-[65%_center] md:object-center"
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              aria-hidden="true"
            />
          </picture>
          <div className="hero-vignette" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/35 to-black/25" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6">
          <div className="max-w-[68ch]">
            <div className="eyebrow-brand mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
              <Shield className="h-3.5 w-3.5" />
              A Division of PFS Spray Booths — 30+ Years of Expertise
            </div>

            <h1 className="hero-headline mb-6">
              <span className="hero-tier1">A Filter Program Built to</span>
              <span className="hero-tier2">Manage Your Entire Booth</span>
            </h1>

            <p className="mb-8 max-w-[62ch] text-base leading-[1.6] text-white md:text-lg">
              Start with the booth you run. Backed by 30+ years of PFS Spray Booths. In stock, ships fast.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0066cc] px-5 text-base font-semibold text-white hover:bg-[#0057a3]">
                <ShoppingBag className="h-4 w-4" />
                Shop Filters Now
              </Link>
              <Link href="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-white/70 px-5 text-base font-semibold text-white hover:bg-white/10">
                Get a Custom Quote
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: Truck, label: 'Ships Fast Nationwide' },
                { icon: Shield, label: 'Booth-Specific Filter Tracking' },
                { icon: CircleHelp, label: 'Sizing Help Available' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-base text-white">
                  <badge.icon className="h-4 w-4 text-[#9ecbff]" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
