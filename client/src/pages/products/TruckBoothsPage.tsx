/*
 * Truck Paint Booths — PFS
 * Route: /products/paint-booths/truck-booths
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Layout: Video hero → 4 airflow config cards (no featured booth) → shared REAL INSTALLS gallery → CTA band
 * Each card: image, title, description, collapsible features + airflow diagram, GET A QUOTE CTA → /contact/request-a-quote
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import CrossFlowAirflowSVG from "@/components/CrossFlowAirflowSVG";
import SemiDowndraftAirflowSVG from "@/components/SemiDowndraftAirflowSVG";
import FullDowndraftAirflowSVG from "@/components/FullDowndraftAirflowSVG";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO = "/manus-storage/pfs-truck-booth-hero_3f01f2e0.mp4";
const HERO_IMG   = "/manus-storage/pfs-truck-booth-card_a0d45884_fca2d2cb.jpeg";

const CROSSFLOW_IMG  = "/manus-storage/orion-truck-crossflow-render_57425bd5.webp";  // Orion truck crossflow render
const CROSSFLOW_REAL = "/manus-storage/truck-crossflow-real-angled_64504e75.jpg";  // real PFS cross-flow truck booth, angled view
const SIDEDOWN_IMG   = "/manus-storage/truck-side-downdraft-real_9b13f2c8_9c33f80f.webp";   // 1237162335 — real PFS side-downdraft truck booth exterior
const SEMIDRAFT_IMG  = "/manus-storage/truck-semi-downdraft-real_f5973ddd.jpg";    // IMG_4702 — real PFS semi-downdraft truck booth
const DOWNDRAFT_IMG  = "/manus-storage/truck-full-downdraft-real_8999c17d.jpg";    // IMG_9703 — real PFS full-downdraft truck booth

const BLUE = "#1B3A6B";

const GALLERY_IMGS: { src: string; alt: string; pos?: string }[] = [
  // Renders + Real install photos — cross-flow truck booths
  { src: "/manus-storage/orion-truck-crossflow-branded-epoxy_a48943e2.webp", alt: "PFS Orion truck cross-flow booth — branded epoxy render, front view with teal filter wall",   pos: "center 50%" },
  { src: "/manus-storage/orion-truck-crossflow-render_57425bd5.webp",    alt: "PFS Orion truck cross-flow booth render — exterior view showing large filter door panel",      pos: "center 40%" },
  { src: "/manus-storage/truck-crossflow-real-angled_64504e75.jpg",      alt: "PFS cross-flow truck booth — angled exterior view showing PFS logo and green filter doors",   pos: "center 30%" },
  { src: "/manus-storage/truck-crossflow-real-front_9753e774.jpg",       alt: "PFS cross-flow truck booth — front view showing full filter door panel and PFS Orion badge",  pos: "center 35%" },
  // Side-downdraft truck booth
  { src: "/manus-storage/truck-side-downdraft-real_9b13f2c8_9c33f80f.webp",       alt: "PFS side-downdraft truck booth — exterior view with doors open showing dark interior",        pos: "center 40%" },
  // Semi-downdraft truck booth
  { src: "/manus-storage/truck-semi-downdraft-real_f5973ddd.jpg",        alt: "PFS semi-downdraft truck booth — exterior with PFS badge and green filter doors",              pos: "center 35%" },
  // Full-downdraft truck booth
  { src: "/manus-storage/truck-full-downdraft-real_8999c17d.jpg",        alt: "PFS full-downdraft truck booth — exterior view showing PFS Orion branding",                   pos: "center 30%" },
  // Interior shots
  { src: "/manus-storage/truck-booth-interior-wide_e6ae87b7.webp",       alt: "PFS truck booth interior — wide angle showing full-length white walls and ceiling filter grid",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-interior-tall_7c5c2cab_0e2c7470.webp",       alt: "PFS truck booth interior — tall angle showing ceiling plenum and white panel walls",            pos: "center 35%" },
  // Exterior and facility shots
  { src: "/manus-storage/truck-booth-exterior-scissorlift_bd7c73c3_705cc3a5.webp", alt: "PFS truck booth exterior — two-bay installation with scissor lift during commissioning",        pos: "center 40%" },
  { src: "/manus-storage/truck-booth-fire-suppression_cff15201_95935e0f.webp",    alt: "PFS truck booth fire suppression system — red suppression cylinders along exhaust plenum",      pos: "center 45%" },
  { src: "/manus-storage/truck-booth-orion-prep-station_3bb06809.jpg",   alt: "PFS Orion truck booth with adjacent prep station — full exterior view in warehouse",            pos: "center 40%" },
  // Additional gallery photos
  { src: "/manus-storage/truck-booth-gallery-9836_a1831407.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-9835_bc3cf0a9.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-9834_12448f3f.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-4700_e9a10b83.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-4716_22a8ab5b.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-4720_9140ebdd.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-4710_98ed6e0a.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
  { src: "/manus-storage/truck-booth-gallery-0809_6a0002a8.jpg",         alt: "PFS truck paint booth — real install photo",  pos: "center 40%" },
];

const SIDE_DOWNDRAFT_GIF = "/manus-storage/side_downdraft_airflow_animation_f31ca9c0.gif";

// ── AIRFLOW DIAGRAMS — using shared animated components from enclosed booth pages ──
const AIRFLOW_DIAGRAMS: Record<string, React.ReactNode> = {
  crossflow: <CrossFlowAirflowSVG />,
  "side-downdraft": <img src={SIDE_DOWNDRAFT_GIF} alt="Side Downdraft Airflow Pattern" style={{ width: "100%", height: "auto", display: "block" }} />,
  "semi-downdraft": <SemiDowndraftAirflowSVG />,
  downdraft: <FullDowndraftAirflowSVG />,
};

const BOOTH_CONFIGS = [
  {
    id: "crossflow",
    label: "Cross-Flow Truck Booth",
    tag: "MOST POPULAR",
    img: CROSSFLOW_IMG,
    imgPos: "center 50%",
    imgFit: "contain" as const,
    imgBg: "#1a1a1a",
    desc: "Horizontal airflow from intake to exhaust — the most cost-effective configuration for large vehicle finishing. Ideal for semi trucks, buses, and fleet vehicles.",
    features: [
      { num: "01", title: "ETL & ETL-C Listed", body: "Every PFS truck booth ships with Intertek ETL and ETL-C certification for US and Canadian safety codes." },
      { num: "02", title: "UL 508A Control Panel", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes." },
      { num: "03", title: "UL Listed Tube Axial Fans", body: "High-efficiency, UL listed tube axial fans move air horizontally from intake to exhaust at consistent face velocity." },
      { num: "04", title: "CID2 Lighting", body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available." },
      { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard." },
      { num: "06", title: "Custom Sizing Available", body: "Sized to fit semi trucks, buses, RVs, and fleet vehicles. Custom widths, heights, and lengths available." },
    ],
  },
  {
    id: "side-downdraft",
    label: "Side Downdraft Truck Booth",
    tag: "PREMIUM AIRFLOW",
    img: SIDEDOWN_IMG,
    imgPos: "center 40%",
    imgFit: "cover" as const,
    imgBg: "#f5f5f5",
    desc: "Air enters through ceiling plenums and exhausts through side wall grates at floor level — superior overspray control for high-quality fleet finishes.",
    features: [
      { num: "01", title: "ETL & ETL-C Listed", body: "Every PFS truck booth ships with Intertek ETL and ETL-C certification for US and Canadian safety codes." },
      { num: "02", title: "Side Wall Exhaust Grates", body: "Low-level side exhaust grates pull overspray down and away from the vehicle surface for cleaner finishes." },
      { num: "03", title: "Ceiling Intake Plenum", body: "Full-length ceiling plenum distributes fresh air evenly across the entire vehicle length." },
      { num: "04", title: "CID2 Lighting", body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible)." },
      { num: "05", title: "UL 508A Control Panel", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes." },
      { num: "06", title: "Custom Sizing Available", body: "Sized to fit semi trucks, buses, RVs, and fleet vehicles. Custom widths, heights, and lengths available." },
    ],
  },
  {
    id: "semi-downdraft",
    label: "Semi-Downdraft Truck Booth",
    tag: "VERSATILE",
    img: SEMIDRAFT_IMG,
    imgPos: "center 35%",
    imgFit: "cover" as const,
    imgBg: "#f5f5f5",
    desc: "Ceiling intake at the front half with rear floor exhaust — a versatile mid-range configuration that balances airflow quality with installation cost.",
    features: [
      { num: "01", title: "ETL & ETL-C Listed", body: "Every PFS truck booth ships with Intertek ETL and ETL-C certification for US and Canadian safety codes." },
      { num: "02", title: "Front Ceiling Intake Plenum", body: "Fresh air enters through the front ceiling plenum and travels diagonally toward the rear exhaust." },
      { num: "03", title: "Rear Floor Exhaust", body: "Exhaust grates at the rear floor level capture overspray before it can recirculate." },
      { num: "04", title: "CID2 Lighting", body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible)." },
      { num: "05", title: "UL 508A Control Panel", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes." },
      { num: "06", title: "Custom Sizing Available", body: "Sized to fit semi trucks, buses, RVs, and fleet vehicles. Custom widths, heights, and lengths available." },
    ],
  },
  {
    id: "downdraft",
    label: "Full Downdraft Truck Booth",
    tag: "HIGHEST QUALITY",
    img: DOWNDRAFT_IMG,
    imgPos: "center 30%",
    imgFit: "cover" as const,
    imgBg: "#f5f5f5",
    desc: "Full ceiling intake plenum with floor pit exhaust — the gold standard for truck and fleet finishing. Maximum overspray control and the cleanest possible finish.",
    features: [
      { num: "01", title: "ETL & ETL-C Listed", body: "Every PFS truck booth ships with Intertek ETL and ETL-C certification for US and Canadian safety codes." },
      { num: "02", title: "Full Ceiling Intake Plenum", body: "Air enters uniformly across the entire ceiling, creating a laminar downward airflow over the vehicle." },
      { num: "03", title: "Floor Pit Exhaust", body: "Exhaust pit grates span the full floor length — overspray is pulled straight down and away from the finish surface." },
      { num: "04", title: "CID2 Lighting", body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible)." },
      { num: "05", title: "UL 508A Control Panel", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes." },
      { num: "06", title: "Custom Sizing Available", body: "Sized to fit semi trucks, buses, RVs, and fleet vehicles. Custom widths, heights, and lengths available." },
    ],
  },
];

function BoothCard({ config }: { config: typeof BOOTH_CONFIGS[0] }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${hovered ? BLUE : "#e5e7eb"}`,
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: hovered ? "0 8px 32px rgba(27,58,107,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: config.imgBg || "#f5f5f5", position: "relative" }}>
        <img
          src={config.img}
          alt={config.label}
          style={{
            width: "100%", height: "100%",
            objectFit: config.imgFit || "cover",
            objectPosition: config.imgPos || "center center",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {config.tag && (
          <span style={{
            position: "absolute", top: "0.75rem", left: "0.75rem",
            background: BLUE, color: "#fff",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.14em",
            textTransform: "uppercase", padding: "0.25rem 0.6rem",
          }}>{config.tag}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem 1.5rem 1.75rem" }}>
        <h3 style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
          fontWeight: 800, color: "#111",
          letterSpacing: "-0.01em", marginBottom: "0.6rem",
        }}>{config.label}</h3>
        <p style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: "0.88rem", color: "#555", lineHeight: 1.7,
          marginBottom: "1.25rem",
        }}>{config.desc}</p>

        {/* Collapsible features */}
        <button
          onClick={() => setFeaturesOpen(!featuresOpen)}
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "none", border: `1px solid ${BLUE}`,
            color: BLUE, cursor: "pointer",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.78rem", fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "0.55rem 1rem", marginBottom: "1rem",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = BLUE; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = BLUE; }}
        >
          {featuresOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {featuresOpen ? "HIDE FEATURES" : `SEE ALL ${config.features.length} FEATURES`}
        </button>

        {featuresOpen && (
          <div style={{ marginBottom: "1.25rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
            {/* Airflow Diagram */}
            <div style={{
              background: "#f8fafc", border: "1px solid #e2e8f0",
              padding: "1rem", marginBottom: "1rem",
            }}>
              <div style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.14em", color: BLUE,
                textTransform: "uppercase", marginBottom: "0.6rem",
              }}>AIRFLOW DIAGRAM</div>
              {AIRFLOW_DIAGRAMS[config.id]}
            </div>

            {config.features.map((f) => (
              <div key={f.num} style={{
                display: "flex", gap: "0.75rem",
                padding: "0.75rem 0",
                borderBottom: "1px solid #f0f0f0",
              }}>
                <span style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.7rem", fontWeight: 800,
                  color: "rgba(27,58,107,0.35)", letterSpacing: "0.08em",
                  minWidth: "1.8rem", paddingTop: "0.1rem",
                }}>{f.num}</span>
                <div>
                  <div style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.88rem", fontWeight: 800,
                    color: "#111", letterSpacing: "0.02em",
                    marginBottom: "0.2rem",
                  }}>{f.title}</div>
                  <div style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.8rem", color: "#666", lineHeight: 1.6,
                  }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link href="/contact/request-a-quote?from=truck-booth">
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET A QUOTE <ArrowRight size={14} /></span>
        </Link>
      </div>
    </div>
  );
}

export default function TruckBoothsPage() {
  useSEO({
    title: "Truck Paint Booths | Large Vehicle Spray Booths | PFS Industrial",
    description: "PFS truck paint booths are engineered for semi-trucks, heavy equipment, and large vehicle finishing. Custom widths and heights, downdraft or cross-flow airflow, ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/truck",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const play = () => { v.play().catch(() => {}); setVideoReady(true); };
    v.addEventListener("canplaythrough", play, { once: true });
    v.load();
    return () => v.removeEventListener("canplaythrough", play);
  }, []);

  return (
    <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", background: "#fff" }}>

      {/* ── VIDEO HERO ── */}
      <section style={{ position: "relative", width: "100%", minHeight: "clamp(420px, 70vh, 700px)", overflow: "hidden", background: "#0a0f1a" }}>
        <img
          src={HERO_IMG}
          alt="PFS truck paint booth for large vehicle and semi-truck finishing"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", opacity: videoReady ? 0 : 1, transition: "opacity 0.7s ease", zIndex: 0 }}
        />
        <video preload="auto" ref={videoRef}
          autoPlay muted loop playsInline
          disablePictureInPicture
         
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center center",
            opacity: videoReady ? 1 : 0, transition: "opacity 0.7s ease",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 4rem" }}>
          <div className="container">
            <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              PAINT BOOTHS / TRUCK BOOTHS
            </div>
            <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.0, marginBottom: "1.25rem", maxWidth: "800px" }}>
              TRUCK &amp; FLEET<br />PAINT BOOTHS
            </h1>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: "rgba(255,255,255,0.85)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "2rem" }}>
              Purpose-built paint booths for semi trucks, buses, RVs, and fleet vehicles. manufactured in the USA with ETL/UL listed components, NFPA 33 compliant, made in the USA. Ships nationally.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/contact/request-a-quote?from=truck-booth">
                <span className="btn-glow">GET PRICING <ArrowRight size={16} /></span>
              </Link>
              <a href="tel:8885457715">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
                  (888) 545-7715
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── AIRFLOW CONFIG CARDS ── */}
      <section style={{ padding: "5rem 0", background: "#f9fafb" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
              CHOOSE YOUR AIRFLOW CONFIGURATION
            </span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.1, maxWidth: "600px" }}>
              Four Airflow Configurations.<br />One Standard of Quality.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {BOOTH_CONFIGS.map((config) => (
              <BoothCard key={config.id} config={config} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL INSTALLS GALLERY ── */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
              REAL INSTALLS
            </span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Truck Booth Gallery
            </h2>
          </div>
          <GalleryGrid images={GALLERY_IMGS} />
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: BLUE, padding: "4rem 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
              Ready to spec your truck booth?
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
              A PFS engineer will prepare a detailed quote — typically within 24 hours.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=truck-booth">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
                GET PRICING <ArrowRight size={16} />
              </span>
            </Link>
            <a href="tel:8885457715">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
                CALL (888) 545-7715
              </span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
