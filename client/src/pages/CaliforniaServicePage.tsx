/**
 * PFS California Spray Booth Service Landing Page
 * Route: /spray-booth-service-california
 * SEO: Targets CARB/AQMD/NFPA 33 service searches across all California industries and cities
 */

import { Link } from "wouter";
import { ArrowRight, Phone, CheckCircle, MapPin, Clock, Shield, Wrench, Star, Filter } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/img_6135_california_hero_897a79d6.jpg";

const INDUSTRIES = [
  {
    name: "Automotive & Collision Repair",
    desc: "Auto body shops, collision centers, and dealership refinish facilities. CARB Rule 1151, AQMD Rule 1151, and NFPA 33 compliant service and inspections.",
    href: "/industries/collision-repair",
  },
  {
    name: "Automotive Manufacturing",
    desc: "OEM and Tier 1/2 automotive paint lines, primer booths, and topcoat systems. High-volume production booth maintenance and compliance documentation.",
    href: "/industries/automotive-manufacturing",
  },
  {
    name: "Aerospace & Defense",
    desc: "Aircraft refinishing, component coating, and military vehicle paint facilities. NESHAP 6H/6I compliance, CARB aerospace coatings rules, and explosion-proof requirements.",
    href: "/industries/aerospace",
  },
  {
    name: "Truck, Bus & Fleet",
    desc: "Commercial truck fleets, transit agencies, school bus fleets, and specialty vehicle operators. Large-format booth service, filter programs, and AQMD compliance.",
    href: "/industries/truck-bus-fleet",
  },
  {
    name: "Heavy Equipment & Construction",
    desc: "Agricultural equipment, construction machinery, and mining vehicles. Oversized booth maintenance, drive-through configurations, and high-solids coating compliance.",
    href: "/industries/heavy-equipment",
  },
  {
    name: "Industrial Manufacturing",
    desc: "General industrial coating lines, metal fabrication shops, and OEM finishing systems. Preventive maintenance programs and OSHA 1910.107 compliance documentation.",
    href: "/industries/industrial-manufacturing",
  },
  {
    name: "Marine & Boat Building",
    desc: "Boat manufacturers, marine refinishers, and yacht service facilities. Solvent-borne and waterborne coating compliance, humidity control, and large-format booth service.",
    href: "/industries/marine",
  },
  {
    name: "Woodworking & Furniture",
    desc: "Cabinet shops, furniture manufacturers, and millwork facilities. Flammable finish compliance, filter maintenance, and CARB wood products coating regulations.",
    href: "/industries/woodworking",
  },
  {
    name: "Rail & Transit",
    desc: "Passenger rail cars, light rail, and transit vehicle refinishing. Large-format booth service, CARB transit coating rules, and compliance documentation for public agencies.",
    href: "/industries/rail-transit",
  },
  {
    name: "Government & Military",
    desc: "Federal facilities, military bases, and government depots. Security-compliant service protocols, NFPA 33 inspections, and nationwide installation support.",
    href: "/industries/government-military",
  },
  {
    name: "Education & Vocational",
    desc: "Community colleges, trade schools, and vocational programs with spray finishing labs. NFPA 33 compliance inspections, student-safe filter programs, and AHJ documentation.",
    href: "/industries/education",
  },
  {
    name: "Energy & Utilities",
    desc: "Pipeline equipment, utility vehicles, and energy sector coating operations. Hazardous location compliance, explosion-proof equipment service, and OSHA documentation.",
    href: "/industries/energy-utilities",
  },
];

const SERVICE_AREAS = [
  "Los Angeles County", "San Francisco Bay Area", "North Bay / Sonoma County", "Sacramento Valley",
  "Solano County", "Napa Valley", "Marin County", "Contra Costa County",
  "Alameda County", "San Joaquin Valley", "Central Coast", "Orange County",
  "San Diego County", "Inland Empire", "Ventura County",
];

const CA_CITIES = [
  // Southern California
  "Los Angeles", "Long Beach", "Anaheim", "Santa Ana", "Riverside", "San Bernardino",
  "Irvine", "Glendale", "Huntington Beach", "Santa Clarita", "Garden Grove",
  "Oceanside", "Rancho Cucamonga", "Ontario", "Corona", "Lancaster", "Palmdale",
  "Pomona", "Torrance", "Pasadena", "Escondido", "Fullerton", "El Monte",
  "Thousand Oaks", "Simi Valley", "Victorville", "Murrieta", "Temecula",
  "San Diego", "Chula Vista", "National City", "El Cajon", "Santee",
  // Central Valley
  "Fresno", "Bakersfield", "Stockton", "Modesto", "Visalia", "Clovis",
  "Turlock", "Merced", "Madera", "Hanford", "Tulare",
  // Bay Area & Northern California
  "San Jose", "San Francisco", "Oakland", "Fremont", "Santa Rosa",
  "Hayward", "Sunnyvale", "Santa Clara", "Concord", "Vallejo",
  "Berkeley", "Richmond", "Antioch", "Fairfield", "Vacaville",
  "Napa", "Petaluma", "San Rafael", "Novato", "Rohnert Park",
  // Sacramento Region
  "Sacramento", "Elk Grove", "Roseville", "Folsom", "Citrus Heights",
  "Rancho Cordova", "West Sacramento", "Davis", "Woodland", "Chico",
  // Central Coast
  "Salinas", "Santa Barbara", "San Luis Obispo", "Oxnard", "Ventura",
  "Santa Maria", "Lompoc", "Goleta",
];

const SERVICES = [
  {
    icon: <Wrench size={22} color="#1e3a6e" />,
    title: "Preventive Maintenance",
    desc: "Scheduled PM programs keep your booth running at peak efficiency. Filter changes, fan inspection, motor checks, lighting, and full airflow verification — documented for CARB and AQMD compliance records.",
  },
  {
    icon: <Clock size={22} color="#1e3a6e" />,
    title: "24/7 Emergency Service",
    desc: "Booth down? Our California-based technicians respond fast. Same-day and next-day emergency service throughout California. We carry OEM parts on our service trucks to minimize downtime.",
  },
  {
    icon: <Shield size={22} color="#1e3a6e" />,
    title: "NFPA 33 & CARB Compliance Inspections",
    desc: "Annual booth inspections to NFPA 33, OSHA 1910.107, CARB, South Coast AQMD, and Bay Area AQMD standards. Written inspection reports suitable for regulatory submittal and insurance documentation.",
  },
  {
    icon: <CheckCircle size={22} color="#1e3a6e" />,
    title: "Installation & Startup",
    desc: "Turnkey installation from site prep through final commissioning. We coordinate with building officials, A&E firms, and local AHJs. Permitting support, electrical coordination, and closeout documentation included.",
  },
  {
    icon: <ArrowRight size={22} color="#1e3a6e" />,
    title: "Retrofits & Upgrades",
    desc: "Upgrade aging booths to current NFPA 33 and CARB standards. VFD fan drives, UL508A control panel replacements, LED lighting conversions, and airflow rebalancing — extend booth life without full replacement.",
  },
  {
    icon: <Filter size={22} color="#1e3a6e" />,
    title: "Parts & Filter Supply",
    desc: "OEM-spec replacement parts, exhaust filters, intake media, fan belts, motors, and control components. Spec-matched to your booth model. Filter subscription programs available through pfsfilters.com.",
  },
];

const COMPLIANCE_ITEMS = [
  "NFPA 33 — Standard for Spray Application Using Flammable or Combustible Materials",
  "OSHA 1910.107 — Spray Finishing Using Flammable and Combustible Materials",
  "NESHAP — National Emission Standards for Hazardous Air Pollutants (40 CFR Part 63)",
  "CARB — California Air Resources Board spray finishing regulations",
  "South Coast AQMD — Rule 1151 and related spray coating operations rules",
  "Bay Area AQMD — Regulation 8, Rule 27 (Automotive Refinishing Operations)",
  "Sacramento Metro AQMD — spray coating and surface coating regulations",
  "NFPA 86 — Standard for Ovens and Furnaces (cure oven compliance)",
  "IFC Chapter 24 — Flammable Finishes (International Fire Code)",
];

const WHY_PFS = [
  { stat: "20+", label: "Years in California" },
  { stat: "24/7", label: "Emergency Response" },
  { stat: "OEM", label: "Parts & Filters" },
  { stat: "ETL", label: "Listed Equipment" },
];

export default function CaliforniaServicePage() {
  useSEO({
    title: "Spray Booth Service California | Paint Booth Repair & Maintenance | PFS",
    description: "PFS provides spray booth service, repair, maintenance, and NFPA 33 compliance inspections throughout California. CARB, AQMD, NESHAP, and OSHA compliant. Serving automotive, aerospace, fleet, marine, woodworking, industrial, and more. Bay Area, Los Angeles, Sacramento, North Bay, Solano County. Call (888) 545-7715.",
    canonical: "/spray-booth-service-california",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Platinum Finishing Systems — California Spray Booth Service",
        "url": "https://platinumfinishingsystems.com/spray-booth-service-california",
        "telephone": "+18885457715",
        "email": "service@platinumfinishingsystems.com",
        "image": "https://platinumfinishingsystems.com/og-image.jpg",
        "description": "PFS manufactures and services industrial spray paint booths, powder coating systems, and blast equipment throughout California. NFPA 33, CARB, AQMD, NESHAP, and OSHA compliant. 20+ years serving California.",
        "address": { "@type": "PostalAddress", "addressLocality": "Santa Rosa", "addressRegion": "CA", "postalCode": "95401", "addressCountry": "US" },
        "geo": { "@type": "GeoCoordinates", "latitude": 38.4404, "longitude": -122.7141 },
        "areaServed": [
          { "@type": "State", "name": "California" },
          { "@type": "City", "name": "Los Angeles" }, { "@type": "City", "name": "San Francisco" },
          { "@type": "City", "name": "San Jose" }, { "@type": "City", "name": "Sacramento" },
          { "@type": "City", "name": "San Diego" }, { "@type": "City", "name": "Fresno" },
          { "@type": "City", "name": "Oakland" }, { "@type": "City", "name": "Santa Rosa" },
          { "@type": "City", "name": "Bakersfield" }, { "@type": "City", "name": "Anaheim" },
          { "@type": "City", "name": "Riverside" }, { "@type": "City", "name": "Long Beach" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Spray Booth Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Booth Preventive Maintenance" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NFPA 33 Compliance Inspections" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CARB & AQMD Compliance Inspections" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NESHAP Compliance Inspections" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "24/7 Emergency Spray Booth Repair" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Booth Installation & Startup" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Booth Retrofits & Upgrades" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "OEM Parts & Filter Supply" } }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does PFS service spray booths throughout all of California?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS services spray booths throughout all of California — including the Bay Area, Los Angeles County, Sacramento Valley, Central Valley, San Diego, and the Inland Empire. We carry OEM parts on our service trucks to minimize downtime." }
          },
          {
            "@type": "Question",
            "name": "Is PFS CARB and AQMD compliant for spray booth service in California?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS technicians are trained to NFPA 33, CARB, South Coast AQMD, Bay Area AQMD, San Joaquin AQMD, and NESHAP (40 CFR Part 63 Subpart HHHHHH) standards. Every service visit generates written documentation suitable for regulatory submittal and insurance records." }
          },
          {
            "@type": "Question",
            "name": "Does PFS manufacture spray booths as well as service them?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes — PFS is a manufacturer-direct service provider. We build the Helios, Zenith, and Orion series spray booths in Santa Rosa, CA and service all major brands. Because we build the booths ourselves, our technicians know exactly what to look for." }
          },
          {
            "@type": "Question",
            "name": "What industries does PFS serve in California?",
            "acceptedAnswer": { "@type": "Answer", "text": "PFS serves automotive refinishing, aerospace and defense, fleet and commercial vehicles, marine, woodworking and furniture, metal fabrication, powder coating, agricultural equipment, construction equipment, rail and transit, government and military, and general industrial finishing operations throughout California." }
          },
          {
            "@type": "Question",
            "name": "Does PFS offer emergency spray booth repair in California?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. PFS offers 24/7 emergency service throughout California. Same-day and next-day response available in the Bay Area, Los Angeles, Sacramento, and other major metro areas. Call (888) 545-7715 for emergency service." }
          },
          {
            "@type": "Question",
            "name": "What is NFPA 33 and why does my spray booth need an inspection?",
            "acceptedAnswer": { "@type": "Answer", "text": "NFPA 33 is the National Fire Protection Association standard for spray application using flammable or combustible materials. Annual inspections are required by most AHJs (Authorities Having Jurisdiction), insurance carriers, and CARB/AQMD compliance programs. PFS provides written inspection reports suitable for regulatory submittal." }
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
          alt="PFS spray booth service technician inside a California paint booth"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,27,46,0.88) 0%, rgba(13,27,46,0.55) 60%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1.5rem,5vw,5rem)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <MapPin size={14} color="#60a5fa" />
            <span style={{ color: "#60a5fa", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>SERVING ALL OF CALIFORNIA — 20+ YEARS</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem,5.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase", maxWidth: 700 }}>
            Spray Booth Service<br />&amp; Repair — California
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.95rem,1.8vw,1.15rem)", maxWidth: 580, margin: "0 0 12px", lineHeight: 1.6 }}>
            NFPA 33 · CARB · AQMD · NESHAP · OSHA compliant service throughout all of California. Preventive maintenance, emergency repair, compliance inspections, and installation.
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", margin: "0 0 28px" }}>
            Los Angeles County · Bay Area · North Bay · Sacramento · Solano County · Napa · Central Valley · All of California
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="tel:8885457715"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "2px solid #1e3a6e", transition: "all 0.2s" }}
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
            <a
              href="https://pfsfilters.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "#fff", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)", transition: "all 0.2s" }}
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
              <div style={{ color: "#fff", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, fontFamily: "'Chakra Petch', sans-serif" }}>{item.stat}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.label}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["NFPA 33 Compliant", "CARB Compliant", "AQMD Compliant", "NESHAP Compliant", "OSHA Compliant"].map(tag => (
              <span key={tag} style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.1)", padding: "4px 10px" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>FULL-SERVICE CALIFORNIA COVERAGE</p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 12px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Every Spray Booth Service You Need
          </h2>
          <p style={{ color: "#4a5568", fontSize: "1rem", maxWidth: 620, margin: "0 0 48px", lineHeight: 1.6 }}>
            From routine filter changes to full NFPA 33 compliance inspections and emergency repairs — PFS certified technicians cover all makes and models of spray booths throughout California.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
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
          <p style={{ color: "#60a5fa", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>INDUSTRIES SERVED — CALIFORNIA</p>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 12px", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Every Industry. Every Booth Brand.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 620, margin: "0 0 48px", lineHeight: 1.6 }}>
            PFS services spray finishing equipment across all industries in California — from collision repair shops to aerospace facilities, marine yards, transit agencies, and industrial manufacturers.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
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
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>BOOTH DOWN? WE RESPOND FAST.</p>
            <h2 style={{ color: "#fff", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, margin: 0, fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
              24/7 Emergency Service — California
            </h2>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="tel:8885457715"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0d1b2e", padding: "14px 28px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#f0f4ff"; el.style.boxShadow = "0 0 18px rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#fff"; el.style.boxShadow = "none"; }}
            >
              <Phone size={14} /> CALL NOW (888) 545-7715
            </a>
            <Link
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

      {/* COMPLIANCE SECTION */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "start" }}>
          <div>
            <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>CALIFORNIA REGULATORY COMPLIANCE</p>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 16px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
              NFPA 33 · CARB · AQMD<br />NESHAP Compliance Experts
            </h2>
            <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 24px" }}>
              California has the most stringent spray finishing regulations in the country. PFS service technicians are trained to NFPA 33, CARB, South Coast AQMD, Bay Area AQMD, NESHAP, and OSHA 1910.107 standards. Every inspection generates a written report suitable for regulatory submittal and insurance documentation.
            </p>
            <p style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 28px" }}>
              Whether you operate in Los Angeles County, the South Coast Air Basin, the Bay Area Air Basin, or the Sacramento Valley, PFS knows the local district rules that apply to your spray finishing operation. We help you stay compliant and avoid costly violations.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/contact/service-request"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "13px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#2a4f96"; el.style.boxShadow = "0 0 18px rgba(30,58,110,0.6)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#1e3a6e"; el.style.boxShadow = "none"; }}
              >
                SCHEDULE INSPECTION <ArrowRight size={13} />
              </Link>
              <a
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
                <span style={{ color: "#0d1b2e", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Chakra Petch', sans-serif" }}>Standards We Service To</span>
              </div>
              {COMPLIANCE_ITEMS.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <CheckCircle size={14} color="#1e3a6e" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: "#4a5568", fontSize: "0.83rem", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ padding: "clamp(3rem,5vw,4rem) clamp(1.5rem,5vw,5rem)", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>WHERE WE WORK</p>
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 12px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
            All of California — Service Coverage
          </h2>
          <p style={{ color: "#4a5568", fontSize: "0.95rem", maxWidth: 620, margin: "0 0 28px", lineHeight: 1.6 }}>
            PFS is headquartered in Santa Rosa, CA with 20+ years serving California customers. We provide fast response throughout Northern California, the Bay Area, Los Angeles County, and the entire state for installations and major projects.
          </p>

          {/* Counties */}
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1b2e", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Counties &amp; Regions</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
            {SERVICE_AREAS.map(area => (
              <div key={area} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e2e8f0", padding: "8px 14px" }}>
                <MapPin size={12} color="#1e3a6e" />
                <span style={{ color: "#0d1b2e", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.03em" }}>{area}</span>
              </div>
            ))}
          </div>

          {/* Cities */}
          <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1b2e", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Major Cities Served</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {CA_CITIES.map(city => (
              <span key={city} style={{ color: "#4a5568", fontSize: "0.78rem", fontWeight: 600, background: "#fff", border: "1px solid #e2e8f0", padding: "5px 10px" }}>{city}</span>
            ))}
          </div>

          <div style={{ background: "#0d1b2e", padding: "24px 28px", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>BASED IN SANTA ROSA, CA — SERVING ALL OF CALIFORNIA</p>
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

      {/* LA COUNTY CALLOUT */}
      <section style={{ background: "#fff", padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>LOS ANGELES COUNTY</p>
            <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 14px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
              South Coast AQMD Compliance Specialists
            </h2>
            <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.7, margin: "0 0 20px" }}>
              Los Angeles County operates under South Coast AQMD — one of the strictest air quality districts in the nation. PFS technicians are trained on Rule 1151 (Motor Vehicle and Mobile Equipment Non-Assembly Line Coating Operations) and related South Coast AQMD spray coating rules. We provide compliant service, inspection documentation, and filter programs for LA County facilities.
            </p>
            <Link
              href="/spray-booth-service-los-angeles"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1e3a6e", color: "#fff", padding: "13px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#2a4f96"; el.style.boxShadow = "0 0 18px rgba(30,58,110,0.6)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#1e3a6e"; el.style.boxShadow = "none"; }}
            >
              LOS ANGELES SERVICE PAGE <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ background: "#f8f9fa", border: "1px solid #e2e8f0", padding: "24px 28px", minWidth: 260 }}>
            <p style={{ color: "#0d1b2e", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "'Chakra Petch', sans-serif" }}>LA County Districts</p>
            {["South Coast AQMD", "Rule 1151 — Motor Vehicle Coating", "Rule 1107 — Coating of Metal Parts", "Rule 1113 — Architectural Coatings", "Rule 1171 — Solvent Cleaning Operations"].map(r => (
              <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <CheckCircle size={13} color="#1e3a6e" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: "#4a5568", fontSize: "0.8rem", lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PFS */}
      <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", background: "#f8f9fa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#1e3a6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>WHY CHOOSE PFS</p>
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 900, color: "#0d1b2e", margin: "0 0 40px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
            California's Spray Booth Manufacturer<br />&amp; Service Provider
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { icon: <Wrench size={20} color="#1e3a6e" />, title: "Manufacturer-Trained Technicians", desc: "Our technicians are trained on PFS equipment and all major booth brands. We know what to look for because we build the booths ourselves." },
              { icon: <Clock size={20} color="#1e3a6e" />, title: "Fast Response Times", desc: "Santa Rosa headquarters means same-day and next-day service throughout the Bay Area and North Bay. We don't make you wait." },
              { icon: <Shield size={20} color="#1e3a6e" />, title: "Compliance Documentation", desc: "Every service visit generates documentation suitable for CARB, AQMD, NESHAP, OSHA, and insurance records. Stay audit-ready year-round." },
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

      {/* BOTTOM CTA */}
      <section style={{ background: "#1e3a6e", padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,5rem)", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>READY TO GET YOUR BOOTH SERVICED?</p>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 900, margin: "0 0 16px", fontFamily: "'Chakra Petch', sans-serif", textTransform: "uppercase" }}>
          Schedule California Service Today
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.6 }}>
          Call us directly or submit a service request online. We'll confirm your appointment and dispatch a certified PFS technician to your California facility.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
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
          <Link
            href="/service"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "rgba(255,255,255,0.7)", padding: "16px 24px", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.boxShadow = "0 0 16px rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
          >
            VIEW ALL SERVICES <ArrowRight size={13} />
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
