import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";

const SOLUTIONS = [
  {
    label: "Automotive & Collision Repair Programs",
    desc: "built with ETL/UL certified components spray booths sized for school and community college auto body programs — compliant with OSHA, NFPA 33, and state vocational education requirements.",
    href: "/products/paint-booths",
  },
  {
    label: "Woodworking & Cabinet Making Programs",
    desc: "Finishing booths and prep stations for wood shop programs — designed for lacquers, stains, and waterborne finishes with proper dust collection.",
    href: "/products/paint-booths",
  },
  {
    label: "Welding & Fabrication Programs",
    desc: "Blast booths, grinding booths, and ventilation systems for welding and metal fabrication programs.",
    href: "/products/blast-systems",
  },
  {
    label: "Powder Coating Programs",
    desc: "Manual powder coating booths for vocational and technical programs teaching industrial coating processes.",
    href: "/products/powder-booths",
  },
  {
    label: "Industrial Technology Programs",
    desc: "Complete finishing lab environments for industrial technology, manufacturing, and engineering programs at universities and technical colleges.",
    href: "/products",
  },
];

export default function EducationPage() {
  useSEO({
    title: "Educational Spray Booths | Vocational Training Paint Booths | PFS",
    description: "PFS educational spray booths are designed for vocational training programs, community colleges, and trade schools. Safe, code-compliant finishing environments for student instruction. ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/industries/education",
  });

  return (
    <div>
      <PageHero
        title="Education"
        subtitle="Spray booths, finishing equipment, and prep environments for vocational schools, community colleges, and universities — built to meet educational program requirements and safety codes."
        breadcrumbs={[{ label: "Industries", href: "/industries" }, { label: "Education" }]}
        bgImage={HERO_IMG}
      />

      <section style={{ padding: "5rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="section-label">Education</span>
              <h2 className="section-heading">Finishing Equipment for Educational Programs</h2>
              <p className="section-body">
                PFS has supplied spray booths and finishing equipment to vocational schools, community colleges, and universities across the country. Our systems are sized and configured for educational environments — safe, code-compliant, and built to last through years of student use.
              </p>
              <p className="section-body" style={{ marginTop: "1rem" }}>
                Whether you're equipping an auto body program, a woodworking lab, or an industrial technology facility, PFS engineers work directly with program directors and facilities teams to design a system that meets your curriculum needs, budget, and building requirements.
              </p>

              <div className="mt-8 space-y-4">
                {SOLUTIONS.map((s) => (
                  <div key={s.label} style={{ border: "1px solid #e8e8e6", padding: "1.25rem 1.5rem" }}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} style={{ color: "#FFFFFF", flexShrink: 0, marginTop: "3px" }} />
                      <div>
                        <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#1C1C1E", marginBottom: "0.25rem" }}>
                          {s.label}
                        </h4>
                        <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#666", lineHeight: 1.6 }}>
                          {s.desc}
                        </p>
                        <Link href={s.href}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginTop: "0.5rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF", cursor: "pointer" }}>
                            VIEW PRODUCTS <ArrowRight size={10} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact/request-a-quote">
                  <span className="btn-glow">Request a Quote <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:8885457715">
                  <span className="btn-outline">Call (888) 545-7715</span>
                </a>
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: "#f8f8f6", border: "1px solid #e8e8e6", padding: "1.5rem" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", marginBottom: "1rem" }}>
                  Why Schools Choose PFS
                </h4>
                {[
                  "built with ETL/UL certified components — NFPA 33 & OSHA compliant",
                  "Sized for educational program budgets",
                  "Meets state vocational education requirements",
                  "Simple operation for student use",
                  "Durable construction for high-use environments",
                  "Full installation and commissioning",
                  "Ongoing service and filter programs",
                  "Made in the USA",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 py-1.5" style={{ borderBottom: "1px solid #ebebeb" }}>
                    <CheckCircle2 size={13} style={{ color: "#FFFFFF", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#444" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "1.5rem", backgroundColor: "#FFFFFF", padding: "1.5rem" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Planning a New Program?
                </h4>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  PFS works with program directors and facilities teams from initial planning through installation and commissioning.
                </p>
                <Link href="/contact/request-a-quote">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "white", borderBottom: "2px solid rgba(255,255,255,0.5)", paddingBottom: "2px", cursor: "pointer" }}>
                    GET PRICING <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
