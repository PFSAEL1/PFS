/**
 * WALK-IN OVEN PAGE
 * Design: Industrial precision — same format as BatchOvenPage
 * Route: /products/ovens/walk-in
 * Design: Deep navy #1B3A6B, Chakra Petch / Barlow Condensed headlines, Archivo Narrow body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── ASSETS ── */
const HERO_IMG     = "/manus-storage/vulcan-walkin-exterior_79315098.png";
const FEATURED_IMG = "/manus-storage/vulcan-walkin-exterior_79315098.png";

const GALLERY_IMGS = [
  { src: "/manus-storage/vulcan-walkin-exterior_79315098.png",              alt: "PFS VULCAN walk-in oven — exterior front view, galvanized steel panels", pos: "center 40%" },
  { src: "/manus-storage/IMG_4175b_e4e47527.jpg",                           alt: "PFS VULCAN walk-in oven — interior view with heating system", pos: "center 50%" },
  { src: "/manus-storage/IMG_4182b_445e5513.jpg",                           alt: "PFS VULCAN walk-in oven — interior chamber and airflow system", pos: "center 50%" },
  { src: "/manus-storage/IMG_4179_ca3158de.jpg",                            alt: "PFS VULCAN walk-in oven — side view with control panel", pos: "center 50%" },
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
  { img: NFPA_LOGO, title: "NFPA Compliant",         sub: "Industrial Finishing Standard",       imgH: 44 },
  { img: EPA_LOGO,  title: "EPA Compliant",           sub: "Air Quality Standards",               imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",          sub: "Workplace Safety Standards",          imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",         sub: "Santa Rosa, CA",                      imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

/* ── FEATURES ── */
const FEATURES_VISIBLE = [
  { num: "01", title: "Double-Wall Insulated Panels",     body: "6-inch insulated walls and roof filled with high-density mineral wool insulation. Superior thermal retention reduces energy consumption and maintains stable curing temperatures throughout the full walk-in chamber." },
  { num: "02", title: "UL 508A Industrial Control Panel", body: "UL 508A certified control panel with digital temperature controllers, safety interlocks, burner management, and operator controls." },
  { num: "03", title: "High-Efficiency Heating System",   body: "Natural gas or propane-fired burner packages from premium industrial manufacturers. Large circulation blowers continuously move heated air to eliminate temperature stratification and promote consistent curing across the full workload." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "Heavy-Gauge Steel Construction",   body: "20-gauge or thicker galvanized, aluminized, or stainless steel throughout. Structural components, roof panels, wall systems, ductwork, and plenums." },
  { num: "05", title: "Engineered Exhaust & Airflow",     body: "Heavy-duty exhaust fans mounted on vibration-isolated supports. Each exhaust package is engineered specifically for the oven size and production requirements while complying with applicable code requirements." },
  { num: "06", title: "Modular Bolt-Together Construction", body: "Precision bolt-together construction reduces installation time while maintaining structural integrity. Modular design allows future expansion or relocation when production requirements change." },
  { num: "07", title: "Multiple Door Configurations",     body: "Swing doors, bi-parting doors, vertical lift doors, and custom frontal assemblies. Each door incorporates reinforced steel frame with thick mineral wool insulation and emergency-release hardware." },
  { num: "08", title: "Fork Truck Access Available",      body: "Walk-in ovens can be configured with heavy-duty floor tracks, removable sill plates, and reinforced floor pans to accommodate fork truck loading of heavy parts and assemblies." },
  { num: "09", title: "Comprehensive Safety Systems",     body: "Flame safeguard system, high/low gas pressure switches, automatic burner shutdown, combustion purge cycle, high-limit temperature protection, motor overload protection, and emergency stop circuitry." },
  { num: "10", title: "Advanced Control Options",         body: "PLC-based automation, color touchscreen HMI, PID temperature control, Variable Frequency Drives (VFDs), production data logging, remote monitoring and diagnostics, and recipe management — configured to your production requirements." },
  { num: "11", title: "Ships Nationally",                 body: "PFS walk-in ovens ship to all 50 states." },
];

/* ── SIZES ── */
const SIZES: Record<string, Record<string, string[]>> = {
  "10'": {
    "10'": ["10'", "15'", "20'", "30'"],
    "12'": ["10'", "20'", "30'"],
  },
  "12'": {
    "10'": ["20'", "30'", "40'"],
    "12'": ["20'", "30'", "40'"],
  },
  "14'": {
    "10'": ["20'", "30'", "40'"],
    "12'": ["20'", "30'"],
  },
  "16'": {
    "10'": ["20'", "30'", "40'"],
    "12'": ["20'", "30'"],
  },
};
const WIDTH_KEYS = ["10'", "12'", "14'", "16'"];

/* ── RELATED PRODUCTS ── */
const PRODUCTS = [
  { label: "Batch Ovens",          href: "/products/ovens/batch",               img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",  desc: "High-volume batch curing for powder and liquid paint." },
  { label: "Conveyor Ovens",       href: "/products/ovens/conveyor",            img: "/manus-storage/conveyor-oven-entry_8df7b0be.png",             desc: "Continuous curing for automated production lines." },
  { label: "Powder Coating Systems", href: "/products/powder-booths",           img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png",        desc: "Complete powder coating booths for batch and automated lines." },
  { label: "Prep Stations",        href: "/products/prep-support/prep-stations", img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",  desc: "Filtered prep areas for surface preparation before coating." },
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

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function WalkInOvenPage() {
  useSEO({
    title: "Walk-In Ovens | Large Industrial Curing Ovens | PFS",
    description: "PFS walk-in ovens are engineered for large parts, aerospace components, and high-volume production curing. Custom sizes, uniform temperature distribution, gas or electric heat, NFPA 86 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/ovens/walk-in",
  });

  const [featuresOpen,  setFeaturesOpen]  = useState(false);
  const [specsOpen,     setSpecsOpen]     = useState(false);
  const [sizesOpen,     setSizesOpen]     = useState(false);
  const [selectedWidth, setSelectedWidth] = useState<string>("10'");
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  const availableDepths: string[] = (selectedWidth && SIZES[selectedWidth]?.["10'"]) || [];

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section style={{ position:"relative",minHeight:"clamp(340px, 55vh, 580px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden" }}>
        <img src={HERO_IMG} alt="PFS VULCAN walk-in oven" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.72) 38%, rgba(5,5,5,0.35) 70%, rgba(5,5,5,0.12) 100%)" }} />
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:BLUE,zIndex:3 }} />
        <div className="container" style={{ position:"relative",zIndex:2,paddingTop:"8rem",paddingBottom:"3.5rem" }}>
          <nav style={{ display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.5rem",flexWrap:"wrap" }}>
            {[{ label:"Products",href:"/products" },{ label:"Industrial Ovens",href:"/products/ovens" },{ label:"Walk-In Ovens" }].map((crumb, i, arr) => (
              <span key={i} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem" }}>
                {crumb.href
                  ? <Link href={crumb.href}><span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.12em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",cursor:"pointer" }}>{crumb.label}</span></Link>
                  : <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.12em",color:"rgba(255,255,255,0.75)",textTransform:"uppercase" }}>{crumb.label}</span>
                }
                {i < arr.length - 1 && <span style={{ color:"rgba(255,255,255,0.3)",fontSize:"0.7rem" }}>›</span>}
              </span>
            ))}
          </nav>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",display:"block",marginBottom:"1rem" }}>INDUSTRIAL OVENS — WALK-IN</span>
          <h1 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(2.6rem,7vw,5rem)",fontWeight:800,color:"#fff",lineHeight:1.0,letterSpacing:"-0.01em",marginBottom:"1rem",maxWidth:"700px" }}>
            Walk-In Curing Ovens<br />
            Built for Production
          </h1>
          <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"rgba(27,58,107,0.75)",border:"1px solid rgba(107,163,224,0.4)",color:"#6fa3e0",borderRadius:"2px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.3rem 0.75rem",marginBottom:"1.25rem" }}>PFS VULCAN SERIES</span>
          <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:"2.5rem",maxWidth:"520px" }}>
            Industrial walk-in curing ovens for powder coating, liquid paint baking, and heat treating. Double-wall insulated panels, UL 508A controls, gas or electric heat. Custom sizes available. Ships nationally.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
            <Link href="/contact/request-a-quote?from=walk-in-oven">
              <span className="btn-glow" style={{ width:"100%",maxWidth:"320px",justifyContent:"center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <Link href="/contact/talk-to-an-engineer?from=walk-in-oven">
              <span className="btn-glow-white" style={{ width:"100%",maxWidth:"320px",justifyContent:"center" }}>TALK TO AN ENGINEER <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CERT CAROUSEL ── */}
      <CertCarousel />

      {/* ── OVERVIEW STATS ── */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1.5rem" }}>
            {[
              { val:"20-ga+",  label:"Steel Construction" },
              { val:"6\"",     label:"Insulated Walls & Roof" },
              { val:"UL 508A", label:"Certified Control Panel" },
              { val:"Custom",  label:"Sizes Available" },
              { val:"Gas/LP",  label:"or Electric Heat" },
              { val:"USA",     label:"Manufactured" },
            ].map((s) => (
              <div key={s.val} style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.5rem",textAlign:"center" }}>
                <div style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.9rem",fontWeight:800,color:BLUE,letterSpacing:"-0.01em",lineHeight:1 }}>{s.val}</div>
                <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.78rem",color:"#666",marginTop:"0.4rem",textTransform:"uppercase",letterSpacing:"0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED OVEN ── */}
      <section style={{ background:"#fff",padding:"4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED OVEN</span>
              <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS VULCAN Walk-In Curing Oven</h2>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem",marginBottom:"0.75rem" }}>PFS VULCAN SERIES</span>
              <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
                Double-wall insulated construction. UL 508A controls. Gas, propane, or electric heat. Available in walk-in and drive-in configurations with fork truck access options. Standard and fully custom sizes.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"880px",overflow:"hidden",borderRadius:"2px",background:"#111",padding:"2rem",boxShadow:"0 2px 12px rgba(0,0,0,0.1)" }}>
              <img src={FEATURED_IMG} alt="PFS VULCAN walk-in curing oven" style={{ width:"100%",height:"auto",display:"block",objectFit:"contain",maxHeight:"420px" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=walk-in-oven">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/contact/talk-to-an-engineer?from=walk-in-oven">
                <span className="btn-outline">TALK TO AN ENGINEER <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STANDARD FEATURES — collapsible ── */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:specsOpen?"2rem":0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD FEATURES</span>
              <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Every Oven Ships Fully Equipped</h2>
            </div>
            <button onClick={() => setSpecsOpen(!specsOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:specsOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:specsOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}>
              {specsOpen ? <><ChevronUp size={15}/> HIDE FEATURES</> : <><ChevronDown size={15}/> SEE STANDARD FEATURES</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column" }}>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.6,flex:1,marginBottom:"1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=walk-in-oven"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2rem",fontWeight:800,color:"#dde3ee",lineHeight:1,marginBottom:"0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",marginBottom:"0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.6,flex:1,marginBottom:"1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=walk-in-oven"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
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

      {/* ── SAFETY SYSTEMS HIGHLIGHT ── */}
      <section style={{ background:"#111",padding:"3rem 0",borderTop:`4px solid ${BLUE}` }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",gap:"1.5rem",maxWidth:960,margin:"0 auto" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>BUILT-IN PROTECTION</span>
              <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Comprehensive Safety — Standard on Every Unit</h2>
              <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
                PFS walk-in ovens include the following safety equipment as standard:
              </p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"0.75rem" }}>
              {[
                "UL 508A Industrial Control Panel","NEMA-Rated Electrical Enclosure","Manual Gas Shutoff Valves",
                "High & Low Gas Pressure Switches","Flame Safeguard System","Automatic Burner Shutdown",
                "Combustion Airflow Verification","Chamber Temperature Monitoring","High-Limit Temperature Protection",
                "Combustion & Oven Purge Cycle","Motor Overload Protection","Emergency Stop Circuitry",
                "Seismic-Ready Structure",
              ].map((item) => (
                <div key={item} style={{ display:"flex",alignItems:"center",gap:"0.6rem",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",padding:"0.75rem 1rem" }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:BLUE,flexShrink:0 }} />
                  <span style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.8)",lineHeight:1.4 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center",marginTop:"0.5rem" }}>
              <Link href="/contact/talk-to-an-engineer?from=walk-in-oven">
                <span className="btn-glow">TALK TO AN ENGINEER <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIZES — collapsible selector ── */}
      <section style={{ background:"#fff",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:sizesOpen?"2rem":0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD SIZES</span>
              <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Find Your Configuration</h2>
            </div>
            <button onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE SIZES</> : <><ChevronDown size={15}/> SEE STANDARD SIZES</>}
            </button>
          </div>

          {sizesOpen && (
            <>
              <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.88rem",color:"#666",marginBottom:"1.75rem" }}>
                Select a width — available depths appear below. All sizes listed at 10&apos; interior height. Custom heights, widths, and depths available on request.
              </p>

              {/* Width selector */}
              <div style={{ marginBottom:"1.5rem" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",marginBottom:"0.6rem" }}>SELECT WIDTH</div>
                <div style={{ display:"inline-flex",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",flexWrap:"wrap" }}>
                  {WIDTH_KEYS.map((w, i, arr) => (
                    <button
                      key={w}
                      onClick={() => { setSelectedWidth(w); setSelectedDepth(null); }}
                      style={{ padding:"0.75rem 1.75rem",background:selectedWidth===w?BLUE:"transparent",color:selectedWidth===w?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:i<arr.length-1?`1px solid ${BLUE}`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
                    >{w} WIDE</button>
                  ))}
                </div>
              </div>

              {/* Depth cards */}
              {selectedWidth && availableDepths.length > 0 && (
                <div style={{ marginBottom:"1.5rem" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",marginBottom:"0.75rem" }}>AVAILABLE LENGTHS — {selectedWidth} WIDE × 10&apos; HIGH</div>
                  <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                    {availableDepths.map((d) => (
                      <div
                        key={d}
                        onClick={() => setSelectedDepth(d)}
                        style={{ background:selectedDepth===d?BLUE:"#f5f5f5",border:`2px solid ${BLUE}`,padding:"1.25rem 1.5rem",minWidth:"180px",textAlign:"center",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
                      >
                        <div style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.5rem",fontWeight:800,color:selectedDepth===d?"#fff":"#111",letterSpacing:"0.02em",marginBottom:"0.2rem" }}>{selectedWidth} × 10&apos; × {d}</div>
                        <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.72rem",color:selectedDepth===d?"rgba(255,255,255,0.7)":"#888",marginBottom:"0.85rem" }}>W × H × L</div>
                        <Link href="/contact/request-a-quote?from=walk-in-oven"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:selectedDepth===d?"#fff":BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>GET PRICING <ArrowRight size={12}/></span></Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common sizes quick reference */}
              <div style={{ background:"#f5f5f5",border:"1px solid #e5e7eb",padding:"1.5rem 2rem",marginBottom:"1.5rem" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",marginBottom:"0.75rem" }}>COMMON SIZES — QUICK REFERENCE</div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem" }}>
                  {["10×10×10","10×10×15","10×10×20","10×10×30","12×10×20","12×10×30","12×10×40","14×10×20","14×10×30","16×10×20","16×10×30"].map((sz) => (
                    <Link key={sz} href="/contact/request-a-quote?from=walk-in-oven">
                      <span style={{ display:"inline-flex",alignItems:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:BLUE,border:`1px solid ${BLUE}`,padding:"0.4rem 0.9rem",cursor:"pointer",letterSpacing:"0.06em" }}>{sz}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Custom sizes CTA */}
              <div style={{ background:BLUE,padding:"1.75rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem" }}>
                <div>
                  <div style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"#fff",letterSpacing:"0.02em",marginBottom:"0.25rem" }}>Need a Custom Size?</div>
                  <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.83rem",color:"rgba(255,255,255,0.8)" }}>Custom widths, heights, and lengths available. We engineer to your facility and production requirements.</div>
                </div>
                <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                  <Link href="/contact/request-a-quote?from=walk-in-oven">
                    <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",cursor:"pointer",whiteSpace:"nowrap" }}>REQUEST CUSTOM SIZE <ArrowRight size={14}/></span>
                  </Link>
                  <Link href="/contact/talk-to-an-engineer?from=walk-in-oven">
                    <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.5)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",cursor:"pointer",whiteSpace:"nowrap" }}>TALK TO AN ENGINEER <ArrowRight size={14}/></span>
                  </Link>
                </div>
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
            <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="320px" className="grid grid-cols-1 sm:grid-cols-3 gap-3" />
          </div>
          <div className="text-center" style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=walk-in-oven">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
            <a href="tel:8885457715">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>


      {/* ── FAQ SECTION ── */}
      <section style={{ background:"#f9f9f9", padding:"4rem 0" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What temperature does a powder coating oven need to reach?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most powder coatings cure between 325°F and 400°F (163°C–204°C), with 350°F being the most common cure temperature. PFS walk-in ovens are engineered to maintain temperature uniformity within ±10°F throughout the full chamber, ensuring consistent cure quality across every part in the load." } },
            { "@type": "Question", "name": "What is the difference between a direct-fired and indirect-fired curing oven?",
              "acceptedAnswer": { "@type": "Answer", "text": "A direct-fired oven introduces combustion gases directly into the oven airstream, providing high efficiency and fast heat-up times. An indirect-fired oven uses a heat exchanger to keep combustion gases separated from the product, which is required for solvent-based coatings and applications where combustion byproducts could contaminate the finish. PFS offers both configurations." } },
            { "@type": "Question", "name": "What size curing oven do I need?",
              "acceptedAnswer": { "@type": "Answer", "text": "Oven sizing depends on the largest part or assembly you need to cure, your production throughput requirements, and how parts will be loaded (fork truck, overhead crane, cart). PFS engineers will review your part dimensions and production volume to recommend the right chamber size, door configuration, and heating capacity for your operation." } },
            { "@type": "Question", "name": "Does a curing oven need to comply with NFPA 86?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Industrial ovens used for curing coatings must comply with NFPA 86 (Standard for Ovens and Furnaces), which governs ventilation, purge cycles, safety interlocks, flame safeguard systems, and combustion controls. All PFS walk-in ovens are engineered and built to meet NFPA 86 requirements." } },
            { "@type": "Question", "name": "Can a PFS walk-in oven be integrated with a powder coating booth?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS designs and manufactures both the powder coating booth and the curing oven, so integration is straightforward. We can engineer a complete powder coating line — booth, conveyor, and oven — or supply the oven as a standalone unit to pair with your existing equipment." } }
          ]
        })}} />
        <div className="container" style={{ maxWidth:"860px" }}>
          <p style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#1a3a6b", marginBottom:"0.75rem" }}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:800, color:"#0d1b2a", marginBottom:"2.5rem", lineHeight:1.1 }}>Walk-In Curing Oven FAQ</h2>
          {[
            { q:"What temperature does a powder coating oven need to reach?", a:"Most powder coatings cure between 325°F and 400°F (163°C–204°C), with 350°F being the most common cure temperature. PFS walk-in ovens are engineered to maintain temperature uniformity within ±10°F throughout the full chamber, ensuring consistent cure quality across every part in the load." },
            { q:"What is the difference between a direct-fired and indirect-fired curing oven?", a:"A direct-fired oven introduces combustion gases directly into the oven airstream, providing high efficiency and fast heat-up times. An indirect-fired oven uses a heat exchanger to keep combustion gases separated from the product, which is required for solvent-based coatings and applications where combustion byproducts could contaminate the finish. PFS offers both configurations." },
            { q:"What size curing oven do I need?", a:"Oven sizing depends on the largest part or assembly you need to cure, your production throughput requirements, and how parts will be loaded (fork truck, overhead crane, cart). PFS engineers will review your part dimensions and production volume to recommend the right chamber size, door configuration, and heating capacity for your operation." },
            { q:"Does a curing oven need to comply with NFPA 86?", a:"Yes. Industrial ovens used for curing coatings must comply with NFPA 86 (Standard for Ovens and Furnaces), which governs ventilation, purge cycles, safety interlocks, flame safeguard systems, and combustion controls. All PFS walk-in ovens are engineered and built to meet NFPA 86 requirements." },
            { q:"Can a PFS walk-in oven be integrated with a powder coating booth?", a:"Yes. PFS designs and manufactures both the powder coating booth and the curing oven, so integration is straightforward. We can engineer a complete powder coating line — booth, conveyor, and oven — or supply the oven as a standalone unit to pair with your existing equipment." },
          ].map(({ q, a }, i) => (
            <details key={i} style={{ borderBottom:"1px solid #e5e7eb", paddingBottom:"1.25rem", marginBottom:"1.25rem" }}>
              <summary style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif", fontSize:"1rem", fontWeight:700, color:"#0d1b2a", cursor:"pointer", listStyle:"none", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                {q}
                <span style={{ fontSize:"1.25rem", color:"#1a3a6b", flexShrink:0, marginLeft:"1rem" }}>+</span>
              </summary>
              <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif", fontSize:"0.95rem", color:"#4b5563", lineHeight:1.75, marginTop:"0.75rem" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>
      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Walk-In Oven?</h2>
          <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Every system factory-tested before shipment.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=walk-in-oven">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>GET PRICING <ArrowRight size={15}/></span>
            </Link>
            <Link href="/contact/talk-to-an-engineer?from=walk-in-oven">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.5)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>TALK TO AN ENGINEER <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <section style={{ padding:"4rem 0",background:"#fff" }}>
        <div className="container">
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>COMPLETE YOUR FINISHING LINE</span>
          <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"2.5rem" }}>You May Also Need</h2>
          <SiteProductCardSection cards={PRODUCTS} />
        </div>
      </section>

    </div>
  );
}
