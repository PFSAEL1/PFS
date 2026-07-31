import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { Button } from '@/components/ui/button';
import { Phone, Truck, Package, ShieldCheck, RefreshCw, ChevronDown, ChevronUp, Shield, AlertTriangle } from 'lucide-react';

// FAQ Schema JSON-LD
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast do filters ship?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In-stock standard exhaust pads and intake filters ship fast from multiple US fulfillment locations. Custom and specialty sizes ship as quoted — call 855-496-7969 for lead times."
      }
    },
    {
      "@type": "Question",
      "name": "What is Subscribe & Save?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Automatic filter deliveries on your schedule with 10% off every order. No contracts — cancel or adjust any time."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know which filter fits my booth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Browse by filter type or booth brand on our site. Not sure? Call 855-496-7969 — we will look up the right filter for you."
      }
    },
    {
      "@type": "Question",
      "name": "Do you cover all booth brands or just PFS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All major brands — Garmat, Accudraft, GFS, Col-Met, Blowtherm, Nova Verta, Spray Tech, Rohner, Marathon Finishing, all PFS models, and more."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I replace exhaust filters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every 50-100 spray hours, or when visual inspection shows paint loading on more than 75% of the filter face."
      }
    },
    {
      "@type": "Question",
      "name": "Are your filters CARB and OSHA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All filters meet or exceed OSHA and CARB requirements. Contact us for specification documentation if needed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I order in bulk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Bulk pricing available. Call 855-496-7969 to discuss pricing for your facility's volume."
      }
    }
  ]
};

const FAQS = [
  { q: "How fast do filters ship?", a: "In-stock standard exhaust pads and intake filters ship fast from multiple US fulfillment locations. Custom and specialty sizes ship as quoted — call 855-496-7969 for lead times." },
  { q: "What is Subscribe & Save?", a: "Automatic filter deliveries on your schedule with 10% off every order. No contracts — cancel or adjust any time." },
  { q: "How do I know which filter fits my booth?", a: "Browse by filter type or booth brand on our site. Not sure? Call 855-496-7969 — we will look up the right filter for you." },
  { q: "Do you cover all booth brands or just PFS?", a: "All major brands — Garmat, Accudraft, GFS, Col-Met, Blowtherm, Nova Verta, Spray Tech, Rohner, Marathon Finishing, all PFS models, and more." },
  { q: "How often should I replace exhaust filters?", a: "Every 50-100 spray hours, or when visual inspection shows paint loading on more than 75% of the filter face." },
  { q: "Are your filters CARB and OSHA compliant?", a: "Yes. All filters meet or exceed OSHA and CARB requirements. Contact us for specification documentation if needed." },
  { q: "Can I order in bulk?", a: "Yes. Bulk pricing available. Call 855-496-7969 to discuss pricing for your facility's volume." },
];

const BRANDS = [
  "PFS — All Models", "Garmat", "Accudraft", "Global Finishing Solutions", "Col-Met",
  "Blowtherm", "Nova Verta", "Spray Tech", "Rohner", "Marathon Finishing"
];

export default function PaintBoothFilters() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#040404]">
      <Navigation />
      <SEO
        title="Paint Booth Filters — Every Brand, Every Size | Ships Fast Nationwide | PFS Filters"
        description="Premium paint booth filters for every major brand — exhaust, intake, ceiling, and prefilters. The widest selection of paint booth filters available online. Ships fast nationwide. Subscribe and save 10%."
        canonical="https://www.pfsfilters.com/paint-booth-filters"
        structuredData={faqSchema}
      />

      {/* SECTION 1 — HERO | Navy background */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden bg-[#040404] pt-24">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[hsl(207,50%,8%)] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,153,255,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full text-center">
          {/* Eyebrow badge */}
          <div className="eyebrow-brand inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6">
            <Shield className="w-3.5 h-3.5" />
            Nationwide Shipping · Multiple US Fulfillment Locations · All Major Brands
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Paint Booth Filters for Every Booth, Every Brand —{' '}
            <span className="text-blue-400">Ships Fast</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 leading-relaxed">
            The widest selection of paint booth filters available online. In stock for every major booth brand — exhaust, intake, ceiling, and prefilters. Ships fast to every state from multiple US locations. Subscribe and save 10%.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Extensive Filter Catalog", "In Stock for Every Major Brand", "Ships Fast Nationwide", "Multiple US Locations", "Subscribe & Save 10%"].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/10">
                <span className="text-blue-400">✓</span> {badge}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.pfsfilters.com/shop" className="inline-block">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                Shop All Filters
              </Button>
            </a>
            <a href="tel:+18554967969" className="inline-block">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold text-lg px-8 py-6 rounded-lg bg-transparent">
                <Phone className="w-5 h-5 mr-2" /> Call 855-496-7969
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — URGENCY BAR | Orange background */}
      <section className="w-full bg-orange-500 py-3 px-4">
        <p className="text-center text-white font-semibold text-sm md:text-base">
          In stock for every major booth brand. Ships fast to every state from multiple US locations. Questions? Call 855-496-7969
        </p>
      </section>

      {/* SECTION 3 — STATS BAR */}
      <section className="w-full section-raised py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="stat-number text-2xl md:text-3xl">Widest</p>
            <p className="text-sm text-white/50 mt-2">Selection Online</p>
          </div>
          <div>
            <p className="stat-number text-2xl md:text-3xl">Ships Fast</p>
            <p className="text-sm text-white/50 mt-2">Nationwide</p>
          </div>
          <div>
            <p className="stat-number">10+</p>
            <p className="text-sm text-white/50 mt-2">Booth Brands</p>
          </div>
          <div>
            <p className="stat-number">10%</p>
            <p className="text-sm text-white/50 mt-2">Subscribe & Save</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY PFS FILTERS */}
      <section className="w-full section-darker py-20 px-4">
        <div className="section-divider mb-16" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label"><span>Why PFS Filters</span></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Why Shops Choose PFS Filters
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              One supplier. Every booth brand. Extensive catalog. Fast shipping to every state.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: "Extensive Filter Catalog", desc: "The widest selection of paint booth filters available online — exhaust, intake, ceiling, and prefilters for every major booth brand and configuration." },
              { icon: Truck, title: "Ships Fast to Every State", desc: "Multiple fulfillment locations across the US mean your filters arrive fast whether you are in California, Texas, Florida, or anywhere in between." },
              { icon: RefreshCw, title: "Subscribe & Save 10%", desc: "Set up automatic filter deliveries on your schedule and save 10% on every order. Never run out during production. No contracts — cancel any time." },
              { icon: ShieldCheck, title: "Multi-Brand Neutral", desc: "No brand loyalty. Run Garmat, Accudraft, GFS, and PFS booths in the same shop? One order from PFS Filters covers everything." },
            ].map((item) => (
              <div key={item.title} className="glow-card p-6">
                <div className="glow-icon mb-4">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FILTER TYPES */}
      <section className="w-full section-raised py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label"><span>Product Categories</span></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Replacement Filters for Every Booth Configuration
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Crossdraft, semi-downdraft, side downdraft, or full downdraft — we stock the right filter for your setup.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="glow-card glow-card-accent p-6">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full mb-4 border border-blue-500/20">In stock</span>
              <h3 className="text-lg font-bold text-white mb-2">Exhaust Filters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Paint arrestors, fiberglass pads, polyester rolls, and paint pockets. Most critical maintenance item — replace every 50-100 spray hours.</p>
              <a href="https://www.pfsfilters.com/category/fiberglass-arrestors" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Exhaust Filters →
              </a>
            </div>
            <div className="glow-card glow-card-accent p-6">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full mb-4 border border-blue-500/20">In stock</span>
              <h3 className="text-lg font-bold text-white mb-2">Intake Filters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Tackified panels, fiberglass blankets, and framed glass filters. Clean incoming air means a contamination-free finish on every job.</p>
              <a href="https://www.pfsfilters.com/category/tacky-panels" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Intake Filters →
              </a>
            </div>
            <div className="glow-card p-6">
              <h3 className="text-lg font-bold text-white mb-2 mt-7">Ceiling Filters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Downdraft ceiling diffusion media for even laminar airflow from ceiling to floor. Essential for full downdraft booth performance.</p>
              <a href="https://www.pfsfilters.com/category/ceiling-blankets" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Ceiling Filters →
              </a>
            </div>
            <div className="glow-card p-6">
              <h3 className="text-lg font-bold text-white mb-2 mt-7">Prefilters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Extend primary exhaust filter life by up to 50%. Highest return-on-investment maintenance upgrade available.</p>
              <a href="https://www.pfsfilters.com/category/pre-filters" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Prefilters →
              </a>
            </div>
          </div>
          <div className="text-center">
            <a href="https://www.pfsfilters.com/shop">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Shop All Filters
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SHIPPING STRIP | Dark background */}
      <section className="w-full section-darker py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="glow-icon flex-shrink-0 w-16 h-16">
            <Truck className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-2">Ships Fast to Every State — Multiple US Fulfillment Locations</h3>
            <p className="text-white/50 leading-relaxed">
              Our supplier network spans multiple locations across the United States — your filters ship fast whether you are in California, Texas, Florida, New York, or anywhere in between. In-stock standard exhaust pads and intake filters ship fast. Custom and specialty sizes ship as quoted. Call 855-496-7969 for lead times on non-standard items.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SUBSCRIBE & SAVE | Navy background */}
      <section className="w-full section-glow-bg py-20 px-4 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="section-label mx-auto"><span>Never Run Out During Production</span></div>
          <span className="inline-block px-4 py-1.5 bg-blue-500 text-white text-sm font-bold rounded-full mb-6 mt-4">
            Save 10% on Every Order
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Subscribe & Save — Automatic Filter Delivery
          </h2>
          <p className="text-lg text-white/60 mb-8 leading-relaxed">
            Set up automatic filter deliveries on your schedule and save 10% on every order. Filters show up before you run out — no production interruptions, no emergency orders, no markup.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["10% off every order", "Your schedule", "No contracts", "Cancel any time", "Free to set up"].map((perk) => (
              <span key={perk} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/10">
                <span className="text-blue-400">✓</span> {perk}
              </span>
            ))}
          </div>
          <a href="https://www.pfsfilters.com/memberships">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              Set Up Subscribe & Save →
            </Button>
          </a>
        </div>
      </section>

      {/* SECTION 8 — BRAND COMPATIBILITY */}
      <section className="w-full section-raised py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label"><span>Compatible Products</span></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Compatible With Every Major Paint Booth Brand
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Run multiple booth brands in the same facility? One order from PFS Filters covers everything. We carry filters for all major manufacturers — no brand loyalty, no gaps in the catalog.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {BRANDS.map((brand) => (
              <span key={brand} className="px-5 py-2.5 bg-white/5 text-white text-sm font-medium rounded-full border border-white/10 hover:border-blue-500/40 transition-colors">
                {brand}
              </span>
            ))}
          </div>
          {/* Green Callout Box */}
          <div className="glow-card p-6 max-w-2xl mx-auto border-l-4 border-l-green-500">
            <h3 className="text-lg font-bold text-green-400 mb-2">Own a PFS Spray Booth?</h3>
            <p className="text-white/60">
              PFS Filters is the dedicated filter store for Platinum Finishing Systems booths. We stock the exact replacement filters for every PFS model — ships fast from multiple US locations.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9 — WHEN TO REPLACE */}
      <section className="w-full section-darker py-20 px-4">
        <div className="section-divider mb-16" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="section-label"><span>Maintenance Guide</span></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              When to Replace Your Paint Booth Filters
            </h2>
          </div>
          <p className="text-white/60 mb-4 leading-relaxed">
            Filters protect every component in your booth. A clogged exhaust filter increases static pressure, strains your fan motor, raises energy costs, and shortens equipment life. A loaded intake filter lets contamination into the booth — affecting finish quality and triggering OSHA and CARB compliance risk.
          </p>
          <p className="text-white/60 mb-8 leading-relaxed">
            General guidelines: Exhaust filters every 50-100 spray hours. Intake filters every 2-4 weeks in active production. Prefilters weekly in high-volume environments. When in doubt, call 855-496-7969.
          </p>
          {/* Warning Box */}
          <div className="glow-card border-l-4 border-l-orange-500 p-6 mb-10">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Replace Now If You See Any of These
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60">
                <span className="text-orange-400 mt-0.5">●</span> Visible paint buildup or discoloration across the filter face
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <span className="text-orange-400 mt-0.5">●</span> Reduced airflow at the exhaust stack or booth floor
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <span className="text-orange-400 mt-0.5">●</span> Increased fan noise or rising motor temperature
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <span className="text-orange-400 mt-0.5">●</span> Finish defects — dust nibs, contamination, or uneven coverage
              </li>
            </ul>
          </div>
          <div className="text-center">
            <a href="https://www.pfsfilters.com/shop">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Shop Replacement Filters
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA | Navy background */}
      <section className="w-full section-glow-bg py-20 px-4 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            One Supplier. Every Filter.{' '}
            <span className="text-orange-400">Ships Fast.</span>
          </h2>
          <p className="text-lg text-white/60 mb-8">
            In stock for every major booth brand. Ships fast nationwide. Subscribe and save 10%.
          </p>
          <a href="https://www.pfsfilters.com/shop" className="inline-block mb-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Shop All Filters at pfsfilters.com
            </Button>
          </a>
          <p className="text-white/40">
            Not sure what fits your booth?{' '}
            <a href="tel:+18554967969" className="text-blue-400 hover:text-blue-300 underline transition-colors">
              Call 855-496-7969 — we will find it for you
            </a>
          </p>
        </div>
      </section>

      {/* SECTION 11 — FAQ */}
      <section className="w-full section-darker py-20 px-4">
        <div className="section-divider mb-16" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label"><span>FAQ</span></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-base font-semibold text-white pr-4">{faq.q}</h3>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-white/60 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyMobileCTA />
      <Footer />
    </div>
  );
}
