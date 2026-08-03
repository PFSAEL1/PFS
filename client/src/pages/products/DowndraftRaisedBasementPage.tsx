/*
 * Downdraft Raised Basement Spray Booths — PFS Zenith Series
 * Route: /products/paint-booths/downdraft-raised-basement
 * Template #3 — All Other Products
 *
 * KEY DIFFERENTIATOR vs Full Downdraft:
 *   Full Downdraft    = air exhausts into a CONCRETE PIT poured into the slab (site prep required)
 *   Raised Basement   = air exhausts into a RAISED STEEL FLOOR PLENUM sitting ON TOP of the slab
 *                       No pit. No concrete work. Install on any existing concrete floor.
 *
 * Airflow:
 *   1. Full ceiling plenum intake (same as full downdraft)
 *   2. Vertical downward flow through booth (same as full downdraft)
 *   3. Air enters raised grated floor → below-floor steel plenum (NOT a pit)
 *   4. Travels through duct to exhaust stack
 *
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
// Reuse the best Zenith real-install photos — same booth family, same airflow quality
const HERO_IMG     = "/manus-storage/zenith_rebranded_header_v2_b3111f77_3196eca3.png";
const FEATURED_IMG = "/manus-storage/zenith_downdraft_angle_white_soft_3ea9f366_295a56ea.png";

// Gallery — real Zenith installation photos (same hardware, raised floor variant)
const GALLERY_IMGS = [
  { src: "/manus-storage/zenith_rebranded_header_v2_b3111f77_3196eca3.png",        alt: "PFS Zenith Raised Basement — front-facing install, ramps visible",        pos: "center 45%" },
  { src: "/manus-storage/DownDraftwBasement_9a4ddc05.png",                alt: "PFS Zenith Raised Basement — open doors, grated floor, side plenums",    pos: "center 50%" },
  { src: "/manus-storage/InsideofraisedbasementDD_a012b178.png",          alt: "PFS Zenith Raised Basement — interior view, full grated floor, ceiling", pos: "center 50%" },
  { src: "/manus-storage/pfs-downdraft-raised-basement-booth_2c67ebec.jpeg", alt: "PFS downdraft raised basement booth — open doors, ramps, grated floor", pos: "center 50%" },
  { src: "/manus-storage/zenith_downdraft_angle_white_soft_3ea9f366_295a56ea.png",    alt: "PFS Zenith downdraft raised basement booth — clean white render, angled view",                pos: "center 50%" },
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
  { num: "03", title: "Full Ceiling Plenum Intake",       body: "Air enters through a full-length ceiling plenum with intake filters spanning the entire roof. Uniform, top-to-bottom airflow eliminates dead zones and delivers the same premium finish quality as a concrete-pit full downdraft." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "Raised Steel Floor — No Pit Required", body: "Air exhausts through a raised grated steel floor into a below-floor steel plenum that sits directly on your existing concrete slab. No concrete cutting, no pit construction, no site preparation beyond a flat floor." },
  { num: "05", title: "Below-Floor Plenum to Exhaust Stack",  body: "The raised plenum channels exhausted air through a duct to the exhaust stack. The entire system is self-contained above the slab — ideal for leased facilities, retrofit installations, and sites where concrete work is not feasible." },
  { num: "06", title: "CID2 Lighting — 4-Tube Fixtures",      body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination across the full booth." },
  { num: "07", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters in the floor grating. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "08", title: "We Ship Nationally",                   body: "PFS raised-basement downdraft booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
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
  { label: "Semi-Downdraft Booths", href: "/products/paint-booths/semi-downdraft", img: "/manus-storage/orion-semi-down-epoxy_9144ba19.png", desc: "Rear-angled exhaust for versatile applications — a step up from crossflow airflow." },
];

/* ── RAISED BASEMENT AIRFLOW SVG ── */
/* Airflow: DOWN through booth → into raised floor plenum (above slab) → right to exhaust stack */
function RaisedBasementAirflowSVG() {
  return (
    <div style={{ width:"100%", maxWidth:"720px", margin:"0 auto" }}>
      <svg viewBox="0 0 760 430" style={{ width:"100%", height:"auto", display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes rbDown {
            0%   { stroke-dashoffset: 200; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          @keyframes rbRight {
            0%   { stroke-dashoffset: 300; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          @keyframes rbUp {
            0%   { stroke-dashoffset: 200; opacity: 0.25; }
            40%  { opacity: 1; }
            100% { stroke-dashoffset: 0;   opacity: 0.25; }
          }
          .rb-d1 { animation: rbDown  2.0s linear infinite 0.00s; }
          .rb-d2 { animation: rbDown  2.0s linear infinite 0.33s; }
          .rb-d3 { animation: rbDown  2.0s linear infinite 0.66s; }
          .rb-d4 { animation: rbDown  2.0s linear infinite 1.00s; }
          .rb-d5 { animation: rbDown  2.0s linear infinite 1.33s; }
          .rb-d6 { animation: rbDown  2.0s linear infinite 1.66s; }
          .rb-r1 { animation: rbRight 2.4s linear infinite 0.00s; }
          .rb-r2 { animation: rbRight 2.4s linear infinite 0.60s; }
          .rb-u1 { animation: rbUp    2.2s linear infinite 0.00s; }
          .rb-u2 { animation: rbUp    2.2s linear infinite 0.55s; }
        `}</style>

        {/* ── CEILING INTAKE FILTERS (full width) ── */}
        {[68,148,228,308,388,468,548].map((x,i) => (
          <rect key={i} x={x} y="36" width="68" height="24" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        ))}
        <text x="350" y="26" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>

        {/* ── BOOTH OUTLINE ── */}
        <rect x="60" y="60" width="540" height="220" fill="none" stroke="#222" strokeWidth="3"/>

        {/* ── RAISED GRATED FLOOR (above slab — steel plenum) ── */}
        {/* Plenum box — sits ON TOP of slab, not below it */}
        <rect x="60" y="280" width="540" height="40" rx="2" fill="#d1fae5" stroke="#16a34a" strokeWidth="2"/>
        {/* Grating lines */}
        {[80,110,140,170,200,230,260,290,320,350,380,410,440,470,500,530,560].map((x,i) => (
          <line key={i} x1={x} y1="280" x2={x} y2="295" stroke="#9ca3af" strokeWidth="1"/>
        ))}
        <text x="330" y="296" textAnchor="middle" fontSize="10" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#166534">RAISED STEEL FLOOR PLENUM — SITS ON EXISTING SLAB</text>

        {/* ── CONCRETE SLAB (below plenum) ── */}
        <rect x="60" y="320" width="540" height="18" rx="2" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5"/>
        <text x="330" y="353" textAnchor="middle" fontSize="10" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#6b7280">EXISTING CONCRETE SLAB — NO CUTTING OR PIT REQUIRED</text>

        {/* ── EXHAUST DUCT (from plenum to stack, above slab) ── */}
        <rect x="600" y="280" width="30" height="40" rx="2" fill="#d1fae5" stroke="#16a34a" strokeWidth="1.5"/>

        {/* ── EXHAUST STACK (right side, above ground) ── */}
        <rect x="630" y="8" width="32" height="312" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="646" y="380" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="646" y="393" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>

        {/* ── DOWNWARD FLOW ARROWS (6 columns, staggered) ── */}
        <line x1="100" y1="60" x2="100" y2="278" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-d1"/>
        <polygon points="94,276 100,290 106,276" fill="#22c55e"/>

        <line x1="180" y1="60" x2="180" y2="278" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-d2"/>
        <polygon points="174,276 180,290 186,276" fill="#22c55e"/>

        <line x1="260" y1="60" x2="260" y2="278" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-d3"/>
        <polygon points="254,276 260,290 266,276" fill="#22c55e"/>

        <line x1="340" y1="60" x2="340" y2="278" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-d4"/>
        <polygon points="334,276 340,290 346,276" fill="#22c55e"/>

        <line x1="420" y1="60" x2="420" y2="278" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-d5"/>
        <polygon points="414,276 420,290 426,276" fill="#22c55e"/>

        <line x1="500" y1="60" x2="500" y2="278" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-d6"/>
        <polygon points="494,276 500,290 506,276" fill="#22c55e"/>

        {/* ── RIGHTWARD FLOW through raised plenum ── */}
        <line x1="62" y1="298" x2="628" y2="298" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-r1"/>
        <line x1="62" y1="308" x2="628" y2="308" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 10" className="rb-r2"/>
        <polygon points="622,292 636,298 622,304" fill="#22c55e"/>

        {/* ── UPWARD FLOW through exhaust stack ── */}
        <line x1="641" y1="318" x2="641" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="rb-u1"/>
        <line x1="651" y1="318" x2="651" y2="12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="18 10" className="rb-u2"/>
        <polygon points="635,12 641,0 647,12" fill="#22c55e"/>

        {/* ── STEP CIRCLES ── */}
        <circle cx="350" cy="37" r="13" fill={BLUE}/>
        <text x="350" y="42" textAnchor="middle" fontSize="12" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">1</text>
        <circle cx="350" cy="165" r="13" fill={BLUE}/>
        <text x="350" y="170" textAnchor="middle" fontSize="12" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">2</text>
        <circle cx="200" cy="300" r="13" fill="#16a34a"/>
        <text x="200" y="305" textAnchor="middle" fontSize="12" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">3</text>
        <circle cx="646" cy="165" r="13" fill={BLUE}/>
        <text x="646" y="170" textAnchor="middle" fontSize="12" fontFamily="'Barlow Condensed',sans-serif" fontWeight="900" fill="#fff">4</text>

        {/* ── BOTTOM CAPTION ── */}
        <text x="350" y="415" textAnchor="middle" fontSize="9.5" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#555" letterSpacing="0.5">
          ① CEILING INTAKE  ② DOWNWARD FLOW  ③ RAISED FLOOR PLENUM (ON SLAB)  ④ EXHAUST STACK — NO PIT REQUIRED
        </text>
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

export default function DowndraftRaisedBasementPage() {
  useSEO({
    title: "Raised Basement Downdraft Booths | No-Pit Downdraft Paint Booths | PFS",
    description: "PFS raised basement downdraft spray booths deliver full downdraft airflow without a concrete floor pit. A raised grated floor sits above a shallow basement plenum — no excavation required. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/downdraft-raised-basement",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
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
          alt="PFS Zenith Downdraft Raised Basement Spray Booth — front-facing real installation"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
        />
        <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.22)" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(4,8,20,0.97) 0%, rgba(4,8,20,0.82) 32%, rgba(4,8,20,0.42) 62%, rgba(4,8,20,0.06) 100%)",
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "clamp(5rem, 12vw, 7rem)" }}>

          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem",
          }}>PAINT BOOTHS — ENCLOSED</span>
          <h1 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "680px",
          }}>
            Downdraft<br />
            Raised Basement<br />
            Spray Booths<br />
            Built to Last
          </h1>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)",
            color: "#6fa3e0", borderRadius: "2px",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "0.3rem 0.75rem", marginBottom: "1.25rem",
          }}>PFS ZENITH SERIES</span>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: "340px" }}>
            <Link href="/contact/request-a-quote?from=full-downdraft-booth">
              <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%" }}>
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

      {/* FEATURED BOOTH */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED PAINT BOOTH</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Zenith Downdraft Raised Basement Booth</h2>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem",marginBottom:"0.75rem" }}>PFS ZENITH SERIES</span>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
                Full downdraft airflow. ETL listed. UL 508A controls. Built to NFPA 33 standards. No concrete pit — raised steel floor plenum sits on your existing slab. Standard sizes 14'W × 9–12'H × 24–33'L.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"900px",overflow:"hidden",borderRadius:"2px" }}>
              <img src={FEATURED_IMG} alt="PFS Zenith Series Downdraft Raised Basement Spray Booth" style={{ width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=full-downdraft-booth">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/paint-booths/enclosed">
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>SEE ALL ENCLOSED BOOTHS <ArrowRight size={15}/></span>
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
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.65rem" }}>Raised Basement Downdraft Airflow Pattern</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#666",maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
              Air enters through a full ceiling plenum and flows straight down — identical to a concrete-pit full downdraft. The difference is at the floor: instead of exhausting into a pit poured into the slab, air enters a <strong>raised steel plenum sitting on top of your existing concrete</strong>, then travels through the duct to the exhaust stack.
            </p>
          </div>
          <RaisedBasementAirflowSVG />
          <div style={{ textAlign:"center",marginTop:"1.75rem" }}>
            <Link href="/contact/request-a-quote?from=full-downdraft-booth">
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
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.2rem,3vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Every Unit Ships Fully Certified</h2>
            </div>
            <button onClick={() => setSpecsOpen(!specsOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:specsOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:specsOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.25rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap",minHeight:"48px" }}>
              {specsOpen ? <><ChevronUp size={15}/> HIDE SPECS</> : <><ChevronDown size={15}/> SEE STANDARD SPECS</>}
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
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.2rem,3vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>14' Wide — 9, 10, or 12 ft Interior Height</h2>
            </div>
            <button onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.25rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap",minHeight:"48px" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE SIZES</> : <><ChevronDown size={15}/> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"1.25rem" }}>
                {Object.keys(SIZES).map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(h === selectedHeight ? null : h)} style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:selectedHeight===h?BLUE:"#fff",border:`2px solid ${BLUE}`,color:selectedHeight===h?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",padding:"0.6rem 1.1rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",minHeight:"44px" }}>
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
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.82rem",color:"#888",lineHeight:1.6,margin:0 }}>
                Custom sizes available. Contact your PFS engineer for custom sizing and raised floor specifications.
              </p>
            </>
          )}
        </div>
      </section>

            {/* GALLERY */}
      <section style={{ background:"#fff",padding:"4rem 0" }}>
        <div className="container">
          <div style={{ marginBottom:"2rem" }}>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
        </div>
      </section>
      {/* HEATED OPTIONS */}
      <section style={{ background:"#111",padding:"3rem 0",borderTop:`4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>ADD-ON</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Heated Options Available</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",maxWidth:"480px",margin:"0 auto 1.75rem",lineHeight:1.7 }}>
            Add a direct-fired or indirect-fired heat system to your raised-basement downdraft booth for accelerated cure times. Blanket intake filter upgrades included with all heated configurations.
          </p>
          <Link href="/contact/request-a-quote?from=full-downdraft-booth">
            <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>ASK ABOUT HEATED OPTIONS <ArrowRight size={15}/></span>
          </Link>
        </div>
      </section>
      {/* PAIRS WELL WITH */}
      <section style={{ background:"#fff",padding:"3rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Pairs Well With a Mixing Room or Air Make-Up Unit</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",maxWidth:"480px",margin:"0 auto 1.5rem",lineHeight:1.7 }}>
            Maximize throughput and compliance by pairing your raised-basement booth with a dedicated mixing room for paint prep and an air make-up unit for tempered make-up air.
          </p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/products/mixing-rooms">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW MIXING ROOMS <ArrowRight size={13}/></span>
            </Link>
            <Link href="/products/air-make-up-units">
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

      {/* MOBILE STICKY CTA BAR */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:50,display:"flex",borderTop:"2px solid #e5e7eb",boxShadow:"0 -4px 16px rgba(0,0,0,0.12)" }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",padding:"1rem 0.5rem",textDecoration:"none",minHeight:"56px" }}>
          📞 (888) 545-7715
        </a>
        <Link href="/contact/request-a-quote?from=full-downdraft-booth" style={{ flex:2,textDecoration:"none" }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING <ArrowRight size={14}/></span>
        </Link>
      </div>
      <div className="md:hidden" style={{ height:"56px" }} />

    </div>
  );
}
