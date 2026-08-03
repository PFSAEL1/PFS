/*
 * Open Face Paint Booths — PFS Orion Open Face Series
 * Layout mirrors CrossFlowBoothPage.tsx — same section order, same design tokens
 * Route: /products/paint-booths/open-face
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── ASSETS ── */
const HERO_VIDEO   = "/manus-storage/pfs-open-face-booth-hero-v2_1c16c291.mp4";
const HERO_POSTER  = "/manus-storage/pfs-open-face-render_2a9e6ee7.png";
const FEATURED_IMG = "/manus-storage/openface_front_white_hd_d30bdd79.webp";

const GALLERY_IMGS = [
  // ── REAL INSTALL PHOTOS FIRST ──
  { src: "/manus-storage/openface-exterior-pfs-logo_dc802808.png",          alt: "PFS open face booth — exterior side view with PFS logo and open front",               pos: "center 50%" },
  { src: "/manus-storage/openface-frontview-filters_6ea7922c.png",          alt: "PFS open face booth — full front view showing green exhaust filter wall",             pos: "center 50%" },
  { src: "/manus-storage/openface-install-wide_e511c651.jpg",               alt: "PFS open face booth installation — wide shop view with booth in place",                pos: "center 50%" },
  { src: "/manus-storage/openface-install-side_d0334da6.jpg",               alt: "PFS open face booth installation — side angle showing PFS branding and open front",    pos: "center 50%" },
  { src: "/manus-storage/openface-interior-ceiling_e309b659.png",          alt: "PFS open face booth interior — ceiling lights and green exhaust filter wall",         pos: "center 40%" },
  { src: "/manus-storage/IMG_9325(1)_94175ee9.jpg",                     alt: "PFS open face spray booth in use — two operators finishing chairs in production",      pos: "center 40%" },
  { src: "/manus-storage/IMG_3186_8c282fe6.jpg",                        alt: "PFS open face booth installation — real field photo showing open front and exhaust",   pos: "center 40%" },
  { src: "/manus-storage/pfs-open-face-real-1_c04e784a.jpeg",           alt: "PFS open face spray booth — lit interior with fiberglass exhaust filters",            pos: "center 40%" },
  { src: "/manus-storage/pfs-open-face-real-2_23312420.jpeg",           alt: "PFS open face spray booth — exterior front view with exhaust stack",                  pos: "center 50%" },
  // ── RENDERS ──
  { src: "/manus-storage/openface14_chairs_white_hd_d4d1c048.webp",   alt: "PFS Orion Open Face booth — white background render with chairs, angled view",       pos: "center 50%" },
  { src: "/manus-storage/openface14_chairs_epoxy_v2_hd_8448a8ad.webp", alt: "PFS Orion Open Face booth — epoxy floor render with chairs and bench, angled view",   pos: "center 50%" },
  { src: "/manus-storage/openface_chairs_epoxy_v3_hd_be637db2.webp",   alt: "PFS Orion Open Face booth — epoxy floor render, dark studio background",              pos: "center 50%" },
  { src: "/manus-storage/openface_front_white_hd_d30bdd79.webp",       alt: "PFS Orion Open Face booth — front view render, white background, filter wall visible", pos: "center 50%" },
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
const FEATURES_VISIBLE = [
  { num: "02", title: "UL 508A Control Panel",             body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
  { num: "03", title: "UL Listed Tube Axial Fans",         body: "High-efficiency, UL listed tube axial fans move air through the booth at consistent face velocity — pulling overspray away from the operator and toward the exhaust filter wall." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "CID2 Lighting — 4-Tube Fixtures",           body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination across the full work area." },
  { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters",  body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "06", title: "Galvanized or Powder Coated Steel",          body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "07", title: "Open Front Access",                          body: "Unobstructed front opening allows large, irregularly shaped parts and assemblies to be loaded without disassembly. Ideal for high-throughput production environments." },
  { num: "08", title: "We Ship Nationally",                         body: "PFS open face booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

/* ── SIZES: two-level selector (Width → Height → Depths) ──
   Data from the PFS-OF catalog. Depths shown per Width+Height combo.
   Format: SIZES[width][height] = depth[]
*/
const SIZES: Record<string, Record<string, string[]>> = {
  "6'": {
    "7'":  ["6'", "9'", "12'"],
    "8'":  ["6'", "9'", "12'"],
    "10'": ["6'", "9'", "12'"],
    "12'": ["6'", "9'", "12'"],
  },
  "8'": {
    "7'":  ["6'", "9'", "12'"],
    "8'":  ["6'", "9'", "12'"],
    "10'": ["6'", "9'", "12'"],
    "12'": ["6'", "9'", "12'"],
  },
  "10'": {
    "7'":  ["6'", "9'", "12'"],
    "8'":  ["6'", "9'", "12'"],
    "10'": ["6'", "9'", "12'"],
    "12'": ["6'"],
  },
};

const WIDTH_KEYS  = ["6'", "8'", "10'"];
const HEIGHT_KEYS = ["7'", "8'", "10'", "12'"];

/* ── RELATED PRODUCTS ── */
const PRODUCTS = [
  { label: "Air Make-Up Units",    href: "/products/air-make-up-units",           img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                     desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms",         href: "/products/mixing-rooms",               img: "/manus-storage/IMG_0498_a98f5f38.jpg",          desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations",        href: "/products/prep-support/prep-stations",              img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",     desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Enclosed Paint Booths",href: "/products/paint-booths/enclosed",      img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg",        desc: "Full-enclosure booths for superior overspray containment and finish quality." },
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
    <section style={{ background:"#ffffff",padding:"0",overflow:"hidden",borderTop:`4px solid ${BLUE}`,borderBottom:"3px solid #111",boxShadow:"0 4px 0 0 #111" }}>
      <div style={{ overflow:"hidden",position:"relative" }}>
        <div style={{ position:"absolute",left:0,top:0,bottom:0,width:"80px",zIndex:2,background:"linear-gradient(to right, #ffffff, transparent)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",right:0,top:0,bottom:0,width:"80px",zIndex:2,background:"linear-gradient(to left, #ffffff, transparent)",pointerEvents:"none" }} />
        <div ref={trackRef} style={{ display:"flex",alignItems:"center",gap:"0",whiteSpace:"nowrap",willChange:"transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display:"inline-flex",alignItems:"center",gap:"0.75rem",padding:"1.1rem 2.5rem",borderRight:"1px solid #e5e7eb",flexShrink:0 }}>
              <img src={cert.img} alt={cert.title} style={{ height:`${cert.imgH}px`,width:"auto",objectFit:"contain",flexShrink:0 }} />
              <div>
                <div style={{ fontFamily:"'Chakra Petch', 'Barlow Condensed', sans-serif",fontSize:"0.82rem",fontWeight:800,color:"#111",letterSpacing:"0.04em",textTransform:"uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily:"'Archivo Narrow', 'Inter', sans-serif",fontSize:"0.72rem",color:"#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OPEN FACE AIRFLOW SVG ──
   Adapted from CrossFlowAirflowSVG — front wall removed (open face).
   Air enters from the open front, flows horizontally to the exhaust filter wall.
*/
function OpenFaceAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"700px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 320" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes ofFlowRight { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes ofFlowUp    { 0%{stroke-dashoffset:80;opacity:0.3}  50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .ofa1{animation:ofFlowRight 2.0s linear infinite}
          .ofa2{animation:ofFlowRight 2.0s linear infinite 0.5s}
          .ofa3{animation:ofFlowRight 2.0s linear infinite 1.0s}
          .ofau{animation:ofFlowUp 1.8s linear infinite}
        `}</style>

        {/* Booth outline — left wall open (no left wall drawn), right wall = exhaust */}
        {/* Top wall */}
        <line x1="80" y1="60" x2="600" y2="60" stroke="#222" strokeWidth="3"/>
        {/* Bottom wall */}
        <line x1="80" y1="260" x2="600" y2="260" stroke="#222" strokeWidth="3"/>
        {/* Right wall (exhaust) */}
        <line x1="600" y1="60" x2="600" y2="260" stroke="#222" strokeWidth="3"/>
        {/* Left side — open front indicator (dashed) */}
        <line x1="80" y1="60" x2="80" y2="260" stroke="#aaa" strokeWidth="2" strokeDasharray="8 6"/>

        {/* Open front label */}
        <text x="40" y="155" textAnchor="middle" fontSize="10" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#888">OPEN</text>
        <text x="40" y="168" textAnchor="middle" fontSize="10" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#888">FRONT</text>

        {/* Exhaust filter panels on right wall */}
        <rect x="598" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="598" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="598" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>

        {/* Exhaust stack on top right */}
        <rect x="590" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>

        {/* Airflow arrows — left to right */}
        <line x1="82" y1="100" x2="598" y2="100" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="ofa1"/>
        <polygon points="598,94 614,100 598,106" fill="#22c55e"/>
        <line x1="82" y1="160" x2="598" y2="160" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="ofa2"/>
        <polygon points="598,154 614,160 598,166" fill="#22c55e"/>
        <line x1="82" y1="220" x2="598" y2="220" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="ofa3"/>
        <polygon points="598,214 614,220 598,226" fill="#22c55e"/>

        {/* Exhaust up arrow */}
        <line x1="605" y1="60" x2="605" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 8" className="ofau"/>
        <polygon points="599,12 605,0 611,12" fill="#22c55e"/>

        {/* Labels */}
        <text x="660" y="155" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="660" y="168" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="605" y="295" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="605" y="308" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">STACK</text>
        <text x="350" y="300" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">ORION OPEN FACE SERIES</text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function OpenFaceBoothPage() {
  useSEO({
    title: "Open Face Spray Booths | Industrial Paint Walls & Open Booths | PFS",
    description: "PFS open face spray booths and paint walls provide a code-compliant, ventilated finishing environment for large parts and production lines. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/open-face",
  });

  const [featuresOpen,  setFeaturesOpen]  = useState(false);
  const [specsOpen,     setSpecsOpen]     = useState(false);
  const [sizesOpen,     setSizesOpen]     = useState(false);
  const [selectedWidth, setSelectedWidth] = useState<string>("8'");
  const [selectedHeight, setSelectedHeight] = useState<string>("8'");

  // Available heights for selected width
  const availableHeights = selectedWidth ? Object.keys(SIZES[selectedWidth] || {}) : HEIGHT_KEYS;
  // Available depths for selected width + height
  const availableDepths: string[] = (selectedWidth && selectedHeight && SIZES[selectedWidth]?.[selectedHeight]) || [];

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED VIDEO HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(340px, 55vh, 580px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <video preload="auto"
          autoPlay muted loop playsInline
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:BLUE,zIndex:3 }} />
        <div className="container" style={{ position:"relative",zIndex:2,paddingTop:"8rem",paddingBottom:"3.5rem" }}>
          <nav style={{ display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.5rem",flexWrap:"wrap" }}>
            {[{ label:"Products",href:"/products" },{ label:"Paint Booths",href:"/products/paint-booths" },{ label:"Open Face" }].map((crumb, i, arr) => (
              <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem" }}>
                {crumb.href
                  ? <Link href={crumb.href}><span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.12em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",cursor:"pointer" }}>{crumb.label}</span></Link>
                  : <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.12em",color:"rgba(255,255,255,0.75)",textTransform:"uppercase" }}>{crumb.label}</span>
                }
                {i < arr.length - 1 && <span style={{ color:"rgba(255,255,255,0.3)",fontSize:"0.7rem" }}>›</span>}
              </span>
            ))}
          </nav>
          <span style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",display:"block",marginBottom:"1rem" }}>PAINT BOOTHS — OPEN FACE</span>
          <h1 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(2.6rem,7vw,5rem)",fontWeight:800,color:"#fff",lineHeight:1.0,letterSpacing:"-0.01em",marginBottom:"1rem",maxWidth:"680px" }}>
            Open Face<br />
            Paint Booths<br />
            Built to Last
          </h1>
          <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"rgba(27,58,107,0.75)",border:"1px solid rgba(107,163,224,0.4)",color:"#6fa3e0",borderRadius:"2px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.3rem 0.75rem",marginBottom:"1.25rem" }}>ORION OPEN FACE SERIES</span>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:"2.5rem",maxWidth:"500px" }}>
            manufactured in the USA with ETL/UL listed and UL 508A certified components. Unobstructed front access for large and irregularly shaped parts — cross-draft airflow keeps overspray away from the operator. Ships nationally.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
            <Link href="/contact/request-a-quote?from=open-face-booth">
              <span className="btn-glow" style={{ width:"100%",maxWidth:"320px",justifyContent:"center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width:"100%",maxWidth:"320px" }}>
              <span className="btn-glow-white" style={{ width:"100%",maxWidth:"320px",justifyContent:"center" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── FEATURED BOOTH — front view render ── */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED PAINT BOOTH</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>Orion Open Face Series</h2>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem",marginBottom:"0.75rem" }}>ORION OPEN FACE SERIES</span>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
                Cross-draft airflow. manufactured in the USA with ETL/UL listed components. UL 508A controls. Built to NFPA 33 standards. Available in standard and custom widths. Open front access for large parts and assemblies.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"960px",overflow:"hidden",borderRadius:"2px",background:"#fff",padding:"2rem",boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              <img src={FEATURED_IMG} alt="PFS Orion Open Face Spray Booth — front view render" style={{ width:"100%",height:"auto",display:"block",objectFit:"contain" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=open-face-booth">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/paint-booths">
                <span className="btn-outline">SEE ALL PAINT BOOTHS <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AIRFLOW DIAGRAM ── */}
      <section style={{ background:"#fff",padding:"3rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>HOW IT WORKS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Open Face Cross-Draft Airflow</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"#666",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
              Air enters freely through the open front and exits through exhaust filters on the rear wall — horizontal cross-draft airflow pulls overspray away from the operator at all times.
            </p>
          </div>
          <OpenFaceAirflowSVG />
        </div>
      </section>

      {/* ── SPECS — collapsible ── */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:specsOpen?"2rem":0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD FEATURES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Every Unit Ships Fully Certified</h2>
            </div>
            <button onClick={() => setSpecsOpen(!specsOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:specsOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:specsOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}>
              {specsOpen ? <><ChevronUp size={15}/> HIDE SPECS</> : <><ChevronDown size={15}/> SEE STANDARD SPECS</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column" }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.6,flex:1,marginBottom:"1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=open-face-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.6,flex:1,marginBottom:"1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=open-face-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign:"center" }}>
                <button onClick={() => setFeaturesOpen(!featuresOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",border:`2px solid ${BLUE}`,color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.75rem",cursor:"pointer" }}>
                  {featuresOpen ? <><ChevronUp size={15}/> SHOW LESS</> : <><ChevronDown size={15}/> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── SIZES — two-level selector (Width → Height → Depths) ── */}
      <section style={{ background:"#fff",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:sizesOpen?"2rem":0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD SIZES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Find Your Configuration</h2>
            </div>
            <button onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE SIZES</> : <><ChevronDown size={15}/> SEE STANDARD SIZES</>}
            </button>
          </div>

          {sizesOpen && (
            <>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",marginBottom:"1.75rem" }}>
                Select a width and height — available depths appear below. Custom sizes available on request.
              </p>

              {/* Step 1: Width tabs */}
              <div style={{ marginBottom:"1.5rem" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",marginBottom:"0.6rem" }}>STEP 1 — SELECT WIDTH</div>
                <div style={{ display:"inline-flex",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",flexWrap:"wrap" }}>
                  {WIDTH_KEYS.map((w, i, arr) => (
                    <button
                      key={w}
                      onClick={() => { setSelectedWidth(w); setSelectedHeight("8'"); }}
                      style={{ padding:"0.75rem 1.75rem",background:selectedWidth===w?BLUE:"transparent",color:selectedWidth===w?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:i<arr.length-1?`1px solid ${BLUE}`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
                    >{w} WIDE</button>
                  ))}
                </div>
              </div>

              {/* Step 2: Height tabs */}
              {selectedWidth && (
                <div style={{ marginBottom:"1.75rem" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",marginBottom:"0.6rem" }}>STEP 2 — SELECT HEIGHT</div>
                  <div style={{ display:"inline-flex",border:`2px solid #d0d8e8`,overflow:"hidden",borderRadius:"2px",flexWrap:"wrap" }}>
                    {availableHeights.map((h, i, arr) => (
                      <button
                        key={h}
                        onClick={() => setSelectedHeight(h)}
                        style={{ padding:"0.65rem 1.5rem",background:selectedHeight===h?"#111":"transparent",color:selectedHeight===h?"#fff":"#444",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:i<arr.length-1?`1px solid #d0d8e8`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
                      >{h} HIGH</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Depth cards */}
              {selectedWidth && selectedHeight && availableDepths.length > 0 && (
                <div style={{ marginBottom:"1.5rem" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",marginBottom:"0.75rem" }}>AVAILABLE DEPTHS — {selectedWidth} WIDE × {selectedHeight} HIGH</div>
                  <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                    {availableDepths.map((d) => (
                      <div key={d} style={{ background:"#f5f5f5",border:`2px solid ${BLUE}`,padding:"1.25rem 1.5rem",minWidth:"160px",textAlign:"center" }}>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.5rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.2rem" }}>{selectedWidth} × {selectedHeight} × {d}</div>
                        <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888",marginBottom:"0.85rem" }}>W × H × D</div>
                        <Link href="/contact/request-a-quote?from=open-face-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>GET PRICING <ArrowRight size={12}/></span></Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom sizes CTA */}
              <div style={{ background:BLUE,padding:"1.75rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginTop:"0.5rem" }}>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"#fff",letterSpacing:"0.02em",marginBottom:"0.25rem" }}>Need a Custom Size?</div>
                  <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"rgba(255,255,255,0.8)" }}>Custom widths, heights, and depths available. We engineer to your facility requirements.</div>
                </div>
                <Link href="/contact/request-a-quote?from=open-face-booth">
                  <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",cursor:"pointer",whiteSpace:"nowrap" }}>REQUEST CUSTOM SIZE <ArrowRight size={14}/></span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding:"3rem 0 4rem",background:"#f5f5f5" }}>
        <div className="container">
          <div className="text-center mb-6">
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>GALLERY</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-2 sm:grid-cols-4 gap-3" />
          </div>
          <div className="text-center">
            <Link href="/contact/request-a-quote?from=open-face-booth">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Open Face Booth?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=open-face-booth">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.6)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── HEATED OPTIONS ── */}
      <section style={{ background:"#111",padding:"3rem 0",borderTop:`4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>ADD-ON</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Heated Options Available</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",maxWidth:"480px",margin:"0 auto 1.75rem",lineHeight:1.7 }}>
            Add a direct-fired or indirect-fired heat system to your open face booth for accelerated cure times. Blanket intake filter upgrades included with all heated configurations.
          </p>
          <Link href="/contact/request-a-quote?from=open-face-booth">
            <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>ASK ABOUT HEATED OPTIONS <ArrowRight size={15}/></span>
          </Link>
        </div>
      </section>

      {/* ── PAIRS WELL WITH ── */}
      <section style={{ background:"#fff",padding:"3rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Pairs Well With a Mixing Room or Air Make-Up Unit</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",maxWidth:"480px",margin:"0 auto 1.5rem",lineHeight:1.7 }}>
            Maximize throughput and compliance by pairing your open face booth with a dedicated mixing room for paint prep and an AMU for tempered make-up air.
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
        heading="Complete Your Finishing System"
        label="Complete Your System"
        cards={PRODUCTS}
      />

      {/* ── STICKY MOBILE CTA ── */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,display:"flex",background:"#111",borderTop:`3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase",borderRight:"1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=open-face-booth" style={{ flex:1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
