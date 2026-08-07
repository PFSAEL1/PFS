/*
 * Aerospace & Defense — Enriched Page v1
 * Mirrors IndustrialManufacturingPage structure exactly:
 * - Full-bleed hero with real PFS aerospace photo
 * - Auto-scrolling cert carousel (ETL, UL 508A, NFPA, EPA, OSHA, USA flag)
 * - Featured product section (PFS Zenith Series — Aerospace Crossflow)
 * - Real gallery photos (user-supplied)
 * - Collapsible features/specs
 * - Mid-page CTA band
 * - Related products grid
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── IMAGES ────────────────────────────────────────────────────────────────────
// Photo assignments — each used exactly once:
// HERO_IMG    : front-facing jet in white booth (full-bleed hero background)
// FEATURED_IMG: twin-engine prop in hangar (featured Zenith booth section)
// GALLERY_1   : technician spraying fuselage (zoomable gallery)
// GALLERY_2   : PFS-branded jet side profile (zoomable gallery)
const HERO_IMG = "/manus-storage/private_jet_front_facing_0a4e4e26.png";
const HERO_VIDEO = "/manus-storage/industry_aerospace_hero_853cec31.mp4";
const FEATURED_IMG = "/manus-storage/pfs-aerospace-plane-in-booth_daa826f8.png";
const OLD_FEATURED = "/manus-storage/private_jet_side_angle_fdd4968c.png";
const GALLERY_1 = "/manus-storage/aero_technician_spraying_21c4171a.png";
const GALLERY_2 = "/manus-storage/aero_pfs_jet_side_0b0bc5eb.png";
const GALLERY_REAL = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";

const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

// Brand blue
const BLUE = "#1B3A6B";

// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
const CERTS = [
  { type: "logo", img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "Intertek — USA & Canada", filter: "none", imgH: 44 },
  { type: "logo", img: UL_LOGO, title: "UL 508A Certified", sub: "Industrial Control Panel Fabricator", filter: "none", imgH: 44 },
  { type: "logo", img: NFPA_LOGO, title: "NFPA 33 Compliant", sub: "Spray Application Standard", filter: "none", imgH: 44 },
  { type: "logo", img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", filter: "none", imgH: 36 },
  { type: "logo", img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", filter: "none", imgH: 36 },
  { type: "flag", img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", filter: "none", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "02",
    title: "Aerospace-Grade Airflow Control",
    body: "Laminar downdraft airflow at 100 FPM uniform face velocity. Ceiling-to-floor air movement eliminates overspray recirculation — critical for aerospace topcoat and primer applications.",
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

const PRODUCTS = [
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
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
        padding: 0,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "rgba(255,255,255,0.15)", border: "none",
          color: "#fff", width: "44px", height: "44px",
          borderRadius: "50%", cursor: "pointer", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

// ── ZOOMABLE IMAGE ────────────────────────────────────────────────────────────
function ZoomableImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{ position: "relative", cursor: "zoom-in", overflow: "hidden" }}
        className="group"
      >
        <img src={src} alt={alt} style={style} />
        <div style={{
          position: "absolute", bottom: "0.75rem", right: "0.75rem",
          background: "rgba(0,0,0,0.55)", borderRadius: "4px",
          padding: "0.35rem 0.5rem",
          display: "flex", alignItems: "center", gap: "0.3rem",
          color: "#fff", fontSize: "0.72rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
          pointerEvents: "none",
        }}>
          <ZoomIn size={13} /> ZOOM
        </div>
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}




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
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {CERTS_LOOP.map((cert, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1.1rem 2.5rem",
                borderRight: "1px solid rgba(0,0,0,0.07)",
                flexShrink: 0,
              }}
            >
              {cert.type === "flag" ? (
                <img
                  src={cert.img}
                  alt={cert.title}
                  style={{
                    height: `${cert.imgH}px`,
                    width: "auto",
                    objectFit: "cover",
                    borderRadius: "2px",
                    flexShrink: 0,
                    aspectRatio: "3/2",
                  }}
                />
              ) : (
                <img
                  src={cert.img}
                  alt={cert.title}
                  style={{
                    height: `${cert.imgH}px`,
                    width: "auto",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.1rem" }}>
                <span style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.82rem", fontWeight: 800,
                  color: "#111", letterSpacing: "0.04em",
                  textTransform: "uppercase", whiteSpace: "nowrap",
                }}>
                  {cert.title}
                </span>
                <span style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.68rem", color: "#666",
                  whiteSpace: "nowrap",
                }}>
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
export default function AerospacePage() {
  useSEO({
    title: "Aerospace Paint Booths & Finishing Systems | Aircraft & Aviation | PFS",
    description: "PFS aerospace spray booths deliver 100 FPM laminar downdraft airflow, NFPA 33 compliance, and clear-span high-bay construction for commercial aircraft, military aviation, and MRO operations. ETL/UL listed components, CID2 explosion-proof electrical, HEPA filtration available. Custom-engineered and manufactured in Santa Rosa, CA. Ships nationally.",
    canonical: "/industries/aerospace",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const play = () => { v.play().catch(() => { }); setVideoReady(true); };
    v.addEventListener("canplaythrough", play, { once: true });
    v.load();
    return () => v.removeEventListener("canplaythrough", play);
  }, []);

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <img
          src={HERO_IMG}
          alt="PFS aerospace spray booth for aircraft and aviation finishing"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: videoReady ? 0 : 1, transition: "opacity 0.7s ease", zIndex: 0 }}
        />
        <video preload="auto" ref={videoRef}
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
            opacity: videoReady ? 1 : 0, transition: "opacity 0.7s ease",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark gradient — lighter at top (image is bright white) so text is readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>
            AEROSPACE &amp; DEFENSE
          </span>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Aerospace Paint Booths<br />
            for Aircraft &amp; Defense<br />
            Applications
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
            Laminar downdraft airflow at 100 FPM face velocity. ETL/UL listed and UL 508A certified components. Clear-span high-bay construction with no interior columns. Custom-engineered for commercial, military, and private aircraft — installed nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
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

      {/* ── FEATURED PAINT BOOTH — Zenith ── */}
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
              <p data-animation="slideLeft"
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555",
                  maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
                }}>
                Clear-span high-bay construction. Laminar downdraft airflow at 100 FPM uniform face velocity. ETL/UL listed and UL 508A certified components. Custom-engineered to your aircraft dimensions.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Zenith Series — Aerospace Paint Booth with twin-engine aircraft"
                style={{
                  width: "100%", height: "auto", display: "block",
                  objectFit: "cover", objectPosition: "center",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths/enclosed" data-animation="slideRight">
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
          <div className="text-center mb-8" data-animation="slideLeft" >
            <h2 style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Built for Aircraft. Proven in the Field.
            </h2>
          </div>
          <GalleryGrid
            images={[
              { src: GALLERY_REAL, alt: "Private jet masked and prepped inside PFS aerospace paint booth" },
              { src: GALLERY_1, alt: "Technician spraying aircraft fuselage in PFS aerospace booth" },
              { src: GALLERY_2, alt: "PFS-branded jet side profile in aerospace paint booth" },
              { src: OLD_FEATURED, alt: "PFS Zenith Series aerospace paint booth with twin-engine aircraft — side angle" },
            ]}
            cardHeight="clamp(220px,30vw,360px)"
          />
          <div className="text-center" data-animation="slideRight">
            <Link href="/contact/request-a-quote">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
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

          <div className="grid md:grid-cols-3 gap-5 mb-5" data-animation="fadeIn">
            {FEATURES_VISIBLE.map((f) => (
              <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}`, display: "flex", flexDirection: "column" }}>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900,
                  color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem",
                }}>{f.num}</div>
                <h3 style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem",
                  fontWeight: 700, color: "#111", marginBottom: "0.6rem",
                }}>{f.title}</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75, marginBottom: "1rem", flex: 1 }}>{f.body}</p>
                <Link href="/contact/request-a-quote">
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
                    <div style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900,
                      color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem",
                    }}>{f.num}</div>
                    <h3 style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem",
                      fontWeight: 700, color: "#111", marginBottom: "0.6rem",
                    }}>{f.title}</h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75, marginBottom: "1rem", flex: 1 }}>{f.body}</p>
                    <Link href="/contact/request-a-quote">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                        LEARN MORE <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Booth Lineup */}
              <div style={{ background: "#fff", padding: "2rem", marginBottom: "1.5rem", borderTop: `3px solid #111` }}>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "1rem",
                }}>
                  AVAILABLE CONFIGURATIONS
                </div>
                <h3 style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem",
                  fontWeight: 800, color: "#111", marginBottom: "1.25rem",
                }}>
                  One Booth Type Won't Cover Every Aircraft.
                </h3>
                <div className="grid md:grid-cols-5 gap-4">
                  {BOOTH_LINEUP.map((b) => (
                    <div key={b.name} style={{ borderLeft: `2px solid ${BLUE}`, paddingLeft: "0.85rem" }}>
                      <div style={{
                        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800,
                        color: "#111", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.3rem",
                      }}>{b.name}</div>
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
            <Link href="/contact/request-a-quote">
              <span data-animation="slideRight" className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
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
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
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


      {/* ── NEHSAP FILTER SEO SECTION ───────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "4rem 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: "0.5rem" }}>NEHSAP COMPLIANT FILTRATION</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "0.75rem" }}>Aerospace-Grade Spray Booth Filters</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#444", lineHeight: 1.75 }}>NEHSAP (National Emission Standards for Hazardous Air Pollutants) compliance requires spray booths used in aerospace manufacturing to capture overspray at the source. PFS aerospace booths are engineered with high-efficiency intake and exhaust filtration systems that meet or exceed NEHSAP capture efficiency requirements for HAP-containing coatings used in aerospace surface coating operations.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
            {[
              { title: "Fiberglass Intake Filters", body: "Multi-stage fiberglass media panels capture particulate at the air inlet. Replaceable modules maintain 100 FPM face velocity and prevent contamination of the spray zone." },
              { title: "Exhaust Filter Banks", body: "Downstream exhaust filter banks — standard polyester or optional HEPA-grade media — capture overspray before air exits the booth, meeting NEHSAP capture efficiency thresholds for aerospace HAP coatings." },
              { title: "HEPA Secondary Filtration", body: "Optional HEPA secondary filtration stage for composite coating environments, specialty primers, and facilities subject to NEHSAP Subpart GG (Aerospace Manufacturing & Rework) air permit conditions." },
              { title: "Filter Change Monitoring", body: "Magnehelic differential pressure gauges standard on all PFS aerospace booths. Monitors filter loading in real time so maintenance intervals are based on actual airflow data, not calendar schedules." },
            ].map(item => (
              <div key={item.title} style={{ background: "#f5f7fa", borderTop: `3px solid ${BLUE}`, padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 800, color: "#111", marginBottom: "0.6rem" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#eff4ff", border: "1px solid #c7d9f5", borderLeft: `4px solid ${BLUE}`, padding: "1.25rem 1.5rem" }}>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.88rem", color: "#1e3a6e", lineHeight: 1.75, margin: 0 }}><strong>NEHSAP Subpart GG</strong> applies to aerospace manufacturing and rework facilities that use coatings containing HAPs (hazardous air pollutants). PFS engineers review your specific coating materials and production volume during the quoting process to confirm the filtration specification meets your air permit and NEHSAP compliance requirements.</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ background: "#f8f9fb", padding: "clamp(2.5rem, 6vw, 4rem) 0", borderTop: "1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: "#1B3A6B", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Aerospace Spray Booths & Finishing Systems — Common Questions</h2>
          </div>
          {[
            { q: "What spray booth standards apply to aerospace finishing operations?", a: "Aerospace finishing operations are subject to NFPA 33 (Standard for Spray Application of Flammable or Combustible Materials), OSHA 1910.94 (Ventilation), and applicable FAA, NADCAP, and Boeing/Airbus supplier quality requirements. PFS aerospace booths are built to NFPA 33 and OSHA standards with ETL/UL listed and certified components. NADCAP and OEM-specific requirements are addressed during the engineering phase." },
            { q: "What size spray booth is needed for aerospace applications?", a: "Aerospace spray booths range from small component booths (10 ft wide x 10 ft deep) for avionics and small parts to full-aircraft booths exceeding 100 ft wide x 200 ft deep for wide-body commercial aircraft. PFS engineers size each booth to the specific aircraft or component type, production volume, and coating process requirements." },
            { q: "Can PFS build a spray booth for painting commercial aircraft?", a: "Yes. PFS designs and manufactures large-format aerospace finishing systems for commercial, military, and general aviation aircraft. Our aerospace booths include full-downdraft airflow, heated make-up air, explosion-proof electrical, and custom access platforms and lighting configurations for aircraft painting." },
            { q: "What airflow pattern is best for aerospace spray booths?", a: "Full downdraft airflow is the preferred configuration for aerospace spray booths. Downdraft airflow moves air from ceiling to floor, carrying overspray and solvent vapors away from the aircraft surface and the painter, delivering the cleanest finish quality and the safest working environment for aerospace coating applications." },
            { q: "Does PFS provide installation and commissioning for aerospace booths?", a: "Yes. PFS provides full installation, commissioning, and operator training for all aerospace finishing systems. Our service team coordinates with your facility management, electrical contractor, and coating supplier to ensure the system is installed, balanced, and qualified to your production requirements." },
            { q: "What is NEHSAP and how does it affect aerospace spray booth filtration?", a: "NEHSAP (National Emission Standards for Hazardous Air Pollutants) Subpart GG applies to aerospace manufacturing and rework facilities that use HAP-containing coatings. It requires facilities to use compliant spray booths with sufficient capture efficiency to control HAP emissions at the source. PFS aerospace booths are engineered with multi-stage intake and exhaust filtration — including optional HEPA secondary filtration — to meet NEHSAP capture efficiency requirements and support your facility's air permit compliance." },
            { q: "Does PFS supply replacement filters for aerospace spray booths?", a: "Yes. PFS supplies OEM replacement filter media for all PFS aerospace booths including fiberglass intake panels, polyester exhaust media, and HEPA secondary filtration modules. Replacement filters are available through our parts store or by contacting our service team. Magnehelic differential pressure gauges on each booth indicate when filter replacement is required based on actual airflow data." },
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
      </section>

      {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="You May Also Need"
        label="Complete Your System"
        cards={PRODUCTS}
      />

    </div>
  );
}
