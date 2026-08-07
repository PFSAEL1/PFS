/*
 * PFS Filters Landing Page — /filters
 * SEO targets: spray booth filters, paint booth replacement filters,
 *   booth exhaust filters California, NFPA 33 compliant filters,
 *   intake filters, exhaust filters, polyester filters, fiberglass filters
 */
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { Phone, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";

const BLUE = "#1B3A6B";
const BLUE_LIGHT = "#2A5298";

const FILTER_TYPES = [
  {
    name: "Exhaust Filters",
    subtitle: "Fiberglass & Polyester Media",
    desc: "Capture overspray before it reaches your exhaust fans and ductwork. PFS exhaust filters are available in fiberglass and polyester media, cut to fit all PFS booth models and most OEM brands. Proper exhaust filtration is required by NFPA 33 and local fire codes — and protects your fans, ductwork, and downstream equipment from paint buildup.",
    specs: ["Fiberglass media — standard duty", "Polyester media — extended service life", "Cut-to-fit for all PFS models", "NFPA 33 compliant media", "Available in bulk rolls or pre-cut panels"],
    icon: "💨",
  },
  {
    name: "Intake Filters",
    subtitle: "Tacky & Blanket Media",
    desc: "Keep incoming air clean and prevent airborne contaminants from entering your booth. PFS intake filters use tacky media to capture dust, debris, and particulates before they reach your work area. Blanket intake upgrades are available for heated booths requiring higher-efficiency filtration. Clean intake air is the foundation of a quality finish.",
    specs: ["Tacky media — standard intake", "Blanket intake upgrades (heated booths)", "Reduces contamination in finish", "Compatible with all PFS booth models", "Custom sizing available"],
    icon: "🌬️",
  },
  {
    name: "Ceiling Filters",
    subtitle: "Downdraft Booth Media",
    desc: "Downdraft spray booths require ceiling filter media to deliver clean, uniform airflow from the plenum into the work area. PFS ceiling filters are engineered for consistent face velocity and even air distribution — critical for achieving a defect-free finish on automotive, aerospace, and industrial work.",
    specs: ["Designed for downdraft booths", "Uniform face velocity distribution", "Reduces turbulence and contamination", "Available for all PFS downdraft models", "Replacement rolls and pre-cut panels"],
    icon: "⬇️",
  },
  {
    name: "Paint Arrest Filters",
    subtitle: "Multi-Stage Overspray Capture",
    desc: "Multi-stage paint arrest systems capture heavy overspray loads in high-volume production environments. Used in automated paint lines, powder coating booths, and high-throughput industrial finishing operations, paint arrest filters extend the service life of downstream exhaust media and protect your ventilation system from buildup.",
    specs: ["Multi-stage capture system", "High-volume production environments", "Powder coating booth compatible", "Extends downstream filter life", "Reduces maintenance frequency"],
    icon: "🔴",
  },
  {
    name: "Carbon & Activated Media",
    subtitle: "VOC Capture & Odor Control",
    desc: "Activated carbon filters capture volatile organic compounds (VOCs) and solvent vapors from spray finishing operations. Required in some jurisdictions under CARB and AQMD air quality permits, carbon media helps facilities meet air quality compliance requirements while reducing odor impact on surrounding areas.",
    specs: ["VOC and solvent vapor capture", "CARB / AQMD compliance support", "Activated carbon media", "Available for exhaust systems", "Consultation available for permit requirements"],
    icon: "⚗️",
  },
  {
    name: "OEM Replacement Kits",
    subtitle: "All PFS Models — Current & Legacy",
    desc: "PFS stocks complete filter replacement kits for all current and legacy booth models — so you always get the right media in the right size. Using OEM filters ensures proper fit, correct face velocity, and warranty compliance. Our parts team can identify the correct filter specification for any PFS booth by model number.",
    specs: ["All current PFS models", "Legacy model support", "Correct media specification guaranteed", "Warranty-compliant OEM media", "Bulk order discounts available"],
    icon: "📦",
  },
];

const FAQ_ITEMS = [
  {
    q: "How often should I replace my spray booth filters?",
    a: "Exhaust filter replacement frequency depends on production volume and the type of coating being applied. Most collision repair shops replace exhaust filters every 30–90 days. High-volume production environments may require monthly or more frequent replacement. Intake filters typically last longer — 3 to 6 months under normal conditions. PFS recommends inspecting filters at every PM visit and replacing them when pressure drop across the filter bank exceeds manufacturer specifications.",
  },
  {
    q: "What happens if I run my spray booth with clogged filters?",
    a: "Clogged filters restrict airflow, reducing face velocity below the 100 FPM minimum required by NFPA 33. This creates several problems: finish quality degrades due to turbulent or insufficient airflow, overspray accumulates on booth surfaces and equipment creating a fire hazard, fan motors work harder and wear faster, and your booth may fail inspection. Replacing filters on schedule is one of the most cost-effective maintenance tasks you can perform.",
  },
  {
    q: "Are your filters NFPA 33 compliant?",
    a: "Yes. PFS exhaust and intake filter media meets the requirements of NFPA 33 Standard for Spray Application Using Flammable or Combustible Materials. Our filters are designed to maintain the airflow performance your booth requires while capturing overspray at the efficiency levels required by code.",
  },
  {
    q: "Do you supply filters for booths you didn't manufacture?",
    a: "Yes. PFS supplies replacement filters for most major spray booth brands including Global Finishing Solutions, Col-Met, Garmat, Blowtherm, Spraybake, and others. Contact us with your booth make, model, and filter dimensions and we will identify the correct replacement media.",
  },
  {
    q: "Can I order filters online?",
    a: "Yes — PFS filters are available for online ordering at pfsfilters.com. For large orders, fleet accounts, or custom-cut media, call us directly at (888) 545-7715 and our parts team will get you set up.",
  },
  {
    q: "What is the Filter Rotation Program?",
    a: "The PFS Filter Rotation Program is a scheduled replacement service where we track your filter life, ship replacement media on a schedule matched to your production volume, and coordinate filter changes with your PM visits. It eliminates the risk of running with clogged filters and removes filter procurement from your to-do list.",
  },
];

export default function FiltersPage() {
  useSEO({
    title: "Spray Booth Filters | Paint Booth Replacement Filters | PFS — pfsfilters.com",
    description: "PFS spray booth filters — exhaust filters, intake filters, pre-filters, ceiling media, and OEM replacement kits. Spec-matched to your booth. Subscription programs available for automatic delivery. NFPA 33 compliant. Ships nationally from Santa Rosa, CA. Call (888) 545-7715 or order at pfsfilters.com.",
    canonical: "/filters",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    },
  });

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "460px",
        display: "flex",
        alignItems: "center",
        borderBottom: "3px solid #111",
        background: "#1C1C1E",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/manus-storage/pfs-booth-clean-interior-wide_3d9c498b.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          opacity: 0.35,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(27,58,107,0.92) 0%, rgba(27,58,107,0.65) 60%, rgba(27,58,107,0.3) 100%)",
          zIndex: 1,
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 3.5rem", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em",
            textTransform: "uppercase", marginBottom: "0.75rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: BLUE_LIGHT }} />
            PFS — SPRAY BOOTH FILTERS & REPLACEMENT MEDIA
          </div>
          <h1 data-animation="slideLeft" style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.0, textTransform: "uppercase",
            letterSpacing: "-0.01em", margin: "0 0 1rem",
          }}>
            Spray Booth<br />Filters
          </h1>
          <p data-animation="slideLeft" style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
            color: "rgba(255,255,255,0.8)", lineHeight: 1.7,
            maxWidth: "620px", margin: "0 0 1.75rem",
          }}>
            OEM exhaust filters, intake media, ceiling filters, and replacement kits for all PFS booth models and most major OEM brands. NFPA 33 compliant. Ships nationwide from our Northern California warehouse.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a data-animation="slideLeft" href="tel:8885457715" style={{
              background: BLUE, color: "#fff",
              border: "none", padding: "0.85rem 1.8rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.85rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", borderRadius: "2px",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              textDecoration: "none",
            }}>
              <Phone size={14} /> Call for Filters: (888) 545-7715
            </a>
            <a data-animation="slideRight"href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" style={{
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)", padding: "0.85rem 1.8rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.85rem", fontWeight: 800,
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", borderRadius: "2px",
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              textDecoration: "none",
            }}>
              Order Online at pfsfilters.com <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* INTRO BODY COPY */}
      <section style={{ background: "#fff", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <div style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.72rem", fontWeight: 700,
                color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}>
                OEM FILTER MEDIA — CALIFORNIA & NATIONWIDE
              </div>
              <h2 data-animation="slideLeft" style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900,
                color: "#111", textTransform: "uppercase",
                letterSpacing: "-0.01em", margin: "0 0 0.5rem", lineHeight: 1.1,
              }}>
                The Right Filter<br />for Every Booth
              </h2>
              <div style={{ width: "40px", height: "3px", background: BLUE, marginBottom: "1.5rem" }} />
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem", color: "#444", lineHeight: 1.75,
                marginBottom: "1.25rem",
              }}>
                Spray booth filters are not a commodity — the wrong media can reduce airflow below the 100 FPM face velocity required by NFPA 33, create fire hazards from overspray accumulation, and produce finish defects that cost far more than the filter itself. As the original manufacturer of PFS spray booths, we stock the exact filter specifications your equipment requires.
              </p>
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem", color: "#444", lineHeight: 1.75,
                marginBottom: "1.25rem",
              }}>
                PFS supplies exhaust filters, intake filters, ceiling media, paint arrest systems, and activated carbon VOC capture media for all PFS booth models and most major OEM brands. Whether you need a single replacement panel or a bulk supply for a multi-location fleet, our parts team will identify the correct specification and get it shipped fast from our Northern California warehouse.
              </p>
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem", color: "#444", lineHeight: 1.75,
              }}>
                For California facilities subject to CARB air quality regulations, South Coast AQMD, or Bay Area AQMD permit conditions, PFS can recommend filter media that supports your compliance requirements. Our Filter Rotation Program takes filter procurement off your plate entirely — we track your filter life, ship replacements on schedule, and coordinate changes with your preventive maintenance visits.
              </p>
            </div>
            <div>
              <div style={{
                background: "#F4F4F2",
                borderRadius: "2px",
                padding: "2rem",
                borderLeft: "4px solid " + BLUE,
              }}>
                <h3 style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "1rem", fontWeight: 800,
                  color: "#111", textTransform: "uppercase",
                  letterSpacing: "0.06em", marginBottom: "1.25rem",
                }}>
                  Why OEM Filters Matter
                </h3>
                {[
                  "Correct face velocity — maintains NFPA 33 100 FPM minimum",
                  "Proper fit — no bypass gaps that allow unfiltered air",
                  "Right media weight — matches your booth's static pressure design",
                  "Warranty compliance — OEM media protects your equipment warranty",
                  "Fire safety — correct media prevents overspray accumulation hazards",
                  "Finish quality — clean, uniform airflow produces defect-free results",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <CheckCircle size={14} style={{ color: BLUE, flexShrink: 0, marginTop: "2px" }} />
                    <span style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.85rem", color: "#444", lineHeight: 1.6,
                    }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Box */}
              <div style={{
                background: BLUE,
                borderRadius: "2px",
                padding: "1.75rem",
                marginTop: "1.25rem",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.72rem", fontWeight: 700,
                  color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em",
                  textTransform: "uppercase", marginBottom: "0.5rem",
                }}>
                  NEED FILTERS? CALL US DIRECTLY
                </div>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "1.6rem", fontWeight: 900,
                  color: "#fff", marginBottom: "0.25rem",
                }}>
                  (888) 545-7715
                </div>
                <div style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.8rem", color: "rgba(255,255,255,0.7)",
                  marginBottom: "1.25rem",
                }}>
                  Toll Free · Mon–Fri 7am–5pm PT
                </div>
                <a href="tel:8885457715" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: "#fff", color: BLUE,
                  padding: "0.75rem 1.5rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.82rem", fontWeight: 800,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  borderRadius: "2px", textDecoration: "none",
                  marginBottom: "0.75rem", width: "100%", justifyContent: "center",
                }}>
                  <Phone size={14} /> Call for Filters
                </a>
                <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: "transparent", color: "#fff",
                  border: "2px solid rgba(255,255,255,0.4)",
                  padding: "0.75rem 1.5rem",
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.82rem", fontWeight: 800,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  borderRadius: "2px", textDecoration: "none",
                  width: "100%", justifyContent: "center",
                }}>
                  Order Online: pfsfilters.com <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TYPE CARDS */}
      <section style={{ background: "#F4F4F2", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}>
              FILTER TYPES & MEDIA
            </div>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900,
              color: "#111", textTransform: "uppercase",
              letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1,
            }}>
              Complete Filter Selection
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}>
            {FILTER_TYPES.map((filter) => (
              <div data-animation="fadeIn" key={filter.name} style={{
                background: "#fff",
                borderRadius: "2px",
                padding: "1.75rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{filter.icon}</div>
                <h3 style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "1.1rem", fontWeight: 900,
                  color: "#111", textTransform: "uppercase",
                  letterSpacing: "0.03em", margin: "0 0 0.2rem",
                }}>
                  {filter.name}
                </h3>
                <div style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.72rem", fontWeight: 700,
                  color: BLUE, letterSpacing: "0.1em",
                  textTransform: "uppercase", marginBottom: "0.75rem",
                }}>
                  {filter.subtitle}
                </div>
                <p style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.85rem", color: "#555", lineHeight: 1.65,
                  marginBottom: "1rem",
                }}>
                  {filter.desc}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {filter.specs.map((spec) => (
                    <li key={spec} style={{
                      display: "flex", alignItems: "flex-start", gap: "0.4rem",
                      marginBottom: "0.3rem",
                    }}>
                      <span style={{ width: "5px", height: "5px", background: BLUE, borderRadius: "50%", flexShrink: 0, marginTop: "6px" }} />
                      <span style={{
                        fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                        fontSize: "0.78rem", color: "#444",
                      }}>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER ROTATION PROGRAM */}
      <section style={{ background: "#fff", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.72rem", fontWeight: 700,
                color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}>
                NEVER RUN WITH CLOGGED FILTERS AGAIN
              </div>
              <h2 data-animation="slideLeft" style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 900,
                color: "#111", textTransform: "uppercase",
                letterSpacing: "-0.01em", margin: "0 0 0.5rem", lineHeight: 1.1,
              }}>
                Filter Rotation<br />Program
              </h2>
              <div style={{ width: "40px", height: "3px", background: BLUE, marginBottom: "1.5rem" }} />
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem", color: "#444", lineHeight: 1.75,
                marginBottom: "1.25rem",
              }}>
                The PFS Filter Rotation Program is a scheduled replacement service designed for collision repair shops, fleet operators, and high-volume production facilities that cannot afford the cost of running with clogged or degraded filter media. We track your filter life based on your production volume and booth specifications, ship replacement media on a schedule matched to your operation, and coordinate filter changes with your preventive maintenance visits.
              </p>
              <p style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem", color: "#444", lineHeight: 1.75,
                marginBottom: "1.5rem",
              }}>
                Program participants receive priority parts availability, volume pricing on filter media, and a dedicated account contact who knows your equipment specifications. For multi-location fleets, we coordinate filter supply and scheduling across all sites — one call, one invoice, one point of contact.
              </p>
              <a data-animation="slideLeft" href="tel:8885457715" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: BLUE, color: "#fff",
                padding: "0.85rem 1.8rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.85rem", fontWeight: 800,
                letterSpacing: "0.1em", textTransform: "uppercase",
                borderRadius: "2px", textDecoration: "none",
              }}>
                <Phone size={14} /> Ask About the Program: (888) 545-7715
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} data-animation="fadeIn">
              {[
                { step: "01", title: "We Assess Your Booth", desc: "We review your booth model, production volume, and coating types to determine the correct filter specification and replacement schedule." },
                { step: "02", title: "We Set the Schedule", desc: "Based on your production data, we establish a filter rotation schedule that keeps your booth running within spec at all times." },
                { step: "03", title: "Filters Ship Automatically", desc: "Replacement media ships on schedule from our warehouse — no purchase orders, no last-minute scrambles, no running with clogged filters." },
                { step: "04", title: "Coordinated with PM Visits", desc: "Filter changes are coordinated with your preventive maintenance visits so installation is handled by our technicians, not your production staff." },
              ].map((item) => (
                <div key={item.step} style={{
                  display: "flex", gap: "1.25rem", alignItems: "flex-start",
                  padding: "1.25rem",
                  background: "#F4F4F2",
                  borderRadius: "2px",
                }}>
                  <div style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "1.8rem", fontWeight: 900,
                    color: BLUE, lineHeight: 1, flexShrink: 0, minWidth: "2.5rem",
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                      fontSize: "0.88rem", fontWeight: 800,
                      color: "#111", textTransform: "uppercase",
                      letterSpacing: "0.04em", marginBottom: "0.3rem",
                    }}>
                      {item.title}
                    </div>
                    <p style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.82rem", color: "#555", lineHeight: 1.6, margin: 0,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ background: "#F4F4F2", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <div style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              color: BLUE, letterSpacing: "0.18em", textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}>
              SPRAY BOOTH FILTER FAQ
            </div>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900,
              color: "#111", textTransform: "uppercase",
              letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1,
            }}>
              Common Questions
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} style={{
                background: "#fff",
                borderRadius: "2px",
                padding: "1.5rem",
                border: "1px solid #e2e8f0",
              }}>
                <h3 style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.92rem", fontWeight: 800,
                  color: "#111", textTransform: "uppercase",
                  letterSpacing: "0.04em", margin: "0 0 0.75rem",
                }}>
                  {item.q}
                </h3>
                <p style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.88rem", color: "#555", lineHeight: 1.7, margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{
        background: BLUE,
        padding: "3.5rem 2rem",
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
              color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em",
              textTransform: "uppercase", marginBottom: "0.5rem",
            }}>
              READY TO ORDER?
            </div>
            <h2 data-animation="slideLeft" style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900,
              color: "#fff", textTransform: "uppercase",
              letterSpacing: "-0.01em", margin: "0 0 0.5rem", lineHeight: 1.1,
            }}>
              Get the Right Filters<br />for Your Booth
            </h2>
            <p data-animation="slideLeft" style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6,
              maxWidth: "500px", margin: 0,
            }}>
              Call us with your booth make and model — we'll identify the correct filter specification and get it shipped fast. Or order online at pfsfilters.com for instant checkout.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "260px" }}>
            <a data-animation="slideLeft" href="tel:8885457715" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              background: "#fff", color: BLUE,
              padding: "1rem 2rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.92rem", fontWeight: 900,
              letterSpacing: "0.08em", textTransform: "uppercase",
              borderRadius: "2px", textDecoration: "none",
            }}>
              <Phone size={15} /> (888) 545-7715 — Call for Filters
            </a>
            <a data-animation="slideRight" href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,0.5)",
              padding: "0.85rem 2rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.85rem", fontWeight: 800,
              letterSpacing: "0.08em", textTransform: "uppercase",
              borderRadius: "2px", textDecoration: "none",
            }}>
              Order Online: pfsfilters.com <ExternalLink size={13} />
            </a>
            <Link href="/service/booth-cleaning">
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                background: "transparent", color: "rgba(255,255,255,0.7)",
                padding: "0.5rem 0",
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.8rem",
                cursor: "pointer", textDecoration: "underline",
              }}>
                Also need booth cleaning? Learn about our cleaning service <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
