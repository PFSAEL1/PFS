import { useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Plane, Wind, Shield, Wrench, ChevronDown, Phone, ArrowRight } from 'lucide-react';

const LOGO_URL = '/images/brands/pfs-logo-wide.png';

export default function AerospaceHub() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Aerospace Paint Booth Filters & MRO Filtration | PFS Filters"
        description="Premium aerospace paint booth filtration solutions. Shop ceiling diffusion media and request custom multi-stage exhaust systems for MRO and aircraft finishing."
        canonical="https://pfsfilters.com/industries/aerospace-paint-booth-filters"
      />
      <Navigation />

      {/* Hero */}
      <section className="section-darker pt-28 pb-16 px-4 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/3 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <Breadcrumb items={[{ label: 'Industries', href: '#' }, { label: 'Aerospace Paint Booth Filters' }]} />
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
              <Plane className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400/90 uppercase tracking-wider">Aerospace & MRO</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-white pfs-heading-animate leading-tight">
              Aerospace & Aircraft<br className="hidden md:block" /> Paint Booth Filtration
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
              Precision airflow and overspray capture for MROs, aircraft manufacturing, and aerospace finishing facilities. Backed by 30+ years of PFS Spray Booths expertise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="/aerospace">
                <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2 px-8 py-6 text-base font-semibold">
                  Shop Aerospace Filters <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2 px-8 py-6 text-base">
                  <Phone className="h-4 w-4" />
                  Contact for Guidance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Shop by Position — 3 Category Cards */}
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Shop by Filtration Position</h2>
            <p className="text-white/40 max-w-xl mx-auto">Select the stage of your booth's airflow system to find the right media.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Ceiling Diffusion */}
            <Link href="/product/swiss-flow-downdraft-ceiling-diffusion-media-600g-ultra-premium">
              <div className="glow-card group cursor-pointer h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <Wind className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Aerospace Ceiling Diffusion</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    Achieve critical laminar airflow. Shop 600G Ultra-Premium Swiss Flow media for downdraft aircraft booths.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Exhaust & Overspray */}
            <Link href="/category/fiberglass-arrestors">
              <div className="glow-card group cursor-pointer h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Exhaust & Overspray Arrestors</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    High-capacity fiberglass and multi-stage media to protect exhaust plenums during heavy coating applications.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 3: Custom Multi-Stage */}
            <Link href="/contact">
              <div className="glow-card group cursor-pointer h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Custom Multi-Stage & Compliance</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">
                    Need 3-stage NESHAP or Method 319 compliance filters? Our booth engineers will spec the exact system for your facility.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Contact Us <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
          <div>
            <p className="text-2xl font-bold text-white">30+</p>
            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Years Experience</p>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div>
            <p className="text-2xl font-bold text-white">MRO</p>
            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">Facility Ready</p>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div>
            <p className="text-2xl font-bold text-white">Custom</p>
            <p className="text-xs text-white/40 uppercase tracking-wider mt-1">System Design</p>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div>
            <img src={LOGO_URL} alt="PFS Filters" className="h-8 w-auto opacity-50" />
          </div>
        </div>
      </section>

      {/* Progressive Disclosure — Aerospace Guide */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setGuideOpen(!guideOpen)}
            className="w-full flex items-center justify-between px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <span className="text-sm font-semibold text-white/70">Read the full aerospace filtration guide</span>
            <ChevronDown className={`h-5 w-5 text-white/40 transition-transform duration-300 ${guideOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${guideOpen ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="prose prose-invert prose-sm max-w-none px-2">
              <h2 className="text-xl font-bold text-white mb-4">Navigating Aerospace Paint Booth Filtration Requirements</h2>
              <p className="text-white/60 leading-relaxed mb-5">
                Aerospace and MRO (Maintenance, Repair, and Overhaul) facilities face the most stringent finishing environments in the manufacturing sector. Unlike standard automotive booths, aircraft paint spray booths must manage massive volumes of air while capturing specialized coatings, primers, and heavy overspray. Proper aerospace filtration protects both the finish quality of the airframe and the mechanical integrity of the exhaust system.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">The Importance of Laminar Airflow in Aircraft Finishing</h3>
              <p className="text-white/60 leading-relaxed mb-5">
                In downdraft aircraft booths, clean air is introduced through the ceiling. We recommend our Swiss Flow Downdraft Ceiling Diffusion Media (600G Ultra-Premium) for these applications. This high-efficiency intake diffusion media ensures that incoming air is spread evenly across the booth ceiling, eliminating turbulence and preventing microscopic dust from settling on the aircraft surface.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Managing Aerospace Overspray and Exhaust</h3>
              <p className="text-white/60 leading-relaxed mb-5">
                Aerospace coatings often require multi-stage exhaust filtration to manage high volumes of overspray and maintain compliance with local environmental regulations. While single-stage fiberglass arrestors or Paint Pockets capture bulk particulate, many facilities require specialized 3-stage filtration systems. If your facility requires EPA Method 319 testing compliance or specific chromate overspray collection systems, the PFS engineering team will work directly with you to source and size the exact multi-stage filters required.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/aerospace">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600 gap-2">
                    Browse Aerospace Filters <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 gap-2">
                    <Phone className="h-4 w-4" />
                    Contact for Application Guidance
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
