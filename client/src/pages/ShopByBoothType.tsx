import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, Wind, Layers, ArrowDown } from 'lucide-react';
import { BOOTH_TYPES, type BoothType, getBrandsByType } from '@/data/boothBrands';
import {
  CrossdraftDiagram,
  DowndraftDiagram,
  SemiDowndraftDiagram,
  SideDowndraftDiagram,
  OpenFaceDiagram,
  PrepStationDiagram,
} from '@/components/AirflowDiagrams';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Shop by Booth Type', url: 'https://pfsfilters.com/shop-by-booth-type' },
]);

// Wind animation CSS injected once
const WIND_ANIMATION_CSS = `
@keyframes windFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes windWave {
  0%, 100% { transform: skewX(0deg) translateX(0); }
  15% { transform: skewX(-1deg) translateX(-2px); }
  30% { transform: skewX(0.5deg) translateX(1px); }
  45% { transform: skewX(-0.3deg) translateX(-1px); }
  60% { transform: skewX(0.2deg) translateX(0.5px); }
  75% { transform: skewX(-0.1deg) translateX(-0.5px); }
}
@keyframes windParticle {
  0% { transform: translateX(-20px) translateY(0); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.4; }
  100% { transform: translateX(120px) translateY(-8px); opacity: 0; }
}
.wind-text {
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #4d9fff 20%,
    #ffffff 40%,
    #7dd3fc 60%,
    #ffffff 80%,
    #4d9fff 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: windFlow 4s ease-in-out infinite, windWave 6s ease-in-out infinite;
  display: inline-block;
}
.wind-particle {
  position: absolute;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(77,159,255,0.5), transparent);
  border-radius: 2px;
  animation: windParticle 2.5s ease-in-out infinite;
}
.wind-particle:nth-child(2) { animation-delay: 0.5s; top: 30%; left: 10%; }
.wind-particle:nth-child(3) { animation-delay: 1.0s; top: 60%; left: 5%; }
.wind-particle:nth-child(4) { animation-delay: 1.5s; top: 45%; left: 15%; }
.wind-particle:nth-child(5) { animation-delay: 2.0s; top: 70%; left: 8%; }
`;

const TYPE_CARDS: {
  type: BoothType;
  Diagram: React.FC;
  accentColor: string;
  glowColor: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  filterNeeds: string;
}[] = [
  {
    type: 'downdraft',
    Diagram: DowndraftDiagram,
    accentColor: 'border-cyan-500/30',
    glowColor: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]',
    badge: 'BEST FINISH QUALITY',
    badgeColor: 'bg-red-600',
    description: 'Air enters from full ceiling plenum and exits through raised floor grates into a basement pit. Provides the cleanest, most contamination-free finish.',
    filterNeeds: 'Ceiling diffusion media + exhaust arrestors + pre-filters',
  },
  {
    type: 'crossdraft',
    Diagram: CrossdraftDiagram,
    accentColor: 'border-cyan-500/30',
    glowColor: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-blue-600',
    description: 'Horizontal front-to-rear airflow. Air enters through intake filters on the front wall and exits through exhaust filters on the rear wall.',
    filterNeeds: 'Intake panels (front/side) + exhaust arrestors (rear wall)',
  },
  {
    type: 'semi-downdraft',
    Diagram: SemiDowndraftDiagram,
    accentColor: 'border-purple-500/30',
    glowColor: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]',
    badge: 'MID-RANGE',
    badgeColor: 'bg-purple-600',
    description: 'Air enters from the ceiling at the front half and exits through rear floor-level exhaust. Better finish than crossdraft without requiring a full pit.',
    filterNeeds: 'Partial ceiling media + rear exhaust arrestors',
  },
  {
    type: 'side-downdraft',
    Diagram: SideDowndraftDiagram,
    accentColor: 'border-cyan-600/30',
    glowColor: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]',
    badge: 'NO PIT REQUIRED',
    badgeColor: 'bg-cyan-700',
    description: 'Ceiling intake with side wall fan plenum exhaust. Drops directly on existing concrete slab — no pit excavation needed.',
    filterNeeds: 'Ceiling media + side-wall exhaust arrestors',
  },
  {
    type: 'open-face',
    Diagram: OpenFaceDiagram,
    accentColor: 'border-emerald-500/30',
    glowColor: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]',
    description: 'Open front design with rear wall exhaust only. Lower cost, faster throughput for parts painting and touch-up work.',
    filterNeeds: 'Rear wall exhaust arrestors (no intake filtration required)',
  },
  {
    type: 'prep-station',
    Diagram: PrepStationDiagram,
    accentColor: 'border-amber-500/30',
    glowColor: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]',
    description: 'Controlled dust containment with ceiling panels and exhaust. Positioned adjacent to paint booths for sanding and masking work.',
    filterNeeds: 'Ceiling panels + exhaust filters for dust containment',
  },
];

export default function ShopByBoothType() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <style dangerouslySetInnerHTML={{ __html: WIND_ANIMATION_CSS }} />
      <SEO
        title="Paint Booth Filter Guidance by Airflow Type | PFS Filters"
        description="Compare typical filter positions for downdraft, crossdraft, semi-downdraft, side-downdraft, open-face, and prep-station booths, then verify the model and dimensions."
        canonical="https://pfsfilters.com/shop-by-booth-type"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#040404] to-[#040404]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4d9fff]/5 rounded-full blur-[120px] animate-pulse" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Shop by Booth Type' }]} />
          <div className="text-center mt-6">
            <p className="text-[#4d9fff] text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Airflow Configurations
            </p>
            {/* Wind-animated heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight relative inline-block">
              <span className="text-white">Choose Your </span>
              <span className="wind-text relative">
                Airflow
                {/* Wind particles */}
                <span className="wind-particle" style={{ top: '20%', left: '0%' }} />
                <span className="wind-particle" style={{ top: '50%', left: '12%' }} />
                <span className="wind-particle" style={{ top: '75%', left: '5%' }} />
                <span className="wind-particle" style={{ top: '35%', left: '18%' }} />
                <span className="wind-particle" style={{ top: '65%', left: '2%' }} />
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Your booth's airflow pattern helps determine which filter stages are used. Select the configuration to review typical positions, then confirm the model and actual dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* Booth Type Cards */}
      <section className="px-3 sm:px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
            {TYPE_CARDS.map((card) => {
              const info = BOOTH_TYPES[card.type];
              const brands = getBrandsByType(card.type);
              const DiagramComponent = card.Diagram;
              return (
                <div
                  key={card.type}
                  className={`group relative border ${card.accentColor} bg-[#080810] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 ${card.glowColor}`}
                >
                  {/* Animated Diagram Section */}
                  <div className="relative h-44 sm:h-52 md:h-56 bg-gradient-to-b from-[#0c0c18] to-[#080810] p-3 sm:p-4 border-b border-white/[0.04]">
                    {/* Badge */}
                    {card.badge && (
                      <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 z-10 ${card.badgeColor} text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-lg`}>
                        {card.badge}
                      </div>
                    )}
                    {/* Brand count */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10">
                      {brands.length} brands
                    </div>
                    
                    <DiagramComponent />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#4d9fff] transition-colors">
                      {info.label}
                    </h2>
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-4">
                      {card.description}
                    </p>

                    {/* Filter needs */}
                    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 sm:p-4 mb-4">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-white/40 uppercase tracking-wider">Filters Needed</span>
                      <p className="text-xs sm:text-sm text-white/70 mt-1">{card.filterNeeds}</p>
                    </div>

                    {/* Brand chips */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                      {brands.slice(0, 5).map(b => (
                        <Link key={b.slug} href={`/shop-by-booth/${b.slug}`}>
                          <span className="text-[10px] sm:text-[11px] bg-white/[0.05] text-white/65 border border-white/[0.1] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
                            {b.name}
                          </span>
                        </Link>
                      ))}
                      {brands.length > 5 && (
                        <span className="text-[10px] sm:text-[11px] text-white/40 px-1 self-center">+{brands.length - 5} more</span>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link href={`/shop-by-booth?type=${card.type}`}>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-white/[0.05] border border-white/12 text-white/90 font-semibold rounded-xl group-hover:bg-[#4d9fff]/10 group-hover:border-[#4d9fff]/30 group-hover:text-white transition-all text-sm sm:text-base">
                        Browse Filters <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Airflow Explainer Section */}
      <section className="px-3 sm:px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Understanding Booth Airflow</h2>
            <p className="text-white/65 text-sm sm:text-base max-w-xl mx-auto">
              The right airflow configuration ensures optimal finish quality and proper filter placement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="border border-white/[0.08] bg-white/[0.03] rounded-2xl p-5 sm:p-6 hover:border-white/12 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#4d9fff]/10 flex items-center justify-center mb-4">
                <Wind className="h-5 w-5 text-[#4d9fff]" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-base">Why It Matters</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Airflow direction determines where contaminants travel and where filters must be placed. Wrong placement leads to poor finish quality.
              </p>
            </div>
            <div className="border border-white/[0.08] bg-white/[0.03] rounded-2xl p-5 sm:p-6 hover:border-white/12 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#4d9fff]/10 flex items-center justify-center mb-4">
                <Layers className="h-5 w-5 text-[#4d9fff]" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-base">Intake vs Exhaust</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                <span className="text-white/85">Intake filters</span> clean incoming air before it reaches the vehicle. <span className="text-white/85">Exhaust filters</span> capture overspray before air exits.
              </p>
            </div>
            <div className="border border-white/[0.08] bg-white/[0.03] rounded-2xl p-5 sm:p-6 hover:border-white/12 transition-colors sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-[#4d9fff]/10 flex items-center justify-center mb-4">
                <ArrowDown className="h-5 w-5 text-[#4d9fff]" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-base">Not Sure?</h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Know your booth brand? Use our <Link href="/shop-by-booth" className="text-[#4d9fff] hover:underline">Shop by Brand</Link> page or <Link href="/contact" className="text-[#4d9fff] hover:underline">contact us</Link> for expert help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
