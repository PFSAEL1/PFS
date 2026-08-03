/*
 * Shipping Container Paint Booths — PFS
 * Route: /products/container-booths
 * Layout: CrossFlow format — hero render → cert carousel → featured real photo + intro copy
 *         → features collapsible → sizes collapsible → gallery → CTA → you may also like
 * Mobile: fully optimized — single column, sticky CTA bar
 */
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Package, MapPin, Zap, Shield } from "lucide-react";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryLightbox";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
const HERO_IMG     = "/manus-storage/pfs-container-booth-real_9967_410e0f4f.jpg";
const HERO_VIDEO   = "/manus-storage/pfs-container-booth-hero-v2_c9723ea6.mp4";
const FEATURED_IMG = "/manus-storage/container_booth_render_b3efc409.png";

/* ── GALLERY ── */
const GALLERY_IMGS: GalleryImage[] = [
  { src: "/manus-storage/pfs-container-booth-real_9967_410e0f4f.jpg",   alt: "PFS container booth — real installation exterior view" },
  { src: "/manus-storage/container_IMG_9966_615f74aa.jpg",             alt: "PFS container booth — front install view" },
  { src: "/manus-storage/container_IMG_9966b_bfa4bc58.jpg",            alt: "PFS container booth — front angle view" },
  { src: "/manus-storage/container_IMG_9967_f935d590.jpg",             alt: "PFS container booth — side and rear view" },
  { src: "/manus-storage/container_IMG_9963_0c55fb70.jpg",             alt: "PFS container booth — installation site" },
];

/* ── CERT LOGOS ── */
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: UL_LOGO,   title: "UL-Listed Components",  sub: "UL Parts in Every Build",           imgH: 44 },
  { img: ETL_LOGO,  title: "ETL-Certified Parts",   sub: "ETL Listed Components Used",         imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant",     sub: "Spray Application Standard",         imgH: 44 },
  { img: EPA_LOGO,  title: "EPA Compliant",          sub: "Air Quality Standards",              imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",         sub: "Workplace Safety Standards",         imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",        sub: "Santa Rosa, CA",                     imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

/* ── FEATURES ── */
const FEATURES_VISIBLE = [
  { num: "01", title: "ISO Container + 18-Gauge Steel Liner",       body: "PFS container booths start with a standard ISO intermodal shipping container, then layer the entire interior with 18-gauge galvanized steel panels. The result is a rigid, durable spray booth shell that is weather-tight, corrosion-resistant, and built to the same structural standards as our permanent enclosed booths." },
  { num: "02", title: "Cross-Flow Airflow — Horizontal",            body: "Air enters through tacky intake filters at one end of the container and exhausts through fiberglass media filters at the opposite end. Horizontal front-to-rear airflow keeps overspray moving away from the operator at all times — same airflow pattern as the PFS Orion Cross-Flow." },
  { num: "03", title: "UL-Listed & ETL-Certified Components",       body: "Every PFS container booth is built using UL-listed and built with ETL/UL certified components components throughout — motors, controls, electrical panels, and fixtures. We use the same certified parts in every build, whether it's a container booth or a permanent facility installation." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "UL 508A Control Panel",                      body: "Pairs with our PFS Core Control Panel — UL 508A certified. Programmable cycle timers, safety interlocks, and optional BMS integration. Spray and cure modes built in. Same panel used in all PFS enclosed booth series." },
  { num: "05", title: "UL Listed Tube Axial Fans",                  body: "High-efficiency, UL-listed tube axial fans deliver consistent face velocity across the full cross-section of the container — no dead zones, no overspray recirculation. Fan sizing is calculated for the container volume." },
  { num: "06", title: "CID2 Lighting — 4-Tube Fixtures",           body: "Class I Division 2 inside-access four-tube light fixtures (LED tube compatible). Uniform, shadow-free illumination across the full interior length of the container. Optional LED upgrade available." },
  { num: "07", title: "Fiberglass Exhaust + Tacky Intake Filters",  body: "Exhaust uses fiberglass media filters rated for the container's CFM. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated configurations or high-dust environments." },
  { num: "08", title: "Self-Contained — No Building Required",      body: "No building permit, no foundation, no permanent structure. Set the container on a concrete pad, connect utilities, and spray. Relocate or expand as your operation grows. Ideal for remote job sites, temporary facilities, and multi-site operations." },
  { num: "09", title: "Heated Option Available",                    body: "Container booths are available with a direct-fired or indirect-fired heat system — spray, flash, and bake modes up to 180°F. Ideal for remote sites or facilities without a dedicated heated booth." },
  { num: "10", title: "We Ship Nationally",                         body: "PFS container booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

/* ── SIZES ── */
const SIZES = [
  { label: "20-Foot Container Booth", dims: '20\'L × 8\'W × 8\'6"H', desc: "Compact 20-ft ISO container converted to a fully equipped spray booth. Ideal for small parts, touch-up, and remote job sites." },
  { label: "40-Foot Container Booth", dims: '40\'L × 8\'W × 8\'6"H', desc: "Full-size 40-ft ISO container with extended spray zone. Accommodates full-size vehicles, equipment, and large fabricated parts." },
  { label: "40-Foot High-Cube",       dims: '40\'L × 8\'W × 9\'6"H', desc: "High-cube variant adds an extra foot of interior height — ideal for tall vehicles, trucks, or agricultural equipment." },
];

/* ── YOU MAY ALSO LIKE — pool of 5, show 3 randomly ── */
const ALSO_LIKE_POOL = [
  { label: "Cross-Flow Spray Booths",  href: "/products/paint-booths/crossflow",      img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",         desc: "Horizontal airflow enclosed booth — the most cost-effective option for automotive and industrial finishing." },
  { label: "Side Downdraft Booths",    href: "/products/paint-booths/side-downdraft", img: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png",   desc: "Side-wall exhaust plenums — no pit required. Premium finish quality without a basement." },
  { label: "Full Downdraft Booths",    href: "/products/paint-booths/full-downdraft", img: "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png",           desc: "Vertical downdraft airflow through a raised basement. Highest finish quality available." },
  { label: "Outdoor Paint Booths",     href: "/products/paint-booths/outdoor",        img: "/manus-storage/pfs-render-outdoor-booth_7fca5b65.jpg", desc: "Open-face outdoor spray booths for large equipment, fabrication, and field operations." },
  { label: "Air Make-Up Units",        href: "/products/air-make-up-units",            img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",           desc: "Tempered make-up air to replace exhausted air and maintain positive booth pressure." },
];

function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number>(0);
  const posRef   = useRef(0);
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
    <section style={{ background: "#ffffff", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}>
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

export default function ContainerBoothPage() {
  useSEO({
    title: "Container Spray Booths | Portable Paint Booths | PFS Industrial",
    description: "PFS container spray booths are self-contained, portable finishing environments built inside standard shipping containers. Rapid deployment, ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/container",
  });

  const [specsOpen,    setSpecsOpen]    = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [sizesOpen,    setSizesOpen]    = useState(false);
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

  /* Randomize 3 items from pool on mount */
  const alsoLike = useMemo(() => {
    const shuffled = [...ALSO_LIKE_POOL].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <div>
      {/* ── FULL-BLEED HERO ── */}
      <section style={{ position: "relative", minHeight: "clamp(380px, 60vh, 680px)", background: "#0a0a0a", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={HERO_IMG}
            alt="PFS containerized blast booth portable spray booth unit"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: videoReady ? 0 : 1, transition: "opacity 0.7s ease", zIndex: 0 }}
          />
          <video preload="auto"
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", opacity: videoReady ? 1 : 0, transition: "opacity 0.7s ease", zIndex: 0 }}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)", zIndex: 1 }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "5rem 0 4rem" }}>
          <nav style={{ marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <Link href="/"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>HOME</span></Link>{" / "}
              <Link href="/products"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>PRODUCTS</span></Link>{" / "}
              <span style={{ color: "rgba(255,255,255,0.8)" }}>SHIPPING CONTAINER PAINT BOOTHS</span>
            </span>
          </nav>
          <div style={{ maxWidth: "560px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(27,58,107,0.4)", border: "1px solid rgba(91,141,217,0.5)", padding: "0.3rem 0.75rem", marginBottom: "1rem" }}>
              <Package size={12} style={{ color: "#6b9bd2" }} />
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.18em", color: "#6b9bd2", textTransform: "uppercase" }}>ISO CONTAINER — DEPLOY ANYWHERE</span>
            </div>
            <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.0, marginBottom: "1.1rem", textTransform: "uppercase" }}>
              Shipping Container<br />Paint Booths
            </h1>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.88rem, 1.5vw, 1rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "460px" }}>
              A complete, professional spray booth built inside a standard ISO shipping container — mobile, self-contained, and deployable anywhere in the world.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/contact/request-a-quote?from=container-booth">
                <span className="btn-glow">GET PRICING <ArrowRight size={14} /></span>
              </Link>
              <a href="tel:8885457715">
                <span className="btn-glow-white" style={{ background: "transparent", color: "rgba(255,255,255,0.85)" }}>CALL (888) 545-7715</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── FEATURED REAL PHOTO + INTRO COPY ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div style={{ overflow: "hidden", background: "#e8e8e8" }}>
              <img src={FEATURED_IMG} alt="PFS shipping container spray booth — real installation" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
            </div>
            <div>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>PFS ORION SERIES</span>
              <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "1.25rem" }}>
                A Professional Spray Booth.<br />Anywhere.
              </h2>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, marginBottom: "1rem" }}>
                PFS shipping container paint booths are standard ISO intermodal containers — 20-ft or 40-ft — fully converted into professional spray booths. The interior is outfitted with LED lighting, intake and exhaust filtration, an air supply plenum, explosion-proof electrical, and a control panel.
              </p>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Built with UL-listed and built with ETL/UL certified components components throughout. Unlike permanent structures, container booths require no building permit, no foundation, and minimal site prep.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {[
                  { icon: <Package size={14} style={{ color: BLUE }} />, label: "ISO 20-ft or 40-ft" },
                  { icon: <MapPin  size={14} style={{ color: BLUE }} />, label: "Deploy Anywhere" },
                  { icon: <Zap    size={14} style={{ color: BLUE }} />, label: "Plug-and-Spray Ready" },
                  { icon: <Shield size={14} style={{ color: BLUE }} />, label: "UL & ETL Components" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 0.75rem", background: "#fff", border: "1px solid #e5e7eb" }}>
                    {item.icon}
                    <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#111" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STANDARD FEATURES — truly collapsible ── */}
      <section style={{ background: "#fff", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD FEATURES</span>
              <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Built to the Same Standard as Every PFS Booth</h2>
            </div>
            <button
              onClick={() => setSpecsOpen(!specsOpen)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: specsOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: specsOpen ? "#fff" : BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}
            >
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
                    <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1 }}>{f.body}</div>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1 }}>{f.body}</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: `2px solid ${BLUE}`, color: BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.75rem", cursor: "pointer" }}
                >
                  {featuresOpen ? <><ChevronUp size={15} /> SHOW LESS</> : <><ChevronDown size={15} /> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── AVAILABLE SIZES — truly collapsible ── */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD SIZES</span>
              <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Available Sizes &amp; Configurations</h2>
            </div>
            <button
              onClick={() => setSizesOpen(!sizesOpen)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}
            >
              {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {SIZES.map((s) => (
                  <div key={s.label} style={{ background: "#fff", border: `2px solid ${BLUE}`, padding: "1.5rem 1rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{s.label}</div>
                    <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.72rem", color: "#888", marginBottom: "0.5rem" }}>{s.dims}</div>
                    <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#555", lineHeight: 1.6, marginBottom: "1rem" }}>{s.desc}</div>
                    <Link href="/contact/request-a-quote?from=container-booth">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>GET PRICING <ArrowRight size={12} /></span>
                    </Link>
                  </div>
                ))}
              </div>
              <div style={{ padding: "1.25rem 1.5rem", background: "#fff", border: "1px solid #e5e7eb", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 800, color: "#111", marginBottom: "0.4rem" }}>Custom Configurations Available</div>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.7, margin: 0 }}>
                  Need a drive-through configuration, a heated container booth, or a non-standard size? PFS builds to order. Contact our team for a custom quote — we ship nationally and support international orders.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact/request-a-quote?from=container-booth">
                  <span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15} /></span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "3rem 0 4rem", background: "#fff" }}>
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>REAL INSTALLS</span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Container Booth Gallery</h2>
          </div>
          <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", margin: "0 0 0.5rem" }}>Ready to Deploy a Container Booth?</h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", margin: 0 }}>Factory-direct pricing. Ships to all 50 states. Dedicated support from order through installation.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=container-booth">
              <span className="btn-glow-white">GET PRICING <ArrowRight size={14} /></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-glow-white" style={{ background: "transparent", color: "#fff" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── YOU MAY ALSO LIKE — 3 random from pool ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>YOU MAY ALSO LIKE</span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Explore More PFS Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {alsoLike.map((p) => (
              <Link key={p.label} href={p.href}>
                <div style={{ display: "flex", flexDirection: "column", border: "2px solid #d0d8e8", overflow: "hidden", cursor: "pointer", background: "#fff" }} className="group hover:border-blue-800 transition-colors">
                  <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#f5f5f5" }}>
                    <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} className="group-hover:scale-105" />
                  </div>
                  <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{p.label}</div>
                    <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "#555", lineHeight: 1.5, marginBottom: "0.75rem" }}>{p.desc}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>LEARN MORE <ArrowRight size={12} /></div>
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
        <Link href="/contact/request-a-quote?from=container-booth" style={{ flex: 1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>
    </div>
  );
}
