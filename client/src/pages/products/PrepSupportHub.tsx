import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO = "/manus-storage/pfs-prep-station-hero_2554e281.mp4";
const HERO_POSTER = "/manus-storage/pfs-prep-station-facility_f1978a4b.jpg";
const PREP_STATION_IMG = "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg";
const MIX_ROOM_IMG = "/manus-storage/IMG_0498_a98f5f38.jpg";
const SANDING_IMG = "/manus-storage/pfs-sanding-booth-real_6c18c7ff.png";
const GRINDING_IMG = "/manus-storage/pfs-grinding-booth-real_fabfee76.png";
const PAINT_WALL_IMG = "/manus-storage/pfs-paint-walls-card_553fa1c5.png";

const PREP_ITEMS = [
  {
    label: "Prep Stations",
    href: "/products/prep-support/prep-stations",
    img: PREP_STATION_IMG,
    badge: null,
    desc: "Dedicated prep stations with downdraft or side-downdraft airflow for sanding, masking, and surface prep before painting.",
    tags: ["Downdraft", "Side-Downdraft", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Paint Walls",
    href: "/products/prep-support/paint-walls",
    img: PAINT_WALL_IMG,
    badge: "Top Seller",
    desc: "Open-face exhaust filtration walls for spray painting parts and panels without a full enclosure. High-efficiency filters, compact footprint.",
    tags: ["Open Face", "High-Efficiency Filter", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Paint Mix Rooms",
    href: "/products/prep-support/paint-mix-rooms",
    img: MIX_ROOM_IMG,
    badge: null,
    desc: "NFPA 33 compliant paint mixing rooms with explosion-proof ventilation and lighting for safe paint storage and tinting.",
    tags: ["NFPA 33", "Explosion-Proof", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Sanding Booths",
    href: "/products/prep-support/sanding-booths",
    img: SANDING_IMG,
    badge: null,
    desc: "Enclosed sanding booths with high-efficiency dust capture for body shops and industrial surface preparation.",
    tags: ["Dust Capture", "Downdraft", "ETL/UL Certified Components", "Made in USA"],
  },
  {
    label: "Grinding Booths",
    href: "/products/prep-support/grinding-booths",
    img: GRINDING_IMG,
    badge: null,
    desc: "Spark-arresting grinding booths for metal fabrication and weld prep — built to NFPA 33 and OSHA standards.",
    tags: ["Spark-Arresting", "NFPA 33", "OSHA", "ETL/UL Certified Components"],
  },
];

export default function PrepSupportHub() {
  useSEO({
    title: "Prep Stations, Wash Booths & Grinding Booths | Surface Prep Equipment | PFS",
    description: "PFS manufactures a complete range of surface preparation equipment — prep stations, wash booths, grinding booths, and inspection booths. ETL/UL listed components, NFPA 33 compliant. Factory-direct from Santa Rosa, CA.",
    canonical: "/products/prep-support",
  });

  return (
    <div>
      {/* ── FULL-BLEED VIDEO HERO ── */}
      <section style={{
        position: "relative",
        minHeight: "clamp(420px, 70vh, 700px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <video preload="auto"
          autoPlay muted loop playsInline
         
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "#1B3A6B", zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>PRODUCTS / PREP & SUPPORT</span>
          <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>Prep & Support Equipment</h1>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "520px" }}>Proper surface preparation is critical to finish quality. PFS manufactures a complete range of prep and support equipment to complement your finishing line.</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact/request-a-quote" data-animation="slideLeft">
              <span className="btn-glow">GET PRICING <ArrowRight size={16} /></span>
            </Link>
            <a data-animation="slideRight" href="tel:8885457715" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "2px solid rgba(255,255,255,0.4)", color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: "pointer" }}><Phone size={16} /> CALL (888) 545-7715</a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12">
            <span className="section-label">Prep & Support</span>
            <h2 data-animation="slideLeft" className="section-heading">Choose Your Equipment</h2>
            <p data-animation="slideLeft" className="section-body max-w-2xl">PFS builds prep and support equipment for spray booth and powder coating lines.</p>
          </div>

          {/* Large card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {PREP_ITEMS.map((item) => (
              <Link key={item.label} href={item.href}>
                <div className="group cursor-pointer border border-gray-200 hover:border-[#1B2B4B] transition-all duration-300 hover:shadow-[0_0_24px_rgba(27,43,75,0.15)] overflow-hidden h-full flex flex-col">
                  <div className="overflow-hidden flex-shrink-0" style={{ height: "220px" }}>
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#1a1a1a" }}>
                        {item.label}
                      </h3>
                      {item.badge && (
                        <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", backgroundColor: "#1B2B4B", color: "white", padding: "0.15rem 0.5rem", flexShrink: 0 }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map(tag => (
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
                  Need a Complete Prep Solution?
                </h3>
                <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                  PFS can design and build a full prep area — from paint mix room to sanding station — as part of your finishing system.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/contact/request-a-quote" data-animation="slideLeft">
                  <span className="btn-glow flex items-center gap-2">Get Pricing <ArrowRight size={14} /></span>
                </Link>
                <a href="tel:+18885457715">
                  <span data-animation="slideRight" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "0.6rem 1.2rem", cursor: "pointer" }}>
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
