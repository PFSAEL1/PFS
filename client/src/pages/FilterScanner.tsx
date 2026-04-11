import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { Sparkles, Camera, Search, ShoppingCart, Crown, ArrowRight } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'AI Filter Scanner', url: 'https://pfsfilters.com/filter-scanner' },
]);

export default function FilterScanner() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="AI Filter Scanner - Identify & Reorder Paint Booth Filters Instantly"
        description="Use our AI-powered filter scanner to photograph your existing paint booth filters and instantly identify them for reordering. Available with Gold and Platinum memberships."
        canonical="https://pfsfilters.com/filter-scanner"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <Breadcrumb items={[{ label: 'AI Filter Scanner' }]} />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">AI-Powered</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white pfs-heading-animate">
            Filter Scanner
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Photograph your existing filters and our AI instantly identifies them — so you can reorder the exact right product in seconds.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Camera, step: '1', title: 'Take a Photo', desc: 'Photograph your existing filter — front, back, or the label.' },
            { icon: Search, step: '2', title: 'AI Identifies It', desc: 'Our AI analyzes the image and matches it to our product catalog.' },
            { icon: ShoppingCart, step: '3', title: 'Add to Cart', desc: 'Instantly add the exact replacement to your cart and checkout.' },
          ].map((item) => (
            <Card key={item.step} className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="relative inline-flex mb-4">
                  <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-blue-400-foreground rounded-full text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Membership gate */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-8 pb-8 text-center">
            <Crown className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Available on Gold & Platinum Plans</h2>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              The AI Filter Scanner is included with Gold and Platinum memberships. Upgrade today to unlock instant filter identification, plus discounts on every order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/memberships">
                <Button className="bg-blue-500 text-blue-400-foreground hover:bg-blue-500/90 gap-2">
                  View Membership Plans <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline">Sign In to Your Account</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
