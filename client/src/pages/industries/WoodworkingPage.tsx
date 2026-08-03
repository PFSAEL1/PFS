/**
 * Woodworking — Dedicated Industry Page
 * Hero: MP4 video (PFS open-face booth, cinematic push-in)
 * Featured: Clean PFS open-face booth photo (pfs-woodworking-booth-clean)
 * Gallery: Clean booth photo + additional booth views
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── CDN ASSETS ────────────────────────────────────────────────────────────────
const HERO_VIDEO   = "/manus-storage/pfs-woodworking-hero-v2_d530519c.mp4";
const HERO_IMG     = "/manus-storage/pfs-woodworking-booth-orange-rack_3920ba0e.jpg"; // poster fallback — orange rack booth
const FEATURED_IMG = "/manus-storage/pfs-woodworking-booth-clean_26912a5d.jpg"; // featured project photo

// Gallery — clean booth photo + real customer installation photos
const GALLERY = [
  { src: "/manus-storage/pfs-woodworking-real-1_f1df1f96.png",                 alt: "PFS open-face spray booth installed at woodworking facility" },
  { src: "/manus-storage/pfs-woodworking-real-3_75810668.jpg",                 alt: "PFS spray booth interior — wood finishing shop" },
  { src: "/manus-storage/pfs-woodworking-real-3_75810668.jpg",                 alt: "PFS spray booth side view — cabinet and furniture shop" },
  { src: "/manus-storage/pfs-woodworking-real-4_d3b9ccc7.jpg",                 alt: "PFS open-face booth installation — woodworking facility" },
  { src: "/manus-storage/pfs-woodworking-real-5_8fb37936.jpg",                 alt: "PFS spray booth — wood finishing and cabinetry application" },
  { src: "/manus-storage/pfs-woodworking-real-6_2d06d7b7.jpg",                 alt: "PFS finishing booth — furniture and millwork shop" },
  { src: "/manus-storage/pfs-woodworking-booth-clean_26912a5d.jpg",            alt: "PFS open-face spray booth for woodworking and wood finishing" },
];

// Cert logos
const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
const CERTS = [
  { type: "logo", img: ETL_LOGO,  title: "ETL & ETL-C Listed",       sub: "Intertek — USA & Canada",             imgH: 44 },
  { type: "logo", img: UL_LOGO,   title: "UL 508A Certified",         sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { type: "logo", img: NFPA_LOGO, title: "NFPA 33 Compliant",         sub: "Spray Application Standard",          imgH: 44 },
  { type: "logo", img: EPA_LOGO,  title: "EPA Compliant",             sub: "Air Quality Standards",               imgH: 36 },
  { type: "logo", img: OSHA_LOGO, title: "OSHA Compliant",            sub: "Workplace Safety Standards",          imgH: 36 },
  { type: "flag", img: USA_FLAG,  title: "Made in the USA",           sub: "Santa Rosa, CA",                      imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

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
              {cert.type === "flag" ? (
                <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "cover", borderRadius: "2px", flexShrink: 0, aspectRatio: "3/2" }} />
              ) : (
                <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              )}
              <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.1rem" }}>
                <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{cert.title}</span>
                <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", color: "#666", whiteSpace: "nowrap" }}>{cert.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}>
      <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <X size={20} />
      </button>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} style={{ width: "100vw", height: "100vh", objectFit: "contain", display: "block" }} />
    </div>
  );
}

function ZoomableImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)} style={{ position: "relative", cursor: "zoom-in", overflow: "hidden" }} className="group">
        <img src={src} alt={alt} style={style} />
        <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.55)", borderRadius: "4px", padding: "0.35rem 0.5rem", display: "flex", alignItems: "center", gap: "0.3rem", color: "#fff", fontSize: "0.72rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", pointerEvents: "none" }}>
          <ZoomIn size={13} /> ZOOM
        </div>
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}




// ── FEATURES / SPECS ─────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  { num: "01", title: "Open-Face Design for Wood Finishing", body: "PFS open-face booths provide unrestricted access for spraying lacquers, stains, sealers, and varnishes on furniture, cabinetry, and millwork. The open front eliminates door interference on large or oddly shaped pieces." },
  { num: "02", title: "High-Velocity Cross-Flow Airflow", body: "Engineered cross-flow ventilation draws overspray away from the operator and workpiece at controlled face velocity. Consistent airflow prevents lacquer and stain buildup on surfaces — critical for flawless wood finishes." },
  { num: "03", title: "NFPA 33 & EPA Compliant", body: "Every PFS woodworking booth meets NFPA 33 spray finishing standards and EPA air quality requirements. built with ETL/UL listed components for US and Canadian safety codes — your facility inspection passes the first time." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "Explosion-Proof Electrical — CID2", body: "Class I Division 2 wiring, CID2 fixtures, and UL 508A certified control panels throughout. All electrical meets NFPA 33 and NEC requirements for flammable lacquer and solvent environments." },
  { num: "05", title: "Dual-Stage Filtration System", body: "Intake tackifier filters capture ambient dust before it reaches your workpiece. Exhaust fiberglass filters trap overspray particulates before discharge — protecting air quality and meeting EPA standards." },
  { num: "06", title: "Heated Booth Options for Fast Cure", body: "Integrated direct-fired or electric heat systems accelerate cure times on water-based and solvent-based wood finishes. Heated booths reduce cycle times and increase throughput for high-volume cabinet and furniture shops." },
  { num: "07", title: "Nationwide Delivery & Installation", body: "PFS-certified technicians deliver, install, and commission woodworking finishing booths at cabinet shops, furniture manufacturers, and millwork facilities nationwide. Full service contracts and parts availability." },
  { num: "08", title: "Custom Sizing for Any Workpiece", body: "From small furniture pieces to full kitchen cabinet runs and architectural millwork, PFS engineers booths to your exact workpiece dimensions. Standard and custom widths, heights, and depths available." },
];
const BOOTH_LINEUP = [
  { name: "Open Face",     desc: "Unrestricted front access for furniture, cabinetry, and millwork." },
  { name: "Cross-Flow",    desc: "Horizontal airflow for consistent coverage on flat panel work." },
  { name: "Heated",        desc: "Direct-fired or electric heat for accelerated finish cure." },
  { name: "Drive-Through", desc: "Full drive-through for large architectural millwork pieces." },
  { name: "Custom",        desc: "Engineered-to-spec for unique cabinet shop requirements." },
];

const PRODUCTS = [
  { label: "Open Face Booths",      href: "/products/paint-booths",          img: "/manus-storage/pfs-woodworking-booth-clean_26912a5d.jpg",                                                                                                        desc: "Open-face spray booths sized for furniture, cabinetry, and millwork finishing." },
  { label: "Industrial Ovens",      href: "/products/ovens",                  img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",                           desc: "Batch cure ovens for water-based and solvent wood finish systems." },
  { label: "Custom Paint Booths",   href: "/products/paint-booths/custom",   img: "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg",                                 desc: "Engineered-to-order booths for high-volume cabinet and furniture shops." },
  { label: "Integration & Automation", href: "/integration-automation",      img: "/manus-storage/pfs-robotics-card_2aac132b.jpg",                                                                                                     desc: "Automated conveyor and transfer systems for wood finishing production lines." },
];

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function WoodworkingPage() {
  useSEO({
    title: "Woodworking Spray Booths | Wood Finishing Booths | PFS Industrial",
    description: "PFS woodworking spray booths provide a safe, ventilated environment for wood staining, lacquering, and finishing. NFPA 33 compliant, ETL/UL listed components, custom sizes available. Manufactured in Santa Rosa, CA.",
    canonical: "/industries/woodworking",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* ── FULL-BLEED HERO — Cinematic video background ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
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
            objectPosition: "center center",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)", pointerEvents: "none", zIndex: 1 }} />
        {/* Blue accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            WOODWORKING &amp; WOOD FINISHING
          </span>
          <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>
            Wood Finishing Booths<br />
            Built for Cabinet Shops<br />
            &amp; Furniture Makers
          </h1>
          <span style={{ display: "block", alignItems: "center", gap: "0.4rem", background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)", color: "#6fa3e0", borderRadius: "2px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem", marginBottom: "1.25rem", width: "fit-content" }}>
            OPEN-FACE &amp; CROSS-FLOW — NFPA 33 COMPLIANT
          </span>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px" }}>
            manufactured in the USA with ETL/UL listed components. Dual-stage filtration. Open-face and cross-flow booths engineered for lacquers, stains, sealers, and varnishes — built for cabinet shops, furniture manufacturers, and millwork facilities nationwide.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: "360px" }}>
            <Link href="/contact/request-a-quote">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer", width: "100%" }}>
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
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
                FEATURED PRODUCT
              </span>
              <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                PFS Open-Face Wood Finishing Booth
              </h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>
                OPEN FACE — ETL LISTED
              </span>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Bright LED lighting, dual-stage filtration, and high-velocity cross-flow airflow — engineered for flawless lacquer, stain, and sealer application on furniture, cabinetry, and architectural millwork.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", borderRadius: "2px" }}>
              <img src={FEATURED_IMG} alt="PFS open-face spray booth for wood finishing" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>
                  SEE ALL BOOTHS <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <TrustedBy label="Trusted By Industry Leaders" />

      {/* ── GALLERY ── */}
      <section style={{ padding: "0 0 4rem", background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem", paddingTop: "3.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
              INSTALLED PROJECTS
            </span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>
              PFS Wood Finishing Facilities
            </h2>
          </div>
          {/* First row — 2 large */}
          <div className="grid md:grid-cols-3 gap-4">
            {GALLERY.map((g) => (
              <ZoomableImage key={g.src} src={g.src} alt={g.alt} style={{ width: "100%", height: "320px", objectFit: "cover", background: "#f2f2f2", display: "block" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES / SPECS ── */}
      <section style={{ padding: "4rem 0", background: "#f5f5f5" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
              STANDARD SPECIFICATION
            </span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>
              Certified. Engineered. Delivered Complete.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {FEATURES_VISIBLE.map((f) => (
              <div key={f.title} style={{ background: "#fff", padding: "1.75rem", borderTop: `3px solid ${BLUE}`, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900, color: "rgba(27,58,107,0.12)", lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
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
                    <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 900, color: "rgba(27,58,107,0.12)", lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
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
              <div style={{ background: "#fff", padding: "2rem", marginBottom: "1.5rem", borderTop: "3px solid #111" }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", marginBottom: "1rem" }}>AVAILABLE CONFIGURATIONS</div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: "1.25rem" }}>Every Wood Shop is Different. We Engineer to Fit.</h3>
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
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={() => setFeaturesOpen(!featuresOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: "#111", border: "1.5px solid #111", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer" }}>
              {featuresOpen ? <><ChevronUp size={14} /> SHOW LESS</> : <><ChevronDown size={14} /> SEE ALL SPECIFICATIONS &amp; BOOTH TYPES</>}
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
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Tell us your workpiece dimensions.<br />We'll spec the booth.
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. manufactured in the USA with ETL/UL listed components. Installed at cabinet shops, furniture manufacturers, and millwork facilities by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
                  GET PRICING <ArrowRight size={16} />
                </span>
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

            {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="You May Also Need"
        label="Complete Your System"
        cards={PRODUCTS}
      />
    </div>
  );
}
