// LogoCarousel — Infinite auto-scrolling customer logo strip on dark background
// Design: Pure black background, white logo marks via CSS filter
// 
// Rendering strategy per logo:
//   - Dark marks on transparent bg → brightness(0) invert(1) → white marks
//   - Colored logos (Tesla, CAT, LeROI, Dempsey Gill) → grayscale(1) brightness(2) → white marks
//   - Seneca (white marks on transparent) → use as-is (no filter needed)
//
// DO NOT touch the compliance carousel — this is the Home page customer logo strip only.

const INVERT  = "brightness(0) invert(1)";
const GREY_UP = "grayscale(1) brightness(2.2) contrast(1.1)";
const WHITE   = "none"; // already white marks

interface CarouselLogo {
  src: string;
  alt: string;
  h: number;
  filter: string;
}

const LOGOS: CarouselLogo[] = [
  { src: "/manus-storage/boeing-dark_0fe68a7b.png",       alt: "Boeing",           h: 36, filter: INVERT  },
  { src: "/manus-storage/spacex-dark_ad3651e9.png",       alt: "SpaceX",           h: 28, filter: INVERT  },
  { src: "/manus-storage/tesla-dark_d5c53013.png",        alt: "Tesla",            h: 52, filter: GREY_UP },
  { src: "/manus-storage/cat-white-v2_0b5bf759.png",      alt: "Caterpillar",      h: 38, filter: WHITE   },
  { src: "/manus-storage/la-metro-white_b76f3ead.png",    alt: "LA Metro",         h: 40, filter: WHITE   },
  { src: "/manus-storage/av-dark_95aa1b71.png",           alt: "AeroVironment",    h: 44, filter: INVERT  },
  { src: "/manus-storage/seneca-dark_453b611d.png",       alt: "Seneca Aviation",  h: 40, filter: WHITE   },
  { src: "/manus-storage/leroi-dark_46d5d0eb.png",        alt: "LeROI",            h: 48, filter: GREY_UP },
  { src: "/manus-storage/dempseygill-dark_dedb26bf.png",  alt: "Dempsey & Gill",   h: 44, filter: GREY_UP },
  { src: "/manus-storage/gandc-dark_3566ab0e.png",        alt: "G&C Auto Body",    h: 44, filter: INVERT  },
  { src: "/manus-storage/missionbell-dark_d681bce6.png",  alt: "Mission Bell",     h: 32, filter: INVERT  },
  { src: "/manus-storage/united-rentals-white_fef4ecf8.png", alt: "United Rentals", h: 34, filter: WHITE   },
  { src: "/manus-storage/ael-logo-black_8bbd6f11.jpeg",           alt: "Advanced Extraction Labs (AEL)", h: 52, filter: INVERT  },
];

export default function LogoCarousel() {
  return (
    <div
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        padding: "2.25rem 0",
      }}
    >
      {/* Label */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span
          style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          TRUSTED BY INDUSTRY LEADERS
        </span>
      </div>

      {/* Scrolling track */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(90deg, #080808 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(270deg, #080808 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4rem",
            animation: "logoScroll 28s linear infinite",
            width: "max-content",
          }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
            >
                <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: `${logo.h}px`,
                  width: "auto",
                  maxWidth: "160px",
                  objectFit: "contain",
                  filter: logo.filter,
                  display: "block",
                  imageRendering: "-webkit-optimize-contrast",
                  WebkitFontSmoothing: "antialiased",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes logoScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * ${LOGOS.length} * (160px + 4rem))); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="logoScroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
