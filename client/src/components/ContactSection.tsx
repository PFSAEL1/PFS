/*
 * PFS Contact Section - GFS Corporate Style
 * White background, two-column: contact info left, map right
 */

import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white border-b border-gray-200">
      <div className="container">
        <div className="mb-10">
          <p className="section-label">Contact Us</p>
          <h2 className="section-heading mb-0">
            Get in Touch with PFS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact details */}
          <div>
            <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555", lineHeight: 1.75, fontSize: "1rem", marginBottom: "2rem" }}>
              Our team of finishing system specialists is ready to help you find the right solution for your application. Whether you need a quote, technical support, or general information, we're here to help.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "Toll Free", value: "(888) 545-7715" },
                { icon: Mail, label: "Email", value: "info@pfsspraybooths.com" },
                { icon: MapPin, label: "Address", value: "1400 Airport Blvd, Santa Rosa, CA 95403" },
                { icon: Clock, label: "Hours", value: "Monday – Friday | 8:00am – 5:00pm PST" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <item.icon size={16} color="white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "0.15rem" }}>
                      {item.label}
                    </p>
                    <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.95rem", color: "#1a1a1a" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map */}
          <div style={{ minHeight: "380px" }}>
            <iframe
              title="PFS Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3137.9!2d-122.7!3d38.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1400+Airport+Blvd%2C+Santa+Rosa%2C+CA+95403!5e0!3m2!1sen!2sus!4v1"
              className="w-full border-0"
              style={{ minHeight: "380px", height: "100%", filter: "grayscale(20%)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
