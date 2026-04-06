// Footer — PFS Filters Dark Theme
import { Link } from 'wouter';
import { Phone, Mail, MapPin } from 'lucide-react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/pfs-filters-logo_4f24cc3e.png';

export const Footer = () => {
  return (
    <footer className="bg-[#060606] border-t border-white/8 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <img
              src={LOGO_URL}
              alt="PFS Filters"
              className="h-10 w-auto mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
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
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href="tel:1-888-545-7715" className="hover:text-white transition-colors">
                  1-888-545-7715
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href="mailto:orders@pfsfilters.com" className="hover:text-white transition-colors">
                  orders@pfsfilters.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <span>Santa Rosa, CA</span>
              </li>
            </ul>
          </div>
        </div>

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
