/*
 * PFS CTA Banner - GFS Corporate Style
 * Full-width red banner with headline and two buttons, no diagonal cuts
 */

import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 border-b border-red-900" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-white mb-2"
              style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.15 }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-red-100"
              style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.6 }}
            >
              Contact a PFS representative today for a custom quote, product information, or technical support.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <button onClick={() => scrollTo("#quote")} className="btn-white-outline">
              REQUEST INFO
              <ArrowRight size={15} />
            </button>
            <a href="tel:8885457715" className="btn-white-outline">
              CALL (888) 545-7715
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
