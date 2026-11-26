/**
 * Booth-airflow pages. Facts are the published airflow notes and catalog products.
 * No kit, fitment, or ranking claim.
 */
export const NATIONAL_LINE = 'pfsfilters.com is the online filter store of Platinum Finishing Systems and ships paint booth filters throughout the United States.';

const LINKS = 'Related pages: /ceiling-filters, /category/ceiling-blankets, /exhaust-filters, /category/roll-media, /intake-filters, /filter-finder, /shop-by-booth, /guides/paint-booth-filter-size, /guides/paint-booth-filter-changeout, /blog/how-to-choose-booth-filters, /guides/garmat-filter-cross-reference, /guides/gfs-filter-cross-reference, and /guides/blowtherm-filter-cross-reference.';

export function airflowPages() {
  return [
    {
      path: '/downdraft-booth-filters',
      title: 'Downdraft & Side Downdraft Filters | PFS',
      h1: 'Downdraft & Side Downdraft Paint Booth Filters',
      description: 'Downdraft and side-downdraft paint booth filters: ceiling diffusion media, then floor, pit, or side-wall exhaust. Match the stage and the measured opening.',
      lede: 'Ceiling intake media first, then exhaust at the floor, pit, or side wall. Match the catalog product to the stage you are changing.',
      faqs: [
        {
          question: 'What filters does a downdraft booth use?',
          answer: 'A downdraft booth takes air in through ceiling diffusion media and sends it out through floor grates or a pit. Those are two different filter stages. Ceiling blankets and exhaust pads or rolls are not interchangeable.',
        },
        {
          question: 'How is a side-downdraft booth different?',
          answer: 'Side downdraft still brings air in from the ceiling. Exhaust leaves through side-wall plenums instead of only a floor pit. Order ceiling media for the grid and exhaust media for the side-wall bank.',
        },
        {
          question: 'Which catalog products are ceiling diffusion media?',
          answer: 'The catalog lists L560 ceiling diffusion media and Swiss Flow 600G downdraft blankets in the cut sizes on those product pages. Measure the grid. A drawing size is not a substitute.',
        },
      ],
      sections: [
        {
          heading: 'Downdraft and side-downdraft airflow',
          paragraphs: [
            NATIONAL_LINE,
            'On a downdraft booth, supply air enters through the ceiling plenum and leaves through floor grates or a pit. The filter finder on this site describes that path the same way. Side downdraft uses the same ceiling inlet and sends exhaust out through side-wall plenums. Semi-downdraft is related but not the same: air enters from the front ceiling area and exits low in the rear wall.',
            'Ceiling diffusion media and exhaust filters are separate purchases. A ceiling blanket does not go in the pit, and an exhaust pad does not go in the ceiling grid.',
          ],
        },
        {
          heading: 'Ceiling diffusion media',
          paragraphs: [
            'The stocked ceiling products are L560 ceiling diffusion media and Swiss Flow 600G downdraft ceiling blankets. Each product page lists the cut sizes and case counts. Measure the grid or the blanket pocket before you choose a variant. The ceiling filters page is /ceiling-filters and the ceiling diffusion category is /category/ceiling-blankets.',
          ],
        },
        {
          heading: 'Floor, pit, and side-wall exhaust',
          paragraphs: [
            'Exhaust on these booths is fiberglass paint arrestor pads, fiberglass rolls, Paint Pockets, or Andreae accordion filters, matched to the bank you are changing. 15-gram and 22-gram pads and rolls are different products. Rolls are listed under /category/roll-media. Pads and other exhaust media are on /exhaust-filters. Roll text that says shipping is typically LTL means freight because of size. That is not the parcel rate used for a small pad case.',
            LINKS,
            'Booth-brand pages under /shop-by-booth record model rows for Garmat, Global Finishing Solutions, Blowtherm, and the other listed makers. A directory row is recorded, not confirmed fitment. If the opening is not a listed variant, call 855-496-7969. Volume pricing and payment terms are not published.',
          ],
        },
      ],
    },
    {
      path: '/crossdraft-booth-filters',
      title: 'Crossdraft Paint Booth Filters | PFS',
      h1: 'Crossdraft Paint Booth Filters',
      description: 'Crossdraft paint booth filters: intake filters at the doors or front wall, then exhaust pads or rolls on the rear filter wall. Confirm each measured opening.',
      lede: 'Intake filters where air enters, then exhaust pads or rolls on the rear wall. Those stages are not the same product.',
      faqs: [
        {
          question: 'What filters does a crossdraft booth use?',
          answer: 'Air enters through intake doors or a front wall and leaves through exhaust filters at the rear. Intake panels, pleats, or bags are not a substitute for the exhaust wall, and the exhaust wall is not ceiling diffusion media.',
        },
        {
          question: 'Which intake filters are in the catalog?',
          answer: '300 Series tacky panels, 5KR1 premium intake panels, MERV 10 pleats, and one six-pocket bag at 23.25 by 47 by 8 inches, four per case. Match the style and the measured opening.',
        },
      ],
      sections: [
        {
          heading: 'Crossdraft airflow',
          paragraphs: [
            NATIONAL_LINE,
            'The filter finder describes crossdraft as air moving horizontally from intake doors or a front wall to exhaust filters. There is no ceiling diffusion blanket unless the booth was built with one. Do not order a downdraft ceiling blanket for a crossdraft door bank.',
          ],
        },
        {
          heading: 'Door and intake filters',
          paragraphs: [
            'Intake filters for the doors or inlet wall are the 300 Series tacky panels, 5KR1 panels, MERV 10 pleated filters, and the six-pocket bag. Link panels and single-frame panels are different even when the width is 20 inches. A 2-inch pleat does not fill a 4-inch track. The intake page is /intake-filters.',
          ],
        },
        {
          heading: 'Rear exhaust wall',
          paragraphs: [
            'The rear filter wall takes fiberglass paint arrestor pads, fiberglass rolls, Paint Pockets, or Andreae accordion filters. Pads and rolls of the same gram weight are different catalog items. See /exhaust-filters and /category/roll-media. A 20x20 holding grid is an accessory, not the pad.',
            LINKS,
            'Measure each opening. If the size is not listed, call 855-496-7969. This page does not publish a crossdraft kit.',
          ],
        },
      ],
    },
    {
      path: '/portable-paint-booth-filters',
      title: 'Mobile & Portable Paint Booth Filters | PFS',
      h1: 'Mobile & Portable Paint Booth Filters',
      description: 'Mobile and portable paint booth filters: stocked 20x20 and 20x25 pads, tacky panels, and rolls. No portable booth kit. Call 855-496-7969 if unsure.',
      lede: 'Small, mobile, and portable booths usually take standard pads, panels, or rolls. PFS does not sell a portable booth kit.',
      faqs: [
        {
          question: 'Does PFS sell a portable paint booth filter kit?',
          answer: 'No. There is no portable booth kit in the catalog. Order the pad, panel, or roll whose variant title matches the opening you measured, or call 855-496-7969.',
        },
        {
          question: 'Which standard sizes are stocked?',
          answer: 'Fiberglass paint arrestor pads and 300 Series tacky panels include 20x20 and 20x25 variants, among other sizes on those product pages. Rolls are separate products. Confirm the stage before you treat a pad and a roll as the same item.',
        },
      ],
      sections: [
        {
          heading: 'Mobile and portable booths',
          paragraphs: [
            NATIONAL_LINE,
            'Small, mobile, and portable booths are not given a separate filter chemistry on this site. They typically use the same cut-to-size or standard panel media as other booths: exhaust pads, tacky intake panels, and rolls, in the sizes the catalog actually lists. If you are not sure which stage or size you have, use /filter-finder or call 855-496-7969 with a photo and the measured opening.',
            'PFS has no portable booth kit and no mobile-booth changeout bundle. Do not assemble one from nearby sizes.',
          ],
        },
        {
          heading: 'Pads, panels, and rolls that are listed',
          paragraphs: [
            'Fiberglass paint arrestor pads include 20x20 and 20x25 cases, plus other sizes on the product page. 300 Series tacky panels include 20x20 and 20x25 cases, plus link and single-frame sizes. 15-gram and 22-gram rolls are listed by width and length under roll media. Those are the products to compare. A nominal 20x20 is still a measurement check, not an automatic fit.',
            'Exhaust pads and rolls are on /exhaust-filters and /category/roll-media. Intake panels are on /intake-filters. Ceiling diffusion media is only for a booth that has a ceiling grid. Many portable booths do not.',
            LINKS,
          ],
        },
      ],
    },
  ];
}

export function filterFinderCrawlerSections() {
  return [
    {
      heading: 'If you are not sure which booth you have',
      paragraphs: [
        `${NATIONAL_LINE} Start by naming the path the air takes, not the paint brand. A downdraft booth brings air in through the ceiling and sends it out through floor grates or a pit. A side-downdraft booth uses that same ceiling inlet and sends exhaust out through side-wall plenums. Semi-downdraft is a different path: air enters from the front ceiling area and exits low in the rear wall. Crossdraft moves air horizontally from intake doors or a front wall to a rear exhaust wall. Open-face booths and prep stations exhaust through a rear wall and do not use a ceiling diffusion blanket unless the installed booth has one. If the booth is small, mobile, or portable, it usually takes the same pads, panels, or rolls as a larger booth, in a standard size. There is no separate portable chemistry and no portable booth kit on this site.`,
        'Not sure is a real answer. Use this page when the booth tag is missing or the airflow is unclear. Walk the booth once: where air enters, where it leaves, and which filter is dirty. Ceiling inlet plus floor or side exhaust is the downdraft page. Door or front inlet plus a rear wall is the crossdraft page. A small movable booth with standard pads or panels is the portable page. If two of those descriptions seem possible, call 855-496-7969 with a photo of the filter and the frame rather than ordering both.',
        'Those paths have their own pages. Downdraft and side-downdraft paint booth filters are at {/downdraft-booth-filters|downdraft and side-downdraft paint booth filters}. Crossdraft paint booth filters are at {/crossdraft-booth-filters|crossdraft paint booth filters}. Mobile and portable paint booth filters are at {/portable-paint-booth-filters|mobile and portable paint booth filters}. If the tag on the booth names a brand, the booth directory is {/shop-by-booth|shop by booth}. Recorded rows for Garmat, Global Finishing Solutions, Blowtherm, Accudraft, Col-Met, and PFS Spray Booths are starting points. A directory row is recorded, not confirmed fitment. Measure the opening you are changing before you treat a listed size as the one in the wall.',
      ],
    },
    {
      heading: 'Filter formats',
      paragraphs: [
        'After the airflow, name the filter stage. Exhaust pads and rolls capture overspray. They are listed on {/exhaust-filters|paint booth exhaust filters: pads and rolls}. Roll widths and lengths, which are different catalog items from cut pads of the same gram weight, are on {/category/roll-media|exhaust filter rolls}. Ceiling diffusion media sits in a downdraft or side-downdraft ceiling grid. That page is {/ceiling-filters|ceiling diffusion media}, and the category of cut blankets is {/category/ceiling-blankets|ceiling diffusion media filters}. Intake filters sit in doors, inlet walls, and other supply-air openings. That page is {/intake-filters|paint booth intake filters}. A ceiling blanket does not belong in a pit. An exhaust pad does not belong in a ceiling grid. An intake panel does not belong on an exhaust wall. The stage on the old filter, or the position in the booth, decides the page.',
        'The catalog names the products to compare. Ceiling diffusion media includes L560 cut sizes and Swiss Flow 600G downdraft blankets, including cut blankets and master rolls on that product page. Exhaust media includes 15-gram and 22-gram fiberglass paint arrestor pads, 15-gram and 22-gram fiberglass rolls, Paint Pockets, and Andreae accordion pads and rolls. The Andreae page lists AF213, AF223, AF413, AF423, AF813, AF923, AF113, and AF123. Intake media includes 300 Series tacky panels in 20 by 20, 20 by 25, and other listed sizes, including link and single-frame panels, plus 5KR1 premium intake panels, MERV 10 pleats, and one six-pocket bag at 23.25 by 47 by 8 inches, four per case. A 20 by 20 tacky panel and a 20 by 20 exhaust pad share a nominal size and are not the same product. A 2-inch pleat does not fill a 4-inch track. Link panels and single-frame panels are different even when the width is 20 inches.',
      ],
    },
    {
      heading: 'Sizes, changeout, and what to send',
      paragraphs: [
        'Then measure. Width, height, and depth are three numbers. Read them on the opening, not only on a drawing. The size guide is {/guides/paint-booth-filter-size|how to determine the right paint booth filter size}. The measuring steps are {/guides/how-to-measure-paint-booth-filters|how to measure a paint booth filter}. Changeout timing is {/guides/paint-booth-filter-changeout|paint booth filter changeout}. There is no universal change interval. Use the booth and filter instructions, pressure or manometer readings, operating hours, coating load, and the condition of the filter face. A loaded bank and a clean bank are not the same job. Write down the booth make and model from the tag, the stage, any gram weight, AF code, or SKU still printed on the filter, and the quantity. Compare that note with the variant title on the product page. If the size is not listed, do not substitute a nearby size.',
        'Prices do not include shipping. PFS Filters ships throughout the United States. Stocked items are typically processed in one to two business days. Freight, custom, and special-order timing varies. Roll product text that says shipping is typically LTL means freight because of size. That freight shipment does not use the parcel rate shown for a small pad case. Checkout calculates the charge for the items that ship as parcels. Volume pricing and payment terms are not published on this page. Call 855-496-7969 when the booth type, the stage, or the size is still unclear, or when the opening is not a listed variant. The paint booth filters hub is {/paint-booth-filters|paint booth filters}. The article on choosing media is {/blog/how-to-choose-booth-filters|how to choose booth filters}. This finder does not place an order. It narrows the booth type, the airflow, the filter stage, and the size so the catalog page you open is the one that matches the filter in the wall.',
      ],
    },
  ];
}
