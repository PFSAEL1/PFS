// Hero — charcoal filter lineup. The first frame is the preloaded AVIF.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, ShoppingBag } from 'lucide-react';

const FIRST_IMAGE = '/images/hero/exhaust-roll.avif';

type Frame = {
  id: string;
  eyebrow: string;
  name: string;
  benefit: string;
  href: string;
  image: string;
  width: number;
  height: number;
  alt: string;
};

const FRAMES: Frame[] = [
  {
    id: 'exhaust',
    eyebrow: 'EXHAUST',
    name: '22 gram fiberglass roll',
    benefit: '20×100 and 36×100 rolls for the exhaust bank.',
    href: '/product/20x100x2-22-gram-fiberglass-exhaust-roll-1-cs',
    image: FIRST_IMAGE,
    width: 1080,
    height: 1080,
    alt: '22 gram fiberglass paint arrestor exhaust roll',
  },
  {
    id: 'pads',
    eyebrow: 'PADS',
    name: '22 gram arrestor pads',
    benefit: '20×20×2 pads, packed 50 to a case.',
    href: '/product/20x20x2-22-gram-fiberglass-paint-arrestor-pads-50-cs',
    image: '/images/hero/arrestor-pads.avif',
    width: 1080,
    height: 1080,
    alt: '22 gram fiberglass paint arrestor pads, 20 by 20 by 2 inches, 50 per case',
  },
  {
    id: 'tacky',
    eyebrow: 'INTAKE',
    name: 'Tacky intake panels',
    benefit: 'Tackified panels on the air entering the booth.',
    href: '/category/tacky-panels',
    image: '/images/hero/tacky-panels.avif',
    width: 1080,
    height: 1080,
    alt: 'Tacky panel intake filter for a paint booth',
  },
  {
    id: 'ceiling',
    eyebrow: 'CEILING',
    name: 'Ceiling diffusion media',
    benefit: 'Overhead blankets for downdraft and semi-downdraft booths.',
    href: '/category/ceiling-blankets',
    image: '/images/hero/ceiling-media.avif',
    width: 1080,
    height: 1080,
    alt: 'Ceiling diffusion media for a downdraft paint booth',
  },
  {
    id: 'pockets',
    eyebrow: 'ARRESTOR',
    name: 'Paint Pockets',
    benefit: '20×20 multi-pocket arrestors, 30 per case.',
    href: '/product/20x20-paint-pockets-paint-arrestor-30-cs',
    image: '/images/hero/paint-pockets.avif',
    width: 1080,
    height: 1080,
    alt: 'Paint Pockets paint arrestor, 20 by 20 inches, 30 per case',
  },
];

export const Hero = () => {
  const runRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [armed, setArmed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 1023px)');
    const sync = () => {
      setReduced(reduceQuery.matches);
      setMobile(mobileQuery.matches);
    };
    sync();
    reduceQuery.addEventListener('change', sync);
    mobileQuery.addEventListener('change', sync);
    return () => {
      reduceQuery.removeEventListener('change', sync);
      mobileQuery.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const arm = () => setArmed(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(arm, { timeout: 1800 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(arm, 900);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (reduced || mobile) return;
    const node = runRef.current;
    if (!node) return;
    let frame = 0;
    let watching = true;

    const tick = () => {
      frame = 0;
      if (!watching) return;
      const travel = node.offsetHeight - window.innerHeight;
      const progress = travel <= 0 ? 0 : Math.min(1, Math.max(0, -node.getBoundingClientRect().top / travel));
      const next = Math.min(FRAMES.length - 1, Math.floor(progress * FRAMES.length * 0.999));
      const local = (progress * FRAMES.length) % 1;
      node.style.setProperty('--tilt', ((local - 0.5) * 5).toFixed(2));
      if (indexRef.current !== next) {
        indexRef.current = next;
        setIndex(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      watching = entry.isIntersecting;
      if (watching) onScroll();
    });
    observer.observe(node);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, mobile]);

  useEffect(() => {
    if (reduced || !mobile || paused) return;
    const node = runRef.current;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (node) observer.observe(node);
    const id = window.setInterval(() => {
      if (!visible) return;
      setIndex((current) => {
        const next = (current + 1) % FRAMES.length;
        indexRef.current = next;
        return next;
      });
    }, 4200);
    return () => {
      observer.disconnect();
      window.clearInterval(id);
    };
  }, [reduced, mobile, paused]);

  const go = (next: number) => {
    const wrapped = (next + FRAMES.length) % FRAMES.length;
    indexRef.current = wrapped;
    setIndex(wrapped);
    setArmed(true);
    setPaused(true);
  };

  const frame = FRAMES[index];

  const photo = (item: Frame, priority: boolean) => (
    <img
      src={item.image}
      alt={item.alt}
      width={item.width}
      height={item.height}
      data-fit="cover"
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );

  return (
    <header>
      <section
        id="home"
        ref={runRef}
        className={`hero-shell${reduced ? ' is-static' : ''}`}
      >
        <div className="hero-pin">
          <div className="hero-copy">
            <p className="hero-kicker">Filtration</p>
            <h1 className="hero-headline">
              <span className="hero-tier1">A Filter Program Built to</span>
              <span className="hero-tier2">Manage Your Entire Booth</span>
            </h1>
            <p className="serif-lead">
              Exhaust rolls, arrestor pads, tacky panels, ceiling media, and paint pockets.
            </p>
            <p className="hero-sub">
              Auto-reorder on your schedule. Booth-specific filter tracking. Backed by 30+ years of PFS Spray Booths expertise. Keep routine filter replacement organized.
            </p>
            <div className="hero-actions">
              <Link href="/shop">
                <Button size="lg" className="btn-primary text-base">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Filters Now
                </Button>
              </Link>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-ghost text-base"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get a Custom Quote
                </Link>
              </Button>
            </div>
          </div>

          {reduced ? (
            <ul className="hero-static">
              {FRAMES.map((item) => (
                <li key={item.id}>
                  <div className="hero-stage">{photo(item, item.id === 'exhaust')}</div>
                  <p className="hero-kicker">{item.eyebrow}</p>
                  <h2>{item.name}</h2>
                  <p>{item.benefit}</p>
                  <Link href={item.href}>Shop</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="hero-showcase"
              onPointerDown={() => setPaused(true)}
              onFocus={() => setPaused(true)}
            >
              <div
                className="hero-stage"
                role="region"
                aria-roledescription="carousel"
                aria-label="Filter lineup"
              >
                {mobile ? (
                  <div className="hero-track" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                    {FRAMES.map((item, itemIndex) => (
                      <div className="hero-slide" key={item.id} aria-hidden={itemIndex !== index}>
                        {(itemIndex === 0 || armed) ? photo(item, itemIndex === 0) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  FRAMES.map((item, itemIndex) => (
                    <div
                      className={`hero-frame${itemIndex === index ? ' is-active' : ''}`}
                      key={item.id}
                      aria-hidden={itemIndex !== index}
                    >
                      {(itemIndex === 0 || armed) ? photo(item, itemIndex === 0) : null}
                    </div>
                  ))
                )}
              </div>
              <div className="hero-caption">
                <p className="hero-kicker">{frame.eyebrow}</p>
                <h2>{frame.name}</h2>
                <p>{frame.benefit}</p>
                <Link href={frame.href}>Shop</Link>
              </div>
              <div className="hero-progress" role="tablist" aria-label="Filter types">
                {FRAMES.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={itemIndex === index}
                    aria-label={item.name}
                    onClick={() => go(itemIndex)}
                  />
                ))}
              </div>
              {mobile ? (
                <div className="hero-controls">
                  <button type="button" onClick={() => go(index - 1)} aria-label="Previous filter">Prev</button>
                  <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
                    {paused ? 'Play' : 'Pause'}
                  </button>
                  <button type="button" onClick={() => go(index + 1)} aria-label="Next filter">Next</button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </header>
  );
};
