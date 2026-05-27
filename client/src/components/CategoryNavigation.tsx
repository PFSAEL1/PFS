// CategoryNavigation — PFS Filters
// Full-bleed booth photo backgrounds with dark gradient overlays
import { Link } from 'wouter';

const categories = [
  {
    title: 'Ceiling Blankets',
    subtitle: 'Overhead intake filtration',
    href: '/category/ceiling-blankets',
    image: '/images/Semi_downdraft_2.jpg',
  },
  {
    title: 'Fiberglass Arrestors',
    subtitle: 'High-capacity exhaust filtration',
    href: '/category/fiberglass-arrestors',
    image: '/images/PFS_1.webp',
  },
  {
    title: 'Tacky Panel Filters',
    subtitle: 'Superior particle capture',
    href: '/category/tacky-panels',
    image: '/images/Spray-booth_2.webp',
  },
  {
    title: 'Roll Media',
    subtitle: 'Continuous roll filtration',
    href: '/category/roll-media',
    image: '/images/Side_DD_6.jpg',
  },
  {
    title: 'Shop by Size',
    subtitle: '20x20, 20x25, custom cuts',
    href: '/shop-by-size',
    image: '/images/Interior_crossflow.jpg',
  },
  {
    title: 'Shop by Type',
    subtitle: 'Intake, exhaust, MERV-rated',
    href: '/shop-by-type',
    image: '/images/PFS_7.jpg',
  },
];

export const CategoryNavigation = () => {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#0e0e0e' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-start mb-3">
            <span className="bg-white/5 border border-white/10 rounded-full text-blue-400 text-xs tracking-widest font-medium px-4 py-1.5 inline-flex items-center gap-2 uppercase">
              Browse
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Shop by Category
          </h2>
          <p className="text-white/60 mt-2 text-sm">Find the right filter for your specific application</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08] cursor-pointer group hover:border-blue-500/40 hover:scale-[1.02] transition-all duration-200 h-[220px] md:h-[260px]">
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-200"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
                  }}
                />
                {/* Hover darkened overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
                  }}
                />
                {/* Title */}
                <div className="absolute bottom-3 left-3 right-12 z-10">
                  <p className="text-white font-semibold text-base leading-tight">{cat.title}</p>
                  <p className="text-white/80 text-xs mt-1">{cat.subtitle}</p>
                </div>
                {/* Browse link */}
                <span className="absolute bottom-3 right-3 z-10 text-blue-400 text-xs font-medium">
                  Browse →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
