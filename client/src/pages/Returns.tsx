import { SEO } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Package, XCircle, Mail, Phone } from 'lucide-react';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { MobileHeader } from '@/components/MobileHeader';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Returns & Refunds', url: 'https://abcfilters.net/returns' },
]);

export default function Returns() {
  return (
    <div className="min-h-screen safe-bottom">
      <MobileHeader title="Returns & Refunds" showBack={false} />
      <SEO
        title="Returns & Refunds Policy"
        description="Review our returns and refunds policy. Returns accepted within 10 days with 30% restocking fee. Learn about eligibility, non-refundable items, and refund processing."
        canonical="https://abcfilters.net/returns"
        structuredData={breadcrumbSchema}
      />
      <div className="px-4 pt-4 pb-16 max-w-4xl">
        <Breadcrumb items={[{ label: 'Returns & Refunds' }]} />
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Returns & Refunds Policy</h1>
          <p className="text-xl text-muted-foreground">Please review our policy before making a purchase</p>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" /> Return Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Returns are accepted within <strong>10 days of purchase</strong>, subject to the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>A <strong className="text-foreground">30% restocking fee</strong> will be applied to all returns</li>
                <li>Items must be <strong className="text-foreground">unused</strong> and in original condition</li>
                <li>All <strong className="text-foreground">original parts and packaging materials</strong> must be included</li>
                <li>Custom orders are <strong className="text-foreground">non-returnable</strong></li>
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
              <p>The following are non-refundable:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Shipping and handling fees</strong></li>
                <li><strong className="text-foreground">Customized items</strong> or special orders</li>
                <li>Items damaged due to improper use or storage</li>
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
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We will notify you of the approval or rejection of your refund</li>
                <li>If approved, your refund will be processed within <strong className="text-foreground">5–7 business days</strong></li>
                <li>Refunds are issued to the original payment method</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> How to Initiate a Return
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To start a return, contact us within 10 days of your purchase:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:orders@abcfilters.net" className="flex items-center gap-2 text-primary hover:underline">
                  <Mail className="h-4 w-4" /> orders@abcfilters.net
                </a>
                <a href="tel:1-888-545-7715" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="h-4 w-4" /> 1-888-545-7715
                </a>
              </div>
              <p className="text-sm text-muted-foreground">Please include your order number and reason for return in your message.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
