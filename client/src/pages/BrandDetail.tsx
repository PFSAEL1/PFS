import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, ShoppingCart, Phone, Clock, Layers, Wind, Filter as FilterIcon, ExternalLink } from 'lucide-react';
import { getBrandBySlug, BOOTH_TYPES, type BoothModel } from '@/data/boothBrands';

interface BrandDetailProps {
  params: { slug: string };
}

// Map filter sizes to actual product URLs based on category
function getProductLink(size: string, category: 'ceiling' | 'intake' | 'exhaust' | 'prefilter'): string {
  // Normalize the size for comparison
  const normalized = size.replace(/[""]/g, '"').replace(/×/g, 'x').replace(/'/g, "'");

  if (category === 'exhaust') {
    // Rolls go to the roll product
    if (normalized.includes('300') || normalized.includes('100')) {
      return '/product/20x100x2-22-gram-fiberglass-exhaust-roll-1-cs';
    }
    // Standard pads go to 22-gram pads (most popular)
    return '/product/20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs';
  }

  if (category === 'intake') {
    // Standard intake panels go to 300 Series Tacky
    return '/product/300-series-tacky-filter-panel';
  }

  if (category === 'prefilter') {
    // All prefilters go to MERV 10 pleated
    return '/product/pleated-air-filters-merv-10';
  }

  if (category === 'ceiling') {
    // Map ceiling sizes to specific products
    // Swiss Flow sizes
    const swissFlowSizes = ['36"x108"', '33"x45.5"', '36.75"x54"', '37"x64"', '39"x59"', '40"x100"', '44"x50"', '81"x144"'];
    // L560 Ceiling Diffusion sizes
    const l560Sizes = ['58"x58"', '37"x64"', '36.75"x54"', '48"x66"', '26"x120"', '51"x128"', '60"x120"'];

    // Check if size matches Swiss Flow or L560 variants
    const sizeNorm = normalized.replace(/[""']/g, '').toLowerCase();

    if (sizeNorm.includes('37') && sizeNorm.includes('64')) {
      return '/product/ceiling-diffusion-media';
    }
    if (sizeNorm.includes('51') && sizeNorm.includes('128')) {
      return '/product/ceiling-diffusion-media';
    }
    if (sizeNorm.includes('36.75') && sizeNorm.includes('54')) {
      return '/product/ceiling-diffusion-media';
    }
    if (sizeNorm.includes('48') && sizeNorm.includes('66')) {
      return '/product/ceiling-diffusion-media';
    }

    // For sizes we don't have exact matches for, link to the ceiling category
    // These are the ones the user needs to add as variants
    return '/product/ceiling-diffusion-media';
  }

  return '/shop';
}

// Check if a size has an exact product match
function hasExactMatch(size: string, category: 'ceiling' | 'intake' | 'exhaust' | 'prefilter'): boolean {
  const sizeNorm = size.replace(/[""]/g, '"').replace(/×/g, 'x').replace(/'/g, "'").replace(/[""']/g, '').toLowerCase();

  if (category === 'exhaust') {
    // We have 20x20, 20x25, and rolls up to 41x300
    if (sizeNorm.includes('20') && (sizeNorm.includes('20') || sizeNorm.includes('25'))) return true;
    if (sizeNorm.includes('300') || sizeNorm.includes('100')) return true;
    return true; // We cover all standard exhaust sizes
  }

  if (category === 'intake') {
    // We have 20x20, 20x25, 24x24 in tacky panels
    if (sizeNorm.includes('20') && sizeNorm.includes('20')) return true;
    if (sizeNorm.includes('20') && sizeNorm.includes('25')) return true;
    if (sizeNorm.includes('24') && sizeNorm.includes('24')) return true;
    if (sizeNorm.includes('48')) return false; // 20x48 not available
    return true;
  }

  if (category === 'prefilter') {
    return true; // We have 20x20x2 and 24x24x2 in MERV 10
  }

  if (category === 'ceiling') {
    // Exact matches we have
    if (sizeNorm.includes('37') && sizeNorm.includes('64')) return true;
    if (sizeNorm.includes('51') && sizeNorm.includes('128')) return true;
    if (sizeNorm.includes('36.75') && sizeNorm.includes('54')) return true;
    if (sizeNorm.includes('48') && sizeNorm.includes('66')) return true;
    if (sizeNorm.includes('58') && sizeNorm.includes('58')) return true;
    if (sizeNorm.includes('26') && sizeNorm.includes('120')) return true;
    if (sizeNorm.includes('60') && sizeNorm.includes('120')) return true;
    // Swiss Flow sizes
    if (sizeNorm.includes('36') && sizeNorm.includes('108')) return true;
    if (sizeNorm.includes('33') && sizeNorm.includes('45')) return true;
    if (sizeNorm.includes('39') && sizeNorm.includes('59')) return true;
    if (sizeNorm.includes('40') && sizeNorm.includes('100')) return true;
    if (sizeNorm.includes('44') && sizeNorm.includes('50')) return true;
    if (sizeNorm.includes('81') && sizeNorm.includes('144')) return true;
    // These are NOT available yet:
    // 38x62, 38x107, 38x102, 38x67, 48x108, 59x149, 36x144
    return false;
  }

  return false;
}

export default function BrandDetail({ params }: BrandDetailProps) {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    return (
      <div className="min-h-screen bg-[#040404] text-white">
        <Navigation />
        <div className="pt-32 text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Booth Brand Not Found</h1>
          <p className="text-white/60 mb-6">We couldn't find that booth brand. Try browsing all brands.</p>
          <Link href="/shop-by-booth">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors">
              Browse All Brands
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://pfsfilters.com' },
    { name: 'Shop by Booth', url: 'https://pfsfilters.com/shop-by-booth' },
    { name: brand.name, url: `https://pfsfilters.com/shop-by-booth/${brand.slug}` },
  ]);

  const boothTypes = [...new Set(brand.models.map(m => m.type))];

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title={`${brand.name} Spray Booth Filters — Replacement Ceiling, Intake & Exhaust | PFS Filters`}
        description={`Find replacement filters for ${brand.name} spray booths. We stock ceiling media, intake panels, exhaust arrestors, and pre-filters for all ${brand.name} models including ${brand.models.slice(0, 3).map(m => m.name).join(', ')}.`}
        canonical={`https://pfsfilters.com/shop-by-booth/${brand.slug}`}
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[
            { label: 'Shop by Booth', href: '/shop-by-booth' },
            { label: brand.name },
          ]} />
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              {brand.country && (
                <span className="text-xs bg-white/5 text-white/50 border border-white/10 px-2.5 py-1 rounded-full">{brand.country}</span>
              )}
              {boothTypes.map(t => (
                <span key={t} className="text-xs bg-[#4d9fff]/10 text-[#4d9fff] border border-[#4d9fff]/20 px-2.5 py-1 rounded-full capitalize">
                  {BOOTH_TYPES[t].label}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">
              {brand.name} Booth Filters
            </h1>
            <p className="text-lg text-white/70 max-w-3xl">{brand.description}</p>
            {brand.replacementCycle && (
              <div className="flex flex-wrap gap-4 mt-6">
                {brand.replacementCycle.ceiling && (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    <span>Ceiling: <span className="text-white/70">{brand.replacementCycle.ceiling}</span></span>
                  </div>
                )}
                {brand.replacementCycle.intake && (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    <span>Intake: <span className="text-white/70">{brand.replacementCycle.intake}</span></span>
                  </div>
                )}
                {brand.replacementCycle.exhaust && (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Clock className="h-4 w-4" />
                    <span>Exhaust: <span className="text-white/70">{brand.replacementCycle.exhaust}</span></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Models */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">{brand.name} Models</h2>
          <p className="text-white/50 text-sm mb-8">Click any filter size to go directly to that product. Sizes marked with a call icon require a quote.</p>
          <div className="grid gap-4">
            {brand.models.map((model) => (
              <ModelCard key={model.name} model={model} brandName={brand.name} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="arc-divider arc-divider-down" />
      <section className="section-glow tex-lines py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-[#4d9fff]" /> Ready to Order?
              </h3>
              <p className="text-sm text-white/60 mb-4">Browse our full catalog of filters compatible with your {brand.name} booth.</p>
              <Link href="/shop">
                <button className="w-full px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                  Shop All Filters <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
            <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#4d9fff]" /> Need Help?
              </h3>
              <p className="text-sm text-white/60 mb-4">Not sure which size fits your specific {brand.name} configuration? We'll identify it for you.</p>
              <Link href="/contact">
                <button className="w-full px-5 py-2.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />
      <Footer />
    </div>
  );
}

function ModelCard({ model, brandName }: { model: BoothModel; brandName: string }) {
  const filterCategories = [
    { key: 'ceiling' as const, label: 'Ceiling / Diffusion Media', icon: Layers, accent: 'text-sky-300', ring: 'bg-sky-500/10 border-sky-500/20' },
    { key: 'intake' as const, label: 'Intake Panels', icon: Wind, accent: 'text-teal-300', ring: 'bg-teal-500/10 border-teal-500/20' },
    { key: 'exhaust' as const, label: 'Exhaust Arrestors', icon: FilterIcon, accent: 'text-blue-300', ring: 'bg-blue-500/10 border-blue-500/20' },
    { key: 'prefilter' as const, label: 'Pre-Filters', icon: FilterIcon, accent: 'text-emerald-300', ring: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <div className="border border-white/8 bg-white/[0.03] rounded-2xl p-6 hover:border-white/15 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-white">{brandName} {model.name}</h3>
          <span className="text-xs text-white/40 capitalize">{BOOTH_TYPES[model.type].label} Booth</span>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${
          model.type === 'downdraft' ? 'bg-[#4d9fff]/10 border-[#4d9fff]/20 text-[#4d9fff]' :
          model.type === 'crossdraft' ? 'bg-orange-500/10 border-orange-500/20 text-orange-300' :
          model.type === 'semi-downdraft' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' :
          model.type === 'side-downdraft' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' :
          'bg-white/5 border-white/15 text-white/50'
        }`}>
          {BOOTH_TYPES[model.type].label}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filterCategories.map(({ key, label, icon: Icon, accent, ring }) => {
          const sizes = model.filters[key];
          if (!sizes || sizes.length === 0) return null;
          return (
            <div key={key} className={`border rounded-xl p-3 ${ring}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-3.5 w-3.5 ${accent}`} />
                <span className={`text-xs font-semibold ${accent}`}>{label}</span>
              </div>
              <div className="space-y-1.5">
                {sizes.map((size) => {
                  const hasMatch = hasExactMatch(size, key);
                  const productLink = getProductLink(size, key);

                  if (hasMatch) {
                    return (
                      <Link key={size} href={productLink}>
                        <span className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white cursor-pointer transition-colors group">
                          <ExternalLink className="h-3 w-3 text-white/30 group-hover:text-[#4d9fff] transition-colors" />
                          {size}
                        </span>
                      </Link>
                    );
                  } else {
                    // No exact match — link to contact for a quote
                    return (
                      <Link key={size} href="/contact">
                        <span className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white cursor-pointer transition-colors group" title="Contact us for this size">
                          <Phone className="h-3 w-3 text-white/20 group-hover:text-orange-400 transition-colors" />
                          {size}
                          <span className="text-[10px] text-orange-400/70 ml-auto">Call</span>
                        </span>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
