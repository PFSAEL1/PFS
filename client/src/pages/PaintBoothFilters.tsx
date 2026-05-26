import { useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { MobileHeader } from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Phone, Truck, Package, ShieldCheck, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

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
        "text": "Most standard exhaust pads and intake filters ship same day when ordered before 2:00 PM Pacific from Santa Rosa, CA. California orders arrive next business day. Custom and specialty sizes ship as quoted — call 888-545-7715 for lead times."
      }
    },
    {
      "@type": "Question",
      "name": "What is Subscribe & Save and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set up automatic filter deliveries on your schedule and save 10% on every order. Choose your frequency, we ship on time, you never run out. No contracts — cancel or adjust any time."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know which filter fits my booth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Browse by filter type or booth brand on our site. Not sure? Call 888-545-7715 — we will look up the right filter for your specific booth model and configuration."
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
        "text": "Every 50-100 spray hours in active production, or when visual inspection shows paint loading on more than 75% of the filter face."
      }
    },
    {
      "@type": "Question",
      "name": "Are your filters CARB and OSHA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All filters meet or exceed OSHA and CARB requirements for spray finishing operations. Contact us for specification documentation if needed."
      }
    },
    {
      "@type": "Question",
      "name": "Can I order in bulk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Bulk pricing available for high-volume orders. Call 888-545-7715 to discuss pricing for your facility's volume."
      }
    }
  ]
};

const FAQS = [
  { q: "How fast do filters ship?", a: "Most standard exhaust pads and intake filters ship same day when ordered before 2:00 PM Pacific from Santa Rosa, CA. California orders arrive next business day. Custom and specialty sizes ship as quoted — call 888-545-7715 for lead times." },
  { q: "What is Subscribe & Save and how does it work?", a: "Set up automatic filter deliveries on your schedule and save 10% on every order. Choose your frequency, we ship on time, you never run out. No contracts — cancel or adjust any time." },
  { q: "How do I know which filter fits my booth?", a: "Browse by filter type or booth brand on our site. Not sure? Call 888-545-7715 — we will look up the right filter for your specific booth model and configuration." },
  { q: "Do you cover all booth brands or just PFS?", a: "All major brands — Garmat, Accudraft, GFS, Col-Met, Blowtherm, Nova Verta, Spray Tech, Rohner, Marathon Finishing, all PFS models, and more." },
  { q: "How often should I replace exhaust filters?", a: "Every 50-100 spray hours in active production, or when visual inspection shows paint loading on more than 75% of the filter face." },
  { q: "Are your filters CARB and OSHA compliant?", a: "Yes. All filters meet or exceed OSHA and CARB requirements for spray finishing operations. Contact us for specification documentation if needed." },
  { q: "Can I order in bulk?", a: "Yes. Bulk pricing available for high-volume orders. Call 888-545-7715 to discuss pricing for your facility's volume." },
];

const BRANDS = [
  "PFS — All Models", "Garmat", "Accudraft", "Global Finishing Solutions", "Col-Met",
  "Blowtherm", "Nova Verta", "Spray Tech", "Rohner", "Marathon Finishing"
];

export default function PaintBoothFilters() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <MobileHeader title="Paint Booth Filters" showBack={false} />
      <SEO
        title="Paint Booth Filters — Every Brand, Every Size | Ships Fast | PFS Filters"
        description="Premium paint booth filters for every major brand — exhaust, intake, ceiling, and prefilters. 449 SKUs in stock. Ships fast nationwide from multiple US locations. Most standard filters ship same day. Subscribe and save 10%."
        canonical="https://www.pfsfilters.com/paint-booth-filters"
        structuredData={faqSchema}
      />

      {/* SECTION 1 — HERO */}
      <section className="w-full bg-[#1a2332] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-4 font-semibold">
            Nationwide Shipping · Multiple US Fulfillment Locations · All Major Brands
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Paint Booth Filters for Every Booth, Every Brand — Ships Fast
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            449 SKUs in stock. Most standard exhaust and intake filters ship same day. Ships fast to every state from multiple US locations. Compatible with Garmat, Accudraft, GFS, Col-Met, PFS, and every other major booth brand. Subscribe and save 10%.
          </p>
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["449 SKUs In Stock", "Most Standard Filters Ship Same Day", "Ships Fast Nationwide", "Every Major Booth Brand", "Subscribe & Save 10%"].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">
                <span className="text-green-400">✓</span> {badge}
              </span>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://pfsfilters.com/collections/all" className="inline-block">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg">
                Shop All Filters Now
              </Button>
            </a>
            <a href="tel:+18885457715" className="inline-block">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-lg">
                <Phone className="w-5 h-5 mr-2" /> Call 888-545-7715
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — URGENCY BAR */}
      <section className="w-full bg-orange-500 py-3 px-4">
        <p className="text-center text-white font-semibold text-sm md:text-base">
          Order before 2:00 PM — most standard exhaust and intake filters ship same day | Ships to every state from multiple US locations | Questions? Call 888-545-7715
        </p>
      </section>

      {/* SECTION 3 — STATS BAR */}
      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-orange-500">449</p>
            <p className="text-sm text-gray-500 mt-1">Filter SKUs In Stock</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-orange-500">Same Day</p>
            <p className="text-sm text-gray-500 mt-1">Shipping on Most Standard Filters</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-orange-500">10+</p>
            <p className="text-sm text-gray-500 mt-1">Booth Brands Covered</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-extrabold text-orange-500">10%</p>
            <p className="text-sm text-gray-500 mt-1">Saved with Subscribe & Save</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY PFS FILTERS */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Why Shops Choose PFS Filters
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            One supplier. Every booth brand. Deep stock. Fast shipping from California.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <Package className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">449 SKUs Deep In Stock</h3>
              <p className="text-sm text-gray-600">One of the broadest filter catalogs available — exhaust, intake, ceiling, and prefilters for every major booth brand and configuration. Stop hunting across multiple suppliers.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <Truck className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ships Fast to Every State</h3>
              <p className="text-sm text-gray-600">Multiple fulfillment locations across the US mean your filters arrive fast whether you are in California, Texas, Florida, or anywhere in between. No cross-country delays.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <RefreshCw className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe & Save 10%</h3>
              <p className="text-sm text-gray-600">Set up automatic filter deliveries on your schedule and save 10% on every order. Never run out during production. No contracts — cancel any time.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <ShieldCheck className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Brand Neutral</h3>
              <p className="text-sm text-gray-600">No brand loyalty — we carry filters for all of them. Run Garmat, Accudraft, GFS, and PFS booths in the same shop? One order covers everything.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FILTER TYPES */}
      <section className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Replacement Filters for Every Booth Configuration
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Crossdraft, semi-downdraft, side downdraft, or full downdraft — we stock the right filter for your setup.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-4">Most ships same day</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Exhaust Filters</h3>
              <p className="text-sm text-gray-600 mb-4">Paint arrestors, fiberglass pads, polyester rolls, and paint pockets. Most critical maintenance item — replace every 50-100 spray hours.</p>
              <a href="https://pfsfilters.com/collections/exhaust-filters" className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                Shop Exhaust Filters →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-4">Most ships same day</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Intake Filters</h3>
              <p className="text-sm text-gray-600 mb-4">Tackified panels, fiberglass blankets, and framed glass filters. Clean incoming air means a flawless, contamination-free finish on every job.</p>
              <a href="https://pfsfilters.com/collections/intake-filters" className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                Shop Intake Filters →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2 mt-7">Ceiling Filters</h3>
              <p className="text-sm text-gray-600 mb-4">Downdraft ceiling diffusion media for even laminar airflow from ceiling to floor. Essential for full downdraft booth performance.</p>
              <a href="https://pfsfilters.com/collections/ceiling-filters" className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                Shop Ceiling Filters →
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2 mt-7">Prefilters</h3>
              <p className="text-sm text-gray-600 mb-4">Extend primary exhaust filter life by up to 50%. Highest return-on-investment maintenance upgrade in any spray booth operation.</p>
              <a href="https://pfsfilters.com/collections/prefilters" className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                Shop Prefilters →
              </a>
            </div>
          </div>
          <div className="text-center">
            <a href="https://pfsfilters.com/collections/all">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 rounded-lg">
                Browse All 449 Filter SKUs
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SHIPPING STRIP */}
      <section className="w-full bg-[#2d2d2d] py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <Truck className="w-16 h-16 text-orange-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-2">Ships Fast to Every State — Multiple US Fulfillment Locations</h3>
            <p className="text-gray-300 leading-relaxed">
              Most standard exhaust pads and intake filters ship same day when ordered before 2:00 PM Pacific from Santa Rosa, CA 95403. California orders typically arrive next business day. National orders ship fast — no cross-country warehouse delays. Custom and specialty sizes ship as quoted. Call 888-545-7715 for lead times on non-standard items.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SUBSCRIBE & SAVE */}
      <section className="w-full bg-[#1a2332] py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-3 font-semibold">
            Never Run Out During Production
          </p>
          <span className="inline-block px-4 py-1.5 bg-orange-500 text-white text-sm font-bold rounded-full mb-6">
            Save 10% on Every Order
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Subscribe & Save — Automatic Filter Delivery
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Set up automatic filter deliveries on your schedule and save 10% on every order. Filters show up before you run out — no production interruptions, no emergency orders, no markup.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["10% off every order", "Your schedule, your timing", "No contracts", "Cancel any time", "Free to set up"].map((perk) => (
              <span key={perk} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">
                <span className="text-green-400">✓</span> {perk}
              </span>
            ))}
          </div>
          <a href="https://pfsfilters.com/collections/all">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg">
              Set Up Subscribe & Save →
            </Button>
          </a>
        </div>
      </section>

      {/* SECTION 8 — BRAND COMPATIBILITY */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
            Compatible With Every Major Paint Booth Brand
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Run multiple booth brands in the same facility? One order from PFS Filters covers everything. We carry filters for all major manufacturers — no brand loyalty, no gaps in the catalog.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {BRANDS.map((brand) => (
              <span key={brand} className="px-5 py-2.5 bg-[#1a2332] text-white text-sm font-medium rounded-full">
                {brand}
              </span>
            ))}
          </div>
          {/* Green Callout Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-green-800 mb-2">Own a PFS Spray Booth?</h3>
            <p className="text-green-700">
              PFS Filters stocks the exact replacement filters for every PFS booth model. Ships from the same Santa Rosa facility your booth came from — same team, same standards, fast delivery.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9 — WHEN TO REPLACE */}
      <section className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            When to Replace Your Paint Booth Filters
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Filters protect every component in your booth. A clogged exhaust filter increases static pressure, strains your fan motor, raises energy costs, and shortens equipment life. A loaded intake filter lets contamination into the booth — affecting finish quality and triggering OSHA and CARB compliance risk in California.
          </p>
          <p className="text-gray-700 mb-8 leading-relaxed">
            General replacement guidelines: Exhaust filters every 50-100 spray hours. Intake filters every 2-4 weeks in active production. Prefilters weekly in high-volume environments. When in doubt, call us — 888-545-7715.
          </p>
          {/* Warning Box */}
          <div className="bg-white border-l-4 border-orange-500 rounded-r-xl p-6 shadow-sm mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Replace Now If You See Any of These</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 mt-0.5">●</span> Visible paint buildup or discoloration across the filter face
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 mt-0.5">●</span> Reduced airflow at the exhaust stack or booth floor
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 mt-0.5">●</span> Increased fan noise or rising motor temperature
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 mt-0.5">●</span> Finish defects in recent jobs — dust nibs, contamination, uneven coverage
              </li>
            </ul>
          </div>
          <div className="text-center">
            <a href="https://pfsfilters.com/collections/all">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 rounded-lg">
                Shop Replacement Filters
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="w-full bg-[#1a2332] py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
            One Supplier. Every Filter. Ships Fast.
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            449 SKUs in stock. Most standard filters ship same day. Subscribe and save 10%. Every major booth brand covered.
          </p>
          <a href="https://pfsfilters.com/collections/all" className="inline-block mb-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg">
              Shop All Filters at pfsfilters.com
            </Button>
          </a>
          <p className="text-gray-400">
            Not sure what fits your booth?{' '}
            <a href="tel:+18885457715" className="text-white hover:text-orange-400 underline transition-colors">
              Call 888-545-7715 — we will find it for you
            </a>
          </p>
        </div>
      </section>

      {/* SECTION 11 — FAQ */}
      <section className="w-full bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-base font-semibold text-gray-900 pr-4">{faq.q}</h3>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
