/**
 * Energy & Utilities Industry Page
 * Mirrors HeavyEquipmentPage / AerospacePage structure exactly:
 * - Full-bleed video hero (electrical switchgear cabinet in PFS booth)
 * - Auto-scrolling cert carousel
 * - Featured product section (PFS Zenith Series)
 * - Real gallery photo (user-supplied hero image)
 * - Collapsible features/specs
 * - Mid-page CTA band
 * - Related products grid
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── IMAGES ────────────────────────────────────────────────────────────────────
const HERO_IMG     = "/manus-storage/pfs-energy-hero_82223207.png";
const HERO_VIDEO   = "/manus-storage/pfs-energy-hero_cc935a28.mp4";
const FEATURED_IMG = "/manus-storage/pfs-energy-hero_82223207.png";

const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
const CERTS = [
  { type: "logo", img: ETL_LOGO,  title: "ETL & ETL-C Listed",       sub: "Intertek — USA & Canada",               imgH: 44 },
  { type: "logo", img: UL_LOGO,   title: "UL 508A Certified",         sub: "Industrial Control Panel Fabricator",   imgH: 44 },
  { type: "logo", img: NFPA_LOGO, title: "NFPA 33 Compliant",         sub: "Spray Application Standard",            imgH: 44 },
  { type: "logo", img: EPA_LOGO,  title: "EPA Compliant",             sub: "Air Quality Standards",                 imgH: 36 },
  { type: "logo", img: OSHA_LOGO, title: "OSHA Compliant",            sub: "Workplace Safety Standards",            imgH: 36 },
  { type: "flag", img: USA_FLAG,  title: "Made in the USA",           sub: "Santa Rosa, CA",                        imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "02",
    title: "Oversized Clear-Span Construction",
    body: "Clear-span structural steel frames engineered for transformers, switchgear cabinets, turbine components, and large pipeline sections. No interior columns. Full 360° access for large-format industrial finishing.",
  },
  {
    num: "03",
    title: "Precision Airflow for Complex Geometries",
    body: "Crossflow and downdraft configurations with high-CFM fans sized for large-volume booths. Uniform air velocity across the entire work envelope — essential for consistent finish quality on complex electrical and mechanical assemblies.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Class I Division 2 (CID2) Lighting",
    body: "Inside-access, CID2 four-tube fixtures are standard. Uniform, shadow-free illumination at 100+ foot-candles — essential for finish inspection on complex equipment surfaces, tight recesses, and precision-machined components.",
  },
  {
    num: "05",
    title: "Explosion-Safe Electrical Components",
    body: "All electrical components rated for spray environments. Explosion-proof fans, CID2 lighting, and UL 508A control panels ensure compliance with NFPA 33 and OSHA standards for solvent-based coating applications.",
  },
  {
    num: "06",
    title: "PFS Core Control Panel — UL 508A",
    body: "UL 508A certified control panels with spray, flash, and cure modes. Programmable cycle timers, temperature monitoring, and safety interlocks. Custom integration available for production line and utility facility environments.",
  },
];

const BOOTH_LINEUP = [
  { name: "Crossflow",      desc: "Side-to-side airflow. Cost-effective for large switchgear, transformers, and pipeline sections." },
  { name: "Downdraft",      desc: "Ceiling-to-floor airflow. Maximum cleanliness for precision electrical component finishing." },
  { name: "Semi-Downdraft", desc: "Rear-angled exhaust. Versatile for mixed component types and sizes." },
  { name: "Heated Booth",   desc: "Integrated heat for accelerated cure. Required for industrial coatings, epoxies, and primers." },
  { name: "Custom Build",   desc: "Engineered-to-order for oversized utility infrastructure or multi-bay production lines." },
];

const PRODUCTS = [
  {
    label: "Industrial Ovens",
    href: "/products/ovens",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Batch and conveyor ovens for component cure and powder coat baking on energy infrastructure parts.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Blast rooms and cabinets for heavy surface prep, rust removal, and coating adhesion on utility equipment.",
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    img: "/manus-storage/pfs-render-powder-booth_3dd083c1.jpg",
    desc: "Powder coating booths for electrical enclosures, frames, and infrastructure components.",
  },
  {
    label: "Air Make-Up Units",
    href: "/products/air-make-up-units",
    img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",
    desc: "Apollo AMU systems sized for large-volume energy sector spray booths.",
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
export default function EnergyUtilitiesPage() {
  useSEO({
    title: "Energy & Utilities Paint Booths | Industrial Finishing for Energy Sector | PFS",
    description: "PFS finishing systems serve the energy and utilities sector — wind turbine components, pipeline equipment, power generation parts. Custom configurations, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/industries/energy-utilities",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
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
          alt="PFS industrial spray booth for energy and utilities sector"
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
          }}>
            ENERGY &amp; UTILITIES
          </span>
          <h1 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Industrial Finishing Equipment<br />
            for Energy &amp; Utility<br />
            Infrastructure
          </h1>
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
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            manufactured in the USA with ETL/UL listed and UL 508A certified components. Clear-span oversized construction.
            Engineered for transformers, switchgear, turbine components, and pipeline infrastructure — installed nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }}>
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
              <h2 style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800,
                color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem",
              }}>
                Energy Infrastructure Paint Booth
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
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555",
                maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
              }}>
                Clear-span oversized construction. High-volume precision airflow. manufactured in the USA with ETL/UL listed components, built to your equipment dimensions.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Zenith Series — Energy & Utilities Paint Booth"
                style={{
                  width: "100%", height: "auto", display: "block",
                  objectFit: "cover", objectPosition: "center",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths/enclosed">
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
          <div className="text-center mb-8">
            <h2 style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Built for Energy Infrastructure. Proven in the Field.
            </h2>
          </div>
          {/* Single full-width feature photo */}
          <div className="mb-8">
            <ZoomableImage
              src={HERO_IMG}
              alt="PFS energy & utilities paint booth — large electrical switchgear cabinet"
              style={{ width: "100%", height: "520px", display: "block", objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className="text-center">
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
            <h2 style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Certified. Engineered. Delivered Complete.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-5">
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
                  One Booth Type Won't Cover Every Application.
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
            <button
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
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
            <h2 style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1,
            }}>
              Tell us your equipment dimensions.<br />We'll spec the booth.
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. manufactured in the USA with ETL/UL listed components. Installed nationwide by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote">
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
              <a href="tel:8885457715">
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
        heading="You May Also Need"
        label="Complete Your System"
        cards={PRODUCTS}
      />

    </div>
  );
}
