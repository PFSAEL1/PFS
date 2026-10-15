// Dark version of Apple's "Explore the lineup" row.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDiscountedPrice } from '@/hooks/usePricing';

const TINTS = [
  'linear-gradient(165deg, #1a2728 0%, #10181a 52%, #0c1214 100%)',
  'linear-gradient(165deg, #1c2228 0%, #12161c 52%, #0e1116 100%)',
  'linear-gradient(165deg, #1a2026 0%, #12181e 52%, #0e1418 100%)',
  'linear-gradient(165deg, #222426 0%, #151718 55%, #101112 100%)',
  'linear-gradient(165deg, #241f1c 0%, #161412 52%, #12100f 100%)',
];

export function tintFor(text: string, index = 0): string {
  const value = text.toLowerCase();
  if (/ceiling|blanket|diffusion/.test(value)) return TINTS[0];
  if (/exhaust|fiberglass|arrestor|andreae|paint pocket/.test(value)) return TINTS[4];
  if (/tacky|intake|pad/.test(value)) return TINTS[2];
  if (/merv|pleat|pre-?filter|prefilter/.test(value)) return TINTS[1];
  if (/roll/.test(value)) return TINTS[3];
  return TINTS[index % TINTS.length];
}

export function plainText(value: string | null | undefined): string {
  return (value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatFromPrice(amounts: number[], discountPercent = 0): { price: string; compare: string | null } | null {
  const values = amounts.filter((amount) => Number.isFinite(amount) && amount > 0);
  if (values.length === 0) return null;
  const min = Math.min(...values);
  const shown = discountPercent > 0 ? getDiscountedPrice(min, discountPercent) : min;
  return {
    price: `From $${shown.toFixed(2)}`,
    compare: discountPercent > 0 ? `$${min.toFixed(2)}` : null,
  };
}

export function LineupHeader({
  title,
  href,
  linkLabel,
  heading = 'h2',
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  heading?: 'h1' | 'h2';
}) {
  const Tag = heading;
  return (
    <div className="mb-8 flex items-end justify-between gap-4 md:mb-12">
      <Tag className="normal-case text-[2rem] font-semibold leading-none tracking-tight text-white md:text-5xl">
        {title}
      </Tag>
      {href && linkLabel ? (
        <Link href={href} className="inline-flex min-h-11 shrink-0 items-center text-base font-medium text-[#0081f2] hover:underline md:text-lg">
          {linkLabel} <span aria-hidden="true">›</span>
        </Link>
      ) : null}
    </div>
  );
}

export type LineupCardProps = {
  href: string;
  title: string;
  description?: string;
  image: string;
  imageSrcSet?: string;
  avifSrcSet?: string;
  alt: string;
  tint: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  badge?: string | null;
  kicker?: string | null;
  price?: string | null;
  comparePrice?: string | null;
  buyLabel?: string | null;
  onBuy?: () => void;
  buyHref?: string;
  buyDisabled?: boolean;
  fallbackSrc?: string;
};

export function LineupCard({
  href,
  title,
  description,
  image,
  imageSrcSet,
  avifSrcSet,
  alt,
  tint,
  width = 640,
  height = 640,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  badge,
  kicker,
  price,
  comparePrice,
  buyLabel,
  onBuy,
  buyHref,
  buyDisabled,
  fallbackSrc,
}: LineupCardProps) {
  const imageEl = (
    <img
      src={image}
      srcSet={imageSrcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={(event) => {
        const failed = event.currentTarget;
        if (!fallbackSrc || failed.dataset.fallbackApplied) return;
        failed.dataset.fallbackApplied = 'true';
        failed.src = fallbackSrc;
      }}
      className="relative z-[1] h-full w-full object-contain"
    />
  );

  return (
    <article data-lineup-card className="group flex min-w-0 flex-col text-center">
      <Link href={href} className="block rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0081f2]">
        <div className="lineup-tile" style={{ background: tint }}>
          {avifSrcSet ? (
            <picture className="relative z-[1] block h-full w-full">
              <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
              {imageEl}
            </picture>
          ) : imageEl}
        </div>
      </Link>
      <div className="px-2 pt-5">
        {badge ? <p className="mb-1 text-sm font-semibold text-[#ff9f0a]">{badge}</p> : null}
        {kicker && !badge ? <p className="mb-1 text-sm font-medium text-[#a1a1a6]">{kicker}</p> : null}
        <h3 className="normal-case line-clamp-2 text-[1.5rem] font-semibold leading-[1.15] tracking-tight text-white">
          <Link href={href} className="hover:underline">{title}</Link>
        </h3>
        {description ? (
          <p className="mt-2 line-clamp-2 text-base leading-snug text-[#a1a1a6]">{description}</p>
        ) : (
          <p className="mt-2 line-clamp-2 text-base leading-snug text-transparent" aria-hidden="true">.</p>
        )}
        {price ? (
          <p className="mt-3 text-base text-white">
            {price}
            {comparePrice ? <span className="ml-2 text-sm text-[#a1a1a6] line-through">{comparePrice}</span> : null}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <Link href={href} className="inline-flex min-h-11 items-center text-base font-medium text-[#0081f2] hover:underline">
            Learn more <span aria-hidden="true">›</span>
          </Link>
          {buyLabel && buyHref ? (
            <Link href={buyHref} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0081f2] px-5 text-base font-medium text-[#0081f2] transition-colors hover:bg-[#0081f2]/10">
              {buyLabel}
            </Link>
          ) : buyLabel ? (
            <button
              type="button"
              onClick={onBuy}
              disabled={buyDisabled || !onBuy}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0081f2] px-5 text-base font-medium text-[#0081f2] transition-colors hover:bg-[#0081f2]/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {buyLabel}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function LineupCarousel({ label, children }: { label: string; children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: false });

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const prev = el.scrollLeft > 8;
    const next = max > 8 && el.scrollLeft < max - 8;
    setEdges((current) => (current.prev === prev && current.next === next ? current : { prev, next }));
  };

  useLayoutEffect(() => {
    update();
  }, [children]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => update();
    el.addEventListener('scroll', onScroll, { passive: true });
    const observer = new ResizeObserver(() => update());
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [children]);

  const move = (direction: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-lineup-card]');
    const delta = (card?.offsetWidth || 300) + 24;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * delta, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="relative" role="region" aria-label={label}>
      {edges.prev ? (
        <button type="button" className="lineup-arrow left-1 md:left-0" aria-label={`Show previous ${label}`} onClick={() => move(-1)}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
      {edges.next ? (
        <button type="button" className="lineup-arrow right-1 md:right-0" aria-label={`Show next ${label}`} onClick={() => move(1)}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
      <div ref={scrollerRef} className="lineup-scroll" tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
