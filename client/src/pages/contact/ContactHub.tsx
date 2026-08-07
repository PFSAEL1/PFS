import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const IMG = "/manus-storage/helios-booth-warehouse_7b31d966.jpg";

export default function ContactHub() {
  useSEO({
    title: "Contact PFS | Request a Quote for Spray Booths & Finishing Equipment",
    description: "Contact Platinum Finishing Systems for spray paint booth pricing, industrial oven quotes, blast room specifications, and finishing line consultations. Call (888) 545-7715 or email info@pfsspraybooths.com.",
    canonical: "/contact",
  });

  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Message sent! A PFS representative will contact you shortly.");
    setForm({ name: "", company: "", email: "", phone: "", message: "" });
  }

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with the PFS team — we're ready to help with your finishing equipment project."
        breadcrumbs={[{ label: "Contact" }]}
        bgImage={IMG}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="section-label">Get in Touch</span>
              <h2 data-animation="slideLeft" className="section-heading">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">Name *</label>
                    <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Company</label>
                    <input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea className="form-input" rows={5} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button data-animation="slideRight"
                  type="submit" className="btn-glow">Send Message</button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.04em", marginBottom: "1rem" }}>CONTACT INFORMATION</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone size={16} style={{ color: "#FFFFFF", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#888", marginBottom: "0.15rem" }}>Phone</div>
                      <a href="tel:8885457715" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#1a1a1a", fontWeight: 600 }}>(888) 545-7715</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={16} style={{ color: "#FFFFFF", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#888", marginBottom: "0.15rem" }}>Email</div>
                      <a href="mailto:info@pfsspraybooths.com" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#1a1a1a", fontWeight: 600 }}>info@pfsspraybooths.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} style={{ color: "#FFFFFF", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#888", marginBottom: "0.15rem" }}>Address</div>
                      <div style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.9rem", color: "#1a1a1a", fontWeight: 600, lineHeight: 1.6 }}>PFS — Industrial Finishing Equipment<br />Santa Rosa, CA</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t pt-6">
                <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>QUICK LINKS</h3>
                <div className="space-y-2">
                  <Link href="/contact/request-a-quote"><div className="text-sm hover:text-[#1B2B4B] transition-colors cursor-pointer" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555" }}>→ Request a Quote</div></Link>
                  <Link href="/contact/talk-to-an-engineer"><div className="text-sm hover:text-[#1B2B4B] transition-colors cursor-pointer" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555" }}>→ Talk to an Engineer</div></Link>
                  <Link href="/contact/find-a-dealer"><div className="text-sm hover:text-[#1B2B4B] transition-colors cursor-pointer" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555" }}>→ Find a Dealer</div></Link>
                  <Link href="/contact/service-request"><div className="text-sm hover:text-[#1B2B4B] transition-colors cursor-pointer" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", color: "#555" }}>→ Service Request</div></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
