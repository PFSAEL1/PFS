import { Users, Package, Clock, ShieldCheck, Scissors, Truck, Star } from 'lucide-react';

const ITEMS = [
  { icon: Users, text: '1,200+ shops served nationwide' },
  { icon: Package, text: '50,000+ filters shipped this year' },
  { icon: Truck, text: 'Ships in 1–2 business days' },
  { icon: Scissors, text: 'Custom sizes cut to spec' },
  { icon: ShieldCheck, text: 'Quality guaranteed or we make it right' },
  { icon: Star, text: '4.9/5 average customer rating' },
  { icon: Clock, text: 'Same-day dispatch on most stock orders' },
];

export const SocialProofBanner = () => {
  // Render the set twice for a seamless infinite loop.
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-bar bg-[#0a0a0a] border-b border-white/10 py-2 overflow-hidden group">
      <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <div
            key={i}
            className="ticker-item flex items-center gap-2.5"
          >
            <item.icon className="h-3 w-3 text-blue-400/70 shrink-0" />
            <span>{item.text}</span>
            <span className="ticker-dot ml-10 h-1 w-1 rounded-full bg-white" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
};
