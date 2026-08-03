/**
 * PFS Cross-Flow Booths — Full Lineup Hub
 * All cross-flow configurations: Standard Orion, Heated, Truck/Large Equipment,
 * Sprinter Van, Drive-Through, and Custom Oversized.
 * Route: /products/paint-booths/crossflow-all
 */

import { Link } from "wouter";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

// CDN images
const HERO_VIDEO     = "/manus-storage/crossflow-hero_5b011231.mp4";         // MP4 hero — Orion crossflow render
const ORION_GREY_IMG = "/manus-storage/pfs-orion-card-grey_dc159104.jpg";   // 3/4 view, grey bg
const CROSSFLOW_V3   = "/manus-storage/orion-crossflow-render-v3_4837ad69.webp"; // Orion crossflow epoxy v3 render
const SPRINTER_IMG   = "/manus-storage/img_0814_sprinter_van_c044176c.jpg"; // Real sprinter van in booth
const HEATED_IMG     = "/manus-storage/img_0917_heated_0ba418a1.jpg";        // Real heated booth
const TRUCK_CF_RENDER = "/manus-storage/orion-truck-crossflow-render_57425bd5.webp"; // Orion truck crossflow render
const TRUCK_CF_REAL  = "/manus-storage/truck-crossflow-real-angled_64504e75.jpg";  // Real PFS cross-flow truck booth
const CONTAINER_IMG  = "/manus-storage/pfs-container-booth-real_9967_410e0f4f.jpg";

const CONFIGS = [
  {
    label: "Standard Cross-Flow — Orion Series",
    badge: "Most Popular",
    href: "/products/paint-booths/crossflow",
    img: ORION_GREY_IMG,
    desc: "Horizontal airflow from front intake filters to rear exhaust filters. ETL listed, UL 508A certified. Available in 9, 10, and 12 ft heights. Ships nationally.",
    specs: ["9 / 10 / 12 ft heights", "ETL & ETL-C Listed", "UL 508A Control Panel", "Made in the USA"],
    cta: "VIEW ORION SERIES",
    live: true,
  },
  {
    label: "Heated Cross-Flow Booth",
    badge: "Spray · Flash · Bake",
    href: "/products/paint-booths/heated-booth",
    img: HEATED_IMG,
    desc: "All the benefits of the Orion cross-flow with an integrated heating system — programmable spray, flash, and bake modes. Reduces cure times and improves finish quality in cold climates.",
    specs: ["Integrated heating system", "Spray / Flash / Bake modes", "Programmable cycle timers", "ETL & UL 508A Certified"],
    cta: "GET PRICING",
    live: true,
  },
  {
    label: "Sprinter Van & High-Clearance Cross-Flow",
    badge: "Fleet Ready",
    href: "/products/paint-booths/sprinter-van-booth",
    img: SPRINTER_IMG,
    desc: "Extended height cross-flow booth designed for Sprinter vans, box trucks, and high-roof vehicles. Same horizontal airflow as the Orion — scaled up for fleet and commercial applications.",
    specs: ["Extended height clearance", "Drive-through option", "Fleet & commercial use", "Custom sizing available"],
    cta: "GET PRICING",
    live: true,
  },
  {
    label: "Truck & Large Equipment Cross-Flow",
    badge: "Heavy Industry",
    href: "/products/paint-booths/truck-booths",
    img: TRUCK_CF_RENDER,
    desc: "Oversized cross-flow configurations for semi-trucks, heavy equipment, agricultural machinery, and industrial components. Custom-engineered to your equipment dimensions.",
    specs: ["Custom width & height", "Semi-truck clearance", "Heavy equipment rated", "Engineered to spec"],
    cta: "GET PRICING",
    live: true,
  },
  {
    label: "Shipping Container Cross-Flow Booth",
    badge: "Portable · Weatherproof",
    href: "/products/paint-booths/container-booth",
    img: CONTAINER_IMG,
    desc: "Cross-flow spray booth built inside a standard ISO shipping container. Fully self-contained, weatherproof, and deployable anywhere — ideal for remote job sites, military, and temporary facilities.",
    specs: ["ISO container-based", "Fully self-contained", "Deployable anywhere", "Remote & military use"],
    cta: "GET PRICING",
    live: true,
  },
  {
    label: "Custom & Oversized Cross-Flow",
    badge: "Built to Spec",
    href: "/contact/request-a-quote",
    img: CROSSFLOW_V3,
    desc: "Non-standard dimensions, special materials, or unique airflow requirements? PFS engineers custom cross-flow booths from the ground up — any size, any configuration.",
    specs: ["Any dimension", "Special materials available", "Custom airflow engineering", "Factory direct pricing"],
    cta: "GET PRICING",
    live: true,
  },
];

export default function CrossFlowAllPage() {
  useSEO({
    title: "Cross-Flow Spray Booths | All Crossdraft Configurations | PFS",
    description: "PFS cross-flow spray booths are available in standard and custom configurations for automotive, industrial, and touch-up applications. Simple installation, no pit or raised floor required, ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/cross-flow",
  });

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>

      {/* HERO — MP4 video */}
      <section style={{ position: "relative", height: "60vh", minHeight: 400, overflow: "hidden" }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 clamp(1.5rem,5vw,5rem) clamp(2rem,5vh,4rem)" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, color: "rgba(255,255,255,0.7)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <Link href="/products" style={{ color: "inherit", textDecoration: "none" }}>Products</Link>
            <ChevronRight size={12} />
            <Link href="/products/paint-booths" style={{ color: "inherit", textDecoration: "none" }}>Paint Booths</Link>
            <ChevronRight size={12} />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Cross-Flow Booths</span>
          </nav>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.7rem,1.5vw,0.85rem)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            PAINT BOOTHS — ENCLOSED
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Cross-Flow<br />Spray Booths
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.9rem,1.8vw,1.1rem)", maxWidth: 560, margin: "0 0 24px", lineHeight: 1.5 }}>
            The most cost-effective enclosed booth configuration. Horizontal airflow, ETL listed, ships nationally. Six configurations for every application.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="tel:8885457715" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "12px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              <Phone size={14} /> CALL (888) 545-7715
            </a>
            <Link href="/products/paint-booths/crossflow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "12px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.5)" }}>
              VIEW ORION SERIES <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CERT STRIP */}
      <section style={{ background: "#1e3a6e", padding: "18px clamp(1.5rem,5vw,5rem)" }}>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          {["ETL & ETL-C Listed", "UL 508A Control Panel", "NFPA 33 Compliant", "Made in the USA", "Ships Nationally"].map(tag => (
            <span key={tag} style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* CONFIGURATIONS GRID */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>FULL LINEUP</p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 12px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Every Cross-Flow Configuration
          </h2>
          <p style={{ color: "#4a5568", fontSize: "1rem", maxWidth: 600, margin: "0 0 48px", lineHeight: 1.6 }}>
            From standard automotive shops to oversized heavy equipment facilities — PFS builds a cross-flow booth for every application, budget, and footprint.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
            {CONFIGS.map((cfg) => (
              <Link key={cfg.label} href={cfg.href} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{ background: "#fff", border: "1px solid #e2e8f0", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
                >
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <img src={cfg.img} alt={cfg.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    {!cfg.live && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "6px 16px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>COMING SOON</span>
                      </div>
                    )}
                    {cfg.badge && (
                      <div style={{ position: "absolute", top: 12, left: 12, background: "#1e3a6e", color: "#fff", padding: "4px 10px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {cfg.badge}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px 24px 24px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0d1b2e", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.02em", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif" }}>
                      {cfg.label}
                    </h3>
                    <p style={{ color: "#4a5568", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 16px" }}>{cfg.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                      {cfg.specs.map(s => (
                        <span key={s} style={{ background: "#f1f5f9", color: "#1e3a6e", fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", letterSpacing: "0.05em" }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {cfg.cta} <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: "#0d1b2e", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem)", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>NOT SURE WHICH CONFIGURATION IS RIGHT?</p>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 900, margin: "0 0 16px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
          Talk to a PFS Specialist
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.6 }}>
          We'll help you choose the right cross-flow configuration for your shop size, throughput, and budget. No pressure, just answers.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:8885457715" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
            <Phone size={14} /> CALL (888) 545-7715
          </a>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)" }}>
            REQUEST A QUOTE <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, display: "flex", background: "#0d1b2e", borderTop: "1px solid rgba(255,255,255,0.1)" }} className="md:hidden">
        <a href="tel:8885457715" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "rgba(255,255,255,0.8)", padding: "14px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
          <Phone size={14} /> (888) 545-7715
        </a>
        <Link href="/contact" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "14px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
          GET PRICING <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
