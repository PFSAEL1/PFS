/**
 * Certifications & Compliance — Dedicated Page
 * Design: Full-bleed dark hero with 6 credential text badges (no logo images — no white blocks).
 * Badge style mirrors the cert-bar-source screenshot: bold title + uppercase subtitle on dark bg.
 */
import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1B3A6B";
const VIDEO_URL = "/manus-storage/cert-hero-5s_6f5e0dab.mp4";

const ETL_LOGO  = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO   = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const CERTS = [
  { img: ETL_LOGO,  title: "ETL & ETL-C Listed",    sub: "Intertek — USA & Canada",             imgH: 44 },
  { img: UL_LOGO,   title: "UL 508A Certified",      sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant",      sub: "Spray Application Standard",          imgH: 44 },
  { img: EPA_LOGO,  title: "EPA Compliant",          sub: "Air Quality Standards",               imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",         sub: "Workplace Safety Standards",          imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",        sub: "Santa Rosa, CA",                      imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

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
    <section style={{ background:"#ffffff", padding:"0", overflow:"hidden", borderTop:`4px solid ${BLUE}`, borderBottom:"3px solid #111", boxShadow:"0 4px 0 0 #111" }}>
      <div style={{ overflow:"hidden", position:"relative" }}>
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

// ── BADGE DATA (text-only — no logo images, no white blocks) ─────────────────
const BADGES = [
  {
    title: "ETL Listed",
    sub: "USA & CANADA",
    detail: "PFS spray booths carry ETL and ETL-C listings from Intertek — the gold standard for industrial finishing equipment in both the US and Canadian markets.",
  },
  {
    title: "UL 508A",
    sub: "CERTIFIED MANUFACTURER",
    detail: "Our control panels are built by a UL 508A certified panel shop. Every electrical enclosure is engineered, labeled, and documented to UL industrial control panel standards.",
  },
  {
    title: "NFPA 33",
    sub: "BUILT TO STANDARD",
    detail: "All PFS spray finishing equipment is designed and manufactured in compliance with NFPA 33 — the national standard for spray application using flammable or combustible materials.",
  },
  {
    title: "OSHA",
    sub: "COMPLIANT",
    detail: "PFS equipment meets OSHA 29 CFR 1910.94 requirements for spray finishing operations, including ventilation rates, electrical classification, and fire suppression provisions.",
  },
  {
    title: "Air Quality",
    sub: "COMPLIANT",
    detail: "Our booths are engineered to support compliance with EPA 6H air quality rules and local AQMD/APCD regulations, with filtration and airflow designed for permit approval.",
  },
  {
    title: "Made in USA",
    sub: "SANTA ROSA, CA",
    detail: "Every PFS system is designed, fabricated, and assembled at our Santa Rosa, California facility using domestic steel and components wherever possible.",
  },
];

// ── COMPLIANCE DETAILS ────────────────────────────────────────────────────────
const COMPLIANCE_ITEMS = [
  {
    heading: "ETL & ETL-C Listing",
    body: "PFS spray booths are ETL-listed to NFPA 33 by Intertek, one of the world's leading testing and certification bodies. ETL and ETL-C listings are accepted by AHJs (Authorities Having Jurisdiction) across all 50 states and Canadian provinces. Every booth ships with a listing label and documentation package for your permit application.",
  },
  {
    heading: "UL 508A Control Panels",
    body: "UL 508A certified control panels are available on all PFS heated and pressurized booth configurations. Panels are built to UL 508A standards by our certified panel shop, with full documentation, wire labeling, and UL marking. This is the standard required by most industrial facilities and AHJs for electrical panel acceptance.",
  },
  {
    heading: "NFPA 33 Compliance",
    body: "NFPA 33 governs the design, construction, and operation of spray finishing equipment. PFS booths are engineered to meet or exceed every applicable section — including ventilation rates, electrical area classification, interlocks, fire suppression provisions, and construction materials. Our engineering team can provide compliance documentation for your AHJ.",
  },
  {
    heading: "OSHA 29 CFR 1910.94",
    body: "OSHA's spray finishing standard specifies minimum airflow velocities, electrical requirements, and fire suppression provisions for spray booths. PFS equipment is designed to meet these requirements out of the box. We can provide airflow calculations and documentation to support your OSHA compliance program.",
  },
  {
    heading: "Air Quality & EPA 6H",
    body: "EPA Method 6H and local air quality district rules govern VOC emissions from spray finishing operations. PFS booths are engineered with filtration and airflow systems that support compliance with these rules. We work with customers to document booth performance for air district permit applications.",
  },
  {
    heading: "IFC & Local Building Codes",
    body: "The International Fire Code (IFC) and local building codes impose requirements on spray booth installation, clearances, fire suppression, and electrical classification. PFS equipment is designed to meet IFC requirements, and our team can provide the documentation your building department needs for permit approval.",
  },
];

export default function CertificationsPage() {
  useSEO({
    title: "Certifications & Compliance | ETL, UL 508A, NFPA 33, OSHA | PFS",
    description: "PFS spray booths and finishing equipment are manufactured with ETL/UL listed and certified components, built to NFPA 33, OSHA, and EPA standards. UL 508A certified control panels. Manufactured in Santa Rosa, CA.",
    canonical: "/company/certifications",
  });

  return (
    <div style={{ background: "#fff" }}>

      {/* ── VIDEO HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          background: "#080810",
          overflow: "hidden",
          minHeight: "60vh",
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "7rem",
        }}
      >
        <video autoPlay muted loop playsInline style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.55 }}>
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div aria-hidden="true" style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(8,8,16,0.85) 0%, rgba(8,8,16,0.3) 60%, transparent 100%)",pointerEvents:"none" }} />


        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <div
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Link href="/"><span style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Home</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <Link href="/company"><span style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Company</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "#fff" }}>Certifications & Compliance</span>
          </div>

          <div style={{ display:"inline-flex",alignItems:"center",gap:"0.6rem",marginBottom:"1rem" }}>
            <div style={{ width:"2rem",height:"2px",background:BLUE }} />
            <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.55)",letterSpacing:"0.15em",textTransform:"uppercase" }}>PFS</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
              maxWidth: "760px",
            }}
          >
            Built to the Highest<br />
            Industry Standards
          </h1>
          <p
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: "560px",
              marginBottom: "3.5rem",
            }}
          >
            Every PFS system ships with the certifications your AHJ, insurance carrier, and facility require — built to NFPA 33, manufactured in the USA with ETL/UL listed and certified components.
          </p>

          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",marginTop:"0.5rem" }}>
            <Link href="/contact/request-a-quote">
              <button className="btn-glow" style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2.2rem",display:"inline-flex",alignItems:"center",gap:"0.5rem",cursor:"pointer" }}>
                REQUEST DOCUMENTATION <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:8885457715">
              <button style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2.2rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.45)",cursor:"pointer",transition:"border-color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="#fff")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.45)")}>
                (888) 545-7715
              </button>
            </a>
          </div>
        </div>

      </section>

      {/* ── LIVE CERT CAROUSEL ──────────────────────────────────────────────── */}
      <CertCarousel />

      {/* ── COMPLIANCE DETAIL SECTION ──────────────────────────────────────── */}
      <section style={{ background: "#f9fafb", padding: "5rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem 3.5rem",
            }}
            className="compliance-grid"
          >
            {COMPLIANCE_ITEMS.map((item) => (
              <div
                key={item.heading}
                style={{
                  borderTop: "2px solid #1B3A6B",
                  paddingTop: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <CheckCircle size={16} color="#1B3A6B" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <h3
                    style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#111827",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.heading}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#4B5563",
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 700px) {
            .compliance-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#1B3A6B",
          padding: "4rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Need Compliance Documentation?
            </h2>
            <p
              style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
              }}
            >
              Our team can provide listing letters, airflow calculations, and permit packages for your AHJ.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote">
              <button
                className="btn-glow"
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.85rem 2rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                REQUEST DOCUMENTATION <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:8885457715">
              <button
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.85rem 2rem",
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
              >
                (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
