/**
 * PFS Enclosed Paint Booths Sub-Page
 * Shows all enclosed booth airflow configurations as clickable cards:
 * Cross-Flow, Semi-Downdraft, Full Downdraft, Side Downdraft, Heated, Non-Heated, Sprinter Van / High-Clearance
 * Drive-Through is featured as a configuration option note, not a separate card.
 */

import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO = "/manus-storage/pfs-enclosed-tesla-hero_9c110001.mp4";
const HERO_IMG   = "/manus-storage/pfs-zenith-tesla-source_c7c540fe.jpg"; // poster fallback
const HEATED_IMG = "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg";
const CROSSFLOW_IMG = "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp"; // Real PFS cross-flow booth — shop floor with teal filter doors
const SEMI_DD_IMG = "/manus-storage/orion-semi-down-epoxy_9144ba19.png";
const FULL_DD_IMG    = "/manus-storage/zenith_angle_epoxy_cc380a7d_3247b846.webp";
const RAISED_BM_IMG  = "/manus-storage/PFS_Zenith_FullDD_Front_Epoxy_v2_1a902210.png";
const SIDE_DD_IMG = "/manus-storage/helios_front_v27_epoxy_dbe93c9f.png";
const SPRINTER_IMG = "/manus-storage/pfs-sprinter-van-mercedes-clean_84aa20f4.jpg";
const TRUCKS_IMG      = "/manus-storage/pfs-truck-booth-card_a0d45884_fca2d2cb.jpeg";
const DOUBLE_WALL_IMG = "/manus-storage/pfs-double-wall-booth-v2_8cdb7a24.webp";

const CONFIGURATIONS = [
  {
    label: "Cross-Flow Booths",
    href: "/products/paint-booths/crossflow",
    img: CROSSFLOW_IMG,
    imgPos: "center 50%",   // render is landscape, centered works
    badge: "Most Common",
    desc: "Horizontal airflow from front intake filters to rear exhaust filters. Cost-effective, easy to install, ideal for automotive refinishing and general industrial applications.",
    specs: ["Horizontal airflow", "Front intake / rear exhaust", "Most economical option", "Ideal for auto body shops"],
  },
  {
    label: "Semi-Downdraft Booths",
    href: "/products/paint-booths/semi-downdraft",
    img: SEMI_DD_IMG,
    imgPos: "center 45%",   // epoxy render — show booth body
    badge: null,
    desc: "Air enters from the ceiling at the front half and exhausts through floor-level filters at the rear. Better overspray control than cross-flow with lower cost than full downdraft.",
    specs: ["Ceiling intake at front half", "Rear floor-level exhaust", "Better finish quality than cross-flow", "Mid-range cost"],
  },
  {
    label: "Full Downdraft Booths",
    href: "/products/paint-booths/full-downdraft",
    img: FULL_DD_IMG,
    imgPos: "center 40%",   // interior shot — show grated floor and PFS logo
    badge: "Best Finish Quality",
    desc: "Air flows vertically downward from a full ceiling plenum and exhausts through a full raised grated floor. The cleanest airflow pattern available — preferred for premium automotive, aerospace, and high-end industrial finishing.",
    specs: ["Full ceiling plenum intake", "Full raised grated floor exhaust", "Cleanest airflow pattern", "Preferred for premium finishes"],
  },
  {
    label: "Side Downdraft Booths — Helios Series",
    href: "/products/paint-booths/side-downdraft",
    img: SIDE_DD_IMG,
    imgPos: "center 45%",
    badge: "No Pit Required",
    desc: "Air enters from the ceiling and exhausts through side wall fan plenums. No concrete pit, no raised floor — drop it on your existing slab. Ideal for retrofit and leased facilities.",
    specs: ["Ceiling intake", "Side wall fan plenum exhaust", "No pit required", "Slab-on-grade ready"],
  },
  {
    label: "Heated Paint Booths",
    href: "/products/paint-booths/heated",
    img: HEATED_IMG,
    imgPos: "center 55%",   // Zenith Tesla — show car and PFS logo
    badge: null,
    desc: "Any airflow configuration with an integrated heating system for accelerated cure cycles. Reduces cycle times and improves finish quality in cold climates.",
    specs: ["Integrated heating system", "Spray, flash, and bake modes", "Programmable temperature control", "Reduces cure cycle time"],
  },
  {
    label: "Downdraft Raised Basement Booths",
    href: "/products/paint-booths/downdraft-raised-basement",
    img: RAISED_BM_IMG,
    imgPos: "center 40%",
    badge: "No Pit Required",
    desc: "Full downdraft airflow on a raised steel floor — no concrete pit needed. Air exhausts through a raised grated floor into a below-floor plenum, then out the exhaust stack. Ideal for existing slabs.",
    specs: ["Full ceiling plenum intake", "Raised steel floor — no pit", "Below-floor plenum exhaust", "Ideal for existing concrete slabs"],
  },
  {
    label: "Sprinter Van & High-Clearance Booths",
    href: "/products/paint-booths/sprinter-van",
    img: SPRINTER_IMG,
    imgPos: "center 50%",
    badge: "11–12 ft Interior Height",
    desc: "Enclosed booths with 11–12 ft interior height specifically designed for Sprinter vans, high-roof cargo vans, and tall commercial vehicles. Full-length LED lighting and downdraft airflow for complete coverage.",
    specs: ["11–12 ft interior height", "Full-length LED wall lighting", "Downdraft airflow for vans", "Ideal for fleet refinishing"],
  },
  {
    label: "Double-Wall Paint Booths",
    href: "/products/paint-booths/double-wall",
    img: DOUBLE_WALL_IMG,
    imgPos: "center 50%",
    badge: "NFPA 33 Construction",
    desc: "Double-wall 20-gauge steel panels with 2\" rock wool insulation between skins. Non-combustible construction meets the intent of NFPA 33 — no exposed flanges, smooth cleanable interior, rigid insulated wall assembly.",
    specs: ["Double-wall 20-gauge steel", "2\" rock wool insulation core", "Non-combustible construction", "NFPA 33 compliant assembly"],
  },
  {
    label: "Trucks & Large Equipment Booths",
    href: "/products/paint-booths/truck-booths",
    img: TRUCKS_IMG,
    imgPos: "center 30%",
    badge: "Custom Sizing Available",
    desc: "Oversized enclosed booths engineered for semi-trucks, heavy equipment, buses, and large industrial machinery. Custom widths, heights, and lengths available — built to your vehicle dimensions.",
    specs: ["Custom width, height & length", "Semi-trucks, buses & heavy equipment", "Drive-through configuration available", "ETL listed — all sizes"],
  },
  {
    label: "Wash Booths",
    href: "/products/paint-booths/wash-booth",
    img: "/manus-storage/pfs-wash-booth-man-washing_86c386b9.png",
    imgPos: "center 50%",
    badge: "Surface Preparation",
    desc: "Controlled wash environments for manual cleaning and surface preparation before powder coating or liquid paint application. Open-face or enclosed with floor drain.",
    specs: ["Open-face or enclosed design", "Floor drain for wash runoff", "ETL listed — NFPA 33 compliant", "Compatible with oven dry-off"],
  },
  {
    label: "Outdoor Paint Booths",
    href: "/products/outdoor-booths",
    img: "/manus-storage/pfs-outdoor-hero-8143_9d49ac36.jpg",
    imgPos: "center 40%",
    badge: "No Building Required",
    desc: "Permanent steel building structure installed on a concrete pad — a complete outdoor finishing environment with no facility expansion needed. ETL listed, NFPA 33 compliant, ships nationally.",
    specs: ["Permanent engineered steel structure", "ETL listed & NFPA 33 compliant", "Heated & non-heated options", "Ships to all 50 states"],
  },
];

export default function EnclosedBoothsPage() {
  useSEO({
    title: "Enclosed Spray Booths | Downdraft, Semi-Downdraft & Cross-Flow | PFS",
    description: "PFS manufactures a complete line of enclosed spray booths — full downdraft, semi-downdraft, side downdraft, and cross-flow configurations. All booths built with ETL/UL listed and certified components. Custom sizes available. Factory-direct from Santa Rosa, CA.",
    canonical: "/products/spray-booths/enclosed",
  });

  return (
    <div>
      {/* ── FULL-BLEED HERO — Cinematic video background (matches Aerospace/Industrial pattern) ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(420px, 70vh, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <video preload="auto"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
         
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "#1B3A6B", zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            PRODUCTS / PAINT BOOTHS
          </span>
          <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>
            Enclosed Paint Booths
          </h1>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px" }}>
            Full-enclosure spray booths in every airflow configuration — cross-flow, semi-downdraft, full downdraft, side downdraft, heated, and high-clearance for Sprinter vans.
          </p>
          <Link href="/contact/request-a-quote?from=enclosed-booth">
            <span className="btn-glow">GET PRICING <ArrowRight size={16} /></span>
          </Link>
        </div>
      </section>

      <section style={{ padding: "5rem 0", backgroundColor: "#fff" }}>
        <div className="container">

          {/* Intro */}
          <div className="mb-12 max-w-3xl">
            <span className="section-label">Enclosed Paint Booths</span>
            <h2 className="section-heading">Choose Your Airflow Configuration</h2>
            <p className="section-body">
              PFS enclosed paint booths provide complete containment for overspray, VOCs, and airborne particles. All models are ETL-certified to NFPA 33 and OSHA standards. The right airflow configuration depends on your application, finish quality requirements, and facility constraints — our engineers will help you choose.
            </p>
          </div>

          {/* Configuration cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {CONFIGURATIONS.map((config) => (
              <Link key={config.label} href={config.href}>
                <div className="product-card group h-full" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="overflow-hidden relative" style={{ height: "220px" }}>
                    <img src={config.img} alt={config.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: config.imgPos || "center 50%" }} />
                    {config.badge && (
                      <div style={{
                        position: "absolute", top: "10px", left: "10px",
                        backgroundColor: "#1B2B4B", color: "white",
                        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em",
                        padding: "3px 8px", textTransform: "uppercase"
                      }}>
                        {config.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-5" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.02em", marginBottom: "0.4rem" }}>
                      {config.label}
                    </h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6, marginBottom: "0.75rem", flex: 1 }}>
                      {config.desc}
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                      {config.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-1.5">
                          <CheckCircle2 size={12} style={{ color: "#1B2B4B", flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.72rem", color: "#444" }}>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Drive-Through note */}
          <div className="p-6 mb-10 flex gap-4 items-start" style={{ backgroundColor: "#f0f4ff", border: "1px solid #d0d8f0" }}>
            <Info size={20} style={{ color: "#3355aa", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1C1C1E", marginBottom: "0.25rem" }}>
                Drive-Through Configuration Available
              </p>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.83rem", color: "#444", lineHeight: 1.7 }}>
                Any enclosed booth configuration above can be built as a drive-through — with entry and exit doors on both ends. Drive-through is a configuration option, not a separate product line. It's ideal for fleet shops, bus and truck body facilities, and high-volume production lines where reversing vehicles is not practical. Ask your PFS engineer to include this in your quote.
              </p>
            </div>
          </div>

          {/* Airflow comparison table */}
          <div className="mb-10">
            <span className="section-label">Quick Reference</span>
            <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1C1C1E", letterSpacing: "0.02em", marginBottom: "1rem" }}>
              Airflow Configuration Comparison
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1C1C1E", color: "white" }}>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600 }}>Configuration</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600 }}>Airflow Direction</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600 }}>Finish Quality</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600 }}>Cost</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600 }}>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Cross-Flow", direction: "Horizontal (front → rear)", quality: "Good", cost: "$", best: "Auto body, general industrial" },
                    { name: "Semi-Downdraft", direction: "Diagonal (ceiling → rear floor)", quality: "Very Good", cost: "$$", best: "Automotive, light industrial" },
                    { name: "Full Downdraft", direction: "Vertical (ceiling → full floor)", quality: "Excellent", cost: "$$$", best: "Premium automotive, aerospace" },
                    { name: "Side Downdraft", direction: "Ceiling → side walls", quality: "Very Good", cost: "$$", best: "Retrofit, no pit available" },
                    { name: "Sprinter Van / High-Clearance", direction: "Downdraft, 11–12 ft height", quality: "Excellent", cost: "$$$", best: "Sprinter vans, tall vehicles" },
                  ].map((row, i) => (
                    <tr key={row.name} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8f8f6", borderBottom: "1px solid #e8e8e6" }}>
                      <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#1C1C1E" }}>{row.name}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#444" }}>{row.direction}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#444" }}>{row.quality}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#444" }}>{row.cost}</td>
                      <td style={{ padding: "0.75rem 1rem", color: "#444" }}>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8" style={{ backgroundColor: "#1C1C1E" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Not Sure Which Configuration Is Right for You?
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Our engineers will review your application, throughput, and facility constraints and recommend the right configuration.
                </p>
              </div>
              <Link href="/contact/request-a-quote?from=enclosed-booth">
                <span className="btn-glow flex-shrink-0">Get Pricing <ArrowRight size={14} /></span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
