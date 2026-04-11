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
    <section className="py-20 px-4 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="section-label" style={{display:'inline-flex',marginBottom:'1rem'}}><span>Browse</span></div>
          <h2 className="text-3xl md:text-4xl font-black text-white pfs-heading-animate">
            Shop by Category
          </h2>
          <p className="text-white/40 mt-2 text-sm">Find the right filter for your specific application</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="glow-card cursor-pointer h-full flex flex-col">
                {/* Image area */}
                <div className="product-img-wrap flex items-center justify-center p-4 aspect-square">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain transition-transform duration-400 drop-shadow-lg"
                    style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                  />
                </div>
                {/* Label */}
                <div className="p-3 flex flex-col gap-0.5 flex-1">
                  <p className="font-semibold text-sm text-white/90 leading-tight">{cat.title}</p>
                  <p className="text-xs text-white/40">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
