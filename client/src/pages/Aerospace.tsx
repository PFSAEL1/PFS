import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Plane } from 'lucide-react';
import { ShopifyProducts } from '@/components/ShopifyProducts';

export default function Aerospace() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Aerospace Filters - Industrial Aviation Filtration | PFS Filters"
        description="Aerospace-grade filtration solutions from PFS Filters. HEPA-XFP multi-pocket bag filters, NESHAP 319 final-stage bags, CG100 2-pocket bags, ME/PT intake panels, SFR blankets, and CPA roll media."
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
              High-efficiency filtration media engineered for critical aerospace and cleanroom air handling applications.
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

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
