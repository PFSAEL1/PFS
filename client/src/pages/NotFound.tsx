import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Filter, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-32 pb-16 text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-500/10 rounded-full mb-8">
          <Filter className="h-12 w-12 text-blue-400" />
        </div>
        <h1 className="text-6xl font-extrabold text-blue-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">Page Not Found</h2>
        <p className="text-white/50 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="gap-2">
              <ShoppingBag className="h-4 w-4" /> Shop Filters
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
