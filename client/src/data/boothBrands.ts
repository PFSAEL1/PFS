// boothBrands.ts — Complete booth manufacturer database
// Public industry data: booth brands, models, airflow types, and filter requirements

export type BoothType = 'downdraft' | 'crossdraft' | 'semi-downdraft' | 'side-downdraft' | 'open-face' | 'prep-station';

export interface BoothModel {
  name: string;
  type: BoothType;
  filters: {
    intake?: string[];
    exhaust?: string[];
    ceiling?: string[];
    prefilter?: string[];
  };
}

export interface BoothBrand {
  slug: string;
  name: string;
  country?: string;
  description: string;
  industries: string[];
  models: BoothModel[];
  replacementCycle?: {
    intake?: string;
    exhaust?: string;
    ceiling?: string;
  };
}

export const BOOTH_TYPES: Record<BoothType, { label: string; description: string; icon: string }> = {
  'downdraft': {
    label: 'Downdraft',
    description: 'Air enters from the ceiling plenum and exits through floor grates or a pit. The gold standard for automotive refinishing — delivers the cleanest finish with minimal overspray recirculation.',
    icon: '↓',
  },
  'crossdraft': {
    label: 'Crossdraft',
    description: 'Air flows horizontally from intake doors or front wall to exhaust filters on the back wall. Cost-effective and widely deployed in collision repair and general industrial coating.',
    icon: '→',
  },
  'semi-downdraft': {
    label: 'Semi-Downdraft',
    description: 'Air enters from the front ceiling area and exits low in the rear wall. A hybrid design offering better finish quality than crossdraft without the cost of a full pit installation.',
    icon: '↘',
  },
  'side-downdraft': {
    label: 'Side-Downdraft',
    description: 'Air enters from the ceiling and exits through side-wall exhaust plenums near floor level. Eliminates the need for a floor pit while maintaining downdraft-quality airflow.',
    icon: '⇊',
  },
  'open-face': {
    label: 'Open Face',
    description: 'Open front with a filter wall in the back. Used for smaller parts, touch-up work, and applications where full enclosure is not required.',
    icon: '▯',
  },
  'prep-station': {
    label: 'Prep Station',
    description: 'Open work area designed for sanding, masking, and prep work. Filtered air keeps dust contained and protects adjacent paint areas from contamination.',
    icon: '◻',
  },
};

export const BOOTH_BRANDS: BoothBrand[] = [
  {
    slug: 'accudraft',
    name: 'Accudraft',
    country: 'USA',
    description: 'Headquartered in Paterson, NJ, Accudraft has built a growing share in MSO collision chains with their MX, Titan, and Italia series. Known for integrating Eaton HMI and Allen-Bradley VFDs for precise airflow control.',
    industries: ['Automotive Refinish', 'Commercial Vehicle', 'Industrial'],
    models: [
      { name: 'Titan', type: 'downdraft', filters: { ceiling: ['38"×107"', '38"×62"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"', '24"×24"×2"'] } },
      { name: 'Italia', type: 'downdraft', filters: { ceiling: ['38"×102"', '37"×64"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'MX Downdraft', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'MX400 Side Downdraft', type: 'side-downdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'SS Space Saver', type: 'side-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
      { name: 'MX300 Semi Downdraft', type: 'semi-downdraft', filters: { ceiling: ['38"×62"'], intake: ['20"×48"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'MX Semi Downdraft', type: 'semi-downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'PRO Series Crossflow', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Prep Station 4000', type: 'prep-station', filters: { ceiling: ['24"×24"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'garmat-usa',
    name: 'Garmat USA',
    country: 'USA',
    description: 'One of the most recognized names in automotive spray booth manufacturing. Garmat USA produces premium downdraft booths favored by high-volume collision centers and dealership body shops across North America.',
    industries: ['Automotive Refinish', 'Dealership', 'Fleet'],
    models: [
      { name: '3000 Series', type: 'downdraft', filters: { ceiling: ['38"×107"', '38"×62"', '38"×67"'], exhaust: ['20"×25"', '20"×20"'], prefilter: ['24"×24"×2"'] } },
      { name: '700 Series', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Blackhawk', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Chinook II', type: 'downdraft', filters: { ceiling: ['38"×107"', '38"×67"'], exhaust: ['20"×25"', '41"×300\''], prefilter: ['24"×24"×2"'] } },
      { name: 'Zephyr', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'], prefilter: ['24"×24"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'col-met',
    name: 'Col-Met',
    country: 'USA',
    description: 'Originally headquartered in Carrollton, Texas, now part of the GFS/RTT portfolio. Col-Met mid-tier downdraft and crossdraft booths captured meaningful market share and remain widely deployed in independent and small-MSO collision shops.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"', '24"×24"×2"'] } },
      { name: 'EZ Pit Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'EZ Modified Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"'], prefilter: ['20"×20"×2"'] } },
      { name: 'EZ Side Downdraft', type: 'downdraft', filters: { ceiling: ['48"×108"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Side-Down Draft (8552)', type: 'downdraft', filters: { ceiling: ['48"×108"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Standard Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Value Crossdraft 8191', type: 'crossdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
      { name: 'EZ Classic Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Standard Semi-Downdraft', type: 'semi-downdraft', filters: { ceiling: ['38"×62"'], intake: ['20"×48"'], exhaust: ['20"×20"'] } },
      { name: 'Semi-Down Draft (8550-NP)', type: 'semi-downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'Open Face Paint Booth', type: 'open-face', filters: { exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Truck/Large Equipment Booth', type: 'downdraft', filters: { ceiling: ['48"×108"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
    ],
    replacementCycle: { intake: '40–55 days', exhaust: '85–115 days', ceiling: '6–12 months' },
  },
  {
    slug: 'global-finishing-solutions',
    name: 'Global Finishing Solutions (GFS)',
    country: 'USA',
    description: 'The largest spray booth manufacturer in North America. GFS produces the Ultra, Performer, and Frontier series used by dealerships, MSOs, and industrial operations worldwide. Known for their proprietary Wave exhaust media.',
    industries: ['Automotive Refinish', 'Industrial', 'Aerospace', 'Wood Finishing'],
    models: [
      { name: 'Ultra XD', type: 'downdraft', filters: { ceiling: ['51"×128"', '59"×149"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Ultra XP1', type: 'downdraft', filters: { ceiling: ['51"×128"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Performer', type: 'downdraft', filters: { ceiling: ['48"×108"', '38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Frontier', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '60–90 days', ceiling: '6–12 months' },
  },
  {
    slug: 'blowtherm',
    name: 'Blowtherm',
    country: 'Italy',
    description: 'Italian-engineered spray booths known for energy efficiency and advanced heat recovery systems. Popular in European-trained shops and high-end collision centers across North America.',
    industries: ['Automotive Refinish', 'Luxury/Exotic', 'Industrial'],
    models: [
      { name: 'World 8000', type: 'downdraft', filters: { ceiling: ['36"×144"', '37"×64"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Speedy S', type: 'downdraft', filters: { ceiling: ['37"×64"'], exhaust: ['20"×20"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Extra', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–50 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'junair',
    name: 'Junair (JBI)',
    country: 'Denmark',
    description: 'Danish-engineered booths with patented heat-recovery technology. Junair booths are known for exceptional energy efficiency and are widely deployed in European and North American collision markets.',
    industries: ['Automotive Refinish', 'Commercial Vehicle', 'Industrial'],
    models: [
      { name: '5 Series', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: '3 Series', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'], prefilter: ['20"×20"×2"'] } },
      { name: '1 Series', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: '7 Series Truck', type: 'downdraft', filters: { ceiling: ['51"×128"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: '2 Series Semi-Down', type: 'semi-downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: '6 Series Side', type: 'downdraft', filters: { ceiling: ['48"×108"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '75–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'nova-verta',
    name: 'Nova Verta',
    country: 'Italy',
    description: 'Premium Italian booth manufacturer specializing in high-efficiency downdraft systems. Known for their advanced curing technology and energy-saving designs favored by luxury and exotic vehicle shops.',
    industries: ['Automotive Refinish', 'Luxury/Exotic', 'Industrial'],
    models: [
      { name: 'Verto', type: 'downdraft', filters: { ceiling: ['38"×107"', '38"×67"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Aqua', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'QwikDry', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'Dryer', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'devilbiss',
    name: 'DeVilbiss (Carlisle)',
    country: 'USA',
    description: 'A legacy name in spray finishing equipment, now under Carlisle Fluid Technologies. DeVilbiss booths remain in active service at thousands of shops, particularly older installations from the 1990s–2010s.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'GFC Series', type: 'downdraft', filters: { ceiling: ['48"×108"', '38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'GFD Series', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'GFS Series', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'eagle',
    name: 'Eagle',
    country: 'USA',
    description: 'American-made spray booths built for durability and value. Eagle booths are popular in independent shops and fleet operations looking for reliable performance without premium pricing.',
    industries: ['Automotive Refinish', 'Fleet', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Side Downdraft', type: 'side-downdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'saima',
    name: 'Saima',
    country: 'Italy',
    description: 'Italian manufacturer with one of the broadest model lineups in the industry. Saima booths range from compact prep stations to full-size truck booths, deployed across Europe and North America.',
    industries: ['Automotive Refinish', 'Commercial Vehicle', 'Industrial'],
    models: [
      { name: 'Gemini', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Diamante', type: 'downdraft', filters: { ceiling: ['38"×107"', '38"×67"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Energo', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'usi-italia',
    name: 'USI Italia',
    country: 'Italy',
    description: 'Premium Italian booth manufacturer known for their Chronotech and Maestro series. USI Italia booths feature advanced curing systems and are popular in high-end collision centers and luxury vehicle shops.',
    industries: ['Automotive Refinish', 'Luxury/Exotic'],
    models: [
      { name: 'Chronotech', type: 'downdraft', filters: { ceiling: ['38"×107"', '51"×128"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Maestro', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Suprema', type: 'downdraft', filters: { ceiling: ['48"×108"'], exhaust: ['20"×25"'] } },
      { name: 'Italia Classic', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
      { name: 'Truck Booth', type: 'downdraft', filters: { ceiling: ['51"×128"', '59"×149"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'marathon-finishing',
    name: 'Marathon Finishing',
    country: 'USA',
    description: 'American manufacturer focused on heavy-duty and large-vehicle spray booths. Marathon systems are built for fleet, truck, and industrial applications requiring oversized enclosures.',
    industries: ['Commercial Vehicle', 'Fleet', 'Industrial'],
    models: [
      { name: 'Standard Downdraft', type: 'downdraft', filters: { ceiling: ['48"×108"', '51"×128"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Truck Booth', type: 'downdraft', filters: { ceiling: ['59"×149"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Industrial', type: 'downdraft', filters: { ceiling: ['51"×128"'], exhaust: ['20"×25"'] } },
    ],
    replacementCycle: { intake: '25–40 days', exhaust: '60–90 days', ceiling: '4–8 months' },
  },
  {
    slug: 'rohner',
    name: 'Rohner',
    country: 'Switzerland',
    description: 'Swiss-engineered spray booths known for precision airflow control and build quality. Rohner booths are deployed in European luxury shops and select North American facilities.',
    industries: ['Automotive Refinish', 'Luxury/Exotic', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Side Downdraft', type: 'side-downdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Crossdraft Standard', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Crossdraft Compact', type: 'crossdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'spraybake',
    name: 'Spraybake',
    country: 'Australia',
    description: 'Australian-origin booth brand with global distribution. Spraybake booths feature distinctive water-wash and dry-filter configurations, popular in Asia-Pacific and growing in North American markets.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Compact', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'spray-tech',
    name: 'Spray-Tech',
    country: 'USA',
    description: 'American manufacturer producing value-oriented spray booths for independent shops. Known for straightforward designs and easy maintenance.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'aen',
    name: 'AEN',
    country: 'USA',
    description: 'Compact and mid-size spray booth solutions for body shops with limited floor space. AEN booths offer solid performance in a smaller footprint.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×62"'], exhaust: ['20"×20"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'aero-cure',
    name: 'Aero-Cure',
    country: 'USA',
    description: 'Spray booth systems with integrated curing technology. Designed for shops that need fast cycle times and efficient paint-to-bake transitions.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'americure',
    name: 'Americure',
    country: 'USA',
    description: 'American-made spray booths built for the collision repair industry. Straightforward designs with reliable performance for independent and multi-shop operations.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'binks',
    name: 'Binks (Carlisle)',
    country: 'USA',
    description: 'Legacy spray finishing brand now under Carlisle Fluid Technologies alongside DeVilbiss. Binks booths from the 1990s–2010s remain in active service at many independent shops.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'bita',
    name: 'Bita',
    country: 'Italy',
    description: 'Italian booth manufacturer with a focus on energy-efficient designs. Bita systems are found in European-influenced shops across North America.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['37"×64"', '38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'brewco',
    name: 'Brewco',
    country: 'USA',
    description: 'Regional booth manufacturer serving the southeastern United States. Known for custom-configured booths and responsive local service.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'diamond',
    name: 'Diamond',
    country: 'USA',
    description: 'Spray booth manufacturer known for their crossdraft and open-face configurations. Popular in industrial coating and light manufacturing applications.',
    industries: ['Industrial', 'Manufacturing'],
    models: [
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"', '20"×25"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Open Face', type: 'open-face', filters: { exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '60–90 days' },
  },
  {
    slug: 'europea',
    name: 'Europea',
    country: 'Italy',
    description: 'Italian booth systems designed for the European collision market with growing North American presence. Known for compact, energy-efficient designs.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['37"×64"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'furnocolor',
    name: 'Furnocolor',
    country: 'Germany',
    description: 'German-engineered spray booths with precision temperature and airflow control. Deployed in high-end European and North American facilities.',
    industries: ['Automotive Refinish', 'Luxury/Exotic'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'future-cure',
    name: 'Future Cure',
    country: 'USA',
    description: 'American booth manufacturer focused on fast-cure technology and energy efficiency. Designed for high-throughput collision operations.',
    industries: ['Automotive Refinish', 'Fleet'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'j-mar',
    name: 'J-Mar',
    country: 'USA',
    description: 'Specialty booth manufacturer serving niche industrial and automotive applications. Known for custom configurations and responsive engineering support.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'jong-air',
    name: 'Jong-Air',
    country: 'South Korea',
    description: 'Korean booth manufacturer with growing presence in North American markets. Offers competitive pricing with solid build quality for independent shops.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'kwb',
    name: 'KWB',
    country: 'Germany',
    description: 'German precision booth systems for automotive and industrial applications. Known for advanced climate control and consistent airflow distribution.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['24"×24"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'lutro',
    name: 'Lutro',
    country: 'Norway',
    description: 'Scandinavian booth manufacturer specializing in energy-efficient systems for cold-climate operations. Advanced heat recovery and insulation technology.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'noram',
    name: 'Noram',
    country: 'USA',
    description: 'North American booth manufacturer serving the collision and industrial markets. Straightforward, serviceable designs for shops that value uptime.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'polin',
    name: 'Polin',
    country: 'Turkey',
    description: 'Turkish booth manufacturer with competitive pricing and solid engineering. Growing presence in North American independent shops.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'protectaire',
    name: 'Protectaire',
    country: 'USA',
    description: 'Industrial finishing systems manufacturer. Protectaire builds large-format booths for aerospace, rail, and heavy equipment applications.',
    industries: ['Aerospace', 'Industrial', 'Rail'],
    models: [
      { name: 'Industrial Downdraft', type: 'downdraft', filters: { ceiling: ['51"×128"', '59"×149"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Open Face', type: 'open-face', filters: { exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '25–40 days', exhaust: '60–90 days', ceiling: '4–8 months' },
  },
  {
    slug: 'polar-air',
    name: 'Polar Air',
    country: 'Canada',
    description: 'Canadian booth manufacturer designed for extreme cold-climate operation. Advanced heating and insulation systems for year-round performance in northern markets.',
    industries: ['Automotive Refinish', 'Fleet'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'spray-booth-america',
    name: 'Spray Booth America',
    country: 'USA',
    description: 'Value-oriented American booth manufacturer. Offers affordable downdraft and crossdraft configurations for budget-conscious shops.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'spray-king',
    name: 'Spray King',
    country: 'USA',
    description: 'American booth manufacturer serving independent collision shops. Known for reliable, no-frills designs that prioritize serviceability.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'technocure',
    name: 'Technocure',
    country: 'USA',
    description: 'Spray booth systems with integrated infrared curing technology. Designed for shops seeking faster cycle times and reduced energy costs.',
    industries: ['Automotive Refinish', 'Fleet'],
    models: [
      { name: 'Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"', '48"×108"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'thermal-draft',
    name: 'Thermal Draft',
    country: 'USA',
    description: 'Specialty booth manufacturer focused on thermal management and energy-efficient curing. Serves both automotive and industrial coating markets.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'unicure',
    name: 'Unicure',
    country: 'USA',
    description: 'American booth manufacturer offering universal-fit configurations. Designed for easy installation and maintenance in standard shop layouts.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'wellbuilt',
    name: 'Wellbuilt',
    country: 'USA',
    description: 'Heavy-duty booth manufacturer for commercial and industrial applications. Built for large-vehicle and fleet operations requiring oversized enclosures.',
    industries: ['Commercial Vehicle', 'Fleet', 'Industrial'],
    models: [
      { name: 'Truck Booth', type: 'downdraft', filters: { ceiling: ['51"×128"', '59"×149"'], exhaust: ['20"×25"'], prefilter: ['24"×24"×2"'] } },
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['48"×108"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '25–40 days', exhaust: '60–90 days', ceiling: '4–8 months' },
  },
  {
    slug: 'zhongda',
    name: 'Zhongda',
    country: 'China',
    description: 'Chinese booth manufacturer offering budget-friendly configurations. Growing presence in value-oriented North American shops and developing markets.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard Downdraft', type: 'downdraft', filters: { ceiling: ['38"×102"'], exhaust: ['20"×20"', '20"×25"'], prefilter: ['20"×20"×2"'] } },
      { name: 'Crossdraft', type: 'crossdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'pivab',
    name: 'Pivab',
    country: 'Sweden',
    description: 'Swedish booth manufacturer specializing in modular, relocatable spray booth systems. Popular for temporary installations and facilities requiring flexibility.',
    industries: ['Automotive Refinish', 'Industrial', 'Marine'],
    models: [
      { name: 'Modular Downdraft', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '35–50 days', exhaust: '80–110 days', ceiling: '6–12 months' },
  },
  {
    slug: 'marini',
    name: 'Marini',
    country: 'Italy',
    description: 'Italian booth systems for automotive and industrial finishing. Known for compact European designs adapted for North American shop layouts.',
    industries: ['Automotive Refinish', 'Industrial'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['37"×64"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'omia',
    name: 'Omia',
    country: 'France',
    description: 'French booth manufacturer with a focus on automotive refinishing. Omia systems feature advanced air handling and are common in European-influenced North American shops.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'pfs-spray-booths',
    name: 'PFS Spray Booths',
    country: 'USA',
    description: 'Our own line of premium spray booths engineered for maximum airflow efficiency and filter accessibility. PFS Spray Booths feature the Orion, Zenith, and Helios series — designed from the ground up to deliver superior finish quality with easy-to-source replacement filters.',
    industries: ['Automotive Refinish', 'Industrial', 'Fleet & Truck', 'Woodworking'],
    models: [
      // Orion Semi-Downdraft series
      { name: 'Orion 27 Semi-Downdraft', type: 'semi-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Orion 30 Semi-Downdraft', type: 'semi-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"', '20"×25"'] } },
      { name: 'Orion 33 Semi-Downdraft', type: 'semi-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"', '20"×25"'] } },
      // Zenith Downdraft series
      { name: 'Zenith 27 Downdraft', type: 'downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"', '20"×25"'], ceiling: ['38"×120"'] } },
      { name: 'Zenith 30 Downdraft', type: 'downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"', '20"×25"'], ceiling: ['38"×120"'] } },
      { name: 'Zenith 33 Downdraft', type: 'downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"', '20"×25"'], ceiling: ['38"×120"'] } },
      // Helios Side-Downdraft series
      { name: 'Helios 27 Side-Downdraft', type: 'side-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'], ceiling: ['38"×120"'] } },
      { name: 'Helios 30 Side-Downdraft', type: 'side-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'], ceiling: ['38"×120"'] } },
      { name: 'Helios 33 Side-Downdraft', type: 'side-downdraft', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'], ceiling: ['38"×120"'] } },
      // Orion Prep Station
      { name: 'Orion Prep Station', type: 'prep-station', filters: { intake: ['20"×20"'], exhaust: ['20"×20"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
  {
    slug: 'optima',
    name: 'Optima',
    country: 'Italy',
    description: 'Italian booth systems designed for optimal energy efficiency and finish quality. Compact designs suitable for space-constrained facilities.',
    industries: ['Automotive Refinish'],
    models: [
      { name: 'Standard', type: 'downdraft', filters: { ceiling: ['37"×64"', '38"×107"'], exhaust: ['20"×20"', '20"×25"'] } },
    ],
    replacementCycle: { intake: '30–45 days', exhaust: '70–100 days', ceiling: '6–12 months' },
  },
];

// Helper functions
export function getBrandBySlug(slug: string): BoothBrand | undefined {
  return BOOTH_BRANDS.find(b => b.slug === slug);
}

export function getBrandsByType(type: BoothType): BoothBrand[] {
  return BOOTH_BRANDS.filter(b => b.models.some(m => m.type === type));
}

export function getAllBoothTypes(): BoothType[] {
  return Object.keys(BOOTH_TYPES) as BoothType[];
}

export function getModelsByType(type: BoothType): { brand: BoothBrand; model: BoothModel }[] {
  const results: { brand: BoothBrand; model: BoothModel }[] = [];
  for (const brand of BOOTH_BRANDS) {
    for (const model of brand.models) {
      if (model.type === type) {
        results.push({ brand, model });
      }
    }
  }
  return results;
}
