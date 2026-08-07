/**
 * Batch Ovens — PFS
 * Dedicated rich page: video hero, cert carousel, features, size selector, gallery, multiple CTAs
 * Route: /products/ovens/batch
 * Design: Deep navy #1B3A6B, Chakra Petch / Barlow Condensed headlines, Archivo Narrow body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── ASSETS ── */
const HERO_IMG = "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png";
const FEATURED_IMG = "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png";

const GALLERY_IMGS = [
  // Real install photos first
  { src: "/manus-storage/IMG_4175_a7a2b2ea.jpg", alt: "PFS batch curing oven — real install photo, front view", pos: "center 50%" },
  { src: "/manus-storage/IMG_4182_72dfc596.jpg", alt: "PFS batch curing oven — real install photo, side angle", pos: "center 50%" },
  { src: "/manus-storage/pfs-walkin-batch-booth-front-wide_4f44f772.jpg", alt: "PFS batch curing oven — front view with double entry doors, installed in industrial facility", pos: "center 50%" },
  { src: "/manus-storage/pfs-walkin-batch-booth-front-scissor_13c63689.jpg", alt: "PFS batch curing oven — front view with scissor lift during installation", pos: "center 50%" },
  { src: "/manus-storage/pfs-walkin-batch-booth-side-angle1_9b6faf8e.jpg", alt: "PFS batch curing oven — side angle view showing panel construction and exhaust stack", pos: "center 50%" },
  { src: "/manus-storage/pfs-walkin-batch-booth-side-angle2_9b7ce2ca.jpg", alt: "PFS batch curing oven — side angle view during installation", pos: "center 50%" },
  // Renders
  { src: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png", alt: "PFS VULCAN batch curing oven — product render", pos: "center 50%" },
];

const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

/* ── CERTIFICATIONS ── */
const CERTS = [
  { img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "Intertek — USA & Canada", imgH: 44 },
  { img: UL_LOGO, title: "UL 508A Certified", sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA Compliant", sub: "Industrial Finishing Standard", imgH: 44 },
  { img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", imgH: 36 },
  { img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

/* ── FEATURES ── */
const FEATURES_VISIBLE = [
  { num: "01", title: "Double-Wall Insulated Panels", body: "6-inch insulated walls and roof filled with high-density mineral wool insulation. Superior thermal retention reduces energy consumption and maintains stable curing temperatures throughout the oven chamber." },
  { num: "02", title: "UL 508A Industrial Control Panel", body: "UL 508A certified control panel with digital temperature controllers, safety interlocks, burner management, and operator controls." },
  { num: "03", title: "High-Efficiency Heating System", body: "Natural gas or propane-fired burner packages from premium industrial manufacturers. Large circulation blowers continuously move heated air to eliminate temperature stratification and promote consistent curing across the full workload." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "Heavy-Duty Steel Construction", body: "20-gauge or thicker steel throughout. Structural components, roof panels, wall systems, ductwork, and plenums manufactured from heavy-gauge galvanized, aluminized, or stainless steel depending on application." },
  { num: "05", title: "Engineered Exhaust & Airflow", body: "Heavy-duty exhaust fans mounted on vibration-isolated supports. Each exhaust package is engineered specifically for the oven size and production requirements while complying with applicable code requirements." },
  { num: "06", title: "Modular Bolt-Together Construction", body: "Most structural components use precision bolt-together construction — reducing installation time while maintaining structural integrity. Modular design allows future expansion or relocation when production requirements change." },
  { num: "07", title: "Multiple Door Configurations", body: "Swing doors, bi-parting doors, vertical lift doors, conveyor pass-through openings, and custom frontal assemblies. Each door incorporates reinforced steel frame with thick mineral wool insulation and emergency-release hardware." },
  { num: "08", title: "Comprehensive Safety Systems", body: "Flame safeguard system, high/low gas pressure switches, automatic burner shutdown, combustion purge cycle, high-limit temperature protection, motor overload protection, emergency stop circuitry, and audible/visual alarm system." },
  { num: "09", title: "Advanced Control Options", body: "PLC-based automation, color touchscreen HMI, PID temperature control, Variable Frequency Drives (VFDs), production data logging, remote monitoring and diagnostics, and recipe management — configured to your production requirements." },
  { num: "10", title: "Ships Nationally", body: "PFS batch ovens ship to all 50 states." },
];

/* ── SIZES ──
   Format: width (H) × height (H) × depth (L)  — all in feet
   Common sizes: 10x10x10, 10x10x20, 12x10x20, 10x30x10, 10x15x10,
                 12x10x30, 12x10x40, 14x10x20 + custom
*/
const SIZES: Record<string, Record<string, string[]>> = {
  "10'": {
    "10'": ["10'", "15'", "20'", "30'"],
    "12'": ["10'", "20'", "30'"],
  },
  "12'": {
    "10'": ["20'", "30'", "40'"],
    "12'": ["20'", "30'", "40'"],
  },
  "14'": {
    "10'": ["20'", "30'", "40'"],
    "12'": ["20'", "30'"],
  },
};
const WIDTH_KEYS = ["10'", "12'", "14'"];

/* ── RELATED PRODUCTS ── */
const PRODUCTS = [
  { label: "Powder Coating Systems", href: "/products/powder-booths", img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png", desc: "Complete powder coating booths for batch and automated production lines." },
  { label: "Conveyor Ovens", href: "/products/ovens/conveyor", img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png", desc: "Continuous conveyor ovens for high-volume powder curing on automated lines." },
  { label: "Spray Paint Booths", href: "/products/paint-booths", img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg", desc: "Full-enclosure spray booths for superior overspray containment and finish quality." },
  { label: "Prep Stations", href: "/products/prep-support/prep-stations", img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg", desc: "Dedicated prep and masking stations to keep your finishing line at full capacity." },
];

/* ── CERT CAROUSEL ── */
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
    <section style={{ background: "#ffffff", padding: "0", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111", boxShadow: "0 4px 0 0 #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid #e5e7eb", flexShrink: 0 }}>
              <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.72rem", color: "#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function BatchOvenPage() {
  useSEO({
    title: "Batch Ovens | Industrial Powder Coating Ovens | PFS",
    description: "PFS batch ovens deliver precise, uniform heat for powder coating cure cycles and industrial heat treating. Compact design, rapid heat-up, stable temperature control, NFPA 86 compliant. Manufactured in Santa Rosa, CA with ETL/UL listed components.",
    canonical: "/products/ovens/batch",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);
  const [selectedWidth, setSelectedWidth] = useState<string>("10'");
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  const availableDepths: string[] = (selectedWidth && SIZES[selectedWidth]?.["10'"]) || [];

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED IMAGE HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(340px, 55vh, 580px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <img
          src={HERO_IMG}
          alt="PFS VULCAN batch curing oven"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.72) 38%, rgba(5,5,5,0.35) 70%, rgba(5,5,5,0.12) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "3.5rem" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {[{ label: "Products", href: "/products" }, { label: "Industrial Ovens", href: "/products/ovens" }, { label: "Batch Ovens" }].map((crumb, i, arr) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                {crumb.href
                  ? <Link href={crumb.href}><span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", cursor: "pointer" }}>{crumb.label}</span></Link>
                  : <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>{crumb.label}</span>
                }
                {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>›</span>}
              </span>
            ))}
          </nav>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>INDUSTRIAL OVENS — BATCH</span>
          <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(2.6rem,7vw,5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "700px" }}>
            Batch Curing Ovens<br />
            Built for Production
          </h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)", color: "#6fa3e0", borderRadius: "2px", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem", marginBottom: "1.25rem" }}>PFS VULCAN SERIES</span>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "clamp(0.95rem,1.8vw,1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "520px" }}>
            Industrial powder curing, paint baking, and heat treating ovens. Double-wall insulated panels, UL 508A controls, gas or electric heat. Custom sizes available. Ships nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=batch-oven" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <Link href="/contact/talk-to-an-engineer?from=batch-oven" data-animation="slideRight">
              <span className="btn-glow-white" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>TALK TO AN ENGINEER <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── OVERVIEW STATS ── */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1.5rem" }}>
            {[
              { val: "20-ga+", label: "Steel Construction" },
              { val: "6\"", label: "Insulated Walls & Roof" },
              { val: "UL 508A", label: "Certified Control Panel" },
              { val: "Custom", label: "Sizes Available" },
              { val: "Gas/LP", label: "or Electric Heat" },
              { val: "USA", label: "Manufactured" },
            ].map((s) => (
              <div key={s.val} style={{ background: "#fff", border: "1px solid #e5e7eb", padding: "1.5rem", textAlign: "center" }} data-animation="fadeIn">
                <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1.9rem", fontWeight: 800, color: BLUE, letterSpacing: "-0.01em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.78rem", color: "#666", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED OVEN ── */}
      <section style={{ background: "#fff", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>FEATURED OVEN</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>PFS VULCAN Batch Curing Oven</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>PFS VULCAN SERIES</span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                Double-wall insulated construction. UL 508A controls. Gas, propane, or electric heat. Available in walk-in, drive-in, and conveyor pass-through configurations. Standard and fully custom sizes.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "880px", overflow: "hidden", borderRadius: "2px", background: "#111", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              <img src={FEATURED_IMG} alt="PFS VULCAN batch curing oven" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain", maxHeight: "420px" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=batch-oven" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/contact/talk-to-an-engineer?from=batch-oven" data-animation="slideRight">
                <span className="btn-outline">TALK TO AN ENGINEER <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STANDARD FEATURES — collapsible ── */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD FEATURES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Every Oven Ships Fully Equipped</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSpecsOpen(!specsOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: specsOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: specsOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {specsOpen ? <><ChevronUp size={15} /> HIDE FEATURES</> : <><ChevronDown size={15} /> SEE STANDARD FEATURES</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background: "#fff", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=batch-oven"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background: "#fff", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=batch-oven"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <button onClick={() => setFeaturesOpen(!featuresOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: `2px solid ${BLUE}`, color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.75rem", cursor: "pointer" }}>
                  {featuresOpen ? <><ChevronUp size={15} /> SHOW LESS</> : <><ChevronDown size={15} /> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── SAFETY SYSTEMS HIGHLIGHT ── */}
      <section style={{ background: "#111", padding: "3rem 0", borderTop: `4px solid ${BLUE}` }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>BUILT-IN PROTECTION</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Comprehensive Safety — Standard on Every Unit</h2>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                PFS batch ovens include the following safety equipment as standard:
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "0.75rem" }}>
              {[
                "UL 508A Industrial Control Panel", "NEMA-Rated Electrical Enclosure", "Manual Gas Shutoff Valves",
                "High & Low Gas Pressure Switches", "Flame Safeguard System", "Automatic Burner Shutdown",
                "Combustion Airflow Verification", "Chamber Temperature Monitoring", "High-Limit Temperature Protection",
                "Combustion & Oven Purge Cycle", "Motor Overload Protection", "Emergency Stop Circuitry",
                "Seismic-Ready Structure",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "0.5rem" }} data-animation="slideRight">
              <Link href="/contact/talk-to-an-engineer?from=batch-oven">
                <span className="btn-glow">TALK TO AN ENGINEER <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIZES — selector ── */}
      <section style={{ background: "#fff", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Find Your Configuration</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSizesOpen(!sizesOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
            </button>
          </div>

          {sizesOpen && (
            <>
              <p style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.88rem", color: "#666", marginBottom: "1.75rem" }}>
                Select a width — available depths appear below. All sizes listed at 10&apos; interior height. Custom heights, widths, and depths available on request.
              </p>

              {/* Width selector */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "0.6rem" }}>SELECT WIDTH</div>
                <div style={{ display: "inline-flex", border: `2px solid ${BLUE}`, overflow: "hidden", borderRadius: "2px", flexWrap: "wrap" }}>
                  {WIDTH_KEYS.map((w, i, arr) => (
                    <button
                      key={w}
                      onClick={() => { setSelectedWidth(w); setSelectedDepth(null); }}
                      style={{ padding: "0.75rem 1.75rem", background: selectedWidth === w ? BLUE : "transparent", color: selectedWidth === w ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: i < arr.length - 1 ? `1px solid ${BLUE}` : "none", cursor: "pointer", transition: "background 0.15s,color 0.15s" }}
                    >{w} WIDE</button>
                  ))}
                </div>
              </div>

              {/* Depth cards */}
              {selectedWidth && availableDepths.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "0.75rem" }}>AVAILABLE LENGTHS — {selectedWidth} WIDE × 10&apos; HIGH</div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {availableDepths.map((d) => (
                      <div
                        key={d}
                        onClick={() => setSelectedDepth(d)}
                        style={{ background: selectedDepth === d ? BLUE : "#f5f5f5", border: `2px solid ${BLUE}`, padding: "1.25rem 1.5rem", minWidth: "180px", textAlign: "center", cursor: "pointer", transition: "background 0.15s,color 0.15s" }}
                      >
                        <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1.5rem", fontWeight: 800, color: selectedDepth === d ? "#fff" : "#111", letterSpacing: "0.02em", marginBottom: "0.2rem" }}>{selectedWidth} × 10&apos; × {d}</div>
                        <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.72rem", color: selectedDepth === d ? "rgba(255,255,255,0.7)" : "#888", marginBottom: "0.85rem" }}>W × H × L</div>
                        <Link href="/contact/request-a-quote?from=batch-oven"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: selectedDepth === d ? "#fff" : BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>GET PRICING <ArrowRight size={12} /></span></Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common sizes quick reference */}
              <div style={{ background: "#f5f5f5", border: "1px solid #e5e7eb", padding: "1.5rem 2rem", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "0.75rem" }}>COMMON SIZES — QUICK REFERENCE</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["10×10×10", "10×10×20", "12×10×20", "10×30×10", "10×15×10", "12×10×30", "12×10×40", "14×10×20"].map((sz) => (
                    <Link key={sz} href="/contact/request-a-quote?from=batch-oven">
                      <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: BLUE, border: `1px solid ${BLUE}`, padding: "0.4rem 0.9rem", cursor: "pointer", letterSpacing: "0.06em" }}>{sz}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Custom sizes CTA */}
              <div style={{ background: BLUE, padding: "1.75rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#fff", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>Need a Custom Size?</div>
                  <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.83rem", color: "rgba(255,255,255,0.8)" }}>Custom widths, heights, and lengths available. We engineer to your facility and production requirements.</div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link href="/contact/request-a-quote?from=batch-oven">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.9rem 2rem", cursor: "pointer", whiteSpace: "nowrap" }}>REQUEST CUSTOM SIZE <ArrowRight size={14} /></span>
                  </Link>
                  <Link href="/contact/talk-to-an-engineer?from=batch-oven">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.9rem 2rem", cursor: "pointer", whiteSpace: "nowrap" }}>TALK TO AN ENGINEER <ArrowRight size={14} /></span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "3rem 0 4rem", background: "#f5f5f5" }}>
        <div className="container">
          <div className="text-center mb-6">
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>GALLERY</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="320px" className="grid grid-cols-1 sm:grid-cols-3 gap-3" />
          </div>
          <div className="text-center" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=batch-oven" data-animation="slideLeft">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Ready to Configure Your Batch Oven?</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Every system factory-tested before shipment.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link data-animation="slideLeft" href="/contact/request-a-quote?from=batch-oven">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <Link href="/contact/talk-to-an-engineer?from=batch-oven">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>TALK TO AN ENGINEER <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── DOOR CONFIGURATIONS ── */}
      <section style={{ background: "#fff", padding: "3rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>DOOR OPTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Door Configurations</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.9rem", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              PFS oven doors are available in the following configurations:
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "1rem" }} data-animation="fadeIn">
            {[
              { title: "Swing Doors", desc: "Single or double swing doors — standard configuration for most batch applications." },
              { title: "Bi-Parting Doors", desc: "Two-panel doors that open from the center — ideal for wide openings and drive-in access." },
              { title: "Vertical Lift Doors", desc: "Overhead lift doors for maximum clear opening — popular for forklift loading." },
              { title: "Conveyor Pass-Through", desc: "Slot openings sized for overhead or floor conveyor systems." },
              { title: "Custom Frontal Assemblies", desc: "Engineered to your facility requirements — any size, any configuration." },
            ].map((d) => (
              <div key={d.title} style={{ background: "#f5f5f5", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
                <div style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "0.95rem", fontWeight: 800, color: "#111", marginBottom: "0.5rem" }}>{d.title}</div>
                <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=batch-oven">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTROL SYSTEMS ── */}
      <section style={{ background: "#111", padding: "3rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "center" }}>
            <div style={{ flex: "1 1 280px" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>INDUSTRIAL CONTROLS</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Advanced Control Systems</h2>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                UL 508A control system included. Standard and advanced options available.
              </p>
              {/* <Link href="/contact/talk-to-an-engineer?from=batch-oven" data-animation="slideRight">
                <span className="btn-glow">TALK TO AN ENGINEER <ArrowRight size={15} /></span>
              </Link> */}

              <Link href="/contact/talk-to-an-engineer?from=batch-oven" data-animation="slideRight" className="btn-glow">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  TALK TO AN ENGINEER
                  <ArrowRight size={15} />
                </span>
              </Link>
            </div>
            <div style={{ flex: "1 1 280px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {[
                "UL 508A Control Panels", "Digital Temperature Controllers", "PLC-Based Automation",
                "Color Touchscreen HMI", "PID Temperature Control", "Variable Frequency Drives",
                "Production Data Logging", "Remote Monitoring", "Recipe Management",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.75)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── FAQ SECTION ── */}
      <section style={{ background: "#f9f9f9", padding: "4rem 0" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question", "name": "What is a batch oven used for?",
                "acceptedAnswer": { "@type": "Answer", "text": "A batch oven is an industrial curing oven designed to process parts in individual loads rather than on a continuous conveyor. Batch ovens are widely used for powder coating cure cycles, liquid paint baking, heat treating, drying, and preheating. They are ideal for job shops, low-to-medium production volumes, and operations with varied part sizes." }
              },
              {
                "@type": "Question", "name": "What temperature does a batch oven need to reach for powder coating?",
                "acceptedAnswer": { "@type": "Answer", "text": "Most powder coatings require a metal temperature of 325°F to 400°F (163°C–204°C) held for 10–20 minutes depending on the specific powder. PFS batch ovens are engineered to reach and maintain these temperatures with ±10°F uniformity throughout the chamber." }
              },
              {
                "@type": "Question", "name": "What is the difference between a batch oven and a walk-in oven?",
                "acceptedAnswer": { "@type": "Answer", "text": "A batch oven is typically a smaller, front-loading unit designed for moderate part sizes and production volumes. A walk-in oven is a larger drive-in or walk-in chamber designed for oversized parts, assemblies, or high-volume production loads. PFS manufactures both configurations and can help you select the right system for your throughput requirements." }
              },
              {
                "@type": "Question", "name": "Does a batch oven need to comply with NFPA 86?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. All industrial ovens, including batch ovens, must comply with NFPA 86 (Standard for Ovens and Furnaces). This standard governs ventilation, combustion purge cycles, flame safeguard systems, safety interlocks, and temperature controls. All PFS batch ovens are built to meet NFPA 86 requirements." }
              },
              {
                "@type": "Question", "name": "Can a PFS batch oven be integrated with a powder coating booth?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS manufactures both powder coating booths and batch curing ovens, so complete line integration is straightforward. Whether you need a standalone oven or a complete powder coating system — booth, oven, and material handling — PFS can engineer and manufacture the full solution from our Santa Rosa, CA facility." }
              },
            ]
          })
        }} />
        <div className="container" style={{ maxWidth: "860px" }}>
          <p style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a3a6b", marginBottom: "0.75rem" }}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#0d1b2a", marginBottom: "2.5rem", lineHeight: 1.1 }}>Batch Oven FAQ</h2>
          {[
            { q: "What is a batch oven used for?", a: "A batch oven is an industrial curing oven designed to process parts in individual loads rather than on a continuous conveyor. Batch ovens are widely used for powder coating cure cycles, liquid paint baking, heat treating, drying, and preheating. They are ideal for job shops, low-to-medium production volumes, and operations with varied part sizes." },
            { q: "What temperature does a batch oven need to reach for powder coating?", a: "Most powder coatings require a metal temperature of 325°F to 400°F (163°C–204°C) held for 10–20 minutes depending on the specific powder. PFS batch ovens are engineered to reach and maintain these temperatures with ±10°F uniformity throughout the chamber." },
            { q: "What is the difference between a batch oven and a walk-in oven?", a: "A batch oven is typically a smaller, front-loading unit designed for moderate part sizes and production volumes. A walk-in oven is a larger drive-in or walk-in chamber designed for oversized parts, assemblies, or high-volume production loads. PFS manufactures both configurations and can help you select the right system for your throughput requirements." },
            { q: "Does a batch oven need to comply with NFPA 86?", a: "Yes. All industrial ovens, including batch ovens, must comply with NFPA 86 (Standard for Ovens and Furnaces). This standard governs ventilation, combustion purge cycles, flame safeguard systems, safety interlocks, and temperature controls. All PFS batch ovens are built to meet NFPA 86 requirements." },
            { q: "Can a PFS batch oven be integrated with a powder coating booth?", a: "Yes. PFS manufactures both powder coating booths and batch curing ovens, so complete line integration is straightforward. Whether you need a standalone oven or a complete powder coating system — booth, oven, and material handling — PFS can engineer and manufacture the full solution from our Santa Rosa, CA facility." },
          ].map(({ q, a }, i) => (
            <details key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
              <summary style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0d1b2a", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {q}
                <span style={{ fontSize: "1.25rem", color: "#1a3a6b", flexShrink: 0, marginLeft: "1rem" }}>+</span>
              </summary>
              <p style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.75, marginTop: "0.75rem" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>
      {/* ── RELATED PRODUCTS ── */}
      <SiteProductCardSection
        heading="Complete Your Finishing System"
        label="You May Also Need"
        cards={PRODUCTS}
      />

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Questions? Talk to a PFS Engineer.</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.9rem", color: "#666", maxWidth: "440px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>
            Our engineering team can help you select the right oven configuration, size, and heat source for your application.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact/talk-to-an-engineer?from=batch-oven" data-animation="slideLeft">
              <span className="btn-glow">TALK TO AN ENGINEER <ArrowRight size={15} /></span>
            </Link>
            <Link href="/contact/request-a-quote?from=batch-oven">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>REQUEST A QUOTE <ArrowRight size={15} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight" >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
