/*
 * PageHero — Modern Industrial Corporate
 * Full-bleed hero with photo, overlay, breadcrumb, title, subtitle, and optional CTA buttons.
 * Uses <img> tag for reliable object-fit + object-position on all screen sizes.
 *
 * Props:
 *   bgImage          — CDN URL of the hero photo
 *   bgImagePosition  — CSS object-position value, e.g. "center 55%" (default: "center 40%")
 *   minHeight        — override minimum hero height (default: "clamp(380px, 50vw, 580px)")
 *   overlayOpacity   — base overlay darkness 0–1 (default: 0.22 — good for bright/white photos)
 *   ctaPricing       — show GET PRICING button (default: true)
 *   ctaPhone         — phone number string for CALL button (default: "(888) 545-7715")
 *   ctaPricingHref   — href for pricing CTA (default: "/contact")
 */

import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  bgImage?: string;
  bgVideo?: string;
  bgImagePosition?: string;
  bgImageFit?: "cover" | "contain";
  minHeight?: string;
  overlayOpacity?: number;
  ctaPricing?: boolean;
  ctaPhone?: string;
  ctaPricingHref?: string;
  kenBurns?: boolean; // slow zoom-pan animation on static image
  bgPoster?: string;  // poster frame shown before video loads
}

// ── PageHeroVideo: dark background, video fades in on canplay — zero still-image flash ──
function PageHeroVideo({
  bgVideo,
  bgImagePosition,
  bgPoster,
}: {
  bgVideo: string;
  bgImage?: string;
  bgImagePosition: string;
  bgImageFit: "cover" | "contain";
  KB_STYLE: React.CSSProperties;
  bgPoster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {});
  }, []);
  return (
    <>
      {/* Video with poster — poster shows instantly, video plays on top */}
      <video preload="auto"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-hidden="true"
        poster={bgPoster}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: bgImagePosition, display: "block",
          opacity: 1, zIndex: 0,
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
    </>
  );
}

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  bgImage,
  bgVideo,
  bgImagePosition = "center 55%",
  bgImageFit = "cover",
  minHeight = "clamp(300px, 38vw, 460px)",
  overlayOpacity = 0.22,
  ctaPricing = true,
  ctaPhone = "(888) 545-7715",
  ctaPricingHref = "/contact",
  kenBurns = false,
  bgPoster,
}: PageHeroProps) {
  const KB_STYLE = kenBurns ? {
    animation: "pfs-ken-burns 18s ease-in-out infinite alternate",
    transformOrigin: "center center",
    willChange: "transform",
  } : {};
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-end"
      style={{ backgroundColor: "#1C1C1E", minHeight }}
    >
      {/* Ken Burns keyframes */}
      {kenBurns && (
        <style>{`
          @keyframes pfs-ken-burns {
            0%   { transform: scale(1.0) translate(0%, 0%); }
            33%  { transform: scale(1.08) translate(-1.5%, 1%); }
            66%  { transform: scale(1.06) translate(1.5%, -1%); }
            100% { transform: scale(1.04) translate(0%, 1.5%); }
          }
        `}</style>
      )}

      {/* Hero photo or video — Aerospace-style fade: still image underneath, video fades in on canplay */}
      {bgVideo ? (
          <PageHeroVideo
            bgVideo={bgVideo}
            bgImage={bgImage}
            bgImagePosition={bgImagePosition}
            bgImageFit={bgImageFit}
            bgPoster={bgPoster}
          KB_STYLE={KB_STYLE}
        />
      ) : bgImage ? (
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: bgImageFit,
            objectPosition: bgImagePosition,
            display: "block",
            ...KB_STYLE,
          }}
        />
      ) : null}

      {/* Overlay layers */}
      {(bgImage || bgVideo) && (
        <>
          {/* Base darkening — lighter for bright/white photos */}
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
          />
          {/* Directional gradient — subtle left-side shadow only for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0) 100%)",
            }}
          />
          {/* Bottom vignette — anchors text */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 60%)",
            }}
          />
        </>
      )}
      {!bgImage && !bgVideo && (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%)" }}
        />
      )}

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "3px", background: "linear-gradient(90deg, #FFFFFF 0%, #1B2B4B 100%)", zIndex: 2 }}
      />

      {/* Content — vertically centered in lower half */}
      <div
        className="container relative"
        style={{ zIndex: 1, paddingTop: "2.5rem", paddingBottom: "2.5rem" }}
      >
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div
            className="flex items-center gap-1.5 mb-4"
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <Link href="/">
              <span
                style={{ cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "white")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                Home
              </span>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
                {crumb.href ? (
                  <Link href={crumb.href}>
                    <span
                      style={{ cursor: "pointer", transition: "color 0.15s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "white")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                    >
                      {crumb.label}
                    </span>
                  </Link>
                ) : (
                  <span style={{ color: "#FFFFFF" }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            maxWidth: "760px",
            textShadow: "0 2px 16px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.8)",
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="max-w-2xl"
            style={{
              fontFamily: "'Archivo Narrow', 'Inter', sans-serif",
              fontSize: "clamp(0.88rem, 1.2vw, 1rem)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.75,
              textShadow: "0 1px 8px rgba(0,0,0,0.65)",
              marginBottom: "1.75rem",
            }}
          >
            {subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        {ctaPricing && (
          <div className="flex flex-wrap gap-3">
            <Link href={ctaPricingHref}>
              <span className="btn-glow" style={{ padding: "0.75rem 2rem", fontSize: "0.85rem" }}>
                GET PRICING →
              </span>
            </Link>
            {ctaPhone && (
              <a href={`tel:${ctaPhone.replace(/\D/g, "")}`}>
                <button
                  style={{
                    fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.75rem 2rem",
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.55)",
                    cursor: "pointer",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#fff";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  CALL {ctaPhone}
                </button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
