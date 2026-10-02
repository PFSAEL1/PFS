import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

export const PARKER_CASE_HANDLE = 'parker-loadtech-merv14-20x20x4-single-header-case-3';

export const PARKER_SHORT_DESCRIPTION =
  'PFS Filters offers the Parker LoadTECH MERV 14 rigid-cell filter in a case of three. Each nominal 20 × 20 × 4 in filter has a single header on the air-entering side and gold synthetic E-Pleat media. Confirm your installed dimensions and header orientation before ordering.';

export function ParkerProductDetails() {
  const [open, setOpen] = useState(false);
  const panelId = 'parker-product-details';

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="flex min-w-0 items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
          <span>
            <span className="block font-semibold text-white">Product details & specifications</span>
            <span className="mt-1 block text-sm leading-relaxed text-white/60">
              Size, construction, model and ordering notes
            </span>
          </span>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={panelId} className="border-t border-white/10 px-5 py-5 text-sm leading-6 text-white/75">
          <p>
            Parker LoadTECH® MERV 14 extended-surface rigid-cell filters use gold synthetic E-Pleat® media
            in a high-impact polystyrene frame. This listing is for the single-header model
            <strong className="text-white"> PLT4-M14-13-PH</strong>, Parker part
            <strong className="text-white"> 1136513</strong>; the 3/4-in header is on the air-entering side.
            It is not the no-header model 1136403.
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['Nominal size, each filter', '20 × 20 × 4 in'],
              ['Actual size, each filter', '19-3/8 × 19-3/8 × 3-3/4 in'],
              ['Efficiency', 'MERV 14'],
              ['Rated airflow, each filter', '1,400 CFM at 500 FPM'],
              ['Manufacturer initial resistance', '0.51 in. w.g.'],
              ['Media area, each filter', '37 sq ft'],
              ['Construction', 'Gold synthetic E-Pleat media; high-impact polystyrene frame'],
              ['Pack size', 'Three filters per case; quantity 1 in the cart = one case'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/90">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            The displayed price is for the complete case, not an individual filter. This item is
            available to order, but no on-hand stock or specific fulfillment time is promised.
            Shipping is calculated separately at checkout. Confirm equipment fit, installed
            dimensions and header orientation before ordering. For a delivery estimate or a fit check,
            {' '}<a href="/contact" className="font-medium text-blue-400 hover:underline">contact PFS Filters</a>.
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-white/50">
            Specifications from Parker’s{' '}
            <a
              href="https://www.purolatorairfilters.com/pdfs/parker_load_tech.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              LoadTECH MERV 14 brochure, including the single-header specifications
            </a>. The manufacturer photograph is representative of the LoadTECH filter series;
            verify the ordered model’s single-header configuration using the specifications above.
          </p>
        </div>
      )}
    </section>
  );
}
