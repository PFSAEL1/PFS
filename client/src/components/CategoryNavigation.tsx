import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Layers, Ruler, Tag, Wind, Grid3X3 } from 'lucide-react';

// Cinematic photorealistic images — real booth photography style
const categories = [
  {
    title: 'Fiberglass Arrestors',
    description: 'High-capacity exhaust filtration',
    icon: Filter,
    href: '/shop?category=fiberglass',
    color: 'bg-blue-50 text-blue-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-fiberglass2-JzUXxvg7dJrhnVvXg5sB9f.webp',
  },
  {
    title: 'Tacky Panel Filters',
    description: 'Superior particle capture',
    icon: Layers,
    href: '/shop?category=tacky',
    color: 'bg-green-50 text-green-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-tacky2-TBwLC9qdvn42jmUwpyCJRG.webp',
  },
  {
    title: 'Ceiling Blankets',
    description: 'Overhead intake filtration',
    icon: Grid3X3,
    href: '/shop?category=ceiling',
    color: 'bg-purple-50 text-purple-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-ceiling2-hETWeKdkQ9gxgTot5wBu7H.webp',
  },
  {
    title: 'Roll Media',
    description: 'Continuous roll filtration',
    icon: Layers,
    href: '/shop?category=roll',
    color: 'bg-orange-50 text-orange-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-rolls2-CnHHnZB5ArU977Xdvdjx52.webp',
  },
  {
    title: 'MERV Intake Filters',
    description: 'Intake, exhaust, MERV-rated',
    icon: Wind,
    href: '/shop?category=intake',
    color: 'bg-slate-50 text-slate-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-merv2-KLRHBMCvcX8NUSCVTTzkQm.webp',
  },
  {
    title: 'Shop by Size',
    description: '20x20, 20x25, custom cuts',
    icon: Ruler,
    href: '/shop',
    color: 'bg-cyan-50 text-cyan-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids_294ef927.jpg',
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="group relative overflow-hidden rounded-xl cursor-pointer" style={{ aspectRatio: '3/4' }}>
                {/* Cinematic background image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Text overlay — bottom left like Tesla */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-bold text-white text-sm leading-tight">{cat.title}</p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
