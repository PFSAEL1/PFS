/*
 * PFS Service Hub — /service
 * 7 service category cards
 * Cards: Preventive Maintenance, Paint Booth Cleaning, Emergency Service, Service Plans,
 *        Retrofits & Upgrades, Booth Inspections, Installation Services
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, Clock, Shield, Wrench, Search, Settings, HardHat, Sparkles } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1B3A6B";
const BLUE_LIGHT = "#2A5298";
const RED = "#1B2B4B";

const SERVICES = [
  {
    id: "preventive-maintenance",
    label: "Preventive Maintenance",
    tagline: "Keep Your Equipment Running at Peak Performance",
    img: "/manus-storage/pfs-service-fleet-vehicles_c01b05cd.jpeg",
    icon: <Settings size={20} />,
    desc: "Scheduled filter changes, fan belt inspections, airflow verification, lighting checks, and full booth tune-ups. Customized PM programs for single shops, collision chains, and industrial finishing facilities.",
    bullets: ["Filter & media replacement", "Fan motor & belt inspection", "Airflow & pressure testing", "Multi-location fleet scheduling"],
    href: "/service/preventive-maintenance",
    accent: BLUE,
  },
  {
    id: "booth-cleaning",
    label: "Paint Booth Cleaning",
    tagline: "We Built It. We Know How to Clean It.",
    img: "/manus-storage/pfs-booth-clean-card-pfs-shirt_54d8ec14.png",
    icon: <Sparkles size={20} />,
    desc: "Professional OEM cleaning of booth walls, ceiling, ductwork, exhaust passages, makeup air units, and floor grating. Includes post-clean system check and written report. Filter Rotation Program available.",
    bullets: ["Duct & exhaust passage cleaning", "Makeup air unit cleaning", "OEM filter replacement", "Filter Rotation Program"],
    href: "/service/booth-cleaning",
    accent: BLUE,
    badge: "OEM",
  },
  {
    id: "emergency-service",
    label: "Emergency Service",
    tagline: "24/7 Response — Equipment Down? We're On It.",
    img: "/manus-storage/pfs-emergency-service-tech-white-bg_b022a364.png",
    icon: <Clock size={20} />,
    desc: "When your booth goes down, every hour costs you. Our emergency service team responds fast — diagnosing and resolving critical failures to get collision shops, fleet operators, and industrial production lines back up.",
    bullets: ["24/7 emergency dispatch", "Same-day or next-day response", "OEM parts on hand", "Industrial & aerospace support"],
    href: "/service/emergency-service",
    accent: RED,
    badge: "24/7",
  },
  {
    id: "service-plans",
    label: "Service Plans",
    tagline: "Predictable Costs. Zero Surprises.",
    img: "/manus-storage/pfs-service-plans-handshake-v3_d4c69a32.png",
    icon: <Shield size={20} />,
    desc: "Annual and multi-year service agreements for collision chains, fleet operators, and industrial customers. Covers scheduled maintenance, priority emergency response, discounted OEM parts, and multi-location coordination.",
    bullets: ["Annual & multi-year plans", "Priority emergency response", "Discounted OEM parts & filters", "Multi-location fleet plans"],
    href: "/service/service-plans",
    accent: BLUE,
  },
  {
    id: "retrofits-upgrades",
    label: "Retrofits & Upgrades",
    tagline: "Modernize Your Existing Equipment",
    img: "/manus-storage/pfs-booth-install-jcb_9fc85464.jpg",
    icon: <Wrench size={20} />,
    desc: "LED lighting upgrades, digital control panel replacements, exhaust system improvements, and full booth modernization. Also covers controls and automation upgrades for industrial finishing lines and robotic systems.",
    bullets: ["LED lighting conversions", "Control panel & PLC upgrades", "Exhaust & airflow improvements", "Automation system upgrades"],
    href: "/service/retrofits-upgrades",
    accent: BLUE,
  },
  {
    id: "booth-inspections",
    label: "Booth Inspections",
    tagline: "Stay Compliant. Stay Safe.",
    img: "/manus-storage/pfs-pm-metro-train-booth_87bd97cb.jpeg",
    icon: <Search size={20} />,
    desc: "Certified booth inspections covering NFPA 33 compliance, airflow verification, fire suppression system checks, and full written inspection reports — accepted by insurance carriers, fire marshals, and regulatory agencies.",
    bullets: ["NFPA 33 compliance review", "Airflow & pressure testing", "Fire suppression inspection", "Insurance-accepted written report"],
    href: "/service/booth-inspections",
    accent: BLUE,
  },
  {
    id: "installation-services",
    label: "Installation Services",
    tagline: "Expert Installation — PFS Equipment or Yours",
    img: "/manus-storage/pfs-install-booth-interior-scissorlift_a3524ce8.jpg",
    icon: <HardHat size={20} />,
    desc: "Certified installation crews for complete booth builds, equipment relocations, and third-party OEM installations. We also install robotic finishing cells, conveyor systems, and full aerospace finishing lines.",
    bullets: ["New booth & oven installation", "Equipment relocation", "Robotic & conveyor system installs", "Aerospace finishing line builds"],
    href: "/service/installation-services",
    accent: BLUE,
    badge: "ANY OEM",
  },
  {
    id: "hazardous-location",
    label: "Hazardous Location Services",
    tagline: "C1D1/C1D2 · LEL Calibration · Critical Environments",
    img: "/manus-storage/pfs-hazloc-technician_799d41c0.jpg",
    icon: <Shield size={20} />,
    desc: "Maintenance, calibration, and compliance services for C1D1/C1D2 enclosures, clean rooms, battery storage environments, and LEL gas detection systems. Serving industrial, oil & gas, energy, and critical infrastructure facilities nationally.",
    bullets: ["C1D1/C1D2 enclosure maintenance", "LEL sensor calibration (RKI, Honeywell)", "Fan, motor & belt service", "National dispatch available"],
    href: "/service/hazardous-location",
    accent: BLUE,
    badge: "NATIONAL",
  },
];

function ServiceCard({ id, label, tagline, img, icon, desc, bullets, href, accent, badge }: typeof SERVICES[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `2px solid ${hovered ? accent : "#e2e8f0"}`,
        borderRadius: "2px",
        overflow: "hidden",
        transition: "border-color 0.15s, box-shadow 0.15s",
        boxShadow: hovered
          ? `0 0 0 3px rgba(27,58,107,0.08), 0 8px 28px rgba(27,58,107,0.12)`
          : "0 1px 4px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {badge && (
        <div style={{
          position: "absolute", top: "0.75rem", left: "0.75rem", zIndex: 2,
          background: accent,
          color: "#fff",
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "0.65rem", fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "0.2rem 0.55rem", borderRadius: "2px",
        }}>
          {badge}
        </div>
      )}

      <div style={{ width: "100%", aspectRatio: "3/2", overflow: "hidden", background: "#111" }}>
        <img
          src={img}
          alt={label}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.35s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      <div style={{ padding: "1.25rem 1.25rem 1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <span style={{ color: accent }}>{icon}</span>
          <span style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "1.05rem", fontWeight: 900,
            color: "#111", textTransform: "uppercase", letterSpacing: "0.03em",
          }}>
            {label}
          </span>
        </div>

        <div style={{
          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
          fontSize: "0.78rem", fontWeight: 700,
          color: accent, letterSpacing: "0.06em",
          textTransform: "uppercase", marginBottom: "0.6rem",
        }}>
          {tagline}
        </div>

        <p style={{
          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
          fontSize: "0.8rem", color: "#555", lineHeight: 1.6,
          marginBottom: "0.75rem", flex: 1,
        }}>
          {desc}
        </p>

        <ul style={{ margin: "0 0 1rem", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {bullets.map((b) => (
            <li key={b} style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "0.75rem", color: "#444",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <span style={{ width: "5px", height: "5px", background: accent, borderRadius: "50%", flexShrink: 0 }} />
              {b}
            </li>
          ))}
        </ul>

        <div
          style={{
            width: "100%",
            background: accent, color: "#fff",
            padding: "0.7rem 1rem",
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.8rem", fontWeight: 800,
            letterSpacing: "0.08em", textTransform: "uppercase",
            borderRadius: "2px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
            transition: "box-shadow 0.2s ease, transform 0.15s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 22px ${accent}88`;
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
        >
            LEARN MORE <ArrowRight size={13} />
          </div>
      </div>
    </div>
    </Link>
  );
}

export default function ServiceHub() {
  useSEO({
    title: "Spray Booth Service, Maintenance & Installation | PFS — Northern California",
    description: "PFS finishing system engineering and support services — preventive maintenance, emergency repairs, paint booth cleaning, booth inspections, retrofits & upgrades, installation & startup, project management, and OEM parts. Certified technicians based in Santa Rosa, CA. Bay Area, North Bay, Sacramento, Solano County. NFPA 33, OSHA, CARB, AQMD compliant. Nationwide. (888) 545-7715.",
    canonical: "/service",
  });

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "480px",
        display: "flex",
        alignItems: "center",
        borderBottom: "3px solid #111",
      }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/manus-storage/pfs-service-hero-img_a34501e0.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }} />
        {/* Dark overlay for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.2) 100%)",
          zIndex: 1,
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 3.5rem", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: BLUE_LIGHT }} />
            PFS — INDUSTRIAL FINISHING EQUIPMENT
          </div>
          <h1 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.0, textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 1rem",
          }}>
            Service &<br />Support
          </h1>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
            color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
            maxWidth: "600px", margin: "0 0 1.75rem",
          }}>
            From scheduled maintenance and booth cleaning to 24/7 emergency response — PFS backs every system we build. We service collision repair shops, fleet operators, auto dealership groups, aerospace facilities, and industrial finishing lines across North America.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/contact">
              <button style={{
                background: BLUE, color: "#fff",
                border: "none", padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                REQUEST SERVICE <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:+18885457715">
              <button style={{
                background: RED, color: "#fff",
                border: "none", padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <Phone size={14} /> 24/7: (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}>
            SELECT A SERVICE CATEGORY
          </div>
          <h2 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900,
            color: "#111", textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1,
          }}>
            How Can We Help?
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} {...svc} />
          ))}
        </div>
      </section>

      {/* CALIFORNIA SERVICE AREA LINKS */}
      <section style={{
        background: "#F4F4F2",
        padding: "3rem 2rem",
        borderTop: "2px solid #E0E0E0",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            color: BLUE, letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.5rem",
          }}>
            CALIFORNIA SERVICE COVERAGE
          </div>
          <h2 style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 900,
            color: "#111", textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 0.75rem", lineHeight: 1.1,
          }}>
            Serving All of California — 20+ Years
          </h2>
          <p style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "0.95rem", color: "#444", lineHeight: 1.7,
            maxWidth: "700px", marginBottom: "1.5rem",
          }}>
            PFS has been the trusted spray booth service provider across California for over 20 years. Our technicians are NFPA 33, CARB, AQMD, and NESHAP certified — serving automotive, aerospace, industrial, and fleet finishing operations from San Diego to Sacramento.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="/spray-booth-service-california" style={{
              background: BLUE, color: "#fff",
              padding: "0.75rem 1.6rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.82rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "2px",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              textDecoration: "none",
              transition: "box-shadow 0.2s ease, background 0.18s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#2A5298";
              e.currentTarget.style.boxShadow = "0 0 28px rgba(27,58,107,0.85), 0 4px 16px rgba(27,58,107,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = BLUE;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              California Service Page
            </a>
            <a href="/spray-booth-service-los-angeles" style={{
              background: "transparent", color: BLUE,
              border: `2px solid ${BLUE}`, padding: "0.75rem 1.6rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.82rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "2px",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              textDecoration: "none",
              transition: "box-shadow 0.2s ease, background 0.18s ease, color 0.18s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = BLUE;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0 0 28px rgba(27,58,107,0.85), 0 4px 16px rgba(27,58,107,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = BLUE;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              Los Angeles County Service
            </a>
            <a href="/spray-booth-service-bay-area" style={{
              background: "transparent", color: BLUE,
              border: `2px solid ${BLUE}`, padding: "0.75rem 1.6rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.82rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              borderRadius: "2px",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              textDecoration: "none",
              transition: "box-shadow 0.2s ease, background 0.18s ease, color 0.18s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = BLUE;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0 0 28px rgba(27,58,107,0.85), 0 4px 16px rgba(27,58,107,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = BLUE;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              Bay Area Service
            </a>
          </div>
        </div>
      </section>
      {/* EMERGENCY CTA */}
      <section style={{
        background: RED,
        padding: "2.5rem 2rem",
        borderTop: "3px solid #111",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "2rem",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em",
              textTransform: "uppercase", marginBottom: "0.3rem",
            }}>
              24/7 EMERGENCY SERVICE
            </div>
            <div style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900,
              color: "#fff", textTransform: "uppercase",
              letterSpacing: "-0.01em", lineHeight: 1.1,
            }}>
              Equipment Down?<br />Call Now.
            </div>
          </div>
          <a href="tel:+18885457715" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#fff", color: RED,
              border: "none", padding: "1rem 2.2rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "1rem", fontWeight: 900,
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", borderRadius: "2px",
              display: "flex", alignItems: "center", gap: "0.5rem",
              whiteSpace: "nowrap",
            }}>
              <Phone size={16} /> (888) 545-7715
            </button>
          </a>
        </div>
      </section>

    </div>
  );
}
