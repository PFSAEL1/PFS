/*
 * Powder Reclaim Booths — PFS
 * Route: /products/powder-booths/powder-reclaim
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Pattern: mirrors CrossFlowBoothPage — collapsible features + collapsible sizes + FAQ schema
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG     = "/manus-storage/pfs-nova-powder-reclaim_2a87798e.png";
const FEATURED_IMG = "/manus-storage/pfs-powder-reclaim-unit_48f7c437.png";

const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-powder-reclaim-unit_48f7c437.png",          alt: "PFS powder reclaim booth — full unit exterior view",                       pos: "center 50%" },
  { src: "/manus-storage/pfs-nova-powder-reclaim_2a87798e.png",          alt: "PFS Nova powder reclaim system — cyclone recovery unit",                   pos: "center 50%" },
  { src: "/manus-storage/pfs-powder-recovery-lines_a80d3e22.png",        alt: "PFS powder recovery production line — conveyor integration",               pos: "center 50%" },
  { src: "/manus-storage/pfs-powder-coating-action_2ede4cbe.png",        alt: "PFS powder coating booth — operator applying powder",                      pos: "center 40%" },
  { src: "/manus-storage/pfs-robotic-arm-red-spray_90b1e89b.png",        alt: "PFS robotic powder application — automated finishing system",              pos: "center 50%" },
  { src: "/manus-storage/pfs-auto-powder-line1_3bb98899.png",            alt: "PFS automated powder coating line with conveyor and reclaim",              pos: "center 50%" },
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
    title: "Twin Cyclone Separator Recovery",
    body: "Overspray-laden air is drawn through twin cyclone separators that use centrifugal force to spin powder particles out of the airstream and into a collection hopper below. The cleaned air continues to the secondary filter stage. Twin cyclones provide higher throughput and easier cleaning access than single-cyclone designs.",
  },
  {
    num: "02",
    title: "Closed-Loop Powder Recycling",
    body: "Recovered powder is continuously returned from the collection hopper through a media classifier and back into the feed system — without interrupting production. The closed-loop design keeps usable powder in the process and minimizes the amount of powder in the system at any given time, reducing waste and improving color consistency.",
  },
  {
    num: "03",
    title: "Non-Conductive Booth Canopy",
    body: "The booth enclosure is fabricated from non-conductive materials that minimize powder attraction and buildup on interior surfaces. Less powder on walls means faster color changes, lower cleaning time between runs, and reduced cross-contamination risk when switching between colors.",
  },
];

const FEATURES_HIDDEN = [
  {
    num: "04",
    title: "Stainless Steel Booth Floor",
    body: "The booth floor is fabricated from stainless steel for maximum durability, easy cleaning, and operator grounding. Stainless resists powder buildup and chemical attack from cleaning agents, extending the service life of the booth interior.",
  },
  {
    num: "05",
    title: "Electrode Air Wash System",
    body: "An electrode air wash system maintains a continuous curtain of clean air across the booth opening, maximizing electrostatic charging efficiency and preventing powder from migrating out of the enclosure. Higher charging efficiency means better first-pass transfer rates and less overspray entering the recovery system.",
  },
  {
    num: "06",
    title: "Adjustable Gun Mounting",
    body: "Gun mounting positions are adjustable to accommodate a wide range of part geometries and sizes. Proper gun positioning ensures complete top-to-bottom part coverage, minimizes overspray, and maximizes first-pass transfer efficiency.",
  },
  {
    num: "07",
    title: "Hinged Cyclone Access Panels",
    body: "Both cyclone separators are equipped with hinged access panels that swing fully open for thorough interior cleaning. Full access means faster color changes, more complete cleaning between runs, and easier inspection of cyclone interior surfaces.",
  },
  {
    num: "08",
    title: "Open Design for Visual Inspection",
    body: "The booth interior is designed for complete visual inspection from the operator position. Open sightlines allow operators to monitor part coverage, identify missed areas, and detect powder buildup before it affects part quality.",
  },
  {
    num: "09",
    title: "UL 508A Certified Control Panel",
    body: "The control panel is built and certified to UL 508A industrial control panel standards. Interlocked fan start, powder feed enable, and safety circuits are pre-wired and factory tested before shipment. Optional programmable cycle timers and production counters available.",
  },
  {
    num: "10",
    title: "CID2-Rated Interior Lighting",
    body: "Class I Division 2 inside-access light fixtures provide bright, uniform illumination throughout the booth interior. Multi-voltage ballasts accept 120V–277V power. LED upgrade available. Fixtures are ETL listed for their intended use and placement.",
  },
  {
    num: "11",
    title: "Conveyor Integration Ready",
    body: "Powder reclaim booths are available with conveyor entry and exit openings for integration into continuous powder coating lines. Parts move through the booth on an overhead or floor conveyor while the recovery system operates continuously.",
  },
  {
    num: "12",
    title: "We Ship Nationally",
    body: "PFS powder reclaim booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation. Manufactured in Santa Rosa, CA.",
  },
];

// ── STANDARD SIZES ────────────────────────────────────────────────────────────
type SizeRow = { h: string; d: string };
const SIZES: Record<string, SizeRow[]> = {
  "4'":     [{ h:"7'", d:"5'" }, { h:"8'", d:"5'" }],
  "6'":     [{ h:"7'", d:"5'" }, { h:"8'", d:"5'" }],
  "8'":     [{ h:"7'", d:"5'" }, { h:"8'", d:"7'" }],
  "10'":    [{ h:"8'", d:"7'" }, { h:"9'", d:"7'" }, { h:"10'", d:"9'" }],
  "12'":    [{ h:"8'", d:"7'" }, { h:"9'", d:"9'" }, { h:"10'", d:"9'" }, { h:"12'", d:"9'" }],
  "14'":    [{ h:"9'", d:"9'" }, { h:"10'", d:"9'" }, { h:"12'", d:"12'" }],
  "16'":    [{ h:"9'", d:"9'" }, { h:"10'", d:"12'" }, { h:"12'", d:"12'" }],
  "Custom": [],
};
const WIDTH_KEYS = Object.keys(SIZES);

const RELATED_PRODUCTS = [
  {
    label: "Conveyor Ovens",
    href: "/products/ovens/conveyor",
    img: "/manus-storage/conveyor-oven-entry_8df7b0be.png",
    desc: "Continuous curing for high-volume powder coating lines — matched to your conveyor speed and part load.",
  },
  {
    label: "Spray-to-Waste Booths",
    href: "/products/powder-booths/spray-to-waste",
    img: "/manus-storage/pfs-stw-4208_b899a28f.jpg",
    desc: "Non-recovery powder booths for frequent color changes and job shop operations.",
  },
  {
    label: "Automated Powder Systems",
    href: "/products/powder-booths/automated",
    img: "/manus-storage/pfs-auto-powder-line1_3bb98899.png",
    desc: "Fully automated powder application with robotic guns, conveyor integration, and closed-loop reclaim.",
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
export default function PowderReclaimPage() {
  useSEO({
    title: "Powder Reclaim Booths | Cyclone Powder Recovery System | PFS",
    description: "PFS powder reclaim booths use twin cyclone separators to capture, clean, and recycle overspray powder in a closed loop — maximizing material efficiency for high-volume single-color powder coating operations. NFPA 33 compliant, ETL/UL certified components, UL 508A controls. Conveyor integration available. Manufactured in Santa Rosa, CA.",
    canonical: "/products/powder-booths/powder-reclaim",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [specsOpen,    setSpecsOpen]    = useState(false);
  const [sizesOpen,    setSizesOpen]    = useState(false);
  const [selectedWidth, setSelectedWidth] = useState<string | null>(null);

  return (
    <div style={{ fontFamily:"'Inter',sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{ position:"relative",minHeight:"clamp(420px,55vh,680px)",display:"flex",alignItems:"flex-end",overflow:"hidden",background:"#0a1628" }}>
        <img
          src={HERO_IMG}
          alt="PFS powder reclaim booth — cyclone powder recovery system for high-volume powder coating"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%",opacity:0.5 }}
        />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.45) 55%, transparent 100%)" }} />
        <div className="container" style={{ position:"relative",zIndex:1,paddingBottom:"clamp(3rem,6vw,5rem)" }}>
          <nav aria-label="breadcrumb" style={{ marginBottom:"1.25rem",display:"flex",gap:"0.5rem",alignItems:"center",flexWrap:"wrap" }}>
            {[
              { label:"Products",                href:"/products" },
              { label:"Powder Coating Systems",  href:"/products/powder-booths" },
              { label:"Powder Reclaim Booths" },
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
            POWDER RECLAIM<br />BOOTHS
          </h1>
          <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:"2.5rem",maxWidth:"520px" }}>
            Cyclone powder recovery systems that capture and recycle overspray in a closed loop — built for high-volume single-color operations where material efficiency drives cost per part. Ships nationally.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
            <Link href="/contact/request-a-quote?from=powder-reclaim">
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

      {/* ── FEATURED UNIT ── */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem" }}>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>FEATURED INSTALLATION</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>PFS Powder Reclaim System — Cyclone Recovery</h2>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
                Engineered for a high-volume production facility requiring maximum powder material efficiency. Twin cyclone separators, closed-loop powder recycling, non-conductive enclosure, and stainless steel floor. ETL/UL certified components. NFPA 33 compliant. Built in Santa Rosa, CA.
              </p>
            </div>
            <div style={{ width:"100%",maxWidth:"900px",overflow:"hidden",borderRadius:"2px" }}>
              <img src={FEATURED_IMG} alt="PFS powder reclaim booth — featured installation, cyclone recovery system" style={{ width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center" }} />
            </div>
            <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center" }}>
              <Link href="/contact/request-a-quote?from=powder-reclaim">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
              <Link href="/products/powder-booths">
                <span className="btn-outline">VIEW ALL POWDER SYSTEMS <ArrowRight size={15}/></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW CYCLONE RECOVERY WORKS ── */}
      <section style={{ background:"#fff",padding:"4rem 0",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>HOW IT WORKS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Closed-Loop Cyclone Recovery — Continuous, Uninterrupted</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"#666",maxWidth:"580px",margin:"0 auto",lineHeight:1.7 }}>
              Overspray powder is captured, cleaned, and returned to the feed system in a continuous closed loop — without stopping production. No exhaust stack required.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step:"STEP 1", title:"Overspray Capture", body:"Powder-laden air exits the booth enclosure and enters the twin cyclone separators. The cyclones use centrifugal force to spin powder particles out of the airstream." },
              { step:"STEP 2", title:"Cyclone Separation", body:"Separated powder falls into the collection hopper at the base of each cyclone. Cleaned air exits the top of the cyclone and continues to the secondary filter stage." },
              { step:"STEP 3", title:"Media Classification", body:"Recovered powder passes through a media classifier that removes oversized particles, agglomerates, and contaminants before the powder is returned to the feed hopper." },
              { step:"STEP 4", title:"Powder Recycling", body:"Cleaned, classified powder is continuously fed back into the application system. The closed loop runs without interruption — maximizing material utilization throughout the production run." },
            ].map((s) => (
              <div key={s.step} style={{ background:"#f8f9fb",border:"1px solid #e5e7eb",padding:"1.75rem",display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:800,letterSpacing:"0.18em",color:BLUE,textTransform:"uppercase" }}>{s.step}</span>
                <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:800,color:"#111",letterSpacing:"0.01em",margin:0 }}>{s.title}</h3>
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.83rem",color:"#555",lineHeight:1.65,margin:0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>WHICH SYSTEM IS RIGHT FOR YOU?</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Powder Reclaim vs. Spray-to-Waste</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"#666",maxWidth:"520px",margin:"0 auto",lineHeight:1.7 }}>
              Both systems produce excellent finishes. The right choice depends on your production volume, color change frequency, and powder material cost.
            </p>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",fontFamily:"'Inter',sans-serif",fontSize:"0.88rem" }}>
              <thead>
                <tr>
                  <th style={{ background:"#111",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.25rem",textAlign:"left",width:"30%" }}>Factor</th>
                  <th style={{ background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.25rem",textAlign:"left",width:"35%" }}>Powder Reclaim (Recovery)</th>
                  <th style={{ background:"#2d5a9e",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1rem 1.25rem",textAlign:"left",width:"35%" }}>Spray-to-Waste (Non-Recovery)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor:"Best For",             reclaim:"High-volume single-color or limited-color production",  stw:"Frequent color changes, job shops, batch operations" },
                  { factor:"Material Savings",      reclaim:"Significant — overspray collected, cleaned, and reused", stw:"None — overspray discarded with filter media" },
                  { factor:"Upfront Cost",         reclaim:"Higher — cyclone recovery system adds cost",             stw:"Lower — simpler system, no reclaim equipment" },
                  { factor:"Color Change Speed",   reclaim:"Slower — purge cyclone, clean hopper between colors",    stw:"Fastest — swap filter media, ready in minutes" },
                  { factor:"Maintenance",           reclaim:"Periodic cyclone cleaning, filter cartridge service",    stw:"Replace filter media on schedule — simple" },
                  { factor:"Exhaust Stack",         reclaim:"Not required — air recirculated",                        stw:"Not required — air recirculated to facility" },
                  { factor:"Installation Cost",    reclaim:"Moderate — reclaim module adds footprint",               stw:"Lowest — minimal infrastructure required" },
                  { factor:"NFPA 33 Compliant",    reclaim:"Yes",                                                    stw:"Yes" },
                  { factor:"ETL/UL Listed",         reclaim:"Yes",                                                    stw:"Yes" },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8f9fb" }}>
                    <td style={{ padding:"0.9rem 1.25rem",fontWeight:700,color:"#111",borderBottom:"1px solid #e5e7eb",verticalAlign:"top" }}>{row.factor}</td>
                    <td style={{ padding:"0.9rem 1.25rem",color:"#333",borderBottom:"1px solid #e5e7eb",borderLeft:`3px solid ${BLUE}`,verticalAlign:"top" }}>{row.reclaim}</td>
                    <td style={{ padding:"0.9rem 1.25rem",color:"#333",borderBottom:"1px solid #e5e7eb",borderLeft:"3px solid #2d5a9e",verticalAlign:"top" }}>{row.stw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",marginTop:"2rem" }}>
            <Link href="/contact/request-a-quote?from=powder-reclaim">
              <span className="btn-glow">GET PRICING — POWDER RECLAIM <ArrowRight size={15}/></span>
            </Link>
            <Link href="/products/powder-booths/spray-to-waste">
              <span className="btn-outline">VIEW SPRAY-TO-WASTE BOOTHS <ArrowRight size={15}/></span>
            </Link>
          </div>
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
                    <Link href="/contact/request-a-quote?from=powder-reclaim">
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
                      <Link href="/contact/request-a-quote?from=powder-reclaim">
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
                    PFS powder reclaim booths are engineered to order for any part size, production volume, conveyor configuration, or facility constraint. Provide your part dimensions, production rate, and powder chemistry and our team will configure the right system.
                  </p>
                  <Link href="/contact/request-a-quote?from=powder-reclaim-custom">
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
                      <Link href="/contact/request-a-quote?from=powder-reclaim">
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
                  All dimensions are interior. Exterior dimensions are approximately 4–6" larger per side. Custom heights, depths, and configurations available.
                </p>
              )}

              {!selectedWidth && (
                <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#888",marginBottom:"2rem" }}>Select a width above to view available configurations.</p>
              )}

              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <Link href="/contact/request-a-quote?from=powder-reclaim">
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
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in Production.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div className="text-center">
            <Link href="/contact/request-a-quote?from=powder-reclaim">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA BAND ── */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Powder Reclaim System?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=powder-reclaim">
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
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Powder Reclaim Booths — Common Questions</h2>
          </div>
          {[
            {
              q: "What is a powder reclaim booth?",
              a: "A powder reclaim booth is a powder coating enclosure equipped with a recovery system — typically cyclone separators — that captures overspray powder, cleans it through a media classifier, and returns it to the feed hopper in a continuous closed loop. Unlike spray-to-waste booths where overspray is discarded with the filter media, a reclaim booth recycles usable powder back into the application process, reducing material cost per part in high-volume operations.",
            },
            {
              q: "How does a cyclone powder recovery system work?",
              a: "Overspray-laden air exits the booth and enters one or more cyclone separators. Inside the cyclone, the airstream spins at high velocity, creating centrifugal force that drives powder particles outward and downward into a collection hopper at the base. Cleaned air exits the top of the cyclone and passes through a secondary filter before being returned to the facility. Recovered powder is then classified and returned to the feed system.",
            },
            {
              q: "When does a powder reclaim booth make financial sense?",
              a: "A powder reclaim booth makes financial sense when you are running high volumes of a single color or a small number of colors, and when the cost of the powder you are discarding is significant relative to the cost of the reclaim system. The break-even point depends on your powder cost, application efficiency, and production volume. For most high-volume production operations, reclaim pays for itself within one to two years of operation.",
            },
            {
              q: "Can I run multiple colors in a powder reclaim booth?",
              a: "Yes, but color changes require purging the cyclone separators, cleaning the collection hopper, and flushing the feed system to prevent cross-contamination. This process takes significantly longer than a color change in a spray-to-waste booth. Powder reclaim booths are best suited for single-color or limited-color production runs. For frequent color changes, a spray-to-waste booth is the more practical choice.",
            },
            {
              q: "Does a powder reclaim booth require an exhaust stack?",
              a: "No. The secondary filter stage cleans the air to a level suitable for recirculation back into the facility, eliminating the need for an exhaust stack and the air make-up unit required to replace exhausted air.",
            },
            {
              q: "Is a powder reclaim booth NFPA 33 compliant?",
              a: "PFS powder reclaim booths are built to NFPA 33 and IFC Chapter 24 standards with ETL/UL certified components and a UL 508A certified control panel. OSHA 1910.94 compliant ventilation design.",
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
            { "@type": "Question", "name": "What is a powder reclaim booth?", "acceptedAnswer": { "@type": "Answer", "text": "A powder reclaim booth captures overspray powder using cyclone separators, cleans it through a media classifier, and returns it to the feed hopper in a continuous closed loop, reducing material cost per part in high-volume operations." } },
            { "@type": "Question", "name": "How does a cyclone powder recovery system work?", "acceptedAnswer": { "@type": "Answer", "text": "Overspray-laden air enters cyclone separators where centrifugal force drives powder particles into a collection hopper. Cleaned air passes through a secondary filter and is returned to the facility. Recovered powder is classified and returned to the feed system." } },
            { "@type": "Question", "name": "When does a powder reclaim booth make financial sense?", "acceptedAnswer": { "@type": "Answer", "text": "A powder reclaim booth makes financial sense for high-volume single-color or limited-color operations where the cost of discarded powder is significant. For most high-volume production operations, reclaim pays for itself within one to two years." } },
            { "@type": "Question", "name": "Does a powder reclaim booth require an exhaust stack?", "acceptedAnswer": { "@type": "Answer", "text": "No. The secondary filter stage cleans the air for recirculation back into the facility, eliminating the need for an exhaust stack and air make-up unit." } },
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
