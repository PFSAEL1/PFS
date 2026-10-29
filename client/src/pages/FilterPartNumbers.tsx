import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { bundledShopifyProducts } from '@/lib/productCatalog';
import { createBreadcrumbSchema, createFAQSchema } from '@/lib/structuredData';

const SITE = 'https://www.pfsfilters.com';

type Row = { identifier: string; product: string; href: string; note: string };

function catalogRows(): Row[] {
  const rows: Row[] = [];
  for (const product of bundledShopifyProducts) {
    const node = product.node;
    if (node.title.toLowerCase().includes('membership')) continue;
    const href = `/product/${node.handle}`;
    const sku = node.variants?.edges?.find((edge) => edge.node.sku)?.node.sku;
    if (sku) {
      rows.push({ identifier: sku, product: node.title, href, note: 'PFS catalog SKU' });
    }
    for (const edge of node.variants?.edges || []) {
      const title = edge.node.title;
      if (!title || title === 'Default Title') continue;
      const code = title.match(/\bAF\d{3}\b|\bC2PPEB[A-Z0-9-]+\b|\bPLT4-[A-Z0-9-]+\b|\b1136513\b/i);
      if (code) {
        rows.push({ identifier: code[0], product: node.title, href, note: title });
      }
    }
    const description = node.description || '';
    const parker = description.match(/Parker part\s+([0-9]+)/i);
    if (parker) {
      rows.push({ identifier: parker[1], product: node.title, href, note: 'Parker part in the product description' });
    }
    const afc = description.match(/AFC filter number\s+([A-Z0-9-]+)/i);
    if (afc) {
      rows.push({ identifier: afc[1], product: node.title, href, note: 'AFC filter number in the product description' });
    }
  }
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = `${row.identifier}|${row.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const faqs = [
  {
    question: 'Is fil-epp-2020-w in the PFS catalog?',
    answer: 'No. fil-epp-2020-w does not appear in the current product snapshot. Call 855-496-7969 with the booth model, filter stage, dimensions, and a photo if you need that number identified.',
  },
  {
    question: 'Which numbers are listed here?',
    answer: 'Only SKUs, Andreae AF codes, the Parker part, and the AFC filter number that are present on current catalog products. Variant titles that are sizes, not part numbers, stay on the product page.',
  },
  {
    question: 'Does a matching code guarantee the filter fits?',
    answer: 'No. A code narrows the catalog item. Confirm the booth, the stage, and the actual dimensions before ordering.',
  },
];

const rows = catalogRows();
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    createBreadcrumbSchema([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Shop', url: `${SITE}/shop` },
      { name: 'Part numbers', url: `${SITE}/filter-part-numbers` },
    ]),
    createFAQSchema(faqs),
  ],
};

export default function FilterPartNumbers() {
  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Filter Part Number Cross Reference | PFS Filters"
        description="Cross-reference catalog SKUs and manufacturer numbers stocked by PFS Filters."
        canonical="https://www.pfsfilters.com/filter-part-numbers"
        structuredData={schema}
      />
      <Navigation />
      <section className="section-darker pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: 'Part numbers' }]} />
          <div className="max-w-3xl mt-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 pfs-heading-animate leading-tight">
              Filter Part Number Cross Reference
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              These identifiers are copied from the current PFS catalog: Shopify SKUs, Andreae AF codes in variant titles, Parker part 1136513, and the AFC filter number. fil-epp-2020-w is not in the catalog. A listed code still has to match the booth stage and the measured filter.
            </p>
          </div>
        </div>
      </section>
      <section className="section-raised tex-dots py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">Catalog part numbers and SKUs</caption>
                <thead>
                  <tr className="text-left text-white/40 text-xs uppercase tracking-wider">
                    <th scope="col" className="px-5 py-3 font-semibold">Identifier</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Catalog product</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Where it is recorded</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.identifier}-${row.href}`} className="border-t border-white/[0.07]">
                      <td className="px-5 py-3 text-white/85 whitespace-nowrap">{row.identifier}</td>
                      <td className="px-5 py-3">
                        <Link href={row.href} className="text-blue-400 hover:text-blue-300">{row.product}</Link>
                      </td>
                      <td className="px-5 py-3 text-white/55">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="max-w-3xl mt-10 space-y-4 text-white/60 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Numbers that are not in this table</h2>
            <p>
              The online catalog is a snapshot of products PFS currently sells on this site. It does not include every booth manufacturer part number. fil-epp-2020-w is one of those missing numbers: it is not a handle, SKU, tag, or variant title in the snapshot. PFS can still review it. Send the code, the booth make and model, the filter position, the actual dimensions, and a photo of the label to 855-496-7969.
            </p>
            <p>
              Size strings such as 20x20x2 or 36x30 foot stay on the product page. They describe a variant. They are not added here unless the variant title also contains an AF code or another manufacturer number. Membership products are omitted because they are not filters.
            </p>
            <p>
              Andreae codes in the table are AF213, AF223, AF413, AF423, AF813, AF923, AF113, and AF123 when those strings are present on the accordion product. Parker LoadTECH model PLT4-M14-13-PH and part 1136513 come from that product’s description. AFC number C2PPEB202015-6 is the no-header 20x20x15 cube sold as a case of six. Koch SKUs PFS-HBM232311 and PFS-STKM6190 are the BioMAX and SprayStop STK-10 listings.
            </p>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
