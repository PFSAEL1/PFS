import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { createBreadcrumbSchema } from '@/lib/structuredData';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://www.pfsfilters.com' },
  { name: 'Terms of Service', url: 'https://www.pfsfilters.com/terms-of-service' },
]);

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Terms of Service - PFS Filters"
        description="Read the PFS Filters terms governing website use, orders, Subscribe & Save, shipping, returns, product guidance, and customer accounts."
        canonical="https://www.pfsfilters.com/terms-of-service"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      <section className="section-darker pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: 'Terms of Service' }]} />
          <h1 className="text-4xl font-bold mb-2 text-white pfs-heading-animate">Terms of Service</h1>
          <p className="text-white/50">Effective September 12, 2026</p>
        </div>
      </section>

      <div className="arc-divider arc-divider-up" />

      <section className="section-raised tex-grain py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8 text-white/60">
            <div className="space-y-4">
              <p>These Terms of Service (“Terms”) govern your access to and use of the PFS Filters website, online store, accounts, products, subscriptions, content, and related services (collectively, the “Services”). “PFS Filters,” “we,” “us,” and “our” refer to PFS Filters, a division of PFS Spray Booths. Our online store is powered by Shopify.</p>
              <p>By accessing or using the Services or placing an order, you agree to these Terms and our <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>. If you do not agree, do not use the Services.</p>
            </div>

            <PolicySection title="1. Eligibility and Accounts">
              <p>You must be legally able to enter into a binding agreement to use the Services. If you create an account or place an order on behalf of a business, you represent that you are authorized to bind that business. You are responsible for providing accurate, current information and for maintaining the security of your account credentials.</p>
            </PolicySection>

            <PolicySection title="2. Product Information and Fitment">
              <p>We work to keep product descriptions, images, dimensions, prices, and availability accurate, but errors or differences may occur. Colors and appearance may vary by device or manufacturing batch. Products, specifications, prices, and availability may change without notice.</p>
              <p>Paint booth filter selection depends on the booth, filter position, actual dimensions, airflow, media type, coating process, and operating conditions. Brand, model, category, scanner, and cross-reference guidance is a starting point and does not replace verification of the existing filter and system requirements. Contact us before ordering if fitment is uncertain.</p>
              <p>No filter by itself makes a facility compliant with an environmental rule, permit, fire code, or other requirement. The purchaser remains responsible for verifying system suitability, installation, operation, maintenance, and applicable regulatory obligations.</p>
            </PolicySection>

            <PolicySection title="3. Orders and Acceptance">
              <p>Submitting an order is an offer to purchase. We may accept, reject, limit, or cancel an order, including for suspected fraud, pricing or inventory errors, product unavailability, shipping restrictions, or other legitimate business reasons. An order is accepted when we confirm acceptance and process payment. If we cancel an order after payment, we will refund the canceled amount to the original payment method.</p>
              <p>Please review product, quantity, shipping, billing, and subscription details before completing checkout. Changes or cancellations may not be possible after processing begins.</p>
            </PolicySection>

            <PolicySection title="4. Prices, Taxes, and Payment">
              <p>Prices and promotions may change without notice. The price charged is the price shown at checkout when the order is submitted. Unless stated otherwise, prices do not include shipping, handling, freight, taxes, duties, or other charges. You authorize us and our payment providers to charge the payment method you provide for the total shown at checkout and for any recurring purchase you expressly select.</p>
            </PolicySection>

            <PolicySection title="5. Subscribe & Save">
              <p>Eligible product variants may offer a monthly Subscribe &amp; Save purchase option. When selected and confirmed at checkout, the subscription renews monthly and applies the discount displayed at checkout, currently 5% for eligible products. Recurring charges, products, quantities, shipping, taxes, and the next order date are shown during checkout or in the subscription-management experience.</p>
              <p>You authorize recurring charges to the payment method associated with the subscription until the subscription is canceled or otherwise ends. You may manage or cancel an active subscription through the Shopify customer account or subscription-management link made available to you. Changes should be completed before the next order is processed; a change submitted after processing begins may apply to a later cycle.</p>
            </PolicySection>

            <PolicySection title="6. Shipping and Delivery">
              <p>Processing and delivery dates are estimates, not guarantees. Most stocked orders are generally processed within one to two business days, while freight, custom, large-quantity, and special-order items may require additional time. Carrier delays, weather, address problems, customs, and events outside our reasonable control may affect delivery.</p>
              <p>You are responsible for providing a complete and accurate delivery address and for reviewing packages promptly upon delivery. Contact us promptly about visible damage, missing packages, or shipment discrepancies so we can review the available carrier or order records.</p>
            </PolicySection>

            <PolicySection title="7. Returns and Refunds">
              <p>Opened packages are not eligible for return. Unopened packages may be returned within five business days for a refund, less shipping costs and a 25% restocking fee. Contact PFS Filters at <a href="mailto:orders@pfsfilters.com" className="text-blue-400 hover:underline">orders@pfsfilters.com</a> before sending a return. Additional instructions are available in our <Link href="/returns" className="text-blue-400 hover:underline">Returns &amp; Refunds Policy</Link>.</p>
            </PolicySection>

            <PolicySection title="8. Acceptable Use">
              <p>You may not use the Services to violate law, infringe intellectual-property or privacy rights, transmit malicious code, interfere with security or operation, collect data unlawfully, impersonate another person, submit false information, or engage in fraud, abuse, or unauthorized resale. We may suspend or terminate access for conduct that violates these Terms or threatens customers, the Services, or third parties.</p>
            </PolicySection>

            <PolicySection title="9. Intellectual Property">
              <p>The Services and their original text, graphics, branding, photographs, videos, software, design, and other content are owned by or licensed to PFS Filters, PFS Spray Booths, Shopify, or their respective licensors and are protected by applicable intellectual-property laws. You may use the Services for lawful purchasing, evaluation, and internal business purposes. No other right or license is granted without written permission.</p>
              <p>Third-party names, marks, booth models, and product names belong to their respective owners. References are used for identification and compatibility guidance and do not imply authorization or endorsement unless expressly stated.</p>
            </PolicySection>

            <PolicySection title="10. Third-Party Services and Links">
              <p>The Services may use or link to third-party services, including Shopify, payment processors, carriers, map providers, analytics providers, and manufacturers. Third-party services are governed by their own terms and privacy practices. We are not responsible for third-party websites or services that we do not control.</p>
            </PolicySection>

            <PolicySection title="11. Errors and Corrections">
              <p>We may correct typographical errors, inaccurate descriptions, pricing errors, availability errors, or omissions and may update information or cancel affected orders when reasonably necessary. If a correction materially affects an accepted order, we will attempt to contact you using the information provided with the order.</p>
            </PolicySection>

            <PolicySection title="12. Disclaimer of Warranties">
              <p>To the fullest extent permitted by law, the Services are provided “as is” and “as available.” Except for any express written warranty provided with a specific product, we disclaim implied warranties, including merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant uninterrupted or error-free operation or that product-selection guidance will satisfy every system, process, or regulatory requirement.</p>
              <p>Some jurisdictions do not allow certain warranty exclusions, so portions of this section may not apply to you.</p>
            </PolicySection>

            <PolicySection title="13. Limitation of Liability">
              <p>To the fullest extent permitted by law, PFS Filters, PFS Spray Booths, and their owners, employees, affiliates, service providers, and licensors will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, data, production, or business opportunity arising from the Services or products.</p>
              <p>To the fullest extent permitted by law, our aggregate liability for a claim relating to a product, order, or the Services will not exceed the amount you paid to us for the product or order giving rise to the claim. These limitations do not exclude liability that cannot lawfully be limited.</p>
            </PolicySection>

            <PolicySection title="14. Indemnification">
              <p>To the fullest extent permitted by law, you agree to indemnify and hold harmless PFS Filters, PFS Spray Booths, and their owners, employees, affiliates, service providers, and licensors from third-party claims, losses, liabilities, and reasonable costs arising from your unlawful misuse of the Services, your violation of these Terms, or your infringement of another party’s rights.</p>
            </PolicySection>

            <PolicySection title="15. Privacy">
              <p>Our collection and use of personal information are described in our <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>. Shopify and other service providers may process information under their own privacy notices.</p>
            </PolicySection>

            <PolicySection title="16. Governing Law">
              <p>These Terms are governed by the laws of the State of California and applicable federal law, without regard to conflict-of-law principles. Nothing in these Terms limits any consumer right that cannot lawfully be waived.</p>
            </PolicySection>

            <PolicySection title="17. Severability and Waiver">
              <p>If any provision of these Terms is found unenforceable, the remaining provisions remain in effect. A failure to enforce a provision is not a waiver of that provision or any other provision.</p>
            </PolicySection>

            <PolicySection title="18. Entire Agreement">
              <p>These Terms, together with the policies and order-specific terms referenced here or presented at checkout, constitute the agreement between you and PFS Filters concerning the Services. If order-specific or promotional terms conflict with these Terms, the more specific terms control for that transaction.</p>
            </PolicySection>

            <PolicySection title="19. Changes to These Terms">
              <p>We may update these Terms by posting the revised version and updating the effective date. Changes apply prospectively unless otherwise required by law. Continued use of the Services after revised Terms take effect constitutes acceptance of the revised Terms.</p>
            </PolicySection>

            <PolicySection title="20. Contact Information">
              <p>Questions about these Terms may be sent to:</p>
              <address className="not-italic text-white/60">
                <strong className="text-foreground">PFS Filters</strong><br />
                A division of PFS Spray Booths<br />
                1400 Airport Blvd<br />
                Santa Rosa, CA 95403<br />
                United States<br />
                Email: <a href="mailto:orders@pfsfilters.com" className="text-blue-400 hover:underline">orders@pfsfilters.com</a><br />
                Phone: <a href="tel:855-496-7969" className="text-blue-400 hover:underline">855-496-7969</a>
              </address>
            </PolicySection>
          </div>
        </div>
      </section>

      <div className="arc-divider arc-divider-down" />
      <Footer />
    </div>
  );
}
