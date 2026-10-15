import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { BOOTH_BRANDS, BOOTH_TYPES, type BoothBrand, type BoothModel, type BoothType } from '@/data/boothBrands';

const STAGE_LINKS: Record<string, string> = {
  ceiling: '/ceiling-filters',
  intake: '/intake-filters',
  exhaust: '/exhaust-filters',
  prefilter: '/shop?category=pre-filters',
};

const STAGE_LABELS: Record<string, string> = {
  ceiling: 'Ceiling',
  intake: 'Intake',
  exhaust: 'Exhaust',
  prefilter: 'Prefilter',
};

export function HomeFilterFinder() {
  const [boothType, setBoothType] = useState<BoothType | ''>('');
  const [brandSlug, setBrandSlug] = useState('');
  const [modelName, setModelName] = useState('');

  const brands = useMemo(() => {
    if (!boothType) return [];
    return BOOTH_BRANDS
      .filter((brand) => brand.models.some((model) => model.type === boothType))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [boothType]);

  const brand = brands.find((item) => item.slug === brandSlug) ?? null;
  const models = useMemo(() => {
    if (!brand || !boothType) return [];
    return brand.models.filter((model) => model.type === boothType);
  }, [brand, boothType]);
  const model = models.find((item) => item.name === modelName) ?? null;

  const selectType = (type: BoothType) => {
    setBoothType(type);
    setBrandSlug('');
    setModelName('');
  };

  const selectBrand = (next: BoothBrand) => {
    setBrandSlug(next.slug);
    setModelName('');
  };

  return (
    <section id="filter-finder" aria-labelledby="home-finder-title" className="rounded-2xl border border-white/15 bg-black/75 p-4 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] backdrop-blur-md sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ec5ff]">Filter Finder</p>
          <h2 id="home-finder-title" className="mt-1 text-2xl font-extrabold uppercase leading-none text-white sm:text-3xl">
            Booth type, then brand, then model
          </h2>
        </div>
        <Link href="/filter-finder" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#8ec5ff] hover:text-white">
          Open the full finder
        </Link>
      </div>

      <ol className="grid gap-4 lg:grid-cols-3">
        <li>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">1 · Booth type</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(BOOTH_TYPES) as BoothType[]).map((type) => {
              const selected = boothType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => selectType(type)}
                  aria-pressed={selected}
                  className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-[background-color,border-color,transform] duration-200 ${selected ? 'border-[#0081f2] bg-[#0081f2] text-white' : 'border-white/15 bg-white/[0.04] text-white hover:border-[#0081f2]/60'}`}
                >
                  {BOOTH_TYPES[type].label}
                </button>
              );
            })}
          </div>
        </li>

        <li>
          <label htmlFor="home-finder-brand" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">2 · Brand</label>
          <select
            id="home-finder-brand"
            value={brandSlug}
            disabled={!boothType}
            onChange={(event) => {
              const next = brands.find((item) => item.slug === event.target.value);
              if (next) selectBrand(next);
              else setBrandSlug('');
            }}
            className="min-h-11 w-full rounded-lg border border-white/15 bg-[#111] px-3 text-sm text-white disabled:opacity-50"
          >
            <option value="">{boothType ? `${brands.length} brands` : 'Choose a booth type'}</option>
            {brands.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
          {boothType && (
            <p className="mt-2 text-xs leading-relaxed text-white/55">{BOOTH_TYPES[boothType].description}</p>
          )}
        </li>

        <li>
          <label htmlFor="home-finder-model" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">3 · Model</label>
          <select
            id="home-finder-model"
            value={modelName}
            disabled={!brand}
            onChange={(event) => setModelName(event.target.value)}
            className="min-h-11 w-full rounded-lg border border-white/15 bg-[#111] px-3 text-sm text-white disabled:opacity-50"
          >
            <option value="">{brand ? `${models.length} models` : 'Choose a brand'}</option>
            {models.map((item) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
          {model && <FinderResult brand={brand} model={model} />}
        </li>
      </ol>
    </section>
  );
}

function FinderResult({ brand, model }: { brand: BoothBrand | null; model: BoothModel }) {
  const stages = (Object.keys(model.filters) as Array<keyof BoothModel['filters']>)
    .filter((stage) => (model.filters[stage] || []).length > 0);

  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-sm font-semibold text-white">{brand?.name} {model.name}</p>
      <p className="mt-1 text-xs text-white/55">Recorded sizes are guidance. Confirm the installed filter before ordering.</p>
      <ul className="mt-2 space-y-1">
        {stages.map((stage) => (
          <li key={stage} className="text-xs leading-relaxed text-white/75">
            <Link href={STAGE_LINKS[stage] || '/shop'} className="font-semibold text-[#8ec5ff] hover:text-white">
              {STAGE_LABELS[stage] || stage}
            </Link>
            {': '}
            {(model.filters[stage] || []).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
