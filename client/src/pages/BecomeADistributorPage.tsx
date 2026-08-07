/**
 * Become a Distributor — PFS
 * Design: Dark navy hero with Helios booth, lead capture form, benefits grid
 * Route: /become-a-distributor
 */
import { useState } from "react";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, TrendingUp, Wrench, Package, Users, Phone, Mail } from "lucide-react";

const BLUE = "#1B3A6B";
const GOLD = "#C8A84B";

// Helios booth hero — real warehouse install shot
const HELIOS_HERO = "/manus-storage/pfs-helios-enclosed-booth-real_2bc88039.jpeg";
const HELIOS_WAREHOUSE = "/manus-storage/pfs-helios-enclosed-booth-real_2bc88039.jpeg";

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "High-Margin Product Line",
    body: "Spray booths, ovens, and AMUs carry strong margins. PFS factory-direct pricing gives distributors a competitive edge without sacrificing profitability.",
  },
  {
    icon: Package,
    title: "Full Product Portfolio",
    body: "From entry-level enclosed booths to aerospace-grade downdraft systems, blast rooms, powder coating lines, and industrial ovens — one manufacturer, complete coverage.",
  },
  {
    icon: Wrench,
    title: "Factory Technical Support",
    body: "Your customers get direct access to PFS engineers for pre-sale specs, installation support, and post-sale service. You close the deal; we back it up.",
  },
  {
    icon: Users,
    title: "Dedicated Territory Management",
    body: "Protected territories available for qualified distributors. We work with you, not against you — no undercutting, no direct-to-end-user competition in your market.",
  },
];

const REQUIREMENTS = [
  "Established industrial, automotive, or finishing equipment distribution network",
  "Ability to provide local sales, installation coordination, and first-line service",
  "Minimum annual volume commitment (discussed during qualification)",
  "Alignment with PFS quality and customer service standards",
];

const PROGRAM_FEATURES = [
  "Authorized Distributor designation and co-branded marketing materials",
  "Access to PFS product configurator and quoting tools",
  "Sales training and product certification program",
  "Lead sharing for your territory from PFS marketing",
  "Priority production scheduling for distributor orders",
  "Dedicated PFS sales rep and engineering support contact",
];

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  territory: string;
  experience: string;
  message: string;
}

export default function BecomeADistributorPage() {
  useSEO({
    title: "Become a PFS Distributor | Industrial Finishing Equipment Partner Program",
    description: "Partner with Platinum Finishing Systems to offer ETL-certified spray paint booths, powder coating systems, industrial ovens, and blast equipment. Competitive margins, factory support, and exclusive territory opportunities.",
    canonical: "/become-a-distributor",
  });

  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", company: "", email: "",
    phone: "", territory: "", experience: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: 0,
    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
    fontSize: "0.9rem",
    color: "#1a202c",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Chakra Petch', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: BLUE,
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: "#fff" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "clamp(480px, 65vh, 720px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img
          src={HELIOS_HERO}
          alt="PFS Helios Series enclosed spray booth"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,20,40,0.92) 0%, rgba(10,20,40,0.55) 55%, rgba(10,20,40,0.2) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: GOLD, zIndex: 3 }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "4rem", paddingTop: "6rem" }}>
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>
              Partnership Program
            </p>
            <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "0.01em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              Become a<br /><span style={{ color: GOLD }}>PFS Distributor</span>
            </h1>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 520 }}>
              Partner with the manufacturer. Sell factory-direct finishing equipment — spray booths, ovens, blast rooms, and powder coating systems — with full technical backing and protected territory.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#apply" data-animation="slideLeft">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: GOLD, color: "#fff", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.9rem 2rem", cursor: "pointer" }}>
                  Apply Now <ArrowRight size={15} />
                </span>
              </a>
              <a href="tel:+18885457715" data-animation="slideRight">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#fff", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.9rem 2rem", border: "2px solid rgba(255,255,255,0.5)", cursor: "pointer" }}>
                  <Phone size={14} /> Call (888) 545-7715
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      <section style={{ background: "#f8f9fb", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Why Partner with PFS
            </p>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.1 }}>
              The Distributor Advantage
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }} data-animation="fadeIn">
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderTop: `4px solid ${BLUE}`, padding: "2rem 1.75rem" }}>
                <div style={{ width: 48, height: 48, background: `${BLUE}12`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <b.icon size={22} color={BLUE} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "1.05rem", fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>{b.title}</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.88rem", color: "#4a5568", lineHeight: 1.75 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAM DETAILS ── */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

            {/* Requirements */}
            <div>
              <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                Distributor Requirements
              </p>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "1.5rem", lineHeight: 1.15 }}>
                Who We're Looking For
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} data-animation="fadeIn">
                {REQUIREMENTS.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <CheckCircle2 size={18} color={BLUE} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.65 }}>{r}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Features */}
            <div>
              <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                What You Get
              </p>
              <h2 data-animation="slideRight" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "1.5rem", lineHeight: 1.15 }}>
                The PFS Partner Program
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} data-animation="fadeIn"
              >
                {PROGRAM_FEATURES.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div style={{ width: 8, height: 8, background: GOLD, borderRadius: "50%", flexShrink: 0, marginTop: "0.45rem" }} />
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#374151", lineHeight: 1.65 }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HELIOS FEATURE IMAGE ── */}
      <section style={{ position: "relative", height: "clamp(280px, 40vh, 480px)", overflow: "hidden" }}>
        <img
          src={HELIOS_WAREHOUSE}
          alt="PFS Helios Series spray booth in production facility"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.3) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <div className="container">
            <div style={{ maxWidth: 480 }}>
              <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.8rem" }}>
                PFS Helios Series
              </p>
              <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#fff", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1rem" }}>
                The Booth Your Customers<br />Will Ask For By Name
              </h3>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>
                Manufactured in Santa Rosa, CA. Shipped nationwide. Built with ETL/UL listed and certified components. The Helios Series is the flagship — and it sells itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" style={{ padding: "5rem 0", background: "#f8f9fb" }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.6rem" }}>
                Distributor Application
              </p>
              <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: BLUE, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                Apply to Become a Partner
              </h2>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#4a5568", lineHeight: 1.65 }}>
                Fill out the form below and a PFS sales representative will contact you within 1–2 business days to discuss your territory and qualification.
              </p>
            </div>

            {submitted ? (
              <div style={{ background: BLUE, padding: "3rem 2.5rem", textAlign: "center" }}>
                <CheckCircle2 size={48} color={GOLD} style={{ marginBottom: "1.25rem" }} />
                <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
                  Application Received
                </h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, maxWidth: 440, margin: "0 auto 1.75rem" }}>
                  Thank you for your interest in the PFS Distributor Program. A member of our team will reach out within 1–2 business days.
                </p>
                <Link href="/">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: GOLD, color: "#fff", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", cursor: "pointer" }}>
                    Back to Home <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "2.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input style={inputStyle} type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="John" />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <input style={inputStyle} type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" />
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={labelStyle}>Company Name *</label>
                  <input style={inputStyle} type="text" name="company" value={form.company} onChange={handleChange} required placeholder="Smith Industrial Supply Co." />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input style={inputStyle} type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@smithindustrial.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input style={inputStyle} type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="(555) 000-0000" />
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={labelStyle}>Territory / Region *</label>
                  <input style={inputStyle} type="text" name="territory" value={form.territory} onChange={handleChange} required placeholder="e.g. Pacific Northwest, Texas, Southeast USA" />
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={labelStyle}>Industry Experience</label>
                  <select
                    style={{ ...inputStyle, appearance: "none" as const }}
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select your primary market...</option>
                    <option value="automotive">Automotive / Collision Repair</option>
                    <option value="industrial">Industrial / Manufacturing</option>
                    <option value="aerospace">Aerospace & Defense</option>
                    <option value="woodworking">Woodworking / Furniture</option>
                    <option value="powder">Powder Coating</option>
                    <option value="general">General Industrial Distribution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label style={labelStyle}>Tell Us About Your Business</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: "vertical" as const }}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your distribution network, customer base, and why you're interested in partnering with PFS..."
                  />
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: submitting ? "#6b7280" : BLUE, color: "#fff", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "1rem 2.5rem", border: "none", cursor: submitting ? "not-allowed" : "pointer" }}
                  >
                    {submitting ? "Submitting..." : <>Submit Application <ArrowRight size={15} /></>}
                  </button>
                  <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>
                    We'll respond within 1–2 business days.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section style={{ background: BLUE, padding: "2.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", color: GOLD, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                Prefer to Talk First?
              </p>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.85)" }}>
                Call us directly to discuss the program before applying.
              </p>
            </div>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <a data-animation="slideLeft" href="tel:+18885457715" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#fff", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>
                <Phone size={16} color={GOLD} /> (888) 545-7715
              </a>
              <a data-animation="slideRight" href="mailto:info@pfsspraybooths.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#fff", fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>
                <Mail size={16} color={GOLD} /> info@pfsspraybooths.com
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
