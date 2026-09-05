import { Toaster } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const WhyChooseUs = lazy(() => import('./pages/WhyChooseUs'));
const Memberships = lazy(() => import('./pages/Memberships'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Returns = lazy(() => import('./pages/Returns'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FilterScanner = lazy(() => import('./pages/FilterScanner'));
const ShopBySize = lazy(() => import('./pages/ShopBySize'));
const ShopByType = lazy(() => import('./pages/ShopByType'));
const Brands = lazy(() => import('./pages/Brands'));
const SubmitReview = lazy(() => import('./pages/SubmitReview'));
const FilterDatabase = lazy(() => import('./pages/FilterDatabase'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const PaintBoothFilters = lazy(() => import('./pages/PaintBoothFilters'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PfsVitra = lazy(() => import('./pages/PfsVitra'));
const PfsVanguard = lazy(() => import('./pages/PfsVanguard'));
const Consumables = lazy(() => import('./pages/Consumables'));
const Aerospace = lazy(() => import('./pages/Aerospace'));
const AerospaceHub = lazy(() => import('./pages/AerospaceHub'));
const ShopByBooth = lazy(() => import('./pages/ShopByBooth'));
const BrandDetail = lazy(() => import('./pages/BrandDetail'));
const ShopByBoothType = lazy(() => import('./pages/ShopByBoothType'));
const ShopByFilterType = lazy(() => import('./pages/ShopByFilterType'));
const FilterFinder = lazy(() => import('./pages/FilterFinder'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

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
