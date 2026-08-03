/*
 * PFS Why Choose Section - GFS Corporate Style
 * 4-column icon grid on white background, clean and professional
 */

import { Award, Zap, DollarSign, Headphones } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "ETL/UL Certified Components",
    desc: "All PFS spray booths are built with ETL/UL certified components to Intertek 5022693, meeting NFPA, OSHA, and CSA standards for safety and compliance.",
  },
  {
    icon: Zap,
    title: "Fast Lead Times",
    desc: "Industry-leading production and delivery schedules. We understand that downtime costs money — our team moves fast.",
  },
  {
    icon: DollarSign,
    title: "Financing Options",
    desc: "Flexible financing programs to help businesses of all sizes acquire the finishing equipment they need without capital constraints.",
  },
  {
    icon: Headphones,
    title: "Lifetime Support",
    desc: "Our technical support team and distribution network provide installation, training, service, and parts support for the life of your equipment.",
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-16 bg-white border-b border-gray-200">
      <div className="container">
        {/* Intro text */}
        <div className="max-w-3xl mb-12">
          <p className="section-label">Why Choose PFS</p>
          <h2 className="section-heading">
            Leading the Industry in Paint Booth<br />and Finishing System Technology
          </h2>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", lineHeight: 1.75, fontSize: "1rem" }}>
            PFS has an extensive history of designing and building exceptional paint booths and finishing equipment that help businesses achieve flawless paint finishes, maximize productivity, and protect the health of their employees.
          </p>
        </div>

        {/* 4-column feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-8 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-4"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <feat.icon size={22} color="white" strokeWidth={1.5} />
              </div>
              <h3
                className="mb-3"
                style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.03em" }}
              >
                {feat.title}
              </h3>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#555", lineHeight: 1.7 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-0 border-x border-b border-gray-200">
          {[
            { value: "500+", label: "Booths Installed" },
            { value: "24 Hr", label: "Quote Response Time" },
            { value: "ETL", label: "Certified & Compliant" },
            { value: "15+", label: "Industries Served" },
          ].map((stat) => (
            <div key={stat.label} className="py-8 text-center border-r border-gray-200 last:border-r-0">
              <div
                className="mb-1"
                style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "2.25rem", fontWeight: 700, color: "#FFFFFF" }}
              >
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
