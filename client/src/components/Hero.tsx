import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShieldCheck, Truck, Star, Filter } from 'lucide-react';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/hero-spray-booth_91689808.jpg';
const FIBERGLASS_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png';
const TACKY_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png';

export const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-semibold tracking-wide uppercase">
              A Division of PFS Spray Booths
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Paint Booth Filters
              </span>{' '}
              for Every Application
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
              Fiberglass arrestors, tacky panels, intake &amp; exhaust filters — engineered for superior overspray capture. Trusted by 1,000+ auto body shops nationwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold gap-2 shadow-lg">
                  Shop All Filters <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                  Get a Custom Quote
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-blue-400" />
                <span>Fast Nationwide Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>1,000+ Happy Shops</span>
              </div>
            </div>
          </div>

          {/* Right — product showcase */}
          <div className="hidden lg:flex flex-col gap-4 animate-slide-up">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors">
                <img src={FIBERGLASS_IMAGE} alt="Fiberglass Paint Arrestor" className="w-full h-32 object-contain mb-3" />
                <p className="text-white font-semibold text-sm">Fiberglass Arrestors</p>
                <p className="text-slate-400 text-xs mt-1">High-capacity exhaust filtration</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-colors">
                <img src={TACKY_IMAGE} alt="Tacky Panel Filter" className="w-full h-32 object-contain mb-3" />
                <p className="text-white font-semibold text-sm">Tacky Panel Filters</p>
                <p className="text-slate-400 text-xs mt-1">Superior intake particle capture</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/30 rounded-lg">
                  <Filter className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-white font-semibold">Custom Sizes Available</p>
                  <p className="text-slate-400 text-xs">Cut to spec for any booth model</p>
                </div>
                <Link href="/contact" className="ml-auto">
                  <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </header>
  );
};
