/**
 * About Us — PFS
 * Mobile-first, collapsible sections, compact layout
 * Design: Deep navy #1B3A6B, Barlow Condensed headlines, Inter body
 * Route: /company
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Shield, Zap, Target, Heart, Lightbulb, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1B3A6B";
const GOLD = "#C8A84B";

const HERO_VIDEO_MP4 = "https://pfsspraybooth-qb3z7l9y.manus.space/manus-storage/pfs-facility-drone-hero_ca12546c.mp4";
const HERO_POSTER    = "/manus-storage/pfs-facility-building_bece7d21.jpg";
const FACILITY_SIGN  = "/manus-storage/pfs-facility-sign_9582dc74.jpg";
const STORY_VIDEO    = "https://pfsspraybooth-qb3z7l9y.manus.space/manus-storage/pfs-drone-facility_460ea18b.mp4";

const STATS = [
  { num: "2012",         label: "Founded" },
  { num: "2020",         label: "In-House Mfg." },
  { num: "16+",          label: "Yrs Experience" },
  { num: "USA & CA",     label: "Ships Nationwide" },
];

const VALUES = [
  { icon: Shield,    title: "Professionalism", tagline: "Do it right the first time.", body: "We represent ourselves and our clients with integrity at every touchpoint — from the first call to the final inspection. No shortcuts. No excuses." },
  { icon: Target,    title: "Precision",        tagline: "Every detail matters.",       body: "Spray finishing is an exacting science. Our equipment is engineered to spec, our installations are executed to plan, and our quality checks leave nothing to chance." },
  { icon: Zap,       title: "Speed with Quality", tagline: "Fast — never sloppy.",     body: "We move quickly because our clients' operations depend on it. But speed is never an excuse for cutting corners. We deliver on time and we deliver right." },
  { icon: Heart,     title: "Integrity",        tagline: "Say it, mean it.",            body: "We quote what we build and build what we quote. Our word is our contract. If something isn't right, we make it right — no fine print, no runaround." },
  { icon: Lightbulb, title: "Innovation",       tagline: "Always improve.",             body: "We don't rest on legacy designs. Every project is an opportunity to engineer a better solution — better airflow, better controls, better lead times, better outcomes." },
];

const PILLARS = [
  { num: "01", title: "Speed",          body: "When we control manufacturing, we control the schedule. No waiting on third-party fabricators. No supply chain surprises. Your booth ships when we say it ships." },
  { num: "02", title: "Quality",        body: "Every weld, every panel, every control panel is built to our standards — not someone else's. In-house production means we catch problems before they become your problems." },
  { num: "03", title: "Accountability", body: "One company. One point of contact. From engineering to installation to service. If there's ever an issue, you call us — and we answer." },
];

// ── Collapsible section wrapper ────────────────────────────────────────────────
function Collapsible({ title, label, defaultOpen = false, children }: { title: string; label?: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #e2e8f0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div>
          {label && <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: "0.2rem" }}>{label}</span>}
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontWeight: 800, color: BLUE, letterSpacing: "0.02em", textTransform: "uppercase" }}>{title}</span>
        </div>
        <span style={{ color: BLUE, flexShrink: 0, marginLeft: "1rem" }}>{open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
      </button>
      {open && <div style={{ paddingBottom: "1.75rem" }}>{children}</div>}
    </div>
  );
}

export default function CompanyHub() {
  useSEO({
    title: "About PFS | Industrial Finishing Equipment Manufacturer | Santa Rosa, CA",
    description: "Platinum Finishing Systems (PFS) manufactures industrial spray booths, ovens, powder coating systems, and blast equipment in Santa Rosa, CA. Factory-direct sales, custom engineering, and nationwide shipping. ETL/UL listed and certified components.",
    canonical: "/company",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    const tryPlay = () => {
      v.play().then(() => setVideoLoaded(true)).catch(() => {
        setTimeout(() => v.play().then(() => setVideoLoaded(true)).catch(() => {}), 500);
      });
    };
    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener('loadeddata', tryPlay, { once: true });
      v.addEventListener('canplay', tryPlay, { once: true });
    }
    v.load();
    return () => {
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
    };
  }, []);

  return (
    <div style={{ background: "#fff" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "clamp(420px, 60vh, 680px)", overflow: "hidden" }}>
        <img src={HERO_POSTER} alt="PFS Platinum Finishing Systems facility in Santa Rosa California" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", transition: "opacity 0.6s", opacity: videoLoaded ? 0 : 1 }} />
        <video preload="auto" ref={videoRef} playsInline muted loop style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", opacity: videoLoaded ? 1 : 0, transition: "opacity 0.8s" }}>
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,20,40,0.50) 0%, rgba(10,20,40,0.75) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: BLUE, zIndex: 3 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
          <div className="container">
            <div style={{ maxWidth: 620 }}>
              <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.65rem" }}>About PFS</p>
              <h1 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "1rem" }}>
                We Started as Distributors.<br /><span style={{ color: GOLD }}>Now We're Manufacturers.</span>
              </h1>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: "1.75rem", maxWidth: 480 }}>
                Founded 2012. In-house manufacturing since 2020. Shipping across the USA and Canada.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/contact">
                  <button style={{ background: GOLD, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.8rem 1.75rem", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    Get a Quote <ArrowRight size={15} />
                  </button>
                </Link>
                <Link href="/company/team">
                  <button style={{ background: "transparent", color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.8rem 1.75rem", border: "2px solid rgba(255,255,255,0.55)", cursor: "pointer" }}>
                    Meet the Team
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: BLUE, padding: "1.5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: "0.4rem 0.25rem" }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, color: GOLD, lineHeight: 1.1 }}>{s.num}</div>
                <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COLLAPSIBLE CONTENT ── */}
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>

        {/* Our Story */}
        <Collapsible title="Our Story" label="Who We Are" defaultOpen={true}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
            <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.92rem", color: "#374151", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p>PFS was founded in 2012 with a simple mission: give finishing contractors and shop owners access to better equipment, faster delivery, and real technical support — not just a catalog and a phone number.</p>
              <p>For the first several years, we distributed the best products we could source. We learned the industry from the inside out — what worked, what failed, what customers actually needed versus what they were being sold. That knowledge became our blueprint.</p>
              <p>In 2020, we made the decision to bring manufacturing fully in-house. We built our own production facility, hired our own fabricators, and took direct control of every component that goes into a PFS system. That shift changed everything.</p>
              <p>Today, PFS designs, engineers, fabricates, and installs finishing systems across the United States and Canada — with 16+ years of hands-on industry experience behind every system we ship.</p>
              <p style={{ fontWeight: 600, color: BLUE }}>We didn't just become a manufacturer. We became the manufacturer that actually understands the job.</p>
            </div>
            <video autoPlay muted loop playsInline style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", objectPosition: "center center", boxShadow: "0 8px 24px rgba(27,58,107,0.12)" }}>
              <source src={STORY_VIDEO} type="video/mp4" />
            </video>
          </div>
        </Collapsible>

        {/* Core Purpose */}
        <Collapsible title="Core Purpose" label="What Drives Us">
          <div style={{ background: BLUE, padding: "2rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)" }} />
            <blockquote style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "0.02em", textTransform: "uppercase", position: "relative" }}>
              "To build the highest quality systems and spaces —<br /><span style={{ color: GOLD }}>faster, safer, and stronger."</span>
            </blockquote>
          </div>
        </Collapsible>

        {/* Core Values */}
        <Collapsible title="Core Values" label="What We Stand For">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ background: "#f8f9fb", border: "1px solid #e2e8f0", borderTop: `3px solid ${BLUE}`, padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ width: 40, height: 40, background: `${BLUE}12`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <v.icon size={20} color={BLUE} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: BLUE, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.15rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 500, color: GOLD, fontStyle: "italic" }}>{v.tagline}</p>
                </div>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.83rem", color: "#4a5568", lineHeight: 1.65 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </Collapsible>

        {/* Vertical Integration */}
        <Collapsible title="Full Vertical Integration" label="Why It Matters">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.92rem", color: "#374151", lineHeight: 1.8 }}>
              Most spray booth companies are distributors. They resell equipment built by someone else, installed by subcontractors, and supported by a third-party service network. When something goes wrong, nobody owns the problem.
            </p>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.92rem", color: "#374151", lineHeight: 1.8 }}>
              PFS is different. We design it, build it, ship it, and install it — under one roof, under one name.
            </p>
            {PILLARS.map((p) => (
              <div key={p.num} style={{ display: "flex", gap: "1.25rem", padding: "1.5rem", background: "#f8f9fb", border: "1px solid #e2e8f0", borderLeft: `4px solid ${BLUE}` }}>
                <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2rem", fontWeight: 800, color: `${BLUE}20`, lineHeight: 1, flexShrink: 0, width: 48 }}>{p.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: BLUE, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.86rem", color: "#4a5568", lineHeight: 1.7 }}>{p.body}</p>
                </div>
              </div>
            ))}
            <div style={{ padding: "1.5rem", background: BLUE }}>
              <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.85rem" }}>What That Means for You</p>
              {["Shorter lead times — no middlemen", "Factory-direct pricing", "One call for service, parts, and support", "Consistent quality from unit to unit", "Accountability at every stage"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <CheckCircle2 size={15} color={GOLD} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Collapsible>

        {/* Our Facility */}
        <Collapsible title="Our Facility" label="Built Here">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.92rem", color: "#374151", lineHeight: 1.8 }}>
              Our production facility in Santa Rosa, CA houses the full manufacturing operation — from steel fabrication to electrical assembly to final QC. Every PFS system leaves this building ready to install.
            </p>
            <img src={FACILITY_SIGN} alt="PFS facility" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", objectPosition: "center center", boxShadow: "0 6px 20px rgba(27,58,107,0.12)" }} />
          </div>
        </Collapsible>

      </div>

      {/* ── MEET THE TEAM CTA ── */}
      <section style={{ padding: "3.5rem 0", background: "#f8f9fb", borderTop: "1px solid #e2e8f0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>The People Behind PFS</span>
          <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: BLUE, lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "0.85rem" }}>Meet the Team</h2>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#4a5568", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 1.75rem" }}>
            Engineers, fabricators, project managers, and installers who take pride in every unit that leaves our floor.
          </p>
          <Link href="/company/team">
            <span className="btn-glow">Meet the Team <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section style={{ padding: "4rem 0", background: "#0D1117", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 60px)" }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Verified Customer Reviews</span>
            <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "0.5rem" }}>What Our Customers Say</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fff" }}>4.9</span>
              <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>· 29 reviews on Google</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {[
              {
                name: "Stephanie Walbourne",
                badge: "Local Guide",
                time: "5 months ago",
                company: "AFD Auto Body · Matthews, NC",
                text: "Isaac guided us through the entire process from start to finish. He was beyond helpful, extremely knowledgeable, and always available. The finished booth has exceeded our expectations — we consistently receive compliments from both our painters and our customers. The quality is outstanding and truly feels like a premium system, but without the expensive price tag."
              },
              {
                name: "Brad Smith",
                badge: "Local Guide",
                time: "1 month ago",
                company: "Cabinet Shop Owner",
                text: "Chris and his team were great to work with. They helped us pick the perfect spray booth for our cabinet shop. We assembled it ourselves, and the quality and craftsmanship of their work was evident from the moment we started unpacking it. We are very pleased with the final product. I would highly recommend them."
              },
              {
                name: "Danny",
                badge: "Local Guide · 158 reviews",
                time: "Verified Customer",
                company: "Coastline Autosport Group · Walnut, CA",
                text: "As President of Coastline Autosport Group, I highly recommend PFS for anyone that requires any type of refinishing or installation. PFS was able to complete our project on time. Not only did they do everything they said they would, they finished before the deadline. We need more dependable companies like this in our industry."
              }
            ].map((review, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem", position: "relative" }}>
                <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", width: 28, height: 28, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "1.25rem", fontStyle: "italic" }}>"{review.text}"</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>{review.name}</div>
                  <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem", color: GOLD, marginTop: "0.15rem" }}>{review.company}</div>
                  <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "0.1rem" }}>{review.time} · {review.badge}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.google.com/maps/place/Platinum+Finishing+Systems+-+Spray+Booths/@38.5107813,-122.790046,17z/data=!3m1!4b1!4m6!3m5!1s0x80843e9a96d2e3ab:0xf9cb90a9f3dee95f"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Read All 29 Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: BLUE, padding: "3.5rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)" }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Get a Quote in 24 Hours</h2>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2rem" }}>
            Tell us your application, your space, and your timeline. We'll come back with a complete system recommendation and pricing — fast.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <button style={{ background: GOLD, color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Get a Quote <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/contact">
              <button style={{ background: "transparent", color: "#fff", fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.85rem 2rem", border: "2px solid rgba(255,255,255,0.5)", cursor: "pointer" }}>
                Schedule Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
