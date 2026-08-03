/*
 * SiteProductCard — shared card component for "You May Also Need / You May Also Like"
 * sections across the entire PFS site.
 *
 * Style: full-bleed image top (4:3 aspect ratio), white card body,
 * bold uppercase title, description text, LEARN MORE → arrow link.
 * Matches the screenshot provided by the user.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface SiteProductCardProps {
  label: string;
  href: string;
  img: string;
  desc: string;
}

export function SiteProductCard({ label, href, img, desc }: SiteProductCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          border: `1px solid ${hovered ? "#1B3A6B" : "#e0e0e0"}`,
          overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.18s, box-shadow 0.18s",
          boxShadow: hovered
            ? "0 6px 24px rgba(27,58,107,0.13)"
            : "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* Full-bleed image */}
        <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#f0f0f0" }}>
          <img
            src={img}
            alt={label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.35s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
        {/* Card body */}
        <div style={{ padding: "1.1rem 1.2rem 1.3rem" }}>
          <div
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
              lineHeight: 1.2,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "#555",
              lineHeight: 1.55,
              marginBottom: "0.85rem",
            }}
          >
            {desc}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#1B3A6B",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            LEARN MORE <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Section wrapper helper ── */
interface SiteProductCardSectionProps {
  heading?: string;
  label?: string;
  cards: SiteProductCardProps[];
  background?: string;
}

export function SiteProductCardSection({
  heading = "You May Also Need",
  label = "Complete Your System",
  cards,
  background = "#f4f4f2",
}: SiteProductCardSectionProps) {
  if (!cards || cards.length === 0) return null;
  const colClass =
    cards.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section
      style={{
        padding: "4rem 0",
        backgroundColor: background,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <span
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "#1B3A6B",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            {label}
          </span>
          <h3
            style={{
              fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700,
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            {heading}
          </h3>
        </div>
        <div className={`grid gap-5 ${colClass}`}>
          {cards.map((card) => (
            <SiteProductCard key={card.href} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
