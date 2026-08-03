/*
 * PFS OEM Parts Hub — /parts
 * - Full-bleed dark hero with parts workshop photo
 * - 14 product category cards (photo + title + desc + CTA)
 * - "Shop Filters" featured shortcut button
 * - Mid-page quote CTA band
 * - Bottom bulk/custom quote section
 * - E-commerce ready: each card has data-sku + "ADD TO CART" slot (disabled, shows "GET QUOTE" until store is live)
 * - Royal blue (#1B3A6B) brand accent throughout
 */
import { useState } from "react";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { ArrowRight, ShoppingCart, Package, Wrench, Phone } from "lucide-react";

const BLUE = "#1B3A6B";
const BLUE_LIGHT = "#2A5298";

// ── CDN IMAGE URLS ────────────────────────────────────────────────────────────
const HERO_IMG = "/manus-storage/pfs-filters-card_8b47eabc.png";  // Real PFS filter media photo
const IMG_COMPRESSOR = "/manus-storage/pfs-compressor_ac8a8f18.jpg";
const IMG_CAR_LIFT   = "/manus-storage/pfs-lift_424297dc.jpg";
const IMG_FILTERS = "/manus-storage/pfs-filters-card_8b47eabc.png";  // Real PFS filter media photo
const IMG_DUCTS    = "/manus-storage/pfs-ducts_1fbe0397.jpg";
const IMG_FIRE     = "/manus-storage/pfs-fire-suppression_742b581e.jpg";
const IMG_MOTOR    = "/manus-storage/pfs-motor_ecdf26f3.jpg";
const IMG_FAN      = "/manus-storage/pfs-fan_2f0815fd.jpg";
const IMG_MANO     = "/manus-storage/pfs-manometer_5c40c0f8.jpg";
const IMG_PANEL    = "/manus-storage/pfs-control-panel-cp1000_8ad9abea.jpg";
const IMG_BLAST    = "/manus-storage/pfs-blast-recovery_dbce54aa.jpg";
const IMG_DUST     = "/manus-storage/pfs-dust-collector_e05ef794.webp";
const IMG_SEALS    = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-part-seals-MxbVGeBtpPQrw4J8RrUxdn.webp";
const IMG_HANDLE   = "/manus-storage/pfs-door-hardware-v2_d749ca14.jpg";
const IMG_MATS     = "/manus-storage/pfs-floor-mat_a51917a0.jpg";
const IMG_BOOTHCOAT = "/manus-storage/pfs-boothcoat-final_a2dbee08.jpg";
const IMG_CLEARVIEW = "/manus-storage/like90clearviewcoating_2dada6e2.webp";
const IMG_CURTAINS  = "/manus-storage/pfs-shop-curtains-mercedes_6813d184.png"; // shop curtain enclosure with Mercedes
const IMG_AIRLINE   = "/manus-storage/pfs-airline-piping-kit_0baf89bd.webp"; // blue aluminum airline piping kit

// ── PARTS CATALOG ─────────────────────────────────────────────────────────────
// ecommerceReady: true = will show "ADD TO CART" when store is live
// featured: true = shown in "SHOP FILTERS" shortcut strip
const PARTS: {
  id: string;
  label: string;
  sub: string;
  img: string;
  desc: string;
  href: string;
  badge?: string;
  ecommerceReady: boolean;
  featured?: boolean;
}[] = [
  {
    id: "filters",
    label: "Filters & Media",
    sub: "Exhaust & Intake",
    img: IMG_FILTERS,
    desc: "Fiberglass exhaust filters, tacky intake media, and blanket intake upgrades. Sized to your booth — order by the case.",
    href: "https://pfsfilters.com",
    badge: "MOST ORDERED",
    ecommerceReady: true,
    featured: true,
  },
  {
    id: "compressors",
    label: "Air Compressors",
    sub: "Rotary Screw & Piston",
    img: IMG_COMPRESSOR,
    desc: "Industrial rotary screw and piston air compressors sized for spray booth operations. Single and two-stage configurations. Matched to your CFM and PSI requirements.",
    href: "/contact",
    badge: "CUSTOM ORDER",
    ecommerceReady: false,
  },
  {
    id: "car-lifts",
    label: "Car Lifts",
    sub: "2-Post, 4-Post & Scissor",
    img: IMG_CAR_LIFT,
    desc: "Professional automotive lifts for paint booth applications. 2-post, 4-post, and scissor configurations. Rated for passenger vehicles, trucks, and fleet vehicles.",
    href: "/contact",
    badge: "CUSTOM ORDER",
    ecommerceReady: false,
  },
  {
    id: "ducts",
    label: "Ductwork",
    sub: "Galvanized Steel",
    img: IMG_DUCTS,
    desc: "Spiral duct sections, elbows, flanges, and transition fittings. Galvanized steel matched to PFS booth specs.",
    href: "/parts/ducts",
    ecommerceReady: true,
  },
  {
    id: "fire-kit",
    label: "Fire Suppression Kits",
    sub: "NFPA 33 Compliant",
    img: IMG_FIRE,
    desc: "Complete fire suppression kits with cylinder, fusible links, nozzles, and mounting hardware. NFPA 33 compliant.",
    href: "/parts/fire-suppression",
    badge: "SAFETY CRITICAL",
    ecommerceReady: false,
  },
  {
    id: "motors",
    label: "Replacement Motors",
    sub: "TEFC Three-Phase",
    img: IMG_MOTOR,
    desc: "TEFC three-phase exhaust fan motors. Tri-voltage, CSA/UL recognized. Drop-in replacements for all PFS fan assemblies.",
    href: "/parts/motors",
    ecommerceReady: true,
  },
  {
    id: "fans",
    label: "Fan Assemblies",
    sub: "Tube Axial",
    img: IMG_FAN,
    desc: "Complete tube axial fan assemblies with belt guards and duct connector rings. UL/CUL listed. Non-sparking construction.",
    href: "/parts/fans",
    ecommerceReady: true,
  },
  {
    id: "manometers",
    label: "Manometers",
    sub: "Differential Pressure",
    img: IMG_MANO,
    desc: "Differential pressure gauges for filter monitoring. Dial and digital options. Ensure your booth stays in compliance.",
    href: "/parts/manometers",
    ecommerceReady: true,
  },
  {
    id: "control-panels",
    label: "Control Panels",
    sub: "UL 508A Certified",
    img: IMG_PANEL,
    desc: "Replacement and upgrade control panels. Electromechanical and programmable configurations. UL 508A certified fabrication.",
    href: "/parts/control-panels",
    badge: "CUSTOM ORDER",
    ecommerceReady: false,
  },
  {
    id: "blast-vacuum",
    label: "Blast & Vacuum Recovery",
    sub: "Abrasive Recovery Systems",
    img: IMG_BLAST,
    desc: "Blast room vacuum recovery systems, cyclone separators, and media reclaim components. Maximize abrasive reuse.",
    href: "/parts/blast-vacuum",
    ecommerceReady: false,
  },
  {
    id: "dust-collector",
    label: "Dust Collector Powder Module Filters",
    sub: "Cartridge Replacement",
    img: IMG_DUST,
    desc: "Pleated cartridge filter replacements for powder coating dust collector modules. Pulse-jet compatible. Multiple micron ratings available.",
    href: "/parts/dust-collector-filters",
    ecommerceReady: true,
  },
  {
    id: "cartridge-collector-filters",
    label: "Cartridge Collector Filters",
    sub: "Dust Collectors & Powder Booths",
    img: "/manus-storage/pfs-cartridge-filters-crop_b4a8b363.jpeg",
    desc: "OEM cartridge filters for dust collectors and powder coating booths. Pleated polyester and spunbond media in standard and high-efficiency ratings. Compatible with pulse-jet and shaker-style collectors used in powder booths, blast rooms, and industrial finishing lines.",
    href: "/contact",
    badge: "OEM",
    ecommerceReady: false,
  },
  {
    id: "dust-collector-modules",
    label: "Dust Collector Modules",
    sub: "Complete Units & Assemblies",
    img: "/manus-storage/pfs-act-dust-module_b0566cde.webp",
    desc: "Complete dust collector module assemblies for powder coating and industrial finishing lines. Cartridge-style, high-efficiency filtration with pulse-jet cleaning.",
    href: "/parts/dust-collector-modules",
    badge: "CUSTOM ORDER",
    ecommerceReady: false,
  },
  {
    id: "seals",
    label: "Door Seals & Gaskets",
    sub: "Neoprene & Foam",
    img: IMG_SEALS,
    desc: "Neoprene door seals, foam weatherstripping, and rubber gaskets. Maintain booth pressure and prevent solvent vapor leaks.",
    href: "/parts/seals",
    ecommerceReady: true,
  },
  {
    id: "door-handles",
    label: "Door Handles & Latches",
    sub: "Handles, Latches & Hardware",
    img: IMG_HANDLE,
    desc: "Stainless steel door handles, cam latches, T-handle locks, and hinges. Direct replacements for all PFS booth door hardware.",
    href: "/parts/door-hardware",
    ecommerceReady: true,
  },
  {
    id: "floor-mats",
    label: "Paint Booth Floor Mats",
    sub: "Adhesive-Backed Mat",
    img: IMG_MATS,
    desc: "Paint Booth Mat with Adhesive Backing — Protects your spray booth floors and mixing room surfaces from build up by collecting the overspray, dust and particles that cause paint defects or create a fire hazard.",
    href: "/parts/floor-mats",
    ecommerceReady: true,
  },
  {
    id: "boothcoat",
    label: "Boothcoat Peelable Coating",
    sub: "Peelable Booth Coat",
    img: IMG_BOOTHCOAT,
    desc: "Boothcoat Peelable White Protective Coating for spray paint applications. Waterborne, non-hazardous formula that applies easily and peels off in large sheets — keeping booth walls, floors, and fixtures clean without scraping or solvents.",
    href: "/contact",
    badge: "MOST ORDERED",
    ecommerceReady: true,
  },
  {
    id: "curtains",
    label: "Strip Curtains & Partitions",
    sub: "PVC Strip, Welding & Prep",
    img: IMG_CURTAINS,
    desc: "Heavy-duty PVC strip curtains and industrial partitions for prep stations, wash bays, aluminum welding stations, shop dividers, and drive-through openings. Custom cut to width and height. Clear, opaque, and weld-grade options available.",
    href: "/contact",
    badge: "CUSTOM ORDER",
    ecommerceReady: false,
  },
  {
    id: "airline",
    label: "Airline Systems",
    sub: "Hose Reels, Drops & Fittings",
    img: IMG_AIRLINE,
    desc: "Complete airline systems for spray booths and finishing lines — retractable hose reels, drop lines, quick-connect fittings, regulators, and wall-mount brackets. Sized for single-gun and multi-gun booth configurations.",
    href: "/contact",
    badge: "CUSTOM ORDER",
    ecommerceReady: false,
  },
  {
    id: "clearview",
    label: "Clear View Peelable Coating",
    sub: "Glass, Lights & Windows",
    img: IMG_CLEARVIEW,
    desc: "Crystal-clear peelable coating for booth lights and windows. Levels to a smooth transparent film that won't distort booth lighting or window clarity. Peels off easily in large sheets — simply peel and reapply as overspray builds up. Water-based, non-hazardous, VOC 60 g/l.",
    href: "/contact",
    badge: "MOST ORDERED",
    ecommerceReady: true,
  },
];

// ── PART CARD ─────────────────────────────────────────────────────────────────
function PartCard({
  id, label, sub, img, desc, href, badge, ecommerceReady,
}: (typeof PARTS)[0]) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith("http");

  return (
    <div
      id={`part-${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: `2px solid ${hovered ? BLUE : "#e2e8f0"}`,
        borderRadius: "2px",
        overflow: "hidden",
        transition: "border-color 0.15s, box-shadow 0.15s",
        boxShadow: hovered
          ? `0 0 0 3px rgba(27,58,107,0.10), 0 8px 24px rgba(27,58,107,0.12)`
          : "0 1px 4px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Badge */}
      {badge && (
        <div style={{
          position: "absolute", top: "0.75rem", left: "0.75rem", zIndex: 2,
          background: badge === "SAFETY CRITICAL" ? "#1B2B4B" : badge === "MOST ORDERED" ? BLUE : badge === "CUSTOM ORDER" ? "#374151" : "#555",
          color: "#fff",
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "0.65rem", fontWeight: 800,
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "0.2rem 0.5rem", borderRadius: "2px",
        }}>
          {badge}
        </div>
      )}

      {/* Image */}
      <div style={{
        width: "100%", aspectRatio: "16/9", overflow: "hidden",
        background: "#f8f9fa",
      }}>
        <img
          src={img}
          alt={label}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.35s",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "0.75rem 1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "0.72rem", fontWeight: 700,
          color: BLUE, letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: "0.2rem",
        }}>
          {sub}
        </div>
        <div style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "1rem", fontWeight: 800,
          color: "#111", letterSpacing: "0.03em", textTransform: "uppercase",
          marginBottom: "0.5rem", lineHeight: 1.2,
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: "0.78rem", color: "#555", lineHeight: 1.55,
          marginBottom: "1rem", flex: 1,
        }}>
          {desc}
        </div>

        {/* CTA Row */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {/* Primary CTA — external goes to pfsfilters.com, internal goes to /contact */}
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                background: BLUE,
                color: "#fff",
                border: "none",
                padding: "0.6rem 1rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.78rem", fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "2px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <ArrowRight size={12} /> SHOP FILTERS ↗
            </a>
          ) : (
            <Link href="/contact">
              <button style={{
                flex: 1,
                background: BLUE,
                color: "#fff",
                border: "none",
                padding: "0.6rem 1rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.78rem", fontWeight: 800,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "2px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem",
                transition: "background 0.15s",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = BLUE_LIGHT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
              >
                <Phone size={12} /> GET QUOTE
              </button>
            </Link>
          )}

          {/* Secondary: Add to Cart (disabled until store live) */}
          {!isExternal && (
            <button
              disabled
              title={ecommerceReady ? "Online ordering coming soon" : "Custom order — call for pricing"}
              style={{
                background: ecommerceReady ? "#f1f5f9" : "#f8f8f8",
                color: ecommerceReady ? "#64748b" : "#aaa",
                border: `1px solid ${ecommerceReady ? "#cbd5e1" : "#e2e8f0"}`,
                padding: "0.6rem 0.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: "not-allowed",
                borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.3rem",
                whiteSpace: "nowrap",
              }}
            >
              <ShoppingCart size={12} />
              {ecommerceReady ? "SHOP ONLINE SOON" : "CALL FOR PRICING"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function PartsHubPage() {
  useSEO({
    title: "Spray Booth Parts & Filters | PFS OEM Replacement Parts",
    description: "OEM replacement parts and filters for PFS spray paint booths, industrial ovens, and blast equipment. Intake filters, exhaust filters, lighting, motors, and control components. Ships nationwide.",
    canonical: "/parts",
  });

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        height: "clamp(340px, 50vh, 520px)",
        overflow: "hidden",
        background: "#0a0a0a",
      }}>
        <img
          src={HERO_IMG}
          alt="PFS OEM spray booth replacement parts and components — filters, motors, control panels"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.45,
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)",
        }} />

        {/* Text */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 2rem",
          height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: BLUE_LIGHT }} />
            PFS INDUSTRIAL FINISHING SYSTEMS
          </div>
          <h1 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.0, textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 1rem",
          }}>
            OEM Parts &<br />Accessories
          </h1>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            color: "rgba(255,255,255,0.8)", lineHeight: 1.6,
            maxWidth: "520px", margin: "0 0 1.75rem",
          }}>
            Genuine replacement parts for every PFS booth, oven, and blast system.
            Spec-matched components — shipped nationally from Santa Rosa, CA.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/contact">
              <button style={{
                background: BLUE, color: "#fff",
                border: "none", padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                REQUEST PARTS QUOTE <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:+18885457715">
              <button style={{
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.4)",
                padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <Phone size={14} /> (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── SHOP FILTERS SHORTCUT STRIP ── */}
      <section style={{
        background: BLUE,
        borderBottom: "3px solid #111",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex", alignItems: "center",
          gap: "1.5rem", flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Package size={18} color="#fff" />
            <span style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.88rem", fontWeight: 800,
              color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              MOST ORDERED:
            </span>
          </div>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {[
              { label: "SHOP FILTERS ↗", href: "https://pfsfilters.com", external: true },
              { label: "FAN MOTORS", anchor: "part-motors" },
              { label: "DOOR SEALS", anchor: "part-seals" },
              { label: "FLOOR MATS", anchor: "part-floor-mats" },
              { label: "MANOMETERS", anchor: "part-manometers" },
            ].map((item) => {
              const btnStyle: React.CSSProperties = {
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "0.45rem 1rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.75rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                transition: "background 0.15s",
                whiteSpace: "nowrap",
                textDecoration: "none",
                display: "inline-block",
              };
              const scrollTo = (anchor: string) => {
                const el = document.getElementById(anchor);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              };
              return (item as { external?: boolean }).external ? (
                <a
                  key={item.label}
                  href={(item as { href?: string }).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={btnStyle}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.22)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)")}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  style={btnStyle}
                  onClick={() => scrollTo((item as { anchor?: string }).anchor ?? "")}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <Link href="/contact">
            <button style={{
              background: "#fff", color: BLUE,
              border: "none", padding: "0.5rem 1.2rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.78rem", fontWeight: 900,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", borderRadius: "2px",
              display: "flex", alignItems: "center", gap: "0.35rem",
              whiteSpace: "nowrap",
            }}>
              GET A PARTS QUOTE <ArrowRight size={12} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── PARTS GRID ── */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            GENUINE OEM COMPONENTS
          </div>
          <h2 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900,
            color: "#111", textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1,
          }}>
            All Parts & Accessories
          </h2>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "0.88rem", color: "#555", lineHeight: 1.6,
            maxWidth: "560px", marginTop: "0.5rem",
          }}>
            Every part is spec-matched to PFS equipment. Not sure what you need? Call our parts team — we'll cross-reference your booth serial number and ship the right part.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1rem",
        }}>
          {PARTS.map((part) => (
            <PartCard key={part.id} {...part} />
          ))}
        </div>
      </section>

      {/* ── MID-PAGE QUOTE CTA BAND ── */}
      <section style={{
        background: "#111",
        borderTop: "3px solid #222",
        borderBottom: "3px solid #222",
        padding: "3rem 2rem",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "2rem",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em",
              textTransform: "uppercase", marginBottom: "0.4rem",
            }}>
              NEED A SPECIFIC PART?
            </div>
            <h3 style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900,
              color: "#fff", textTransform: "uppercase",
              letterSpacing: "-0.01em", margin: "0 0 0.5rem", lineHeight: 1.1,
            }}>
              We'll Cross-Reference Your<br />Booth Serial Number
            </h3>
            <p style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6,
              maxWidth: "480px",
            }}>
              Have your booth model or serial number ready. Our parts team will identify the exact spec and get you a quote within one business day.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "220px" }}>
            <Link href="/contact">
              <button style={{
                width: "100%",
                background: BLUE, color: "#fff",
                border: "none", padding: "1rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.88rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              }}>
                REQUEST PARTS QUOTE <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:+18885457715" style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%",
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.25)",
                padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              }}>
                <Phone size={14} /> CALL (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── BULK / SUBSCRIPTION SECTION ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {[
            {
              icon: <Package size={28} color={BLUE} />,
              title: "Bulk Filter Programs",
              desc: "Order filters by the case and save. We'll set up a recurring delivery schedule matched to your change interval. Never run out mid-job.",
              cta: "SET UP FILTER PROGRAM",
            },
            {
              icon: <Wrench size={28} color={BLUE} />,
              title: "Maintenance Kits",
              desc: "Annual maintenance kits bundled for your booth model — seals, filters, belts, and hardware. One order, everything you need for the year.",
              cta: "REQUEST MAINTENANCE KIT",
            },
            {
              icon: <ShoppingCart size={28} color={BLUE} />,
              title: "Online Store — Coming Soon",
              desc: "We're building a full online parts store with real-time inventory, saved orders, and account pricing. Get notified when it launches.",
              cta: "NOTIFY ME WHEN LIVE",
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "2px",
              padding: "1.75rem",
              display: "flex", flexDirection: "column", gap: "0.75rem",
            }}>
              {card.icon}
              <div style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "1.1rem", fontWeight: 900,
                color: "#111", textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}>
                {card.title}
              </div>
              <div style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.82rem", color: "#555", lineHeight: 1.6, flex: 1,
              }}>
                {card.desc}
              </div>
              <Link href="/contact">
                <button style={{
                  background: "transparent", color: BLUE,
                  border: `2px solid ${BLUE}`,
                  padding: "0.6rem 1.2rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.75rem", fontWeight: 800,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", borderRadius: "2px",
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  transition: "background 0.15s, color 0.15s",
                  width: "100%", justifyContent: "center",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = BLUE;
                  }}
                >
                  {card.cta} <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM TRUST BAR ── */}
      <section style={{
        background: BLUE,
        padding: "2rem",
        borderTop: "3px solid #111",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: "3rem",
          flexWrap: "wrap",
        }}>
          {[
            "Ships Nationally from Santa Rosa, CA",
            "Spec-Matched to Your Booth",
            "Same-Day Quotes on Most Parts",
            "ETL/UL Listed & UL 508A Certified Components",
          ].map((item) => (
            <div key={item} style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.82rem", fontWeight: 700,
              color: "rgba(255,255,255,0.9)", letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.2rem" }}>—</span>
              {item}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
