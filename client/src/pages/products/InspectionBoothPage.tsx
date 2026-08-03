/*
 * Inspection Booths — PFS Atlas Series
 * Layout: CrossFlow format — full-bleed MP4 video hero, cert carousel,
 *         featured product, collapsible specs/sizes, gallery, CTA band,
 *         heated options, pairs well with, related products
 * Route: /products/paint-booths/inspection
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO   = "/manus-storage/pfs-inspection-hero_c1cd5e13.mp4";
const HERO_POSTER  = "/manus-storage/pfs-inspection-hero_1b83deb1.png";
const FEATURED_IMG = "/manus-storage/pfs-inspection-hero_1b83deb1.png";

const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-inspection-grey-car_388ad0fd.png",   alt: "PFS Atlas inspection booth — grey vehicle on lift under high-CRI LED lighting",  pos: "center 40%" },
  { src: "/manus-storage/pfs-inspection-airplane_ae784329.png",   alt: "PFS Atlas inspection booth — aircraft fuselage inspection tunnel with LED banks", pos: "center 50%" },
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
  { num: "01", title: "High-CRI LED Lighting — 95+ CRI",         body: "Every PFS Atlas inspection booth ships with high-CRI (95+) LED lighting systems that reveal surface defects, orange peel, and color inconsistencies invisible under standard shop lighting. Uniform, shadow-free illumination across the entire inspection zone." },
  { num: "03", title: "UL 508A Control Panel",                   body: "Pairs with our PFS Core Control Panel — UL 508A certified with programmable lighting modes, safety interlocks, and optional BMS integration. Precision control for every inspection cycle." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "Controlled Laminar Airflow",              body: "Engineered airflow patterns maintain a clean, particulate-free environment during inspection. Prevents dust and overspray contamination from compromising surface quality assessments." },
  { num: "05", title: "CID2 Lighting — 4-Tube Fixtures",         body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination for accurate color and defect detection." },
  { num: "06", title: "Galvanized or Powder Coated Steel",        body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "07", title: "Multi-Industry Applications",             body: "Used in automotive refinishing, aerospace, heavy equipment, and precision manufacturing. PFS Atlas inspection booths are engineered to meet the strictest quality control requirements across industries." },
  { num: "08", title: "We Ship Nationally",                      body: "PFS inspection booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "10": [{ w:"14'",h:"10'",l:"24'" },{ w:"14'",h:"10'",l:"27'" },{ w:"14'",h:"10'",l:"30'" }],
  "12": [{ w:"14'",h:"12'",l:"24'" },{ w:"14'",h:"12'",l:"27'" },{ w:"14'",h:"12'",l:"30'" },{ w:"14'",h:"12'",l:"36'" }],
  "14": [{ w:"16'",h:"14'",l:"30'" },{ w:"16'",h:"14'",l:"36'" },{ w:"16'",h:"14'",l:"42'" },{ w:"20'",h:"14'",l:"42'" }],
};

const PRODUCTS = [
  { label: "Cross-Flow Booths",      href: "/products/paint-booths/crossflow",      img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",              desc: "Horizontal airflow — the most cost-effective enclosed booth for automotive and industrial finishing." },
  { label: "Semi-Downdraft Booths",  href: "/products/paint-booths/semi-downdraft", img: "/manus-storage/orion-semi-down-epoxy_9144ba19.png",             desc: "Rear-angled exhaust for versatile applications — a step up from crossflow airflow." },
  { label: "Air Make-Up Units",      href: "/products/air-make-up-units",            img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                      desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Prep Stations",          href: "/products/prep-support/prep-stations",               img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",      desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
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

export default function InspectionBoothPage() {
  useSEO({
    title: "Inspection Booths | Quality Control Finishing Booths | PFS",
    description: "PFS inspection booths deliver controlled lighting and airflow for quality control inspection of painted and coated parts. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/inspection",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED VIDEO HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(340px, 65vh, 680px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <video preload="auto"
          autoPlay
          loop
          muted
          playsInline
         
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark gradient — heavier at bottom so text is always readable */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
        {/* Blue accent line at bottom of hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "3.5rem" }}>
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
            Inspection Booths<br />
            Built for Precision
          </h1>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)",
            color: "#6fa3e0", borderRadius: "2px",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "0.3rem 0.75rem", marginBottom: "1.25rem",
          }}>PFS ATLAS SERIES</span>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            manufactured in the USA with ETL/UL listed and UL 508A certified components. High-CRI LED lighting and controlled airflow for post-paint quality inspection in automotive, aerospace, and industrial applications. Ships nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=inspection-booth">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }}>
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "1.1rem 2.5rem", cursor: "pointer",
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
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED INSPECTION BOOTH</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Atlas Inspection Booth</h2>
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem",marginBottom:"0.75rem" }}>PFS ATLAS SERIES</span>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
                High-CRI LED lighting. manufactured in the USA with ETL/UL listed components. UL 508A controls. Built to NFPA 33 standards. Engineered for automotive, aerospace, and industrial quality inspection. Custom sizes available.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"900px",overflow:"hidden",borderRadius:"2px" }}>
              <img src={FEATURED_IMG} alt="PFS Atlas Series Inspection Booth — black vehicle in dramatic LED inspection tunnel" style={{ width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=inspection-booth">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/paint-booths">
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>SEE ALL PAINT BOOTHS <ArrowRight size={15}/></span>
              </Link>
            </div>
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
                    <Link href="/contact/request-a-quote?from=inspection-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
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
                      <Link href="/contact/request-a-quote?from=inspection-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>LEARN MORE <ArrowRight size={12}/></span></Link>
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
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Choose Your Ceiling Height</h2>
            </div>
            <button onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE SIZES</> : <><ChevronDown size={15}/> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",marginBottom:"1.5rem" }}>Select a ceiling height to see available lengths. Custom sizes available for aerospace and heavy equipment applications.</p>
              <div style={{ display:"inline-flex",border:`2px solid ${BLUE}`,overflow:"hidden",borderRadius:"2px",marginBottom:"2rem" }}>
                {["10","12","14"].map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(selectedHeight === h ? null : h)} style={{ padding:"0.75rem 1.75rem",background:selectedHeight===h?BLUE:"transparent",color:selectedHeight===h?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:"none",borderRight:h!=="14"?`1px solid ${BLUE}`:"none",cursor:"pointer",transition:"background 0.15s,color 0.15s" }}>{h}' HEIGHT</button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"1.5rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.4rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.25rem" }}>{s.w} × {s.h} × {s.l}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.72rem",color:"#888",marginBottom:"1rem" }}>W × H × L</div>
                      <Link href="/contact/request-a-quote?from=inspection-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>GET PRICING <ArrowRight size={12}/></span></Link>
                    </div>
                  ))}
                </div>
              )}
              {!selectedHeight && (
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.85rem",color:"#888",fontStyle:"italic",marginBottom:"1.5rem" }}>Select a height above to view available standard lengths.</p>
              )}
              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=inspection-booth"><span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15}/></span></Link>
                <Link href="/products/paint-booths"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2rem",cursor:"pointer" }}>SEE ALL PAINT BOOTHS <ArrowRight size={15}/></span></Link>
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
            <Link href="/contact/request-a-quote?from=inspection-booth">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Inspection Booth?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=inspection-booth">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.6)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTING OPTIONS */}
      <section style={{ background:"#111",padding:"3rem 0",borderTop:`4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>ADD-ON</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Premium LED Lighting Upgrades Available</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",maxWidth:"480px",margin:"0 auto 1.75rem",lineHeight:1.7 }}>
            Upgrade to 95+ CRI LED systems for the most accurate color matching and defect detection available. Ideal for high-end automotive, aerospace, and precision manufacturing inspection environments.
          </p>
          <Link href="/contact/request-a-quote?from=inspection-booth">
            <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2.5rem",cursor:"pointer" }}>ASK ABOUT LED UPGRADES <ArrowRight size={15}/></span>
          </Link>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background:"#fff",padding:"3rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.3rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Pairs Well With a Spray Booth or Prep Station</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#666",maxWidth:"480px",margin:"0 auto 1.5rem",lineHeight:1.7 }}>
            Maximize throughput by pairing your inspection booth with a dedicated spray booth for painting and a prep station for masking — creating a complete, efficient finishing workflow.
          </p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/products/paint-booths/crossflow">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW SPRAY BOOTHS <ArrowRight size={13}/></span>
            </Link>
            <Link href="/products/prep-support/prep-stations">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW PREP STATIONS <ArrowRight size={13}/></span>
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

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,display:"flex",background:"#111",borderTop:`3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase",borderRight:"1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=inspection-booth" style={{ flex:1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
