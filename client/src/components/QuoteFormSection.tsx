/*
 * PFS Quote Form Section
 * HELIOS warehouse photo as full-bleed background with dark overlay
 */

import { useState } from "react";

const HELIOS_IMG = "/manus-storage/helios-booth-warehouse_7b31d966.jpg";

export default function QuoteFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", company: "", email: "", phone: "", state: "", product: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
    fontSize: "0.875rem",
    color: "#1a1a1a",
    border: "1px solid #ccc",
    padding: "0.6rem 0.75rem",
    width: "100%",
    outline: "none",
    backgroundColor: "white",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#444",
    display: "block",
    marginBottom: "0.35rem",
  };

  return (
    <section
      id="quote"
      className="py-16 border-b border-gray-200 relative"
      style={{
        backgroundImage: `url(${HELIOS_IMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay so form stays readable */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,15,25,0.82)" }} />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: text */}
          <div className="lg:col-span-2">
            <p
              style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FFFFFF", marginBottom: "0.75rem" }}
            >
              Get Started
            </p>
            <h2
              className="text-white mb-5"
              style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15 }}
            >
              Request Information or a Quote
            </h2>
            <p
              className="text-gray-400 mb-8"
              style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              Fill out the form and a PFS representative will respond within 24 hours. We'll help you find the right spray booth or finishing system for your application, budget, and timeline.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { label: "Toll Free", value: "(888) 545-7715" },
                { label: "Email", value: "info@pfsspraybooths.com" },
                { label: "Address", value: "1400 Airport Blvd, Santa Rosa, CA 95403" },
                { label: "Hours", value: "Mon–Fri | 8:00am – 5:00pm PST" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span
                    className="flex-shrink-0"
                    style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF", paddingTop: "2px", minWidth: "64px" }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#ccc" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 bg-white p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FFFFFF" }}>
                  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.5rem" }}>
                  Request Received
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", fontSize: "0.9rem" }}>
                  A PFS representative will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  className="mb-6"
                  style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.04em", borderBottom: "2px solid #FFFFFF", paddingBottom: "0.75rem" }}
                >
                  CONTACT INFORMATION
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input required type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <input required type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div className="mb-4">
                  <label style={labelStyle}>Company Name</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputStyle} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={labelStyle}>State / Province</label>
                    <input type="text" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Product Interest</label>
                    <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">Select a product...</option>
                      <option>Automotive Refinish Booth</option>
                      <option>Large Equipment Booth</option>
                      <option>Aerospace Booth</option>
                      <option>Wood Finishing Booth</option>
                      <option>Apollo AM1-Series Heater</option>
                      <option>Blasting System</option>
                      <option>Filters &amp; Parts</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label style={labelStyle}>Message / Project Details</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Describe your project, booth size requirements, timeline, etc."
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  SUBMIT REQUEST
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
