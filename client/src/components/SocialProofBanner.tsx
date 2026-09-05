import { CircleHelp, Clock, MapPin, RefreshCw, Scissors, Wind } from 'lucide-react';

const ITEMS = [
  { icon: Wind, text: 'Paint booth intake and exhaust media' },
  { icon: Clock, text: 'Stocked items typically process in 1–2 business days' },
  { icon: Scissors, text: 'Custom-size options available by quote' },
  { icon: RefreshCw, text: 'Monthly Subscribe & Save on eligible products' },
  { icon: CircleHelp, text: 'Sizing help by phone or email' },
  { icon: MapPin, text: 'Santa Rosa, California' },
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
