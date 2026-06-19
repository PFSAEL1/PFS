// ProductSpecs — collapsible technical spec table for the product detail page.
import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { getProductSpecs } from '@/lib/productSignals';

export const ProductSpecs = ({ product }: { product: any }) => {
  const [open, setOpen] = useState(true);
  const specs = getProductSpecs(product);
  if (!specs || specs.length === 0) return null;

  return (
    <section className="mt-12 max-w-3xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-5 py-4 text-left transition-colors hover:border-white/20"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 text-lg font-semibold text-white">
          <FileText className="h-5 w-5 text-blue-400" />
          Technical Specifications
        </span>
        <ChevronDown
          className={`h-5 w-5 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <tbody>
              {specs.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#101010]'}
                >
                  <th className="w-2/5 px-5 py-3.5 text-left align-top font-medium text-white/70">
                    {row.label}
                  </th>
                  <td className="px-5 py-3.5 align-top text-white">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="bg-[#101010] px-5 py-3 text-xs text-white/55">
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
