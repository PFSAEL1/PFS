import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const POWDER_IMG  = "/manus-storage/pfs-powder-coating-card2_32de7c98.png";
const POWDER_VIDEO = "/manus-storage/powder-coating-real-hero_8075e60b.mp4";  // MP4 hero — real person powder coating
const SPRAY_WASTE = "/manus-storage/pfs-act-dustcollector-spraytowaste_3dd0ec94.jpeg";
const RECLAIM_IMG = "/manus-storage/pfs-powder-reclaim-unit_48f7c437.png";
const AUTO_POWDER = "/manus-storage/pfs-robotics-card_2aac132b.jpg";

const SYSTEMS = [
  {
    label: "Spray to Waste Powder Booths",
    href: "/products/powder-booths/spray-to-waste",
    img: SPRAY_WASTE,
    desc: "Open-face and enclosed powder booths with disposable filter media — ideal for low-volume, multi-color, and job shop operations.",
  },
  {
    label: "Powder Reclaim",
    href: "/products/powder-booths/powder-reclaim",
    img: RECLAIM_IMG,
    desc: "Cyclone and cartridge recovery systems that capture and recycle overspray powder for maximum material efficiency.",
  },
  {
    label: "Automated Powder Systems",
    href: "/products/powder-booths/automated",
    img: AUTO_POWDER,
    desc: "Fully automated powder application systems integrated with conveyor lines and robotic applicators for high-volume production.",
  },
];

export default function PowderBoothsHub() {
  useSEO({
    title: "Powder Coating Booths | Batch & Reclaim Powder Coating Systems | PFS",
    description: "PFS powder coating booths include spray-to-waste and powder reclaim configurations for batch and production powder coating. High-efficiency cartridge filtration, optimal airflow, NFPA 33 and IFC Chapter 24 compliant. ETL/UL listed components. Custom sizes. Manufactured in Santa Rosa, CA.",
    canonical: "/products/powder-booths",
  });

  return (
    <div>
      <PageHero
        title="Powder Coating Systems"
        subtitle="PFS powder coating systems cover the full spectrum — from simple spray-to-waste booths to fully automated reclaim and robotic application systems."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Powder Coating Systems" }]}
        bgImage={POWDER_IMG}
        bgVideo={POWDER_VIDEO}
        bgImagePosition="75% 60%"
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-10">
            <span className="section-label">Powder Coating</span>
            <h2 className="section-heading">Choose Your System</h2>
            <p className="section-body max-w-2xl">From manual job shop booths to fully integrated automated lines, PFS engineers powder coating systems around your part geometry, production volume, and powder chemistry.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYSTEMS.map((s) => (
              <Link key={s.label} href={s.href}>
                <div className="product-card group">
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img src={s.img} alt={s.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.4rem" }}>{s.label}</h3>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 p-8 border border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.5rem" }}>Need a Custom Powder System?</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7 }}>Our engineers can design a complete powder coating system around your exact facility, process, and throughput requirements.</p>
              </div>
              <Link href="/contact/request-a-quote?from=powder-booth"><span className="btn-glow flex-shrink-0">Get Pricing <ArrowRight size={14} /></span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{ background:"#f9f9f9", padding:"4rem 0" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is the difference between a spray-to-waste and a reclaim powder coating booth?",
              "acceptedAnswer": { "@type": "Answer", "text": "A spray-to-waste powder coating booth collects overspray in disposable filters and discards it. A powder reclaim booth uses a cartridge recovery system to collect, clean, and recycle overspray back into the application process, reducing material costs significantly in high-volume operations. PFS manufactures both configurations." } },
            { "@type": "Question", "name": "What CFM do I need for my powder coating booth?",
              "acceptedAnswer": { "@type": "Answer", "text": "Powder coating booth airflow is typically sized between 4,000 and 10,000 CFM depending on booth dimensions, application method, and the specific powder being applied. PFS engineers size each booth to deliver optimal airflow for maximum transfer efficiency and powder containment while meeting NFPA 33 and OSHA requirements." } },
            { "@type": "Question", "name": "Does a powder coating booth need to meet NFPA 33?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Powder coating booths must comply with NFPA 33 and IFC Chapter 24. These standards govern ventilation, electrical classification, fire suppression, and construction requirements. All PFS powder coating booths are designed and built to meet or exceed these requirements." } },
            { "@type": "Question", "name": "Can a powder coating booth be integrated with a curing oven?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS designs and manufactures both powder coating booths and batch or walk-in curing ovens. We can engineer a complete powder coating line or supply individual components to integrate with your existing equipment." } },
            { "@type": "Question", "name": "What industries use powder coating booths?",
              "acceptedAnswer": { "@type": "Answer", "text": "Powder coating booths are used across automotive manufacturing, heavy equipment, aerospace, transit and rail, architectural aluminum, consumer products, and general industrial manufacturing. PFS has supplied powder coating systems to customers in all of these sectors." } }
          ]
        })}} />
        <div className="container" style={{ maxWidth:"860px" }}>
          <p style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#1a3a6b", marginBottom:"0.75rem" }}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:800, color:"#0d1b2a", marginBottom:"2.5rem", lineHeight:1.1 }}>Powder Coating Booth FAQ</h2>
          {[
            { q:"What is the difference between a spray-to-waste and a reclaim powder coating booth?", a:"A spray-to-waste powder coating booth collects overspray in disposable filters and discards it. A powder reclaim booth uses a cartridge recovery system to collect, clean, and recycle overspray back into the application process, reducing material costs significantly in high-volume operations. PFS manufactures both configurations." },
            { q:"What CFM do I need for my powder coating booth?", a:"Powder coating booth airflow is typically sized between 4,000 and 10,000 CFM depending on booth dimensions, application method, and the specific powder being applied. PFS engineers size each booth to deliver optimal airflow for maximum transfer efficiency and powder containment while meeting NFPA 33 and OSHA requirements." },
            { q:"Does a powder coating booth need to meet NFPA 33?", a:"Yes. Powder coating booths must comply with NFPA 33 and IFC Chapter 24. These standards govern ventilation, electrical classification, fire suppression, and construction requirements. All PFS powder coating booths are designed and built to meet or exceed these requirements." },
            { q:"Can a powder coating booth be integrated with a curing oven?", a:"Yes. PFS designs and manufactures both powder coating booths and batch or walk-in curing ovens. We can engineer a complete powder coating line or supply individual components to integrate with your existing equipment." },
            { q:"What industries use powder coating booths?", a:"Powder coating booths are used across automotive manufacturing, heavy equipment, aerospace, transit and rail, architectural aluminum, consumer products, and general industrial manufacturing. PFS has supplied powder coating systems to customers in all of these sectors." },
          ].map(({ q, a }, i) => (
            <details key={i} style={{ borderBottom:"1px solid #e5e7eb", paddingBottom:"1.25rem", marginBottom:"1.25rem" }}>
              <summary style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif", fontSize:"1rem", fontWeight:700, color:"#0d1b2a", cursor:"pointer", listStyle:"none", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                {q}
                <span style={{ fontSize:"1.25rem", color:"#1a3a6b", flexShrink:0, marginLeft:"1rem" }}>+</span>
              </summary>
              <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif", fontSize:"0.95rem", color:"#4b5563", lineHeight:1.75, marginTop:"0.75rem" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
