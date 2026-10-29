declare module '@shared/seoText.mjs' {
  export type SeoRecord = {
    path: string;
    title: string;
    description: string;
    noindex: boolean;
    canonical: string;
  };

  export function resolveRouteSeo(path: string, extras?: {
    title?: string;
    description?: string;
    noindex?: boolean;
    brandName?: string;
    productTitle?: string;
  }): SeoRecord;

  export function breadcrumbNodes(path: string, leafName?: string): { name: string; path: string }[];

  export function merchantReturnPolicy(): {
    '@type': string;
    applicableCountry: string;
    returnPolicyCategory: string;
    merchantReturnDays: number;
    returnMethod: string;
    returnFees: string;
  };

  export function offerShippingDetails(): {
    '@type': string;
    shippingDestination: { '@type': string; addressCountry: string };
    deliveryTime: {
      '@type': string;
      handlingTime: { '@type': string; minValue: number; maxValue: number; unitCode: string };
    };
  };

  export const REVALIDATE_SECONDS: number;
}
