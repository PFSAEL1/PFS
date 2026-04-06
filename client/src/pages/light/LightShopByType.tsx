/**
 * LightShopByType — Editorial filter type selection for the light design
 */

import { Link } from "wouter";
import LightLayout from "../../components/light/LightLayout";

const INTAKE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/light-hero-intake-94LkqhxUxvR3HFm89bFfTv.webp";
const EXHAUST_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/light-category-exhaust-gDMxxE2KsfEFXMAmwc89Mn.webp";
const RENSA_AIR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/air-intake_85d5b21f.png";
const RENSA_PARTICULATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/particulate-filter_e78e2e2c.png";
const RENSA_WASHABLE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/washable-filter_5f68ab88.png";
const RENSA_ODOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/odor-gas-filter_b9b1c6c7.png";

const types = [
  {
    title: "Fiberglass Arrestors",
    position: "EXHAUST",
    positionColor: "#D97706",
    desc: "High-efficiency exhaust filtration capturing overspray particles before they leave the booth. Standard in most spray booth configurations.",
    specs: ["95–99% capture efficiency", "Available in 20×20 to 24×24", "MERV 7–10 ratings", "Bulk pricing available"],
    img: EXHAUST_IMG,
    href: "/light/shop",
  },
  {
    title: "Tacky Panels",
    position: "INTAKE",
    positionColor: "#1B4FD8",
    desc: "Adhesive-coated intake panels that capture dust and debris before it enters the spray environment. Essential for a clean paint finish.",
    specs: ["Sticky adhesive surface", "Multi-layer construction", "20×20 standard size", "Custom sizes available"],
    img: INTAKE_IMG,
    href: "/light/shop",
  },
  {
    title: "Ceiling Blankets",
    position: "INTAKE",
    positionColor: "#1B4FD8",
    desc: "Full-coverage ceiling plenum filtration for uniform airflow distribution. Prevents contamination from above.",
    specs: ["Full booth coverage", "Easy roll installation", "Fiberglass media", "Cut to size"],
    img: RENSA_AIR,
    href: "/light/shop",
  },
  {
    title: "Roll Media",
    position: "EXHAUST / INTAKE",
    positionColor: "#059669",
    desc: "Continuous roll media for custom-cut applications. Ideal for non-standard booth sizes or high-volume operations.",
    specs: ["Sold by the roll", "Multiple widths available", "Fiberglass & polyester", "Easy field cutting"],
    img: RENSA_PARTICULATE,
    href: "/light/shop",
  },
  {
    title: "Washable Filters",
    position: "INTAKE",
    positionColor: "#1B4FD8",
    desc: "Reusable intake filters that can be washed and reinstalled. Cost-effective for high-frequency filter changes.",
    specs: ["Washable & reusable", "Aluminum frame", "Polyester media", "Long service life"],
    img: RENSA_WASHABLE,
    href: "/light/shop",
  },
  {
    title: "Odor & Gas Filters",
    position: "EXHAUST",
    positionColor: "#D97706",
    desc: "Activated carbon filtration for VOC and odor control. Meets environmental compliance requirements for spray operations.",
    specs: ["Activated carbon media", "VOC capture", "Compliance-ready", "Custom configurations"],
    img: RENSA_ODOR,
    href: "/light/shop",
  },
];

export default function LightShopByType() {
  return (
    <LightLayout>
      {/* Header */}
      <section style={{ background: "#F4F2EE", padding: "10rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
            Browse
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1.5rem" }}>
            Shop by Type
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1.1rem", color: "#666", maxWidth: "500px" }}>
            Every filter position covered — intake, exhaust, ceiling, and specialty applications.
          </p>
        </div>
      </section>

      {/* Filter types grid */}
      <section style={{ background: "#fff", padding: "5rem 2rem 7rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0" }}>
          {types.map((type, i) => (
            <div key={type.title} style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              borderBottom: "1px solid #E5E2DC",
              overflow: "hidden",
            }}>
              {/* Image — alternates left/right */}
              <div style={{ order: i % 2 === 0 ? 1 : 2, overflow: "hidden", aspectRatio: "4/3", background: "#F4F2EE" }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
              >
                <img src={type.img} alt={type.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
              </div>

              {/* Content */}
              <div style={{ order: i % 2 === 0 ? 2 : 1, padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ display: "inline-block", background: type.positionColor, color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.75rem", marginBottom: "1.5rem", alignSelf: "flex-start" }}>
                  {type.position}
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: 1.15 }}>
                  {type.title}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, color: "#555", marginBottom: "1.5rem" }}>
                  {type.desc}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "2rem" }}>
                  {type.specs.map(spec => (
                    <div key={spec} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "4px", height: "4px", background: "#1B4FD8", borderRadius: "50%", flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.06em", color: "#666" }}>{spec}</span>
                    </div>
                  ))}
                </div>
                <Link href={type.href}>
                  <a style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#111",
                    textDecoration: "none",
                    borderBottom: "1px solid #111",
                    paddingBottom: "0.25rem",
                    alignSelf: "flex-start",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#1B4FD8"; e.currentTarget.style.borderColor = "#1B4FD8"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#111"; }}
                  >
                    Shop {type.title} →
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section:last-child > div > div { grid-template-columns: 1fr !important; }
          section:last-child > div > div > div { order: unset !important; }
          section:last-child > div > div > div:last-child { padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </LightLayout>
  );
}
