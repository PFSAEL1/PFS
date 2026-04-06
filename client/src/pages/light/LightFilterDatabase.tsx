/**
 * LightFilterDatabase — Editorial filter database page for the light design
 */

import { Link } from "wouter";
import LightLayout from "../../components/light/LightLayout";

export default function LightFilterDatabase() {
  return (
    <LightLayout>
      {/* Header */}
      <section style={{ background: "#F4F2EE", padding: "10rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
            Booth Management
          </p>
          <h1 style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "clamp(3rem, 6vw, 6rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1.5rem" }}>
            Filter Database
          </h1>
          <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "1.1rem", color: "#666", maxWidth: "500px" }}>
            Track every booth, automate reorders, and never miss a filter change. Built for professional body shops.
          </p>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ background: "#fff", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", border: "1px solid #E5E2DC" }}>
            {[
              { num: "01", title: "Booth Profiles", desc: "Create a profile for every spray booth with its filter type, size, and change interval. All in one place." },
              { num: "02", title: "Auto Reminders", desc: "Get email and SMS reminders when a filter change is due. Never miss a scheduled maintenance window." },
              { num: "03", title: "One-Click Reorder", desc: "Reorder the exact filters for each booth with a single click. No more looking up part numbers." },
              { num: "04", title: "Change History", desc: "Full audit trail of every filter change. Essential for compliance and quality control documentation." },
              { num: "05", title: "Multi-Booth View", desc: "See all your booths at a glance. Color-coded status indicators show what needs attention today." },
              { num: "06", title: "Auto-Reorder Mode", desc: "Enable fully automated reordering. Filters ship automatically before you run out — zero effort." },
            ].map((feature, i) => (
              <div
                key={feature.num}
                style={{
                  padding: "3rem 2.5rem",
                  borderRight: i % 3 !== 2 ? "1px solid #E5E2DC" : "none",
                  borderBottom: i < 3 ? "1px solid #E5E2DC" : "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F4F2EE")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >
                <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#1B4FD8", marginBottom: "1rem" }}>{feature.num}</p>
                <h3 style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#111", marginBottom: "0.75rem" }}>{feature.title}</h3>
                <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "#666" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#111", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Ready to automate your<br /><em style={{ fontStyle: "italic", color: "#4d9fff" }}>filter program?</em>
            </h2>
            <p style={{ fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: "400px" }}>
              Join 1,200+ shops nationwide using PFS Filters to manage their booth maintenance.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Link href="/light/auth">
              <a style={{ display: "block", padding: "1rem 2.5rem", background: "#1B4FD8", color: "#fff", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1440b8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1B4FD8")}
              >
                Create Account →
              </a>
            </Link>
            <Link href="/filter-database">
              <a style={{ display: "block", padding: "1rem 2.5rem", background: "transparent", color: "#fff", fontFamily: "'Barlow Condensed', 'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", border: "1px solid rgba(255,255,255,0.2)", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
              >
                View Database
              </a>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section:nth-child(2) > div > div { grid-template-columns: 1fr !important; }
          section:nth-child(3) > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </LightLayout>
  );
}
