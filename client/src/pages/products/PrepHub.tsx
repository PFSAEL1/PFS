import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_VIDEO = "/manus-storage/pfs-prep-station-hero_2554e281.mp4";
const HERO_IMG   = "/manus-storage/pfs-prep-station-facility_f1978a4b.jpg"; // poster fallback
const SANDING_IMG = "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg";
const MIX_ROOM_IMG = "/manus-storage/IMG_0498_a98f5f38.jpg";
const PREP_STATION_IMG = "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg";

const PREP_ITEMS = [
  {
    label: "Paint Prep Stations",
    href: "/products/prep/paint-prep-stations",
    img: PREP_STATION_IMG,
    desc: "Dedicated prep stations with downdraft or side-downdraft airflow for sanding, masking, and surface prep before painting. Available in open and enclosed configurations.",
  },
  {
    label: "Dust Collection",
    href: "/products/prep/dust-collection",
    img: SANDING_IMG,
    desc: "Integrated dust collection systems for prep environments — capturing sanding dust, grinding particles, and airborne contaminants at the source.",
  },
  {
    label: "Wash Booths & Washers",
    href: "/products/prep/wash-booths",
    img: PREP_STATION_IMG,
    desc: "Spray washers and wash booths for parts cleaning and surface degreasing prior to finishing. Available in manual and automated configurations.",
  },
  {
    label: "Aluminum Repair",
    href: "/products/prep/aluminum-repair",
    img: SANDING_IMG,
    desc: "Dedicated aluminum repair environments with proper containment and ventilation for aluminum welding, sanding, and surface repair — critical for modern collision repair.",
  },
  {
    label: "Paint Mix Rooms",
    href: "/products/prep-support/paint-mix-rooms",
    img: MIX_ROOM_IMG,
    desc: "NFPA-compliant paint mixing rooms with explosion-proof ventilation and lighting for safe paint storage and mixing.",
  },
  {
    label: "Sanding Booths",
    href: "/products/prep-support/sanding-booths",
    img: SANDING_IMG,
    desc: "Enclosed sanding booths with high-efficiency dust capture for body shops, wood finishing, and industrial surface preparation.",
  },
  {
    label: "Grinding Booths",
    href: "/products/prep-support/grinding-booths",
    img: SANDING_IMG,
    desc: "Spark-arresting grinding booths for metal fabrication and weld prep — built to NFPA 33 and OSHA standards.",
  },
];

export default function PrepHub() {
  useSEO({
    title: "Paint Prep Stations & Prep Booths | Surface Preparation | PFS",
    description: "PFS prep stations and prep booths provide a controlled, code-compliant environment for sanding, masking, priming, and surface preparation. Keeps your spray booth reserved for final coats. ETL/UL listed components, NFPA 33 compliant. Manufactured in Santa Rosa, CA.",
    canonical: "/products/prep",
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
          autoPlay
          muted
          loop
          playsInline
         
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 35%, rgba(5,5,5,0.30) 70%, rgba(5,5,5,0.10) 100%)", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "#1B3A6B", zIndex: 3 }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4.5rem" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
            PRODUCTS / PREP
          </span>
          <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1rem", maxWidth: "680px" }}>
            Prep Environments
          </h1>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "520px" }}>
            Complete prep environments for collision repair, automotive body, industrial manufacturing, and aerospace — from dust collection to wash booths to aluminum repair stations.
          </p>
          <Link href="/contact/request-a-quote">
            <span className="btn-glow">GET PRICING <ArrowRight size={16} /></span>
          </Link>
        </div>
      </section>

      <section style={{ padding: "5rem 0", backgroundColor: "#fff" }}>
        <div className="container">
          <div className="mb-10">
            <span className="section-label">Prep Environments</span>
            <h2 className="section-heading">Surface Preparation Systems</h2>
            <p className="section-body max-w-2xl">
              PFS builds complete prep environments — dust collection, wash booths, aluminum repair stations, and paint mix rooms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREP_ITEMS.map((item) => (
              <Link key={item.label} href={item.href}>
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.02em", marginBottom: "0.35rem" }}>
                      {item.label}
                    </h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Collision Repair callout */}
          <div className="mt-12 p-8" style={{ backgroundColor: "#f8f8f6", border: "1px solid #e8e8e6" }}>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <span className="section-label">Collision & Automotive</span>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1C1C1E", letterSpacing: "0.02em", marginTop: "0.25rem" }}>
                  Built for Modern Collision Repair
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7, marginTop: "0.5rem" }}>
                  Today's collision repair shops need dedicated prep environments that meet OEM certification requirements, handle aluminum repair safely, and keep dust contamination away from the paint booth. PFS designs complete prep-to-paint workflows for shops of all sizes.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/industries/collision-repair">
                  <span className="btn-glow flex items-center gap-2">View Collision Repair Solutions <ArrowRight size={14} /></span>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 p-8" style={{ backgroundColor: "#1C1C1E" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>
                  Design Your Prep Environment
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                  Our engineers can spec a complete prep-to-paint workflow for your facility.
                </p>
              </div>
              <Link href="/contact/talk-to-an-engineer">
                <span className="btn-glow flex-shrink-0">Talk to an Engineer <ArrowRight size={14} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
