/**
 * Footer — Tesla-inspired minimal dark footer
 * Pure black, white text, minimal links
 */
import { Link } from 'wouter';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/abc-filters-logo_a66e6869.png';

export const Footer = () => {
  return (
    <footer style={{
      background: 'oklch(0.05 0 0)',
      borderTop: '1px solid oklch(0.14 0 0)',
      padding: '40px 20px 32px',
      color: 'rgba(255,255,255,0.50)',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '28px' }}>
        <img src={LOGO_URL} alt="ABC Filters" style={{ height: '24px', width: 'auto', opacity: 0.7 }} />
        <p style={{ fontSize: '13px', lineHeight: 1.6, marginTop: '10px', maxWidth: '300px' }}>
          A division of PFS Spray Booths. Premium paint booth filtration for automotive, industrial, and woodworking applications.
        </p>
      </div>

      {/* Links grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: '12px', fontWeight: 600 }}>
            Shop
          </div>
          {[
            { href: '/shop', label: 'All Products' },
            { href: '/shop?category=fiberglass', label: 'Fiberglass' },
            { href: '/shop?category=tacky', label: 'Tacky Panels' },
            { href: '/shop?category=intake', label: 'Intake Filters' },
            { href: '/memberships', label: 'Memberships' },
          ].map(({ href, label }) => (
            <div key={href} style={{ marginBottom: '8px' }}>
              <Link href={href} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px' }}>
                {label}
              </Link>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginBottom: '12px', fontWeight: 600 }}>
            Company
          </div>
          {[
            { href: '/why-choose-us', label: 'Why ABC Filters' },
            { href: '/blog', label: 'Resources' },
            { href: '/contact', label: 'Contact Us' },
            { href: '/returns', label: 'Returns' },
            { href: '/privacy-policy', label: 'Privacy Policy' },
          ].map(({ href, label }) => (
            <div key={href} style={{ marginBottom: '8px' }}>
              <Link href={href} style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px' }}>
                {label}
              </Link>
            </div>
          ))}
          <div style={{ marginBottom: '8px' }}>
            <a
              href="https://www.pfsspraybooths.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px' }}
            >
              PFS Spray Booths ↗
            </a>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div style={{
        borderTop: '1px solid oklch(0.12 0 0)',
        paddingTop: '20px',
        marginBottom: '20px',
      }}>
        <a
          href="tel:+18005551234"
          style={{ display: 'block', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', marginBottom: '6px' }}
        >
          📞 Call Us: 1-800-555-1234
        </a>
        <a
          href="mailto:info@abcfilters.net"
          style={{ display: 'block', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px' }}
        >
          ✉️ info@abcfilters.net
        </a>
      </div>

      {/* Copyright */}
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>
        © {new Date().getFullYear()} ABC Filters by PFS. All rights reserved.
      </div>
    </footer>
  );
};
