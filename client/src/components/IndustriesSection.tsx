/*
 * PFS Industries Section - GFS Corporate Style
 * Image cards with hover red overlay, clean grid layout on light gray bg
 */

import { ArrowRight } from "lucide-react";

const AUTOMOTIVE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-automotive-booth-5Xw6Nq9kErF5rCQakrcqSS.webp";
const AEROSPACE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663492797025/Qb3z7L9Ycd6rmfwTi5bWop/pfs-aerospace-booth-gQ3YiB7j5kqdTwxXZsWzPk.webp";

const industries = [
  {
    label: "Automotive Refinishing",
    img: AUTOMOTIVE_IMG,
    desc: "Downdraft and semi-downdraft booths engineered for automotive body shops and dealerships.",
  },
  {
    label: "Aerospace & Aviation",
    img: AEROSPACE_IMG,
    desc: "Large-scale aerospace finishing environments for commercial, military, and private aircraft.",
  },
  {
    label: "Industrial & Manufacturing",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    desc: "Heavy-duty industrial booths for manufacturing, heavy equipment, and large components.",
  },
  {
    label: "Wood & Furniture",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    desc: "Clean-air finishing environments designed for wood, furniture, and cabinetry applications.",
  },
  {
    label: "Marine & Yacht",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    desc: "Custom marine finishing booths built to handle large vessels and specialized coatings.",
  },
  {
    label: "Military & Defense",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    desc: "Compliant finishing systems for military vehicles, aircraft, and defense equipment.",
  },
  {
    label: "Construction & Agriculture",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    desc: "Oversized booths for construction equipment, agricultural machinery, and large vehicles.",
  },
  {
    label: "Rail & Transit",
    img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
    desc: "Specialized rail car and transit vehicle finishing environments for demanding applications.",
  },
];

export default function IndustriesSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="industries" className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label">Industries We Serve</p>
            <h2 className="section-heading mb-0">
              Variety of Products for a<br />Wide Range of Industries
            </h2>
          </div>
          <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#555", maxWidth: "380px", lineHeight: 1.7 }}>
            Don't see your industry? Get in touch with a PFS representative to see how we can provide a quality solution for your needs.
          </p>
        </div>

        {/* Industry cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <button
              key={ind.label}
              onClick={() => scrollTo("#quote")}
              className="group relative overflow-hidden text-left"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={ind.img}
                alt={ind.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Base gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
              />
              {/* Red hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
              />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  className="text-white font-semibold leading-tight"
                  style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.95rem", letterSpacing: "0.04em" }}
                >
                  {ind.label}
                </p>
                <p
                  className="text-transparent group-hover:text-white/90 transition-all duration-300 mt-1 leading-snug"
                  style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.75rem" }}
                >
                  {ind.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button onClick={() => scrollTo("#quote")} className="btn-primary">
            VIEW ALL INDUSTRIES
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
