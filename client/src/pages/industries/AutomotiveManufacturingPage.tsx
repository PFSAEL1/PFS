/*
 * AUTOMOTIVE MANUFACTURING INDUSTRY PAGE
 * Layout: Mirrors AerospacePage.tsx exactly:
 * - Full-bleed video hero
 * - Auto-scrolling cert carousel
 * - Featured paint booth section
 * - TrustedBy
 * - GalleryGrid gallery
 * - Collapsible features/specs + booth lineup
 * - Mid-page CTA band
 * - Recommended products grid
 * Design: PFS brand — Barlow Condensed headings, Inter body, navy #1b3a6b accent.
 */

import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1b3a6b";

// ── ASSET URLS ──────────────────────────────────────────────────────────────
const HERO_VIDEO     = "/manus-storage/pfs-auto-mfg-hero-v3-trimmed_cef14b14.mp4";
const HERO_POSTER    = "/manus-storage/pfs-auto-mfg-hero-poster_6d8c01e4.jpg";
const FEATURED_IMG   = "/manus-storage/automotive-manufacturing-booth_801eeddf.jpeg";
const GALLERY_CAR_SPRAY = "/manus-storage/pfs-auto-mfg-car-spray_5dfb08d5.png";
const GALLERY_1      = "/manus-storage/automotive-mfg-robot-booth_049a4e5f.png";

// ── CERT LOGOS ───────────────────────────────────────────────────────────────
const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

// ── CERT CAROUSEL DATA ────────────────────────────────────────────────────────
const CERTS = [
  { type: "logo", img: ETL_LOGO,  title: "ETL & ETL-C Listed",       sub: "Intertek — USA & Canada",             filter: "none", imgH: 44 },
  { type: "logo", img: UL_LOGO,   title: "UL 508A Certified",         sub: "Industrial Control Panel Fabricator", filter: "none", imgH: 44 },
  { type: "logo", img: NFPA_LOGO, title: "NFPA 33 Compliant",         sub: "Spray Application Standard",          filter: "none", imgH: 44 },
  { type: "logo", img: EPA_LOGO,  title: "EPA Compliant",             sub: "Air Quality Standards",               filter: "none", imgH: 36 },
  { type: "logo", img: OSHA_LOGO, title: "OSHA Compliant",            sub: "Workplace Safety Standards",          filter: "none", imgH: 36 },
  { type: "flag", img: USA_FLAG,  title: "Made in the USA",           sub: "Santa Rosa, CA",                      filter: "none", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "01",
    title: "Downdraft & Semi-Downdraft Airflow",
    body: "Engineered laminar airflow eliminates turbulence and overspray contamination across high-volume production lines. Available in full downdraft, semi-downdraft, and side-downdraft configurations.",
  },
  {
    num: "02",
    title: "Robotic Integration Ready",
    body: "PFS booths are pre-engineered for robotic arm integration. Cable management, reinforced floor plates, and programmable lighting zones are standard on ORION-R configurations.",
  },
  {
    num: "03",
    title: "High-Volume Throughput Design",
    body: "Drive-through configurations with dual-end access doors allow continuous production flow. Custom widths from 12 ft to 40+ ft accommodate full-size vehicles and body-in-white assemblies.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "ETL Listed & NFPA 33 Compliant",
    body: "Every PFS automotive booth ships with ETL certification and full NFPA 33 compliance documentation. No third-party inspection delays — your facility is ready to operate from day one.",
  },
  {
    num: "05",
    title: "Bake & Cure Capability",
    body: "Integrated gas or electric heat systems bring booth temperatures to 140°F–180°F for accelerated cure cycles. Reduces floor time per unit and increases daily throughput significantly.",
  },
  {
    num: "06",
    title: "Made in the USA — Ships Nationwide",
    body: "Manufactured at PFS headquarters. Every panel, filter bank, and control system is built in-house and shipped direct. No third-party distributors, no markups, no delays.",
  },
];

// ── BOOTH LINEUP ─────────────────────────────────────────────────────────────
const BOOTH_LINEUP = [
  { name: "ZENITH",   desc: "Full downdraft — maximum contamination control for OEM quality finishes" },
  { name: "HELIOS",   desc: "Semi-downdraft — ideal for mid-volume shops and Tier 1 suppliers" },
  { name: "ORION",    desc: "Cross-flow — cost-effective for fleet and production refinishing" },
  { name: "ORION-R",  desc: "Robotic cell — purpose-built for automated spray arm integration" },
  { name: "CUSTOM",   desc: "Drive-through, tandem, or multi-zone — engineered to your line layout" },
];

// ── RECOMMENDED PRODUCTS ─────────────────────────────────────────────────────
const PRODUCTS = [
  {
    label: "Enclosed Paint Booths",
    href: "/products/paint-booths/enclosed",
    img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg",
    desc: "Full downdraft and semi-downdraft booths for OEM and Tier 1 automotive finishing.",
  },
  {
    label: "Robotic Finishing Cells",
    href: "/integration-automation/robotic-finishing-cells",
    img: "/manus-storage/pfs-robotic-cell-orion-r_4f0c33bb_2d3b524c.png",
    desc: "ORION-R robotic cells for consistent, high-volume automated spray application.",
  },
  {
    label: "Prep Stations",
    href: "/products/prep/paint-prep-stations",
    img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",
    desc: "Masking and prep stations to keep your production line moving.",
  },
  {
    label: "Powder Coating Lines",
    href: "/integration-automation/powder-coating-lines",
    img: "/manus-storage/pfs-powder-coating-line-real_9473890b.png",
    desc: "Complete powder coating lines for automotive components and sub-assemblies.",
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
        cursor: "zoom-out", padding: 0,
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
        src={src} alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100vw", height: "100vh", objectFit: "cover", display: "block" }}
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
      background: "#ffffff", padding: "0", overflow: "hidden",
      borderTop: `4px solid ${BLUE}`,
      borderBottom: `3px solid #111`,
      boxShadow: "0 4px 0 0 #111",
    }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none",
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
                padding: "1.1rem 2.5rem", borderRight: "1px solid rgba(0,0,0,0.07)", flexShrink: 0,
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
export default function AutomotiveManufacturingPage() {
  useSEO({
    title: "Automotive Manufacturing Paint Booths | OEM & Tier 1 Finishing | PFS",
    description: "PFS Zenith and Orion-R Series automotive paint booths serve OEM and Tier 1 manufacturers. Laminar downdraft airflow, robotic arm integration, drive-through and conveyor-integrated configurations. NFPA 33 compliant, ETL/UL listed components, UL 508A certified controls. Custom widths to 40+ ft for body-in-white assemblies. Manufactured in Santa Rosa, CA. Ships nationally.",
    canonical: "/industries/automotive-manufacturing",
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
          src={HERO_POSTER}
          alt="PFS automotive manufacturing paint booth for OEM and Tier 1 finishing"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: videoReady ? 0 : 1, transition: "opacity 0.7s ease", zIndex: 0 }}
        />
        <video preload="auto"
          ref={videoRef}
          autoPlay muted loop playsInline
          disablePictureInPicture
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center center",
            opacity: videoReady ? 1 : 0, transition: "opacity 0.7s ease",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark gradient */}
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
            AUTOMOTIVE MANUFACTURING
          </span>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Automotive Paint Booths<br />
            for OEM &amp; Production<br />
            Manufacturing
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
            PFS ZENITH &amp; ORION-R SERIES
          </span>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px",
          }}>
            Laminar downdraft airflow. Robotic arm integration ready. Drive-through and conveyor-integrated configurations. ETL/UL listed and UL 508A certified components. NFPA 33 compliant. Engineered for OEM, Tier 1, and high-volume automotive finishing — installed nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
              <span className="btn-glow">GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "1.1rem 2.5rem", cursor: "pointer",
              }}>
                CALL (888) 545-7715
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── AUTO-SCROLLING CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── FEATURED PAINT BOOTH ── */}
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
                Automotive Downdraft Paint Booth
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
                Full downdraft airflow. Bake-and-cure capable. Drive-through access. Built to your vehicle dimensions and production throughput requirements.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS automotive paint booth — production floor"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths/enclosed" data-animation="slideRight">
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "transparent", color: BLUE, border: `2px solid ${BLUE}`,
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
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Built for Automotive. Proven on the Production Floor.
            </h2>
          </div>
          <GalleryGrid
            images={[
              { src: GALLERY_CAR_SPRAY, alt: "Robotic arms spraying automotive car body on production line" },
              { src: FEATURED_IMG,      alt: "Silver vehicle inside PFS automotive paint booth" },
              { src: GALLERY_1,         alt: "PFS ORION-R robotic finishing cell spraying automotive parts" },
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

          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {FEATURES_VISIBLE.map((f) => (
              <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}`, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900, color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: "0.6rem" }}>{f.title}</h3>
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
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900, color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: "0.6rem" }}>{f.title}</h3>
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
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "1rem" }}>
                  AVAILABLE CONFIGURATIONS
                </div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: "1.25rem" }}>
                  One Booth Type Won't Cover Every Production Line.
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
            <Link href="/contact/request-a-quote" data-animation="slideRight">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
            <h2 data-animation="slideLeft"  style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1,
            }}>
              Tell us your vehicle dimensions.<br />We'll spec the booth.
            </h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. manufactured in the USA with ETL/UL listed components. Installed nationwide by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote" data-animation="slideLeft" >
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


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Automotive Manufacturing Spray Booths — Common Questions</h2>
          </div>
          {[
            { q: "What type of spray booth is used in automotive manufacturing?", a: "Automotive manufacturing plants use full-downdraft spray booths for body-in-white (BIW) painting, heated booths for primer and topcoat bake cycles, and integrated conveyor finishing lines for high-volume production. PFS manufactures all of these systems and can design integrated finishing lines for OEM and Tier 1 automotive suppliers." },
            { q: "What is the difference between an OEM automotive booth and a collision repair booth?", a: "OEM automotive manufacturing booths are designed for high-volume, continuous production with conveyor systems, automated spray equipment, and multi-zone heating for primer, basecoat, and clearcoat application. Collision repair booths are designed for lower-volume, batch processing of individual vehicles with manual spray application. PFS manufactures both types." },
            { q: "What airflow velocity is required in an automotive spray booth?", a: "NFPA 33 requires a minimum of 100 FPM (feet per minute) face velocity across the open face of a spray booth, or a minimum of 100 FPM through the work zone for enclosed booths. Most automotive manufacturing booths operate at 60–100 FPM downdraft velocity for optimal finish quality and overspray control." },
            { q: "Can PFS integrate a spray booth with an existing conveyor system?", a: "Yes. PFS designs spray booths and finishing systems to integrate with power-and-free conveyors, overhead monorails, floor-mounted chain conveyors, and automated guided vehicle (AGV) systems. Our engineers coordinate with your conveyor supplier to ensure the booth opening dimensions, airflow, and heating systems are compatible with your production line." },
            { q: "Does PFS manufacture spray booths for EV battery assembly?", a: "Yes. PFS manufactures environmentally controlled finishing rooms and battery module coating systems for electric vehicle battery assembly. These systems provide controlled temperature, humidity, and airflow for battery cell and module coating processes. Contact a PFS engineer for EV-specific requirements." },
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
