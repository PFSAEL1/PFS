// TrustedBy — Stripe-style static white-background colored logo strip
// Design: Pure white background, real brand colors, subtle opacity blend (like stripe.com stationary)
// Used on: Aerospace page, Aircraft page, and any other high-impact product pages
// DO NOT convert to dark carousel — that is LogoCarousel's job on the Home page

interface Logo {
  src: string;
  alt: string;
  h: number; // display height in px
}

// Color logos on white background — real brand colors, no filters
// CDN paths
const LOGOS: Logo[] = [
  { src: "/manus-storage/boeing-color_63ed4652.png",       alt: "Boeing",            h: 36 },
  { src: "/manus-storage/spacex-color_8eda0059.png",       alt: "SpaceX",            h: 28 },
  { src: "/manus-storage/tesla-color_4097d792.png",        alt: "Tesla",             h: 52 },
  { src: "/manus-storage/cat-color_edbcd945.png",          alt: "Caterpillar",       h: 44 },
  { src: "/manus-storage/carstar-color_bd301e8f.png",      alt: "CARSTAR",           h: 32 },
  { src: "/manus-storage/lametro-color_afa94618.png",      alt: "LA Metro",          h: 40 },
  { src: "/manus-storage/av-color_66c0f897.png",           alt: "AeroVironment",     h: 44 },
  { src: "/manus-storage/seneca-color_9414c16d.png",       alt: "Seneca Aviation",   h: 40 },
  { src: "/manus-storage/leroi-color_72500325.png",        alt: "LeROI",             h: 48 },
  { src: "/manus-storage/dempseygill-color_07426f21.png",  alt: "Dempsey & Gill",    h: 44 },
  { src: "/manus-storage/gandc-color_3c2b60a9.png",        alt: "G&C Auto Body",     h: 44 },
  { src: "/manus-storage/missionbell-color_bec2319c.png",  alt: "Mission Bell",      h: 32 },
  { src: "/manus-storage/pfs-logo-united-rentals_f3409286.png", alt: "United Rentals",  h: 44 },
  { src: "/manus-storage/ael-logo-black_8bbd6f11.jpeg",           alt: "Advanced Extraction Labs (AEL)", h: 52 },
];

interface TrustedByProps {
  label?: string;
}

export default function TrustedBy({ label = "Trusted By Industry Leaders" }: TrustedByProps) {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e8eaed",
        borderBottom: "1px solid #e8eaed",
        padding: "3rem 0",
      }}
    >
      {/* Label */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span
          style={{
            fontFamily: "'Chakra Petch', 'Barlow Condensed', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#9ca3af",
          }}
        >
          {label}
        </span>
      </div>

      {/* Logo grid — wraps responsively, centered */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem 3.5rem",
        }}
      >
        {LOGOS.map((logo) => (
          <div
            key={logo.alt}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.65,
              transition: "opacity 0.25s ease",
              filter: "grayscale(0.15)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.filter = "grayscale(0)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.65";
              el.style.filter = "grayscale(0.15)";
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                height: `${logo.h}px`,
                width: "auto",
                maxWidth: "160px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
