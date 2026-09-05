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
        "text": "Stocked items typically process in 1–2 business days. Custom, specialty, freight, and backordered items may require additional time; confirm the current product page or contact PFS Filters for an order-specific estimate."
      }
    },
    {
      "@type": "Question",
      "name": "What is Subscribe & Save?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eligible products can be purchased on a monthly Shopify subscription with 5% off. The subscription terms must be shown and confirmed at checkout, and customers can manage eligible subscriptions through the Shopify account portal."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know which filter fits my booth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Confirm the booth manufacturer and model, filter position, and actual dimensions. Browse by filter type or booth brand, then contact PFS Filters when a part number or fitment detail needs review."
      }
    },
    {
      "@type": "Question",
      "name": "Do you cover all booth brands or just PFS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PFS Filters provides catalog and replacement guidance for PFS and multiple major booth brands, including Garmat, Accudraft, GFS, Col-Met, and Blowtherm. Compatibility depends on the booth model, stage, and dimensions."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I replace exhaust filters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no universal replacement interval. Follow the booth and filter manufacturer instructions, differential-pressure or manometer readings, operating conditions, coating load, and documented visual inspections."
      }
    },
    {
      "@type": "Question",
      "name": "Does buying a filter make a booth CARB or OSHA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No filter by itself makes a facility compliant. Compliance depends on the complete booth, ventilation, operating conditions, coating process, maintenance, permits, and applicable rules. Request product documentation and consult a qualified professional for your facility."
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
  { q: "How fast do filters ship?", a: "Stocked items typically process in 1–2 business days. Custom, specialty, freight, and backordered items may require additional time; confirm the current product page or contact PFS Filters for an order-specific estimate." },
  { q: "What is Subscribe & Save?", a: "Eligible products can be purchased on a monthly Shopify subscription with 5% off. The subscription terms must be shown and confirmed at checkout, and customers can manage eligible subscriptions through the Shopify account portal." },
  { q: "How do I know which filter fits my booth?", a: "Confirm the booth manufacturer and model, filter position, and actual dimensions. Browse by filter type or booth brand, then contact PFS Filters when a part number or fitment detail needs review." },
  { q: "Do you cover all booth brands or just PFS?", a: "PFS Filters provides catalog and replacement guidance for PFS and multiple major booth brands, including Garmat, Accudraft, GFS, Col-Met, and Blowtherm. Compatibility depends on the booth model, stage, and dimensions." },
  { q: "How often should I replace exhaust filters?", a: "There is no universal replacement interval. Follow the booth and filter manufacturer instructions, differential-pressure or manometer readings, operating conditions, coating load, and documented visual inspections." },
  { q: "Does buying a filter make a booth CARB or OSHA compliant?", a: "No filter by itself makes a facility compliant. Compliance depends on the complete booth, ventilation, operating conditions, coating process, maintenance, permits, and applicable rules. Request product documentation and consult a qualified professional for your facility." },
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
        title="Paint Booth Filters by Type, Size & Booth | PFS Filters"
        description="Browse paint booth intake, ceiling, prefilter, and exhaust media by type, size, and booth brand. Get sizing help and monthly 5% Subscribe & Save on eligible products."
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
            Nationwide Ordering · Standard and Custom Options · Sizing Help
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Paint Booth Filters for Intake, Ceiling,{' '}
            <span className="text-blue-400">Prefilter & Exhaust Stages</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 leading-relaxed">
            Browse current filter media and replacement options by booth position, size, and manufacturer guidance. Confirm dimensions before ordering; eligible products offer monthly Subscribe & Save with 5% off.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Intake and Exhaust Media", "Common Sizes and Multi-Size Products", "Stocked Items Typically Process in 1–2 Days", "Custom Requests Reviewed", "Eligible Subscriptions Save 5%"].map((badge) => (
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
          Stocked items typically process in 1–2 business days. Custom, freight, and special-order timing varies. Questions? Call 855-496-7969.
        </p>
      </section>

      {/* SECTION 3 — STATS BAR */}
      <section className="w-full section-raised py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="stat-number text-2xl md:text-3xl">Intake</p>
            <p className="text-sm text-white/50 mt-2">Ceiling & Prefilter</p>
          </div>
          <div>
            <p className="stat-number text-2xl md:text-3xl">Exhaust</p>
            <p className="text-sm text-white/50 mt-2">Arrestors & Media</p>
          </div>
          <div>
            <p className="stat-number">10+</p>
            <p className="text-sm text-white/50 mt-2">Booth Brands</p>
          </div>
          <div>
            <p className="stat-number">5%</p>
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
              Focused product categories, current catalog data, and help when fitment needs review.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: "Focused Filter Catalog", desc: "Compare intake, ceiling, prefilter, exhaust, roll-media, and accessory products using current catalog variants and availability." },
              { icon: Truck, title: "Clear Fulfillment Guidance", desc: "Stocked items typically process in 1–2 business days. Custom, freight, special-order, and backordered items may require additional time." },
              { icon: RefreshCw, title: "Monthly Subscribe & Save 5%", desc: "Eligible products can be purchased on a monthly Shopify subscription with 5% off when the selling plan is shown and confirmed at checkout." },
              { icon: ShieldCheck, title: "Multi-Brand Guidance", desc: "Browse by major booth manufacturer, then verify the model, filter stage, dimensions, and product record before ordering." },
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
              Compare Filters by Booth Position
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Start with intake, ceiling, prefilter, or exhaust, then confirm the media, actual dimensions, and booth configuration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="glow-card glow-card-accent p-6">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full mb-4 border border-blue-500/20">Exhaust media</span>
              <h3 className="text-lg font-bold text-white mb-2">Exhaust Filters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Paint arrestors, fiberglass pads, roll media, and paint pockets for overspray-capture stages. Follow the booth and filter manufacturer inspection guidance.</p>
              <a href="https://www.pfsfilters.com/category/fiberglass-arrestors" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Exhaust Filters →
              </a>
            </div>
            <div className="glow-card glow-card-accent p-6">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full mb-4 border border-blue-500/20">Intake media</span>
              <h3 className="text-lg font-bold text-white mb-2">Intake Filters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Tackified panels, blankets, and pleated options used in incoming-air and prefilter positions. Confirm the specified media and airflow direction.</p>
              <a href="https://www.pfsfilters.com/category/tacky-panels" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Intake Filters →
              </a>
            </div>
            <div className="glow-card p-6">
              <h3 className="text-lg font-bold text-white mb-2 mt-7">Ceiling Filters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Ceiling diffusion media used to distribute incoming air in downdraft and semi-downdraft booth configurations.</p>
              <a href="https://www.pfsfilters.com/category/ceiling-blankets" className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Shop Ceiling Filters →
              </a>
            </div>
            <div className="glow-card p-6">
              <h3 className="text-lg font-bold text-white mb-2 mt-7">Prefilters</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">First-stage prefilters capture larger particles before downstream filtration. Use only where the booth or equipment documentation specifies the stage.</p>
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
            <h3 className="text-xl font-bold text-blue-400 mb-2">Fulfillment Timing by Product and Order Type</h3>
            <p className="text-white/50 leading-relaxed">
              Stocked items typically process in 1–2 business days. Custom, specialty, freight, backordered, and special-order items may require additional time. Review the current product page or call 855-496-7969 for an order-specific estimate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SUBSCRIBE & SAVE | Navy background */}
      <section className="w-full section-glow-bg py-20 px-4 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="section-label mx-auto"><span>Never Run Out During Production</span></div>
          <span className="inline-block px-4 py-1.5 bg-blue-500 text-white text-sm font-bold rounded-full mb-6 mt-4">
            Save 5% on Eligible Monthly Orders
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Subscribe & Save — Automatic Filter Delivery
          </h2>
          <p className="text-lg text-white/60 mb-8 leading-relaxed">
            Eligible products can be purchased on a monthly Shopify subscription with 5% off. The subscription term and discount appear at checkout only when Shopify confirms a valid selling plan.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["5% off eligible products", "Monthly recurrence", "Confirmed at checkout", "Managed through Shopify", "One-time purchase remains available"].map((perk) => (
              <span key={perk} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/10">
                <span className="text-blue-400">✓</span> {perk}
              </span>
            ))}
          </div>
          <a href="https://www.pfsfilters.com/shop">
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
              Browse Guidance for Major Paint Booth Brands
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Use the manufacturer guide as a starting point, then confirm the booth model, filter stage, and actual dimensions. Contact PFS when a part number or configuration needs review.
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
              PFS Filters is backed by the PFS Spray Booths team. For a PFS booth, send the model, serial or tag information, filter position, and dimensions so the replacement can be reviewed before ordering.
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
            Loaded or damaged filters can affect booth airflow and finish quality. Inspect each filter stage, record relevant pressure or manometer readings, and follow the booth and filter manufacturer instructions for your process.
          </p>
          <p className="text-white/60 mb-8 leading-relaxed">
            There is no universal replacement interval. Timing depends on coating load, operating hours, airflow, filter media, booth design, manufacturer limits, permit conditions, and documented inspections. When in doubt, call 855-496-7969.
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
                <span className="text-orange-400 mt-0.5">●</span> Pressure or manometer readings outside the manufacturer’s recommended range
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
            Find the Correct Filter Stage.{' '}
            <span className="text-orange-400">Confirm the Fit.</span>
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Browse current products, verify dimensions and booth position, or ask PFS to review a custom or hard-to-find request.
          </p>
          <a href="https://www.pfsfilters.com/shop" className="inline-block mb-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Shop All Filters at pfsfilters.com
            </Button>
          </a>
          <p className="text-white/40">
            Not sure what fits your booth?{' '}
            <a href="tel:+18554967969" className="text-blue-400 hover:text-blue-300 underline transition-colors">
              Call 855-496-7969 — we will help review the details
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
