/**
 * News & Press — /company/news
 * Unique hero render (dark navy with geometric grid overlay + PFS wordmark)
 * Featured article: Filter Division + Maintenance Division expansion announcement
 * Press photo: 1E5D91B3 installation image
 * PFS Service logo in article body
 */
import { Link } from "wouter";
import { ArrowRight, Calendar, Tag, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BLUE = "#1B3A6B";
const PRESS_PHOTO  = "/manus-storage/1E5D91B3-7FA4-46B5-866D-BBA68134E884_4f79ba41.jpeg";
const SERVICE_LOGO = "/manus-storage/PFSSERVICELOGO_d486d305.png";

// ── ARTICLE DATA ──────────────────────────────────────────────────────────────
const FEATURED_ARTICLE = {
  date: "July 2025",
  category: "Company News",
  headline: "PFS Expands Filter Division and Maintenance Division to Serve Growing National Customer Base",
  subheadline: "Platinum Finishing Systems announces dedicated service and filter supply programs for spray booth operators across North America.",
};

const PRESS_RELEASES = [
  {
    date: "June 2025",
    category: "Product News",
    headline: "PFS Launches Apollo AMU Series — Factory-Matched Air Make-Up Units for PFS Spray Booths",
    excerpt: "The Apollo AMU series is engineered and manufactured at PFS's Santa Rosa, CA facility, providing turnkey heated air make-up for crossflow, semi-downdraft, and downdraft booth configurations.",
    href: "/products/air-make-up-units",
  },
  {
    date: "May 2025",
    category: "Service",
    headline: "PFS Expands California Service Coverage — CARB, AQMD, and NFPA 33 Compliance Support",
    excerpt: "PFS certified technicians now cover the full Northern California market including Bay Area, Sacramento Valley, North Bay, and Solano County for spray booth inspection, maintenance, and compliance documentation.",
    href: "/spray-booth-service-california",
  },
  {
    date: "April 2025",
    category: "Product News",
    headline: "PFS Introduces Orion Series Enclosed Spray Booths — ETL Listed, NFPA 33 Compliant",
    excerpt: "The Orion Series sets a new benchmark for enclosed spray booth performance, featuring UL 508A certified control panels, CID2 lighting, and factory-matched Apollo AMU integration.",
    href: "/products/paint-booths/enclosed",
  },
];

export default function NewsPage() {
  useSEO({
    title: "News & Press | PFS Filter Division & Maintenance Division Expansion | Platinum Finishing Systems",
    description: "PFS announces expansion of its Filter Division and Maintenance Division. Read the latest news from Platinum Finishing Systems — spray booth manufacturer based in Santa Rosa, CA.",
    canonical: "/company/news",
  });

  return (
    <div style={{ background: "#fff" }}>

      {/* ── UNIQUE HERO RENDER — geometric grid + PFS wordmark ──────────────── */}
      <section
        style={{
          position: "relative",
          background: "#080810",
          overflow: "hidden",
          minHeight: "55vh",
          display: "flex",
          alignItems: "flex-end",
          paddingTop: "7rem",
        }}
      >
        {/* Geometric grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: [
              "linear-gradient(rgba(27,58,107,0.18) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(27,58,107,0.18) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />
        {/* Diagonal accent line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: "15%",
            width: "1px",
            height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(27,58,107,0.6), transparent)",
            transform: "skewX(-8deg)",
            pointerEvents: "none",
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "60%",
            height: "80%",
            background: "radial-gradient(ellipse at center, rgba(27,58,107,0.4) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        {/* Bottom gradient fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(8,8,16,0.9), transparent)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "3.5rem" }}>
          {/* Breadcrumb */}
          <div style={{ display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.5rem" }}>
            <Link href="/company">
              <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",transition:"color 0.15s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.4)")}>
                Company
              </span>
            </Link>
            <span style={{ color:"rgba(255,255,255,0.2)",fontSize:"0.7rem" }}>›</span>
            <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:"0.1em",textTransform:"uppercase" }}>
              News & Press
            </span>
          </div>

          <div style={{ display:"inline-flex",alignItems:"center",gap:"0.6rem",marginBottom:"1rem" }}>
            <div style={{ width:"2rem",height:"2px",background:BLUE }} />
            <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.5)",letterSpacing:"0.15em",textTransform:"uppercase" }}>
              PFS
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              marginBottom: "1rem",
              maxWidth: "700px",
            }}
          >
            News &<br />Press
          </h1>

          <p
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            The latest from Platinum Finishing Systems — product launches, service expansions, and company milestones.
          </p>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ─────────────────────────────────────────────────── */}
      <section style={{ background: "#f9fafb", padding: "5rem 0" }}>
        <div className="container">

          {/* Article header */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.75rem" }}>
              <div style={{ width:"2rem",height:"2px",background:BLUE }} />
              <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.72rem",fontWeight:700,color:BLUE,letterSpacing:"0.15em",textTransform:"uppercase" }}>
                Featured Release
              </span>
            </div>
          </div>

          {/* Article card */}
          <article
            style={{
              background: "#fff",
              border: `1px solid #e5e7eb`,
              borderTop: `4px solid ${BLUE}`,
              overflow: "hidden",
            }}
          >
            {/* Press photo — full width */}
            <div style={{ position:"relative",overflow:"hidden",maxHeight:"480px" }}>
              <img
                src={PRESS_PHOTO}
                alt="PFS Orion spray booth being installed at a customer facility — PFS technicians on-site with forklift and booth panels"
                style={{ width:"100%",height:"480px",objectFit:"cover",objectPosition:"center 30%" }}
              />
              <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(8,8,16,0.5) 0%, transparent 50%)",pointerEvents:"none" }} />
              {/* Category badge over image */}
              <div style={{ position:"absolute",top:"1.5rem",left:"1.5rem",background:BLUE,color:"#fff",fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",padding:"0.35rem 0.85rem" }}>
                Company News
              </div>
            </div>

            {/* Article body */}
            <div style={{ padding:"3rem 3rem 2.5rem" }}>
              {/* Meta */}
              <div style={{ display:"flex",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem",flexWrap:"wrap" }}>
                <span style={{ display:"flex",alignItems:"center",gap:"0.4rem",fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.8rem",color:"#888" }}>
                  <Calendar size={13} /> {FEATURED_ARTICLE.date}
                </span>
                <span style={{ display:"flex",alignItems:"center",gap:"0.4rem",fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.8rem",color:"#888" }}>
                  <Tag size={13} /> {FEATURED_ARTICLE.category}
                </span>
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 800,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                }}
              >
                {FEATURED_ARTICLE.headline}
              </h2>
              <p
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "1.05rem",
                  color: "#555",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                  fontStyle: "italic",
                }}
              >
                {FEATURED_ARTICLE.subheadline}
              </p>

              {/* PFS Service logo */}
              <div style={{ marginBottom:"2rem",display:"flex",alignItems:"center",gap:"1rem",padding:"1.25rem 1.5rem",background:"#f0f4f9",borderLeft:`4px solid ${BLUE}` }}>
                <img
                  src={SERVICE_LOGO}
                  alt="PFS Service — Platinum Finishing Systems service division logo"
                  style={{ height:"52px",width:"auto",objectFit:"contain",flexShrink:0 }}
                />
                <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.85rem",color:"#444",lineHeight:1.6,margin:0 }}>
                  <strong>PFS Service</strong> is the dedicated service division of Platinum Finishing Systems, providing preventive maintenance, emergency repair, NFPA 33 inspections, and filter supply programs for spray booth and finishing equipment operators nationwide.
                </p>
              </div>

              {/* Article body copy */}
              <div style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.95rem",color:"#333",lineHeight:1.85 }}>
                <p style={{ marginBottom:"1.5rem" }}>
                  <strong>Santa Rosa, CA — July 2025</strong> — Platinum Finishing Systems (PFS), a leading manufacturer of industrial spray paint booths, powder coating systems, and finishing equipment, today announced a significant expansion of its Filter Division and Maintenance Division to meet growing demand from spray booth operators across North America.
                </p>
                <p style={{ marginBottom:"1.5rem" }}>
                  The expansion reflects PFS's commitment to supporting customers throughout the full lifecycle of their finishing equipment — from initial installation through ongoing compliance, maintenance, and consumable supply. Both divisions have been operating in a limited capacity for years; the 2025 expansion formalizes and scales these programs to serve a broader national customer base.
                </p>

                <h3 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:700,color:"#111",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:"0.75rem",marginTop:"2rem" }}>
                  Filter Division: Spec-Matched Replacement Filters, Shipped Nationally
                </h3>
                <p style={{ marginBottom:"1.5rem" }}>
                  The PFS Filter Division now offers a complete catalog of spray booth replacement filters — including fiberglass exhaust filters, polyester intake filters, tackified media, and blanket-style intake upgrades — spec-matched to PFS booth configurations and compatible with most major brands. Filters ship nationally from our Santa Rosa facility with fast lead times and volume pricing available for multi-location operators.
                </p>
                <p style={{ marginBottom:"1.5rem" }}>
                  A new Filter Rotation Program is available for customers who want to schedule regular filter deliveries on a quarterly or semi-annual basis, ensuring NFPA 33 compliance and consistent booth performance without the overhead of managing individual purchase orders. Customers can order filters directly at <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" style={{ color:BLUE,fontWeight:700 }}>pfsfilters.com</a> or by calling our team at (888) 545-7715.
                </p>

                <h3 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:700,color:"#111",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:"0.75rem",marginTop:"2rem" }}>
                  Maintenance Division: Certified Technicians, Nationwide Coverage
                </h3>
                <p style={{ marginBottom:"1.5rem" }}>
                  The PFS Maintenance Division has expanded its field service team and geographic coverage to support customers across the United States. PFS certified technicians provide preventive maintenance programs, emergency service, NFPA 33 annual inspections, booth retrofits and upgrades, and full installation services for new equipment.
                </p>
                <p style={{ marginBottom:"1.5rem" }}>
                  California customers benefit from dedicated coverage across Northern California — including the Bay Area, Sacramento Valley, North Bay, and Solano County — with technicians trained in CARB, AQMD, and NFPA 33 compliance documentation. PFS can provide inspection reports, airflow calculations, and permit packages to support air district permit renewals and AHJ approvals.
                </p>
                <p style={{ marginBottom:"1.5rem" }}>
                  "Our customers invest in PFS equipment because they want it to run reliably for decades," said the PFS team. "Expanding our service and filter programs is the natural next step — we want to be the only call our customers need to make when something needs attention."
                </p>

                <h3 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:700,color:"#111",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:"0.75rem",marginTop:"2rem" }}>
                  About Platinum Finishing Systems
                </h3>
                <p style={{ marginBottom:"1.5rem" }}>
                  Platinum Finishing Systems (PFS) is a vertical manufacturer of industrial spray paint booths, powder coating systems, blast rooms, industrial ovens, air make-up units, and finishing automation equipment. Founded in 1989 and headquartered in Santa Rosa, California, PFS designs, fabricates, and assembles all equipment at its Northern California facility using domestic steel and components. PFS equipment is ETL-listed, built to NFPA 33, and supported by UL 508A certified control panels.
                </p>
              </div>

              {/* Article CTAs */}
              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",marginTop:"2.5rem",paddingTop:"2rem",borderTop:"1px solid #e5e7eb" }}>
                <Link href="/service">
                  <button className="btn-glow" style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",display:"inline-flex",alignItems:"center",gap:"0.5rem",cursor:"pointer" }}>
                    EXPLORE PFS SERVICE <ArrowRight size={14} />
                  </button>
                </Link>
                <Link href="/filters">
                  <button className="btn-glow" style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",display:"inline-flex",alignItems:"center",gap:"0.5rem",cursor:"pointer" }}>
                    ORDER FILTERS <ArrowRight size={14} />
                  </button>
                </Link>
                <a href="tel:8885457715">
                  <button style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.9rem 2rem",background:"transparent",color:"#111",border:"1.5px solid #ccc",cursor:"pointer",transition:"border-color 0.2s" }}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor="#111")}
                    onMouseLeave={e=>(e.currentTarget.style.borderColor="#ccc")}>
                    (888) 545-7715
                  </button>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── MORE PRESS RELEASES ──────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ marginBottom:"2.5rem" }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.75rem" }}>
              <div style={{ width:"2rem",height:"2px",background:BLUE }} />
              <span style={{ fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.72rem",fontWeight:700,color:BLUE,letterSpacing:"0.15em",textTransform:"uppercase" }}>
                Recent News
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#111",
                lineHeight: 1.1,
              }}
            >
              More from PFS
            </h2>
          </div>

          <div style={{ display:"flex",flexDirection:"column",gap:"1.5rem" }}>
            {PRESS_RELEASES.map((pr, i) => (
              <Link key={i} href={pr.href}>
                <div
                  style={{
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderLeft: `4px solid ${BLUE}`,
                    padding: "1.75rem 2rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.background="#f0f4f9")}
                  onMouseLeave={e=>(e.currentTarget.style.background="#f9fafb")}
                >
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:"1rem",marginBottom:"0.6rem",flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.75rem",color:"#888" }}>{pr.date}</span>
                      <span style={{ background:BLUE,color:"#fff",fontFamily:"'Chakra Petch',sans-serif",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"0.2rem 0.6rem" }}>{pr.category}</span>
                    </div>
                    <h3 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"1rem",fontWeight:700,color:"#111",lineHeight:1.2,marginBottom:"0.5rem",textTransform:"uppercase",letterSpacing:"0.02em" }}>
                      {pr.headline}
                    </h3>
                    <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.875rem",color:"#555",lineHeight:1.65 }}>
                      {pr.excerpt}
                    </p>
                  </div>
                  <ChevronRight size={20} color={BLUE} style={{ flexShrink:0 }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDIA CONTACT CTA ────────────────────────────────────────────────── */}
      <section style={{ background: BLUE, padding: "4rem 0" }}>
        <div className="container" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem" }}>
          <div>
            <h2 style={{ fontFamily:"'Chakra Petch','Barlow Condensed',sans-serif",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,color:"#fff",lineHeight:1.1,marginBottom:"0.5rem" }}>
              Media Inquiries
            </h2>
            <p style={{ fontFamily:"'Archivo Narrow','Inter',sans-serif",fontSize:"0.95rem",color:"rgba(255,255,255,0.7)",lineHeight:1.6 }}>
              For press inquiries, product photography, or media requests, contact our team directly.
            </p>
          </div>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
            <a href="mailto:info@pfsspraybooths.com">
              <button className="btn-glow" style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 2rem",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"0.5rem" }}>
                EMAIL US <ArrowRight size={14} />
              </button>
            </a>
            <a href="tel:8885457715">
              <button style={{ fontFamily:"'Chakra Petch',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.1em",textTransform:"uppercase",padding:"0.85rem 2rem",background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.5)",cursor:"pointer",transition:"border-color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="#fff")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.5)")}>
                (888) 545-7715
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
