import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, ShoppingCart, Phone, Clock, Layers, Wind, Filter as FilterIcon } from 'lucide-react';
import { getBrandBySlug, BOOTH_TYPES, type BoothModel } from '@/data/boothBrands';

interface BrandDetailProps {
  params: { slug: string };
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
          <p className="text-white/50 text-sm mb-8">Select your model to see compatible filter sizes. All sizes available for order.</p>
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
    { key: 'ceiling', label: 'Ceiling / Diffusion Media', icon: Layers, accent: 'text-sky-300', ring: 'bg-sky-500/10 border-sky-500/20' },
    { key: 'intake', label: 'Intake Panels', icon: Wind, accent: 'text-teal-300', ring: 'bg-teal-500/10 border-teal-500/20' },
    { key: 'exhaust', label: 'Exhaust Arrestors', icon: FilterIcon, accent: 'text-blue-300', ring: 'bg-blue-500/10 border-blue-500/20' },
    { key: 'prefilter', label: 'Pre-Filters', icon: FilterIcon, accent: 'text-emerald-300', ring: 'bg-emerald-500/10 border-emerald-500/20' },
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
          const sizes = model.filters[key as keyof typeof model.filters];
          if (!sizes || sizes.length === 0) return null;
          return (
            <div key={key} className={`border rounded-xl p-3 ${ring}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-3.5 w-3.5 ${accent}`} />
                <span className={`text-xs font-semibold ${accent}`}>{label}</span>
              </div>
              <div className="space-y-1">
                {sizes.map((size) => (
                  <Link key={size} href={`/shop?size=${encodeURIComponent(size.replace(/[""]/g, '').replace(/×/g, 'x'))}`}>
                    <span className="block text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
                      {size}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
