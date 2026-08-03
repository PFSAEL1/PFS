import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const IMG = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";

// ─── FAQ Data ─────────────────────────────────────────────────────────────
const FAQ_SECTIONS = [
  {
    id: "spray-booths",
    title: "Spray Booths — General",
    faqs: [
      {
        q: "What is the difference between a downdraft, semi-downdraft, and side downdraft spray booth?",
        a: "A full downdraft booth draws air straight down from a filtered ceiling plenum and exhausts through a filtered pit in the floor, delivering the cleanest airflow pattern and the best operator breathing zone protection. A semi-downdraft (Orion Series) draws air from the ceiling and exhausts through low side walls, providing near-downdraft quality without requiring a concrete floor pit — ideal for facilities that cannot excavate. A side downdraft (Helios Series) draws air from one side wall and exhausts through the opposite side, requiring no pit and no raised floor system, making it the lowest installed-cost downdraft-style option.",
      },
      {
        q: "What does NFPA 33 compliance mean for a spray booth?",
        a: "NFPA 33 is the National Fire Protection Association standard for spray application using flammable or combustible materials. A compliant spray booth must maintain adequate airflow (typically 100 FPM face velocity), use listed electrical components rated for hazardous locations, include proper fire suppression provisions, and meet ventilation requirements to keep flammable vapor concentrations below 25% of the Lower Explosive Limit (LEL). All PFS enclosed spray booths are designed to NFPA 33 requirements with ETL listed components.",
      },
      {
        q: "What is 100 FPM face velocity and why does it matter?",
        a: "100 FPM (feet per minute) is the minimum airflow velocity across the open face or through the spray zone required by NFPA 33 to safely dilute and exhaust flammable vapors and overspray. Maintaining 100 FPM ensures the booth stays below the explosive limit threshold and protects the painter from overspray inhalation. PFS booths are engineered to deliver consistent 100 FPM across the full working envelope.",
      },
      {
        q: "Do PFS spray booths require a concrete pit?",
        a: "Full downdraft booths (Zenith Series) use an exhaust pit in the floor, which requires excavation during installation. Semi-downdraft (Orion Series) and side downdraft (Helios Series) booths do not require a pit — they exhaust through low side walls or side panels, making them suitable for slab-on-grade installations and facilities where excavation is not practical.",
      },
      {
        q: "Are PFS spray booths ETL listed?",
        a: "PFS enclosed spray booths are manufactured with ETL listed and certified components. ETL listing by Intertek confirms that the electrical components meet UL and ANSI/NFPA standards for use in hazardous locations. PFS also manufactures equipment to NFPA 33, OSHA, and IFC Chapter 24 requirements.",
      },
      {
        q: "Can PFS build a custom-size spray booth?",
        a: "Yes. PFS manufactures spray booths to custom dimensions to fit your facility, workflow, and the largest parts you need to finish. Standard catalog sizes are available for faster lead times, but custom widths, heights, and depths are a core part of what PFS does. Contact our engineering team with your part size and throughput requirements.",
      },
      {
        q: "Where are PFS spray booths manufactured?",
        a: "PFS spray booths are manufactured at our facility in Santa Rosa, California. All structural fabrication, panel assembly, and quality control are performed in-house at our USA manufacturing facility.",
      },
    ],
  },
  {
    id: "powder-coating",
    title: "Powder Coating Booths",
    faqs: [
      {
        q: "What is the difference between a spray-to-waste and a powder reclaim booth?",
        a: "A spray-to-waste powder booth collects overspray in cartridge filters and disposes of it — this is the simpler, lower-cost option and is ideal for operations that run a single color or change colors frequently. A powder reclaim booth uses a reclaim module to collect, sieve, and return overspray powder back into the feed hopper for reuse, significantly reducing material waste and cost per part. PFS offers both configurations.",
      },
      {
        q: "What CFM airflow do I need for a powder coating booth?",
        a: "Powder coating booth airflow requirements depend on the booth size and application method. PFS powder booths are typically engineered for 4,000–10,000 CFM depending on the booth footprint. The goal is to maintain sufficient inward airflow to contain powder within the booth and protect the operator, while not pulling so much air that it disturbs the powder cloud around the part. Our engineering team will size the airflow for your specific application.",
      },
      {
        q: "Does a powder coating booth need to comply with NFPA 33?",
        a: "Yes. Powder coating booths are subject to NFPA 33 because powder coatings are combustible materials. The standard requires proper ventilation, listed electrical components, grounding, and fire protection provisions. PFS powder coating booths are designed to NFPA 33 and IFC Chapter 24 requirements.",
      },
      {
        q: "Can a PFS powder coating booth be integrated with a curing oven?",
        a: "Yes. PFS manufactures both powder coating booths and batch curing ovens, and designs them to work together as a complete finishing line. Integrated systems can include conveyor systems, load/unload stations, and automated powder application. Contact our engineering team to discuss a complete powder coating line.",
      },
    ],
  },
  {
    id: "blast-rooms",
    title: "Blast Rooms & Abrasive Blasting",
    faqs: [
      {
        q: "What is an abrasive blast room?",
        a: "An abrasive blast room is an enclosed, ventilated structure designed to contain the abrasive media and dust generated during sandblasting or abrasive blasting operations. Blast rooms protect workers and the surrounding environment, allow media recovery and reuse, and maintain OSHA-compliant air quality. PFS blast rooms are custom-engineered to your part size, blast media, and production requirements.",
      },
      {
        q: "What blast media can be used in a PFS blast room?",
        a: "PFS blast rooms are compatible with a wide range of abrasive media including steel grit, steel shot, glass bead, aluminum oxide, garnet, crushed glass, and plastic media. The media recovery system design (mechanical, vacuum, or pneumatic) is selected based on the media type, density, and production volume.",
      },
      {
        q: "What is the difference between mechanical and vacuum media reclaim?",
        a: "Mechanical reclaim uses a screw auger or bucket elevator to collect spent media from the floor and return it to the blast pot — this is the most common and cost-effective method for steel grit and shot. Vacuum reclaim uses a pneumatic vacuum system to collect media and is better suited for lighter media like glass bead or garnet, or for facilities where floor-level mechanical systems are not practical.",
      },
      {
        q: "Does a blast room need to comply with NFPA or OSHA?",
        a: "Yes. Abrasive blast rooms must comply with OSHA 1910.94 (ventilation requirements for abrasive blasting), which specifies minimum airflow to maintain safe dust concentrations. Blast rooms must also comply with applicable NFPA standards and local building codes. PFS blast rooms are designed to OSHA 1910.94 and NFPA requirements with ETL/UL listed components.",
      },
    ],
  },
  {
    id: "ovens",
    title: "Industrial Ovens & Curing Ovens",
    faqs: [
      {
        q: "What temperature does a powder coating oven need to reach?",
        a: "Most powder coatings cure at 350–400°F (177–204°C) for 15–20 minutes at temperature. The exact cure schedule depends on the powder formulation, part mass, and coating thickness. PFS batch ovens are designed to reach and maintain temperatures up to 450°F with excellent temperature uniformity across the work zone.",
      },
      {
        q: "What is the difference between a direct-fired and indirect-fired curing oven?",
        a: "A direct-fired oven introduces combustion gases directly into the oven chamber — this is more energy-efficient but is not suitable for curing solvent-based coatings or parts that cannot tolerate combustion byproducts. An indirect-fired oven uses a heat exchanger to separate combustion gases from the process air, making it suitable for solvent-based coatings and applications where contamination is a concern. PFS offers both configurations.",
      },
      {
        q: "Does a curing oven need to comply with NFPA 86?",
        a: "Yes. Industrial ovens and furnaces are subject to NFPA 86 (Standard for Ovens and Furnaces), which covers construction, ventilation, safety controls, and fire protection. PFS curing ovens are designed to NFPA 86 requirements with listed safety controls and burner systems.",
      },
      {
        q: "Can a PFS oven be integrated with a powder coating booth?",
        a: "Yes. PFS manufactures both powder coating booths and curing ovens and designs them as integrated finishing systems. Complete powder coating lines can include the powder booth, conveyor, load/unload stations, and batch or conveyor oven — all engineered and manufactured by PFS.",
      },
    ],
  },
  {
    id: "warranty-policy",
    title: "Warranty, Returns & Policies",
    faqs: [
      {
        q: "What warranty does PFS provide on spray booths and finishing equipment?",
        a: "PFS warrants structural components against defects in materials and workmanship for four (4) years from the original date of shipment or purchase. Electrical components are warranted for one (1) year from the original date of shipment or purchase. Extended warranty coverage may be available for equipment maintained using genuine PFS Filters® replacement filters under an approved maintenance program. The purchaser's exclusive remedy is repair or replacement of the defective component.",
      },
      {
        q: "What is not covered by the PFS warranty?",
        a: "The PFS Limited Warranty does not cover normal wear and tear; consumable items such as filters, belts, gaskets, seals, and bulbs; damage caused by misuse, abuse, accidents, improper installation, improper maintenance, unauthorized modifications, corrosion, or chemical exposure; or labor, freight, downtime, or lost production costs unless otherwise agreed in writing.",
      },
      {
        q: "What is PFS's return policy?",
        a: "Because most PFS products are custom-engineered or made-to-order, returns are limited. Return requests must be made within 30 days of delivery, require prior written Return Merchandise Authorization (RMA), and the product must be unopened, unused, and in original factory packaging. Custom-engineered products, made-to-order equipment, and fabricated assemblies are non-returnable. Approved returns are subject to a 40% restocking fee. The purchaser is responsible for all return freight costs.",
      },
      {
        q: "Who is responsible for code compliance and permits at the installation site?",
        a: "The purchaser is solely responsible for determining product suitability, verifying compliance with all applicable local, state, and federal codes, obtaining required permits and inspections, and ensuring proper installation by qualified personnel. PFS manufactures equipment based on the specifications provided by the purchaser and can provide stamped engineering drawings to support the permit process upon request.",
      },
      {
        q: "What are PFS's freight and shipping terms?",
        a: "Unless otherwise agreed in writing, all products ship F.O.B. PFS's shipping facility in Santa Rosa, CA. Risk of loss transfers to the purchaser upon delivery to the carrier. Customers should inspect shipments immediately upon delivery and note any visible damage or shortages on the carrier's delivery receipt. Freight damage claims must be reported promptly to both the carrier and PFS.",
      },
      {
        q: "Where can I find the full PFS warranty and policy documents?",
        a: "The complete Limited Warranty, Limitation of Liability, Return Policy, Product Suitability, Freight Policy, and Legal Notice are available on the PFS Legal & Policies page.",
      },
    ],
  },
  {
    id: "service",
    title: "Service, Parts & Filters",
    faqs: [
      {
        q: "Does PFS provide installation and commissioning services?",
        a: "Yes. PFS offers installation and commissioning services for all PFS equipment. Our field service team can manage the full installation process including site preparation coordination, equipment assembly, utility connections, airflow balancing, and initial startup. Contact us to discuss your project.",
      },
      {
        q: "Where can I order replacement filters for my PFS spray booth?",
        a: "Replacement filters and consumables for PFS spray booths are available through PFS Filters® at pfsfilters.com. Genuine PFS Filters® are engineered for PFS equipment and are required to maintain warranty coverage under the extended warranty program.",
      },
      {
        q: "Does PFS offer preventive maintenance programs?",
        a: "Yes. PFS offers preventive maintenance programs for spray booths, powder coating systems, and industrial ovens. Regularly scheduled maintenance extends equipment life, maintains finish quality, and is required to qualify for extended warranty coverage. Contact our service team for program details.",
      },
    ],
  },
];

// ─── Accordion Item ────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.1rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: open ? "#1B3A6B" : "#1a1a1a",
            lineHeight: 1.4,
            transition: "color 0.15s",
          }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: "#1B3A6B",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            marginTop: "0.1rem",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "#444",
            lineHeight: 1.75,
            paddingBottom: "1.1rem",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ResourcesFAQsPage() {
  // Build FAQPage JSON-LD
  const allFaqs = FAQ_SECTIONS.flatMap(s => s.faqs);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  useSEO({
    title: "FAQs | Spray Booth, Powder Coating & Blast Room Questions | PFS",
    description: "Answers to the most common questions about PFS spray booths, powder coating systems, blast rooms, curing ovens, warranty, and return policy. Manufactured in Santa Rosa, CA.",
    jsonLd: faqSchema,
  });

  return (
    <div>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about PFS spray booths, powder coating systems, blast rooms, industrial ovens, and company policies."
        breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "FAQs" }]}
        bgImage={IMG}
      />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main FAQ content */}
            <div className="lg:col-span-2">
              {FAQ_SECTIONS.map((section) => (
                <div key={section.id} style={{ marginBottom: "2.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div style={{ width: 4, height: 28, background: "#1B3A6B", flexShrink: 0 }} />
                    <h2
                      style={{
                        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div style={{ borderTop: "1px solid #e5e7eb" }}>
                    {section.faqs.map((faq, i) => (
                      <FAQItem key={i} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Link to full legal page */}
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.25rem 1.5rem",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "#444",
                    marginBottom: "0.75rem",
                  }}
                >
                  For the complete warranty terms, return policy, freight policy, and legal notices, see the PFS Legal & Policies page.
                </p>
                <Link href="/legal">
                  <span className="btn-glow" style={{ fontSize: "0.78rem", padding: "0.65rem 1.5rem" }}>
                    View Full Legal & Policies <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
                <h4
                  style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "0.75rem",
                  }}
                >
                  Can't Find Your Answer?
                </h4>
                <p
                  style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.82rem",
                    color: "#555",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  Our engineering team is available to answer technical questions about spray booths, powder coating systems, blast rooms, and ovens.
                </p>
                <Link href="/contact/request-a-quote">
                  <span className="btn-glow w-full justify-center" style={{ fontSize: "0.78rem" }}>
                    ASK AN ENGINEER <ArrowRight size={13} />
                  </span>
                </Link>
                <a
                  href="tel:8885457715"
                  className="mt-3 flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "#1B3A6B",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  <Phone size={14} /> (888) 545-7715
                </a>
              </div>

              {/* Quick links */}
              <div style={{ padding: "1.25rem 1.5rem", border: "1px solid #e5e7eb" }}>
                <h4
                  style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "0.75rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Jump to Section
                </h4>
                {FAQ_SECTIONS.map(s => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "#1B3A6B",
                      padding: "0.3rem 0",
                      textDecoration: "none",
                    }}
                  >
                    <ArrowRight size={12} /> {s.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
