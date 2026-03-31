import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Layers, Ruler, Tag, Wind, Grid3X3 } from 'lucide-react';

const categories = [
  {
    title: 'Fiberglass Arrestors',
    description: 'High-capacity exhaust filtration',
    icon: Filter,
    href: '/category/fiberglass-arrestors',
    color: 'bg-blue-50 text-blue-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png',
  },
  {
    title: 'Tacky Panel Filters',
    description: 'Superior particle capture',
    icon: Layers,
    href: '/category/tacky-panels',
    color: 'bg-green-50 text-green-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png',
  },
  {
    title: 'Ceiling Blankets',
    description: 'Overhead intake filtration',
    icon: Grid3X3,
    href: '/category/ceiling-blankets',
    color: 'bg-purple-50 text-purple-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp',
  },
  {
    title: 'Roll Media',
    description: 'Continuous roll filtration',
    icon: Layers,
    href: '/category/roll-media',
    color: 'bg-orange-50 text-orange-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-roll-blue_a1ff9192.png',
  },
  {
    title: 'Shop by Size',
    description: '20x20, 20x25, custom cuts',
    icon: Ruler,
    href: '/shop-by-size',
    color: 'bg-cyan-50 text-cyan-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids_294ef927.jpg',
  },
  {
    title: 'Shop by Type',
    description: 'Intake, exhaust, MERV-rated',
    icon: Wind,
    href: '/shop-by-type',
    color: 'bg-slate-50 text-slate-600',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/merv-10-filter_b09cab34.png',
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
              <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{cat.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
