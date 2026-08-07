/*
 * Truck, Bus & Fleet — Industry Page (Template #1)
 * TEMPLATE #1: Full industrial page with TrustedBy logo strip
 * Structure mirrors AerospacePage exactly:
 *   Hero → Cert Carousel → Featured Product → TrustedBy → Gallery → Features → CTA Band → Related Products
 *
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * CTA: "Get Pricing" (Template #1 standard)
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";
import TrustedBy from "@/components/TrustedBy";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── IMAGES ────────────────────────────────────────────────────────────────────
const HERO_IMG     = "/manus-storage/pfs-school-bus-booth_179842ca_6651f8d4.png";
const HERO_VIDEO   = "/manus-storage/industry_truck_fleet_school_bus_hero_27f9918f.mp4";
const FEATURED_IMG = "/manus-storage/pfs-school-bus-booth_179842ca_6651f8d4.png";
const GALLERY_1    = "/manus-storage/pfs-school-bus-booth_179842ca_6651f8d4.png";
const GALLERY_2    = "/manus-storage/pfs-truck-fleet-coach-bus-rear_88083367.jpg";
const GALLERY_3    = "/manus-storage/pfs-truck-fleet-coach-bus-front_3a5f10aa.jpg";
const GALLERY_4    = "/manus-storage/pfs-truck-box-truck-booth_34276fb7_b502ec3d.png";

const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
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
    title: "Drive-Through Configuration",
    body: "Full drive-through booths with entry and exit doors on opposite ends. Designed for fleet operations where throughput is critical — trucks enter, get sprayed, and exit without reversing.",
  },
  {
    num: "03",
    title: "High-Clearance Construction",
    body: "Clear-span structural steel frames up to 50 ft wide and 20 ft tall. Designed to accommodate Class 6–8 trucks, buses, transit vehicles, and oversized fleet equipment.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Class I Division 2 (CID2) Lighting",
    body: "Inside-access, CID2 four-tube fixtures are standard. Uniform, shadow-free illumination at 100+ foot-candles for fleet color matching, DOT stripe work, and livery applications.",
  },
  {
    num: "05",
    title: "UL 508A Control Panels",
    body: "PFS Core Control Panels are UL 508A certified with spray, flash, and cure modes. Programmable cycle timers and safety interlocks for high-volume fleet refinishing operations.",
  },
  {
    num: "06",
    title: "NFPA 33 & OSHA Compliant",
    body: "Built to NFPA 33 spray application standards and OSHA workplace safety requirements. Fiberglass exhaust filters, tacky intake filters, and optional blanket intake upgrades for heated booths.",
  },
];

const BOOTH_LINEUP = [
  { name: "Drive-Through Crossflow",  desc: "Side-to-side airflow. Entry and exit doors. Ideal for high-volume fleet operations." },
  { name: "Semi-Downdraft",           desc: "Rear-angled exhaust. Versatile for mixed fleet types and transit vehicles." },
  { name: "Heated Drive-Through",     desc: "Integrated heat for accelerated cure. Required for fleet primer and topcoat." },
  { name: "Open Face Booth",          desc: "High-volume open-front finishing for fleet components and sub-assemblies." },
  { name: "Custom Fleet Build",       desc: "Engineered-to-order for transit authorities, DOT facilities, and large fleet operations." },
];

const PRODUCTS = [
  {
    label: "Industrial Ovens",
    href: "/products/ovens",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Batch and conveyor ovens for fleet primer cure and large-format component finishing.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Blast rooms for fleet surface prep, rust removal, and paint stripping.",
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png",
    desc: "Powder coating booths for fleet chassis, frames, and ground support equipment.",
  },
  {
    label: "Open Face Paint Booths",
    href: "/products/paint-booths/open-face",
    img: "/manus-storage/IMG_2132_c21b2839.jpg",
    desc: "High-volume open-front finishing for fleet components and sub-assemblies.",
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
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: 0 }}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "44px", height: "44px", borderRadius: "50%", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <X size={20} />
      </button>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} style={{ width: "100vw", height: "100vh", objectFit: "cover", display: "block" }} />
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
    <section style={{ background: "#ffffff", padding: "0", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: `3px solid #111`, boxShadow: "0 4px 0 0 #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
              {cert.type === "flag" ? (
                <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "cover", borderRadius: "2px", flexShrink: 0, aspectRatio: "3/2" }} />
              ) : (
                <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0, filter: cert.filter }} />
              )}
              <div style={{ display: "inline-flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.2 }}>{cert.title}</span>
                <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", color: "#888", lineHeight: 1.4 }}>{cert.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ position: "relative", height: "clamp(420px, 60vh, 680px)", overflow: "hidden", background: "#0a0a0a" }}>
      <video preload="auto" autoPlay muted loop playsInline
          disablePictureInPicture style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      {/* Minimal bottom vignette only — no color tint */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 3.5rem" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link href="/industries"><span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Industries</span></Link>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>/</span>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Truck, Bus & Fleet</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "1rem" }}>
            PFS INDUSTRIAL SERIES
          </div>
          <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "1.25rem", textTransform: "uppercase" }}>
            Truck, Bus<br />&amp; Fleet Finishing
          </h1>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.85)", maxWidth: "520px", lineHeight: 1.65, marginBottom: "2rem" }}>
            Drive-through configurations for Class 6–8 trucks, transit buses, and school buses. ETL/UL listed and UL 508A certified components. NFPA 33 compliant. Custom heights to 18+ ft. Built for fleet refinishing, transit authorities, and commercial vehicle manufacturers — installed nationwide.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
              <span className="btn-glow-white">
                GET PRICING <ArrowRight size={15} />
              </span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>
                (888) 545-7715
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function TruckBusFleetPage() {
  useSEO({
    title: "Truck & Bus Paint Booths | Fleet Refinishing Spray Booths | PFS",
    description: "PFS Helios Series truck and bus spray booths are engineered for fleet refinishing, transit authorities, and commercial vehicle manufacturers. Drive-through configurations for Class 6–8 trucks, transit buses, and school buses. NFPA 33 compliant, ETL/UL listed components, UL 508A certified controls. Custom heights to 18+ ft. Manufactured in Santa Rosa, CA. Ships nationally.",
    canonical: "/industries/truck-bus-fleet",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <div>
      {/* ── HERO ── */}
      <HeroSection />

            {/* ── CERT CAROUSEL (untouched — Template #1 standard) ── */}
      <CertCarousel />

      {/* ── FEATURED PAINT BOOTH ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
                FEATURED PAINT BOOTH
              </span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                Fleet &amp; Commercial Vehicle Paint Booth
              </h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>
                PFS HELIOS SERIES
              </span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Tall clear-span construction for school buses, coach buses, and semi-trucks. manufactured in the USA with ETL/UL listed components, built to your fleet dimensions.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Helios Series — Fleet and Commercial Vehicle Paint Booth with school bus"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths/enclosed" data-animation="slideRight">
                <span className="btn-glow">
                  SEE ALL BOOTHS <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY (Template #1 — REQUIRED) ── */}
      <TrustedBy label="Trusted By Industry Leaders" />

      {/* ── GALLERY PHOTOS (zoomable) ── */}
      <section style={{ padding: "0 0 4rem", background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>
              Built for Fleets. Proven in the Field.
            </h2>
          </div>
          <GalleryGrid
            images={[
              { src: GALLERY_1, alt: "PFS school bus inside fleet paint booth" },
              { src: GALLERY_2, alt: "Coach bus rear — masked and ready for paint inside PFS booth" },
              { src: GALLERY_3, alt: "Coach bus front — masked and ready for paint inside PFS booth" },
              { src: GALLERY_4, alt: "Box truck masked and prepped for paint inside PFS white booth" },
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
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
              STANDARD SPECIFICATION
            </span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>
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
                  One Booth Type Won't Cover Every Fleet.
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
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", border: `1px solid ${BLUE}`, color: BLUE, fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer" }}
            >
              {featuresOpen ? <><ChevronUp size={14} /> SHOW LESS</> : <><ChevronDown size={14} /> SEE ALL SPECIFICATIONS &amp; BOOTH TYPES</>}
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
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
              Tell us your fleet dimensions.<br />We'll spec the booth.
            </h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", maxWidth: "440px" }}>
              Quote in 24 hours. manufactured in the USA with ETL/UL listed components. Installed nationwide by PFS-certified technicians.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
                <span className="btn-glow-white">
                  GET PRICING <ArrowRight size={16} />
                </span>
              </Link>
              <a href="tel:8885457715" data-animation="slideRight">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
                  (888) 545-7715
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED PRODUCTS ── */}

      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Truck, Bus & Fleet Spray Booths — Common Questions</h2>
          </div>
          {[
            { q: "What size spray booth is needed for painting semi-trucks?", a: "A full-size semi-truck (Class 8) requires a spray booth that is at least 16 ft wide x 50 ft deep x 14 ft tall to accommodate the cab and trailer. Shops that paint both cab and trailer together need a booth 16–18 ft wide x 60–80 ft deep. PFS manufactures truck and fleet booths in all standard and custom sizes." },
            { q: "Can a spray booth be used for painting buses and transit vehicles?", a: "Yes. PFS manufactures spray booths specifically sized for transit buses, school buses, motor coaches, and articulated buses. These booths typically range from 14–16 ft wide x 40–60 ft deep x 12–14 ft tall. PFS has supplied finishing systems to major transit agencies and bus manufacturers across North America." },
            { q: "What airflow pattern is best for truck and fleet spray booths?", a: "Full-downdraft airflow is the preferred configuration for truck and fleet spray booths. Downdraft airflow moves air from ceiling to floor, carrying overspray and solvent vapors away from the vehicle surface and the painter. For very large vehicles where ceiling plenum installation is impractical, a semi-downdraft or side-draft configuration may be used." },
            { q: "Does a truck spray booth need a heated make-up air unit?", a: "A heated make-up air unit is strongly recommended for truck and fleet spray booths in any climate where temperatures fall below 65°F. Heated make-up air maintains consistent booth temperature for spray and bake cycles, accelerates paint cure, and ensures year-round production capability. PFS manufactures heated AMUs sized for booths of all sizes." },
            { q: "Can PFS build a drive-through spray booth for fleet operations?", a: "Yes. PFS manufactures drive-through spray booths with doors at both ends for efficient vehicle flow in high-volume fleet painting operations. Drive-through booths eliminate the need to back vehicles in and out, reducing cycle time and improving throughput. Contact a PFS engineer for drive-through booth specifications." },
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

      <SiteProductCardSection
        heading="You May Also Need"
        label="Complete Your System"
        cards={PRODUCTS}
      />
    </div>
  );
}
