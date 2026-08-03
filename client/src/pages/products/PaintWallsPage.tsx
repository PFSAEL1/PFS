/**
 * Paint Walls — PFS Exhaust Wall
 * Layout: Hero → Compliance Carousel → Two product cards (each with collapsible features/specs)
 *         → Gallery → Many Sizes CTA → Complete Your Finishing System
 * Design: PFS brand — Barlow Condensed headings, Inter body, navy #1B3A6B accent
 * Key change: Removed spec blocks, restored collapsible features, added second config card
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG     = "/manus-storage/pfs-paint-wall-installed-warehouse_ce242c4f.jpeg";  // Real installed paint wall in warehouse — wide shot shows full unit

const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-paint-wall-tradeshow-angled_90ac854d.jpeg", alt: "PFS Exhaust Wall — trade show display, angled view with ETL badge" },
  { src: "/manus-storage/pfs-paint-wall-tradeshow-front_14728a6f.jpeg",  alt: "PFS Exhaust Wall — trade show display, front view with fiberglass filter media" },
  { src: "/manus-storage/pfs-paint-wall-factory-pfs-logo_26d50457.jpeg", alt: "PFS Exhaust Wall — factory floor, large unit with PFS logo and control panel" },
  { src: "/manus-storage/pfs-paint-wall-installed-warehouse_ce242c4f.jpeg", alt: "PFS Exhaust Wall installed in warehouse with exhaust duct stack" },
  { src: "/manus-storage/pfs-paint-wall-compact-unit_9aa7d463.jpeg",      alt: "PFS compact Exhaust Wall unit — ETL classified, NFPA 33 compliant, ready to ship" },
  { src: "/manus-storage/pfs-paintwall-factory-large_29070fbc.jpeg",        alt: "PFS large paint wall — factory floor, full-height filter wall with technician for scale" },
  { src: "/manus-storage/pfs-paintwall-scissorlift-install_f3bf3586.jpeg",   alt: "PFS paint wall installation — scissor lift used to install large wall inside spray booth" },
  { src: "/manus-storage/pfs-paintwall-dual-exhaust_3cda010e.jpeg",          alt: "PFS paint wall — dual exhaust stack installation, back view showing two exhaust risers" },
  { src: "/manus-storage/IMG_9319_71fe9a26.jpeg",                               alt: "PFS paint wall installed inside spray booth — PFS-branded exhaust wall with paint horses and finished parts" },
];
const FEATURED_IMG = "/manus-storage/pfs-exhaust-wall-featured_764e5557.png";

// Paint Walls are NOT built with ETL/UL certified components — use only applicable compliance logos
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO  = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG  = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: NFPA_LOGO, title: "NFPA 33 Compliant",   sub: "Spray Application Standard",  imgH: 44 },
  { img: EPA_LOGO,  title: "EPA Compliant",        sub: "Air Quality Standards",        imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant",       sub: "Workplace Safety Standards",   imgH: 36 },
  { img: USA_FLAG,  title: "Made in the USA",      sub: "Santa Rosa, CA",               imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS, ...CERTS];

// ── Product 1: Standard Exhaust Wall ──────────────────────────────────────────
const WALL1_FEATURES = [
  { num: "01", title: "High-Capacity Tube Axial Fan", body: "Heavy-duty UL listed tube axial fan sized for the unit. Rated for 208/240V 3-phase standard; single-phase available as an option. Moves high volumes of air efficiently to capture overspray at the source." },
  { num: "02", title: "CID2 Lighting — Front Service Access", body: "Class I Division 2 light fixture with front service access for easy bulb replacement. Fluorescent or LED tube compatible. Optional LED upgrade available for superior color rendering and energy savings." },
  { num: "03", title: "Built-In Fire Suppression", body: "Integrated fire suppression system built into the unit — no separate system required. Meets NFPA 33 requirements for spray finishing equipment." },
  { num: "04", title: "High-Efficiency Filter Media", body: "Fiberglass exhaust filter media captures overspray before it reaches the fan. Low-maintenance, easy to replace. Optional upgraded filter media available for high-volume applications." },
  { num: "05", title: "Optional Ductless Configuration", body: "Available in a ductless configuration — no exhaust duct required. Recirculating filtration system keeps the shop clean without the need for exterior duct runs." },
  { num: "06", title: "Optional Power Cord", body: "Available with an optional power cord for plug-in installation — no hardwiring required. Ideal for shops that need flexibility to reposition the unit." },
  { num: "07", title: "NFPA 33 Construction", body: "Built to NFPA 33 spray application standards. Steel construction — galvanized or powder coated. Designed for safe open-face spray finishing of parts, panels, and components." },
  { num: "08", title: "Many Sizes & Configurations", body: "PFS manufactures Exhaust Walls in a wide range of sizes — from compact benchtop units to large walk-in walls. Single-phase or 3-phase, ducted or ductless, with or without heat." },
];

// ── Product 2: Large Industrial Exhaust Wall ──────────────────────────────────
const WALL2_FEATURES = [
  { num: "01", title: "Heavy-Duty Industrial Fan", body: "Larger diameter tube axial fan for high-volume industrial applications. Available in multiple HP ratings to match your airflow requirements." },
  { num: "02", title: "Multi-Section Modular Design", body: "Modular panel construction allows the wall to be assembled in sections — ideal for large bays, drive-through configurations, or facilities with limited access." },
  { num: "03", title: "Dual Exhaust Risers", body: "Large walls ship with dual exhaust risers for balanced airflow across the full width of the filter face. Reduces static pressure and extends filter life." },
  { num: "04", title: "High-Capacity Filter Media", body: "Oversized filter bays hold more media for longer service intervals. Designed for high-volume production environments with heavy overspray loads." },
  { num: "05", title: "Integrated Control Panel", body: "UL508A listed control panel with motor starter, disconnect, and hour meter. Pairs with PFS core control panel for full system integration." },
  { num: "06", title: "Custom Heights & Widths", body: "Available in custom heights and widths to match your facility. Floor-to-ceiling configurations available for maximum overspray capture in large bays." },
];

const PRODUCTS = [
  { label: "Prep Stations",     href: "/products/prep-support/prep-stations",   img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",    desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Paint Mix Rooms",   href: "/products/prep-support/paint-mix-rooms", img: "/manus-storage/IMG_0498_a98f5f38.jpg",           desc: "NFPA 33 compliant mixing rooms for safe paint storage and tinting." },
  { label: "Enclosed Booths",   href: "/products/paint-booths/enclosed",        img: "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg",       desc: "Full-enclosure spray booths for superior overspray containment and finish quality." },
  { label: "Air Make-Up Units", href: "/products/air-make-up-units",            img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                       desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
];



function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 3;
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

/** Collapsible feature list — shows first 3, expands on click */
function CollapsibleFeatures({ features }: { features: { num: string; title: string; body: string }[] }) {
  const [open, setOpen] = useState(false);
  const visible = open ? features : features.slice(0, 3);
  return (
    <div>
      <div style={{ display:"flex",flexDirection:"column",gap:"0.75rem" }}>
        {visible.map((f) => (
          <div key={f.num} style={{ display:"flex",gap:"1rem",padding:"0.85rem 1rem",background:"#f8f8f6",border:"1px solid #e8e8e6" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:800,color:BLUE,letterSpacing:"0.1em",minWidth:"22px",paddingTop:"2px" }}>{f.num}</span>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.92rem",fontWeight:800,color:"#111",letterSpacing:"0.02em",marginBottom:"0.2rem" }}>{f.title}</div>
              <div style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.8rem",color:"#555",lineHeight:1.6 }}>{f.body}</div>
            </div>
          </div>
        ))}
      </div>
      {features.length > 3 && (
        <button
          onClick={() => setOpen(!open)}
          style={{ marginTop:"0.75rem",display:"inline-flex",alignItems:"center",gap:"0.4rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:800,color:BLUE,letterSpacing:"0.1em",textTransform:"uppercase",background:"none",border:`1.5px solid ${BLUE}`,padding:"0.55rem 1.25rem",cursor:"pointer" }}
        >
          {open ? "SHOW LESS" : `SEE ALL ${features.length} FEATURES`}
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}

/** A single paint wall product card with image, description, collapsible features, and CTA */
function WallCard({
  badge, title, subtitle, img, imgAlt, features, tag,
}: {
  badge: string; title: string; subtitle: string; img: string; imgAlt: string;
  features: { num: string; title: string; body: string }[]; tag: string;
}) {
  return (
    <div style={{ background:"#fff",border:"1px solid #e5e7eb",overflow:"hidden" }}>
      {/* Image */}
      <div style={{ width:"100%",aspectRatio:"16/9",overflow:"hidden",background:"#f5f5f5" }}>
        <img src={img} alt={imgAlt} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center" }} />
      </div>
      {/* Content */}
      <div style={{ padding:"1.75rem 1.5rem 2rem" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.75rem",flexWrap:"wrap" }}>
          <span style={{ background:BLUE,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.65rem",fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",padding:"0.22rem 0.7rem" }}>{badge}</span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.68rem",fontWeight:700,color:"#888",letterSpacing:"0.1em",textTransform:"uppercase" }}>{tag}</span>
        </div>
        <h3 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,2.5vw,1.9rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem",lineHeight:1.1 }}>{title}</h3>
        <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.88rem",color:"#555",lineHeight:1.7,marginBottom:"1.25rem" }}>{subtitle}</p>

        {/* Collapsible features */}
        <CollapsibleFeatures features={features} />

        {/* CTAs */}
        <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap",marginTop:"1.5rem" }}>
          <Link href="/contact/request-a-quote?from=paint-wall">
            <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={14}/></span>
          </Link>
          <a href="tel:8885457715">
            <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:BLUE,border:`2px solid ${BLUE}`,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.88rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaintWallsPage() {
  useSEO({
    title: "Paint Walls | Industrial Spray Wall Systems | PFS",
    description: "PFS industrial paint walls provide a ventilated, code-compliant finishing environment for large parts, structural steel, and production applications. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/paint-booths/paint-walls",
  });

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
      <section style={{ position:"relative", minHeight:"clamp(340px, 55vh, 580px)", display:"flex", flexDirection:"column", justifyContent:"flex-end", overflow:"hidden" }}>
        <img src={HERO_IMG} alt="PFS paint wall for open-face spray finishing applications" aria-hidden="true" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)" }} />
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"3px",background:BLUE,zIndex:3 }} />
        <div className="container" style={{ position:"relative",zIndex:2,paddingTop:"8rem",paddingBottom:"4.5rem" }}>
          <span style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",display:"block",marginBottom:"1rem" }}>PREP &amp; SUPPORT — PAINT WALLS</span>
          <h1 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(2.6rem,7vw,5rem)",fontWeight:800,color:"#fff",lineHeight:1.0,letterSpacing:"-0.01em",marginBottom:"1rem",maxWidth:"680px" }}>
            PFS Exhaust Walls<br />
            Built to Last
          </h1>
          <span style={{ display:"inline-flex",alignItems:"center",gap:"0.4rem",background:"rgba(27,58,107,0.75)",border:"1px solid rgba(107,163,224,0.4)",color:"#6fa3e0",borderRadius:"2px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"0.3rem 0.75rem",marginBottom:"1.25rem" }}>PFS EXHAUST WALL SERIES</span>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"rgba(255,255,255,0.82)",lineHeight:1.7,marginBottom:"2.5rem",maxWidth:"500px" }}>
            Open-face exhaust filtration walls for spray painting parts and panels — no full enclosure required. Many sizes and configurations available. Built to NFPA 33. Ships nationally.
          </p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:"1rem" }}>
            <Link href="/contact/request-a-quote?from=paint-wall">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715" style={{ width:"100%",maxWidth:"320px" }}>
              <span style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.5)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* COMPLIANCE CAROUSEL */}
      <CertCarousel />

      {/* MANY SIZES HEADLINE — above product cards */}
      <section style={{ background:"#f5f5f5",padding:"3rem 0 0.5rem" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:BLUE,textTransform:"uppercase",display:"block",marginBottom:"0.5rem" }}>FACTORY DIRECT</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3vw,2.4rem)",fontWeight:800,color:"#111",letterSpacing:"-0.01em",marginBottom:"0.5rem" }}>Many Sizes &amp; Configurations Available</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"#555",maxWidth:"560px",margin:"0 auto",lineHeight:1.7 }}>
            PFS manufactures Exhaust Walls in custom widths, heights, and depths — from compact benchtop units to large industrial walls. Single-phase or 3-phase, ducted or ductless, with or without heat.
          </p>
        </div>
      </section>

      {/* TWO PRODUCT CARDS — stacked, each with collapsible features */}
      <section style={{ background:"#f5f5f5",padding:"2rem 0 3.5rem" }}>
        <div className="container" style={{ display:"flex",flexDirection:"column",gap:"2rem" }}>

          {/* Card 1: Standard Exhaust Wall */}
          <WallCard
            badge="PFS EXHAUST WALL"
            tag="STANDARD SERIES"
            title="PFS Exhaust Wall — Standard"
            subtitle="The PFS Exhaust Wall is an open-face finishing system for spray painting parts, panels, and components. Features a high-capacity tube axial fan, CID2 front-service lighting, built-in fire suppression, and fiberglass filter media. Available in many sizes — approximately 7ft H x 7ft W x 4ft D as shown. Single-phase or 3-phase, ducted or ductless."
            img={FEATURED_IMG}
            imgAlt="PFS Exhaust Wall — Standard Series"
            features={WALL1_FEATURES}
          />

          {/* Card 2: Large Industrial Exhaust Wall */}
          <WallCard
            badge="PFS EXHAUST WALL"
            tag="LARGE INDUSTRIAL SERIES"
            title="PFS Exhaust Wall — Large Industrial"
            subtitle="The PFS Large Industrial Exhaust Wall is engineered for high-volume production environments, large bays, and facilities that need floor-to-ceiling overspray capture. Modular panel construction, dual exhaust risers, high-capacity filter bays, and an integrated UL508A control panel. Custom heights and widths available — contact us for your specific requirements."
            img="/manus-storage/pfs-paintwall-factory-large_29070fbc.jpeg"
            imgAlt="PFS Large Industrial Exhaust Wall — factory floor, full-height filter wall with technician for scale"
            features={WALL2_FEATURES}
          />

        </div>
      </section>

      {/* REAL INSTALLS GALLERY */}
      <section style={{ background:"#111",padding:"3rem 0" }}>
        <div className="container">
          <div style={{ textAlign:"center",marginBottom:"2rem" }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",display:"block",marginBottom:"0.4rem" }}>REAL INSTALLS</span>
            <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.4rem,2.5vw,2rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",margin:0 }}>Real PFS Installations</h2>
          </div>
          <GalleryGrid images={GALLERY_IMGS} cardHeight="clamp(220px,35vw,360px)" />
        </div>
      </section>

      {/* MANY SIZES CTA BAND */}
      <section style={{ background:BLUE,padding:"3.5rem 0" }}>
        <div className="container" style={{ textAlign:"center" }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.18em",color:"rgba(255,255,255,0.55)",textTransform:"uppercase",display:"block",marginBottom:"0.75rem" }}>GET STARTED</span>
          <h2 style={{ fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:800,color:"#fff",letterSpacing:"-0.01em",marginBottom:"1rem" }}>Ready to Order? We Ship Nationally.</h2>
          <p style={{ fontFamily:"'Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.8)",marginBottom:"2rem",maxWidth:"480px",margin:"0 auto 2rem" }}>Factory-direct pricing. Fast lead times. Dedicated support from order through installation. Call or request a quote to get started.</p>
          <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
            <Link href="/contact/request-a-quote?from=paint-wall">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"#fff",color:BLUE,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>GET PRICING <ArrowRight size={16}/></span>
            </Link>
            <a href="tel:8885457715">
              <span style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.6)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.9rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"1.1rem 2.5rem",cursor:"pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

            {/* RELATED PRODUCTS */}
      <SiteProductCardSection
        heading="COMPLETE YOUR FINISHING SYSTEM */}"
        label="Complete Your System"
        cards={PRODUCTS}
      />

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden" style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:100,display:"flex",background:"#111",borderTop:`3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.4rem",padding:"1rem",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.82rem",fontWeight:700,color:"#fff",letterSpacing:"0.08em",textTransform:"uppercase",borderRight:"1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=paint-wall" style={{ flex:1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
