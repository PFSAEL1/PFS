/**
 * HazLocServicesPage.tsx
 * Hazardous Location & Critical Environment Services
 *
 * Design: Matches PFS site design language — Chakra Petch / Barlow Condensed headings,
 * Archivo Narrow body, #1B3A6B blue, dark industrial aesthetic.
 *
 * SEO targets (national):
 *   - hazardous location enclosure maintenance
 *   - C1D1 enclosure service
 *   - C1D2 booth maintenance
 *   - LEL sensor calibration service
 *   - RKI gas detector calibration
 *   - Honeywell gas detection service
 *   - explosion-proof enclosure maintenance
 *   - NFPA 33 compliance inspection
 *   - clean room maintenance service
 *   - battery storage enclosure maintenance
 *   - critical environment maintenance
 *   - industrial hazardous location service
 *   - C1D1 preventive maintenance
 *   - hazardous location fan motor service
 *   - explosion-proof controls service
 *   - oil and gas enclosure service
 */

import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, Phone, ChevronDown, ChevronUp,
  Shield, Zap, Wind, Settings, Search, Wrench, AlertTriangle, Activity
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1B3A6B";
const BLUE_LIGHT = "#2A5298";
const RED = "#C0392B";

// ─── SERVICE CATEGORIES ────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "lel-gas-detection",
    icon: <Activity size={22} />,
    label: "LEL Gas Detection & Sensor Calibration",
    tagline: "Calibrated. Documented. Compliant.",
    desc: `Lower Explosive Limit sensors drift over time — even when not actively triggered. An uncalibrated sensor is a sensor that cannot be trusted. Our technicians perform on-site calibration using traceable calibration gas for RKI Instruments and Honeywell fixed gas detection systems, verifying response time, alarm setpoints, and interlock communication. Every calibration is documented with a timestamped certificate suitable for fire marshal, insurance, and OSHA review.`,
    bullets: [
      "RKI Instruments gas detector calibration",
      "Honeywell fixed gas detection calibration",
      "Multi-point sensor verification",
      "Alarm setpoint and interlock confirmation",
      "Traceable calibration gas — NIST-referenced",
      "Timestamped compliance documentation package",
    ],
    standards: ["OSHA 1910.307", "NFPA 70 Article 500", "NFPA 72"],
  },
  {
    id: "c1d1-c1d2-enclosure-service",
    icon: <Shield size={22} />,
    label: "C1D1 / C1D2 Enclosure Inspection & Maintenance",
    tagline: "Manufacturer-Grade Service for Classified Locations.",
    desc: `Class I, Division 1 and Division 2 enclosures are built to strict NEC Article 500 and UL standards — and they must be maintained to those same standards to remain compliant. Our technicians inspect explosion-proof housings, conduit seals, bonding and grounding systems, door gaskets, pressure relief assemblies, and classified electrical components. We identify degradation before it becomes a compliance failure or a safety incident, and we document every finding in a written inspection report.`,
    bullets: [
      "Explosion-proof housing and conduit seal inspection",
      "Bonding, grounding, and equipotential verification",
      "Door gasket and pressure relief assembly check",
      "Classified electrical component condition assessment",
      "NEC Article 500 compliance review",
      "Written inspection report with photographic documentation",
    ],
    standards: ["NEC Article 500", "NFPA 70", "OSHA 1910.307", "UL 508A"],
  },
  {
    id: "fan-motor-controls",
    icon: <Wind size={22} />,
    label: "Fan, Motor, Belt & Controls Service",
    tagline: "Airflow Is Your First Line of Defense.",
    desc: `In any hazardous location enclosure, ventilation is not a comfort feature — it is a safety system. Loss of airflow or negative pressure in a classified space creates conditions for vapor accumulation and potential ignition. We service explosion-proof fans, motors, drive belts, and VFDs at the component level — not just visual checks. We measure CFM, verify negative pressure differentials, test purge response times, and confirm that ventilation interlocks shut down the space correctly when airflow is lost.`,
    bullets: [
      "Explosion-proof fan and motor inspection",
      "Drive belt condition and tension check",
      "CFM and negative pressure differential measurement",
      "Purge response time verification",
      "VFD and motor controls diagnostics",
      "Ventilation interlock and shutdown confirmation",
    ],
    standards: ["NFPA 33", "OSHA 1910.94", "NEC Article 500"],
  },
  {
    id: "controls-plc-automation",
    icon: <Zap size={22} />,
    label: "Explosion-Proof Controls & PLC Diagnostics",
    tagline: "Component-Level Diagnostics. Not Box Swapping.",
    desc: `Control panel faults, PLC errors, and sensor-to-interlock communication failures are among the most common causes of unplanned downtime in classified environments. Our technicians diagnose at the component level — tracing faults through UL508A-certified control panels, verifying interlock logic, testing emergency shutdown sequences, and confirming that all safety functions operate as designed. We also perform scheduled controls inspections as part of preventive maintenance contracts to catch degradation before it causes a shutdown.`,
    bullets: [
      "UL508A control panel inspection and diagnostics",
      "PLC fault tracing and logic verification",
      "Sensor-to-interlock communication testing",
      "Emergency shutdown sequence confirmation",
      "Scheduled controls PM for maintenance contracts",
      "Component-level repair — not wholesale replacement",
    ],
    standards: ["UL 508A", "NFPA 70", "OSHA 1910.307"],
  },
  {
    id: "clean-room-critical-environment",
    icon: <Settings size={22} />,
    label: "Clean Room & Critical Environment Upkeep",
    tagline: "Controlled Environments Require Controlled Maintenance.",
    desc: `Modular clean rooms, GMP-compliant enclosures, and controlled-environment laboratories depend on consistent positive pressure, HEPA filtration integrity, and environmental monitoring systems that function correctly at all times. We perform scheduled upkeep including filter media inspection and replacement, pressure differential verification, HVAC and makeup air unit service, and environmental sensor calibration. Maintenance records are provided in a format suitable for GMP audits, ISO facility reviews, and regulatory inspections.`,
    bullets: [
      "HEPA and pre-filter media inspection and replacement",
      "Positive pressure differential verification",
      "Makeup air unit and HVAC service",
      "Environmental sensor calibration",
      "GMP and ISO audit-ready maintenance records",
      "Modular panel and door seal integrity check",
    ],
    standards: ["ISO 14644", "GMP 21 CFR Part 211", "ASHRAE 170"],
  },
  {
    id: "battery-storage-enclosure",
    icon: <AlertTriangle size={22} />,
    label: "Battery Storage & BESS Enclosure Maintenance",
    tagline: "Thermal Runaway Prevention Starts with Preventive Maintenance.",
    desc: `Battery energy storage enclosures — whether utility-scale BESS, data center UPS rooms, or commercial battery cabinets — require ongoing maintenance of their ventilation, gas detection, fire suppression, and environmental monitoring systems. We service the safety infrastructure inside these enclosures: verifying thermal runaway detection systems, calibrating gas sensors, inspecting fire-rated assemblies, and confirming that ventilation and suppression interlocks are operational. NFPA 855 compliance documentation provided.`,
    bullets: [
      "Thermal runaway detection system verification",
      "Gas sensor calibration (H2, CO, VOC)",
      "Fire-rated assembly and suppression system inspection",
      "Ventilation and interlock confirmation",
      "NFPA 855 compliance documentation",
      "Environmental monitoring sensor calibration",
    ],
    standards: ["NFPA 855", "IFC Chapter 12", "UL 9540"],
  },
  {
    id: "oil-gas-industrial-enclosure",
    icon: <Wrench size={22} />,
    label: "Oil, Gas & Industrial Hazardous Location Service",
    tagline: "Classified Locations in Demanding Environments.",
    desc: `Enclosures deployed in oil and gas processing, chemical handling, pharmaceutical manufacturing, and industrial flammable-storage applications operate in some of the most demanding classified environments in industry. We provide scheduled and on-demand service for explosion-proof enclosures in these applications — covering ventilation systems, gas detection, classified electrical components, and compliance documentation. Our technicians are familiar with the overlapping regulatory requirements that govern these facilities, including NFPA 30, NFPA 70 Article 500, and OSHA 1910.307.`,
    bullets: [
      "Explosion-proof enclosure inspection and service",
      "Ventilation system airflow and interlock testing",
      "Gas detection calibration and documentation",
      "Classified electrical component condition assessment",
      "NFPA 30 / OSHA 1910.307 compliance review",
      "Scheduled PM contracts for multi-site operators",
    ],
    standards: ["NFPA 30", "NFPA 70 Article 500", "OSHA 1910.307", "API RP 505"],
  },
  {
    id: "compliance-documentation",
    icon: <Search size={22} />,
    label: "Compliance Audits & Documentation Packages",
    tagline: "Pass Inspections. Protect Your License.",
    desc: `Fire marshals, insurance auditors, and OSHA compliance officers require documented evidence of equipment maintenance — not verbal assurances. After every service visit, we provide a complete compliance documentation package: airflow measurements, calibration certificates with traceable calibration gas references, equipment condition photographs, maintenance records, and a written summary of findings and corrective actions. This documentation is formatted to meet the requirements of OSHA, NFPA, and state fire authority inspections.`,
    bullets: [
      "Airflow measurement data with CFM readings",
      "Gas sensor calibration certificates (traceable)",
      "Equipment condition photographs with timestamps",
      "Written findings and corrective action summary",
      "OSHA 1910.307 and NFPA compliance review",
      "Insurance-accepted maintenance records",
    ],
    standards: ["OSHA 1910.307", "NFPA 33", "NFPA 70", "NFPA 855"],
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "What types of hazardous location enclosures do you service?",
    a: "We service C1D1 and C1D2 classified enclosures across a wide range of applications — including chemical processing, pharmaceutical manufacturing, industrial flammable-storage, oil and gas processing, battery energy storage, and clean room environments. Our technicians service explosion-proof fans, motors, controls, gas detection systems, and ventilation interlocks regardless of the original manufacturer.",
  },
  {
    q: "Do you service gas detection equipment from any manufacturer?",
    a: "We specialize in RKI Instruments and Honeywell fixed gas detection systems, which are among the most widely deployed in industrial hazardous location applications. Calibration is performed using traceable calibration gas referenced to NIST standards, and every calibration is documented with a timestamped certificate.",
  },
  {
    q: "How often should LEL sensors be calibrated?",
    a: "Most regulatory authorities and equipment manufacturers recommend calibration at least annually, with bump testing more frequently depending on the application. OSHA 1910.307 and NFPA 70 Article 500 require that gas detection equipment in classified locations be maintained in proper working condition. In practice, many facilities calibrate quarterly to maintain insurance compliance and to catch sensor drift before it becomes a safety issue.",
  },
  {
    q: "Do you provide compliance documentation after each service visit?",
    a: "Yes. Every service visit produces a complete documentation package: airflow measurements, calibration certificates with traceable calibration gas references, equipment condition photographs, maintenance records, and a written summary of findings and corrective actions. This documentation is formatted to meet OSHA, NFPA, and state fire authority inspection requirements.",
  },
  {
    q: "Do you offer preventive maintenance contracts for hazardous location equipment?",
    a: "Yes. We offer annual and multi-year preventive maintenance contracts covering scheduled gas sensor calibration, ventilation system testing, controls inspection, and compliance documentation. Contracts are available for single facilities and multi-site operators. Priority emergency response is included for contract customers.",
  },
  {
    q: "What geographic area do you cover?",
    a: "We provide hazardous location and critical environment services nationwide. Service fees are quoted per visit; travel and lodging are billed at cost for locations outside our primary service area in Northern California. Contact us to discuss scheduling and coverage for your facility.",
  },
  {
    q: "Can you service equipment you did not manufacture?",
    a: "Yes. We service the underlying safety systems — explosion-proof fans, motors, gas sensors, PLCs, and ventilation interlocks — regardless of who manufactured the enclosure. Our technicians work at the component level and are familiar with the NEC Article 500, NFPA, and OSHA standards that govern all classified location equipment.",
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────
export default function HazLocServicesPage() {
  const [openService, setOpenService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Hazardous Location & Critical Environment Services | C1D1 C1D2 Enclosure Maintenance | PFS",
    description: "Professional service and preventive maintenance for C1D1/C1D2 hazardous location enclosures, LEL gas detection calibration (RKI, Honeywell), explosion-proof fan and motor service, clean room upkeep, battery storage enclosure maintenance, and NFPA compliance documentation. Nationwide coverage.",
    canonical: "/service/hazardous-location",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Hazardous Location & Critical Environment Services",
          "provider": {
            "@type": "Organization",
            "name": "Platinum Finishing Systems",
            "url": "https://pfsspraybooths.com",
            "telephone": "+18885457715",
          },
          "serviceType": "Hazardous Location Enclosure Maintenance",
          "areaServed": { "@type": "Country", "name": "United States" },
          "description": "C1D1/C1D2 enclosure inspection, LEL gas sensor calibration, explosion-proof fan and motor service, clean room maintenance, battery storage enclosure upkeep, and NFPA compliance documentation.",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Hazardous Location Service Categories",
            "itemListElement": SERVICES.map((s, i) => ({
              "@type": "Offer",
              "position": i + 1,
              "itemOffered": {
                "@type": "Service",
                "name": s.label,
                "description": s.desc.substring(0, 200),
              },
            })),
          },
        },
        {
          "@type": "FAQPage",
          "mainEntity": FAQ.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ],
    },
  });

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "640px", display: "flex", alignItems: "center",
        borderBottom: "3px solid #111",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/manus-storage/pfs-hazloc-enclosure-hero_ab43557c.jpg')",
          backgroundSize: "contain", backgroundPosition: "center center", backgroundRepeat: "no-repeat",
          backgroundColor: "#0a0a0a", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem 4rem", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.7rem", fontWeight: 700,
            color: "rgba(255,255,255,0.45)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: BLUE_LIGHT }} />
            PFS — CRITICAL ENVIRONMENT SERVICES
          </div>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.0, textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 1rem",
          }}>
            Hazardous Location &<br />Critical Environment<br />Services
          </h1>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)",
            color: "rgba(255,255,255,0.78)", lineHeight: 1.65,
            maxWidth: "620px", margin: "0 0 0.75rem",
          }}>
            Preventive maintenance, LEL gas sensor calibration, explosion-proof equipment service, and NFPA compliance documentation for C1D1/C1D2 enclosures, clean rooms, battery storage systems, and industrial critical environments. Nationwide coverage.
          </p>
          {/* Standards badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
            {["OSHA 1910.307", "NFPA 70 Art. 500", "NEC Art. 500", "NFPA 855", "UL 508A"].map((s) => (
              <span key={s} style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.62rem", fontWeight: 700,
                color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "0.2rem 0.6rem", borderRadius: "2px",
                textTransform: "uppercase",
              }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/contact" data-animation="slideLeft">
              <button style={{
                background: BLUE, color: "#fff", border: "none",
                padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                REQUEST SERVICE <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:+18885457715" data-animation="slideRight">
              <button style={{
                background: RED, color: "#fff", border: "none",
                padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <Phone size={14} /> (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRO BAND ───────────────────────────────────────────────────── */}
      <section data-animation="fadeIn" style={{
        background: "#111", borderBottom: "3px solid #1B3A6B",
        padding: "2rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {[
            { label: "Nationwide Coverage", sub: "Service available across all 50 states" },
            { label: "24/7 Emergency Response", sub: "Critical failures don't wait for business hours" },
            { label: "Compliance Documentation", sub: "OSHA, NFPA, and insurance-accepted records" },
            { label: "Component-Level Diagnostics", sub: "We find the root cause — not just the symptom" },
          ].map((item) => (
            <div key={item.label} style={{ borderLeft: `3px solid ${BLUE_LIGHT}`, paddingLeft: "1rem" }}>
              <div style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.95rem", fontWeight: 900,
                color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em",
                marginBottom: "0.25rem",
              }}>{item.label}</div>
              <div style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5,
              }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICE CATEGORIES (COLLAPSIBLE) ─────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "3.5rem 2rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.7rem", fontWeight: 700,
            color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}>SERVICE CATEGORIES</div>
          <h2 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900,
            color: "#111", textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 0.5rem", lineHeight: 1.1,
          }}>What We Service</h2>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "0.9rem", color: "#666", lineHeight: 1.6, maxWidth: "640px",
          }}>
            Click any category to expand the full scope of work, applicable standards, and what is included in each service.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}  data-animation="fadeIn">
          {SERVICES.map((svc) => {
            const isOpen = openService === svc.id;
            return (
              <div key={svc.id} style={{
                background: "#fff",
                border: `2px solid ${isOpen ? BLUE : "#e2e8f0"}`,
                borderRadius: "2px",
                overflow: "hidden",
                transition: "border-color 0.15s",
                boxShadow: isOpen ? `0 4px 20px rgba(27,58,107,0.1)` : "0 1px 4px rgba(0,0,0,0.05)",
              }}>
                {/* Header row */}
                <button
                  onClick={() => setOpenService(isOpen ? null : svc.id)}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "1.1rem 1.5rem",
                    display: "flex", alignItems: "center", gap: "1rem",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{ color: BLUE, flexShrink: 0 }}>{svc.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                      fontSize: "1rem", fontWeight: 900,
                      color: "#111", textTransform: "uppercase", letterSpacing: "0.02em",
                    }}>{svc.label}</div>
                    <div style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                      fontSize: "0.72rem", fontWeight: 700,
                      color: BLUE_LIGHT, letterSpacing: "0.08em",
                      textTransform: "uppercase", marginTop: "0.15rem",
                    }}>{svc.tagline}</div>
                  </div>
                  <span style={{ color: BLUE, flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{
                    padding: "0 1.5rem 1.5rem",
                    borderTop: `1px solid #e2e8f0`,
                  }}>
                    <p style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.88rem", color: "#444", lineHeight: 1.7,
                      margin: "1rem 0 1.25rem",
                    }}>{svc.desc}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "start" }}>
                      {/* Bullets */}
                      <div>
                        <div style={{
                          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                          fontSize: "0.65rem", fontWeight: 700,
                          color: BLUE, letterSpacing: "0.15em",
                          textTransform: "uppercase", marginBottom: "0.6rem",
                        }}>SCOPE OF WORK</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                          {svc.bullets.map((b) => (
                            <li key={b} style={{
                              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                              fontSize: "0.82rem", color: "#333",
                              display: "flex", alignItems: "flex-start", gap: "0.5rem",
                            }}>
                              <span style={{
                                width: "5px", height: "5px",
                                background: BLUE, borderRadius: "50%",
                                flexShrink: 0, marginTop: "0.45rem",
                              }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standards */}
                      <div style={{ minWidth: "160px" }}>
                        <div style={{
                          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                          fontSize: "0.65rem", fontWeight: 700,
                          color: BLUE, letterSpacing: "0.15em",
                          textTransform: "uppercase", marginBottom: "0.6rem",
                        }}>STANDARDS</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                          {svc.standards.map((s) => (
                            <span key={s} style={{
                              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                              fontSize: "0.68rem", fontWeight: 700,
                              color: "#fff", background: BLUE,
                              padding: "0.2rem 0.55rem", borderRadius: "2px",
                              letterSpacing: "0.06em", textTransform: "uppercase",
                              display: "inline-block",
                            }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "1.25rem" }}>
                      <Link href="/contact">
                        <button style={{
                          background: BLUE, color: "#fff", border: "none",
                          padding: "0.7rem 1.5rem",
                          fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                          fontSize: "0.78rem", fontWeight: 800,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          cursor: "pointer", borderRadius: "2px",
                          display: "flex", alignItems: "center", gap: "0.4rem",
                        }}>
                          REQUEST THIS SERVICE <ArrowRight size={12} />
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PM PACKAGES BAND ─────────────────────────────────────────────── */}
      <section style={{
        background: BLUE, padding: "3.5rem 2rem",
        borderTop: "3px solid #111", borderBottom: "3px solid #111",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
            <div style={{ gridColumn: "1 / -1", marginBottom: "0.5rem" }}>
              <div style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.7rem", fontWeight: 700,
                color: "rgba(255,255,255,0.45)", letterSpacing: "0.2em",
                textTransform: "uppercase", marginBottom: "0.4rem",
              }}>PREVENTIVE MAINTENANCE CONTRACTS</div>
              <h2 data-animation="slideLeft" style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900,
                color: "#fff", textTransform: "uppercase",
                letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1,
              }}>Schedule Downtime.<br />Or Your Equipment Will.</h2>
            </div>
            {[
              {
                tier: "Annual",
                desc: "One scheduled visit per year covering full system inspection, gas sensor calibration, ventilation testing, and compliance documentation package.",
                includes: ["Full system inspection", "Gas sensor calibration", "Ventilation airflow test", "Compliance documentation"],
              },
              {
                tier: "Semi-Annual",
                desc: "Two visits per year. Recommended for facilities with quarterly calibration requirements or active regulatory oversight.",
                includes: ["Two visits per year", "Calibration certificates each visit", "Priority scheduling", "Discounted emergency response"],
              },
              {
                tier: "Quarterly",
                desc: "Four visits per year. Designed for high-throughput facilities, multi-enclosure sites, and operations with strict insurance or AHJ requirements.",
                includes: ["Four visits per year", "Sensor bump test each visit", "Full calibration semi-annually", "Priority emergency dispatch"],
              },
            ].map((pkg) => (
              <div key={pkg.tier} style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "2px", padding: "1.5rem",
              }}>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "1.1rem", fontWeight: 900,
                  color: "#fff", textTransform: "uppercase",
                  letterSpacing: "0.04em", marginBottom: "0.6rem",
                }}>{pkg.tier} PM</div>
                <p style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.82rem", color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6, marginBottom: "1rem",
                }}>{pkg.desc}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {pkg.includes.map((item) => (
                    <li key={item} style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.78rem", color: "rgba(255,255,255,0.8)",
                      display: "flex", alignItems: "center", gap: "0.4rem",
                    }}>
                      <span style={{ width: "5px", height: "5px", background: "#fff", borderRadius: "50%", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1", marginTop: "0.5rem" }} data-animation="slideRight">
              <Link href="/contact">
                <button style={{
                  background: "#fff", color: BLUE, border: "none",
                  padding: "0.9rem 2rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.85rem", fontWeight: 800,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  cursor: "pointer", borderRadius: "2px",
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                }}>
                  GET A PM CONTRACT QUOTE <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "3.5rem 2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.7rem", fontWeight: 700,
            color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}>FREQUENTLY ASKED QUESTIONS</div>
          <h2 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 900,
            color: "#111", textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1,
          }}>Common Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {FAQ.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} style={{
                background: "#fff",
                border: `2px solid ${isOpen ? BLUE : "#e2e8f0"}`,
                borderRadius: "2px",
                overflow: "hidden",
                transition: "border-color 0.15s",
              }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: "100%", background: "none", border: "none",
                    padding: "1rem 1.25rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer", textAlign: "left", gap: "1rem",
                  }}
                >
                  <span style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.92rem", fontWeight: 800,
                    color: "#111", textTransform: "uppercase", letterSpacing: "0.02em",
                  }}>{item.q}</span>
                  <span style={{ color: BLUE, flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: "0 1.25rem 1.1rem",
                    borderTop: "1px solid #e2e8f0",
                  }}>
                    <p style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.88rem", color: "#555", lineHeight: 1.7,
                      margin: "0.75rem 0 0",
                    }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section style={{
        background: "#111", padding: "3.5rem 2rem",
        borderTop: "3px solid #1B3A6B",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.7rem", fontWeight: 700,
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "0.75rem",
          }}>NATIONWIDE COVERAGE — 24/7 EMERGENCY RESPONSE</div>
          <h2 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            color: "#fff", textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 1rem", lineHeight: 1.1,
          }}>Ready to Schedule Service?</h2>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "0.95rem", color: "rgba(255,255,255,0.6)",
            lineHeight: 1.65, marginBottom: "2rem", maxWidth: "560px", margin: "0 auto 2rem",
          }}>
            Contact us to schedule a service visit, request a preventive maintenance contract quote, or discuss emergency response coverage for your facility.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" data-animation="slideLeft">
              <button style={{
                background: BLUE, color: "#fff", border: "none",
                padding: "1rem 2.2rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.88rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                REQUEST SERVICE <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:+18885457715" data-animation="slideRight">
              <button style={{
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.3)",
                padding: "1rem 2.2rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.88rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", borderRadius: "2px",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <Phone size={14} /> (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
