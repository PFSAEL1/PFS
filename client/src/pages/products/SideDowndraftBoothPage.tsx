/*
 * Side Downdraft Spray Booths — PFS Helios Series
 * Route: /products/paint-booths/side-downdraft
 * Template: Product Page — identical structure to CrossFlowBoothPage
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
const HERO_RENDER = "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png";
const FEATURED_IMG = "/manus-storage/helios_angle3_v21_white_411ddec0.png";
const AIRFLOW_GIF = "/manus-storage/side_downdraft_airflow_animation_f31ca9c0.gif";

const GALLERY_IMGS = [
  // ── New real install photos (shown first) ──
  { src: "/manus-storage/pfs-factory-booth-wide_234b773d.jpeg", alt: "PFS factory floor — side-downdraft and crossflow booths side by side, Orion and Helios models", pos: "center 50%" },
  { src: "/manus-storage/pfs-factory-helios-front_9112086e.jpeg", alt: "PFS Helios — front view with triple glass doors, PFS branding, factory floor", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-front-full_04883b65.jpg", alt: "PFS Helios side-downdraft — front view, triple-door entry, Helios badge, installed in shop", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-door-closeup_888f9187.jpg", alt: "PFS Helios side-downdraft — close-up of triple entry doors with Helios branding", pos: "center 40%" },
  { src: "/manus-storage/pfs-helios-sdd-side-angle_9f43d877.jpg", alt: "PFS Helios side-downdraft — side angle view showing AMU plenum and booth body", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-front-angle_77d8d4fa.jpg", alt: "PFS Helios side-downdraft — front angle view showing doors and side plenum", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-install-wide_a6bec064.jpg", alt: "PFS Helios side-downdraft — wide install shot showing full booth and side plenum assembly", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-side-install_fb8a847b.jpg", alt: "PFS Helios side-downdraft — side view during installation showing AMU plenum structure", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-side-rear_fa0388f5.jpg", alt: "PFS Helios side-downdraft — rear side angle showing plenum framing during install", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-plenum-detail_d3b8c678.jpg", alt: "PFS Helios side-downdraft — detail view of side plenum filter bays and framing", pos: "center 50%" },
  { src: "/manus-storage/pfs-helios-sdd-jcb-install_cd269044.jpg", alt: "PFS Helios side-downdraft — installation in progress with JCB telehandler lifting booth panels", pos: "center 50%" },
  // ── Earlier gallery photos ──
  { src: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png", alt: "PFS Helios Side Downdraft — installed in shop, front-side angle view", pos: "center 40%" },
  { src: "/manus-storage/1000084527_2d16f905.jpeg", alt: "PFS Helios — side view showing side plenums and exhaust stacks", pos: "center 45%" },
  { src: "/manus-storage/1000084532_1ff59b12.jpeg", alt: "PFS Helios — interior view showing teal ceiling filters and lighting", pos: "center 50%" },
  { src: "/manus-storage/IMG_2009_f1dbc447.jpeg", alt: "PFS Helios — interior side plenum filters and lighting", pos: "center 50%" },
  { src: "/manus-storage/semi-down-interior_8614fbf2.jpg", alt: "PFS Helios — interior angle view showing side plenum filters", pos: "center 45%" },
  { src: "/manus-storage/semi-down-open-doors_1d86b013.jpg", alt: "PFS Helios — front view through open door, interior ceiling filters", pos: "center 40%" },
  { src: "/manus-storage/pfs_helios_side_angle_final_4ec28901_f4ff36d7.webp", alt: "PFS Helios — front angle view in shop with exhaust stack", pos: "center 45%" },
  { src: "/manus-storage/helios_outdoor_aerial_f4f0d335.jpg", alt: "PFS Helios — aerial outdoor view showing roof exhaust stacks", pos: "center 50%" },
  { src: "/manus-storage/helios_gallery_img0218_111111f7.jpg", alt: "PFS Helios — additional install photo", pos: "center 50%" },
  { src: "/manus-storage/helios_interior_open_door_c13c37e3.jpg", alt: "PFS Helios — interior view through open doors showing ceiling lights and side plenums", pos: "center 50%" },
  { src: "/manus-storage/helios_side_exterior_angle_de36b808.jpg", alt: "PFS Helios — exterior side angle showing side exhaust plenums and front doors", pos: "center 45%" },
  { src: "/manus-storage/helios_interior_front_d9472d1b.jpg", alt: "PFS Helios — interior view from front showing teal ceiling filters and side exhaust", pos: "center 50%" },
  { src: "/manus-storage/helios_interior_rear_798c7434.jpg", alt: "PFS Helios — interior view from rear showing ceiling filter grid and side plenums", pos: "center 50%" },
  { src: "/manus-storage/helios_interior_side_left_cfca7861.jpg", alt: "PFS Helios — interior side wall showing exhaust filters and lighting fixtures", pos: "center 50%" },
  { src: "/manus-storage/helios_interior_side_right_d5855816.jpg", alt: "PFS Helios — interior opposite side wall with exhaust plenums and ceiling lights", pos: "center 50%" },
  { src: "/manus-storage/helios_interior_front_door_acd48c44.jpg", alt: "PFS Helios — full interior view from front door showing PFS branding", pos: "center 45%" },
];

const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "Intertek — USA & Canada", imgH: 44 },
  { img: UL_LOGO, title: "UL 508A Certified", sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant", sub: "Spray Application Standard", imgH: 44 },
  { img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", imgH: 36 },
  { img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

const FEATURES_VISIBLE = [
  { num: "02", title: "UL 508A Control Panel", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
  { num: "03", title: "Full Ceiling Plenum Intake", body: "Air enters through a full-length ceiling plenum with intake filters spanning the entire roof. Uniform top-to-bottom airflow eliminates dead zones and delivers excellent finish quality." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "Side Wall Exhaust — No Pit Required", body: "Air exhausts through side wall filter plenums at floor level — no underground concrete pit needed. Exhaust fans on both side walls pull air up and out. Ideal for slab-on-grade and retrofit installations." },
  { num: "05", title: "UL Listed Tube Axial Fans", body: "High-efficiency, UL listed tube axial fans on both side walls move air at consistent face velocity — eliminating overspray recirculation and maintaining clean, even airflow from ceiling to floor." },
  { num: "06", title: "CID2 Lighting — 4-Tube Fixtures", body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination across the full booth." },
  { num: "07", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters in the side wall plenums. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "08", title: "We Ship Nationally", body: "PFS Helios booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "9": [{ w: "14'", h: "9'", l: "24'" }, { w: "14'", h: "9'", l: "27'" }, { w: "14'", h: "9'", l: "30'" }, { w: "14'", h: "9'", l: "33'" }],
  "10": [{ w: "14'", h: "10'", l: "24'" }, { w: "14'", h: "10'", l: "27'" }, { w: "14'", h: "10'", l: "30'" }, { w: "14'", h: "10'", l: "33'" }],
  "12": [{ w: "14'", h: "12'", l: "24'" }, { w: "14'", h: "12'", l: "27'" }, { w: "14'", h: "12'", l: "30'" }, { w: "14'", h: "12'", l: "33'" }],
};

const PRODUCTS = [
  { label: "Air Make-Up Units", href: "/products/air-make-up-units", img: "/manus-storage/pfs-amu-card_41f0dd88.jpg", desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms", href: "/products/mixing-rooms", img: "/manus-storage/IMG_0498_a98f5f38.jpg", desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations", href: "/products/prep-support/prep-stations", img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg", desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Cross-Flow Booths", href: "/products/paint-booths/crossflow", img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp", desc: "Horizontal airflow — the most cost-effective enclosed booth for automotive and industrial finishing." },
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
    <section style={{ background: "#ffffff", padding: "0", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111", boxShadow: "0 4px 0 0 #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid #e5e7eb", flexShrink: 0 }}>
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

export default function SideDowndraftBoothPage() {
  useSEO({
    title: "Side Downdraft Paint Booths | PFS Helios Series | No Pit Required | NFPA 33",
    description: "PFS Helios side-downdraft spray booths deliver downdraft-quality finish results without a concrete floor pit. Air enters through a full ceiling plenum, flows straight down through the booth, and exhausts through floor-level side wall plenums — no underground pit required. Lowest installed cost of any downdraft-style booth. NFPA 33 compliant. ETL/UL listed components. UL 508A panel. Custom sizes available. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/side-downdraft",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(340px, 55vh, 580px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <img
          src={HERO_RENDER}
          alt="PFS side downdraft spray booth exterior view with exhaust stack"
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>PAINT BOOTHS — ENCLOSED</span>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Side Downdraft<br />
            Spray Booths<br />
            Built to Last
          </h1>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)",
            color: "#6fa3e0", borderRadius: "2px",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "0.3rem 0.75rem", marginBottom: "1.25rem",
          }}>PFS HELIOS SERIES</span>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            ETL listed. UL 508A certified. Full ceiling plenum intake — side wall exhaust plenums, no concrete pit required. Ships nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=side-downdraft-booth" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight" style={{ width: "100%", maxWidth: "320px" }}>
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "1.1rem 2.5rem", cursor: "pointer",
              }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* CERT CAROUSEL */}
      <CertCarousel />

      {/* FEATURED BOOTH */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>FEATURED PAINT BOOTH</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>PFS Helios Side Downdraft Spray Booth</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>PFS HELIOS SERIES</span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Full ceiling plenum intake spans the entire roof — air enters clean and flows straight down through the booth at consistent face velocity. Side wall exhaust plenums at floor level capture overspray without an underground pit. No excavation. No raised floor system. ETL/UL listed components. UL 508A control panel. NFPA 33 and OSHA compliant. Standard sizes 14'W × 9–12'H × 24–33'L. Custom sizes engineered to your facility.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", borderRadius: "2px" }}>
              <img src={FEATURED_IMG} alt="PFS Helios Series Side Downdraft Spray Booth" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=side-downdraft-booth" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths/enclosed" data-animation="slideRight">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>SEE ALL ENCLOSED BOOTHS <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AIRFLOW DIAGRAM */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>HOW IT WORKS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Side Downdraft Airflow Pattern</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "#666", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              Fresh, filtered air enters through a full-length ceiling plenum spanning the entire roof of the booth. It flows straight down at consistent face velocity — the same vertical airflow pattern as a full downdraft booth. At floor level, air sweeps toward both side walls and exhausts upward through floor-level side wall plenums with fiberglass media filters before being discharged outside. The PFS Helios delivers the same clean, vertical airflow as a full downdraft booth — without requiring any concrete pit excavation. This makes it the preferred choice for facilities on slab-on-grade foundations, temporary or relocatable installations, and operations prioritizing the lowest total installed cost.
            </p>
          </div>
          <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
            <img src={AIRFLOW_GIF} alt="Side Downdraft Airflow Pattern" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }} data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=side-downdraft-booth">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECS — collapsible */}
      <section style={{ background: "#fff", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD FEATURES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Every Unit Ships Fully Certified</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSpecsOpen(!specsOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: specsOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: specsOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {specsOpen ? <><ChevronUp size={15} /> HIDE SPECS</> : <><ChevronDown size={15} /> SEE STANDARD SPECS</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=side-downdraft-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=side-downdraft-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
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

      {/* SIZES — collapsible */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>14' Wide — Choose Your Height</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSizesOpen(!sizesOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#666", marginBottom: "1.5rem" }}>All standard booths are 14' wide. Select a ceiling height to see available lengths.</p>
              <div style={{ display: "inline-flex", border: `2px solid ${BLUE}`, overflow: "hidden", borderRadius: "2px", marginBottom: "2rem" }}>
                {["9", "10", "12"].map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(selectedHeight === h ? null : h)} style={{ padding: "0.75rem 1.75rem", background: selectedHeight === h ? BLUE : "transparent", color: selectedHeight === h ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: h !== "12" ? `1px solid ${BLUE}` : "none", cursor: "pointer", transition: "background 0.15s,color 0.15s" }}>{h}' HEIGHT</button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background: "#fff", border: `2px solid ${BLUE}`, padding: "1.5rem 1rem", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#111", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>{s.w} × {s.h} × {s.l}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#888", marginBottom: "1rem" }}>W × H × L</div>
                      <Link href="/contact/request-a-quote?from=side-downdraft-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>GET PRICING <ArrowRight size={12} /></span></Link>
                    </div>
                  ))}
                </div>
              )}
              {!selectedHeight && (
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#888", marginBottom: "2rem" }}>Select a height above to view available configurations.</p>
              )}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact/request-a-quote?from=side-downdraft-booth"><span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15} /></span></Link>
                <Link href="/products/paint-booths/enclosed"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem", cursor: "pointer" }}>SEE ALL ENCLOSED BOOTHS <ArrowRight size={15} /></span></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: "3rem 0 4rem", background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div className="text-center" data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=side-downdraft-booth" >
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Ready to Configure Your Side Downdraft Booth?</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=side-downdraft-booth" data-animation="slideLeft">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* HEATED OPTIONS */}
      <section style={{ background: "#111", padding: "3rem 0", borderTop: `4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>ADD-ON</span>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Heated Options Available</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>
            Add a direct-fired or indirect-fired heat system to your side-downdraft booth for accelerated cure times. Blanket intake filter upgrades included with all heated configurations.
          </p>
          <Link href="/contact/request-a-quote?from=side-downdraft-booth" data-animation="slideRight">
            <span  data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>ASK ABOUT HEATED OPTIONS <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background: "#fff", padding: "3rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Pairs Well With a Mixing Room or Air Make-Up Unit</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#666", maxWidth: "480px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
            Maximize throughput and compliance by pairing your side-downdraft booth with a dedicated mixing room for paint prep and an air make-up unit for tempered make-up air.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products/mixing-rooms" data-animation="slideLeft">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 1.75rem", cursor: "pointer" }}>VIEW MIXING ROOMS <ArrowRight size={13} /></span>
            </Link>
            <Link href="/products/air-make-up-units" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 1.75rem", cursor: "pointer" }}>VIEW AIR MAKE-UP UNITS <ArrowRight size={13} /></span>
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background: "#f8f9fb", padding: "clamp(2.5rem, 6vw, 4rem) 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: "#1B3A6B", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Side Downdraft Paint Booth — Common Questions</h2>
          </div>
          {[
            { q: "How does a side downdraft paint booth work?", a: "A side downdraft spray booth draws fresh, filtered air through intake filters on one side wall. Air flows horizontally across the booth, carrying overspray away from the painter and the work surface, and exits through exhaust filters on the opposite side wall. This cross-wall airflow pattern eliminates the need for a concrete pit entirely — the booth sits on a flat concrete floor with no pit or raised floor required." },
            { q: "What is the advantage of a side downdraft booth over a full or semi-downdraft?", a: "The primary advantage of a side downdraft booth (PFS Helios) is installation simplicity. No concrete pit is required — the booth sits directly on your existing slab. This significantly reduces installation cost and time. Side downdraft is ideal for facilities where floor modification is not feasible, for temporary or relocatable installations, and for shops prioritizing the lowest total installed cost." },
            { q: "Does a side downdraft booth require a concrete pit?", a: "No. The PFS Helios side downdraft booth requires no concrete pit and no raised floor. It sits directly on a flat concrete slab, making it the simplest enclosed booth configuration to install. This is one of the key reasons side downdraft is popular for retrofit installations in existing buildings." },
            { q: "Is the PFS Helios side downdraft booth NFPA 33 compliant?", a: "Yes. Every PFS Helios side downdraft spray booth is built to NFPA 33 standards. The booth ships with a UL 508A certified control panel, ETL/UL listed and certified components, and complies with OSHA 1910.94 ventilation requirements." },
            { q: "Can PFS build a custom-size side downdraft booth?", a: "Yes. PFS manufactures side downdraft booths in custom widths, heights, and lengths to fit your facility. Contact a PFS engineer with your facility dimensions for a custom quote." },
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
              { "@type": "Question", "name": "How does a side downdraft paint booth work?", "acceptedAnswer": { "@type": "Answer", "text": "A side downdraft spray booth draws fresh, filtered air through intake filters on one side wall. Air flows horizontally across the booth, carrying overspray away from the painter and the work surface, ..." } },
              { "@type": "Question", "name": "What is the advantage of a side downdraft booth over a full or semi-downdraft?", "acceptedAnswer": { "@type": "Answer", "text": "The primary advantage of a side downdraft booth (PFS Helios) is installation simplicity. No concrete pit is required — the booth sits directly on your existing slab. This significantly reduces install..." } },
              { "@type": "Question", "name": "Does a side downdraft booth require a concrete pit?", "acceptedAnswer": { "@type": "Answer", "text": "No. The PFS Helios side downdraft booth requires no concrete pit and no raised floor. It sits directly on a flat concrete slab, making it the simplest enclosed booth configuration to install. This is ..." } },
              { "@type": "Question", "name": "Is the PFS Helios side downdraft booth NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every PFS Helios side downdraft spray booth is built to NFPA 33 standards. The booth ships with a UL 508A certified control panel, ETL/UL listed and certified components, and complies with OSHA 1..." } },
              { "@type": "Question", "name": "Can PFS build a custom-size side downdraft booth?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS manufactures side downdraft booths in custom widths, heights, and lengths to fit your facility. Contact a PFS engineer with your facility dimensions for a custom quote...." } }
            ]
          })
        }} />
      </section>

      {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="RELATED PRODUCTS"
        label="Complete Your System"
        cards={PRODUCTS}
      />

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, display: "flex", background: "#111", borderTop: `3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", borderRight: "1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=side-downdraft-booth" style={{ flex: 1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
