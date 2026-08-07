import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BLAST_IMG_HERO = "/manus-storage/pfs-blast-systems2_36cb5b96.png";
const BLAST_IMG = "/manus-storage/blast-systems-real_c7389401_16a0255c.webp";
const RECLAIM_BLAST = "/manus-storage/pfs-reclaim-blast-booth_bd633d6a.png";
const CONTAINER_BLAST = "/manus-storage/pfs-blast-container_f090af61.png";

const SYSTEMS = [
  {
    label: "Blasting Booths",
    href: "/products/blast-systems/blasting-booths",
    img: BLAST_IMG,
    desc: "Enclosed abrasive blasting booths for surface preparation, rust removal, and coating adhesion — available in multiple sizes for parts and assemblies.",
  },
  {
    label: "Reclaim Blasting Booths",
    href: "/products/blast-systems/reclaim-blasting-booths",
    img: RECLAIM_BLAST,
    desc: "Blasting booths with integrated media recovery systems that capture, clean, and recycle abrasive media for maximum efficiency and reduced operating costs.",
  },
  {
    label: "Containerized Blast Booths",
    href: "/products/blast-systems/containerized-blast-booths",
    img: CONTAINER_BLAST,
    desc: "Self-contained blast booths built into standard shipping containers — portable, deployable, and ready for remote or temporary blasting operations.",
  },
];

const FAQS = [
  { q: "What is the difference between a blast room and a blast booth?", a: "A blast booth is a smaller, enclosed cabinet or room designed for blasting individual parts or small assemblies. A blast room is a larger walk-in enclosure designed for blasting large parts, structural steel, vehicles, or heavy equipment. PFS manufactures both configurations in standard and custom sizes." },
  { q: "What abrasive media can be used in a PFS blast room?", a: "PFS blast rooms are compatible with a wide range of abrasive media including steel shot, steel grit, aluminum oxide, glass bead, garnet, and plastic media. The dust collection and media reclaim systems are sized and configured based on the specific media type and blasting volume." },
  { q: "What is a media reclaim system and do I need one?", a: "A media reclaim system captures spent abrasive media from the blast room floor, cleans it to remove dust and fines, and returns reusable media to the blast pot for reuse. Reclaim systems significantly reduce media consumption and disposal costs. They are recommended for any operation using steel shot, steel grit, or other recyclable abrasives." },
  { q: "What ventilation and dust collection does a blast room require?", a: "Blast rooms require sufficient airflow to maintain visibility during blasting and to capture airborne dust before it escapes the enclosure. OSHA and NFPA standards govern ventilation rates and dust collection requirements. PFS blast rooms are engineered with cartridge dust collectors sized to meet these requirements for the specific media and blasting volume." },
  { q: "Can a blast room be customized for large parts or aerospace applications?", a: "Yes. PFS engineers blast rooms to accommodate virtually any part size or application requirement — including aircraft components, rail cars, structural steel, and heavy equipment. We can design custom door configurations, overhead crane clearances, floor systems, and lighting layouts to meet your specific operational needs." },
];

export default function BlastSystemsHub() {
  useSEO({
    title: "Blast Rooms & Abrasive Blast Booths | Media Reclaim Systems | PFS",
    description: "PFS blast rooms and abrasive blast booths are engineered for steel shot, aluminum oxide, garnet, and glass bead blasting. Cartridge dust collection, media reclaim, OSHA compliant ventilation, custom sizes. Factory-direct from Santa Rosa, CA. Built with ETL/UL listed components.",
    canonical: "/products/blast-systems",
  });

  return (
    <div>
      <PageHero
        title="Blasting Systems"
        subtitle="PFS blasting systems are engineered for heavy-duty surface preparation — from compact enclosed booths to large-scale reclaim systems and portable containerized units."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Blasting Systems" }]}
        bgImage={BLAST_IMG_HERO}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-10">
            <span className="section-label">Blasting Systems</span>
            <h2 data-animation="slideLeft" className="section-heading">Choose Your Configuration</h2>
            <p data-animation="slideLeft" className="section-body max-w-2xl">PFS blasting systems are built for demanding surface preparation applications — protecting workers, containing media, and capturing dust. Available in standard and custom configurations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYSTEMS.map((s) => (
              <Link key={s.label} href={s.href}>
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={s.img} alt={s.label} className="w-full h-full transition-transform duration-500 group-hover:scale-105" style={{ objectFit: "cover", objectPosition: s.img.includes("blast-systems2") ? "center 60%" : "center" }} />
                  </div>
                  <div className="p-5">
                    <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.4rem" }}>{s.label}</h3>
                    <p data-animation="slideRight" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 p-8 border border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.5rem" }}>Need a Custom Blasting Solution?</h3>
                <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7 }}>Our engineers can design a blasting system around your specific part sizes, media type, and facility requirements.</p>
              </div>
              <Link href="/contact/request-a-quote?from=blast-booth" data-animation="slideRight"><span className="btn-glow flex-shrink-0">Get Pricing <ArrowRight size={14} /></span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ background: "#f9f9f9", padding: "4rem 0" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(({ q, a }) => ({
              "@type": "Question",
              "name": q,
              "acceptedAnswer": { "@type": "Answer", "text": a }
            }))
          })
        }} />
        <div className="container" style={{ maxWidth: "860px" }}>
          <p style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a3a6b", marginBottom: "0.75rem" }}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: "#0d1b2a", marginBottom: "2.5rem", lineHeight: 1.1 }}>Blast Room & Blast Booth FAQ</h2>
          {FAQS.map(({ q, a }, i) => (
            <details key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
              <summary style={{ fontFamily: "'Chakra Petch','Barlow Condensed',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#0d1b2a", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {q}
                <span style={{ fontSize: "1.25rem", color: "#1a3a6b", flexShrink: 0, marginLeft: "1rem" }}>+</span>
              </summary>
              <p style={{ fontFamily: "'Archivo Narrow','Inter',sans-serif", fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.75, marginTop: "0.75rem" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
