/**
 * Hero - Matches abcfilters.net exactly
 * Light/white background with spray booth image faded on right
 * "The Only Filter Program That Manages Your Entire Booth"
 * Shop Filters Now + Get a Custom Quote CTAs
 * Trust badges: Ships in 1-2 Business Days, Booth-Specific Filter Tracking, 1,200+ Shops Nationwide
 */
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, ShoppingBag, Truck, Shield, Star } from 'lucide-react';

// Cinematic booth ceiling image — real photorealistic style
const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-ceiling2-hETWeKdkQ9gxgTot5wBu7H.webp';

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-40 pb-20 overflow-hidden"
      >
        {/* Background Image — cinematic dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Professional spray booth with paint filtration system"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.05)' }}
          />
          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          {/* Badge */}
          <div className="flex justify-center mb-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                A Division of PFS Spray Booths — 30+ Years of Expertise
              </span>
            </div>
          </div>

          {/* Heading — white text on dark cinematic background */}
          <h1
            className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] text-white animate-slide-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            The Only Filter Program That Manages Your Entire Booth
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-tight font-medium animate-slide-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
          >
            Auto-reorder on your schedule. Booth-specific filter tracking. Backed by 30+ years of
            PFS Spray Booths expertise. Never run out of filters again.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center pt-4 animate-scale-in"
            style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-12 py-7 font-bold bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-medium hover:shadow-bold text-white"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Filters Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="text-lg px-10 py-7 font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get a Custom Quote
            </Button>
          </div>

          {/* Trust Badges */}
          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 animate-slide-up"
            style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
          >
            {[
              { icon: Truck, label: 'Ships in 1–2 Business Days' },
              { icon: Shield, label: 'Booth-Specific Filter Tracking' },
              { icon: Star, label: '1,200+ Shops Nationwide' },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-white/80">
                <badge.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
