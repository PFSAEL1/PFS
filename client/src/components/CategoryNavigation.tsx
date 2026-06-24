// CategoryNavigation — PFS Filters
// Dyson-style: isolated product image on neutral tile, clean stacked footer.
import { Link } from 'wouter';

type Category = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  // 'product' = isolated product on light neutral tile (contain)
  // 'scene'   = full-bleed booth/photo background (cover)
  mode: 'product' | 'scene';
};

const categories: Category[] = [
  {
    title: 'Ceiling Blankets',
    subtitle: 'Overhead intake filtration',
    href: '/category/ceiling-blankets',
    image: '/images/cat_ceiling_blankets.png',
    mode: 'product',
  },
  {
    title: 'Fiberglass Arrestors',
    subtitle: 'High-capacity exhaust filtration',
    href: '/category/fiberglass-arrestors',
    image: '/images/cat_fiberglass_arrestors.png',
    mode: 'product',
  },
  {
    title: 'Tacky Panel Filters',
    subtitle: 'Superior particle capture',
    href: '/category/tacky-panels',
    image: '/images/cat_tacky_panels.png',
    mode: 'product',
  },
  {
    title: 'Roll Media',
    subtitle: 'Continuous roll filtration',
    href: '/category/roll-media',
    image: '/images/cat_roll_media.png',
    mode: 'product',
  },
  {
    title: 'Shop by Size',
    subtitle: '20x20, 20x25, custom cuts',
    href: '/shop-by-size',
    image: '/images/cat_fiberglass_arrestors.png',
    mode: 'product',
  },
  {
    title: 'Shop by Type',
    subtitle: 'Intake, exhaust, MERV-rated',
    href: '/shop-by-type',
    image: '/images/cat_roll_media.png',
    mode: 'product',
  },
];

export const CategoryNavigation = () => {
  return (
    <section className="py-16 md:py-24 px-4" style={{ backgroundColor: '#0e0e0e' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14">
          <div className="flex justify-start mb-3">
            <span className="eyebrow-brand border rounded-full text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              Browse
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Shop by Category
          </h2>
          <p className="text-white/70 mt-2 text-sm md:text-base">
            Find the right filter for your specific application
          </p>
        </div>

        {/* 1 col mobile, 2 tablet, 3 desktop — larger cards, no overlap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-[#161616] cursor-pointer transition-all duration-200 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.35)]">
                {/* Media area — large */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {cat.mode === 'product' ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center p-6"
                      style={{
                        background:
                          'radial-gradient(120% 120% at 50% 35%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.015) 100%)',
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Footer — stacked, no overlap */}
                <div className="flex items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-lg leading-tight truncate">
                      {cat.title}
                    </p>
                    <p className="text-white/70 text-sm mt-1 leading-snug">
                      {cat.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 text-blue-400 text-sm font-semibold inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1">
                    Browse <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
