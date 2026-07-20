import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Contact', url: 'https://pfsfilters.com/contact' },
]);

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Contact PFS Filters - Get a Custom Quote or Filter Help"
        description="Contact PFS Filters for custom filter quotes, bulk pricing, or technical support. Call 855-496-7969 or email orders@pfsfilters.com. We match any booth make/model."
        canonical="https://pfsfilters.com/contact"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header - darker */}
      <section className="section-darker pt-28 pb-6 px-4">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Contact' }]} />
        </div>
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-up" />

      {/* Contact form - raised */}
      <section className="section-raised tex-grain py-10 px-4">
        <ContactForm />
      </section>

      {/* Arc transition */}
      <div className="arc-divider arc-divider-down" />

      <Footer />
    </div>
  );
}
