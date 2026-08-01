import { Toaster } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import WhyChooseUs from './pages/WhyChooseUs';
import Memberships from './pages/Memberships';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Returns from './pages/Returns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FilterScanner from './pages/FilterScanner';
import ShopBySize from './pages/ShopBySize';
import ShopByType from './pages/ShopByType';
// FilterCompatibility removed — redirects to FilterFinder
import Brands from './pages/Brands';
import SubmitReview from './pages/SubmitReview';
import FilterDatabase from './pages/FilterDatabase';
import CategoryPage from './pages/CategoryPage';
import PaintBoothFilters from './pages/PaintBoothFilters';
import NotFound from './pages/NotFound';
import PfsVitra from './pages/PfsVitra';
import PfsVanguard from './pages/PfsVanguard';
import Consumables from './pages/Consumables';
import Aerospace from './pages/Aerospace';
import AerospaceHub from './pages/AerospaceHub';
import ShopByBooth from './pages/ShopByBooth';
import BrandDetail from './pages/BrandDetail';
import ShopByBoothType from './pages/ShopByBoothType';
import ShopByFilterType from './pages/ShopByFilterType';
import FilterFinder from './pages/FilterFinder';

// Light version pages (kept in codebase but not routed in production)
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
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
