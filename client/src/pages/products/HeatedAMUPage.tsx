/*
 * Heated Air Make-Up Units — Dedicated Product Page
 * Apollo AMU series by PFS
 * Design: Dark industrial, brand blue #1B3A6B, Chakra Petch headings
 * Layout: Hero (video) → Stats → Configurations → Features (collapsible) → Fuel Type (buttons) → Control Panels → Gallery (real installs) → Related → CTA
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, Phone } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { useSEO } from "@/hooks/useSEO";

// ── CDN PATHS ─────────────────────────────────────────────────────────────────
const HERO_IMG       = "/manus-storage/amu-apollo-rooftop-hero_b5d9fad1.jpg";
const RENDER_VERT    = "/manus-storage/amu-render-vertical_2325a440.jpg";
const RENDER_HORIZ   = "/manus-storage/amu-render-horizontal_0819be8f.jpg";
// Gallery real install photos (cleaned — no Spray-Tech logos)
const AMU_INSTALL1   = "/manus-storage/amu-vertical-outdoor-install1-clean_1af3eb06.jpg";
const AMU_INSTALL2   = "/manus-storage/amu-vertical-outdoor-install2_35bf9401.jpg";
const AMU_ROOFTOP    = "/manus-storage/amu-apollo-rooftop_e0c4456e.jpg";
const AMU_INDOOR     = "/manus-storage/amu-apollo-indoor-pair_dde60680.jpg";
const AMU_OUTDOOR    = "/manus-storage/amu-outdoor-multi-unit-clean_69bc9731.jpg";
const AMU_BOOTH_0445 = "/manus-storage/amu-0445-clean_dcd2d77e.jpg";
const AMU_BOOTH_WALL = "/manus-storage/amu-booth-mounted-install_258f1ac0.jpg";

const BLUE = "#1B3A6B";

// ── CONFIGURATIONS ────────────────────────────────────────────────────────────
const CONFIGS = [
  {
    id: "horizontal",
    label: "Horizontal",
    img: RENDER_HORIZ,
    desc: "Low-profile horizontal layout for ground-level or pad-mounted installations. Ideal where vertical clearance is limited. Ductwork exits the side for direct booth connection.",
    tags: ["Ground Mount", "Side-Discharge", "Low Profile"],
  },
  {
    id: "vertical",
    label: "Vertical",
    img: RENDER_VERT,
    desc: "Tall vertical stack configuration for space-constrained footprints. Top-discharge design routes conditioned air up and over to the booth plenum. Available with integral stand.",
    tags: ["Top-Discharge", "Compact Footprint", "Stand Included"],
  },
  {
    id: "booth-mounted",
    label: "Booth Mounted",
    img: AMU_BOOTH_0445,
    desc: "AMU mounts directly to the exterior wall of the spray booth, eliminating separate ductwork runs. Conditioned air feeds directly into the booth plenum for maximum efficiency.",
    tags: ["Wall-Mount", "No Ductwork", "Direct Feed"],
  },
  {
    id: "roof-mounted",
    label: "Roof Mounted",
    img: AMU_ROOFTOP,
    desc: "Horizontal unit installed on the roof directly above the booth. Keeps the shop floor clear and minimizes duct length. Ideal for facilities with flat roofs and overhead clearance.",
    tags: ["Roof Install", "Floor-Clear", "Short Duct Run"],
  },
  {
    id: "outdoor-heated",
    label: "Outdoor Heated",
    img: AMU_OUTDOOR,
    desc: "Weatherized outdoor unit for exterior pad installations. Full G-90 galvanized housing with weather-resistant controls. Natural gas or propane. No interior floor space required.",
    tags: ["Outdoor Rated", "Weatherized", "Pad Mount"],
  },
];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "01",
    title: "Direct-Fired Gas Furnace — 98% Thermal Efficiency",
    body: "Mercury-manufactured direct-fired gas burners convert 98% of fuel into usable heat. Available in natural gas and propane. Output ranges from 750,000 BTU to 3,000,000 BTU to match any booth CFM requirement.",
  },
  {
    num: "02",
    title: "Spray, Cure & Optional Prep Modes",
    body: "PFS AMUs support dedicated Spray and Cure operating modes as standard. Optional Prep mode available — allows reduced airflow for surface preparation before painting. Modes are managed through the PFS control panel.",
  },
  {
    num: "03",
    title: "Variable Frequency Drives (VFD)",
    body: "VFDs balance booth air pressure, extend exhaust motor life, and reduce energy consumption. Single, two-speed, and multi-speed fan control configurations available to match your production cycle.",
  },
];
const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "80/20 Recirculation System",
    body: "Optional 80% recirculation system recycles conditioned air back through the booth, reducing fuel consumption significantly during cure cycles. Motorized profile damper standard on all spray-cure units.",
  },
  {
    num: "05",
    title: "G-90 Galvanized Steel Construction, Powder Coated White",
    body: "Full G-90 galvanized steel housing with white powder coat finish. Sealed, maintenance-free bearings throughout. Built for long-term outdoor and indoor service in industrial environments.",
  },
  {
    num: "06",
    title: "Burner Control with UV Flame Detection",
    body: "Honeywell valves and flame safeguard system with UV flame detector. Motorized profile damper standard on all spray-cure units. Temperature sensor pre-installed. Circuit breakers standard.",
  },
  {
    num: "08",
    title: "Optional Humidity Control",
    body: "Humidity control module available for facilities requiring precise moisture management during spray or cure. Critical for waterborne coatings, aerospace primers, and high-humidity climates.",
  },
  {
    num: "09",
    title: "Optional Electric Heater",
    body: "Electric heating elements available as an alternative to gas. Zero combustion, no gas line required. Precise digital temperature control. Ideal for clean rooms, environmentally sensitive facilities, and locations without gas service.",
  },
  {
    num: "10",
    title: "Interior & Exterior Installation Approved",
    body: "Horizontal and vertical configurations approved for both interior and exterior installation. Suitable for manufacturing, aerospace, automotive, building, and industrial process heat applications.",
  },
];

// ── CONTROL PANELS ────────────────────────────────────────────────────────────
const PANELS = [
  {
    model: "CP2000",
    name: "PFS CORE",
    type: "Advanced Relay",
    vfd: "1 VFD",
    hmi: false,
    heated: false,
    desc: "Entry-level relay-based panel for standard spray booth operation. Controls exhaust, lighting, and safety interlocks. Single VFD for exhaust fan speed control.",
    badge: "Standard",
    badgeColor: "#6b7280",
  },
  {
    model: "CP3000",
    name: "PFS CORE+",
    type: "Advanced Relay",
    vfd: "2 VFDs",
    hmi: false,
    heated: false,
    desc: "Dual-VFD relay panel for booths with both supply and exhaust fan control. Balances positive/negative pressure automatically. Ideal for semi-downdraft and full-downdraft configurations.",
    badge: "Popular",
    badgeColor: BLUE,
  },
  {
    model: "CP4000D",
    name: "PFS PRO",
    type: "PLC / HMI",
    vfd: "Multi-VFD",
    hmi: true,
    heated: false,
    desc: "PLC-based panel with touchscreen HMI for non-heated booths. Programmable spray and flash cycles, real-time diagnostics, and data logging. Optional integration with Allen-Bradley, Schneider, or similar industrial PLCs via EtherNet/IP or Modbus on request.",
    badge: "Advanced",
    badgeColor: "#b45309",
  },
  {
    model: "CP4000H",
    name: "PFS ELITE",
    type: "PLC / HMI",
    vfd: "Multi-VFD",
    hmi: true,
    heated: true,
    desc: "Full PLC/HMI panel for heated booths and thermal applications. Controls spray, flash, cure, and optional prep modes with precise temperature ramping. Supports humidity control integration. Industrial PLC communication protocols (EtherNet/IP, Modbus, DeviceNet) available on request.",
    badge: "Premium",
    badgeColor: "#991b1b",
  },
];

// ── HEAT SOURCES ──────────────────────────────────────────────────────────────
const HEAT_SOURCES = [
  {
    id: "ng",
    label: "Natural Gas",
    desc: "Most common choice for production facilities. Direct-fired burners deliver 750K–3M BTU output at low operating cost. Requires existing gas infrastructure.",
    tags: ["750K–3M BTU", "Lowest Op Cost", "Direct-Fired"],
  },
  {
    id: "propane",
    label: "Propane",
    desc: "Identical performance to natural gas — configured for propane supply. Preferred for remote facilities, outdoor booths, and locations without natural gas service.",
    tags: ["750K–3M BTU", "Remote-Ready", "No Gas Line"],
  },
  {
    id: "electric",
    label: "Electric",
    desc: "Zero combustion, no gas line required. Precise digital temperature control. Ideal for clean rooms, environmentally sensitive facilities, and locations without gas service.",
    tags: ["Zero Combustion", "Precise Control", "Clean Room OK"],
  },
];

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}>
      <button onClick={onClose} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <X size={20} />
      </button>
      <img src={src} alt={alt} onClick={e => e.stopPropagation()} style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }} />
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function HeatedAMUPage() {
  useSEO({
    title: "Heated Air Make-Up Units | Spray Booth AMU Systems | PFS",
    description: "PFS heated air make-up units deliver tempered replacement air for spray booths operating in heated spray and bake cycles. Gas, propane, or electric heat. UL 508A control panel, ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/air-make-up-units/heated",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [activeConfig, setActiveConfig] = useState("horizontal");
  const [activeFuel, setActiveFuel] = useState("ng");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const activeConf = CONFIGS.find(c => c.id === activeConfig)!;
  const activeFuelData = HEAT_SOURCES.find(h => h.id === activeFuel)!;

  return (
    <div className="bg-white">
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

      {/* ── HERO (IMAGE) ── */}
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: "#0a0a0a" }}>
        <img
          src={HERO_IMG}
          alt="PFS Apollo AMU rooftop horizontal installation"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.15) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "4rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
            <Link href="/products"><span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", cursor: "pointer" }}>Products</span></Link>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>/</span>
            <Link href="/products/air-make-up-units"><span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", cursor: "pointer" }}>Air Make-Up Units</span></Link>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase" }}>Heated</span>
          </div>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              PFS APOLLO AMU SERIES
            </div>
            <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.05, marginBottom: "1.2rem", letterSpacing: "-0.01em" }}>
              Heated Air<br />Make-Up Units
            </h1>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "560px" }}>
              Direct-fired gas furnaces with 98% thermal efficiency. 750K–3M BTU. Natural gas, propane, or electric. Five installation configurations — horizontal, vertical, booth-mounted, roof-mounted, and outdoor.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact/request-a-quote?from=heated-amu">
                <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
              </Link>
              <a href="tel:+18885457715">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.45)", padding: "0.9rem 1.8rem", cursor: "pointer" }}>
                  <Phone size={14} /> (888) 545-7715
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: BLUE, padding: "1.4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0" }}>
            {[
              { val: "750K–3M", label: "BTU Range" },
              { val: "98%", label: "Thermal Efficiency" },
              { val: "5", label: "Configurations" },
              { val: "3", label: "Heat Sources" },
              { val: "USA", label: "Manufactured" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0.6rem 1rem", borderRight: i < 4 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.65)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFIGURATIONS ── */}
      <section style={{ padding: "5rem 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>FIVE CONFIGURATIONS</span>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>Choose Your Installation Type</h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555", lineHeight: 1.7, maxWidth: "560px", marginTop: "0.75rem" }}>
              Every facility is different. PFS Apollo AMUs ship in five configurations to fit your footprint, ductwork layout, and installation requirements.
            </p>
          </div>

          {/* Tab selector */}
          <div style={{ display: "flex", gap: "0", marginBottom: "0", overflowX: "auto", borderBottom: `2px solid ${BLUE}` }}>
            {CONFIGS.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveConfig(c.id)}
                style={{
                  fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.75rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.75rem 1.5rem", border: "none", cursor: "pointer",
                  background: activeConfig === c.id ? BLUE : "transparent",
                  color: activeConfig === c.id ? "#fff" : "#555",
                  borderBottom: activeConfig === c.id ? `2px solid ${BLUE}` : "2px solid transparent",
                  marginBottom: "-2px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Active config panel */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", border: `1px solid #e5e5e5`, borderTop: "none" }}>
            <div style={{ background: "#f5f5f3", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem", minHeight: "360px" }}>
              <img
                src={activeConf.img}
                alt={`Apollo AMU — ${activeConf.label} configuration`}
                style={{ maxWidth: "100%", maxHeight: "320px", objectFit: "contain", cursor: "zoom-in" }}
                onClick={() => setLightbox({ src: activeConf.img, alt: `Apollo AMU — ${activeConf.label} configuration` })}
              />
            </div>
            <div style={{ padding: "3rem" }}>
              <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#111", marginBottom: "1rem" }}>
                {activeConf.label} Configuration
              </h3>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#444", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                {activeConf.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {activeConf.tags.map(t => (
                  <span key={t} style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "#f0f0ee", color: "#333", padding: "0.3rem 0.7rem" }}>{t}</span>
                ))}
              </div>
              <Link href={`/contact/request-a-quote?from=heated-amu&config=${activeConf.id}`}>
                <span className="btn-glow">GET PRICING — {activeConf.label.toUpperCase()} <ArrowRight size={13} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES (COLLAPSIBLE) ── */}
      <section style={{ padding: "5rem 0", background: "#f8f8f6" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>STANDARD FEATURES</span>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>Built for Production. Engineered to Last.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[...FEATURES_VISIBLE, ...(featuresOpen ? FEATURES_HIDDEN : [])].map(f => (
              <div key={f.num} style={{ borderLeft: `3px solid ${BLUE}`, paddingLeft: "1.25rem" }}>
                <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "0.4rem" }}>FEATURE {f.num}</div>
                <h4 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#111", marginBottom: "0.5rem", lineHeight: 1.3 }}>{f.title}</h4>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setFeaturesOpen(!featuresOpen)}
            style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, background: "transparent", border: `1.5px solid ${BLUE}`, padding: "0.6rem 1.4rem", cursor: "pointer" }}
          >
            {featuresOpen ? <><ChevronUp size={14} /> SHOW LESS</> : <><ChevronDown size={14} /> SEE ALL {FEATURES_VISIBLE.length + FEATURES_HIDDEN.length} FEATURES</>}
          </button>
        </div>
      </section>

      {/* ── FUEL TYPE (BUTTON SELECTOR) ── */}
      <section style={{ padding: "5rem 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>HEAT SOURCES</span>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>Natural Gas, Propane, or Electric</h2>
          </div>

          {/* Fuel selector buttons */}
          <div style={{ display: "flex", gap: "0", marginBottom: "2rem", borderBottom: `2px solid ${BLUE}` }}>
            {HEAT_SOURCES.map(hs => (
              <button
                key={hs.id}
                onClick={() => setActiveFuel(hs.id)}
                style={{
                  fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.75rem 2rem", border: "none", cursor: "pointer",
                  background: activeFuel === hs.id ? BLUE : "transparent",
                  color: activeFuel === hs.id ? "#fff" : "#555",
                  borderBottom: activeFuel === hs.id ? `2px solid ${BLUE}` : "2px solid transparent",
                  marginBottom: "-2px",
                  transition: "all 0.2s",
                }}
              >
                {hs.label}
              </button>
            ))}
          </div>

          {/* Active fuel detail */}
          <div style={{ background: "#f8f8f6", border: `1px solid #e5e5e5`, padding: "2.5rem", maxWidth: "680px" }}>
            <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#111", marginBottom: "0.75rem" }}>{activeFuelData.label}</h3>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#444", lineHeight: 1.75, marginBottom: "1.25rem" }}>{activeFuelData.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {activeFuelData.tags.map(t => (
                <span key={t} style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "#e8e8e6", color: "#333", padding: "0.3rem 0.7rem" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTROL PANELS ── */}
      <section style={{ padding: "5rem 0", background: "#111" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>CONTROL PANELS</span>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>PFS Control Panel Options</h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "560px", marginTop: "0.75rem" }}>
              Every Apollo AMU pairs with a PFS control panel. Choose the level of automation, VFD count, and HMI capability that matches your production requirements. Industrial PLC communication protocols (EtherNet/IP, Modbus, DeviceNet) available on request for CP4000 series.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {PANELS.map(p => (
              <div key={p.model} style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", padding: "2rem", position: "relative" }}>
                <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: p.badgeColor, fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", padding: "0.2rem 0.6rem" }}>{p.badge}</div>
                <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#fff", marginBottom: "0.2rem" }}>{p.model}</div>
                <div style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{p.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                  {[p.type, p.vfd, p.hmi ? "HMI Touchscreen" : "Relay Logic", p.heated ? "Heated Apps" : "Non-Heated"].map(t => (
                    <span key={t} style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", padding: "0.2rem 0.55rem" }}>{t}</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA ── */}
      <section style={{ padding: "4rem 0", background: BLUE }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
              Need Help Sizing Your AMU?
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: "500px" }}>
              Our engineers will size the right unit for your booth CFM, climate zone, heat source, and control panel — at no charge.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=heated-amu">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.9rem 2rem", cursor: "pointer" }}>
                  GET PRICING <ArrowRight size={15} />
                </span>
              </Link>
              <a href="tel:+18885457715">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.5)", padding: "0.9rem 1.8rem", cursor: "pointer" }}>
                  <Phone size={14} /> (888) 545-7715
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY (REAL INSTALLS — BOTTOM) ── */}
      <section style={{ padding: "5rem 0", background: "#f8f8f6" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>REAL INSTALLS</span>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>Apollo AMU in the Field</h2>
          </div>
          <GalleryGrid
            images={[
              { src: HERO_IMG,       alt: "PFS Apollo AMU — rooftop horizontal installation" },
              { src: AMU_INSTALL1,   alt: "PFS Apollo AMU — vertical outdoor install with ductwork, side view" },
              { src: AMU_INSTALL2,   alt: "PFS Apollo AMU — vertical outdoor install with ladder, blue sky" },
              { src: AMU_ROOFTOP,    alt: "Apollo AMU horizontal unit installed on flat roof" },
              { src: AMU_INDOOR,     alt: "Two Apollo AMU units installed indoors with ductwork" },
              { src: AMU_OUTDOOR,    alt: "Multiple AMU units installed on outdoor pad with large ductwork" },
              { src: AMU_BOOTH_0445, alt: "Apollo AMU booth-mounted install — unit being set with forklift" },
              { src: AMU_BOOTH_WALL, alt: "AMU booth-mounted install — vertical unit on exterior wall with control panel" },
            ]}
            cardHeight="280px"
          />
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section style={{ padding: "5rem 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>PAIRS WITH</span>
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, color: "#111", lineHeight: 1.1 }}>Complete Your Finishing System</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              { label: "Enclosed Paint Booths", href: "/products/paint-booths/enclosed", img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg", desc: "The booth your AMU serves." },
              { label: "Batch Ovens", href: "/products/ovens/batch", img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png", desc: "Pair with a heated AMU for spray-bake cycles." },
              { label: "Mixing Rooms", href: "/products/mixing-rooms", img: "/manus-storage/mixing-room-front_7de356e6.jpg", desc: "Tempered air supply for mixing room ventilation." },
              { label: "Prep Stations", href: "/products/prep-stations", img: "/manus-storage/IMG_2133_14cdb1d1.webp", desc: "Heated prep airflow for pre-paint surface work." },
            ].map(r => (
              <Link key={r.label} href={r.href}>
                <div className="group cursor-pointer" style={{ border: "1px solid #e5e5e5", overflow: "hidden", background: "#fff" }}>
                  <div style={{ height: "160px", overflow: "hidden" }}>
                    <img src={r.img} alt={r.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} className="group-hover:scale-105" />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <h4 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#111", marginBottom: "0.35rem" }}>{r.label}</h4>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.5 }}>{r.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Heated Air Make-Up Units — Common Questions</h2>
          </div>
          {[
            { q: "What is a heated air make-up unit (AMU)?", a: "A heated air make-up unit (AMU) is a rooftop or wall-mounted air handler that supplies tempered replacement air to a spray booth to compensate for the air exhausted by the booth's ventilation system. Without a make-up air unit, a spray booth creates negative pressure in the building — causing cold drafts, contamination, and code violations. A heated AMU maintains positive booth pressure, controls booth temperature, and ensures consistent airflow velocity for optimal finish quality." },
            { q: "Why does a spray booth need a make-up air unit?", a: "A spray booth exhausts large volumes of air — typically 10,000 to 30,000 CFM or more depending on booth size. This exhausted air must be replaced with fresh, tempered air to maintain positive booth pressure, prevent cold air infiltration, and comply with NFPA 33 and OSHA ventilation requirements. A make-up air unit provides this replacement air at a controlled temperature and flow rate." },
            { q: "What is the difference between a heated AMU and an unheated AMU?", a: "A heated AMU conditions the incoming replacement air to a set temperature — typically 65–75°F for spray cycles and up to 160°F for bake/cure cycles. An unheated AMU supplies outside air at ambient temperature. Heated AMUs are required for year-round operation in cold climates and for bake/cure cycle capability. Unheated AMUs are suitable only for warm climates or applications where temperature control is not required." },
            { q: "What fuel types are available for PFS heated AMUs?", a: "PFS heated AMUs are available with natural gas, propane (LP), or electric heating. Natural gas is the most common and most economical option where available. Propane is available for facilities without natural gas service. Electric heating is available for facilities where gas is not permitted or for low-BTU applications." },
            { q: "Can a PFS AMU be integrated with the booth control panel?", a: "Yes. PFS AMUs are designed to integrate with the PFS Core Control Panel — the same UL 508A certified control panel supplied with PFS spray booths. The integrated control system manages spray, flash, and bake cycles, coordinates booth and AMU operation, and provides safety interlocks for both units from a single control interface." },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a heated air make-up unit (AMU)?", "acceptedAnswer": { "@type": "Answer", "text": "A heated air make-up unit (AMU) is a rooftop or wall-mounted air handler that supplies tempered replacement air to a spray booth to compensate for the air exhausted by the booth's ventilation system. ..." } },
            { "@type": "Question", "name": "Why does a spray booth need a make-up air unit?", "acceptedAnswer": { "@type": "Answer", "text": "A spray booth exhausts large volumes of air — typically 10,000 to 30,000 CFM or more depending on booth size. This exhausted air must be replaced with fresh, tempered air to maintain positive booth pr..." } },
            { "@type": "Question", "name": "What is the difference between a heated AMU and an unheated AMU?", "acceptedAnswer": { "@type": "Answer", "text": "A heated AMU conditions the incoming replacement air to a set temperature — typically 65–75°F for spray cycles and up to 160°F for bake/cure cycles. An unheated AMU supplies outside air at ambient tem..." } },
            { "@type": "Question", "name": "What fuel types are available for PFS heated AMUs?", "acceptedAnswer": { "@type": "Answer", "text": "PFS heated AMUs are available with natural gas, propane (LP), or electric heating. Natural gas is the most common and most economical option where available. Propane is available for facilities withou..." } },
            { "@type": "Question", "name": "Can a PFS AMU be integrated with the booth control panel?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS AMUs are designed to integrate with the PFS Core Control Panel — the same UL 508A certified control panel supplied with PFS spray booths. The integrated control system manages spray, flash, a..." } }
          ]
        }) }} />
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "5rem 0", background: "#0a0a0a" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Ready to Heat Your Booth?
          </h2>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 2rem" }}>
            Get a quote for your Apollo AMU — sized to your booth CFM, climate, and heat source.
          </p>
          <Link href="/contact/request-a-quote?from=heated-amu">
            <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>
    </div>
  );
}
