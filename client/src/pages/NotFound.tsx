import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Filter, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-4 pb-16 text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8">
          <Filter className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground text-lg mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
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
    </div>
  );
}
