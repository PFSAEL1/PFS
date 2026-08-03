/*
 * PFS Navbar — GFS Corporate Style with Expandable Product Mega-Menu
 * Dual-bar: dark utility bar + white main nav
 * Product menu: accordion-style sections, sub-items hidden until category is clicked
 * Fonts: Barlow Condensed (nav) + Inter (utility)
 * Per Master Sitemap Doc 1 Rev 3 + user additions (Prep category, Aircraft Booths, Inspection, Education, Woodworking)
 */

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, ChevronRight, Phone, Mail, Search, Menu, X } from "lucide-react";

// Official PFS logo — transparent PNG; filter:invert(1) makes it white on dark navbar
const LOGO_URL = "/manus-storage/pfs-logo-white-cropped_4e512383.png";
const LOGO_FALLBACK = false;

interface NavSubItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavSection {
  label: string;
  href: string;
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  href: string;
  bridge?: boolean;
  // For Products: sections with expandable sub-items
  sections?: NavSection[];
  // For non-Products: flat list
  children?: NavSubItem[];
}

// ─── PRODUCTS MEGA-MENU: Each section expands to reveal sub-items ───────────
const PRODUCT_SECTIONS: NavSection[] = [
  {
    label: "Paint Booths",
    href: "/products/paint-booths",
    items: [
      { label: "Enclosed Paint Booths", href: "/products/paint-booths/enclosed" },
      { label: "Wash Booths", href: "/products/paint-booths/wash-booth" },
      { label: "Aerospace Paint Booths", href: "/products/paint-booths/aircraft" },
      { label: "Open Face Paint Booths", href: "/products/paint-booths/open-face" },
      { label: "Outdoor Paint Booths", href: "/products/outdoor-booths" },
      { label: "Custom Paint Booths", href: "/products/paint-booths/custom" },
    ],
  },
  {
    label: "Prep & Support",
    href: "/products/prep-support",
    items: [
      { label: "Prep Stations", href: "/products/prep-support/prep-stations" },
      { label: "Paint Walls", href: "/products/prep-support/paint-walls" },
      { label: "Paint Mix Rooms", href: "/products/prep-support/paint-mix-rooms" },
      { label: "Sanding Booths", href: "/products/prep-support/sanding-booths" },
      { label: "Grinding Booths", href: "/products/prep-support/grinding-booths" },
    ],
  },
  {
    label: "Powder Coating Systems",
    href: "/products/powder-booths",
    items: [
      { label: "Spray to Waste Powder Booths", href: "/products/powder-booths/spray-to-waste" },
      { label: "Powder Reclaim", href: "/products/powder-booths/powder-reclaim" },
      { label: "Automated Powder Systems", href: "/products/powder-booths/automated" },
    ],
  },
  {
    label: "Industrial Ovens",
    href: "/products/ovens",
    items: [
      { label: "Batch Ovens", href: "/products/ovens/batch" },
      { label: "Conveyor Ovens", href: "/products/ovens/conveyor" },
      { label: "Walk-In Ovens", href: "/products/ovens/walk-in" },
      { label: "Large Equipment Ovens", href: "/products/ovens/large-equipment" },
      { label: "Custom Industrial Ovens", href: "/products/ovens/custom" },
    ],
  },
  {
    label: "Blasting Systems",
    href: "/products/blast-systems",
    items: [
      { label: "Blasting Booths", href: "/products/blast-systems/blasting-booths" },
      { label: "Reclaim Blasting Booths", href: "/products/blast-systems/reclaim-blasting-booths" },
      { label: "Containerized Blast Booths", href: "/products/blast-systems/containerized-blast-booths" },
    ],
  },
];

// "View All Products" appended as a flat footer link inside the mega-menu
const VIEW_ALL_PRODUCTS = { label: "View All Products", href: "/products" };

const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    sections: PRODUCT_SECTIONS,
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Collision Repair & Auto Body", href: "/industries/collision-repair" },
      { label: "Aerospace & Defense", href: "/industries/aerospace-defense" },
      { label: "Automotive Manufacturing", href: "/industries/automotive-manufacturing" },
      { label: "Heavy Equipment", href: "/industries/heavy-equipment" },
      { label: "Industrial Manufacturing", href: "/industries/industrial-manufacturing" },
      { label: "Government & Military", href: "/industries/government-military" },
      { label: "View All Industries →", href: "/industries" },
    ],
  },
  {
    label: "Integration & Automation",
    href: "/integration-automation",
    children: [
      { label: "Liquid Paint Lines", href: "/integration-automation/liquid-paint-lines" },
      { label: "Powder Coating Lines", href: "/integration-automation/powder-coating-lines" },
      { label: "Robotic Finishing Cells", href: "/integration-automation/robotic-finishing-cells" },
      { label: "System Integration", href: "/integration-automation/system-integration" },
      { label: "View All →", href: "/integration-automation" },
    ],
  },
  {
    label: "Service, Parts & Filters",
    href: "/service",
    children: [
      { label: "Services Overview", href: "/service" },
      { label: "OEM Parts Store", href: "/parts" },
      { label: "Filters & Consumables", href: "https://pfsfilters.com", external: true },
    ],
  },
  {
    label: "Enclosures & Storage",
    href: "https://advancedextractionlabs.com",
    bridge: true,
    children: [
      { label: "PFS Enclosures & Storage (AEL)", href: "https://advancedextractionlabs.com", external: true },
      { label: "Battery Storage Enclosures", href: "https://advancedextractionlabs.com", external: true },
      { label: "Flammable Storage Containers", href: "https://advancedextractionlabs.com", external: true },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About Us", href: "/company" },
      { label: "Meet the Team", href: "/company/team" },
      { label: "Manufacturing", href: "/company/manufacturing" },
      { label: "Certifications", href: "/company/certifications" },
      { label: "Careers", href: "/company/careers" },
      { label: "News & Press", href: "/company/news" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Resources Overview", href: "/resources" },
      { label: "Downloads", href: "/resources/downloads" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Videos", href: "/resources/videos" },
    ],
  },
];

// ─── PRODUCTS MEGA-MENU COMPONENT ─────────────────────────────────────────
function ProductsMegaMenu() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div
      className="absolute top-full left-0 bg-white z-50"
      style={{
        width: "720px",
        border: "1px solid #e8e8e6",
        borderTop: "3px solid #FFFFFF",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
      }}
    >
      <div className="py-3">
        {/* Two-column grid of expandable sections */}
        <div className="grid grid-cols-2 gap-x-0">
          {PRODUCT_SECTIONS.map((section) => {
            const isOpen = expandedSection === section.label;
            return (
              <div key={section.label} style={{ borderBottom: "1px solid #f5f5f5", gridColumn: "span 1" }}>
                {/* Section header — click to expand */}
                <button
                  className="w-full flex items-center justify-between px-4 py-2.5 group"
                  style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  onClick={() => setExpandedSection(isOpen ? null : section.label)}
                >
                  <Link href={section.href}>
                    <span
                      style={{
                        fontFamily: "'Chakra Petch', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: isOpen ? "#FFFFFF" : "#1C1C1E",
                        transition: "color 0.15s",
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="group-hover:text-[#1B2B4B]"
                    >
                      {section.label}
                    </span>
                  </Link>
                  <ChevronRight
                    size={12}
                    style={{
                      color: isOpen ? "#FFFFFF" : "#999",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s, color 0.15s",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {/* Sub-items — hidden until section is expanded */}
                {isOpen && (
                  <div
                    style={{
                      backgroundColor: "#fafafa",
                      borderTop: "1px solid #f0f0f0",
                      paddingTop: "0.25rem",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    {section.items.map((item) =>
                      item.external ? (
                        <a
                          key={item.href + item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                          fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                          fontSize: "0.78rem",
                          color: "#666",
                          display: "block",
                          padding: "0.28rem 1.5rem",
                          textDecoration: "none",
                          transition: "color 0.15s, background 0.15s",
                        }}
                          className="hover:text-[#1B2B4B] hover:bg-blue-50"
                        >
                          {item.label} ↗
                        </a>
                      ) : (
                        <Link key={item.href + item.label} href={item.href}>
                          <span
                            style={{
                            fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                            fontSize: "0.78rem",
                            color: "#555",
                            display: "block",
                            padding: "0.28rem 1.5rem",
                            transition: "color 0.15s, background 0.15s",
                            cursor: "pointer",
                          }}
                            className="hover:text-[#1B2B4B] hover:bg-blue-50"
                          >
                            {item.label}
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* View All Products footer — uniform with other menus */}
        <div style={{ borderTop: "1px solid #f0f0f0", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
          <Link href={VIEW_ALL_PRODUCTS.href}>
            <span
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#1C1C1E",
                display: "block",
                padding: "0.3rem 1rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              className="hover:text-[#1B2B4B]"
            >
              View All Products →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── SIMPLE DROPDOWN MENU (non-Products) ──────────────────────────────────
function SimpleDropdown({ items, noFeatured = false }: { items: NavSubItem[]; noFeatured?: boolean }) {
  const [showMore, setShowMore] = useState(false);
  const seenMoreIdx = items.findIndex(i => i.label === "__seemore__");
  const visibleItems = seenMoreIdx >= 0 ? items.slice(0, seenMoreIdx) : items;
  const hiddenItems = seenMoreIdx >= 0 ? items.slice(seenMoreIdx + 1) : [];
  const firstItem = noFeatured ? null : visibleItems[0];
  const rest = noFeatured ? visibleItems : visibleItems.slice(1);

  const linkStyle = {
    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
    fontSize: "0.8rem",
    color: "#555",
    display: "block",
    padding: "0.3rem 0.85rem",
    textDecoration: "none",
    transition: "all 0.15s",
    cursor: "pointer",
  };
  const hoverClass = "hover:text-[#1B2B4B] hover:bg-gray-50";

  return (
    <div
      className="absolute top-full left-0 bg-white z-50"
      style={{
        minWidth: "260px",
        border: "1px solid #e8e8e6",
        borderTop: "3px solid #1B2B4B",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
      }}
    >
      <div className="py-3">
        {/* Overview / first item — only shown when noFeatured is false */}
        {firstItem && (
          <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: "0.4rem", paddingBottom: "0.4rem" }}>
            <Link href={firstItem.href}>
              <span
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#1C1C1E",
                display: "block",
                padding: "0.3rem 0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
                className="hover:text-[#1B2B4B]"
              >
                {firstItem.label} →
              </span>
            </Link>
          </div>
        )}
        {rest.map((item) =>
          item.external ? (
            <a key={item.href + item.label} href={item.href} target="_blank" rel="noopener noreferrer"
              style={linkStyle} className={hoverClass}>
              {item.label} ↗
            </a>
          ) : (
            <Link key={item.href + item.label} href={item.href}>
              <span style={linkStyle} className={hoverClass}>{item.label}</span>
            </Link>
          )
        )}
        {/* See More toggle */}
        {hiddenItems.length > 0 && (
          <>
            {showMore && hiddenItems.map((item) =>
              item.external ? (
                <a key={item.href + item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  style={linkStyle} className={hoverClass}>
                  {item.label} ↗
                </a>
              ) : (
                <Link key={item.href + item.label} href={item.href}>
                  <span style={linkStyle} className={hoverClass}>{item.label}</span>
                </Link>
              )
            )}
            <button
              onClick={() => setShowMore(!showMore)}
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "#1B2B4B",
                display: "block",
                padding: "0.35rem 0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginTop: "0.2rem",
                borderTop: "1px solid #f0f0f0",
                width: "100%",
                textAlign: "left",
              }}
            >
              {showMore ? "See Less ↑" : "See More →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN NAVBAR ───────────────────────────────────────────────────────────
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileProdSection, setMobileProdSection] = useState<string | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 z-50" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.1)" }}>
      {/* ── Utility bar ── */}
      <div style={{ backgroundColor: "#1C1C1E", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ paddingTop: "0.38rem", paddingBottom: "0.38rem" }}>
            <div className="flex items-center gap-5">
              <a href="tel:8885457715" className="flex items-center transition-colors"
                style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.62rem", color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                onMouseLeave={e => (e.currentTarget.style.color = "#FFFFFF")}>
                (888) 545-7715
              </a>

              <a href="mailto:info@pfsspraybooths.com" className="hidden lg:flex items-center transition-colors"
                style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.62rem", color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                onMouseLeave={e => (e.currentTarget.style.color = "#FFFFFF")}>
                info@pfsspraybooths.com
              </a>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              {[
                { label: "Order Filters", href: "/filters" },
                { label: "Support", href: "/support" },
                { label: "Contact", href: "/contact" },
                { label: "Distributor", href: "/become-a-distributor" },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <span
                    style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF", transition: "color 0.15s", cursor: "pointer", whiteSpace: "nowrap" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.75)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "#FFFFFF")}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div style={{ backgroundColor: "#1C1C1E", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: "clamp(60px, 8vw, 76px)" }}>
            {/* Logo */}
            <Link href="/">
              <img
                src={LOGO_URL}
                alt="PFS — Platinum Finishing Systems"
                style={{
                  height: "clamp(34px, 4.5vw, 50px)",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  cursor: "pointer",
                  filter: "none",
                }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center h-full">
              {NAV_ITEMS.map((item) => {
                const navItemStyle = {
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: openMenu === item.label ? "#FFFFFF" : "rgba(255,255,255,0.88)",
                  borderBottom: openMenu === item.label ? "2px solid #6BA3E0" : "2px solid transparent",
                  paddingBottom: "2px",
                  cursor: "pointer",
                  whiteSpace: "nowrap" as const,
                  lineHeight: 1,
                };
                return (
                <div key={item.label} className="relative h-full flex items-center"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}>
                  {item.href.startsWith("http") ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div className="flex items-center gap-1 px-2.5 h-full transition-all" style={navItemStyle}>
                        {item.label}
                        {(item.sections || item.children) && (
                          <ChevronDown size={9} style={{ transition: "transform 0.2s", transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
                        )}
                      </div>
                    </a>
                  ) : (
                  <Link href={item.href}>
                    <div className="flex items-center gap-1 px-2.5 h-full transition-all" style={navItemStyle}>
                      {item.label}
                      {(item.sections || item.children) && (
                        <ChevronDown size={9} style={{ transition: "transform 0.2s", transform: openMenu === item.label ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
                      )}
                    </div>
                  </Link>
                  )}
                  {openMenu === item.label && item.sections && <ProductsMegaMenu />}
                  {openMenu === item.label && item.children && <SimpleDropdown items={item.children} noFeatured={true} />}
                </div>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className="hidden xl:flex p-2 transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}>
                <Search size={17} />
              </button>
              <Link href="/contact/request-a-quote">
                <span className="btn-primary hidden md:inline-flex" style={{ padding: "0.6rem 1.3rem", fontSize: "0.72rem" }}>REQUEST INFO</span>
              </Link>
              <button className="xl:hidden p-2" style={{ color: "#FFFFFF" }} onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="xl:hidden overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)", backgroundColor: "#1C1C1E", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          {/* Mobile utility links — always visible */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "0.6rem 1.25rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Order Filters", href: "/filters" },
              { label: "Support", href: "/support" },
              { label: "Contact", href: "/contact" },
              { label: "Become a Distributor", href: "/become-a-distributor" },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <span
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", cursor: "pointer", whiteSpace: "nowrap" }}>
                  {item.label}
                </span>
              </Link>
              ))}
            </div>

          {NAV_ITEMS.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <button className="w-full flex items-center justify-between px-5 py-3.5"
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}>
                <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                  {item.label}
                </span>
                <ChevronDown size={13} className={`text-gray-400 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
              </button>

              {/* Mobile: Products uses accordion sections */}
              {mobileExpanded === item.label && item.sections && (
                <div className="pb-2">
                  {item.sections.map((section) => (
                    <div key={section.label} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <button className="w-full flex items-center justify-between px-7 py-2.5"
                        onClick={() => setMobileProdSection(mobileProdSection === section.label ? null : section.label)}>
                        <Link href={section.href}>
                          <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: mobileProdSection === section.label ? "#FFFFFF" : "rgba(255,255,255,0.65)" }}
                            onClick={(e) => e.stopPropagation()}>
                            {section.label}
                          </span>
                        </Link>
                        <ChevronRight size={11} style={{ color: "#aaa", transform: mobileProdSection === section.label ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
                      </button>
                      {mobileProdSection === section.label && (
                        <div className="pb-1" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                          {section.items.map((sub) =>
                            sub.external ? (
                              <a key={sub.href + sub.label} href={sub.href} target="_blank" rel="noopener noreferrer"
                                style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", display: "block", padding: "0.28rem 2.5rem" }}>
                                {sub.label} ↗
                              </a>
                            ) : (
                              <Link key={sub.href + sub.label} href={sub.href}>
                                <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", display: "block", padding: "0.28rem 2.5rem" }}>
                                  {sub.label}
                                </span>
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {/* View All Products — uniform footer */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "0.25rem", paddingTop: "0.25rem" }}>
                    <Link href="/products">
                      <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", display: "block", padding: "0.5rem 1.75rem" }}>
                        View All Products →
                      </span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Mobile: non-Products flat list */}
              {mobileExpanded === item.label && item.children && (
                <div className="pb-3 px-5 space-y-0.5">
                  {item.children.map((child) =>
                    child.external ? (
                      <a key={child.href + child.label} href={child.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", display: "block", padding: "0.28rem 0" }}>
                        {child.label} ↗
                      </a>
                    ) : (
                      <Link key={child.href + child.label} href={child.href}>
                              <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", display: "block", padding: "0.28rem 0" }}>
                          {child.label}
                        </span>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="p-4">
            <Link href="/contact/request-a-quote">
              <span className="btn-primary w-full justify-center">REQUEST INFO</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
