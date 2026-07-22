import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Plane, Phone, Package } from 'lucide-react';

// Aerospace filter products — add new products here
export const aerospaceProducts = [
  // Add products here as they become available, e.g.:
  // {
  //   id: 'hepa-aerospace-filter',
  //   title: 'HEPA Aerospace Filter',
  //   subtitle: 'High-efficiency particulate air filter',
  //   description: 'Precision-engineered HEPA filter for aerospace applications.',
  //   image: null,
  //   badge: 'New',
  // },
];

export default function Aerospace() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Aerospace Filters - Industrial Aviation Filtration | PFS Filters"
        description="Aerospace-grade filtration solutions from PFS Filters. High-performance filters for aviation and aerospace applications. Contact us for pricing."
        canonical="https://pfsfilters.com/aerospace"
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Aerospace Filters' }]} />
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Plane className="h-3.5 w-3.5 text-white/80" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Aerospace</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Aerospace Filters</h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              High-performance filtration solutions for aviation and aerospace applications. Contact us for custom quotes and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Products grid */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          {aerospaceProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {aerospaceProducts.map((product) => (
                <div key={product.id} className="glow-card group">
                  <div className="product-img-wrap relative aspect-square overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded-full">
                        {product.badge}
                      </span>
                    )}
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                          <Package className="h-8 w-8 text-white/20" />
                        </div>
                        <p className="text-white/30 text-sm font-medium">Image Coming Soon</p>
                        <img
                          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent_e33888bf.png"
                          alt="PFS Filters"
                          className="w-20 opacity-15 mt-4"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-white/40 text-xs mb-2">{product.subtitle}</p>
                    <div className="flex items-center justify-between mt-2 mb-3">
                      <span className="font-bold text-white/60 text-sm">
                        Call for Price
                      </span>
                    </div>
                    <Link href="/contact">
                      <Button
                        size="sm"
                        className="w-full bg-blue-500 text-white hover:bg-blue-500/90 gap-2"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call for Price
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Coming soon state when no products are listed yet */
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Plane className="h-12 w-12 text-white/20" />
              </div>
              <h2 className="text-2xl font-bold text-white/80 mb-3">Aerospace Filters Coming Soon</h2>
              <p className="text-white/40 max-w-lg mx-auto mb-8">
                We're expanding our product line to include aerospace-grade filtration solutions. Contact us for current availability and custom quotes.
              </p>
              <Link href="/contact">
                <Button className="bg-blue-500 text-white hover:bg-blue-500/90 gap-2 px-8 py-6 text-base">
                  <Phone className="h-5 w-5" />
                  Contact Us for Pricing
                </Button>
              </Link>
            </div>
          )}

          {/* Contact CTA */}
          {aerospaceProducts.length > 0 && (
            <div className="mt-12 text-center border border-dashed border-white/10 rounded-2xl p-8">
              <p className="text-white/50 text-sm mb-3">Need a custom aerospace filtration solution?</p>
              <Link href="/contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
