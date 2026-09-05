// Footer — PFS Filters Dark Theme
import { Link } from 'wouter';
import { ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

const LOGO_URL = '/images/brands/pfs-logo-wide.png';
const ADDRESS = '1400 Airport Blvd, Santa Rosa, CA 95403';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=1400+Airport+Blvd%2C+Santa+Rosa%2C+CA+95403';
const MAP_EMBED_URL = 'https://www.google.com/maps?q=1400+Airport+Blvd%2C+Santa+Rosa%2C+CA+95403&output=embed';

export const Footer = () => {
  return (
    <footer className="section-darker border-t border-white/8 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img
              src={LOGO_URL}
              alt="PFS Filters"
              className="h-10 w-auto mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed">
              A proud division of PFS Spray Booths, providing premium paint booth filtration solutions for automotive, industrial, and woodworking applications.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/shop', label: 'Shop All Filters' },
                { href: '/blog', label: 'Blog & Resources' },
                { href: '/faq', label: 'Filter FAQ' },
                { href: '/why-choose-us', label: 'Why Choose Us' },
                { href: '/memberships', label: 'Memberships' },
                { href: '/returns', label: 'Returns & Refunds' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/40 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://pfsfilters.myshopify.com/account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Manage Subscriptions
                </a>
              </li>
              <li>
                <a
                  href="https://www.pfsspraybooths.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400/70 hover:text-blue-400 transition-colors"
                >
                  PFS Spray Booths ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Industries Served</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/industries/aerospace-paint-booth-filters', label: 'Aerospace & MRO' },
                { href: '/paint-booth-filters', label: 'Automotive' },
                { href: '/shop', label: 'Industrial & Woodworking' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/40 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href="tel:855-496-7969" className="hover:text-white transition-colors">
                  855-496-7969
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href="mailto:orders@pfsfilters.com" className="hover:text-white transition-colors">
                  orders@pfsfilters.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  1400 Airport Blvd<br />
                  Santa Rosa, CA 95403
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-400/10">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Visit PFS Filters
              </p>
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
                Located in Santa Rosa, California
              </h2>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-white/50">
                PFS Filters is backed by the same local team and 30+ years of finishing-industry expertise behind PFS Spray Booths.
              </p>
              <address className="mb-6 not-italic text-base font-medium leading-relaxed text-white/85">
                1400 Airport Blvd<br />
                Santa Rosa, CA 95403
              </address>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Get Directions
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="relative min-h-[280px] border-t border-white/10 lg:min-h-[340px] lg:border-l lg:border-t-0">
              <iframe
                src={MAP_EMBED_URL}
                title={`Google Map showing PFS Filters at ${ADDRESS}`}
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/25">
          <p>&copy; {new Date().getFullYear()} PFS Filters. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/returns" className="hover:text-white/60 transition-colors">Returns</Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
