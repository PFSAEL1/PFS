import PageHero from "@/components/PageHero";
import { useSEO } from '@/hooks/useSEO';
import { Link } from "wouter";
import { ExternalLink, Package, Wrench, RefreshCw, CheckCircle } from "lucide-react";

const FILTERS_HERO = "/manus-storage/pfs-filters-card_8b47eabc.png";       // Real PFS filter media photo
const FILTERS_HERO_VIDEO = "/manus-storage/pfs-parts-filters-hero_9a1b0b80.mp4"; // Cinematic hero video

const FILTER_TYPES = [
  "Intake ceiling filters",
  "Exhaust floor filters",
  "Polyester media rolls",
  "Fiberglass media",
  "Carbon odor filters",
  "HEPA final filters",
  "Spray-to-waste filters",
  "Powder recovery filters",
];

export default function PartsFiltersHub() {
  useSEO({
    title: "Spray Booth Filters & Replacement Parts | PFS Industrial Finishing",
    description: "PFS OEM spray booth filters and replacement parts for industrial paint booths, powder coating systems, and blast equipment. Intake filters, exhaust filters, ceiling filters, and specialty filtration media.",
    canonical: "/parts",
  });

  return (
    <div>
      <PageHero
        title="Parts & Filters"
        subtitle="Keep your PFS equipment running at peak performance with OEM replacement parts, filters, and consumables."
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "Parts & Filters" }]}
        bgImage={FILTERS_HERO}
        bgVideo={FILTERS_HERO_VIDEO}
      />

      {/* Hero image feature section */}
      <section className="py-16 section-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label">OEM Quality</span>
              <h2 className="section-heading-lg">Genuine PFS Parts & Filtration</h2>
              <div className="red-divider" />
              <p className="section-body mb-6">
                Using genuine OEM parts and certified filtration media is critical to maintaining your booth's airflow performance, compliance certifications, and warranty coverage. PFS stocks a comprehensive inventory for all current and legacy equipment models.
              </p>
              <p className="section-body mb-8">
                Order filters and consumables online at <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", fontWeight: 600 }}>pfsfilters.com</a> — or contact our parts team for OEM components and bulk pricing.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" className="btn-glow flex items-center gap-2">
                  Order Filters <ExternalLink size={14} />
                </a>
                <Link href="/contact/service-request">
                  <span className="btn-outline flex items-center gap-2">Request OEM Parts</span>
                </Link>
              </div>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
              <img src={FILTERS_HERO} alt="PFS spray booth filters and filtration media" style={{ width: "100%", height: "380px", objectFit: "cover", objectPosition: "center" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Three cards */}
      <section className="py-14 section-gray">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Filters */}
            <div className="p-7 bg-white card-hover">
              <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "#FFF0F0", color: "#FFFFFF", borderRadius: "2px" }}>
                <Package size={20} />
              </div>
              <div className="red-divider-sm" />
              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Filters & Consumables</h3>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Intake filters, exhaust filters, floor filters, and specialty filtration media for all PFS booth models. Order online at pfsfilters.com with fast shipping.
              </p>
              <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" className="btn-glow flex items-center gap-2" style={{ fontSize: "0.75rem" }}>
                Order Filters <ExternalLink size={13} />
              </a>
            </div>

            {/* OEM Parts */}
            <div className="p-7 bg-white card-hover">
              <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "#FFF0F0", color: "#FFFFFF", borderRadius: "2px" }}>
                <Wrench size={20} />
              </div>
              <div className="red-divider-sm" />
              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "0.75rem" }}>OEM Parts</h3>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Genuine PFS OEM replacement parts including motors, fans, controls, LED lighting, and structural components for all equipment families — current and legacy.
              </p>
              <Link href="/parts">
                <span className="btn-glow" style={{ fontSize: "0.75rem", display: "inline-flex" }}>Request Parts</span>
              </Link>
            </div>

            {/* Filter Programs */}
            <div className="p-7 bg-white card-hover">
              <div className="w-10 h-10 flex items-center justify-center mb-4" style={{ backgroundColor: "#FFF0F0", color: "#FFFFFF", borderRadius: "2px" }}>
                <RefreshCw size={20} />
              </div>
              <div className="red-divider-sm" />
              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: "#1C1C1E", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Filter Replacement Programs</h3>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Scheduled filter delivery programs to ensure you never run out of critical filtration media. Customized to your booth model and production volume.
              </p>
              <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" className="btn-glow flex items-center gap-2" style={{ fontSize: "0.75rem" }}>
                Learn More <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter types */}
      <section className="py-14 section-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="section-label">Filtration Media</span>
              <h2 className="section-heading">Filter Types Available</h2>
              <div className="red-divider" />
              <p className="section-body mb-6">
                PFS stocks a full range of filtration media compatible with all booth configurations. Whether you need standard polyester intake media or specialty HEPA final filters, we have the right product for your application.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {FILTER_TYPES.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle size={14} style={{ color: "#FFFFFF", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.82rem", color: "#444" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8" style={{ backgroundColor: "#1C1C1E", borderRadius: "2px" }}>
              <span className="section-label" style={{ color: "#FFFFFF" }}>Quick Order</span>
              <h3 style={{ fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "white", marginBottom: "0.75rem" }}>Order at pfsfilters.com</h3>
              <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Our dedicated filter store carries the full range of PFS-compatible filtration media with fast shipping and easy reorder by booth model number.
              </p>
              <a href="https://pfsfilters.com" target="_blank" rel="noopener noreferrer" className="btn-glow flex items-center gap-2 justify-center w-full">
                Visit pfsfilters.com <ExternalLink size={14} />
              </a>
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
                  Need help finding the right filter? Call (888) 545-7715
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
