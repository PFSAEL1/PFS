/*
 * PFS Support Request Page — /support
 * Design: White-background hero (tech on control panel) left, form right
 * Form: Name, Company, Phone, Email, Equipment Type, Issue Description (required)
 * Utility bar "Support" link points here
 */
import { useState } from "react";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { Phone, Mail, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";

const TECH_HERO = "/manus-storage/pfs-tech-support-studio_25c3ec02.png";

const EQUIPMENT_TYPES = [
  "Spray Paint Booth",
  "Powder Coating Booth",
  "Industrial Oven",
  "Air Make-Up Unit (AMU)",
  "Blast Booth / Blast Room",
  "Prep Station",
  "Conveyor / Finishing Line",
  "Controls / Electrical Panel",
  "Other / Not Sure",
];

export default function SupportPage() {
  useSEO({
    title: "Spray Booth Support & Technical Assistance | PFS Industrial Finishing",
    description: "PFS technical support for spray paint booths, powder coating systems, industrial ovens, and blast equipment. Filter replacement, parts lookup, installation guidance, and service scheduling.",
    canonical: "/support",
  });

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    equipment: "",
    issue: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() && !form.email.trim()) e.phone = "Phone or email is required";
    if (!form.equipment) e.equipment = "Please select equipment type";
    if (!form.issue.trim()) e.issue = "Please describe the issue — this helps us prepare before we call";
    return e;
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Static site — open mailto as fallback
    const subject = encodeURIComponent(`Support Request — ${form.equipment || "Equipment"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nEmail: ${form.email}\nEquipment: ${form.equipment}\n\nIssue:\n${form.issue}`
    );
    window.location.href = `mailto:info@pfsspraybooths.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* ── Breadcrumb bar ── */}
      <div style={{ backgroundColor: "#1C1C1E", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container" style={{ paddingTop: "0.6rem", paddingBottom: "0.6rem" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Archivo Narrow', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
            <Link href="/"><span style={{ cursor: "pointer", color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors">Home</span></Link>
            <span>/</span>
            <span style={{ color: "#FFFFFF" }}>Support</span>
          </nav>
        </div>
      </div>

      {/* ── Main split layout ── */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start">

          {/* ── LEFT: Hero image + contact info ── */}
          <div>
            {/* Headline */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1B3A6B",
                display: "block",
                marginBottom: "0.6rem",
              }}>
                PFS Technical Support
              </span>
              <h1 style={{
                fontFamily: "'Archivo Narrow', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#1C1C1E",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}>
                Equipment Down?<br />We're On It.
              </h1>
              <p style={{
                fontFamily: "'Archivo Narrow', sans-serif",
                fontSize: "1rem",
                color: "#555",
                lineHeight: 1.6,
                maxWidth: "440px",
              }}>
                Factory-trained PFS engineers are standing by. Fill out the form and we'll call you back — or reach us directly below.
              </p>
            </div>

            {/* Tech photo — white background, no clutter */}
            <div style={{
              backgroundColor: "#F8F8F8",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "1.5rem",
              border: "1px solid #EBEBEB",
            }}>
              <img
                src={TECH_HERO}
                alt="PFS factory-trained technician servicing a spray booth control panel"
                style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "center top", maxHeight: "480px" }}
              />
            </div>

            {/* Direct contact */}
            <div style={{
              backgroundColor: "#1C1C1E",
              padding: "1.25rem 1.5rem",
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.1rem" }}>
                Prefer to call?
              </p>
              <a href="tel:+18885457715" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#FFFFFF", textDecoration: "none", fontFamily: "'Archivo Narrow', sans-serif", fontSize: "1.1rem", fontWeight: 600 }}>
                <Phone size={16} style={{ color: "#4A90D9", flexShrink: 0 }} />
                (888) 545-7715 — Toll Free
              </a>

              <a href="mailto:info@pfsspraybooths.com" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontFamily: "'Archivo Narrow', sans-serif", fontSize: "0.9rem" }}>
                <Mail size={14} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                info@pfsspraybooths.com
              </a>
            </div>
          </div>

          {/* ── RIGHT: Support request form ── */}
          <div style={{ paddingTop: "0.5rem" }}>
            {submitted ? (
              <div style={{
                backgroundColor: "#F0F7F0",
                border: "1px solid #B8DDB8",
                borderRadius: "4px",
                padding: "2.5rem 2rem",
                textAlign: "center",
              }}>
                <CheckCircle size={48} style={{ color: "#2E7D32", margin: "0 auto 1rem" }} />
                <h2 style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#1C1C1E", marginBottom: "0.5rem" }}>
                  Request Sent
                </h2>
                <p style={{ fontFamily: "'Archivo Narrow', sans-serif", color: "#555", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Your support request has been sent to our team. A PFS engineer will follow up with you shortly. For urgent issues, call us directly at <strong>(888) 545-7715</strong>.
                </p>
                <Link href="/service">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B3A6B", cursor: "pointer", fontWeight: 600 }}>
                    View All Services <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E8E8E6",
                  borderRadius: "4px",
                  padding: "2rem",
                }}>
                  <h2 style={{
                    fontFamily: "'Archivo Narrow', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#1C1C1E",
                    marginBottom: "0.3rem",
                  }}>
                    Submit a Support Request
                  </h2>
                  <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: "0.85rem", color: "#888", marginBottom: "1.75rem" }}>
                    Fields marked <span style={{ color: "#C0392B" }}>*</span> are required.
                  </p>

                  {/* Name */}
                  <Field label="Your Name" required error={errors.name}>
                    <input
                      type="text"
                      placeholder="First and last name"
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      style={inputStyle(!!errors.name)}
                    />
                  </Field>

                  {/* Company */}
                  <Field label="Company / Shop Name" error={errors.company}>
                    <input
                      type="text"
                      placeholder="Your shop or facility name"
                      value={form.company}
                      onChange={e => handleChange("company", e.target.value)}
                      style={inputStyle(false)}
                    />
                  </Field>

                  {/* Phone + Email side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone" required error={errors.phone}>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={e => handleChange("phone", e.target.value)}
                        style={inputStyle(!!errors.phone)}
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        style={inputStyle(!!errors.email)}
                      />
                    </Field>
                  </div>

                  {/* Equipment Type */}
                  <Field label="Equipment Type" required error={errors.equipment}>
                    <select
                      value={form.equipment}
                      onChange={e => handleChange("equipment", e.target.value)}
                      style={inputStyle(!!errors.equipment)}
                    >
                      <option value="">Select equipment type…</option>
                      {EQUIPMENT_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Issue Description — mandatory */}
                  <Field label="Describe the Issue" required error={errors.issue}>
                    <textarea
                      placeholder="What's happening? Error codes, symptoms, when it started — the more detail, the faster we can help."
                      value={form.issue}
                      onChange={e => handleChange("issue", e.target.value)}
                      rows={5}
                      style={{ ...inputStyle(!!errors.issue), resize: "vertical" }}
                    />
                    {!errors.issue && (
                      <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: "0.75rem", color: "#999", marginTop: "0.3rem" }}>
                        Required — helps our engineers prepare before they call you back.
                      </p>
                    )}
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      backgroundColor: "#1B3A6B",
                      color: "#FFFFFF",
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.9rem 1.5rem",
                      border: "none",
                      borderRadius: "2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a4a8a")}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1B3A6B")}
                  >
                    Send Support Request <ArrowRight size={15} />
                  </button>

                  <p style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: "0.75rem", color: "#999", textAlign: "center", marginTop: "0.75rem" }}>
                    For emergencies, call <a href="tel:+18885457715" style={{ color: "#1B3A6B", fontWeight: 600 }}>(888) 545-7715</a> directly.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={{
        display: "block",
        fontFamily: "'Archivo Narrow', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "#1C1C1E",
        marginBottom: "0.35rem",
        letterSpacing: "0.02em",
      }}>
        {label}{required && <span style={{ color: "#C0392B", marginLeft: "2px" }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Archivo Narrow', sans-serif", fontSize: "0.75rem", color: "#C0392B", marginTop: "0.3rem" }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "0.6rem 0.75rem",
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: "0.9rem",
    color: "#1C1C1E",
    backgroundColor: "#FFFFFF",
    border: `1px solid ${hasError ? "#C0392B" : "#D8D8D6"}`,
    borderRadius: "2px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s",
  };
}
