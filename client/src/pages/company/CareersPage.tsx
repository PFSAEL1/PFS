import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { ArrowRight, MapPin, Briefcase, Clock, ChevronRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-careers-hero-6RYnuymp4L3HSjNSxm4AVY.webp";
const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-careers-team-NFnR4urUc2YUSREk6KyZjd.webp";
const LOGO_NO_TAGLINE = "/manus-storage/pfs-logo-black_cdac0791.jpg";

const GOLD = "#D4AF37";
const NAVY = "#0D1117";

const OPENINGS = [
  {
    title: "Sheet Metal Fabricator",
    dept: "Manufacturing",
    location: "Santa Rosa, CA",
    type: "Full-Time",
    desc: "Fabricate steel panels, frames, and components for spray booth and industrial oven systems. Experience with shears, press brakes, and MIG/TIG welding required.",
  },
  {
    title: "Field Service Technician",
    dept: "Service",
    location: "National (Travel Required)",
    type: "Full-Time",
    desc: "Install, commission, and service PFS spray booth systems at customer facilities nationwide. Electrical and HVAC experience preferred. Valid driver's license required.",
  },
  {
    title: "Inside Sales Representative",
    dept: "Sales",
    location: "Santa Rosa, CA",
    type: "Full-Time",
    desc: "Qualify inbound leads, prepare quotes, and manage customer relationships for spray booth and finishing equipment sales. Industrial equipment or B2B sales experience preferred.",
  },
  {
    title: "Mechanical Engineer",
    dept: "Engineering",
    location: "Santa Rosa, CA",
    type: "Full-Time",
    desc: "Design and engineer spray booth systems, industrial ovens, and finishing equipment. SolidWorks experience required. HVAC or industrial ventilation background a plus.",
  },
];

const VALUES = [
  { title: "American-Made", body: "Every PFS system is designed and built at our Santa Rosa, CA facility using domestic steel and components wherever possible." },
  { title: "Craftsmanship", body: "We build equipment that lasts. Every booth leaves our facility with a full inspection and ETL certification." },
  { title: "Team-First", body: "PFS is a family-owned company. We invest in our people with competitive pay, benefits, and opportunities to grow." },
  { title: "Mission-Driven", body: "Our equipment protects workers, reduces emissions, and helps American manufacturers compete. That matters to us." },
];

export default function CareersPage() {
  useSEO({
    title: "Careers at PFS | Industrial Finishing Equipment Manufacturing Jobs",
    description: "Join the Platinum Finishing Systems team. We manufacture ETL-certified spray paint booths, industrial ovens, and finishing lines in Santa Rosa, CA. Open positions in fabrication, field service, engineering, and sales.",
    canonical: "/company/careers",
  });

  return (
    <div>
      {/* SEO meta via PageHero */}
      <PageHero
        title="Careers at PFS"
        subtitle="Join the team building America's most trusted industrial finishing equipment."
        breadcrumbs={[{ label: "Company", href: "/company" }, { label: "Careers" }]}
        bgImage={HERO_IMG}
      />

      {/* ── PFS LOGO BAND ── */}
      <div style={{ background: "#0D1117", padding: "1.5rem 0", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "2px solid #1B3A6B" }}>
        <img
          src={LOGO_NO_TAGLINE}
          alt="Platinum Finishing Systems — PFS logo"
          style={{ height: "52px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
        />
      </div>

      {/* ── INTRO ── */}
      <section style={{ padding: "4rem 0", background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <span className="section-label">Join Our Team</span>
              <h2 data-animation="slideLeft" className="section-heading">Build Something That Lasts</h2>
              <p className="section-body" style={{ marginBottom: "1rem" }}>
                PFS has been engineering and manufacturing industrial finishing equipment in Santa Rosa, California since 1989. We build spray paint booths, powder coating systems, industrial ovens, and blast equipment for customers across North America — from collision repair shops to aerospace facilities to military installations.
              </p>
              <p className="section-body" style={{ marginBottom: "1.5rem" }}>
                We are a team of fabricators, engineers, technicians, and sales professionals who take pride in building equipment that protects workers, meets the toughest compliance standards, and lasts for decades. If that sounds like the kind of work you want to do, we want to hear from you.
              </p>
              <Link href="/contact/talk-to-an-engineer">
                <span data-animation="slideRight" className="btn-glow">Send Your Resume <ArrowRight size={14} /></span>
              </Link>
            </div>
            <div>
              <img
                src={TEAM_IMG}
                alt="PFS team members in navy uniforms standing in front of a finished spray booth at the Santa Rosa manufacturing facility"
                style={{ width: "100%", objectFit: "cover", height: "380px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "4rem 0", background: NAVY }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Why PFS</span>
            <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em" }}>What We Stand For</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }} data-animation="fadeIn">
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem" }}>
                <div style={{ width: 32, height: 3, background: GOLD, marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section style={{ padding: "4rem 0", background: "#f5f5f5" }}>
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <span className="section-label">Open Positions</span>
            <h2 data-animation="slideLeft" className="section-heading">Current Openings</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {OPENINGS.map((job, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", padding: "1.75rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "center" }}>
                <div>
                  <h3 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0D1117", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.4rem" }}>{job.title}</h3>
                  <div style={{ display: "flex", gap: "1.25rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666" }}>
                      <Briefcase size={12} />{job.dept}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666" }}>
                      <MapPin size={12} />{job.location}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.8rem", color: "#666" }}>
                      <Clock size={12} />{job.type}
                    </span>
                  </div>
                  <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#444", lineHeight: 1.65 }}>{job.desc}</p>
                </div>
                <div>
                  <Link href="/contact/talk-to-an-engineer">
                    <span data-animation="slideRight" className="btn-glow" style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                      Apply <ChevronRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#fff", border: "1px solid #e5e5e5", textAlign: "center" }}>
            <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
              Don't see a role that fits? We are always interested in hearing from experienced fabricators, technicians, and finishing industry professionals.
            </p>
            <Link href="/contact/talk-to-an-engineer">
              <span data-animation="slideRight" className="btn-glow">Send a General Application <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: "4rem 0", background: NAVY, textAlign: "center" }}>
        <div className="container">
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Platinum Finishing Systems</span>
          <h2 data-animation="slideLeft" style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "1rem" }}>Ready to Build Something?</h2>
          <p data-animation="slideLeft" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto 2rem" }}>
            Send your resume and a brief introduction to our team in Santa Rosa, CA.
          </p>
          <Link href="/contact/talk-to-an-engineer">
            <span data-animation="slideRight" className="btn-glow">Contact HR <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>
    </div>
  );
}
