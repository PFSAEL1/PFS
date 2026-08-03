import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight, BookOpen, FileText, Play, Users, HelpCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const IMG = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";

const RESOURCES = [
  {
    label: "Downloads",
    slug: "downloads",
    desc: "Installation guides, maintenance manuals, spec sheets, and brochures for all PFS finishing equipment. Free with contact info.",
    icon: BookOpen,
  },
  {
    label: "Case Studies",
    slug: "case-studies",
    desc: "Real-world PFS installations across collision repair, aerospace, heavy equipment, and other industries.",
    icon: Users,
  },
  {
    label: "FAQs",
    slug: "faqs",
    desc: "Frequently asked questions about PFS spray booths, powder coating systems, industrial ovens, and service programs.",
    icon: HelpCircle,
  },
  {
    label: "Videos",
    slug: "videos",
    desc: "Product overview and installation videos for PFS finishing equipment.",
    icon: Play,
  },
  {
    label: "Spec Sheets",
    slug: "downloads",
    desc: "Technical specification sheets are bundled in the Downloads section along with installation guides and maintenance manuals.",
    icon: FileText,
  },
];

export default function ResourcesHub() {
  useSEO({
    title: "Resources | Downloads, Manuals & FAQs | PFS",
    description: "Access PFS spray booth installation guides, maintenance manuals, spec sheets, case studies, and FAQs. All technical documentation for PFS finishing equipment. Manufactured in Santa Rosa, CA.",
  });

  return (
    <div>
      <PageHero
        title="Resources"
        subtitle="Technical documentation, installation guides, maintenance manuals, and FAQs for all PFS finishing equipment."
        breadcrumbs={[{ label: "Resources" }]}
        bgImage={IMG}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-10">
            <span className="section-label">Resource Library</span>
            <h2 className="section-heading-lg">Everything You Need to Specify, Install, and Operate PFS Equipment</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <Link key={r.slug + r.label} href={`/resources/${r.slug}`}>
                  <div
                    className="group flex flex-col p-6 border border-gray-200 transition-all h-full"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "#1B3A6B";
                      el.style.background = "#f0f6ff";
                      el.style.boxShadow = "0 0 30px rgba(107,163,224,0.25), 0 4px 16px rgba(27,58,107,0.12)";
                      el.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "#e5e7eb";
                      el.style.background = "#fff";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: "#1B3A6B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color="#fff" />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        marginBottom: "0.5rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {r.label}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                        fontSize: "0.82rem",
                        color: "#666",
                        lineHeight: 1.65,
                        flex: 1,
                      }}
                    >
                      {r.desc}
                    </p>
                    <div
                      className="flex items-center gap-1 mt-4 group-hover:gap-2 transition-all"
                      style={{
                        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#1B3A6B",
                        fontWeight: 700,
                      }}
                    >
                      View <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
