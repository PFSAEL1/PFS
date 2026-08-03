import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const AMU_HEATED_IMG = "/manus-storage/pfs-amu-card_41f0dd88.jpg";
const AMU_NON_HEATED_IMG = "/manus-storage/apollo-amu-non-heated-render_2991eb20.png";

export default function AirMakeUpUnitsHub() {
  useSEO({
    title: "Air Make-Up Units | Heated AMU Systems for Spray Booths | PFS",
    description: "PFS air make-up units supply tempered replacement air to maintain positive booth pressure and code-compliant ventilation. Gas, propane, and electric heat options. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/air-make-up-units",
  });

  return (
    <div>
      <PageHero
        title="Air Make-Up Units"
        subtitle="PFS air make-up units supply tempered, filtered replacement air to spray booths and finishing rooms — maintaining proper airflow balance and code compliance."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Air Make-Up Units" }]}
        bgImage={AMU_HEATED_IMG}
      />

      {/* Main product cards — large imagery, prominent CTAs */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12">
            <span className="section-label">Air Make-Up Units</span>
            <h2 className="section-heading">Choose Your Configuration</h2>
            <p className="section-body max-w-2xl">Proper air replacement is required by OSHA and NFPA 33 for any spray booth. PFS manufactures heated and non-heated AMUs for every climate and application.</p>
          </div>

          {/* Two large cards side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Heated AMU */}
            <Link href="/products/air-make-up-units/heated">
              <div className="group cursor-pointer border border-gray-200 hover:border-[#1B2B4B] transition-all duration-300 hover:shadow-[0_0_24px_rgba(27,43,75,0.15)] overflow-hidden">
                <div className="overflow-hidden" style={{ height: "280px" }}>
                  <img
                    src={AMU_HEATED_IMG}
                    alt="Heated Air Make-Up Units"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2 }}>
                      Heated Air Make-Up Units
                    </h3>
                    <ArrowRight size={20} className="text-[#1B2B4B] flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Gas-fired or electric heated AMUs for cold climates and temperature-sensitive coatings. Available with natural gas, propane, or electric heat sources. Required for booths operating in sub-freezing environments.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Natural Gas", "Propane", "Electric Heat", "ETL/UL Certified Components", "Made in USA"].map(tag => (
                      <span key={tag} style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#f4f4f2", color: "#444", padding: "0.25rem 0.6rem" }}>{tag}</span>
                    ))}
                  </div>
                  <span className="btn-glow inline-flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>

            {/* Non-Heated AMU */}
            <Link href="/products/air-make-up-units/non-heated">
              <div className="group cursor-pointer border border-gray-200 hover:border-[#1B2B4B] transition-all duration-300 hover:shadow-[0_0_24px_rgba(27,43,75,0.15)] overflow-hidden">
                <div className="overflow-hidden" style={{ height: "280px" }}>
                  <img
                    src={AMU_NON_HEATED_IMG}
                    alt="Non-Heated Air Make-Up Units"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2 }}>
                      Non-Heated Air Make-Up Units
                    </h3>
                    <ArrowRight size={20} className="text-[#1B2B4B] flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Designed to bring fresh outside air into the paint booth. Non-tempered. Heated options available upon request.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Fresh Outside Air", "Non-Tempered", "ETL/UL Certified Components", "Made in USA", "Heated Option Available"].map(tag => (
                      <span key={tag} style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#f4f4f2", color: "#444", padding: "0.25rem 0.6rem" }}>{tag}</span>
                    ))}
                  </div>
                  <span className="btn-glow inline-flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
          </div>

          {/* Conversion CTA bar */}
          <div style={{ backgroundColor: "#1a1a1a", padding: "2.5rem 2rem" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>
                  Not Sure Which AMU You Need?
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  Our team will size the right unit for your booth CFM, climate, and heat source — at no charge.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact/request-a-quote">
                  <span className="btn-glow flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:+18885457715">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "0.6rem 1.2rem", cursor: "pointer" }}>
                    <Phone size={14} /> (888) 545-7715
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
