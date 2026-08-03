/**
 * TemperatureControlledRoomsPage.tsx
 * Design: Industrial dark-on-white, Barlow Condensed headings — same system as PrepStationsPage
 * SEO: JSON-LD Product schema, meta title/description injected via <head>, H1/H2/H3 hierarchy
 * Industries: Battery storage, chip manufacturing, pharma, data centers, automotive, robotics
 */

import { useState, useEffect } from "react";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp, Phone } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";

// ── CDN IMAGES ────────────────────────────────────────────────────────────────
const FEATURED_IMG  = "/manus-storage/pfs-tcr-exterior-angled_30f84dad.jpg";
const GALLERY_1     = "/manus-storage/pfs-tcr-exterior-control-panel_3227f697.jpg";
const GALLERY_2     = "/manus-storage/pfs-tcr-interior-heater-wall_ec638003.jpg";
const GALLERY_3     = "/manus-storage/pfs-tcr-interior-exit-door_8dc0f0ed.jpg";
const GALLERY_4     = "/manus-storage/pfs-tcr-interior-hazloc-door_ce38dc15.jpg";
const GALLERY_5     = "/manus-storage/pfs-tcr-interior-wide-blue-filter_fe875867.jpg";

// ── CDN VIDEO ─────────────────────────────────────────────────────────────────
const HERO_VIDEO    = "/manus-storage/pfs-temp-room-hero_1712ca09.mp4";

// ── CERTS ─────────────────────────────────────────────────────────────────────
const ETL_LOGO   = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO    = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO  = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const USA_FLAG   = "/manus-storage/pfs-usa-flag_c1b7e9f2.png";

const BLUE = "#1B3A6B";

// ── CERT BAR (static, no scroll) ──────────────────────────────────────────────
const CERTS = [
  { img: ETL_LOGO,  title: "ETL/UL Components",    sub: "Certified Equipment Used", imgH: 44 },
  { img: UL_LOGO,   title: "UL 508A Control Panel", sub: "Listed Control Panels",    imgH: 36 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant",     sub: "Hazardous Location Ready", imgH: 40 },
  { img: USA_FLAG,  title: "Made in the USA",        sub: "Santa Rosa, CA",           imgH: 36 },
];

function CertBar() {
  return (
    <div style={{ background: "#f5f5f5", borderTop: "1px solid #e0e0e0", borderBottom: "1px solid #e0e0e0", padding: "1.25rem clamp(1.5rem,5vw,4rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-around", alignItems: "center" }}>
        {CERTS.map((c) => (
          <div key={c.title} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src={c.img} alt={c.title} style={{ height: c.imgH, width: "auto", objectFit: "contain", filter: "grayscale(0.2)" }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", color: "#111", textTransform: "uppercase" }}>{c.title}</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.65rem", color: "#777", letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FEATURES ──────────────────────────────────────────────────────────────────
const ALL_FEATURES = [
  { num: "01", title: "Custom Sizes",                         body: "Every PFS temperature-controlled room is built to your exact floor plan. Standard and non-standard footprints available — from compact single-process enclosures to large-scale production rooms spanning thousands of square feet." },
  { num: "02", title: "Single Wall or Double Wall Construction", body: "Choose single-wall panel construction for standard applications or double-wall insulated panels for superior thermal performance, condensation control, and noise attenuation. Double-wall construction is standard for pharmaceutical and battery storage environments." },
  { num: "03", title: "Precision Temperature Control",        body: "Tight temperature tolerances maintained across the full operating range. Programmable setpoints, digital PID controllers, and optional data logging for process validation and compliance documentation." },
  { num: "04", title: "Heating Options",                      body: "Multiple heat sources available: hydronic water heaters, natural gas heaters, propane heaters, and electric resistance heating. Hazardous location (Hazloc) rated heaters available for Class I Division 2 environments." },
  { num: "05", title: "Cooling Options",                      body: "Air cooling and liquid cooling configurations available. Direct expansion (DX) refrigeration, chilled water coils, and precision air conditioning units sized to your thermal load. Side-mounted units standard for all battery and electronics enclosures." },
  { num: "06", title: "Temp Controlled Environments",         body: "Rooms are engineered to maintain stable internal conditions regardless of ambient fluctuations. Suitable for environments requiring tight temperature tolerances, including battery formation, chip burn-in, and pharmaceutical stability testing." },
  { num: "07", title: "Optional Heat & Cooling Combinations", body: "Year-round process stability with integrated heating and cooling in a single control system. Automatic switchover based on setpoint deviation. Ideal for climates with wide seasonal temperature swings." },
  { num: "08", title: "Hazardous Location (Hazloc) Rated",   body: "Class I Division 2 rated electrical components, lighting, and heaters available for environments where flammable vapors or gases may be present — including lithium-ion battery storage, solvent-based coating rooms, and chemical processing areas." },
  { num: "09", title: "UL 508A Control Panel Available",       body: "UL 508A listed control panels are available for temperature-controlled rooms. Includes programmable cycle timers, safety interlocks, alarm outputs, and optional BMS/SCADA integration. All electrical components utilized are UL/built with ETL/UL certified components. Same panel platform used across the full PFS product line." },
  { num: "10", title: "Indoor & Outdoor Versions",           body: "All PFS temperature-controlled rooms are available in both indoor and outdoor configurations. Outdoor units include weatherproof panel systems, sealed penetrations, and optional canopy structures for equipment protection." },
  { num: "11", title: "Fire Suppression Ready",              body: "Rooms are designed to accommodate integrated fire suppression systems. Pre-piped suppression connections, detection wiring raceways, and coordination with third-party suppression contractors available." },
  { num: "12", title: "Made in the USA",                     body: "Engineered and manufactured at our facility in Santa Rosa, CA. Factory-direct pricing, fast lead times, and dedicated project support from order through installation. Ships to all 50 states." },
];

// ── INDUSTRIES ────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { title: "Battery Storage Manufacturing",      body: "Indoor and outdoor lithium-ion battery manufacturing and storage enclosures. Hazloc-rated, fire suppression ready, and engineered to meet NFPA 855 and IFC requirements for battery energy storage systems (BESS)." },
  { title: "Pharmaceutical Manufacturing",       body: "Temperature and humidity-controlled rooms for active pharmaceutical ingredient (API) storage, stability testing, and GMP manufacturing environments. Validation documentation available." },
  { title: "Chip & Semiconductor Manufacturing", body: "Precision thermal environments for semiconductor burn-in, wafer processing, and component testing. Tight temperature uniformity and contamination control for critical yield-sensitive processes." },
  { title: "Specialized Robotics",               body: "Controlled environments for robotic assembly, calibration, and testing. Stable temperature conditions prevent thermal expansion errors in precision robotic systems and automated manufacturing cells." },
  { title: "Automotive Manufacturing",           body: "Temperature-controlled paint curing rooms, adhesive bonding environments, and component conditioning chambers for OEM and Tier 1 automotive suppliers." },
  { title: "Modular Data Center Enclosures",     body: "Thermally managed enclosures for edge computing, switchgear, and modular data center deployments. Precision cooling maintains equipment operating temperatures in harsh or remote environments." },
  { title: "Switchgear Manufacturing",           body: "Climate-controlled assembly and testing environments for medium and high-voltage switchgear. Protects sensitive electrical components from humidity, condensation, and temperature extremes during manufacturing and storage." },
  { title: "Critical Environment Applications",  body: "Any process requiring a stable, controlled thermal environment — including aerospace component conditioning, medical device manufacturing, and specialty chemical processing." },
];

// ── RELATED PRODUCTS ──────────────────────────────────────────────────────────
const RELATED = [
  { label: "Process-Controlled Rooms",   href: "/products/environmental-rooms/process-controlled", img: "/manus-storage/pfs-process-controlled-room-exterior_f4302d4b.jpg",  desc: "Precise temperature, humidity, and airflow control for sensitive finishing operations." },
  { label: "Enclosed Work Environments", href: "/products/environmental-rooms/enclosed-work",      img: "/manus-storage/pfs-environmental-room-interior-large_a5ff5797.jpg", desc: "Clean, contamination-free enclosures for assembly, inspection, and precision work." },
  { label: "Industrial Ovens",           href: "/products/ovens",                                   img: "/manus-storage/pfs-batch-oven-card_f2b3e9a1.jpg",                   desc: "Batch, walk-in, and conveyor ovens for curing and heat treating." },
  { label: "Enclosed Paint Booths",      href: "/products/paint-booths/enclosed",                   img: "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg",             desc: "Full-enclosure spray booths for superior overspray containment and finish quality." },
];

// ── SEO JSON-LD ───────────────────────────────────────────────────────────────
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Temperature-Controlled Rooms — PFS Industrial Finishing Equipment",
  "description": "Custom temperature-controlled rooms for battery storage, pharmaceutical manufacturing, chip manufacturing, data centers, and critical environments. Single or double-wall construction, heating and cooling options, Hazloc rated. All components utilize UL/built with ETL/UL certified components equipment. Made in the USA.",
  "brand": { "@type": "Brand", "name": "PFS" },
  "manufacturer": { "@type": "Organization", "name": "PFS Industrial Finishing Equipment", "url": "https://pfsspraybooths.com" },
  "category": "Industrial Environmental Rooms",
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "USD", "seller": { "@type": "Organization", "name": "PFS" } },
});

// ── INDUSTRY ACCORDION ITEM ───────────────────────────────────────────────────
function IndustryItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e5e5" }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
          gap: "1rem",
        }}
      >
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", color: "#111", letterSpacing: "0.04em" }}>{title}</span>
        {open ? <ChevronUp size={16} color={BLUE} style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color="#888" style={{ flexShrink: 0 }} />}
      </button>
      {open && (
        <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.65, margin: "0 0 1rem", paddingRight: "1.5rem" }}>{body}</p>
      )}
    </div>
  );
}

export default function TemperatureControlledRoomsPage() {
  useSEO({
    title: "Temperature Controlled Rooms | Humidity & Climate Finishing Rooms | PFS",
    description: "PFS temperature and humidity controlled finishing rooms for aerospace, pharmaceutical, electronics, and precision manufacturing. Custom-engineered climate control, HEPA filtration, and positive pressure configurations.",
    canonical: "/products/environmental-rooms/temperature-controlled",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);

  // Inject SEO meta tags + JSON-LD
  useEffect(() => {
    document.title = "Temperature-Controlled Rooms | Battery Storage, Pharma, Chip Mfg | PFS";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "PFS temperature-controlled rooms for lithium-ion battery storage, pharmaceutical manufacturing, chip & semiconductor production, modular data centers, and critical environments. Custom sizes, double-wall construction, Hazloc rated. All components utilize UL/built with ETL/UL certified components equipment. Indoor and outdoor versions. Made in the USA.";
    let ld = document.getElementById("tcr-jsonld");
    if (!ld) { ld = document.createElement("script"); ld.id = "tcr-jsonld"; (ld as HTMLScriptElement).type = "application/ld+json"; document.head.appendChild(ld); }
    ld.textContent = JSON_LD;
    return () => { ld?.remove(); };
  }, []);

  return (
    <div style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", color: "#111", background: "#fff" }}>

      {/* ── VIDEO HERO ── */}
      <section style={{ position: "relative", width: "100%", height: "clamp(480px, 65vh, 720px)", overflow: "hidden", background: "#000" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)" }} />
        {/* content */}
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/products" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Products</Link>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>›</span>
              <Link href="/products/environmental-rooms" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>Environmental Rooms</Link>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>›</span>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.72rem", fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Temperature-Controlled Rooms</span>
            </nav>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>PFS ENVIRONMENTAL ROOMS</span>
            <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,4.5rem)", lineHeight: 1.0, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0.4rem 0 0.75rem" }}>
              TEMPERATURE-<br />CONTROLLED ROOMS
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", lineHeight: 1.65, maxWidth: 560, margin: "0 0 1.5rem" }}>
              Custom-built precision thermal enclosures for battery storage, pharmaceutical manufacturing, chip production, data centers, and critical process environments. Single or double-wall construction. Indoor and outdoor versions available.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/contact/request-a-quote?from=temp-controlled-rooms" className="btn-glow" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                GET PRICING <ArrowRight size={15} />
              </Link>
              <a href="tel:8885457715" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent" }}>
                <Phone size={14} /> (888) 545-7715
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERT BAR (static) ── */}
      <CertBar />

      {/* ── FEATURED PRODUCT ── */}
      <section style={{ background: "#fff", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>FEATURED PRODUCT</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 1.5rem" }}>
            PFS TEMPERATURE-CONTROLLED ROOM
          </h2>
          <div style={{ width: "100%", overflow: "hidden", borderRadius: 2, background: "#f0f0f0" }}>
            <img
              src={FEATURED_IMG}
              alt="PFS temperature-controlled room — angled exterior view showing white insulated panel construction, control panel, fire suppression system, and dual entry doors"
              style={{ width: "100%", height: "auto", maxHeight: "600px", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
            {[
              { val: "Custom",        label: "Any Size" },
              { val: "Stable",         label: "Temp Tolerance" },
              { val: "Single/Double", label: "Wall Options" },
              { val: "Indoor/Outdoor",label: "Configurations" },
              { val: "UL/ETL Comps",  label: "Components" },
              { val: "USA Made",      label: "Santa Rosa, CA" },
            ].map(s => (
              <div key={s.label} style={{ background: "#f5f5f5", padding: "1rem 1.25rem", borderLeft: `3px solid ${BLUE}` }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: BLUE, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", color: "#777", textTransform: "uppercase", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (COLLAPSIBLE) ── */}
      <section style={{ background: "#f5f5f5", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>STANDARD FEATURES</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 1.5rem" }}>
            BUILT FOR CRITICAL ENVIRONMENTS
          </h2>
          <button
            onClick={() => setFeaturesOpen(v => !v)}
            style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE, background: "none", border: `1.5px solid ${BLUE}`, padding: "0.6rem 1.4rem", cursor: "pointer" }}
            aria-expanded={featuresOpen}
          >
            {featuresOpen ? <><ChevronUp size={15} /> HIDE FEATURES</> : <><ChevronDown size={15} /> VIEW ALL {ALL_FEATURES.length} FEATURES</>}
          </button>
          {featuresOpen && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {ALL_FEATURES.map(f => (
                <div key={f.num} style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "2rem", color: "#e5e5e5", lineHeight: 1, marginBottom: "0.5rem" }}>{f.num}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", color: "#111", margin: "0 0 0.6rem", letterSpacing: "0.04em" }}>{f.title}</h3>
                  <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{f.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── INDUSTRIES SERVED (accordion) ── */}
      <section style={{ background: "#fff", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>INDUSTRIES SERVED</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#111", margin: "0 0 0.5rem" }}>
            ENGINEERED FOR YOUR INDUSTRY
          </h2>
          <p style={{ color: "#666", fontSize: "0.92rem", marginBottom: "1.5rem" }}>Select an industry to learn more.</p>
          <div style={{ borderTop: "1px solid #e5e5e5" }}>
            {INDUSTRIES.map(ind => (
              <IndustryItem key={ind.title} title={ind.title} body={ind.body} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ background: "#111", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>REAL INSTALLS</span>
          <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", textTransform: "uppercase", lineHeight: 1.05, color: "#fff", margin: "0 0 2rem" }}>
            TEMPERATURE-CONTROLLED ROOM GALLERY
          </h2>
          <GalleryGrid
            images={[
              { src: GALLERY_1, alt: "PFS temperature-controlled room — exterior view showing UL 508A control panel, fire suppression cylinder, and piping" },
              { src: GALLERY_2, alt: "PFS temperature-controlled room interior — Hazloc Heaters unit mounted on white insulated panel wall with gas supply lines" },
              { src: GALLERY_3, alt: "PFS temperature-controlled room interior — exit door with Hazloc heater overhead and green intake filter panels in ceiling" },
              { src: GALLERY_4, alt: "PFS temperature-controlled room interior — double entry doors with window lites, Hazloc heater, and louvered return air wall" },
              { src: GALLERY_5, alt: "PFS temperature-controlled room interior — wide angle showing full length with ceiling-mounted green filter media and blue exhaust filter end wall" },
            ]}
            cardHeight="280px"
          />
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: BLUE, padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem,2.5vw,2rem)", textTransform: "uppercase", color: "#fff", margin: "0 0 0.4rem" }}>READY TO CONFIGURE YOUR CONTROLLED ROOM?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", margin: 0 }}>Custom sizes, any heat source, indoor or outdoor — built to your spec and shipped factory-direct.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=temp-controlled-rooms" className="btn-glow" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              GET PRICING <ArrowRight size={15} />
            </Link>
            <a href="tel:8885457715" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.85rem", padding: "0.75rem 2rem", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent" }}>
              <Phone size={14} /> (888) 545-7715
            </a>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      <SiteProductCardSection
        label="COMPLETE YOUR SYSTEM"
        heading="YOU MAY ALSO NEED"
        cards={RELATED}
      />
    </div>
  );
}
