import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const HERO_IMG = "/manus-storage/IMG_0559_5bb7ecfc.jpg";

// ─── Legal sections data ───────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "warranty",
    label: "Limited Warranty",
    content: (
      <div className="legal-body">
        <p>
          <strong>PFS Spraybooths, a division of Platinum Finishing Systems, Inc. ("PFS"),</strong> warrants to the original purchaser that its paint spray booths and manufactured components will be free from defects in materials and workmanship under normal use and service, subject to the terms and conditions of this Limited Warranty.
        </p>

        <h4>Warranty Coverage</h4>
        <ul>
          <li><strong>Structural Components:</strong> Four (4) years from the original date of shipment or purchase, whichever occurs first, against defects in materials and workmanship resulting from normal use.</li>
          <li><strong>Electrical Components:</strong> One (1) year from the original date of shipment or purchase, whichever occurs first, against defects in materials and workmanship. Electrical components manufactured by third parties may also be subject to the original manufacturer's warranty.</li>
        </ul>
        <p>
          If PFS determines that a covered defect exists during the applicable warranty period, PFS will, at its sole discretion, repair or replace the defective component. Repair or replacement is the purchaser's sole and exclusive remedy.
        </p>

        <h4>Extended Warranty</h4>
        <p>
          Extended warranty coverage may be available for qualifying equipment that is continuously maintained using genuine <strong>PFS Filters®</strong> replacement filters and participates in an approved maintenance program. Additional terms and conditions apply.
        </p>

        <h4>Warranty Exclusions</h4>
        <p>This Limited Warranty does not cover:</p>
        <ul>
          <li>Normal wear and tear.</li>
          <li>Consumable items, including filters, belts, gaskets, seals, bulbs, and similar maintenance items.</li>
          <li>Damage caused by misuse, abuse, accidents, improper installation, improper maintenance, unauthorized modifications or repairs, corrosion, chemical exposure, acts of God, fire, flood, or power surges.</li>
          <li>Labor, travel expenses, freight, shipping, downtime, lost production, removal, reinstallation, or incidental expenses unless otherwise agreed in writing.</li>
        </ul>

        <h4>Disclaimer of Warranties</h4>
        <p>
          Except as expressly stated in this Limited Warranty, PFS disclaims all other express or implied warranties, including any implied warranties of merchantability or fitness for a particular purpose, to the fullest extent permitted by applicable law.
        </p>
      </div>
    ),
  },
  {
    id: "liability",
    label: "Limitation of Liability",
    content: (
      <div className="legal-body">
        <p>
          To the fullest extent permitted by applicable law, <strong>PFS Spraybooths, a division of Platinum Finishing Systems, Inc. ("PFS"),</strong> shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, loss of revenue, loss of production, business interruption, loss of use, or any other commercial or economic damages arising out of the purchase, installation, or use of its products.
        </p>
        <p>
          The purchaser's exclusive remedy shall be repair or replacement under the applicable Limited Warranty.
        </p>
        <p>
          Under no circumstances shall PFS's total liability exceed the original purchase price paid for the specific product giving rise to the claim.
        </p>
      </div>
    ),
  },
  {
    id: "suitability",
    label: "Product Suitability & Code Compliance",
    content: (
      <div className="legal-body">
        <p>
          Federal, state, provincial, and local laws governing paint spray booths and industrial finishing equipment vary by jurisdiction and application.
        </p>
        <p>
          PFS manufactures equipment based upon the specifications provided by the purchaser. Unless expressly agreed to in writing, PFS does not warrant that any product is suitable for a specific application or complies with all codes applicable at the installation site.
        </p>
        <p>The purchaser is solely responsible for:</p>
        <ul>
          <li>Determining product suitability.</li>
          <li>Verifying compliance with all applicable laws, regulations, and codes.</li>
          <li>Obtaining required permits and inspections.</li>
          <li>Ensuring proper installation, operation, and maintenance by qualified personnel.</li>
        </ul>
        <p>
          PFS shall not be responsible for costs, delays, penalties, modifications, or damages resulting from improper installation, misuse, unauthorized modifications, permitting issues, or failure to comply with applicable laws.
        </p>
      </div>
    ),
  },
  {
    id: "freight",
    label: "Freight, Shipping & Transit Claims",
    content: (
      <div className="legal-body">
        <p>
          Unless otherwise agreed in writing, all products are shipped <strong>F.O.B. PFS's shipping facility</strong>. Risk of loss transfers to the purchaser upon delivery to the carrier.
        </p>
        <p>
          Customers should inspect shipments immediately upon delivery. Visible damage or shortages must be noted on the carrier's delivery receipt and reported promptly to both the carrier and PFS.
        </p>
        <p>
          PFS is not responsible for freight damage or shipping delays occurring after delivery to the carrier except where required by law or caused by PFS's gross negligence or willful misconduct.
        </p>
        <p>
          Where PFS determines that a covered shipping claim exists, PFS may repair or replace the affected product at its sole discretion.
        </p>
      </div>
    ),
  },
  {
    id: "returns",
    label: "Return Policy",
    content: (
      <div className="legal-body">
        <p>
          Because many PFS products are engineered or manufactured specifically for each customer, returns are limited.
        </p>

        <h4>Return Requirements</h4>
        <ul>
          <li>Prior written Return Merchandise Authorization (RMA) is required.</li>
          <li>Return requests must be made within thirty (30) days of delivery unless otherwise approved.</li>
          <li>Products must be unopened, unused, uninstalled, and returned in their original factory packaging.</li>
          <li>Products must be in new, resalable condition.</li>
        </ul>

        <h4>Non-Returnable Products</h4>
        <p>The following items are not eligible for return:</p>
        <ul>
          <li>Custom-engineered products</li>
          <li>Made-to-order equipment</li>
          <li>Modified equipment</li>
          <li>Special-order products</li>
          <li>Fabricated assemblies</li>
          <li>Clearance or discontinued products</li>
        </ul>
        <p>
          Once engineering, procurement, or fabrication has begun, custom equipment is non-cancelable and non-returnable unless otherwise agreed to in writing by PFS.
        </p>

        <h4>Restocking Fee</h4>
        <p>
          Approved returns are subject to a <strong>forty percent (40%) restocking fee</strong>, which covers inspection, testing, handling, repackaging, administrative processing, and inventory costs.
        </p>

        <h4>Freight</h4>
        <p>The purchaser is responsible for:</p>
        <ul>
          <li>All outbound freight charges.</li>
          <li>All return freight.</li>
          <li>Packaging and insurance.</li>
          <li>Any damage occurring during return shipment.</li>
        </ul>
        <p>Shipping charges, installation, expedited freight, and service charges are non-refundable.</p>

        <h4>Inspection</h4>
        <p>
          PFS reserves the right to inspect all returned products. Items that are used, damaged, altered, improperly packaged, incomplete, or otherwise not in resalable condition may be refused or may receive a reduced refund at PFS's sole discretion.
        </p>

        <h4>Refunds</h4>
        <p>
          Approved refunds or credits will generally be processed after inspection and approval, less applicable restocking fees and other authorized deductions.
        </p>
      </div>
    ),
  },
  {
    id: "website",
    label: "Website Disclaimer",
    content: (
      <div className="legal-body">
        <p>
          The information provided on this website is for general informational purposes only and does not modify or replace the terms contained in any quotation, sales agreement, purchase order acknowledgment, Limited Warranty, or other written agreement issued by Platinum Finishing Systems, Inc.
        </p>
        <p>
          In the event of any conflict, the executed sales agreement and applicable written contractual documents shall govern.
        </p>
      </div>
    ),
  },
  {
    id: "legal-notice",
    label: "Legal Notice",
    content: (
      <div className="legal-body">
        <p>
          These policies are governed by the laws of the State of California, without regard to conflict-of-law principles, together with any applicable federal laws governing interstate commerce. If any provision is determined to be unenforceable, the remaining provisions shall remain in full force and effect.
        </p>
      </div>
    ),
  },
];

// ─── Accordion item ────────────────────────────────────────────────────────
function AccordionItem({ section, isOpen, onToggle }: {
  section: typeof SECTIONS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: isOpen ? "rgba(107,163,224,0.06)" : "transparent",
        transition: "background 0.2s ease",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        style={{ padding: "1.4rem 2rem", cursor: "pointer", background: "none", border: "none" }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: isOpen ? "#6BA3E0" : "rgba(255,255,255,0.9)",
            transition: "color 0.2s ease",
          }}
        >
          {section.label}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: isOpen ? "#6BA3E0" : "rgba(255,255,255,0.4)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease, color 0.2s ease",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        />
      </button>

      {/* Collapsible body */}
      <div
        style={{
          maxHeight: isOpen ? "2000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div style={{ padding: "0 2rem 1.75rem" }}>
          {section.content}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function LegalPage() {
  useSEO({
    title: "Legal Policies | Warranty, Returns & Compliance | PFS",
    description: "PFS Spraybooths legal policies including limited warranty, limitation of liability, product suitability, freight terms, return policy, and website disclaimer. Platinum Finishing Systems, Inc.",
    canonical: "/legal",
  });

  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div style={{ background: "#0d1117" }}>
      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          height: "clamp(320px, 45vw, 520px)",
          overflow: "hidden",
        }}
      >
        <img
          src={HERO_IMG}
          alt="PFS Helios and Orion spray booths on the shop floor"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(13,17,23,0.82) 0%, rgba(13,17,23,0.55) 60%, rgba(13,17,23,0.3) 100%)",
          }}
        />
        {/* Content */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "clamp(2rem, 5vw, 3.5rem)",
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Link href="/">
              <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>
                Home
              </span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem" }}>›</span>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
              Legal
            </span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(107,163,224,0.15)",
              border: "1px solid rgba(107,163,224,0.3)",
              padding: "0.25rem 0.85rem",
              marginBottom: "1rem",
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6BA3E0",
              }}
            >
              Policies & Legal
            </span>
          </div>

          <h1
          data-animation="slideLeft"
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              color: "#FFFFFF",
              marginBottom: "0.75rem",
              maxWidth: "640px",
            }}
          >
            Legal Policies
          </h1>
          <p
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              maxWidth: "520px",
            }}
          >
            Warranty coverage, liability terms, return policy, and compliance information for all PFS equipment.
          </p>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section style={{ padding: "4rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {SECTIONS.map((section) => (
              <AccordionItem
                key={section.id}
                section={section}
                isOpen={openId === section.id}
                onToggle={() => toggle(section.id)}
              />
            ))}
          </div>

          {/* Contact strip */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              border: "1px solid rgba(107,163,224,0.2)",
              background: "rgba(107,163,224,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  marginBottom: "0.4rem",
                }}
              >
                Questions About These Policies?
              </p>
              <p
                style={{
                  fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.65,
                }}
              >
                Contact our team for clarification on warranty coverage, return requests, or compliance documentation.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link href="/contact">
                <span className="btn-glow">Contact Us <ArrowRight size={15} /></span>
              </Link>
              <a
                href="tel:8885457715"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#FFFFFF")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
              >
                <Phone size={13} /> (888) 545-7715
              </a>
              <a
                href="mailto:info@pfsspraybooths.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "#FFFFFF")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
              >
                <Mail size={13} /> info@pfsspraybooths.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
