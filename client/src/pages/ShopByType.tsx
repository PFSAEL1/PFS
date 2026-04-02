import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Wind, Filter, Layers, Grid3X3, ArrowRight } from 'lucide-react';
import { MobileHeader } from '@/components/MobileHeader';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Shop by Type', url: 'https://abcfilters.net/shop-by-type' },
]);

const filterTypes = [
  {
    icon: Filter,
    title: 'Fiberglass Paint Arrestors',
    desc: 'The most popular choice for exhaust filtration. Progressive-density glass fiber media captures overspray efficiently. Available in standard and custom sizes.',
    href: '/category/fiberglass-arrestors',
    tags: ['Exhaust', 'High Volume', 'Cost-Effective'],
  },
  {
    icon: Layers,
    title: 'Tacky Panel Filters',
    desc: 'Adhesive-coated filters for superior particle capture. Ideal for intake filtration to keep contaminants out of your booth and protect finish quality.',
    href: '/category/tacky-panels',
    tags: ['Intake', 'High Efficiency', 'Premium'],
  },
  {
    icon: Grid3X3,
    title: 'Ceiling Blankets',
    desc: 'Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor.',
    href: '/category/ceiling-blankets',
    tags: ['Intake', 'Ceiling', 'Downdraft'],
  },
  {
    icon: Wind,
    title: 'Roll Media',
    desc: 'Continuous roll filtration for custom-cut applications. Cut to length for any booth configuration. Available in multiple densities.',
    href: '/category/roll-media',
    tags: ['Custom Cut', 'Flexible', 'Bulk'],
  },
  {
    icon: Filter,
    title: 'MERV-Rated Filters',
    desc: 'High-efficiency filters rated by MERV standard for precise particle capture. Ideal for industrial coating operations with strict air quality requirements.',
    href: '/category/merv-filters',
    tags: ['MERV-10', 'MERV-13', 'Industrial'],
  },
  {
    icon: Layers,
    title: 'Polyester Media',
    desc: 'Durable synthetic filtration media with excellent moisture resistance. Great for high-humidity environments and water-based coatings.',
    href: '/category/polyester-media',
    tags: ['Synthetic', 'Moisture Resistant', 'Durable'],
  },
];

export default function ShopByType() {
  return (
    <div className="min-h-screen safe-bottom">
      <MobileHeader title="Shop by Type" showBack={false} />
      <SEO
        title="Shop Paint Booth Filters by Type - Fiberglass, Tacky, MERV & More"
        description="Browse paint booth filters by type: fiberglass paint arrestors, tacky panel filters, ceiling blankets, roll media, and MERV-rated filters. Find the right filter for your application."
        canonical="https://abcfilters.net/shop-by-type"
        structuredData={breadcrumbSchema}
      />
      <div className="px-4 pt-4 pb-16">
        <Breadcrumb items={[{ label: 'Shop by Type' }]} />
        <div className="text-center mb-12">
          <h1 className="text-[26px] font-bold tracking-tight mb-4">Shop by Filter Type</h1>
          <p className="text-[14px] text-muted-foreground">
            Different positions in your spray booth require different filter types. Browse by category to find the right solution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filterTypes.map((type) => (
            <Link key={type.title} href={type.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                <CardContent className="pt-6">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <type.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{type.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{type.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {type.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Browse Products <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
