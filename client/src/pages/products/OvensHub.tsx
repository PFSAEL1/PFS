import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import {
  IMG_OVEN_BATCH, IMG_OVEN_CONVEYOR, IMG_OVEN_WALKIN, IMG_OVEN_LARGE,
  IMG_OVEN_INFRARED,
} from "@/lib/productImages";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG   = "/manus-storage/pfs-industrial-oven-hero_52d9f4df.jpg";
const HERO_VIDEO = "/manus-storage/pfs-oven-hero-video_05e4a406.mp4";

// imgHeight: card image area height in px — taller for portrait images so the full subject is visible
const OVENS = [
  {
    label: "Batch Ovens",
    href: "/products/ovens/batch",
    img: IMG_OVEN_BATCH,
    imgHeight: 320,
    imgPosition: "center center",
    badge: "Most Popular",
    desc: "Versatile batch curing ovens for varied part sizes and production schedules. Available in gas, propane, or electric heat.",
    tags: ["Gas / Electric", "ETL/UL Certified Components", "Made in USA", "High Volume"],
  },
  {
    label: "Conveyor Ovens",
    href: "/products/ovens/conveyor",
    img: IMG_OVEN_CONVEYOR,
    imgHeight: 240,
    imgPosition: "center center",
    badge: null,
    desc: "Continuous conveyor ovens for high-volume automated finishing lines. Integrated with powder coating and paint systems.",
    tags: ["Continuous Process", "Automation Ready", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Walk-In Ovens",
    href: "/products/ovens/walk-in",
    img: IMG_OVEN_WALKIN,
    imgHeight: 240,
    imgPosition: "center center",
    badge: null,
    desc: "Large walk-in ovens for oversized parts and assemblies. Drive-in configurations available for trucks and heavy equipment.",
    tags: ["Drive-In Option", "Oversized Parts", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Large Equipment Ovens",
    href: "/products/ovens/large-equipment",
    img: IMG_OVEN_LARGE,
    imgHeight: 240,
    imgPosition: "center center",
    badge: "Specialty",
    desc: "Massive custom ovens for trucks, heavy equipment, rail cars, and structural components. No standard size — fully engineered.",
    tags: ["Custom Size", "Heavy Equipment", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Infrared Ovens",
    href: "/products/ovens/infrared",
    img: IMG_OVEN_INFRARED,
    imgHeight: 360,
    imgPosition: "center top",
    badge: null,
    desc: "High-efficiency IR curing for powder coating lines — faster ramp-up, less energy, gel and boost applications.",
    tags: ["Infrared", "Energy Efficient", "Powder Coating", "ETL/UL Certified Components"],
  },
];

export default function OvensHub() {
  useSEO({
    title: "Industrial Ovens | Batch Curing Ovens & Walk-In Ovens | PFS",
    description: "PFS manufactures industrial batch ovens and walk-in curing ovens for powder coating, paint curing, and heat treating. Uniform temperature distribution, gas or electric heat, NFPA 86 compliant, ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/ovens",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What temperature range do industrial powder cure ovens operate at?",
          acceptedAnswer: { "@type": "Answer", text: "Most thermosetting powder coatings cure between 325\u00b0F and 400\u00b0F (163\u00b0C\u2013204\u00b0C) for 10\u201320 minutes at temperature. PFS industrial ovens are typically rated to 450\u00b0F\u2013500\u00b0F to accommodate a wide range of powder chemistries and provide headroom above the required cure temperature." }
        },
        {
          "@type": "Question",
          name: "What is the difference between a batch oven and a conveyor oven?",
          acceptedAnswer: { "@type": "Answer", text: "A batch oven cures a fixed load of parts per cycle \u2014 parts are loaded, the door is closed, the oven runs a timed cure cycle, and parts are unloaded. A conveyor oven runs continuously, with parts moving through on a conveyor at a set speed matched to the cure time. Batch ovens suit job shops and varied part sizes; conveyor ovens suit high-volume production lines with consistent part geometry." }
        },
        {
          "@type": "Question",
          name: "What fuel types are available for industrial curing ovens?",
          acceptedAnswer: { "@type": "Answer", text: "PFS industrial ovens are available with natural gas, propane, or electric heat. Natural gas is the most common choice for large ovens due to lower operating cost. Electric ovens are preferred where gas is not available or where precise low-temperature control is required. Propane is used in remote locations without natural gas service." }
        },
        {
          "@type": "Question",
          name: "What NFPA standard applies to industrial curing ovens?",
          acceptedAnswer: { "@type": "Answer", text: "NFPA 86 (Standard for Ovens and Furnaces) governs the design, construction, and operation of industrial ovens used for curing, drying, and heat treating. PFS ovens are designed to comply with NFPA 86 using ETL/UL certified components and UL 508A listed control panels." }
        }
      ]
    },
  });

  return (
    <div>
      <PageHero
        title="Industrial Ovens"
        subtitle="PFS industrial ovens are precision-engineered for curing, drying, and heat-treating applications across a wide range of industries."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Industrial Ovens" }]}
        bgImage={HERO_IMG}
        bgVideo={HERO_VIDEO}
      />

      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12">
            <span className="section-label">Industrial Ovens</span>
            <h2 data-animation="slideLeft" className="section-heading">Choose Your Configuration</h2>
            <p data-animation="slideLeft" className="section-body max-w-2xl">
              PFS industrial ovens are precision-engineered for curing, drying, and heat-treating applications — available in batch, conveyor, walk-in, infrared, and fully custom configurations.
            </p>
          </div>

          {/* Card grid — larger images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {OVENS.map((oven) => (
              <Link key={oven.label} href={oven.href}>
                <div className="group cursor-pointer border border-gray-200 hover:border-[#1B2B4B] transition-all duration-300 hover:shadow-[0_0_24px_rgba(27,43,75,0.15)] overflow-hidden h-full flex flex-col">
                  <div className="overflow-hidden flex-shrink-0" style={{ height: `${oven.imgHeight}px` }}>
                    <img
                      src={oven.img}
                      alt={oven.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: oven.imgPosition }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2" data-animation="slideLeft">
                      <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2 }}>
                        {oven.label}
                      </h3>
                      {oven.badge && (
                        <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#1B2B4B", color: "white", padding: "0.15rem 0.5rem", flexShrink: 0 }}>
                          {oven.badge}
                        </span>
                      )}
                    </div>
                    <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>
                      {oven.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {oven.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#f4f4f2", color: "#444", padding: "0.2rem 0.5rem" }}>{tag}</span>
                      ))}
                    </div>
                    <div data-animation="slideRight" className="flex items-center gap-1" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2B4B" }}>
                      GET PRICING <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
                <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.4rem" }}>
                  Need a Custom Oven Solution?
                </h3>
                <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  Our engineers will design a system around your temperature range, part geometry, and cycle time — at no charge.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact/request-a-quote" data-animation="slideLeft">
                  <span className="btn-glow flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:+18885457715" data-animation="slideRight">
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
