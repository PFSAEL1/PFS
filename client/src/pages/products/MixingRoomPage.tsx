/**
 * Mixing Rooms — PFS
 * Route: /products/mixing-rooms
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Same layout rules as CrossFlowBoothPage and EnclosedBoothPage
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG   = "/manus-storage/IMG_0499_cb046812.jpg";
const HERO_VIDEO = "/manus-storage/mixing-room-hero_5bbece5b.mp4";
const FEATURED_IMG = "/manus-storage/IMG_0500_f0ae47bd.jpg";

const GALLERY_IMGS = [
  { src: "/manus-storage/mixing-room-front_aaede323.jpg",       alt: "PFS mixing room — front view with PFS branding",             pos: "center 35%" },
  { src: "/manus-storage/IMG_0632_68d81cc2.jpg",                alt: "PFS mixing room — double-door entry with exhaust stack",      pos: "center 40%" },
  { src: "/manus-storage/IMG_0633_bba53fbe.jpg",                alt: "PFS mixing room — side view showing exhaust and controls",    pos: "center 50%" },
  { src: "/manus-storage/IMG_0223_897429e6.jpg",                alt: "PFS mixing room — interior setup",                           pos: "center 50%" },
  { src: "/manus-storage/mixing-room-fullsize_eac6ee2f.jpg",    alt: "PFS mixing room — full-size exterior view",                  pos: "center 50%" },
  { src: "/manus-storage/IMG_2132_9f9c9e9a.jpg",                alt: "PFS mixing room — install view",                             pos: "center 50%" },
  { src: "/manus-storage/IMG_5393_3b824496.jpg",                alt: "PFS mixing room — shop installation",                        pos: "center 50%" },
  { src: "/manus-storage/IMG_0498_a98f5f38.jpg", alt: "PFS mixing room — render overview",                         pos: "center 50%" },
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

/* ── SPEC TABLE DATA ── */
// Source: PFS Standard Paint Mix Rooms spec sheet
const SIZES: Record<string, { model: string; depth: string; height: string; width: string; lights: number; door: string; exhaust: string; weight: string }> = {
  "MR6":  { model: "PFS-MR6-98",  depth: "6'",  height: "8'", width: "9'", lights: 1, door: "3' × 7'", exhaust: "12\"", weight: "1,450 lbs" },
  "MR9":  { model: "PFS-MR9-98",  depth: "9'",  height: "8'", width: "9'", lights: 2, door: "3' × 7'", exhaust: "12\"", weight: "1,600 lbs" },
  "MR12": { model: "PFS-MR12-98", depth: "12'", height: "8'", width: "9'", lights: 3, door: "3' × 7'", exhaust: "12\"", weight: "1,800 lbs" },
  "MR15": { model: "PFS-MR15-98", depth: "15'", height: "8'", width: "9'", lights: 4, door: "3' × 7'", exhaust: "12\"", weight: "2,000 lbs" },
};
const SIZE_KEYS = ["MR6", "MR9", "MR12", "MR15"] as const;

const FEATURES_VISIBLE = [
  { num: "02", title: "UL 508A Control Panel",             body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
  { num: "03", title: "UL Listed Tube Axial Fans",         body: "High-efficiency, UL listed tube axial fans provide consistent ventilation and exhaust airflow — keeping solvent vapors below hazardous levels at all times." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "CID2 Lighting — 4-Tube Fixtures",          body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination for accurate color matching." },
  { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated configurations." },
  { num: "06", title: "Galvanized or Powder Coated Steel",         body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "07", title: "1/2 HP Motor — All Models",                 body: "All standard mixing rooms ship with a 1/2 HP motor providing reliable exhaust ventilation. Sized to maintain safe vapor concentrations across all standard room depths." },
  { num: "08", title: "12\" Exhaust Duct — Standard",              body: "12\" exhaust duct on all models. Connects directly to your existing exhaust stack or can be routed through the roof or wall with standard HVAC fittings." },
  { num: "09", title: "Personnel Door — Every Unit",               body: "Every mixing room includes one 3' × 7' personnel door with window for visibility and safe entry. Positive-pressure door seal keeps vapors contained." },
  { num: "10", title: "We Ship Nationally",                        body: "PFS mixing rooms ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const PRODUCTS = [
  { label: "Cross-Flow Spray Booths", href: "/products/paint-booths/crossflow",       img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",              desc: "Horizontal airflow enclosed booths — the most cost-effective enclosed booth for automotive and industrial finishing." },
  { label: "Air Make-Up Units",       href: "/products/air-make-up-units",             img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                      desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Prep Stations",           href: "/products/prep-support/prep-stations",   img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",     desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Batch Ovens",             href: "/products/ovens/batch",                  img: "/manus-storage/IMG_4175_a7a2b2ea.jpg",                          desc: "Industrial batch ovens for powder coat curing, heat treating, and drying applications." },
];

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

export default function MixingRoomPage() {
  useSEO({
    title: "Paint Mixing Rooms | Industrial Paint Mix Rooms | PFS",
    description: "PFS industrial paint mixing rooms provide a safe, ventilated, code-compliant space for paint preparation, thinning, color matching, straining, and storage. Cross-flow ventilation, integrated or stand-alone, ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/mixing-room",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [specsOpen,    setSpecsOpen]    = useState(false);
  const [sizesOpen,    setSizesOpen]    = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
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

      {/* ── FULL-BLEED HERO ── */}
      <section style={{
        position:"relative",
        minHeight:"clamp(340px, 55vh, 580px)",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end",
        overflow:"hidden",
      }}>
        <img
          src={HERO_IMG}
          alt="PFS paint mixing room with ventilation and storage systems"
          aria-hidden="true"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 35%",opacity:videoReady?0:1,transition:"opacity 0.7s ease",zIndex:0 }}
        />
        <video
          ref={videoRef}
          preload="auto"
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",opacity:videoReady?1:0,transition:"opacity 0.7s ease",zIndex:0 }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)" }} />
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:BLUE,zIndex:3 }} />
        <div className="container" style={{ position:"relative",zIndex:2,paddingTop:"8rem",paddingBottom:"4.5rem" }}>
          <span style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",display:"block",marginBottom:"1rem" }}>
            PREP &amp; SUPPORT — MIXING ROOMS
          </span>
          <h1 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(2.6rem,7vw,5rem)",fontWeight:800,color:"#fff",lineHeight:1.0,letterSpacing:"-0.01em",marginBottom:"1rem",maxWidth:"680px" }}>
            Paint Mixing<br />
            Rooms Built<br />
            to Code
          </h1>
          <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"rgba(27,58,107,0.75)",border:"1px solid rgba(107,163,224,0.4)",color:"#6fa3e0",borderRadius:"2px",fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.3rem 0.75rem",marginBottom:"1.25rem" }}>
            PFS STANDARD SERIES
          </span>
          <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:"2.5rem",maxWidth:"500px" }}>
            ETL listed. UL 508A certified. NFPA 33 compliant. Dedicated mixing rooms for safe paint preparation adjacent to your spray booth. Ships nationally.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
            <Link href="/contact/request-a-quote?from=mixing-room">
              <span className="btn-glow" style={{ width:"100%",maxWidth:"320px",justifyContent:"center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width:"100%",maxWidth:"320px" }}>
              <span className="btn-glow-white" style={{ background:"transparent",color:"#fff",width:"100%",maxWidth:"320px",justifyContent:"center" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* CERT CAROUSEL */}
      <CertCarousel />

      {/* FEATURED UNIT */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED UNIT</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Standard Paint Mix Room</h2>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem",marginBottom:"0.75rem" }}>PFS STANDARD SERIES</span>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
                ETL listed. UL 508A controls. Built to NFPA 33 standards. Standard sizes 9'W × 8'H × 6–15'D. Custom sizes available.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"900px",overflow:"hidden",borderRadius:"2px" }}>
              <img src={FEATURED_IMG} alt="PFS Standard Paint Mix Room" style={{ width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=mixing-room">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* STANDARD FEATURES — collapsible */}
      <section style={{ background:"#fff",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:specsOpen?"2rem":0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD FEATURES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Every Unit Ships Fully Certified</h2>
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
                    <Link href="/contact/request-a-quote?from=mixing-room">
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
                      <Link href="/contact/request-a-quote?from=mixing-room">
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

      {/* STANDARD SIZES — collapsible */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:sizesOpen?"2rem":0 }}>
            <div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.3rem" }}>STANDARD SIZES</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Typical Sizes — Custom Sizes Available</h2>
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
                All standard mixing rooms are 9'W × 8'H. Select a model to see full specifications. Custom sizes available on request.
              </p>
              {/* Model selector buttons */}
              <div style={{ display:"inline-flex",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",marginBottom:"2rem",flexWrap:"wrap" }}>
                {SIZE_KEYS.map((key, idx) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSize(selectedSize === key ? null : key)}
                    style={{ padding:"0.75rem 1.75rem",background:selectedSize===key?BLUE:"transparent",color:selectedSize===key?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:idx<SIZE_KEYS.length-1?`1px solid ${BLUE}`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}
                  >
                    {key} — {SIZES[key].depth}D
                  </button>
                ))}
              </div>
              {selectedSize && (() => {
                const s = SIZES[selectedSize];
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"1.5rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.25rem" }}>{s.width} × {s.height} × {s.depth}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888",marginBottom:"0.5rem" }}>W × H × D (inside)</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.78rem",color:"#555",marginBottom:"0.25rem" }}>Model: {s.model}</div>
                    </div>
                    <div style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.5rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:BLUE,marginBottom:"0.25rem" }}>{s.lights}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888" }}>Light Fixture{s.lights > 1 ? "s" : ""}</div>
                    </div>
                    <div style={{ background:"#fff",border:"1px solid #e5e7eb",padding:"1.5rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:BLUE,marginBottom:"0.25rem" }}>{s.door}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888" }}>Personnel Door</div>
                    </div>

                  </div>
                );
              })()}
              {!selectedSize && (
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#888",marginBottom:"2rem" }}>Select a model above to view full specifications.</p>
              )}
              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=mixing-room">
                  <span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15}/></span>
                </Link>
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
            <Link href="/contact/request-a-quote?from=mixing-room">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Mixing Room?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=mixing-room">
              <span className="btn-glow-white">GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-glow-white" style={{ background:"transparent",color:"#fff" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Paint Mixing Rooms — Common Questions</h2>
          </div>
          {[
            { q: "What is an industrial paint mixing room used for?", a: "An industrial paint mixing room provides a dedicated, code-compliant space for paint preparation, thinning, color matching, straining, and storage of flammable liquids. Continuous cross-flow ventilation removes paint and solvent fumes, keeping the environment safe for workers and compliant with OSHA, NFPA 33, and local fire codes." },
            { q: "Does a paint mixing room need to be NFPA 33 compliant?", a: "Yes. Paint mixing rooms used for the preparation and storage of flammable coatings are subject to NFPA 33 requirements. PFS mixing rooms are built to NFPA 33 standards with ETL/UL listed and certified components, OSHA compliant cross-flow ventilation, and a built-in 4-inch containment base for spill capture." },
            { q: "What is the difference between an integrated and a stand-alone mixing room?", a: "An integrated mixing room is built as part of the spray booth system — sharing a common wall with the booth and delivered as a single unit. A stand-alone mixing room is a self-contained unit that can be placed anywhere in your facility. PFS manufactures both configurations. Integrated rooms offer the advantage of single-source delivery, installation, and accountability." },
            { q: "Can PFS build a custom-size mixing room?", a: "Yes. PFS manufactures mixing rooms in standard and custom sizes. Standard configurations range from 8' x 8' to 12' x 16', but custom dimensions are available for non-standard facility layouts. Contact a PFS engineer for a custom quote." },
            { q: "What ventilation system does a PFS mixing room use?", a: "PFS mixing rooms use a cross-flow ventilation system that continuously draws fresh air through intake filters on one wall and exhausts through filters on the opposite wall. This constant air exchange removes paint fumes, solvent vapors, and particulates, maintaining a safe working environment and complying with OSHA and NFPA 33 ventilation requirements." },
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
            { "@type": "Question", "name": "What is an industrial paint mixing room used for?", "acceptedAnswer": { "@type": "Answer", "text": "An industrial paint mixing room provides a dedicated, code-compliant space for paint preparation, thinning, color matching, straining, and storage of flammable liquids. Continuous cross-flow ventilati..." } },
            { "@type": "Question", "name": "Does a paint mixing room need to be NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Paint mixing rooms used for the preparation and storage of flammable coatings are subject to NFPA 33 requirements. PFS mixing rooms are built to NFPA 33 standards with ETL/UL listed and certified..." } },
            { "@type": "Question", "name": "What is the difference between an integrated and a stand-alone mixing room?", "acceptedAnswer": { "@type": "Answer", "text": "An integrated mixing room is built as part of the spray booth system — sharing a common wall with the booth and delivered as a single unit. A stand-alone mixing room is a self-contained unit that can ..." } },
            { "@type": "Question", "name": "Can PFS build a custom-size mixing room?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS manufactures mixing rooms in standard and custom sizes. Standard configurations range from 8' x 8' to 12' x 16', but custom dimensions are available for non-standard facility layouts. Contact..." } },
            { "@type": "Question", "name": "What ventilation system does a PFS mixing room use?", "acceptedAnswer": { "@type": "Answer", "text": "PFS mixing rooms use a cross-flow ventilation system that continuously draws fresh air through intake filters on one wall and exhausts through filters on the opposite wall. This constant air exchange ..." } }
          ]
        }) }} />
      </section>

      {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="Complete Your Finishing Line"
        label="Mixing rooms pair best with enclosed spray booths, air make-up units, and prep stations."
        cards={PRODUCTS.map(p => ({ label: p.label, href: p.href, img: p.img, desc: p.desc }))}
      />

      {/* BOTTOM CTA */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0",borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Questions? Talk to an Engineer.</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",marginBottom:"2rem",maxWidth:"460px",margin:"0 auto 2rem" }}>Our team has configured hundreds of mixing rooms for automotive, industrial, and production finishing shops.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=mixing-room">
              <span className="btn-glow">GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-outline">CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
