import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight } from 'lucide-react';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com' },
  { name: 'Filter Scanner', url: 'https://www.pfsfilters.com/filter-scanner' },
]);

const Footer = lazy(() => import('@/components/Footer').then((module) => ({ default: module.Footer })));

function DeferredFooter() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (showFooter) return;
    const interactionEvents = ['scroll', 'click', 'touchstart', 'pointerdown', 'keydown'] as const;

    const revealFooter = () => setShowFooter(true);
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, revealFooter);
      });
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, revealFooter, { once: true, passive: true });
    });

    return () => {
      removeInteractionListeners();
    };
  }, [showFooter]);

  if (!showFooter) return <div style={{ minHeight: 420 }} aria-hidden="true" />;

  return (
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  );
}

export default function FilterScanner() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Photo-Assisted Paint Booth Filter Review | PFS Filters"
        description="Use a filter photo to narrow catalog candidates, then verify the booth position, label, and actual dimensions before ordering."
        canonical="https://www.pfsfilters.com/filter-scanner"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-24 pb-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: 'Filter Scanner' }]} />
          <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
            Filter Scanner
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Photograph the filter and label to narrow catalog candidates. Verify the booth position and actual dimensions before ordering.
          </p>
          </div>
        </div>
      </section>


      {/* Content - raised */}
      <section className="section-raised py-14 px-4">
        <div className="container mx-auto max-w-4xl">

        {/* How it works */}
        <ol className="keyword-guide-copy mb-12 list-decimal space-y-3 pl-5">
          <li>Photograph the filter, front and back, including the label.</li>
          <li>The scanner narrows catalog candidates. It does not prove the filter fits.</li>
          <li>Confirm the stage, label, and measured size before you add it to the cart.</li>
        </ol>

        {/* Membership gate */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Included with Gold and Platinum</h2>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              Filter Scanner is included with Gold and Platinum memberships. It narrows catalog matches from a photo. Confirm the stage, label, and size before you order.
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
      </section>


      <DeferredFooter />
    </div>
  );
}
