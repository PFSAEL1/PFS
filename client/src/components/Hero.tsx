// Hero — PFS Filters Dark Theme
// Full-bleed looping video hero, left-aligned text, electric blue CTAs
import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, ShoppingBag, Truck, Shield, Star } from 'lucide-react';

const HERO_VIDEO = 'https://cdn.shopify.com/videos/c/o/v/95b492e672f942f8acd0683f6053f877.mp4';
const HERO_POSTER = 'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/pfs-final-thicker-gentle-dust-hero-poster-92179f90.jpg?v=1788567595';

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Force play on mount — handles iOS Safari which may block autoplay
    video.muted = true;
    video.play().catch(() => {
      // Silently ignore if browser blocks autoplay (rare with muted + playsInline)
    });
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header>
      <section
        id="home"
        className="relative min-h-[65vh] md:min-h-[80vh] flex items-center overflow-hidden bg-black"
      >
        {/* Full-bleed looping video background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-[65%_center] md:object-center"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          {/* Left-side vignette: grounds the headline to the image, keeps filter imagery on the right fully visible */}
          <div className="hero-vignette" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[1]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow badge */}
            <div className="eyebrow-brand inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6 animate-fade-in">
              <Shield className="w-3.5 h-3.5" />
              A Division of PFS Spray Booths — 30+ Years of Expertise
            </div>

            {/* Headline — two visual tiers: white setup line, larger gradient key message */}
            <h1
              className="hero-headline mb-6 animate-slide-up"
              style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
            >
              <span className="hero-tier1">The Only Filter Program That</span>
              <span className="hero-tier2">Manages Your Entire Booth</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl text-white/60 leading-relaxed mb-8 animate-slide-up"
              style={{ animationDelay: '0.25s', animationFillMode: 'backwards' }}
            >
              Auto-reorder on your schedule. Booth-specific filter tracking. Backed by 30+ years of PFS Spray Booths expertise. Never run out of filters again.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 mb-10 animate-slide-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            >
              <Link href="/shop">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 font-bold bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Filters Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="text-base px-8 py-6 font-bold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get a Custom Quote
              </Button>
            </div>

            {/* Trust Badges */}
            <div
              className="flex flex-wrap gap-6 animate-slide-up"
              style={{ animationDelay: '0.55s', animationFillMode: 'backwards' }}
            >
              {[
                { icon: Truck, label: 'Ships in 1-2 Business Days' },
                { icon: Shield, label: 'Booth-Specific Filter Tracking' },
                { icon: Star, label: '1,200+ Shops Nationwide' },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-white/50">
                  <badge.icon className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
