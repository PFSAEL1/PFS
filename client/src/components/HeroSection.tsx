/*
 * PFS Hero Section - GFS Corporate Style
 * Full-bleed background image, left-aligned text, red primary CTA button
 * White outline secondary button, no diagonal cuts
 */

import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-hero-booth-9udTMKwmSMnYLiux7h7TU9.webp";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative flex items-center" style={{ minHeight: "calc(100vh - 88px)", marginTop: "88px" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Dark overlay - left-heavy gradient like GFS */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)" }}
      />

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p
            className="text-white mb-4"
            style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.8 }}
          >
            ETL-Certified Industrial Finishing Equipment
          </p>

          {/* Headline */}
          <h1
            className="text-white mb-6"
            style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 5vw, 4.2rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "0.02em" }}
          >
            Paint Booths and<br />Finishing Equipment
          </h1>

          {/* Body */}
          <p
            className="text-gray-200 mb-8 max-w-xl"
            style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
          >
            PFS is dedicated to developing high-quality spray paint booths and finishing environments for a wide variety of industries — including aerospace, automotive refinish, and industrial businesses. built with ETL/UL certified components, fast lead times, financing available.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo("#solutions")} className="btn-primary btn-glow">
              BROWSE EQUIPMENT
              <ArrowRight size={15} />
            </button>
            <button onClick={() => scrollTo("#quote")} className="btn-white-outline">
              REQUEST INFO
            </button>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            {[
              { value: "ETL/UL Certified Components", label: "Intertek 5022693" },
              { value: "Fast Lead Times", label: "Industry-leading delivery" },
              { value: "Financing Available", label: "Flexible payment options" },
            ].map((stat) => (
              <div key={stat.value}>
                <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 600, color: "white", letterSpacing: "0.04em" }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
