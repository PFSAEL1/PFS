/*
 * PFS Apollo Section - GFS Corporate Style
 * Two-column split: text left, image right on white background
 */

import { ArrowRight, CheckCircle2 } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-hero-booth-9udTMKwmSMnYLiux7h7TU9.webp";

const specs = [
  "Natural gas or propane fuel options",
  "Direct-fired or indirect-fired configurations",
  "Modulating burner for precise temperature control",
  "Digital control panel with diagnostics",
  "Designed for spray booth integration",
  "Compliant with NFPA 86 standards",
];

export default function ApolloSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="apollo" className="py-16 bg-white border-b border-gray-200">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <p className="section-label">Featured Product</p>
            <h2 className="section-heading">
              Apollo AM1-Series<br />Make-Up Air Heaters
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.5rem" }}>
              The Apollo AM1-Series is PFS's flagship make-up air heater, engineered specifically for spray booth applications. Designed for maximum efficiency, reliability, and compliance, the AM1-Series delivers consistent, controlled heat to optimize your finishing environment.
            </p>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", lineHeight: 1.75, fontSize: "1rem", marginBottom: "2rem" }}>
              Available in a range of BTU outputs to match any booth size, the Apollo AM1-Series integrates seamlessly with PFS spray booth systems and third-party installations alike.
            </p>

            {/* Specs list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {specs.map((spec) => (
                <div key={spec} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#FFFFFF" }} />
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#444" }}>
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("#quote")} className="btn-primary btn-glow">
                REQUEST INFO
                <ArrowRight size={15} />
              </button>
              <button onClick={() => scrollTo("#quote")} className="btn-outline">
                DOWNLOAD SPEC SHEET
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <img
              src={HERO_IMG}
              alt="Apollo AM1-Series Make-Up Air Heater"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            {/* Red accent bar */}
            <div
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: "#FFFFFF" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
