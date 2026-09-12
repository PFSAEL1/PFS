import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Package, XCircle, Mail, Phone } from 'lucide-react';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com' },
  { name: 'Returns & Refunds', url: 'https://www.pfsfilters.com/returns' },
]);

export default function Returns() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Returns & Refunds Policy"
        description="Review the PFS Filters return policy for unopened packages, the five-business-day return window, shipping-cost deductions, and the 25% restocking fee."
        canonical="https://www.pfsfilters.com/returns"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: 'Returns & Refunds' }]} />
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white pfs-heading-animate">Returns & Refunds Policy</h1>
            <p className="text-xl text-white/50">Please review our policy before making a purchase</p>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Policy cards - raised */}
      <section className="section-raised tex-grain py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-400" /> Return Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Unopened packages</strong> may be returned within <strong>five business days</strong>, subject to the following conditions:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/50">
                  <li>The package must remain <strong className="text-foreground">unopened</strong></li>
                  <li>A <strong className="text-foreground">25% restocking fee</strong> is deducted from the refund</li>
                  <li><strong className="text-foreground">Shipping costs</strong> are deducted from the refund</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" /> Non-Refundable Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The following are not eligible for return or refund:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/50">
                  <li><strong className="text-foreground">Opened packages</strong></li>
                  <li><strong className="text-foreground">Shipping and handling fees</strong></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" /> Refund Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Once your return is received and inspected:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/50">
                  <li>We will notify you of the approval or rejection of your refund</li>
                  <li>If approved, the refund is reduced by shipping costs and the <strong className="text-foreground">25% restocking fee</strong></li>
                  <li>Approved refunds are issued to the original payment method</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" /> How to Initiate a Return
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To start a return within the five-business-day window, contact us before sending the package:</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:orders@pfsfilters.com" className="flex items-center gap-2 text-blue-400 hover:underline">
                    <Mail className="h-4 w-4" /> orders@pfsfilters.com
                  </a>
                  <a href="tel:855-496-7969" className="flex items-center gap-2 text-blue-400 hover:underline">
                    <Phone className="h-4 w-4" /> 855-496-7969
                  </a>
                </div>
                <p className="text-sm text-white/50">Please include your order number, reason for return, and confirmation that the package is unopened.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
