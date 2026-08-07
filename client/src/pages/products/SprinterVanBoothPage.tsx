/*
 * Sprinter Van & High-Clearance Paint Booths — PFS
 * Route: /products/paint-booths/sprinter-van
 * Layout: CrossFlow template — hero (real photo) → cert carousel → featured photo + intro
 *         → Airflow Selector (3 animated diagrams) → Standard Features collapsible
 *         → Available Sizes collapsible → gallery → You May Also Like
 * Mobile: fully optimized — single column, sticky CTA bar
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Maximize2 } from "lucide-react";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryLightbox";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
const HERO_IMG = "/manus-storage/pfs-sprinter-van-mercedes-clean_84aa20f4.jpg";  // Mercedes Sprinter front-face inside white booth (cropped)
const FEATURED_IMG = "/manus-storage/pfs-sprinter-van-ford-clean_9a7301c8.jpg";     // Ford Transit in PFS booth — exterior front with PFS banner (cropped)

/* ── GALLERY ── */
const GALLERY: GalleryImage[] = [
  { src: "/manus-storage/pfs-sprinter-van-ford-clean2_776c69bb.png", alt: "Ford Transit van inside PFS spray booth — exterior front view with PFS branding" },
  { src: "/manus-storage/pfs-sprinter-van-masked_c831c0bb.jpg", alt: "Mercedes Sprinter van masked and prepped for paint inside PFS spray booth with yellow scaffolding" },
  { src: "/manus-storage/van_interior_front_door_9481d35f.jpg", alt: "PFS Sprinter Van booth interior from front door" },
  { src: "/manus-storage/van_exterior_side_duct_478892a9.jpg", alt: "PFS Sprinter Van booth exterior side with ductwork" },
  { src: "/manus-storage/van_exterior_front_pfs_banner_9cffb3d7.jpg", alt: "PFS Sprinter Van booth exterior front with branding" },
  { src: "/manus-storage/van_interior_side_wall_a46fe5ec.jpg", alt: "PFS Sprinter Van booth interior side wall with ceiling lights" },
  { src: "/manus-storage/van_exterior_side_open_door_3d4424a5.jpg", alt: "PFS Sprinter Van booth compact exterior with control panel" },
  { src: "/manus-storage/van_exterior_side_open_door_3d4424a5.jpg", alt: "PFS Sprinter Van booth exterior side with open door" },
];

/* ── CERT LOGOS ── */
const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";
const UL_LOGO = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "US & Canada Safety Certification", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant", sub: "Spray Application Standard", imgH: 44 },
  { img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", imgH: 36 },
  { img: UL_LOGO, title: "UL 508A Controls", sub: "Listed Control Panel", imgH: 36 },
  { img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

/* ── FEATURES ── */
const FEATURES_VISIBLE = [
  { num: "01", title: "11–12 ft Interior Clearance", body: "PFS Sprinter Van booths are built with 11 to 12 ft interior height — enough clearance for Sprinter vans, high-roof cargo vans, Transit vans, and tall commercial vehicles. Standard enclosed booths top out at 9–10 ft; the van configuration is a custom-height build." },
  { num: "02", title: "Available in Orion, Helios & Zenith", body: "The high-clearance van configuration is available across all three PFS enclosed booth series — Orion (cross-flow), Helios (side-downdraft), and Zenith (full downdraft). Same certifications, same controls, same build quality — just taller." },
  { num: "03", title: "UL 508A Control Panel — ETL Listed", body: "Every PFS Sprinter Van booth ships with a UL 508A certified control panel and Intertek ETL & ETL-C listing for US and Canadian safety codes. Third-party certification means your facility inspection passes the first time." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "Full-Length LED Wall Lighting", body: "Full-length LED wall lighting runs the entire length of the booth — no dark corners, no shadows. Critical for fleet refinishing where color match across large panel surfaces is required. Fluorescent tube fixtures also available." },
  { num: "05", title: "UL-Listed Tube Axial Fans", body: "All PFS booths ship with UL-listed tube axial fans sized for the booth volume and airflow configuration. Fan sizing is calculated for the interior height — van booths require higher CFM to maintain proper air velocity at 11–12 ft." },
  { num: "06", title: "Tacky Intake / Fiberglass Exhaust Filters", body: "Standard intake uses tacky-type filters. Exhaust uses fiberglass media. Blanket intake upgrades are available for heated configurations. All filter media is replaceable and available through PFS directly." },
  { num: "07", title: "Galvanized or Powder-Coated Panels", body: "Booth panels are available in galvanized steel or powder-coated finish. Powder coat adds corrosion resistance and a cleaner appearance — recommended for high-humidity climates and facilities with aggressive cleaning schedules." },
  { num: "08", title: "Heated Option Available", body: "Add a direct-fired or indirect-fired heat system to any Sprinter Van booth. Spray, flash, and bake modes with programmable cure cycles up to 180°F. Same heat system as the standard PFS heated series — available on Orion, Helios, and Zenith van configurations." },
];

/* ── SIZES ── */
const SIZES = [
  { model: "PFS Orion Van", series: "Cross-Flow", dims: "14'W × 11–12'H × 28–36'L", href: "/products/paint-booths/crossflow", note: "Horizontal airflow — no pit required" },
  { model: "PFS Helios Van", series: "Side Downdraft", dims: "14'W × 11–12'H × 28–36'L", href: "/products/paint-booths/side-downdraft", note: "Side-wall exhaust — no pit required" },
  { model: "PFS Zenith Van", series: "Full Downdraft", dims: "14'W × 11–12'H × 28–36'L", href: "/products/paint-booths/full-downdraft", note: "Vertical downdraft — concrete pit required" },
];

/* ── YOU MAY ALSO LIKE ── */
const ALL_RELATED = [
  { label: "Cross-Flow Booths", href: "/products/paint-booths/crossflow", img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp", desc: "Horizontal airflow — most cost-effective enclosed booth for automotive and fleet finishing." },
  { label: "Side Downdraft Booths", href: "/products/paint-booths/side-downdraft", img: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png", desc: "Side-wall exhaust plenums — no pit required, excellent finish quality." },
  { label: "Full Downdraft Booths", href: "/products/paint-booths/full-downdraft", img: "/manus-storage/pfs_zenith_booth_v2_d56f2cd8_d3f181cd.png", desc: "Vertical downdraft through a concrete pit — highest finish quality available." },
  { label: "Heated Paint Booths", href: "/products/paint-booths/heated", img: "/manus-storage/heated_exterior_front_pfs_60f51615.jpg", desc: "Add spray, flash, and bake modes to any van booth — up to 180°F cure cycles." },
  { label: "Air Make-Up Units", href: "/products/air-make-up-units", img: "/manus-storage/pfs-amu-card_41f0dd88.jpg", desc: "Tempered, filtered make-up air to maintain positive pressure and code compliance." },
  { label: "Semi-Downdraft Booths", href: "/products/paint-booths/semi-downdraft", img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp", desc: "Ceiling intake with rear-wall exhaust — no pit, better finish than cross-flow." },
];

/* ── AIRFLOW DIAGRAMS ── */
function CrossFlowSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 320" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes cfRight { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes cfUp    { 0%{stroke-dashoffset:80;opacity:0.3}  50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .cf1{animation:cfRight 2.0s linear infinite}
          .cf2{animation:cfRight 2.0s linear infinite 0.5s}
          .cf3{animation:cfRight 2.0s linear infinite 1.0s}
          .cfu{animation:cfUp 1.8s linear infinite}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3" />
        <rect x="60" y="80" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="60" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="60" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="618" y="80" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="618" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="618" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="610" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5" />
        <line x1="82" y1="100" x2="618" y2="100" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="cf1" />
        <polygon points="618,94 634,100 618,106" fill="#22c55e" />
        <line x1="82" y1="160" x2="618" y2="160" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="cf2" />
        <polygon points="618,154 634,160 618,166" fill="#22c55e" />
        <line x1="82" y1="220" x2="618" y2="220" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="cf3" />
        <polygon points="618,214 634,220 618,226" fill="#22c55e" />
        <line x1="625" y1="60" x2="625" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 8" className="cfu" />
        <polygon points="619,12 625,0 631,12" fill="#22c55e" />
        <text x="40" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>INTAKE</text>
        <text x="40" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="660" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="625" y="295" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="625" y="308" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="300" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS ORION — CROSS-FLOW</text>
      </svg>
    </div>
  );
}

function SideDowndraftSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes sdDown2  { 0%{stroke-dashoffset:220;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes sdFloor2 { 0%{stroke-dashoffset:240;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes sdUp2    { 0%{stroke-dashoffset:260;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .sd2-d1{animation:sdDown2  2.2s linear infinite 0.0s}
          .sd2-d2{animation:sdDown2  2.2s linear infinite 0.55s}
          .sd2-d3{animation:sdDown2  2.2s linear infinite 1.1s}
          .sd2-fl{animation:sdFloor2 2.0s linear infinite 0.0s}
          .sd2-fl2{animation:sdFloor2 2.0s linear infinite 0.5s}
          .sd2-up{animation:sdUp2   2.4s linear infinite 0.0s}
          .sd2-up2{animation:sdUp2  2.4s linear infinite 0.6s}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3" />
        <rect x="88" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="140" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="192" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="244" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="296" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="348" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="598" y="60" width="22" height="130" rx="0" fill="#e5e7eb" stroke="#888" strokeWidth="1.5" />
        <rect x="595" y="192" width="28" height="38" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="608" y="8" width="30" height="54" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5" />
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd2-d1" />
        <polygon points="104,256 110,268 116,256" fill="#22c55e" />
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd2-d2" />
        <polygon points="208,256 214,268 220,256" fill="#22c55e" />
        <line x1="318" y1="60" x2="318" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd2-d3" />
        <polygon points="312,256 318,268 324,256" fill="#22c55e" />
        <line x1="82" y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd2-fl" />
        <polygon points="590,252 602,258 590,264" fill="#22c55e" />
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd2-up" />
        <polygon points="603,10 609,0 615,10" fill="#22c55e" />
        <text x="220" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>CEILING INTAKE FILTERS</text>
        <text x="660" y="212" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="226" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS HELIOS — SIDE DOWNDRAFT</text>
      </svg>
    </div>
  );
}

function FullDowndraftSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 400" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes fdDown2  { 0%{stroke-dashoffset:220;opacity:0.25} 40%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.25} }
          @keyframes fdRight2 { 0%{stroke-dashoffset:240;opacity:0.25} 40%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.25} }
          @keyframes fdUp2    { 0%{stroke-dashoffset:260;opacity:0.25} 40%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.25} }
          .fd2-d1{animation:fdDown2  2.0s linear infinite 0.00s}
          .fd2-d2{animation:fdDown2  2.0s linear infinite 0.33s}
          .fd2-d3{animation:fdDown2  2.0s linear infinite 0.66s}
          .fd2-d4{animation:fdDown2  2.0s linear infinite 1.00s}
          .fd2-r1{animation:fdRight2 2.4s linear infinite 0.00s}
          .fd2-u1{animation:fdUp2    2.2s linear infinite 0.00s}
        `}</style>
        <rect x="60" y="60" width="540" height="220" fill="none" stroke="#222" strokeWidth="3" />
        {[68, 148, 228, 308, 388, 468, 548].map((x, i) => (
          <rect key={i} x={x} y="36" width="68" height="24" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        ))}
        <text x="350" y="26" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>
        <rect x="60" y="262" width="540" height="18" fill="#d1d5db" stroke="#888" strokeWidth="1.5" />
        {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440, 470, 500, 530, 560].map((x, i) => (
          <line key={i} x1={x} y1="262" x2={x} y2="280" stroke="#9ca3af" strokeWidth="1" />
        ))}
        <text x="330" y="298" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>GRATED FLOOR EXHAUST PIT</text>
        <rect x="60" y="310" width="580" height="22" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5" />
        <text x="350" y="348" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>UNDERGROUND EXHAUST DUCT (CONCRETE PIT REQUIRED)</text>
        <rect x="630" y="8" width="32" height="304" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5" />
        <text x="646" y="370" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="646" y="383" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <line x1="100" y1="60" x2="100" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd2-d1" />
        <polygon points="94,258 100,272 106,258" fill="#22c55e" />
        <line x1="220" y1="60" x2="220" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd2-d2" />
        <polygon points="214,258 220,272 226,258" fill="#22c55e" />
        <line x1="340" y1="60" x2="340" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd2-d3" />
        <polygon points="334,258 340,272 346,258" fill="#22c55e" />
        <line x1="460" y1="60" x2="460" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd2-d4" />
        <polygon points="454,258 460,272 466,258" fill="#22c55e" />
        <line x1="62" y1="321" x2="628" y2="321" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd2-r1" />
        <polygon points="622,315 636,321 622,327" fill="#22c55e" />
        <line x1="641" y1="310" x2="641" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd2-u1" />
        <polygon points="635,12 641,0 647,12" fill="#22c55e" />
        <text x="350" y="395" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS ZENITH — FULL DOWNDRAFT</text>
      </svg>
    </div>
  );
}

function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
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
    <section style={{ background: "#fff", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", zIndex: 2, background: "linear-gradient(to right, #fff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", zIndex: 2, background: "linear-gradient(to left, #fff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2rem", borderRight: "1px solid #e5e7eb", flexShrink: 0 }}>
              <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SprinterVanBoothPage() {
  useSEO({
    title: "Sprinter Van Paint Booths | Small Vehicle Spray Booths | PFS",
    description: "PFS Sprinter van spray booths are sized for Mercedes Sprinters, Ford Transits, and similar commercial vans. Compact footprint, full downdraft or semi-downdraft airflow, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/sprinter-van",
  });

  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<"crossflow" | "semi" | "side" | "full">("crossflow");

  const related = (() => {
    const shuffled = [...ALL_RELATED].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  })();

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "clamp(380px,60vh,640px)", background: "#0a0a0a", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO_IMG} alt="PFS Sprinter Van paint booth — full interior view" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", opacity: 0.55 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.50) 55%,rgba(0,0,0,0.15) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "5rem 0 4rem" }}>
          <nav style={{ marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <Link href="/"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>HOME</span></Link>{" / "}
              <Link href="/products"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>PRODUCTS</span></Link>{" / "}
              <Link href="/products/paint-booths"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>PAINT BOOTHS</span></Link>{" / "}
              <Link href="/products/paint-booths/enclosed"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>ENCLOSED</span></Link>{" / "}
              <span style={{ color: "rgba(255,255,255,0.8)" }}>SPRINTER VAN</span>
            </span>
          </nav>
          <div style={{ maxWidth: "560px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(27,58,107,0.4)", border: "1px solid rgba(91,141,217,0.5)", padding: "0.3rem 0.75rem", marginBottom: "1rem" }}>
              <Maximize2 size={12} style={{ color: "#6b9bd2" }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.18em", color: "#6b9bd2", textTransform: "uppercase" }}>11–12 FT INTERIOR CLEARANCE</span>
            </div>
            <h1 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(2.4rem,6vw,4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.0, marginBottom: "1.1rem", textTransform: "uppercase" }}>
              Sprinter Van<br />Paint Booths
            </h1>
            <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.88rem,1.5vw,1rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "460px" }}>
              built with ETL/UL listed components, NFPA 33 compliant booths built for Sprinter vans, high-roof cargo vans, and tall commercial vehicles. Available in cross-flow, side downdraft, or full downdraft — Orion, Helios, or Zenith series.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/contact/request-a-quote?from=sprinter-van-booth" data-animation="slideLeft">
                <span className="btn-glow">GET PRICING <ArrowRight size={14} /></span>
              </Link>
              <a data-animation="slideRight" href="tel:8885457715" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.35)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2rem" }}>
                CALL (888) 545-7715
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── FEATURED PHOTO + INTRO ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>PFS SPRINTER VAN SERIES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>Built Tall. Built Right. ETL Listed.</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>ORION · HELIOS · ZENITH — YOUR CHOICE OF AIRFLOW</span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
                Standard enclosed booths top out at 9–10 ft. PFS Sprinter Van booths are custom-built to 11–12 ft interior height — enough clearance for Sprinter vans, Transit high-roofs, and tall commercial vehicles. ETL & ETL-C listed, UL 508A controls, NFPA 33 compliant. We ship nationally.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden" }}>
              <img src={FEATURED_IMG} alt="PFS Sprinter Van booth — exterior side with ductwork" style={{ width: "100%", height: "auto", maxHeight: "480px", objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.75rem", width: "100%", maxWidth: "900px" }}>
              {[
                { label: "11–12 ft Interior Height" },
                { label: "ETL & ETL-C Listed" },
                { label: "UL 508A Control Panel" },
                { label: "3 Airflow Configurations" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 0.75rem", background: "#fff", border: "1px solid #e5e7eb" }}>
                  <div style={{ width: 6, height: 6, background: BLUE, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#333", letterSpacing: "0.04em" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AIRFLOW SELECTOR ── */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>HOW IT WORKS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Choose Your Airflow Configuration</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              PFS Sprinter Van booths are available in all three airflow configurations. Select the one that fits your facility, floor plan, and finishing requirements.
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {([
              { key: "crossflow", label: "Cross-Flow (Orion)", sub: "Horizontal airflow — no pit required" },
              { key: "semi", label: "Semi Downdraft (Orion)", sub: "Ceiling intake, rear-wall exhaust — no pit" },
              { key: "side", label: "Side Downdraft (Helios)", sub: "Ceiling intake, side-wall exhaust — no pit" },
              { key: "full", label: "Full Downdraft (Zenith)", sub: "Vertical ceiling-to-floor — concrete pit required" },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFlow(tab.key)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "0.85rem 1.5rem",
                  background: activeFlow === tab.key ? BLUE : "transparent",
                  border: `2px solid ${BLUE}`,
                  color: activeFlow === tab.key ? "#fff" : BLUE,
                  cursor: "pointer",
                  transition: "background 0.15s,color 0.15s",
                  minWidth: "180px",
                }}
              >
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tab.label}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", opacity: 0.8, marginTop: "0.2rem" }}>{tab.sub}</span>
              </button>
            ))}
          </div>

          {/* Active diagram */}
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {activeFlow === "crossflow" && (
              <div>
                <CrossFlowSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through front-wall intake filters and exits through rear-wall exhaust filters. Horizontal front-to-rear airflow keeps overspray away from the operator. No pit required — the most cost-effective van booth configuration.
                </p>
              </div>
            )}
            {activeFlow === "semi" && (
              <div>
                <SideDowndraftSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through ceiling intake filters and exhausts through the rear wall at floor level. No pit required. Semi-downdraft airflow delivers better finish quality than cross-flow — ideal for fleet refinishing where consistent top-to-bottom coverage is required.
                </p>
              </div>
            )}
            {activeFlow === "side" && (
              <div>
                <div style={{ textAlign: "center" }}>
                  <img src="/manus-storage/side_downdraft_helios_smooth_splitflow_eada3110_fd6fb8dd.gif" alt="Side Downdraft Helios airflow diagram" style={{ maxWidth: "100%", width: "700px", height: "auto" }} />
                </div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through ceiling intake filters and splits to both side-wall exhaust plenums at floor level. No pit required. The Helios side-downdraft pattern provides the most uniform air velocity across the entire vehicle surface — ideal for tall vans and high-roof vehicles.
                </p>
              </div>
            )}
            {activeFlow === "full" && (
              <div>
                <FullDowndraftSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through full-ceiling intake filters and exhausts through a grated floor pit into an underground duct. Concrete pit required. Highest finish quality available — overspray travels straight down and away from the vehicle surface.
                </p>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }} data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=sprinter-van-booth">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STANDARD FEATURES — collapsible ── */}
      <section style={{ background: "#fff", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD FEATURES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Every Unit Ships Fully Certified</h2>
            </div>
            <button data-animation="slideRight"
              onClick={() => setSpecsOpen(v => !v)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: specsOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: specsOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}
            >
              {specsOpen ? <><ChevronUp size={14} /> HIDE FEATURES</> : <><ChevronDown size={14} /> SEE ALL FEATURES</>}
            </button>
          </div>

          {specsOpen && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
                {[...FEATURES_VISIBLE, ...FEATURES_HIDDEN].map(f => (
                  <div key={f.num} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", padding: "1.25rem 1.5rem" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em", color: BLUE, textTransform: "uppercase", marginBottom: "0.5rem" }}>{f.num}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1rem", fontWeight: 800, color: "#111", marginBottom: "0.5rem" }}>{f.title}</div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── AVAILABLE SIZES — collapsible ── */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>AVAILABLE SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Orion, Helios & Zenith — All Available in Van Height</h2>
            </div>
            <button data-animation="slideRight"
              onClick={() => setSizesOpen(v => !v)}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}
            >
              {sizesOpen ? <><ChevronUp size={14} /> HIDE SIZES</> : <><ChevronDown size={14} /> SEE SIZES</>}
            </button>
          </div>

          {sizesOpen && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1rem" }}>
              {SIZES.map(s => (
                <Link key={s.model} href={s.href}>
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", padding: "1.5rem", cursor: "pointer", transition: "border-color 0.15s", borderTop: `3px solid ${BLUE}` }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em", color: BLUE, textTransform: "uppercase", marginBottom: "0.4rem" }}>{s.series}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.2rem", fontWeight: 900, color: "#111", marginBottom: "0.4rem" }}>{s.model}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#333", fontWeight: 600, marginBottom: "0.3rem" }}>{s.dims}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.78rem", color: "#666" }}>{s.note}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.75rem", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      VIEW SERIES <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>REAL INSTALLS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>PFS Sprinter Van Booths in the Field</h2>
          </div>
          <GalleryGrid images={GALLERY} />
        </div>
      </section>

      {/* ── YOU MAY ALSO LIKE ── */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>EXPLORE MORE</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>You May Also Like</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.5rem" }} data-animation="fadeIn">
            {related.map(p => (
              <Link key={p.label} href={p.href}>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1rem", fontWeight: 800, color: "#111", marginBottom: "0.4rem" }}>{p.label}</div>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6, margin: "0 0 0.75rem" }}>{p.desc}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      LEARN MORE <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem", textTransform: "uppercase" }}>
            Ready to Spec Your Sprinter Van Booth?
          </h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Tell us your vehicle height, facility dimensions, and airflow preference. We'll spec the right booth and ship it nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href="/contact/request-a-quote?from=sprinter-van-booth" data-animation="slideLeft">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>REQUEST A QUOTE <ArrowRight size={14} /></span>
            </Link>
            <a data-animation="slideRight" href="tel:8885457715" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem" }}>
              CALL (888) 545-7715
            </a>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, display: "flex", background: "#111", borderTop: "2px solid #333" }} className="md:hidden">
        <a href="tel:8885457715" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1rem", color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", borderRight: "1px solid #333", textDecoration: "none" }}>
          CALL NOW
        </a>
        <Link href="/contact/request-a-quote?from=sprinter-van-booth" style={{ flex: 1 }}>
          <span className="btn-glow" style={{ justifyContent: "center" }}>GET PRICING <ArrowRight size={13} /></span>
        </Link>
      </div>
    </div>
  );
}
