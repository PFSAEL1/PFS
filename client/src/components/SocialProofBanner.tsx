import { Star, Truck, Shield, Phone } from 'lucide-react';

export const SocialProofBanner = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <div className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
          <span className="font-medium">4.9/5 Rating</span>
          <span className="text-primary-foreground/70">· 1,000+ shops served</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" />
          <span>Fast Nationwide Shipping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>Quality Guaranteed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" />
          <a href="tel:1-888-545-7715" className="hover:underline">1-888-545-7715</a>
        </div>
      </div>
    </div>
  );
};
