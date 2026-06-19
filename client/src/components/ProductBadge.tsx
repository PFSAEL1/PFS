// ProductBadge — Dyson-style status pill for product cards.
import { ProductBadge as Badge } from '@/lib/productSignals';

const toneClass: Record<Badge['tone'], string> = {
  reorder: 'bg-black/80 text-white ring-1 ring-white/15',
  ship: 'bg-black/75 text-white ring-1 ring-white/15',
  matched: 'bg-[#0e4a4a]/85 text-teal-100 ring-1 ring-teal-300/25', // teal secondary accent
  new: 'bg-[#1d4ed8]/85 text-white ring-1 ring-blue-300/25',
  custom: 'bg-black/75 text-white ring-1 ring-white/15',
};

export const ProductBadges = ({
  badges,
  className = '',
}: {
  badges: Badge[];
  className?: string;
}) => {
  if (!badges || badges.length === 0) return null;
  return (
    <div className={`pointer-events-none absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1.5 ${className}`}>
      {badges.map((b) => (
        <span
          key={b.label}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none tracking-wide backdrop-blur-sm ${toneClass[b.tone]}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
};
