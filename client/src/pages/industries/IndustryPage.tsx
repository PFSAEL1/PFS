import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link, useParams } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";

const PAINT = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";
const POWDER = "/manus-storage/pfs-powder-coating-card2_32de7c98.png";
const OVEN = "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png";
const AERO = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";
const RAIL_METRO = "/manus-storage/pfs-rail-transit-metro-car_5a87910a.jpeg";
const AUTOMOTIVE_MFG = "/manus-storage/automotive-manufacturing-booth_c82d7068.jpeg";
const RAIL_INTERIOR_TRACKS = "/manus-storage/pfs-rail-booth-interior-tracks_b026c178.jpeg";
const RAIL_INTERIOR_WIDE = "/manus-storage/pfs-rail-booth-interior-tracks-wide_63f2bdbf.jpeg";
const BOOTH_INTERIOR_OPEN = "/manus-storage/pfs-booth-interior-open-door_3877d125.jpg";

interface IndustryContent {
  title: string;
  desc: string;
  body: string;
  img: string;
  products: { label: string; href: string }[];
  challenges: string[];
  gallery?: string[];
}

const INDUSTRIES: Record<string, IndustryContent> = {
  "collision-repair": {
    title: "Collision Repair & Auto Body",
    desc: "High-throughput spray booths and prep stations designed for collision repair shops of all sizes.",
    body: "Collision repair shops demand finishing equipment that delivers consistent results, fast cycle times, and compliance with environmental regulations. PFS spray booths are built with ETL/UL certified components and designed to meet the throughput demands of busy body shops — from single-bay operations to multi-bay production facilities.",
    img: PAINT,
    products: [
      { label: "Enclosed Paint Booths", href: "/products/paint-booths/enclosed" },
      { label: "Prep Stations", href: "/products/prep-support/prep-stations" },
      { label: "Air Make-Up Units", href: "/products/air-make-up-units" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
    challenges: ["High throughput requirements", "VOC compliance and emissions control", "Consistent finish quality across technicians", "Fast heat-up and cool-down cycles", "Limited floor space in urban shops"],
  },
  "automotive-manufacturing": {
    title: "Automotive Manufacturing",
    desc: "Production-scale paint and powder systems for OEM and Tier 1 automotive manufacturers.",
    body: "Automotive manufacturers require finishing systems that integrate seamlessly into production lines, deliver repeatable quality at high volumes, and meet stringent OEM specifications. PFS designs and builds complete paint and powder coating lines for automotive OEMs and Tier 1 suppliers.",
    img: AUTOMOTIVE_MFG,
    products: [
      { label: "Automated Powder Systems", href: "/products/powder-booths/automated" },
      { label: "Conveyor Ovens", href: "/products/ovens/conveyor" },
      { label: "Integration & Automation", href: "/integration-automation" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
    challenges: ["High-volume production requirements", "OEM quality specifications", "Conveyor system integration", "Color change efficiency", "Robotic application compatibility"],
  },
  "aerospace-defense": {
    title: "Aerospace & Defense",
    desc: "Precision-controlled finishing environments meeting aerospace and defense specifications.",
    body: "Aerospace and defense finishing applications demand the highest levels of process control, documentation, and compliance. PFS designs and builds finishing facilities that meet MIL-SPEC, NADCAP, and customer-specific requirements for aircraft, defense systems, and precision components.",
    img: AERO,
    products: [
      { label: "Process-Controlled Rooms", href: "/products/environmental-rooms/process-controlled" },
      { label: "Large Equipment Ovens", href: "/products/ovens/large-equipment" },
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
    challenges: ["MIL-SPEC and NADCAP compliance", "Temperature and humidity control", "Large structure finishing", "Process documentation requirements", "Security and access control"],
  },
  "industrial-manufacturing": {
    title: "Industrial Manufacturing",
    desc: "Robust finishing systems for general industrial manufacturing and fabrication.",
    body: "Industrial manufacturers need finishing equipment that can handle a wide variety of part sizes, materials, and coating systems. PFS provides flexible, durable finishing solutions for metal fabricators, equipment manufacturers, and general industrial operations.",
    img: OVEN,
    products: [
      { label: "Open Face Paint Booths", href: "/products/paint-booths/open-face" },
      { label: "Batch Ovens", href: "/products/ovens/batch" },
      { label: "Powder Coating Systems", href: "/products/powder-booths" },
      { label: "Blasting Systems", href: "/products/blast-systems" },
    ],
    challenges: ["Wide variety of part sizes", "Multiple coating systems", "Production flexibility", "Operator safety", "Environmental compliance"],
  },
  "heavy-equipment": {
    title: "Heavy Equipment",
    desc: "Large-format booths and ovens for agricultural, construction, and mining equipment.",
    body: "Heavy equipment manufacturers and dealers need finishing systems large enough to accommodate tractors, excavators, mining trucks, and other oversized equipment. PFS specializes in large-format spray booths, drive-in ovens, and blast rooms for the heavy equipment industry.",
    img: PAINT,
    products: [
      { label: "Outdoor Paint Booths", href: "/products/outdoor-booths" },
      { label: "Large Equipment Ovens", href: "/products/ovens/large-equipment" },
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
    challenges: ["Oversized equipment dimensions", "Heavy-duty structural requirements", "Drive-in access requirements", "High BTU curing demands", "Outdoor installation considerations"],
  },
  "truck-bus-fleet": {
    title: "Truck, Bus & Fleet",
    desc: "Drive-through booths and fleet refinishing systems for commercial vehicle operations.",
    body: "Commercial vehicle operators, truck body manufacturers, and fleet refinishers need finishing systems designed for the unique dimensions and throughput demands of trucks, buses, and fleet vehicles. PFS builds drive-through booths and complete fleet finishing facilities.",
    img: POWDER,
    products: [
      { label: "Enclosed Paint Booths", href: "/products/paint-booths/enclosed" },
      { label: "Prep Stations", href: "/products/prep-support/prep-stations" },
      { label: "Air Make-Up Units", href: "/products/air-make-up-units" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
    challenges: ["Long vehicle dimensions", "High throughput requirements", "Multiple vehicle types", "Fleet color matching", "Regulatory compliance"],
  },
  "rail-transit": {
    title: "Rail & Transit",
    desc: "Specialized finishing facilities for railcar, locomotive, and transit vehicle refinishing.",
    body: "Rail and transit vehicle finishing requires facilities large enough to accommodate full-length railcars and locomotives, with precise environmental control for high-performance coatings. PFS has built complete rail finishing facilities for major transit authorities, including custom-length drive-through booths with track integration and downdraft airflow systems sized for light rail and heavy locomotive applications.",
    img: RAIL_METRO,
    gallery: [RAIL_INTERIOR_TRACKS, RAIL_INTERIOR_WIDE, BOOTH_INTERIOR_OPEN],
    products: [
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
      { label: "Large Equipment Ovens", href: "/products/ovens/large-equipment" },
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Integration & Automation", href: "/integration-automation" },
    ],
    challenges: ["Extra-long vehicle dimensions", "Track integration requirements", "High-performance coating systems", "Environmental compliance", "Facility size constraints"],
  },
  "marine": {
    title: "Marine",
    desc: "Corrosion-resistant finishing systems for marine vessels, components, and structures.",
    body: "Marine finishing applications demand corrosion-resistant equipment capable of handling large vessel sections, marine coatings, and the unique challenges of a saltwater environment. PFS builds marine finishing facilities for shipyards, boat manufacturers, and marine component suppliers.",
    img: OVEN,
    products: [
      { label: "Open Face Paint Booths", href: "/products/paint-booths/open-face" },
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
      { label: "Environmental Rooms", href: "/products/environmental-rooms" },
    ],
    challenges: ["Corrosive environment requirements", "Large vessel section dimensions", "Marine coating compatibility", "Humidity control", "Saltwater exposure protection"],
  },
  "energy-utilities": {
    title: "Energy & Utilities",
    desc: "Industrial finishing equipment for pipeline, power generation, and utility infrastructure.",
    body: "Energy and utility companies require finishing equipment for pipeline components, power generation equipment, transmission structures, and utility infrastructure. PFS provides robust finishing systems for the energy sector.",
    img: PAINT,
    products: [
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Open Face Paint Booths", href: "/products/paint-booths/open-face" },
      { label: "Industrial Ovens", href: "/products/ovens" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
    challenges: ["Large component dimensions", "Corrosion protection requirements", "High-performance coating systems", "Remote installation locations", "Regulatory compliance"],
  },
  "government-military": {
    title: "Government & Military",
    desc: "Compliant finishing facilities for government agencies and military applications.",
    body: "Government and military finishing applications require compliance with strict specifications, security requirements, and procurement regulations. PFS has extensive experience designing and building finishing facilities for federal, state, and military customers.",
    img: AERO,
    products: [
      { label: "Process-Controlled Rooms", href: "/products/environmental-rooms/process-controlled" },
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
      { label: "Large Equipment Ovens", href: "/products/ovens/large-equipment" },
    ],
    challenges: ["MIL-SPEC compliance", "Security and access control", "Government procurement requirements", "Documentation and traceability", "Wide range of equipment types"],
  },
};

export default function IndustryPage() {
  useSEO({
    title: "Industry Solutions | PFS Industrial Finishing Equipment",
    description: "PFS industrial finishing equipment solutions for aerospace, automotive, collision repair, military, heavy equipment, marine, rail transit, and fleet operations. ETL-certified, NFPA 33 compliant, made in the USA.",
    canonical: "/industries",
  });

  const params = useParams<{ industry: string }>();
  const slug = params.industry || "";
  const content = INDUSTRIES[slug];

  if (!content) {
    return (
      <div>
        <PageHero title="Industry" breadcrumbs={[{ label: "Industries", href: "/industries" }]} />
        <div className="container py-16 text-center">
          <p className="section-body">Industry not found. Please use the navigation above.</p>
          <Link href="/industries"><span className="btn-glow mt-4 inline-flex">View All Industries</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={content.title}
        subtitle={content.desc}
        breadcrumbs={[{ label: "Industries", href: "/industries" }, { label: content.title }]}
        bgImage={content.img}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="section-label">Industry Overview</span>
              <h2 className="section-heading">{content.title}</h2>
              <p className="section-body mb-8">{content.body}</p>

              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Key Challenges We Solve</h3>
              <ul className="space-y-2 mb-8">
                {content.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7 }}>
                    <span style={{ color: "#FFFFFF", fontWeight: 700, flexShrink: 0 }}>✓</span> {c}
                  </li>
                ))}
              </ul>

              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Recommended Products</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {content.products.map((p) => (
                  <Link key={p.label} href={p.href}>
                    <div className="flex items-center justify-between p-3 border border-gray-200 hover:border-[#1B2B4B] hover:bg-blue-50 transition-all">
                      <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#333", fontWeight: 500 }}>{p.label}</span>
                      <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact/request-a-quote"><span className="btn-glow">Get Pricing <ArrowRight size={14} /></span></Link>
                <a href="tel:8885457715"><span className="btn-outline">Call (888) 545-7715</span></a>
              </div>

              {/* Gallery */}
              {content.gallery && content.gallery.length > 0 && (
                <div className="mt-10">
                  <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Project Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {content.gallery.map((src, i) => (
                      <img key={i} src={src} alt={`${content.title} gallery ${i + 1}`} className="w-full object-cover" style={{ height: "180px", borderRadius: "2px" }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <img src={content.img} alt={content.title} className="w-full object-cover" style={{ height: "280px" }} />
              <div className="mt-6 p-5 border border-gray-200">
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>Discuss Your Project</h4>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem" }}>Talk to a PFS engineer who specializes in your industry.</p>
                <Link href="/contact/request-a-quote"><span className="btn-glow w-full justify-center" style={{ fontSize: "0.75rem" }}>REQUEST INFO</span></Link>
                <a href="tel:8885457715" className="mt-3 block text-center" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#FFFFFF" }}>(888) 545-7715</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
