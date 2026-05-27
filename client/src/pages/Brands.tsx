import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Award } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Brands', url: 'https://pfsfilters.com/brands' },
]);

const brands = [
  {
    name: 'PFS Filters',
    description: 'Our house brand — engineered specifically for spray booth applications with decades of PFS expertise. Offers the best value for professional body shops.',
    specialty: 'Spray Booth Specialists',
    href: '/shop',
  },
  {
    name: 'Andover Healthcare',
    description: 'Premium fiberglass and synthetic filter media for industrial and automotive applications. Known for consistent quality and long service life.',
    specialty: 'Industrial Grade Media',
    href: '/shop',
  },
  {
    name: 'Koch Filter',
    description: 'MERV-rated air filtration products for high-efficiency applications. Ideal for shops with strict air quality requirements.',
    specialty: 'MERV-Rated Filters',
    href: '/shop',
  },
  {
    name: 'Permatron',
    description: 'Electrostatic and synthetic filter media with excellent particle capture efficiency. Great for intake filtration in demanding environments.',
    specialty: 'Electrostatic Media',
    href: '/shop',
  },
];

export default function Brands() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Paint Booth Filter Brands - PFS Filters, Koch, Permatron & More"
        description="Shop paint booth filters from trusted brands including PFS Filters, Koch Filter, Permatron, and Andover Healthcare. All products quality-tested for spray booth applications."
        canonical="https://pfsfilters.com/brands"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <Breadcrumb items={[{ label: 'Brands' }]} />
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 mb-4">
            <Award className="h-3.5 w-3.5 text-white/50" />
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Trusted Brands</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Filter Brands We Carry</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            We partner with industry-leading manufacturers to bring you the best paint booth filtration products available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {brands.map((brand) => (
            <div key={brand.name} className="border border-white/8 bg-[#0d0d0d] hover:border-white/20 hover:bg-white/3 transition-all duration-300 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-bold text-xl text-white">{brand.name}</h2>
                <span className="text-xs bg-white/5 text-white/50 border border-white/10 px-2 py-1 rounded-full">{brand.specialty}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{brand.description}</p>
              <Link href={brand.href}>
                <Button variant="outline" size="sm" className="gap-2 border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent">
                  Shop Products <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
