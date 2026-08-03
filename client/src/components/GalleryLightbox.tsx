/**
 * GalleryLightbox — Shared navigable lightbox for all product gallery pages.
 *
 * Features:
 *  - Left/Right arrow buttons to navigate between images without closing
 *  - Keyboard: ArrowLeft, ArrowRight, Escape
 *  - Touch: swipe left/right to navigate, swipe down to close
 *  - Image counter (e.g. "3 / 8")
 *  - Click outside image area to close
 */

import { useEffect, useRef, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  pos?: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function GalleryLightbox({ images, index, onClose, onNavigate }: GalleryLightboxProps) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const prev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const next = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.93)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        if (Math.abs(dy) > Math.abs(dx)) {
          if (dy > 80) onClose();
        } else {
          if (dx < -50) next();
          else if (dx > 50) prev();
        }
      }}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "absolute",
          top: "max(1.25rem, env(safe-area-inset-top, 1.25rem))",
          right: "max(1.25rem, env(safe-area-inset-right, 1.25rem))",
          background: "rgba(0,0,0,0.7)", border: "2px solid rgba(255,255,255,0.6)",
          color: "#fff", width: 52, height: 52, borderRadius: "50%",
          cursor: "pointer", zIndex: 10001,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
        aria-label="Close"
      >
        <X size={22} strokeWidth={2.5} />
      </button>

      {/* Counter */}
      <div style={{
        position: "absolute",
        top: "max(1.4rem, env(safe-area-inset-top, 1.4rem))",
        left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.8)",
        fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif", fontSize: "0.85rem",
        fontWeight: 700, letterSpacing: "0.08em",
        padding: "0.35rem 1rem", borderRadius: "999px",
        pointerEvents: "none", zIndex: 10001, whiteSpace: "nowrap",
      }}>
        {index + 1} / {images.length}
      </div>

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          style={{
            position: "absolute", left: "max(0.75rem, env(safe-area-inset-left, 0.75rem))",
            top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.65)", border: "2px solid rgba(255,255,255,0.45)",
            color: "#fff", width: 52, height: 52, borderRadius: "50%",
            cursor: "pointer", zIndex: 10001,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s",
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} strokeWidth={2.5} />
        </button>
      )}

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          style={{
            position: "absolute", right: "max(0.75rem, env(safe-area-inset-right, 0.75rem))",
            top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.65)", border: "2px solid rgba(255,255,255,0.45)",
            color: "#fff", width: 52, height: 52, borderRadius: "50%",
            cursor: "pointer", zIndex: 10001,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s",
          }}
          aria-label="Next image"
        >
          <ChevronRight size={26} strokeWidth={2.5} />
        </button>
      )}

      {/* Bottom hint */}
      <div style={{
        position: "absolute",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))",
        left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.55)",
        fontFamily: "'Archivo Narrow', 'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.06em",
        padding: "0.35rem 1rem", borderRadius: "999px",
        pointerEvents: "none", zIndex: 10001, whiteSpace: "nowrap",
      }}>
        ← → KEYS OR SWIPE TO NAVIGATE · ESC TO CLOSE
      </div>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "auto", touchAction: "pinch-zoom",
          padding: "4rem 4.5rem",
          boxSizing: "border-box",
        }}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          style={{
            maxWidth: "100%", maxHeight: "100%",
            objectFit: "contain", display: "block",
            userSelect: "none",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}

/**
 * GalleryGrid — Drop-in replacement for all product page galleries.
 * Renders a snap-scroll carousel driven by prev/next buttons.
 * Clicking any image opens the navigable lightbox.
 *
 * Design decisions:
 *  - Uses a controlled activeIndex + scrollIntoView approach so there is
 *    NEVER a blank overrun — the scroll always lands on a real card.
 *  - Arrow buttons sit INSIDE the container (no negative margin) so they
 *    never cause horizontal page overflow on mobile.
 *  - Card width is capped at 85vw on mobile so the next card peeks.
 */

interface GalleryGridProps {
  images: GalleryImage[];
  cardHeight?: string;
  className?: string;
  fullBleed?: boolean;
}

export function GalleryGrid({ images, cardHeight = "clamp(200px,22vw,320px)", fullBleed = false }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, images.length - 1));
    setActiveIndex(clamped);
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    // Auto-reset to first slide after reaching the last one
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (clamped === images.length - 1 && images.length > 1) {
      resetTimerRef.current = setTimeout(() => {
        setActiveIndex(0);
        cardRefs.current[0]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }, 2500);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const prev = () => scrollTo(activeIndex - 1);
  const next = () => scrollTo(activeIndex + 1);

  return (
    <>
      <div style={{ position: "relative" }}>

        {/* Prev arrow — inside container, left edge */}
        {images.length > 1 && (
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous photo"
            style={{
              position: "absolute",
              left: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: activeIndex === 0 ? "rgba(27,58,107,0.35)" : "#1B3A6B",
              border: "none",
              color: "#fff",
              width: 44,
              height: 44,
              borderRadius: "50%",
              cursor: activeIndex === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
              transition: "background 0.15s",
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
        )}

        {/* Next arrow — inside container, right edge */}
        {images.length > 1 && (
          <button
            onClick={next}
            disabled={activeIndex === images.length - 1}
            aria-label="Next photo"
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: activeIndex === images.length - 1 ? "rgba(27,58,107,0.35)" : "#1B3A6B",
              border: "none",
              color: "#fff",
              width: 44,
              height: 44,
              borderRadius: "50%",
              cursor: activeIndex === images.length - 1 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
              transition: "background 0.15s",
              flexShrink: 0,
            }}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        )}

        {/* Scroll track — padded so cards don't hide under arrows */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            overflowX: "auto",
            overflowY: "visible",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "0.5rem",
            paddingLeft: images.length > 1 ? "3.5rem" : "0",
            paddingRight: images.length > 1 ? "3.5rem" : "0",
          }}
          className="gallery-scroll-track"
        >
          {images.map((img, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              onClick={() => setLightboxIndex(i)}
              style={{
                position: "relative",
                cursor: "zoom-in",
                overflow: "hidden",
                background: "#222",
                flexShrink: 0,
                // fullBleed: stretch to full viewport width; otherwise normal card width
                width: fullBleed ? "100vw" : "clamp(220px, 85vw, 380px)",
                height: fullBleed ? "clamp(280px, 56vw, 600px)" : cardHeight,
                scrollSnapAlign: "start",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="group"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: img.pos ?? "center center",
                  transition: "transform 0.3s",
                }}
                className="group-hover:scale-[1.04]"
              />
              <div style={{
                position: "absolute", bottom: "0.6rem", right: "0.6rem",
                background: "rgba(0,0,0,0.55)", borderRadius: "4px",
                padding: "0.3rem 0.45rem",
                display: "flex", alignItems: "center", gap: "0.3rem",
                color: "#fff", fontSize: "0.7rem",
                fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
                fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                pointerEvents: "none",
              }}>
                <ZoomIn size={12} /> ZOOM
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.4rem",
            marginTop: "0.75rem",
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                style={{
                  width: i === activeIndex ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: i === activeIndex ? "#1B3A6B" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s, background 0.2s",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
}
