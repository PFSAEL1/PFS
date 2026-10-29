import { Helmet } from 'react-helmet-async';
import { breadcrumbNodes, resolveRouteSeo } from '@shared/seoText.mjs';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  structuredData?: object | null;
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE = 'https://www.pfsfilters.com/media/pfs-hero-poster-desktop.webp';
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

const requestedPath = (value?: string) => {
  const candidate = value || (typeof window !== 'undefined' ? window.location.pathname : '/');
  try {
    const url = new URL(candidate, SITE_ORIGIN);
    const path = url.pathname.replace(/\/$/, '');
    return path || '/';
  } catch {
    return '/';
  }
};

const leafName = (title: string) => title.replace(/\s+\|\s+.*$/, '').trim() || 'PFS Filters';

const withBreadcrumbs = (path: string, title: string, structuredData?: object | null) => {
  const serialized = structuredData ? JSON.stringify(structuredData) : '';
  if (serialized.includes('BreadcrumbList') || path === '/') return structuredData;
  const crumbs = breadcrumbNodes(path, leafName(title)).map((item: { name: string; path: string }) => ({
    '@type': 'ListItem',
    position: 0,
    name: item.name,
    item: new URL(item.path, SITE_ORIGIN).toString().replace(/\/$/, item.path === '/' ? '/' : ''),
  })).map((item: { position: number }, index: number) => ({ ...item, position: index + 1 }));
  const breadcrumb = { '@type': 'BreadcrumbList', itemListElement: crumbs };
  if (!structuredData) return { '@context': 'https://schema.org', ...breadcrumb };
  const record = structuredData as { '@graph'?: object[]; '@context'?: string };
  if (Array.isArray(record['@graph'])) {
    return { ...record, '@graph': [...record['@graph'], breadcrumb] };
  }
  const { '@context': context, ...node } = record;
  return { '@context': context || 'https://schema.org', '@graph': [node, breadcrumb] };
};

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogImageWidth,
  ogImageHeight,
  structuredData,
  noIndex = false,
}: SEOProps) => {
  const path = requestedPath(canonical);
  const resolved = resolveRouteSeo(path, {
    title,
    description,
    noindex: noIndex,
    productTitle: path.startsWith('/product/') ? title : undefined,
  });
  const fullTitle = resolved.title;
  const metaDescription = resolved.description;
  const currentUrl = normalizeCanonical(resolved.canonical === '/' ? `${SITE_ORIGIN}/` : resolved.canonical);
  const robotsNoIndex = noIndex || resolved.noindex;
  const jsonLd = withBreadcrumbs(path, fullTitle, structuredData);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />
      <meta
        name="robots"
        content={robotsNoIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}
      />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      {ogImageWidth && <meta property="og:image:width" content={String(ogImageWidth)} />}
      {ogImageHeight && <meta property="og:image:height" content={String(ogImageHeight)} />}
      <meta property="og:image:alt" content={ogImageAlt || fullTitle} />
      <meta property="og:site_name" content="PFS Filters" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt || fullTitle} />

      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
