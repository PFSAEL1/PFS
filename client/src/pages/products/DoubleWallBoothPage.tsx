/*
 * Double-Wall Paint Booths — PFS Zenith Series
 * Route: /products/paint-booths/double-wall
 * Layout: CrossFlow template — MP4 video hero → cert carousel → featured photo
 *         → Airflow Selector (4 animated diagrams) → Standard Features collapsible
 *         → Available Sizes collapsible → Mid-page CTA band → Heated add-on
 *         → Pairs Well With → Related Products → Sticky mobile CTA bar
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryLightbox";
import { SiteProductCardSection } from "@/components/SiteProductCard";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO = "/manus-storage/pfs-double-wall-booth-v3-hero_4b7e7175.mp4";
const HERO_POSTER = "/manus-storage/pfs-double-wall-booth-v2_8cdb7a24.webp";
const FEATURED_IMG = "/manus-storage/pfs-dw-featured-zenith_2b530356.webp";
const GALLERY_IMGS = [
  // Real install photos first
  { src: "/manus-storage/dw-zenith-exterior-1_18ffc860.webp", alt: "PFS Zenith double-wall booth — front exterior with double entry doors, installed in customer facility" },
  { src: "/manus-storage/dw-zenith-exterior-2_b5f949b2.png", alt: "PFS Zenith double-wall booth — front view with HVAC stack, installed in open warehouse" },
  { src: "/manus-storage/pfs-walkin-batch-booth-front-wide_4f44f772.jpg", alt: "PFS double-wall panel system — front view with double entry doors, installed in industrial facility" },
  { src: "/manus-storage/pfs-walkin-batch-booth-front-scissor_13c63689.jpg", alt: "PFS double-wall panel system — front view with scissor lift during installation" },
  { src: "/manus-storage/pfs-walkin-batch-booth-side-angle1_9b6faf8e.jpg", alt: "PFS double-wall panel system — side angle view showing panel construction and exhaust stack" },
  { src: "/manus-storage/pfs-walkin-batch-booth-side-angle2_9b7ce2ca.jpg", alt: "PFS double-wall panel system — side angle view during installation" },
  { src: "/manus-storage/IMG_0914_2ebc304c.jpg", alt: "PFS Zenith double-wall booth — real install photo" },
  { src: "/manus-storage/IMG_0938_fc8d1552.jpg", alt: "PFS Zenith double-wall booth — real install photo" },
  { src: "/manus-storage/IMG_0225_3f80eac2.jpg", alt: "PFS Zenith double-wall booth — real install photo" },
  { src: "/manus-storage/IMG_8278_c5cec08c.jpg", alt: "PFS Zenith double-wall booth — real install photo" },
  // Renders / studio shots
  { src: "/manus-storage/pfs-dw-gallery-interior_3fb7ab85.jpg", alt: "PFS Double-Wall Booth Interior — full downdraft grated floor with ceiling plenum" },
  { src: "/manus-storage/pfs-dw-gallery-exterior_09b87952.jpg", alt: "PFS Double-Wall Booth — exterior view with mixing room" },
];

const ETL_LOGO = "/manus-storage/pfs-etl-logo_7758f722.png";
const UL_LOGO = "/manus-storage/pfs-ul508a-clean_e8efdeb8.jpg";
const NFPA_LOGO = "/manus-storage/pfs-nfpa-logo_4b710cc9.png";
const EPA_LOGO = "/manus-storage/pfs-epa-logo_e4165f68.webp";
const OSHA_LOGO = "/manus-storage/pfs-osha-logo_0c460739.jpg";
const USA_FLAG = "/manus-storage/pfs-usa-flag_8fca512e.jpg";

const BLUE = "#1B3A6B";

const CERTS = [
  { img: ETL_LOGO, title: "ETL & ETL-C Listed", sub: "Intertek — USA & Canada", imgH: 44 },
  { img: UL_LOGO, title: "UL 508A Certified", sub: "Industrial Control Panel Fabricator", imgH: 44 },
  { img: NFPA_LOGO, title: "NFPA 33 Compliant", sub: "Spray Application Standard", imgH: 44 },
  { img: EPA_LOGO, title: "EPA Compliant", sub: "Air Quality Standards", imgH: 36 },
  { img: OSHA_LOGO, title: "OSHA Compliant", sub: "Workplace Safety Standards", imgH: 36 },
  { img: USA_FLAG, title: "Made in the USA", sub: "Santa Rosa, CA", imgH: 36 },
];
const CERTS_LOOP = [...CERTS, ...CERTS];

const FEATURES_VISIBLE = [
  { num: "01", title: "Double-Wall Insulated Panels", body: "PFS Zenith double-wall booths feature insulated steel panel construction — superior thermal retention for heated configurations and reduced ambient noise. The double-wall design maintains consistent interior temperatures and dramatically improves energy efficiency versus single-wall booths." },
  { num: "03", title: "UL 508A Control Panel", body: "Pairs with our PFS Core Control Panel — UL 508A certified with spray, flash, and cure modes. Programmable cycle timers, safety interlocks, and optional BMS integration." },
];
const FEATURES_HIDDEN = [
  { num: "04", title: "Available in All Airflow Configurations", body: "The Zenith double-wall platform supports all four airflow configurations: Cross-Flow, Semi-Downdraft, Side Downdraft, and Full Downdraft. Choose the airflow that matches your application and facility — same double-wall insulated build quality across every configuration." },
  { num: "05", title: "UL Listed Tube Axial Fans", body: "High-efficiency, UL listed tube axial fans sized for your booth volume and selected airflow configuration. Fan sizing is calculated per configuration — full downdraft requires higher CFM to maintain proper face velocity through the grated floor." },
  { num: "06", title: "CID2 Lighting — 4-Tube Fixtures", body: "Class I Division 2 inside-access four-tube light fixtures (fluorescent or LED tube compatible). Optional LED upgrade available. Uniform, shadow-free illumination across the full interior." },
  { num: "07", title: "Fiberglass Exhaust + Tacky Intake", body: "Exhaust uses fiberglass media filters. Intake uses tacky-type filters standard. Blanket intake upgrades available for heated booth configurations." },
  { num: "08", title: "Galvanized or Powder Coated Steel", body: "Structural panels available in galvanized or powder coated finish. Built to NFPA 33 standards with air quality and OSHA compliance on every unit." },
  { num: "09", title: "We Ship Nationally", body: "PFS Zenith double-wall booths ship to all 50 states. Factory-direct pricing, fast lead times, and dedicated project support from order through installation." },
];

const SIZES: Record<string, { w: string; h: string; l: string }[]> = {
  "9": [{ w: "14'", h: "9'", l: "24'" }, { w: "14'", h: "9'", l: "27'" }, { w: "14'", h: "9'", l: "30'" }, { w: "14'", h: "9'", l: "33'" }],
  "10": [{ w: "14'", h: "10'", l: "24'" }, { w: "14'", h: "10'", l: "27'" }, { w: "14'", h: "10'", l: "30'" }, { w: "14'", h: "10'", l: "33'" }],
  "12": [{ w: "14'", h: "12'", l: "24'" }, { w: "14'", h: "12'", l: "27'" }, { w: "14'", h: "12'", l: "30'" }, { w: "14'", h: "12'", l: "33'" }],
};

const PRODUCTS = [
  { label: "Air Make-Up Units", href: "/products/air-make-up-units", img: "/manus-storage/pfs-amu-card_41f0dd88.jpg", desc: "Tempered make-up air systems to replace exhausted air and maintain positive booth pressure." },
  { label: "Mixing Rooms", href: "/products/mixing-rooms", img: "/manus-storage/IMG_0498_a98f5f38.jpg", desc: "Dedicated mixing rooms for safe paint preparation adjacent to your spray booth." },
  { label: "Prep Stations", href: "/products/prep-support/prep-stations", img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg", desc: "Dedicated prep and masking stations to keep your spray booth running at full capacity." },
  { label: "Cross-Flow Booths", href: "/products/paint-booths/crossflow", img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp", desc: "Horizontal airflow — most cost-effective enclosed booth for automotive and industrial finishing." },
];

const AIRFLOW_CONFIGS = [
  { id: "crossflow" as const, label: "Cross-Flow", badge: "PFS ORION SERIES", desc: "Air enters through front intake filters and exits through rear exhaust filters — horizontal airflow. Most cost-effective configuration. Non-heated only.", note: "No pit required", noteRed: false },
  { id: "semi" as const, label: "Semi-Downdraft", badge: "PFS SERIES", desc: "Ceiling intake filters at the front half of the booth, rear wall exhaust. Improved finish quality over cross-flow with no pit required.", note: "No pit required", noteRed: false },
  { id: "side" as const, label: "Side Downdraft", badge: "PFS HELIOS SERIES", desc: "Full ceiling intake with side-wall exhaust plenums. Air flows down from ceiling and exits through side-wall filters — excellent finish quality, no pit required.", note: "No pit required", noteRed: false },
  { id: "full" as const, label: "Downdraft", badge: "PFS ZENITH SERIES", desc: "Full ceiling intake with grated floor exhaust pit. Air flows straight down through the vehicle — the highest finish quality available. Concrete pit required.", note: "Concrete pit required", noteRed: true },
];

function CrossFlowSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 320" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`@keyframes dw_cfR{0%{stroke-dashoffset:200;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}@keyframes dw_cfU{0%{stroke-dashoffset:80;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}.dw_cf1{animation:dw_cfR 2s linear infinite}.dw_cf2{animation:dw_cfR 2s linear infinite 0.5s}.dw_cf3{animation:dw_cfR 2s linear infinite 1s}.dw_cfu{animation:dw_cfU 1.8s linear infinite}`}</style>
        <rect x="72" y="52" width="536" height="216" fill="none" stroke="#888" strokeWidth="6" />
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="2" />
        <rect x="60" y="80" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="60" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="60" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="618" y="80" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="618" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="618" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="610" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5" />
        <line x1="82" y1="100" x2="618" y2="100" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_cf1" />
        <polygon points="618,94 634,100 618,106" fill="#22c55e" />
        <line x1="82" y1="160" x2="618" y2="160" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_cf2" />
        <polygon points="618,154 634,160 618,166" fill="#22c55e" />
        <line x1="82" y1="220" x2="618" y2="220" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_cf3" />
        <polygon points="618,214 634,220 618,226" fill="#22c55e" />
        <line x1="625" y1="60" x2="625" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="15 8" className="dw_cfu" />
        <polygon points="619,12 625,0 631,12" fill="#22c55e" />
        <text x="40" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>INTAKE</text>
        <text x="40" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="660" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="625" y="295" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="625" y="308" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="300" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">CROSS-FLOW — NON-HEATED ONLY</text>
      </svg>
    </div>
  );
}

function SemiDowndraftSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`@keyframes dw_sdD{0%{stroke-dashoffset:200;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}@keyframes dw_sdF{0%{stroke-dashoffset:240;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}@keyframes dw_sdU{0%{stroke-dashoffset:260;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}.dw_sd1{animation:dw_sdD 2.2s linear infinite}.dw_sd2{animation:dw_sdD 2.2s linear infinite 0.55s}.dw_sdfl{animation:dw_sdF 2s linear infinite}.dw_sdup{animation:dw_sdU 2.4s linear infinite}`}</style>
        <rect x="72" y="52" width="536" height="216" fill="none" stroke="#888" strokeWidth="6" />
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="2" />
        <rect x="88" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="140" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="192" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="244" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="598" y="80" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="598" y="135" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="598" y="190" width="22" height="40" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="608" y="10" width="30" height="52" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5" />
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_sd1" />
        <polygon points="104,256 110,268 116,256" fill="#22c55e" />
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_sd2" />
        <polygon points="208,256 214,268 220,256" fill="#22c55e" />
        <line x1="82" y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_sdfl" />
        <polygon points="590,252 602,258 590,264" fill="#22c55e" />
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_sdup" />
        <polygon points="603,10 609,0 615,10" fill="#22c55e" />
        <text x="170" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FRONT CEILING INTAKE</text>
        <text x="660" y="158" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="172" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">SEMI-DOWNDRAFT — NO PIT REQUIRED</text>
      </svg>
    </div>
  );
}

function SideDowndraftSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 340" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`@keyframes dw_s2D{0%{stroke-dashoffset:220;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}@keyframes dw_s2F{0%{stroke-dashoffset:240;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}@keyframes dw_s2U{0%{stroke-dashoffset:260;opacity:0.3}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0.3}}.dw_s2d1{animation:dw_s2D 2.2s linear infinite 0s}.dw_s2d2{animation:dw_s2D 2.2s linear infinite 0.55s}.dw_s2d3{animation:dw_s2D 2.2s linear infinite 1.1s}.dw_s2fl{animation:dw_s2F 2s linear infinite}.dw_s2up{animation:dw_s2U 2.4s linear infinite}`}</style>
        <rect x="72" y="52" width="536" height="216" fill="none" stroke="#888" strokeWidth="6" />
        <rect x="80" y="60" width="520" height="200" fill="none" stroke="#222" strokeWidth="2" />
        <rect x="88" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="140" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="192" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="244" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="296" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="348" y="38" width="44" height="22" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="598" y="60" width="22" height="130" rx="0" fill="#e5e7eb" stroke="#888" strokeWidth="1.5" />
        <rect x="595" y="192" width="28" height="38" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />
        <rect x="608" y="8" width="30" height="54" rx="2" fill="#bbb" stroke="#888" strokeWidth="1.5" />
        <line x1="110" y1="60" x2="110" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_s2d1" />
        <polygon points="104,256 110,268 116,256" fill="#22c55e" />
        <line x1="214" y1="60" x2="214" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_s2d2" />
        <polygon points="208,256 214,268 220,256" fill="#22c55e" />
        <line x1="318" y1="60" x2="318" y2="256" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_s2d3" />
        <polygon points="312,256 318,268 324,256" fill="#22c55e" />
        <line x1="82" y1="258" x2="596" y2="258" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_s2fl" />
        <polygon points="590,252 602,258 590,264" fill="#22c55e" />
        <line x1="609" y1="258" x2="609" y2="10" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="30 10" className="dw_s2up" />
        <polygon points="603,10 609,0 615,10" fill="#22c55e" />
        <text x="220" y="32" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>CEILING INTAKE FILTERS</text>
        <text x="660" y="212" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="660" y="226" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FILTERS</text>
        <text x="623" y="315" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="623" y="328" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">SIDE DOWNDRAFT — NO PIT REQUIRED</text>
      </svg>
    </div>
  );
}

function FullDowndraftSVG() {
  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <svg viewBox="0 0 700 400" style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <style>{`@keyframes dw_fdD{0%{stroke-dashoffset:220;opacity:0.25}40%{opacity:1}100%{stroke-dashoffset:0;opacity:0.25}}@keyframes dw_fdR{0%{stroke-dashoffset:240;opacity:0.25}40%{opacity:1}100%{stroke-dashoffset:0;opacity:0.25}}@keyframes dw_fdU{0%{stroke-dashoffset:260;opacity:0.25}40%{opacity:1}100%{stroke-dashoffset:0;opacity:0.25}}.dw_fd1{animation:dw_fdD 2s linear infinite 0s}.dw_fd2{animation:dw_fdD 2s linear infinite 0.33s}.dw_fd3{animation:dw_fdD 2s linear infinite 0.66s}.dw_fd4{animation:dw_fdD 2s linear infinite 1s}.dw_fdr{animation:dw_fdR 2.4s linear infinite}.dw_fdu{animation:dw_fdU 2.2s linear infinite}`}</style>
        <rect x="52" y="52" width="556" height="236" fill="none" stroke="#888" strokeWidth="6" />
        <rect x="60" y="60" width="540" height="220" fill="none" stroke="#222" strokeWidth="2" />
        {[68, 148, 228, 308, 388, 468, 548].map((x, i) => <rect key={i} x={x} y="36" width="68" height="24" rx="2" fill="#ccc" stroke="#888" strokeWidth="1.5" />)}
        <text x="350" y="26" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>FULL CEILING INTAKE FILTERS</text>
        <rect x="60" y="262" width="540" height="18" fill="#d1d5db" stroke="#888" strokeWidth="1.5" />
        {[80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 410, 440, 470, 500, 530, 560].map((x, i) => <line key={i} x1={x} y1="262" x2={x} y2="280" stroke="#9ca3af" strokeWidth="1" />)}
        <text x="330" y="298" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>GRATED FLOOR EXHAUST PIT</text>
        <rect x="60" y="310" width="580" height="22" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5" />
        <text x="350" y="348" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>UNDERGROUND EXHAUST DUCT (CONCRETE PIT REQUIRED)</text>
        <rect x="630" y="8" width="32" height="304" rx="3" fill="#e5e7eb" stroke="#888" strokeWidth="1.5" />
        <text x="646" y="370" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>EXHAUST</text>
        <text x="646" y="383" textAnchor="middle" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" fontWeight="700" fill={BLUE}>STACK</text>
        <line x1="100" y1="60" x2="100" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="dw_fd1" />
        <polygon points="94,258 100,272 106,258" fill="#22c55e" />
        <line x1="220" y1="60" x2="220" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="dw_fd2" />
        <polygon points="214,258 220,272 226,258" fill="#22c55e" />
        <line x1="340" y1="60" x2="340" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="dw_fd3" />
        <polygon points="334,258 340,272 346,258" fill="#22c55e" />
        <line x1="460" y1="60" x2="460" y2="260" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="dw_fd4" />
        <polygon points="454,258 460,272 466,258" fill="#22c55e" />
        <line x1="62" y1="321" x2="628" y2="321" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="dw_fdr" />
        <polygon points="622,315 636,321 622,327" fill="#22c55e" />
        <line x1="641" y1="310" x2="641" y2="12" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeDasharray="28 10" className="dw_fdu" />
        <polygon points="635,12 641,0 647,12" fill="#22c55e" />
        <text x="350" y="395" textAnchor="middle" fontSize="13" fontFamily="'Barlow Condensed',sans-serif" fontWeight="800" fill="#333" letterSpacing="1">FULL DOWNDRAFT — CONCRETE PIT REQUIRED</text>
      </svg>
    </div>
  );
}

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
    <section style={{ background: "#fff", overflow: "hidden", borderTop: `4px solid ${BLUE}`, borderBottom: "3px solid #111", boxShadow: "0 4px 0 0 #111" }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to right,#fff,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2, background: "linear-gradient(to left,#fff,transparent)", pointerEvents: "none" }} />
        <div ref={trackRef} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", willChange: "transform" }}>
          {CERTS_LOOP.map((cert, i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid #e5e7eb", flexShrink: 0 }}>
              <img src={cert.img} alt={cert.title} style={{ height: `${cert.imgH}px`, width: "auto", objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, color: "#111", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cert.title}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#666" }}>{cert.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



export default function DoubleWallBoothPage() {
  useSEO({
    title: "Double Wall Spray Booths | Heavy-Duty Industrial Paint Booths | PFS",
    description: "PFS double-wall spray booths are engineered for demanding industrial finishing environments. Insulated double-wall panel construction for superior temperature control and durability. NFPA 33 compliant, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/spray-booths/double-wall",
  });

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState<string | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<"crossflow" | "semi" | "side" | "full">("full");

  return (
    <div className="bg-white">

      {/* ── MP4 VIDEO HERO ── */}
      <section style={{ position: "relative", minHeight: "clamp(340px,65vh,680px)", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <video preload="auto" autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,5,5,0.96) 0%,rgba(5,5,5,0.70) 35%,rgba(5,5,5,0.30) 70%,rgba(5,5,5,0.10) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "3.5rem" }}>
          <span style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>PAINT BOOTHS — ENCLOSED</span>
          <h1 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(2.6rem,7vw,5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>Double-Wall<br />Paint Booths<br />Built to Last</h1>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(27,58,107,0.75)", border: "1px solid rgba(107,163,224,0.4)", color: "#6fa3e0", borderRadius: "2px", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.3rem 0.75rem", marginBottom: "1.25rem" }}>PFS ZENITH SERIES</span>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.95rem,1.8vw,1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "500px" }}>ETL listed. UL 508A certified. Insulated double-wall panel construction — available in all four airflow configurations. Ships nationally.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/contact/request-a-quote?from=double-wall-booth" data-animation="slideLeft">
              <span className="btn-glow" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a href="tel:8885457715" style={{ width: "100%", maxWidth: "320px" }} data-animation="slideRight">
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
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
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>FEATURED PAINT BOOTH</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>PFS Zenith Double-Wall Paint Booth</h2>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>PFS ZENITH SERIES</span>
              <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>Insulated double-wall panel construction. ETL listed. UL 508A controls. Built to NFPA 33 standards. Available in all airflow configurations. Standard sizes 14'W × 9–12'H × 24–33'L. Custom sizes available.</p>
            </div>
            <div style={{ width: "100%", maxWidth: "900px", overflow: "hidden", borderRadius: "2px" }}>
              <img src={FEATURED_IMG} alt="PFS Zenith Series Double-Wall Paint Booth — open doors view" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/contact/request-a-quote?from=double-wall-booth" data-animation="slideLeft">
                <span className="btn-glow">REQUEST A QUOTE <ArrowRight size={15} /></span>
              </Link>
              <Link href="/products/paint-booths/enclosed" data-animation="slideRight">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>SEE ALL ENCLOSED BOOTHS <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section style={{ background: "#111", padding: "3rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>REAL INSTALLS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", margin: 0 }}>Real PFS Installations</h2>
          </div>
          <GalleryGrid images={GALLERY_IMGS} cardHeight="clamp(220px,35vw,360px)" />
        </div>
      </section>

      {/* AIRFLOW CONFIGURATION SELECTOR */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>AIRFLOW CONFIGURATIONS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Available in All Four Airflow Types</h2>
            <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>The PFS Zenith double-wall platform supports every airflow configuration — choose the one that fits your application, facility, and finish quality requirements.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {AIRFLOW_CONFIGS.map((cfg) => (
              <button key={cfg.id} onClick={() => setActiveFlow(cfg.id)} style={{ padding: "0.75rem 1.5rem", background: activeFlow === cfg.id ? BLUE : "transparent", color: activeFlow === cfg.id ? "#fff" : BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.15s,color 0.15s", borderRadius: "2px" }}>{cfg.label}</button>
            ))}
          </div>
          {AIRFLOW_CONFIGS.filter(c => c.id === activeFlow).map(cfg => (
            <div key={cfg.id} style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.28rem 0.85rem", marginBottom: "0.75rem" }}>{cfg.badge}</span>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.92rem", color: "#555", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>{cfg.desc}</p>
              <span style={{ display: "inline-block", marginTop: "0.5rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.75rem", fontWeight: 700, color: cfg.noteRed ? "#dc2626" : BLUE, letterSpacing: "0.1em", textTransform: "uppercase" }}>⚑ {cfg.note}</span>
            </div>
          ))}
          {activeFlow === "crossflow" && <CrossFlowSVG />}
          {activeFlow === "semi" && <SemiDowndraftSVG />}
          {activeFlow === "side" && <SideDowndraftSVG />}
          {activeFlow === "full" && <FullDowndraftSVG />}
          <div style={{ textAlign: "center", marginTop: "2rem" }} data-animation="slideRight">
            <Link href="/contact/request-a-quote?from=double-wall-booth">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECS — collapsible */}
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
                    <Link href="/contact/request-a-quote?from=double-wall-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
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
                      <Link href="/contact/request-a-quote?from=double-wall-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>LEARN MORE <ArrowRight size={12} /></span></Link>
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

      {/* SIZES — collapsible */}
      <section style={{ background: "#f5f5f5", padding: "3rem 0 2rem", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: sizesOpen ? "2rem" : 0 }}>
            <div>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>STANDARD SIZES</span>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", margin: 0 }}>14' Wide — Choose Your Height</h2>
            </div>
            <button data-animation="slideRight" onClick={() => setSizesOpen(!sizesOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: sizesOpen ? BLUE : "transparent", border: `2px solid ${BLUE}`, color: sizesOpen ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer", transition: "background 0.15s,color 0.15s", whiteSpace: "nowrap" }}>
              {sizesOpen ? <><ChevronUp size={15} /> HIDE SIZES</> : <><ChevronDown size={15} /> SEE STANDARD SIZES</>}
            </button>
          </div>
          {sizesOpen && (
            <>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#666", marginBottom: "1.5rem" }}>All standard booths are 14' wide. Select a ceiling height to see available lengths.</p>
              <div style={{ display: "inline-flex", border: `2px solid ${BLUE}`, overflow: "hidden", borderRadius: "2px", marginBottom: "2rem" }}>
                {["9", "10", "12"].map((h) => (
                  <button key={h} onClick={() => setSelectedHeight(selectedHeight === h ? null : h)} style={{ padding: "0.75rem 1.75rem", background: selectedHeight === h ? BLUE : "transparent", color: selectedHeight === h ? "#fff" : BLUE, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: h !== "12" ? `1px solid ${BLUE}` : "none", cursor: "pointer", transition: "background 0.15s,color 0.15s" }}>{h}' HEIGHT</button>
                ))}
              </div>
              {selectedHeight && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {SIZES[selectedHeight].map((s, i) => (
                    <div key={i} style={{ background: "#fff", border: `2px solid ${BLUE}`, padding: "1.5rem 1rem", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#111", letterSpacing: "0.02em", marginBottom: "0.25rem" }}>{s.w} × {s.h} × {s.l}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "#888", marginBottom: "1rem" }}>W × H × L</div>
                      <Link href="/contact/request-a-quote?from=double-wall-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>GET PRICING <ArrowRight size={12} /></span></Link>
                    </div>
                  ))}
                </div>
              )}
              {!selectedHeight && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.85rem", color: "#888", fontStyle: "italic" }}>Select a height above to see available lengths.</p>}
              <div style={{ marginTop: "1.5rem", padding: "1.25rem 1.5rem", background: "#fff", border: `1px solid ${BLUE}`, borderLeft: `4px solid ${BLUE}` }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Need a Custom Size?</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.83rem", color: "#555", lineHeight: 1.6, marginBottom: "0.75rem" }}>PFS builds custom-width and custom-height double-wall booths for oversized vehicles, aircraft, and industrial applications. Contact us for a custom quote.</div>
                <Link href="/contact/request-a-quote?from=double-wall-booth"><span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>REQUEST CUSTOM QUOTE <ArrowRight size={12} /></span></Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* MID-PAGE CTA BAND */}
      <section style={{ background: BLUE, padding: "3.5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Ready to Configure Your Double-Wall Booth?</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", marginBottom: "2rem", maxWidth: "480px", margin: "0 auto 2rem" }}>Factory-direct pricing. All four airflow configurations. Fast lead times. Dedicated support from order through installation.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote?from=double-wall-booth" data-animation="slideLeft">
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
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Heated Options Available</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px", margin: "0 auto 1.75rem", lineHeight: 1.7 }}>The double-wall insulated panel construction makes the Zenith the ideal platform for heated configurations. Add a direct-fired or indirect-fired heat system for accelerated cure times up to 180°F. Blanket intake filter upgrades included with all heated configurations.</p>
          <Link href="/contact/request-a-quote?from=double-wall-booth">
            <span data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer" }}>ASK ABOUT HEATED OPTIONS <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      {/* PAIRS WELL WITH */}
      <section style={{ background: "#fff", padding: "3rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", color: BLUE, textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>COMPLETE YOUR SYSTEM</span>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 800, color: "#111", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>Pairs Well With a Mixing Room or Air Make-Up Unit</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#666", maxWidth: "480px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>Maximize throughput and compliance by pairing your double-wall booth with a dedicated mixing room for paint prep and an AMU for tempered make-up air.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products/mixing-rooms" data-animation="slideLeft">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: BLUE, color: "#fff", fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 1.75rem", cursor: "pointer" }}>VIEW MIXING ROOMS <ArrowRight size={13} /></span>
            </Link>
            <Link href="/products/air-make-up-units" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: BLUE, border: `2px solid ${BLUE}`, fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 1.75rem", cursor: "pointer" }}>VIEW AIR MAKE-UP UNITS <ArrowRight size={13} /></span>
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
        <Link href="/contact/request-a-quote?from=double-wall-booth" style={{ flex: 1 }}>
          <span className="btn-glow" style={{ width: "100%", justifyContent: "center" }}>GET PRICING →</span>
        </Link>
      </div>

    </div>
  );
}
