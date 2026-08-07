import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileCTABar from "./components/MobileCTABar";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Products
import ProductsHub from "./pages/products/ProductsHub";
import PaintBoothsHub from "./pages/products/PaintBoothsHub";
import OutdoorBoothPage from "./pages/products/OutdoorBoothPage";
import ContainerBoothPage from "./pages/products/ContainerBoothPage";
import EnclosedBoothsPage from "./pages/products/EnclosedBoothsPage";
import SprinterVanBoothPage from "./pages/products/SprinterVanBoothPage";
import PowderBoothsHub from "./pages/products/PowderBoothsHub";
import OvensHub from "./pages/products/OvensHub";
import PrepSupportHub from "./pages/products/PrepSupportHub";
import PaintWallsPage from "./pages/products/PaintWallsPage";
import BlastSystemsHub from "./pages/products/BlastSystemsHub";
import AirMakeUpUnitsHub from "./pages/products/AirMakeUpUnitsHub";
import HeatedAMUPage from "./pages/products/HeatedAMUPage";
import EnvironmentalRoomsHub from "./pages/products/EnvironmentalRoomsHub";
import TemperatureControlledRoomsPage from "./pages/products/TemperatureControlledRoomsPage";
import PartsFiltersHub from "./pages/products/PartsFiltersHub";
import ProductSubPage from "./pages/products/ProductSubPage";
import SprayToWastePage from "./pages/products/SprayToWastePage";
import PowderReclaimPage from "./pages/products/PowderReclaimPage";
import AircraftBoothPage from "./pages/products/AircraftBoothPage";
import CrossFlowBoothPage from "./pages/products/CrossFlowBoothPage";
import OpenFaceBoothPage from "./pages/products/OpenFaceBoothPage";
import CrossFlowAllPage from "./pages/products/CrossFlowAllPage";
import SemiDowndraftBoothPage from "./pages/products/SemiDowndraftBoothPage";
import FullDowndraftBoothPage from "./pages/products/FullDowndraftBoothPage";
import DowndraftRaisedBasementPage from "./pages/products/DowndraftRaisedBasementPage";
import SideDowndraftBoothPage from "@/pages/products/SideDowndraftBoothPage";
import HeatedBoothPage from "@/pages/products/HeatedBoothPage";
import DoubleWallBoothPage from '@/pages/products/DoubleWallBoothPage';
import InspectionBoothPage from '@/pages/products/InspectionBoothPage';
import TruckBoothsPage from '@/pages/products/TruckBoothsPage';
import PrepHub from "./pages/products/PrepHub";
import PrepStationsPage from "./pages/products/PrepStationsPage";
import BatchOvenPage from "./pages/products/BatchOvenPage";
import WalkInOvenPage from "./pages/products/WalkInOvenPage";
import MixingRoomPage from "./pages/products/MixingRoomPage";
import { BlastingBoothsPage, ReclaimBlastingBoothsPage } from "./pages/products/BlastingBoothPage";
import WashBoothPage from "./pages/products/WashBoothPage";

// Industries
import IndustriesHub from "./pages/industries/IndustriesHub";
import IndustryPage from "./pages/industries/IndustryPage";
import EducationPage from "./pages/industries/EducationPage";
import WoodworkingPage from "./pages/industries/WoodworkingPage";
import IndustrialManufacturingPage from "./pages/industries/IndustrialManufacturingPage";
import AerospacePage from "./pages/industries/AerospacePage";
import TruckBusFleetPage from "./pages/industries/TruckBusFleetPage";
import CollisionRepairPage from "./pages/industries/CollisionRepairPage";
import GovernmentMilitaryPage from "./pages/industries/GovernmentMilitaryPage";
import MarinePage from "./pages/industries/MarinePage";
import RailTransitPage from "./pages/industries/RailTransitPage";
import AutomotiveManufacturingPage from "./pages/industries/AutomotiveManufacturingPage";
import HeavyEquipmentPage from "@/pages/industries/HeavyEquipmentPage";
import EnergyUtilitiesPage from "@/pages/industries/EnergyUtilitiesPage";

// Integration & Automation
import IntegrationHub from "./pages/integration/IntegrationHub";
import IntegrationSubPage from "./pages/integration/IntegrationSubPage";

// Service
import ServiceHub from "./pages/service/ServiceHub";
import ServiceSubPage from "./pages/service/ServiceSubPage";
import HazLocServicesPage from "./pages/service/HazLocServicesPage";

// Company
import CompanyHub from "./pages/company/CompanyHub";
import CompanySubPage from "./pages/company/CompanySubPage";
import CareersPage from "./pages/company/CareersPage";
import MeetTheTeamPage from "./pages/company/MeetTheTeamPage";
import CertificationsPage from "./pages/company/CertificationsPage";
import ManufacturingPage from "./pages/company/ManufacturingPage";
import NewsPage from "./pages/company/NewsPage";

// Resources
import ResourcesHub from "./pages/resources/ResourcesHub";
import ResourcesSubPage from "./pages/resources/ResourcesSubPage";
import ResourcesFAQsPage from "./pages/resources/ResourcesFAQsPage";

// Contact
import ContactHub from "./pages/contact/ContactHub";
import ContactSubPage from "./pages/contact/ContactSubPage";

// Parts
import PartsHubPage from "./pages/parts/PartsHubPage";

// AEL Bridge
import EnclosuresStorage from "./pages/EnclosuresStorage";
// Landing Pages
import IndustrialLandingPage from "./pages/landing/IndustrialLandingPage";
// Support
import SupportPage from "./pages/SupportPage";
import BecomeADistributorPage from "./pages/BecomeADistributorPage";
import LegalPage from "./pages/LegalPage";
import FiltersPage from "./pages/FiltersPage";
import CaliforniaServicePage from "./pages/CaliforniaServicePage";
import LosAngelesServicePage from "@/pages/LosAngelesServicePage";
import BayAreaServicePage from "@/pages/BayAreaServicePage";
import GlobalAnimations from "./GlobalAnimations";


// import { motion } from "motion/react";
// import { fadeIn, slideLeft, slideRight, zoomIn } from "../animations";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Sticky mobile CTA bar — only visible on mobile (<768px) */}
      <MobileCTABar />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* Products */}
      <Route path="/industrial-paint-booths" component={IndustrialLandingPage} />
      <Route path="/products" component={ProductsHub} />
      <Route path="/products/paint-booths" component={PaintBoothsHub} />
      <Route path="/products/paint-booths/enclosed" component={EnclosedBoothsPage} />
      <Route path="/products/paint-booths/sprinter-van" component={SprinterVanBoothPage} />
      <Route path="/products/paint-booths/enclosed/:sub" component={ProductSubPage} />
      <Route path="/products/paint-booths/aircraft" component={AircraftBoothPage} />
      <Route path="/products/paint-booths/crossflow" component={CrossFlowBoothPage} />
      <Route path="/products/paint-booths/open-face" component={OpenFaceBoothPage} />
      <Route path="/products/paint-booths/crossflow-all" component={CrossFlowAllPage} />
      <Route path="/products/paint-booths/semi-downdraft" component={SemiDowndraftBoothPage} />
      <Route path="/products/paint-booths/full-downdraft" component={FullDowndraftBoothPage} />
      <Route path="/products/paint-booths/downdraft-raised-basement" component={DowndraftRaisedBasementPage} />
      <Route path="/products/paint-booths/side-downdraft" component={SideDowndraftBoothPage} />
      <Route path="/products/paint-booths/heated" component={HeatedBoothPage} />
      <Route path="/products/paint-booths/double-wall" component={DoubleWallBoothPage} />
      <Route path="/products/paint-booths/inspection" component={InspectionBoothPage} />
      <Route path="/products/paint-booths/truck-booths" component={TruckBoothsPage} />
      <Route path="/products/paint-booths/wash-booth" component={WashBoothPage} />
      <Route path="/products/paint-booths/:sub" component={ProductSubPage} />
      <Route path="/products/outdoor-booths" component={OutdoorBoothPage} />
      <Route path="/products/container-booths" component={ContainerBoothPage} />
      <Route path="/products/container-booths/:sub" component={ProductSubPage} />
      <Route path="/products/powder-booths" component={PowderBoothsHub} />
      <Route path="/products/powder-booths/spray-to-waste" component={SprayToWastePage} />
      <Route path="/products/powder-booths/powder-reclaim" component={PowderReclaimPage} />
      <Route path="/products/powder-booths/:sub" component={ProductSubPage} />
      <Route path="/products/ovens" component={OvensHub} />
      <Route path="/products/ovens/batch" component={BatchOvenPage} />
      <Route path="/products/ovens/walk-in" component={WalkInOvenPage} />
      <Route path="/products/ovens/:sub" component={ProductSubPage} />
      {/* Redirect legacy /products/prep-stations to correct path */}
      <Route path="/products/prep-stations">{() => { window.location.replace("/products/prep-support/prep-stations"); return null; }}</Route>
      <Route path="/products/prep-support" component={PrepSupportHub} />
      <Route path="/products/prep-support/paint-walls" component={PaintWallsPage} />
      <Route path="/products/prep-support/paint-mix-rooms">{() => { window.location.replace("/products/mixing-rooms"); return null; }}</Route>
      <Route path="/products/prep-support/prep-stations" component={PrepStationsPage} />
      <Route path="/products/prep-support/:sub" component={ProductSubPage} />
      <Route path="/products/prep" component={PrepHub} />
      <Route path="/products/prep/:sub" component={ProductSubPage} />
      <Route path="/products/blast-systems" component={BlastSystemsHub} />
      <Route path="/products/mixing-rooms" component={MixingRoomPage} />
      <Route path="/products/blast-systems/blasting-booths" component={BlastingBoothsPage} />
      <Route path="/products/blast-systems/reclaim-blasting-booths" component={ReclaimBlastingBoothsPage} />
      <Route path="/products/blast-systems/:sub" component={ProductSubPage} />
      <Route path="/products/air-make-up-units" component={AirMakeUpUnitsHub} />
      <Route path="/products/air-make-up-units/heated" component={HeatedAMUPage} />
      <Route path="/products/air-make-up-units/:sub" component={ProductSubPage} />
      <Route path="/products/environmental-rooms" component={EnvironmentalRoomsHub} />
      <Route path="/products/environmental-rooms/temperature-controlled" component={TemperatureControlledRoomsPage} />
      <Route path="/products/environmental-rooms/:sub" component={ProductSubPage} />
      <Route path="/products/parts-filters" component={PartsFiltersHub} />
      <Route path="/products/parts-filters/:sub" component={ProductSubPage} />

      {/* OEM Parts Store */}
      <Route path="/parts" component={PartsHubPage} />
      <Route path="/parts/:sub" component={PartsHubPage} />

      {/* Industries */}
      <Route path="/industries" component={IndustriesHub} />
      <Route path="/industries/education" component={EducationPage} />
      <Route path="/industries/woodworking" component={WoodworkingPage} />
      <Route path="/industries/industrial-manufacturing" component={IndustrialManufacturingPage} />
      <Route path="/industries/aerospace-defense" component={AerospacePage} />
      <Route path="/industries/truck-bus-fleet" component={TruckBusFleetPage} />
      <Route path="/industries/collision-repair" component={CollisionRepairPage} />
      <Route path="/industries/government-military" component={GovernmentMilitaryPage} />
      <Route path="/industries/marine" component={MarinePage} />
      <Route path="/industries/rail-transit" component={RailTransitPage} />
      <Route path="/industries/automotive-manufacturing" component={AutomotiveManufacturingPage} />
      <Route path="/industries/heavy-equipment" component={HeavyEquipmentPage} />
      <Route path="/industries/energy-utilities" component={EnergyUtilitiesPage} />
      <Route path="/industries/:industry" component={IndustryPage} />

      {/* Integration & Automation */}
      <Route path="/integration-automation" component={IntegrationHub} />
      <Route path="/integration-automation/:sub" component={IntegrationSubPage} />

      {/* Service */}
      <Route path="/service" component={ServiceHub} />
      <Route path="/service/hazardous-location" component={HazLocServicesPage} />
      <Route path="/service/:sub" component={ServiceSubPage} />

      {/* Dedicated support request page */}
      <Route path="/support" component={SupportPage} />

      {/* Company */}
      <Route path="/company" component={CompanyHub} />
      <Route path="/company/team" component={MeetTheTeamPage} />
      <Route path="/company/certifications" component={CertificationsPage} />
      <Route path="/company/manufacturing" component={ManufacturingPage} />
      <Route path="/company/careers" component={CareersPage} />
      <Route path="/company/news" component={NewsPage} />
      <Route path="/company/:sub" component={CompanySubPage} />

      {/* Resources */}
      <Route path="/resources" component={ResourcesHub} />
      <Route path="/resources/faqs" component={ResourcesFAQsPage} />
      <Route path="/resources/:sub" component={ResourcesSubPage} />

      {/* Contact */}
      <Route path="/contact" component={ContactHub} />
      <Route path="/contact/:sub" component={ContactSubPage} />

      {/* AEL Bridge */}
      <Route path="/enclosures-storage" component={EnclosuresStorage} />

      <Route path="/become-a-distributor" component={BecomeADistributorPage} />
      <Route path="/legal" component={LegalPage} />
      <Route path="/filters" component={FiltersPage} />
      <Route path="/spray-booth-service-california" component={CaliforniaServicePage} />
      <Route path="/spray-booth-service-los-angeles" component={LosAngelesServicePage} />
      <Route path="/spray-booth-service-bay-area" component={BayAreaServicePage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <GlobalAnimations  />
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Layout>
              <Router />
            </Layout>
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
