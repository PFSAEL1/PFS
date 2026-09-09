export interface OemLandingPageConfig {
  path: string;
  brandSlug: string;
  brandName: string;
  shortName: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  introduction: string;
  selectionGuidance: string;
  industries: string[];
  affiliated: boolean;
  officialSource: { label: string; href: string };
}

export const OEM_LANDING_PAGES: Record<string, OemLandingPageConfig> = {
  '/accudraft-paint-booth-filters': {
    path: '/accudraft-paint-booth-filters',
    brandSlug: 'accudraft',
    brandName: 'Accudraft',
    shortName: 'Accudraft',
    title: 'Accudraft Paint Booth Filter Guide | PFS Filters',
    description: 'Review filter-stage and model guidance for Accudraft paint booths, then verify the current filter label, position, and dimensions before ordering.',
    h1: 'Replacement Filter Guidance for Accudraft Paint Booths',
    eyebrow: 'Accudraft booth guide',
    introduction: 'Accudraft booths can use different intake, ceiling, exhaust, and prefilter arrangements depending on the model and installation. Use this page to identify the likely filter stage and browse candidate PFS media without treating a model name alone as proof of fit.',
    selectionGuidance: 'Start with the model plate and the filter position. Record the nominal and actual dimensions from the installed filter or frame, then compare those details with the current product record. Retrofits and site-specific configurations can change the original filter arrangement.',
    industries: ['Collision repair', 'Automotive refinishing', 'Commercial vehicles', 'Industrial finishing'],
    affiliated: false,
    officialSource: { label: 'Accudraft parts and filter service', href: 'https://www.accudraftpaintbooths.com/service/parts-filters-service/' },
  },
  '/gfs-paint-booth-filters': {
    path: '/gfs-paint-booth-filters',
    brandSlug: 'global-finishing-solutions',
    brandName: 'Global Finishing Solutions',
    shortName: 'GFS',
    title: 'GFS Paint Booth Filter Guide | PFS Filters',
    description: 'Review filter-stage and model guidance for Global Finishing Solutions paint booths, then confirm the model, position, and dimensions before ordering.',
    h1: 'Replacement Filter Guidance for Global Finishing Solutions Booths',
    eyebrow: 'GFS booth guide',
    introduction: 'Global Finishing Solutions equipment spans automotive, industrial, and large-equipment finishing applications. Filter layouts can differ across product families and installed options, so this guide separates the likely booth positions from the PFS catalog products a buyer may want to review.',
    selectionGuidance: 'Use the GFS equipment name, serial plate, filter stage, and measured dimensions together. Confirm the current filter construction and airflow direction. When documentation and the installed filter disagree, send photos and measurements to PFS for a manual review.',
    industries: ['Automotive refinishing', 'Industrial finishing', 'Truck and fleet', 'Large-equipment coating'],
    affiliated: false,
    officialSource: { label: 'GFS paint booth filter information', href: 'https://globalfinishing.com/products/parts-filters/paint-booth-filters/' },
  },
  '/col-met-paint-booth-filters': {
    path: '/col-met-paint-booth-filters',
    brandSlug: 'col-met',
    brandName: 'Col-Met / RTT Engineered Solutions',
    shortName: 'Col-Met',
    title: 'Col-Met / RTT Paint Booth Filter Guide | PFS Filters',
    description: 'Review model and filter-stage guidance for Col-Met paint booths and prep stations. Verify installed media and dimensions before ordering.',
    h1: 'Replacement Filter Guidance for Col-Met / RTT Paint Booths',
    eyebrow: 'Col-Met booth guide',
    introduction: 'Col-Met was renamed RTT Engineered Solutions in 2020. Col-Met / RTT systems include enclosed booths, open-face booths, and preparation stations, and those layouts do not all use the same filter stages. This guide helps buyers identify what needs verification.',
    selectionGuidance: 'Identify whether the filter is at the intake, ceiling, exhaust wall, pit, or air-makeup stage. Match the construction as well as the dimensions. A same-size panel may not be interchangeable when media type, depth, support grid, or airflow direction differs.',
    industries: ['Automotive refinishing', 'Preparation stations', 'Industrial finishing', 'Woodworking and fabrication'],
    affiliated: false,
    officialSource: { label: 'RTT notice about the Col-Met name change', href: 'https://rttsolutions.com/blog/col-met-name-change/' },
  },
  '/pfs-spray-booth-filters': {
    path: '/pfs-spray-booth-filters',
    brandSlug: 'pfs-spray-booths',
    brandName: 'PFS Spray Booths',
    shortName: 'PFS',
    title: 'PFS Spray Booth Replacement Filter Guide | PFS Filters',
    description: 'Find intake, ceiling, exhaust, and prefilter guidance for PFS Spray Booths. Send the model and serial details to PFS for fitment review.',
    h1: 'Replacement Filter Guidance for PFS Spray Booths',
    eyebrow: 'PFS booth support',
    introduction: 'PFS Filters is backed by the PFS Spray Booths team. That connection gives owners a direct path for reviewing the booth model, filter stage, and installed configuration before a replacement order is placed.',
    selectionGuidance: 'Send the booth model, serial or equipment tag, filter position, current filter label, and actual dimensions. The PFS team can compare those details with the booth configuration and the current online catalog. Do not rely on booth family or nominal size alone.',
    industries: ['Automotive refinishing', 'Industrial finishing', 'Fleet and truck', 'Woodworking'],
    affiliated: true,
    officialSource: { label: 'PFS Spray Booths filter resources', href: 'https://www.pfsspraybooths.com/filters' },
  },
};

export interface CaliforniaLandingPageConfig {
  slug: string;
  path: string;
  region: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  cities: string[];
  industries: string[];
  introduction: string;
  localContext: string;
  operationsContext: string;
  regionalSource: { label: string; href: string };
  regulatorySource: { label: string; href: string };
}

export const CALIFORNIA_LANDING_PAGES: Record<string, CaliforniaLandingPageConfig> = {
  'north-bay-paint-booth-filters': {
    slug: 'north-bay-paint-booth-filters',
    path: '/california/north-bay-paint-booth-filters',
    region: 'North Bay and Sonoma County',
    title: 'North Bay Paint Booth Filters | PFS Filters Santa Rosa',
    description: 'Paint booth filter ordering and fitment support for Santa Rosa, Petaluma, Sonoma County, Marin County, and the North Bay from PFS Filters.',
    h1: 'Paint Booth Filters for the North Bay and Sonoma County',
    eyebrow: 'PFS home region',
    cities: ['Santa Rosa', 'Petaluma', 'Rohnert Park', 'Windsor', 'Marin County'],
    industries: ['Collision and body shops', 'Winery and agricultural equipment', 'Custom fabrication', 'Marine and vehicle refinishing'],
    introduction: 'PFS Filters is based at 1400 Airport Boulevard in Santa Rosa. North Bay buyers can work with the same local team that supports PFS Spray Booths while ordering intake, ceiling, prefilter, exhaust, and accordion-style media through the online catalog.',
    localContext: 'Sonoma County finishing work ranges from collision repair and custom fabrication to agricultural, winery, and light-industrial equipment. Those operations can use very different booth layouts and coatings, which is why PFS starts with the filter stage, construction, and actual dimensions rather than a city-wide one-size-fits-all recommendation.',
    operationsContext: 'For a local fitment review, send the booth manufacturer and model, a photo of the installed filter and label, its position in the airflow path, and measured dimensions. The team can identify catalog candidates or review a custom request without promising compatibility from a photo or model name alone.',
    regionalSource: { label: 'Sonoma County Economic Development industry data', href: 'https://sonomaedb.org/Data-Center/Industry/' },
    regulatorySource: { label: 'Find the correct Sonoma County air district', href: 'https://sonomacounty.gov/air-quality-districts' },
  },
  'bay-area-paint-booth-filters': {
    slug: 'bay-area-paint-booth-filters',
    path: '/california/bay-area-paint-booth-filters',
    region: 'Bay Area and San Jose',
    title: 'Bay Area Paint Booth Filters | San Jose & Peninsula',
    description: 'Paint booth filter selection and ordering support for San Jose, the Peninsula, East Bay, and greater San Francisco Bay Area finishing operations.',
    h1: 'Paint Booth Filters for the Bay Area and San Jose',
    eyebrow: 'Northern California support',
    cities: ['San Jose', 'Peninsula', 'East Bay', 'San Francisco', 'Silicon Valley'],
    industries: ['Collision repair', 'Aerospace and defense suppliers', 'Facility maintenance', 'Custom restoration and fabrication'],
    introduction: 'Bay Area finishing operations range from high-throughput collision centers to specialized aerospace, restoration, and facility-maintenance work. PFS Filters supplies a focused online catalog and a human review path for filter stages and dimensions that are difficult to identify.',
    localContext: 'A booth serving automotive work may use common intake panels and exhaust arrestors, while a specialized industrial or aerospace process may use deeper pockets, ceiling diffusion media, or a multi-stage exhaust arrangement. Product selection must follow the equipment documentation, process requirements, and any applicable permit conditions.',
    operationsContext: 'Provide the booth manufacturer and model, filter position, label or part number, and both nominal and actual dimensions. PFS can help narrow the current catalog and flag requests that need documentation or engineering review instead of forcing an unsupported online match.',
    regionalSource: { label: 'City of San José economic and manufacturing context', href: 'https://www.sjeconomy.com/why-san-jose' },
    regulatorySource: { label: 'Bay Area Air District permits', href: 'https://www.baaqmd.gov/en/permits' },
  },
  'sacramento-paint-booth-filters': {
    slug: 'sacramento-paint-booth-filters',
    path: '/california/sacramento-paint-booth-filters',
    region: 'Sacramento and the Capital Region',
    title: 'Sacramento Paint Booth Filters | PFS Filters',
    description: 'Paint booth filter ordering and selection support for Sacramento, West Sacramento, Roseville, and Capital Region fleet and finishing operations.',
    h1: 'Paint Booth Filters for Sacramento and the Capital Region',
    eyebrow: 'Capital Region support',
    cities: ['Sacramento', 'West Sacramento', 'Roseville', 'Rancho Cordova', 'I-80 corridor'],
    industries: ['Fleet and government contractors', 'Collision repair', 'Industrial fabrication', 'Agricultural and construction equipment'],
    introduction: 'Sacramento-area finishing operations include collision shops, fleet and public-sector contractors, fabrication businesses, and equipment service companies. PFS Filters helps those buyers separate routine replacement media from configurations that need a quote or documented review.',
    localContext: 'Fleet and contract work can make repeatability especially important. Record the booth, stage, media, dimensions, quantity, and change observations for each location. That information supports consistent reorders and prevents a common nominal size from being substituted for the wrong construction.',
    operationsContext: 'Use the online category pages to compare intake, ceiling, prefilter, exhaust, and Andreae-style products. When the booth has been modified or the filter label is missing, submit photos and measurements to PFS before ordering.',
    regionalSource: { label: 'Sacramento County economic-development overview', href: 'https://economic.saccounty.gov/content/econdev/us/en/about-sacramento-county/why-sacramento.html' },
    regulatorySource: { label: 'Sacramento Metro Air District rules and regulations', href: 'https://www.airquality.org/businesses/rules-regulations' },
  },
  'napa-valley-paint-booth-filters': {
    slug: 'napa-valley-paint-booth-filters',
    path: '/california/napa-valley-paint-booth-filters',
    region: 'Napa Valley',
    title: 'Napa Valley Paint Booth Filters | PFS Filters',
    description: 'Paint booth filter guidance for Napa Valley winery equipment, agricultural, collision, and facility refinishing operations.',
    h1: 'Paint Booth Filters for Napa Valley Finishing Operations',
    eyebrow: 'North Bay industry support',
    cities: ['Napa', 'American Canyon', 'St. Helena', 'Calistoga', 'Napa County'],
    industries: ['Winery and agricultural equipment service', 'General equipment refinishing', 'Collision repair', 'Facility and maintenance coating'],
    introduction: 'Napa Valley coating work is not limited to automotive repair. Winery and agricultural equipment, racks, maintenance components, and facility assets may all move through spray-finishing areas with different loading patterns and filter needs.',
    localContext: 'Napa County economic-development materials document the importance of the wine and grape sector, but that does not establish that any particular winery or facility operates a paint booth. For facilities that do spray-finish equipment or components, coating type, spray volume, airflow, and manufacturer instructions should drive filter decisions rather than a generic calendar interval.',
    operationsContext: 'PFS Filters is based nearby in Santa Rosa. Send the filter label, dimensions, booth position, and process details when a standard catalog category does not resolve the request. PFS will identify candidates and mark what still needs confirmation.',
    regionalSource: { label: 'Napa County economic-development resources', href: 'https://www.countyofnapa.org/3896/Economic-Development' },
    regulatorySource: { label: 'Bay Area Air District permits', href: 'https://www.baaqmd.gov/en/permits' },
  },
  'central-valley-paint-booth-filters': {
    slug: 'central-valley-paint-booth-filters',
    path: '/california/central-valley-paint-booth-filters',
    region: 'Central Valley and Fresno',
    title: 'Central Valley Paint Booth Filters | Fresno & PFS',
    description: 'Paint booth filter support for Fresno and Central Valley agricultural, trucking, construction-equipment, and industrial finishing operations.',
    h1: 'Paint Booth Filters for Fresno and the Central Valley',
    eyebrow: 'Central California support',
    cities: ['Fresno', 'Clovis', 'Madera', 'Visalia', 'Central Valley'],
    industries: ['Agricultural equipment', 'Commercial trucking', 'Construction equipment', 'Food-processing and industrial maintenance'],
    introduction: 'Central Valley spray operations often work on agricultural, trucking, construction, and industrial equipment in addition to passenger vehicles. Dust exposure, production cycles, and coating load can vary sharply across those applications.',
    localContext: 'The right filter is defined by the booth stage and documented media requirements. Intake panels protect the spray area from incoming debris, ceiling media distributes incoming air in applicable booths, and exhaust arrestors collect overspray before the exhaust plenum. Some systems add prefilter or pocket stages.',
    operationsContext: 'Measure the installed filter and record the equipment label before ordering. For seasonal or multi-location operations, keep a filter record by booth so reorders use verified details instead of memory or a generic size description.',
    regionalSource: { label: 'Fresno County economic-development strategy', href: 'https://www.fresnocountyca.gov/files/sharedassets/county/v/2/county-administrative-office/economic-development/2025-01-28-fresno-county-ceds.pdf' },
    regulatorySource: { label: 'San Joaquin Valley Air District permitting', href: 'https://www.valleyair.org/permitting/the-permitting-process/who-needs-an-air-pollution-permit/' },
  },
  'bakersfield-paint-booth-filters': {
    slug: 'bakersfield-paint-booth-filters',
    path: '/california/bakersfield-paint-booth-filters',
    region: 'Bakersfield and Kern County',
    title: 'Bakersfield Paint Booth Filters | PFS Filters',
    description: 'Paint booth filter selection support for Bakersfield and Kern County energy-service, agricultural, fleet, truck, and collision operations.',
    h1: 'Paint Booth Filters for Bakersfield and Kern County',
    eyebrow: 'Kern County support',
    cities: ['Bakersfield', 'Kern County', 'Shafter', 'Wasco', 'Tehachapi'],
    industries: ['Energy-service equipment', 'Agricultural equipment', 'Heavy truck and fleet', 'Collision repair'],
    introduction: 'Bakersfield finishing work can involve heavy trucks, fleet vehicles, agricultural machinery, and energy-service equipment as well as collision repair. Those parts and coatings can create different overspray loads and maintenance demands.',
    localContext: 'Heavy-equipment and fleet operations benefit from documenting each booth separately. Filter position, construction, support frame, depth, and actual dimensions all matter. A replacement that fits the opening can still be wrong for the stage or airflow direction.',
    operationsContext: 'Browse current product families online, then contact PFS for unusual sizes, missing labels, multi-stage exhaust arrangements, or requirements tied to a facility permit or customer specification.',
    regionalSource: { label: 'City of Bakersfield economic-development resources', href: 'https://www.bakersfieldcity.us/economic-development' },
    regulatorySource: { label: 'San Joaquin Valley Air District coating resources', href: 'https://ww2.valleyair.org/compliance/compliance-assistance-bulletins/solvents-coatings-adhesives-sealants/' },
  },
  'san-diego-paint-booth-filters': {
    slug: 'san-diego-paint-booth-filters',
    path: '/california/san-diego-paint-booth-filters',
    region: 'San Diego County',
    title: 'San Diego Paint Booth Filters | PFS Filters',
    description: 'Paint booth filter guidance for San Diego aerospace, defense, marine, automotive, and industrial finishing operations.',
    h1: 'Paint Booth Filters for San Diego County',
    eyebrow: 'Southern California support',
    cities: ['San Diego', 'Chula Vista', 'El Cajon', 'Oceanside', 'San Diego County'],
    industries: ['Aerospace and defense', 'Marine refinishing', 'Automotive collision', 'Industrial and military-facility support'],
    introduction: 'San Diego County combines automotive refinishing with aerospace, defense, marine, and industrial work. Some operations use routine single-stage booth media, while others have documented multi-stage or test-based requirements.',
    localContext: 'Do not infer regulatory or aerospace suitability from a product name alone. A Method 319 or customer specification should be tied to documentation for the exact media or system configuration. Facility compliance also depends on installation, airflow, process, maintenance, records, and permits.',
    operationsContext: 'PFS can help identify current catalog media and route aerospace or complex multi-stage questions for further review. Send the booth details, installed filter information, and the requirement you are trying to satisfy.',
    regionalSource: { label: 'San Diego Regional EDC industry context', href: 'https://www.sandiegobusiness.org/about-the-region/' },
    regulatorySource: { label: 'San Diego County Air Pollution Control District coating processes', href: 'https://www.sdapcd.org/content/sdapcd/permits/equipment-types/coating-processes.html' },
  },
  'los-angeles-paint-booth-filters': {
    slug: 'los-angeles-paint-booth-filters',
    path: '/california/los-angeles-paint-booth-filters',
    region: 'Los Angeles County',
    title: 'Los Angeles Paint Booth Filters | PFS Filters',
    description: 'Paint booth filter ordering and fitment support for Los Angeles County collision, fleet, fabrication, aerospace, and entertainment finishing work.',
    h1: 'Paint Booth Filters for Los Angeles County',
    eyebrow: 'Southern California support',
    cities: ['Los Angeles', 'Long Beach', 'South Bay', 'San Fernando Valley', 'Los Angeles County'],
    industries: ['Collision and automotive repair', 'Fleet and commercial vehicles', 'Aerospace and fabrication', 'Entertainment scenery and specialty finishing'],
    introduction: 'Los Angeles County supports a wide range of spray-finishing work, from collision and fleet operations to fabrication, aerospace supply, and specialty entertainment projects. High variety makes accurate filter records more useful than broad brand-only assumptions.',
    localContext: 'A busy collision booth may prioritize repeatable intake and exhaust reorders. A fabrication or specialty shop may use different media by project. Multi-stage and permitted systems may require documentation beyond the online product description.',
    operationsContext: 'Use the PFS pages to narrow by filter type, booth brand, and size. Confirm the installed filter and equipment documentation before purchase, or send photos, labels, dimensions, and the booth model for a manual review.',
    regionalSource: { label: 'Los Angeles County industry-cluster study', href: 'https://laedc.org/download/industry-clusters-study-2024/' },
    regulatorySource: { label: 'South Coast AQMD permit resources', href: 'https://www.aqmd.gov/home/permits/permit-application-forms' },
  },
};

export const CALIFORNIA_COMPLIANCE_PATH = '/california/carb-paint-booth-filter-compliance';
