// CategoryNavigation — PFS Filters Dark Theme
// Colorful category cards on pure black background
import { Link } from 'wouter';

const categories = [
  {
    title: 'Fiberglass Arrestors',
    description: 'High-capacity exhaust filtration',
    href: '/category/fiberglass-arrestors',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png',
    accent: 'from-blue-500/25 to-blue-700/10',
    hoverBorder: 'hover:border-blue-500/50',
    dot: 'bg-blue-400',
    glow: 'hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)]',
  },
  {
    title: 'Tacky Panel Filters',
    description: 'Superior particle capture',
    href: '/category/tacky-panels',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png',
    accent: 'from-emerald-500/25 to-emerald-700/10',
    hoverBorder: 'hover:border-emerald-500/50',
    dot: 'bg-emerald-400',
    glow: 'hover:shadow-[0_4px_20px_rgba(52,211,153,0.3)]',
  },
  {
    title: 'Ceiling Blankets',
    description: 'Overhead intake filtration',
    href: '/category/ceiling-blankets',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp',
    accent: 'from-purple-500/25 to-purple-700/10',
    hoverBorder: 'hover:border-purple-500/50',
    dot: 'bg-purple-400',
    glow: 'hover:shadow-[0_4px_20px_rgba(168,85,247,0.3)]',
  },
  {
    title: 'Roll Media',
    description: 'Continuous roll filtration',
    href: '/category/roll-media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
    accent: 'from-orange-500/25 to-orange-700/10',
    hoverBorder: 'hover:border-orange-500/50',
    dot: 'bg-orange-400',
    glow: 'hover:shadow-[0_4px_20px_rgba(251,146,60,0.3)]',
  },
  {
    title: 'Shop by Size',
    description: '20x20, 20x25, custom cuts',
    href: '/shop-by-size',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids_294ef927.jpg',
    accent: 'from-cyan-500/25 to-cyan-700/10',
    hoverBorder: 'hover:border-cyan-500/50',
    dot: 'bg-cyan-400',
    glow: 'hover:shadow-[0_4px_20px_rgba(34,211,238,0.3)]',
  },
  {
    title: 'Shop by Type',
    description: 'Intake, exhaust, MERV-rated',
    href: '/shop-by-type',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/merv-10-filter_b09cab34.png',
    accent: 'from-rose-500/25 to-rose-700/10',
    hoverBorder: 'hover:border-rose-500/50',
    dot: 'bg-rose-400',
    glow: 'hover:shadow-[0_4px_20px_rgba(251,113,133,0.3)]',
  },
];

export const CategoryNavigation = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Browse</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">Shop by Category</h2>
          <p className="text-white/40 mt-2">Find the right filter for your specific application</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className={`group cursor-pointer rounded-xl border border-white/10 ${cat.hoverBorder} ${cat.glow} transition-all duration-300 overflow-hidden bg-[#0d0d0d] h-full flex flex-col`}>
                <div className={`bg-gradient-to-br ${cat.accent} flex items-center justify-center p-4 aspect-square`}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                </div>
                <div className="p-3 flex flex-col gap-0.5 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.dot} flex-shrink-0`}></span>
                    <p className="font-semibold text-sm text-white leading-tight">{cat.title}</p>
                  </div>
                  <p className="text-xs text-white/40 pl-3">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
