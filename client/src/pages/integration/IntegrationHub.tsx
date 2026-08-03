import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";

const HERO = "/manus-storage/pfs-liquid-paint-line-real_2f9e33d5.jpg";  // Real PFS liquid paint line photo
const HERO_VIDEO = "/manus-storage/pfs-integration-hub-hero_cff3efb1.mp4";
const POWDER = "/manus-storage/pfs-powder-coating-line-real_9473890b.png";
const PAINT = "/manus-storage/pfs-robotics-card_2aac132b.jpg";  // Robotic arms spraying red — Liquid Paint Lines card
const INTEGRATED_SYSTEM = "/manus-storage/pfs-integrated-system-line_ad6dc185.png";  // Real PFS integrated finishing line — conveyor + PFS oven
const ROBOT = "/manus-storage/pfs-robotic-cell-orion-r_4f0c33bb_2d3b524c.png";
// Conveyor: real overhead photo — distinct from the PAINT conveyor render
const CONVEYOR_REAL = "/manus-storage/yellow-conveyor-system_8b253b1f.jpg";  // Real PFS yellow overhead conveyor system
// Pretreatment: spray-system close-up — distinct from the tunnel hero used on the sub-page
const PRETREAT_SPRAY = "/manus-storage/washbooth_75284018.png";

const SOLUTIONS = [
  { label: "Liquid Paint Lines",     slug: "liquid-paint-lines",     img: PAINT,         desc: "Complete automated liquid paint lines from pretreatment through topcoat, engineered for your production requirements." },
  { label: "Powder Coating Lines",   slug: "powder-coating-lines",   img: POWDER,        desc: "Fully integrated powder coating lines including pretreatment, application, and curing systems." },
  { label: "Conveyor Systems",       slug: "conveyor-systems",       img: CONVEYOR_REAL, desc: "Overhead and floor conveyor systems designed to move parts efficiently through your finishing process." },
  { label: "Pretreatment Systems",   slug: "pretreatment-systems",   img: PRETREAT_SPRAY, desc: "Chemical pretreatment systems for cleaning, phosphating, and surface preparation prior to coating." },
  { label: "Robotic Finishing Cells",slug: "robotic-finishing-cells",img: ROBOT,         desc: "Robotic spray and powder application cells for consistent, high-volume automated finishing." },
  { label: "System Integration",     slug: "system-integration",     img: INTEGRATED_SYSTEM, desc: "Integration of new finishing equipment with existing production lines, controls, and facility systems." },
];

export default function IntegrationHub() {
  useSEO({
    title: "Automation & Integration | Turnkey Industrial Finishing Lines | PFS",
    description: "PFS designs and integrates turnkey automated finishing lines including liquid paint lines, powder coating lines, conveyor systems, pretreatment systems, robotic finishing cells, and complete system integration. Factory-direct, ETL certified.",
    canonical: "/integration",
  });

  return (
    <div>
      <PageHero
        title="Integration & Automation"
        subtitle="Beyond individual booths and ovens, PFS engineers complete finishing lines — liquid paint, powder coating, conveyor systems, pretreatment, and robotic cells — all under one roof."
        breadcrumbs={[{ label: "Integration & Automation" }]}
        bgImage={HERO}
        bgVideo={HERO_VIDEO}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
            <div>
              <span className="section-label">Complete Finishing Lines</span>
              <h2 className="section-heading-lg">One Source for Your Entire Finishing System</h2>
              <p className="section-body mb-6">
                Most finishing equipment suppliers sell individual pieces of equipment. PFS is different — we design, engineer, manufacture, and install complete finishing systems, from the first pretreatment stage through the final curing oven.
              </p>
              <p className="section-body mb-8">
                Working with a single source for your entire finishing line eliminates integration headaches, simplifies project management, and ensures every component is designed to work together seamlessly.
              </p>
              <Link href="/contact/talk-to-an-engineer">
                <span className="btn-glow">Talk to a Systems Engineer <ArrowRight size={14} /></span>
              </Link>
            </div>
            <div>
              <img src={POWDER} alt="Automated Finishing Line" className="w-full object-cover" style={{ height: "380px" }} />
            </div>
          </div>

          <div className="mb-10">
            <span className="section-label">Solutions</span>
            <h2 className="section-heading">Integrated Finishing Solutions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((sol) => (
              <Link key={sol.slug} href={`/integration-automation/${sol.slug}`}>
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "220px" }}>
                    <img src={sol.img} alt={sol.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a" }}>{sol.label}</h3>
                      <ChevronRight size={16} style={{ color: "#FFFFFF" }} />
                    </div>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>{sol.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
