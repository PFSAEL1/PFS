import { Toaster } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch, useLocation } from 'wouter';
import { lazy, Suspense, type ComponentType } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { importWithChunkRecovery } from './lib/chunkRecovery';

// Pages
import Home from './pages/Home';
const lazyRoute = <T extends ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
) => lazy(() => importWithChunkRecovery(importer));
const Shop = lazyRoute(() => import('./pages/Shop'));
const ProductDetail = lazyRoute(() => import('./pages/ProductDetail'));
const Blog = lazyRoute(() => import('./pages/Blog'));
const BlogPost = lazyRoute(() => import('./pages/BlogPost'));
const Contact = lazyRoute(() => import('./pages/Contact'));
const ThankYou = lazyRoute(() => import('./pages/ThankYou'));
const WhyChooseUs = lazyRoute(() => import('./pages/WhyChooseUs'));
const Memberships = lazyRoute(() => import('./pages/Memberships'));
const Auth = lazyRoute(() => import('./pages/Auth'));
const Dashboard = lazyRoute(() => import('./pages/Dashboard'));
const Returns = lazyRoute(() => import('./pages/Returns'));
const PrivacyPolicy = lazyRoute(() => import('./pages/PrivacyPolicy'));
const FilterScanner = lazyRoute(() => import('./pages/FilterScanner'));
const ShopBySize = lazyRoute(() => import('./pages/ShopBySize'));
const ShopByType = lazyRoute(() => import('./pages/ShopByType'));
const Brands = lazyRoute(() => import('./pages/Brands'));
const SubmitReview = lazyRoute(() => import('./pages/SubmitReview'));
const FilterDatabase = lazyRoute(() => import('./pages/FilterDatabase'));
const CategoryPage = lazyRoute(() => import('./pages/CategoryPage'));
const PaintBoothFilters = lazyRoute(() => import('./pages/PaintBoothFilters'));
const AndreaePaintBoothFilters = lazyRoute(() => import('./pages/AndreaePaintBoothFilters'));
const ExhaustFilters = lazyRoute(() => import('./pages/ExhaustFilters'));
const IntakeFilters = lazyRoute(() => import('./pages/IntakeFilters'));
const CeilingFilters = lazyRoute(() => import('./pages/CeilingFilters'));
const Prefilters = lazyRoute(() => import('./pages/Prefilters'));
const NeshapCompliantPaintBoothFilters = lazyRoute(() => import('./pages/NeshapCompliantPaintBoothFilters'));
const GarmatPaintBoothFilters = lazyRoute(() => import('./pages/GarmatPaintBoothFilters'));
const OemPaintBoothFilters = lazyRoute(() => import('./pages/OemPaintBoothFilters'));
const CaliforniaPaintBoothFilters = lazyRoute(() => import('./pages/CaliforniaPaintBoothFilters'));
const CaliforniaCarbCompliance = lazyRoute(() => import('./pages/CaliforniaCarbCompliance'));
const NotFound = lazyRoute(() => import('./pages/NotFound'));
const PfsVitra = lazyRoute(() => import('./pages/PfsVitra'));
const PfsVanguard = lazyRoute(() => import('./pages/PfsVanguard'));
const Consumables = lazyRoute(() => import('./pages/Consumables'));
const Aerospace = lazyRoute(() => import('./pages/Aerospace'));
const AerospaceHub = lazyRoute(() => import('./pages/AerospaceHub'));
const ShopByBooth = lazyRoute(() => import('./pages/ShopByBooth'));
const BrandDetail = lazyRoute(() => import('./pages/BrandDetail'));
const ShopByBoothType = lazyRoute(() => import('./pages/ShopByBoothType'));
const ShopByFilterType = lazyRoute(() => import('./pages/ShopByFilterType'));
const FilterFinder = lazyRoute(() => import('./pages/FilterFinder'));
const FAQPage = lazyRoute(() => import('./pages/FAQPage'));

const finderFallbackTypes = [
  'Downdraft',
  'Crossdraft',
  'Semi-Downdraft',
  'Side-Downdraft',
  'Open Face',
  'Prep Station',
];

const brandsFallback = [
  ['PFS Filters', 'Spray Booth Specialists'],
  ['Andover Healthcare', 'Industrial Grade Media'],
  ['Koch Filter', 'MERV-Rated Filters'],
  ['Permatron', 'Synthetic Media'],
];

function FilterFinderLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 32px', background: 'linear-gradient(180deg,#0a1628 0%,#040404 100%)' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(59,130,246,.24)', background: 'rgba(59,130,246,.1)', color: '#93c5fd', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
              FILTER FINDER · STEP 1 OF 4
            </div>
            <h1 style={{ margin: '0 0 12px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(2.4rem,11vw,4.25rem)', lineHeight: .92, fontWeight: 800, letterSpacing: 0, textTransform: 'uppercase' }}>
              What kind of booth do you have?
            </h1>
            <p style={{ margin: '0 auto', maxWidth: 672, color: 'rgba(255,255,255,.7)', fontSize: 18, lineHeight: 1.55 }}>
              Pick the booth airflow type that matches yours. We use this to narrow to brands and models that fit.
            </p>
          </div>
        </section>
        <section style={{ padding: '0 16px 64px' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {finderFallbackTypes.map((type) => (
              <div key={type} style={{ minHeight: 260, borderRadius: 16, border: '1px solid rgba(255,255,255,.1)', background: '#0a0a0a', overflow: 'hidden' }}>
                <div style={{ height: 160, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,rgba(255,255,255,.025),transparent)' }}>
                  <div style={{ position: 'relative', width: '100%', maxWidth: 280, height: '100%', border: '2px solid rgba(255,255,255,.45)', borderRadius: 4 }}>
                    <div style={{ position: 'absolute', left: '12%', right: '12%', top: '18%', height: 2, background: 'rgba(96,165,250,.72)' }} />
                    <div style={{ position: 'absolute', left: '12%', right: '12%', top: '48%', height: 2, background: 'rgba(96,165,250,.72)' }} />
                    <div style={{ position: 'absolute', left: '12%', right: '12%', top: '78%', height: 2, background: 'rgba(96,165,250,.72)' }} />
                    <div style={{ position: 'absolute', right: -10, top: '20%', bottom: '20%', width: 12, border: '1px solid rgba(251,146,60,.55)', background: 'rgba(251,146,60,.12)' }} />
                  </div>
                </div>
                <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,.05)' }}>
                  <h2 style={{ margin: '0 0 6px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 24, lineHeight: 1, fontWeight: 800 }}>{type}</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,.6)', fontSize: 14, lineHeight: 1.45 }}>Booth airflow and filter position guidance.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FilterScannerLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(59,130,246,.22)', background: 'rgba(59,130,246,.1)', color: '#60a5fa', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
              AI-Powered
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.5rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>
              Filter Scanner
            </h1>
            <p style={{ margin: '0 auto', maxWidth: 672, color: 'rgba(255,255,255,.55)', fontSize: 20, lineHeight: 1.55 }}>
              Photograph the filter and label to narrow catalog candidates. Verify the booth position and actual dimensions before ordering.
            </p>
          </div>
        </section>
        <div style={{ height: 48, background: 'linear-gradient(180deg,#050505,#0d0d0d)' }} />
        <section style={{ padding: '32px 16px 56px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 896, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 24 }}>
              {[
                ['1', 'Take a Photo', 'Photograph your existing filter — front, back, or the label.'],
                ['2', 'Review Candidates', 'Image analysis can narrow possible catalog matches but does not prove fitment.'],
                ['3', 'Verify and Order', 'Confirm the filter stage, label, and actual dimensions before adding a product to your cart.'],
              ].map(([step, title, copy]) => (
                <article key={step} style={{ minHeight: 210, border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, background: 'rgba(255,255,255,.03)', padding: 24, textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, margin: '0 auto 16px', borderRadius: 16, background: 'rgba(59,130,246,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontWeight: 800 }}>{step}</div>
                  <h2 style={{ margin: '0 0 8px', fontSize: 22, lineHeight: 1, fontWeight: 800 }}>{title}</h2>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,.58)', fontSize: 14, lineHeight: 1.45 }}>{copy}</p>
                </article>
              ))}
            </div>
            <article style={{ minHeight: 260, borderRadius: 14, border: '1px solid rgba(59,130,246,.22)', background: 'linear-gradient(135deg,rgba(59,130,246,.07),rgba(59,130,246,.12))', padding: 32, textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 10px', fontSize: 28, lineHeight: 1, fontWeight: 800 }}>Available on Gold & Platinum Plans</h2>
              <p style={{ maxWidth: 448, margin: '0 auto 22px', color: 'rgba(255,255,255,.58)', fontSize: 16, lineHeight: 1.55 }}>
                The AI Filter Scanner is included with Gold and Platinum memberships. Upgrade today to unlock instant filter identification, plus discounts on every order.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ minHeight: 40, minWidth: 184, borderRadius: 8, background: '#3b82f6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 800 }}>View Membership Plans</span>
                <span style={{ minHeight: 40, minWidth: 152, borderRadius: 8, border: '1px solid rgba(255,255,255,.22)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 800 }}>Sign In to Your Account</span>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

const ceilingBlanketsProductImage =
  'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cotton_roll_transparent.png?v=1778259131&width=480';
const ceilingBlanketsProductSrcSet =
  'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cotton_roll_transparent.png?v=1778259131&width=320 320w, https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cotton_roll_transparent.png?v=1778259131&width=480 480w, https://cdn.shopify.com/s/files/1/0972/9815/3604/files/cotton_roll_transparent.png?v=1778259131&width=640 640w';

function CeilingBlanketsLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(77,159,255,.3)', background: 'rgba(77,159,255,.1)', color: '#4d9fff', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
              Intake
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.5rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>
              Ceiling Blankets
            </h1>
            <p style={{ margin: 0, maxWidth: 672, color: 'rgba(255,255,255,.7)', fontSize: 18, lineHeight: 1.55 }}>
              Overhead intake filtration for downdraft and semi-downdraft booths. Ensures clean, even airflow from ceiling to floor.
            </p>
          </div>
        </section>
        <div style={{ height: 48, background: 'linear-gradient(180deg,#050505,#0d0d0d)' }} />
        <section style={{ padding: '32px 16px 56px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
            <article style={{ overflow: 'hidden', border: '1px solid #333', borderRadius: 12, background: 'linear-gradient(135deg,#212121,#1a1a1a)' }}>
              <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg,#1f1f1f,#151515)', borderBottom: '1px solid #292929', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={ceilingBlanketsProductImage}
                  srcSet={ceilingBlanketsProductSrcSet}
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                  alt="Ceiling Diffusion Media"
                  width="480"
                  height="480"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, boxSizing: 'border-box', filter: 'brightness(.95) contrast(1.05)' }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <h2 style={{ minHeight: 40, margin: '0 0 12px', fontSize: 15, lineHeight: 1.3, fontWeight: 700 }}>
                  Ceiling Diffusion Media
                </h2>
                <p style={{ margin: 0, color: '#60a5fa', fontWeight: 800 }}>$255.57 USD</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

const rollMediaProductImage = '/images/shop-thumbnails/22-gram-fiberglass-roll.webp';

function RollMediaLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(77,159,255,.3)', background: 'rgba(77,159,255,.1)', color: '#4d9fff', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
              Intake / Exhaust
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.5rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>
              Roll Media
            </h1>
            <p style={{ margin: 0, maxWidth: 672, color: 'rgba(255,255,255,.7)', fontSize: 18, lineHeight: 1.55 }}>
              Roll filtration media in current catalog widths, lengths, and constructions. Confirm the intended filter stage and dimensions before ordering.
            </p>
          </div>
        </section>
        <div style={{ height: 48, background: 'linear-gradient(180deg,#050505,#0d0d0d)' }} />
        <section style={{ padding: '32px 16px 56px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
            <article style={{ overflow: 'hidden', border: '1px solid #333', borderRadius: 12, background: 'linear-gradient(135deg,#212121,#1a1a1a)' }}>
              <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg,#1f1f1f,#151515)', borderBottom: '1px solid #292929', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={rollMediaProductImage}
                  srcSet={`${rollMediaProductImage} 480w`}
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                  alt="22-Gram Fiberglass Paint Arrestor Roll, 1/CS"
                  width="480"
                  height="480"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, boxSizing: 'border-box', filter: 'brightness(.95) contrast(1.05)' }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <h2 style={{ minHeight: 40, margin: '0 0 12px', fontSize: 15, lineHeight: 1.3, fontWeight: 700 }}>
                  22-Gram Fiberglass Paint Arrestor Roll, 1/CS
                </h2>
                <p style={{ margin: 0, color: '#60a5fa', fontWeight: 800 }}>$92.39 USD</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

const mervFiltersProductImage = '/images/shop-thumbnails/merv-10-pleated-filter.jpg';
const mervFiltersProductSrcSet = '/images/shop-thumbnails/merv-10-pleated-filter.jpg 320w';

function MervFiltersLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(77,159,255,.3)', background: 'rgba(77,159,255,.1)', color: '#4d9fff', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
              Intake
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.5rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>
              MERV-Rated Filters
            </h1>
            <p style={{ margin: 0, maxWidth: 672, color: 'rgba(255,255,255,.7)', fontSize: 18, lineHeight: 1.55 }}>
              High-efficiency filters rated by MERV standard for precise particle capture. MERV-10 and MERV-13 options for industrial operations.
            </p>
          </div>
        </section>
        <div style={{ height: 48, background: 'linear-gradient(180deg,#050505,#0d0d0d)' }} />
        <section style={{ padding: '32px 16px 56px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
            <article style={{ overflow: 'hidden', border: '1px solid #333', borderRadius: 12, background: 'linear-gradient(135deg,#212121,#1a1a1a)' }}>
              <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg,#1f1f1f,#151515)', borderBottom: '1px solid #292929', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={mervFiltersProductImage}
                  srcSet={mervFiltersProductSrcSet}
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                  alt="Pleated Air Filters MERV 10"
                  width="480"
                  height="480"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, boxSizing: 'border-box', filter: 'brightness(.95) contrast(1.05)' }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <h2 style={{ minHeight: 40, margin: '0 0 12px', fontSize: 15, lineHeight: 1.3, fontWeight: 700 }}>
                  Pleated Air Filters MERV 10
                </h2>
                <p style={{ margin: 0, color: '#60a5fa', fontWeight: 800 }}>$124.75 USD</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

function PolyesterMediaLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              EXHAUST
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.5rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>
              Polyester Media
            </h1>
            <p style={{ margin: 0, maxWidth: 672, color: 'rgba(255,255,255,.7)', fontSize: 18, lineHeight: 1.55 }}>
              Durable synthetic filtration media with excellent moisture resistance. Ideal for high-humidity environments and water-based coatings.
            </p>
          </div>
        </section>
        <div style={{ height: 100, background: 'linear-gradient(to bottom,#050505,#0d0d0d)' }} />
        <section style={{ padding: '48px 16px 56px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', padding: '64px 0' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}>
              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
              <path d="M12 22V12" />
              <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
              <path d="m7.5 4.27 9 5.15" />
            </svg>
            <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}>
              No products found
            </h2>
            <p style={{ margin: '0 auto 24px', maxWidth: 448, color: 'rgba(255,255,255,.7)', fontSize: 16, lineHeight: 1.5 }}>
              We couldn't find any products in this category right now. Browse all products or check back soon.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 40, padding: '0 16px', borderRadius: 8, background: '#3b82f6', color: '#fff', fontSize: 14, fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Browse All Products
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 40, padding: '0 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.6)', fontSize: 14, fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                All Categories
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function BrandsLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>
              Trusted Brands
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.5rem)', lineHeight: .92, fontWeight: 800, letterSpacing: 0, textTransform: 'uppercase' }}>
              Filter Brands We Carry
            </h1>
            <p style={{ margin: 0, maxWidth: 672, color: 'rgba(255,255,255,.5)', fontSize: 20, lineHeight: 1.55 }}>
              Browse manufacturers represented in the current catalog, then verify the product record, filter stage, and dimensions before ordering.
            </p>
          </div>
        </section>
        <section style={{ padding: '56px 16px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 896, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {brandsFallback.map(([name, specialty]) => (
              <article key={name} style={{ minHeight: 190, border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, background: 'rgba(255,255,255,.03)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <h2 style={{ margin: 0, fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 26, lineHeight: 1, fontWeight: 800 }}>{name}</h2>
                  <span style={{ height: 26, borderRadius: 999, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.55)', padding: '5px 8px', fontSize: 12, whiteSpace: 'nowrap' }}>{specialty}</span>
                </div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,.7)', fontSize: 14, lineHeight: 1.6 }}>Catalog products and replacement guidance represented in the current PFS Filters catalog.</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function VitraLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', color: 'rgba(255,255,255,.55)', fontSize: 14 }}>
            Home / Consumables / PFS VITRA
          </div>
        </section>
        <section style={{ padding: '56px 16px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1024, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'start' }}>
            <div style={{ aspectRatio: '1/1', minHeight: 320, borderRadius: 16, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: 999, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.05)', marginBottom: 24 }} />
              <p style={{ margin: '0 0 4px', color: 'rgba(255,255,255,.4)', fontSize: 18, fontWeight: 700 }}>Image Coming Soon</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,.25)', fontSize: 14 }}>Product design in progress</p>
              <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 128, height: 'auto', opacity: .2, marginTop: 32 }} decoding="async" />
            </div>
            <div style={{ minHeight: 520 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', minHeight: 26, padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(59,130,246,.22)', background: 'rgba(59,130,246,.1)', color: '#60a5fa', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Consumables</span>
              <h1 style={{ margin: '8px 0 8px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.25rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>PFS VITRA</h1>
              <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,.5)', fontSize: 20 }}>Glass Shield Washable Coating</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, minHeight: 52, marginBottom: 24 }}>
                <span style={{ color: '#60a5fa', fontSize: 44, fontWeight: 800 }}>$80.00</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 14 }}>USD</span>
              </div>
              <p style={{ minHeight: 112, margin: 0, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.7)', fontSize: 16, lineHeight: 1.7 }}>
                PFS VITRA is a professional-grade washable glass shield coating designed to protect your paint booth windows and glass surfaces from overspray buildup.
              </p>
              <div style={{ minHeight: 72, marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 14 }}>Quantity:</span>
                <div style={{ width: 116, height: 42, border: '1px solid rgba(255,255,255,.2)', borderRadius: 8 }} />
              </div>
              <div style={{ minHeight: 56, marginTop: 16, borderRadius: 10, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 800 }}>
                Add to Cart — $80.00
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const aerospaceProductImage =
  'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/ChatGPTImageMay7_2026_02_56_20PM_afa7fd40-2842-48f1-a421-981fe1201b0d.png?v=1778191017&width=480';
const aerospaceProductSrcSet =
  'https://cdn.shopify.com/s/files/1/0972/9815/3604/files/ChatGPTImageMay7_2026_02_56_20PM_afa7fd40-2842-48f1-a421-981fe1201b0d.png?v=1778191017&width=320 320w, https://cdn.shopify.com/s/files/1/0972/9815/3604/files/ChatGPTImageMay7_2026_02_56_20PM_afa7fd40-2842-48f1-a421-981fe1201b0d.png?v=1778191017&width=480 480w, https://cdn.shopify.com/s/files/1/0972/9815/3604/files/ChatGPTImageMay7_2026_02_56_20PM_afa7fd40-2842-48f1-a421-981fe1201b0d.png?v=1778191017&width=640 640w';

function AerospaceLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(59,130,246,.22)', background: 'rgba(59,130,246,.1)', color: 'rgba(255,255,255,.8)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>
              Aerospace & MRO Filtration
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(3rem,12vw,4.25rem)', lineHeight: .95, fontWeight: 800, letterSpacing: 0 }}>
              Aerospace Paint Booth Filters
            </h1>
            <p style={{ margin: '0 auto', maxWidth: 768, color: 'rgba(255,255,255,.62)', fontSize: 20, lineHeight: 1.55 }}>
              High-efficiency filtration media engineered for aircraft finishing, MRO hangars, and NESHAP-regulated aerospace environments. From ceiling diffusion to multi-stage exhaust capture.
            </p>
          </div>
        </section>
        <div style={{ height: 48, background: 'linear-gradient(180deg,#050505,#0d0d0d)' }} />
        <section style={{ padding: '32px 16px 56px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
            <article style={{ overflow: 'hidden', border: '1px solid #333', borderRadius: 12, background: 'linear-gradient(135deg,#212121,#1a1a1a)' }}>
              <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg,#1f1f1f,#151515)', borderBottom: '1px solid #292929', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={aerospaceProductImage}
                  srcSet={aerospaceProductSrcSet}
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, calc(100vw - 2rem)"
                  alt="Aerospace-Grade Filtration Bags & Panels"
                  width="480"
                  height="480"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12, boxSizing: 'border-box', filter: 'brightness(.95) contrast(1.05)' }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <h2 style={{ minHeight: 40, margin: '0 0 12px', fontSize: 15, lineHeight: 1.3, fontWeight: 700 }}>
                  Aerospace-Grade Filtration Bags & Panels
                </h2>
                <p style={{ margin: 0, color: '#60a5fa', fontWeight: 800 }}>Aerospace filtration media</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

function NovaVertaLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 40px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.1)' }}>Italy</span>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(77,159,255,.1)', color: '#4d9fff', border: '1px solid rgba(77,159,255,.2)', textTransform: 'capitalize' }}>Downdraft</span>
            </div>
            <h1 style={{ margin: '0 0 16px', fontFamily: '"Barlow Condensed", Arial, sans-serif', fontSize: 'clamp(2.6rem,10vw,3.5rem)', lineHeight: 1.05, fontWeight: 800, letterSpacing: 0 }}>
              Nova Verta Booth Filters
            </h1>
            <p style={{ margin: 0, maxWidth: 768, color: 'rgba(255,255,255,.7)', fontSize: 18, lineHeight: 1.55 }}>
              Premium Italian booth manufacturer specializing in high-efficiency downdraft systems. Known for their advanced curing technology and energy-saving designs favored by luxury and exotic vehicle shops.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24 }}>
              {[
                ['Ceiling', '6–12 months'],
                ['Intake', '30–45 days'],
                ['Exhaust', '70–100 days'],
              ].map(([label, cycle]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,.5)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{label}: <span style={{ color: 'rgba(255,255,255,.7)' }}>{cycle}</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div style={{ height: 100, background: 'linear-gradient(to bottom,#050505,#0d0d0d)' }} />
        <section style={{ padding: '56px 16px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700 }}>Nova Verta Models</h2>
            <p style={{ margin: '0 0 32px', color: 'rgba(255,255,255,.5)', fontSize: 14 }}>
              Click any filter size to go directly to that product. Sizes marked with a call icon require a quote.
            </p>
            <div style={{ border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', borderRadius: 16, padding: 24, minHeight: 140 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Nova Verta Verto</h3>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', textTransform: 'capitalize' }}>Downdraft Booth</span>
                </div>
                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(77,159,255,.1)', color: '#4d9fff', border: '1px solid rgba(77,159,255,.2)' }}>Downdraft</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
                <div style={{ border: '1px solid rgba(56,189,248,.2)', background: 'rgba(56,189,248,.1)', borderRadius: 12, padding: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#7dd3fc' }}>Ceiling / Diffusion Media</span>
                  <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,.8)' }}>38"×107"<br />38"×67"</div>
                </div>
                <div style={{ border: '1px solid rgba(59,130,246,.2)', background: 'rgba(59,130,246,.1)', borderRadius: 12, padding: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#93c5fd' }}>Exhaust Arrestors</span>
                  <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,.8)' }}>20"×20"<br />20"×25"</div>
                </div>
                <div style={{ border: '1px solid rgba(16,185,129,.2)', background: 'rgba(16,185,129,.1)', borderRadius: 12, padding: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#6ee7b7' }}>Pre-Filters</span>
                  <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,.8)' }}>24"×24"×2"</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FiberglassVsTackyBlogLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }}>
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '96px 16px 24px', background: '#050505' }}>
          <div style={{ maxWidth: 896, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'rgba(255,255,255,.5)', marginBottom: 8 }}>
              <span>Home</span><span>›</span><span>Blog</span><span>›</span><span style={{ color: 'rgba(255,255,255,.8)' }}>Fiberglass vs. Tacky Panel Filters</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.6)', fontSize: 14, fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to Blog
            </div>
          </div>
        </section>
        <div style={{ height: 100, background: 'linear-gradient(to bottom,#050505,#0d0d0d)' }} />
        <section style={{ padding: '48px 16px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 896, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.85)' }}>Product Guide</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                5 min read
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
                </svg>
                September 5, 2026
              </span>
            </div>
            <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(2.25rem,7vw,3rem)', lineHeight: 1.15, fontWeight: 800, fontFamily: 'inherit' }}>
              Fiberglass vs. Tacky Panel Filters: How to Compare the Application
            </h1>
            <p style={{ margin: '0 0 24px', maxWidth: 768, color: 'rgba(255,255,255,.7)', fontSize: 20, lineHeight: 1.5 }}>
              Fiberglass paint arrestors and tackified panel media are not automatically interchangeable. Compare the documented filter stage, dimensions, media, airflow direction, and equipment requirements before ordering.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,.7)', marginBottom: 40 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span>By <strong style={{ color: '#fff' }}>PFS Filters Editorial Team</strong></span>
            </div>
            <div style={{ aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: '#151515' }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663495713150/2Fs3wEPvUrA42rxo2jyuw5/fiberglass-paint-arrestor_c242c226.png"
                alt="Fiberglass vs. Tacky Panel Filters: How to Compare the Application"
                width="1280"
                height="720"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Generic skeleton fallback for ANY /product/:handle route, shown only for the
// brief gap while that route's lazy chunk downloads (the prerendered HTML painted
// before this already carries the real per-product title/price/image/description —
// see generate-seo-assets.mjs's genericProductFallback). Deliberately has NO
// product-data dependency: importing the product snapshot here would pull it into
// App.tsx's always-eager bundle instead of the lazy product-page chunk.
function ProductLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#040404', color: '#fff' }} aria-label="Loading product">
      <nav style={{ height: 96, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.95)' }}>
        <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
          <img src="/images/brands/pfs-logo-wide-420.webp" alt="PFS Filters" width="420" height="127" style={{ width: 198, height: 'auto', display: 'block' }} fetchPriority="high" decoding="async" />
        </div>
      </nav>
      <main>
        <section style={{ padding: '112px 16px 16px', background: '#050505' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ height: 20, width: 240, borderRadius: 4, background: 'rgba(255,255,255,.06)' }} />
          </div>
        </section>
        <div style={{ height: 100, background: 'linear-gradient(to bottom,#050505,#0d0d0d)' }} />
        <section style={{ padding: '40px 16px', background: '#0d0d0d' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
            <div>
              <div style={{ aspectRatio: '1/1', borderRadius: 12, background: '#161616', border: '1px solid rgba(255,255,255,.07)', marginBottom: 16 }} />
            </div>
            <div>
              <div style={{ height: 36, maxWidth: 420, borderRadius: 4, background: 'rgba(255,255,255,.08)', marginBottom: 12 }} />
              <div style={{ height: 24, maxWidth: 260, borderRadius: 4, background: 'rgba(255,255,255,.06)', marginBottom: 16 }} />
              <div style={{ height: 16, maxWidth: 480, borderRadius: 4, background: 'rgba(255,255,255,.05)', marginBottom: 8 }} />
              <div style={{ height: 16, maxWidth: 400, borderRadius: 4, background: 'rgba(255,255,255,.05)', marginBottom: 24 }} />
              <div style={{ minHeight: 48, maxWidth: 420, borderRadius: 8, background: 'rgba(59,130,246,.4)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 32, maxWidth: 420 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ minHeight: 76, background: '#161616', border: '1px solid rgba(255,255,255,.07)', borderRadius: 10 }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Light version pages (kept in codebase but not routed in production)
function Router() {
  const [location] = useLocation();
  const routeFallback = location === '/filter-finder' || location === '/filter-compatibility'
    ? <FilterFinderLoadingFallback />
    : location === '/filter-scanner'
    ? <FilterScannerLoadingFallback />
    : location === '/category/ceiling-blankets'
    ? <CeilingBlanketsLoadingFallback />
    : location === '/category/roll-media'
    ? <RollMediaLoadingFallback />
    : location === '/category/merv-filters'
    ? <MervFiltersLoadingFallback />
    : location === '/category/polyester-media'
    ? <PolyesterMediaLoadingFallback />
    : location === '/brands'
    ? <BrandsLoadingFallback />
    : location === '/consumables/pfs-vitra'
    ? <VitraLoadingFallback />
    : location === '/aerospace'
    ? <AerospaceLoadingFallback />
    : location === '/shop-by-booth/nova-verta'
    ? <NovaVertaLoadingFallback />
    : location === '/blog/fiberglass-vs-tacky-panel-filters'
    ? <FiberglassVsTackyBlogLoadingFallback />
    : location.startsWith('/product/')
    ? <ProductLoadingFallback />
    : <div className="min-h-screen bg-[#040404]" aria-label="Loading page" />;

  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={routeFallback}>
      <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:handle" component={ProductDetail} />

      {/* Blog */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />

      {/* Landing pages */}
      <Route path="/paint-booth-filters" component={PaintBoothFilters} />
      <Route path="/andreae-paint-booth-filters" component={AndreaePaintBoothFilters} />
      <Route path="/exhaust-filters" component={ExhaustFilters} />
      <Route path="/intake-filters" component={IntakeFilters} />
      <Route path="/ceiling-filters" component={CeilingFilters} />
      <Route path="/prefilters" component={Prefilters} />
      <Route path="/neshap-compliant-paint-booth-filters" component={NeshapCompliantPaintBoothFilters} />
      <Route path="/garmat-paint-booth-filters" component={GarmatPaintBoothFilters} />
      <Route path="/accudraft-paint-booth-filters" component={OemPaintBoothFilters} />
      <Route path="/gfs-paint-booth-filters" component={OemPaintBoothFilters} />
      <Route path="/col-met-paint-booth-filters" component={OemPaintBoothFilters} />
      <Route path="/pfs-spray-booth-filters" component={OemPaintBoothFilters} />
      <Route path="/california/carb-paint-booth-filter-compliance" component={CaliforniaCarbCompliance} />
      <Route path="/california/:slug" component={CaliforniaPaintBoothFilters} />

      {/* Info pages */}
      <Route path="/contact" component={Contact} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/why-choose-us" component={WhyChooseUs} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/memberships" component={Memberships} />
      <Route path="/returns" component={Returns} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />

      {/* Shop navigation */}
      <Route path="/shop-by-size" component={ShopBySize} />
      <Route path="/shop-by-type" component={ShopByType} />
      <Route path="/filter-compatibility" component={FilterFinder} />
      <Route path="/filter-finder" component={FilterFinder} />
      <Route path="/brands" component={Brands} />
      <Route path="/shop-by-booth" component={ShopByBooth} />
      <Route path="/shop-by-booth/:slug" component={BrandDetail} />
      <Route path="/shop-by-booth-type" component={ShopByBoothType} />
      <Route path="/shop-by-filter-type" component={ShopByFilterType} />

      {/* Category pages — filtered by slug */}
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/consumables" component={Consumables} />
      <Route path="/consumables/pfs-vitra" component={PfsVitra} />
      <Route path="/consumables/pfs-vanguard" component={PfsVanguard} />
      <Route path="/aerospace" component={Aerospace} />
      <Route path="/industries/aerospace-paint-booth-filters" component={AerospaceHub} />

      {/* Features */}
      <Route path="/filter-scanner" component={FilterScanner} />
      <Route path="/submit-review" component={SubmitReview} />

      {/* Auth & account */}
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/filter-database" component={FilterDatabase} />
      {/* 404 */}
      <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
