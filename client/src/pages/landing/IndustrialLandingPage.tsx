import { Link } from "wouter";
import { useSEO } from '@/hooks/useSEO';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";

const HELIOS_RENDER = "/manus-storage/pfs-helios-render_a6bd90e8.jpg";
const WAREHOUSE_1 = "/manus-storage/pfs-industrial-warehouse-1_2dd99e66.png";
const WAREHOUSE_2 = "/manus-storage/pfs-industrial-warehouse-2_0917049d.png";

const FEATURES = [
  {
    title: "ETL & ETL-C Listed",
    body:
      "Every PFS industrial booth ships built with ETL/UL listed components and ETL-C listed — covering both US and Canadian safety codes. Independent third-party certification means your inspection goes smoothly and your compliance documentation is complete before the booth arrives on site.",
  },
  {
    title: "High-Output LED Lighting",
    body:
      "Integrated four-tube, inside-access light fixtures deliver uniform, shadow-free illumination across the entire work envelope. All fixtures are ETL and ETL-C listed and ship with energy-efficient LED lamps as standard — no upgrade required.",
  },
  {
    title: "UL-Listed Fans & Motors",
    body:
      "Non-sparking tube-axial exhaust fans with belt guards and duct connector rings move high volumes of air efficiently and safely. Motors are UL/CUL and CSA recognized, three-phase, TEFC, tri-voltage — built for continuous industrial duty.",
  },
  {
    title: "Heavy-Duty Doors",
    body:
      "Swing-type product doors and personnel doors feature plate-steel hinges with replaceable brass bushings. The hardware is engineered for decades of daily use — no sagging, no misalignment, no downtime from door failures.",
  },
  {
    title: "UL 508A Control Panels",
    body:
      "Non-pressurized booths ship with an electromechanical panel controlling exhaust, safety interlocks, and lighting. Pressurized configurations include our core control panel with spray, flash, and cure modes, programmable alarms, auto-balance, and automatic safety checks.",
  },
  {
    title: "Galvanized Steel Construction",
    body:
      "Structural steel columns and beams support single-skin, 18-gauge G90 galvanized panels assembled from the ground up. Pre-punched panels ensure consistent alignment, and solid nut-and-bolt construction eliminates flex — even in large-format configurations.",
  },
];

const CERTS = [
  "ETL/UL Listed Components — USA & Canada",
  "UL 508A Certified Manufacturer",
  "Built to NFPA 33",
  "OSHA Compliant",
  "Made in USA — Santa Rosa, CA",
];

export default function IndustrialLandingPage() {
  useSEO({
    title: "Industrial Spray Booths & Finishing Equipment | PFS Factory-Direct",
    description: "PFS manufactures industrial spray paint booths, powder coating systems, industrial ovens, and blast equipment. ETL-certified, NFPA 33 compliant, factory-direct pricing. Serving aerospace, automotive, military, and industrial markets.",
    canonical: "/industrial",
  });

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-white pt-16">
        {/* Product render — full width, no crop, no distortion */}
        <div className="w-full flex items-center justify-center bg-white px-4 sm:px-8 py-10 sm:py-16">
          <img
            src={HELIOS_RENDER}
            alt="PFS Helios Industrial Paint Booth"
            className="w-full max-w-5xl object-contain"
            style={{ maxHeight: "70vh" }}
          />
        </div>

        {/* Headline block — dark band below render */}
        <div className="bg-[#111] text-white px-6 py-12 sm:py-16 text-center">
          <p className="section-label mb-3" style={{ color: "#1B2B4B" }}>
            PFS HELIOS SERIES
          </p>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Industrial Paint Booths<br className="hidden sm:block" /> for Large Equipment &amp; Heavy Machinery
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Engineered for operations that can't afford downtime. manufactured in the USA with ETL/UL listed and UL 508A certified components, and manufactured in the USA — custom-sized to fit your equipment, not the other way around.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-glow px-8 py-4 text-base font-bold tracking-widest uppercase">
                Get Pricing →
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white px-8 py-4 text-base font-bold tracking-widest uppercase hover:bg-white hover:text-[#111] transition-colors">
                Talk to an Engineer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CERT STRIP ───────────────────────────────────────── */}
      <section className="bg-[#f4f4f2] border-y border-gray-200 py-4 overflow-x-auto">
        <div className="flex items-center justify-center gap-6 sm:gap-10 px-6 flex-wrap">
          {CERTS.map((c) => (
            <div key={c} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[#1B2B4B] text-lg">✓</span>
              <span className="text-xs sm:text-sm font-semibold text-[#111] uppercase tracking-wider">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAREHOUSE PHOTOS ─────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="section-label text-center mb-2" style={{ color: "#1B2B4B" }}>BUILT AT SCALE</p>
          <h2 className="text-2xl sm:text-4xl font-black text-center text-[#111] mb-10">
            Manufactured in Our Santa Rosa, CA Facility
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="overflow-hidden">
              <img
                src={WAREHOUSE_1}
                alt="PFS industrial booth in warehouse — side view"
                className="w-full h-64 sm:h-80 object-cover object-center"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src={WAREHOUSE_2}
                alt="PFS large-format industrial booth in warehouse — front view"
                className="w-full h-64 sm:h-80 object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA ─────────────────────────────────────── */}
      <section className="bg-[#1B2B4B] py-10 px-6 text-center text-white">
        <h2 className="text-xl sm:text-3xl font-black tracking-tight mb-3">
          Ready to spec your industrial booth?
        </h2>
        <p className="text-white/80 mb-6 text-sm sm:text-base max-w-xl mx-auto">
          We ship nationally. Our engineers will size the booth to your equipment and provide a complete quote within one business day.
        </p>
        <Link href="/contact">
          <button className="bg-white text-[#1B2B4B] px-8 py-4 font-black tracking-widest uppercase text-sm hover:bg-gray-100 transition-colors">
            Get Pricing →
          </button>
        </Link>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="section-label text-center mb-2" style={{ color: "#1B2B4B" }}>WHAT'S INCLUDED</p>
          <h2 className="text-2xl sm:text-4xl font-black text-center text-[#111] mb-12">
            Every Booth. Every Feature. No Upsells.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-t-2 border-[#1B2B4B] pt-5">
                <h3 className="text-base font-black uppercase tracking-wide text-[#111] mb-3">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="bg-[#111] py-16 px-6 text-center text-white">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
          Get a Quote on Your Industrial Booth in 24 Hours
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Tell us your equipment dimensions and we'll build the spec. manufactured in the USA with ETL/UL listed and UL 508A certified components, and made in the USA — delivered and installed nationwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <button className="btn-glow px-10 py-4 text-base font-bold tracking-widest uppercase">
              Get Pricing →
            </button>
          </Link>
          <a href="tel:8885457715">
            <button className="border border-white text-white px-10 py-4 text-base font-bold tracking-widest uppercase hover:bg-white hover:text-[#111] transition-colors">
              (888) 545-7715
            </button>
          </a>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
    </div>
  );
}
