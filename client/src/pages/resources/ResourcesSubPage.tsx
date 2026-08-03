import { useState } from "react";
import { useSEO } from '@/hooks/useSEO';
import PageHero from "@/components/PageHero";
import { Link, useParams } from "wouter";
import { ArrowRight, Download, FileText, Lock, CheckCircle } from "lucide-react";

const IMG = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";

// ─── Gated downloads ───────────────────────────────────────────────────────
const GATED_DOWNLOADS = [
  {
    id: "installation-guide",
    title: "PFS Spray Booth Installation Guide",
    description: "Step-by-step installation and commissioning guide for all PFS enclosed spray booth models. Covers site preparation, panel assembly, utility connections, airflow balancing, and initial startup.",
    fileSize: "10.2 MB",
    fileType: "PDF",
    url: "/manus-storage/PFSInstallationGuidev2updated.docx_79ea2fb5.pdf",
    pages: "v2 Updated",
  },
  {
    id: "maintenance-manual",
    title: "PFS Spray Booth Maintenance Manual",
    description: "Comprehensive maintenance manual for PFS spray booths. Includes filter replacement schedules, motor and fan maintenance, lighting, electrical inspection, and troubleshooting guides.",
    fileSize: "5.3 MB",
    fileType: "PDF",
    url: "/manus-storage/PFSSprayBooth-MaintenanceManual.docx(1)_14cb2a6d.pdf",
    pages: "Full Manual",
  },
  {
    id: "orion-crossflow-brochure",
    title: "PFS Orion Series — Cross-Flow Paint Booth Brochure",
    description: "Product brochure for the PFS Orion Series cross-flow paint booth. Covers specifications, airflow design, electrical, filtration, available options, and ordering information.",
    fileSize: "0.7 MB",
    fileType: "PDF",
    url: "/manus-storage/CrossFlowPaintBooth_Orion_09b16221.pdf",
    pages: "Orion Series",
  },
  {
    id: "orion-semi-downdraft-brochure",
    title: "PFS Orion Series — Semi-Downdraft Paint Booth Brochure",
    description: "Product brochure for the PFS Orion Series semi-downdraft paint booth. Covers specifications, airflow configuration, electrical, filtration, available options, and ordering information.",
    fileSize: "0.5 MB",
    fileType: "PDF",
    url: "/manus-storage/SemiDownDraftPaintBooth_Orion_27405017.pdf",
    pages: "Orion Series",
  },
  {
    id: "helios-side-downdraft-brochure",
    title: "PFS Helios Series — Side-Downdraft Paint Booth Brochure",
    description: "Product brochure for the PFS Helios Series side-downdraft paint booth. Covers specifications, airflow design, electrical, filtration, available options, and ordering information.",
    fileSize: "2.9 MB",
    fileType: "PDF",
    url: "/manus-storage/PFS_Helios_Side_Down_Draft_Brochure_05a9077d.pdf",
    pages: "Helios Series",
  },
];

// ─── Gated download form ───────────────────────────────────────────────────
function GatedDownload({ doc }: { doc: typeof GATED_DOWNLOADS[0] }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // In production this would POST to a CRM/email endpoint
    setSubmitted(true);
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        background: "#fff",
        marginBottom: "1.25rem",
      }}
    >
      {/* Document header */}
      <div style={{ padding: "1.5rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
        <div
          style={{
            width: 48,
            height: 48,
            background: "#1B3A6B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <FileText size={22} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "0.35rem",
            }}
          >
            {doc.title}
          </h3>
          <p
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "#555",
              lineHeight: 1.65,
              marginBottom: "0.75rem",
            }}
          >
            {doc.description}
          </p>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#888",
              }}
            >
              {doc.fileType} · {doc.fileSize} · {doc.pages}
            </span>
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          {!submitted ? (
            <button
              onClick={() => setOpen(!open)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#1B3A6B",
                color: "#fff",
                border: "2px solid rgba(107,163,224,0.45)",
                padding: "0.65rem 1.25rem",
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#0f1a30";
                el.style.borderColor = "rgba(107,163,224,1)";
                el.style.boxShadow = "0 0 50px rgba(107,163,224,0.95), 0 0 100px rgba(107,163,224,0.55), 0 0 16px rgba(255,255,255,0.6)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#1B3A6B";
                el.style.borderColor = "rgba(107,163,224,0.45)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              <Lock size={13} />
              {open ? "Cancel" : "Download"}
            </button>
          ) : (
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#166534",
                color: "#fff",
                border: "2px solid #16a34a",
                padding: "0.65rem 1.25rem",
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <Download size={13} />
              Download Now
            </a>
          )}
        </div>
      </div>

      {/* Gated form — expands when Download is clicked */}
      {open && !submitted && (
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Lock size={14} color="#1B3A6B" />
            <p
              style={{
                fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "#444",
                lineHeight: 1.5,
              }}
            >
              Enter your details to access this document. Your download link will appear immediately after submission.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
              <div>
                <label style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "0.35rem" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Smith"
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    border: errors.name ? "1px solid #dc2626" : "1px solid #d1d5db",
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "#1a1a1a",
                    background: "#fff",
                    outline: "none",
                  }}
                />
                {errors.name && <p style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.name}</p>}
              </div>
              <div>
                <label style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "0.35rem" }}>
                  Company
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Acme Body Shop"
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    border: "1px solid #d1d5db",
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "#1a1a1a",
                    background: "#fff",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "0.35rem" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="john@company.com"
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    border: errors.email ? "1px solid #dc2626" : "1px solid #d1d5db",
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "#1a1a1a",
                    background: "#fff",
                    outline: "none",
                  }}
                />
                {errors.email && <p style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.email}</p>}
              </div>
              <div>
                <label style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#333", display: "block", marginBottom: "0.35rem" }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="(888) 555-0100"
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    border: "1px solid #d1d5db",
                    fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "#1a1a1a",
                    background: "#fff",
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#1B3A6B",
                color: "#fff",
                border: "2px solid rgba(107,163,224,0.45)",
                padding: "0.75rem 2rem",
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#0f1a30";
                el.style.borderColor = "rgba(107,163,224,1)";
                el.style.boxShadow = "0 0 50px rgba(107,163,224,0.95), 0 0 100px rgba(107,163,224,0.55)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#1B3A6B";
                el.style.borderColor = "rgba(107,163,224,0.45)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              <Download size={14} />
              Submit & Download
            </button>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem", color: "#888", marginTop: "0.75rem" }}>
              We respect your privacy. Your information will only be used to send relevant PFS product updates.
            </p>
          </form>
        </div>
      )}

      {/* Success state */}
      {submitted && (
        <div
          style={{
            borderTop: "1px solid #bbf7d0",
            background: "#f0fdf4",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <CheckCircle size={20} color="#16a34a" />
          <div>
            <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#166534", marginBottom: "0.2rem" }}>
              Thank you! Your download is ready.
            </p>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555" }}>
              Click the "Download Now" button above to save your copy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
interface ResContent { title: string; desc: string; body: string; }

const CONTENT: Record<string, ResContent> = {
  "spec-sheets": { title: "Spec Sheets", desc: "Technical specifications for all PFS equipment families.", body: "Download technical specification sheets for PFS spray paint booths, powder coating booths, industrial ovens, blast systems, and air make-up units. Spec sheets include dimensions, airflow data, electrical requirements, and performance specifications." },
  "installation-guides": { title: "Installation Guides", desc: "Installation and commissioning guides for PFS equipment.", body: "PFS installation guides provide step-by-step instructions for installing and commissioning all PFS equipment. Guides cover site preparation, equipment assembly, utility connections, and initial startup procedures." },
  "videos": { title: "Videos", desc: "Product overview and installation videos.", body: "Watch product overview videos, installation demonstrations, and customer testimonials for PFS finishing equipment. Videos are available for all major product families." },
  "case-studies": { title: "Case Studies", desc: "Real-world PFS installations across industries.", body: "Read about real PFS installations across collision repair, automotive manufacturing, aerospace, heavy equipment, and other industries. Case studies include project details, challenges, and results." },
  "faqs": { title: "Frequently Asked Questions", desc: "Common questions about PFS equipment.", body: "Find answers to frequently asked questions about PFS spray booths, powder coating systems, industrial ovens, and service programs. Can't find your answer? Contact our team." },
  "downloads": { title: "Installation Guides & Maintenance", desc: "Installation guide, maintenance manual, and spec sheets for all PFS spray booth models.", body: "Download the PFS Installation Guide, Maintenance Manual, and Spec Sheets — all bundled here. These documents cover site preparation, panel assembly, utility connections, airflow balancing, filter replacement schedules, motor maintenance, and full equipment specifications. Enter your contact information to unlock instant access, free of charge." },
};

export default function ResourcesSubPage() {
  useSEO({
    title: "Downloads | Installation Guides, Maintenance Manuals & Spec Sheets | PFS",
    description: "Download PFS installation guides, maintenance manuals, spec sheets, and technical documents for spray paint booths, industrial ovens, powder coating systems, and blast equipment. Gated access — fill out a short form to download.",
  });

  const params = useParams<{ sub: string }>();
  const sub = params.sub || "";
  const content = CONTENT[sub];

  const showGatedDownloads = sub === "downloads" || sub === "installation-guides";

  if (!content) {
    return (
      <div>
        <PageHero title="Resources" breadcrumbs={[{ label: "Resources", href: "/resources" }]} />
        <div className="container py-16 text-center">
          <p className="section-body">Resource not found. Please use the navigation above.</p>
          <Link href="/resources"><span className="btn-glow mt-4 inline-flex">Back to Resources</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title={content.title} subtitle={content.desc} breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: content.title }]} bgImage={IMG} />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="section-label">Resources</span>
              <h2 className="section-heading">{content.title}</h2>
              <p className="section-body mb-8">{content.body}</p>

              {/* Gated downloads for installation-guides and downloads pages */}
              {showGatedDownloads ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1.25rem",
                      padding: "0.75rem 1rem",
                      background: "#eff6ff",
                      border: "1px solid #bfdbfe",
                    }}
                  >
                    <Lock size={14} color="#1B3A6B" />
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#1e40af" }}>
                      These documents are available free of charge. A brief contact form unlocks your download instantly.
                    </p>
                  </div>
                  {GATED_DOWNLOADS.map(doc => (
                    <GatedDownload key={doc.id} doc={doc} />
                  ))}
                </div>
              ) : (
                <div className="p-6 border border-gray-200 bg-gray-50">
                  <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem" }}>Resources are available upon request. Contact us to receive the documentation you need.</p>
                  <Link href="/contact/request-a-quote"><span className="btn-glow">Request Resources <ArrowRight size={14} /></span></Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="p-5 border border-gray-200">
              <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "0.75rem" }}>Need Help?</h4>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.7, marginBottom: "1rem" }}>Our team can help you find the right documentation for your project.</p>
              <Link href="/contact/request-a-quote"><span className="btn-glow w-full justify-center" style={{ fontSize: "0.75rem" }}>CONTACT US</span></Link>
              <a href="tel:8885457715" className="mt-3 block text-center" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#555" }}>(888) 545-7715</a>

              {/* Quick links to other resources */}
              <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Other Resources</h4>
                {[
                  { label: "Installation Guides", href: "/resources/installation-guides" },
                  { label: "Downloads", href: "/resources/downloads" },
                  { label: "Spec Sheets", href: "/resources/spec-sheets" },
                  { label: "FAQs", href: "/resources/faqs" },
                ].filter(r => !r.href.includes(sub)).map(r => (
                  <Link key={r.href} href={r.href}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#1B3A6B", padding: "0.3rem 0", cursor: "pointer" }}>
                      <ArrowRight size={12} /> {r.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
