
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import FoodDetail from "./pages/FoodDetail";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import AboutPage from "./pages/AboutPage";
import RecallsPage from "./pages/RecallsPage";
import RecallDetailPage from "./pages/RecallDetailPage";
import { RecallsProvider } from "./contexts/RecallsContext";
import WebhookReceiver from "./components/WebhookReceiver";

// Import Food Safety Educational Pages
import TemperatureDangerZone from "./pages/FoodSafety/TemperatureDangerZone";
import FoodborneIllnessPrevention from "./pages/FoodSafety/FoodborneIllnessPrevention";
import PreventCrossContamination from "./pages/FoodSafety/PreventCrossContamination";
import VulnerableGroups from "./pages/FoodSafety/VulnerableGroups";
import HolidayEvents from "./pages/FoodSafety/HolidayEvents";
import ScienceOfSpoilage from "./pages/FoodSafety/ScienceOfSpoilage";
import EmergencyFoodSafety from "./pages/FoodSafety/EmergencyFoodSafety";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <RecallsProvider>
          <WebhookReceiver />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/food/:id" element={<FoodDetail />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/categories/:categoryId" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/recalls" element={<RecallsPage />} />
              <Route path="/recalls/:id" element={<RecallDetailPage />} />
              
              {/* Food Safety Educational Pages */}
              <Route path="/food-safety/temperature-danger-zone" element={<TemperatureDangerZone />} />
              <Route path="/food-safety/foodborne-illness-prevention" element={<FoodborneIllnessPrevention />} />
              <Route path="/food-safety/prevent-cross-contamination" element={<PreventCrossContamination />} />
              <Route path="/food-safety/vulnerable-groups" element={<VulnerableGroups />} />
              <Route path="/food-safety/holiday-events" element={<HolidayEvents />} />
              <Route path="/food-safety/science-of-spoilage" element={<ScienceOfSpoilage />} />
              <Route path="/food-safety/emergency" element={<EmergencyFoodSafety />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RecallsProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
