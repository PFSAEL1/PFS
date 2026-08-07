import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link, useParams } from "wouter";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";

// New original AI-generated images — no internet-sourced photos
const SERVICE_TECH_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-service-tech-1_8685fcab.jpg";
const SERVICE_TEAM = "/manus-storage/pfs-team-photo-rebranded_537b580c.png";

interface SvcContent {
  title: string;
  desc: string;
  body: string;
  features: string[];
  img: string;
  gallery?: string[];
  extraCtas?: { label: string; href: string }[];
}

const CONTENT: Record<string, SvcContent> = {
  "preventive-maintenance": {
    title: "Preventive Maintenance",
    desc: "Scheduled paint booth service programs to keep your equipment running at peak performance — NFPA 33 compliant, OEM-backed, California and nationwide.",
    body: "Most paint booths require professional service every three to six months depending on production volume — high-throughput collision shops and industrial finishing lines may need monthly attention. Without a structured preventive maintenance program, small issues compound into costly equipment downtime, poor finish quality, and compliance violations that can trigger OSHA citations, fire marshal shutdowns, and insurance lapses. PFS offers customized PM programs built around your equipment, production schedule, and regulatory requirements — whether you operate a single collision shop, a multi-location fleet, or a full aerospace finishing line. Because PFS is the original manufacturer of your booth, our factory-trained technicians know your system better than any third-party service company. We carry OEM parts, understand your airflow design, and can identify wear patterns before they become failures. Our PM visits cover filter inspection and replacement, fan motor and belt condition, electrical and controls checks, airflow measurement and balancing, fire suppression system integrity, and a full written service report that satisfies insurance carriers, fire marshals, and OSHA inspectors. For California customers, our technicians are familiar with CARB air quality regulations, South Coast AQMD and Bay Area AQMD requirements, and California OSHA spray finishing standards — so your booth stays compliant with both state and federal requirements. For industrial and aerospace customers, we extend the same rigorous PM standards to conveyor systems, powder coating lines, robotic finishing cells, and large-format ovens — giving your production team a single point of contact for all maintenance needs.",
    features: [
      "Annual or semi-annual service visits",
      "Filter inspection and replacement (OEM media)",
      "Fan motor, belt, and bearing inspection",
      "Electrical and controls check",
      "Airflow measurement and balancing",
      "Fire suppression system integrity check",
      "NFPA 33 and OSHA compliance verification",
      "Detailed written service report",
      "CARB / AQMD compliance support (California)",
      "24/7 emergency response available",
      "Multi-location fleet scheduling available",
    ],
    img: "/manus-storage/pfs-pm-metro-train-booth_87bd97cb.jpeg",
    gallery: [
      "/manus-storage/pfs-install-two-techs-pfs-booth_4d46c025.jpeg",
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
      "/manus-storage/pfs-booth-clean-hero-anon_9dfc3e0e.png",
      "/manus-storage/pfs-booth-inspection-tech_b96d285e.jpeg",
    ],
  },
  "booth-cleaning": {
    title: "Paint Booth Cleaning",
    desc: "Professional OEM cleaning services to maintain finish quality, compliance, and equipment life.",
    body: "A clean booth is a productive booth. Paint overspray, filter dust, and airborne contaminants accumulate on every surface — walls, ceiling, ductwork, exhaust passages, makeup air units, and floor grating. Left unaddressed, buildup degrades finish quality, creates fire hazards, and accelerates equipment wear. PFS offers professional paint booth cleaning performed by factory-trained technicians who know your equipment better than anyone — because we built it. We service PFS booths and other OEM brands with the same thoroughness, making us the preferred cleaning partner for collision repair chains, auto dealership groups, fleet operators, and high-volume industrial finishing facilities. Every cleaning includes a system function check and a written service report. Pair your cleaning with a PFS Filter Rotation Program and we'll manage your filter inventory, ship replacements on schedule, and keep you ahead of compliance — so you never have to think about it.",
    features: [
      "Booth wall, ceiling, and floor cleaning",
      "Duct and exhaust passage cleaning",
      "Makeup air unit cleaning and inspection",
      "Plenum chamber and grating cleanup",
      "Filter replacement (OEM filters available)",
      "Post-clean system function check",
      "Written service report provided",
      "Filter Rotation Program available",
    ],
    img: "/manus-storage/pfs-booth-clean-hero-anon_9dfc3e0e.png",
    gallery: [
      "/manus-storage/pfs-booth-clean-hero-anon_9dfc3e0e.png",
      "/manus-storage/pfs-booth-clean-interior-wide_3d9c498b.jpeg",
      "/manus-storage/pfs-booth-clean-ceiling-anon_f9e7c3f3.png",
      "/manus-storage/pfs-booth-clean-pit-tech_6b452e29.jpeg",
      "/manus-storage/pfs-booth-clean-fan-dirty_1217b0a9.jpeg",
      "/manus-storage/pfs-booth-clean-fan-clean_94da285a.jpeg",
      "/manus-storage/pfs-booth-inspection-tech_b96d285e.jpeg",
      "/manus-storage/pfs-install-two-techs-pfs-booth_4d46c025.jpeg",
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
    ],
    extraCtas: [
      { label: "Shop Intake Filters", href: "/parts" },
      { label: "Shop Exhaust Filters", href: "/parts" },
      { label: "Shop All Filters & Media", href: "/parts" },
    ],
  },
  "emergency-service": {
    title: "Emergency Service",
    desc: "24/7 emergency paint booth repair — fast-response field service when equipment downtime is not an option. Factory-trained technicians, OEM parts, nationwide coverage.",
    body: "When your spray booth or finishing system goes down, every hour of downtime costs you money. For collision repair chains and fleet operators, a downed booth means delayed vehicles, missed deadlines, and frustrated customers. For aerospace and industrial production lines, equipment failure can mean halted contracts, missed delivery windows, and compliance violations that compound the problem. PFS maintains a team of factory-trained field service technicians ready to respond to emergency paint booth repair calls across North America — 24 hours a day, 7 days a week. Unlike third-party service companies, we are the original manufacturer of your equipment. That means we arrive with OEM parts, accurate wiring diagrams, and a deep understanding of your system’s design — ready to resolve the problem, not just diagnose it. Our emergency response process begins with a rapid diagnostic assessment to identify the root cause — whether it’s airflow failure, burner malfunction, electrical fault, controls failure, or contamination. We then execute the repair using OEM parts and industry best practices, followed by comprehensive testing to verify optimal performance before we leave your facility. For California customers, our technicians understand the additional complexity of CARB air quality regulations and California OSHA spray finishing standards — so emergency repairs are completed in a way that keeps you compliant. Common emergency service calls include booth fan motor failure, burner ignition failure, control panel faults, filter system blockage, exhaust system failure, and fire suppression system alarms. If your equipment is down right now, call our 24/7 emergency line at (888) 545-7715.",
    features: [
      "24/7 emergency dispatch — (888) 545-7715",
      "Same-day or next-day response target",
      "Factory-trained technicians",
      "OEM parts carried on service vehicles",
      "Root cause diagnostic approach",
      "Nationwide coverage",
      "Detailed service documentation provided",
      "Collision shop and fleet operator priority",
      "Industrial and aerospace production support",
      "CARB / OSHA compliant repairs (California)",
    ],
    img: "/manus-storage/pfs-emergency-service-tech-white-bg_b022a364.png",
    gallery: [
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
      "/manus-storage/pfs-booth-inspection-tech_b96d285e.jpeg",
    ],
  },
  "service-plans": {
    title: "Service Plans",
    desc: "Tailored annual service agreements with priority scheduling and discounted parts.",
    body: "For collision repair chains, auto dealership groups, and fleet operators managing multiple locations, a PFS Service Plan converts unpredictable maintenance costs into a fixed, budgetable annual investment. Choose from basic PM coverage to comprehensive all-inclusive plans that bundle scheduled visits, priority emergency response, discounted OEM filters and parts, and dedicated service coordination across all your sites. For industrial and aerospace customers, our service plans extend the same structure to conveyor systems, robotic finishing cells, powder coating lines, and large-format ovens — giving your production team a single point of contact for all maintenance and emergency needs. Every plan includes a dedicated service coordinator and detailed service history reports.",
    features: [
      "Annual and multi-year plans available",
      "Priority emergency response included",
      "Discounted OEM parts and filters",
      "Annual PM visits included",
      "Multi-location fleet plans available",
      "Dedicated service coordinator",
      "Detailed service history reports",
      "Industrial and aerospace system coverage",
    ],
    img: SERVICE_TEAM,
    gallery: [
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
      "/manus-storage/pfs-pm-metro-train-booth_87bd97cb.jpeg",
    ],
  },
  "retrofits-upgrades": {
    title: "Retrofits & Upgrades",
    desc: "Modernize aging spray booths and finishing equipment with LED lighting, digital controls, energy-efficient filtration, and compliance upgrades. PFS factory-trained technicians, nationwide.",
    body: "Aging finishing equipment doesn’t always need to be replaced — it often needs to be modernized. PFS offers a comprehensive range of spray booth retrofit and upgrade services that extend equipment service life, improve energy efficiency, reduce operating costs, and bring older systems into compliance with current NFPA 33, OSHA, EPA, and ETL standards. High energy costs are one of the most common drivers for retrofit projects. Inefficient exhaust fans, outdated heating systems, and undersized makeup air units waste significant energy every operating hour. PFS can optimize your airflow system, upgrade to variable frequency drive (VFD) fan controls, and replace legacy burners with high-efficiency units — reducing energy consumption without sacrificing booth performance. LED lighting upgrades are among the most cost-effective retrofits available. Modern LED tube fixtures deliver superior color rendering for finish inspection, consume a fraction of the energy of fluorescent systems, and last significantly longer — reducing both energy costs and maintenance labor. For compliance-driven upgrades, PFS addresses NFPA 33 violations, OSHA 1910.107 deficiencies, and California CARB or AQMD permit conditions identified during inspections. We replace outdated control panels with modern UL508A-listed enclosures, upgrade fire suppression systems, and install current-generation safety interlocks and monitoring systems. For industrial and aerospace customers, we also upgrade controls and automation systems on existing finishing lines — integrating new PLC platforms, digital flow controls, and Industry 4.0 monitoring systems without requiring full equipment replacement. Every retrofit project begins with a site assessment and written scope of work, so you know exactly what will be done and what it will cost before work begins.",
    features: [
      "LED lighting upgrades",
      "Controls and PLC upgrades",
      "Filtration system upgrades",
      "Energy efficiency improvements",
      "Safety system upgrades",
      "Airflow optimization",
      "Automation and integration upgrades",
      "Compliance and code updates",
    ],
    img: "/manus-storage/pfs-booth-install-jcb_9fc85464.jpg",
    gallery: [
      "/manus-storage/pfs-install-skytrak-amu-1_c0cc771c.jpeg",
      "/manus-storage/pfs-install-skytrak-amu-2_2a7657bb.jpeg",
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
    ],
  },
  "booth-inspections": {
    title: "Booth Inspections",
    desc: "Certified paint booth inspection reports for NFPA 33 compliance, OSHA, fire marshal, and insurance requirements. Factory-trained PFS technicians, California and nationwide.",
    body: "Paint booth operations are subject to regular scrutiny from insurance carriers, fire marshals, OSHA compliance officers, and — in California — air quality management district inspectors. A failed inspection can mean fines, operational shutdowns, and insurance coverage disputes that cost far more than the inspection itself. PFS certified booth inspections provide the comprehensive written documentation you need to satisfy all of these stakeholders — performed by factory-trained technicians who know your equipment and the applicable regulatory standards inside and out. Our inspection process follows a systematic, factory-defined protocol: a comprehensive evaluation of airflow performance, filtration condition, electrical safety, fire suppression system integrity, burner and heating system function, and full NFPA 33 compliance review. We also verify compliance with OSHA 1910.107 spray finishing standards and, for California facilities, CARB air quality regulations and applicable AQMD permit conditions. For industrial and aerospace facilities, our inspections extend to integrated finishing systems, conveyor lines, powder coating systems, and large-format ovens — with reports formatted to meet facility compliance audits and customer quality system requirements. Every inspection results in a detailed written report with corrective action recommendations where applicable. Our reports are accepted by insurance carriers, fire marshals, and regulatory agencies. If violations are identified, PFS can perform the corrective work immediately — no need to coordinate a second vendor.",
    features: [
      "NFPA 33 full compliance review",
      "OSHA 1910.107 spray finishing check",
      "Airflow measurement and verification",
      "Electrical safety inspection",
      "Fire suppression system integrity check",
      "Burner and heating system inspection",
      "CARB / AQMD compliance check (California)",
      "Written inspection report provided",
      "Corrective action recommendations",
      "Insurance and fire marshal accepted reports",
      "Industrial and integrated system inspections",
    ],
    img: "/manus-storage/pfs-booth-inspection-tech_b96d285e.jpeg",
    gallery: [
      "/manus-storage/pfs-booth-inspection-tech_b96d285e.jpeg",
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
      "/manus-storage/pfs-booth-clean-hero-anon_9dfc3e0e.png",
    ],
  },
  "oem-parts": {
    title: "OEM Parts",
    desc: "Genuine PFS replacement parts for all equipment models.",
    body: "Using genuine OEM parts ensures proper fit, function, and warranty compliance. PFS stocks a comprehensive inventory of replacement parts for all current and legacy equipment models, with fast shipping to minimize downtime.",
    features: [
      "Genuine OEM components",
      "All current and legacy models",
      "Fast shipping available",
      "Technical support included",
      "Bulk order discounts",
      "Filter subscription programs",
    ],
    img: SERVICE_TEAM,
    gallery: [
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
    ],
  },
  "installation-services": {
    title: "Installation Services",
    desc: "Professional spray booth installation and construction services — PFS equipment and third-party OEM booths. Permitting, electrical, commissioning, and operator training. California and nationwide.",
    body: "Spray booth installation and construction is a complex, multi-phase project that involves structural assembly, electrical and duct hookup, makeup air unit installation, fire suppression system integration, permitting coordination, and final commissioning — all of which must be executed correctly to meet NFPA 33, OSHA, and local fire marshal requirements. In California, the process is even more demanding: stringent air quality guidelines, CARB and AQMD permit requirements, California OSHA spray finishing standards, and strict city and county building departments add layers of complexity that out-of-state contractors frequently underestimate. PFS has been installing spray booths and finishing systems across California and the western United States for decades. Our certified installation crews handle every phase of the project — from site survey and pre-installation planning through structural assembly, electrical and duct hookup, makeup air unit installation, fire suppression system integration, commissioning, and full operator walkthrough. We coordinate with local building departments, fire departments, and air quality management districts on your behalf, managing the permitting process so your project stays on schedule. We install PFS equipment and other manufacturers’ booths with the same level of care and precision — including Global Finishing Solutions, Col-Met, Garmat, Blowtherm, and other major brands. For aerospace, robotic finishing, and integrated automation customers, our installation teams work alongside system integrators and general contractors to deliver complex multi-system installations on schedule and to spec. Every installation includes a comprehensive commissioning process, system performance verification, and a full operator training walkthrough — so your team is ready to run the equipment from day one.",
    features: [
      "New spray booth and oven installation",
      "Equipment relocation and reinstallation",
      "Third-party OEM installs (GFS, Col-Met, Garmat, Blowtherm)",
      "Site survey and pre-installation planning",
      "Electrical and duct hookup",
      "Makeup air unit installation",
      "Fire suppression system integration",
      "Permitting coordination (building, fire, AQMD)",
      "CARB / AQMD permit compliance (California)",
      "Commissioning and system performance verification",
      "Operator training and walkthrough",
      "Robotic and conveyor system installation",
      "Aerospace and industrial finishing line builds",
    ],
    img: "/manus-storage/pfs-install-skytrak-amu-1_c0cc771c.jpeg",
    gallery: [
      "/manus-storage/pfs-booth-installation-inprogress_962dcdea.jpg",
      "/manus-storage/pfs-installation-tech-lighting_02711a77.jpg",
      "/manus-storage/pfs-install-skytrak-amu-1_c0cc771c.jpeg",
      "/manus-storage/pfs-install-skytrak-amu-2_2a7657bb.jpeg",
      "/manus-storage/pfs-install-booth-door-1_f5b71f05.jpeg",
      "/manus-storage/pfs-install-booth-door-2_8b249ac1.jpeg",
      "/manus-storage/pfs-install-booth-interior-1_f18934f0.jpeg",
      "/manus-storage/pfs-install-booth-interior-2_ba11fdd0.jpeg",
      "/manus-storage/pfs-install-booth-interior-3_ac41c24f.jpeg",
      "/manus-storage/pfs-install-two-techs-pfs-booth_4d46c025.jpeg",
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
    ],
  },
  "technical-support": {
    title: "Technical Support",
    desc: "Phone and remote diagnostic support from factory-trained PFS engineers.",
    body: "PFS technical support provides phone and remote diagnostic assistance from factory-trained engineers who know your equipment inside and out. Available during business hours with emergency escalation available around the clock.",
    features: [
      "Phone and remote support",
      "Factory-trained engineers",
      "Equipment diagnostics",
      "Parts identification",
      "Wiring and controls support",
      "Emergency escalation available",
    ],
    img: SERVICE_TECH_1,
    gallery: [
      "/manus-storage/pfs-service-truck-onsite_726a2168.jpeg",
      "/manus-storage/pfs-booth-clean-hero-anon_9dfc3e0e.png",
    ],
  },
};

const SEO_META: Record<string, { title: string; description: string }> = {
  "preventive-maintenance": {
    title: "Paint Booth Preventive Maintenance | Scheduled Service Programs | PFS",
    description: "PFS factory-trained technicians provide scheduled paint booth preventive maintenance — filter replacement, airflow verification, NFPA 33 compliance checks. California and nationwide. Call (888) 545-7715.",
  },
  "booth-cleaning": {
    title: "Professional Paint Booth Cleaning | OEM Cleaning Service | PFS",
    description: "PFS professional paint booth cleaning — walls, ductwork, exhaust passages, makeup air units. OEM-backed, factory-trained technicians. Filter Rotation Program available. California and nationwide.",
  },
  "emergency-service": {
    title: "Emergency Paint Booth Repair | 24/7 Field Service | PFS",
    description: "24/7 emergency paint booth repair and spray booth service. Factory-trained PFS technicians, OEM parts on hand, nationwide coverage. Equipment down? Call (888) 545-7715 now.",
  },
  "service-plans": {
    title: "Paint Booth Service Plans | Annual Maintenance Agreements | PFS",
    description: "PFS annual and multi-year paint booth service plans for collision chains, fleet operators, and industrial customers. Priority emergency response, discounted OEM parts, multi-location coordination.",
  },
  "retrofits-upgrades": {
    title: "Spray Booth Retrofits & Upgrades | LED Lighting, Controls, Compliance | PFS",
    description: "Modernize aging spray booths with PFS retrofit services — LED lighting upgrades, digital control panels, VFD fan drives, energy efficiency improvements, NFPA 33 and OSHA compliance upgrades. Nationwide.",
  },
  "booth-inspections": {
    title: "Paint Booth Inspection | NFPA 33 Compliance Reports | PFS",
    description: "Certified paint booth inspections covering NFPA 33, OSHA 1910.107, CARB, and AQMD compliance. Written reports accepted by insurance carriers, fire marshals, and regulatory agencies. California and nationwide.",
  },
  "oem-parts": {
    title: "OEM Paint Booth Parts | Genuine PFS Replacement Parts",
    description: "Genuine OEM replacement parts for all PFS spray booth, oven, and finishing system models. Fast shipping, all current and legacy models, bulk order discounts available.",
  },
  "installation-services": {
    title: "Spray Booth Installation & Construction | Permitting & Commissioning | PFS",
    description: "Professional spray booth installation and construction — PFS equipment and third-party OEM booths. Permitting coordination, electrical, commissioning, operator training. California CARB/AQMD compliant. Nationwide.",
  },
  "technical-support": {
    title: "Paint Booth Technical Support | Factory-Trained Engineers | PFS",
    description: "Phone and remote diagnostic support from factory-trained PFS engineers. Equipment diagnostics, parts identification, wiring and controls support, emergency escalation available.",
  },
};

export default function ServiceSubPage() {
  const params = useParams<{ sub: string }>();
  const sub = params.sub || "";
  const content = CONTENT[sub];
  const seoMeta = SEO_META[sub] || {
    title: "Spray Booth Service & Maintenance | PFS Field Service",
    description: "PFS field service for spray paint booths, industrial ovens, powder coating systems, and blast equipment. Preventive maintenance, filter replacement, burner service, control upgrades, and emergency repair nationwide.",
  };

  useSEO({
    title: seoMeta.title,
    description: seoMeta.description,
    canonical: sub ? `/service/${sub}` : "/service",
  });

  if (!content) {
    return (
      <div>
        <PageHero title="Service" breadcrumbs={[{ label: "Service", href: "/service" }]} />
        <div className="container py-16 text-center">
          <p className="section-body">Page not found. Please use the navigation above.</p>
          <Link href="/service"><span className="btn-glow mt-4 inline-flex">Back to Service</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={content.title}
        subtitle={content.desc}
        breadcrumbs={[{ label: "Service", href: "/service" }, { label: content.title }]}
        bgImage={content.img}
      />
      <section className="py-16 section-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="section-label">Service Details</span>
              <h2 data-animation="slideLeft" className="section-heading">{content.title}</h2>
              <div className="red-divider" />
              <p className="section-body mb-8">{content.body}</p>

              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {content.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle size={15} style={{ color: "#FFFFFF", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#444", lineHeight: 1.65 }}>{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link data-animation="slideLeft" href="/contact/service-request"><span className="btn-glow flex items-center gap-2">Request Service <ArrowRight size={14} /></span></Link>
                <a data-animation="slideRight" href="tel:8885457715" className="btn-outline flex items-center gap-2"><Phone size={14} /> (888) 545-7715</a>
              </div>

              {/* Extra CTAs for Paint Booth Cleaning — filter store links */}
              {content.extraCtas && content.extraCtas.length > 0 && (
                <div className="mt-8 p-5" style={{ background: "#F4F4F2", borderRadius: "2px", borderLeft: "3px solid #1B3A6B" }}>
                  <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    OEM Filters & Replacement Media
                  </h4>
                  <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555", marginBottom: "1rem", lineHeight: 1.6 }}>
                    As the OEM, we stock the exact filters your booth requires. Order directly from our parts store or ask about our Filter Rotation Program — we track your filter life and ship replacements on schedule.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {content.extraCtas.map((cta) => (
                      <Link key={cta.label} href={cta.href}>
                        <span className="btn-outline flex items-center gap-2" style={{ fontSize: "0.78rem" }}>
                          {cta.label} <ArrowRight size={12} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                <img src={content.img} alt={content.title} className="w-full object-cover" style={{ height: "260px" }} />
              </div>

              <div className="p-5" style={{ backgroundColor: "#1C1C1E", borderRadius: "2px" }}>
                <span className="section-label" style={{ color: "#FFFFFF" }}>24/7 Emergency</span>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>Equipment Down?</h4>
                <a href="tel:8885457715" className="btn-glow flex items-center gap-2 justify-center w-full">
                  <Phone size={14} /> (888) 545-7715
                </a>
              </div>

              <div className="p-5 card-hover">
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#1C1C1E", marginBottom: "0.75rem" }}>Request Service</h4>
                <Link href="/contact/service-request">
                  <span className="btn-outline w-full justify-center" style={{ display: "flex" }}>Submit Service Request</span>
                </Link>
              </div>

              <div className="p-5" style={{ backgroundColor: "#F4F4F2", borderRadius: "2px" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Order Parts & Filters</h4>
                <Link href="/parts">
                  <span className="btn-glow flex items-center gap-2 justify-center">
                    PFS Parts Store <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — only shown when gallery images exist */}
      {content.gallery && content.gallery.length > 0 && (
        <section className="py-12" style={{ background: "#F4F4F2" }}>
          <div className="container">
            <span className="section-label">{sub === "installation-services" ? "Installation Gallery" : "Field Service Gallery"}</span>
            <h2 data-animation="slideLeft" className="section-heading" style={{ marginBottom: "1.5rem" }}>Our Work</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}>
              {content.gallery.map((src, i) => (
                <div key={i} style={{ overflow: "hidden", borderRadius: "2px", aspectRatio: "4/3" }}>
                  <img
                    src={src}
                    alt={`${content.title} photo ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
