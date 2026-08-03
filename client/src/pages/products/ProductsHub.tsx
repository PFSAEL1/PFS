import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/pfs-robotics-card_2aac132b.jpg";
const HERO_VIDEO = "/manus-storage/pfs-products-hero-robot-video_7cd286b4.mp4";
const HERO_POSTER = "/manus-storage/pfs-products-hub-hero-poster_bcdcb248.jpg";

const FAMILIES = [
  {
    label: "Paint Booths",
    href: "/products/paint-booths",
    img: "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg",
    imgPosition: "center 40%",
    desc: "Enclosed, open face, outdoor, shipping container, aircraft, and custom spray paint booths. built with ETL/UL certified components, made in USA.",
    badge: "Most Popular",
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    img: "/manus-storage/pfs-powder-coating-card2_32de7c98.png",
    desc: "Spray to waste, powder reclaim, and automated powder coating systems for high-volume finishing lines.",
    badge: null,
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Industrial Ovens",
    href: "/products/ovens",
    img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",
    imgPosition: "center 50%",
    desc: "Batch, conveyor, walk-in, infrared, and large-equipment curing ovens. Any temperature, any size.",
    badge: null,
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Prep & Support",
    href: "/products/prep-support",
    img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",
    desc: "Prep stations, paint walls, paint mix rooms, sanding and grinding booths for complete finishing environments.",
    badge: null,
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    img: "/manus-storage/pfs-blast-systems2_36cb5b96.png",
    imgPosition: "center 55%",
    desc: "Blasting booths, reclaim blasting booths, and containerized blast booths for surface preparation.",
    badge: null,
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Air Make-Up Units",
    href: "/products/air-make-up-units",
    img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",
    desc: "Heated and non-heated AMUs for proper airflow and temperature control. OSHA and NFPA 33 compliant.",
    badge: null,
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Environmental Rooms",
    href: "/products/environmental-rooms",
    img: "/manus-storage/pfs-environmental-room-exterior-showroom_08ee80dd.jpg",
    desc: "Temperature and process-controlled finishing rooms for humidity-sensitive coatings and precision applications.",
    badge: null,
        tags: ["ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Parts & Filters",
    href: "/products/parts-filters",
    img: "/manus-storage/pfs-filters-card_8b47eabc.png",
    desc: "OEM parts, filters, and consumables for all PFS systems. Fast shipping from our US warehouse.",
    badge: null,
    tags: ["OEM Parts", "Fast Shipping"],
  },
  {
    label: "Integration & Automation",
    href: "/integration-automation",
    img: "/manus-storage/pfs-robotics-card_2aac132b.jpg",
    desc: "Conveyor systems, robotic finishing, PLC controls, and full line integration for automated finishing operations.",
    badge: "Enterprise",
    tags: ["Robotic", "PLC Controls"],
  },
];

export default function ProductsHub() {
  useSEO({
    title: "Spray Booth Systems & Industrial Finishing Equipment | PFS | Santa Rosa, CA",
    description: "PFS manufactures production-ready spray booth systems — crossflow, semi-downdraft, side downdraft, full downdraft, truck & large vehicle booths — plus powder coating systems, industrial ovens, blast rooms, prep stations, air make-up units, and robotic finishing cells. ETL-certified, galvanized steel construction, custom configurations. Vertical manufacturer in Santa Rosa, CA. Serving automotive, aerospace, industrial manufacturing, and specialty finishing nationwide.",
    canonical: "/products",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What types of finishing equipment does PFS manufacture?",
          acceptedAnswer: { "@type": "Answer", text: "PFS manufactures a complete range of industrial finishing equipment including spray paint booths (cross-flow, semi-downdraft, full downdraft, side downdraft, open-face, aircraft, drive-through, and container configurations), powder coating systems (spray-to-waste and reclaim), industrial curing ovens (batch, walk-in, conveyor, and infrared), abrasive blast rooms and booths, air make-up units, prep stations, paint mix rooms, and environmental control rooms. All equipment is manufactured in Santa Rosa, CA." }
        },
        {
          "@type": "Question",
          name: "Where is PFS equipment manufactured?",
          acceptedAnswer: { "@type": "Answer", text: "All PFS finishing equipment is designed, fabricated, and assembled in Santa Rosa, California. PFS is a vertical manufacturer — meaning we control the entire process from engineering through fabrication and installation, with no outsourced manufacturing middlemen." }
        },
        {
          "@type": "Question",
          name: "Does PFS provide installation and service?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. PFS provides factory-direct installation, commissioning, and ongoing service for all equipment we manufacture. Our service team covers California and ships and installs nationally. We also provide replacement parts, filter media, and technical support for all PFS systems." }
        },
        {
          "@type": "Question",
          name: "What industries does PFS serve?",
          acceptedAnswer: { "@type": "Answer", text: "PFS serves automotive refinishing and OEM manufacturing, aerospace and defense, transit and rail, agricultural equipment, heavy equipment, architectural and structural steel, consumer products manufacturing, and general industrial finishing. PFS has supplied finishing systems to customers in all of these sectors." }
        }
      ]
    },
  });

  return (
    <div>
      <PageHero
        title="Products"
        subtitle="Complete industrial finishing equipment — spray paint booths, powder booths, ovens, blast systems, and more — engineered and manufactured in the USA."
        breadcrumbs={[{ label: "Products" }]}
        bgImage={HERO_IMG}
        bgVideo={HERO_VIDEO}
        bgPoster={HERO_POSTER}
        bgImagePosition="center 45%"
      />

      <section className="py-10 bg-white">
        <div className="container">
          <div className="mb-6">
            <span className="section-label">Product Families</span>
            <h2 className="section-heading-lg">Everything You Need for Industrial Finishing</h2>
            <p className="section-body max-w-2xl">
              PFS manufactures a complete range of industrial finishing equipment — from spray booths and ovens to blast systems and automation. All products are built with ETL/UL certified components and manufactured in the USA.
            </p>
          </div>

          {/* Card grid — larger images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {FAMILIES.map((f) => (
              <Link key={f.label} href={f.href}>
                <div className="group cursor-pointer border border-gray-200 hover:border-[#1B2B4B] transition-all duration-300 hover:shadow-[0_0_24px_rgba(27,43,75,0.15)] overflow-hidden h-full flex flex-col">
                  <div className="overflow-hidden flex-shrink-0" style={{ height: "260px" }}>
                    <img
                      src={f.img}
                      alt={f.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={(f as any).imgPosition ? { objectPosition: (f as any).imgPosition } : undefined}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2 }}>
                        {f.label}
                      </h3>
                      {f.badge && (
                        <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#1B2B4B", color: "white", padding: "0.15rem 0.5rem", flexShrink: 0 }}>
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>
                      {f.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {f.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#f4f4f2", color: "#444", padding: "0.2rem 0.5rem" }}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2B4B" }}>
                      EXPLORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Conversion CTA bar */}
          <div style={{ backgroundColor: "#1a1a1a", padding: "2.5rem 2rem" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>
                  Ready to Get Pricing?
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  Tell us what you need and our team will send a detailed quote within 24 hours — no obligation.
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
