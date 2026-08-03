/*
 * Marine & Watercraft — Industry Page
 * Mirrors AerospacePage structure exactly:
 * - Full-bleed hero with real PFS marine photo (speedboat masked in booth)
 * - Auto-scrolling cert carousel (ETL, UL 508A, NFPA, EPA, OSHA, USA flag)
 * - Featured product section (PFS Orion Series — Marine Cross-Flow)
 * - TrustedBy client logo strip
 * - Real gallery photos (user-supplied — placeholders until photos provided)
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
// HERO_VIDEO   : cinematic push-in video of PFS Helios with sailboat (autoplay loop, no audio)
// HERO_IMG     : speedboat masked and prepped inside PFS booth (fallback poster for hero video)
// FEATURED_IMG : PFS Helios with sailboat — doors open
// GALLERY_1/2  : placeholders until user supplies gallery photos
const HERO_VIDEO   = "/manus-storage/marine_helios_booth_video_73a8ffa6.mp4";
const HERO_IMG     = "/manus-storage/marine_hero_boat_in_booth_cfbd5064.jpg";
const FEATURED_IMG = "/manus-storage/marine_helios_sailboat_card_6d98788d.jpg"; // PFS Helios with sailboat — doors open
const GALLERY_1    = "/manus-storage/marine_helios_sailboat_card_6d98788d.jpg"; // PFS Helios — sailboat (doors open)
const GALLERY_3    = "/manus-storage/marine_zenith_sportboat_87a339d9.jpg";     // PFS Zenith — sport boat
const GALLERY_4    = "/manus-storage/marine_helios_centerconsole_0ad4a213.jpg"; // PFS Helios — center-console hull

const ETL_LOGO     = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO      = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO    = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO     = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO    = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG     = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

// Brand blue
const BLUE = "#1B3A6B";

// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
const CERTS = [
  { type: "logo", img: ETL_LOGO,  title: "ETL & ETL-C Listed",      sub: "Intertek — USA & Canada",              imgH: 44 },
  { type: "logo", img: UL_LOGO,   title: "UL 508A Certified",        sub: "Industrial Control Panel Fabricator",  imgH: 44 },
  { type: "logo", img: NFPA_LOGO, title: "NFPA 33 Compliant",        sub: "Spray Application Standard",           imgH: 44 },
  { type: "logo", img: EPA_LOGO,  title: "EPA Compliant",            sub: "Air Quality Standards",                imgH: 36 },
  { type: "logo", img: OSHA_LOGO, title: "OSHA Compliant",           sub: "Workplace Safety Standards",           imgH: 36 },
  { type: "flag", img: USA_FLAG,  title: "Made in the USA",          sub: "Santa Rosa, CA",                       imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "02",
    title: "Marine-Grade Airflow Control",
    body: "Cross-flow and downdraft airflow configurations available. Consistent face velocity keeps overspray moving away from the hull at all times — critical for gelcoat, antifouling, and topside finish applications on fiberglass and aluminum hulls.",
  },
  {
    num: "03",
    title: "Wide-Span Construction for Full Hulls",
    body: "Clear-span structural steel frames sized for center consoles, sport boats, cabin cruisers, and commercial vessels. No interior columns. Full beam-to-beam access for hull prep, spray, and inspection.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Class I Division 2 (CID2) Lighting",
    body: "Inside-access, CID2 four-tube fixtures are standard. Uniform, shadow-free illumination at 100+ foot-candles — essential for marine finish inspection, color matching, and gelcoat defect detection.",
  },
  {
    num: "05",
    title: "Fiberglass & Tacky Filtration",
    body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated configurations. Filter systems are sized for the booth's CFM and marine coating VOC loads.",
  },
  {
    num: "06",
    title: "PFS Core Control Panel — UL 508A",
    body: "UL 508A certified control panels with spray, flash, and cure modes. Programmable cycle timers, temperature monitoring, and safety interlocks. Custom BMS integration available for multi-booth marine facilities.",
  },
  {
    num: "07",
    title: "Heated Option — Accelerated Cure",
    body: "Direct-fired or indirect-fired heat systems available. Spray, flash, and bake modes up to 180°F. Required for marine primer cure and two-part polyurethane topcoat applications in colder climates.",
  },
  {
    num: "08",
    title: "Corrosion-Resistant Construction",
    body: "18-gauge galvanized steel panels throughout. All fasteners and hardware selected for marine environments. Booth interiors are white-coated for maximum light reflectivity and easy cleaning after gelcoat and antifouling spray cycles.",
  },
  {
    num: "09",
    title: "We Ship Nationally",
    body: "PFS marine booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation. Coastal and inland marine facilities served.",
  },
];

const BOOTH_LINEUP = [
  { name: "Cross-Flow",     desc: "Side-to-side airflow. Cost-effective for center consoles and sport boats." },
  { name: "Semi-Downdraft", desc: "Rear-angled exhaust. Versatile for mixed hull sizes and production schedules." },
  { name: "Full Downdraft", desc: "Ceiling-to-floor airflow. Maximum cleanliness for gelcoat and premium topcoat." },
  { name: "Heated Booth",   desc: "Integrated heat for accelerated cure of marine primers and two-part topcoats." },
  { name: "Custom Build",   desc: "Engineered-to-order for wide-body vessels, commercial hulls, or multi-bay facilities." },
];

const PRODUCTS = [
  {
    label: "Enclosed Paint Booths",
    href: "/products/paint-booths/enclosed",
    img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg",
    desc: "Cross-flow, semi-downdraft, and full downdraft configurations for marine vessel finishing.",
  },
  {
    label: "Heated Paint Booths",
    href: "/products/paint-booths/heated",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Spray, flash, and bake cycles for marine primer and two-part polyurethane topcoat.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Blast rooms for hull surface prep, paint stripping, and antifouling removal.",
  },
  {
    label: "Open Face Paint Booths",
    href: "/products/paint-booths/open-face",
    img: "/manus-storage/openface-exterior-pfs-logo_dc802808.png",
    desc: "High-volume open-front finishing for marine components, outdrives, and sub-assemblies.",
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
export default function MarinePage() {
  useSEO({
    title: "Marine Paint Booths | Boat & Vessel Finishing Systems | PFS",
    description: "PFS Orion Series marine spray booths are custom-engineered for boat builders, shipyards, and marine MRO facilities. Wide-span clear-span construction for full hull and deck access. Cross-flow and downdraft airflow, NFPA 33 compliant, ETL/UL listed components, UL 508A certified controls. Engineered for gelcoat, antifouling, and marine topcoat applications. Manufactured in Santa Rosa, CA. Ships nationally.",
    canonical: "/industries/marine",
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
      }}>
                <video preload="auto"
          src={HERO_VIDEO}
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
          }}
        />
        {/* Dark gradient — lighter at top so text is readable over the bright booth interior */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0.05) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>
            MARINE &amp; WATERCRAFT
          </span>
          <h1 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Marine Paint Booths<br />
            for Boats, Yachts &amp;<br />
            Commercial Vessels
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
            PFS ORION · HELIOS · ZENITH SERIES
          </span>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            Wide-span clear-span construction for full hull and deck access. ETL/UL listed and UL 508A certified components. NFPA 33 compliant. Engineered for gelcoat, antifouling, and marine topcoat applications — installed nationwide.
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
              <h2 style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800,
                color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem",
              }}>
                Marine Cross-Flow Paint Booth
              </h2>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: BLUE, color: "#fff",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800,
                letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "0.28rem 0.85rem", marginBottom: "0.75rem",
              }}>
                PFS ORION SERIES
              </span>
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555",
                maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
              }}>
                Wide-span clear-span construction. Cross-flow airflow for full hull access. manufactured in the USA with ETL/UL listed components and sized to your vessel dimensions.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Orion Series — Marine Cross-Flow Paint Booth with speedboat"
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
              Built for Marine. Proven in the Field.
            </h2>
          </div>
          <GalleryGrid
            images={[
              { src: GALLERY_1, alt: "PFS Helios — sailboat hull inside marine paint booth, doors open" },
              { src: GALLERY_3, alt: "PFS Zenith — sport boat hull inside marine paint booth" },
              { src: GALLERY_4, alt: "PFS Helios — center-console hull inside marine paint booth" },
            ]}
            cardHeight="clamp(220px,30vw,360px)"
          />
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
                  One Booth Type Won't Cover Every Vessel.
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
              Tell us your vessel dimensions.<br />We'll spec the booth.
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
