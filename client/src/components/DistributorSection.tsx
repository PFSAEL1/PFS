/*
 * PFS Distributor Section - GFS Corporate Style
 * Gray background, two-column layout with image and text
 */

import { ArrowRight } from "lucide-react";

const FACILITY_IMG = "/manus-storage/pfs-facility-building_bece7d21.jpg";

export default function DistributorSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="distributor" className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <img
              src={FACILITY_IMG}
              alt="PFS Distributor Partnership"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <div className="absolute top-0 right-0 w-1 h-full" style={{ backgroundColor: "#FFFFFF" }} />
          </div>

          {/* Right: Text */}
          <div>
            <p className="section-label">Partnership Opportunities</p>
            <h2 className="section-heading">
              Become a PFS<br />Authorized Distributor
            </h2>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1.25rem" }}>
              PFS is actively expanding its network of authorized distributors across North America. As a PFS distributor, you'll gain access to our full line of built with ETL/UL certified components spray booths, finishing systems, and make-up air heaters — backed by industry-leading technical support and competitive margins.
            </p>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", lineHeight: 1.75, fontSize: "1rem", marginBottom: "2rem" }}>
              We provide comprehensive training, marketing materials, and dedicated account management to help you grow your business and serve your customers with confidence.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "Competitive margins",
                "Technical training",
                "Marketing support",
                "Dedicated account manager",
                "Full product line access",
                "Co-op advertising",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 flex-shrink-0" style={{ backgroundColor: "#FFFFFF" }} />
                  <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#444" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button onClick={() => scrollTo("#quote")} className="btn-primary btn-glow">
              INQUIRE ABOUT DISTRIBUTORSHIP
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
