import { Link } from 'wouter';
import { CheckCircle2, Phone, Mail } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#040404] text-white flex flex-col">
      <SEO
        title="Thank You - PFS Filters"
        description="Thanks for reaching out to PFS Filters. Our team has received your message and will get back to you shortly."
        canonical="https://pfsfilters.com/thank-you"
      />
      <Navigation />
      <main className="flex-1 pt-20 flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center py-20">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/30">
            <CheckCircle2 className="h-11 w-11 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Thank You!</h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Your message has been received. A member of the PFS Filters team will get back to you
            as soon as possible — usually within one business day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/shop">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-6 text-base w-full sm:w-auto">
                Browse Filters
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent font-bold px-8 py-6 text-base w-full sm:w-auto"
              >
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="border-t border-[#2a2a2a] pt-8">
            <p className="text-sm text-white/50 mb-4">Need to reach us right away?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:855-496-7969"
                className="inline-flex items-center justify-center gap-2 text-white hover:text-blue-400 transition-colors font-semibold"
              >
                <Phone className="h-4 w-4 text-blue-400" /> 855-496-7969
              </a>
              <a
                href="mailto:orders@pfsfilters.com"
                className="inline-flex items-center justify-center gap-2 text-white hover:text-blue-400 transition-colors font-semibold"
              >
                <Mail className="h-4 w-4 text-blue-400" /> orders@pfsfilters.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
