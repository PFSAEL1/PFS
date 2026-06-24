// PfsBoothCompatibility — collapsible "Works in these PFS booths" section
// for the product detail page. Renders only when the product matches a
// recognized PFS-booth filter role.
import { useState } from 'react';
import { ChevronDown, Wind, ChevronRight } from 'lucide-react';
import { getPfsBoothCompatibility } from '@/lib/productSignals';

export const PfsBoothCompatibility = ({ product }: { product: any }) => {
  const [open, setOpen] = useState(true);
  const rows = getPfsBoothCompatibility(product);
  if (!rows || rows.length === 0) return null;

  return (
    <section className="mt-6 max-w-3xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.07] bg-[#161616] px-5 py-4 text-left transition-colors hover:border-white/20"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 text-lg font-semibold text-white">
          <Wind className="h-5 w-5 text-teal-400" />
          Fits These PFS Booths
        </span>
        <ChevronDown
          className={`h-5 w-5 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.07]">
          <ul>
            {rows.map((row) => (
              <li
                key={`${row.booth}-${row.position}`}
                className="flex items-start gap-3 px-5 py-4 bg-[#1e1e1e] border-b border-white/[0.05]"
              >
                <ChevronRight
                  className="mt-1 h-4 w-4 shrink-0"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-semibold text-white">{row.booth}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                        row.position === 'Intake'
                          ? 'bg-teal-500/15 text-teal-300'
                          : 'bg-blue-500/15 text-blue-300'
                      }`}
                    >
                      {row.position}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/80">{row.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="bg-[#1e1e1e] px-5 py-3 text-xs text-white/55">
            Not sure which configuration you have (heated vs. non-heated)?{' '}
            <a href="/filter-compatibility" className="text-teal-400 hover:underline">
              Use the compatibility finder
            </a>{' '}
            or{' '}
            <a href="/contact" className="text-teal-400 hover:underline">
              contact us
            </a>{' '}
            and we’ll confirm the exact fit.
          </p>
        </div>
      )}
    </section>
  );
};
