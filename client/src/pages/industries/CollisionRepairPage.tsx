/*
 * Collision Repair & Auto Body — Industry Page
 * Mirrors AerospacePage structure exactly:
 * Hero → Cert Carousel → Featured Product (0557 + 0559) → TrustedBy → Gallery → Features → CTA Band → Related Products
 * Design: Deep navy #1B3A6B, Chakra Petch headlines, Archivo Narrow body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── IMAGES ────────────────────────────────────────────────────────────────────
const HERO_IMG      = "/manus-storage/pfs-collision-repair-helios-hero_73dfbc88.png";
const HERO_VIDEO    = "/manus-storage/industry_collision_repair_hero_d7d15cc6.mp4";

// Featured product — 0557 only (centered hero shot)
const FEATURED_0557 = "/manus-storage/pfs-collision-0557_6ef79f15.jpg";
// 0559 moved to gallery
const GALLERY_0559 = "/manus-storage/pfs-collision-0559_72c3d053.jpg";

// Gallery — all photos
const GALLERY_0633  = "/manus-storage/pfs-collision-0633_fde8f8e1.jpg";
const GALLERY_0544  = "/manus-storage/pfs-collision-0544_b0b29dda.jpg";
const GALLERY_0087  = "/manus-storage/pfs-collision-0087_51e49914.jpg";
const GALLERY_MULTI = "/manus-storage/pfs-collision-repair-multi-booth-showroom_9f44f9a6.jpeg";
const GALLERY_STACK = "/manus-storage/pfs-heated-booth-exhaust-stack_ca825d7b.jpeg";
const GALLERY_AMU   = "/manus-storage/pfs-apollo-amu-rooftop_9a42ebf0.jpg";
const GALLERY_DOWN  = "/manus-storage/pfs-downdraft-raised-basement-booth_2c67ebec.jpeg";
// New user-uploaded photos
const GALLERY_BOOTH_WIDE    = "/manus-storage/collision-booth-wide_2d3b3c7b.jpeg";
const GALLERY_BOOTH_FRONT   = "/manus-storage/collision-booth-front_76b972e6.jpeg";
const GALLERY_BOOTH_ANGLE   = "/manus-storage/collision-booth-angle_9f4965f5.jpeg";
const GALLERY_CAR_INSIDE    = "/manus-storage/collision-car-inside_faa69114.jpeg";
const GALLERY_KIA_INSIDE    = "/manus-storage/collision-kia-inside_5ce4ba53.jpeg";
const GALLERY_KIA_INSIDE2   = "/manus-storage/collision-kia-inside2_6da2d589.jpeg";
const GALLERY_BOOTH_EXT     = "/manus-storage/collision-booth-exterior_fdd41c21.jpeg";
const GALLERY_SPRINTER      = "/manus-storage/collision-sprinter-inside_17be38f9.jpeg";

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
    num: "01",
    title: "ETL-Listed for Collision Repair Environments",
    body: "Every PFS Helios booth ships ETL-listed and NFPA 33 compliant. Built to satisfy insurance carrier requirements, I-CAR Gold Class standards, and OEM certification programs — so your shop stays approved and your warranty stays intact.",
  },
  {
    num: "02",
    title: "Downdraft Airflow for OEM Color Match",
    body: "Laminar downdraft airflow at 100 FPM uniform face velocity. Ceiling-to-floor air movement eliminates dust contamination and overspray recirculation — critical for OEM-spec color match and clear coat.",
  },
  {
    num: "03",
    title: "Integrated Bake Cycle — 140°F Standard",
    body: "Built-in direct-fired or indirect-fired heat systems bring the booth to 140°F bake temperature in under 15 minutes. Accelerate cure times and increase throughput without sacrificing finish quality.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Class I Division 2 (CID2) Lighting",
    body: "Inside-access, CID2 four-tube fixtures are standard. Uniform, shadow-free illumination at 100+ foot-candles — essential for collision repair color matching and finish inspection.",
  },
  {
    num: "05",
    title: "Fiberglass & Polyester Filtration",
    body: "High-efficiency intake and exhaust filtration systems designed for collision repair environments. Captures overspray and particulates to protect your finish and maintain EPA compliance.",
  },
  {
    num: "06",
    title: "PFS Core Control Panel — UL 508A",
    body: "UL 508A certified control panels with spray, flash, and bake modes. Programmable cycle timers, temperature monitoring, and safety interlocks. I-CAR Gold Class compatible.",
  },
];

const BOOTH_LINEUP = [
  { name: "Downdraft",      desc: "Full ceiling-to-floor airflow. Maximum cleanliness for OEM color match." },
  { name: "Semi-Downdraft", desc: "Rear-angled exhaust. Versatile for mixed collision and prep work." },
  { name: "Crossflow",      desc: "Side-to-side airflow. Cost-effective for high-volume shops." },
  { name: "Prep Station",   desc: "Dedicated prep and sealer station. Keeps your main booth in production." },
  { name: "Heated Booth",   desc: "Integrated bake cycle for accelerated cure." },
];

const PRODUCTS = [
  {
    label: "Prep Stations",
    href: "/products/prep-support/prep-stations",
    img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",
    desc: "Dedicated prep and sealer stations to keep your main booth in production.",
  },
  {
    label: "Industrial Ovens",
    href: "/products/ovens",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Batch ovens for accelerated primer and clear coat cure.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Blast cabinets and rooms for surface prep and rust removal.",
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png",
    desc: "Powder coating booths for wheels, frames, and collision components.",
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
      <div onClick={() => setOpen(true)} style={{ position: "relative", cursor: "zoom-in", overflow: "hidden" }} className="group">
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
      borderTop: `4px solid ${BLUE}`, borderBottom: `3px solid #111`,
      boxShadow: "0 4px 0 0 #111",
    }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
              <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", display: "block" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.1 }}>{cert.title}</span>
                <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", color: "#666", letterSpacing: "0.01em" }}>{cert.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function CollisionRepairPage() {
  useSEO({
    title: "Collision Repair Paint Booths | Auto Body Shop Spray Booths | PFS",
    description: "PFS Helios Series collision repair spray booths deliver 100 FPM downdraft airflow, integrated spray-and-bake capability, and ETL listing for I-CAR Gold Class shops, MSO networks, and independent collision centers. NFPA 33 compliant, OEM-spec airflow, UL 508A certified controls. Manufactured in Santa Rosa, CA. Ships nationally.",
    canonical: "/industries/collision-repair",
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
    <div style={{ background: "#fff" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#0a0a0a" }}>
        <img
          src={HERO_IMG}
          alt="PFS Helios collision repair paint booth for auto body shops"
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: videoReady ? 0 : 1, transition: "opacity 0.7s ease", zIndex: 0,
          }}
        />
        <video
          preload="auto"
          ref={videoRef}
          autoPlay muted loop playsInline
          disablePictureInPicture
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            opacity: videoReady ? 1 : 0, transition: "opacity 0.7s ease",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link href="/industries">
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Industries</span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Collision Repair</span>
          </div>

          {/* Eyebrow */}
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>
            COLLISION REPAIR &amp; AUTO BODY
          </span>

          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
            
          }}>
            Collision Repair &amp;<br />Auto Body Booths
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
            PFS HELIOS SERIES
          </span>

          <p  data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            ETL-listed spray booths and prep stations engineered for I-CAR Gold Class shops, MSO networks, and independent collision centers. 100 FPM downdraft airflow. Integrated spray-and-bake capability. NFPA 33 compliant. Delivered and installed nationwide.
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

      {/* ── CERT CAROUSEL ── */}
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
                Collision Repair Downdraft Paint Booth
              </h2>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: BLUE, color: "#fff",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "0.28rem 0.85rem", marginBottom: "0.75rem",
              }}>
                PFS HELIOS SERIES
              </span>
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555",
                maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
              }}>
                Full downdraft airflow. Integrated bake cycle. ETL listed and built to your shop dimensions.
              </p>
            </div>

            {/* Single centered featured photo */}
            <div style={{ width: "100%", maxWidth: "860px" }}>
              <ZoomableImage
                src={FEATURED_0557}
                alt="PFS Helios Series collision repair booth with mixing station — shop installation"
                style={{ width: "100%", height: "clamp(280px,40vw,480px)", objectFit: "cover", objectPosition: "center", display: "block", borderRadius: "2px" }}
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

      {/* ── GALLERY PHOTOS ── */}
      <section style={{ padding: "0 0 4rem", background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 data-animation="slideLeft"  style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Built for Collision Repair. Proven in the Field.
            </h2>
          </div>
          <GalleryGrid
            images={[
              { src: GALLERY_0559,       alt: "PFS Helios Series collision repair booth — installed in auto body shop" },
              { src: GALLERY_BOOTH_WIDE, alt: "PFS Helios booth with mixing station — wide shop view" },
              { src: GALLERY_BOOTH_FRONT,alt: "PFS Helios booth — front view with three-door configuration" },
              { src: GALLERY_BOOTH_ANGLE,alt: "PFS Helios booth — angle view during installation" },
              { src: GALLERY_CAR_INSIDE, alt: "Vehicle inside PFS collision repair paint booth" },
              { src: GALLERY_KIA_INSIDE, alt: "Kia sedan inside PFS downdraft paint booth" },
              { src: GALLERY_KIA_INSIDE2,alt: "Kia sedan in PFS booth with technician" },
              { src: GALLERY_BOOTH_EXT,  alt: "PFS Helios booth exterior — car visible through glass doors" },
              { src: GALLERY_SPRINTER,   alt: "Mercedes Sprinter van inside PFS paint booth" },
              { src: GALLERY_0633, alt: "PFS Helios collision repair booth — shop installation wide view" },
              { src: GALLERY_0544, alt: "PFS collision repair booth — control panel and fire suppression" },
              { src: GALLERY_0087, alt: "PFS collision repair booth — field installation" },
              { src: GALLERY_MULTI, alt: "PFS multi-booth collision repair showroom floor" },
              { src: GALLERY_STACK, alt: "PFS heated booth exhaust stack and heater unit install" },
              { src: GALLERY_AMU,   alt: "PFS Apollo AMU rooftop air make-up unit install" },
              { src: GALLERY_DOWN,  alt: "PFS downdraft raised basement booth — open doors, ramps, grated floor" },
            ]}
            cardHeight="clamp(220px,30vw,360px)"
          />
          <div className="text-center mt-8" data-animation="slideRight">
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

          <div className="grid md:grid-cols-3 gap-5 mb-5" data-animation="fadeIn">
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
                  One Booth Type Won't Cover Every Shop.
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
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1,
            }}>
              Tell us your shop dimensions.<br />We'll spec the booth.
            </h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. ETL listed. Installed nationwide by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote"data-animation="slideLeft">
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
            <h2  data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Collision Repair Spray Booths — Common Questions</h2>
          </div>
          {[
            { q: "What size spray booth do I need for a collision repair shop?", a: "A standard collision repair spray booth for passenger cars and light trucks is typically 14 ft wide x 24 ft deep x 9 ft tall. Shops that service SUVs, vans, and light-duty trucks should consider a 14 ft wide x 27 ft deep x 10 ft tall booth. Shops that service full-size trucks, RVs, and commercial vehicles need a 16–18 ft wide x 40+ ft deep booth. PFS manufactures all of these sizes and custom configurations." },
            { q: "What is the difference between a downdraft and a semi-downdraft collision repair booth?", a: "A full-downdraft booth supplies make-up air from the ceiling and exhausts through the floor, providing the most uniform airflow and the cleanest finish quality. A semi-downdraft booth supplies air from the front ceiling and exhausts through the rear lower walls — a cost-effective alternative for shops with limited floor space or existing concrete slabs that cannot be cut for floor exhaust plenums." },
            { q: "Does a collision repair spray booth need to be ETL listed?", a: "ETL listing (by Intertek) is a third-party certification that the booth meets applicable safety standards. PFS paint booths and mixing rooms are ETL listed. All PFS booths are built with ETL/UL listed and certified components and comply with NFPA 33 and OSHA 1910.94 requirements. ETL listing is required by many insurance carriers, fire marshals, and building departments for collision repair facilities." },
            { q: "What is the best spray booth for a high-volume collision repair shop?", a: "High-volume collision repair shops benefit from a heated full-downdraft booth with a direct-fired or indirect-fired make-up air unit, a prep station for sanding and priming, and a mixing room for paint storage and mixing. PFS manufactures all of these systems and can design a complete finishing room package for your shop." },
            { q: "How long does it take to install a collision repair spray booth?", a: "A standard collision repair spray booth installation typically takes 3–5 days for a single booth with a make-up air unit. Larger systems with prep stations, mixing rooms, and custom electrical work may take 1–2 weeks. PFS provides complete installation services and coordinates with your general contractor and electrical contractor to minimize downtime." },
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

      {/* ── RELATED PRODUCTS ── */}
      <SiteProductCardSection
        heading="You May Also Need"
        label="Complete Your System"
        cards={PRODUCTS}
      />

    </div>
  );
}
