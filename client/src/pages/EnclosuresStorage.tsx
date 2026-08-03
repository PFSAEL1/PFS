import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const IMG = "/manus-storage/pfs-aerospace-jet-in-booth-real_2eb79dc9.png";

export default function EnclosuresStorage() {
  useSEO({
    title: "Industrial Enclosures & Storage Solutions | PFS Finishing Systems",
    description: "PFS provides modular enclosures, storage buildings, and industrial structures engineered to complement your finishing operation. Paint storage rooms, equipment enclosures, and complete facility solutions. Factory-direct from Santa Rosa, CA.",
    canonical: "/enclosures-storage",
  });

  return (
    <div>
      <PageHero
        title="Enclosures & Storage Solutions"
        subtitle="Modular enclosures, storage buildings, and industrial structures engineered to complement your finishing operation."
        breadcrumbs={[{ label: "Enclosures & Storage" }]}
        bgImage={IMG}
      />
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label">Enclosures & Storage</span>
              <h2 className="section-heading-lg">Complete Facility Solutions</h2>
              <p className="section-body mb-4">
                Beyond finishing equipment, PFS can connect you with modular enclosures, storage buildings, and industrial structures that complement your finishing operation — from equipment enclosures and paint storage rooms to complete facility buildings.
              </p>
              <p className="section-body mb-8">
                Contact our team to discuss your facility requirements and we'll help identify the right solution for your project.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact/talk-to-an-engineer">
                  <span className="btn-primary">Talk to an Engineer <ArrowRight size={14} /></span>
                </Link>
                <Link href="/contact/request-a-quote">
                  <span className="btn-outline">Request Info</span>
                </Link>
              </div>
            </div>
            <div>
              <img src={IMG} alt="Enclosures and Storage" className="w-full object-cover" style={{ height: "380px" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
