// ABC Filters iOS App — Premium Animated Splash Screen
// Tesla-grade: cinematic fade-in, logo pulse, tagline reveal
import { useEffect, useState } from 'react';

// Use the ABC Filters logo from the CDN
const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/abc-filters-logo_a66e6869.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Phase 1: Logo fades in (0 → 900ms)
    const holdTimer = setTimeout(() => setPhase('hold'), 900);
    // Phase 2: Hold (900ms → 2200ms)
    const exitTimer = setTimeout(() => setPhase('exit'), 2200);
    // Phase 3: Fade out and complete (2200ms → 2800ms)
    const completeTimer = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{
        background: 'oklch(0.08 0.008 240)',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.62 0.20 230 / 0.08) 0%, transparent 70%)',
          opacity: phase === 'enter' ? 0 : 1,
          transition: 'opacity 1.2s ease',
        }}
      />

      {/* Logo container */}
      <div
        style={{
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.85) translateY(12px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <img
          src={LOGO_URL}
          alt="ABC Filters"
        style={{
          width: 220,
          height: 'auto',
          filter: 'brightness(1.15) drop-shadow(0 0 20px oklch(0.60 0.22 232 / 0.4))',
        }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 24,
          opacity: phase === 'hold' || phase === 'exit' ? 1 : 0,
          transform: phase === 'hold' || phase === 'exit' ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
        }}
      >
        <p style={{
          color: 'oklch(0.55 0.012 240)',
          fontSize: 13,
          fontFamily: '-apple-system, SF Pro Text, system-ui, sans-serif',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          Premium Filtration
        </p>
      </div>

      {/* Loading dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom, 34px) + 40px)',
          display: 'flex',
          gap: 6,
          opacity: phase === 'hold' ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'oklch(0.62 0.20 230)',
              animation: `splashDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes splashDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
