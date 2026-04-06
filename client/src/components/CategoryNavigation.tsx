// CategoryNavigation — PFS Filters Tesla-Style Dark Theme
// Monochrome silver/white/steel-blue palette — no random colors
import { Link } from 'wouter';

const categories = [
  {
    title: 'Fiberglass Arrestors',
    description: 'High-capacity exhaust filtration',
    href: '/category/fiberglass-arrestors',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png',
  },
  {
    title: 'Tacky Panel Filters',
    description: 'Superior particle capture',
    href: '/category/tacky-panels',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png',
  },
  {
    title: 'Ceiling Blankets',
    description: 'Overhead intake filtration',
    href: '/category/ceiling-blankets',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp',
  },
  {
    title: 'Roll Media',
    description: 'Continuous roll filtration',
    href: '/category/roll-media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
  },
  {
    title: 'Shop by Size',
    description: '20x20, 20x25, custom cuts',
    href: '/shop-by-size',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids_294ef927.jpg',
  },
  {
    title: 'Shop by Type',
    description: 'Intake, exhaust, MERV-rated',
    href: '/shop-by-type',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/merv-10-filter_b09cab34.png',
  },
];

export const CategoryNavigation = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[#4d9fff] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Browse</p>
          <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-white/30 mt-2 text-sm">Find the right filter for your specific application</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="group cursor-pointer rounded-xl border border-white/8 hover:border-white/25 transition-all duration-300 overflow-hidden bg-[#0d0d0d] hover:bg-[#111] h-full flex flex-col hover:shadow-[0_4px_24px_rgba(255,255,255,0.06)]">
                {/* Image area — dark steel gradient */}
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center p-4 aspect-square">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-400 drop-shadow-lg"
                    style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                  />
                </div>
                {/* Label */}
                <div className="p-3 flex flex-col gap-0.5 flex-1 border-t border-white/5">
                  <p className="font-semibold text-sm text-white/90 leading-tight group-hover:text-white transition-colors">{cat.title}</p>
                  <p className="text-xs text-white/30">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
