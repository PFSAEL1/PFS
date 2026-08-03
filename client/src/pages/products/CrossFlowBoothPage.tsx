/*
 * Cross-Flow Spray Booths — PFS Orion Series
 * REBUILT from scratch — same rules as AerospacePage and IndustrialManufacturingPage
 * Route: /preview/crossflow-booth
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_RENDER = "/manus-storage/truck-crossflow-real-angled_64504e75.jpg";
const FEATURED_IMG = "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp";
const GALLERY_IMGS = [
  { src: "/manus-storage/truck-crossflow-real-angled_64504e75.jpg", alt: "PFS cross-flow truck booth — angled exterior view with green filter doors", pos: "center 30%" },
  { src: "/manus-storage/truck-crossflow-real-front_9753e774.jpg",  alt: "PFS cross-flow truck booth — front view showing full filter door panel",    pos: "center 35%" },
  { src: "/manus-storage/crossflow_interior_33c3b69d.jpg",              alt: "PFS Orion cross-flow booth — exterior view",                    pos: "center 30%" },
  { src: "/manus-storage/crossflow_doors_web_31ec9c68.jpg",        alt: "PFS Orion cross-flow booth — doors open",                       pos: "center 50%" },
  { src: "/manus-storage/crossflow_shop_web_da2aec92.jpg",         alt: "PFS Orion cross-flow booth — shop installation view",           pos: "center 50%" },
  { src: "/manus-storage/crossflow_interior_web_6ed73666.jpg",     alt: "PFS Orion cross-flow booth — interior",                         pos: "center 50%" },
  { src: "/manus-storage/CrossflowPCfrontopendoors_5b7ecde2.webp", alt: "PFS Orion powder-coat cross-flow — front open doors",           pos: "center 40%" },
  { src: "/manus-storage/Crossflowopendoors_d3809b62.webp",        alt: "PFS Orion galvanized cross-flow — front open doors",            pos: "center 40%" },
  { src: "/manus-storage/crossflow_doors_web_31ec9c68.jpg",    alt: "PFS Orion galvanized cross-flow — front and side angle view",   pos: "center 40%" },
  { src: "/manus-storage/pfs-crossflow-booth-front-view_c9a9a834.jpeg", alt: "PFS crossflow booth — front view with green filter panels",      pos: "center 50%" },
  { src: "/manus-storage/pfs-crossflow-booth-open-door_b19dfbdd.jpeg",  alt: "PFS crossflow booth — open door showing interior",               pos: "center 50%" },
  { src: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",               alt: "PFS Orion cross-flow spray booth — clean white render, angled view", pos: "center 50%" },
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
  { num: "02", title: "UL 508A Control Panel",           body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
  { num: "03", title: "UL Listed Tube Axial Fans",       body: "High-efficiency, UL listed tube axial fans move air horizontally from intake to exhaust at consistent face velocity — eliminating overspray recirculation." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "CID2 Lighting — 4-Tube Fixtures",          body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination." },
  { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "06", title: "Galvanized or Powder Coated Steel",         body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "07", title: "Pressurized Option Available",              body: "Pressurized cross-flow configuration features a bridge plenum at both ends for positive-pressure environments — ideal for contamination control." },
  { num: "08", title: "We Ship Nationally",                        body: "PFS cross-flow booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "9":  [{ w:"14'",h:"9'", l:"24'" },{ w:"14'",h:"9'", l:"27'" },{ w:"14'",h:"9'", l:"30'" },{ w:"14'",h:"9'", l:"33'" }],
  "10": [{ w:"14'",h:"10'",l:"24'" },{ w:"14'",h:"10'",l:"27'" },{ w:"14'",h:"10'",l:"30'" },{ w:"14'",h:"10'",l:"33'" }],
  "12": [{ w:"14'",h:"12'",l:"24'" },{ w:"14'",h:"12'",l:"27'" },{ w:"14'",h:"12'",l:"30'" },{ w:"14'",h:"12'",l:"33'" }],
};

const PRODUCTS = [
  { label: "Air Make-Up Units",     href: "/products/air-make-up-units",            img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                                                                                          desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms",          href: "/products/mixing-rooms",                img: "/manus-storage/IMG_0498_a98f5f38.jpg",                                                                                     desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations",         href: "/products/prep-support/prep-stations",               img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",                                                                                 desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Semi-Downdraft Booths", href: "/products/paint-booths/semi-downdraft", img: "/manus-storage/orion-semi-down-epoxy_9144ba19.png", desc: "Rear-angled exhaust for versatile applications — a step up from crossflow airflow." },
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

function CrossFlowAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"700px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 320" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes flowRight { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes flowUp    { 0%{stroke-dashoffset:80;opacity:0.3}  50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .af1{animation:flowRight 2.0s linear infinite}
          .af2{animation:flowRight 2.0s linear infinite 0.5s}
          .af3{animation:flowRight 2.0s linear infinite 1.0s}
          .afu{animation:flowUp 1.8s linear infinite}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        <rect x="60" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="60" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="60" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="610" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="82" y1="100" x2="618" y2="100" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="af1"/>
        <polygon points="618,94 634,100 618,106" fill="#22c55e"/>
        <line x1="82" y1="160" x2="618" y2="160" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="af2"/>
        <polygon points="618,154 634,160 618,166" fill="#22c55e"/>
        <line x1="82" y1="220" x2="618" y2="220" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="af3"/>
        <polygon points="618,214 634,220 618,226" fill="#22c55e"/>
        <line x1="625" y1="60" x2="625" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 8" className="afu"/>
        <polygon points="619,12 625,0 631,12" fill="#22c55e"/>
        <text x="40" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">INTAKE</text>
        <text x="40" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="660" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="660" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="625" y="295" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="625" y="308" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">STACK</text>
        <text x="350" y="300" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">NON-HEATED ONLY</text>
      </svg>
    </div>
  );
}

export default function CrossFlowBoothPage() {
  useSEO({
    title: "Cross-Flow Spray Booths | Crossdraft Paint Booths | PFS Industrial",
    description: "PFS cross-flow spray booths provide an economical, code-compliant finishing environment for industrial and touch-up applications. Horizontal airflow, simple installation, no pit or raised floor required. NFPA 33 compliant, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/cross-flow/standard",
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
          src={HERO_RENDER}
          alt="PFS Orion cross-flow spray booth exterior with filter doors"
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        {/* Dark gradient — heavier at bottom so text is always readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
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
            Cross-Flow<br />
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
          }}>PFS ORION SERIES</span>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            ETL listed. UL 508A certified. Horizontal airflow — the most cost-effective enclosed booth for automotive and industrial finishing. Ships nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=crossflow-booth">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }}>
              <span className="btn-glow-white" style={{ background: "transparent", color: "#fff", width: "100%", maxWidth: "320px", justifyContent: "center" }}>CALL (888) 545-7715</span>
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
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Orion Cross-Flow Spray Booth</h2>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem",marginBottom:"0.75rem" }}>PFS ORION SERIES</span>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
                Horizontal airflow. ETL listed. UL 508A controls. Built to NFPA 33 standards. Standard sizes 14'W × 9–12'H × 24–33'L. Custom sizes available.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"900px",overflow:"hidden",borderRadius:"2px" }}>
              <img src={FEATURED_IMG} alt="PFS Orion Series Cross-Flow Spray Booth" style={{ width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=crossflow-booth">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/paint-booths/crossflow-all">
                <span className="btn-outline">SEE ALL CROSS-FLOW BOOTHS <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AIRFLOW DIAGRAM */}
      <section style={{ background:"#fff",padding:"4rem 0" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>HOW IT WORKS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Cross-Flow Airflow Pattern</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"#666",maxWidth:"480px",margin:"0 auto",lineHeight:1.7 }}>
              Air enters through intake filters on the front wall and exits through exhaust filters on the rear wall — horizontal, front-to-rear airflow keeps overspray away from the operator.
            </p>
          </div>
          <CrossFlowAirflowSVG />
          <div style={{ textAlign:"center",marginTop:"2rem" }}>
            <Link href="/contact/request-a-quote?from=crossflow-booth">
              <span className="btn-glow">GET PRICING <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECS — collapsible */}
      <section style={{ background:"#fff",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: specsOpen ? "2rem" : 0 }}>
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
                  <div key={f.num} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column" }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.6,flex:1,marginBottom:"1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=crossflow-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.6,flex:1,marginBottom:"1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=crossflow-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
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

      {/* SIZES — collapsible */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD SIZES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>14' Wide — Choose Your Height</h2>
            </div>
            <button onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE SIZES</> : <><ChevronDown size={15}/> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",marginBottom:"1.5rem" }}>All standard booths are 14' wide. Select a ceiling height to see available lengths.</p>
              <div style={{ display:"inline-flex",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",marginBottom:"2rem" }}>
                {["9","10","12"].map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(selectedHeight === h ? null : h)} style={{ padding:"0.75rem 1.75rem",background:selectedHeight===h?BLUE:"transparent",color:selectedHeight===h?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:h!=="12"?`1px solid ${BLUE}`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}>{h}' HEIGHT</button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"1.5rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.25rem" }}>{s.w} × {s.h} × {s.l}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888",marginBottom:"1rem" }}>W × H × L</div>
                      <Link href="/contact/request-a-quote?from=crossflow-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>GET PRICING <ArrowRight size={12}/></span></Link>
                    </div>
                  ))}
                </div>
              )}
              {!selectedHeight && (
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#888",marginBottom:"2rem" }}>Select a height above to view available configurations.</p>
              )}
              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=crossflow-booth"><span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15}/></span></Link>
                <Link href="/products/paint-booths/crossflow-all"><span className="btn-outline">SEE ALL CROSS-FLOW BOOTHS <ArrowRight size={15}/></span></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding:"3rem 0 4rem",background:"#fff" }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div className="text-center">
            <Link href="/contact/request-a-quote?from=crossflow-booth">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Cross-Flow Booth?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=crossflow-booth">
              <span className="btn-glow-white">GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-glow-white" style={{ background: "transparent", color: "#fff" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* HEATED OPTIONS */}
      <section style={{ background:"#111",padding:"3rem 0",borderTop:`4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>ADD-ON</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Heated Options Available</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",maxWidth:"480px",margin:"0 auto 1.75rem",lineHeight:1.7 }}>
            Add a direct-fired or indirect-fired heat system to your cross-flow booth for accelerated cure times. Blanket intake filter upgrades included with all heated configurations.
          </p>
          <Link href="/contact/request-a-quote?from=crossflow-booth">
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
            Maximize throughput and compliance by pairing your cross-flow booth with a dedicated mixing room for paint prep and an AMU for tempered make-up air.
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


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Cross-Flow Spray Booth — Common Questions</h2>
          </div>
          {[
            { q: "How does a cross-flow spray booth work?", a: "A cross-flow spray booth draws fresh, filtered air through intake filters on the front wall or ceiling. Air flows horizontally from front to back through the booth, carrying overspray away from the painter toward the rear exhaust filters. This front-to-back airflow pattern is the simplest enclosed booth configuration and requires no concrete pit or raised floor." },
            { q: "What is the difference between a cross-flow and a downdraft spray booth?", a: "A cross-flow booth moves air horizontally from front to back. A downdraft booth moves air vertically from ceiling to floor. Downdraft configurations (full, semi, or side) deliver cleaner finish quality because overspray is pulled away from the painter more efficiently. Cross-flow booths are simpler to install and lower in cost, making them a practical choice for lower-volume shops or applications where finish quality requirements are less demanding." },
            { q: "Does a cross-flow booth require a concrete pit?", a: "No. Cross-flow spray booths require no concrete pit and no raised floor. They sit directly on a flat concrete slab, making them the simplest and lowest-cost enclosed booth configuration to install." },
            { q: "Is a cross-flow spray booth NFPA 33 compliant?", a: "Yes. PFS cross-flow spray booths are built to NFPA 33 standards with a UL 508A certified control panel, ETL/UL listed and certified components, and OSHA 1910.94 compliant ventilation." },
            { q: "What industries use cross-flow spray booths?", a: "Cross-flow spray booths are used in automotive refinishing, fleet maintenance, light industrial finishing, woodworking, and general manufacturing where a code-compliant enclosed finishing environment is needed at the lowest installation cost." },
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
            { "@type": "Question", "name": "How does a cross-flow spray booth work?", "acceptedAnswer": { "@type": "Answer", "text": "A cross-flow spray booth draws fresh, filtered air through intake filters on the front wall or ceiling. Air flows horizontally from front to back through the booth, carrying overspray away from the pa..." } },
            { "@type": "Question", "name": "What is the difference between a cross-flow and a downdraft spray booth?", "acceptedAnswer": { "@type": "Answer", "text": "A cross-flow booth moves air horizontally from front to back. A downdraft booth moves air vertically from ceiling to floor. Downdraft configurations (full, semi, or side) deliver cleaner finish qualit..." } },
            { "@type": "Question", "name": "Does a cross-flow booth require a concrete pit?", "acceptedAnswer": { "@type": "Answer", "text": "No. Cross-flow spray booths require no concrete pit and no raised floor. They sit directly on a flat concrete slab, making them the simplest and lowest-cost enclosed booth configuration to install...." } },
            { "@type": "Question", "name": "Is a cross-flow spray booth NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS cross-flow spray booths are built to NFPA 33 standards with a UL 508A certified control panel, ETL/UL listed and certified components, and OSHA 1910.94 compliant ventilation...." } },
            { "@type": "Question", "name": "What industries use cross-flow spray booths?", "acceptedAnswer": { "@type": "Answer", "text": "Cross-flow spray booths are used in automotive refinishing, fleet maintenance, light industrial finishing, woodworking, and general manufacturing where a code-compliant enclosed finishing environment ..." } }
          ]
        }) }} />
      </section>

      {/* RELATED PRODUCTS */}
      {/* INDUSTRIES SERVED — internal linking */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e2e8f0" }}>
        <div className="container">
          <p style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif", fontSize:"0.75rem", fontWeight:700, color:BLUE, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.6rem" }}>INDUSTRIES SERVED</p>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif", fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:800, color:BLUE, marginBottom:"1.5rem" }}>Who Uses Cross-Flow Spray Booths?</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:"0.75rem" }}>
            {[
              { label:"Collision Repair", href:"/industries/collision-repair" },
              { label:"Fleet & Commercial", href:"/industries/truck-bus-fleet" },
              { label:"Woodworking", href:"/industries/woodworking" },
              { label:"Industrial Manufacturing", href:"/industries/industrial-manufacturing" },
              { label:"Heavy Equipment", href:"/industries/heavy-equipment" },
              { label:"Energy & Utilities", href:"/industries/energy-utilities" },
            ].map((ind) => (
              <a key={ind.href} href={ind.href} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.85rem 1rem", background:"#fff", border:"1px solid #e2e8f0", borderLeft:`3px solid ${BLUE}`, textDecoration:"none", fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.88rem", fontWeight:700, color:BLUE, letterSpacing:"0.04em", textTransform:"uppercase" }}>
                {ind.label} →
              </a>
            ))}
          </div>
        </div>
      </section>
      <SiteProductCardSection
        heading="Complete Your Finishing System"
        label="Related Products"
        cards={PRODUCTS}
      />

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,display:"flex",background:"#111",borderTop:`3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase",borderRight:"1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=crossflow-booth" style={{ flex:1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
