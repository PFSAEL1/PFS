/**
 * PFS Bay Area Spray Booth Service Landing Page
 * Route: /spray-booth-service-bay-area
 * SEO: Targets BAAQMD Regulation 8 Rule 27, Bay Area spray booth service, paint booth repair San Francisco Oakland San Jose
 */
import { Link } from "wouter";
import { ArrowRight, Phone, CheckCircle, MapPin, Clock, Shield, Wrench, Star, Filter } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/pfs-service-hero-img_017cbbfb.jpg";

const BAY_AREA_COUNTIES = [
  "Alameda County", "Contra Costa County", "Marin County", "Napa County",
  "San Francisco County", "San Mateo County", "Santa Clara County",
  "Solano County", "Sonoma County",
];

const BAY_AREA_CITIES = [
  // Alameda County
  "Oakland", "Fremont", "Hayward", "Berkeley", "Livermore", "San Leandro",
  "Pleasanton", "Union City", "Newark", "Emeryville", "Alameda",
  // Santa Clara County
  "San Jose", "Sunnyvale", "Santa Clara", "Mountain View", "Palo Alto",
  "Milpitas", "Cupertino", "Campbell", "Los Gatos", "Gilroy", "Morgan Hill",
  // San Francisco
  "San Francisco",
  // San Mateo County
  "San Mateo", "Redwood City", "Daly City", "South San Francisco", "Burlingame",
  "San Bruno", "Foster City", "Millbrae", "Pacifica", "Half Moon Bay",
  // Contra Costa County
  "Concord", "Richmond", "Antioch", "Walnut Creek", "Pittsburg", "Brentwood",
  "San Ramon", "Martinez", "Hercules", "El Cerrito", "Pinole",
  // Sonoma County
  "Santa Rosa", "Petaluma", "Rohnert Park", "Windsor", "Healdsburg", "Sebastopol",
  // Napa County
  "Napa", "American Canyon", "Calistoga", "St. Helena",
  // Marin County
  "San Rafael", "Novato", "Mill Valley", "Fairfax",
  // Solano County
  "Fairfield", "Vallejo", "Vacaville", "Benicia", "Dixon",
];

const INDUSTRIES = [
  {
    name: "Automotive & Collision Repair",
    desc: "Auto body shops and collision centers operating under BAAQMD Regulation 8 Rule 27. Compliant booth service, filter programs, and annual NFPA 33 inspections for Bay Area facilities.",
  },
  {
    name: "Aerospace & Defense",
    desc: "Aircraft refinishing and component coating facilities in the Bay Area. NESHAP 6H/6I, CARB aerospace coatings, and explosion-proof equipment service for Silicon Valley and East Bay defense contractors.",
  },
  {
    name: "Technology & Electronics Manufacturing",
    desc: "Precision coating and clean-room finishing systems for semiconductor, electronics, and advanced manufacturing operations throughout Silicon Valley and the greater Bay Area.",
  },
  {
    name: "Truck, Bus & Fleet",
    desc: "Commercial fleets, transit agencies, and specialty vehicle operators in the Bay Area. Large-format booth service, BAAQMD compliance, and filter subscription programs.",
  },
  {
    name: "Heavy Equipment & Industrial",
    desc: "Construction machinery, agricultural equipment, and general industrial coating operations. Oversized booth maintenance and BAAQMD Rule 8-27 compliance documentation.",
  },
  {
    name: "Marine & Shipyard",
    desc: "Vessel refinishing and component coating operations at Bay Area marinas and shipyards. BAAQMD marine coating compliance and specialty booth service.",
  },
  {
    name: "Woodworking & Furniture",
    desc: "Cabinet shops, furniture manufacturers, and millwork operations throughout the Bay Area. BAAQMD wood products coating compliance and filter maintenance programs.",
  },
  {
    name: "Metal Fabrication",
    desc: "Structural steel, architectural metal, and precision fabrication coating operations. BAAQMD Rule 8-19 (metal parts coating) compliance and booth service.",
  },
  {
    name: "Food & Beverage Equipment",
    desc: "Sanitary coating systems and food-grade finishing equipment service for Bay Area food processing and packaging manufacturers.",
  },
  {
    name: "Powder Coating Operations",
    desc: "Powder coating booth maintenance, reclaim system service, and filter programs for Bay Area powder coating job shops and in-house finishing operations.",
  },
];

const SERVICES = [
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    desc: "Scheduled PM programs keep your booth running at peak efficiency. Filter changes, fan inspection, motor checks, lighting, and full airflow verification — documented for BAAQMD and CARB compliance records.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Service",
    desc: "Booth down? Our Bay Area technicians respond fast. Same-day and next-day emergency service throughout the nine-county Bay Area. We carry OEM parts on our service trucks to minimize downtime.",
  },
  {
    icon: Shield,
    title: "BAAQMD Compliance Inspections",
    desc: "Annual booth inspections to BAAQMD Regulation 8 Rule 27, NFPA 33, OSHA 1910.107, and CARB standards. Written inspection reports suitable for regulatory submittal and insurance documentation.",
  },
  {
    icon: MapPin,
    title: "Installation & Startup",
    desc: "Turnkey installation from site prep through final commissioning. We coordinate with Bay Area building departments, Bay Area Air Quality Management District, and local fire marshals on your behalf.",
  },
  {
    icon: Star,
    title: "Retrofits & Upgrades",
    desc: "Upgrade aging booths to current NFPA 33 and BAAQMD standards. VFD fan drives, UL508A control panel replacements, LED lighting conversions, and airflow rebalancing — extend booth life without full replacement.",
  },
  {
    icon: Filter,
    title: "Parts & Filter Supply",
    desc: "OEM-spec replacement parts, exhaust filters, intake media, fan belts, motors, and control components. Spec-matched to your booth model. Filter subscription programs available through pfsfilters.com.",
  },
];

const WHY_PFS = [
  { icon: Wrench, title: "Manufacturer-Trained Technicians", desc: "Our technicians are trained on PFS equipment and all major booth brands. We know what to look for because we build the booths ourselves." },
  { icon: Clock, title: "Bay Area Headquarters", desc: "PFS is headquartered in Santa Rosa — the heart of the Bay Area's North Bay. Same-day and next-day service throughout the nine-county region." },
  { icon: Shield, title: "BAAQMD Compliance Documentation", desc: "Every service visit generates documentation suitable for BAAQMD, CARB, OSHA, and insurance records. Stay audit-ready year-round." },
  { icon: Star, title: "OEM Parts & Filters", desc: "We stock spec-matched filters, fan components, motors, and control parts. No waiting on third-party suppliers for common wear items." },
];

export default function BayAreaServicePage() {
  useSEO({
    title: "Bay Area Spray Booth Service | BAAQMD Compliant | PFS — Santa Rosa, CA",
    description: "PFS provides spray booth service, repair, and BAAQMD compliance inspections throughout the nine-county San Francisco Bay Area. Factory-trained technicians, 24/7 emergency response, NFPA 33 and CARB documentation. Serving Oakland, San Jose, San Francisco, Fremont, Concord, and all Bay Area counties.",
    canonical: "/spray-booth-service-bay-area",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Platinum Finishing Systems — Bay Area Spray Booth Service",
        "url": "https://platinumfinishingsystems.com/spray-booth-service-bay-area",
        "telephone": "+18885457715",
        "email": "info@pfsspraybooths.com",
        "description": "PFS provides spray booth service, repair, BAAQMD compliance inspections, and filter programs throughout the nine-county San Francisco Bay Area. Factory-trained technicians, 24/7 emergency response, NFPA 33, CARB, NESHAP, and OSHA compliant.",
        "address": { "@type": "PostalAddress", "addressLocality": "Santa Rosa", "addressRegion": "CA", "postalCode": "95401", "addressCountry": "US" },
        "geo": { "@type": "GeoCoordinates", "latitude": 38.4404, "longitude": -122.7141 },
        "areaServed": [
          { "@type": "County", "name": "Alameda County" },
          { "@type": "County", "name": "Contra Costa County" },
          { "@type": "County", "name": "Marin County" },
          { "@type": "County", "name": "Napa County" },
          { "@type": "County", "name": "San Francisco County" },
          { "@type": "County", "name": "San Mateo County" },
          { "@type": "County", "name": "Santa Clara County" },
          { "@type": "County", "name": "Solano County" },
          { "@type": "County", "name": "Sonoma County" },
          { "@type": "City", "name": "San Francisco" }, { "@type": "City", "name": "Oakland" },
          { "@type": "City", "name": "San Jose" }, { "@type": "City", "name": "Fremont" },
          { "@type": "City", "name": "Santa Rosa" }, { "@type": "City", "name": "Concord" },
          { "@type": "City", "name": "Berkeley" }, { "@type": "City", "name": "Hayward" },
          { "@type": "City", "name": "Sunnyvale" }, { "@type": "City", "name": "Palo Alto" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Bay Area Spray Booth Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "BAAQMD Regulation 8 Rule 27 Compliance Inspections" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Booth Preventive Maintenance" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NFPA 33 Compliance Inspections" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NESHAP Compliance Inspections" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Emergency Spray Booth Repair" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Booth Installation & Startup" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Booth Retrofits & Upgrades" } }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is BAAQMD Regulation 8 Rule 27 and how does it affect my spray booth?",
            "acceptedAnswer": { "@type": "Answer", "text": "BAAQMD Regulation 8 Rule 27 governs motor vehicle and mobile equipment coating operations in the nine-county San Francisco Bay Area. It sets VOC limits for primers, topcoats, and specialty coatings, and requires spray booths to meet specific airflow and filtration standards. PFS technicians are trained to Rule 8-27 compliance and provide written inspection documentation for BAAQMD submittal." }
          },
          {
            "@type": "Question",
            "name": "Does PFS service spray booths in the San Francisco Bay Area?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS is headquartered in Santa Rosa and services spray booths throughout all nine Bay Area counties — Alameda, Contra Costa, Marin, Napa, San Francisco, San Mateo, Santa Clara, Solano, and Sonoma. We carry OEM parts on our service trucks for same-day and next-day response." }
          },
          {
            "@type": "Question",
            "name": "Does PFS manufacture spray booths as well as service them in the Bay Area?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS is a manufacturer-direct service provider. We build the Helios, Zenith, and Orion series spray booths at our Santa Rosa, CA facility and service all major brands throughout the Bay Area. Because we build the booths ourselves, our technicians know exactly what to look for." }
          },
          {
            "@type": "Question",
            "name": "What industries does PFS serve in the Bay Area?",
            "acceptedAnswer": { "@type": "Answer", "text": "PFS serves automotive refinishing, aerospace and defense, technology and electronics manufacturing, fleet and commercial vehicles, marine, woodworking and furniture, metal fabrication, food and beverage equipment, and powder coating operations throughout the nine-county Bay Area." }
          },
          {
            "@type": "Question",
            "name": "Does PFS offer emergency spray booth repair in the Bay Area?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS offers 24/7 emergency service throughout the Bay Area. Call (888) 545-7715 for emergency spray booth repair, filter replacement, or compliance documentation. Our Santa Rosa headquarters means fast response times across all nine counties." }
          },
          {
            "@type": "Question",
            "name": "How long has PFS been serving the Bay Area?",
            "acceptedAnswer": { "@type": "Answer", "text": "PFS has been manufacturing and servicing spray booths in California for over 20 years. Our Santa Rosa headquarters puts us at the center of the Bay Area's North Bay, with technicians covering all nine counties." }
          }
        ]
      }
    ] as Record<string, unknown>[]
  });

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{ position: "relative", height: "70vh", minHeight: 520, overflow: "hidden" }}>
        <img
          src={HERO_IMG}
          alt="PFS spray booth service technician Bay Area California"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem", width: "100%" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,168,150,0.9)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", padding: "6px 14px", borderRadius: 4, marginBottom: 20 }}>
              <MapPin size={12} /> BAY AREA — 9 COUNTIES — 20+ YEARS
            </div>
            <h1 style={{ color: "#fff", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
              Bay Area Spray Booth<br />Service & Repair
            </h1>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(0.95rem,2vw,1.15rem)", maxWidth: 560, marginBottom: 12, lineHeight: 1.6 }}>
              BAAQMD Regulation 8 Rule 27 compliant service, repair, and inspections for San Francisco, Oakland, San Jose, and all nine Bay Area counties.
            </p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", marginBottom: 28, letterSpacing: "0.04em" }}>
              NFPA 33 &nbsp;·&nbsp; CARB &nbsp;·&nbsp; BAAQMD &nbsp;·&nbsp; NESHAP &nbsp;·&nbsp; OSHA 1910.107
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/contact/service-request">
                <a className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00a896", color: "#fff", padding: "14px 28px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.2s" }}>
                  REQUEST SERVICE <ArrowRight size={16} />
                </a>
              </Link>
              <a href="tel:+18885457715" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.7)", color: "#fff", padding: "14px 28px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.2s" }}>
                <Phone size={16} /> (888) 545-7715
              </a>
              <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(0,168,150,0.7)", color: "#fff", padding: "14px 28px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.2s" }}>
                <Filter size={16} /> PFS FILTERS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: "#0a1628", padding: "20px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {[
            { label: "Bay Area HQ", value: "Santa Rosa, CA" },
            { label: "Counties Served", value: "All 9" },
            { label: "In California", value: "20+ Years" },
            { label: "Emergency Response", value: "24/7" },
            { label: "Compliance", value: "BAAQMD · CARB · NFPA 33" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "8px 24px", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ color: "#00a896", fontSize: "1.1rem", fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BAAQMD COMPLIANCE SECTION */}
      <section style={{ background: "#fff", padding: "64px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div style={{ color: "#00a896", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>BAAQMD COMPLIANCE</div>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#0a1628", marginBottom: 20, lineHeight: 1.2 }}>
                Bay Area Air Quality Management District — Regulation 8 Rule 27
              </h2>
              <p style={{ color: "#444", lineHeight: 1.7, marginBottom: 16 }}>
                BAAQMD Regulation 8 Rule 27 governs motor vehicle and mobile equipment coating operations across all nine Bay Area counties. It sets VOC limits for primers, topcoats, and specialty coatings, and requires spray booths to meet specific airflow, filtration, and recordkeeping standards.
              </p>
              <p style={{ color: "#444", lineHeight: 1.7, marginBottom: 24 }}>
                PFS technicians are trained to Rule 8-27 compliance requirements and provide written inspection documentation suitable for BAAQMD submittal. Every service visit generates a compliance report covering airflow velocity, filter condition, lighting, electrical safety, and fire suppression system status — the documentation your facility needs to stay audit-ready year-round.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["BAAQMD Reg. 8 Rule 27", "NFPA 33", "CARB", "NESHAP", "OSHA 1910.107", "Cal/OSHA Title 8"].map((tag) => (
                  <span key={tag} style={{ background: "#f0faf9", border: "1px solid #00a896", color: "#00a896", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 4, letterSpacing: "0.05em" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "#f8f9fa", padding: 32, borderRadius: 8, borderLeft: "4px solid #00a896" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0a1628", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>Why Bay Area Facilities Choose PFS</h3>
              {[
                "Manufacturer-direct service — we build the booths we service",
                "BAAQMD Regulation 8 Rule 27 compliance documentation",
                "Santa Rosa headquarters — fast response across all 9 counties",
                "OEM parts inventory on every service truck",
                "20+ years serving California finishing operations",
                "NFPA 33, CARB, NESHAP, and Cal/OSHA compliant inspections",
                "Filter subscription programs through pfsfilters.com",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <CheckCircle size={16} style={{ color: "#00a896", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: "#444", fontSize: "0.9rem", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ background: "#f8f9fa", padding: "64px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#00a896", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>WHAT WE DO</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#0a1628" }}>Bay Area Spray Booth Services</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {SERVICES.map((svc) => (
              <div key={svc.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 28 }}>
                <svc.icon size={28} style={{ color: "#00a896", marginBottom: 14 }} />
                <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0a1628", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{svc.title}</h3>
                <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 16 }}>{svc.desc}</p>
                <Link href="/contact/service-request">
                  <a className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#00a896", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}>
                    REQUEST SERVICE <ArrowRight size={13} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PFS */}
      <section style={{ background: "#0a1628", padding: "64px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#00a896", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>WHY PFS</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#fff" }}>The Bay Area's Manufacturer-Direct Service Provider</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {WHY_PFS.map((item) => (
              <div key={item.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 24 }}>
                <item.icon size={24} style={{ color: "#00a896", marginBottom: 12 }} />
                <h3 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SERVED */}
      <section style={{ background: "#fff", padding: "64px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#00a896", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>INDUSTRIES SERVED</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#0a1628" }}>Bay Area Industries We Serve</h2>
            <p style={{ color: "#666", maxWidth: 600, margin: "12px auto 0", lineHeight: 1.6 }}>
              From Silicon Valley electronics manufacturers to East Bay aerospace contractors, PFS serves every finishing industry across the nine-county Bay Area.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} style={{ background: "#f8f9fa", border: "1px solid #e5e7eb", borderRadius: 8, padding: 20 }}>
                <h3 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0a1628", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{ind.name}</h3>
                <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.6 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA — COUNTIES */}
      <section style={{ background: "#f8f9fa", padding: "64px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#00a896", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>SERVICE AREA</div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#0a1628" }}>All Nine Bay Area Counties</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 40 }}>
            {BAY_AREA_COUNTIES.map((county) => (
              <div key={county} style={{ background: "#fff", border: "2px solid #00a896", borderRadius: 6, padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={14} style={{ color: "#00a896" }} />
                <span style={{ color: "#0a1628", fontWeight: 700, fontSize: "0.85rem" }}>{county}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>Major Cities Served</h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {BAY_AREA_CITIES.map((city) => (
              <span key={city} style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#555", fontSize: "0.8rem", padding: "5px 12px", borderRadius: 4 }}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-LINKS TO OTHER CA PAGES */}
      <section style={{ background: "#fff", padding: "48px 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0a1628" }}>Also Serving All of California</h2>
            <p style={{ color: "#666", marginTop: 8 }}>PFS provides spray booth service, manufacturing, and compliance inspections statewide.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <Link href="/spray-booth-service-california">
              <a className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00a896", color: "#fff", padding: "12px 24px", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", borderRadius: 4, transition: "all 0.2s" }}>
                <MapPin size={14} /> California Service Page <ArrowRight size={14} />
              </a>
            </Link>
            <Link href="/spray-booth-service-los-angeles">
              <a className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0a1628", color: "#fff", padding: "12px 24px", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", borderRadius: 4, transition: "all 0.2s" }}>
                <MapPin size={14} /> Los Angeles Service Page <ArrowRight size={14} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section style={{ background: "#0a1628", padding: "64px 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, marginBottom: 16 }}>
            Ready to Schedule Bay Area Service?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32, lineHeight: 1.6 }}>
            Call our Santa Rosa headquarters or submit a service request online. We respond same-day for emergency calls throughout all nine Bay Area counties.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <Link href="/contact/service-request">
              <a className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00a896", color: "#fff", padding: "16px 32px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.2s" }}>
                REQUEST SERVICE <ArrowRight size={16} />
              </a>
            </Link>
            <a href="tel:+18885457715" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,0.5)", color: "#fff", padding: "16px 32px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.2s" }}>
              <Phone size={16} /> (888) 545-7715
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
