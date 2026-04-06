/**
 * LightLayout — "Airy Precision" design system
 * Design: Scandinavian editorial minimalism
 * Colors: #FFFFFF / #F4F2EE / #111111 / #1B4FD8 accent
 * Typography: Playfair Display (display) + Inter 300 (body) + Space Mono (labels)
 * Motion: IntersectionObserver clip-path reveals, CSS parallax
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

// PFS Filters logo — transparent version
const PFS_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent_a4e4f7d6.png";

const navLinks = [
  { label: "Products", href: "/light/shop" },
  { label: "Filter Types", href: "/light/shop-by-type" },
  { label: "Memberships", href: "/light/memberships" },
  { label: "Filter Database", href: "/light/filter-database" },
];

export default function LightLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="light-root" style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", background: "#fff", color: "#111111", minHeight: "100vh" }}>
      {/* ── Navigation ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.4s ease, box-shadow 0.4s ease",
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo — white when transparent nav (over dark hero), dark when scrolled */}
          <Link href="/light">
            <a style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <img
                src={PFS_LOGO}
                alt="PFS Filters"
                style={{
                  height: "38px",
                  width: "auto",
                  filter: scrolled ? "brightness(0)" : "brightness(0) invert(1)",
                  transition: "filter 0.4s ease",
                }}
              />
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="light-nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a style={{
                  fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: scrolled ? "#111111" : "#ffffff",
                  textDecoration: "none",
                  opacity: 0.85,
                  transition: "opacity 0.2s, color 0.4s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="light-nav-cta">
            <Link href="/light/shop">
              <a style={{
                background: scrolled ? "#111111" : "rgba(255,255,255,0.15)",
                border: scrolled ? "none" : "1px solid rgba(255,255,255,0.7)",
                color: "#fff",
                padding: "0.6rem 1.4rem",
                fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.4s, border 0.4s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1B4FD8")}
                onMouseLeave={e => (e.currentTarget.style.background = scrolled ? "#111111" : "rgba(255,255,255,0.15)")}
              >
                Shop Now
              </a>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", display: "none" }}
              className="light-menu-btn"
              aria-label="Menu"
            >
              <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "block", height: "1.5px", background: scrolled ? "#111" : "#fff", transition: "transform 0.3s, background 0.4s", transform: menuOpen ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
                <span style={{ display: "block", height: "1.5px", background: scrolled ? "#111" : "#fff", opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s, background 0.4s" }} />
                <span style={{ display: "block", height: "1.5px", background: scrolled ? "#111" : "#fff", transition: "transform 0.3s, background 0.4s", transform: menuOpen ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #E5E2DC", padding: "1.5rem 2rem 2rem" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a style={{ display: "block", padding: "0.75rem 0", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", textDecoration: "none", borderBottom: "1px solid #F4F2EE" }}>
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/light/shop">
              <a style={{ display: "block", marginTop: "1.5rem", background: "#111", color: "#fff", padding: "0.875rem 1.5rem", textAlign: "center", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                Shop Now
              </a>
            </Link>
          </div>
        )}
      </header>

      {/* ── Page Content ── */}
      <main>{children}</main>

      {/* ── Footer ── */}
      <footer style={{ background: "#111111", color: "#fff", padding: "5rem 2rem 3rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
            {/* Brand */}
            <div>
              <img src={PFS_LOGO} alt="PFS Filters" style={{ height: "36px", width: "auto", marginBottom: "1.5rem" }} />
              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: "280px" }}>
                Premium spray booth filtration solutions trusted by 1,200+ body shops nationwide. Ships in 1–2 business days.
              </p>
            </div>

            {/* Products */}
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>Products</p>
              {["Fiberglass Arrestors", "Tacky Panels", "Ceiling Blankets", "Roll Media", "Shop by Size"].map(item => (
                <Link key={item} href="/light/shop">
                  <a style={{ display: "block", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >{item}</a>
                </Link>
              ))}
            </div>

            {/* Company */}
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>Company</p>
              {[["Why PFS Filters", "/light/why-choose-us"], ["Memberships", "/light/memberships"], ["Contact", "/light/contact"], ["Returns", "/light/returns"]].map(([label, href]) => (
                <Link key={href} href={href}>
                  <a style={{ display: "block", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >{label}</a>
                </Link>
              ))}
            </div>

            {/* Account */}
            <div>
              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>Account</p>
              {[["Sign In", "/light/auth"], ["Filter Database", "/light/filter-database"], ["Filter Scanner", "/light/filter-scanner"]].map(([label, href]) => (
                <Link key={href} href={href}>
                  <a style={{ display: "block", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >{label}</a>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)" }}>
              © 2026 PFS FILTERS — ALL RIGHTS RESERVED
            </p>
            <div style={{ display: "flex", gap: "2rem" }}>
              {[["Privacy Policy", "/light/privacy-policy"], ["Returns", "/light/returns"]].map(([label, href]) => (
                <Link key={href} href={href}>
                  <a style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                  >{label}</a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .light-nav-desktop { display: none !important; }
          .light-menu-btn { display: block !important; }
          .light-nav-cta a:first-child { display: none !important; }
        }
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
