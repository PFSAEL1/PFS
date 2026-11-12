declare module '@shared/seoText.mjs' {
  export type SeoRecord = {
    path: string;
    title: string;
    description: string;
    noindex: boolean;
    canonical: string;
    shopifySeo?: boolean;
  };

  export function resolveRouteSeo(path: string, extras?: {
    title?: string;
    description?: string;
    noindex?: boolean;
    brandName?: string;
    productTitle?: string;
    seoTitle?: string;
    seoDescription?: string;
  }): SeoRecord;

  export function breadcrumbNodes(path: string, leafName?: string): { name: string; path: string }[];

  export function merchantReturnPolicy(): {
    '@type': string;
    applicableCountry: string;
    returnPolicyCategory: string;
    merchantReturnDays: number;
    returnMethod: string;
    returnFees: string;
    restockingFee: number;
    merchantReturnLink: string;
  };

  export function offerShippingDetails(): {
    '@type': string;
    shippingDestination: { '@type': string; addressCountry: string };
    shippingRate: { '@type': string; currency: string; value: string };
    deliveryTime: {
      '@type': string;
      handlingTime: { '@type': string; minValue: number; maxValue: number; unitCode: string };
      transitTime: { '@type': string; minValue: number; maxValue: number; unitCode: string };
    };
  };

  export function priceValidUntil(from?: Date): string;

  export function normalizeOfferPrice(amount: unknown): string;

  export function schemaSkuFromVariant(
    variant: { sku?: string | null; id?: string | null } | null | undefined,
    handle?: string,
  ): string;

  export function lowestPriceVariant(product: {
    variants?: { edges?: Array<{ node?: { id?: string; sku?: string | null; price?: { amount?: string } } }> };
  } | null | undefined): { id?: string; sku?: string | null; price?: { amount?: string } } | null;

  export function productOffer(input: {
    price?: unknown;
    currency?: string;
    availability?: string;
    url?: string;
    priceValidUntil?: string;
  }): {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
    url?: string;
    priceValidUntil: string;
    hasMerchantReturnPolicy: ReturnType<typeof merchantReturnPolicy>;
    shippingDetails: ReturnType<typeof offerShippingDetails>;
  };

  export function isGuidePath(pathname?: string): boolean;

  export function productSchemaExtras(product: {
    node?: unknown;
    title?: string;
    description?: string;
    productType?: string;
    tags?: string[];
    variants?: { edges?: Array<{ node?: { title?: string; sku?: string | null; price?: { amount?: string } } }> };
  } | null | undefined, details?: { highlights?: Array<{ label?: string; value?: string }> } | null): {
    mpn?: string;
    category?: string;
    additionalProperty?: Array<{ '@type': string; name: string; value: string }>;
  };

  export const REVALIDATE_SECONDS: number;

  export const filterRotationFaqs: { question: string; answer: string }[];

  export const paintBoothFilterFaqs: { question: string; answer: string }[];
}
