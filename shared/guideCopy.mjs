/**
 * Prerender and guide-page copy. Facts are limited to the catalog, the
 * published policies, and the booth directory already in this repo.
 * No compliance claim, customer name, price that is not on a product record,
 * or change to the Santa Rosa address and phone.
 */
const origin = 'https://www.pfsfilters.com';

export const sprayBoothFaqs = [
  {
    question: 'Are spray booth filters and paint booth filters different products?',
    answer: 'Shops use both names for the same job: media that cleans air entering a spray booth and media that captures overspray before air leaves. PFS Filters lists those products by stage — intake, ceiling, exhaust, and roll media — on pfsfilters.com. Match the stage and the measured opening, not the wording in the search.',
  },
  {
    question: 'What types of spray booth filters does the catalog list?',
    answer: 'Intake and ceiling media include tacky panels, pleated panels, pocket bags, and diffusion blankets. Exhaust media include fiberglass paint-arrestor pads, fiberglass rolls, Paint Pockets, and accordion-style arrestors. Aerospace listings add multi-pocket bags, second-stage panels, and roll media. Each product page shows the sizes and pack quantities currently for sale.',
  },
  {
    question: 'Does a NESHAP-style filter make a booth compliant?',
    answer: 'No. Some catalog items are described as NESHAP 319 or multi-stage exhaust media. Those names describe the product record. Buying one does not make a facility compliant with EPA Method 319, NESHAP Subpart HHHHHH, or a permit. Compliance depends on the whole booth, the coating process, installation, records, and the rule that applies. The NESHAP guide on this site explains that limit.',
  },
  {
    question: 'How do I choose a replacement spray booth filter?',
    answer: 'Write down the booth make and model, the stage (intake door, ceiling grid, or exhaust wall), and the measured opening. Read the label on the filter coming out, including gram weight or an AF code if it is still readable. Then open the matching category or the filter finder. If the size is not listed, call 855-496-7969 with those notes and a photo. Do not substitute a nearby width.',
  },
  {
    question: 'How often should spray booth filters be changed?',
    answer: 'There is no universal interval. Follow the booth and filter instructions, manometer or pressure readings, spray load, and visual checks. A loaded exhaust pad and a loaded ceiling blanket are not on the same clock. The filter rotation program can schedule shipments once a shop has a cadence that matches its own booth.',
  },
  {
    question: 'Who sells these spray booth filters?',
    answer: 'PFS Filters is the filter division of PFS Spray Booths, a paint booth builder at 1400 Airport Blvd, Santa Rosa, CA 95403. This store ships replacement media in the United States. The catalog includes PFS listings and media sold under other brand names, including Andreae-style accordion arrestors. The product page names the item. PFS Spray Booths builds booths; a filter listing is not a claim that PFS manufactured every roll or pad in the catalog.',
  },
];

export const sprayBoothSections = [
  {
    heading: 'What spray booth filters are',
    paragraphs: [
      'A spray booth filter is the media in the airstream of a finishing booth. Supply-side filters sit where air enters, including intake doors, inlet walls, and the ceiling plenum on a downdraft or semi-downdraft booth. Exhaust-side filters sit where air leaves, usually in a filter wall or arrestor bank, and hold overspray before it reaches the fan and the stack. The same pieces are what most shops mean by paint booth filters. The search term changes. The stage, the construction, and the measured size do not.',
      'PFS Filters lists those stages as separate catalog paths so a buyer does not have to guess from a photo. Intake filters, ceiling filters, exhaust filters, prefilters, and roll media each have a page. A crossdraft booth often uses an intake bank and an exhaust wall. A downdraft booth often uses a ceiling blanket and a floor or pit exhaust. A prep station may use a smaller set. The booth brand guides on this site record model rows for that reason. The row is a starting note. The installed opening is the order.',
      `The store is the filter division of PFS Spray Booths. Orders are placed at ${origin}. Stocked items are typically processed in one to two business days. Freight, custom cuts, and special-order items take longer, and the product page or a phone call is the place to confirm timing. The phone number for fitment and bulk lists is 855-496-7969. The counter address is 1400 Airport Blvd, Santa Rosa, CA 95403.`,
    ],
  },
  {
    heading: 'Intake filters and ceiling filters',
    paragraphs: [
      'Intake filters clean air before it reaches the finish. On many crossdraft and semi-downdraft booths that air comes through a door or a front wall. The catalog intake pages cover tacky panels, including the 300 Series and 5KR1 panels, MERV 10 pleated panels, and pocket or bag filters used on the supply side. A tacky panel and a pleat are not interchangeable just because the nominal size matches. Read the product title and the variant, then compare it with the filter that came out.',
      `Ceiling filters are the supply media on downdraft and semi-downdraft booths. Diffusion blankets spread air across the plenum so the finish sees an even stream instead of a jet. The ceiling category lists diffusion media, including Swiss Flow downdraft ceiling media. Measure the grid or the blanket pocket before ordering. A ceiling blanket is not the exhaust filter wall, and it is not the intake door on a crossdraft booth. The ceiling guide is at ${origin}/ceiling-filters and the intake guide is at ${origin}/intake-filters.`,
      'Prefilters, when a booth uses them, are a first stage ahead of a more expensive blanket or final filter. The prefilter guide explains that this stage exists only where the booth calls for it. There is not a separate assumption that every booth has a prefilter. If the model row in a brand guide lists a prefilter size, treat that size as a measurement to confirm, not as a part that ships automatically with the ceiling media.',
    ],
  },
  {
    heading: 'Exhaust filters and paint arrestors',
    paragraphs: [
      'Exhaust filters, often called paint arrestors, capture overspray. They load into the filter wall: the frame on the outlet side of a crossdraft or semi-downdraft booth. Fiberglass pads, fiberglass rolls, Paint Pockets, and accordion-style arrestors are the constructions listed for that bank. A pad and a roll of the same gram weight are different products. A 22-gram pad case is not a 22-gram roll, and a 15-gram roll is not a 22-gram roll. The product title carries the gram weight, the width, and the pack.',
      `The fiberglass arrestor category and the roll media category are the two places to start for a filter wall. Holding grids are separate. The 20 by 20 paint arrestor holding grid with tips is sold each, as an accessory, and ordering pads does not include the grid unless the cart says so. Andreae-style accordion arrestors are a single product with pad and roll variants. The codes that appear in those variant titles are listed on ${origin}/andreae-paint-booth-filters. Codes that are not in the catalog are a phone call, not a guessed substitute.`,
      `Paint booth filter rolls live with roll media, including the 22-gram fiberglass exhaust roll and the 15-gram fiberglass paint arrestor roll. Open the product page and choose the width and length that match the wall. A roll that is wider than the frame does not become the right part by being trimmed in a way the product page does not describe. If the width is not listed, call with the opening measurement. The exhaust guide is at ${origin}/exhaust-filters.`,
    ],
  },
  {
    heading: 'Multi-stage and NESHAP-style exhaust',
    paragraphs: [
      'Some booths use more than one exhaust stage. A paint arrestor or a pocket filter may sit in front of a second-stage panel or a bag. The aerospace catalog on this site lists media that the product records describe for that kind of arrangement: HEPA-XFP multi-pocket bags, NESHAP 319 final-stage bags and panels, CG100 two-pocket bags, ME/PT panels, SFR ceiling blankets, and CPA polyester overspray roll. Those names are the catalog names. The product page is where the size, pack, and the manufacturer’s own description are shown.',
      'A multi-stage description is not a compliance certificate. PFS Filters does not claim that any filter by itself satisfies EPA Method 319, NESHAP Subpart HHHHHH, a state permit, or an aerospace specification. The NESHAP guide on this site is the place that draws that line, and it links the public rule pages rather than stamping a SKU as the control device for a facility. If a permit names a test method, send that language with the booth model and the stage when you want the team to compare it with a product record. The comparison is still a catalog match, not a permit determination.',
      `Standard automotive and industrial exhaust media and the aerospace listings are different product sets. Do not replace a final-stage aerospace bag with a fiberglass arrestor pad because both sit on the outlet side of a booth. Use ${origin}/aerospace and ${origin}/industries/aerospace-paint-booth-filters for the aerospace set, and the exhaust and roll pages for the arrestor set.`,
    ],
  },
  {
    heading: 'How to choose a spray booth filter',
    paragraphs: [
      'Start with the equipment, not with a keyword. The useful note is the booth manufacturer and model, the filter position, the actual opening, and any part number still readable on the media. Nominal sizes such as 20 by 20 are a label. The installed frame can differ. The filter finder walks booth type, brand, model, stage, and size. The part-number cross reference lists SKUs and manufacturer part numbers that appear in the current catalog. A number that is not in that list is not in the online catalog.',
      'Then pick the stage. Intake and tacky panels for air that enters through a door or wall. Ceiling diffusion media for a downdraft plenum. Fiberglass pads, rolls, Paint Pockets, or accordion arrestors for the filter wall. A brand guide, when this site has one for that booth maker, shows model rows with positions and sizes recorded for that brand. There are guides for dozens of booth brands, linked from the shop-by-booth index. PFS, Garmat, Accudraft, Global Finishing Solutions, Col-Met, and Blowtherm are among them. The row does not override the filter in your hand.',
      'Quantity and pack follow the variant. Many pads are sold by the case. Rolls are often one per case. Holding grids are each. Memberships and coatings are separate from filter media. If you are ordering for more than one booth, send the list. Bulk pricing is quoted by phone. Eligible products can also be placed on a monthly subscription at checkout, with the discount shown there. The subscription terms have to be confirmed at checkout.',
    ],
  },
  {
    heading: 'When to change spray booth filters',
    paragraphs: [
      'Change intervals are not a single number on this site. Exhaust media loads with overspray. Intake and ceiling media load with dirt from the supply air. A busy collision booth and a low-volume industrial booth will not share a calendar even when they use the same nominal pad. Use the booth manual, the filter instructions, pressure or manometer readings taken the way the booth maker describes, and a visual check for bypass, damage, or a face that is packed shut.',
      'The published guidance on replacement is the same limit stated in the FAQ: there is no universal interval, and a filter purchase does not set the facility’s permit schedule. After a shop has a few documented cycles, the filter rotation program can ship media on that shop’s cadence. Enrollment is a quote, not an automatic add-on at checkout. The program page explains what to send.',
      'A 20 by 20 holding grid that is bent, missing tips, or the wrong depth is a different problem from a loaded pad. Replace the grid from the accessory product if the frame no longer holds the pad flat. Do not assume the next case of pads includes new grids.',
    ],
  },
  {
    heading: 'Spray booth filters and who makes the booth',
    paragraphs: [
      'People searching for a spray booth filters manufacturer are usually trying to match media to the company that built the booth, or to find who will sell the replacement. Those are different questions. PFS Spray Booths builds booths. PFS Filters, at the same Santa Rosa address, sells the replacement filters and related booth supplies. Booth maker names on this site, including Garmat, Accudraft, GFS, and Col-Met, identify the equipment being serviced. They are not a claim that PFS is that company, except for the PFS Spray Booths guide, which covers booths from the same organization.',
      'Media brands are a third name. An Andreae-style accordion, a Koch HEPA, a Parker pleat, or an AFC cube is identified on its product page. Order that record. Do not retitle it as a PFS-manufactured filter. Fiberglass arrestor pads in the catalog are listed as PFS Filters products with the sizes and pack counts on the variant. The page, not a search snippet, is the specification.',
      `Shipping is inside the United States. Prices on the site do not include shipping or freight. Checkout calculates the charge for the item, the quantity, and the destination. Unopened packages may be returned within five business days. The refund is reduced by shipping costs and a 25 percent restocking fee. Opened packages are not returnable. The policy is at ${origin}/returns. For a size that is not listed, or a booth model that is not in the directory, the contact form asks for booth make and model, dimensions, stage, and quantity.`,
    ],
  },
];

export const georgiaSections = [
  {
    heading: 'Spray booth filters shipped to Georgia',
    paragraphs: [
      'PFS Filters does not have a Georgia storefront. The company is at 1400 Airport Blvd, Santa Rosa, CA 95403, in the United States, and the phone number is 855-496-7969. Spray booth and paint booth filters are ordered on pfsfilters.com and shipped within the United States. A shop in Georgia uses the same catalog, the same product pages, and the same fitment notes as a shop in any other state.',
      'The service area published for this store is online orders across the United States. Booth sales and booth service are handled by PFS Spray Booths, the parent operation at the same Santa Rosa address. This page does not add a Georgia warehouse, a Georgia phone number, or a local delivery route. If a Georgia shop needs a size that is not on the product page, the request goes to the Santa Rosa team with the booth make, model, filter stage, and measured opening.',
      'What you can order from Georgia is the listed catalog: intake and tacky panels, ceiling diffusion media, fiberglass exhaust pads and rolls, Paint Pockets, accordion arrestors, holding grids, aerospace exhaust media, and the booth consumables on the consumables page. Stocked items are typically processed in one to two business days before the carrier transit to the destination. Freight and custom orders are quoted. Checkout calculates shipping. Prices do not include that charge.',
      'Choosing the filter does not change because the booth is in Georgia. Identify the stage, measure the opening, and match the product record. The spray booth filters guide explains intake, ceiling, exhaust, and multi-stage media. The paint booth filters page covers filter walls and rolls in the same catalog. Brand guides list model rows for booth makers. None of those rows is a promise that a Georgia installer has already confirmed the booth. The installed label and the opening still decide the variant.',
      'Returns follow the published policy regardless of destination state. Unopened packages may be returned within five business days. Shipping costs and a 25 percent restocking fee are deducted from the refund. Opened packages are not eligible. Call 855-496-7969 before sending a package back to Santa Rosa. The contact form is the other path for a quote, a missing size, or an order question. Include the order number when the question is about a shipment already placed.',
    ],
  },
];

export const georgiaFaqs = [
  {
    question: 'Does PFS Filters have a location in Georgia?',
    answer: 'No. PFS Filters is at 1400 Airport Blvd, Santa Rosa, CA 95403. Spray booth filters are sold online and shipped within the United States, including to Georgia. There is not a separate Georgia address or phone number.',
  },
  {
    question: 'How does a Georgia shop order spray booth filters?',
    answer: 'Order from the product pages on pfsfilters.com. Stocked items are typically processed in one to two business days, and checkout calculates shipping. For a size that is not listed, call 855-496-7969 or use the contact form with the booth model, stage, and dimensions.',
  },
];

function words(sections, faqs = []) {
  const text = [
    ...sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export const thinPageSupplements = {
  '/contact': [
    {
      heading: 'What to send PFS Filters',
      paragraphs: [
        'PFS Filters is at 1400 Airport Blvd, Santa Rosa, CA 95403. The phone number on the contact page is 855-496-7969. The form asks for first name, last name, email, and a description. Phone and company are optional. The description box is the place for a quote or an order question. For a quote, include the booth make and model, the filter dimensions, whether the stage is intake or exhaust, and the quantity. For an order that is already placed, include the order number.',
        'The same Santa Rosa team handles sizes that are not on a product page, custom cuts, and freight. Stocked catalog items are typically processed in one to two business days. That processing note is not a promise about carrier transit, and it does not cover freight, custom work, or special orders. Shipping is calculated at checkout. The price on a product page does not include shipping or freight.',
        'Use the contact page when the filter finder and the brand directory do not resolve the part. A useful message names the booth manufacturer, the model if it is on the equipment tag, the position of the filter, and the measured opening. A photo of the label and of the frame helps the review. Part numbers that are not in the cross reference are not in the current online catalog, so the message should say the number is unlisted rather than asking the site to invent a match.',
        'PFS Filters ships within the United States from the Santa Rosa address. The contact page does not publish a second office. Booth construction questions that belong to PFS Spray Booths can still start here, because the filter store and the booth builder share the address and the phone number above. Filter orders themselves are placed on the product pages. The contact form is for the cases the cart cannot answer: an unlisted size, a bulk list, or a shipment question.',
        'Returns are not started by guessing a ship-back address. The returns policy says to call 855-496-7969 before sending an unopened package. Opened packages are not returnable. Unopened packages have a five-business-day window, and the refund deducts shipping costs and a 25 percent restocking fee. Put that request in the description if you are writing instead of calling, and keep the package closed until the team confirms the return.',
        'Membership, filter rotation, and scanner questions can also come through this form. Name the booth count and the stages you stock if you want a rotation quote. The membership page lists Bronze, Silver, Gold, and Platinum plan details separately. Do not use the contact form to change a price that checkout has already shown. Checkout is the price of record for an order.',
      ],
    },
  ],
  '/consumables': [
    {
      heading: 'Booth supplies sold next to the filters',
      paragraphs: [
        'The consumables page lists three supplies that are not exhaust or intake media. The PFS paint booth absorbent mat roll is a 32 inch by 50 foot blue universal mat for work areas, maintenance zones, and general spill control. The product text says it can be cut to suit the work area. The catalog price on that product is 191.70 USD. Confirm the product page before ordering, because prices can change.',
        'PFS VITRA is a washable glass shield coating for paint booth windows. The consumables card prices it at 80.00 USD. The product description says it is applied to protect glass from overspray and that it is washed off. The longer explanation is on the VITRA page and on the product record pfs-vitra. It is a coating, not a ceiling blanket and not an exhaust pad.',
        'PFS VANGUARD is the complete booth protection kit. The consumables card prices the kit at 595.00 USD and says it includes booth coating and glass shield coating. The kit page and the product record pfs-vanguard-complete-booth-protection-kit repeat that the kit contains those two coatings. It does not list filters, holding grids, or a booth model. Order filters from the filter categories even when the kit is in the same cart.',
        'These three items sit beside the filter catalog because a booth needs media and it also needs a way to keep floors and glass workable. They are not substitutes for a filter stage. An absorbent mat does not capture overspray in the exhaust wall. Glass coating does not diffuse air through a downdraft ceiling. If the job is a loaded filter, use the paint booth filters guide, the spray booth filters guide, or the shop.',
        'Stocked items are typically processed in one to two business days. Shipping is calculated at checkout and is not included in the prices above. Unopened returns follow the five-business-day policy, less shipping and a 25 percent restocking fee. Opened coatings and opened mat rolls are not described as returnable. Call 855-496-7969 at 1400 Airport Blvd, Santa Rosa, CA 95403 if a quantity or a freight shipment needs a quote before checkout.',
      ],
    },
  ],
  '/consumables/pfs-vitra': [
    {
      heading: 'PFS VITRA glass shield coating',
      paragraphs: [
        'PFS VITRA is the washable glass shield coating listed at 80.00 USD on the consumables page and on the product record pfs-vitra. The product description calls it a professional-grade coating for paint booth windows and glass, meant to take overspray so the glass can be cleaned by washing the coating off. The page sells it as a single default variant. It is not sold as a set of filter sizes.',
        'Use it on the viewing glass the product describes. It does not replace intake panels, ceiling diffusion media, or exhaust arrestors. A booth that needs a new filter wall still orders pads, rolls, or accordion media from those categories. VITRA is the glass coating. The VANGUARD kit is the separate product that pairs a booth coating with a glass shield coating, priced on its own page at 595.00 USD.',
        'The VITRA page points at the same Shopify variant used by the product page. Adding it to the cart from either URL is the same item. Confirm the live price on the product page before a large order. The figure on this page is the catalog price recorded for that variant, not a quote for freight.',
        'Application details on the page are limited to what the product text says: it is applied to glass, and it is washed off. The page does not publish coverage rate, dry time, or a film thickness. Do not infer those numbers. If the job needs a coverage estimate, call 855-496-7969 and ask from the Santa Rosa team rather than scaling a guess from the gallon image.',
        'Stocked items are typically processed in one to two business days. Checkout calculates shipping inside the United States. The company address is 1400 Airport Blvd, Santa Rosa, CA 95403. Returns of unopened packages are available within five business days, minus shipping costs and a 25 percent restocking fee. Opened packages are not eligible. Related filter orders, if the glass work is part of a booth refresh, belong in the same checkout only as separate line items from the filter catalog.',
      ],
    },
  ],
  '/consumables/pfs-vanguard': [
    {
      heading: 'What the VANGUARD kit contains',
      paragraphs: [
        'PFS VANGUARD is the complete booth protection kit priced at 595.00 USD on the consumables page. The product record is pfs-vanguard-complete-booth-protection-kit. The page states that the kit contains two coatings: premium booth coating and glass shield coating. Those are the only contents named. The kit does not include fiberglass pads, rolls, tacky panels, ceiling blankets, or holding grids.',
        'The glass shield coating is the same kind of product described on the VITRA page, which is also sold on its own at 80.00 USD. Buying VITRA does not include the booth coating. Buying VANGUARD is the kit of both, at the kit price. Choose the kit or the single coating from the product titles. Do not add both and assume one discounts the other unless checkout shows that discount.',
        'The page says the coatings are for professional paint booth operators and that the included application instructions should be followed. It does not print those instructions, a mix ratio, or a coverage number on the web page. Treat anything beyond “booth coating plus glass shield coating” as not stated. Call 855-496-7969 if the question is whether the kit matches a specific booth surface.',
        'Filters are a separate purchase. A booth protection kit does not change the exhaust wall, the intake bank, or the ceiling grid. After coatings, the filter order is still the stage and the measured size on the paint booth filters and spray booth filters guides. The absorbent mat roll, at 191.70 USD for the 32 inch by 50 foot roll, is the third consumable and is also separate from this kit.',
        'Stocked processing is typically one to two business days. Shipping is calculated at checkout and is not included in the 595.00 USD price. The ship-from address is 1400 Airport Blvd, Santa Rosa, CA 95403. Unopened returns use the five-business-day window, less shipping and a 25 percent restocking fee. Opened kits are not eligible under the published returns policy. The phone number for a freight quote or an unlisted question is 855-496-7969.',
      ],
    },
  ],
  '/returns': [
    {
      heading: 'How the published return rules work',
      paragraphs: [
        'The returns page and the terms of service describe the same rule. Opened packages are not eligible for return. Unopened packages may be returned within five business days. The refund is reduced by shipping costs and by a 25 percent restocking fee. Shipping and handling fees themselves are listed as non-refundable. Call 855-496-7969 before sending a package, and include the order number, the reason, and confirmation that the package is unopened.',
        'The five business days are the window stated on the page. The page does not add a longer window for freight, for Georgia or any other state, or for a filter that was the wrong size because the opening was not measured. If the package is open, the policy says it is not returnable. Contact the Santa Rosa team about damage or a shipment discrepancy from the terms’ shipping section, which asks you to call promptly so carrier records can be reviewed. That review is not the same thing as the unopened-return refund.',
        'Checkout is where shipping is charged. Product prices do not include shipping or freight. Because return shipping is the customer’s responsibility under this policy, the structured data on product pages uses the return-fee value for customer-paid return shipping, and it records the 25 percent restocking fee separately. There is not a free-return offer on the policy page.',
        'Refunds, when approved, go back to the original payment method. The page says PFS will notify you of approval or rejection after the return is received and inspected. It does not promise a same-day refund or a label. Do not ship a return to a guessed address. The contact path is the phone number above, at 1400 Airport Blvd, Santa Rosa, CA 95403.',
        'Filters, coatings, mats, and accessories follow this policy as a store rule. The page does not carve out holding grids, VITRA, VANGUARD, or aerospace bags as exceptions. Membership plans are a different purchase. Questions about a membership charge belong with the order number in a call or the contact form, not with an assumption that a digital or service plan uses the unopened-package rule. The terms page repeats the five-day unopened rule and links back here.',
      ],
    },
  ],
  '/product/20x20-paint-arrestor-holding-grids-w-tips-each': [
    {
      heading: '20 by 20 paint arrestor holding grids',
      paragraphs: [
        'This product is the 20 inch by 20 inch paint arrestor holding grid with tips, sold individually. The catalog description calls it a durable metal holding grid for 20 by 20 paint arrestor filters, with protective tips for handling and for holding the filter. The product type is Accessories. The recorded price is 7.06 USD. Confirm the product page, because that price is the catalog snapshot and checkout is the charge.',
        'The grid is not the filter. Fiberglass paint arrestor pads in 20 by 20 sizes are separate products, sold by the case, in 15-gram and 22-gram versions. Ordering a case of pads does not add this grid unless the cart line says so. Ordering the grid does not add pads. A filter wall needs both the frame hardware and the media if the existing grid is damaged or missing.',
        'Use this grid where the opening and the pad are the 20 by 20 size the title states. It is not the ceiling diffusion blanket, and it is not a roll. Rolls and pads of fiberglass load in the exhaust bank. The grid is the accessory that holds a pad. If the frame in the booth is a different nominal size, this SKU is the wrong part. Call 855-496-7969 with the measured opening rather than forcing a 20 by 20 grid into another bank.',
        'Tips are part of the product name. The description says they are for safe handling and secure placement. The page does not list a tip count, a metal gauge, or a depth beyond the 20 by 20 face. Do not add those specifications. If a booth drawing asks for a depth this page does not show, treat the grid as unconfirmed and ask Santa Rosa.',
        'PFS Filters ships from 1400 Airport Blvd, Santa Rosa, CA 95403, within the United States. Stocked items are typically processed in one to two business days. Shipping is calculated at checkout and is not included in the 7.06 USD price. Unopened returns are allowed within five business days, less shipping and a 25 percent restocking fee. The exhaust filter guide and the spray booth filters page explain how pads, rolls, and this grid relate on a filter wall.',
      ],
    },
  ],
  '/product/pfs-vitra': [
    {
      heading: 'PFS VITRA product record',
      paragraphs: [
        'The pfs-vitra product is PFS VITRA, a washable glass shield coating. The catalog description says it protects paint booth windows and glass from overspray and that it is easy to apply and remove. The recorded price is 80.00 USD. The product type is Accessories. The consumables page links to a longer VITRA page at the same price and names the same item.',
        'This record is one default variant, not a matrix of filter sizes. There is no 20 by 20 or roll width to choose. Quantity is how many units to add. It does not change a booth’s intake, ceiling, or exhaust stage. Shops that found this URL while looking for spray booth filters still need the filter categories for media. VITRA is the glass coating only.',
        'The VANGUARD kit is a different handle, pfs-vanguard-complete-booth-protection-kit, at 595.00 USD, and it names both a booth coating and a glass shield coating. This VITRA record is the glass coating on its own. Adding both SKUs duplicates the glass coating unless that is intentional. The cart is the list that matters.',
        'The product text does not state coverage per container, dry time, or compatibility with a specific glass coating already in the booth. Those details are not invented here. The image and the 80.00 USD price are what the catalog shows. For a coverage question, call 855-496-7969.',
        'Shipping is extra and is calculated at checkout. Processing for stocked items is typically one to two business days from 1400 Airport Blvd, Santa Rosa, CA 95403. Unopened packages can be returned within five business days. The refund deducts shipping costs and a 25 percent restocking fee. Opened packages are not returnable. The returns page and the terms page are the policy. The spray booth filters guide is the page for the air filters this coating does not replace.',
      ],
    },
  ],
  '/shop-by-booth/marathon-finishing': [
    {
      heading: 'Marathon Finishing booth filters',
      paragraphs: [
        'Marathon Finishing is listed in the PFS Filters booth directory as a United States manufacturer focused on heavy-duty and large-vehicle spray booths for fleet, truck, and industrial work. The directory is a guide for organizing a filter review. It is not a fitment guarantee. Confirm the equipment tag, the filter stage, and the measured opening before ordering.',
        'The directory records three model rows. Standard Downdraft lists ceiling sizes 48 by 108 inches and 51 by 128 inches, exhaust at 20 by 25 inches, and a prefilter at 24 by 24 by 2 inches. Truck Booth lists a ceiling of 59 by 149 inches, exhaust at 20 by 25 inches, and the same prefilter size. Industrial lists a ceiling of 51 by 128 inches and exhaust at 20 by 25 inches, with no prefilter size on that row. If the installed booth does not match a row, do not force the nearest ceiling blanket.',
        'The directory also lists replacement-cycle notes for this brand: intake 25 to 40 days, exhaust 60 to 90 days, and ceiling 4 to 8 months. Those figures are the directory’s notes for Marathon, not a universal PFS interval and not a permit schedule. The FAQ on this site still says there is no single replacement interval. Use the booth manual, pressure readings, and the actual spray load, and treat the directory cycle as a published note to verify.',
        'Catalog media for those stages is the same store used for other brands. Exhaust at 20 by 25 inches points at the fiberglass pad and roll products that offer that size, after you confirm the construction. Ceiling blankets are on the ceiling and diffusion product pages, and only the sizes those pages actually sell can be ordered online. A 59 by 149 inch ceiling that is not a listed variant is a call to 855-496-7969, not a trimmed stock blanket.',
        'PFS Filters is at 1400 Airport Blvd, Santa Rosa, CA 95403, and ships within the United States. Marathon is not described as a PFS brand. The name is the booth maker being serviced. Other booth guides are linked from the shop-by-booth index, including Garmat, Accudraft, Col-Met, Global Finishing Solutions, Blowtherm, and PFS Spray Booths. The spray booth filters page explains the stages those guides refer to.',
      ],
    },
  ],
  '/memberships': [
    {
      heading: 'Membership plans shown on this page',
      paragraphs: [
        'The memberships page lists four plans. Bronze is 29 USD per month, described as 6 percent off orders, with priority phone support, filter change reminders, and order history. The page says it fits shops spending about 300 to 600 USD per month. Silver is 49 USD per month, described as 8 percent off, and adds a booth filter database and auto-reorder scheduling. The page says it fits about 600 to 1,200 USD per month and marks Silver as the popular plan.',
        'Gold is 79 USD per month, described as 10 percent off, with a dedicated account manager, AI filter scanner access, the booth filter database, auto-reorder scheduling, and a monthly filter set included. The spend note on the page is about 1,200 to 2,500 USD per month. Platinum is 149 USD per month, described as 10 percent off plus free shipping, with custom filter sourcing, a dedicated account manager, AI filter scanner access, the full booth filter database, auto-reorder scheduling, and a monthly filter set. The page aims Platinum at high-volume shops and custom sourcing.',
        'Those prices and feature lists are what the membership page displays. They are not the same thing as a filter’s product price. A separate Subscribe and Save option on eligible filter variants is 5 percent off and is confirmed at checkout. Do not mix that 5 percent product subscription with the membership percentages. The plan you add is the plan whose card you used.',
        'The Platinum product handle is not a public filter page. Membership signup on this page adds the plan variant to the cart. Filter media are still ordered from the shop. A membership discount, where the page states one, applies to orders as that card describes. It does not change the returns rule: unopened packages within five business days, less shipping and a 25 percent restocking fee, and opened packages not returnable. Free shipping is named only on the Platinum card, not on Bronze, Silver, or Gold.',
        'Questions about which plan matches a shop go to 855-496-7969 or the contact form. The address is 1400 Airport Blvd, Santa Rosa, CA 95403. The filter scanner page describes a photo review that narrows candidates and does not prove fitment. Scanner access is listed on the Gold and Platinum cards. The filter rotation program is a separate quote for shipping media on a booth cadence. Read the card you intend to buy before checkout, because the feature list above is only as long as the page makes it.',
      ],
    },
  ],
  '/aerospace': [
    {
      heading: 'Aerospace media in the catalog',
      paragraphs: [
        'The aerospace page is the catalog view for aircraft finishing and MRO filtration media sold by PFS Filters. The page names HEPA-XFP multi-pocket bags, NESHAP 319 final-stage filters, CG100 two-pocket bags, ME/PT intake panels, SFR blankets, and CPA roll media. Those names match product records in the snapshot, including 20 by 20 and 24 by 24 HEPA-XFP six-pocket bags, NESHAP 319 panels and bags in the sizes the titles state, a CG100 two-pocket bag, an ME/PT 20 by 20 panel, a Volz SFR ceiling blanket, and a CPA polyester overspray roll. Open the product page for the pack count and the price. This page does not repeat every price.',
        'Some of those product descriptions quote a manufacturer efficiency, such as a HEPA figure on 0.3 micrometer particles. That sentence belongs to the product record that states it. It is not a PFS claim that every item in the aerospace collection meets the same number, and it is not a statement that installing the filter makes a hangar compliant. The NESHAP guide says a filter by itself does not establish compliance with Method 319 or Subpart HHHHHH.',
        'Standard fiberglass arrestor pads and rolls remain the exhaust products for many automotive and industrial booths. They are not automatically the final stage of an aerospace stack. Use the aerospace product titles when the booth documentation calls for that media, and use the exhaust and roll categories when the booth uses paint arrestors. The industries aerospace guide is the longer explanation. This page is the product grid.',
        'Selection still starts with the stage and the measured size. A 20 by 20 panel and a 24 by 24 bag are different SKUs. Pocket count is in the title. If the housing depth or the header style is not in the title, do not assume it. Call 855-496-7969 at 1400 Airport Blvd, Santa Rosa, CA 95403 with the housing measurement and a photo of the label.',
        'Stocked items are typically processed in one to two business days. Shipping is calculated at checkout for United States destinations and is not included in the product price. Unopened returns follow the five-business-day policy, minus shipping and a 25 percent restocking fee. The spray booth filters page explains how multi-stage exhaust relates to ordinary arrestors without turning a product name into a compliance certificate.',
      ],
    },
  ],
  '/filter-scanner': [
    {
      heading: 'What the filter scanner does and does not do',
      paragraphs: [
        'The filter scanner is a photo review. The page says to photograph the existing filter, including the front, the back, or the label, and that image analysis can narrow catalog candidates. It also says the photo does not prove fitment. The booth position, the label, and the measured opening still have to be checked before an order. A lookalike pad is not a match.',
        'The steps on the page are to take the photo, review the candidates, and then order only after the size and the stage are confirmed. There is no published accuracy rate, and this copy does not add one. If the candidates do not include the filter in your hand, use the filter finder or call 855-496-7969 with the booth make, model, stage, and dimensions.',
        'AI filter scanner access is listed as a feature on the Gold membership at 79 USD per month and the Platinum membership at 149 USD per month. Bronze and Silver cards on the membership page do not list scanner access. The scanner page itself is the explanation of the photo flow. Membership billing is separate from the price of the filter you eventually buy.',
        'The scanner is not a substitute for the part-number cross reference or the booth brand guides. A readable AF code on an accordion filter should be compared with the Andreae variant list. A gram weight on a fiberglass pad should be compared with the 15-gram and 22-gram products. The photo can point at a short list. The variant title is the order.',
        'PFS Filters is at 1400 Airport Blvd, Santa Rosa, CA 95403, and ships filters within the United States. Stocked items are typically processed in one to two business days after the correct product is in the cart. Shipping is calculated at checkout. The spray booth filters and paint booth filters guides explain the stages a photo might be showing: intake, ceiling, or exhaust. Returns of the wrong filter still follow the unopened-package rule if the package was not opened.',
      ],
    },
  ],
  '/product/pfs-vanguard-complete-booth-protection-kit': [
    {
      heading: 'PFS VANGUARD kit product record',
      paragraphs: [
        'This product is the PFS VANGUARD complete booth protection kit. The catalog description says the kit includes two products, a premium booth coating and a glass shield coating, to help keep a spray booth’s surfaces and viewing glass in workable condition. The recorded price is 595.00 USD. The product type is Consumables. The consumables page and the VANGUARD page describe the same kit at that price.',
        'The contents named are those two coatings. The record does not list a filter assortment, a holding grid, an absorbent mat, or a booth model. The glass coating sold alone is PFS VITRA at 80.00 USD under handle pfs-vitra. The kit is the pair. Order the kit when you want both coatings under this title. Order VITRA when you only want the glass shield coating.',
        'The VANGUARD page says to follow the included application instructions and that the kit is for professional paint booth operators. The web page does not reprint coverage, mix ratio, or dry time. Those numbers are not added here. If the instructions in the package and a question you have do not match, call 855-496-7969 before applying the product to a booth.',
        'Filters for the same booth are separate catalog items. Intake panels, ceiling blankets, exhaust pads, rolls, and accordion arrestors are chosen by stage and measured size on the spray booth filters and paint booth filters pages. A protection kit does not change which of those media the booth uses. The absorbent mat roll at 191.70 USD for 32 inches by 50 feet is another consumable, not part of this kit.',
        'Shipping is calculated at checkout and is not included in the 595.00 USD price. Stocked items are typically processed in one to two business days from 1400 Airport Blvd, Santa Rosa, CA 95403, for shipment within the United States. Unopened packages may be returned within five business days, less shipping costs and a 25 percent restocking fee. Opened packages are not returnable. Confirm the live variant on this product page before checkout.',
      ],
    },
  ],
};

export function supplementWordCount(pathname) {
  const blocks = thinPageSupplements[pathname] || [];
  return words(blocks);
}

export function sprayBoothWordCount() {
  return words(sprayBoothSections, sprayBoothFaqs);
}

export function georgiaWordCount() {
  return words(georgiaSections, georgiaFaqs);
}
