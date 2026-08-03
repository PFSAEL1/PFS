/**
 * PrepStationsPage — PFS ORION PREP SERIES
 * Design: Industrial dark-on-white, Barlow Condensed headings, same structure as OpenFaceBoothPage
 * Sections: Hero (image), Gallery, Features, Sizes, Featured Products, Related Products
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronUp, ArrowRight, Phone } from "lucide-react";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── IMAGES ── */
const HERO_VIDEO = "/manus-storage/pfs-prep-station-hero_2554e281.mp4";

const GALLERY_IMGS = [
  // ── REAL INSTALL PHOTOS ──
  { src: "/manus-storage/prep-pfs-ceiling-bay_4951f2ee.png",        alt: "PFS Orion Prep — ceiling-mounted bay with blue curtains and built-in lighting, factory install",   pos: "center 40%" },
  { src: "/manus-storage/prep-multi-bay-bronze_254a9acf.webp",               alt: "PFS Orion Prep — multi-bay prep station with PFS Bronze Edition signage, PFS", pos: "center 50%" },
  { src: "/manus-storage/pfs-exhaust-wall-curtain-2133_325854c1.webp", alt: "PFS prep station — exterior view with blue curtain walls, exhaust stack, and PFS branding",          pos: "center 50%" },
  { src: "/manus-storage/prep-curtain-blue-close_04a96de3.webp",    alt: "PFS prep station — close-up of blue vinyl curtain panels with clear vision strip",                   pos: "center 50%" },
  { src: "/manus-storage/prep-curtain-blue-interior_b13d3bd7.png",  alt: "PFS prep station — interior view of blue curtain bay with exhaust filter wall and PFS branding",     pos: "center 50%" },
  { src: "/manus-storage/prep-curtain-red-car_4caad6b9.jpg",        alt: "PFS prep station — curtain bay with vehicle inside, red lower curtain and clear upper panels",       pos: "center 50%" },
  { src: "/manus-storage/prep-install-1998_a6cdee6e.jpg",           alt: "PFS prep station install — real field photo 1",  pos: "center 50%" },
  { src: "/manus-storage/prep-install-1997_8fa14562.jpg",           alt: "PFS prep station install — real field photo 2",  pos: "center 50%" },
  { src: "/manus-storage/prep-install-0301_065f1881.jpg",           alt: "PFS prep station install — real field photo 3",  pos: "center 50%" },
  { src: "/manus-storage/prep-install-0298_fef36a62.jpg",           alt: "PFS prep station install — real field photo 4",  pos: "center 50%" },
  { src: "/manus-storage/prep-install-8990_8ffd823f.jpg",           alt: "PFS prep station install — real field photo 5",  pos: "center 50%" },
  { src: "/manus-storage/IMG_8990_a26ad617.jpg",             alt: "PFS prep station — exhaust wall with filter media, real install photo",            pos: "center 50%" },
  // ── RENDERS ──
  { src: "/manus-storage/prep-featured-single_efec884d.png",        alt: "PFS Orion Prep — single-bay render, angled view, black curtains and green filter media",            pos: "center 50%" },
  { src: "/manus-storage/prep-featured-multi_cdce74a7.png",         alt: "PFS Orion Prep — three-bay multi-bay render, ceiling-mounted, black curtains",                      pos: "center 50%" },
  // ── NEW INSTALL PHOTOS ──
  { src: "/manus-storage/prep-station-front-shelves_6eb5db66.jpeg",   alt: "PFS prep station — front view showing exhaust wall with open storage shelves below, factory floor",  pos: "center 50%" },
  { src: "/manus-storage/prep-station-with-booth-wide_2c5f7c58.jpeg", alt: "PFS prep station and enclosed paint booth — wide install view showing full system layout",            pos: "center 40%" },
];

const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

/* ── CERTIFICATIONS ── */
const CERTS = [
  { img: ETL_LOGO,  title: "ETL & ETL-C Listed",    sub: "Intertek — USA & Canada",             imgH: 44 },
  { img: UL_LOGO,   title: "UL 508A Certified",      sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant",      sub: "Spray Application Standard",          imgH: 44 },
  { img: EPA_LOGO,  title: "EPA Compliant",           sub: "Air Quality Standards",               imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",          sub: "Workplace Safety Standards",          imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",         sub: "Santa Rosa, CA",                      imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

/* ── FEATURES ── */
const ALL_FEATURES = [
  { num: "01", title: "UL Listed Tube Axial Fan",             body: "Same high-efficiency, UL listed tube axial fan used in our enclosed paint booths. Moves air through the exhaust wall at consistent face velocity — pulling sanding dust, overspray, and contaminants away from the operator and work surface." },
  { num: "02", title: "CID2 Lighting — 4-Tube Fixtures",     body: "Class I Division 2 inside-access four-tube light fixtures — the same fixtures specified in our cross-flow and enclosed booths. Fluorescent or LED tube compatible. Uniform, shadow-free illumination across the full work area." },
  { num: "03", title: "UL 508A Control Panel",               body: "PFS Core Control Panel — UL 508A certified with spray and flash modes. Programmable cycle timers, safety interlocks, and optional BMS integration. Same panel platform as our enclosed spray booths." },
  { num: "04", title: "Heated Versions Available",            body: "Heated prep station configurations are available upon request. Integrated heat accelerates flash-off times, improves primer adhesion in cold climates, and keeps your prep area productive year-round — same heating options as our enclosed paint booths." },
  { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated configurations. All filter media is OEM-sourced and available for fast reorder." },
  { num: "06", title: "Full Enclosure Option",               body: "Available in open or fully enclosed configurations. The enclosed version provides complete containment — same panel construction and door hardware as our enclosed paint booths — keeping dust and contaminants isolated from adjacent spray areas." },
  { num: "07", title: "Galvanized or Powder Coated Steel",   body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit. Same panel system used across the PFS booth lineup." },
  { num: "08", title: "Curtain or Fully Enclosed Ceiling",   body: "Choose between a curtain-only configuration for maximum flexibility, or a fully enclosed ceiling panel system with optional built-in LED lighting. Multi-bay configurations available." },
  { num: "09", title: "Ships Nationally — Factory Direct",   body: "PFS prep stations ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation. Same manufacturing facility and quality control as our full spray booth lineup." },
];

/* ── SIZES ── */
// Prep stations: Width is fixed at 14', height at 9', depths vary
// Common sizes: 14'W x 9'H x 24'D, 21'D, 27'D, 30'D
const DEPTHS = ["24'", "27'", "30'", "Custom"];

/* ── RELATED PRODUCTS ── */
const PRODUCTS = [
  { label: "Air Make-Up Units",     href: "/products/air-make-up-units",                    img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                     desc: "Tempered make-up air systems to replace exhausted air and maintain positive pressure." },
  { label: "Mixing Rooms",          href: "/products/mixing-rooms",                        img: "/manus-storage/IMG_0498_a98f5f38.jpg",          desc: "NFPA 33 compliant mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Enclosed Paint Booths", href: "/products/paint-booths/enclosed",               img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg",        desc: "Full-enclosure booths for superior overspray containment and finish quality." },
  { label: "Open Face Booths",      href: "/products/paint-booths/open-face",              img: "/manus-storage/IMG_2132_c21b2839.jpg",                          desc: "Open-front spray booths for large parts and high-throughput production environments." },
];

/* ── CERT CAROUSEL ── */
function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number>(0);
  const posRef   = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const step = () => {
      posRef.current += 0.5;
      if (posRef.current >= totalWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div ref={trackRef} style={{ display: "flex", gap: "3rem", width: "max-content", alignItems: "center" }}>
        {CERTS_LOOP.map((c, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", minWidth: 120 }}>
            <img src={c.img} alt={c.title} style={{ height: c.imgH, objectFit: "contain", filter: "grayscale(30%)" }} />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", color: "#111", textAlign: "center", textTransform: "uppercase" }}>{c.title}</span>
            <span style={{ fontSize: "0.65rem", color: "#666", textAlign: "center" }}>{c.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function PrepStationsPage() {
  useSEO({
    title: "Paint Prep Stations | Automotive & Industrial Prep Booths | PFS",
    description: "PFS paint prep stations create a dedicated, ventilated environment for sanding, priming, masking, and surface prep. Downdraft and side-downdraft airflow options. ETL/UL listed components, EPA 6H compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/prep/prep-stations",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [sizesOpen, setSizesOpen]       = useState(false);
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  // Gallery lightbox
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const openLightbox  = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx(i => i !== null ? (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length : null);
  const nextImg = () => setLightboxIdx(i => i !== null ? (i + 1) % GALLERY_IMGS.length : null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(420px, 70vh, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <video
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
        {/* breadcrumb */}
        <div style={{ position: "absolute", top: "1.5rem", left: "2rem", display: "flex", gap: "0.5rem", alignItems: "center", zIndex: 2 }}>
          <Link href="/products" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Products</Link>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>›</span>
          <Link href="/products/prep-support" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Prep & Support</Link>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Prep Stations</span>
        </div>
        {/* hero content */}
        <div style={{ position: "relative", zIndex: 2, padding: "clamp(1.5rem,4vw,3rem) clamp(1.5rem,5vw,4rem)", maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 32, height: 2, background: "#fff" }} />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>PFS PREP & SUPPORT SYSTEMS</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,4.5rem)", lineHeight: 1.0, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 0.75rem" }}>
            ORION PREP<br />STATIONS
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.95rem,1.8vw,1.15rem)", maxWidth: 560, lineHeight: 1.6, margin: "0 0 1.5rem" }}>
            Exhaust wall prep stations with curtain or fully enclosed ceiling configurations. Single and multi-bay layouts for body shops, collision centers, and industrial finishing lines.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=prep-station" className="btn-glow" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              REQUEST A QUOTE <ArrowRight size={15} />
            </Link>
            <a href="tel:8885457715" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent" }}>
              <Phone size={14} /> (888) 545-7715
            </a>
          </div>
        </div>
      </section>

      {/* ── CERT STRIP ── */}
      <section style={{ background: "#f8f8f8", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", padding: "1.25rem 0", overflow: "hidden" }}>
        <CertCarousel />
      </section>

      {/* ── OVERVIEW ── */}
      <section style={{ padding: "clamp(2.5rem,5vw,4.5rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>ORION PREP SERIES</span>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 1.2rem" }}>
              PREP SMARTER.<br />PAINT FASTER.
            </h2>
            <p style={{ color: "#444", lineHeight: 1.75, fontSize: "0.97rem", marginBottom: "1rem" }}>
              PFS Orion Prep Stations are dedicated stations for sanding, masking, and prep work — keeping those tasks separate from the spray booth.
            </p>
            <p style={{ color: "#444", lineHeight: 1.75, fontSize: "0.97rem", marginBottom: "1.5rem" }}>
              Available in two configurations: <strong>exhaust wall with curtain sides</strong> for maximum flexibility and easy vehicle access, or <strong>fully enclosed ceiling</strong> with optional built-in LED lighting for a cleaner, more controlled prep environment. Multi-bay configurations allow multiple technicians to work simultaneously.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { val: "Multi-Bay", label: "Configurations" },
                { val: "USA Made", label: "Santa Rosa, CA" },
              ].map(s => (
                <div key={s.val}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: BLUE, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Featured product image — single bay render — shows above text on mobile */}
          <div className="order-first md:order-last" style={{ borderRadius: 4, overflow: "hidden", background: "#f5f5f5" }}>
            <img
              src="/manus-storage/prep-featured-single_efec884d.png"
              alt="PFS Orion Prep — single bay render"
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      {/* ── CONFIGURATIONS ── */}
      <section style={{ background: "#f5f5f5", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>CONFIGURATIONS</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 2rem" }}>
            TWO WAYS TO CONFIGURE
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                title: "EXHAUST WALL + CURTAINS",
                  img: "/manus-storage/pfs-exhaust-wall-curtain-2133_325854c1.webp",
                body: "Exhaust filter wall with vinyl curtain sides. Maximum flexibility — curtains pull back for easy vehicle and large-part access. Available in single or multi-bay configurations. Standard color: PFS Blue.",
                tags: ["Curtain sides", "Open access", "Multi-bay ready"],
              },
              {
                title: "FULLY ENCLOSED CEILING",
                  img: "/manus-storage/prep-pfs-ceiling-bay_4951f2ee.png",
                body: "Full ceiling panel system with exhaust wall and curtain sides. Optional built-in LED lighting package integrated into the ceiling for superior illumination. Cleaner, more controlled prep environment.",
                tags: ["Enclosed ceiling", "Optional LED lighting", "Superior illumination"],
              },
            ].map(cfg => (
              <div key={cfg.title} style={{ background: "#fff", border: "1px solid #e5e5e5", overflow: "hidden" }}>
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img src={cfg.img} alt={cfg.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.2rem", textTransform: "uppercase", color: "#111", margin: "0 0 0.75rem", letterSpacing: "0.04em" }}>{cfg.title}</h3>
                  <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1rem" }}>{cfg.body}</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {cfg.tags.map(t => (
                      <span key={t} style={{ background: "#f0f4ff", color: BLUE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.25rem 0.6rem", borderRadius: 2 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MULTI-BAY FEATURED ── */}
      <section style={{ padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div style={{ borderRadius: 4, overflow: "hidden", background: "#f5f5f5" }}>
            <img
              src="/manus-storage/prep-featured-multi_cdce74a7.png"
              alt="PFS Orion Prep — three-bay multi-bay render"
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            />
          </div>
          <div>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>MULTI-BAY CONFIGURATIONS</span>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 1rem" }}>
              SCALE YOUR<br />PREP CAPACITY
            </h2>
            <p style={{ color: "#444", lineHeight: 1.75, fontSize: "0.97rem", marginBottom: "1rem" }}>
              PFS Orion Prep Stations are designed to expand. Add bays side-by-side to create a dedicated prep line — each bay with its own exhaust section, curtain separation, and independent airflow control.
            </p>
            <p style={{ color: "#444", lineHeight: 1.75, fontSize: "0.97rem", marginBottom: "1.5rem" }}>
              Multi-bay configurations are common in high-volume collision centers, fleet shops, and industrial finishing operations where multiple vehicles or parts need to be prepped simultaneously.
            </p>
            <Link href="/contact/request-a-quote?from=prep-station" className="btn-glow" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              CONFIGURE MULTI-BAY <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: "#f5f5f5", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>STANDARD FEATURES</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 2rem" }}>
            BUILT TO THE SAME STANDARD<br />AS OUR SPRAY BOOTHS
          </h2>
          <button
            onClick={() => setFeaturesOpen(v => !v)}
            style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE, background: "none", border: `1.5px solid ${BLUE}`, padding: "0.6rem 1.4rem", cursor: "pointer" }}
          >
            {featuresOpen ? <><ChevronUp size={15} /> HIDE FEATURES</> : <><ChevronDown size={15} /> VIEW ALL {ALL_FEATURES.length} FEATURES</>}
          </button>
          {featuresOpen && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {ALL_FEATURES.map(f => (
                <div key={f.num} style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#e5e5e5", lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", color: "#111", margin: "0 0 0.6rem", letterSpacing: "0.04em" }}>{f.title}</h3>
                  <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SIZES ── */}
      <section style={{ padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)", maxWidth: 1200, margin: "0 auto" }}>
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>STANDARD SIZES</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: 0 }}>
            STANDARD DIMENSIONS
          </h2>
          <button
            onClick={() => setSizesOpen(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE, background: "none", border: `1.5px solid ${BLUE}`, padding: "0.55rem 1.2rem", cursor: "pointer" }}
          >
            {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
          </button>
        </div>
        {sizesOpen && (
          <div style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", padding: "2rem" }}>
            {/* Fixed dimensions */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: "0.75rem" }}>STANDARD WIDTH &amp; HEIGHT</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {[
                  { label: "Width", val: "14'" },
                  { label: "Height", val: "9'" },
                ].map(d => (
                  <div key={d.label} style={{ background: BLUE, color: "#fff", padding: "0.75rem 1.5rem", minWidth: 100, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.4rem", lineHeight: 1 }}>{d.val}</div>
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginTop: "0.2rem" }}>{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Depth selector */}
            <div>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: "0.75rem" }}>SELECT DEPTH</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {DEPTHS.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDepth(prev => prev === d ? null : d)}
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.06em",
                      padding: "0.6rem 1.4rem", border: `2px solid ${selectedDepth === d ? BLUE : "#ccc"}`,
                      background: selectedDepth === d ? BLUE : "#fff", color: selectedDepth === d ? "#fff" : "#333",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >{d}</button>
                ))}
              </div>
              {selectedDepth && selectedDepth !== "Custom" && (
                <div style={{ marginTop: "1.25rem", padding: "1.25rem", background: "#fff", border: `2px solid ${BLUE}`, display: "inline-block" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: BLUE, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    14' W × 9' H × {selectedDepth} D
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.3rem" }}>Standard configuration — custom sizes available on request</div>
                </div>
              )}
              {selectedDepth === "Custom" && (
                <div style={{ marginTop: "1.25rem", padding: "1.25rem", background: "#fff", border: `2px solid ${BLUE}`, display: "inline-block" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: BLUE, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    CUSTOM SIZE
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.3rem" }}>Contact us for custom width, height, or depth configurations.</div>
                  <Link href="/contact/request-a-quote?from=prep-station" className="btn-glow" style={{ marginTop: "0.75rem", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.8rem", padding: "0.55rem 1.4rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    REQUEST CUSTOM SIZE <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ── GALLERY ── */}
      <section style={{ background: "#111", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>REAL INSTALLS &amp; RENDERS</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#fff", margin: "0 0 2rem" }}>
            ORION PREP GALLERY
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
            {GALLERY_IMGS.map((img, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                style={{ aspectRatio: "4/3", overflow: "hidden", cursor: "pointer", position: "relative", background: "#222" }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: img.pos, transition: "transform 0.3s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <div
          onClick={closeLightbox}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={e => { e.stopPropagation(); prevImg(); }} style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: "2rem", width: 48, height: 48, cursor: "pointer", borderRadius: "50%" }}>‹</button>
          <img
            src={GALLERY_IMGS[lightboxIdx].src}
            alt={GALLERY_IMGS[lightboxIdx].alt}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 2 }}
          />
          <button onClick={e => { e.stopPropagation(); nextImg(); }} style={{ position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: "2rem", width: 48, height: 48, cursor: "pointer", borderRadius: "50%" }}>›</button>
          <button onClick={closeLightbox} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: "1.5rem", width: 40, height: 40, cursor: "pointer", borderRadius: "50%" }}>×</button>
          <div style={{ position: "absolute", bottom: "1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em" }}>
            {lightboxIdx + 1} / {GALLERY_IMGS.length}
          </div>
        </div>
      )}

      {/* ── CTA BAND ── */}
      <section style={{ background: BLUE, padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,2.5vw,2rem)", textTransform: "uppercase", color: "#fff", margin: "0 0 0.4rem" }}>READY TO CONFIGURE YOUR PREP STATION?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", margin: 0 }}>Single bay, multi-bay, curtain or enclosed ceiling — we build to your specs.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=prep-station" className="btn-glow" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              GET PRICING <ArrowRight size={15} />
            </Link>
            <a href="tel:8885457715" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent" }}>
              <Phone size={14} /> (888) 545-7715
            </a>
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Paint Prep Stations — Common Questions</h2>
          </div>
          {[
            { q: "What is a paint prep station used for?", a: "A paint prep station provides a dedicated, code-compliant environment for sanding, priming, masking, and other surface preparation tasks that need to happen before final painting. By handling prep work in a separate station, you keep your spray booth available for final coats — increasing overall throughput and reducing contamination risk in the booth." },
            { q: "What is the difference between a prep station and a spray booth?", a: "A spray booth is designed for the application of paint and coatings under controlled airflow conditions. A prep station is designed for sanding, priming, and masking — tasks that generate dust and require ventilation but do not involve spray application of flammable materials. Prep stations typically use a 4-stage filtration system to capture dust and VOCs, and are built to EPA 6H Paint Rule and NFPA 33 standards." },
            { q: "Do prep stations need to be NFPA 33 compliant?", a: "Yes. Prep stations used for priming and surface coating operations are subject to NFPA 33 requirements. PFS prep stations are built to NFPA 33 standards with ETL/UL listed and certified components and OSHA compliant ventilation." },
            { q: "What filtration system does a PFS prep station use?", a: "PFS prep stations use a 4-stage exhaust filtration system that captures paint overspray, dust, and VOCs. The system includes a pre-filter, a primary paint arrestor, a secondary filter, and an activated carbon stage for VOC capture. This multi-stage approach extends filter life and maintains code-compliant air quality." },
            { q: "Can PFS build a custom-size prep station?", a: "Yes. PFS manufactures prep stations in custom widths, heights, and lengths. Ductless mobile configurations are also available for shops that need flexibility. Contact a PFS engineer for a custom quote." },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a paint prep station used for?", "acceptedAnswer": { "@type": "Answer", "text": "A paint prep station provides a dedicated, code-compliant environment for sanding, priming, masking, and other surface preparation tasks that need to happen before final painting. By handling prep wor..." } },
            { "@type": "Question", "name": "What is the difference between a prep station and a spray booth?", "acceptedAnswer": { "@type": "Answer", "text": "A spray booth is designed for the application of paint and coatings under controlled airflow conditions. A prep station is designed for sanding, priming, and masking — tasks that generate dust and req..." } },
            { "@type": "Question", "name": "Do prep stations need to be NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Prep stations used for priming and surface coating operations are subject to NFPA 33 requirements. PFS prep stations are built to NFPA 33 standards with ETL/UL listed and certified components and..." } },
            { "@type": "Question", "name": "What filtration system does a PFS prep station use?", "acceptedAnswer": { "@type": "Answer", "text": "PFS prep stations use a 4-stage exhaust filtration system that captures paint overspray, dust, and VOCs. The system includes a pre-filter, a primary paint arrestor, a secondary filter, and an activate..." } },
            { "@type": "Question", "name": "Can PFS build a custom-size prep station?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS manufactures prep stations in custom widths, heights, and lengths. Ductless mobile configurations are also available for shops that need flexibility. Contact a PFS engineer for a custom quote..." } }
          ]
        }) }} />
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <SiteProductCardSection
        label="COMPLETE YOUR SYSTEM"
        heading="YOU MAY ALSO NEED"
        cards={PRODUCTS}
      />
    </div>
  );
}
