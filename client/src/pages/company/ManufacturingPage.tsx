/**
 * Company — Manufacturing Page
 * Hero: HeroShotforWebsite.mov (converted to MP4) — full-bleed autoplay video
 * Shows PFS Santa Rosa manufacturing facility, fabrication process, and quality control.
 */
import { Link } from "wouter";
import { ArrowRight, Wrench, CheckCircle, Factory } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO = "/manus-storage/manufacturing-hero_9216dee6.mp4";

const STATS = [
  { num: "100%",   label: "USA Fabricated" },
  { num: "1,000+", label: "Systems Installed" },
  { num: "ETL/UL", label: "Listed Components" },
  { num: "NFPA 33", label: "Built to Standard" },
];

const CAPABILITIES = [
  {
    icon: <Factory size={20} />,
    title: "In-House Fabrication",
    body: "All structural steel, sheet metal panels, and enclosures are cut, formed, and welded at our Santa Rosa facility. CNC press brakes and plasma cutting ensure consistent, tight-tolerance components on every build.",
  },
  {
    icon: <Wrench size={20} />,
    title: "Electrical & Controls",
    body: "Our UL 508A certified panel shop builds every control enclosure in-house — from basic electromechanical panels to full PLC-based spray/flash/cure systems. All wiring is labeled, documented, and tested before shipment.",
  },
  {
    icon: <CheckCircle size={20} />,
    title: "Quality Inspection",
    body: "Every system undergoes a full pre-shipment inspection: airflow verification, electrical continuity, interlock testing, and visual inspection. Documentation is prepared and included with every booth.",
  },
];

export default function ManufacturingPage() {
  useSEO({
    title: "PFS Manufacturing | USA-Made Industrial Finishing Equipment | Santa Rosa, CA",
    description: "PFS manufactures industrial finishing equipment in Santa Rosa, CA. Every spray booth, oven, and blast system is engineered and built in-house with ETL/UL listed and certified components. Factory-direct pricing and nationwide shipping.",
    canonical: "/company/manufacturing",
  });

  return (
    <div style={{ background: "#fff" }}>

      {/* ── FULL-BLEED VIDEO HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Minimal overlay — 10% tint + bottom gradient only */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.45) 45%, rgba(5,5,5,0.10) 100%)",
          }}
        />

        {/* Bottom accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "#1B3A6B", zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          {/* Breadcrumb */}
          <div
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Link href="/"><span style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Home</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <Link href="/company"><span style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Company</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "#fff" }}>Manufacturing</span>
          </div>

          {/* Eyebrow */}
          <span
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            SANTA ROSA, CALIFORNIA
          </span>

          {/* Headline */}
          <h1 data-animation="slideLeft"
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.6rem, 7vw, 5rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
              maxWidth: "700px",
            }}
          >
            Built Here.<br />
            Engineered to Last.
          </h1>

          <p data-animation="slideLeft"
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}
          >
            Every PFS system is designed, fabricated, and assembled at our Santa Rosa facility — using domestic steel, in-house controls, and a full pre-shipment inspection on every build.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
              <button
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.85rem 2rem",
                  background: "#fff",
                  color: "#0a0a0a",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8edf5")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                REQUEST INFO <ArrowRight size={14} />
              </button>
            </Link>
            <Link href="/products" data-animation="slideRight">
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
                VIEW PRODUCTS
              </button>
            </Link>
          </div>
        </div>

        {/* ── STAT BAR ── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <div data-animation="slideLeft"
                  style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}
                >
                  {s.num}
                </div>
                <div data-animation="slideRight"
                  style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES SECTION ─────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="container">
          <span
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(0,0,0,0.35)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            OUR CAPABILITIES
          </span>
          <h2 data-animation="slideLeft"
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.05,
              marginBottom: "3rem",
              maxWidth: "560px",
            }}
          >
            Everything Under One Roof
          </h2>

          <div data-animation="fadeIn"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
            className="capabilities-grid"
          >
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                style={{
                  borderTop: "2px solid #1B3A6B",
                  paddingTop: "1.5rem",
                }}
              >
                <div
                  style={{
                    color: "#1B3A6B",
                    marginBottom: "0.75rem",
                  }}
                >
                  {cap.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "#4B5563",
                    lineHeight: 1.75,
                  }}
                >
                  {cap.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 700px) {
            .capabilities-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── BODY COPY ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#F9FAFB", borderTop: "1px solid #E5E7EB", padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
            className="mfg-body-grid"
          >
            <div>
              <h2 data-animation="slideLeft"
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                }}
              >
                Engineered to Order.<br />Every Time.
              </h2>
              <p
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "#374151",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                PFS was founded in Santa Rosa, California with a single mission: build the best industrial finishing equipment in North America. Over 35 years later, every system is still engineered to order by our in-house team and built on our own manufacturing floor — not outsourced, not assembled from off-the-shelf kits.
              </p>
              <p
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "#374151",
                  lineHeight: 1.8,
                }}
              >
                We use domestic steel and components wherever possible. Our CNC fabrication equipment, in-house welding, and UL 508A certified panel shop give us full control over quality at every stage — from raw material to final inspection.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                What Ships with Every System
              </h3>
              {[
                "compliance documentation label and documentation package",
                "Airflow calculation sheet for AHJ permit",
                "Wiring diagrams and panel documentation",
                "Pre-shipment inspection sign-off",
                "Installation and operations manual",
                "Direct line to our service team post-install",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    marginBottom: "0.65rem",
                  }}
                >
                  <CheckCircle size={14} color="#1B3A6B" style={{ flexShrink: 0, marginTop: "3px" }} />
                  <span
                    style={{
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.9rem",
                      color: "#374151",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 700px) {
            .mfg-body-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#1B3A6B", padding: "4rem 0" }}>
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
            <h2 data-animation="slideLeft"
              style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "0.4rem",
              }}
            >
              Ready to Build Your System?
            </h2>
            <p data-animation="slideLeft"
              style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Talk to our engineering team about your application, timeline, and budget.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote">
              <button data-animation="slideLeft"
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.85rem 2rem",
                  background: "#fff",
                  color: "#1B3A6B",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#e8edf5")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                GET A QUOTE <ArrowRight size={14} />
              </button>
            </Link>
            <a href="tel:8885457715">
              <button data-animation="slideRight"
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
                CALL (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
