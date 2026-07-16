import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Privacy Policy', url: 'https://pfsfilters.com/privacy-policy' },
]);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Privacy Policy - PFS Filters"
        description="Read the PFS Filters privacy policy to understand how we collect, use, and protect your personal information."
        canonical="https://pfsfilters.com/privacy-policy"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
        <h1 className="text-4xl font-bold mb-8 text-white pfs-heading-animate">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-white/50">
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
            <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, contact us at <a href="mailto:orders@pfsfilters.com" className="text-blue-400 hover:underline">orders@pfsfilters.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Cookies</h2>
            <p>We use cookies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
            <p>If you have questions about this privacy policy, contact us at <a href="mailto:orders@pfsfilters.com" className="text-blue-400 hover:underline">orders@pfsfilters.com</a> or call <a href="tel:855-496-7969" className="text-blue-400 hover:underline">855-496-7969</a>.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
