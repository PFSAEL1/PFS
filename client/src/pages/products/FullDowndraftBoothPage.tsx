/**
 * Full Downdraft Spray Booths — PFS Zenith Series
 * Route: /products/paint-booths/full-downdraft
 * Template #3 — All Other Products
 *
 * Image assignments (FINAL):
 *   HERO_IMG      = pfs_zenith_6008 — open-front real photo, red Tesla, grated floor visible
 *   FEATURED_IMG  = zenith_downdraft_angle2_white — white background angle render
 *   GALLERY (real photos only, no renders):
 *     GALLERY_1 = pfs_zenith_front_v4 — front-facing real install, exhaust stack
 *     GALLERY_2 = IMG_9176 — real install, concrete floor, exhaust duct
 *     GALLERY_3 = IMG_9232 — Zenith Tesla open-front
 *   HUB CARD (EnclosedBoothsPage) = zenith_downdraft_angle2_epoxy
 *
 * Key note: Full downdraft sits on CONCRETE FLOOR — requires a concrete pit.
 *           No raised floor. Grated pit is poured into the slab.
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Flame, AlertTriangle } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
// Hero: front-facing real install — full booth exterior visible, PFS+ZENITH fascia, exhaust stack
const HERO_IMG     = "/manus-storage/pfs_zenith_front_v4_184fa602_6bff6565.webp";
const FEATURED_IMG = "/manus-storage/zenith_angle_white_66934fee_ba0fd5d3.webp";

// Gallery = REAL PHOTOS ONLY — no renders, no duplicates, uniform card sizing
const GALLERY_IMGS = [
  { src: "/manus-storage/pfs_zenith_6008_595d7725.webp",  alt: "PFS Zenith — open front, red Tesla inside, grated floor visible",          pos: "center 50%" },
  { src: "/manus-storage/IMG_9176_39756636.jpg",           alt: "PFS Zenith — front-facing install, concrete floor, exhaust duct",          pos: "center 40%" },
  { src: "/manus-storage/pfs_zenith_6010_a482a82c.webp",  alt: "PFS Zenith — open front, teal ceiling intake filters, grated floor pit",   pos: "center 45%" },
  { src: "/manus-storage/IMG_0222_09b95832.jpg",           alt: "PFS Zenith — real installation photo",                                    pos: "center 50%" },
  { src: "/manus-storage/IMG_6009_4924cb4c.jpg",           alt: "PFS Zenith — real installation photo",                                    pos: "center 50%" },
  { src: "/manus-storage/IMG_6012_c043d75c.jpg",           alt: "PFS Zenith — real installation photo",                                    pos: "center 50%" },
    { src: "/manus-storage/IMG_6135_0a36b459.jpg",           alt: "PFS Zenith — real installation photo",                            pos: "center 50%" },
  { src: "/manus-storage/DowndraftwSRP_62a562d2.webp",      alt: "PFS Zenith — open doors, grated floor, car inside during installation", pos: "center 45%" },
  { src: "/manus-storage/zenith_angle_white_66934fee_ba0fd5d3.webp",   alt: "PFS Zenith full-downdraft spray booth — clean white render, angled view",  pos: "center 50%" },
];

const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: ETL_LOGO,  title: "ETL & ETL-C Listed",    sub: "Intertek — USA & Canada",             imgH: 44 },
  { img: UL_LOGO,   title: "UL 508A Certified",      sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant",      sub: "Spray Application Standard",          imgH: 44 },
  { img: EPA_LOGO,  title: "EPA Compliant",          sub: "Air Quality Standards",               imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",         sub: "Workplace Safety Standards",          imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",        sub: "Santa Rosa, CA",                      imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

const FEATURES_VISIBLE = [
  { num: "02", title: "UL 508A Control Panel",            body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
  { num: "03", title: "Full Ceiling Plenum Intake",       body: "Air enters through a full-length ceiling plenum with intake filters spanning the entire roof. Uniform, top-to-bottom airflow eliminates dead zones and delivers the cleanest finish quality of any enclosed booth configuration." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "Full Raised Grated Floor Exhaust", body: "Air exhausts through a full raised grated floor into an underground concrete pit, then travels through an underground duct to the exhaust stack. Requires a concrete pit — poured into the slab at installation." },
  { num: "05", title: "CID2 Lighting — 4-Tube Fixtures",  body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination across the full booth." },
  { num: "06", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters in the floor grating. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "07", title: "Galvanized or Powder Coated Steel", body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "08", title: "We Ship Nationally",               body: "PFS full-downdraft booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "9":  [{ w:"14'",h:"9'", l:"24'" },{ w:"14'",h:"9'", l:"27'" },{ w:"14'",h:"9'", l:"30'" },{ w:"14'",h:"9'", l:"33'" }],
  "10": [{ w:"14'",h:"10'",l:"24'" },{ w:"14'",h:"10'",l:"27'" },{ w:"14'",h:"10'",l:"30'" },{ w:"14'",h:"10'",l:"33'" }],
  "12": [{ w:"14'",h:"12'",l:"24'" },{ w:"14'",h:"12'",l:"27'" },{ w:"14'",h:"12'",l:"30'" },{ w:"14'",h:"12'",l:"33'" }],
};

const PRODUCTS = [
  { label: "Air Make-Up Units",    href: "/products/air-make-up-units",             img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms",         href: "/products/mixing-rooms",                 img: "/manus-storage/IMG_0498_a98f5f38.jpg",           desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations",        href: "/products/prep-support/prep-stations",                img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",       desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Semi-Downdraft Booths",href: "/products/paint-booths/semi-downdraft", img: "/manus-storage/orion-semi-down-epoxy_9144ba19.png",              desc: "Ceiling-front intake, rear floor exhaust — better finish quality than cross-flow at a lower cost than full downdraft." },
];





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
    <section style={{ background:"#ffffff",overflow:"hidden",borderTop:`4px solid ${BLUE}`,borderBottom:"3px solid #111",boxShadow:"0 4px 0 0 #111" }}>
      <div style={{ overflow:"hidden",position:"relative" }}>
        <div style={{ position:"absolute",left:0,top:0,bottom:0,width:"60px",zIndex:2,background:"linear-gradient(to right, #ffffff, transparent)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",right:0,top:0,bottom:0,width:"60px",zIndex:2,background:"linear-gradient(to left, #ffffff, transparent)",pointerEvents:"none" }} />
        <div ref={trackRef} style={{ display:"flex",alignItems:"center",whiteSpace:"nowrap",willChange:"transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display:"inline-flex",alignItems:"center",gap:"0.65rem",padding:"1rem 2rem",borderRight:"1px solid #e5e7eb",flexShrink:0 }}>
              <img src={cert.img} alt={cert.title} style={{ height:`${cert.imgH}px`,width:"auto",objectFit:"contain",flexShrink:0 }} />
              <div>
                <div style={{ fontFamily:"'Chakra Petch', 'Barlow Condensed', sans-serif",fontSize:"0.8rem",fontWeight:800,color:"#111",letterSpacing:"0.04em",textTransform:"uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily:"'Archivo Narrow', 'Inter', sans-serif",fontSize:"0.7rem",color:"#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FULL-DOWNDRAFT AIRFLOW SVG (inline animated) ── */
/* Air flows: DOWN through booth columns → RIGHT through underground duct → UP exhaust stack */
function FullDowndraftAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"720px",margin:"0 auto" }}>
      <svg viewBox="0 0 760 400" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes fdDown {
            0%   { stroke-dashoffset: 200; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          @keyframes fdRight {
            0%   { stroke-dashoffset: 300; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          @keyframes fdUp {
            0%   { stroke-dashoffset: 200; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          .fd-d1 { animation: fdDown  2.0s linear infinite 0.00s; }
          .fd-d2 { animation: fdDown  2.0s linear infinite 0.33s; }
          .fd-d3 { animation: fdDown  2.0s linear infinite 0.66s; }
          .fd-d4 { animation: fdDown  2.0s linear infinite 1.00s; }
          .fd-d5 { animation: fdDown  2.0s linear infinite 1.33s; }
          .fd-d6 { animation: fdDown  2.0s linear infinite 1.66s; }
          .fd-r1 { animation: fdRight 2.4s linear infinite 0.00s; }
          .fd-r2 { animation: fdRight 2.4s linear infinite 0.60s; }
          .fd-u1 { animation: fdUp    2.2s linear infinite 0.00s; }
          .fd-u2 { animation: fdUp    2.2s linear infinite 0.55s; }
        `}</style>

        {/* ── BOOTH OUTLINE ── */}
        <rect x="60" y="60" width="540" height="220" fill="none" stroke="#222" strokeWidth="3"/>

        {/* ── CEILING INTAKE FILTERS (full width) ── */}
        {[68,148,228,308,388,468,548].map((x,i) => (
          <rect key={i} x={x} y="36" width="68" height="24" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        ))}
        <text x="350" y="26" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>

        {/* ── GRATED FLOOR PIT (full width, inside booth) ── */}
        <rect x="60" y="262" width="540" height="18" fill="#d1d5db" stroke="#888" strokeWidth="1.5"/>
        {/* Grating lines */}
        {[80,110,140,170,200,230,260,290,320,350,380,410,440,470,500,530,560].map((x,i) => (
          <line key={i} x1={x} y1="262" x2={x} y2="280" stroke="#9ca3af" strokeWidth="1"/>
        ))}
        <text x="330" y="298" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>GRATED FLOOR EXHAUST PIT</text>

        {/* ── UNDERGROUND DUCT (below floor, runs right to stack) ── */}
        <rect x="60" y="310" width="580" height="22" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="350" y="348" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>UNDERGROUND EXHAUST DUCT (CONCRETE PIT REQUIRED)</text>

        {/* ── EXHAUST STACK (right side, above ground) ── */}
        <rect x="630" y="8" width="32" height="304" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="646" y="370" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="646" y="383" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>

        {/* ── DOWNWARD FLOW ARROWS (6 columns, staggered) ── */}
        <line x1="100" y1="60" x2="100" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d1"/>
        <polygon points="94,258 100,272 106,258" fill="#22c55e"/>

        <line x1="180" y1="60" x2="180" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d2"/>
        <polygon points="174,258 180,272 186,258" fill="#22c55e"/>

        <line x1="260" y1="60" x2="260" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d3"/>
        <polygon points="254,258 260,272 266,258" fill="#22c55e"/>

        <line x1="340" y1="60" x2="340" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d4"/>
        <polygon points="334,258 340,272 346,258" fill="#22c55e"/>

        <line x1="420" y1="60" x2="420" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d5"/>
        <polygon points="414,258 420,272 426,258" fill="#22c55e"/>

        <line x1="500" y1="60" x2="500" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-d6"/>
        <polygon points="494,258 500,272 506,258" fill="#22c55e"/>

        {/* ── RIGHTWARD FLOW through underground duct ── */}
        <line x1="62" y1="321" x2="628" y2="321" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-r1"/>
        <line x1="62" y1="330" x2="628" y2="330" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 10" className="fd-r2"/>
        <polygon points="622,315 636,321 622,327" fill="#22c55e"/>

        {/* ── UPWARD FLOW through exhaust stack ── */}
        <line x1="641" y1="310" x2="641" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="fd-u1"/>
        <line x1="651" y1="310" x2="651" y2="12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 10" className="fd-u2"/>
        <polygon points="635,12 641,0 647,12" fill="#22c55e"/>
      </svg>
    </div>
  );
}

export default function FullDowndraftBoothPage() {
  useSEO({
    title: "Full Downdraft Paint Booths | PFS Zenith Series | Manufactured in USA",
    description: "The PFS Zenith full-downdraft spray booth delivers the cleanest finish quality of any enclosed booth configuration. Uniform top-to-bottom airflow, full grated floor exhaust, UL 508A control panel. Custom sizes available. Manufactured in Santa Rosa, CA with ETL/UL listed and certified components.",
    canonical: "/products/paint-booths/full-downdraft",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
      {/* Hero: pfs_zenith_6008 — portrait photo, open-front, red Tesla, grated floor
          objectPosition: center 42% — centers on the PFS/ZENITH fascia and booth opening */}
      <section style={{
        position: "relative",
        minHeight: "clamp(340px, 55vh, 580px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <img
          src={HERO_IMG}
          alt="PFS Zenith Full Downdraft Spray Booth — open front view with grated floor pit and red Tesla inside"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 42%",
          }}
        />
        {/* Base darken */}
        <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.22)" }} />
        {/* Bottom-heavy gradient for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(4,8,20,0.97) 0%, rgba(4,8,20,0.82) 32%, rgba(4,8,20,0.42) 62%, rgba(4,8,20,0.06) 100%)",
        }} />
        {/* Blue accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "clamp(5rem, 12vw, 7rem)" }}>

          {/* Breadcrumb */}
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(0.65rem, 2vw, 0.72rem)", fontWeight: 700, letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "0.85rem",
          }}>PAINT BOOTHS — ENCLOSED</span>


          {/* Headline */}
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.4rem, 9vw, 5.2rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "700px",
            textShadow: "0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)",
          }}>
            Full Downdraft<br />
            Heated Spray<br />
            Booth — Quote
          </h1>

          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 2.5vw, 1.05rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            maxWidth: "480px",
            textShadow: "0 1px 6px rgba(0,0,0,0.8)",
          }}>
            ETL listed. UL 508A certified. Full ceiling plenum intake. Full grated floor exhaust into a concrete pit. The cleanest airflow pattern available — preferred for premium automotive, aerospace, and high-end industrial finishing. Ships nationally.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: "340px" }}>
            <Link href="/contact/request-a-quote?from=full-downdraft-booth" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%" }} data-animation="slideRight"> 
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(0.88rem, 3vw, 0.95rem)", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "1.1rem 2rem", cursor: "pointer", width: "100%",
              }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* CERT CAROUSEL */}
      <CertCarousel />

      {/* ── CONCRETE PIT REQUIREMENT NOTE ── */}
      <section style={{ background:"#fffbeb", padding:"1.5rem 0", borderBottom:"2px solid #f59e0b" }}>
        <div className="container">
          <div style={{ display:"flex",gap:"0.85rem",alignItems:"flex-start" }}>
            <AlertTriangle size={22} style={{ color:"#d97706",flexShrink:0,marginTop:"2px" }} />
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.95rem",fontWeight:800,color:"#92400e",letterSpacing:"0.04em",textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>
                Concrete Pit Required — Site Preparation Needed
              </span>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.84rem",color:"#78350f",lineHeight:1.65,margin:0 }}>
                The PFS Zenith full-downdraft booth exhausts through a <strong>full grated floor into a concrete pit</strong> poured into your slab. Unlike a semi-downdraft or cross-flow booth, this configuration requires site preparation before installation — your concrete contractor pours the pit to our supplied dimensions. PFS provides full pit specifications with every order. Ask your PFS engineer about pit requirements when requesting a quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT RENDER */}
      {/* White background render — clean product shot, no background distractions */}
      <section style={{ background:"#f5f5f5", padding:"clamp(2.5rem, 6vw, 4rem) 0 clamp(2rem, 5vw, 3rem)" }}>
        <div className="container">
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>FEATURED PRODUCT</span>
              <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,4vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Zenith Full Downdraft Spray Booth</h2>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem",justifyContent:"center",marginBottom:"0.75rem" }}>
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.35rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem" }}>PFS ZENITH SERIES</span>
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.35rem",background:"#dc2626",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem" }}><Flame size={10} /> HEATED OPTIONS</span>
              </div>
              <p data-animation="slideLeft" style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.95rem)",color:"#555",maxWidth:"540px",margin:"0 auto",lineHeight:1.7 }}>
                Full ceiling plenum intake. Full raised grated floor exhaust into concrete pit. ETL listed. UL 508A controls. Built to NFPA 33 standards. Standard sizes 14'W × 9–12'H × 24–33'L. Heated configurations available.
              </p>
            </div>
            {/* White background render — full width, contained */}
            <div style={{ width:"100%",maxWidth:"960px",overflow:"hidden",background:"#ffffff",border:"1px solid #e5e7eb" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Zenith Full Downdraft Spray Booth — white background angle render with open doors"
                style={{ width:"100%",height:"auto",display:"block",objectFit:"contain",objectPosition:"center",maxHeight:"520px" }}
              />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=full-downdraft-booth" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/paint-booths/enclosed" data-animation="slideRight">
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.82rem,2.5vw,0.88rem)",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2rem",cursor:"pointer" }}>SEE ALL ENCLOSED BOOTHS <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AIRFLOW DIAGRAM */}
      <section style={{ background:"#fff", padding:"clamp(2.5rem, 6vw, 4rem) 0" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>HOW IT WORKS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.65rem" }}>Full Downdraft Airflow Pattern</h2>
            <p data-animation="slideLeft" style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#666",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
              Air enters through a full ceiling plenum with intake filters spanning the entire roof. It flows straight down through the booth, exits through the grated floor into the concrete pit, travels through the underground exhaust duct, and exhausts up through the stack.
            </p>
          </div>
          <FullDowndraftAirflowSVG />
          <div style={{ textAlign:"center",marginTop:"1.75rem" }}>
            <Link href="/contact/request-a-quote?from=full-downdraft-booth" data-animation="slideRight">
              <span className="btn-glow">GET PRICING <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECS — collapsible */}
      <section style={{ background:"#fff", padding:"clamp(2rem,5vw,3rem) 0 clamp(1.5rem,4vw,2rem)", borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD FEATURES</span>
              <h2 data-animation="slideLeft"style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.2rem,3vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Every Unit Ships Fully Certified</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSpecsOpen(!specsOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:specsOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:specsOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.25rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap",minHeight:"48px" }}>
              {specsOpen ? <><ChevronUp size={15}/> HIDE</> : <><ChevronDown size={15}/> SEE SPECS</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.5rem",display:"flex",flexDirection:"column" }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.65rem" }}>{f.num}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.5rem" }}>{f.title}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.82rem",color:"#555",lineHeight:1.6,flex:1 }}>{f.body}</div>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-4 mb-5">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.5rem",display:"flex",flexDirection:"column" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.8rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.65rem" }}>{f.num}</div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.5rem" }}>{f.title}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.82rem",color:"#555",lineHeight:1.6,flex:1 }}>{f.body}</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign:"center" }}>
                <button onClick={() => setFeaturesOpen(!featuresOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",border:`2px solid ${BLUE}`,color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",minHeight:"48px" }}>
                  {featuresOpen ? <><ChevronUp size={15}/> SHOW LESS</> : <><ChevronDown size={15}/> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SIZES — collapsible */}
      <section style={{ background:"#f5f5f5", padding:"clamp(2rem,5vw,3rem) 0 clamp(1.5rem,4vw,2rem)", borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: sizesOpen ? "1.5rem" : 0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.2rem,3vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>14' Wide — 9, 10, or 12 ft Interior Height</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.25rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap",minHeight:"48px" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE</> : <><ChevronDown size={15}/> SEE SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"1.25rem" }}>
                {Object.keys(SIZES).map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(selectedHeight === h ? null : h)} style={{ display:"inline-flex",alignItems:"center",gap:"0.35rem",background:selectedHeight===h?BLUE:"#fff",border:`2px solid ${selectedHeight===h?BLUE:"#d0d8e8"}`,color:selectedHeight===h?"#fff":"#333",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",padding:"0.6rem 1.1rem",cursor:"pointer",transition:"all 0.15s",minHeight:"44px" }}>
                    {h}' Interior Height
                  </button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"1.25rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:BLUE,letterSpacing:"-0.01em" }}>{s.w} × {s.h}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.78rem",color:"#666",marginTop:"0.2rem" }}>{s.l} long</div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1rem 1.25rem",display:"flex",gap:"0.65rem",alignItems:"flex-start" }}>
                <AlertTriangle size={16} style={{ color:"#d97706",flexShrink:0,marginTop:"2px" }} />
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.82rem",color:"#555",lineHeight:1.6,margin:0 }}>
                  Custom sizes available. All sizes require a concrete pit poured to PFS-supplied dimensions. Contact your PFS engineer for custom sizing and pit specifications.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GALLERY — real photos only */}
      <section style={{ background:"#fff", padding:"clamp(2.5rem, 6vw, 4rem) 0" }}>
        <div className="container">
          <div style={{ marginBottom:"2rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>REAL INSTALLATIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Zenith — In the Field</h2>
            <p data-animation="slideLeft" style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#666",maxWidth:"480px",lineHeight:1.7 }}>
              Every photo is a real PFS installation — no CGI, no stock imagery. These are Zenith full-downdraft booths shipped and installed by PFS.
            </p>
          </div>
          <GalleryGrid images={GALLERY_IMGS} />
        </div>
      </section>

      {/* HEATED OPTIONS CTA */}
      <section style={{ background:"#0f1f3d", padding:"clamp(2.5rem, 6vw, 4rem) 0" }}>
        <div className="container">
          <div style={{ display:"flex",flexWrap:"wrap",gap:"2.5rem",alignItems:"center",justifyContent:"space-between" }}>
            <div style={{ flex:"1 1 320px" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#f87171",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>OPTIONAL UPGRADE</span>
              <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,4vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem",lineHeight:1.05 }}>Ask About Our<br/>Heated Booth Options</h2>
              <p data-animation="slideLeft" style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.84rem,2vw,0.96rem)",color:"rgba(255,255,255,0.72)",lineHeight:1.7,maxWidth:"480px",marginBottom:"1.5rem" }}>
                The PFS Zenith full-downdraft booth is available with a fully integrated heating system — spray mode, flash mode, and bake mode. Heated configurations include a gas-fired or electric air make-up unit, programmable cycle timers, and safety interlocks. Ask your PFS engineer about heated options when requesting a quote.
              </p>
              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=full-downdraft-booth" data-animation="slideLeft">
                  <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#dc2626",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2rem",cursor:"pointer" }}>ASK ABOUT HEATED <ArrowRight size={15}/></span>
                </Link>
                <Link href="/products/paint-booths/heated" data-animation="slideRight">
                  <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"rgba(255,255,255,0.85)",border:"1.5px solid rgba(255,255,255,0.35)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2rem",cursor:"pointer" }}>VIEW HEATED BOOTHS <ArrowRight size={15}/></span>
                </Link>
              </div>
            </div>
            <div style={{ flex:"0 0 auto",display:"flex",flexDirection:"column",gap:"0.75rem",minWidth:"220px" }}>
              {["Spray / Flash / Bake Mode","Gas-Fired or Electric AMU","Programmable Cycle Timers","Safety Interlocks Included","ETL Listed — Heated Config"].map((item) => (
                <div key={item} style={{ display:"flex",alignItems:"center",gap:"0.65rem" }}>
                  <Flame size={14} style={{ color:"#f87171",flexShrink:0 }} />
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:700,color:"rgba(255,255,255,0.88)",letterSpacing:"0.04em" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background:"#fff",padding:"3rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Pairs Well With a Mixing Room or Air Make-Up Unit</h2>
          <p data-animation="slideLeft" style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",maxWidth:"480px",margin:"0 auto 1.5rem",lineHeight:1.7 }}>
            Maximize throughput and compliance by pairing your full-downdraft booth with a dedicated mixing room for paint prep and an air make-up unit for tempered make-up air.
          </p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/products/mixing-rooms" data-animation="slideLeft">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW MIXING ROOMS <ArrowRight size={13}/></span>
            </Link>
            <Link href="/products/air-make-up-units" data-animation="slideRight">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW AIR MAKE-UP UNITS <ArrowRight size={13}/></span>
            </Link>
          </div>
        </div>
      </section>

            {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="RELATED PRODUCTS"
        label="Complete Your System"
        cards={PRODUCTS}
      />

      {/* FAQ SECTION — SEO: targets "how do downdraft paint booths work", "downdraft vs crossflow", "NFPA 33 spray booth", "custom spray booth" */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Full Downdraft Paint Booth — Common Questions</h2>
          </div>
          {[
            { q: "How does a full downdraft paint booth work?", a: "A full downdraft spray booth draws fresh, filtered air through a ceiling plenum spanning the entire roof. Air flows straight down through the booth at a controlled velocity — typically 50–100 FPM — carrying overspray away from the painter and the vehicle surface. The contaminated air exits through a full grated floor into an underground concrete pit, travels through an exhaust duct, and exhausts up through the stack. This top-to-bottom airflow pattern is the cleanest configuration available for enclosed spray booths." },
            { q: "What is the difference between a full downdraft and a semi-downdraft spray booth?", a: "A full downdraft booth (PFS Zenith) exhausts through the entire floor into a concrete pit — air exits uniformly across the full grated floor. A semi-downdraft booth (PFS Orion) takes air in through the front ceiling and exhausts through the rear floor, eliminating the need for a full-floor concrete pit. Full downdraft delivers the cleanest finish quality; semi-downdraft offers excellent finish quality at a lower installation cost." },
            { q: "Does a full downdraft booth require a concrete pit?", a: "Yes. The PFS Zenith full-downdraft booth exhausts through a full grated floor into a concrete pit poured into your slab. PFS provides complete pit specifications with every quote. Your concrete contractor pours the pit to our supplied dimensions before the booth is installed. If your facility cannot accommodate a concrete pit, consider the PFS Orion semi-downdraft or PFS Helios side-downdraft — both eliminate the full-floor pit requirement." },
            { q: "Is the PFS Zenith full downdraft booth NFPA 33 compliant?", a: "Yes. Every PFS Zenith full-downdraft spray booth is built to NFPA 33 standards for spray application of flammable and combustible materials. The booth ships with a UL 508A certified control panel, ETL/UL listed and certified components, and complies with OSHA 1910.94 ventilation requirements. PFS provides stamped engineering drawings for permit approval upon request." },
            { q: "Can PFS build a custom-size full downdraft booth?", a: "Yes. PFS manufactures full-downdraft booths in custom widths, heights, and lengths to fit your facility. Standard sizes run 14' wide × 9–12' interior height × 24–33' long, but PFS can engineer booths for aircraft, large vehicles, or non-standard footprints. Contact a PFS engineer with your facility dimensions for a custom quote." },
            { q: "What industries use full downdraft spray booths?", a: "Full downdraft spray booths are used wherever the highest finish quality is required: premium automotive refinishing, aerospace and aviation coating, military and defense finishing, high-end custom fabrication, and industrial manufacturing. The vertical airflow pattern minimizes contamination and provides the cleanest operator breathing zone of any enclosed booth configuration." }
          ].map((item, i) => (
            <details key={i} style={{ borderBottom:"1px solid #e5e7eb", padding:"1.25rem 0" }}>
              <summary style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.95rem,2.5vw,1.1rem)",fontWeight:800,color:"#111",letterSpacing:"0.01em",cursor:"pointer",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem" }}>
                {item.q}
                <span style={{ color:BLUE, flexShrink:0, fontSize:"1.4rem", fontWeight:300, lineHeight:1 }}>+</span>
              </summary>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#555",lineHeight:1.75,margin:"1rem 0 0",paddingRight:"1.5rem" }}>{item.a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How does a full downdraft paint booth work?", "acceptedAnswer": { "@type": "Answer", "text": "A full downdraft spray booth draws fresh, filtered air through a ceiling plenum spanning the entire roof. Air flows straight down at 50-100 FPM, carrying overspray away from the painter, and exits through a full grated floor into an underground concrete pit." } },
            { "@type": "Question", "name": "What is the difference between a full downdraft and a semi-downdraft spray booth?", "acceptedAnswer": { "@type": "Answer", "text": "A full downdraft booth exhausts through the entire floor into a concrete pit. A semi-downdraft takes air in through the front ceiling and exhausts through the rear floor, eliminating the need for a full-floor concrete pit." } },
            { "@type": "Question", "name": "Does a full downdraft booth require a concrete pit?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The PFS Zenith requires a concrete pit poured into your slab. PFS provides complete pit specifications with every quote." } },
            { "@type": "Question", "name": "Is the PFS Zenith full downdraft booth NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every PFS Zenith booth is built to NFPA 33 standards with a UL 508A certified control panel, ETL/UL listed and certified components, and OSHA 1910.94 compliant ventilation." } },
            { "@type": "Question", "name": "Can PFS build a custom-size full downdraft booth?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Standard sizes run 14' wide x 9-12' interior height x 24-33' long, but custom sizes are available for aircraft, large vehicles, or non-standard footprints." } }
          ]
        }) }} />
      </section>

      {/* INDUSTRIES SERVED — internal linking */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e2e8f0" }}>
        <div className="container">
          <p style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif", fontSize:"0.75rem", fontWeight:700, color:BLUE, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.6rem" }}>INDUSTRIES SERVED</p>
          <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif", fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:800, color:BLUE, marginBottom:"1.5rem" }}>Who Uses Full Downdraft Booths?</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:"0.75rem" }} data-animation="fadeIn">
            {[
              { label:"Aerospace & Defense", href:"/industries/aerospace-defense" },
              { label:"Automotive Manufacturing", href:"/industries/automotive-manufacturing" },
              { label:"Collision Repair", href:"/industries/collision-repair" },
              { label:"Military & Government", href:"/industries/government-military" },
              { label:"Heavy Equipment", href:"/industries/heavy-equipment" },
              { label:"Industrial Manufacturing", href:"/industries/industrial-manufacturing" },
            ].map((ind) => (
              <a key={ind.href} href={ind.href} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.85rem 1rem", background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${BLUE}`, textDecoration:"none", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.88rem", fontWeight:700, color:BLUE, letterSpacing:"0.04em", textTransform:"uppercase" }}>
                {ind.label} →
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* BOTTOM CTA */}
      <section style={{ background:BLUE, padding:"clamp(2.5rem, 6vw, 4rem) 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,4vw,2.8rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>
            Ready to Quote Your Full Downdraft Booth?
          </h2>
          <p data-animation="slideLeft" style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.88rem,2vw,1rem)",color:"rgba(255,255,255,0.75)",maxWidth:"480px",margin:"0 auto 2rem",lineHeight:1.7 }}>
            ETL listed. UL 508A certified. Concrete pit specs included with every quote. Ships nationally.
          </p>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
            <Link href="/contact/request-a-quote?from=full-downdraft-booth" data-animation="slideLeft">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.88rem,2.5vw,0.95rem)",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"2px solid rgba(255,255,255,0.5)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.88rem,2.5vw,0.95rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA BAR */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:50,display:"flex",borderTop:"2px solid #e5e7eb",boxShadow:"0 -4px 16px rgba(0,0,0,0.12)" }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",padding:"1rem 0.5rem",textDecoration:"none",minHeight:"56px" }}>
          📞 (888) 545-7715
        </a>
        <Link href="/contact/request-a-quote?from=full-downdraft-booth" style={{ flex:2,textDecoration:"none" }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING <ArrowRight size={14}/></span>
        </Link>
      </div>
      {/* Bottom padding for mobile sticky bar */}
      <div className="md:hidden" style={{ height:"56px" }} />

    </div>
  );
}
