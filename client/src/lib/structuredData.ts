// Structured data (JSON-LD) schemas for SEO
// Used across all pages of pfsfilters.com

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.pfsfilters.com/#organization',
  name: 'PFS Filters',
  alternateName: 'PFS Filters',
  description: 'Paint booth filters and spray booth filtration products for automotive, industrial, aerospace, and woodworking applications',
  url: 'https://www.pfsfilters.com/',
  logo: 'https://www.pfsfilters.com/images/brands/pfs-logo-wide.png',
  image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/og-image_9075de08.jpg',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'orders@pfsfilters.com',
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
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.pfsfilters.com/shop?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
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
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.pfsfilters.com/shop?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const createProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: string;
  currency: string;
  sku?: string;
  brand?: string;
  availability?: string;
  url?: string;
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) => {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    brand: { '@type': 'Brand', name: product.brand || 'PFS Filters' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.availability || 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: product.url,
      seller: { '@type': 'Organization', name: 'PFS Filters' },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 10,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
    },
  };
  if (product.sku) schema.sku = product.sku;
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
  name: string; url: string; image: string; price: string; currency: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: item.name,
      url: item.url,
      image: item.image,
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: item.currency,
        availability: 'https://schema.org/InStock',
      },
    },
  })),
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
