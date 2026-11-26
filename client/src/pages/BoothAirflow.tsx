import { useLocation } from 'wouter';
import { GuideArticle } from '@/components/GuideArticle';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';
import { airflowPages } from '@shared/airflowPages.mjs';
import NotFound from '@/pages/NotFound';

export default function BoothAirflow() {
  const [location] = useLocation();
  const page = airflowPages().find((item) => item.path === location);
  if (!page) return <NotFound />;
  const canonical = `https://www.pfsfilters.com${page.path}`;
  return (
    <GuideArticle
      title={page.title}
      description={page.description}
      canonical={canonical}
      h1={page.h1}
      lede={page.lede}
      crumbs={[{ label: 'Paint Booth Filters', href: '/paint-booth-filters' }, { label: page.h1 }]}
      sections={page.sections}
      faqs={page.faqs}
      links={[
        { href: '/ceiling-filters', label: 'Ceiling diffusion media' },
        { href: '/exhaust-filters', label: 'Exhaust pads and rolls' },
        { href: '/category/roll-media', label: 'Exhaust filter rolls' },
        { href: '/intake-filters', label: 'Intake filters' },
        { href: '/filter-finder', label: 'Filter finder' },
        { href: '/guides/paint-booth-filter-size', label: 'Filter size guide' },
      ]}
      structuredData={{
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.pfsfilters.com/' },
            { name: 'Paint Booth Filters', url: 'https://www.pfsfilters.com/paint-booth-filters' },
            { name: page.h1, url: canonical },
          ]),
          createFAQSchema(page.faqs),
        ],
      }}
    />
  );
}
