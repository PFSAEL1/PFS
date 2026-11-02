export type CategoryGuideLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type CategoryGuide = {
  heading: string;
  paragraphs: string[];
  links: CategoryGuideLink[];
};

export const categoryGuides: Record<string, CategoryGuide> = {
  'polyester-media': {
    heading: 'When polyester exhaust media is the right stage',
    paragraphs: [
      'Polyester exhaust media is a synthetic pad, cube, or roll used on the outlet side of a liquid spray booth. Shops choose it when a light fiberglass pad loads too fast in damp air or around waterborne coatings. It still has one job: hold overspray before air reaches the fan and duct.',
      'Two polyester products are in the current catalog. The AFC blue polyester exhaust cube is a 20 by 20 by 15 inch pocket, sold as a case of six. The Koch SprayStop STK-10 is a synthetic roll, 61 inches by 90 feet. Sizes, case counts, and prices on those product pages are the stocked options. Nothing else on this page is a hidden part number.',
      'If the opening in your exhaust bank does not match either listing, measure the frame and send a photo. PFS can quote a cut. Do not assume a polyester pad can replace a ceiling blanket or an intake panel because the outline looks similar.',
    ],
    links: [
      { href: '/product/afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6', label: 'AFC blue polyester cube' },
      { href: '/product/koch-spraystop-stk10-61x90-roll', label: 'Koch SprayStop roll' },
      { href: '/exhaust-filters', label: 'exhaust filters' },
      { href: '/contact', label: 'request a quote' },
    ],
  },
  'powder-booth-filters': {
    heading: 'Three-stage panels and pulse-jet cartridges',
    paragraphs: [
      'Powder booths do not use the same exhaust pad as a liquid spray booth. A spray-to-waste powder booth typically pulls air through a three-stage panel bank: a coarse first panel, a tighter second panel, and a final panel that catches what the first two missed. The stack is there so the fan sees powder-free air and so the early panels take the heavy load.',
      'Reclaim collectors are different again. Many of them use pulse-jet cartridges. A short burst of compressed air knocks powder off the cartridge so it can drop into the reclaim path. The cartridge size, the header style, and the number of cartridges are set by the collector, not by a generic 20 by 20 pad.',
      'PFS Filters does not list three-stage powder panels or pulse-jet cartridges as stocked catalog items, and this page does not invent prices or part numbers for them. Send the booth or collector model, the panel or cartridge dimensions, and a photo of the installed media. We will quote the replacement.',
    ],
    links: [
      { href: '/contact', label: 'request a quote' },
      { href: '/filter-rotation-program', label: 'filter rotation program' },
      { href: '/exhaust-filters', label: 'liquid exhaust filters' },
    ],
  },
  'activated-carbon-media': {
    heading: 'What activated carbon media is for',
    paragraphs: [
      'Activated carbon is a porous media used after a particulate filter when a shop needs to hold solvent vapor and take odor out of exhaust air. The carbon adsorbs vapor. It does not stop paint droplets. If overspray reaches the carbon, the pores clog and the bed stops doing its job.',
      'A workable stack puts a paint arrestor or other particulate stage first, then the carbon housing. The housing size, bed depth, and airflow decide which carbon module can even fit. Those details come from the booth or the add-on adsorber, not from a universal SKU.',
      'No activated carbon panels, beds, or modules are in the current PFS catalog, so this page lists no price and no part number. Tell us the housing dimensions, the airflow, and the coatings you spray, and request a quote.',
    ],
    links: [
      { href: '/exhaust-filters', label: 'particulate exhaust filters' },
      { href: '/blog/how-to-choose-booth-filters', label: 'how to choose booth filters' },
      { href: '/contact', label: 'request a quote' },
    ],
  },
  'paint-arrest-systems': {
    heading: 'How a paint-arrest system is different from one pad',
    paragraphs: [
      'A paint-arrest system is the exhaust arrangement that catches overspray, not a single universal pad. In a high-volume booth the first layer takes the heavy droplets and a denser layer behind it takes the rest. That is why some lines run a coarse arrestor in front of a final media instead of asking one pad to do both jobs.',
      'The catalog sells those layers as separate products: fiberglass paint arrestor pads and rolls, Paint Pockets, and Andreae accordion media. Each product page shows the sizes and prices that are actually stocked. A multi-stage stack is not published here as one kit with one part number.',
      'If you want the stages selected as a set, send the booth model, the exhaust opening, and how fast the current bank loads. PFS will quote the combination. Until that quote is in hand, browse the exhaust products and match the frame you already have.',
    ],
    links: [
      { href: '/exhaust-filters', label: 'exhaust filters' },
      { href: '/category/fiberglass-arrestors', label: 'fiberglass arrestors' },
      { href: '/andreae-paint-booth-filters', label: 'Andreae accordion media' },
      { href: '/contact', label: 'request a quote' },
    ],
  },
  'pfs-oem-replacement-kits': {
    heading: 'OEM replacement kits for PFS booths',
    paragraphs: [
      'An OEM replacement kit is the set of intake, ceiling, and exhaust pieces a specific PFS booth was built to use. Ordering the set together avoids mixing a ceiling blanket from one layout with an exhaust pad from another. The right set still depends on the model, and on whether that booth was later changed.',
      'This store sells the individual filters in the catalog. It does not publish a kit price or a kit part number for each booth model. To get a kit, send the model and the serial or equipment tag, plus a photo of each stage if the tag is hard to read. PFS will name the stages and quote the set.',
      'Legacy booths are included in that review. A model name alone is often not enough when a booth has been resized or had a stage added. The filter overview on the PFS Spray Booths site is the manufacturer’s list of media types. Use it to see the families, then quote the kit from the tag on your booth.',
    ],
    links: [
      { href: '/pfs-spray-booth-filters', label: 'PFS booth filter guide' },
      { href: '/filter-rotation-program', label: 'filter rotation program' },
      { href: 'https://pfsspraybooths.com/parts/filters/', label: 'PFS booth filter overview', external: true },
      { href: '/contact', label: 'request a quote' },
    ],
  },
};
