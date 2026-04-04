import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://abcfilters.net' },
  { name: 'Contact', url: 'https://abcfilters.net/contact' },
]);

export default function Contact() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact ABC Filters - Get a Custom Quote or Filter Help"
        description="Contact ABC Filters for custom filter quotes, bulk pricing, or technical support. Call 1-888-545-7715 or email orders@abcfilters.net. We match any booth make/model."
        canonical="https://abcfilters.net/contact"
        structuredData={breadcrumbSchema}
      />
      <Navigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: 'Contact' }]} />
        </div>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
