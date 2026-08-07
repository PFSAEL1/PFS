/*
 * Aerospace Paint Booths — Product Page
 * Route: /products/paint-booths/aircraft
 * Mirrors AerospacePage (industry) format exactly:
 * - Full-bleed hero (side-angle jet)
 * - Auto-scrolling cert carousel
 * - Featured booth section (twin-engine prop, no black bars)
 * - Zoomable gallery (technician + PFS-branded jet, no black bars)
 * - Collapsible features/specs
 * - Mid-page CTA band
 * - Related products grid
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import TrustedBy from "@/components/TrustedBy";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── IMAGES ────────────────────────────────────────────────────────────────────
// HERO_IMG    : side-angle private jet in white spray booth
// FEATURED_IMG: twin-engine prop in hangar (featured booth section)
// GALLERY_IMGS: navigable gallery images
const HERO_IMG = "/manus-storage/pfs-aerospace-jet-side-booth-hero_34e5d4ce.png"; // real PFS jet side angle
const HERO_VIDEO = "/manus-storage/product_aerospace_jet_side_hero_ae4811fe.mp4";  // slow-zoom video from real photo
const FEATURED_IMG = "/manus-storage/private_jet_side_angle_fdd4968c.png";
const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-aerospace-jet-side-booth-hero_34e5d4ce.png", alt: "PFS real jet side angle inside aerospace spray booth", pos: "center 50%" },
  { src: "/manus-storage/aero_technician_spraying_21c4171a.png", alt: "Technician spraying aircraft fuselage in PFS aerospace booth", pos: "center 50%" },
  { src: "/manus-storage/aero_twin_engine_booth_a8e9c3f1.png", alt: "PFS-branded private jet inside aerospace spray booth", pos: "center 50%" },
];

const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

// ── CERT CAROUSEL DATA ────────────────────────────────────────────────────────
const CERTS = [
  { type: "logo", img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "Intertek — USA & Canada", imgH: 44 },
  { type: "logo", img: UL_LOGO, title: "UL 508A Certified", sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { type: "logo", img: NFPA_LOGO, title: "NFPA 33 Compliant", sub: "Spray Application Standard", imgH: 44 },
  { type: "logo", img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", imgH: 36 },
  { type: "logo", img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", imgH: 36 },
  { type: "flag", img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "02",
    title: "Aerospace-Grade Laminar Airflow",
    body: "Full downdraft airflow at 100 FPM uniform face velocity. Ceiling-to-floor air movement eliminates overspray recirculation — critical for aerospace topcoat and primer applications.",
  },
  {
    num: "03",
    title: "High-Bay Clear-Span Construction",
    body: "Clear-span structural steel frames up to 60 ft wide and 30 ft tall. No interior columns. Full wing-to-wing access for commercial, military, and private aircraft.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Class I Division 2 (CID2) Lighting",
    body: "Inside-access, CID2 four-tube fixtures are standard. Uniform, shadow-free illumination at 100+ foot-candles — essential for aerospace finish inspection and color matching.",
  },
  {
    num: "05",
    title: "HEPA & Fiberglass Filtration",
    body: "Intake and exhaust filtration systems designed for aerospace-spec cleanliness. Optional HEPA secondary filtration for composite and specialty coating environments.",
  },
  {
    num: "06",
    title: "PFS Core Control Panel — UL 508A",
    body: "UL 508A certified control panels with spray, flash, and cure modes. Programmable cycle timers, temperature monitoring, and safety interlocks. Custom BMS integration available.",
  },
];

const BOOTH_LINEUP = [
  { name: "Crossflow", desc: "Side-to-side airflow. Cost-effective for large fuselage sections." },
  { name: "Downdraft", desc: "Full ceiling-to-floor airflow. Maximum cleanliness for aerospace topcoat." },
  { name: "Semi-Downdraft", desc: "Rear-angled exhaust. Versatile for mixed MRO and new-build operations." },
  { name: "Heated Booth", desc: "Integrated heat for accelerated cure. Required for most aerospace primers." },
  { name: "Custom Build", desc: "Engineered-to-order for wide-body, military, or hangar-integrated systems." },
];

const RELATED_PRODUCTS = [
  {
    label: "Industrial Ovens",
    href: "/products/ovens",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Batch and conveyor ovens for aerospace primer cure and composite bonding.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Blast rooms and cabinets for aircraft surface prep and paint stripping.",
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png",
    desc: "Powder coating booths for aerospace ground support equipment and components.",
  },
  {
    label: "Open Face Paint Booths",
    href: "/products/paint-booths/open-face",
    img: "/manus-storage/IMG_2132_c21b2839.jpg",
    desc: "High-volume open-front finishing for aircraft components and sub-assemblies.",
  },
];

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────




// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const SPEED = 0.5;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const step = () => {
      posRef.current += SPEED;
      if (posRef.current >= totalWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section style={{
      background: "#ffffff",
      padding: "0",
      overflow: "hidden",
      borderTop: `4px solid ${BLUE}`,
      borderBottom: `3px solid #111`,
      boxShadow: "0 4px 0 0 #111",
    }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to right, #ffffff, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to left, #ffffff, transparent)",
          pointerEvents: "none",
        }} />
        <div
          ref={trackRef}
          style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}
        >
          {CERTS_LOOP.map((cert, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                padding: "1.1rem 2.5rem",
                borderRight: "1px solid rgba(0,0,0,0.07)",
                flexShrink: 0,
              }}
            >
              {cert.type === "flag" ? (
                <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "cover", borderRadius: "2px", flexShrink: 0, aspectRatio: "3/2" }} />
              ) : (
                <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              )}
              <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.1rem" }}>
                <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  {cert.title}
                </span>
                <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", color: "#666", whiteSpace: "nowrap" }}>
                  {cert.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function AircraftBoothPage() {
  useSEO({
    title: "Aircraft Paint Booths | Aerospace Spray Booths | PFS Industrial",
    description: "PFS aircraft paint booths are custom-engineered for commercial aerospace, military, and general aviation finishing. Large-format configurations, energy-efficient airflow, NFPA 33 compliant, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/aircraft",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
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
        {/* Dark gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em" }}>
            <Link href="/products/paint-booths"><span style={{ cursor: "pointer" }}>Paint Booths</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Aerospace</span>
          </div>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Aerospace Paint Booths<br />
            Built for Aircraft &amp;<br />
            Defense Applications
          </h1>
          {/* Series badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)",
            color: "#6fa3e0", borderRadius: "2px",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "0.3rem 0.75rem", marginBottom: "1.25rem",
          }}>
            PFS ZENITH SERIES
          </span>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            manufactured in the USA with ETL/UL listed and UL 508A certified components. Clear-span high-bay construction.
            Engineered for commercial, military, and private aircraft — installed nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=aircraft-booth" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }} data-animation="slideRight">
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "1.1rem 2.5rem", cursor: "pointer", width: "100%",
              }}>
                CALL (888) 545-7715
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── AUTO-SCROLLING CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── FEATURED BOOTH SECTION ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase",
                display: "block", marginBottom: "0.6rem",
              }}>
                FEATURED PAINT BOOTH
              </span>
              <h2 data-animation="slideLeft" style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800,
                color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem",
              }}>
                Aerospace Downdraft Paint Booth
              </h2>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: BLUE, color: "#fff",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "0.28rem 0.85rem", marginBottom: "0.75rem",
              }}>
                PFS ZENITH SERIES
              </span>
              <p data-animation="slideLeft" style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555",
                maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
              }}>
                Clear-span high-bay construction. Laminar downdraft airflow. manufactured in the USA with ETL/UL listed components, built to your aircraft dimensions.
              </p>
            </div>
            {/* Featured image — natural aspect ratio, no black bars */}
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", lineHeight: 0 }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Zenith Series — twin-engine aircraft inside aerospace paint booth"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=aircraft-booth" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths" data-animation="slideRight">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "transparent", color: BLUE,
                  border: `2px solid ${BLUE}`,
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "1rem 2.5rem", cursor: "pointer",
                }}>
                  SEE ALL BOOTHS <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <TrustedBy label="Trusted By Industry Leaders" />

      {/* ── GALLERY PHOTOS (zoomable) ── */}
      <section style={{ padding: "0 0 4rem", background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-8" style={{ paddingTop: "4rem" }}>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Built for Aircraft. Proven in the Field.
            </h2>
          </div>
          <div className="mb-8">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="clamp(260px,35vw,440px)" className="grid md:grid-cols-2 gap-3" />
          </div>
          <div className="text-center">
            <Link href="/contact/request-a-quote?from=aircraft-booth" data-animation="slideRight" className="btn-glow">
              <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }} >GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "4rem 0", background: "#f5f5f5" }}>
        <div className="container">
          <div className="text-center mb-8">
            <span style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase",
              display: "block", marginBottom: "0.6rem",
            }}>
              STANDARD SPECIFICATION
            </span>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Certified. Engineered. Delivered Complete.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {FEATURES_VISIBLE.map((f) => (
              <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}`, display: "flex", flexDirection: "column" }} data-animation="fadeIn">
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900, color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: "0.6rem" }}>{f.title}</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75, marginBottom: "1rem", flex: 1 }}>{f.body}</p>
                <Link href="/contact/request-a-quote?from=aircraft-booth">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                    LEARN MORE <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {featuresOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-5 mb-5">
                {FEATURES_HIDDEN.map((f) => (
                  <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}`, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900, color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: "0.6rem" }}>{f.title}</h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75, marginBottom: "1rem", flex: 1 }}>{f.body}</p>
                    <Link href="/contact/request-a-quote?from=aircraft-booth">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                        LEARN MORE <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Booth Lineup */}
              <div style={{ background: "#fff", padding: "2rem", marginBottom: "1.5rem", borderTop: `3px solid #111` }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "1rem" }}>
                  AVAILABLE CONFIGURATIONS
                </div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: "1.25rem" }}>
                  One Booth Type Won't Cover Every Aircraft.
                </h3>
                <div className="grid md:grid-cols-5 gap-4">
                  {BOOTH_LINEUP.map((b) => (
                    <div key={b.name} style={{ borderLeft: `2px solid ${BLUE}`, paddingLeft: "0.85rem" }}>
                      <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800, color: "#111", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.3rem" }}>{b.name}</div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem", color: "#666", lineHeight: 1.6 }}>{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button data-animation="slideLeft"
              onClick={() => setFeaturesOpen(!featuresOpen)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "transparent", border: `1px solid ${BLUE}`, color: BLUE,
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "0.75rem 1.5rem", cursor: "pointer",
              }}
            >
              {featuresOpen
                ? <><ChevronUp size={14} /> SHOW LESS</>
                : <><ChevronDown size={14} /> SEE ALL SPECIFICATIONS &amp; BOOTH TYPES</>}
            </button>
            <Link href="/contact/request-a-quote?from=aircraft-booth" data-animation="slideRight">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1,
            }}>
              Tell us your aircraft dimensions.<br />We'll spec the booth.
            </h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. manufactured in the USA with ETL/UL listed components. Installed nationwide by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=aircraft-booth" data-animation="slideLeft">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#fff", color: BLUE,
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 800,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "1.1rem 2.5rem", cursor: "pointer",
                }}>
                  GET PRICING <ArrowRight size={16} />
                </span>
              </Link>
              <a href="tel:8885457715" data-animation="slideRight">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "1.1rem 2.5rem", cursor: "pointer",
                }}>
                  (888) 545-7715
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="Complete Your Finishing System"
        label="Complete Your System"
        cards={RELATED_PRODUCTS}
      />

    </div>
  );
}
