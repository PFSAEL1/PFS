/*
 * Government & Military — Enriched Industry Page
 * Hero: JavaScript multi-image Ken Burns slideshow (no video needed)
 *   - Cycles through 3 hero images with crossfade + pan/zoom via requestAnimationFrame
 * Featured booth: Humvee (IMG_0729) inside large white PFS booth
 * Gallery: 6 real PFS photos
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── CDN IMAGES ────────────────────────────────────────────────────────────────
const HERO_VIDEO   = "/manus-storage/pfs-military-hero-video_55488949.mp4";
const HERO_IMG     = "/manus-storage/pfs-military-humvee-booth-clean_ef5c4409.jpeg"; // poster fallback

// Featured product image — clean Humvee JPEG (no phone UI chrome)
const FEATURED_IMG = "/manus-storage/pfs-military-humvee-booth-clean_ef5c4409.jpeg";

// Gallery — 6 military-specific photos (jet turbine removed — aerospace product, not military)
const GALLERY: GalleryImage[] = [
  { src: "/manus-storage/pfs-military-humvee-booth-clean_15890e0d.png",          alt: "Military HMMWV inside PFS paint booth" },
  { src: "/manus-storage/pfs-helios-military-booth_f3b03d46.png",               alt: "PFS Helios Series booth with armored military vehicle" },
  { src: "/manus-storage/pfs-military-stryker-outdoor-base_9293cfd5.png",       alt: "PFS booth with Stryker armored vehicle at military base" },
  { src: "/manus-storage/pfs-military-booth-exterior-warehouse_0980594a.jpeg",  alt: "PFS booth exterior in warehouse" },
  { src: "/manus-storage/pfs-military-booth-interior-ceiling_e9371cbf.jpeg",    alt: "Interior ceiling of large PFS military paint booth" },
  { src: "/manus-storage/pfs-military-booth-fire-suppression_ac66ffc7.jpeg",    alt: "PFS booth with red fire suppression tanks in warehouse" },
];

// Cert logos
const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";
// (Ken Burns slideshow replaced with video hero)

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




// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  { num: "01", title: "MIL-SPEC & Government Compliance", body: "PFS booths are engineered to meet MIL-SPEC coating requirements, federal procurement standards, and OSHA/EPA regulations. Every unit ships with full documentation packages for government facility audits." },
  { num: "02", title: "Heavy Equipment Clear-Span Design", body: "Drive-through and pit configurations accommodate HMMWVs, MRAPs, tactical vehicles, and large military equipment. Clear-span structural steel frames — no interior columns — with drive-through door heights up to 20 ft." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "CID2 Electrical Upgrade Available", body: "Class I Division 2 (CID2) wiring, fixtures, and controls are available as an optional upgrade for facilities requiring explosion-rated electrical. UL 508A certified control panels standard on all units. All electrical meets NFPA 33 and NEC requirements." },
  { num: "05", title: "Security & Access Control Options", body: "Booths can optionally be configured with security-grade access control, badge readers, and CCTV integration points for secure government and military facility requirements. Contact PFS to discuss your facility's specific needs." },
  { num: "06", title: "Nationwide Installation & Service", body: "PFS-certified technicians install and commission booths at federal facilities, military bases, and government depots nationwide. Full service contracts, parts availability, and emergency response." },
];
const BOOTH_LINEUP = [
  { name: "Drive-Through", desc: "Full drive-through configuration for tactical vehicles and large equipment." },
  { name: "Pit Style", desc: "Below-grade pit for underbody access on military vehicles and heavy equipment." },
  { name: "Downdraft", desc: "Ceiling-to-floor airflow for maximum overspray control and finish quality." },
  { name: "Semi-Downdraft", desc: "Rear exhaust configuration for facilities with limited below-grade access." },
  { name: "Custom", desc: "Engineered-to-spec for unique military and government facility requirements." },
];

const PRODUCTS = [
  { label: "Industrial Ovens", href: "/products/ovens", img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png", desc: "Batch and conveyor ovens for military vehicle primer cure and coating processes." },
  { label: "Blasting Systems", href: "/products/blast-systems", img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp", desc: "Blast rooms and cabinets for military vehicle surface prep and paint stripping." },
  { label: "Powder Coating Systems", href: "/products/powder-booths", img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png", desc: "Powder coating booths for government equipment, components, and infrastructure." },
  { label: "Process-Controlled Rooms", href: "/products/environmental-rooms/process-controlled", img: "/manus-storage/pfs-process-controlled-room-exterior_f4302d4b.jpg", desc: "Temperature and humidity-controlled environments for precision government finishing." },
];

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function GovernmentMilitaryPage() {
  useSEO({
    title: "Military & Government Paint Booths | Defense Finishing Systems | PFS",
    description: "PFS military and government spray booths are built to meet MIL-SPEC coating requirements, federal procurement standards, and OSHA/EPA regulations. Drive-through configurations for HMMWVs, MRAPs, and tactical vehicles. NFPA 33 compliant, ETL/UL listed components, CID2 explosion-proof electrical available. Full documentation packages for government facility audits. Manufactured in Santa Rosa, CA. Ships to federal facilities and military bases nationwide.",
    canonical: "/industries/government-military",
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
      {/* ── FULL-BLEED HERO — Video background ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
                <img
          src={HERO_IMG}
          alt="PFS government and military spray booth installation"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: videoReady ? 0 : 1, transition: "opacity 0.7s ease", zIndex: 0 }}
        />
        <video preload="auto" ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
         
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 , opacity: videoReady ? 1 : 0, transition: "opacity 0.7s ease" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)", pointerEvents: "none", zIndex: 1 }} />
        {/* Blue accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            GOVERNMENT &amp; MILITARY
          </span>
          <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>
            Military-Grade Paint Booths<br />
            for Government &amp; Defense<br />
            Applications
          </h1>
            <span style={{ display: "block", alignItems: "center", gap: "0.4rem", background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)", color: "#6fa3e0", borderRadius: "2px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem", marginBottom: "1.25rem", width: "fit-content" }}>
            PFS HELIOS SERIES
          </span>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px" }}>
            MIL-SPEC compliant with full documentation packages for government facility audits. Drive-through configurations for HMMWVs, MRAPs, and tactical vehicles. ETL/UL listed and UL 508A certified components. NFPA 33 compliant — installed at federal facilities and military bases nationwide.
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

      {/* ── FEATURED PAINT BOOTH — Humvee ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
                FEATURED PAINT BOOTH
              </span>
              <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                Military Vehicle Paint Booth
              </h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>
                PFS HELIOS SERIES
              </span>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Drive-through clear-span construction. Downdraft airflow. manufactured in the USA with ETL/UL listed components, built to your vehicle dimensions — from HMMWVs to MRAPs and tactical trucks.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", borderRadius: "2px" }}>
              <img src={FEATURED_IMG} alt="Military HMMWV inside large PFS paint booth" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths">
                <span className="btn-glow">
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
              PFS in the Field
            </h2>
          </div>
          <GalleryGrid images={GALLERY} cardHeight="clamp(220px,28vw,380px)" />
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
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: "1.25rem" }}>One Booth Type Won't Cover Every Vehicle.</h3>
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
      {/* ── SAM.GOV VENDOR PROFILE ─────────────────────────────────────────── */}
      <section style={{ background: "#f5f7fa", padding: "4rem 0", borderTop: "3px solid #1B3A6B" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: "0.5rem" }}>SAM.GOV REGISTERED VENDOR</span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#0d1b2e", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "0.75rem" }}>Federal Procurement Profile</h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#444", maxWidth: "560px", lineHeight: 1.7 }}>PFS is a registered federal contractor on SAM.gov. Our booths are procurable through standard government acquisition channels including GSA schedules, competitive bids, and sole-source justifications for NFPA 33 compliant spray finishing equipment.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", maxWidth: "960px", margin: "0 auto 2rem" }}>
            {[
              { label: "UEI", value: "MA3JX9LLV5D4", desc: "Unique Entity Identifier" },
              { label: "CAGE Code", value: "8DPB1", desc: "Commercial and Government Entity" },
              { label: "Primary NAICS", value: "332311", desc: "Prefabricated Metal Building & Component Manufacturing" },
              { label: "Certification", value: "ISO 9001", desc: "Quality Management System" },
            ].map(item => (
              <div key={item.label} style={{ background: "#fff", border: "1px solid #dce4ef", borderLeft: `4px solid ${BLUE}`, padding: "1.25rem 1.5rem" }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: BLUE, marginBottom: "0.35rem" }}>{item.label}</div>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#0d1b2e", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>{item.value}</div>
                <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "#666", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #dce4ef", padding: "1.25rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: BLUE, marginBottom: "0.75rem" }}>Secondary NAICS Codes</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["236210","236220","238390","321992","332322","332323","332439","332999","811310","812332"].map(code => (
                <span key={code} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, background: "#eff4ff", color: BLUE, border: "1px solid #c7d9f5", padding: "0.3rem 0.75rem", letterSpacing: "0.04em" }}>{code}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Tell us your vehicle dimensions.<br />We'll spec the booth.
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. manufactured in the USA with ETL/UL listed components. Installed at federal facilities and military bases by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote">
                <span className="btn-glow-white">
                  GET PRICING <ArrowRight size={16} />
                </span>
              </Link>
              <a href="tel:8885457715">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
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
