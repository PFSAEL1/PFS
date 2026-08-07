import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

// ── IMAGES ────────────────────────────────────────────────────────────────────
// Hub hero: IMG_0766 — white Advanced Extraction booth exterior in clean showroom
const HUB_HERO = "/manus-storage/pfs-environmental-room-exterior-showroom_08ee80dd.jpg";
// Process-Controlled card: IMG_0764 — clean exterior shot, smaller booth in white room
const PROCESS_CARD = "/manus-storage/pfs-process-controlled-room-exterior_f4302d4b.jpg";
// Temperature-Controlled card: same hero (showroom exterior)
const TEMP_CARD = "/manus-storage/pfs-environmental-room-exterior-showroom_08ee80dd.jpg";
// Enclosed Work card: large interior shot
const ENCLOSED_CARD = "/manus-storage/pfs-environmental-room-interior-large_a5ff5797.jpg";

export default function EnvironmentalRoomsHub() {
  useSEO({
    title: "Environmental Rooms | Humidity & Temperature Controlled Finishing Rooms | PFS",
    description: "PFS environmental rooms provide precision humidity and temperature control for aerospace coatings, pharmaceutical manufacturing, and sensitive finishing applications. ETL/UL listed components. Manufactured in Santa Rosa, CA.",
    canonical: "/products/environmental-rooms",
  });

  return (
    <div>
      <PageHero
        title="Environmental Rooms"
        subtitle="PFS environmental rooms provide precise temperature and humidity control for sensitive finishing operations and process-controlled work environments."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Environmental Rooms" }]}
        bgImage={HUB_HERO}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-10">
            <span className="section-label">Environmental Rooms</span>
            <h2 data-animation="slideLeft" className="section-heading">Choose Your Configuration</h2>
            <p data-animation="slideLeft" className="section-body max-w-2xl">PFS environmental rooms provide precise temperature and humidity control for sensitive finishing operations and process-controlled work environments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link key="Temperature-Controlled Rooms" href="/products/environmental-rooms/temperature-controlled">
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={TEMP_CARD} alt="Temperature-Controlled Rooms" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a" }}>Temperature-Controlled Rooms</h3>
                    <p data-animation="slideRight" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>Precisely controlled temperature environments for coating and curing.</p>
                  </div>
                </div>
              </Link>
              <Link key="Process-Controlled Rooms" href="/products/environmental-rooms/process-controlled">
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={PROCESS_CARD} alt="Process-Controlled Rooms" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a" }}>Process-Controlled Rooms</h3>
                    <p data-animation="slideRight" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>Full process control rooms for aerospace, defense, and precision manufacturing.</p>
                  </div>
                </div>
              </Link>
              <Link key="Enclosed Work Environments" href="/products/environmental-rooms/enclosed-work">
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={ENCLOSED_CARD} alt="Enclosed Work Environments" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a" }}>Enclosed Work Environments</h3>
                    <p data-animation="slideRight" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>Clean, enclosed work environments for sensitive assembly and inspection.</p>
                  </div>
                </div>
              </Link>
          </div>
          <div className="mt-10 p-8 border border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.5rem" }}>Need a Custom Solution?</h3>
                <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7 }}>Our engineers can design a system around your exact facility, process, and throughput requirements.</p>
              </div>
              <Link data-animation="slideRight" href="/contact/request-a-quote"><span className="btn-glow flex-shrink-0">Get Pricing <ArrowRight size={14} /></span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
