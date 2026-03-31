import { Users, Package, Clock } from 'lucide-react';

export const SocialProofBanner = () => {
  return (
    <div className="bg-primary text-primary-foreground py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>1,200+ shops served nationwide</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span>50,000+ filters shipped this year</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Ships in 1–2 business days</span>
        </div>
      </div>
    </div>
  );
};
