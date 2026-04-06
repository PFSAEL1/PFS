/**
 * LightHome — "Airy Precision" editorial homepage
 * Design: Scandinavian editorial minimalism with Locomotive-style scroll reveals
 * Hero: Full-viewport split layout, left text + right product image with parallax
 * Sections: Alternating white/#F4F2EE, clip-path scroll reveals, generous whitespace
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import LightLayout from "../../components/light/LightLayout";
import LightProductSlider from "../../components/light/LightProductSlider";

// CDN assets
// Hero: AI-generated filter render (colorful fiberglass panels on black) — same as dark version
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-fiberglass-arrestor-dark_93744cb6.png";
const FIBER_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/light-section-bg-VTxWUA4VtWMjNC6nzGnGZi.webp";
const INTAKE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/light-hero-intake-94LkqhxUxvR3HFm89bFfTv.webp";
const EXHAUST_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/light-category-exhaust-gDMxxE2KsfEFXMAmwc89Mn.webp";
// PFS-branded product images (Rensa text replaced with PFS FILTERS)
const PFS_PARTICULATE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-particulate-filter-v2_b6a86e6c.png";
const PFS_WASHABLE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-washable-filter-v2_9f09a7ec.png";
const PFS_ODOR_GAS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-odor-gas-filter-v2_bd631ebc.png";

// Scroll reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealBlock({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      clipPath: visible ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `clip-path 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const categories = [
  { label: "Fiberglass Arrestors", sub: "Exhaust Filtration", href: "/light/shop-by-type", img: EXHAUST_IMG, tag: "EXHAUST" },
  { label: "Tacky Panels", sub: "Intake Filtration", href: "/light/shop-by-type", img: INTAKE_IMG, tag: "INTAKE" },
  { label: "HEPA Particulate", sub: "Intake Filtration", href: "/light/shop-by-type", img: PFS_PARTICULATE, tag: "INTAKE" },
  { label: "Washable Panels", sub: "Reusable Filtration", href: "/light/shop-by-type", img: PFS_WASHABLE, tag: "REUSABLE" },
];

const stats = [
  { num: "1,200+", label: "Body Shops Served" },
  { num: "99.8%", label: "Capture Efficiency" },
  { num: "1–2", label: "Day Shipping" },
  { num: "15+", label: "Years Experience" },
];

export default function LightHome() {
  const [heroParallax, setHeroParallax] = useState(0);

  useEffect(() => {
    const onScroll = () => setHeroParallax(window.scrollY * 0.3);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LightLayout>
      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Left: Text */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10rem 4rem 6rem 6rem",
          background: "#fff",
          position: "relative",
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1B4FD8",
            marginBottom: "1.5rem",
          }}>
            Spray Booth Filtration Systems
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 5vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#111111",
            marginBottom: "2rem",
            letterSpacing: "-0.02em",
          }}>
            Precision<br />
            <em style={{ fontStyle: "italic", color: "#1B4FD8" }}>Engineered</em><br />
            Filtration.
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            lineHeight: 1.75,
            color: "#555",
            maxWidth: "400px",
            marginBottom: "3rem",
          }}>
            Premium spray booth filters trusted by 1,200+ body shops nationwide. Intake, exhaust, ceiling — every position covered.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/light/shop">
              <a style={{
                background: "#111111",
                color: "#fff",
                padding: "1rem 2.5rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.25s",
                display: "inline-block",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1B4FD8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111111")}
              >
                Shop Filters
              </a>
            </Link>
            <Link href="/light/filter-database">
              <a style={{
                border: "1px solid #111111",
                color: "#111111",
                padding: "1rem 2.5rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.25s",
                display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
              >
                Filter Database
              </a>
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
            {["Ships 1–2 Days", "1,200+ Shops", "Booth Tracking"].map(badge => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "4px", height: "4px", background: "#1B4FD8", borderRadius: "50%" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#888" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI-generated filter render hero image */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          background: "#0a0a0a",
        }}>
          <img
            src={HERO_IMG}
            alt="PFS Filters — Premium Spray Booth Filtration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: `translateY(${heroParallax}px)`,
              transition: "transform 0.1s linear",
              scale: "1.15",
            }}
          />
          {/* Subtle light overlay to blend with editorial style */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }} />
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "6rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          zIndex: 3,
        }}>
          <div style={{ width: "40px", height: "1px", background: "#111" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>Scroll</span>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "#111111", padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>{num}</p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR PRODUCTS SLIDER ── */}
      <section style={{ background: "#fff", padding: "7rem 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          <RevealBlock>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "0.75rem" }}>
              Best Sellers
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              Popular Products
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", color: "#777", marginBottom: "3rem" }}>
              Trusted by 1,200+ body shops nationwide
            </p>
          </RevealBlock>
          <LightProductSlider />
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ background: "#F4F2EE", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <RevealBlock>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "0.75rem" }}>
              Browse
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", marginBottom: "3.5rem", letterSpacing: "-0.02em" }}>
              Shop by Category
            </h2>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {categories.map((cat, i) => (
              <RevealBlock key={cat.label} delay={i * 80}>
                <Link href={cat.href}>
                  <a style={{ display: "block", textDecoration: "none", position: "relative", overflow: "hidden", aspectRatio: "16/10", background: "#E8E5DF" }}
                    onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.06)"; }}
                    onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
                  >
                    <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: cat.img.includes('pfs-') ? 'contain' : 'cover', objectPosition: "center", background: "#E8E5DF", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
                    <div style={{ position: "absolute", bottom: "1.75rem", left: "1.75rem" }}>
                      <span style={{ display: "inline-block", background: "#1B4FD8", color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.6rem", marginBottom: "0.6rem" }}>
                        {cat.tag}
                      </span>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{cat.label}</p>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginTop: "0.25rem" }}>{cat.sub}</p>
                    </div>
                  </a>
                </Link>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIBER TEXTURE FEATURE SECTION ── */}
      <section style={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${FIBER_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(0.92)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.75)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "6rem 2rem", width: "100%" }}>
          <RevealBlock>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
              Why PFS Filters
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 700, color: "#111", lineHeight: 1.1, maxWidth: "700px", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              The Standard in<br /><em style={{ fontStyle: "italic", color: "#1B4FD8" }}>Spray Booth</em><br />Filtration.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1.1rem", lineHeight: 1.75, color: "#444", maxWidth: "500px", marginBottom: "2.5rem" }}>
              From fiberglass arrestors to tacky intake panels, every PFS filter is engineered for maximum capture efficiency and minimum downtime. Booth-specific tracking included.
            </p>
            <Link href="/light/why-choose-us">
              <a style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#111",
                textDecoration: "none",
                borderBottom: "1px solid #111",
                paddingBottom: "0.25rem",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "#1B4FD8"; e.currentTarget.style.borderColor = "#1B4FD8"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#111"; }}
              >
                Learn More →
              </a>
            </Link>
          </RevealBlock>
        </div>
      </section>

      {/* ── PRODUCT TYPES EDITORIAL ── */}
      <section style={{ background: "#fff", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <RevealBlock>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "0.75rem" }}>
              Product Range
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111", marginBottom: "4rem", letterSpacing: "-0.02em" }}>
              Every Position. Every Size.
            </h2>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem" }}>
            {[
              { img: PFS_PARTICULATE, title: "HEPA Particulate Filters", desc: "High-efficiency particulate filtration. Captures fine overspray particles before they reach the environment.", tag: "EXHAUST" },
              { img: INTAKE_IMG, title: "Tacky Intake Panels", desc: "Premium intake filtration. Prevents dust and debris from entering the spray booth.", tag: "INTAKE" },
              { img: PFS_ODOR_GAS, title: "Odor & Gas Filters", desc: "Activated carbon filtration for VOC and odor control. Essential for compliant spray booth operation.", tag: "ODOR" },
            ].map((item, i) => (
              <RevealBlock key={item.title} delay={i * 100}>
                <Link href="/light/shop-by-type">
                  <a style={{ display: "block", textDecoration: "none" }}>
                    <div style={{ overflow: "hidden", marginBottom: "1.5rem", aspectRatio: "16/10", background: "#F4F2EE" }}
                      onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.05)"; }}
                      onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
                    >
                      <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", background: "#F4F2EE", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
                    </div>
                    <span style={{ display: "inline-block", background: "#F4F2EE", color: "#1B4FD8", fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.25rem 0.6rem", marginBottom: "0.75rem" }}>
                      {item.tag}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#111", marginBottom: "0.5rem" }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.65, color: "#666" }}>{item.desc}</p>
                  </a>
                </Link>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP CTA ── */}
      <section style={{ background: "#111111", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <RevealBlock>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
              Membership Program
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
              Never Run Out<br />of Filters Again.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem" }}>
              Automated filter delivery on your schedule. Booth-specific tracking, priority shipping, and up to 20% off all orders.
            </p>
            <Link href="/light/memberships">
              <a style={{
                display: "inline-block",
                background: "#1B4FD8",
                color: "#fff",
                padding: "1rem 2.5rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.25s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1440b8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1B4FD8")}
              >
                View Plans
              </a>
            </Link>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.1)" }}>
            {[
              { title: "Basic", price: "$49/mo", features: ["1 Booth", "10% Discount", "Free Shipping"] },
              { title: "Pro", price: "$99/mo", features: ["3 Booths", "15% Discount", "Priority Ship"] },
              { title: "Business", price: "$199/mo", features: ["10 Booths", "20% Discount", "Dedicated Rep"] },
              { title: "Enterprise", price: "Custom", features: ["Unlimited", "Max Discount", "White Glove"] },
            ].map(plan => (
              <div key={plan.title} style={{ background: "#1a1a1a", padding: "2rem 1.5rem" }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "0.5rem" }}>{plan.title}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>{plan.price}</p>
                {plan.features.map(f => (
                  <p key={f} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>— {f}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section style={{ background: "#F4F2EE", padding: "7rem 2rem", textAlign: "center" }}>
        <RevealBlock>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Need a Custom Quote?
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", color: "#666", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Large orders, custom sizes, or special requirements — our team is ready to help.
          </p>
          <Link href="/light/contact">
            <a style={{
              display: "inline-block",
              border: "1px solid #111",
              color: "#111",
              padding: "1rem 2.5rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#111"; }}
            >
              Contact Us
            </a>
          </Link>
        </RevealBlock>
      </section>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          section:first-child { grid-template-columns: 1fr !important; }
          section:first-child > div:last-child { display: none !important; }
          section:first-child > div:first-child { padding: 8rem 1.5rem 4rem !important; }
        }
        @media (max-width: 900px) {
          section:nth-child(8) > div { grid-template-columns: 1fr !important; }
          section:nth-child(7) > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
          section:nth-child(6) > div > div:last-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          section:nth-child(2) > div { grid-template-columns: 1fr 1fr !important; }
          section:nth-child(4) > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </LightLayout>
  );
}
