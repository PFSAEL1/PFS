import { Link } from 'wouter';

const categories = [
  {
    title: 'Fiberglass Arrestors',
    description: 'High-capacity exhaust filtration',
    href: '/category/fiberglass-arrestors',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Tacky Panel Filters',
    description: 'Superior particle capture',
    href: '/category/tacky-panels',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Ceiling Blankets',
    description: 'Overhead intake filtration',
    href: '/category/ceiling-blankets',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Roll Media',
    description: 'Continuous roll filtration',
    href: '/category/roll-media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Shop by Size',
    description: '20x20, 20x25, custom cuts',
    href: '/shop-by-size',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids_294ef927.jpg',
    bgColor: 'bg-cyan-50',
  },
  {
    title: 'Shop by Type',
    description: 'Intake, exhaust, MERV-rated',
    href: '/shop-by-type',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/merv-10-filter_b09cab34.png',
    bgColor: 'bg-slate-50',
  },
];

export const CategoryNavigation = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Find the right filter for your specific application</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="group cursor-pointer rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden bg-card h-full flex flex-col">
                {/* Product image */}
                <div className={`${cat.bgColor} flex items-center justify-center p-4 aspect-square`}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                {/* Text */}
                <div className="p-3 flex flex-col gap-0.5 flex-1">
                  <p className="font-semibold text-sm leading-tight">{cat.title}</p>
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
