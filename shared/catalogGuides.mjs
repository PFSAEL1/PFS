/**
 * Guide copy built only from booth directory rows and the catalog snapshot.
 * Recorded sizes are not labeled as confirmed fitment.
 */
import { listBoothGuides } from './boothFilterGuides.mjs';

export const CROSSREF_PAGES = [
  { slug: 'garmat-usa', path: '/guides/garmat-filter-cross-reference', h1: 'Garmat Filter Cross Reference' },
  { slug: 'global-finishing-solutions', path: '/guides/gfs-filter-cross-reference', h1: 'GFS Filter Cross Reference' },
  { slug: 'accudraft', path: '/guides/accudraft-filter-cross-reference', h1: 'Accudraft Filter Cross Reference' },
  { slug: 'blowtherm', path: '/guides/blowtherm-filter-cross-reference', h1: 'Blowtherm Filter Cross Reference' },
  { slug: 'usi-italia', path: '/guides/usi-italia-filter-cross-reference', h1: 'USI Italia Filter Cross Reference' },
  { slug: 'nova-verta', path: '/guides/nova-verta-filter-cross-reference', h1: 'Nova Verta Filter Cross Reference' },
  { slug: 'binks', path: '/guides/binks-devilbiss-filter-cross-reference', h1: 'Binks and DeVilbiss Filter Cross Reference', also: 'devilbiss' },
  { slug: 'col-met', path: '/guides/col-met-filter-cross-reference', h1: 'Col-Met Filter Cross Reference' },
  { slug: 'pfs-spray-booths', path: '/guides/pfs-spray-booth-filter-cross-reference', h1: 'PFS Spray Booth Filter Cross Reference' },
];

export const GUIDE_PAGES = [
  { path: '/guides/filter-size-chart', h1: 'Paint Booth Filter Size Chart' },
  { path: '/guides/andreae-af-numbers', h1: 'Andreae AF Number Guide' },
  { path: '/guides/how-to-measure-paint-booth-filters', h1: 'How to Measure a Paint Booth Filter' },
  { path: '/guides/andreae-vs-fiberglass-vs-paint-pockets', h1: 'Andreae, Fiberglass, and Paint Pockets' },
  { path: '/guides/shipping-and-freight', h1: 'Shipping and Freight for Paint Booth Filters' },
];

const CAVEAT = 'This row is a recorded size in the PFS booth directory. It is not marked as confirmed fitment. Measure the opening and read the label before ordering.';

function money(amount) {
  const numeric = Number(amount);
  if (!Number.isFinite(numeric)) return '';
  return `$${numeric.toFixed(2)}`;
}

function norm(value) {
  return String(value || '').toLowerCase().replace(/[″”]/g, '"').replace(/[×✕]/g, 'x').replace(/[^a-z0-9.]+/g, '');
}

export function sellableNodes(products) {
  return products.filter((product) => !/membership/i.test(product.title || '') && !String(product.handle || '').endsWith('-membership'));
}

export function variantLines(product) {
  return (product.variants?.edges || []).map((edge) => {
    const node = edge.node || {};
    return {
      title: node.title || '',
      price: money(node.price?.amount),
      sku: node.sku || '',
    };
  }).filter((row) => row.price);
}

export function priceParagraphs(products) {
  return sellableNodes(products).map((product) => {
    const lines = variantLines(product);
    const priced = lines.filter((row) => row.title && row.title.toLowerCase() !== 'default title');
    const detail = priced.length
      ? priced.map((row) => `${row.title} at ${row.price}${row.sku ? ` (SKU ${row.sku})` : ''}`).join('; ')
      : `${money(product.priceRange?.minVariantPrice?.amount)} on the product page`;
    return `${product.title} (${product.handle}) is listed at ${detail}. The product URL is /product/${product.handle}. Confirm the live variant before ordering. Shipping is not included in these prices.`;
  });
}

function catalogMatch(size, products) {
  const needle = norm(size);
  if (needle.length < 4) return null;
  for (const product of sellableNodes(products)) {
    for (const row of variantLines(product)) {
      const title = norm(row.title);
      if (title.length >= 4 && (title.includes(needle) || needle.includes(title))) {
        return { product, row };
      }
    }
  }
  return null;
}

function rowParagraph(row, products) {
  const base = `${row.model} records a ${row.position} stage using ${row.filterType} at ${row.size}${row.qty ? ` (${row.qty})` : ''}. ${CAVEAT}`;
  const match = catalogMatch(row.size, products);
  if (!match) {
    return `${base} That size string is not a variant title in the current catalog snapshot, so this guide does not assign a SKU or a price to it. Call 855-496-7969 if you need the size identified.`;
  }
  return `${base} A catalog variant whose title contains a similar size string is "${match.row.title}" at ${match.row.price} on /product/${match.product.handle}. A similar size string is not confirmation that the variant fits this booth.`;
}

export function crossRefSections(page, products) {
  const slugs = [page.slug, page.also].filter(Boolean);
  const guides = slugs.map((slug) => listBoothGuides().find((guide) => guide.slug === slug)).filter(Boolean);
  const sections = [{
    heading: 'How to use this cross reference',
    paragraphs: [
      `${page.h1} repeats filter rows already published in the PFS booth directory and, where a size string also appears on a catalog variant, the price from that variant. It does not add sizes from other websites. It does not mark any row as confirmed fitment.`,
      'Stay on the model that matches the equipment tag. Then measure the opening. If the directory size is not a variant title, the part is not given a price here. The shop-by-booth page for the same brand is the directory view. This page is the cross reference into the catalog.',
      'PFS Filters is the filter division of PFS Spray Booths at 1400 Airport Blvd, Santa Rosa, CA 95403. The phone number is 855-496-7969. Stocked items are typically processed in one to two business days. Freight, custom cuts, and special orders take longer. Prices do not include shipping.',
    ],
  }];
  for (const guide of guides) {
    sections.push({
      heading: `${guide.name} recorded rows`,
      paragraphs: [guide.intro, ...guide.rows.map((row) => rowParagraph(row, products))],
    });
  }
  if (!guides.length) {
    sections.push({
      heading: 'No directory rows',
      paragraphs: ['This brand does not have published booth-directory rows in the current guide file. Use the shop-by-booth page and call with the equipment tag. No sizes are invented here.'],
    });
  }
  sections.push({
    heading: 'Catalog prices to compare after you measure',
    paragraphs: [
      'These prices are the catalog snapshot. A price is not a statement that the product fits a booth row above. Shipping is not included.',
      ...priceParagraphs(products).slice(0, 10),
    ],
  });
  return sections;
}

export function crossRefFaqs(page) {
  const slugs = [page.slug, page.also].filter(Boolean);
  const faqs = [];
  for (const slug of slugs) {
    const guide = listBoothGuides().find((item) => item.slug === slug);
    if (guide?.faqs?.length) faqs.push(...guide.faqs.slice(0, 4));
  }
  faqs.push({
    question: 'Does this cross reference confirm fitment?',
    answer: 'No. The rows are the recorded directory. Measure the opening and match the label. A catalog price is shown only when a variant title shares a size string, and that is still not a fitment confirmation.',
  });
  return faqs;
}

export function sizeChartSections(products) {
  const guides = listBoothGuides();
  const sections = [{
    heading: 'What this chart includes',
    paragraphs: [
      `This chart lists ${guides.length} booth brands that have published rows in the PFS directory. Each line is model, position, filter type, recorded size, and quantity from that directory. Brands that were left out of the directory file are not given sizes here.`,
      'The chart is not a guarantee that the filter in the booth matches the row. The build step that created the directory omitted rows flagged for owner verification. Published rows still say to measure the opening. Nothing on this page is labeled confirmed fitment.',
      'Where a recorded size also appears in a catalog variant title, the cross-reference guides link that variant and its price. This chart stays with the directory sizes. Order from the product page after you have measured.',
    ],
  }];
  for (const guide of guides) {
    const lines = guide.rows.map((row) => `${row.model} — ${row.position} — ${row.filterType} — ${row.size}${row.qty ? ` — ${row.qty}` : ''}.`);
    sections.push({
      heading: guide.name,
      paragraphs: [
        `${guide.name} has ${guide.rows.length} published rows. The shop-by-booth URL is /shop-by-booth/${guide.slug}. ${guide.metaDescription || ''}`.trim(),
        lines.join(' '),
      ],
    });
  }
  sections.push({
    heading: 'Catalog prices are on the product pages',
    paragraphs: priceParagraphs(products).slice(0, 12),
  });
  return sections;
}

export function sizeChartFaqs() {
  return [
    {
      question: 'Are these sizes confirmed to fit?',
      answer: 'No. They are the published directory rows. Measure the installed opening and compare the label before ordering.',
    },
    {
      question: 'What if my model is missing?',
      answer: 'Models omitted from the directory, including rows flagged for verification, are not listed. Call 855-496-7969 with the equipment tag, stage, and measurements.',
    },
  ];
}

export function andreaeSections(products) {
  const product = products.find((item) => item.handle === 'accordion-style-paint-arrestors');
  const lines = product ? variantLines(product) : [];
  const afLines = lines.filter((row) => /\bAF\d{3}\b/.test(row.title));
  return [
    {
      heading: 'AF codes in the current catalog',
      paragraphs: [
        'This guide lists only Andreae-style AF codes that appear in the variant titles of the accordion-style paint arrestors product. Codes that are not in that product are omitted. The product URL is /product/accordion-style-paint-arrestors.',
        afLines.length
          ? afLines.map((row) => `${row.title} is ${row.price}${row.sku ? `, SKU ${row.sku}` : ''}.`).join(' ')
          : 'No AF codes were found on the accordion product in this snapshot.',
        'High-efficiency codes and standard codes that share a face size are different variants. The case count is part of the variant title. Ordering a higher case count does not change the AF code. Match the code printed on the filter you are replacing.',
        'Fiberglass pads and Paint Pockets are different products. An AF code does not convert a fiberglass roll into an accordion filter. If the code on your filter is not in the list above, it is not in this catalog product. Call 855-496-7969 rather than substituting a nearby code.',
      ],
    },
    {
      heading: 'What this guide does not add',
      paragraphs: [
        'Efficiency percentages, holding capacity, and test reports are not copied from outside sites. If a number is not in the variant title or the product description in this catalog, it is not stated here. The Andreae page on this site repeats the same codes.',
        'PFS Filters sells these variants. Listing an AF code is not a claim that PFS manufactures the media, and it is not a claim that the filter makes a booth compliant with any rule.',
      ],
    },
  ];
}

export function andreaeFaqs(products) {
  const product = products.find((item) => item.handle === 'accordion-style-paint-arrestors');
  const codes = variantLines(product || {}).map((row) => row.title.match(/\bAF\d{3}\b/)?.[0]).filter(Boolean);
  return [
    {
      question: 'Which AF numbers are in the PFS catalog?',
      answer: codes.length ? `${codes.join(', ')} appear in the accordion product variant titles. Other AF numbers are not listed.` : 'No AF numbers were found in the current snapshot.',
    },
    {
      question: 'Does an AF code prove the filter fits?',
      answer: 'No. The code selects the catalog variant. Confirm the frame size and the code on the installed filter before ordering.',
    },
  ];
}

export function measureSections() {
  return [
    {
      heading: 'Measure the opening, then read the label',
      paragraphs: [
        'The PFS catalog and the booth directory both say to measure the installed filter opening before ordering. A nominal size such as 20 by 20 is a label. The frame in the booth can differ. Write down the booth make and model from the equipment tag, the stage you are changing, and the actual opening.',
        'For an exhaust filter wall, measure the bank where the pad or roll sits. A pad and a roll are different products even when the gram weight matches. For a ceiling, measure the grid or the blanket pocket the booth uses. For an intake door or wall, measure that opening. Do not use the ceiling measurement for the exhaust bank.',
        'Read whatever is still printed on the filter coming out: gram weight, an AF code, a SKU, or a brand. Compare that text with the variant titles. The part-number cross reference lists only codes that are already on catalog products. A code that is absent, including searches that do not appear in the snapshot, is a call to 855-496-7969 with a photo. It is not a guessed substitute.',
        'The booth directory rows are a second note, not a tape measure. If the row and the opening disagree, follow the opening and the label. This site does not publish a separate measuring formula, a conversion from nominal to actual, or a tolerance. Those numbers are not in the catalog, so they are not stated here.',
        'Holding grids are separate from the media. The 20 by 20 paint arrestor holding grid with tips is its own product. Measuring the pad does not tell you whether the grid is included. The cart line does.',
      ],
    },
  ];
}

export function measureFaqs() {
  return [
    {
      question: 'Should I order the nominal size or the measured opening?',
      answer: 'Measure the opening and compare it with the variant title. A nominal size on a directory row is not a substitute for that measurement.',
    },
    {
      question: 'What if the size is not listed?',
      answer: 'Call 855-496-7969 with the booth model, the stage, the measured opening, and a photo. Do not trim a listed size unless the product page says that is how it is sold.',
    },
  ];
}

export function comparisonSections(products) {
  const groups = [
    ['accordion-style-paint-arrestors', 'Andreae-style accordion'],
    ['20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs', '22-gram fiberglass pads'],
    ['20x100x2-22-gram-fiberglass-exhaust-roll-1-cs', '22-gram fiberglass rolls'],
    ['20x20-paint-pockets-paint-arrestor-30-cs', 'Paint Pockets'],
  ];
  const paragraphs = groups.map(([handle, label]) => {
    const product = products.find((item) => item.handle === handle);
    if (!product) return `${label} is not in the current snapshot.`;
    const lines = variantLines(product).filter((row) => row.title.toLowerCase() !== 'default title');
    return `${label} is the product "${product.title}". Variants: ${lines.map((row) => `${row.title} at ${row.price}`).join('; ')}. URL: /product/${handle}.`;
  });
  return [
    {
      heading: 'Three exhaust constructions in this catalog',
      paragraphs: [
        'Andreae-style accordion filters, fiberglass paint arrestors, and Paint Pockets are different catalog products. This page compares only the variant titles and prices in the snapshot. It does not add efficiency percentages, holding capacity, or pressure-drop numbers that are not printed on those products.',
        ...paragraphs,
        'Paint Pockets media in this catalog is described on the exhaust guide as progressive-density fiber with a white side and a green side that indicates airflow direction. Andreae-style filters are the accordion variants with AF codes. Fiberglass pads and rolls are sold by gram weight. The gram weight and the AF code are different identifiers. A 22-gram pad is not an AF223 pad.',
        'Choose by the filter that is installed and by the stage. All three of these products are exhaust-side media in the way the shop groups them. They are not ceiling diffusion blankets and they are not tacky intake panels. If the booth uses more than one exhaust stage, match each stage to its own product. Do not stack a description from one product onto another.',
        'Nothing here is a NESHAP or Method 319 claim. A purchase of any of these filters does not make a facility compliant. The NESHAP guide is the page that says so.',
      ],
    },
  ];
}

export function comparisonFaqs() {
  return [
    {
      question: 'Is an Andreae AF code the same as a fiberglass gram weight?',
      answer: 'No. AF codes are variant titles on the accordion product. Gram weight is how the fiberglass pads and rolls are titled. Match the identifier that is on your filter.',
    },
    {
      question: 'Which one holds more overspray?',
      answer: 'This catalog does not publish a holding-capacity comparison. Use the product descriptions that exist, and do not treat a missing number as a test result.',
    },
  ];
}

export function shippingSections(products) {
  const rolls = products.filter((product) => /ltl|less than truckload/i.test(product.description || ''));
  const rollSentence = rolls.length
    ? `These product descriptions say shipping is typically LTL (less than truckload) because of size: ${rolls.map((product) => product.title).join('; ')}.`
    : 'No product description in the snapshot states an LTL profile.';
  return [
    {
      heading: 'What the catalog and the terms say about shipping',
      paragraphs: [
        'Prices on PFS Filters do not include shipping, handling, or freight. Checkout calculates the charge for the item, the quantity, and the destination. The terms of service say processing and delivery dates are estimates. Most stocked orders are generally processed within one to two business days. Freight, custom, large-quantity, and special-order items may take longer. There is no same-day shipping claim on the site.',
        rollSentence,
        'The roll pages also say to call if the size is not listed. That is the path for a roll that does not have a checkout rate. This guide does not name shipping profiles that are not written on a product or in the terms. Profile labels that are not in the repository are omitted rather than guessed.',
        'A representative UPS Ground checkout quote of $40.76 is recorded in the site schema notes for one stocked 22-gram pad case to New York, NY 10001, with a service description of 4 business days. That figure is one quote, not a flat rate for every 20 by 20 filter and not a promise for blankets or rolls.',
        'Large roll media and freight shipments are called out in the FAQ as items that can take additional time. Ceiling blankets are not given a separate carrier name in the product text beyond the general freight note. Parker and AFC product text says shipping is calculated separately at checkout.',
        'Returns are separate from the outbound charge. Unopened packages may be returned within five business days. The refund deducts shipping costs and a 25 percent restocking fee. Opened packages are not returnable. Call 855-496-7969 before sending a return to 1400 Airport Blvd, Santa Rosa, CA 95403.',
      ],
    },
  ];
}

export function shippingFaqs() {
  return [
    {
      question: 'Do you ship the same day?',
      answer: 'No same-day claim is published. Stocked orders are typically processed in one to two business days. Freight and special orders can take longer. Delivery dates are estimates.',
    },
    {
      question: 'Is shipping included in the price?',
      answer: 'No. The terms say prices do not include shipping or freight unless checkout shows otherwise. Roll media descriptions say shipping is typically LTL because of size.',
    },
  ];
}

export function homepageExpansion(products) {
  const brands = listBoothGuides().map((guide) => guide.name);
  return [
    'PFS Filters sells paint booth filters and spray booth filters from the same catalog. Intake filters, ceiling diffusion media, exhaust arrestors, roll media, and prefilters are separate stages. A paint booth filter wall is the exhaust bank. A paint booth filter roll is roll media, not a pad of the same gram weight. The spray booth filters page uses the same products and says so.',
    `The booth directory published on this site names ${brands.length} brands with recorded rows: ${brands.join(', ')}. Each brand page tells you to measure the opening. The rows are not labeled confirmed fitment. Shop by booth is the index.`,
    'The filter finder narrows options by booth type, brand, model, stage, and size. The part-number cross reference lists SKUs and AF codes that are actually on catalog products. A number that is not in that list is not in the online catalog.',
    'PFS Filters is a division of PFS Spray Booths at 1400 Airport Blvd, Santa Rosa, CA 95403. The phone number is 855-496-7969. The homepage already states the team is backed by 30+ years of PFS Spray Booths expertise. Orders ship within the United States. Stocked items are typically processed in one to two business days. Custom, freight, and special-order timing varies. There is no same-day shipping claim.',
    'Eligible products can be purchased on a monthly subscription when checkout shows that option, currently described as 5 percent off for eligible variants. The filter rotation program schedules shipments after a shop has a cadence. Memberships are a separate page with the prices and features printed there. None of those programs changes the need to match the filter stage and the measured size.',
    'Andreae-style accordion variants in the catalog use AF codes that appear on the product. Fiberglass pads and rolls are listed by gram weight. Paint Pockets are a separate product. Holding grids are an accessory. Aerospace media, including bags and panels whose titles say NESHAP 319, are catalog names. A filter purchase does not make a facility compliant with Method 319, NESHAP Subpart HHHHHH, CARB, or any permit.',
    'Unopened packages may be returned within five business days. The refund is reduced by shipping costs and a 25 percent restocking fee. Opened packages are not returnable. Roll media product text says shipping is typically LTL because of size. Other shipping charges are calculated at checkout.',
    'California pages on this site cover regions the Santa Rosa team already describes. Georgia orders use the same catalog, shipped from Santa Rosa. There is no Georgia storefront and no Georgia compliance title on this site.',
    ...priceParagraphs(products).slice(0, 20),
  ];
}

export function sectionWordCount(sections, faqs = []) {
  const text = [
    ...sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
