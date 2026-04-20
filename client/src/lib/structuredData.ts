// Structured data (JSON-LD) schemas for SEO
// Used across all pages of pfsfilters.com

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PFS Filters",
  "alternateName": "PFS Filters",
  "description": "Premium paint booth filters and spray booth filtration solutions for automotive, industrial, and woodworking applications",
  "url": "https://pfsfilters.com",
  "logo": "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/icon_a34990c0.png",
  "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/og-image_9075de08.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "orders@pfsfilters.com",
    "telephone": "1-888-545-7715",
    "availableLanguage": ["English"],
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santa Rosa",
    "addressRegion": "CA",
    "addressCountry": "US",
  },
  "sameAs": [
    "https://www.pfsspraybooths.com",
    "https://www.facebook.com/PFSSprayBooths",
    "https://www.instagram.com/pfsspraybooths",
    "https://www.youtube.com/@pfsspraybooths"
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pfsfilters.com/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PFS Filters",
  "url": "https://pfsfilters.com",
  "description": "Premium paint booth filters, spray booth filtration systems, and industrial air filtration solutions",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pfsfilters.com/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
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
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "url": product.url,
    "brand": { "@type": "Brand", "name": product.brand || "PFS Filters" },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency,
      "availability": product.availability || "https://schema.org/InStock",
      "url": product.url,
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "seller": { "@type": "Organization", "name": "PFS Filters" },
    },
  };
  if (product.sku) schema.sku = product.sku;
  if (product.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.aggregateRating.ratingValue,
      "reviewCount": product.aggregateRating.reviewCount,
    };
  }
  return schema;
};

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  })),
});

export const createItemListSchema = (items: Array<{
  name: string; url: string; image: string; price: string; currency: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": item.name,
      "url": item.url,
      "image": item.image,
      "offers": {
        "@type": "Offer",
        "price": item.price,
        "priceCurrency": item.currency,
        "availability": "https://schema.org/InStock",
      },
    },
  })),
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
});
