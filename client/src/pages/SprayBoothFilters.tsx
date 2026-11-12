import { GuideArticle } from '@/components/GuideArticle';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { sprayBoothFaqs, sprayBoothSections } from '@shared/guideCopy.mjs';

const canonical = 'https://www.pfsfilters.com/spray-booth-filters';
const title = 'Spray Booth Filters | PFS Filters';
const description = 'Spray booth filters from PFS Filters in Santa Rosa: intake, ceiling, exhaust arrestors, and rolls. Match the stage and the measured opening before you order.';

const links = [
  { href: '/paint-booth-filters', label: 'Paint booth filters, filter walls, and rolls' },
  { href: '/exhaust-filters', label: 'Exhaust filters and paint arrestors' },
  { href: '/intake-filters', label: 'Intake filters' },
  { href: '/ceiling-filters', label: 'Ceiling filters' },
  { href: '/category/roll-media', label: 'Paint booth filter rolls' },
  { href: '/category/fiberglass-arrestors', label: 'Fiberglass arrestor pads' },
  { href: '/andreae-paint-booth-filters', label: 'Andreae accordion filters' },
  { href: '/product/20x20-paint-arrestor-holding-grids-w-tips-each', label: '20x20 holding grids' },
  { href: '/neshap-compliant-paint-booth-filters', label: 'NESHAP filter guide' },
  { href: '/aerospace', label: 'Aerospace filter catalog' },
  { href: '/shop-by-booth', label: 'Booth brand guides' },
  { href: '/georgia/spray-booth-filters', label: 'Shipping spray booth filters to Georgia' },
  { href: '/filter-finder', label: 'Filter finder' },
  { href: '/contact', label: 'Contact PFS Filters' },
];

export default function SprayBoothFilters() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.pfsfilters.com/' },
        { name: 'Spray Booth Filters', url: canonical },
      ]),
      createFAQSchema(sprayBoothFaqs),
    ],
  };

  return (
    <GuideArticle
      title={title}
      description={description}
      canonical={canonical}
      h1="Spray Booth Filters"
      lede="Intake, ceiling, and exhaust media for spray booths, sold by PFS Filters in Santa Rosa. Match the stage and the measured opening before you order."
      crumbs={[{ label: 'Spray Booth Filters' }]}
      sections={sprayBoothSections}
      faqs={sprayBoothFaqs}
      links={links}
      structuredData={structuredData}
    />
  );
}
