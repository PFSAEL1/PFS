/*
 * PFS Testimonials Section - GFS Corporate Style
 * White background with gray bordered testimonial cards
 */

const testimonials = [
  {
    quote: "PFS delivered our automotive spray booth on time and within budget. The ETL certification made our insurance and permitting process much easier. Highly recommend.",
    author: "Mike T.",
    company: "Premier Auto Body, Sacramento CA",
  },
  {
    quote: "We've been using PFS booths in our aerospace facility for over five years. The quality and compliance documentation they provide is second to none.",
    author: "James R.",
    company: "Pacific Aerospace Coatings, Everett WA",
  },
  {
    quote: "The Apollo AM1-Series heater has been a game changer for our shop. Consistent temperature control and very easy to integrate with our existing booth.",
    author: "Carlos M.",
    company: "Southwest Refinishing, Phoenix AZ",
  },
  {
    quote: "Fast lead times are real — our booth arrived ahead of schedule. The installation team was professional and thorough. We were up and running in two days.",
    author: "Sarah L.",
    company: "Great Lakes Auto Finishing, Detroit MI",
  },
  {
    quote: "PFS worked with us to design a custom large-equipment booth for our construction fleet. The solution they engineered exceeded our expectations.",
    author: "Tom H.",
    company: "Midwest Equipment Services, Kansas City MO",
  },
  {
    quote: "As a PFS distributor, I can say the product quality and support from their team is outstanding. My customers are always satisfied.",
    author: "David K.",
    company: "Industrial Finishing Solutions, Portland OR",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-white border-b border-gray-200">
      <div className="container">
        <div className="mb-10">
          <p className="section-label">Customer Testimonials</p>
          <h2 className="section-heading mb-0">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              {/* Red quote mark */}
              <div
                className="mb-4"
                style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "3rem", lineHeight: 1, color: "#FFFFFF", fontWeight: 700 }}
              >
                &ldquo;
              </div>
              <p
                className="mb-5"
                style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#444", lineHeight: 1.75 }}
              >
                {t.quote}
              </p>
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
                <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.04em" }}>
                  {t.author}
                </p>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "#888" }}>
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
