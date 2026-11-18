/**
 * Industry landing copy built from the catalog snapshot and published booth-directory rows.
 * Recorded sizes are not confirmed fitment. Non-catalog sizes are quote-only.
 */
import { getBoothGuide } from './boothFilterGuides.mjs';
import { measureSections } from './catalogGuides.mjs';

const CAVEAT = 'This is a recorded directory size, not confirmed fitment. Measure the opening before ordering. If the size is not a catalog variant, it is quote-only.';

function money(amount) {
  const numeric = Number(amount);
  return Number.isFinite(numeric) ? `$${numeric.toFixed(2)}` : '';
}

export function productFacts(products, handle) {
  const product = products.find((item) => item.handle === handle);
  if (!product) return '';
  const variants = (product.variants?.edges || [])
    .map((edge) => edge.node)
    .filter((node) => node?.price?.amount);
  const priced = variants
    .filter((node) => node.title && node.title.toLowerCase() !== 'default title')
    .map((node) => `${node.title} at ${money(node.price.amount)}`);
  const detail = priced.length
    ? priced.join('; ')
    : `${money(product.priceRange?.minVariantPrice?.amount)} on the product page`;
  return `${product.title} is at /product/${product.handle}. Catalog variants: ${detail}. Shipping is not included.`;
}

function block(products, handles) {
  return handles.map((handle) => productFacts(products, handle)).filter(Boolean);
}

const INTAKE = ['300-series-tacky-filter-panel', '5kr1-series-premium-intake', 'pleated-air-filters-merv-10'];
const CEILING = ['ceiling-diffusion-media', 'swiss-flow-downdraft-ceiling-diffusion-media-600g-ultra-premium'];
const EXHAUST = [
  '20x20x2-15-gram-fiberglass-paint-arrestor-pads-50-cs',
  '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs',
  '36x100-15-gram-fiberglass-paint-arrestor-roll-1-cs',
  '20x100x2-22-gram-fiberglass-exhaust-roll-1-cs',
  '20x20-paint-pockets-paint-arrestor-30-cs',
  'accordion-style-paint-arrestors',
];
const POLY = ['afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6', 'koch-spraystop-stk10-61x90-roll'];

function recordedRows(slug, predicate) {
  const guide = getBoothGuide(slug);
  if (!guide) return [];
  return guide.rows.filter(predicate).map((row) => `${guide.name}, ${row.model}: ${row.position} using ${row.filterType} at ${row.size}${row.qty ? ` (${row.qty})` : ''}. ${CAVEAT}`);
}

function orderingNotes() {
  return [
    'Order the variant whose title matches the label and the measured opening. A nearby nominal size is not a substitute. Prices on this page are the catalog snapshot and do not include shipping. Roll product text says shipping is typically LTL because of size. Stocked items are typically processed in one to two business days. Freight and custom sizes take longer. There is no same-day claim.',
    'Unopened packages may be returned within five business days. The refund is reduced by shipping costs and a 25 percent restocking fee. Opened packages are not returnable. The phone number for an unlisted size is 855-496-7969. The filter finder and the size chart are the other tools. A directory row that is not a catalog variant stays a quote.',
  ];
}

const sharedFaqs = [
  {
    question: 'Does buying a filter make the booth compliant?',
    answer: 'No. A filter purchase does not make a facility compliant with any permit or rule. Match the stage and the measured opening, then confirm the product page.',
  },
  {
    question: 'What if the size is not in the catalog?',
    answer: 'Call 855-496-7969 with the booth model, stage, and measured opening. Recorded directory sizes that are not catalog variants are quote-only. Do not invent a kit.',
  },
];

export function industryPages(products) {
  const intake = block(products, INTAKE);
  const ceiling = block(products, CEILING);
  const exhaust = block(products, EXHAUST);
  const poly = block(products, POLY);
  const blowthermTruck = recordedRows('blowtherm', (row) => /truck/i.test(row.model));
  const devilbissTruck = recordedRows('devilbiss', (row) => /truck/i.test(row.model));
  const gfsPrep = recordedRows('global-finishing-solutions', (row) => /prep/i.test(row.model));
  const blowthermPrep = recordedRows('blowtherm', (row) => /prep/i.test(row.model));

  return [
    {
      path: '/industries/automotive-paint-booth-filters',
      h1: 'Automotive Paint Booth Filters',
      title: 'Auto Body Paint Booth Filters | PFS Filters',
      description: 'Automotive paint booth filters for auto body, collision, and refinish shops. Stocked tacky panels, ceiling blankets, and exhaust pads. Confirm the stage.',
      faqs: [
        {
          question: 'Which filters do auto body and collision booths usually order?',
          answer: 'The stocked catalog used for those booths is tacky intake panels, pleated intake filters, ceiling diffusion blankets, fiberglass pads and rolls, Paint Pockets, and Andreae accordion arrestors. The booth brand and the measured opening decide the variant. Garmat, GFS, Accudraft, Blowtherm, and USI Italia each have a guide on this site.',
        },
        {
          question: 'Is there a separate collision-shop filter page?',
          answer: 'No. Collision repair, auto body, and refinish work use this automotive page. There is not a second thin collision URL.',
        },
        ...sharedFaqs,
      ],
      sections: [
        {
          heading: 'Automotive, auto body, collision, and refinish',
          paragraphs: [
            'Auto body shops, collision repair shops, and refinish booths use the same liquid paint-booth catalog. A crossdraft booth usually has an intake bank and an exhaust filter wall. A downdraft or semi-downdraft booth adds a ceiling blanket. This page lists the stocked intake, ceiling, and exhaust products with the sizes and prices on the current catalog snapshot. It does not add a collision-only kit.',
            'Brand guides already on this site cover the booths those shops name most often: Garmat at /guides/garmat-filter-cross-reference, Global Finishing Solutions at /guides/gfs-filter-cross-reference, Accudraft at /guides/accudraft-filter-cross-reference, Blowtherm at /guides/blowtherm-filter-cross-reference, and USI Italia at /guides/usi-italia-filter-cross-reference. Nova Verta and Binks/DeVilbiss guides are linked from the size chart. A guide row is a recorded size. Measure the opening before you treat it as the part to order.',
            'There is no universal change interval. A replacement filter does not by itself make a booth or facility compliant. Follow the booth and filter instructions.',
          ],
        },
        { heading: 'Stocked intake filters', paragraphs: intake },
        { heading: 'Stocked ceiling filters', paragraphs: ceiling },
        { heading: 'Stocked exhaust filters', paragraphs: exhaust },
        {
          heading: 'Collision shops and multi-location operators',
          paragraphs: [
            'Collision repair, auto body, and refinish work stay on this page, including operators with more than one location. There is not a second collision URL and there is not a collision kit. Each booth still uses the stage and the measured opening.',
            'The brand guides for those shops are Garmat at /guides/garmat-filter-cross-reference, Global Finishing Solutions at /guides/gfs-filter-cross-reference, Blowtherm at /guides/blowtherm-filter-cross-reference, Accudraft at /guides/accudraft-filter-cross-reference, and Col-Met at /guides/col-met-filter-cross-reference. A guide row is recorded, not confirmed fitment.',
            'The filter rotation program can put several booths on one schedule. It is not Subscribe and Save, and it does not publish a discount. Account setup and volume pricing are by phone at 855-496-7969. Bulk ordering notes are at /bulk-paint-booth-filters. Payment terms are not published on this site.',
          ],
        },
      ],
    },
    {
      path: '/industries/industrial-paint-booth-filters',
      h1: 'Industrial Paint Booth Filters',
      title: 'Industrial Paint Booth Filters | PFS Filters',
      description: 'Industrial paint booth filters for manufacturing and open-face booths. Stocked fiberglass, Andreae, Paint Pockets, and polyester media. Measure first.',
      faqs: [
        {
          question: 'How is an open-face booth different from a downdraft booth?',
          answer: 'An open-face booth in the PFS booth-type notes moves air toward an exhaust wall. It does not use a ceiling diffusion blanket unless the manufacturer added a plenum. A downdraft booth does use ceiling media. Order the stage the booth actually has.',
        },
        {
          question: 'Where do heavy equipment and agricultural booths fit?',
          answer: 'They use the same large-booth liquid media as industrial and truck booths: wide fiberglass rolls, Andreae rolls, Paint Pockets, and ceiling blankets when the booth has a ceiling. There is no separate farm-equipment SKU in the catalog. Non-stocked sizes are quote-only. Col-Met’s brand guide is the large-equipment directory page.',
        },
        ...sharedFaqs,
      ],
      sections: [
        {
          heading: 'Manufacturing and industrial finishing',
          paragraphs: [
            'Industrial and manufacturing booths on this site are liquid finishing booths, not a separate filter chemistry. The stocked arrestors are the fiberglass pads and rolls, Paint Pockets, Andreae accordion media, the AFC polyester cube, and the Koch SprayStop roll. Col-Met and GFS brand guides already describe industrial and large-equipment use. Diamond and Protectaire have shop-by-booth pages in the same directory.',
            'Open-face spray booths, when the directory describes them, exhaust through a filter wall. They do not automatically take a ceiling blanket. Stocked wall sizes that shops measure against include the 20x20 and 20x25 fiberglass pads and the Paint Pockets 20x20 and 20x25 variants listed below. If the opening is not one of those variants, call for a quote. Do not order an open-face kit. None is in the catalog.',
          ],
        },
        {
          heading: 'Heavy equipment and agricultural finishing',
          paragraphs: [
            'Heavy equipment and agricultural repaint booths are folded into this page because the catalog has no equipment-specific part numbers for them. They are large liquid booths. Use the wide rolls and the Andreae rolls below, and the ceiling products when the booth has a plenum. Col-Met’s filter cross reference is the large-equipment brand page. The truck and fleet page records Blowtherm truck ceiling sizes that are also large-booth dimensions. Those recorded sizes are not confirmed fitment.',
          ],
        },
        { heading: 'Stocked industrial exhaust and polyester media', paragraphs: [...exhaust, ...poly] },
        { heading: 'Stocked intake and ceiling media', paragraphs: [...intake, ...ceiling] },
        {
          heading: 'Production lines and multiple facilities',
          paragraphs: [
            'A production line or more than one facility orders the same stocked arrestors, polyester media, and intake or ceiling products, matched to each booth. There is no industrial-only part number and no open-face kit. Measure each opening.',
            'The filter rotation program can keep every stage for several booths on one schedule. The price is quoted for the media you use. Volume pricing, payment terms, and account setup are not published. Call 855-496-7969. The bulk order page is /bulk-paint-booth-filters.',
          ],
        },
      ],
    },
    {
      path: '/industries/truck-and-fleet-paint-booth-filters',
      h1: 'Truck and Fleet Paint Booth Filters',
      title: 'Truck and Fleet Paint Booth Filters | PFS',
      description: 'Truck and fleet paint booth filters with recorded Blowtherm sizes, plus stocked large rolls and blankets. Non-stocked sizes are quote-only. Measure first.',
      faqs: [
        {
          question: 'Are the Blowtherm truck sizes a confirmed kit?',
          answer: 'No. The ceiling sizes 64x108, 64x144, and 81x108, and the 19.5x36.75x10 eight-pocket bag, are recorded directory rows. They are not confirmed fitment, and the bag is not a priced catalog product. Measure first. Quote the sizes that are not variants.',
        },
        ...sharedFaqs,
      ],
      sections: [
        {
          heading: 'Recorded truck booth sizes',
          paragraphs: [
            'Truck and fleet booths are larger liquid booths. This page does not publish a Garmat truck kit or a GFS truck kit, because no complete confirmed filter list for those models is in the PFS directory. What is recorded is below. Marathon, Wellbuilt, Saima, Eagle, GFS, and Col-Met have brand pages for shops that need the directory, not a kit.',
            ...blowthermTruck,
            ...devilbissTruck,
            'Filtrair FF560GX cuts and the 19.5x36.75x10 bag are quote-only. They are not given a PFS price here.',
            'The brand directory describes Marathon Finishing as a United States builder of heavy-duty and large-vehicle booths for fleet, truck, and industrial work. Wellbuilt, Saima, Eagle, GFS, and Col-Met also have shop-by-booth pages. Those pages are directories. They are not truck kits, and they do not add prices for sizes that are not in the catalog.',
          ],
        },
        { heading: 'Stocked large rolls and blankets', paragraphs: [...exhaust, ...ceiling, ...orderingNotes()] },
        {
          heading: 'Production lines and multiple facilities',
          paragraphs: [
            'Fleet and truck shops that run more than one booth use the same large rolls and blankets, plus a quote for recorded sizes that are not catalog variants. This page still does not publish a truck kit.',
            'Several facilities can share one rotation schedule. That program is separate from Subscribe and Save. Volume pricing and payment terms are only by phone at 855-496-7969. See /bulk-paint-booth-filters and /filter-rotation-program.',
          ],
        },
      ],
    },
    {
      path: '/industries/woodworking-paint-booth-filters',
      h1: 'Woodworking Paint Booth Filters',
      title: 'Woodworking Paint Booth Filters | PFS Filters',
      description: 'Woodworking paint booth filters for furniture and cabinet finishing: stocked fiberglass, Andreae, Paint Pockets, and intake or ceiling media. Confirm the stage.',
      faqs: [
        {
          question: 'Do furniture and cabinet shops use a different filter?',
          answer: 'Not in this catalog. Furniture, cabinet, and other wood-finishing booths order the same fiberglass, Andreae, Paint Pockets, tacky intake, and ceiling media, matched to the stage and the measured opening. There is no wood-dust collector SKU here.',
        },
        ...sharedFaqs,
      ],
      sections: [
        {
          heading: 'Furniture and cabinet finishing',
          paragraphs: [
            'Woodworking, furniture, and cabinet booths are covered on this one page. The stocked exhaust choice is among fiberglass pads and rolls, Andreae accordion media, and Paint Pockets. Intake for a dusty shop is the tacky panels and pleats below, and a downdraft booth still needs the ceiling blanket that matches its grid. The comparison guide at /guides/andreae-vs-fiberglass-vs-paint-pockets and the measuring guide at /guides/how-to-measure-paint-booth-filters are the next pages. No holding-capacity test is published for these products.',
            'A furniture booth and a cabinet booth are not given different part numbers here. Choose the stage, measure the opening, and use the variant title. Polyester exhaust media, the AFC cube and the Koch SprayStop roll, are also stocked if the booth calls for synthetic media instead of fiberglass. They are listed with the other exhaust products only when you open those product pages. This page stays with the fiberglass, Andreae, Paint Pockets, intake, and ceiling records.',
          ],
        },
        { heading: 'Stocked exhaust media', paragraphs: exhaust },
        { heading: 'Stocked intake and ceiling media', paragraphs: [...intake, ...ceiling, ...orderingNotes()] },
      ],
    },
    {
      path: '/industries/prep-station-filters',
      h1: 'Prep Station Filters',
      title: 'Prep Station Filters | PFS Filters',
      description: 'Prep station filters from the PFS directory: stocked Paint Pockets 20x25 for the recorded GFS prep row. Other recorded sizes are quote-only. No changeout kits.',
      faqs: [
        {
          question: 'Is there a prep-station changeout kit?',
          answer: 'No. PFS does not list a complete changeout kit for Garmat, Accudraft, DeVilbiss, or Spraybake prep stations. The stocked item tied to a recorded prep row is the Paint Pockets 20x25 pad. Other recorded sizes are quote-only.',
        },
        ...sharedFaqs,
      ],
      sections: [
        {
          heading: 'Recorded prep-station rows',
          paragraphs: [
            'A prep station uses the stages the directory records for that model, which may be a smaller exhaust bank or a ceiling. Only the rows below are published. Do not copy a kit list from another seller.',
            ...gfsPrep,
            ...blowthermPrep,
            'The Paint Pockets 20x25 variant is stocked. GFS Wave pads and the Blowtherm prep ceiling size are recorded only. They are quote-only.',
            'Prep stations are not given a PFS changeout kit. Shops that ask for an Accudraft, Garmat, DeVilbiss, or Spraybake prep kit are sent to the filter finder and to a measurement, not to a bundle SKU. Saima and PFS Spray Booths brand pages mention prep-station configurations in the directory. Those mentions are not a parts list.',
            'When the recorded exhaust size is 20x25, the stocked product to open is Paint Pockets. A 20x20 or 20x25 fiberglass pad is a different product. Use it only when the label you are replacing is fiberglass, not because the nominal face is close. The measuring guide says to measure the opening and read the label.',
          ],
        },
        {
          heading: 'Stocked pads a prep bank can be checked against',
          paragraphs: [
            productFacts(products, '20x20-paint-pockets-paint-arrestor-30-cs'),
            productFacts(products, '20x20x2-15-gram-fiberglass-paint-arrestor-pads-50-cs'),
            productFacts(products, '20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs'),
            ...orderingNotes(),
            ...measureSections().flatMap((section) => section.paragraphs),
            'The NESHAP filter category is a different catalog. Do not replace a prep-station pad with an aerospace bag because both are filters. Stay on the stage the prep station uses. Link the paint booth filters hub and the exhaust filter page when the bank is a full booth wall rather than a prep station.',
          ],
        },
      ],
    },
    {
      path: '/industries/marine-paint-booth-filters',
      h1: 'Marine Paint Booth Filters',
      title: 'Marine Paint Booth Filters | PFS Filters',
      description: 'Marine paint booth filters for large liquid booths. Stocked exhaust rolls, arrestors, and ceiling blankets. Measure first. No gelcoat test claim.',
      faqs: [
        {
          question: 'Do you publish gelcoat filter test results?',
          answer: 'No. This page does not claim a gelcoat test, a marine rating, or a boat-only SKU. It lists the stocked large-booth exhaust media and ceiling blankets and tells you to measure the opening.',
        },
        ...sharedFaqs,
      ],
      sections: [
        {
          heading: 'Large-booth exhaust and ceilings',
          paragraphs: [
            'Marine and boat finishing booths that spray liquid coatings use the same exhaust and ceiling catalog as other large liquid booths. High-capacity choices already stocked are the fiberglass rolls, Andreae rolls, Paint Pockets, and the wide ceiling blankets. There is no marine-only part number. Sizes that are not variants are a quote. Custom cuts are requested with the measured grid, not assumed from a directory row.',
          ],
        },
        { heading: 'Stocked exhaust', paragraphs: exhaust },
        { heading: 'Stocked ceiling blankets', paragraphs: [...ceiling, ...orderingNotes(), ...measureSections().flatMap((section) => section.paragraphs)] },
      ],
    },
  ];
}

export function industryWordCount(page) {
  const text = [
    page.h1,
    ...page.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
