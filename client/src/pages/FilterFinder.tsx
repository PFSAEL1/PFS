import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createBreadcrumbSchema } from '@/lib/structuredData';
import { ArrowRight, ArrowLeft, CheckCircle2, ShoppingCart, Search, Phone, HelpCircle } from 'lucide-react';
import { BOOTH_BRANDS, BOOTH_TYPES, type BoothType, type BoothBrand, type BoothModel } from '@/data/boothBrands';
import {
  CrossdraftDiagram,
  DowndraftDiagram,
  SemiDowndraftDiagram,
  SideDowndraftDiagram,
  OpenFaceDiagram,
  PrepStationDiagram,
} from '@/components/AirflowDiagrams';

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: 'https://pfsfilters.com' },
  { name: 'Filter Finder', url: 'https://pfsfilters.com/filter-finder' },
]);

// Map booth type to diagram component
const DIAGRAMS: Record<BoothType, React.FC> = {
  'downdraft': DowndraftDiagram,
  'crossdraft': CrossdraftDiagram,
  'semi-downdraft': SemiDowndraftDiagram,
  'side-downdraft': SideDowndraftDiagram,
  'open-face': OpenFaceDiagram,
  'prep-station': PrepStationDiagram,
};

// Map filter category to shop category slug
const FILTER_SHOP_SLUGS: Record<string, string> = {
  ceiling: 'ceiling-blankets',
  intake: 'ceiling-blankets',
  exhaust: 'fiberglass-arrestors',
  prefilter: 'pre-filters',
};

// Filter category display info
const FILTER_CATEGORIES = {
  ceiling: { label: 'Ceiling Diffusion Media', description: 'Polyester ceiling blankets that diffuse clean air evenly into the booth', side: 'intake', color: 'sky' },
  intake: { label: 'Intake Panel Filters', description: 'Tackified intake panels that filter incoming air on walls or doors', side: 'intake', color: 'teal' },
  exhaust: { label: 'Exhaust Arrestors', description: 'Fiberglass or polyester media that captures overspray before it exits', side: 'exhaust', color: 'orange' },
  prefilter: { label: 'Pre-Filters (AMU)', description: 'Pleated panels that protect your air make-up unit from dust and debris', side: 'intake', color: 'emerald' },
};

export default function FilterFinder() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<BoothType | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<BoothBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<BoothModel | null>(null);

  // Get brands that have models matching the selected booth type
  const filteredBrands = useMemo(() => {
    if (!selectedType) return [];
    return BOOTH_BRANDS.filter(brand =>
      brand.models.some(m => m.type === selectedType)
    ).sort((a, b) => {
      // Sort by number of matching models descending
      const aCount = a.models.filter(m => m.type === selectedType).length;
      const bCount = b.models.filter(m => m.type === selectedType).length;
      return bCount - aCount;
    });
  }, [selectedType]);

  // Get models for the selected brand + type
  const filteredModels = useMemo(() => {
    if (!selectedBrand || !selectedType) return [];
    return selectedBrand.models.filter(m => m.type === selectedType);
  }, [selectedBrand, selectedType]);

  // Count stats for step 1
  const typeStats = useMemo(() => {
    const stats: Record<string, { models: number; brands: number }> = {};
    for (const type of Object.keys(BOOTH_TYPES) as BoothType[]) {
      const brands = BOOTH_BRANDS.filter(b => b.models.some(m => m.type === type));
      const models = BOOTH_BRANDS.reduce((acc, b) => acc + b.models.filter(m => m.type === type).length, 0);
      stats[type] = { models, brands: brands.length };
    }
    return stats;
  }, []);

  const goToStep = (s: number) => setStep(s);

  const selectType = (type: BoothType) => {
    setSelectedType(type);
    setSelectedBrand(null);
    setSelectedModel(null);
    setStep(2);
  };

  const selectBrand = (brand: BoothBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setStep(3);
  };

  const selectModel = (model: BoothModel) => {
    setSelectedModel(model);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <SEO
        title="Filter Finder - Find Exact Filters for Your Paint Booth | PFS Filters"
        description="Find the exact replacement filters for your paint booth in 60 seconds. Select your booth type, brand, and model — we'll show you the ceiling media, exhaust arrestors, and pre-filters that fit."
        canonical="https://pfsfilters.com/filter-finder"
        structuredData={breadcrumbSchema}
      />
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-8 px-4 bg-gradient-to-b from-[#0a1628] to-[#040404]">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: 'Filter Finder' }]} />
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
              <Search className="w-3.5 h-3.5" />
              FILTER FINDER · STEP {step} OF {step === 4 ? '4' : '4'}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-white">
              {step === 1 && 'What kind of booth do you have?'}
              {step === 2 && 'Who made your booth?'}
              {step === 3 && `Pick your ${selectedBrand?.name} model`}
              {step === 4 && 'Your Filter Kit'}
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              {step === 1 && 'Pick the booth airflow type that matches yours. We use this to narrow to brands and models that fit.'}
              {step === 2 && `Booth type: ${BOOTH_TYPES[selectedType!]?.label}. ${filteredBrands.length} brands make this booth type.`}
              {step === 3 && `Booth type: ${BOOTH_TYPES[selectedType!]?.label} · Brand: ${selectedBrand?.name}. ${filteredModels.length} models catalogued.`}
              {step === 4 && `${selectedBrand?.name} ${selectedModel?.name} — here are the filters that fit your booth.`}
            </p>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      s <= step ? 'bg-blue-500' : 'bg-transparent'
                    }`}
                    style={{ width: s <= step ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/40 uppercase tracking-wider">
              <span className={step >= 1 ? 'text-blue-300' : ''}>Type</span>
              <span className={step >= 2 ? 'text-blue-300' : ''}>Brand</span>
              <span className={step >= 3 ? 'text-blue-300' : ''}>Model</span>
              <span className={step >= 4 ? 'text-blue-300' : ''}>Filters</span>
            </div>
          </div>

          {/* Back button */}
          {step > 1 && (
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  if (step === 4) setStep(3);
                  else if (step === 3) setStep(2);
                  else if (step === 2) setStep(1);
                }}
                className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Go back
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* STEP 1: Pick booth type */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {(Object.keys(BOOTH_TYPES) as BoothType[]).map(type => {
                const Diagram = DIAGRAMS[type];
                const stats = typeStats[type];
                return (
                  <button
                    key={type}
                    onClick={() => selectType(type)}
                    className="group text-left rounded-2xl border border-white/10 bg-[#0a0a0a] hover:border-blue-500/40 hover:bg-[#0c1525] transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-44 md:h-52 p-4 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent">
                      <div className="w-full max-w-[280px] h-full opacity-80 group-hover:opacity-100 transition-opacity">
                        <Diagram />
                      </div>
                    </div>
                    <div className="p-5 border-t border-white/5">
                      <h3 className="text-xl font-bold text-white mb-1">{BOOTH_TYPES[type].label}</h3>
                      <p className="text-sm text-white/60 mb-3 line-clamp-2">{BOOTH_TYPES[type].description}</p>
                      <div className="flex items-center gap-2 text-xs text-blue-300/80">
                        <span>{stats.models} models</span>
                        <span className="text-white/20">·</span>
                        <span>{stats.brands} brands</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Not sure card */}
              <Link href="/shop-by-booth">
                <div className="h-full rounded-2xl border border-dashed border-white/20 bg-[#0a0a0a] hover:border-blue-500/40 hover:bg-[#0c1525] transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[280px]">
                  <HelpCircle className="w-10 h-10 text-white/30 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Not sure?</h3>
                  <p className="text-sm text-white/60">Browse by brand instead — jump straight to the full brand directory.</p>
                </div>
              </Link>
            </div>
          )}

          {/* STEP 2: Pick brand */}
          {step === 2 && selectedType && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredBrands.map(brand => {
                  const modelCount = brand.models.filter(m => m.type === selectedType).length;
                  return (
                    <button
                      key={brand.slug}
                      onClick={() => selectBrand(brand)}
                      className="group text-left rounded-xl border border-white/10 bg-[#0a0a0a] hover:border-blue-500/40 hover:bg-[#0c1525] transition-all duration-300 p-4 md:p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white/60 group-hover:text-blue-300 transition-colors">
                          {brand.name.charAt(0)}
                        </div>
                        {brand.country && (
                          <span className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded">{brand.country}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-white text-sm md:text-base mb-1 group-hover:text-blue-100 transition-colors">{brand.name}</h3>
                      <p className="text-xs text-white/50">
                        {modelCount} {BOOTH_TYPES[selectedType].label.toLowerCase()} model{modelCount !== 1 ? 's' : ''}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Fallback */}
              <div className="mt-8 rounded-xl border border-white/10 bg-[#0a0a0a] p-6 text-center">
                <p className="text-sm text-white/70 mb-3">Don't see your brand? We carry filters for booths beyond what's listed here.</p>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/20 text-white/90 hover:bg-blue-500/10 hover:border-blue-500/30 gap-2">
                    <Phone className="w-3.5 h-3.5" /> Tell us about your booth
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* STEP 3: Pick model */}
          {step === 3 && selectedBrand && selectedType && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredModels.map(model => {
                  const Diagram = DIAGRAMS[model.type];
                  const filterCount = Object.values(model.filters).reduce((acc, arr) => acc + (arr?.length || 0), 0);
                  return (
                    <button
                      key={model.name}
                      onClick={() => selectModel(model)}
                      className="group text-left rounded-xl border border-white/10 bg-[#0a0a0a] hover:border-blue-500/40 hover:bg-[#0c1525] transition-all duration-300 overflow-hidden"
                    >
                      <div className="h-36 p-3 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent relative">
                        <div className="w-full max-w-[200px] h-full opacity-60 group-hover:opacity-90 transition-opacity">
                          <Diagram />
                        </div>
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30 text-[10px] text-blue-200 uppercase font-medium">
                          {BOOTH_TYPES[model.type].label}
                        </div>
                      </div>
                      <div className="p-4 border-t border-white/5">
                        <h3 className="font-bold text-white text-base mb-1 group-hover:text-blue-100 transition-colors">{model.name}</h3>
                        <p className="text-xs text-white/50">{filterCount} filter size{filterCount !== 1 ? 's' : ''} catalogued</p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          View filter kit <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Fallback */}
              <div className="mt-8 rounded-xl border border-white/10 bg-[#0a0a0a] p-6 text-center">
                <p className="text-sm text-white/70 mb-3">Don't see your {selectedBrand.name} model? We can still match filters for it.</p>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/20 text-white/90 hover:bg-blue-500/10 hover:border-blue-500/30 gap-2">
                    <Phone className="w-3.5 h-3.5" /> Tell us your model
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* STEP 4: Filter Results */}
          {step === 4 && selectedModel && selectedBrand && selectedType && (
            <FilterResults
              model={selectedModel}
              brand={selectedBrand}
              boothType={selectedType}
              onReset={reset}
            />
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1525] to-[#0a0a0a] p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Need help finding your filters?</h2>
          <p className="text-white/70 mb-6">Our team matches filters for every booth brand and model. Call us or send your booth details — we'll identify the exact fit and ship same-week.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="tel:+18885457715">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
                <Phone className="w-4 h-4" /> (888) 545-7715
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white/90 hover:bg-white/5 gap-2">
                Request a Custom Match
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Filter Results Component
function FilterResults({
  model,
  brand,
  boothType,
  onReset,
}: {
  model: BoothModel;
  brand: BoothBrand;
  boothType: BoothType;
  onReset: () => void;
}) {
  const Diagram = DIAGRAMS[boothType];

  // Build filter slots from model data
  const intakeFilters: { key: string; label: string; sizes: string[]; description: string; shopSlug: string; color: string }[] = [];
  const exhaustFilters: { key: string; label: string; sizes: string[]; description: string; shopSlug: string; color: string }[] = [];

  if (model.filters.ceiling?.length) {
    intakeFilters.push({
      key: 'ceiling',
      label: 'Ceiling Diffusion Media',
      sizes: model.filters.ceiling,
      description: 'Polyester ceiling blankets that diffuse clean air evenly into the booth. Replace every 6–12 months or when airflow drops.',
      shopSlug: 'ceiling-blankets',
      color: 'sky',
    });
  }
  if (model.filters.intake?.length) {
    intakeFilters.push({
      key: 'intake',
      label: 'Intake Panel Filters',
      sizes: model.filters.intake,
      description: 'Tackified intake panels that filter incoming air on walls or doors. Replace every 35–50 days.',
      shopSlug: 'ceiling-blankets',
      color: 'teal',
    });
  }
  if (model.filters.prefilter?.length) {
    intakeFilters.push({
      key: 'prefilter',
      label: 'Pre-Filters (AMU)',
      sizes: model.filters.prefilter,
      description: 'Pleated panels that protect your air make-up unit from dust and debris. Replace every 60–90 days.',
      shopSlug: 'pre-filters',
      color: 'emerald',
    });
  }
  if (model.filters.exhaust?.length) {
    exhaustFilters.push({
      key: 'exhaust',
      label: 'Exhaust Arrestors',
      sizes: model.filters.exhaust,
      description: 'Fiberglass or polyester media that captures overspray before it exits the booth. Replace every 7–14 days (pads) or when loaded.',
      shopSlug: 'fiberglass-arrestors',
      color: 'orange',
    });
  }

  const totalSlots = intakeFilters.length + exhaustFilters.length;
  const totalSizes = [...intakeFilters, ...exhaustFilters].reduce((acc, f) => acc + f.sizes.length, 0);

  return (
    <div>
      {/* Hero card */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1525] to-[#0a0a0a] overflow-hidden mb-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-0">
          <div className="p-6 flex items-center justify-center bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/5">
            <div className="w-full max-w-[240px] h-40">
              <Diagram />
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">{brand.name} · {BOOTH_TYPES[boothType].label}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{brand.name} {model.name}</h2>
            <p className="text-white/60 text-sm mb-4">
              Filter kit and recommended sizes for this booth. {totalSizes} filter sizes across {totalSlots} positions.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-emerald-300 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified fitment</span>
              </div>
              {brand.replacementCycle && (
                <div className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                  Exhaust cycle: {brand.replacementCycle.exhaust}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Intake side */}
      {intakeFilters.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-sky-400" />
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Intake Side — Clean Air Going In ({intakeFilters.length} slot{intakeFilters.length !== 1 ? 's' : ''})</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {intakeFilters.map(filter => (
              <FilterCard key={filter.key} filter={filter} />
            ))}
          </div>
        </div>
      )}

      {/* Exhaust side */}
      {exhaustFilters.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Exhaust Side — Overspray Coming Out ({exhaustFilters.length} slot{exhaustFilters.length !== 1 ? 's' : ''})</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exhaustFilters.map(filter => (
              <FilterCard key={filter.key} filter={filter} />
            ))}
          </div>
        </div>
      )}

      {/* Replacement cycle info */}
      {brand.replacementCycle && (
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5 mb-8">
          <h4 className="font-semibold text-white mb-3">Recommended Replacement Cycle</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {brand.replacementCycle.intake && (
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                <div className="text-xs text-white/50 mb-1">Intake / Ceiling</div>
                <div className="text-sm font-medium text-white">{brand.replacementCycle.intake}</div>
              </div>
            )}
            {brand.replacementCycle.exhaust && (
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                <div className="text-xs text-white/50 mb-1">Exhaust Arrestors</div>
                <div className="text-sm font-medium text-white">{brand.replacementCycle.exhaust}</div>
              </div>
            )}
            {brand.replacementCycle.ceiling && (
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                <div className="text-xs text-white/50 mb-1">Ceiling Media</div>
                <div className="text-sm font-medium text-white">{brand.replacementCycle.ceiling}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link href="/shop">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2">
            <ShoppingCart className="w-4 h-4" /> Browse All Filters
          </Button>
        </Link>
        <button onClick={onReset}>
          <Button variant="outline" className="border-white/20 text-white/90 hover:bg-white/5 gap-2">
            <Search className="w-4 h-4" /> Search Another Booth
          </Button>
        </button>
        <Link href="/contact">
          <Button variant="outline" className="border-white/20 text-white/90 hover:bg-white/5 gap-2">
            <Phone className="w-4 h-4" /> Request Custom Cut
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Individual filter card
function FilterCard({ filter }: { filter: { key: string; label: string; sizes: string[]; description: string; shopSlug: string; color: string } }) {
  const colorMap: Record<string, string> = {
    sky: 'border-sky-500/20 bg-sky-500/5',
    teal: 'border-teal-500/20 bg-teal-500/5',
    emerald: 'border-emerald-500/20 bg-emerald-500/5',
    orange: 'border-orange-500/20 bg-orange-500/5',
  };
  const iconColorMap: Record<string, string> = {
    sky: 'text-sky-300',
    teal: 'text-teal-300',
    emerald: 'text-emerald-300',
    orange: 'text-orange-300',
  };

  return (
    <Card className={`bg-[#0a0a0a] border-white/10 hover:border-white/20 transition-colors overflow-hidden`}>
      <CardContent className="p-5">
        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 ${colorMap[filter.color]}`}>
          <ShoppingCart className={`w-4.5 h-4.5 ${iconColorMap[filter.color]}`} />
        </div>
        <h4 className="font-bold text-white text-sm mb-1">{filter.label}</h4>
        <p className="text-xs text-white/55 mb-3 line-clamp-2">{filter.description}</p>

        {/* Sizes */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1.5">Sizes for this booth</div>
          <div className="flex flex-wrap gap-1.5">
            {filter.sizes.map(size => (
              <Link key={size} href={`/shop?category=${encodeURIComponent(filter.shopSlug)}&size=${encodeURIComponent(size.replace(/[""]/g, '').replace(/×/g, 'x'))}`}>
                <span className="inline-block px-2.5 py-1 rounded-md text-xs bg-white/[0.06] border border-white/10 text-white/85 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-white transition-colors cursor-pointer">
                  {size}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Shop button */}
        <Link href={`/shop?category=${encodeURIComponent(filter.shopSlug)}`}>
          <Button size="sm" className="w-full bg-blue-600/80 hover:bg-blue-500 text-white text-xs gap-1.5">
            <ShoppingCart className="w-3 h-3" /> Shop {filter.label.split(' (')[0]}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
