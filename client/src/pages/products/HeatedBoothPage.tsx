/*
 * Heated Paint Booths — PFS
 * Route: /products/paint-booths/heated
 * Layout: CrossFlow-style — hero → cert carousel → white-bg Zenith featured photo + intro
 *         → Standard Features collapsible → Available Sizes collapsible → gallery → model cards → CTA
 * Mobile: fully optimized — single column, sticky CTA bar
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Thermometer, Wind, Droplets, Cpu } from "lucide-react";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryLightbox";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
const HERO_IMG = "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png";
const FEATURED_IMG = "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png";

/* ── GALLERY — unique real install photos only ── */
const GALLERY: GalleryImage[] = [
  { src: "/manus-storage/pfs-factory-booth-wide_234b773d.jpeg", alt: "PFS factory floor — side-downdraft and crossflow booths side by side, Orion and Helios models" },
  { src: "/manus-storage/pfs-factory-helios-front_9112086e.jpeg", alt: "PFS Helios — front view with triple glass doors, PFS branding, factory floor" },
  { src: "/manus-storage/DOWNDRAFTHEATED_3b73ef6f.png", alt: "PFS heated paint booth — full downdraft heated configuration" },
  { src: "/manus-storage/IMG_0275_heated_e72c7e2c.jpg", alt: "PFS heated booth — exterior install view" },
  { src: "/manus-storage/IMG_0282_heated_2a60d21c.jpg", alt: "PFS heated booth — exterior side view" },
  { src: "/manus-storage/IMG_8441_heated_ac4423a3.jpg", alt: "PFS heated booth — exterior front view" },
  { src: "/manus-storage/heated_exterior_front_pfs_60f51615.jpg", alt: "PFS heated booth — PFS branding, front doors, ETL badge" },
  { src: "/manus-storage/heated_exterior_side_duct_f49e0e74.jpg", alt: "PFS heated booth — exterior side view showing heat stack and ductwork" },
  { src: "/manus-storage/heated_rear_burner_panel_b42c6dce.jpg", alt: "PFS heated booth — rear burner panel, gas lines, and fire suppression" },
  { src: "/manus-storage/heated_front_shop_dual_1c41d8ff.jpg", alt: "PFS heated booth — dual booth install in auto shop, front view" },
  { src: "/manus-storage/heated_side_exhaust_shop_527b7473.jpg", alt: "PFS heated booth — side exhaust stack and control panel in shop" },
  { src: "/manus-storage/pfs-heated-booth-exhaust-stack_ca825d7b.jpeg", alt: "PFS heated booth — exhaust stack, heater unit, and fire suppression install" },
  { src: "/manus-storage/pfs-collision-repair-multi-booth-showroom_9f44f9a6.jpeg", alt: "PFS multi-booth showroom floor — three PFS booths" },
  { src: "/manus-storage/pfs-apollo-amu-rooftop_9a42ebf0.jpg", alt: "PFS Apollo AMU — rooftop air make-up unit installed on booth" },
  { src: "/manus-storage/pfs-helios-heated-booth-front_37d91be3.jpeg", alt: "PFS Helios heated spray booth — front view, triple-door entry, installed in shop" },
  { src: "/manus-storage/pfs-helios-heated-booth-angled_d7ad0f9c.jpeg", alt: "PFS Helios heated spray booth — angled view showing AMU plenum and side exhaust" },
  { src: "/manus-storage/pfs-helios-sdd-front-full_04883b65.jpg", alt: "PFS Helios heated booth — front view, triple-door entry, Helios badge, installed in shop" },
  { src: "/manus-storage/pfs-helios-sdd-side-angle_9f43d877.jpg", alt: "PFS Helios heated booth — side angle view showing AMU plenum and booth body" },
  { src: "/manus-storage/pfs-helios-sdd-door-closeup_888f9187.jpg", alt: "PFS Helios heated booth — close-up of triple entry doors with Helios branding" },
  { src: "/manus-storage/pfs-helios-sdd-side-install_fb8a847b.jpg", alt: "PFS Helios heated booth — side view during installation showing AMU plenum structure" },
  { src: "/manus-storage/pfs-helios-sdd-front-angle_77d8d4fa.jpg", alt: "PFS Helios heated booth — front angle view showing doors and side plenum" },
  { src: "/manus-storage/pfs-helios-sdd-side-rear_fa0388f5.jpg", alt: "PFS Helios heated booth — rear side angle showing plenum framing during install" },
  { src: "/manus-storage/pfs-helios-sdd-install-wide_a6bec064.jpg", alt: "PFS Helios heated booth — wide install shot showing full booth and side plenum assembly" },
  { src: "/manus-storage/pfs-helios-sdd-plenum-detail_d3b8c678.jpg", alt: "PFS Helios heated booth — detail view of side plenum filter bays and framing" },
  { src: "/manus-storage/pfs-helios-sdd-jcb-install_cd269044.jpg", alt: "PFS Helios heated booth — installation in progress with JCB telehandler lifting booth panels" },
];

/* ── CERT LOGOS ── */
const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "US & Canada Safety Certification", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant", sub: "Spray Application Standard", imgH: 44 },
  { img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", imgH: 36 },
  { img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

/* ── FEATURES — CrossFlow card style ── */
const FEATURES_VISIBLE = [
  { num: "01", title: "Max Bake Temperature — 180°F", body: "PFS heated booths reach a maximum bake temperature of 180°F. Programmable cycle timers hold the booth at the target temperature for the required dwell time, then automatically ramp down — no manual intervention needed." },
  { num: "02", title: "Available on Orion, Helios & Zenith", body: "Heated options are available across all three PFS enclosed booth series — Orion (cross-flow), Helios (side-downdraft), and Zenith (full downdraft). Same heat system, same controls, same certifications regardless of airflow configuration." },
  { num: "03", title: "UL 508A Control Panel — Spray, Flash, Bake", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and bake modes. Programmable cycle timers, safety interlocks, and optional BMS integration. All three modes are selectable from the front panel." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "Direct-Fired or Indirect-Fired Heaters", body: "Choose from direct-fired natural gas, indirect-fired gas, propane, or electric heater configurations. Direct-fired delivers the highest BTU output for large booths. Indirect-fired is required for solvent-borne coatings. Electric is available for clean-room and zero-emission facilities." },
  { num: "05", title: "Optional Humidity Controls", body: "Optional humidity control module maintains target relative humidity during spray and cure cycles. Critical for waterborne basecoat applications and high-humidity climates where moisture can affect finish quality and dry times." },
  { num: "06", title: "Blanket Intake Filter Upgrade (Optional)", body: "Blanket intake filter upgrade is available as an option on all heated configurations. Blanket media provides higher surface area and lower pressure drop than standard tacky filters — critical for maintaining airflow efficiency at elevated temperatures." },
  { num: "07", title: "Advanced Controls — Data Integration", body: "Advanced control option enables the booth to communicate with external data-collecting systems — SCADA, MES, ERP, or building management systems. Log cycle data, temperatures, run times, and filter status for quality records and predictive maintenance." },
];

/* ── SIZES — available on all three series ── */
const SIZES = [
  { model: "PFS Orion", series: "Cross-Flow", dims: "14'W × 9–12'H × 24–33'L", href: "/products/paint-booths/crossflow" },
  { model: "PFS Helios", series: "Side Downdraft", dims: "14'W × 9–12'H × 24–33'L", href: "/products/paint-booths/side-downdraft" },
  { model: "PFS Zenith", series: "Full Downdraft", dims: "14'W × 9–12'H × 24–33'L", href: "/products/paint-booths/full-downdraft" },
];

/* ── COMPATIBLE MODELS ── */
const MODELS = [
  { name: "PFS Orion", series: "Cross-Flow", href: "/products/paint-booths/crossflow", img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp", desc: "Horizontal cross-flow airflow. Most cost-effective enclosed booth. Heated option adds direct or indirect-fired heat system with full spray/flash/bake modes." },
  { name: "PFS Helios", series: "Side Downdraft", href: "/products/paint-booths/side-downdraft", img: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png", desc: "Side-wall exhaust plenums — no pit required. Heated option available with blanket intake upgrade and full temperature control." },
  { name: "PFS Zenith", series: "Full Downdraft", href: "/products/paint-booths/full-downdraft", img: "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png", desc: "Full downdraft airflow through a raised basement or pit. Highest finish quality. Heated option with 180°F max bake and advanced data controls." },
];

function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const step = () => {
      posRef.current += 0.5;
      if (posRef.current >= totalWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);
  return (
    <section style={{ background: "#fff", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", zIndex: 2, background: "linear-gradient(to right, #fff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", zIndex: 2, background: "linear-gradient(to left, #fff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2rem", borderRight: "1px solid #e5e7eb", flexShrink: 0 }}>
              <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.72rem", color: "#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HeatedBoothPage() {
  useSEO({
    title: "Heated Spray Booths | Spray & Bake Paint Booths | PFS Industrial",
    description: "PFS heated spray booths combine spray and cure cycles in one enclosure. Integrated heat system accelerates drying and curing for higher throughput. NFPA 33 compliant, UL 508A panel, ETL/UL listed components. Custom sizes available. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/heated",
  });

  const [specsOpen, setSpecsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "clamp(380px, 60vh, 620px)", background: "#0a0a0a", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO_IMG} alt="PFS Zenith heated paint booth" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: 0.5 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "5rem 0 4rem" }}>
          <nav style={{ marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <Link href="/"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>HOME</span></Link>{" / "}
              <Link href="/products"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>PRODUCTS</span></Link>{" / "}
              <Link href="/products/paint-booths"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>PAINT BOOTHS</span></Link>{" / "}
              <span style={{ color: "rgba(255,255,255,0.8)" }}>HEATED</span>
            </span>
          </nav>
          <div style={{ maxWidth: "560px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(27,58,107,0.4)", border: "1px solid rgba(91,141,217,0.5)", padding: "0.3rem 0.75rem", marginBottom: "1rem" }}>
              <Thermometer size={12} style={{ color: "#6b9bd2" }} />
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.18em", color: "#6b9bd2", textTransform: "uppercase" }}>MAX BAKE TEMP 180°F</span>
            </div>
            <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.0, marginBottom: "1.1rem", textTransform: "uppercase" }}>
              Heated<br />Paint Booths
            </h1>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.88rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "460px" }}>
              Available on the PFS Orion, Helios, and Zenith — any booth, any airflow configuration. Spray, flash, and bake modes with programmable cure cycles up to 180°F.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/contact/request-a-quote?from=heated-booth" data-animation="slideLeft">
                <span className="btn-glow">GET PRICING <ArrowRight size={14} /></span>
              </Link>
              <a href="tel:8885457715" data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.35)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem" }}>
                CALL (888) 545-7715
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── WHITE-BG ZENITH FEATURED PHOTO + INTRO ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>PFS HEATED SERIES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Spray. Flash. Bake. All in One Booth.</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>PFS ZENITH — FULL DOWNDRAFT</span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                PFS heated booths add a direct-fired or indirect-fired heat system to any enclosed booth configuration. ETL listed, NFPA 33 compliant, UL 508A controls. Spray, flash, and bake modes built in — programmable cure cycles up to 180°F.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", background: "#fff", padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={FEATURED_IMG} alt="PFS Zenith heated paint booth — white background" style={{ width: "100%", maxWidth: "700px", height: "auto", objectFit: "contain" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem", width: "100%", maxWidth: "900px" }}>
              {[
                { icon: <Thermometer size={14} style={{ color: BLUE }} />, label: "Max 180°F Bake Temp" },
                { icon: <Wind size={14} style={{ color: BLUE }} />, label: "Direct or Indirect-Fired" },
                { icon: <Droplets size={14} style={{ color: BLUE }} />, label: "Optional Humidity Control" },
                { icon: <Cpu size={14} style={{ color: BLUE }} />, label: "Data Integration Ready" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 0.75rem", background: "#fff", border: "1px solid #e5e7eb" }}>
                  {item.icon}
                  <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#111" }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=heated-booth" data-animation="slideRight">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STANDARD FEATURES — collapsible (CrossFlow style) ── */}
      <section style={{ background: "#fff", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD FEATURES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Every Heated Booth Ships Fully Certified</h2>
            </div>
            <button data-animation="slideLeft" onClick={() => setSpecsOpen(!specsOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: specsOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: specsOpen ? "#fff" : BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {specsOpen ? <><ChevronUp size={15} /> HIDE SPECS</> : <><ChevronDown size={15} /> SEE STANDARD SPECS</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=heated-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=heated-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <button onClick={() => setFeaturesOpen(!featuresOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: `2px solid ${BLUE}`, color: BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.75rem", cursor: "pointer" }}>
                  {featuresOpen ? <><ChevronUp size={15} /> SHOW LESS</> : <><ChevronDown size={15} /> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── AVAILABLE SIZES — collapsible (CrossFlow style) ── */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Available on All Three PFS Series</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSizesOpen(!sizesOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.88rem", color: "#666", marginBottom: "1.5rem" }}>Heated options are available on the Orion, Helios, and Zenith. Standard booths are 14' wide — select a series to configure your heated booth.</p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {SIZES.map((s) => (
                  <div key={s.model} style={{ background: "#fff", border: `2px solid ${BLUE}`, padding: "1.5rem 1rem", textAlign: "center" }}>
                    <div data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "0.4rem" }}>{s.series}</div>
                    <div data-animation="slideRight" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#111", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>{s.model}</div>
                    <div data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.72rem", color: "#888", marginBottom: "1rem" }}>{s.dims}</div>
                    <Link href={s.href}><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>VIEW BOOTH <ArrowRight size={12} /></span></Link>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact/request-a-quote?from=heated-booth"><span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15} /></span></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY — unique photos only ── */}
      <section style={{ padding: "3rem 0 4rem", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>REAL INSTALLS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>Heated Booth Gallery</h2>
          </div>
          <GalleryGrid images={GALLERY} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
        </div>
      </section>

      {/* ── AVAILABLE ON — model cards ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>AVAILABLE ON</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Any PFS Enclosed Booth</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.88rem", color: "#666", maxWidth: "460px", margin: "0 auto", lineHeight: 1.7 }}>Same heat system, same controls, same certifications — regardless of airflow configuration.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.map((m) => (
              <Link key={m.name} href={m.href}>
                <div style={{ display: "flex", flexDirection: "column", border: "2px solid #d0d8e8", overflow: "hidden", cursor: "pointer", background: "#fff" }} className="group hover:border-blue-800 transition-colors">
                  <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#f5f5f5", position: "relative" }}>
                    <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} className="group-hover:scale-105" />
                    <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: BLUE, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.6rem" }}>{m.series}</div>
                  </div>
                  <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
                    <div data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{m.name}</div>
                    <div data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "#555", lineHeight: 1.5, marginBottom: "0.75rem" }}>{m.desc}</div>
                    <div data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>VIEW BOOTH <ArrowRight size={12} /></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div data-animation="slideLeft">
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", margin: "0 0 0.5rem" }}>Ready to Configure Your Heated Booth?</h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=heated-booth" data-animation="slideLeft" >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem", cursor: "pointer" }}>GET PRICING <ArrowRight size={14} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem" }}>
              CALL (888) 545-7715
            </a>
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background: "#f8f9fb", padding: "clamp(2.5rem, 6vw, 4rem) 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: "#1B3A6B", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Heated Spray Booths — Common Questions</h2>
          </div>
          {[
            { q: "What is a heated spray booth?", a: "A heated spray booth is an enclosed finishing booth equipped with a direct-fired or indirect-fired burner system that heats the incoming make-up air to a controlled temperature. Heated booths accelerate paint curing, improve finish quality in cold weather, and enable faster cycle times compared to unheated booths. They are standard equipment in high-volume automotive refinishing, aerospace, and industrial finishing operations." },
            { q: "What is the difference between a direct-fired and an indirect-fired heated booth?", a: "A direct-fired heated booth passes combustion gases directly into the airstream — the burner flame contacts the incoming air. This is the most energy-efficient heating method but is only suitable for waterborne coatings and applications where combustion products in the airstream are acceptable. An indirect-fired (heat exchanger) system keeps combustion gases completely separate from the booth airstream — required for solvent-borne coatings and any application where combustion product contamination is a concern." },
            { q: "What temperature can a PFS heated spray booth reach?", a: "PFS heated spray booths are designed to maintain booth temperatures up to 160°F (71°C) for bake/cure cycles. Standard spray cycle temperatures are typically 65–75°F. Bake cycle temperatures for automotive clearcoat cure are typically 140–160°F. Custom temperature ranges are available for specialty coating applications." },
            { q: "Is a heated spray booth NFPA 33 compliant?", a: "Yes. PFS heated spray booths are built to NFPA 33 standards for spray application of flammable and combustible materials. The booth ships with a UL 508A certified control panel, ETL/UL listed and certified components, and complies with OSHA 1910.94 ventilation requirements." },
            { q: "How much does it cost to heat a spray booth?", a: "Heating costs depend on booth size, local natural gas or propane prices, climate, and operating hours. PFS engineers can provide estimated BTU requirements and operating cost projections for your specific booth configuration and location. Contact PFS for a detailed energy analysis with your quote." },
          ].map((item, i) => (
            <details key={i} style={{ borderBottom: "1px solid #e5e7eb", padding: "1.25rem 0" }}>
              <summary style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(0.95rem,2.5vw,1.1rem)", fontWeight: 800, color: "#111", letterSpacing: "0.01em", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                {item.q}
                <span style={{ color: "#1B3A6B", flexShrink: 0, fontSize: "1.4rem", fontWeight: 300, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.82rem,2vw,0.9rem)", color: "#555", lineHeight: 1.75, margin: "1rem 0 0", paddingRight: "1.5rem" }}>{item.a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What is a heated spray booth?", "acceptedAnswer": { "@type": "Answer", "text": "A heated spray booth is an enclosed finishing booth equipped with a direct-fired or indirect-fired burner system that heats the incoming make-up air to a controlled temperature. Heated booths accelera..." } },
              { "@type": "Question", "name": "What is the difference between a direct-fired and an indirect-fired heated booth?", "acceptedAnswer": { "@type": "Answer", "text": "A direct-fired heated booth passes combustion gases directly into the airstream — the burner flame contacts the incoming air. This is the most energy-efficient heating method but is only suitable for ..." } },
              { "@type": "Question", "name": "What temperature can a PFS heated spray booth reach?", "acceptedAnswer": { "@type": "Answer", "text": "PFS heated spray booths are designed to maintain booth temperatures up to 160°F (71°C) for bake/cure cycles. Standard spray cycle temperatures are typically 65–75°F. Bake cycle temperatures for automo..." } },
              { "@type": "Question", "name": "Is a heated spray booth NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS heated spray booths are built to NFPA 33 standards for spray application of flammable and combustible materials. The booth ships with a UL 508A certified control panel, ETL/UL listed and cert..." } },
              { "@type": "Question", "name": "How much does it cost to heat a spray booth?", "acceptedAnswer": { "@type": "Answer", "text": "Heating costs depend on booth size, local natural gas or propane prices, climate, and operating hours. PFS engineers can provide estimated BTU requirements and operating cost projections for your spec..." } }
            ]
          })
        }} />
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>PAIRS WELL WITH</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>Complete Your Finishing System</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Heated Air Make-Up Units", href: "/products/air-make-up-units/heated", img: "/manus-storage/pfs-amu-card_41f0dd88.jpg", desc: "Conditioned make-up air to replace exhausted air and maintain positive booth pressure during heat cycles." },
              { label: "Mixing Rooms", href: "/products/mixing-rooms", img: "/manus-storage/IMG_0498_a98f5f38.jpg", desc: "Dedicated mixing rooms for safe paint preparation adjacent to your heated spray booth." },
              { label: "Prep Stations", href: "/products/prep-support/prep-stations", img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg", desc: "Dedicated prep and masking stations to keep your heated booth running at full capacity." },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <div style={{ display: "flex", flexDirection: "column", border: "2px solid #d0d8e8", overflow: "hidden", cursor: "pointer", background: "#fff" }} className="group hover:border-blue-800 transition-colors">
                  <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#f5f5f5" }}>
                    <img src={item.img} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} className="group-hover:scale-105" />
                  </div>
                  <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
                    <div data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{item.label}</div>
                    <div data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "#555", lineHeight: 1.5, marginBottom: "0.75rem" }}>{item.desc}</div>
                    <div data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>LEARN MORE <ArrowRight size={12} /></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, display: "flex", background: "#111", borderTop: `3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", borderRight: "1px solid rgba(255,255,255,0.15)", textDecoration: "none" }}>
          ☎ (888) 545-7715
        </a>
        <Link href="/contact/request-a-quote?from=heated-booth" style={{ flex: 1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>
    </div>
  );
}
