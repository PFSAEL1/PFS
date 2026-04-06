import { Toaster } from '@/components/ui/sonner';
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
import WhyChooseUs from './pages/WhyChooseUs';
import Memberships from './pages/Memberships';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Returns from './pages/Returns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FilterScanner from './pages/FilterScanner';
import ShopBySize from './pages/ShopBySize';
import ShopByType from './pages/ShopByType';
import FilterCompatibility from './pages/FilterCompatibility';
import Brands from './pages/Brands';
import SubmitReview from './pages/SubmitReview';
import FilterDatabase from './pages/FilterDatabase';
import NotFound from './pages/NotFound';

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:handle" component={ProductDetail} />

      {/* Blog */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />

      {/* Info pages */}
      <Route path="/contact" component={Contact} />
      <Route path="/why-choose-us" component={WhyChooseUs} />
      <Route path="/memberships" component={Memberships} />
      <Route path="/returns" component={Returns} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />

      {/* Shop navigation */}
      <Route path="/shop-by-size" component={ShopBySize} />
      <Route path="/shop-by-type" component={ShopByType} />
      <Route path="/filter-compatibility" component={FilterCompatibility} />
      <Route path="/brands" component={Brands} />

      {/* Category pages — redirect to shop with filter */}
      <Route path="/category/:slug" component={Shop} />

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
