// Hero — PFS Filters Dark Theme
// Full-bleed dark hero with live canvas overspray animation background
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, ShoppingBag, Truck, Shield, Star } from 'lucide-react';
import FilterHeroCanvas from '@/components/FilterHeroCanvas';

export const Hero = () => {
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
        {/* Full-screen canvas animation background */}
        <div className="absolute inset-0 z-0">
          <FilterHeroCanvas />
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 animate-fade-in">
              <Shield className="w-3.5 h-3.5" />
              A Division of PFS Spray Booths — 30+ Years of Expertise
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 animate-slide-up"
              style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
            >
              The Only Filter Program That{' '}
              <span className="text-blue-400">Manages Your Entire Booth</span>
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
                { icon: Truck, label: 'Ships in 1–2 Business Days' },
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
