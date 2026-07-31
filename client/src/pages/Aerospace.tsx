import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Plane, ArrowRight } from 'lucide-react';
import { ShopifyProducts } from '@/components/ShopifyProducts';
import { Link } from 'wouter';

export default function Aerospace() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Aerospace Paint Booth Filters',
    description: 'Shop aerospace-grade filtration media: HEPA-XFP multi-pocket bag filters, NESHAP 319 final-stage bags, CG100 2-pocket bags, ME/PT intake panels, SFR blankets, and CPA roll media for aircraft finishing and MRO facilities.',
    url: 'https://pfsfilters.com/aerospace',
    provider: {
      '@type': 'Organization',
      name: 'PFS Filters',
      url: 'https://pfsfilters.com',
    },
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Aerospace Paint Booth Filters | HEPA-XFP, NESHAP 319 Bags & MRO Media | PFS Filters"
        description="Shop aerospace-grade paint booth filtration: HEPA-XFP multi-pocket bags, NESHAP 319 final-stage filters, CG100 2-pocket bags, ME/PT intake panels, SFR blankets & CPA roll media. Built for MRO and aircraft finishing."
        canonical="https://pfsfilters.com/aerospace"
        structuredData={structuredData}
      />
      <Navigation />

      {/* Header */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Industries', href: '/industries/aerospace-paint-booth-filters' }, { label: 'Aerospace Filters' }]} />
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Plane className="h-3.5 w-3.5 text-white/80" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Aerospace & MRO Filtration</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-white pfs-heading-animate">Aerospace Paint Booth Filters</h1>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">
              High-efficiency filtration media engineered for aircraft finishing, MRO hangars, and NESHAP-regulated aerospace environments. From ceiling diffusion to multi-stage exhaust capture.
            </p>
            <p className="text-sm text-white/30 max-w-2xl mx-auto mt-3">
              HEPA-XFP™ multi-pocket bags · NESHAP 319 final-stage bags · CG100 2-pocket bags · ME/PT intake panels · SFR blankets · CPA roll media
            </p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Products grid - filtered by "aerospace" */}
      <section className="section-raised tex-dots py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <ShopifyProducts categoryFilter="aerospace" />
        </div>
      </section>

      {/* Cross-link to hub page */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/50 text-sm mb-3">
            Need help selecting the right multi-stage configuration for your facility?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/industries/aerospace-paint-booth-filters">
              <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium hover:gap-2.5 transition-all cursor-pointer">
                Read our Aerospace Filtration Guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link href="/contact">
              <span className="inline-flex items-center gap-1.5 text-white/40 text-sm font-medium hover:text-white/70 transition-colors cursor-pointer">
                Contact Engineering Team
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
