import { SEO } from '@/components/SEO';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { MobileHeader } from '@/components/MobileHeader';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Privacy Policy', url: 'https://abcfilters.net/privacy-policy' },
]);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen safe-bottom">
      <MobileHeader title="Privacy Policy" showBack={false} />
      <SEO
        title="Privacy Policy - ABC Filters by PFS"
        description="Read the ABC Filters privacy policy to understand how we collect, use, and protect your personal information."
        canonical="https://abcfilters.net/privacy-policy"
        structuredData={breadcrumbSchema}
      />
      <div className="px-4 pt-4 pb-16 max-w-4xl">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
            <p>We collect information you provide directly to us, including name, email address, phone number, company name, and shipping address when you place an order or contact us. We also collect information about your use of our website through cookies and similar technologies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to process orders, send order confirmations and shipping updates, respond to your inquiries, send promotional communications (with your consent), improve our website and services, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment information is processed securely through Shopify and Stripe.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, contact us at <a href="mailto:orders@abcfilters.net" className="text-primary hover:underline">orders@abcfilters.net</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Cookies</h2>
            <p>We use cookies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>If you have questions about this privacy policy, contact us at <a href="mailto:orders@abcfilters.net" className="text-primary hover:underline">orders@abcfilters.net</a> or call <a href="tel:1-888-545-7715" className="text-primary hover:underline">1-888-545-7715</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
