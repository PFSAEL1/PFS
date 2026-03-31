import { Link } from 'wouter';
import { Phone, Mail, MapPin, Filter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-5 w-5" />
              <h3 className="font-bold text-lg">ABC Filters</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              A proud division of PFS Spray Booths, providing premium paint booth filtration solutions for automotive, industrial, and woodworking applications.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
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
                  <Link href={href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.pfsspraybooths.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  PFS Spray Booths ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:1-888-545-7715" className="hover:text-primary-foreground transition-colors">
                  1-888-545-7715
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:orders@abcfilters.net" className="hover:text-primary-foreground transition-colors">
                  orders@abcfilters.net
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Santa Rosa, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} ABC Filters by PFS. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link href="/returns" className="hover:text-primary-foreground transition-colors">Returns</Link>
            <Link href="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
