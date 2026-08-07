/**
 * PFS Los Angeles County Spray Booth Service Landing Page
 * Route: /spray-booth-service-los-angeles
 * SEO: Targets South Coast AQMD Rule 1151, LA County spray booth service, paint booth repair Los Angeles
 */

import { Link } from "wouter";
import { ArrowRight, Phone, CheckCircle, MapPin, Clock, Shield, Wrench, Star, Filter } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/pfs-helios-enclosed-booth-real_2bc88039.jpeg";

const LA_COUNTIES = [
  "Los Angeles County", "Orange County", "San Bernardino County", "Riverside County",
  "Ventura County", "San Diego County", "Imperial County", "Kern County",
  "Santa Barbara County",
];

const LA_CITIES = [
  // Los Angeles County
  "Los Angeles", "Long Beach", "Glendale", "Santa Clarita", "Lancaster", "Palmdale",
  "Pomona", "Torrance", "Pasadena", "El Monte", "Downey", "Inglewood",
  "West Covina", "Norwalk", "Burbank", "Compton", "South Gate", "Carson",
  "Hawthorne", "Whittier", "Alhambra", "Lakewood", "Bellflower", "Baldwin Park",
  "Lynwood", "Redondo Beach", "Pico Rivera", "Montebello", "Monterey Park",
  "Gardena", "Culver City", "Covina", "Azusa", "Glendora", "Arcadia",
  "Monrovia", "Temple City", "El Segundo", "Lawndale", "Paramount",
  // Orange County
  "Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "Garden Grove",
  "Fullerton", "Orange", "Costa Mesa", "Mission Viejo", "Westminster",
  "Newport Beach", "Buena Park", "Lake Forest", "Tustin", "Yorba Linda",
  // Inland Empire
  "San Bernardino", "Riverside", "Rancho Cucamonga", "Ontario", "Corona",
  "Fontana", "Moreno Valley", "Rialto", "Victorville", "Murrieta", "Temecula",
  "Perris", "Hemet", "Chino", "Chino Hills", "Upland", "Redlands",
  // Ventura County
  "Oxnard", "Thousand Oaks", "Simi Valley", "Ventura", "Camarillo",
  "Moorpark", "Santa Paula", "Fillmore",
];

const INDUSTRIES = [
  {
    name: "Automotive & Collision Repair",
    desc: "Auto body shops and collision centers operating under South Coast AQMD Rule 1151. Compliant booth service, filter programs, and annual NFPA 33 inspections for LA County facilities.",
  },
  {
    name: "Automotive Manufacturing",
    desc: "OEM and Tier 1/2 automotive paint lines in the LA Basin. High-volume production booth maintenance, South Coast AQMD permit compliance, and documentation.",
  },
  {
    name: "Aerospace & Defense",
    desc: "Aircraft refinishing and component coating facilities in the South Coast Air Basin. NESHAP 6H/6I, CARB aerospace coatings, and explosion-proof equipment service.",
  },
  {
    name: "Truck, Bus & Fleet",
    desc: "Commercial fleets, transit agencies, and specialty vehicle operators in LA County. Large-format booth service, AQMD Rule 1151 compliance, and filter subscription programs.",
  },
  {
    name: "Heavy Equipment & Construction",
    desc: "Construction machinery and agricultural equipment coating operations. Oversized booth maintenance and South Coast AQMD Rule 1107 (metal parts coating) compliance.",
  },
  {
    name: "Industrial Manufacturing",
    desc: "General industrial coating lines and metal fabrication shops in the LA Basin. Preventive maintenance programs, OSHA 1910.107 compliance, and AQMD permit documentation.",
  },
  {
    name: "Marine & Boat Building",
    desc: "Boat manufacturers and marine refinishers in LA and Orange County. Solvent-borne and waterborne coating compliance and large-format booth service.",
  },
  {
    name: "Woodworking & Furniture",
    desc: "Cabinet shops and furniture manufacturers in the Inland Empire and LA County. Flammable finish compliance, filter maintenance, and CARB wood products coating regulations.",
  },
  {
    name: "Rail & Transit",
    desc: "Passenger rail and transit vehicle refinishing for LA Metro and regional agencies. Large-format booth service and South Coast AQMD transit coating compliance.",
  },
  {
    name: "Government & Military",
    desc: "Federal facilities and government depots in the LA Basin. Security-compliant service protocols, NFPA 33 inspections, and compliance documentation for public agencies.",
  },
];

const SERVICES = [
  {
    icon: <Wrench size={22} color="#1e3a6e" />,
    title: "Preventive Maintenance",
    desc: "Scheduled PM programs for LA County facilities. Filter changes, fan inspection, motor checks, lighting, and full airflow verification — documented for South Coast AQMD and CARB compliance records.",
  },
  {
    icon: <Clock size={22} color="#1e3a6e" />,
    title: "24/7 Emergency Service",
    desc: "Booth down in Los Angeles? Our California-based technicians respond fast. Same-day and next-day emergency service throughout LA County and the South Coast Air Basin.",
  },
  {
    icon: <Shield size={22} color="#1e3a6e" />,
    title: "South Coast AQMD Compliance Inspections",
    desc: "Annual booth inspections to NFPA 33, OSHA 1910.107, South Coast AQMD Rule 1151, and CARB standards. Written inspection reports suitable for regulatory submittal and insurance documentation.",
  },
  {
    icon: <CheckCircle size={22} color="#1e3a6e" />,
    title: "Installation & Startup",
    desc: "Turnkey installation from site prep through final commissioning for LA County facilities. We coordinate with local AHJs, building officials, and South Coast AQMD permit requirements.",
  },
  {
    icon: <ArrowRight size={22} color="#1e3a6e" />,
    title: "Retrofits & Upgrades",
    desc: "Upgrade aging booths to current NFPA 33 and South Coast AQMD standards. VFD fan drives, UL508A control panel replacements, LED lighting conversions, and airflow rebalancing.",
  },
  {
    icon: <Filter size={22} color="#1e3a6e" />,
    title: "Parts & Filter Supply",
    desc: "OEM-spec replacement parts, exhaust filters, intake media, fan belts, motors, and control components. Spec-matched to your booth model. Filter subscription programs available through pfsfilters.com.",
  },
];

const AQMD_RULES = [
  "Rule 1151 — Motor Vehicle and Mobile Equipment Non-Assembly Line Coating Operations",
  "Rule 1107 — Coating of Metal Parts and Products",
  "Rule 1113 — Architectural Coatings",
  "Rule 1171 — Solvent Cleaning Operations",
  "Rule 1177 — Aerospace Assembly and Component Manufacturing Operations",
  "Rule 1178 — Further Emission Reductions from Aerospace Operations",
  "NFPA 33 — Standard for Spray Application Using Flammable or Combustible Materials",
  "OSHA 1910.107 — Spray Finishing Using Flammable and Combustible Materials",
  "NESHAP — National Emission Standards for Hazardous Air Pollutants (40 CFR Part 63)",
  "CARB — California Air Resources Board spray finishing regulations",
];

const WHY_PFS = [
  { stat: "20+", label: "Years in California" },
  { stat: "24/7", label: "Emergency Response" },
  { stat: "OEM", label: "Parts & Filters" },
  { stat: "ETL", label: "Listed Equipment" },
];

export default function LosAngelesServicePage() {
  useSEO({
    title: "Spray Booth Service Los Angeles | Paint Booth Repair & AQMD Rule 1151 Compliance | PFS",
    description: "PFS provides spray booth service, repair, maintenance, and South Coast AQMD Rule 1151 compliance inspections throughout Los Angeles County and the South Coast Air Basin. NFPA 33, CARB, NESHAP, and OSHA compliant. Serving automotive, aerospace, fleet, marine, industrial, and all industries. Call (888) 545-7715.",
    canonical: "/spray-booth-service-los-angeles",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Platinum Finishing Systems — Los Angeles Spray Booth Service",
        "url": "https://platinumfinishingsystems.com/spray-booth-service-los-angeles",
        "telephone": "+18885457715",
        "email": "service@platinumfinishingsystems.com",
        "image": "https://platinumfinishingsystems.com/og-image.jpg",
        "description": "PFS manufactures and services industrial spray paint booths throughout Los Angeles County and the South Coast Air Basin. South Coast AQMD Rule 1151, NFPA 33, CARB, NESHAP, and OSHA compliant.",
        "address": { "@type": "PostalAddress", "addressLocality": "Santa Rosa", "addressRegion": "CA", "postalCode": "95401", "addressCountry": "US" },
        "geo": { "@type": "GeoCoordinates", "latitude": 38.4404, "longitude": -122.7141 },
        "areaServed": [
          { "@type": "County", "name": "Los Angeles County" },
          { "@type": "County", "name": "Orange County" },
          { "@type": "County", "name": "San Bernardino County" },
          { "@type": "County", "name": "Riverside County" },
          { "@type": "County", "name": "Ventura County" },
          { "@type": "City", "name": "Los Angeles" }, { "@type": "City", "name": "Long Beach" },
          { "@type": "City", "name": "Anaheim" }, { "@type": "City", "name": "Glendale" },
          { "@type": "City", "name": "Burbank" }, { "@type": "City", "name": "Torrance" },
          { "@type": "City", "name": "Pasadena" }, { "@type": "City", "name": "Pomona" },
          { "@type": "City", "name": "Ontario" }, { "@type": "City", "name": "Riverside" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Los Angeles Spray Booth Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "South Coast AQMD Rule 1151 Compliance Inspections" } },
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
            "name": "What is South Coast AQMD Rule 1151 and how does it affect my spray booth?",
            "acceptedAnswer": { "@type": "Answer", "text": "South Coast AQMD Rule 1151 governs motor vehicle and mobile equipment coating operations in Los Angeles, Orange, Riverside, and San Bernardino counties. It sets VOC limits for primers, topcoats, and specialty coatings, and requires spray booths to meet specific airflow and filtration standards. PFS technicians are trained to Rule 1151 compliance and provide written inspection documentation for AQMD submittal." }
          },
          {
            "@type": "Question",
            "name": "Does PFS service spray booths in Los Angeles County?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS services spray booths throughout Los Angeles County and the entire South Coast Air Basin — including Orange County, San Bernardino County, Riverside County, and Ventura County. We carry OEM parts on our service trucks for same-day and next-day response." }
          },
          {
            "@type": "Question",
            "name": "Does PFS manufacture spray booths as well as service them in Los Angeles?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS is a manufacturer-direct service provider. We build the Helios, Zenith, and Orion series spray booths at our Santa Rosa, CA facility and service all major brands throughout Los Angeles and Southern California. Because we build the booths ourselves, our technicians know exactly what to look for." }
          },
          {
            "@type": "Question",
            "name": "What industries does PFS serve in Los Angeles?",
            "acceptedAnswer": { "@type": "Answer", "text": "PFS serves automotive refinishing, aerospace and defense, fleet and commercial vehicles, marine, woodworking and furniture, metal fabrication, powder coating, entertainment and film industry, and general industrial finishing operations throughout Los Angeles County." }
          },
          {
            "@type": "Question",
            "name": "Does PFS offer emergency spray booth repair in Los Angeles?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS offers 24/7 emergency service throughout Los Angeles County and Southern California. Call (888) 545-7715 for emergency spray booth repair, filter replacement, or compliance documentation." }
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
          alt="PFS spray booth service in Los Angeles County — South Coast AQMD compliant"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,27,46,0.92) 0%, rgba(13,27,46,0.6) 60%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1.5rem,5vw,5rem)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <MapPin size={14} color="#60a5fa" />
            <span style={{ color: "#60a5fa", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>LOS ANGELES COUNTY — SOUTH COAST AQMD SPECIALISTS</span>
          </div>
          <h1 data-animation="slideLeft" style={{ color: "#fff", fontSize: "clamp(2rem,5.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase", maxWidth: 740 }}>
            Spray Booth Service<br />Los Angeles County
          </h1>
          <p data-animation="slideLeft" style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.95rem,1.8vw,1.15rem)", maxWidth: 580, margin: "0 0 12px", lineHeight: 1.6 }}>
            South Coast AQMD Rule 1151 · NFPA 33 · CARB · NESHAP · OSHA compliant service throughout Los Angeles County and the South Coast Air Basin.
          </p>
          <p  style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", margin: "0 0 28px" }}>
            Los Angeles · Long Beach · Anaheim · Riverside · San Bernardino · Orange County · Ventura County · Inland Empire
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a data-animation="slideLeft"
              href="tel:8885457715"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "2px solid #1e3a6e" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#2a4f96"; el.style.boxShadow = "0 0 18px rgba(30,58,110,0.7)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#1e3a6e"; el.style.boxShadow = "none"; }}
            >
              <Phone size={14} /> CALL (888) 545-7715
            </a>
            <Link
              href="/contact/service-request"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "2px solid rgba(255,255,255,0.5)", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.12)"; el.style.boxShadow = "0 0 18px rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
            >
              REQUEST SERVICE <ArrowRight size={14} />
            </Link>
            <a data-animation="slideRight"
              href="https://pfsfilters.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)"}}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.22)"; el.style.boxShadow = "0 0 18px rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.12)"; el.style.boxShadow = "none"; }}
            >
              <Filter size={14} /> PFS FILTERS
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: "#1e3a6e", padding: "20px clamp(1.5rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          {WHY_PFS.map(item => (
            <div key={item.stat} style={{ textAlign: "center" }}>
              <div data-animation="slideLeft" style={{ color: "#fff", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, fontFamily: "'Chakra Petch', sans-serif" }}>{item.stat}</div>
              <div data-animation="slideRight" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.label}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["South Coast AQMD", "NFPA 33 Compliant", "CARB Compliant", "NESHAP Compliant", "OSHA Compliant"].map(tag => (
              <span key={tag} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.1)", padding: "4px 10px" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SOUTH COAST AQMD SECTION */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>
          <div>
            <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>SOUTH COAST AQMD COMPLIANCE</p>
            <h2 data-animation="slideLeft"  style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 16px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
              Rule 1151 &amp; South Coast<br />AQMD Specialists
            </h2>
            <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 20px" }}>
              Los Angeles County and the South Coast Air Basin operate under South Coast AQMD — one of the strictest air quality management districts in the United States. Spray finishing operations in LA County must comply with Rule 1151 (Motor Vehicle and Mobile Equipment Non-Assembly Line Coating Operations) and related South Coast AQMD rules governing VOC emissions, transfer efficiency, and spray booth equipment standards.
            </p>
            <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 28px" }}>
              PFS technicians are trained on South Coast AQMD rules and provide compliant service, inspection documentation, and written reports suitable for AQMD permit compliance, CARB recordkeeping, and insurance documentation. We help LA County facilities stay compliant and avoid costly violations.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link data-animation="slideLeft"
                href="/contact/service-request"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "13px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#2a4f96"; el.style.boxShadow = "0 0 18px rgba(30,58,110,0.6)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#1e3a6e"; el.style.boxShadow = "none"; }}
              >
                SCHEDULE INSPECTION <ArrowRight size={13} />
              </Link>
              <a data-animation="slideRight"
                href="tel:8885457715"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a6e", padding: "13px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid #1e3a6e", transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 0 14px rgba(30,58,110,0.35)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "none"; }}
              >
                <Phone size={13} /> (888) 545-7715
              </a>
            </div>
          </div>
          <div>
            <div style={{ background: "#f8f9fa", padding: "28px 28px 32px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <Shield size={20} color="#1e3a6e" />
                <span style={{ color: "#0d1b2e", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Chakra Petch', sans-serif" }}>AQMD Rules &amp; Standards</span>
              </div>
              {AQMD_RULES.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <CheckCircle size={14} color="#1e3a6e" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: "#4a5568", fontSize: "0.83rem", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>LOS ANGELES COUNTY SERVICE</p>
          <h2 data-animation="slideLeft" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 12px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Every Spray Booth Service You Need
          </h2>
          <p data-animation="slideLeft" style={{ color: "#4a5568", fontSize: "1rem", maxWidth: 620, margin: "0 0 48px", lineHeight: 1.6 }}>
            From routine filter changes to full South Coast AQMD compliance inspections and emergency repairs — PFS certified technicians cover all makes and models of spray booths throughout Los Angeles County.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }} data-animation="fadeIn">
            {SERVICES.map(svc => (
              <div key={svc.title} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "28px 28px 32px", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
                <div style={{ marginBottom: 14 }}>{svc.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0d1b2e", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.03em", fontFamily: "'Chakra Petch', sans-serif" }}>{svc.title}</h3>
                <p style={{ color: "#4a5568", fontSize: "0.875rem", lineHeight: 1.7, margin: "0 0 20px" }}>{svc.desc}</p>
                <Link
                  href="/contact/service-request"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s", padding: "8px 14px", border: "1px solid transparent" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.border = "1px solid #1e3a6e"; el.style.boxShadow = "0 0 12px rgba(30,58,110,0.25)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.border = "1px solid transparent"; el.style.boxShadow = "none"; }}
                >
                  REQUEST SERVICE <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", background: "#0d1b2e" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#60a5fa", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>INDUSTRIES SERVED — LOS ANGELES COUNTY</p>
          <h2 data-animation="slideLeft" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 12px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Every Industry. Every Booth Brand.
          </h2>
          <p data-animation="slideLeft" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 620, margin: "0 0 48px", lineHeight: 1.6 }}>
            PFS services spray finishing equipment across all industries in Los Angeles County and the South Coast Air Basin — from collision repair shops to aerospace facilities, transit agencies, and industrial manufacturers.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }} data-animation="fadeIn">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "22px 24px 26px", transition: "background 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.09)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(96,165,250,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.03em", fontFamily: "'Chakra Petch', sans-serif" }}>{ind.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.65, margin: "0 0 16px" }}>{ind.desc}</p>
                <Link
                  href="/contact/service-request"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#60a5fa", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#93c5fd"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa"; }}
                >
                  REQUEST SERVICE <ArrowRight size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INLINE CTA BAND */}
      <section style={{ background: "#1e3a6e", padding: "clamp(2rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>BOOTH DOWN IN LA? WE RESPOND FAST.</p>
            <h2 data-animation="slideLeft" style={{ color: "#fff", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, margin: 0, fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
              24/7 Emergency Service — Los Angeles County
            </h2>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a data-animation="slideLeft"
              href="tel:8885457715"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0d1b2e", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#f0f4ff"; el.style.boxShadow = "0 0 18px rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#fff"; el.style.boxShadow = "none"; }}
            >
              <Phone size={14} /> CALL NOW (888) 545-7715
            </a> 
            <Link  data-animation="slideRight"
              href="/contact/service-request"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.boxShadow = "0 0 16px rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
            >
              SUBMIT SERVICE REQUEST <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ padding: "clamp(3rem,5vw,4rem) clamp(1.5rem,5vw,5rem)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>WHERE WE WORK</p>
          <h2  data-animation="slideLeft" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 12px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
            Los Angeles &amp; South Coast Air Basin Coverage
          </h2>
          <p data-animation="slideLeft" style={{ color: "#4a5568", fontSize: "0.95rem", maxWidth: 620, margin: "0 0 28px", lineHeight: 1.6 }}>
            PFS serves spray booth customers throughout Los Angeles County, Orange County, the Inland Empire, Ventura County, and the entire South Coast Air Basin. We also service San Diego County and other Southern California locations for installations and major projects.
          </p>

          {/* Counties */}
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1b2e", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Counties Served</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
            {LA_COUNTIES.map(area => (
              <div key={area} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f8f9fa", border: "1px solid #e2e8f0", padding: "8px 14px" }}>
                <MapPin size={12} color="#1e3a6e" />
                <span style={{ color: "#0d1b2e", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.03em" }}>{area}</span>
              </div>
            ))}
          </div>

          {/* Cities */}
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1b2e", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Major Cities Served</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {LA_CITIES.map(city => (
              <span key={city} style={{ color: "#4a5568", fontSize: "0.78rem", fontWeight: 600, background: "#f8f9fa", border: "1px solid #e2e8f0", padding: "5px 10px" }}>{city}</span>
            ))}
          </div>

          <div style={{ background: "#0d1b2e", padding: "24px 28px", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>BASED IN SANTA ROSA, CA — SERVING LOS ANGELES &amp; ALL OF CALIFORNIA</p>
              <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>1400 Airport Blvd, Santa Rosa, CA 95403 · (888) 545-7715</p>
            </div>
            <a
              href="tel:8885457715"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "12px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#2a4f96"; el.style.boxShadow = "0 0 18px rgba(30,58,110,0.7)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#1e3a6e"; el.style.boxShadow = "none"; }}
            >
              <Phone size={14} /> CALL NOW
            </a>
          </div>
        </div>
      </section>

      {/* WHY PFS */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>WHY CHOOSE PFS</p>
          <h2  data-animation="slideLeft" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 40px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
            California's Spray Booth Manufacturer<br />&amp; Service Provider
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }} data-animation="fadeIn">
            {[
              { icon: <Wrench size={20} color="#1e3a6e" />, title: "Manufacturer-Trained Technicians", desc: "Our technicians are trained on PFS equipment and all major booth brands. We know what to look for because we build the booths ourselves." },
              { icon: <Clock size={20} color="#1e3a6e" />, title: "Fast Response Times", desc: "California-based technicians mean same-day and next-day service throughout LA County and the South Coast Air Basin. We don't make you wait." },
              { icon: <Shield size={20} color="#1e3a6e" />, title: "Compliance Documentation", desc: "Every service visit generates documentation suitable for South Coast AQMD, CARB, NESHAP, OSHA, and insurance records. Stay audit-ready year-round." },
              { icon: <Star size={20} color="#1e3a6e" />, title: "OEM Parts & Filters", desc: "We stock spec-matched filters, fan components, motors, and control parts. No waiting on third-party suppliers for common wear items." },
            ].map(item => (
              <div key={item.title} style={{ padding: "24px", border: "1px solid #e2e8f0", background: "#fff" }}>
                <div style={{ marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0d1b2e", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.03em", fontFamily: "'Chakra Petch', sans-serif" }}>{item.title}</h3>
                <p style={{ color: "#4a5568", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALIFORNIA LINK */}
      <section style={{ background: "#fff", padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,5rem)", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p data-animation="slideLeft" style={{ color: "#4a5568", fontSize: "0.85rem", margin: 0 }}>
              Need service in Northern California, the Bay Area, or Sacramento?
            </p>
          </div>
          <Link data-animation="slideRight"
            href="/spray-booth-service-california"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#1e3a6e", padding: "12px 22px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid #1e3a6e", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "0 0 14px rgba(30,58,110,0.3)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = "none"; }}
          >
            VIEW CALIFORNIA SERVICE PAGE <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: "#1e3a6e", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>READY TO GET YOUR BOOTH SERVICED IN LA?</p>
        <h2 data-animation="slideLeft" style={{ color: "#fff", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 900, margin: "0 0 16px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
          Schedule Los Angeles Service Today
        </h2>
        <p data-animation="slideLeft" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.6 }}>
          Call us directly or submit a service request online. We'll confirm your appointment and dispatch a certified PFS technician to your Los Angeles County facility.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a  data-animation="slideLeft"
            href="tel:8885457715"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0d1b2e", padding: "16px 32px", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#f0f4ff"; el.style.boxShadow = "0 0 20px rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#fff"; el.style.boxShadow = "none"; }}
          >
            <Phone size={15} /> CALL (888) 545-7715
          </a>
          <Link
            href="/contact/service-request"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "16px 32px", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "2px solid rgba(255,255,255,0.6)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.1)"; el.style.boxShadow = "0 0 20px rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
          >
            SUBMIT SERVICE REQUEST <ArrowRight size={15} />
          </Link>
          <Link data-animation="slideRight"
            href="/spray-booth-service-california"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "rgba(255,255,255,0.7)", padding: "16px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.boxShadow = "0 0 16px rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
          >
            ALL CALIFORNIA SERVICE <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, display: "flex", background: "#0d1b2e", borderTop: "1px solid rgba(255,255,255,0.1)" }} className="md:hidden">
        <a href="tel:8885457715" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "rgba(255,255,255,0.8)", padding: "14px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
          <Phone size={14} /> (888) 545-7715
        </a>
        <Link href="/contact/service-request" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "14px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
          REQUEST SERVICE <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
