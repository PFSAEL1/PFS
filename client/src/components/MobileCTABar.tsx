/**
 * MobileCTABar — sticky bottom bar visible only on mobile (<768px)
 * Design: dark charcoal background, phone number on left, red GET PRICING button on right
 * Hidden on desktop via CSS (md:hidden)
 */
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function MobileCTABar() {
  return (
    <div className="mobile-cta-bar md:hidden">
      <a href="tel:8885457715" className="cta-phone">
        <Phone size={15} style={{ color: "#1B2B4B", flexShrink: 0 }} />
        <span>(888) 545-7715</span>
      </a>
      <Link href="/contact/request-a-quote">
        <span className="cta-btn">
          Get Pricing <ArrowRight size={13} />
        </span>
      </Link>
    </div>
  );
}
