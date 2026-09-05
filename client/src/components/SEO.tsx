import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object | null;
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/og-image_9075de08.jpg';
const SITE_ORIGIN = 'https://www.pfsfilters.com';

const normalizeCanonical = (value?: string) => {
  const candidate = value || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const url = new URL(candidate, SITE_ORIGIN);

  url.protocol = 'https:';
  url.host = 'www.pfsfilters.com';
  url.search = '';
  url.hash = '';

  return url.toString().replace(/\/$/, url.pathname === '/' ? '/' : '');
};

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes('PFS Filters') ? title : `${title} | PFS Filters`;
  const currentUrl = normalizeCanonical(canonical);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <meta
        name="robots"
        content={noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}
      />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="PFS Filters" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
