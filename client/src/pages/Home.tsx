// ABC Filters — Home Page
// Design: Light background, primary blue, matching abcfilters.net exactly
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { SocialProofBanner } from '@/components/SocialProofBanner';
import { Hero } from '@/components/Hero';
import { PopularProducts } from '@/components/PopularProducts';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { Reviews } from '@/components/Reviews';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  CheckCircle, Package, TrendingUp, Wrench, Car, Factory, Shield,
  ShoppingBag, Phone
} from 'lucide-react';

const FIBERGLASS_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png';
const TACKY_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/tacky-panel-green_6cd3f086.png';
const CEILING_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/ceiling-blanket_476417ff.webp';

const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Buy Paint Booth Filters - Premium Spray Booth Filtration Systems"
        description="Shop premium paint booth filters from ABC Filters by PFS. Fiberglass arrestors, tacky panels, intake/exhaust filters for automotive & industrial spray booths. Fast shipping, custom sizes available."
        canonical="https://abcfilters.net/"
        structuredData={combinedSchema}
      />
      <Navigation />
      <div className="pt-16">
        <SocialProofBanner />
      </div>
      <Hero />
      <PopularProducts />
      <CategoryNavigation />
      <Reviews />

      {/* Filters for Any Paint Booth Brand */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Filters for Any Paint Booth Brand</h2>
            <p className="text-muted-foreground text-lg">Quality filtration solutions compatible with all major spray booth manufacturers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { img: FIBERGLASS_IMAGE, label: '20"x20" Fiberglass Exhaust', sub: 'Premium Quality', href: '/shop?category=fiberglass' },
              { img: TACKY_IMAGE, label: 'Tacky Type 20"x20"', sub: 'Enhanced Capture', href: '/shop?category=tacky' },
              { img: CEILING_IMAGE, label: 'Ceiling Blankets', sub: 'Downdraft Systems', href: '/shop?category=ceiling' },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <div className="group relative overflow-hidden rounded-xl border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-52 object-contain bg-muted/20 p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="bg-primary text-primary-foreground p-4">
                    <p className="font-bold">{item.label}</p>
                    <p className="text-primary-foreground/80 text-sm">{item.sub}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured CTA */}
          <div className="bg-muted/30 rounded-2xl p-8 text-center border border-border">
            <h3 className="text-2xl font-bold mb-2">Featured: Fiberglass Paint Arrestors</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Premium fiberglass exhaust filters engineered for superior overspray capture and extended service life. Available in multiple densities to match your specific booth requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="font-semibold text-lg mb-4 sm:mb-0 sm:hidden">Ready to Order?</div>
              <p className="hidden sm:block text-muted-foreground mr-4 self-center">Ready to Order?</p>
              <Link href="/shop">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Phone className="mr-2 h-4 w-4" />
                Call for Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* About / SEO-rich section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Complete Filtration Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Paint Booth Filters for Every Application
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  ABC Filters is your trusted source for high-quality <strong className="text-foreground">paint booth filters</strong>, <strong className="text-foreground">spray booth filtration systems</strong>, and <strong className="text-foreground">industrial air filtration solutions</strong>. As a division of PFS Spray Booths, we bring decades of expertise in automotive refinishing, industrial coating, and woodworking filtration.
                </p>
                <p>
                  Our comprehensive product line includes <strong className="text-foreground">fiberglass paint arrestors</strong>, <strong className="text-foreground">tacky panel filters</strong>, <strong className="text-foreground">intake filters</strong>, <strong className="text-foreground">exhaust filters</strong>, <strong className="text-foreground">ceiling filters</strong>, and <strong className="text-foreground">roll media</strong> designed to capture overspray and maintain optimal air quality.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: TrendingUp, title: '99% Overspray Capture', desc: 'Industry-leading efficiency' },
                  { icon: CheckCircle, title: 'Extended Filter Life', desc: 'Reduces replacement costs' },
                  { icon: Wrench, title: 'Custom Sizes Available', desc: 'Perfect fit guaranteed' },
                  { icon: Package, title: 'Fast Nationwide Shipping', desc: 'Quick delivery to your shop' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Paint Booth Filter Types</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    { emoji: '💨', text: 'Paint Arrestor Pads - Disposable fiberglass media for exhaust filtration' },
                    { emoji: '🔲', text: 'Tacky Panel Filters - Adhesive coated filters for intake air cleaning' },
                    { emoji: '☁️', text: 'Ceiling Blankets - Overhead filtration for downdraft booths' },
                    { emoji: '📦', text: 'Roll Media Filters - Continuous fiberglass rolls for pit filters' },
                    { emoji: '⚙️', text: 'Holding Grids - Support frames for filter media installation' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-2">
                      <span>{item.emoji}</span>
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/filter-grids-holding_4f822e87.jpg"
                alt="ABC Filters paint booth filter products"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg">
                <p className="text-2xl font-bold">1,000+</p>
                <p className="text-sm text-primary-foreground/80">Shops Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Factory className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Industry Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by professionals across multiple industries for superior spray booth filtration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: 'Automotive',
                content: 'Auto body shops and collision repair centers trust our paint booth filters for superior overspray capture. Perfect for automotive refinishing, clear coat applications, and vehicle restoration work. Compatible with all major spray booth brands including PFS, Garmat, and Global Finishing Solutions.',
              },
              {
                icon: Factory,
                title: 'Industrial',
                content: 'Industrial coating facilities and manufacturing plants rely on our high-capacity filtration systems. Ideal for powder coating operations, liquid paint applications, metal finishing, and heavy-duty industrial spray operations requiring consistent air quality.',
              },
              {
                icon: Wrench,
                title: 'Woodworking',
                content: 'Cabinet shops and furniture manufacturers choose our filters for stain and lacquer applications. Specialized filtration for wood finishing, staining operations, and furniture coating with excellent performance in both water-based and solvent-based systems.',
              },
              {
                icon: Package,
                title: 'Aerospace',
                content: 'Aircraft painting and aerospace coating operations demand precision filtration. Our filters meet stringent aerospace standards for component painting, aircraft refinishing, and specialty coatings requiring exceptional air purity and particle capture.',
              },
              {
                icon: TrendingUp,
                title: 'Custom Fabrication',
                content: 'Metal fabricators and custom shops need reliable filtration for diverse projects. From motorcycle painting to equipment refinishing, our versatile filter selection handles everything from small batch custom work to high-volume production painting.',
              },
              {
                icon: Factory,
                title: 'Marine',
                content: 'Boat builders and marine coating specialists require robust filtration systems. Our filters excel in gel coat applications, marine painting, yacht refinishing, and watercraft coating operations where salt air and harsh conditions demand superior filter performance.',
              },
            ].map((industry, idx) => (
              <Card
                key={idx}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <industry.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold">{industry.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{industry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Proper Filtration Matters */}
      <section className="py-20 px-4 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,oklch(0.54_0.15_222_/_0.06),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Expert Knowledge</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Proper Spray Booth Filtration Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the critical role of quality filters in your paint booth operation
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Finish Quality',
                content: 'Quality paint booth intake filters remove dust, pollen, and contaminants from incoming air, preventing defects in your finish. Clean air means fewer orange peel issues, dirt nibs, and costly rework. Our tacky panel filters capture particles as small as 10 microns. Proper exhaust filtration maintains consistent airflow and prevents booth pressure imbalances.',
              },
              {
                icon: '🛡️',
                title: 'Air Quality & Safety',
                content: 'Effective paint arrestor filters capture hazardous overspray particles before they exhaust into the environment. This protects worker health, ensures OSHA compliance, and prevents EPA violations from unfiltered paint emissions. Our fiberglass filter media maintains 99%+ capture efficiency throughout its service life.',
              },
              {
                icon: '💰',
                title: 'Cost Efficiency',
                content: 'Premium filters last longer and capture more overspray, reducing replacement frequency and disposal costs. Our paint booth filters feature progressive density construction that loads from the surface inward, maximizing capacity. Extended filter life means less downtime and lower labor costs. Bulk pricing available.',
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl group"
              >
                <CardContent className="pt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{item.icon}</span>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ABC Filters */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ABC Filters?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Industry-leading filtration solutions designed for excellence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Managed Filter Program',
                description: 'We track every filter position in your booth, monitor change schedules, and auto-create your reorder so you never run out mid-job.',
              },
              {
                icon: CheckCircle,
                title: 'PFS Booth Expertise',
                description: 'As a division of PFS Spray Booths, we know exactly which filters fit which booth — crossflow, downdraft, semi-downdraft. No guessing.',
              },
              {
                icon: Package,
                title: 'Set It & Forget It Reorders',
                description: 'Members get scheduled auto-reorders tied to their actual change intervals. Your filters show up before you need them, every time.',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-medium group"
              >
                <CardContent className="pt-12 pb-12 px-8 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to upgrade your spray booth filtration? Contact us for a custom quote
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-1">Send us a message</h3>
                  <p className="text-muted-foreground text-sm mb-6">Fill out the form below and our team will respond within 24 hours</p>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                        <input id="name" type="text" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                        <input id="email" type="email" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                        <input id="phone" type="tel" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="(555) 000-0000" required />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                        <input id="company" type="text" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your company" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                      <textarea id="message" rows={5} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Tell us about your spray booth filtration needs..." required />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <h4 className="font-bold">Phone</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">Call us for immediate assistance</p>
                  <a href="tel:1-888-545-7715" className="text-primary font-semibold hover:underline">1-888-545-7715</a>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h4 className="font-bold">Email</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">Send us an email anytime</p>
                  <a href="mailto:orders@abcfilters.net" className="text-primary font-semibold hover:underline">orders@abcfilters.net</a>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <h4 className="font-bold">Location</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">Visit us or send mail to</p>
                  <p className="font-semibold text-sm">1400 Airport Blvd, Santa Rosa, CA 95403</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA />
      <Footer />
    </div>
  );
}
