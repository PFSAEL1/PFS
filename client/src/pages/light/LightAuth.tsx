/**
 * LightAuth — Editorial sign in / sign up page for the light design
 */

import { useState } from "react";
import { Link } from "wouter";
import LightLayout from "../../components/light/LightLayout";

export default function LightAuth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ email: "", password: "", name: "", company: "" });

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
    boxSizing: "border-box" as const,
  };

  return (
    <LightLayout>
      <section style={{ background: "#fff", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Left — visual panel */}
        <div style={{ background: "#111", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/light-hero-main-QzxXJMEJhKnwRKJmJJjXWi.webp)`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.3 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Link href="/light">
              <a style={{ display: "inline-block" }}>
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo-transparent-7EEBxJhXHkYHvxRNRHfJmN.png" alt="PFS Filters" style={{ height: "40px", filter: "brightness(0) invert(1)" }} />
              </a>
            </Link>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", color: "rgba(255,255,255,0.15)", lineHeight: 1, marginBottom: "1rem" }}>"</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              The filter database changed how we run our shop. Everything is automated now.
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              — Carlos R., Auto Body Manager
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem", paddingTop: "8rem" }}>
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: "1rem" }}>
              PFS Filters Account
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "#111", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
              {mode === "signin" ? "Welcome Back." : "Create Account."}
            </h1>

            {/* Mode toggle */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", borderBottom: "1px solid #E5E2DC" }}>
              {(["signin", "signup"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: "0.75rem 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: mode === m ? "2px solid #111" : "2px solid transparent",
                    marginBottom: "-1px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: mode === m ? "#111" : "#888",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                >
                  {m === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {mode === "signup" && (
                <>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Full Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Shop / Company</label>
                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle} placeholder="ABC Body Shop" />
                  </div>
                </>
              )}
              <div>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="john@shop.com" />
              </div>
              <div>
                <label style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.5rem" }}>Password</label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} placeholder="••••••••" />
              </div>
              <button
                type="submit"
                style={{ padding: "1rem", background: "#111", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s", marginTop: "0.5rem" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1B4FD8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}
              >
                {mode === "signin" ? "Sign In →" : "Create Account →"}
              </button>
            </form>

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "#888", marginTop: "2rem", textAlign: "center" }}>
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={{ background: "none", border: "none", color: "#1B4FD8", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", textDecoration: "underline" }}>
                {mode === "signin" ? "Sign up free" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; }
          section > div:first-child { display: none !important; }
          section > div:last-child { padding: 6rem 1.5rem 3rem !important; }
        }
      `}</style>
    </LightLayout>
  );
}
