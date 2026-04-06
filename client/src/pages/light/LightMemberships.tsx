/**
 * LightMemberships — Editorial membership pricing for the light design
 */

import { useState } from "react";
import { Link } from "wouter";
import LightLayout from "../../components/light/LightLayout";

const plans = [
  {
    name: "Basic",
    price: "$49",
    period: "/mo",
    tagline: "For single-booth shops",
    features: ["1 Booth Tracked", "10% Discount on All Orders", "Free Standard Shipping", "Email Support", "Monthly Filter Reminders"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    tagline: "Most popular for growing shops",
    features: ["3 Booths Tracked", "15% Discount on All Orders", "Priority Shipping", "Phone & Email Support", "Automated Reorder Reminders", "Filter Change History"],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Business",
    price: "$199",
    period: "/mo",
    tagline: "For multi-booth operations",
    features: ["10 Booths Tracked", "20% Discount on All Orders", "Same-Day Shipping", "Dedicated Account Rep", "Custom Filter Schedules", "Bulk Order Discounts", "Compliance Reports"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For large fleets & dealerships",
    features: ["Unlimited Booths", "Maximum Discount", "White Glove Service", "On-Site Support", "Custom Integrations", "Volume Pricing", "SLA Guarantee"],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function LightMemberships() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <LightLayout>
      {/* Header */}
      <section style={{ background: "#F4F2EE", padding: "10rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
            Membership Plans
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1.5rem" }}>
            Never Run Out<br /><em style={{ fontStyle: "italic", color: "#1B4FD8" }}>Again.</em>
          </h1>
          <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "1.1rem", color: "#666", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Automated filter delivery, booth-specific tracking, and exclusive discounts for PFS Filters members.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", border: "1px solid #E5E2DC", overflow: "hidden" }}>
            {(["monthly", "annual"] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: "0.6rem 1.5rem",
                  background: billing === b ? "#111" : "transparent",
                  color: billing === b ? "#fff" : "#888",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
              >
                {b === "annual" ? "Annual (Save 20%)" : "Monthly"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ background: "#fff", padding: "5rem 2rem 7rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {plans.map(plan => (
            <div
              key={plan.name}
              style={{
                border: plan.featured ? "2px solid #111" : "1px solid #E5E2DC",
                padding: "2.5rem 2rem",
                position: "relative",
                transition: "box-shadow 0.3s",
                background: plan.featured ? "#111" : "#fff",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              {plan.featured && (
                <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "#1B4FD8", color: "#fff", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 1rem" }}>
                  Most Popular
                </div>
              )}

              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: plan.featured ? "rgba(255,255,255,0.5)" : "#888", marginBottom: "0.5rem" }}>
                {plan.name}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "3rem", fontWeight: 700, color: plan.featured ? "#fff" : "#111" }}>
                  {billing === "annual" && plan.price !== "Custom"
                    ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
                    : plan.price}
                </span>
                {plan.period && <span style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.7rem", color: plan.featured ? "rgba(255,255,255,0.5)" : "#888" }}>{plan.period}</span>}
              </div>
              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: plan.featured ? "rgba(255,255,255,0.6)" : "#777", marginBottom: "2rem" }}>
                {plan.tagline}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "#1B4FD8", fontSize: "0.75rem", flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                    <span style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: plan.featured ? "rgba(255,255,255,0.75)" : "#555", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.name === "Enterprise" ? "/light/contact" : "/light/auth"}>
                <a style={{
                  display: "block",
                  textAlign: "center",
                  padding: "0.875rem",
                  background: plan.featured ? "#1B4FD8" : "#111",
                  color: "#fff",
                  fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = plan.featured ? "#1440b8" : "#1B4FD8")}
                  onMouseLeave={e => (e.currentTarget.style.background = plan.featured ? "#1B4FD8" : "#111")}
                >
                  {plan.cta}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F4F2EE", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", marginBottom: "3rem" }}>
            Frequently Asked Questions
          </h2>
          {[
            ["Can I cancel anytime?", "Yes — all plans are month-to-month with no long-term commitment. Cancel anytime from your account dashboard."],
            ["How does booth tracking work?", "Each booth gets a unique profile with its filter change history, schedule, and next reminder date. You can manage all booths from one dashboard."],
            ["What if I need more booths?", "You can upgrade your plan at any time. Upgrades are prorated so you only pay for what you use."],
            ["Do you offer custom filter sizes?", "Yes — Business and Enterprise plans include custom filter sizing at no extra charge. Contact our team for details."],
          ].map(([q, a]) => (
            <div key={q} style={{ borderBottom: "1px solid #E5E2DC", padding: "2rem 0" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#111", marginBottom: "0.75rem" }}>{q}</h3>
              <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.7, color: "#666" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section:nth-child(3) > div { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          section:nth-child(3) > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </LightLayout>
  );
}
