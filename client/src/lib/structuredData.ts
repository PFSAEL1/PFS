// Structured data (JSON-LD) schemas for SEO
// Used across all pages of pfsfilters.com
import { normalizeOfferPrice, productOffer, schemaSkuFromVariant } from '@shared/seoText.mjs';

const SITE_ORIGIN = 'https://www.pfsfilters.com';
const DEFAULT_PRODUCT_IMAGE = `${SITE_ORIGIN}/images/filters/fiberglass-arrestors.png`;

const absoluteSiteUrl = (value?: string) => {
  if (!value) return DEFAULT_PRODUCT_IMAGE;
  if (value.startsWith('https://') || value.startsWith('http://')) return value;
  return `${SITE_ORIGIN}${value.startsWith('/') ? value : `/${value}`}`;
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.pfsfilters.com/#organization',
  name: 'PFS Filters',
  alternateName: 'PFS Filters',
  description: 'Paint booth filters and spray booth filtration products for automotive, industrial, aerospace, and woodworking applications',
  url: 'https://www.pfsfilters.com/',
  logo: 'https://www.pfsfilters.com/images/brands/pfs-logo-wide.png',
  image: 'https://www.pfsfilters.com/media/pfs-hero-poster-desktop.webp',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+1-855-496-7969',
    availableLanguage: ['English'],
    areaServed: 'US',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1400 Airport Blvd',
    addressLocality: 'Santa Rosa',
    addressRegion: 'CA',
    postalCode: '95403',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.pfsspraybooths.com/',
    'https://www.facebook.com/PFSSprayBooths',
    'https://www.instagram.com/pfsspraybooths',
    'https://www.youtube.com/@pfsspraybooths',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'PFS Spray Booths',
    url: 'https://www.pfsspraybooths.com/',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.pfsfilters.com/#website',
  name: 'PFS Filters',
  url: 'https://www.pfsfilters.com/',
  description: 'Paint booth filters, spray booth filtration products, and industrial air filtration guidance',
  publisher: { '@id': 'https://www.pfsfilters.com/#organization' },
};

export const createProductSchema = (product: {
  name: string;
  description: string;
  image?: string;
  price: string;
  currency: string;
  sku?: string;
  handle?: string;
  variantId?: string;
  brand?: string;
  availability?: string;
  url?: string;
  mpn?: string;
  category?: string;
  additionalProperty?: Array<{ '@type': string; name: string; value: string }>;
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) => {
  const sku = schemaSkuFromVariant(
    { sku: product.sku, id: product.variantId },
    product.handle,
  );
  const url = product.url || '';
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.name,
    image: absoluteSiteUrl(product.image),
    url,
    brand: { '@type': 'Brand', name: product.brand || 'PFS Filters' },
    offers: productOffer({
      price: product.price,
      currency: product.currency || 'USD',
      availability: product.availability,
      url,
    }),
  };
  if (sku) schema.sku = sku;
  if (product.mpn) schema.mpn = product.mpn;
  if (product.category) schema.category = product.category;
  if (product.additionalProperty?.length) schema.additionalProperty = product.additionalProperty;
  if (product.aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.aggregateRating.ratingValue,
      reviewCount: product.aggregateRating.reviewCount,
    };
  }
  return schema;
};

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createItemListSchema = (items: Array<{
  name: string;
  url: string;
  image: string;
  price: string;
  currency: string;
  sku?: string;
  handle?: string;
  mpn?: string;
  category?: string;
  additionalProperty?: Array<{ '@type': string; name: string; value: string }>;
  brand?: string;
  availability?: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.flatMap((item) => {
    const price = normalizeOfferPrice(item.price);
    if (!price || Number(price) <= 0) return [];
    const url = absoluteSiteUrl(item.url).replace(/\/$/, '') || item.url;
    const sku = schemaSkuFromVariant({ sku: item.sku }, item.handle);
    const product: Record<string, unknown> = {
      '@type': 'Product',
      name: item.name,
      url,
      image: absoluteSiteUrl(item.image),
      brand: { '@type': 'Brand', name: item.brand || 'PFS Filters' },
      offers: productOffer({
        price,
        currency: item.currency || 'USD',
        availability: item.availability,
        url,
      }),
    };
    if (sku) product.sku = sku;
    if (item.mpn) product.mpn = item.mpn;
    if (item.category) product.category = item.category;
    if (item.additionalProperty?.length) product.additionalProperty = item.additionalProperty;
    return [{
      '@type': 'ListItem',
      position: 0,
      item: product,
    }];
  }).map((entry, index) => ({ ...entry, position: index + 1 })),
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});
