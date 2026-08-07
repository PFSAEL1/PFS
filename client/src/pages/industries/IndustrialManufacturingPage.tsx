/*
 * Industrial Manufacturing — Enriched Page v5
 * - Auto-scrolling cert carousel (ETL, UL 508A, NFPA, EPA, OSHA, USA flag)
 * - Royal deep blue (#1B3A6B) replaces all red accents
 * - Removed "BUILT AT SCALE" eyebrow
 * - Warehouse photos zoomable (lightbox on click)
 * - Related product cards glow on hover/click
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HELIOS_IMG   = "/manus-storage/pfs-helios-hires_f9ec5ac5.png";
const HERO_VIDEO   = "/manus-storage/industry_industrial_warehouse_hero_4adf22bf.mp4";
const IND_VESSEL   = "/manus-storage/pfs-industrial-pressure-vessel-booth-clean_e4cae0c0.png";
const IND_HEATER   = "/manus-storage/pfs-industrial-booth-interior-heater_b5796629.jpg";
const IND_DOORS    = "/manus-storage/pfs-industrial-booth-interior-doors_f14cca64.jpg";
const IND_ORION    = "/manus-storage/pfs-industrial-orion-warehouse-install_446d41ad.jpg";
// New real install photos
const IND_HELIOS   = "/manus-storage/IMG_9162_88a470ad.jpg";         // PFS Helios booth in warehouse
const IND_TUNNEL   = "/manus-storage/26141107690113360_4146768a.jpg"; // Booth interior tunnel with scissor lift
const IND_9833A    = "/manus-storage/IMG_98332_81472aca.jpg";         // Booth interior wide
const IND_9833B    = "/manus-storage/IMG_98331_84827069.jpg";         // Booth interior tall
const IND_9733     = "/manus-storage/IMG_9733_d8b7388e.jpg";          // Additional install photo
const IND_EXT_DOOR = "/manus-storage/industrial-paint-booth-exterior-door_0cf53c8c.webp"; // White exterior with Paint Booth sign
const IND_SCISSOR  = "/manus-storage/industrial-large-booth-scissorlift_53b75825.webp";  // Large multi-bay install with scissor lift
const IND_FSWALL   = "/manus-storage/industrial-booth-fire-suppression-wall_4282aa3f.webp"; // Exhaust wall with 5 fire suppressors
const IND_GALV     = "/manus-storage/industrial-pfs-galvanized-exterior-doors_6c7c0e6a.jpg"; // PFS galvanized exterior with green filter doors
const IND_RAWINT   = "/manus-storage/industrial-booth-interior-lights_2ea1d67d.jpg";       // Raw galvanized interior tunnel
const IND_9833C    = "/manus-storage/industrial-IMG_9833_4_5bad652f.jpg";                  // Bright white booth interior — large bay
const IND_FACTORY  = "/manus-storage/industrial-IMG_3502_fa36ad49.jpg";                   // Booth assembly in factory
const IND_TWIN     = "/manus-storage/industrial-IMG_3732_4a5f290e.jpg";                   // Two PFS booths side-by-side exterior
const IND_INTWIDE  = "/manus-storage/industrial-IMG_4717_316ca239.jpg";                   // Bright white booth interior full-length
const ETL_LOGO     = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO      = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO    = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO     = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO    = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG     = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

// Brand blue
const BLUE = "#1B3A6B";
const BLUE_LIGHT = "#2A5298";

// ── CERT CAROUSEL ITEMS ───────────────────────────────────────────────────────
const CERTS = [
  {
    type: "logo",
    img: ETL_LOGO,
    title: "ETL & ETL-C Listed",
    sub: "Intertek — USA & Canada",
    filter: "none",
    imgH: 44,
  },
  {
    type: "logo",
    img: UL_LOGO,
    title: "UL 508A Certified",
    sub: "Industrial Control Panel Fabricator",
    filter: "none",
    imgH: 44,
  },
  {
    type: "logo",
    img: NFPA_LOGO,
    title: "NFPA 33 Compliant",
    sub: "Spray Application Standard",
    filter: "none",
    imgH: 44,
  },
  {
    type: "logo",
    img: EPA_LOGO,
    title: "EPA Compliant",
    sub: "Air Quality Standards",
    filter: "none",
    imgH: 36,
  },
  {
    type: "logo",
    img: OSHA_LOGO,
    title: "OSHA Compliant",
    sub: "Workplace Safety Standards",
    filter: "none",
    imgH: 36,
  },
  {
    type: "flag",
    img: USA_FLAG,
    title: "Made in the USA",
    sub: "Santa Rosa, CA",
    filter: "none",
    imgH: 36,
  },
];

// Duplicate for seamless loop
const CERTS_LOOP = [...CERTS, ...CERTS];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "02",
    title: "Industrial Service Lighting",
    body: "Inside-access, Class I Division 2 (CID2) four-tube fixtures are standard. Fluorescent or LED tube compatible — optional LED upgrade available. manufactured in the USA with ETL/UL listed components. Uniform, shadow-free illumination.",
  },
  {
    num: "03",
    title: "UL-Listed Tube Axial Fans",
    body: "Non-sparking tube-axial exhaust fans with belt guards and duct connector rings. UL/CUL and CSA recognized — three-phase, TEFC, tri-voltage — rated for continuous industrial duty.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Galvanized or Powder Coated Steel",
    body: "18-gauge G90 galvanized sheet steel is standard. Powder coat finish available for environments requiring additional corrosion resistance. Structural steel columns and beams support horizontal panel assembly.",
  },
  {
    num: "05",
    title: "Exhaust & Intake Filtration",
    body: "Fiberglass exhaust filters are standard. Intake uses tacky-type media — blanket intake upgrades available for heated booth configurations. Filtration matched to your process and NFPA 33 compliant.",
  },
  {
    num: "06",
    title: "PFS Core Control Panel",
    body: "Non-pressurized booths ship with an electromechanical panel controlling exhaust, safety interlocks, and lighting. Pressurized configurations include spray, flash, and cure modes with programmable alarms.",
  },
];

const BOOTH_LINEUP = [
  { name: "Crossflow",       desc: "Side-to-side airflow. Cost-effective for large open-floor operations." },
  { name: "Side Downdraft",  desc: "Ceiling intake, side exhaust. Ideal for wide-format equipment." },
  { name: "Downdraft",       desc: "Full ceiling-to-floor airflow. Maximum overspray capture." },
  { name: "Semi-Downdraft",  desc: "Rear-angled exhaust. Versatile for mixed production environments." },
  { name: "Heated Booth",    desc: "Integrated heat for accelerated cure cycles. Pairs with PFS control panel." },
];

const PRODUCTS = [
  {
    label: "Open Face Paint Booths",
    href: "/products/paint-booths/open-face",
    img: "/manus-storage/IMG_2132_c21b2839.jpg",
    desc: "High-volume open-front finishing for large parts and production lines.",
  },
  {
    label: "Batch Ovens",
    href: "/products/ovens/batch",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Industrial batch curing ovens for powder coat and liquid paint.",
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png",
    desc: "Complete powder coating booths with recovery and filtration systems.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Blast rooms and cabinets for surface prep before finishing.",
  },
];

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1.5rem", right: "1.5rem",
          background: "rgba(255,255,255,0.1)", border: "none",
          color: "#fff", width: "44px", height: "44px",
          borderRadius: "50%", cursor: "pointer",
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
          maxWidth: "92vw", maxHeight: "88vh",
          objectFit: "contain",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
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
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0)",
          transition: "background 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
          className="zoom-overlay"
        />
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
  const SPEED = 0.5; // px per frame

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2; // half because we duplicated

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
        {/* fade edges */}
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
                    filter: cert.filter,
                    flexShrink: 0,
                    maxWidth: "80px",
                  }}
                />
              )}
              <div style={{ lineHeight: 1 }}>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.75rem", fontWeight: 700,
                  color: "#111827", letterSpacing: "0.07em",
                  textTransform: "uppercase", marginBottom: "0.2rem",
                }}>
                  {cert.title}
                </div>
                <div style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.62rem", color: "rgba(0,0,0,0.45)",
                  letterSpacing: "0.02em",
                }}>
                  {cert.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function IndustrialManufacturingPage() {
  useSEO({
    title: "Industrial Manufacturing Paint Booths | Production Finishing Systems | PFS",
    description: "PFS industrial manufacturing finishing systems include spray booths, ovens, powder coating systems, and blast rooms for production environments. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/industries/industrial-manufacturing",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);

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
        background: "#0a0a0a",
      }}>
        <video preload="auto"
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
            objectPosition: "40% center",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.60) 40%, rgba(5,5,5,0.20) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>
            INDUSTRIAL MANUFACTURING
          </span>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Industrial Paint Booths<br />
            for Large Equipment<br />
            &amp; Heavy Machinery
          </h1>
          {/* Series badge — function first, brand name as supporting detail */}
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
            manufactured in the USA with ETL/UL listed and UL 508A certified components. Manufactured in the USA.
            Custom-sized to your equipment — delivered and installed nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight" style={{ width: "100%", maxWidth: "320px" }}>
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

      {/* ── FEATURED PAINT BOOTH — Helios ── */}
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
                Industrial Side Downdraft
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
              <p data-animation="slideLeft" style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555",
                maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
              }}>
                Pre-engineered for large equipment. manufactured in the USA with ETL/UL listed components. Spec'd to your dimensions.
              </p>
            </div>
            <img
              src={HELIOS_IMG}
              alt="PFS Helios Industrial Side Downdraft Paint Booth"
              style={{
                width: "100%", maxWidth: "760px", height: "auto",
                objectFit: "contain", display: "block",
                filter: "none",
              }}
            />
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
          <div className="text-center mb-8">
            <span style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase",
              display: "block", marginBottom: "0.6rem",
            }}>GALLERY</span>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              color: "#111", letterSpacing: "-0.01em",
            }}>
              Built in the USA. Proven in the Field.
            </h2>
          </div>
          <GalleryGrid
            images={[
              { src: IND_HELIOS,   alt: "PFS Helios booth in industrial warehouse" },
              { src: IND_TUNNEL,   alt: "PFS booth interior — scissor lift during installation" },
              { src: IND_ORION,    alt: "PFS Orion series booths installed in industrial warehouse" },
              { src: IND_VESSEL,   alt: "Large pressure vessel inside PFS crossflow industrial spray booth" },
              { src: IND_HEATER,   alt: "PFS industrial booth interior — ceiling filters and heater unit" },
              { src: IND_DOORS,    alt: "PFS industrial booth interior — access doors and green intake filters" },
              { src: IND_9733,     alt: "PFS industrial spray booth real install" },
              { src: IND_9833A,    alt: "PFS booth interior — wide angle showing ceiling filter grid" },
              { src: IND_9833B,    alt: "PFS booth interior — tall angle showing ceiling plenum" },
              { src: IND_EXT_DOOR, alt: "PFS industrial paint booth — white exterior with personnel door and fire extinguishers" },
              { src: IND_SCISSOR,  alt: "PFS large industrial multi-bay booth installation with scissor lift" },
              { src: IND_FSWALL,   alt: "PFS industrial booth exhaust wall — five fire suppression cylinders mounted" },
              { src: IND_GALV,     alt: "PFS galvanized steel industrial booth — exterior with green exhaust filter doors" },
              { src: IND_RAWINT,   alt: "PFS industrial booth interior — raw galvanized walls with fiberglass filter end wall" },
              { src: IND_9833C,    alt: "PFS large industrial booth interior — bright white panels, ceiling lights" },
              { src: IND_FACTORY,  alt: "PFS industrial booth assembly in factory — top-down view with blue structural frame" },
              { src: IND_TWIN,     alt: "Two PFS booths installed side-by-side in shop" },
              { src: IND_INTWIDE,  alt: "PFS industrial booth interior — full-length view showing ceiling lights and access doors" },
            ]}
            cardHeight="280px"
          />
          <div className="text-center" style={{ marginTop: "2rem" }} data-animation="slideRight">
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
              <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}` }}>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900,
                  color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem",
                }}>{f.num}</div>
                <h3 style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem",
                  fontWeight: 700, color: "#111", marginBottom: "0.6rem",
                }}>{f.title}</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75 }}>{f.body}</p>
              </div>
            ))}
          </div>

          {featuresOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-5 mb-5">
                {FEATURES_HIDDEN.map((f) => (
                  <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}` }}>
                    <div style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900,
                      color: `rgba(27,58,107,0.12)`, lineHeight: 1, marginBottom: "0.5rem",
                    }}>{f.num}</div>
                    <h3 style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem",
                      fontWeight: 700, color: "#111", marginBottom: "0.6rem",
                    }}>{f.title}</h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.84rem", color: "#555", lineHeight: 1.75 }}>{f.body}</p>
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
                  More Than One Booth. Built for Every Operation.
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
              Tell us your equipment dimensions.<br />We'll spec the booth.
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


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Industrial Manufacturing Spray Booths — Common Questions</h2>
          </div>
          {[
            { q: "What types of industrial spray booths does PFS manufacture?", a: "PFS manufactures a full range of industrial spray booths including full-downdraft booths for large parts and assemblies, heated booths for accelerated cure cycles, powder coating booths, blast rooms, wash booths, and custom-engineered finishing systems for industrial manufacturing applications. All PFS booths are manufactured in Santa Rosa, California with ETL/UL listed and certified components." },
            { q: "What is the largest industrial spray booth PFS can build?", a: "PFS builds industrial spray booths to any size required by the application. Our largest systems include aircraft hangars, rail car finishing facilities, and heavy equipment booths exceeding 50 ft wide x 100 ft deep. Contact a PFS engineer with your largest workpiece dimensions and production requirements for a custom quote." },
            { q: "What finishing standards apply to industrial manufacturing spray booths?", a: "Industrial spray booths are subject to NFPA 33 (spray application of flammable/combustible materials), OSHA 1910.94 (ventilation), and applicable EPA air quality regulations. PFS industrial booths are engineered to meet all applicable federal and California Air Resources Board (CARB) requirements." },
            { q: "Can PFS design a complete industrial finishing line?", a: "Yes. PFS designs and manufactures complete industrial finishing lines including pre-treatment wash systems, blast rooms, spray booths, powder coating systems, curing ovens, and conveyor integration. Our engineering team coordinates the entire system design to ensure each stage of the finishing process is optimized for your production volume and coating requirements." },
            { q: "Does PFS provide service and maintenance for industrial spray booths?", a: "Yes. PFS provides preventive maintenance, emergency service, filter replacement, fan and motor service, control panel repair, and booth recertification for all PFS systems. Our service team is available nationwide. Contact PFS at (888) 545-7715 to schedule service." },
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
