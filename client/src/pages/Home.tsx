/*
 * PFS Homepage — Archer.com-Inspired Premium Industrial Design
 * Design: Deep dark backgrounds (#0D0D14), red (#FFFFFF) accent, white text
 * Typography: Barlow Condensed (headings, uppercase) + Inter (body)
 * Interactions: Intersection Observer fade-ins, smooth hover states, glow effects
 * Sections: Hero → Stats → Logo Carousel → Products → Why PFS → Industries → Integration → Service → CTA
 */

import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Phone, ChevronRight, Shield, Zap, Wrench, MapPin } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import LogoCarousel from "@/components/LogoCarousel";


// import { motion } from "motion/react";
// import { fadeIn, slideLeft, slideRight, zoomIn } from "../animations";

const HERO_VIDEO_MP4 = "/manus-storage/pfs-home-hero-dji-v2_c53f6df4.mp4";  // DJI drone aerial — full PFS compound flyover
const HERO_VIDEO_WEBM = "/manus-storage/pfs-hero-video_c8080ffb.webm";
const HERO_POSTER = "/manus-storage/pfs-hero-poster_9c70e41f.jpg";
const AEROSPACE_IMG = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";

// Distinct stock photos per category — no repeats
const IMG_PAINT_BOOTH = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";  // Real PFS booth — technician spraying inside PFS-branded booth
const IMG_POWDER = "/manus-storage/pfs-powder-coating-card2_32de7c98.png";     // Gema powder guns blue cloud
const IMG_OVEN = "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png";           // Real PFS Vulcan batch oven photo
const IMG_BLAST = "/manus-storage/blast-systems-real_c7389401_16a0255c.webp";           // Real PFS blast booth photo
const IMG_PREP = "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg";
const IMG_AMU = "/manus-storage/pfs-amu-card_41f0dd88.jpg";                    // Real PFS Apollo AMU rooftop photo
const IMG_ROBOTICS = "/manus-storage/pfs-robotics-card_2aac132b.jpg";               // Real PFS robotic finishing cell — dual arms, red paint spray
const IMG_PARTS = "/manus-storage/pfs-filters-card_8b47eabc.png";              // Real PFS filter photo

const PRODUCT_FAMILIES = [
  { label: "Paint Booths", href: "/products/paint-booths", img: IMG_PAINT_BOOTH, desc: "Cross-flow, semi-downdraft, and full downdraft configurations for any application." },
  { label: "Powder Coating Systems", href: "/products/powder-booths", img: IMG_POWDER, desc: "Spray to waste, powder reclaim, and automated powder coating systems." },
  { label: "Industrial Ovens", href: "/products/ovens", img: IMG_OVEN, desc: "Batch, conveyor, walk-in, and large-equipment curing ovens built to spec.", objectFit: "contain" as const, imgBg: "#1a1a1a" },
  { label: "Blasting Systems", href: "/products/blast-systems", img: IMG_BLAST, desc: "Blasting booths, reclaim blasting booths, and containerized blast booths." },
  { label: "Prep & Support", href: "/products/prep-support", img: IMG_PREP, desc: "Prep stations, paint mix rooms, sanding booths, and grinding booths." },
  { label: "Air Make-Up Units", href: "/products/air-make-up-units", img: IMG_AMU, desc: "Heated and non-heated AMUs to maintain proper airflow and temperature." },
  { label: "Integration & Automation", href: "/integration-automation", img: IMG_ROBOTICS, desc: "Robotic spray and powder cells, automated conveyor lines, and turnkey finishing systems." },
  { label: "Parts & Filters", href: "/parts", img: IMG_PARTS, desc: "OEM replacement parts, filters, and consumables for all PFS equipment." },
];

const INDUSTRIES = [
  { label: "Collision Repair & Auto Body", href: "/industries/collision-repair" },
  { label: "Aerospace & Defense", href: "/industries/aerospace-defense" },
  { label: "Industrial Manufacturing", href: "/industries/industrial-manufacturing" },
  { label: "Truck, Bus & Fleet", href: "/industries/truck-bus-fleet" },
  { label: "Woodworking", href: "/industries/woodworking" },
  { label: "Government & Military", href: "/industries/government-military" },
];

const WHY_PFS = [
  {
    icon: <Shield size={22} style={{ color: "#FFFFFF" }} />,
    title: "ETL/UL Listed Components — USA & Canada",
    body: "Intertek ETL Listed for both the United States and Canada. Every PFS booth meets the electrical and safety requirements of both markets.",
  },
  {
    icon: <CheckCircle size={22} style={{ color: "#FFFFFF" }} />,
    title: "UL 508A Certified Manufacturer",
    body: "Our control panels are designed and assembled in our UL 508A certified manufacturing facility — not sourced from third-party panel shops.",
  },
  {
    icon: <Zap size={22} style={{ color: "#FFFFFF" }} />,
    title: "Built to NFPA & OSHA Standards",
    body: "Every booth is engineered to comply with NFPA 33 (spray application of flammable materials) and OSHA ventilation and worker safety requirements.",
  },
  {
    icon: <MapPin size={22} style={{ color: "#FFFFFF" }} />,
    title: "Manufactured in the USA",
    body: "Designed and built in Santa Rosa, CA using domestic steel and components. Factory-direct service from the team that built your equipment.",
  },
];

// Certification badges — authority-building, factual
const CERT_BADGES = [
  { num: "ETL Listed", label: "USA & Canada" },
  { num: "UL 508A", label: "Certified Manufacturer" },
  { num: "NFPA 33", label: "Built to Standard" },
  { num: "OSHA", label: "Compliant" },
  { num: "Air Quality", label: "Compliant" },
  { num: "Made in USA", label: "Santa Rosa, CA" },
];

export default function Home() {
  useSEO({
    title: "PFS | Turnkey Industrial Finishing Systems — Spray Booths, Powder Coating & Blast Rooms",
    description: "Platinum Finishing Systems (PFS) is a turnkey systems integrator and vertical manufacturer specializing in custom industrial finishing solutions. We design, fabricate, and install complete finishing lines — ETL-certified spray booths, powder coating systems, industrial ovens, blast rooms, robotic applicators, and UL508A control panels — for automotive, aerospace, defense, and industrial manufacturing nationwide. Engineered and built in Santa Rosa, CA.",
    canonical: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Platinum Finishing Systems",
        "alternateName": "PFS",
        "url": "https://platinumfinishingsystems.com",
        "logo": "https://platinumfinishingsystems.com/pfs-logo.png",
        "description": "Platinum Finishing Systems (PFS) is a turnkey industrial finishing systems manufacturer based in Santa Rosa, CA. PFS designs, fabricates, and installs spray paint booths, powder coating systems, industrial ovens, blast rooms, air make-up units, and complete finishing lines for automotive, aerospace, defense, and industrial manufacturing customers nationwide.",
        "foundingLocation": "Santa Rosa, CA",
        "areaServed": "United States",
        "telephone": "+18885457715",
        "email": "info@platinumfinishingsystems.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Santa Rosa",
          "addressRegion": "CA",
          "addressCountry": "US"
        },
        "sameAs": [
          "https://www.linkedin.com/company/platinum-finishing-systems",
          "https://www.youtube.com/@platinumfinishingsystems",
          "https://www.facebook.com/platinumfinishingsystems"
        ],
        "knowsAbout": [
          "spray paint booths",
          "powder coating systems",
          "industrial ovens",
          "blast rooms",
          "abrasive blasting",
          "air make-up units",
          "downdraft spray booths",
          "cross-flow spray booths",
          "batch curing ovens",
          "powder reclaim systems",
          "containerized blast booths",
          "aerospace paint booths",
          "NFPA 33 compliance",
          "ETL/UL certified finishing equipment"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Platinum Finishing Systems",
        "url": "https://platinumfinishingsystems.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://platinumfinishingsystems.com/products?q={search_term_string}" },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Spray Booths", "item": "https://platinumfinishingsystems.com/products/spray-booths" },
          { "@type": "ListItem", "position": 2, "name": "Powder Coating Systems", "item": "https://platinumfinishingsystems.com/products/powder-booths" },
          { "@type": "ListItem", "position": 3, "name": "Industrial Ovens", "item": "https://platinumfinishingsystems.com/products/ovens" },
          { "@type": "ListItem", "position": 4, "name": "Blast Rooms", "item": "https://platinumfinishingsystems.com/products/blast-systems" },
          { "@type": "ListItem", "position": 5, "name": "California Service", "item": "https://platinumfinishingsystems.com/spray-booth-service-california" }
        ]
      }
    ] as Record<string, unknown>[]
  });

  const productsRef = useReveal();
  const whyRef = useReveal();
  const industriesRef = useReveal();
  const integrationRef = useReveal();
  const serviceRef = useReveal();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.playbackRate = 1.5;
  }, []);
  return (
    <div style={{ backgroundColor: "#0D0D14" }}>

      {/* ── Hero ── */}
      <section className="relative" style={{ minHeight: "100vh", maxHeight: "900px", overflow: "hidden" }}>
        <div className="absolute inset-0">
          {/* Video background */}
          <video preload="auto"
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          >
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
          {/* Minimal overlay — crystal clear video, text legible via bottom gradient only */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.10)", pointerEvents: "none" }} />
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "220px", background: "linear-gradient(0deg, rgba(5,5,10,0.80) 0%, rgba(5,5,10,0.40) 50%, transparent 100%)", pointerEvents: "none" }} />
        </div>

        <div className="container relative flex flex-col justify-center hero-content-wrapper" style={{ minHeight: "100vh", maxHeight: "900px", paddingTop: "8rem", paddingBottom: "6rem" }}>
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: "2rem", height: "2px", backgroundColor: "#FFFFFF" }} />
              <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FFFFFF" }}>
                PFS
              </span>
            </div>

            <h1
              Data-animation="slideLeft"
              style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 0.95,
                letterSpacing: "0.01em",
                marginBottom: "1.5rem",
              }}
            >
              Engineering the Future
              <br />
              <span
                style={{
                  color: "#FFFFFF",
                  textShadow: "0 0 40px rgba(255,255,255,0.25)",
                }}
              >
                of Industrial Finish
              </span>
            </h1>
            <p data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(0.85rem, 2vw, 1rem)", color: "rgba(255,255,255,0.85)", lineHeight: 2, marginBottom: "2.5rem", maxWidth: "520px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
              Paint.&nbsp;&nbsp;Powder.&nbsp;&nbsp;Robotics.&nbsp;&nbsp;Automation.&nbsp;&nbsp;Service.<br />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75em", letterSpacing: "0.1em" }}>ETL Listed &nbsp;·&nbsp; Made in USA</span>
            </p>

            <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "0.75rem", marginBottom: "2.5rem", alignItems: "center" }}>
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
                <span
                  className="btn-primary"
                  style={{
                    fontSize: "0.78rem",
                    padding: "0.75rem 1.4rem",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Request Info <ArrowRight size={14} />
                </span>
              </Link>
              {/* Mobile-only: View Products CTA */}
              <Link href="/products" data-animation="slideRight">
                <span
                  className="md:hidden"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    color: "#ffffff",
                    border: "1.5px solid rgba(255,255,255,0.6)",
                    padding: "0.75rem 1.2rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow:
                      "0 0 12px rgba(255,255,255,0.15), inset 0 0 12px rgba(255,255,255,0.05)",
                  }}
                >
                  View Products <ArrowRight size={14} />
                </span>
              </Link>
            </div>


          </div>
        </div>

        {/* Scroll indicator */}

      </section>



      {/* ── Logo Carousel ── */}
      <LogoCarousel />

      {/* ── Product Families ── */}
      <section ref={productsRef} style={{ padding: "7rem 0", backgroundColor: "#0D0D14", position: "relative" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 90% 10%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(0,0,0,0.35) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div className="container relative">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: "1.5rem", height: "2px", backgroundColor: "#FFFFFF" }} />
              <span className="section-label" style={{ marginBottom: 0 }}>Our Equipment</span>
            </div>
            <h2 data-animation="slideLeft"
              style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Complete Finishing Solutions
            </h2>
            <p data-animation="slideLeft"
              style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: "520px",
              }}
            >
              From single spray booths to fully integrated finishing lines, PFS manufactures the complete range of industrial finishing equipment your operation needs.
            </p>
          </div>

          {/* Product grid — 1 col on mobile, 2 on sm, 4 on desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "10px",
            }}
            className="sm:!grid-cols-2 lg:!grid-cols-4"
          >
            {PRODUCT_FAMILIES.map((pf) => (
              <div data-animation="fadeIn">
                <Link key={pf.label} href={pf.href}>
                  <div
                    className="product-card-item"
                    style={{
                      cursor: "pointer",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "3px",
                      transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.25s ease",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = "0 0 0 1px rgba(27,43,75,0.45), 0 4px 24px rgba(27,43,75,0.18), 0 8px 40px rgba(0,0,0,0.45)";
                      el.style.borderColor = "rgba(27,43,75,0.55)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = "none";
                      el.style.borderColor = "rgba(255,255,255,0.10)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Image — 16:9 on mobile (full width), 4:3 on desktop */}
                    <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", position: "relative", flexShrink: 0, backgroundColor: (pf as any).imgBg || "transparent" }}
                      className="sm:aspect-video lg:aspect-video"
                    >
                      <img
                        src={pf.img}
                        alt={pf.label}
                        style={{ width: "100%", height: "100%", objectFit: (pf as any).objectFit || "cover", objectPosition: "center", display: "block", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", backgroundColor: (pf as any).imgBg || "transparent" }}
                      />
                    </div>
                    {/* White text panel */}
                    <div style={{ backgroundColor: "#FFFFFF", padding: "0.9rem 1rem 1.1rem", flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "0.4rem",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#0A0A0A",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.2,
                            margin: 0,
                          }}
                        >
                          {pf.label}
                        </h3>

                        <ChevronRight
                          size={13}
                          style={{
                            color: "#0A0A0A",
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        />
                      </div>
                      <p 
                        style={{
                          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                          fontSize: "0.72rem",
                          color: "#666666",
                          lineHeight: 1.55,
                          marginTop: "0.3rem",
                          marginBottom: 0,
                        }}
                      >
                        {pf.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/products" data-animation="slideLeft">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.7)",
                  padding: "0.7rem 1.5rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FFFFFF";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                View All Products <ArrowRight size={13} />
              </span>
            </Link>
            <Link href="/contact/request-a-quote" data-animation="slideRight">
              <span
                className="btn-primary"
                style={{
                  fontSize: "0.78rem",
                  padding: "0.7rem 1.75rem",
                }}
              >
                Get Pricing <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why PFS ── */}
      <section ref={whyRef} style={{ padding: "7rem 0", backgroundColor: "#0A0A0A", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 100% 40%, rgba(255,255,255,0.04) 0%, transparent 50%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)", pointerEvents: "none" }} />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: content */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: "1.5rem", height: "2px", backgroundColor: "#FFFFFF" }} />
                <span className="section-label" style={{ marginBottom: 0 }}>Why PFS</span>
              </div>
              <h2 data-animation="slideLeft"
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.25rem",
                }}
              >
                The Standard for
                <br />
                Industrial Finishing
              </h2>
              <p data-animation="slideLeft"
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                  marginBottom: "2.5rem",
                }}
              >
                For over 20 years, PFS has been the trusted source for ETL Listed spray booths and finishing equipment across North America. We don't just sell booths — we engineer complete finishing solutions.
              </p>

              <div className="space-y-5">
                {WHY_PFS.map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div
                      style={{
                        flexShrink: 0,
                        width: "44px",
                        height: "44px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "white",
                          letterSpacing: "0.04em",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {item.title}
                      </h4>

                      <p
                        style={{
                          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                          fontSize: "0.84rem",
                          color: "rgba(255,255,255,0.48)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10" data-animation="slideleft">
                <Link href="/company/about">
                  <span
                    className="btn-primary"
                  >
                    About PFS <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: CTA block with image background */}
            <div data-animation="fadeIn"
              className="relative"
            >
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={AEROSPACE_IMG} alt="PFS aerospace spray booth with aircraft — Zenith Series industrial finishing system" className="w-full object-cover" style={{ height: "520px" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(13,13,20,0.55) 0%, rgba(13,13,20,0.88) 100%)" }} />
                <div className="absolute top-0 right-0" style={{ width: "3px", height: "80px", backgroundColor: "#1B2B4B" }} />
                <div className="absolute top-0 right-0" style={{ width: "80px", height: "3px", backgroundColor: "#1B2B4B" }} />
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  <div>
                    <div style={{ width: "2rem", height: "2px", backgroundColor: "#1B2B4B", marginBottom: "1rem" }} />
                    <h3 data-animation="slideleft"
                      style={{
                        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        lineHeight: 1.05,
                        letterSpacing: "-0.01em",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Built to Perform.
                      <br />
                      Backed by 20+ Years.
                    </h3>
                    <p data-animation="slideleft"
                      style={{
                        fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.7,
                        maxWidth: "340px",
                      }}
                    >
                      Every PFS system is engineered in-house, manufactured in the USA, and backed by factory-direct service from day one.
                    </p>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { num: "ETL Listed", label: "USA & Canada" },
                        { num: "UL 508A", label: "Certified Manufacturer" },
                        { num: "NFPA 33", label: "Built to Standard" },
                        { num: "Made in USA", label: "Santa Rosa, CA" },
                      ].map((s) => (
                        <div key={s.label} style={{ background: "rgba(13,13,20,0.75)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", padding: "0.85rem 1rem" }}>
                          <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>{s.num}</div>
                          <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/contact/request-a-quote " data-animation="slideLeft">
                        <span
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#1B2B4B", color: "#FFFFFF", border: "2px solid #1B2B4B", padding: "0.9rem 2rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none", minHeight: "50px" }}>
                          Get Pricing <ArrowRight size={14} />
                        </span>
                      </Link>
                      <Link href="/company/about" data-animation="slideRight">
                        <span
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", backgroundColor: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "0.9rem 1.6rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>
                          Our Story <ArrowRight size={13} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section ref={industriesRef} style={{ padding: "7rem 0", backgroundColor: "#111111", position: "relative" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 55%), linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, rgba(0,0,0,0.2) 100%)", pointerEvents: "none" }} />
        <div className="container relative">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: "1.5rem", height: "2px", backgroundColor: "#FFFFFF" }} />
              <span className="section-label" style={{ marginBottom: 0 }}>Industries Served</span>
            </div>
            <h2 data-animation="slideLeft"
              style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Built for Your Industry
            </h2>
            <p data-animation="slideLeft"
              style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "480px" }}>
              PFS finishing equipment is deployed across a wide range of demanding industries. Whatever your application, we have the expertise and equipment to match.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind, i) => (
              <Link key={ind.label} href={ind.href}>
                <div className={`dark-card reveal-pop reveal-delay-${Math.min(i % 4 + 1, 6)} flex items-center justify-between p-4`}>
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                    {ind.label}
                  </span>
                  <ChevronRight size={13} style={{ color: "#FFFFFF", flexShrink: 0, marginLeft: "0.5rem" }} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8" data-animation="slideLeft">
            <Link href="/industries">
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  border: "1.5px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.7)",
                  padding: "0.7rem 1.5rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  transition: "all 0.2s ease", cursor: "pointer",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#FFFFFF"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
              >
                All Industries <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Integration & Automation ── */}
      <section ref={integrationRef} style={{ backgroundColor: "#0A0A0A" }}>
        <div className="grid lg:grid-cols-2" style={{ minHeight: "480px" }}>
          <div className="flex flex-col justify-center" style={{ padding: "5rem 3rem 5rem", backgroundColor: "#0A0A0A", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: "1.5rem", height: "2px", backgroundColor: "#FFFFFF" }} />
              <span className="section-label" style={{ marginBottom: 0, color: "#FFFFFF" }}>Integration & Automation</span>
            </div>
            <h2 data-animation="slideLeft"
              style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: "white", lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
              Complete Automated<br />Finishing Lines
            </h2>
            <p data-animation="slideLeft"
              style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "480px" }}>
              Beyond individual booths and ovens, PFS engineers complete liquid paint lines, powder coating lines, conveyor systems, pretreatment systems, and robotic finishing cells — all under one roof.
            </p>
            <div data-animation="slideLeft">
              <Link href="/integration-automation">
                <span
                  className="btn-primary">Explore Integration & Automation <ArrowRight size={14} /> </span>
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden reveal-right" style={{ minHeight: "420px" }}>
            <img src="/manus-storage/pfs-robotics-card_2aac132b.jpg" alt="Automated Finishing Line" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,10,10,0.4) 0%, transparent 35%)" }} />
          </div>
        </div>
      </section>

      {/* ── Service strip ── */}
      <section ref={serviceRef} style={{ padding: "6rem 0", backgroundColor: "#0D0D14", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 45%, rgba(0,0,0,0.2) 100%)", pointerEvents: "none" }} />
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: "1.5rem", height: "2px", backgroundColor: "#FFFFFF" }} />
              <span className="section-label" style={{ marginBottom: 0 }}>Service & Support</span>
            </div>
            <h2 data-animation="slideLeft"
              style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color: "white", lineHeight: 1.0, letterSpacing: "-0.02em" }}>
              We're With You After the Sale
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4"
            data-animation="fadeIn">
            {[
              { title: "Preventive Maintenance", body: "Scheduled service programs to keep your equipment running at peak performance and extend its service life.", href: "/service/preventive-maintenance" },
              { title: "Emergency Service", body: "When downtime isn't an option, our field service team responds fast to get you back up and running.", href: "/service/emergency-service" },
              { title: "Retrofits & Upgrades", body: "Modernize existing equipment with new controls, lighting, filtration, and energy-efficiency upgrades.", href: "/service/retrofits-upgrades" },
            ].map((item, i) => (
              <Link key={item.title} href={item.href}>
                <div
                  className="dark-card"
                  style={{
                    padding: "2rem",
                    cursor: "pointer",
                    transition: "background-color 0.25s ease, border-color 0.25s ease",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2px",
                      backgroundColor: "#1B2B4B",
                      marginBottom: "1.25rem",
                    }}
                  />

                  <h3
                    style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "white",
                      letterSpacing: "0.04em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.84rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.75,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {item.body}
                  </p>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    Learn More <ChevronRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ backgroundColor: "#0A0A0A", position: "relative", overflow: "hidden", padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)", pointerEvents: "none" }} />
        <div className="absolute right-0 top-0 bottom-0" style={{ width: "40%", background: "radial-gradient(ellipse at right, rgba(255,255,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div style={{ width: "2rem", height: "2px", backgroundColor: "rgba(255,255,255,0.5)", marginBottom: "1rem" }} />
              <h2 data-animation="slideLeft"
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
              >
                Ready to Spec Your
                <br />
                Next Finishing System?
              </h2>
              <p data-animation="slideLeft"
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.92rem",
                  color: "rgba(255,255,255,0.72)",
                  marginTop: "0.75rem",
                }}
              >
                Talk to a PFS engineer about your project — no obligation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/contact/request-a-quote" data-animation="slideLeft">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    backgroundColor: "white",
                    color: "#0A0A0A",
                    border: "2px solid white",
                    padding: "0.8rem 1.75rem",
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#0A0A0A";
                  }}
                >
                  Request Info <ArrowRight size={14} />
                </span>
              </Link>
              <a data-animation="slideRight"
                href="tel:8885457715"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.45)",
                  padding: "0.8rem 1.75rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                }}
              >
                <Phone size={14} /> (888) 545-7715
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
