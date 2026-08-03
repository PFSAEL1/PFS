import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link, useParams } from "wouter";
import { ArrowRight } from "lucide-react";

const AERO = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";
const PAINT = "/manus-storage/pfs-paint-booth-sprayer-card_42d3ea13.jpg";

interface CompanyContent { title: string; desc: string; body: string; img: string; }

const CONTENT: Record<string, CompanyContent> = {
  "about": { title: "About PFS", desc: "Our history, mission, and commitment to quality industrial finishing equipment.", body: "PFS (PFS) was founded in 1989 with a simple mission: to build the best industrial finishing equipment in North America. Over 35 years later, that mission remains unchanged. We design, engineer, and manufacture built with ETL/UL certified components spray paint booths, powder coating systems, industrial ovens, blast equipment, and complete finishing lines at our Santa Rosa, California facility. Every PFS system is engineered to order by our in-house team of finishing equipment specialists. We use domestic steel and components wherever possible, and every booth leaves our facility with a full inspection and ETL certification.", img: AERO },
  "leadership": { title: "Leadership", desc: "Meet the team behind PFS.", body: "PFS is led by a team of experienced finishing equipment professionals with decades of combined experience in spray booth design, manufacturing, and service. Our leadership team is hands-on and accessible — when you work with PFS, you work directly with the people who build your equipment.", img: PAINT },
  "manufacturing": { title: "Manufacturing", desc: "Our Santa Rosa, CA manufacturing facility.", body: "All PFS equipment is designed and manufactured at our facility in Santa Rosa, California. Our manufacturing floor is equipped with CNC fabrication equipment, welding stations, and a full finishing and quality control department. Every booth is assembled, tested, and inspected before it leaves our facility.", img: AERO },
  "certifications": { title: "Certifications & Compliance", desc: "ETL, NFPA 33, OSHA, and other certifications.", body: "PFS spray booths are built with ETL/UL listed components to NFPA 33 (Standard for Spray Application Using Flammable or Combustible Materials) and meet OSHA requirements for spray finishing operations. Our equipment also complies with IFC (International Fire Code) and local building code requirements in all 50 states.", img: PAINT },
  "careers": { title: "Careers", desc: "Join the PFS team.", body: "PFS is always looking for talented people to join our team. We offer competitive compensation, benefits, and the opportunity to work on challenging, meaningful projects in a growing company. Current openings include positions in engineering, manufacturing, sales, and field service.", img: AERO },
  "news": { title: "News & Press", desc: "Latest news and announcements from PFS.", body: "Stay up to date with the latest news, product announcements, and industry updates from PFS. Check back regularly for new content.", img: PAINT },
};

export default function CompanySubPage() {
  useSEO({
    title: "About Platinum Finishing Systems | Industrial Spray Booth Manufacturer",
    description: "Platinum Finishing Systems manufactures industrial spray paint booths, powder coating systems, industrial ovens, and blast equipment in Santa Rosa, CA. ETL/UL certified, ISO 9001, and made in the USA.",
  });

  const params = useParams<{ sub: string }>();
  const sub = params.sub || "";
  const content = CONTENT[sub];

  if (!content) {
    return (
      <div>
        <PageHero title="Company" breadcrumbs={[{ label: "Company", href: "/company" }]} />
        <div className="container py-16 text-center">
          <p className="section-body">Page not found. Please use the navigation above.</p>
          <Link href="/company"><span className="btn-glow mt-4 inline-flex">Back to Company</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title={content.title} subtitle={content.desc} breadcrumbs={[{ label: "Company", href: "/company" }, { label: content.title }]} bgImage={content.img} />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <span className="section-label">Company</span>
              <h2 className="section-heading">{content.title}</h2>
              <p className="section-body mb-4">{content.body}</p>
              <div className="mt-6">
                <Link href="/contact/request-a-quote"><span className="btn-glow">Contact Us <ArrowRight size={14} /></span></Link>
              </div>
            </div>
            <div>
              <img src={content.img} alt={content.title} className="w-full object-cover" style={{ height: "280px" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
