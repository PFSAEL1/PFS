import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Phone } from 'lucide-react';

export const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#080808] border-t border-white/10 p-3 flex gap-2 shadow-lg">
      <Link href="/shop" className="flex-1">
        <Button className="w-full bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2" size="sm">
          <ShoppingBag className="h-4 w-4" />
          Shop Now
        </Button>
      </Link>
      <a href="tel:1-888-545-7715" className="flex-1">
        <Button variant="outline" className="w-full gap-2" size="sm">
          <Phone className="h-4 w-4" />
          Call Us
        </Button>
      </a>
    </div>
  );
};
