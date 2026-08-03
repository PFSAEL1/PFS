/**
 * Wash Booths — PFS
 * Route: /products/paint-booths/wash-booth
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Same format as CrossFlowBoothPage — placeholder images until real photos are provided
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── HERO VIDEO ──
const HERO_VIDEO = "/manus-storage/pfs-wash-booth-hero_b17b92ab.mp4";

// ── FEATURED PRODUCT — Helios interior with equipment ──
const FEATURED_IMG = "/manus-storage/pfs-wash-booth-helios-featured_0fc278aa.png";

// ── OLD HERO — moved to gallery ──
const OLD_HERO_IMG = "/manus-storage/washbooth_75284018.png";

// ── GALLERY ──
const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-wash-booth-man-washing_86c386b9.png",       alt: "Technician pressure washing engine block inside PFS industrial wash booth",         pos: "center 50%" },
  { src: "/manus-storage/pfs-wash-booth-interior-be-washer_c61ffc7c.png", alt: "PFS wash booth interior — BE pressure washer and hose reel, steel grating floor",  pos: "center 50%" },
  { src: "/manus-storage/pfs-wash-booth-helios-featured_0fc278aa.png",   alt: "PFS Helios wash booth — fully equipped interior with hose reel and steam tank",    pos: "center 40%" },
  { src: OLD_HERO_IMG,                                                    alt: "PFS enclosed wash booth — exterior view with control panel",                        pos: "center 40%" },
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
  { img: EPA_LOGO,  title: "EPA Compliant",           sub: "Air Quality Standards",               imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",          sub: "Workplace Safety Standards",          imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",         sub: "Santa Rosa, CA",                      imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

const FEATURES_VISIBLE = [
  { num: "01", title: "Open-Face or Enclosed Configuration",  body: "Choose an open-face design for easy part access or a fully enclosed booth for maximum containment. Both configurations include a floor drain for wash solution runoff." },
  { num: "02", title: "Galvanized Steel Panel Construction",  body: "Heavy-gauge galvanized steel panels provide long-term corrosion resistance in wet wash environments. Available in galvanized or powder coated finish." },
  { num: "03", title: "High-Efficiency Direct-Drive Fan",     body: "High-performance direct-drive exhaust fan with TEFC motor removes moisture, chemical vapors, and airborne particles from the wash environment — keeping the workspace safe and compliant." },
  { num: "04", title: "LED Lighting for Clear Visibility",    body: "Four-tube LED light fixtures deliver bright, uniform illumination throughout the wash area. Optional LED upgrade available on all configurations." },
  { num: "05", title: "Fan & Lighting Controls",              body: "Integrated controls for fan and lighting — UL 508A certified control panel with safety interlocks. Pairs with our PFS Core Control Panel." },
  { num: "06", title: "built with ETL/UL certified components — NFPA 33 Compliant",   body: "manufactured in the USA with ETL/UL listed components in the USA and Canada. Built to NFPA 33 spray application standards and OSHA workplace safety requirements. Local authority compliance supported." },
];

const FEATURES_HIDDEN = [
  { num: "07", title: "Floor Drain for Wash Runoff",          body: "Integrated floor drain channels wash solution, rinse water, and chemical runoff away from the work area — maintaining a clean, safe floor surface throughout the wash cycle." },
  { num: "08", title: "Louvers for Enclosed Ventilation",     body: "Enclosed models include wall louvers for controlled ventilation — maintaining proper airflow balance without creating negative pressure issues in the surrounding facility." },
  { num: "09", title: "Compatible with Ambient or Oven Dry",  body: "Parts washed in a PFS wash booth can be dried with ambient air flow or transferred directly to a batch or conveyor oven — fully compatible with both dry-off methods." },
  { num: "10", title: "Low-Maintenance Filter Media",         body: "Intake and exhaust filter media is designed for easy replacement and low ongoing maintenance cost. Replacement filters available factory-direct." },
  { num: "11", title: "Custom Sizing Available",              body: "Standard and custom sizes available to fit any facility footprint. PFS engineers work directly with your team to configure the right dimensions for your part size and throughput." },
  { num: "12", title: "We Ship Nationally",                   body: "PFS wash booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const PRODUCTS = [
  { label: "Pretreatment Systems",    href: "/integration-automation/pretreatment-systems",    img: "/manus-storage/washbooth_75284018.png",                          desc: "Automated chemical pretreatment systems for cleaning, phosphating, and surface prep before coating." },
  { label: "Batch Ovens",             href: "/products/ovens/batch",                            img: "/manus-storage/orig-render-batch-oven_3d3b6c3f.webp",            desc: "Industrial batch ovens for dry-off and curing after the wash process." },
  { label: "Enclosed Paint Booths",   href: "/products/paint-booths/enclosed",                  img: "/manus-storage/pfs_helios_side_angle_final_73768c1f_5eaf3967.png", desc: "Full-enclosure spray booths for superior overspray containment and finish quality." },
  { label: "Prep Stations",           href: "/products/prep-support/prep-stations",             img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",       desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
];

function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef  = useRef<number>(0);
  const posRef   = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const speed = 0.45;
    const step = () => {
      posRef.current -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section style={{ background:"#fff",borderTop:`4px solid ${BLUE}`,borderBottom:"3px solid #111",boxShadow:"0 4px 0 0 #111" }}>
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

export default function WashBoothPage() {
  useSEO({
    title: "Wash Booths | Industrial Parts Washing Booths | PFS",
    description: "PFS wash booths provide a contained, ventilated environment for industrial parts washing and cleaning before painting. NFPA 33 compliant, ETL/UL listed components. Custom sizes available. Manufactured in Santa Rosa, CA.",
    canonical: "/products/prep-support/wash-booths",
  });

  const [featuresOpen, setFeaturesOpen]   = useState(false);
  const [specsOpen,    setSpecsOpen]      = useState(false);

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
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)",
        }} />
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
            Industrial<br />
            Wash Booths<br />
            &amp; Pre-Treatment
          </h1>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)",
            color: "#6fa3e0", borderRadius: "2px",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "0.3rem 0.75rem", marginBottom: "1.25rem",
          }}>SURFACE PREPARATION</span>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}>
            manufactured in the USA with ETL/UL listed components. NFPA 33 compliant. Enclosed wash booths engineered for industrial pre-treatment — manual high-pressure washing, chemical rinsing, and surface prep before powder coating or liquid paint. Custom sizes. Ships nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=wash-booth">
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

      {/* WHAT IS A WASH BOOTH */}
      <section style={{ background:"#f5f5f5",padding:"4rem 0 3rem" }}>
        <div className="container">
          {/* Image stacks full-width on mobile, side-by-side on md+ */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text column — order 2 on mobile so image appears first */}
            <div className="order-2 md:order-1">
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.6rem" }}>SURFACE PREPARATION</span>
              <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"1rem" }}>
                Industrial Pre-Treatment Starts Here
              </h2>
              <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",lineHeight:1.7,marginBottom:"1.5rem" }}>
                Coating adhesion starts with a clean substrate. A PFS enclosed wash booth gives your facility a dedicated, code-compliant space for high-pressure washing, chemical pre-treatment, and rinse operations — eliminating oils, scale, and contamination before any paint or powder is applied. Wet-duty exhaust fan, floor drain, and integrated lighting included standard.
              </p>
              <Link href="/contact/request-a-quote?from=wash-booth">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
              </Link>
            </div>
            {/* Image column — order 1 on mobile so it appears above text */}
            <div className="order-1 md:order-2" style={{ overflow:"hidden",borderRadius:"2px" }}>
              <img
                src={FEATURED_IMG}
                alt="PFS Helios enclosed wash booth — industrial pre-treatment with hose reel and pressure washing equipment"
                style={{ width:"100%",height:"auto",display:"block" }}
              />
              <div style={{ background:"#111",padding:"0.6rem 1rem" }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.12em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase" }}>PFS HELIOS — ENCLOSED WASH BOOTH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARD FEATURES — collapsible */}
      <section style={{ background:"#fff",padding:"3rem 0 2rem",borderBottom:"1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom: specsOpen ? "2rem" : 0 }}>
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
                    <Link href="/contact/request-a-quote?from=wash-booth">
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
                      <Link href="/contact/request-a-quote?from=wash-booth">
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

      {/* GALLERY */}
      <section style={{ padding:"3rem 0 4rem",background:"#fff" }}>
        <div className="container">
          <div className="text-center mb-6">
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>GALLERY</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em" }}>Built in the USA. Proven in the Field.</h2>
            <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.85rem",color:"#888",marginTop:"0.5rem" }}>Real PFS wash booths — installed and in operation.</p>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div className="text-center">
            <Link href="/contact/request-a-quote?from=wash-booth">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15}/></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Ready to Configure Your Wash Booth?</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=wash-booth">
              <span className="btn-glow-white">GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span className="btn-glow-white" style={{ background: "transparent", color: "#fff" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background:"#111",padding:"3rem 0",borderTop:`4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>COMPLETE YOUR PREP LINE</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"0.75rem" }}>Pairs with a Batch Oven or Pretreatment System</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",maxWidth:"480px",margin:"0 auto 1.75rem",lineHeight:1.7 }}>
            After washing, parts can be transferred directly to a batch oven for dry-off, or integrated into a full pretreatment line before powder coating or liquid paint application.
          </p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/products/ovens/batch">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW BATCH OVENS <ArrowRight size={13}/></span>
            </Link>
            <Link href="/integration-automation/pretreatment-systems">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"transparent",color:"#fff",border:"2px solid rgba(255,255,255,0.35)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 1.75rem",cursor:"pointer" }}>VIEW PRETREATMENT SYSTEMS <ArrowRight size={13}/></span>
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section style={{ background:"#f8f9fb", padding:"clamp(2.5rem, 6vw, 4rem) 0", borderTop:"1px solid #e5e7eb" }}>
        <div className="container" style={{ maxWidth:"860px" }}>
          <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"#1B3A6B",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",margin:0 }}>Industrial Wash Booths — Common Questions</h2>
          </div>
          {[
            { q: "What is an industrial wash booth used for?", a: "An industrial wash booth provides a dedicated, enclosed environment for pressure washing, steam cleaning, and degreasing vehicles, equipment, and parts before painting or coating. The booth captures wash water and contaminants, prevents overspray from entering the facility, and complies with EPA and local wastewater regulations by routing effluent to a proper collection or treatment system." },
            { q: "Does a wash booth need to be NFPA 33 compliant?", a: "Wash booths used for cleaning prior to painting operations may be subject to NFPA 33 requirements depending on the cleaning agents used. PFS wash booths are built to applicable NFPA and OSHA standards with ETL/UL listed and certified components and compliant ventilation systems." },
            { q: "What is the difference between a wash booth and a prep station?", a: "A wash booth is designed for wet cleaning — pressure washing, steam cleaning, and degreasing with water-based or solvent-based cleaners. A prep station is designed for dry surface preparation — sanding, priming, and masking. Both are used before final painting, but they address different stages of the surface preparation process." },
            { q: "Can PFS build a custom-size wash booth?", a: "Yes. PFS manufactures wash booths in custom sizes to accommodate cars, trucks, buses, aircraft, heavy equipment, and large industrial parts. Contact a PFS engineer with your vehicle or part dimensions for a custom quote." },
            { q: "What wastewater handling options are available for PFS wash booths?", a: "PFS wash booths can be configured with floor drains connected to an oil-water separator, a recirculating wash water system, or a direct-to-drain configuration depending on your local wastewater regulations. PFS engineers can advise on the appropriate wastewater handling system for your facility and jurisdiction." },
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
            { "@type": "Question", "name": "What is an industrial wash booth used for?", "acceptedAnswer": { "@type": "Answer", "text": "An industrial wash booth provides a dedicated, enclosed environment for pressure washing, steam cleaning, and degreasing vehicles, equipment, and parts before painting or coating. The booth captures w..." } },
            { "@type": "Question", "name": "Does a wash booth need to be NFPA 33 compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Wash booths used for cleaning prior to painting operations may be subject to NFPA 33 requirements depending on the cleaning agents used. PFS wash booths are built to applicable NFPA and OSHA standards..." } },
            { "@type": "Question", "name": "What is the difference between a wash booth and a prep station?", "acceptedAnswer": { "@type": "Answer", "text": "A wash booth is designed for wet cleaning — pressure washing, steam cleaning, and degreasing with water-based or solvent-based cleaners. A prep station is designed for dry surface preparation — sandin..." } },
            { "@type": "Question", "name": "Can PFS build a custom-size wash booth?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS manufactures wash booths in custom sizes to accommodate cars, trucks, buses, aircraft, heavy equipment, and large industrial parts. Contact a PFS engineer with your vehicle or part dimensions..." } },
            { "@type": "Question", "name": "What wastewater handling options are available for PFS wash booths?", "acceptedAnswer": { "@type": "Answer", "text": "PFS wash booths can be configured with floor drains connected to an oil-water separator, a recirculating wash water system, or a direct-to-drain configuration depending on your local wastewater regula..." } }
          ]
        }) }} />
      </section>

      {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="Complete Your Finishing System"
        label="Related Products"
        cards={PRODUCTS}
      />

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,display:"flex",background:"#111",borderTop:`3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase",borderRight:"1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=wash-booth" style={{ flex:1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
