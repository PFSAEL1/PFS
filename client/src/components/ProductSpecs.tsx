// ProductSpecs — collapsible technical spec table for the product detail page.
import { useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import { getProductSpecs } from '@/lib/productSignals';

export const ProductSpecs = ({ product }: { product: any }) => {
  const [open, setOpen] = useState(true);
  const specs = getProductSpecs(product);
  if (!specs || specs.length === 0) return null;

  return (
    <section className="mt-12 max-w-3xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition-colors hover:border-white/20"
        style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 text-lg font-semibold" style={{ color: '#ffffff' }}>
          <List className="h-4 w-4 shrink-0" style={{ color: 'rgba(59,130,246,0.8)' }} aria-hidden="true" />
          Technical Specifications
        </span>
        <ChevronDown
          className={`h-5 w-5 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-3 overflow-hidden rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}>
          <table className="w-full text-sm">
            <tbody>
              {specs.map((row) => (
                <tr
                  key={row.label}
                  style={{ background: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <th className="w-2/5 px-5 py-3.5 text-left align-top font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {row.label}
                  </th>
                  <td className="px-5 py-3.5 align-top" style={{ color: '#ffffff' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-5 py-3 text-xs text-white/55" style={{ background: '#1e1e1e' }}>
            Specs are typical for this product family. Need to confirm an exact booth fit?{' '}
            <a href="/contact" className="text-blue-400 hover:underline">
              Contact us
            </a>{' '}
            and we’ll match it.
          </p>
        </div>
      )}
    </section>
  );
};
