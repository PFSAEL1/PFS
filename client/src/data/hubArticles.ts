export type HubFaq = { question: string; answer: string };
export type HubArticle = {
  id: string;
  heading: string;
  paragraphs: string[];
  faqs: HubFaq[];
};

const exhaustSizes = '22-gram fiberglass pads are listed as 20x25x2 (50 per case), 20x20x2 (100 per case), and 24x24x2 (50 per case). 15-gram fiberglass pads are listed as 20x20x2 and 20x25x2 in 50- and 100-count cases, 24x24x2 in 50- and 100-count cases, and 26x48x2 (8 per case). 22-gram rolls are listed at 20, 25, 28, 30, 32, 36, and 41 inch widths, in 100-inch or 300-inch lengths where the product page shows that width. 15-gram rolls are listed at 20, 22, 25, 28, 30, 32, and 36 inch widths, in 100-foot or 300-foot lengths where shown. Paint Pockets variants are 20x20 (30 per case), 20x25 (30 per case), 24x24 (20 per case), and a 45 inch by 50 foot roll. Andreae-style accordion variants on the same catalog product are AF213 20x20 (40 per case), AF223 20x20 (28 per case), AF413 20x25 (36 per case), AF423 20x25 (24 per case), AF813 and AF923 36 inch by 30 foot rolls, AF113 40 inch by 32 foot 10 inch, and AF123 40 inch by 26 foot 3 inch. Koch SprayStop STK-10 is a 61 inch by 90 foot roll. The AFC two-pocket blue polyester exhaust cube is nominal 20x20x15 inches, sold as a case of six, with no galvanized header; the catalog record identifies AFC number C2PPEB202015-6 and tags the media MERV 11.';

const intakeSizes = '300 Series tacky panels are listed as 20x20 (20 per case), 20x25 (20 per case), 24x24 (20 per case), 20x50 link panels (10 per case), 20x72 link panels (6 per case), and 20x48 single-frame panels (10 per case). 5KR1 Series premium intake panels are listed as 20x20 in 20- and 24-count cases, 20x25 (20 per case), 24x24 (20 per case), and 20x50 in 12- and 10-count cases. MERV 10 pleated filters are listed as 16x20x2 and 16x25x2 (12 per case), 20x20x2 and 20x25x2 (12 per case), 24x24x2 (12 per case), and 24x20x4 and 24x24x4 (6 per case). The six-pocket bag is one size: 23.25 by 47 by 8 inches, four per case. Parker LoadTECH MERV 14 is a 20x20x4 inch single-header rigid cell, Parker part 1136513, model PLT4-M14-13-PH, sold as a case of three under PFS SKU PFS-PLT4-M14-13-PH. The aerospace catalog product also lists 20x20 ME/PT intake panels, 20x20 and 20x25 NESHAP 319 final-stage panels, and several pocket bags. Those aerospace variants are separate from ordinary tacky panels and should be matched to the equipment record, not substituted by name alone.';

const ceilingSizes = 'L560 ceiling diffusion media is listed in these catalog variants: 58x58 (3 per case), 37x64 (8 per case), 36.75x54 (12 per case), 48x66 (6 per case), 26x120 (9 per case), 51x128 (6 per case), 60x120 (2 per case), 38x102 (7 per case), 59x149 (4 per case), 36x144 (8 per case), and single pieces at 38x62, 38x107, 48x108, and 38x67. Swiss Flow 600G downdraft media is listed as 36x108 (1 per case), 36x109 (2 per case), 24x66 foot, 26x66 foot, and 48x66 foot master rolls, plus 33x45.5 (18 per case), 36.75x54 (12 per case), 37x64 (8 per case), 39x59 (3 per case), 40x100 (4 per case), 44x50 (10 per case), 81x144 (4 per case), 38x102 (7 per case), 59x149 (4 per case), 36x144 (8 per case), and single pieces at 38x62, 38x107, 48x108, and 38x67. A size printed on a booth drawing is not a substitute for measuring the blanket that is in the grid today.';

export const hubArticles: Record<string, HubArticle> = {
  'paint-booth-filters': {
    id: 'paint-booth-filters',
    heading: 'How to choose paint booth filters from the current catalog',
    paragraphs: [
      'Paint booth filters are chosen by stage, not by a single part name. Intake media treats air before it reaches the finish. Ceiling diffusion media spreads that air across a downdraft or semi-downdraft plenum. Exhaust media, including fiberglass arrestors, Paint Pockets, accordion filters, and pocket cubes, sits on the outlet side and holds overspray. A prefilter, when the booth manual calls for one, is a first stage ahead of a later blanket or bag. PFS Filters lists those stages separately so a 20x20 pad is not ordered when the opening is a ceiling blanket or a roll.',
      'The practical starting point is the installed filter, not a marketing category. Record the booth manufacturer and model, the position in the booth, the label or part number, and the width, height, and thickness. Nominal sizes such as 20x20 often differ from the actual cut. The product pages on this site show the variants currently in the Shopify catalog, including case quantity. If a size is missing, the product text says to call 855-496-7969 rather than invent a custom cut online.',
      `Exhaust sizes in the catalog today are specific. ${exhaustSizes} Holding grids for 20x20 arrestor pads are sold individually and are an accessory, not the filter media.`,
      `Intake and ceiling sizes are a different list. ${intakeSizes} ${ceilingSizes}`,
      'Stocked orders are generally processed in one to two business days. Freight, custom sizes, large rolls, and special-order items can take longer. Shipping cost is calculated at checkout and is not included in the product price unless a membership offer on that account says otherwise. Opened packages are not returnable. Unopened packages may be returned within five business days for a refund less shipping costs and a 25 percent restocking fee. Call before sending a return.',
      'Eligible variants can be placed on a monthly Subscribe and Save plan when Shopify shows a recurring selling plan for that exact variant. The discount shown at checkout is the discount that applies. The site does not add a subscription option that the product record does not confirm.',
      'No filter in this catalog, by itself, makes a spray booth compliant with NESHAP Subpart 6H, EPA Method 319, a California air-district permit, or an OSHA ventilation rule. Those obligations depend on the whole booth, the coatings, the installation, and the records the facility keeps. Use the NESHAP guide for the distinction between exhaust arrestors and aerospace Method 319 evidence, and use the booth-brand pages only as a starting map of models and stages.',
      'PFS Filters is at 1400 Airport Blvd, Santa Rosa, California 95403, and is part of PFS Spray Booths. The phone number for fitment questions and bulk lists is 855-496-7969. A useful request includes the booth make and model, the stage, both nominal and actual dimensions, the current part number if the label is readable, the quantity, and a photo of the installed filter. Part numbers that are not in the cross-reference, including searches such as fil-epp-2020-w, are not in the current online catalog.',
    ],
    faqs: [
      {
        question: 'Which paint booth filter stage should I order first?',
        answer: 'Order the stage that is loaded or due: intake, ceiling, exhaust, or a documented prefilter. Match the dimensions and media on the product page to the filter you are removing.',
      },
      {
        question: 'Where are the sizes listed?',
        answer: 'Each product page lists the variants in the current catalog, including pad, roll, blanket, and case counts. This guide repeats only those published sizes.',
      },
      {
        question: 'Can PFS confirm a booth model that is not linked to a single SKU?',
        answer: 'Yes. Send the model, stage, dimensions, and any part number to 855-496-7969. The brand guides are a starting point, not a guaranteed fit.',
      },
    ],
  },
  exhaust: {
    id: 'exhaust',
    heading: 'Exhaust filter sizes and media in the PFS catalog',
    paragraphs: [
      'Exhaust filters capture paint overspray on the outlet side of a spray booth, before air reaches the plenum, fan, and stack. They are not intake panels and they are not ceiling diffusion blankets. PFS Filters groups the exhaust-stage products that the catalog actually identifies: fiberglass paint arrestor pads and rolls, Paint Pockets, Andreae-style accordion media, the Koch SprayStop STK-10 roll, and the AFC two-pocket blue polyester cube.',
      exhaustSizes,
      'Gram weight is part of the product name, not a performance certificate. The 15-gram and 22-gram fiberglass products are separate listings with their own case packs. A heavier pad is not automatically the right replacement if the booth, the frame, and the current filter are the 15-gram size. Rolls and pads of the same gram weight are also different SKUs. A 20x20 pad does not convert to a 20-inch roll without checking the product page.',
      'Paint Pockets media in this catalog is described as progressive-density fiber with a white side and a green side that indicates airflow direction. Andreae-style accordion filters are a different construction. The AF213 and AF223 pads are 20x20. The AF413 and AF423 pads are 20x25. The AF813, AF923, AF113, and AF123 items are rolls. High-efficiency and standard accordion codes are both listed; the code on the existing filter is the one to match.',
      'The Koch SprayStop STK-10 roll is 61 inches by 90 feet, PFS SKU PFS-STKM6190. The product record describes red and purple synthetic media for paint-booth exhaust and related blanket applications, coarse on the air-entering side. The AFC cube is a two-pocket blue polyester exhaust filter, nominal 20 by 20 by 15 inches, no galvanized header, case of six. Its catalog tags include MERV 11. That tag is the product record, not a claim that every exhaust pad on this page is MERV 11.',
      'Frames and holding grids are separate. The 20x20 paint arrestor holding grid with tips is sold each, as an accessory. Ordering pads does not include the grid unless the cart says so. Measure the frame opening if the pad that comes out does not match a listed variant. The fiberglass product text says to call when the size is not listed.',
      'Replacement timing is not a fixed week count. Follow the booth and filter instructions, the pressure or manometer reading the manufacturer specifies, and what you see on the filter face. Visible overspray loading, bypass at the edges, or paint past the filter are reasons to change that stage. Intake and ceiling filters can be due on a different day.',
      'Shipping for stocked exhaust media is typically processed in one to two business days, with freight and special sizes taking longer. Price on the page does not include shipping. Unopened returns are limited to five business days and a 25 percent restocking fee, and opened packages are not accepted. Nothing on this page is a NESHAP certificate. Subpart 6H and Method 319 are explained on the NESHAP guide, and a filter purchase does not close a permit obligation.',
    ],
    faqs: [
      {
        question: 'Are exhaust filters the same as intake filters?',
        answer: 'No. Exhaust filters are for the overspray stage. Intake panels, pleats, and ceiling blankets are for incoming air. Use the stage marked on the booth and on the product.',
      },
      {
        question: 'Which exhaust sizes can I order online?',
        answer: 'Only the variants printed on the product pages, including the 15-gram and 22-gram pads and rolls, Paint Pockets, Andreae codes, the STK-10 roll, and the 20x20x15 AFC cube listed above.',
      },
      {
        question: 'Does an exhaust filter make the booth NESHAP compliant?',
        answer: 'No. Compliance depends on the rule that applies, the whole booth, installation, coatings, and records. PFS can help identify media; the facility confirms its own obligation.',
      },
    ],
  },
  intake: {
    id: 'intake',
    heading: 'Intake filter sizes and where they sit in the booth',
    paragraphs: [
      'Intake filters clean air before it enters the spray area. On a crossdraft booth they often sit in the doors or the inlet wall. On a downdraft booth the inlet path can include a prefilter, a bag or pleated cell, and a ceiling diffusion blanket. Those are different products. This page covers the intake-stage media in the PFS catalog: tacky panels, the 5KR1 panel, MERV 10 pleats, the six-pocket bag, the Parker LoadTECH rigid cell, and the intake-related variants on the aerospace listing.',
      intakeSizes,
      'Tacky panels use an adhesive-treated medium to hold dust. The 300 Series listing includes both link panels and a single-frame 20x48 panel. The link and single-frame styles are not interchangeable just because the width is 20 inches. 5KR1 is a separate premium intake panel with its own case counts, including two different 20x20 case quantities and two 20x50 case quantities. Read the variant title before adding a case to the cart.',
      'The pleated listing is MERV 10, not a general MERV assortment. Depth matters: most of those variants are 2 inches, and the 24x20 and 24x24 variants in a 4-inch depth are six per case. A 2-inch pleat will not fill a 4-inch track. The six-pocket bag is a single 23.25 by 47 by 8 inch cell, four per case, described for intake and air-makeup use. It is not a 20x20 panel.',
      'Parker LoadTECH on this site is a MERV 14 rigid cell, 20 by 20 by 4 inches, with a 3/4 inch single header on the air-entering side. The manufacturer part in the product record is 1136513 and the model is PLT4-M14-13-PH. It is sold as a case of three. The photo is identified as a representative series image. Do not treat it as a MERV 10 pleat or as a tacky panel.',
      'Aerospace intake items live on the aerospace product, not on the tacky-panel product. That listing includes 20x20 ME/PT intake panels and NESHAP 319 final-stage panels in 20x20 and 20x25, plus pocket bags. Final-stage aerospace media is not an automatic substitute for a collision-shop tacky panel. If the equipment calls for a tested multi-stage pack, use the aerospace page and the Method 319 guide and send the specification to PFS.',
      'Ceiling diffusion media is intake air in a downdraft booth, but it is a blanket sized to the ceiling grid, not a 20x20 panel. Those sizes are on the ceiling filter page. Ordering a tacky panel for a ceiling pocket, or a ceiling blanket for a door bank, is a common mismatch. The filter you remove is the template.',
      'Stocked intake orders typically process in one to two business days. Shipping is calculated at checkout. The return rule is the same as the rest of the catalog: unopened packages within five business days, less shipping and a 25 percent restocking fee. There is no separate intake-filter warranty or efficiency number on this page beyond the MERV ratings the product records already state.',
      'If two products could fill the same opening, use the label on the filter you removed. A 20x20 tacky panel, a 20x20x2 MERV 10 pleat, and a 20x20x4 Parker cell share a face size and still differ in depth, media, and case count. The aerospace 20x20 ME/PT panel is another 20x20 item with a different job. Width and height alone are not a match.',
    ],
    faqs: [
      {
        question: 'What intake filters are actually in the catalog?',
        answer: '300 Series and 5KR1 tacky panels, MERV 10 pleats, a 23.25x47x8 six-pocket bag, Parker LoadTECH MERV 14 20x20x4 cells, and the intake variants on the aerospace product. Sizes are the ones listed on those pages.',
      },
      {
        question: 'Is MERV 13 a stocked pleat?',
        answer: 'The pleated product in the catalog is MERV 10. Parker LoadTECH on this site is MERV 14. The AFC exhaust cube is tagged MERV 11. Do not assume a MERV 13 pleat is listed.',
      },
      {
        question: 'Can I use an intake panel as an exhaust arrestor?',
        answer: 'No. Intake media and exhaust arrestors are specified for different stages. Match the position on the booth before ordering.',
      },
    ],
  },
  ceiling: {
    id: 'ceiling',
    heading: 'Ceiling filter sizes for downdraft diffusion media',
    paragraphs: [
      'Ceiling filters in a downdraft or semi-downdraft booth are diffusion blankets in the ceiling grid. They spread supply air across the booth. They are not the exhaust pads on the floor pit or the rear wall, and they are not the same item as a 20x20 tacky panel even when both are called intake. PFS Filters lists two ceiling products: L560 ceiling diffusion media and Swiss Flow 600G downdraft diffusion media.',
      ceilingSizes,
      'Several sizes appear on both products, including 36.75x54, 37x64, 38x102, 59x149, and 36x144. Same dimensions do not mean the blankets are the same media. The L560 product and the Swiss Flow 600G product are separate listings with separate case counts. A 37x64 L560 blanket is eight per case. The Swiss Flow 37x64 variant is also eight per case on its own product page, but it is still a different product name. Match the blanket that is in the booth, including any weight or series mark on the label.',
      'Master rolls are not cut blankets. Swiss Flow lists 24 inch, 26 inch, and 48 inch widths at 66 feet. Those rolls are one per case. The cut panels on the same product, such as 33x45.5 or 81x144, are different variants. If the booth uses blankets that were cut from a roll, measure the piece that fits the grid rather than ordering the master roll by habit.',
      'Single-piece variants are marked 1 per case on both products for 38x62, 38x107, 48x108, and 38x67. Case-packed sizes of the same nominal family can be a different line item. The cart should show the variant title, not only the product name Ceiling Diffusion Media or Swiss Flow.',
      'Brand guides on this site mention ceiling sizes for some models, including sizes that may not have an exact catalog variant. A model note is a clue. The product page is the orderable list. When the guide and the blanket in the grid disagree, send photos and measurements to PFS at 855-496-7969 before ordering. The ceiling product descriptions say the media is for spreading incoming air on downdraft booths. They do not publish a MERV rating for these two blankets, so this page does not add one.',
      'Installation still has to follow the booth maker. Blankets that are loose, torn, or smaller than the opening can let unfiltered air past the grid. That is a fit problem, not a reason to switch to exhaust fiberglass. Exhaust arrestors belong on the outlet stage.',
      'Fulfillment for stocked ceiling media follows the same rule as the rest of the shop: typically one to two business days to process, with freight and odd sizes taking longer. Shipping is extra unless checkout shows otherwise. Returns of unopened packages are five business days with shipping deducted and a 25 percent restocking fee.',
      'Downdraft and semi-downdraft booths are the configurations these two products describe. A crossdraft booth that only has door filters does not use a ceiling blanket unless the manufacturer added a plenum. Open-face and prep stations in the brand guides sometimes list a small ceiling size and sometimes do not. Read the model row, then the product variant. PFS is at 1400 Airport Blvd, Santa Rosa, CA 95403, if the grid size is between two listed cuts and you need a person to look at it.',
    ],
    faqs: [
      {
        question: 'Which ceiling products can I buy?',
        answer: 'L560 ceiling diffusion media and Swiss Flow 600G downdraft media, in the variants listed on those two product pages and repeated in this guide.',
      },
      {
        question: 'Are L560 and Swiss Flow interchangeable at the same size?',
        answer: 'Only if the booth and the installed blanket call for that media. Equal dimensions are not proof that the series matches. Compare the label before ordering.',
      },
      {
        question: 'What if my ceiling size is not listed?',
        answer: 'Call 855-496-7969 with the booth model and the measured blanket. The catalog does not show a custom-cut checkout for unlisted ceiling sizes.',
      },
    ],
  },
  andreae: {
    id: 'andreae',
    heading: 'Andreae accordion codes, sizes, and case counts',
    paragraphs: [
      'Andreae accordion paint arrestors in the PFS catalog are one product, Andreae Accordion Style Paint Arrestors, with eight variants. They are exhaust-stage media. The pleated paper path is a different construction from the 15-gram and 22-gram fiberglass pads and from Paint Pockets. Use the code printed on the filter you are replacing.',
      'Pad variants are AF213, 20x20, 40 per case; AF223 high-efficiency, 20x20, 28 per case; AF413, 20x25, 36 per case; and AF423 high-efficiency, 20x25, 24 per case. Roll variants are AF813, 36 inch by 30 foot, one per case; AF923 high-efficiency roll, 36 inch by 30 foot, one per case; AF113, 40 inch by 32 foot 10 inch, one per case; and AF123 high-efficiency roll, 40 inch by 26 foot 3 inch, one per case. Those quantities and dimensions are the variant titles in the catalog.',
      'High-efficiency codes (AF223, AF423, AF923, AF123) are not the same line item as the standard codes of the same face size (AF213, AF413, AF813, AF113). The case count changes with the code. AF213 is 40 per case and AF223 is 28 per case, both 20x20. Ordering the higher case count does not convert one code into the other.',
      'A 20x20 accordion pad does not replace a 20x20 fiberglass pad unless the booth and the current filter are the accordion style. Fiberglass pads in this catalog are 2 inches thick in the gram-weight listings. The accordion variant titles do not add a separate thickness the way the fiberglass titles do, so this page does not invent one. If the frame depth matters, measure the installed filter and compare it with the product page before you buy.',
      'Rolls need the width and the length. AF813 and AF923 are both 36 inch by 30 foot and are still different codes. AF113 is longer than AF123. A roll is one per case. Do not use the pad case counts for the rolls.',
      'The product description on the catalog item calls this an overspray arrestor with an accordion path. It does not state a MERV number, a NESHAP certificate, or a Method 319 test report for these eight variants. PFS does not add those claims here. Shops that need a documented efficiency for a permit should ask for the paperwork that applies to the exact media, not treat the product name as the paperwork.',
      'Price and availability stay on the product page and can change. Stocked orders typically process in one to two business days. Shipping is calculated at checkout. Unopened returns follow the five-business-day window, less shipping and a 25 percent restocking fee. If the code you have is not one of the eight variants above, call 855-496-7969 with a photo of the label rather than choosing the closest width.',
      'Fiberglass exhaust rolls in the wider widths, including 36 inch and 41 inch 22-gram rolls, are a different product from the 36 inch and 40 inch Andreae rolls. Paint Pockets also has a 45 inch by 50 foot roll. Shops sometimes replace an accordion roll with a fiberglass roll because the width is close. That changes the media and the way the frame is loaded. Keep the Andreae code if the installed filter is an accordion filter, and use the fiberglass or Paint Pockets product only when that is what the booth is using now.',
      'The accordion product is a single Shopify item with multiple variants, so the URL is /product/accordion-style-paint-arrestors. Choose the variant on that page. The cross-reference lists the AF codes that appear in those variant titles and links back to the same product. It does not add AF codes that are absent from the catalog. PFS Filters is at 1400 Airport Blvd, Santa Rosa, CA 95403. Stocked accordion variants follow the same one-to-two business day processing window as other stocked filters, and a missing code is a phone call, not a guessed substitute. Compare the green-and-white Paint Pockets airflow mark and the fiberglass gram-weight label the same way: the mark on the media decides the product, and the AF code decides the accordion variant. Measure the frame if the code is worn off, then match one of the eight catalog variants instead of a nearby fiberglass roll width.',
    ],
    faqs: [
      {
        question: 'Which Andreae codes does PFS list?',
        answer: 'AF213, AF223, AF413, AF423, AF813, AF923, AF113, and AF123, in the sizes and case counts in this guide. Other codes are not in the current catalog product.',
      },
      {
        question: 'Is AF223 the same as AF213?',
        answer: 'Both are 20x20 pads. AF223 is the high-efficiency variant and is packed 28 per case. AF213 is packed 40 per case. Match the code on the filter.',
      },
      {
        question: 'Will an Andreae filter satisfy NESHAP by itself?',
        answer: 'No. A filter does not make a facility compliant. Use the NESHAP guide for Subpart 6H and Method 319, and confirm any test evidence separately.',
      },
    ],
  },
  neshap: {
    id: 'neshap',
    heading: 'What Subpart 6H and Method 319 mean for filter orders',
    paragraphs: [
      'NESHAP means National Emission Standards for Hazardous Air Pollutants. Two different EPA programs are often mixed together in filter searches. Subpart 6H, 40 CFR Part 63 Subpart HHHHHH, is the area-source rule that covers defined paint-stripping and miscellaneous surface-coating operations, including many auto-body shops. Subpart GG, 40 CFR Part 63 Subpart GG, is the aerospace manufacturing and rework rule. EPA Method 319 is a laboratory method for measuring filtration efficiency of paint overspray arrestors. It is not a sticker that ships on every pad.',
      'The existing PFS explanation of Subpart 6H is narrow on purpose. Where the spray-booth filter provision applies, the rule is aimed at filter technology demonstrated to capture at least 98 percent of paint overspray, through the evidence path the rule describes. That is a facility obligation. It is not a sentence PFS can print on a fiberglass pad. The exhaust media in the catalog — 15-gram and 22-gram fiberglass, Paint Pockets, Andreae accordion codes, Koch SprayStop STK-10, and the AFC cube — are products you can review and buy. They are not, on this website, labeled as 6H-certified.',
      'Method 319 evidence has to point at the media or the multi-stage configuration that was tested, used in the conditions of that test. The aerospace catalog product lists NESHAP 319 final-stage panels at 20x20 and 20x25 (20 per case), five-pocket bags at 20x20x12 and 20x25x12 (6 per case), a 24x24x12 six-pocket bag (6 per case), two-pocket 15-inch bags at 20x20x15 and 20x25x15 (6 per case), a 53x112 SFR blanket (4 per bag), a 20x20x15 CG100 two-pocket bag (8 per case), HEPA-XFP six-pocket bags at 24x24x12 and 20x20x12 (5 per case), a 20x20 ME/PT intake panel (24 per case), and a 96 inch by 50 foot CPA roll. Those are variant names from that product. They are not a promise that each variant has its own Method 319 report on file with the order.',
      'PFS does not publish a test report number, a laboratory name, or a pass/fail result for those variants on this page. If a specification or a customer requires Method 319 paperwork, ask PFS for the documents that exist for the exact item. If the documents are not available, do not treat the product title as the document. The blog post on Method 319 states the same limit: a method reference is not a facility-wide compliance guarantee.',
      'California shops have a second layer. Air-district permits and CARB-related coating rules can require records that a filter purchase does not replace. The California compliance guide on this site is the place for that distinction. A Santa Rosa warehouse address does not change the permit at the booth.',
      'Ordering still uses ordinary catalog data. Choose the exhaust product that matches the stage and the size. Use the part-number cross-reference for SKUs that are actually in the snapshot, including Parker 1136513 and AFC C2PPEB202015-6. A search such as fil-epp-2020-w does not appear in the catalog. Send that number, a photo, and the booth model to 855-496-7969 if you need it identified.',
      'Processing time, shipping, and returns are the store rules, not a regulatory timetable. Stocked items typically process in one to two business days. Shipping is calculated at checkout. Unopened returns are five business days with shipping costs and a 25 percent restocking fee removed. Opened filter packages are not returnable, which matters if a compliance packet and the media need to be checked before the carton is opened.',
      'PFS Filters can quote a list of stages for a booth, but the quote is still a catalog match plus a review of anything that is not listed. Send the permit language only if you want the team to see which product record you are comparing it with. Do not expect the website to stamp a filter as the control device for a specific facility. That determination stays with the operator and the regulator who wrote the permit. The Santa Rosa counter phone is 855-496-7969, and the same exhaust, intake, and ceiling catalog is what the quote is built from. EPA pages linked from this guide are the public rule text, not a PFS certification.',
    ],
    faqs: [
      {
        question: 'Does PFS sell a filter that is labeled NESHAP 6H compliant?',
        answer: 'No product page in the current catalog is labeled as NESHAP 6H certified. The exhaust listings are media to review. The facility still has to determine whether Subpart 6H applies and what evidence it requires.',
      },
      {
        question: 'What is EPA Method 319?',
        answer: 'It is a laboratory test method for paint overspray arrestor efficiency. A reference to it applies only to the media or configuration that was tested, not to every filter PFS sells.',
      },
      {
        question: 'Which catalog items mention NESHAP 319 in the variant name?',
        answer: 'The aerospace filtration product lists NESHAP 319 final-stage panels and bags in the sizes named in this guide. Confirm the variant on that product page before ordering.',
      },
    ],
  },
};
