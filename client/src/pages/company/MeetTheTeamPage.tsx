/**
 * Meet the Team — PFS
 * Placeholder page at /company/team
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 */
import { Link } from "wouter";
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft, ArrowRight, Users } from "lucide-react";

const BLUE = "#1B3A6B";
const GOLD = "#C8A84B";

const HERO_IMG = "/manus-storage/pfs-facility-building_bece7d21.jpg";

// Placeholder team member roles — names/photos to be filled in by client
const TEAM_PLACEHOLDERS = [
  { role: "Founder & CEO",                  dept: "Leadership" },
  { role: "Director of Operations",         dept: "Operations" },
  { role: "Lead Engineer",                  dept: "Engineering" },
  { role: "Project Manager",                dept: "Project Management" },
  { role: "Sales Manager",                  dept: "Sales" },
  { role: "Lead Fabricator",                dept: "Manufacturing" },
  { role: "Electrical Systems Specialist",  dept: "Electrical" },
  { role: "Installation Lead",              dept: "Field Services" },
];

function PlaceholderAvatar({ initials }: { initials: string }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "1/1",
      background: `linear-gradient(135deg, ${BLUE}22 0%, ${BLUE}08 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderBottom: `2px solid ${BLUE}18`,
    }}>
      <div style={{
        width: 72, height: 72,
        borderRadius: "50%",
        background: `${BLUE}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Users size={32} color={`${BLUE}60`} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function MeetTheTeamPage() {
  useSEO({
    title: "Meet the PFS Team | Industrial Finishing Equipment Experts",
    description: "Meet the Platinum Finishing Systems team — engineers, fabricators, and finishing system specialists who design and build ETL-certified spray booths, ovens, and blast equipment in Santa Rosa, CA.",
    canonical: "/company/team",
  });

  return (
    <div style={{ background: "#fff" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "clamp(320px, 45vh, 500px)", overflow: "hidden" }}>
        <img
          src={HERO_IMG}
          alt="Platinum Finishing Systems manufacturing facility — Santa Rosa, CA"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,20,40,0.6) 0%, rgba(10,20,40,0.75) 100%)",
        }} />
        {/* Breadcrumb */}
        <div style={{ position: "absolute", top: "1.5rem", left: 0, right: 0 }}>
          <div className="container">
            <Link href="/company">
              <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <ArrowLeft size={12} /> Company
              </span>
            </Link>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
          <div className="container">
            <div style={{ maxWidth: 600 }}>
              <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>PFS — Industrial Finishing Equipment</p>
              <h1 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Meet the Team
              </h1>
              <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, maxWidth: 480 }}>
                The engineers, fabricators, and project managers who build every PFS system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON NOTICE */}
      <section style={{ padding: "4rem 0", background: "#f8f9fb", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.6rem",
            background: `${GOLD}18`, border: `1px solid ${GOLD}40`,
            borderRadius: "2px", padding: "0.6rem 1.25rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Full Profiles Coming Soon
            </span>
          </div>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: BLUE, lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "1rem" }}>
            People Who Know the Job
          </h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#4a5568", lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>
            Every person on the PFS team was hired because they know finishing systems — not just how to sell them, but how to build them, install them, and make them perform. Full team profiles are coming soon.
          </p>
        </div>
      </section>

      {/* TEAM GRID — PLACEHOLDERS */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div className="container">
          <div data-animation="fadeIn" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}>
            {TEAM_PLACEHOLDERS.map((member) => (
              <div key={member.role} style={{
                border: "1px solid #e2e8f0",
                borderRadius: "2px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}>
                <PlaceholderAvatar initials="?" />
                <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                  <p style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "0.7rem", fontWeight: 600,
                    color: GOLD, letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "0.3rem",
                  }}>{member.dept}</p>
                  <h3 style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontSize: "1.05rem", fontWeight: 700,
                    color: BLUE, letterSpacing: "0.03em",
                    lineHeight: 1.2,
                  }}>{member.role}</h3>
                  <div style={{
                    marginTop: "0.75rem",
                    height: 2, width: 32,
                    background: `${BLUE}20`,
                    borderRadius: "1px",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACK TO ABOUT + CTA */}
      <section style={{ padding: "5rem 0", background: "#f8f9fb" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center" }}>
          <Link href="/company">
            <button style={{
              background: "transparent", color: BLUE,
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.85rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.75rem 1.75rem",
              border: `2px solid ${BLUE}40`, borderRadius: "2px",
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem",
            }}>
              <ArrowLeft size={14} /> Back to About Us
            </button>
          </Link>
          <div style={{ width: 1, height: 40, background: "#e2e8f0" }} />
          <div>
            <p data-animation="slideLeft"style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: BLUE, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Ready to Work with Us?
            </p>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#4a5568", lineHeight: 1.7, maxWidth: 400, marginBottom: "1.25rem" }}>
              Whether you need a single booth or a full finishing line, our team is ready to help you spec the right system.
            </p>
            <Link href="/contact">
              <button data-animation="slideRight" style={{
                background: BLUE, color: "#fff",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "0.9rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.9rem 2.25rem",
                border: "none", borderRadius: "2px",
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              }}>
                Get a Quote <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
