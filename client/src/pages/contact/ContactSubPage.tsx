import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link, useParams } from "wouter";
import { Phone, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

/* ─────────────────────────────────────────────────────────────────────────
   CONTEXTUAL IMAGE MAP
   ?from=<key> on the URL → show a relevant product image in the hero
   Add new keys as new product pages are built.
───────────────────────────────────────────────────────────────────────── */
const CONTEXT_IMAGES: Record<string, { img: string; pos: string }> = {
  // Ovens
  "batch-oven":           { img: "/manus-storage/IMG_4175_a7a2b2ea.jpg",                         pos: "center 50%" },
  "conveyor-oven":        { img: "/manus-storage/pfs-vulcan-oven-card_ad72eade_316de7d1.png",              pos: "center 50%" },
  "oven":                 { img: "/manus-storage/IMG_4182_72dfc596.jpg",                          pos: "center 40%" },
  // Paint booths — real install photos used as heroes
  "enclosed-booth":       { img: "/manus-storage/pfs-helios-enclosed-booth-real_2bc88039.jpeg",       pos: "center 50%" },
  "crossflow-booth":      { img: "/manus-storage/orion-crossflow-render-v3_63c04d8e.webp",           pos: "center 50%" },
  "side-downdraft-booth": { img: "/manus-storage/pfs-helios-sdd-hero-real_476e000d.jpg",              pos: "center 40%" },
  "open-face-booth":      { img: "/manus-storage/openface-exterior-pfs-logo_dc802808.png",            pos: "center 50%" },
  "double-wall-booth":    { img: "/manus-storage/dw-zenith-exterior-1_18ffc860.webp",                 pos: "center 45%" },
  "semi-downdraft-booth": { img: "/manus-storage/semi-down-open-front-hero_5ce2543a_d5528751.png",   pos: "center 50%" },
  "full-downdraft-booth": { img: "/manus-storage/pfs-downdraft-raised-basement-booth_2c67ebec.jpeg", pos: "center 50%" },
  "truck-booth":          { img: "/manus-storage/7846065711037012972_3870c713.webp",                  pos: "center 35%" },
  "aircraft-booth":       { img: "/manus-storage/aero_pfs_jet_side_0b0bc5eb.png",                    pos: "center 50%" },
  "outdoor-booth":        { img: "/manus-storage/pfs-outdoor-zenith-golden-hour_734e8047.jpg",         pos: "center 50%" },
  "container-booth":      { img: "/manus-storage/pfs-container-booth-card-v2_b8177420.jpg",           pos: "center 50%" },
  "heated-booth":         { img: "/manus-storage/pfs-helios-heated-booth-front_37d91be3.jpeg",        pos: "center 50%" },
  "inspection-booth":     { img: "/manus-storage/pfs-inspection-hero_1b83deb1.png",                   pos: "center 50%" },
  "sprinter-van-booth":   { img: "/manus-storage/pfs-helios-sdd-front-full_04883b65.jpg",             pos: "center 50%" },
  // Prep & support
  "prep-station":         { img: "/manus-storage/pfs-prep-station-curtain-real_c07d32e0.jpg",     pos: "center 50%" },
  "paint-wall":           { img: "/manus-storage/IMG_8990_a26ad617.jpg",                          pos: "center 50%" },
  // Powder & liquid
  "powder-booth":         { img: "/manus-storage/pfs-stw-interior-blue-modules_c609bbcc.jpg",        pos: "center 50%" },
  "liquid-paint-line":    { img: "/manus-storage/pfs-liquid-paint-line-real_2f9e33d5.jpg",        pos: "center 50%" },
  "powder-coating-line":  { img: "/manus-storage/pfs-conveyor-line-real_78831864.jpg",              pos: "center 50%" },
  // Blast
  "blast-booth":          { img: "/manus-storage/blast-systems-real_c7389401_16a0255c.webp",              pos: "center 50%" },
  // Integration & automation
  "conveyor-system":                        { img: "/manus-storage/yellow-conveyor-system_8b253b1f.jpg",          pos: "center 50%" },
  "mixing-room":                            { img: "/manus-storage/IMG_0498_a98f5f38.jpg",          pos: "center 50%" },
  "air-makeup-unit":                        { img: "/manus-storage/pfs-amu-card_41f0dd88.jpg",                      pos: "center 50%" },
  // Integration sub-pages — unique heroes per page
  "integration-liquid-paint-lines":         { img: "/manus-storage/pfs-robotics-card_2aac132b.jpg",                 pos: "center 50%" },
  "integration-powder-coating-lines":       { img: "/manus-storage/pfs-auto-powder-line1_3bb98899.png",             pos: "center 50%" },
  "integration-conveyor-systems":           { img: "/manus-storage/pfs-conveyor-line-real_78831864.jpg",            pos: "center 50%" },
  "integration-pretreatment-systems":       { img: "/manus-storage/washbooth_75284018.png",                         pos: "center 50%" },
  "integration-robotic-finishing-cells":    { img: "/manus-storage/pfs-robotic-cell-orion-r_4f0c33bb_2d3b524c.png", pos: "center 50%" },
  "integration-system-integration":         { img: "/manus-storage/pfs-auto-powder-conveyor_14f8b84a.png",          pos: "center 50%" },
  // Fallback
  "default":              { img: "/manus-storage/pfs-helios-enclosed-booth-real_2bc88039.jpeg",       pos: "center 50%" },
};

interface ContactContent { title: string; desc: string; formTitle: string; }

const CONTENT: Record<string, ContactContent> = {
  "request-a-quote":    { title: "Request a Quote",      desc: "Tell us about your project and a PFS engineer will prepare a detailed quote.",                     formTitle: "Quote Request"       },
  "talk-to-an-engineer":{ title: "Talk to an Engineer",  desc: "Speak directly with a PFS finishing equipment engineer about your application.",                   formTitle: "Engineering Inquiry" },
  "find-a-dealer":      { title: "Find a Dealer",        desc: "Locate an authorized PFS dealer in your area.",                                                     formTitle: "Dealer Locator"      },
  "service-request":    { title: "Service Request",      desc: "Submit a service request for your PFS equipment.",                                                  formTitle: "Service Request"     },
  "become-a-dealer":    { title: "Become a Dealer",      desc: "Join the PFS authorized dealer network.",                                                           formTitle: "Dealer Application"  },
};

export default function ContactSubPage() {
  useSEO({
    title: "Contact PFS | Get Pricing on Industrial Finishing Equipment",
    description: "Request a quote or get in touch with PFS for spray paint booths, powder coating systems, industrial ovens, blast equipment, and turnkey finishing lines. Factory-direct pricing, nationwide delivery.",
  });

  const params = useParams<{ sub: string }>();
  const sub = params.sub || "";
  const content = CONTENT[sub];
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  // Read ?from= query param to pick contextual image
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const fromKey = searchParams.get("from") || "default";
  const ctx = CONTEXT_IMAGES[fromKey] ?? CONTEXT_IMAGES["default"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Submitted! A PFS representative will contact you shortly.");
    setForm({ name: "", company: "", email: "", phone: "", message: "" });
  }

  if (!content) {
    return (
      <div>
        <PageHero title="Contact" breadcrumbs={[{ label: "Contact", href: "/contact" }]} />
        <div className="container py-16 text-center">
          <p className="section-body">Page not found. Please use the navigation above.</p>
          <Link href="/contact"><span className="btn-glow mt-4 inline-flex">Back to Contact</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={content.title}
        subtitle={content.desc}
        breadcrumbs={[{ label: "Contact", href: "/contact" }, { label: content.title }]}
        bgImage={ctx.img}
        bgImagePosition={ctx.pos}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="section-label">{content.formTitle}</span>
              <h2 className="section-heading">{content.title}</h2>
              <p className="section-body mb-6">{content.desc}</p>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <label className="form-label">Message / Details *</label>
                  <textarea className="form-input" rows={5} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn-glow">Submit Request</button>
              </form>
            </div>
            <div className="space-y-5">
              <div className="p-5 border border-gray-200">
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "0.75rem" }}>Prefer to Call?</h4>
                <a href="tel:8885457715" className="btn-glow flex items-center gap-2"><Phone size={14} /> (888) 545-7715</a>
              </div>
              <div className="p-5 border border-gray-200">
                <h4 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "0.75rem" }}>Email Us</h4>
                <a href="mailto:info@pfsspraybooths.com" className="flex items-center gap-2" style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.875rem", color: "#FFFFFF" }}><Mail size={14} /> info@pfsspraybooths.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
