import { Toaster } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
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

// Light version pages (kept in codebase but not routed in production)
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#040404]" aria-label="Loading page" />}>
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
