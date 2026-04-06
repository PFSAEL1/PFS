/**
 * LightContact — Editorial contact page for the light design
 */

import { useState } from "react";
import LightLayout from "../../components/light/LightLayout";

export default function LightContact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #E5E2DC",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: "1rem",
    color: "#111",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  };

  return (
    <LightLayout>
      {/* Header */}
      <section style={{ background: "#F4F2EE", padding: "10rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end" }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
              Get in Touch
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 5vw, 5.5rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", lineHeight: 1 }}>
              Let's Talk<br /><em style={{ fontStyle: "italic", color: "#1B4FD8" }}>Filters.</em>
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { label: "Email", value: "orders@pfsfilters.com" },
              { label: "Phone", value: "(800) 555-0199" },
              { label: "Hours", value: "Mon–Fri, 8am–5pm CST" },
              { label: "Shipping", value: "Ships in 1–2 Business Days" },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "0.25rem" }}>{item.label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "1rem", color: "#111" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ background: "#fff", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Send a Message
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.7, color: "#666", marginBottom: "3rem" }}>
              Whether you need a custom quote, have a question about your order, or want to set up a booth tracking account — we're here to help.
            </p>

            {submitted ? (
              <div style={{ padding: "2rem", background: "#F4F2EE", borderLeft: "3px solid #1B4FD8" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#111", marginBottom: "0.5rem" }}>Message Sent.</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#666" }}>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Name</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="john@shop.com" />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Company / Shop Name</label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle} placeholder="ABC Body Shop" />
                </div>
                <div>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Message</label>
                  <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} style={{ ...inputStyle, resize: "none" }} placeholder="Tell us about your booth setup and what you need..." />
                </div>
                <button type="submit" style={{ alignSelf: "flex-start", padding: "1rem 2.5rem", background: "#111", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1B4FD8")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#111")}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Right side — visual */}
          <div style={{ background: "#F4F2EE", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px", padding: "4rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "5rem", color: "#E5E2DC", lineHeight: 1, marginBottom: "1rem" }}>"</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                We've been using PFS Filters for 3 years. The auto-reorder system means we never have to think about filters again.
              </p>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
                — Mike T., Collision Center Owner
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </LightLayout>
  );
}
