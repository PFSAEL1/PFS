export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  keywords: string[];
  faqs?: { question: string; answer: string }[];
  relatedLinks?: { href: string; label: string; external?: boolean }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-often-change-paint-booth-filters",
    title: "How Often Should You Change Paint Booth Filters?",
    excerpt: "There is no universal replacement interval. Use booth and filter manufacturer limits, filter-stage inspections, pressure readings, operating conditions, and documented trends to set a defensible schedule.",
    author: "PFS Filters Editorial Team",
    date: "2026-09-05",
    readTime: "6 min read",
    category: "Maintenance",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["paint booth filter replacement", "filter maintenance schedule", "spray booth maintenance"],
    content: `
A calendar can help organize inspections, but it should not be the only basis for replacing a paint booth filter. Filter life changes with the booth design, filter stage, coating load, operating hours, media, airflow, and the limits in the equipment documentation.

## Start With the Applicable Instructions

Use the spray booth manual, filter manufacturer's instructions, permit conditions, and facility procedures as the controlling references. If those documents specify a pressure limit, inspection method, or replacement condition, follow that requirement rather than a generic interval found online.

A filter product by itself does not make a booth or facility compliant. Compliance depends on the installed system, operating conditions, maintenance, documentation, and applicable rules.

## Inspect Each Filter Stage Separately

Intake, ceiling, prefilter, and exhaust stages perform different jobs and may load at different rates. Record observations for each stage instead of replacing every filter on the same assumed schedule.

- Check for visible loading, damage, gaps, bypass, or incorrect installation.
- Record relevant pressure or manometer readings using the booth manufacturer's procedure.
- Note changes in airflow, finish contamination, overspray behavior, or unusual loading patterns.
- Confirm that the media type and airflow direction match the documented application.

## Build a Site-Specific Trend

Record the installation date, operating hours or production activity, coating changes, pressure readings, inspection findings, and replacement date. After several documented cycles, the facility can establish an inspection cadence based on its actual operation while still respecting manufacturer and permit limits.

## When to Escalate

Stop relying on a routine schedule and ask a qualified booth technician or environmental, health, and safety professional for help when readings are outside documented limits, airflow changes materially, filters are damaged or bypassing, or the process and coating system have changed.

## Ordering the Replacement

Before ordering, confirm the booth model, filter position, nominal and actual dimensions, media description, airflow direction, and any part number on the existing label. Send those details and a clear photo to PFS Filters when the catalog match is uncertain.

Source: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.107
    `,
  },
  {
    slug: "fiberglass-vs-tacky-panel-filters",
    title: "Fiberglass vs. Tacky Panel Filters",
    excerpt: "Fiberglass paint arrestors and tackified panel media are not automatically interchangeable. Compare the documented filter stage, dimensions, media, airflow direction, and equipment requirements before ordering.",
    author: "PFS Filters Editorial Team",
    date: "2026-09-05",
    readTime: "5 min read",
    category: "Product Guide",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["fiberglass paint arrestor", "tacky panel filter", "spray booth filter comparison"],
    content: `
Fiberglass paint arrestors and tackified panel filters describe different media constructions. The correct choice depends on the filter stage and the requirements documented for the booth or air-handling system.

## Fiberglass Paint Arrestors

Fiberglass paint arrestor media is commonly used in overspray-capture applications. Catalog products may be sold as pads or rolls and can vary in basis weight, thickness, dimensions, construction, and packaging.

Do not assume that two fiberglass products are equivalent because they look similar. Compare the current product record and any manufacturer data available for the specific media.

## Tacky Panel Media

Tackified panels use an adhesive-treated media intended to retain captured particles. Depending on the product and system design, they may be used in intake, prefilter, or other documented positions.

The word tacky does not establish efficiency, pressure drop, service life, or compatibility. Those details must come from the specific product documentation and the booth or equipment requirements.

## Five Details to Verify

1. Confirm the filter position: intake, ceiling, prefilter, exhaust, or another stage.
2. Measure the actual frame or media opening rather than relying only on a nominal size.
3. Compare the media description, construction, and airflow direction.
4. Verify the product variant, case quantity, and current availability.
5. Review booth, filter, and facility requirements before substitution.

## Avoid Appearance-Only Matching

Color, surface texture, or a photo may help narrow candidates, but those cues do not prove fitment or performance. When a label or part number is unavailable, provide PFS Filters with the booth make and model, filter position, actual dimensions, and clear photos of the filter and installation area.

## Disposal and Safety

Used filters may contain coating residue or other process material. Follow the coating safety data, facility procedures, and applicable waste requirements rather than treating every used filter the same way.

Source: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.107
    `,
  },
  {
    slug: "paint-booth-maintenance-checklist",
    title: "Paint Booth Filter Maintenance Checklist",
    excerpt: "Use this general checklist to organize filter inspections and records, then apply the spray booth manual, filter instructions, permit conditions, and facility procedures that control your installation.",
    author: "PFS Filters Editorial Team",
    date: "2026-09-05",
    readTime: "7 min read",
    category: "Maintenance",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["paint booth maintenance", "spray booth checklist", "filter inspection log"],
    content: `
This checklist is general educational guidance, not a substitute for the booth manual, filter manufacturer's instructions, permit conditions, fire-code requirements, or a qualified inspection. Assign responsibilities and frequencies using the documents that apply to the facility.

## Before Operation

- Confirm that required inspections and service are current.
- Check each filter stage for damage, gaps, bypass, incorrect orientation, or visible loading.
- Review relevant pressure or manometer readings using the equipment procedure.
- Verify that access doors, panels, and seals are secure.
- Remove housekeeping hazards according to the facility procedure.

## During Operation

Watch for material changes in airflow, pressure readings, overspray behavior, odor, unusual noise, or finish contamination. If a condition is outside the documented operating range, follow the facility's stop-work and escalation procedure.

## After Operation

- Record unusual conditions and corrective actions.
- Keep filter-change and inspection records by booth and filter stage.
- Store replacement filters so media and seals are protected from damage or contamination.
- Handle coating residue and used filters under the applicable safety and waste procedures.

## Periodic Review

Use a qualified service provider for work involving burners, electrical systems, fans, ducts, fire-protection systems, controls, or other equipment outside the filter-change scope. Do not infer that a new filter resolves an airflow, fire-safety, or compliance problem elsewhere in the system.

## Filter Change Record

A useful record includes the booth identifier, filter stage, product or part number, nominal and actual dimensions, installation date, pressure reading when applicable, inspection findings, operating context, replacement date, and person completing the work.

## Ordering Controls

Maintain a verified product record for each filter position. When a substitution is proposed, compare the booth requirements and product documentation rather than approving it only by size or appearance.

Source: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.107
    `,
  },
  {
    slug: "aerospace-paint-booth-compliance-method-319",
    title: "EPA Method 319 for Aerospace Paint Booth Filters",
    excerpt: "EPA Method 319 is a test method for determining paint overspray arrestor filtration efficiency. It is not a blanket certification for every installation, coating, operating condition, or facility obligation.",
    author: "PFS Filters Editorial Team",
    date: "2026-09-05",
    readTime: "7 min read",
    category: "Aerospace",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["EPA Method 319", "aerospace paint booth filtration", "Aerospace NESHAP", "paint overspray arrestor testing"],
    content: `
EPA Method 319 is titled Determination of Filtration Efficiency for Paint Overspray Arrestors. The method describes a laboratory procedure for evaluating arrestor filtration efficiency under defined test conditions.

## A Test Method Is Not a Facility-Wide Guarantee

A product statement referencing Method 319 should be tied to evidence for the specific product or system tested. It does not establish that every size, configuration, installation, coating process, or facility automatically meets an applicable rule.

Facility obligations depend on rule applicability, source category, coatings, operations, permits, installed controls, monitoring, recordkeeping, and other facts. The Aerospace Manufacturing and Rework Facilities NESHAP is codified at 40 CFR Part 63, Subpart GG.

## Questions to Ask About Product Evidence

- What exact product, media, or multi-stage configuration was tested?
- Which report or manufacturer document supports the claim?
- Does the offered size and construction match the tested configuration?
- What installation, airflow, sealing, and maintenance conditions apply?
- What records does the facility need to retain?

## Multi-Stage Systems Require Engineering Review

Some aerospace finishing operations use multiple filtration stages, but there is no universal stage count or media sequence that can be selected from a generic article. Adding or changing media can affect resistance, airflow, fan performance, access, monitoring, and the overall control strategy.

Have a qualified booth or ventilation professional evaluate the installed system. Environmental, health, and safety personnel should determine the rules and permit conditions that apply to the facility.

## The PFS Filters Boundary

PFS Filters can provide current catalog information, dimensions, and product or custom-request pathways. PFS does not represent that a filter alone makes a booth or facility compliant. Request the supporting manufacturer or test documentation needed for any performance or regulatory claim before relying on it.

Source: https://www3.epa.gov/ttnemc01/proposed/m-319.pdf
Source: https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-63/subpart-GG
Source: https://www.epa.gov/stationary-sources-air-pollution/aerospace-manufacturing-and-rework-facilities-national-emission
    `,
  },
  {
    slug: "booth-filter-replacement-intervals",
    title: "How Often to Change Booth Filters",
    excerpt: "Exhaust filters are typically changed every 30 to 90 days, and intake filters every 3 to 6 months. Life depends on spray hours, coatings, and pressure.",
    author: "PFS Filters Editorial Team",
    date: "2026-10-30",
    readTime: "6 min read",
    category: "Maintenance",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["paint booth filter change interval", "exhaust filter replacement", "intake filter schedule"],
    relatedLinks: [
      { href: "/exhaust-filters", label: "Exhaust filters" },
      { href: "/intake-filters", label: "Intake filters" },
      { href: "/ceiling-filters", label: "Ceiling filters" },
      { href: "/filter-rotation-program", label: "Filter rotation program" },
      { href: "/blog/clogged-paint-booth-filters", label: "What clogged filters do" },
    ],
    faqs: [
      {
        question: "How often should exhaust filters be changed?",
        answer: "On a booth that sprays most days, exhaust filters are typically changed every 30 to 90 days. Heavy primer weeks and a small bank shorten that. Light color work stretches it. The booth pressure limit outranks the calendar.",
      },
      {
        question: "How often should intake filters be changed?",
        answer: "Intake filters, including many ceiling banks, typically last 3 to 6 months. Change them sooner when the gauge climbs, the blanket looks matted, or dirt starts showing in the finish.",
      },
    ],
    content: `
Exhaust filters on a booth that sprays most days are typically replaced every 30 to 90 days. Intake filters, including many ceiling banks, typically run 3 to 6 months. Both ranges move with the work. They are planning numbers, not a rule that replaces the booth manual.

## What moves the date

Spray hours, the coatings in the gun, and the area of the bank decide how fast a filter loads. A week of high-build primer fills an exhaust pad faster than a week of light color. A larger intake bank lasts longer than a small one in the same shop. Humidity and waterborne coatings can change how a synthetic pad loads compared with a light fiberglass pad.

Write down the day a set goes in and the day it comes out. After a few cycles, the shop's own interval is more useful than a chart copied from another booth.

## The reading that actually decides

Use the manometer or draft gauge the way the booth manual describes. If that reading reaches the limit printed for the booth, change the loaded stage even if the calendar still has weeks left. If the face velocity in the booth falls below the NFPA 33 minimum of 100 feet per minute, the bank is already too loaded to keep spraying as if nothing changed.

A clean-looking frame can still be packed in the center. Check the media, not only the edges.

## Exhaust and intake are different clocks

Do not change every stage on the exhaust interval. Intake and ceiling media usually see dust, not a full load of overspray, so they often stay in service for those 3 to 6 months. Exhaust media sees the paint and is the stage that most often lands in the 30 to 90 day range.

If a stage is loading in days rather than weeks, look for a gun problem, a missing pre-stage, or a bank that is undersized for the work. A shorter calendar will not fix that.

## If you do not want to track it by hand

The PFS Filter Rotation Program sets a cadence from the booth and the spray load, then ships media before a normal cycle runs out. The gauge can still call for an early change. The program is there so a predictable cycle is not a rush order.
    `,
  },
  {
    slug: "clogged-paint-booth-filters",
    title: "What Clogged Booth Filters Do",
    excerpt: "Clogged booth filters cut airflow. Face velocity can drop below the NFPA 33 minimum of 100 feet per minute. Change the loaded stage before you keep spraying.",
    author: "PFS Filters Editorial Team",
    date: "2026-10-30",
    readTime: "5 min read",
    category: "Maintenance",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["clogged paint booth filter", "NFPA 33 100 fpm", "spray booth airflow"],
    relatedLinks: [
      { href: "/exhaust-filters", label: "Exhaust filters" },
      { href: "/intake-filters", label: "Intake filters" },
      { href: "/blog/booth-filter-replacement-intervals", label: "Replacement intervals" },
      { href: "/blog/booth-filter-maintenance-checklist", label: "Maintenance checklist" },
      { href: "/contact", label: "Request a quote" },
    ],
    faqs: [
      {
        question: "What happens when paint booth filters clog?",
        answer: "The fan keeps turning, but less air moves through the booth. Face velocity can fall below the NFPA 33 minimum of 100 feet per minute. Overspray hangs in the work area, flash times stretch, and dirt shows up in the finish.",
      },
      {
        question: "Will a new filter fix low airflow by itself?",
        answer: "A new filter fixes low airflow caused by loaded media. If velocity is still low with clean filters seated tight in the frame, the fan, belts, or duct need a technician. Another layer of media will not solve that.",
      },
    ],
    content: `
A clogged filter does not just look dirty. It changes how the booth breathes. Overspray fills the gaps in exhaust media. Dirt mats intake and ceiling media. In both cases the fan keeps spinning while less air actually moves.

## The 100 feet per minute line

NFPA 33 uses 100 feet per minute as the minimum face velocity for a spray booth. When filters load up, measured velocity at the booth face can drop below that minimum. Paint mist stays in the work area instead of being carried to the exhaust bank. Flash and dry times stretch. Dirt and dry spray show up in the finish. The fan, ducts, and heater also see a booth that is no longer moving the air they were sized for.

That figure is an airflow minimum for the booth. It is not a claim that any one filter, by itself, settles every other obligation a shop has.

## Exhaust clogging and intake clogging

Exhaust clogging is the common one in a busy collision or industrial booth. The pad or accordion crusts over, the gauge climbs, and the booth feels still. Intake and ceiling clogging is quieter. The supply side starves, balance shifts, and dust that should have been caught on a fresh panel makes it into the wet film.

Bypass is a cousin of clogging. A gap at the frame lets dirty air sneak around a pad that is only half used. Seat the new media so the opening is covered.

## What to do the day you notice it

Change the stage that is loaded. Do not keep spraying through a bank that will not hold velocity. After the new media is in, check the frame for gaps and read the gauge again.

If face velocity is still under 100 feet per minute with clean filters, stop blaming the filter. A loose belt, a dirty fan wheel, or a blocked duct can do the same thing. Those are service items, not another box of pads.

Typical planning ranges are still 30 to 90 days on exhaust and 3 to 6 months on intake, depending on usage. A clogged reading overrides both.
    `,
  },
  {
    slug: "how-to-choose-booth-filters",
    title: "How to Choose Booth Filters",
    excerpt: "Choose booth filters by stage, measured opening, and media family. Powder, carbon, and PFS booth kits are quoted when the catalog has no matching product.",
    author: "PFS Filters Editorial Team",
    date: "2026-10-30",
    readTime: "7 min read",
    category: "Product Guide",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["choose paint booth filters", "exhaust vs intake media", "powder booth filters", "activated carbon booth media"],
    relatedLinks: [
      { href: "/shop-by-filter-type", label: "Shop by filter type" },
      { href: "/category/polyester-media", label: "Polyester exhaust media" },
      { href: "/category/powder-booth-filters", label: "Powder booth filters" },
      { href: "/category/activated-carbon-media", label: "Activated carbon media" },
      { href: "/category/paint-arrest-systems", label: "Paint arrest systems" },
      { href: "/category/pfs-oem-replacement-kits", label: "PFS OEM kits" },
      { href: "/filter-finder", label: "Filter finder" },
    ],
    faqs: [
      {
        question: "How do I choose a paint booth filter?",
        answer: "Name the stage first: intake, ceiling, prefilter, or exhaust. Measure the opening. Then match the media family the booth uses. Two pads with the same outline are not automatically the same filter.",
      },
      {
        question: "What if the catalog does not list the filter?",
        answer: "Powder booth three-stage panels, pulse-jet cartridges, activated carbon modules, and PFS model kits are quoted. Send the booth model, the stage, the measured size, and a photo. Do not invent a part number from a similar picture.",
      },
    ],
    content: `
Start with the stage, then the opening, then the media family. That order prevents the most common miss: ordering a clean-looking pad that belongs on the other side of the booth.

## Name the stage

Intake media keeps dust out of the finish. Ceiling media spreads supply air across a downdraft booth. A prefilter, when the booth actually has one, catches coarse dirt ahead of a more expensive final layer. Exhaust media holds overspray before air reaches the fan. Those jobs are not interchangeable.

## Measure the opening

Read the width, height, and depth of the frame, grid, or blanket pocket. A nominal 20 by 20 label is a hint, not a measurement. Roll media needs the width and the length you can actually handle. Write down an arrow direction if the installed piece has one.

## Match the family that the booth uses

Liquid exhaust banks in the PFS catalog include fiberglass arrestor pads and rolls, Paint Pockets, and Andreae accordion media. Polyester exhaust media in the catalog is the AFC blue cube and the Koch SprayStop roll. Intake choices include tacky panels, ceiling diffusion media, pleated panels, and pocket bags, each on its own product page.

Powder booths are a separate choice. Spray-to-waste booths commonly use a three-stage panel bank. Many reclaim collectors use pulse-jet cartridges. Neither is a stocked catalog item. Request a quote from the model and a photo of the installed media.

Activated carbon is for solvent vapor, and only after a particulate stage. Carbon is not a paint arrestor. It is also quoted, not listed with a price on this site.

A PFS booth can be quoted as an OEM set: intake, ceiling, and exhaust pieces for that model. Send the model and the equipment tag. The kit is not a published part number.

## Confirm before you substitute

Color, thickness, and a similar photo do not prove a match. If the label is gone, send the booth make and model, the stage, the measurements, and a clear photo. PFS will separate catalog matches from items that need a quote.
    `,
  },
  {
    slug: "booth-filter-maintenance-checklist",
    title: "Booth Filter Maintenance Checklist",
    excerpt: "Booth filter maintenance checklist: daily floor and gauge checks, weekly light and seal inspections, and when to change exhaust or intake media.",
    author: "PFS Filters Editorial Team",
    date: "2026-10-30",
    readTime: "6 min read",
    category: "Maintenance",
    image: "/images/blog-featured-pfs.jpg",
    keywords: ["paint booth maintenance checklist", "manometer filter check", "spray booth filter care"],
    relatedLinks: [
      { href: "/blog/booth-filter-replacement-intervals", label: "Replacement intervals" },
      { href: "/blog/clogged-paint-booth-filters", label: "Clogged filters" },
      { href: "/filter-rotation-program", label: "Filter rotation program" },
      { href: "/pfs-spray-booth-filters", label: "PFS booth filters" },
      { href: "https://pfsspraybooths.com/service", label: "PFS booth service", external: true },
    ],
    faqs: [
      {
        question: "What belongs on a booth filter checklist?",
        answer: "Each shift, read the gauge, look for loaded media and frame gaps, and clean the floor without blowing dust around. Each week, wipe light lenses and check door seals. Change exhaust media on a typical 30 to 90 day rhythm and intake media on a typical 3 to 6 month rhythm, sooner if the reading says so.",
      },
      {
        question: "Which filter tasks are not a filter change?",
        answer: "Fan wheels, belts, burners, and safety switches are technician work. A fresh pad does not fix a loose belt or a fan full of overspray. Schedule that work with a service visit.",
      },
    ],
    content: `
Use this list to keep filter care on a rhythm. The booth manual still wins if it names a different gauge limit or a different inspection. Assign a person to each line so it does not live only on a poster.

## Before the shift

- Read the manometer or draft gauge and write the number down.
- Look at the exhaust media for heavy crust, sagging, or a gap at the frame.
- Confirm intake and ceiling media sit flat, with any airflow mark pointing the way the booth specifies.
- Sweep or mop the floor. Do not blow dust around with an air hose. It settles into the next coat.

## During the week

- Wipe light lenses. A film of overspray hides color and wet edges long before the lamp actually fails.
- Check the seals on personnel doors and product doors. A torn seal pulls shop air into the booth.
- Note finish dirt, slow flash, or a booth that feels still. Those track with a loaded filter more often than with a bad gun.

## When to change the media

Exhaust filters in regular production are often due every 30 to 90 days. Intake and ceiling filters are often due every 3 to 6 months. Usage moves both. Change sooner when the gauge climbs past the booth's limit, or when face velocity falls below the NFPA 33 minimum of 100 feet per minute.

Do not wash disposable fiberglass, tacky, polyester, pleated, or ceiling media and put it back. Replace it. Bag used filters the way the coating instructions and the shop's waste rules require.

## Once a year, beyond the filter

Fan wheels, belts, burners, and airflow switches are service work. A new filter does not correct a loose belt or a wheel loaded with overspray. PFS booth owners can put that visit on the same day as a planned filter change so the booth is down once.

Keep one line in the log for each stage: booth, position, what went in, the gauge, the date, and who did the work.
    `,
  },
];
