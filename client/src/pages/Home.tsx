// PFS Filters — Home Page
// Design: Light background, primary blue, matching pfsfilters.com exactly
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
    <div className="min-h-screen bg-black">
      <SEO
        title="Buy Paint Booth Filters - Premium Spray Booth Filtration Systems"
        description="Shop premium paint booth filters from PFS Filters. Fiberglass arrestors, tacky panels, intake/exhaust filters for automotive & industrial spray booths. Fast shipping, custom sizes available."
        canonical="https://pfsfilters.com/"
        structuredData={combinedSchema}
      />
      <Navigation />
      <div className="pt-24">
        <SocialProofBanner />
      </div>
      <Hero />
      <PopularProducts />
      <CategoryNavigation />
      <Reviews />

      {/* Filters for Any Paint Booth Brand */}
      <section className="py-20 px-4 section-raised">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label"><span>Compatible Products</span></div>
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
                <div className="glow-card cursor-pointer">
                  <div className="product-img-wrap">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-full h-52 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-white">{item.label}</p>
                    <p className="text-white/50 text-sm">{item.sub}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured CTA */}
          <div className="glow-card glow-pulse rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Featured: Fiberglass Paint Arrestors</h3>
            <p className="text-white/50 mb-6 max-w-2xl mx-auto">
              Premium fiberglass exhaust filters engineered for superior overspray capture and extended service life. Available in multiple densities to match your specific booth requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="font-semibold text-lg mb-4 sm:mb-0 sm:hidden">Ready to Order?</div>
              <p className="hidden sm:block text-muted-foreground mr-4 self-center">Ready to Order?</p>
              <Link href="/shop">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white font-bold">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Call for Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      <FAQ />

      {/* About / SEO-rich section */}
      <section className="py-20 px-4 section-glow-bg">
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
                  PFS Filters is your trusted source for high-quality <strong className="text-foreground">paint booth filters</strong>, <strong className="text-foreground">spray booth filtration systems</strong>, and <strong className="text-foreground">industrial air filtration solutions</strong>. As a division of PFS Spray Booths, we bring decades of expertise in automotive refinishing, industrial coating, and woodworking filtration.
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
                  <div key={item.title} className="glow-card flex items-start gap-3 p-4">
                    <div className="glow-icon flex-shrink-0">
                      <item.icon className="h-4 w-4 text-blue-400" />
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
                alt="PFS Filters paint booth filter products"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-xl p-4 shadow-lg shadow-blue-500/30">
                <p className="text-2xl font-bold">1,000+</p>
                <p className="text-sm text-primary-foreground/80">Shops Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-4 section-darker">
        <div className="section-divider mb-16" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label">
              <Factory className="h-3 w-3" />
              <span>Industry Solutions</span>
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
                num: '01',
                title: 'Automotive',
                content: 'Auto body shops and collision repair centers trust our paint booth filters for superior overspray capture. Perfect for automotive refinishing, clear coat applications, and vehicle restoration work.',
              },
              {
                icon: Factory,
                num: '02',
                title: 'Industrial',
                content: 'Industrial coating facilities and manufacturing plants rely on our high-capacity filtration systems. Ideal for powder coating operations, liquid paint applications, and metal finishing.',
              },
              {
                icon: Wrench,
                num: '03',
                title: 'Woodworking',
                content: 'Cabinet shops and furniture manufacturers choose our filters for stain and lacquer applications. Excellent performance in both water-based and solvent-based systems.',
              },
              {
                icon: Package,
                num: '04',
                title: 'Aerospace',
                content: 'Aircraft painting and aerospace coating operations demand precision filtration. Our filters meet stringent aerospace standards for component painting and specialty coatings.',
              },
              {
                icon: TrendingUp,
                num: '05',
                title: 'Custom Fabrication',
                content: 'Metal fabricators and custom shops need reliable filtration for diverse projects. From motorcycle painting to equipment refinishing, our versatile filter selection handles it all.',
              },
              {
                icon: Factory,
                num: '06',
                title: 'Marine',
                content: 'Boat builders and marine coating specialists require robust filtration. Our filters excel in gel coat applications, marine painting, and yacht refinishing operations.',
              },
            ].map((industry, idx) => (
              <div key={idx} className="glow-card glow-card-accent p-8 relative">
                <span className="industry-card-num">{industry.num}</span>
                <div className="flex items-center gap-4 mb-4">
                  <div className="glow-icon">
                    <industry.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{industry.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{industry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Proper Filtration Matters */}
      <section className="py-20 px-4 section-glow-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="section-label">
              <CheckCircle className="h-3 w-3" />
              <span>Expert Knowledge</span>
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
                content: 'Quality paint booth intake filters remove dust, pollen, and contaminants from incoming air, preventing defects in your finish. Clean air means fewer orange peel issues, dirt nibs, and costly rework.',
              },
              {
                icon: '🛡️',
                title: 'Air Quality & Safety',
                content: 'Effective paint arrestor filters capture hazardous overspray particles before they exhaust into the environment. Protects worker health, ensures OSHA compliance, and prevents EPA violations.',
              },
              {
                icon: '💰',
                title: 'Cost Efficiency',
                content: 'Premium filters last longer and capture more overspray, reducing replacement frequency and disposal costs. Progressive density construction maximizes capacity and extends filter life.',
              },
            ].map((item, idx) => (
              <div key={idx} className="glow-card p-8">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PFS Filters */}
      <section className="py-20 px-4 section-darker">
        <div className="section-divider mb-16" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label"><span>Why PFS</span></div>
            <h2 className="text-4xl font-bold mb-4">Why Choose PFS Filters?</h2>
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
              <div key={index} className="feature-card">
                <div className="glow-icon mx-auto mb-6">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 section-glow-bg">
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
                        <input id="name" type="text" className="w-full border border-white/10 bg-[#111] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-white/30" placeholder="Your name" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                        <input id="email" type="email" className="w-full border border-white/10 bg-[#111] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-white/30" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone *</label>
                        <input id="phone" type="tel" className="w-full border border-white/10 bg-[#111] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-white/30" placeholder="(555) 000-0000" required />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                        <input id="company" type="text" className="w-full border border-white/10 bg-[#111] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-white/30" placeholder="Your company" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                      <textarea id="message" rows={5} className="w-full border border-white/10 bg-[#111] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none placeholder:text-white/30" placeholder="Tell us about your spray booth filtration needs..." required />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold">
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
                  <a href="mailto:orders@pfsfilters.com" className="text-primary font-semibold hover:underline">orders@pfsfilters.com</a>
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
