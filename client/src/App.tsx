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

// Light version pages (kept in codebase but not routed in production)
function Router() {
  const [location] = useLocation();
  const routeFallback = location === '/filter-finder' || location === '/filter-compatibility'
    ? <FilterFinderLoadingFallback />
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
