import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

// All images use manus-storage paths
const HERO_IMG       = "/manus-storage/pfs-paint-booth-kia-hero_addbde19.jpg";  // Real PFS booth — silver Kia K5 inside white booth
const HERO_VIDEO     = "/manus-storage/pfs-paint-booth-hero_500b9d60.mp4";       // Cinematic hero video
const OPEN_FACE_IMG  = "/manus-storage/IMG_2132_c21b2839.jpg";
const ENCLOSED_IMG   = "/manus-storage/enclosed-booth-card-zenith_7e010642.jpg";
const OUTDOOR_IMG    = "/manus-storage/pfs-outdoor-hero-8143_9d49ac36.jpg";
const CONTAINER_IMG  = "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg";
const AIRCRAFT_IMG   = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";
const INSPECTION_IMG = "/manus-storage/pfs-inspection-hero_1b83deb1.png";
const DOUBLE_WALL_IMG = "/manus-storage/pfs-double-wall-booth-v2_8cdb7a24.webp";
const PARTS_IMG      = "/manus-storage/pfs-parts-booth-angled_01b1a8aa.jpeg";
const CUSTOM_IMG     = "/manus-storage/pfs-custom-booth-front-card_7e7d1673.jpg";
const TRUCK_IMG      = "/manus-storage/pfs-truck-booth-card_a0d45884_fca2d2cb.jpeg";

const BOOTHS = [
  {
    label: "Enclosed Paint Booths",
    href: "/products/paint-booths/enclosed",
    img: ENCLOSED_IMG,
    badge: "Top Seller",
    desc: "Full enclosure for superior overspray containment — cross-flow, semi-downdraft, full downdraft, side downdraft, heated, and Sprinter van configurations.",
    tags: ["Downdraft", "Cross-Flow", "Semi-Downdraft", "ETL Certified"],
  },
  {
    label: "Aerospace Paint Booths",
    href: "/products/paint-booths/aircraft",
    img: AIRCRAFT_IMG,
    badge: "Specialty",
    desc: "Oversized, high-clearance booths engineered for aircraft, helicopters, and UAVs — compliant with MIL-SPEC and aerospace finishing standards.",
    tags: ["High Clearance", "MIL-SPEC", "Aerospace", "ETL Certified"],
  },
  {
    label: "Open Face Paint Booths",
    href: "/products/paint-booths/open-face",
    img: OPEN_FACE_IMG,
    badge: null,
    desc: "Open-front design ideal for large parts, high-volume production, and facilities where full enclosure is not required. Lower cost, faster throughput.",
    tags: ["Open Face", "ETL Certified", "Made in USA", "High Volume"],
  },
  {
    label: "Outdoor Paint Booths",
    href: "/products/outdoor-booths",
    img: OUTDOOR_IMG,
    imgPos: "center 40%",
    badge: null,
    desc: "Permanent metal building-style structures installed on a concrete pad outdoors — full spray booth inside, engineered for your site.",
    tags: ["Outdoor", "Metal Building", "Site-Built", "Made in USA"],
  },
  {
    label: "Shipping Container Paint Booths",
    href: "/products/container-booths",
    img: CONTAINER_IMG,
    imgPos: "center 30%",
    badge: null,
    desc: "ISO shipping container fully converted to a professional spray booth — mobile, deployable anywhere, minimal site prep required.",
    tags: ["Mobile", "ISO Container", "Deployable", "Made in USA"],
  },
  {
    label: "Double-Wall Paint Booths",
    href: "/products/paint-booths/double-wall",
    img: DOUBLE_WALL_IMG,
    badge: "PFS Zenith",
    desc: "Insulated double-wall panel construction — available in all four airflow configurations. ETL listed, UL 508A certified, heated options available.",
    tags: ["Double-Wall", "All Airflow Types", "ETL Certified", "Made in USA"],
  },
  {
    label: "Inspection Booths",
    href: "/products/paint-booths/inspection",
    img: INSPECTION_IMG,
    badge: null,
    desc: "High-CRI lighting and controlled airflow for post-paint quality inspection in automotive, aerospace, and industrial applications.",
    tags: ["High-CRI Lighting", "Quality Control", "ETL Certified", "Made in USA"],
  },
  {
    label: "Parts Booths",
    href: "/products/paint-booths/parts-booths",
    img: PARTS_IMG,
    badge: null,
    desc: "Compact spray booths engineered for small parts — components, brackets, hardware, and assemblies. Efficient airflow, minimal footprint, maximum throughput.",
    tags: ["Small Parts", "Compact", "ETL Certified", "Made in USA"],
  },
  {
    label: "Truck & Large Vehicle Paint Booths",
    href: "/products/paint-booths/truck-booths",
    img: TRUCK_IMG,
    imgPos: "center 25%",
    badge: "Heavy Equipment",
    desc: "Oversized spray booths built for semi trucks, buses, fleet vehicles, and large equipment — in cross-flow, side downdraft, semi-downdraft, and full downdraft configurations.",
    tags: ["Semi Trucks", "Fleet Vehicles", "All Airflow Types", "ETL Certified"],
  },
  {
    label: "Custom Paint Booths",
    href: "/products/paint-booths/custom",
    img: CUSTOM_IMG,
    badge: null,
    desc: "Engineered to your exact facility dimensions, process requirements, and local code compliance. No standard size? No problem.",
    tags: ["Custom Engineered", "Any Size", "ETL Certified", "Made in USA"],
  },
];

export default function PaintBoothsHub() {
  useSEO({
    title: "Industrial Paint Booths | Spray Booths Manufactured in USA | PFS",
    description: "PFS manufactures industrial spray paint booths for automotive, aerospace, industrial, and military applications. Downdraft, semi-downdraft, cross-flow, and custom configurations. ETL/UL listed components, NFPA 33 compliant. Factory-direct from Santa Rosa, CA.",
    canonical: "/products/paint-booths",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between a cross-flow and a downdraft spray booth?",
          acceptedAnswer: { "@type": "Answer", text: "A cross-flow booth draws air horizontally from the front intake wall to the rear exhaust filters — the most cost-effective configuration. A downdraft booth draws air vertically downward from a ceiling plenum through a raised grated floor, producing the cleanest airflow pattern and the highest finish quality. Semi-downdraft and side-downdraft are intermediate options that balance cost and performance." }
        },
        {
          "@type": "Question",
          name: "What certifications should a paint booth have?",
          acceptedAnswer: { "@type": "Answer", text: "Industrial spray booths should be built with ETL/UL certified components, comply with NFPA 33 (Standard for Spray Application Using Flammable or Combustible Materials), and have UL 508A listed control panels. Facilities may also require OSHA 1910.94 compliance for ventilation and local building code approvals." }
        },
        {
          "@type": "Question",
          name: "How much does an industrial paint booth cost?",
          acceptedAnswer: { "@type": "Answer", text: "Industrial paint booth pricing varies widely based on size, airflow configuration, heating system, and accessories. Entry-level cross-flow booths start around $15,000–$30,000. Full downdraft booths with heated air make-up units typically range from $50,000–$150,000+. Large aircraft or drive-through booths can exceed $500,000. Contact PFS for a factory-direct quote." }
        },
        {
          "@type": "Question",
          name: "What size paint booth do I need?",
          acceptedAnswer: { "@type": "Answer", text: "The booth interior should be at least 2 feet wider, 2 feet taller, and 4 feet longer than your largest part. For automotive work, a standard 14 ft × 9 ft × 26 ft booth accommodates most passenger vehicles. Trucks, buses, and heavy equipment require custom sizing. PFS engineers can size a booth to your specific part envelope and production volume." }
        },
        {
          "@type": "Question",
          name: "Do I need a heated paint booth?",
          acceptedAnswer: { "@type": "Answer", text: "A heated paint booth accelerates cure times, improves finish quality, and is required for waterborne basecoat/clearcoat systems that need a flash-bake cycle. Non-heated booths are suitable for ambient-cure coatings and lower-volume operations. In cold climates, a heated air make-up unit is often necessary year-round to maintain proper spray conditions." }
        }
      ]
    },
  });

  return (
    <div>
      {/* ── HERO — full-bleed video, text overlaid at bottom (matches Aerospace format) ── */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <video preload="auto"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
         
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Dark gradient so text is readable over the bright white booth interior */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.65) 35%, rgba(5,5,5,0.25) 70%, rgba(5,5,5,0.08) 100%)" }} />
        {/* Blue accent line at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "#1B3A6B", zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.85rem", display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <Link href="/"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Home</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <Link href="/products"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Products</span></Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>Paint Booths</span>
          </div>
          <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "700px" }}>
            Paint Booths
          </h1>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: "560px" }}>
            ETL-certified spray paint booths for automotive, aerospace, industrial, and fleet applications — available in open face, enclosed, aircraft, outdoor, and custom configurations.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
              <span className="btn-glow">GET PRICING <ArrowRight size={15} /></span>
            </Link>
            <a href="tel:8885457715" data-animation="slideRight">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.85rem 2rem", cursor: "pointer" }}>CALL (888) 545-7715</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12">
            <span className="section-label">Paint Booths</span>
            <h2 data-animation="slideLeft" className="section-heading">Choose Your Configuration</h2>
            <p data-animation="slideLeft" className="section-body max-w-2xl">
              PFS spray paint booths are ETL-certified and available in multiple configurations to match your application, throughput, and facility requirements.
            </p>
          </div>

          {/* Card grid — larger images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {BOOTHS.map((booth) => (
              <Link key={booth.label} href={booth.href}>
                <div className="group cursor-pointer border border-gray-200 hover:border-[#1B2B4B] transition-all duration-300 hover:shadow-[0_0_24px_rgba(27,43,75,0.15)] overflow-hidden h-full flex flex-col">
                  <div className="overflow-hidden flex-shrink-0" style={{ height: "220px" }}>
                    <img
                      src={booth.img}
                      alt={booth.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: (booth as any).imgPos || "center 50%" }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2"  data-animation="slideLeft">
                      <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2 }}>
                        {booth.label}
                      </h3>
                      {booth.badge && (
                        <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#1B2B4B", color: "white", padding: "0.15rem 0.5rem", flexShrink: 0 }}>
                          {booth.badge}
                        </span>
                      )}
                    </div>
                    <p data-animation="slideRight"style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>
                      {booth.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {booth.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#f4f4f2", color: "#444", padding: "0.2rem 0.5rem" }}>{tag}</span>
                      ))}
                    </div>
                    <div data-animation="slideLeft" className="flex items-center gap-1" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2B4B" }}>
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
                  Not Sure Which Booth Is Right for You?
                </h3>
                <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  Our engineers will review your facility, process, and throughput — and recommend the right configuration at no charge.
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
