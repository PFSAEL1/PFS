import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';

export const AFC_CASE_HANDLE = 'afc-2-pocket-blue-poly-exhaust-cube-20x20x15-no-header-case-6';

export const AFC_SHORT_DESCRIPTION =
  'PFS Filters offers this AFC two-pocket blue polyester cube for paint booth exhaust filtration. Each nominal 20 × 20 × 15 in no-header filter is supplied in a case of six. Confirm your installed opening and filter configuration before ordering.';

export function AfcProductDetails() {
  const [open, setOpen] = useState(false);
  const panelId = 'afc-product-details';
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
            <span className="block font-semibold text-white">Product details &amp; specifications</span>
            <span className="mt-1 block text-sm leading-relaxed text-white/60">Size, pockets, efficiency and case quantity</span>
          </span>
        </span>
        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div id={panelId} className="border-t border-white/10 px-5 py-5 text-sm leading-6 text-white/75">
          <p>
            AFC filter number <strong className="text-white">C2PPEB202015-6</strong> is a blue polyester two-pocket
            exhaust cube with no galvanized steel header. PFS ordering SKU is
            <strong className="text-white"> PFS-C2PPEB202015-6</strong>.
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['Nominal size, each filter', '20 × 20 × 15 in'],
              ['Pocket count', 'Two pockets per filter'],
              ['Configuration', 'Blue polyester exhaust cube; no galvanized steel header'],
              ['Efficiency', 'MERV 11, per supplied product specifications'],
              ['Pack size', 'Six filters per case; quantity 1 in the cart = one case'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/90">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            The displayed price is for the entire case, not one filter. Available to order without a claim of
            stock on hand or a guaranteed fulfillment date. Shipping is separate; confirm packed weight,
            delivery options and equipment fit before ordering.{' '}
            <a href="/contact" className="font-medium text-blue-400 hover:underline">Contact PFS Filters</a> for help.
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-white/50">
            Product identity, configuration, MERV rating and case quantity are from the product information supplied
            by PFS. The photo was supplied by the owner and its white background was removed without altering the filter.
          </p>
        </div>
      )}
    </section>
  );
}
