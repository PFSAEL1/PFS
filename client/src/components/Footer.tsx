/*
 * PFS Footer — Modern Industrial Corporate
 * Dark charcoal, multi-column links per full sitemap, red accents
 * Fonts: Chakra Petch (headings) + Archivo Narrow (body)
 */

import { Link } from "wouter";

const LOGO_URL = "/manus-storage/pfs-logo-transparent-clean_ff3046c5.png";

const FOOTER_COLS = [
  {
    heading: "Products",
    links: [
      { label: "Paint Booths", href: "/products/paint-booths" },
      { label: "Powder Coating Systems", href: "/products/powder-booths" },
      { label: "Industrial Ovens", href: "/products/ovens" },
      { label: "Prep & Support", href: "/products/prep-support" },
      { label: "Blasting Systems", href: "/products/blast-systems" },
      { label: "Air Make-Up Units", href: "/products/air-make-up-units" },
      { label: "Environmental Rooms", href: "/products/environmental-rooms" },
      { label: "Parts & Filters", href: "/products/parts-filters" },
      { label: "Integration & Automation", href: "/integration-automation" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Collision Repair & Auto Body", href: "/industries/collision-repair" },
      { label: "Automotive Manufacturing", href: "/industries/automotive-manufacturing" },
      { label: "Aerospace & Defense", href: "/industries/aerospace-defense" },
      { label: "Industrial Manufacturing", href: "/industries/industrial-manufacturing" },
      { label: "Heavy Equipment", href: "/industries/heavy-equipment" },
      { label: "Truck, Bus & Fleet", href: "/industries/truck-bus-fleet" },
      { label: "Rail & Transit", href: "/industries/rail-transit" },
      { label: "Marine", href: "/industries/marine" },
      { label: "Energy & Utilities", href: "/industries/energy-utilities" },
      { label: "Government & Military", href: "/industries/government-military" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Hazardous Location Services", href: "/service/hazardous-location" },
      { label: "California Service", href: "/spray-booth-service-california" },
      { label: "Los Angeles Service", href: "/spray-booth-service-los-angeles" },
      { label: "Bay Area Service", href: "/spray-booth-service-bay-area" },
      { label: "Preventive Maintenance", href: "/service/preventive-maintenance" },
      { label: "Emergency Service", href: "/service/emergency-service" },
      { label: "Service Plans", href: "/service/service-plans" },
      { label: "Retrofits & Upgrades", href: "/service/retrofits-upgrades" },
      { label: "Booth Inspections", href: "/service/booth-inspections" },
      { label: "OEM Parts", href: "/service/oem-parts" },
      { label: "Filters & Consumables", href: "https://pfsfilters.com", external: true },
      { label: "Technical Support", href: "/service/technical-support" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About PFS", href: "/company/about" },
      { label: "Manufacturing", href: "/company/manufacturing" },
      { label: "Certifications", href: "/company/certifications" },
      { label: "Careers", href: "/company/careers" },
      { label: "News & Press", href: "/company/news" },
      { label: "Resources", href: "/resources" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Downloads", href: "/resources/downloads" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#111111" }}>
      {/* Red accent top line */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #FFFFFF 0%, #1B2B4B 100%)" }} />

      {/* Main columns */}
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/">
              <img
                src={LOGO_URL}
                alt="PFS"
                className="mb-5"
                style={{ height: "52px", width: "auto", objectFit: "contain", display: "block", cursor: "pointer" }}
              />
            </Link>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              Industrial spray paint booths, powder booths, ovens, blast systems, and finishing equipment — manufactured in the USA with ETL/UL listed and certified components, for automotive, aerospace, industrial, and more.
            </p>
            <div className="space-y-1.5">
              <a href="tel:8885457715" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", display: "block", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                (888) 545-7715 Toll Free
              </a>

              <a href="mailto:info@pfsspraybooths.com" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", display: "block", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                info@pfsspraybooths.com
              </a>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
                1400 Airport Blvd, Santa Rosa, CA 95403
              </p>
            </div>
            {/* AEL bridge link */}
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <a href="https://www.advancedextractionlabs.com" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", cursor: "pointer", transition: "color 0.15s", textDecoration: "none" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#ff4444")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "#FFFFFF")}>
                Enclosures &amp; Storage (AEL) →
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "white" }}>
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) =>
                  "external" in link && link.external ? (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                        {link.label} ↗
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link href={link.href}>
                        <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", cursor: "pointer", transition: "color 0.15s" }}
                          onMouseEnter={e => ((e.target as HTMLElement).style.color = "white")}
                          onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} PFS, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {[{ label: "Privacy Policy", href: "/legal" }, { label: "Terms of Use", href: "/legal" }, { label: "Sitemap", href: "/sitemap.xml" }].map((item) => (
                <Link key={item.label} href={item.href}>
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", cursor: "pointer", transition: "color 0.15s" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)")}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
