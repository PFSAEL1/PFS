/**
 * BlastingBoothPage.tsx
 * Dedicated page for Blasting Booths and Reclaim Blasting Booths.
 * Features: collapsible component specs, collapsible typical sizes, Goliath Series badge,
 * featured product image, gallery, and original PFS-voice copy.
 *
 * Design: PFS Industrial — dark steel, Chakra Petch headers, Archivo Narrow body.
 */

import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Phone, CheckCircle2 } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import PageHero from "@/components/PageHero";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1B2B4B";
const BLUE_LIGHT = "#2a4a8a";

// ── Images ────────────────────────────────────────────────────────────────────
const BLASTING_HERO   = "/manus-storage/pfs-blast-booth-interior_cf77951a.png";
const RECLAIM_HERO    = "/manus-storage/pfs-blast-reclaim-unit_d0656341.png";
const FEATURED_BLAST  = "/manus-storage/pfs-blast-systems2-gallery_01c11421.png";
const FEATURED_RECLAIM = "/manus-storage/pfs-blast-reclaim-unit_d0656341.png";

const BLAST_GALLERY = [
  "/manus-storage/pfs-blast-systems2-gallery_01c11421.png",
  "/manus-storage/pfs-blast-booth-interior_cf77951a.png",
  "/manus-storage/pfs-blast-reclaim-unit_d0656341.png",
  "/manus-storage/pfs-blast-booth-door_d3afcc3c.jpg",
  "/manus-storage/pfs-blast-heic1_c23a30a9.jpg",
  "/manus-storage/pfs-blast-heic2_82efda1f.jpg",
  "/manus-storage/pfs-blast-heic3_5967fbd4.jpg",
  "/manus-storage/pfs-blast-heic4_68457c3f.jpg",
];

const RECLAIM_GALLERY = [
  "/manus-storage/pfs-blast-reclaim-unit_d0656341.png",
  "/manus-storage/pfs-blast-systems2-gallery_01c11421.png",
  "/manus-storage/pfs-blast-booth-interior_cf77951a.png",
  "/manus-storage/pfs-blast-booth-door_d3afcc3c.jpg",
  "/manus-storage/pfs-blast-heic1_c23a30a9.jpg",
  "/manus-storage/pfs-blast-heic2_82efda1f.jpg",
  "/manus-storage/pfs-blast-heic3_5967fbd4.jpg",
  "/manus-storage/pfs-blast-heic4_68457c3f.jpg",
];

// ── Collapsible accordion component ──────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid #e2e8f0`,
      borderRadius: "2px",
      marginBottom: "0.5rem",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 1.1rem",
          background: open ? BLUE : "#f8f9fa",
          border: "none",
          cursor: "pointer",
          transition: "background 0.15s",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: open ? "#fff" : BLUE,
        }}>
          {title}
        </span>
        {open
          ? <ChevronUp size={16} color={open ? "#fff" : BLUE} />
          : <ChevronDown size={16} color={BLUE} />
        }
      </button>
      {open && (
        <div style={{ padding: "1rem 1.1rem", background: "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Typical sizes data ────────────────────────────────────────────────────────
const TYPICAL_SIZES = [
  { w: 10, d: 10, h: 10 }, { w: 10, d: 10, h: 9 },
  { w: 12, d: 10, h: 10 }, { w: 12, d: 10, h: 9 },
  { w: 14, d: 10, h: 10 }, { w: 14, d: 10, h: 9 },
  { w: 14, d: 24, h: 10 }, { w: 14, d: 24, h: 9 },
  { w: 14, d: 27, h: 10 },
  { w: 16, d: 10, h: 10 }, { w: 16, d: 24, h: 10 },
  { w: 18, d: 10, h: 10 }, { w: 18, d: 24, h: 10 },
];

function SizesAccordion() {
  return (
    <Accordion title="Typical Standard Sizes">
      <p style={{
        fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
        fontSize: "0.82rem",
        color: "#555",
        lineHeight: 1.6,
        marginBottom: "0.85rem",
      }}>
        Standard widths run 10, 12, 14, 16, and 18 ft — with depths and heights to match most production footprints. Need something outside this range? Call us — custom sizing is our specialty.
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "0.4rem",
        marginBottom: "0.85rem",
      }}>
        {TYPICAL_SIZES.map((s) => (
          <div key={`${s.w}x${s.d}x${s.h}`} style={{
            background: "#f4f6fa",
            border: "1px solid #e2e8f0",
            borderRadius: "2px",
            padding: "0.4rem 0.7rem",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: BLUE,
            letterSpacing: "0.06em",
            textAlign: "center",
          }}>
            {s.w}′ × {s.d}′ × {s.h}′
          </div>
        ))}
      </div>
      <div style={{
        background: "#1a1a1a",
        padding: "0.75rem 1rem",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        <span style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.8)",
        }}>
          Need a custom footprint? We build to your dimensions.
        </span>
        <Link href="/contact/request-a-quote?from=blast-booth">
          <span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={11} /></span>
        </Link>
      </div>
    </Accordion>
  );
}

// ── Component spec sections ───────────────────────────────────────────────────
const BLAST_COMPONENTS = [
  {
    title: "Control Panel",
    items: [
      "Single-point electrical connection — available in 208V, 230V, or 460V three-phase",
      "NEMA-rated enclosure for industrial environments",
      "Magnetic motor starters with start/stop controls",
      "Fused disconnects for each motor circuit",
      "Dedicated light switch and system status indicators",
      "Safety door interlocks with adjustable delay timer",
      "Door-mount disconnect switch",
      "24VDC low-voltage power supply for blast system controls",
      "UL 508A certified panel fabrication",
    ],
  },
  {
    title: "Ductwork",
    items: [
      "Galvanized steel construction rated for high-velocity abrasive media dust",
      "Designed specifically for the installation location and application",
      "Long-radius elbows for optimized airflow and reduced turbulence",
      "Clamp-together sections with adjustable sleeves for versatile layout and easy installation",
      "Heavy-duty construction designed for demanding blast environments",
    ],
    note: "Optional: heavier-wall ductwork available for high-abrasion media applications — ask about upgrade options.",
  },
  {
    title: "Blast Machine (Optional — Available Through PFS)",
    items: [
      "6 cubic foot pressure vessel — standard configuration",
      "Pressure-hold remote control system for operator safety",
      "24VDC low-voltage controls throughout blast room circuit",
      "Heavy-duty cast iron metering and deadman valves",
      "50-foot blast hose with couplings included",
      "Blast nozzle included",
    ],
    note: "The blast machine is sold separately — the booth enclosure, ductwork, and control panel are the base system. We carry a full line of blast machines and can source the right unit for your media type and production volume. Prefer to source your own? No problem — our booths are compatible with all major blast machine manufacturers.",
  },
  {
    title: "Enclosure Construction",
    items: [
      "Galvanized steel panels with structural reinforcement",
      "Pre-punched, companion-flanged panel system for efficient field assembly",
      "T8 LED light fixtures with polycarbonate protective lens",
      "Blast shields on intake and exhaust vents to contain media within the enclosure",
      "Door limit switches shut down blast air when booth doors are opened",
      "All UL and manufactured in the USA with ETL/UL listed components components used throughout",
      "Designed to comply with applicable OSHA and NFPA regulations",
    ],
  },
];

const BLAST_OPTIONS = [
  "Heavier-wall steel panels for high-abrasion applications (optional upgrade)",
  "Rubber wall and door liner (¼-inch thick) for sound attenuation",
  "Dust collection system — cartridge or baghouse style",
  "Rubber roll-up doors for large-part access",
  "Inside-access light fixtures with blast-rated covers",
  "Crane openings with code-compliant framing",
  "Custom booth dimensions to fit your production footprint",
  "Pressurized ventilation configurations",
];

const RECLAIM_COMPONENTS = [
  {
    title: "Media Reclaim System — Mechanical (Bucket Elevator)",
    items: [
      "Floor-sweep recovery system captures spent media at the blast floor",
      "Bucket elevator lifts recovered media to the classifier",
      "Air-wash separator, vibrating screen, or rotary drum classifier removes fines and broken-down media",
      "Clean, classified media returned to the blast machine hopper",
      "Designed for high-production environments and heavy media volumes",
    ],
  },
  {
    title: "Media Reclaim System — Pneumatic (Vacuum)",
    items: [
      "Vacuum recovery system draws spent media from the blast floor",
      "Cyclone separator recovers reusable media",
      "Dust collector captures fines and broken-down media for disposal",
      "Compact footprint — well-suited for lightweight media and smaller operations",
    ],
  },
  {
    title: "Control Panel & Electrical",
    items: [
      "Single-point electrical connection — 208V, 230V, or 460V three-phase",
      "NEMA-rated enclosure",
      "Magnetic motor starters with start/stop controls",
      "Fused disconnects for each motor circuit",
      "Safety door interlocks with adjustable delay timer",
      "24VDC low-voltage controls for blast system",
      "UL 508A certified panel fabrication",
    ],
  },
  {
    title: "Enclosure Construction",
    items: [
      "Galvanized steel panels with structural reinforcement",
      "Pre-punched, companion-flanged panel system for field assembly",
      "T8 LED light fixtures with polycarbonate lens",
      "Blast shields on intake and exhaust vents",
      "Door limit switches shut down blast air on door open",
      "All UL and manufactured in the USA with ETL/UL listed components components used throughout",
      "Designed to comply with applicable OSHA and NFPA regulations",
    ],
  },
];

// ── Sidebar component ─────────────────────────────────────────────────────────
function Sidebar({ featuredImage, relatedHref, relatedLabel }: {
  featuredImage: string;
  relatedHref: string;
  relatedLabel: string;
}) {
  return (
    <div>
      <div style={{ marginBottom: "1.5rem", overflow: "hidden", border: "1px solid #e8e8e6" }}>
        <img
          src={featuredImage}
          alt="PFS Goliath Series Blasting Booth"
          style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 280 }}
        />
      </div>
      <div style={{ backgroundColor: "#f8f8f6", border: "1px solid #e8e8e6", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h4 style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "0.8rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#1a1a1a", marginBottom: "1rem",
        }}>
          Quick Links
        </h4>
        {[
          { label: relatedLabel, href: relatedHref },
          { label: "Get Pricing", href: "/contact/request-a-quote" },
          { label: "Service & Support", href: "/service" },
          { label: "View All Products", href: "/products" },
        ].map((link) => (
          <Link key={link.label} href={link.href}>
            <div className="flex items-center justify-between py-2.5 group" style={{ borderBottom: "1px solid #ebebeb", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444" }} className="group-hover:text-[#1B2B4B]">
                {link.label}
              </span>
              <ArrowRight size={12} style={{ color: BLUE }} />
            </div>
          </Link>
        ))}
      </div>
      <div style={{ backgroundColor: "#1a1a1a", padding: "1.5rem" }}>
        <h4 style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "1rem", fontWeight: 700,
          color: "#ffffff", marginBottom: "0.5rem",
        }}>
          Need Help Specifying?
        </h4>
        <p style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: "0.8rem", color: "rgba(255,255,255,0.75)",
          lineHeight: 1.6, marginBottom: "1rem",
        }}>
          Our engineers will help you select the right booth size, media type, and reclaim configuration for your application.
        </p>
        <Link href="/contact/request-a-quote?from=blast-booth">
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#ffffff", borderBottom: "2px solid rgba(255,255,255,0.4)",
            paddingBottom: "2px", cursor: "pointer",
          }}>
            GET PRICING <ArrowRight size={12} />
          </span>
        </Link>
      </div>
    </div>
  );
}

// ── BLASTING BOOTHS PAGE ──────────────────────────────────────────────────────
export function BlastingBoothsPage() {
  useSEO({
    title: "Sandblast Booth Systems | Blast Rooms for Industrial Applications | PFS",
    description: "PFS sandblast booth systems prevent blast media from escaping while protecting workers and the workspace. 11-gauge galvanized steel panels, T8 LED lighting, rubber roll-up doors, crane openings available. OSHA and NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/blast-systems/blasting-booths",
  });

  return (
    <div>
      <PageHero
        title="Blasting Booths"
        subtitle="Enclosed abrasive blast rooms engineered for surface preparation, rust removal, and coating adhesion — built to your production footprint."
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Blasting Systems", href: "/products/blast-systems" },
          { label: "Blasting Booths" },
        ]}
        bgVideo="/manus-storage/pfs-blast-booth-hero_fe206ed9.mp4"
        bgPoster={BLASTING_HERO}
        overlayOpacity={0.35}
        ctaPricingHref="/contact/request-a-quote"
      />

      {/* ── Main content ── */}
      <section style={{ padding: "3rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">

              {/* Series badge */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "rgba(27,43,75,0.08)", border: "1px solid rgba(27,43,75,0.2)",
                color: BLUE, borderRadius: "2px",
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.68rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "0.28rem 0.75rem", marginBottom: "0.75rem",
              }}>
                PFS GOLIATH SERIES
              </span>

              <span className="section-label">Blasting Systems</span>
              <h2 className="section-heading">Blasting Booths</h2>
              <p className="section-body" style={{ marginBottom: "1.5rem" }}>
                PFS Goliath Series blast rooms are fully enclosed, purpose-built environments for abrasive blasting operations. Each booth is designed to contain media, protect operators, and capture dust — keeping your facility clean and your team safe. Whether you're blasting structural steel, heavy equipment, aerospace components, or production parts, we size and configure each booth to match your workflow.
              </p>

              {/* Core features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Fully enclosed blast environment",
                  "Compatible with all abrasive media types",
                  "High-efficiency dust collection",
                  "UL and manufactured in the USA with ETL/UL listed components components throughout",
                  "Built to OSHA and NFPA standards",
                  "Custom sizing available",
                  "Galvanized steel construction",
                  "T8 LED lighting with polycarbonate lens",
                  "Safety door interlocks with delay timer",
                  "Ships nationally — installed by PFS",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} style={{ color: BLUE, flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#444", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/contact/request-a-quote?from=blast-booth">
                  <span className="btn-glow">Request a Quote <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:8885457715">
                  <span className="btn-outline">Call (888) 545-7715</span>
                </a>
              </div>

              {/* Typical sizes — collapsible */}
              <h3 style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.78rem", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: BLUE, marginBottom: "0.6rem",
              }}>
                Typical Sizes
              </h3>
              <SizesAccordion />

              {/* Component specs — collapsible */}
              <h3 style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.78rem", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: BLUE, marginBottom: "0.6rem", marginTop: "1.5rem",
              }}>
                Standard Components
              </h3>
              {BLAST_COMPONENTS.map((section) => (
                <Accordion key={section.title} title={section.title}>
                  <ul style={{ margin: 0, padding: "0 0 0 0.25rem", listStyle: "none" }}>
                    {section.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <CheckCircle2 size={13} style={{ color: BLUE, flexShrink: 0, marginTop: "3px" }} />
                        <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {section.note && (
                    <p style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.78rem", color: "#888",
                      fontStyle: "italic", marginTop: "0.5rem", lineHeight: 1.5,
                    }}>
                      {section.note}
                    </p>
                  )}
                </Accordion>
              ))}

              {/* Options — collapsible */}
              <Accordion title="Available Options & Upgrades">
                <ul style={{ margin: 0, padding: "0 0 0 0.25rem", listStyle: "none" }}>
                  {BLAST_OPTIONS.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <ArrowRight size={12} style={{ color: BLUE, flexShrink: 0, marginTop: "4px" }} />
                      <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              {/* Code compliance note */}
              <Accordion title="Code Compliance & Standards">
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.65 }}>
                  PFS blast rooms are designed to comply with applicable OSHA and NFPA regulations. All UL and manufactured in the USA with ETL/UL listed components parts are used throughout each system. Local requirements may vary — we recommend consulting your local authority having jurisdiction (AHJ) prior to installation. Our team is available to assist with compliance documentation and equipment specifications.
                </p>
              </Accordion>

            </div>

            {/* Sidebar */}
            <Sidebar
              featuredImage={FEATURED_BLAST}
              relatedHref="/products/blast-systems"
              relatedLabel="View All Blasting Systems"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "2rem 0", backgroundColor: "#1a1a1a" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.75rem" }}>FIELD SERVICE GALLERY</span>
          <GalleryGrid images={BLAST_GALLERY.map((src, i) => ({ src, alt: `PFS Blasting Booth ${i + 1}` }))} />
        </div>
      </section>

      {/* Related products */}
      <SiteProductCardSection
        cards={[
          { label: "Powder Coating Systems", href: "/products/powder-booths", img: "/manus-storage/pfs-powder-coating-render_d6e2b3a1.jpg", desc: "The coating process after blasting" },
          { label: "Enclosed Paint Booths", href: "/products/paint-booths/enclosed", img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg", desc: "Paint after blast prep" },
        ]}
      />
    </div>
  );
}

// ── RECLAIM BLASTING BOOTHS PAGE ──────────────────────────────────────────────
export function ReclaimBlastingBoothsPage() {
  return (
    <div>
      <PageHero
        title="Reclaim Blasting Booths"
        subtitle="Blasting booths with integrated media recovery — mechanical bucket elevator or pneumatic vacuum systems to capture, classify, and recycle abrasive media."
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Blasting Systems", href: "/products/blast-systems" },
          { label: "Reclaim Blasting Booths" },
        ]}
        bgImage={RECLAIM_HERO}
        ctaPricingHref="/contact/request-a-quote"
      />

      {/* ── Main content ── */}
      <section style={{ padding: "3rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">

              {/* Series badge */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "rgba(27,43,75,0.08)", border: "1px solid rgba(27,43,75,0.2)",
                color: BLUE, borderRadius: "2px",
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.68rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "0.28rem 0.75rem", marginBottom: "0.75rem",
              }}>
                PFS GOLIATH SERIES — RECLAIM
              </span>

              <span className="section-label">Blasting Systems</span>
              <h2 className="section-heading">Reclaim Blasting Booths</h2>
              <p className="section-body" style={{ marginBottom: "1.5rem" }}>
                PFS Goliath Series reclaim blast rooms add an integrated media recovery system to the standard blast booth — dramatically reducing media consumption, disposal costs, and production downtime. Recovered media is automatically classified, cleaned, and returned to the blast machine, keeping your operation running with minimal manual intervention. Available in mechanical bucket elevator or pneumatic vacuum configurations to match your media type and production volume.
              </p>

              {/* Core features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Integrated floor media recovery",
                  "Mechanical or pneumatic reclaim configurations",
                  "Media classifier removes fines and broken-down abrasive",
                  "Recovered media returned directly to blast machine",
                  "Reduces media consumption and disposal costs",
                  "High-efficiency dust collection",
                  "UL and manufactured in the USA with ETL/UL listed components components throughout",
                  "Built to OSHA and NFPA standards",
                  "Custom sizing available",
                  "Ships nationally — installed by PFS",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} style={{ color: BLUE, flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#444", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/contact/request-a-quote?from=blast-booth">
                  <span className="btn-glow">Request a Quote <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:8885457715">
                  <span className="btn-outline">Call (888) 545-7715</span>
                </a>
              </div>

              {/* Typical sizes — collapsible */}
              <h3 style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.78rem", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: BLUE, marginBottom: "0.6rem",
              }}>
                Typical Sizes
              </h3>
              <SizesAccordion />

              {/* Component specs — collapsible */}
              <h3 style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.78rem", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: BLUE, marginBottom: "0.6rem", marginTop: "1.5rem",
              }}>
                Standard Components
              </h3>
              {RECLAIM_COMPONENTS.map((section) => (
                <Accordion key={section.title} title={section.title}>
                  <ul style={{ margin: 0, padding: "0 0 0 0.25rem", listStyle: "none" }}>
                    {section.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <CheckCircle2 size={13} style={{ color: BLUE, flexShrink: 0, marginTop: "3px" }} />
                        <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}

              {/* Options — collapsible */}
              <Accordion title="Available Options & Upgrades">
                <ul style={{ margin: 0, padding: "0 0 0 0.25rem", listStyle: "none" }}>
                  {BLAST_OPTIONS.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <ArrowRight size={12} style={{ color: BLUE, flexShrink: 0, marginTop: "4px" }} />
                      <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.55 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              {/* Code compliance note */}
              <Accordion title="Code Compliance & Standards">
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.65 }}>
                  PFS reclaim blast rooms are designed to comply with applicable OSHA and NFPA regulations. All UL and manufactured in the USA with ETL/UL listed components parts are used throughout each system. Local requirements may vary — we recommend consulting your local authority having jurisdiction (AHJ) prior to installation. Our team is available to assist with compliance documentation and equipment specifications.
                </p>
              </Accordion>

            </div>

            {/* Sidebar */}
            <Sidebar
              featuredImage={FEATURED_RECLAIM}
              relatedHref="/products/blast-systems"
              relatedLabel="View All Blasting Systems"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "2rem 0", backgroundColor: "#1a1a1a" }}>
        <div className="container">
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.75rem" }}>FIELD SERVICE GALLERY</span>
          <GalleryGrid images={RECLAIM_GALLERY.map((src, i) => ({ src, alt: `PFS Reclaim Blasting Booth ${i + 1}` }))} />
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Blast Rooms &amp; Abrasive Blasting Booths — Common Questions</h2>
          </div>
          {[
            { q: "What is a blast room used for?", a: "A blast room provides an enclosed, ventilated environment for abrasive blasting — the process of propelling abrasive media at high velocity to clean, strip, or profile a surface. Blast rooms capture spent media and dust, protect workers and the surrounding facility, and comply with OSHA and EPA regulations for abrasive blasting operations." },
            { q: "What types of abrasive media can be used in a PFS blast room?", a: "PFS blast rooms are compatible with all common abrasive media including steel shot, steel grit, aluminum oxide, garnet, glass bead, and crushed glass. The media recovery and reclaim system is sized to match the media type and blasting volume. Contact a PFS engineer to confirm media compatibility for your specific application." },
            { q: "Does a blast room need to comply with OSHA regulations?", a: "Yes. Abrasive blasting operations are regulated under OSHA 1910.94 and OSHA 1926.57. PFS blast rooms are engineered to meet OSHA ventilation requirements, with airflow designed to maintain dust concentrations below permissible exposure limits (PELs)." },
            { q: "What is the difference between a blast room and a blast cabinet?", a: "A blast cabinet is a small, enclosed unit where the operator works from outside through gloves and a viewport — suitable for small parts. A blast room is a walk-in enclosure where the operator enters with a blast suit and hood — suitable for large parts, vehicles, structural steel, and other large workpieces that cannot fit in a cabinet." },
            { q: "Can PFS build a custom-size blast room?", a: "Yes. PFS manufactures blast rooms in custom sizes to accommodate any workpiece — from small parts rooms to large aircraft hangars and structural steel bays. Contact a PFS engineer with your workpiece dimensions, blasting volume, and media requirements for a custom quote." },
          ].map((item, i) => (
            <details key={i} style={{ borderBottom:"1px solid #e5e7eb", padding:"1.25rem 0" }}>
              <summary style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.95rem,2.5vw,1.1rem)",fontWeight:800,color:"#111",letterSpacing:"0.01em",cursor:"pointer",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem" }}>
                {item.q}
                <span style={{ color:"#1B3A6B", flexShrink:0, fontSize:"1.4rem", fontWeight:300, lineHeight:1 }}>+</span>
              </summary>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#555",lineHeight:1.75,margin:"1rem 0 0",paddingRight:"1.5rem" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related products */}
      <SiteProductCardSection
        cards={[
          { label: "Powder Coating Systems", href: "/products/powder-booths", img: "/manus-storage/pfs-powder-coating-render_d6e2b3a1.jpg", desc: "The coating process after blasting" },
          { label: "Conveyor Systems", href: "/integration-automation/conveyor-systems", img: "/manus-storage/pfs-conveyor-line_9c4176ba.png", desc: "Move parts through the finishing line" },
        ]}
      />
    </div>
  );
}
