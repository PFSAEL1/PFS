/**
 * PFS Shipping Container Paint Booths Hub Page
 * ISO shipping container converted into a fully equipped spray booth.
 * Mobile, self-contained, deployable anywhere — no building permit required in many jurisdictions.
 */

import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/pfs-container-booth-real_9967_410e0f4f.jpg";
const CONTAINER_40FT_IMG = "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg";
const CONTAINER_HC_IMG = "/manus-storage/pfs-render-outdoor-booth_cac6c545.jpg";
const CONTAINER_REAL_IMG = "/manus-storage/container_IMG_9966_615f74aa.jpg";

const CONFIGURATIONS = [
  {
    label: "20-Foot Container Booth",
    href: "/products/container-booths/20ft",
    img: HERO_IMG,
    desc: "Compact 20-ft ISO container converted to a fully equipped spray booth. Ideal for small parts, touch-up, and remote job sites.",
  },
  {
    label: "40-Foot Container Booth",
    href: "/products/container-booths/40ft",
    img: CONTAINER_40FT_IMG,
    desc: "Full-size 40-ft container booth for vehicles, large parts, and production-level finishing operations.",
  },
  {
    label: "High-Cube Container Booth",
    href: "/products/container-booths/high-cube",
    img: CONTAINER_HC_IMG,
    desc: "9.5-ft interior height for tall vehicles, Sprinter vans, and oversized equipment.",
  },
  {
    label: "Shipping Container Spray Booth",
    href: "/products/container-booths/shipping-container",
    img: CONTAINER_REAL_IMG,
    desc: "manufactured in the USA with ETL/UL listed components, self-contained spray booth inside a standard ISO container — no building required. Cross-flow airflow, UL 508A controls, heated option available.",
  },
];

const FEATURES = [
  "Standard ISO shipping container base",
  "Fully equipped spray booth interior",
  "LED lighting throughout",
  "Intake and exhaust filtration system",
  "Air supply plenum and exhaust stack",
  "Explosion-proof electrical",
  "built with ETL/UL certified components — NFPA 33 compliant",
  "Deployable by forklift or crane",
  "Lockable for secure storage",
  "Available heated or non-heated",
  "Minimal site prep required",
  "Made in the USA",
];

const USE_CASES = [
  { title: "Remote Job Sites", body: "Deploy a complete spray booth to any location — oil fields, military bases, construction sites, or remote facilities — without building infrastructure." },
  { title: "Temporary Capacity", body: "Add finishing capacity during peak production without committing to a permanent structure. Relocate or remove when the project is complete." },
  { title: "Disaster Recovery", body: "Get a collision repair shop or fleet facility back in operation quickly after a fire, flood, or equipment failure." },
  { title: "International Shipping", body: "Ship a complete spray booth anywhere in the world using standard container logistics — no special freight required." },
  { title: "Government & Military", body: "Self-contained, deployable finishing capability for forward operating bases, depots, and field maintenance operations." },
  { title: "Fleet & Rental Operations", body: "Maintain a mobile finishing capability that moves with your fleet operations or rental equipment business." },
];

export default function ContainerBoothsHub() {
  useSEO({
    title: "Container Spray Booths | Portable Industrial Paint Booths | PFS",
    description: "PFS container spray booths deliver a portable, self-contained finishing solution for remote sites, military operations, and temporary production needs. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/container-booths",
  });

  return (
    <div>
      <PageHero
        title="Shipping Container Paint Booths"
        subtitle="A complete, professional spray booth built inside a standard ISO shipping container — mobile, self-contained, and deployable anywhere in the world."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Shipping Container Paint Booths" }]}
        bgImage={HERO_IMG}
      />

      {/* Intro section */}
      <section style={{ padding: "5rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="section-label">Shipping Container Paint Booths</span>
              <h2 className="section-heading">A Professional Spray Booth. Anywhere.</h2>
              <p className="section-body">
                PFS shipping container paint booths are standard ISO intermodal containers — 20-ft or 40-ft — fully converted into professional spray booths. The interior is outfitted with LED lighting, intake and exhaust filtration, an air supply plenum, explosion-proof electrical, and a control panel. The result is a complete, built with ETL/UL certified components spray booth that can be placed anywhere a container can be delivered.
              </p>
              <p className="section-body mt-4">
                Unlike permanent outdoor booths, container booths require no foundation, no building permit in most jurisdictions, and no permanent site modification. They can be relocated by forklift or crane, shipped internationally using standard container logistics, or stacked for multi-unit configurations.
              </p>
              <Link href="/contact/request-a-quote?from=container-booth">
                <span className="btn-glow mt-6 inline-flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
              </Link>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
              <img src={HERO_IMG} alt="PFS Shipping Container Paint Booth" className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
            </div>
          </div>

          {/* Configurations */}
          <div className="mb-10">
            <span className="section-label">Configurations</span>
            <h2 className="section-heading">Available Sizes & Configurations</h2>
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

          {/* Use Cases */}
          <div className="mb-10">
            <span className="section-label">Applications</span>
            <h2 className="section-heading">Where Container Booths Excel</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="p-6" style={{ border: "1px solid #e8e8e6", backgroundColor: "#fafaf8" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1C1C1E", marginBottom: "0.5rem" }}>
                  {uc.title}
                </h4>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.7 }}>
                  {uc.body}
                </p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="p-8 mb-8" style={{ backgroundColor: "#f8f8f6", border: "1px solid #e8e8e6" }}>
            <span className="section-label">Standard Features</span>
            <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1C1C1E", letterSpacing: "0.02em", marginBottom: "1.5rem" }}>
              Everything Included. Ready to Spray.
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

          {/* CTA */}
          <div className="p-8" style={{ backgroundColor: "#1C1C1E" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Need a Spray Booth You Can Ship Anywhere?
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Tell us your container size, application, and location. We'll spec a complete system ready to deploy.
                </p>
              </div>
              <Link href="/contact/request-a-quote?from=container-booth">
                <span className="btn-glow flex-shrink-0">Get Pricing <ArrowRight size={14} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
