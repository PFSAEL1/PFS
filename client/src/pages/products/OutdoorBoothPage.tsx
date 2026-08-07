/*
 * Outdoor Paint Booths — PFS Zenith Series
 * Route: /products/outdoor-booths
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Template: CrossFlowBoothPage — DO NOT DEVIATE
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

// ── CDN ASSETS ────────────────────────────────────────────────────────────────
const HERO_VIDEO   = "/manus-storage/pfs-outdoor-booth-drone_22397248.mp4";
const FEATURED_IMG = "/manus-storage/pfs-outdoor-featured-8144_ffd61081.jpg";

const GALLERY_IMGS = [
  { src: "/manus-storage/pfs-outdoor-multi-bay-featured_477be365.jpg",  alt: "PFS outdoor multi-bay finishing facility — three booths side by side",       pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-zenith-golden-hour_734e8047.jpg",  alt: "PFS Zenith outdoor spray booth at golden hour — front view with canopy",    pos: "center 40%" },
  { src: "/manus-storage/pfs-outdoor-front-ramps_0b711248.webp",        alt: "PFS outdoor spray booth — front-on with drive-up ramps, blue sky",           pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-front-hat_2c04dbeb.jpg",           alt: "PFS outdoor spray booth — PFS branding, ramps",        pos: "center 40%" },
  { src: "/manus-storage/pfs-outdoor-aerial-city_426097d3.jpg",         alt: "PFS outdoor spray booth — aerial city view with bus and booth",               pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-rooftop-pfs_bce873b8.jpg",         alt: "PFS outdoor rooftop spray booth — PFS logo, exhaust stack",                   pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-img8143_3e999d05.jpg",             alt: "PFS outdoor spray booth — installation view",                                 pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-img8141_5d7ab026.jpg",             alt: "PFS outdoor spray booth — additional install view",                           pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-80556983609_0ae3596a.jpg",         alt: "PFS outdoor spray booth — facility install",                                  pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-gallery-1_524ff591.jpg",             alt: "PFS outdoor spray booth — real installation photo",                           pos: "center 50%" },
  { src: "/manus-storage/pfs-outdoor-gallery-2_8be08851.jpg",             alt: "PFS outdoor spray booth — real installation photo",                           pos: "center 50%" },
];

// Cert logos
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
  { num: "02", title: "UL 508A Control Panel",               body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
  { num: "03", title: "Permanent Steel Building Structure",  body: "The outer enclosure is an engineered steel metal building — not a tent or portable unit. Anchored to a concrete pad and designed to meet local building codes, wind, and snow loads." },
];

const FEATURES_HIDDEN = [
  { num: "04", title: "CID2 Lighting — 4-Tube Fixtures",           body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination throughout the booth interior." },
  { num: "05", title: "Fiberglass Exhaust + Tacky Intake Filters",  body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "06", title: "Galvanized or Powder Coated Steel",          body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "07", title: "Heated & Non-Heated Options",                body: "Available with integrated direct-fired or indirect-fired heating for accelerated cure cycles. Heated configurations include blanket intake filter upgrades and insulated panel options." },
  { num: "08", title: "We Ship Nationally",                         body: "PFS outdoor booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation and commissioning." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "Standard": [
    { w: "14'", h: "9'",  l: "24'" },
    { w: "14'", h: "9'",  l: "27'" },
    { w: "14'", h: "9'",  l: "30'" },
    { w: "14'", h: "12'", l: "30'" },
  ],
  "Large": [
    { w: "20'", h: "14'", l: "40'" },
    { w: "24'", h: "16'", l: "50'" },
    { w: "30'", h: "18'", l: "60'" },
    { w: "Custom", h: "Custom", l: "Custom" },
  ],
};

const PRODUCTS = [
  { label: "Air Make-Up Units",   href: "/products/air-make-up-units",   img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",              desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms",        href: "/products/mixing-rooms",       img: "/manus-storage/IMG_0498_a98f5f38.jpg",          desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations",       href: "/products/prep-support/prep-stations",      img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",      desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Container Booths",    href: "/products/container-booths",   img: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg",        desc: "Mobile, self-contained shipping container booths for remote sites and flexible capacity." },
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
    <section style={{ background: "#ffffff", padding: "0", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111", boxShadow: "0 4px 0 0 #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right, #ffffff, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left, #ffffff, transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid #e5e7eb", flexShrink: 0 }}>
              <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.72rem", color: "#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AIRFLOW SVGs ──────────────────────────────────────────────────────────────
function CrossFlowSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"640px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 320" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes ocfRight { 0%{stroke-dashoffset:200;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes ocfUp    { 0%{stroke-dashoffset:80;opacity:0.3}  50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .ocf1{animation:ocfRight 2.0s linear infinite}
          .ocf2{animation:ocfRight 2.0s linear infinite 0.5s}
          .ocf3{animation:ocfRight 2.0s linear infinite 1.0s}
          .ocfu{animation:ocfUp 1.8s linear infinite}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        <rect x="60" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="60" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="60" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="80"  width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="618" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="610" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="82" y1="100" x2="618" y2="100" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="ocf1"/>
        <polygon points="618,94 634,100 618,106" fill="#22c55e"/>
        <line x1="82" y1="160" x2="618" y2="160" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="ocf2"/>
        <polygon points="618,154 634,160 618,166" fill="#22c55e"/>
        <line x1="82" y1="220" x2="618" y2="220" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="ocf3"/>
        <polygon points="618,214 634,220 618,226" fill="#22c55e"/>
        <line x1="625" y1="60" x2="625" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 8" className="ocfu"/>
        <polygon points="619,12 625,0 631,12" fill="#22c55e"/>
        <text x="40" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>INTAKE</text>
        <text x="40" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="660" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="625" y="295" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="625" y="308" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="300" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS ORION — CROSS-FLOW</text>
      </svg>
    </div>
  );
}

function SemiDowndraftSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"640px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes osdDown  { 0%{stroke-dashoffset:220;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes osdFloor { 0%{stroke-dashoffset:240;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes osdUp    { 0%{stroke-dashoffset:260;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .osd-d1{animation:osdDown  2.2s linear infinite 0.0s}
          .osd-d2{animation:osdDown  2.2s linear infinite 0.55s}
          .osd-d3{animation:osdDown  2.2s linear infinite 1.1s}
          .osd-fl{animation:osdFloor 2.0s linear infinite 0.0s}
          .osd-up{animation:osdUp   2.4s linear infinite 0.0s}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        {[88,140,192,244,296,348].map((x,i) => (
          <rect key={i} x={x} y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        ))}
        <rect x="598" y="60" width="22" height="130" rx="0" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <rect x="595" y="192" width="28" height="38" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="608" y="8" width="30" height="54" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd-d1"/>
        <polygon points="104,256 110,268 116,256" fill="#22c55e"/>
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd-d2"/>
        <polygon points="208,256 214,268 220,256" fill="#22c55e"/>
        <line x1="318" y1="60" x2="318" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd-d3"/>
        <polygon points="312,256 318,268 324,256" fill="#22c55e"/>
        <line x1="82" y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd-fl"/>
        <polygon points="590,252 602,258 590,264" fill="#22c55e"/>
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd-up"/>
        <polygon points="603,10 609,0 615,10" fill="#22c55e"/>
        <text x="220" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>CEILING INTAKE FILTERS (FRONT HALF)</text>
        <text x="660" y="212" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="226" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS ORION — SEMI-DOWNDRAFT</text>
      </svg>
    </div>
  );
}

function SideDowndraftSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"640px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes osd2Down  { 0%{stroke-dashoffset:220;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes osd2Floor { 0%{stroke-dashoffset:240;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          @keyframes osd2Up    { 0%{stroke-dashoffset:260;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
          .osd2-d1{animation:osd2Down  2.2s linear infinite 0.0s}
          .osd2-d2{animation:osd2Down  2.2s linear infinite 0.55s}
          .osd2-d3{animation:osd2Down  2.2s linear infinite 1.1s}
          .osd2-fl{animation:osd2Floor 2.0s linear infinite 0.0s}
          .osd2-fl2{animation:osd2Floor 2.0s linear infinite 0.5s}
          .osd2-up{animation:osd2Up   2.4s linear infinite 0.0s}
          .osd2-up2{animation:osd2Up  2.4s linear infinite 0.6s}
        `}</style>
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="3"/>
        {[88,140,192,244,296,348,400,452,504,556].map((x,i) => (
          <rect key={i} x={x} y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        ))}
        <rect x="598" y="60" width="22" height="130" rx="0" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <rect x="595" y="192" width="28" height="38" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        <rect x="608" y="8" width="30" height="54" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5"/>
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd2-d1"/>
        <polygon points="104,256 110,268 116,256" fill="#22c55e"/>
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd2-d2"/>
        <polygon points="208,256 214,268 220,256" fill="#22c55e"/>
        <line x1="318" y1="60" x2="318" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd2-d3"/>
        <polygon points="312,256 318,268 324,256" fill="#22c55e"/>
        <line x1="82" y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd2-fl"/>
        <polygon points="590,252 602,258 590,264" fill="#22c55e"/>
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="osd2-up"/>
        <polygon points="603,10 609,0 615,10" fill="#22c55e"/>
        <text x="350" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>
        <text x="660" y="212" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>SIDE WALL</text>
        <text x="660" y="226" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS HELIOS — SIDE DOWNDRAFT</text>
      </svg>
    </div>
  );
}

function FullDowndraftSVG() {
  return (
    <div style={{ width:"100%",maxWidth:"640px",margin:"0 auto" }}>
      <svg viewBox="0 0 700 400" style={{ width:"100%",height:"auto",display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes ofdDown  { 0%{stroke-dashoffset:220;opacity:0.25} 40%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.25} }
          @keyframes ofdRight { 0%{stroke-dashoffset:240;opacity:0.25} 40%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.25} }
          @keyframes ofdUp    { 0%{stroke-dashoffset:260;opacity:0.25} 40%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.25} }
          .ofd-d1{animation:ofdDown  2.0s linear infinite 0.00s}
          .ofd-d2{animation:ofdDown  2.0s linear infinite 0.33s}
          .ofd-d3{animation:ofdDown  2.0s linear infinite 0.66s}
          .ofd-d4{animation:ofdDown  2.0s linear infinite 1.00s}
          .ofd-r1{animation:ofdRight 2.4s linear infinite 0.00s}
          .ofd-u1{animation:ofdUp    2.2s linear infinite 0.00s}
        `}</style>
        <rect x="60" y="60" width="540" height="220" fill="none" stroke="#222" strokeWidth="3"/>
        {[68,148,228,308,388,468,548].map((x,i) => (
          <rect key={i} x={x} y="36" width="68" height="24" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5"/>
        ))}
        <text x="350" y="26" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>
        <rect x="60" y="262" width="540" height="18" fill="#d1d5db" stroke="#888" strokeWidth="1.5"/>
        {[80,110,140,170,200,230,260,290,320,350,380,410,440,470,500,530,560].map((x,i) => (
          <line key={i} x1={x} y1="262" x2={x} y2="280" stroke="#9ca3af" strokeWidth="1"/>
        ))}
        <text x="330" y="298" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>GRATED FLOOR EXHAUST PIT</text>
        <rect x="60" y="310" width="580" height="22" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="350" y="348" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>UNDERGROUND EXHAUST DUCT (CONCRETE PIT REQUIRED)</text>
        <rect x="630" y="8" width="32" height="304" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5"/>
        <text x="646" y="370" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="646" y="383" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <line x1="100" y1="60" x2="100" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="ofd-d1"/>
        <polygon points="94,258 100,272 106,258" fill="#22c55e"/>
        <line x1="220" y1="60" x2="220" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="ofd-d2"/>
        <polygon points="214,258 220,272 226,258" fill="#22c55e"/>
        <line x1="340" y1="60" x2="340" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="ofd-d3"/>
        <polygon points="334,258 340,272 346,258" fill="#22c55e"/>
        <line x1="460" y1="60" x2="460" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="ofd-d4"/>
        <polygon points="454,258 460,272 466,258" fill="#22c55e"/>
        <line x1="62" y1="321" x2="628" y2="321" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="ofd-r1"/>
        <polygon points="622,315 636,321 622,327" fill="#22c55e"/>
        <line x1="641" y1="310" x2="641" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="ofd-u1"/>
        <polygon points="635,12 641,0 647,12" fill="#22c55e"/>
        <text x="350" y="395" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">PFS ZENITH — FULL DOWNDRAFT</text>
      </svg>
    </div>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────


// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function OutdoorBoothPage() {
  useSEO({
    title: "Outdoor Spray Booths | Exterior Paint Booths for Large Equipment | PFS",
    description: "PFS outdoor spray booths are engineered for large equipment, agricultural machinery, and structural steel finishing in outdoor environments. Weather-resistant construction, ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/outdoor-booths/outdoor",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [specsOpen, setSpecsOpen]       = useState(false);
  const [sizesOpen, setSizesOpen]       = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [activeFlow, setActiveFlow]     = useState<"crossflow"|"semi"|"side"|"full">("crossflow");

  return (
    <div className="bg-white">

      {/* ── FULL-BLEED HERO ── */}
      <section style={{ position: "relative", minHeight: "clamp(340px, 55vh, 580px)", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <video
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            PAINT BOOTHS — OUTDOOR
          </span>
          <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>
            Outdoor Paint Booths<br />
            No Building Required
          </h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)", color: "#6fa3e0", borderRadius: "2px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem", marginBottom: "1.25rem" }}>
            PFS ZENITH SERIES
          </span>
          <p  data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px" }}>
            manufactured in the USA with ETL/UL listed and UL 508A certified components. Permanent steel building structure installed on a concrete pad — a complete finishing environment outside your existing facility. Ships nationally.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=outdoor-booth" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }} data-animation="slideRight">
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>
                CALL (888) 545-7715
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* CERT CAROUSEL */}
      <CertCarousel />

      {/* FEATURED BOOTH */}
      <section style={{ background: "#f5f5f5", padding: "4rem 0 3rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>FEATURED INSTALL</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>PFS Outdoor Multi-Bay Finishing Facility</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>PFS ZENITH SERIES</span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Multi-bay outdoor installation — three full-size PFS spray booths installed side-by-side on a concrete pad under a shared canopy. manufactured in the USA with ETL/UL listed components, NFPA 33 compliant, heated options available.
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", borderRadius: "2px" }}>
              <img src={FEATURED_IMG} alt="PFS Outdoor Multi-Bay Finishing Facility" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=outdoor-booth" data-animation="slideRight">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AIRFLOW SELECTOR */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>HOW IT WORKS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Choose Your Airflow Configuration</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
              PFS outdoor booths are available in all four airflow configurations. Select the one that fits your facility, floor plan, and finishing requirements.
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {([
              { key: "crossflow", label: "Cross-Flow (Orion)",      sub: "Horizontal airflow — no pit required" },
              { key: "semi",      label: "Semi-Downdraft (Orion)",  sub: "Ceiling intake, rear-wall exhaust — no pit" },
              { key: "side",      label: "Side Downdraft (Helios)", sub: "Ceiling intake, side-wall exhaust — no pit" },
              { key: "full",      label: "Full Downdraft (Zenith)", sub: "Vertical ceiling-to-floor — pit required" },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFlow(tab.key)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "0.85rem 1.5rem",
                  background: activeFlow === tab.key ? BLUE : "transparent",
                  border: `2px solid ${BLUE}`,
                  color: activeFlow === tab.key ? "#fff" : BLUE,
                  cursor: "pointer",
                  transition: "background 0.15s,color 0.15s",
                  minWidth: "180px",
                }}
              >
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tab.label}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", opacity: 0.8, marginTop: "0.2rem" }}>{tab.sub}</span>
              </button>
            ))}
          </div>

          {/* Active diagram */}
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {activeFlow === "crossflow" && (
              <div>
                <CrossFlowSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through front-wall intake filters and exits through rear-wall exhaust filters. Horizontal front-to-rear airflow keeps overspray away from the operator. No pit required — the most cost-effective outdoor booth configuration.
                </p>
              </div>
            )}
            {activeFlow === "semi" && (
              <div>
                <SemiDowndraftSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through ceiling intake filters at the front half and exhausts through rear-wall filters at floor level. No pit required. Better finish quality than cross-flow — ideal for automotive and fleet refinishing.
                </p>
              </div>
            )}
            {activeFlow === "side" && (
              <div>
                <SideDowndraftSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through full ceiling intake filters and exhausts through side-wall fan plenums. No pit required — drop it on your existing concrete slab. Ideal for retrofit sites and leased facilities.
                </p>
              </div>
            )}
            {activeFlow === "full" && (
              <div>
                <FullDowndraftSVG />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#555", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.7, maxWidth: "520px", margin: "1.25rem auto 0" }}>
                  Air enters through full-ceiling intake filters and exhausts through a grated floor pit into an underground duct. Concrete pit required. Highest finish quality available — overspray travels straight down and away from the vehicle surface.
                </p>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }} data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=outdoor-booth">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECS — collapsible, CrossFlow card-grid format */}
      <section style={{ background: "#fff", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: specsOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD FEATURES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Every Unit Ships Fully Certified</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSpecsOpen(!specsOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: specsOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: specsOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {specsOpen ? <><ChevronUp size={15} /> HIDE SPECS</> : <><ChevronDown size={15} /> SEE STANDARD SPECS</>}
            </button>
          </div>
          {specsOpen && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {FEATURES_VISIBLE.map((f) => (
                  <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                    <Link href="/contact/request-a-quote?from=outdoor-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                  </div>
                ))}
              </div>
              {featuresOpen && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {FEATURES_HIDDEN.map((f) => (
                    <div key={f.num} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#dde3ee", lineHeight: 1, marginBottom: "0.75rem" }}>{f.num}</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#111", letterSpacing: "0.01em", marginBottom: "0.6rem" }}>{f.title}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>{f.body}</div>
                      <Link href="/contact/request-a-quote?from=outdoor-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <button onClick={() => setFeaturesOpen(!featuresOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: `2px solid ${BLUE}`, color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.75rem", cursor: "pointer" }}>
                  {featuresOpen ? <><ChevronUp size={15} /> SHOW LESS</> : <><ChevronDown size={15} /> SEE ALL {FEATURES_HIDDEN.length + FEATURES_VISIBLE.length} FEATURES</>}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SIZES — collapsible, CrossFlow height-selector + dimension cards format */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>Standard &amp; Large — Choose Your Category</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSizesOpen(!sizesOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#666", marginBottom: "1.5rem" }}>Select a size category to see available configurations. Custom sizes available for any application.</p>
              <div style={{ display: "inline-flex", border: `2px solid ${BLUE}`, overflow: "hidden", borderRadius: "2px", marginBottom: "2rem" }}>
                {Object.keys(SIZES).map((k, idx, arr) => (
                  <button key={k} onClick={() => setSelectedHeight(selectedHeight === k ? null : k)} style={{ padding: "0.75rem 1.75rem", background: selectedHeight === k ? BLUE : "transparent", color: selectedHeight === k ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: idx < arr.length - 1 ? `1px solid ${BLUE}` : "none", cursor: "pointer", transition: "background 0.15s,color 0.15s" }}>{k}</button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background: "#fff", border: `2px solid ${BLUE}`, padding: "1.5rem 1rem", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#111", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>{s.w} × {s.h} × {s.l}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#888", marginBottom: "1rem" }}>W × H × L</div>
                      <Link href="/contact/request-a-quote?from=outdoor-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>GET PRICING <ArrowRight size={12} /></span></Link>
                    </div>
                  ))}
                </div>
              )}
              {!selectedHeight && (
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", color: "#888", fontStyle: "italic" }}>Select a category above to view available sizes.</p>
              )}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact/request-a-quote?from=outdoor-booth"><span className="btn-glow">REQUEST CUSTOM SIZE <ArrowRight size={15} /></span></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ padding: "3rem 0 4rem", background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-6">
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em" }}>Built in the USA. Proven in the Field.</h2>
          </div>
          <div className="mb-6">
            <GalleryGrid images={GALLERY_IMGS} cardHeight="280px" className="grid grid-cols-1 sm:grid-cols-2 gap-3" />
          </div>
          <div className="text-center" data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=outdoor-booth">
              <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Ready to Plan Your Outdoor Booth Installation?</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>Our engineers will assess your site, review local codes, and design a system that fits your footprint and process. We ship nationally.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=outdoor-booth" data-animation="slideLeft">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#fff", color: BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* HEATED OPTIONS */}
      <section style={{ background: "#111", padding: "3rem 0", borderTop: `4px solid ${BLUE}` }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>ADD-ON</span>
          <h2 data-animation="slideLeft"  style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Heated Options Available</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>
            Add a direct-fired or indirect-fired heat system to your outdoor booth for accelerated cure times. Blanket intake filter upgrades and insulated panels included with all heated configurations.
          </p>
          <Link href="/contact/request-a-quote?from=outdoor-booth">
            <span  data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>ASK ABOUT HEATED OPTIONS <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background: "#fff", padding: "3rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Pairs Well With an Air Make-Up Unit or Mixing Room</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#666", maxWidth: "480px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
            Maximize throughput and compliance by pairing your outdoor booth with a dedicated mixing room for paint prep and an AMU for tempered make-up air.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products/mixing-rooms" data-animation="slideLeft">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 1.75rem", cursor: "pointer" }}>VIEW MIXING ROOMS <ArrowRight size={13} /></span>
            </Link>
            <Link href="/products/air-make-up-units">
              <span data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 1.75rem", cursor: "pointer" }}>VIEW AIR MAKE-UP UNITS <ArrowRight size={13} /></span>
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
      <div className="md:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, display: "flex", background: "#111", borderTop: `3px solid ${BLUE}` }}>
        <a href="tel:8885457715" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", borderRight: "1px solid rgba(255,255,255,0.15)" }}>☎ (888) 545-7715</a>
        <Link href="/contact/request-a-quote?from=outdoor-booth" style={{ flex: 1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
