import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import kochProductDetails from '@/data/kochProductDetails.json';

type KochDetailSection = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
};

export type KochDetailRecord = {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  highlights: Array<{ label: string; value: string }>;
  sections: KochDetailSection[];
  sourceLabel: string;
};

const detailsByHandle = kochProductDetails as Record<string, KochDetailRecord>;

export function getKochProductDetails(handle?: string): KochDetailRecord | undefined {
  return handle ? detailsByHandle[handle] : undefined;
}

export function KochProductDetails({ handle }: { handle?: string }) {
  const [open, setOpen] = useState(false);
  const details = getKochProductDetails(handle);

  if (!details) return null;

  const panelId = `koch-product-details-${handle}`;

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
            <span className="block font-semibold text-white">{details.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-white/60">{details.summary}</span>
          </span>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={panelId} className="border-t border-white/10 px-5 py-5">
          <dl className="mb-6 grid gap-3 sm:grid-cols-2">
            {details.highlights.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-white/90">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="space-y-6">
            {details.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-base font-semibold text-white">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-2 text-sm leading-6 text-white/70">
                    {paragraph}
                  </p>
                ))}
                {section.bullets.length > 0 && (
                  <ul className="mt-2 space-y-2 pl-5 text-sm leading-6 text-white/70">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc marker:text-blue-400">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-white/50">
            <p>{details.sourceLabel}</p>
            <p className="mt-1">
              Need a fit or submittal check?{' '}
              <a href="/contact" className="font-medium text-blue-400 hover:underline">
                Contact PFS Filters
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
