/**
 * PFS Outdoor Paint Booths Hub Page
 * Permanent building-style spray booth structures installed outdoors on a concrete pad.
 * Separate from containerized/portable — these are fixed, permitted, permanent installations.
 */

import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/pfs-outdoor-zenith-golden-hour_734e8047.jpg";
const DRIVE_THRU_IMG = "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg";
const LARGE_EQUIP_IMG = "/manus-storage/pfs-outdoor-multi-bay-featured_477be365.jpg";

const CONFIGURATIONS = [
  {
    label: "Standard Outdoor Spray Booths",
    href: "/products/outdoor-booths/standard",
    img: HERO_IMG,
    desc: "Pre-engineered metal building structures with a fully equipped spray booth inside. Installed on a concrete pad outdoors.",
  },
  {
    label: "Drive-Through Outdoor Booths",
    href: "/products/outdoor-booths/drive-through",
    img: DRIVE_THRU_IMG,
    desc: "Outdoor building-style booths with entry and exit doors on both ends for continuous production flow.",
  },
  {
    label: "Large Equipment Outdoor Booths",
    href: "/products/outdoor-booths/large-equipment",
    img: LARGE_EQUIP_IMG,
    desc: "Oversized outdoor structures for painting heavy equipment, trucks, buses, and large industrial parts.",
  },
];

const FEATURES = [
  "Permanent, permitted outdoor installation",
  "Heavy-duty steel building structure",
  "Full spray booth interior with LED lighting",
  "Heated and non-heated options",
  "built with ETL/UL certified components — NFPA 33 compliant",
  "Built-in HVAC and exhaust stacks",
  "Concrete anchor system included",
  "Custom dimensions available",
  "Made in the USA",
];

export default function OutdoorBoothsHub() {
  useSEO({
    title: "Outdoor Spray Booths | Exterior Industrial Paint Booths | PFS",
    description: "PFS outdoor spray booths provide a contained, code-compliant finishing environment for large equipment, rail cars, and structural steel in outdoor settings. Custom sizes, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/outdoor-booths",
  });

  return (
    <div>
      <PageHero
        title="Outdoor Paint Booths"
        subtitle="Permanent building-style spray booth structures installed outdoors — engineered for facilities that need a full finishing environment without adding to their existing building footprint."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Outdoor Paint Booths" }]}
        bgImage={HERO_IMG}
      />

      {/* Intro section */}
      <section style={{ padding: "5rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="section-label">Outdoor Paint Booths</span>
              <h2 className="section-heading">A Full Spray Booth. No Building Required.</h2>
              <p className="section-body">
                PFS outdoor paint booths are permanent, building-style structures — not portable units. Each system consists of a heavy-duty steel metal building with a fully equipped spray booth installed inside, placed on a concrete pad at your facility. This allows you to add a complete finishing environment without expanding your existing building or disrupting current operations.
              </p>
              <p className="section-body mt-4">
                Outdoor booths are ideal for facilities that are land-constrained, need to separate finishing operations from production areas, or are adding capacity without a full building expansion. All systems are built with ETL/UL certified components, NFPA 33 compliant, and designed to meet local building codes.
              </p>
              <Link href="/contact/request-a-quote?from=outdoor-booth">
                <span className="btn-glow mt-6 inline-flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
              </Link>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
              <img src={HERO_IMG} alt="PFS Outdoor Paint Booth" className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
            </div>
          </div>

          {/* Configurations grid */}
          <div className="mb-10">
            <span className="section-label">Configurations</span>
            <h2 className="section-heading">Choose Your Configuration</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {CONFIGURATIONS.map((config) => (
              <Link key={config.label} href={config.href}>
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={config.img} alt={config.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.02em", marginBottom: "0.35rem" }}>
                      {config.label}
                    </h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>
                      {config.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Features */}
          <div className="p-8 mb-8" style={{ backgroundColor: "#f8f8f6", border: "1px solid #e8e8e6" }}>
            <span className="section-label">Standard Features</span>
            <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1C1C1E", letterSpacing: "0.02em", marginBottom: "1.5rem" }}>
              Built for Permanent Outdoor Operation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <CheckCircle2 size={16} style={{ color: "#1B2B4B", marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#333" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outdoor vs. Containerized callout */}
          <div className="p-8 mb-8" style={{ backgroundColor: "#1C1C1E" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Outdoor Paint Booths
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                  Permanent structure. Requires site prep, foundation, and permits. Stays on-site indefinitely. Best for facilities adding permanent capacity.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Shipping Container Paint Booths
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                  Mobile, self-contained unit. Can be relocated. Minimal site prep. Best for remote sites, temporary capacity, or facilities that need flexibility.
                </p>
                <Link href="/products/container-booths">
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#fff", textDecoration: "underline", marginTop: "0.5rem", display: "inline-block" }}>
                    View Shipping Container Booths →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8" style={{ backgroundColor: "#1C1C1E" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Ready to Plan Your Outdoor Booth Installation?
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Our engineers will assess your site, review local codes, and design a system that fits your footprint and process.
                </p>
              </div>
              <Link href="/contact/request-a-quote?from=outdoor-booth">
                <span className="btn-glow flex-shrink-0">Get Pricing <ArrowRight size={14} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
