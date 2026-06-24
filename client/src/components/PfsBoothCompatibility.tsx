// PfsBoothCompatibility — collapsible "Works in these PFS booths" section
// for the product detail page. Renders only when the product matches a
// recognized PFS-booth filter role.
import { useState } from 'react';
import { ChevronDown, Filter, ChevronRight } from 'lucide-react';
import { getPfsBoothCompatibility } from '@/lib/productSignals';

export const PfsBoothCompatibility = ({ product }: { product: any }) => {
  const [open, setOpen] = useState(true);
  const rows = getPfsBoothCompatibility(product);
  if (!rows || rows.length === 0) return null;

  return (
    <section className="mt-6 max-w-3xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition-colors hover:border-white/20"
        style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 text-lg font-semibold" style={{ color: '#ffffff' }}>
          <Filter className="h-4 w-4 shrink-0" style={{ color: 'rgba(59,130,246,0.8)' }} aria-hidden="true" />
          Fits These PFS Booths
        </span>
        <ChevronDown
          className={`h-5 w-5 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-3 overflow-hidden rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}>
          <ul>
            {rows.map((row) => (
              <li
                key={`${row.booth}-${row.position}`}
                className="flex items-start gap-3 px-5 py-4"
                style={{ background: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
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
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                      style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)' }}
                    >
                      {row.position}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/80">{row.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-xs text-white/55" style={{ background: '#1e1e1e' }}>
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
