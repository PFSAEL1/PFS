import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, ArrowRight } from 'lucide-react';

// Consumable products data — add new products here as they become available
export const consumableProducts = [
  {
    id: 'pfs-vitra',
    title: 'PFS VITRA',
    subtitle: 'Glass Shield Washable Coating',
    description: 'Professional-grade washable glass shield coating. Protects paint booth windows from overspray buildup. Easy to apply, easy to remove.',
    price: 80.00,
    currency: 'USD',
    image: null, // null = "coming soon" placeholder
    href: '/consumables/pfs-vitra',

    inStock: true,
    badge: 'New',
  },
];

export default function Consumables() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Consumables - Paint Booth Supplies | PFS Filters"
        description="Shop paint booth consumables from PFS Filters. Glass shield coatings, booth maintenance supplies, and more. Professional-grade products for your spray booth."
        canonical="https://pfsfilters.com/consumables"
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Consumables' }]} />
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Package className="h-3.5 w-3.5 text-white/80" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Consumables</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Booth Consumables</h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Professional-grade consumable products for paint booth maintenance and protection.
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Products grid */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {consumableProducts.map((product) => (
              <div key={product.id} className="glow-card group">
                <Link href={product.href}>
                  <div className="product-img-wrap relative aspect-square overflow-hidden cursor-pointer">
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
                </Link>
                <div className="p-4">
                  <Link href={product.href}>
                    <h3 className="font-semibold text-sm leading-tight mb-1 hover:text-blue-400 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-white/40 text-xs mb-2">{product.subtitle}</p>
                  <div className="flex items-center justify-between mt-2 mb-3">
                    <span className="font-bold text-blue-400">
                      ${product.price.toFixed(2)} <span className="text-xs font-normal text-white/70">{product.currency}</span>
                    </span>
                  </div>
                  <Link href={product.href}>
                    <Button
                      size="sm"
                      className="w-full bg-blue-500 text-white hover:bg-blue-500/90 gap-2"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      View Product
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* More coming soon */}
          <div className="mt-12 text-center border border-dashed border-white/10 rounded-2xl p-8">
            <p className="text-white/40 text-sm">More consumable products coming soon.</p>
            <p className="text-white/25 text-xs mt-1">Check back regularly for new additions to our consumables lineup.</p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
