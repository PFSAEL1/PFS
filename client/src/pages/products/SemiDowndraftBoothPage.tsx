/*
 * Semi-Downdraft Spray Booths — PFS Orion Series
 * Route: /products/paint-booths/semi-downdraft
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 *
 * Image assignments (FINAL):
 *   HERO_IMG      = semi-down-open-front-hero.png  (real open-front photo, yellow exhaust wall visible)
 *   FEATURED_IMG  = orion-semi-down-epoxy.png       (epoxy floor render — featured product render)
 *   GALLERY = real photos only (4 photos):
 *     GALLERY_1 = semi-down-exterior-angle.jpg
 *     GALLERY_2 = semi-down-exterior-front.jpg
 *     GALLERY_3 = semi-down-open-doors.jpg
 *     GALLERY_4 = semi-down-interior.jpg
 *   HUB CARD (EnclosedBoothsPage) = orion-semi-down-epoxy.png
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

/* ── CDN ASSETS ── */
const HERO_IMG     = "/manus-storage/semi-down-open-front-hero_5ce2543a_d5528751.png";
const FEATURED_IMG = "/manus-storage/orion-semi-down-epoxy_9144ba19.png";

// Gallery = REAL PHOTOS ONLY
const GALLERY_IMGS = [
  { src: "/manus-storage/semi-down-exterior-front_434341db.jpg", alt: "PFS Orion semi-downdraft booth — exterior 3/4 view with exhaust stack",            pos: "center 50%" },
  { src: "/manus-storage/semi-down-exterior-front_434341db.jpg", alt: "PFS Orion semi-downdraft booth — exterior straight-on front view",                  pos: "center 50%" },
  { src: "/manus-storage/semi-down-open-doors_b8b93fe8.jpg",     alt: "PFS Orion semi-downdraft booth — open doors showing yellow exhaust filter wall",    pos: "center 50%" },
  { src: "/manus-storage/semi-down-interior_8fc4094d.jpg",       alt: "PFS Orion semi-downdraft booth — interior wide shot with ceiling intake and lighting", pos: "center 50%" },
  { src: "/manus-storage/pfs-gallery-img0916_b2d05dd2.jpg",      alt: "PFS spray booth — real installation photo",                                         pos: "center 50%" },
  { src: "/manus-storage/semi-down-open-doors_1d86b013.jpg",      alt: "PFS spray booth — real installation photo",                                         pos: "center 50%" },
  { src: "/manus-storage/pfs-gallery-img0913_83a94ba3.jpg",      alt: "PFS spray booth — real installation photo",                                         pos: "center 50%" },
  { src: "/manus-storage/pfs-gallery-img0914_0ce05fb0.jpg",      alt: "PFS spray booth — real installation photo",                                         pos: "center 50%" },
  { src: "/manus-storage/orion-semi-down-epoxy_9144ba19.png",       alt: "PFS Orion semi-downdraft spray booth — clean white render with epoxy floor",        pos: "center 50%" },
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
  { num: "03", title: "Semi-Downdraft Airflow Pattern",   body: "Air enters through ceiling intake filters (front 60%), flows downward through the booth, sweeps along the floor to the rear, and exits through the side-wall exhaust plenum and out the exhaust stack — superior overspray capture vs. cross-flow." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "CID2 Lighting — 4-Tube Fixtures",          body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination across the full booth." },
  { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters", body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "06", title: "Galvanized or Powder Coated Steel",         body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "07", title: "Rear Exhaust Plenum",                       body: "Dedicated rear-wall exhaust plenum channels air from the floor-level exhaust filters up through the exhaust stack — keeping overspray away from the operator and out of the workspace." },
  { num: "08", title: "We Ship Nationally",                        body: "PFS semi-downdraft booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "9":  [{ w:"14'",h:"9'", l:"24'" },{ w:"14'",h:"9'", l:"27'" },{ w:"14'",h:"9'", l:"30'" },{ w:"14'",h:"9'", l:"33'" }],
  "10": [{ w:"14'",h:"10'",l:"24'" },{ w:"14'",h:"10'",l:"27'" },{ w:"14'",h:"10'",l:"30'" },{ w:"14'",h:"10'",l:"33'" }],
  "12": [{ w:"14'",h:"12'",l:"24'" },{ w:"14'",h:"12'",l:"27'" },{ w:"14'",h:"12'",l:"30'" },{ w:"14'",h:"12'",l:"33'" }],
};

const PRODUCTS = [
  { label: "Air Make-Up Units",    href: "/products/air-make-up-units",             img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                                                                                          desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms",         href: "/products/mixing-rooms",                 img: "/manus-storage/IMG_0498_a98f5f38.jpg",                                                                                     desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations",        href: "/products/prep-support/prep-stations",                img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",                                                                                 desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Cross-Flow Booths",    href: "/products/paint-booths/crossflow-booth", img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",                                                                                           desc: "Horizontal airflow — the most cost-effective enclosed booth for automotive and industrial finishing." },
];

/* ── LIGHTBOX ── */



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

/* ── SEMI-DOWNDRAFT AIRFLOW SVG (inline animated) ── */
function SemiDowndraftAirflowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"680px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes sdDown  { 0%{stroke-dashoffset:220;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes sdFloor { 0%{stroke-dashoffset:240;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes sdUp    { 0%{stroke-dashoffset:260;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .sd-d1{animation:sdDown  2.2s linear infinite 0.0s}
          .sd-d2{animation:sdDown  2.2s linear infinite 0.55s}
          .sd-d3{animation:sdDown  2.2s linear infinite 1.1s}
          .sd-fl{animation:sdFloor 2.0s linear infinite 0.0s}
          .sd-fl2{animation:sdFloor 2.0s linear infinite 0.5s}
          .sd-up{animation:sdUp   2.4s linear infinite 0.0s}
          .sd-up2{animation:sdUp  2.4s linear infinite 0.6s}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        <rect x="88"  y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="140" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="192" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="244" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="296" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="348" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="598" y="60" width="22" height="130" rx="0" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <rect x="595" y="192" width="28" height="38" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="595" y="234" width="28" height="26" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="608" y="8" width="30" height="54" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-d1"/>
        <polygon points="104,256 110,268 116,256" fill="#22c55e"/>
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-d2"/>
        <polygon points="208,256 214,268 220,256" fill="#22c55e"/>
        <line x1="318" y1="60" x2="318" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-d3"/>
        <polygon points="312,256 318,268 324,256" fill="#22c55e"/>
        <line x1="82"  y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-fl"/>
        <polygon points="590,252 602,258 590,264" fill="#22c55e"/>
        <line x1="82"  y1="266" x2="596" y2="266" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 10" className="sd-fl2"/>
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="sd-up"/>
        <polygon points="603,10 609,0 615,10" fill="#22c55e"/>
        <line x1="617" y1="258" x2="617" y2="10" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 10" className="sd-up2"/>
        <text x="220" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">CEILING INTAKE FILTERS</text>
        <text x="660" y="212" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="660" y="226" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">FILTERS</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill="#1B3A6B">STACK</text>
      </svg>
    </div>
  );
}

export default function SemiDowndraftBoothPage() {
  useSEO({
    title: "Semi-Downdraft Paint Booths | PFS Orion Series | No Pit Required | NFPA 33",
    description: "The PFS Orion semi-downdraft spray booth delivers near-downdraft airflow quality without a concrete floor pit. Air enters through front ceiling intake filters (60% of ceiling area), sweeps floor-to-rear, and exhausts through a rear wall plenum — no underground pit required. Superior overspray capture for automotive refinishing, collision repair, and industrial coating. ETL/UL listed components. UL 508A panel. NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/semi-downdraft",
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
        minHeight: "clamp(380px, 55vh, 600px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <img
          src={HERO_IMG}
          alt="PFS Orion Semi-Downdraft Spray Booth — open front view showing yellow exhaust filter wall"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 45%",
          }}
        />
        {/* Gradient — heavier at bottom for text legibility */}
        <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.25)" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(4,8,20,0.97) 0%, rgba(4,8,20,0.82) 35%, rgba(4,8,20,0.45) 65%, rgba(4,8,20,0.08) 100%)",
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

          {/* Product type badge */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: "rgba(27,58,107,0.85)", border: "1px solid rgba(107,163,224,0.45)",
              color: "#6fa3e0", borderRadius: "2px",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(0.65rem, 2vw, 0.72rem)", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem",
            }}>PFS ORION SERIES</span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: "rgba(220,38,38,0.85)", border: "1px solid rgba(252,165,165,0.4)",
              color: "#fca5a5", borderRadius: "2px",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(0.65rem, 2vw, 0.72rem)", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem",
            }}><Flame size={11} /> HEATED AVAILABLE</span>
          </div>

          {/* Headline — immediately communicates product type */}
          <h1 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.4rem, 9vw, 5.2rem)",
            fontWeight: 800, color: "#fff", lineHeight: 1.0,
            letterSpacing: "-0.01em", marginBottom: "1rem",
            maxWidth: "700px",
            textShadow: "0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.9)",
          }}>
            Semi-Downdraft<br />
            Heated Spray<br />
            Booth — Quote
          </h1>

          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 2.5vw, 1.05rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            maxWidth: "480px",
          }}>
            Near-downdraft airflow quality — without the concrete pit. Air enters through front ceiling intake filters, sweeps floor-level toward the rear, and exhausts through a rear wall plenum. No underground excavation required. Ideal for collision repair shops, automotive refinishing, and industrial facilities where floor modification is not feasible. ETL/UL listed components. UL 508A panel. NFPA 33 compliant. Ships nationally.
          </p>

          {/* CTAs — stacked on mobile, side-by-side on desktop */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", maxWidth: "340px" }}>
            <Link href="/contact/request-a-quote?from=semi-downdraft-booth">
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

      {/* FEATURED PRODUCT RENDER */}
      <section style={{ background:"#f5f5f5", padding:"clamp(2.5rem, 6vw, 4rem) 0 clamp(2rem, 5vw, 3rem)" }}>
        <div className="container">
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>FEATURED PRODUCT</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,4vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Orion Semi-Downdraft Spray Booth</h2>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem",justifyContent:"center",marginBottom:"0.75rem" }}>
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.35rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem" }}>PFS ORION SERIES</span>
                <span style={{ display:"inline-flex",alignItems:"center",gap:"0.35rem",background:"#dc2626",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.28rem 0.85rem" }}><Flame size={10} /> HEATED OPTIONS</span>
              </div>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.95rem)",color:"#555",maxWidth:"540px",margin:"0 auto",lineHeight:1.7 }}>
                Front ceiling intake filters cover 60% of the ceiling area — air enters clean, flows diagonally toward the floor, sweeps rear-ward, and exhausts through a rear wall plenum. No concrete pit required. ETL/UL listed components. UL 508A control panel. NFPA 33 and OSHA compliant. Standard sizes 14'W × 9–12'H × 24–33'L. Heated configurations available. Custom sizes engineered to your facility.
              </p>
            </div>
            {/* Epoxy floor render */}
            <div style={{ width:"100%",maxWidth:"960px",overflow:"hidden",background:"#e8e8e8" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Orion Semi-Downdraft Spray Booth — epoxy floor render with doors open"
                style={{ width:"100%",height:"auto",display:"block",objectFit:"contain",objectPosition:"center" }}
              />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=semi-downdraft-booth">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/paint-booths/enclosed">
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
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.65rem" }}>Semi-Downdraft Airflow Pattern</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"#666",maxWidth:"500px",margin:"0 auto",lineHeight:1.7 }}>
              Air enters through ceiling intake filters on the front 60% of the roof, flows downward, sweeps along the floor toward the rear wall, and exits up through the side-wall exhaust plenum and out the exhaust stack.
            </p>
          </div>
          <SemiDowndraftAirflowSVG />
          <div style={{ textAlign:"center",marginTop:"1.75rem" }}>
            <Link href="/contact/request-a-quote?from=semi-downdraft-booth">
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
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.2rem,3vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>14' Wide — Choose Your Height</h2>
            </div>
            <button onClick={() => setSizesOpen(!sizesOpen)} style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:sizesOpen?BLUE:"transparent",border:`2px solid ${BLUE}`,color:sizesOpen?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.75rem 1.25rem",cursor:"pointer",transition:"background 0.15s,color 0.15s",whiteSpace:"nowrap",minHeight:"48px" }}>
              {sizesOpen ? <><ChevronUp size={15}/> HIDE</> : <><ChevronDown size={15}/> SEE SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.85rem",color:"#666",marginBottom:"1.25rem" }}>All standard booths are 14' wide. Select a ceiling height to see available lengths.</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1.5rem" }}>
                {["9","10","12"].map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(selectedHeight === h ? null : h)} style={{ padding:"0.85rem 1.5rem",background:selectedHeight===h?BLUE:"transparent",color:selectedHeight===h?"#fff":BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",border:`2px solid ${BLUE}`,cursor:"pointer",transition:"background 0.15s,color 0.15s",minHeight:"48px" }}>{h}' HEIGHT</button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background:"#fff",border:`2px solid ${BLUE}`,padding:"1.25rem 1rem",textAlign:"center" }}>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.2rem" }}>{s.w} × {s.h} × {s.l}</div>
                      <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.7rem",color:"#888",marginBottom:"0.85rem" }}>W × H × L</div>
                      <Link href="/contact/request-a-quote?from=semi-downdraft-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.78rem",fontWeight:700,color:BLUE,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer" }}>QUOTE <ArrowRight size={12}/></span></Link>
                    </div>
                  ))}
                </div>
              )}
              {!selectedHeight && <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.85rem",color:"#888",marginBottom:"1.5rem" }}>Select a height above to view available configurations.</p>}
              <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=semi-downdraft-booth"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.75rem",cursor:"pointer",minHeight:"48px" }}>CUSTOM SIZE <ArrowRight size={15}/></span></Link>
                <Link href="/products/paint-booths/enclosed"><span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.85rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.75rem",cursor:"pointer",minHeight:"48px" }}>ALL ENCLOSED BOOTHS <ArrowRight size={15}/></span></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GALLERY — REAL PHOTOS ONLY (4 photos) */}
      <section style={{ padding:"clamp(2.5rem,6vw,4rem) 0", background:"#fff" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"1.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>REAL INSTALLATIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-5">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="clamp(200px,40vw,300px)" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div style={{ textAlign:"center" }}>
            <Link href="/contact/request-a-quote?from=semi-downdraft-booth">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background:BLUE, padding:"clamp(2.5rem,6vw,3.5rem) 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,4vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.65rem" }}>Ready to Configure Your Semi-Downdraft Booth?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.85rem,2vw,0.95rem)",color:"rgba(255,255,255,0.8)",marginBottom:"1.75rem",maxWidth:"440px",margin:"0 auto 1.75rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"0.85rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=semi-downdraft-booth">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.85rem,2.5vw,0.9rem)",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2rem",cursor:"pointer",minHeight:"48px" }}>GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.6)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(0.85rem,2.5vw,0.9rem)",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2rem",cursor:"pointer",minHeight:"48px" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* HEATED OPTIONS */}
      <section style={{ background:"#111", padding:"clamp(2.5rem,6vw,3rem) 0", borderTop:`4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",marginBottom:"0.5rem" }}><Flame size={12} style={{ color:"#f87171" }} /> HEATED ADD-ON</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.65rem" }}>Heated Options Available</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.9rem)",color:"rgba(255,255,255,0.7)",maxWidth:"460px",margin:"0 auto 1.5rem",lineHeight:1.7 }}>
            Add a direct-fired or indirect-fired heat system for accelerated cure times. Blanket intake filter upgrades included with all heated configurations. Spray, flash, and bake modes.
          </p>
          <Link href="/contact/request-a-quote?from=semi-downdraft-booth">
            <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 2rem",cursor:"pointer",minHeight:"48px" }}>ASK ABOUT HEATED OPTIONS <ArrowRight size={15}/></span>
          </Link>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background:"#fff", padding:"clamp(2rem,5vw,3rem) 0", borderBottom:"1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.2rem,3vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.65rem" }}>Pairs Well With a Mixing Room or Air Make-Up Unit</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,2vw,0.88rem)",color:"#666",maxWidth:"460px",margin:"0 auto 1.25rem",lineHeight:1.7 }}>
            Maximize throughput and compliance by pairing your semi-downdraft booth with a dedicated mixing room for paint prep and an AMU for tempered make-up air.
          </p>
          <div style={{ display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/products/mixing-rooms">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.5rem",cursor:"pointer",minHeight:"48px" }}>VIEW MIXING ROOMS <ArrowRight size={13}/></span>
            </Link>
            <Link href="/products/air-make-up-units">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.5rem",cursor:"pointer",minHeight:"48px" }}>VIEW AIR MAKE-UP UNITS <ArrowRight size={13}/></span>
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Semi-Downdraft Paint Booth — Common Questions</h2>
          </div>
          {[
            { q: "How does a semi-downdraft paint booth work?", a: "A semi-downdraft spray booth draws fresh, filtered air through a ceiling plenum at the front of the booth. Air flows diagonally from the front ceiling toward the rear floor, carrying overspray away from the painter and the work surface. The contaminated air exits through exhaust filters in the rear lower wall or floor, then travels through an exhaust duct to the stack. This airflow pattern delivers excellent finish quality without requiring a full-floor concrete pit." },
            { q: "What is the difference between a semi-downdraft and a full downdraft spray booth?", a: "A full downdraft booth (PFS Zenith) exhausts through the entire floor into a concrete pit poured into your slab. A semi-downdraft booth (PFS Orion) takes air in through the front ceiling and exhausts through the rear floor or lower rear wall — no full-floor pit required. Semi-downdraft delivers excellent finish quality at a lower installation cost and is the most popular configuration for automotive refinishing shops." },
            { q: "Does a semi-downdraft booth require a concrete pit?", a: "No. The PFS Orion semi-downdraft booth does not require a full-floor concrete pit. Exhaust exits through the rear lower wall or rear floor section, which can be accommodated with a shallow trench or surface-mounted exhaust plenum. This makes the semi-downdraft configuration significantly easier and less expensive to install than a full downdraft booth." },
            { q: "Is the PFS Orion semi-downdraft booth NFPA 33 compliant?", a: "Yes. Every PFS Orion semi-downdraft spray booth is built to NFPA 33 standards for spray application of flammable and combustible materials. The booth ships with a UL 508A certified control panel, ETL/UL listed and certified components, and complies with OSHA 1910.94 ventilation requirements." },
            { q: "What industries use semi-downdraft spray booths?", a: "Semi-downdraft spray booths are the most widely used configuration in automotive refinishing, collision repair, fleet maintenance, and light industrial finishing. They deliver excellent finish quality at a lower installation cost than full downdraft, making them ideal for shops that need high-quality results without the site preparation requirements of a full-floor pit." },
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
            { "@type": "Question", "name": "How does a semi-downdraft paint booth work?", "acceptedAnswer": { "@type": "Answer", "text": "A semi-downdraft spray booth draws fresh, filtered air through a ceiling plenum at the front of the booth. Air flows diagonally from the front ceiling toward the rear floor, carrying overspray away fr..." } },
            { "@type": "Question", "name": "What is the difference between a semi-downdraft and a full downdraft spray booth?", "acceptedAnswer": { "@type": "Answer", "text": "A full downdraft booth (PFS Zenith) exhausts through the entire floor into a concrete pit poured into your slab. A semi-downdraft booth (PFS Orion) takes air in through the front ceiling and exhausts ..." } },
            { "@type": "Question", "name": "Does a semi-downdraft booth require a concrete pit?", "acceptedAnswer": { "@type": "Answer", "text": "No. The PFS Orion semi-downdraft booth does not require a full-floor concrete pit. Exhaust exits through the rear lower wall or rear floor section, which can be accommodated with a shallow trench or s..." } },
            { "@type": "Question", "name": "Is the PFS Orion semi-downdraft booth NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every PFS Orion semi-downdraft spray booth is built to NFPA 33 standards for spray application of flammable and combustible materials. The booth ships with a UL 508A certified control panel, ETL/..." } },
            { "@type": "Question", "name": "What industries use semi-downdraft spray booths?", "acceptedAnswer": { "@type": "Answer", "text": "Semi-downdraft spray booths are the most widely used configuration in automotive refinishing, collision repair, fleet maintenance, and light industrial finishing. They deliver excellent finish quality..." } }
          ]
        }) }} />
      </section>

            {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="RELATED PRODUCTS"
        label="Complete Your System"
        cards={PRODUCTS}
      />

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,display:"flex",background:"#111",borderTop:`3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase",borderRight:"1px solid rgba(255,255,255,0.15)",minHeight:"56px" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=semi-downdraft-booth" style={{ flex:1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
