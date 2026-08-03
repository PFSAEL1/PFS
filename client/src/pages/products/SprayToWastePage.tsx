/*
 * Spray-to-Waste Powder Coating Booths — PFS
 * Route: /products/powder-booths/spray-to-waste
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Pattern: mirrors CrossFlowBoothPage — collapsible features + collapsible sizes
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG    = "/manus-storage/spray-to-waste-hero_2fe77f1d.jpg";
const FEATURED_IMG = "/manus-storage/pfs-stw-4208_b899a28f.jpg";

const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-stw-4208_b899a28f.jpg",                        alt: "PFS spray-to-waste powder booth — exterior view, enclosed white enclosure",        pos: "center 50%" },
  { src: "/manus-storage/pfs-stw-7010_4c202b9d.jpg",                        alt: "PFS spray-to-waste powder booth — interior view with filter modules",               pos: "center 50%" },
  { src: "/manus-storage/pfs-stw-8411_efbc079f.jpg",                        alt: "PFS spray-to-waste powder booth — side view",                                       pos: "center 50%" },
  { src: "/manus-storage/spray-to-waste-pfs-booth-blue-unit_1f718c28.webp", alt: "PFS spray-to-waste powder booth — blue filter module unit",                         pos: "center 50%" },
  { src: "/manus-storage/pfs-stw-action1_5dd2f4d4.webp",                    alt: "PFS spray-to-waste powder booth — powder coating in action",                        pos: "center 40%" },
  { src: "/manus-storage/pfs-stw-action2_4d74a007.webp",                    alt: "PFS spray-to-waste powder booth — operator applying powder coating",                pos: "center 40%" },
  { src: "/manus-storage/spray-to-waste-aerospace-composite_3907664d.png",  alt: "PFS spray-to-waste powder booth — aerospace composite part application",            pos: "center 50%" },
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

// ── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES_VISIBLE = [
  {
    num: "01",
    title: "Heavy-Gauge Galvanized Steel Construction",
    body: "Structural panels are fabricated from heavy-gauge galvanized steel, CNC punched on 6\" centers and flanged for rigidity. Panels bolt together with flanged self-locking hardware — no welding required on site. Powder-coated white finish available.",
  },
  {
    num: "02",
    title: "3-Stage Filtration System",
    body: "A three-stage filter progression captures the full spectrum of powder overspray. Stage 1 is a sacrificial pre-filter pad that intercepts the bulk of airborne powder. Stage 2 is a pleated media filter that catches finer particulates. Stage 3 is a deep-pocket bag filter that prevents fine powder contamination from recirculating back into the plant.",
  },
  {
    num: "03",
    title: "Clean Air Recirculation — No Exhaust Stack Required",
    body: "Filtered air is returned directly to the facility rather than exhausted outside. This eliminates the need for an exhaust stack and the costly air make-up systems required to replace exhausted air, significantly reducing installation cost and operating expense.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Static Pressure Monitoring",
    body: "A pressure switch monitors static pressure across the final filter stage, giving operators a clear, reliable indicator of filter loading. When pressure rises to the threshold, it is time to replace the filter media — no guesswork, no unplanned downtime.",
  },
  {
    num: "05",
    title: "UL 508A Certified Control Panel",
    body: "Every booth ships with a UL 508A certified industrial control panel. Interlocked fan start, air solenoid valve, and safety circuits are pre-wired and factory tested before shipment. Optional programmable cycle timers available.",
  },
  {
    num: "06",
    title: "Air Solenoid Valve — Fan Interlocked",
    body: "The compressed air supply to the spray application equipment is interlocked with the exhaust fan. The solenoid valve opens only when the fan is confirmed running — preventing powder application without active ventilation.",
  },
  {
    num: "07",
    title: "CID2-Rated Interior Lighting",
    body: "Class I Division 2 inside-access light fixtures provide bright, uniform, shadow-free illumination throughout the work area. Multi-voltage ballasts accept 120V–277V power. LED upgrade available. Fixtures are ETL listed for their intended use and placement.",
  },
  {
    num: "08",
    title: "Open-Face or Fully Enclosed Configuration",
    body: "Available in open-face (three-wall) or fully enclosed configurations. Open-face designs maximize access for large or irregularly shaped parts and are ideal for batch operations. Fully enclosed booths provide maximum overspray containment for tighter facilities.",
  },
  {
    num: "09",
    title: "Personnel Door with Observation Window",
    body: "Standard 36\" wide personnel door with an observation window is set into a pre-assembled heavy-duty frame. Field-hung on slotted hinges for easy two-axis adjustment on uneven floors. Full-height door options available for walk-in configurations.",
  },
  {
    num: "10",
    title: "Ideal for Frequent Color Changes",
    body: "Because overspray is captured in replaceable filter media rather than a reclaim system, color changes require only a filter swap — no cyclone purge, no hopper cleaning, no cross-contamination risk. The fastest color change capability in powder coating.",
  },
  {
    num: "11",
    title: "Conveyorized Configuration Available",
    body: "Spray-to-waste booths are available with conveyor entry and exit openings for continuous-line production. Parts move through the booth on an overhead or floor conveyor while the filtration system operates continuously — no interruption between parts.",
  },
  {
    num: "12",
    title: "We Ship Nationally",
    body: "PFS spray-to-waste booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation. Manufactured in Santa Rosa, CA.",
  },
];

// ── STANDARD SIZES ────────────────────────────────────────────────────────────
// Organized by interior width. Each entry lists available height × depth combinations.
// Interior dimensions (W × H × D). Source: paintbooth.com standard catalog + PFS custom range.
type SizeRow = { h: string; d: string };
const SIZES: Record<string, SizeRow[]> = {
  "4'":   [{ h:"7'", d:"5'" }, { h:"8'", d:"5'" }],
  "6'":   [{ h:"7'", d:"5'" }, { h:"8'", d:"5'" }],
  "8'":   [{ h:"7'", d:"5'" }, { h:"8'", d:"5'" }],
  "10'":  [{ h:"7'", d:"5'" }, { h:"8'", d:"5'" }, { h:"9'", d:"7'" }],
  "12'":  [{ h:"7'", d:"7'" }, { h:"8'", d:"7'" }, { h:"9'", d:"7'" }, { h:"10'", d:"9'" }],
  "14'":  [{ h:"8'", d:"7'" }, { h:"9'", d:"9'" }, { h:"10'", d:"9'" }, { h:"12'", d:"9'" }],
  "16'":  [{ h:"9'", d:"9'" }, { h:"10'", d:"9'" }, { h:"12'", d:"12'" }],
  "Custom": [],
};
const WIDTH_KEYS = Object.keys(SIZES);

const RELATED_PRODUCTS = [
  {
    label: "Batch Cure Ovens",
    href: "/products/ovens/batch",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    desc: "Cure your powder coating in a PFS batch oven — sized to match your booth.",
  },
  {
    label: "Powder Reclaim Systems",
    href: "/products/powder-booths/powder-reclaim",
    img: "/manus-storage/pfs-powder-reclaim-unit_48f7c437.png",
    desc: "High-volume single-color operations — cyclone reclaim for maximum material efficiency.",
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",
    desc: "Surface preparation before powder coating — blast booths and blast rooms.",
  },
];

// ── CERT CAROUSEL ─────────────────────────────────────────────────────────────
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
                <div style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,color:"#111",letterSpacing:"0.04em",textTransform:"uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.72rem",color:"#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function SprayToWastePage() {
  useSEO({
    title: "Spray-to-Waste Powder Coating Booths | Non-Recovery Powder Booth | PFS",
    description: "PFS spray-to-waste powder coating booths (non-recovery) are built for frequent color changes, batch operations, and job shops. 3-stage filtration, clean air recirculation, no exhaust stack required. NFPA 33 compliant, ETL/UL listed, UL 508A controls. Open-face and enclosed configurations. Manufactured in Santa Rosa, CA.",
    canonical: "/products/powder-booths/spray-to-waste",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [compOpen,     setCompOpen]     = useState(false);
  const [specsOpen,    setSpecsOpen]    = useState(false);
  const [sizesOpen,    setSizesOpen]    = useState(false);
  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);
  const [filtrationOpen, setFiltrationOpen] = useState<null|'disposable'|'pulse'>('disposable');

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ position:"relative",minHeight:"clamp(420px,55vh,680px)",display:"flex",alignItems:"flex-end",overflow:"hidden",background:"#0a1628" }}>
        <img
          src={HERO_IMG}
          alt="PFS spray-to-waste powder coating booth — open-face non-recovery powder booth"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 55%",opacity:0.55 }}
        />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.45) 55%, transparent 100%)" }} />
        <div className="container" style={{ position:"relative",zIndex:1,paddingBottom:"clamp(3rem,6vw,5rem)" }}>
          <nav aria-label="breadcrumb" style={{ marginBottom:"1.25rem",display:"flex",gap:"0.5rem",alignItems:"center",flexWrap:"wrap" }}>
            {[
              { label:"Products",                href:"/products" },
              { label:"Powder Coating Systems",  href:"/products/powder-booths" },
              { label:"Spray-to-Waste Booths" },
            ].map((crumb, i, arr) => (
              <span key={i} style={{ display:"flex",alignItems:"center",gap:"0.5rem" }}>
                {crumb.href
                  ? <Link href={crumb.href}><span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",cursor:"pointer" }}>{crumb.label}</span></Link>
                  : <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.9)" }}>{crumb.label}</span>
                }
                {i < arr.length - 1 && <span style={{ color:"rgba(255,255,255,0.3)",fontSize:"0.7rem" }}>›</span>}
              </span>
            ))}
          </nav>
          <span style={{ display:"inline-block",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:"0.75rem" }}>
            POWDER COATING SYSTEMS
          </span>
          <h1 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(2.2rem,6vw,4.2rem)",fontWeight:900,color:"#fff",letterSpacing:"-0.02em",lineHeight:1.05,marginBottom:"1rem",maxWidth:"700px" }}>
            SPRAY-TO-WASTE<br />POWDER BOOTHS
          </h1>
          <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:"2.5rem",maxWidth:"520px" }}>
            Non-recovery powder coating booths built for frequent color changes, batch operations, and job shops. 3-stage filtration. Clean air recirculation. No exhaust stack required. Ships nationally.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
            <Link href="/contact/request-a-quote?from=spray-to-waste">
              <span className="btn-glow" style={{ justifyContent:"center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-glow-white" style={{ background:"transparent",color:"#fff",justifyContent:"center" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── FEATURED BOOTH ── */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED INSTALLATION</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Enclosed Spray-to-Waste Powder Booth</h2>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
                Engineered for a precision manufacturing facility requiring clean, multi-color powder coating capability. White powder-coated steel enclosure, full-height glass viewing windows, and a bank of disposable filter modules at the exhaust wall for maximum overspray capture. Built in the USA — ETL/UL certified components, NFPA 33 compliant.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"900px",overflow:"hidden",borderRadius:"2px" }}>
              <img src={FEATURED_IMG} alt="PFS enclosed spray-to-waste powder booth — featured installation" style={{ width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=spray-to-waste">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/powder-booths">
                <span className="btn-outline">VIEW ALL POWDER SYSTEMS <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTRATION MODELS — collapsible tabs ── */}
      <section style={{ background:"#fff",padding:"4rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>TWO FILTRATION MODELS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Choose Your Filtration System</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"#666",maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
              PFS spray-to-waste booths are available with two distinct filtration approaches. Select a model below to see how each system works.
            </p>
          </div>

          {/* Tab selector */}
          <div style={{ display:"flex",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",marginBottom:"2rem",maxWidth:"600px",margin:"0 auto 2rem" }}>
            <button
              onClick={() => setFiltrationOpen(filtrationOpen === 'disposable' ? null : 'disposable')}
              style={{ flex:1,padding:"0.9rem 1.5rem",background:filtrationOpen==='disposable'?BLUE:"transparent",color:filtrationOpen==='disposable'?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",border:"none",borderRight:`1px solid ${BLUE}`,cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
            >
              {filtrationOpen === 'disposable' ? <><ChevronUp size={14} style={{display:'inline',marginRight:'0.3rem'}}/></> : <><ChevronDown size={14} style={{display:'inline',marginRight:'0.3rem'}}/></>}
              Disposable Filter Model
            </button>
            <button
              onClick={() => setFiltrationOpen(filtrationOpen === 'pulse' ? null : 'pulse')}
              style={{ flex:1,padding:"0.9rem 1.5rem",background:filtrationOpen==='pulse'?BLUE:"transparent",color:filtrationOpen==='pulse'?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",border:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
            >
              {filtrationOpen === 'pulse' ? <><ChevronUp size={14} style={{display:'inline',marginRight:'0.3rem'}}/></> : <><ChevronDown size={14} style={{display:'inline',marginRight:'0.3rem'}}/></>}
              Pulse-Clean Cartridge Model
            </button>
          </div>

          {/* Disposable filter content */}
          {filtrationOpen === 'disposable' && (
            <div style={{ border:`2px solid ${BLUE}`,padding:"2rem",marginBottom:"1.5rem" }}>
              <div style={{ marginBottom:"1.5rem" }}>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.5rem" }}>3-Stage Disposable Filter System</h3>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#555",lineHeight:1.7,maxWidth:"680px" }}>
                  Air passes through the working area and is progressively cleaned across three disposable filter stages before being returned to the facility. No exhaust stack required. No air make-up unit required. Best suited for operations with frequent color changes where filter swaps are faster and more practical than cleaning a reclaim system.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { stage:"STAGE 1", title:"Pre-Filter Pad", body:"A sacrificial blanket-style filter captures the bulk of powder overspray before it reaches the downstream stages, extending the life of the more expensive filters behind it." },
                  { stage:"STAGE 2", title:"Pleated Media Filter", body:"Intercepts finer powder particulates that pass through the pre-filter. Protects the final bag filter from premature loading and reduces replacement frequency." },
                  { stage:"STAGE 3", title:"Deep-Pocket Bag Filter", body:"A 5-pocket, 12\" deep bag filter provides final-stage filtration, preventing fine powder contamination from recirculating into the plant. A pressure switch monitors filter loading." },
                ].map((s) => (
                  <div key={s.stage} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.18em",color:BLUE,textTransform:"uppercase" }}>{s.stage}</span>
                    <h4 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",margin:0 }}>{s.title}</h4>
                    <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.65,margin:0 }}>{s.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:"1.5rem",display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                <div style={{ background:"#eef2f9",border:`1px solid ${BLUE}`,padding:"0.6rem 1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase" }}>BEST FOR: FREQUENT COLOR CHANGES</div>
                <div style={{ background:"#eef2f9",border:`1px solid ${BLUE}`,padding:"0.6rem 1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase" }}>NO EXHAUST STACK</div>
                <div style={{ background:"#eef2f9",border:`1px solid ${BLUE}`,padding:"0.6rem 1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase" }}>LOWEST UPFRONT COST</div>
              </div>
            </div>
          )}

          {/* Pulse-clean cartridge content */}
          {filtrationOpen === 'pulse' && (
            <div style={{ border:`2px solid ${BLUE}`,padding:"2rem",marginBottom:"1.5rem" }}>
              <div style={{ marginBottom:"1.5rem" }}>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.5rem" }}>Pulse-Clean Cartridge Filtration System</h3>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#555",lineHeight:1.7,maxWidth:"680px" }}>
                  Overspray-laden air is drawn through pleated cartridge filter elements. A timed pulse-jet system periodically blasts compressed air in reverse through each cartridge, knocking accumulated powder off the media and into a collection drawer below. Cartridges are cleaned in place — no manual filter replacement required during production. Best suited for higher-volume operations running fewer color changes where longer filter service life and reduced media cost outweigh the higher upfront investment.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { stage:"STEP 1", title:"Cartridge Filtration", body:"Powder-laden air passes through pleated cartridge filter elements with a large surface area. The pleated media captures fine powder particulates efficiently across a wide range of powder types and particle sizes." },
                  { stage:"STEP 2", title:"Pulse-Jet Cleaning", body:"A timed pulse-jet controller fires short bursts of compressed air in reverse through each cartridge on a set interval. The pulse dislodges accumulated powder cake from the media surface, restoring airflow without stopping production." },
                  { stage:"STEP 3", title:"Powder Collection Drawer", body:"Dislodged powder falls into a sealed collection drawer or bin at the base of the filter module. The drawer is removed and emptied on a regular schedule — no filter media to purchase or dispose of during normal operation." },
                ].map((s) => (
                  <div key={s.stage} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                    <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.18em",color:BLUE,textTransform:"uppercase" }}>{s.stage}</span>
                    <h4 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",margin:0 }}>{s.title}</h4>
                    <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.65,margin:0 }}>{s.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:"1.5rem",display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                <div style={{ background:"#eef2f9",border:`1px solid ${BLUE}`,padding:"0.6rem 1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase" }}>BEST FOR: HIGHER VOLUME OPERATIONS</div>
                <div style={{ background:"#eef2f9",border:`1px solid ${BLUE}`,padding:"0.6rem 1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase" }}>SELF-CLEANING CARTRIDGES</div>
                <div style={{ background:"#eef2f9",border:`1px solid ${BLUE}`,padding:"0.6rem 1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase" }}>REDUCED MEDIA COST OVER TIME</div>
              </div>
            </div>
          )}

          {filtrationOpen === null && (
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#888",textAlign:"center",padding:"1.5rem 0" }}>Select a filtration model above to see how it works.</p>
          )}

          <div style={{ textAlign:"center",marginTop:"1.5rem" }}>
            <Link href="/contact/request-a-quote?from=spray-to-waste">
              <span className="btn-glow">ASK ABOUT FILTRATION OPTIONS <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: compOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>WHICH SYSTEM IS RIGHT FOR YOU?</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Spray-to-Waste vs. Powder Reclaim</h2>
            </div>
            <button
              onClick={() => setCompOpen(!compOpen)}
              style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:compOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:compOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}
            >
              {compOpen ? <><ChevronUp size={15}/> HIDE COMPARISON</> : <><ChevronDown size={15}/> COMPARE SYSTEMS</>}
            </button>
          </div>
          {compOpen && (
          <div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontFamily:"'Inter',sans-serif",fontSize:"0.88rem" }}>
              <thead>
                <tr>
                  <th style={{ background:"#111",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.25rem",textAlign:"left",width:"30%" }}>Factor</th>
                  <th style={{ background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.25rem",textAlign:"left",width:"35%" }}>Spray-to-Waste (Non-Recovery)</th>
                  <th style={{ background:"#2d5a9e",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.25rem",textAlign:"left",width:"35%" }}>Powder Reclaim (Recovery)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor:"Upfront Cost",         stw:"Lower — simpler system, no reclaim equipment",         reclaim:"Higher — cyclone or cartridge collector adds cost" },
                  { factor:"Color Change Speed",   stw:"Fastest — swap filter media, ready in minutes",       reclaim:"Slower — purge cyclone, clean hopper between colors" },
                  { factor:"Best For",             stw:"Frequent color changes, job shops, batch operations",  reclaim:"High-volume single-color or limited-color production" },
                  { factor:"Powder Recovery",      stw:"None — overspray discarded with filter media",        reclaim:"Yes — overspray collected, cleaned, and reused" },
                  { factor:"Exhaust Stack",         stw:"Not required — air recirculated to facility",         reclaim:"Typically not required — air recirculated" },
                  { factor:"Air Make-Up Unit",      stw:"Not required",                                        reclaim:"Not required" },
                  { factor:"Maintenance",           stw:"Replace filter media on schedule — simple",           reclaim:"Periodic cyclone cleaning, filter cartridge service" },
                  { factor:"Installation Cost",    stw:"Lowest — no pit, no stack, minimal infrastructure",   reclaim:"Moderate — reclaim module adds footprint" },
                  { factor:"Material Savings",      stw:"None — all overspray is discarded",                   reclaim:"Significant at high volumes — powder reused" },
                  { factor:"NFPA 33 Compliant",    stw:"Yes",                                                 reclaim:"Yes" },
                  { factor:"ETL/UL Listed",         stw:"Yes",                                                 reclaim:"Yes" },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8f9fb" }}>
                    <td style={{ padding:"0.9rem 1.25rem",fontWeight:700,color:"#111",borderBottom:"1px solid #e5e7eb",verticalAlign:"top" }}>{row.factor}</td>
                    <td style={{ padding:"0.9rem 1.25rem",color:"#333",borderBottom:"1px solid #e5e7eb",borderLeft:`3px solid ${BLUE}`,verticalAlign:"top" }}>{row.stw}</td>
                    <td style={{ padding:"0.9rem 1.25rem",color:"#333",borderBottom:"1px solid #e5e7eb",borderLeft:"3px solid #2d5a9e",verticalAlign:"top" }}>{row.reclaim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",marginTop:"2rem" }}>
            <Link href="/contact/request-a-quote?from=spray-to-waste">
              <span className="btn-glow">GET PRICING — SPRAY-TO-WASTE <ArrowRight size={15}/></span>
            </Link>
            <Link href="/products/powder-booths/powder-reclaim">
              <span className="btn-outline">VIEW POWDER RECLAIM SYSTEMS <ArrowRight size={15}/></span>
            </Link>
          </div>
          </div>
          )}
        </div>
      </section>

      {/* ── STANDARD FEATURES — collapsible ── */}
      <section style={{ background:"#fff",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD FEATURES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Built with Certified Components</h2>
            </div>
            <button
              onClick={() => setSpecsOpen(!specsOpen)}
              style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:specsOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:specsOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}
            >
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
                    <Link href="/contact/request-a-quote?from=spray-to-waste">
                      <span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span>
                    </Link>
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
                      <Link href="/contact/request-a-quote?from=spray-to-waste">
                        <span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign:"center" }}>
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",border:`2px solid ${BLUE}`,color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.75rem",cursor:"pointer" }}
                >
                  {featuresOpen ? <><ChevronUp size={15}/> SHOW LESS</> : <><ChevronDown size={15}/> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── STANDARD SIZES — collapsible ── */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD SIZES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Common Booth Widths — 4' to 16' and Custom</h2>
            </div>
            <button
              onClick={() => setSizesOpen(!sizesOpen)}
              style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}
            >
              {sizesOpen ? <><ChevronUp size={15}/> HIDE SIZES</> : <><ChevronDown size={15}/> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",marginBottom:"1.5rem" }}>
                Select a booth width to view available height and depth combinations. All dimensions are interior. Custom sizes are available — contact PFS for a quote.
              </p>
              <div style={{ display:"flex",flexWrap:"wrap",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",marginBottom:"2rem" }}>
                {WIDTH_KEYS.map((w, idx) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWidth(selectedWidth === w ? null : w)}
                    style={{ padding:"0.75rem 1.25rem",background:selectedWidth===w?BLUE:"transparent",color:selectedWidth===w?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:idx<WIDTH_KEYS.length-1?`1px solid ${BLUE}`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}
                  >
                    {w}
                  </button>
                ))}
              </div>

              {selectedWidth === "Custom" && (
                <div style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"2rem",marginBottom:"2rem",maxWidth:"540px" }}>
                  <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:800,color:"#111",marginBottom:"0.5rem" }}>Custom Sizing Available</h3>
                  <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#555",lineHeight:1.65,marginBottom:"1.25rem" }}>
                    PFS spray-to-waste booths are engineered to order for any part size, production volume, or facility constraint. Provide your part dimensions and production requirements and our team will configure the right booth for your application.
                  </p>
                  <Link href="/contact/request-a-quote?from=spray-to-waste-custom">
                    <span className="btn-glow">REQUEST CUSTOM QUOTE <ArrowRight size={15}/></span>
                  </Link>
                </div>
              )}

              {selectedWidth && selectedWidth !== "Custom" && SIZES[selectedWidth].length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {SIZES[selectedWidth].map((s, i) => (
                    <div key={i} style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"1.5rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.25rem" }}>
                        {selectedWidth} × {s.h} × {s.d}
                      </div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888",marginBottom:"1rem" }}>W × H × D (interior)</div>
                      <Link href="/contact/request-a-quote?from=spray-to-waste">
                        <span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>
                          GET PRICING <ArrowRight size={12}/>
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {selectedWidth && selectedWidth !== "Custom" && (
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.82rem",color:"#888",marginBottom:"1.5rem" }}>
                  All dimensions are interior. Exterior dimensions are approximately 4–6\" larger per side. Custom heights, depths, and configurations available.
                </p>
              )}

              {!selectedWidth && (
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#888",marginBottom:"2rem" }}>Select a width above to view available configurations.</p>
              )}

              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=spray-to-waste">
                  <span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15}/></span>
                </Link>
                <Link href="/products/powder-booths">
                  <span className="btn-outline">VIEW ALL POWDER SYSTEMS <ArrowRight size={15}/></span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding:"3rem 0 4rem",background:"#fff" }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div className="text-center">
            <Link href="/contact/request-a-quote?from=spray-to-waste">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Spray-to-Waste Booth?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=spray-to-waste">
              <span className="btn-glow-white">GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-glow-white" style={{ background:"transparent",color:"#fff" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:"#fff",padding:"4rem 0" }}>
        <div className="container" style={{ maxWidth:"820px" }}>
          <div style={{ marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Spray-to-Waste Powder Booth — Common Questions</h2>
          </div>
          {[
            {
              q: "What is a spray-to-waste powder coating booth?",
              a: "A spray-to-waste powder coating booth — also called a non-recovery powder booth — captures overspray powder in replaceable filter media rather than collecting and recycling it. Air is cleaned through a multi-stage filter system and returned to the facility. There is no cyclone separator, no reclaim hopper, and no exhaust stack required. The term 'spray-to-waste' refers to the fact that overspray powder is discarded with the filter media rather than reclaimed for reuse.",
            },
            {
              q: "When should I choose a spray-to-waste booth over a powder reclaim booth?",
              a: "A spray-to-waste booth is the right choice when you run frequent color changes, coat a wide variety of parts, or operate at lower production volumes where the cost of a reclaim system is not justified by the volume of powder recovered. If you run high volumes of a single color and powder material cost is significant, a reclaim booth will deliver better long-term economics. For most job shops, custom coaters, and batch operations, spray-to-waste is the simpler and more cost-effective solution.",
            },
            {
              q: "Does a spray-to-waste booth require an exhaust stack?",
              a: "No. Because the filtration system cleans the air to a level suitable for recirculation back into the facility, no exhaust stack is required. This also eliminates the need for an air make-up unit to replace exhausted air — a significant reduction in installation cost and operating expense compared to booths that exhaust to the outside.",
            },
            {
              q: "How often do the filters need to be replaced?",
              a: "Filter replacement frequency depends on production volume, powder type, and application efficiency. A pressure switch monitors static pressure across the final filter stage and signals when replacement is needed. Many operations replace pre-filter pads weekly and bag filters monthly, but actual intervals vary. Filter media is low-cost and readily available.",
            },
            {
              q: "Is a spray-to-waste powder booth NFPA 33 compliant?",
              a: "Yes. PFS spray-to-waste powder booths are built to NFPA 33 and IFC Chapter 24 standards with ETL/UL listed and certified components, a UL 508A certified control panel, and OSHA 1910.94 compliant ventilation design.",
            },
            {
              q: "Can I use a spray-to-waste booth with a conveyor line?",
              a: "Yes. PFS spray-to-waste booths are available with conveyor entry and exit openings for integration into continuous powder coating lines. Parts move through the booth on an overhead or floor conveyor while the filtration system operates continuously.",
            },
          ].map((item, i) => (
            <details key={i} style={{ borderBottom:"1px solid #e5e7eb",padding:"1.25rem 0" }}>
              <summary style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.95rem,2.5vw,1.1rem)",fontWeight:800,color:"#111",letterSpacing:"0.01em",cursor:"pointer",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem" }}>
                {item.q}
                <span style={{ color:BLUE,flexShrink:0,fontSize:"1.4rem",fontWeight:300,lineHeight:1 }}>+</span>
              </summary>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#555",lineHeight:1.75,margin:"1rem 0 0",paddingRight:"1.5rem" }}>{item.a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a spray-to-waste powder coating booth?", "acceptedAnswer": { "@type": "Answer", "text": "A spray-to-waste powder coating booth captures overspray powder in replaceable filter media rather than collecting and recycling it. Air is cleaned through a multi-stage filter system and returned to the facility. No exhaust stack required." } },
            { "@type": "Question", "name": "When should I choose a spray-to-waste booth over a powder reclaim booth?", "acceptedAnswer": { "@type": "Answer", "text": "Choose spray-to-waste for frequent color changes, varied part types, or lower production volumes where reclaim economics are not justified." } },
            { "@type": "Question", "name": "Does a spray-to-waste booth require an exhaust stack?", "acceptedAnswer": { "@type": "Answer", "text": "No. The filtration system cleans air for recirculation back into the facility, eliminating the need for an exhaust stack and air make-up unit." } },
            { "@type": "Question", "name": "Is a spray-to-waste powder booth NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS spray-to-waste powder booths are built to NFPA 33 and IFC Chapter 24 standards with ETL/UL listed components and a UL 508A certified control panel." } },
          ],
        }) }} />
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <SiteProductCardSection
        heading="You May Also Need"
        cards={RELATED_PRODUCTS}
      />

    </div>
  );
}
