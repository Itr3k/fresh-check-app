
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { RecallsProvider } from "./contexts/RecallsContext";
import WebhookReceiver from "./components/WebhookReceiver";

// Lazy load non-critical pages
const FoodDetail = lazy(() => import("./pages/FoodDetail"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const RecallsPage = lazy(() => import("./pages/RecallsPage"));
const RecallDetailPage = lazy(() => import("./pages/RecallDetailPage"));

// Lazy load Food Safety Educational Pages
const TemperatureDangerZone = lazy(() => import("./pages/FoodSafety/TemperatureDangerZone"));
const FoodborneIllnessPrevention = lazy(() => import("./pages/FoodSafety/FoodborneIllnessPrevention"));
const PreventCrossContamination = lazy(() => import("./pages/FoodSafety/PreventCrossContamination"));
const VulnerableGroups = lazy(() => import("./pages/FoodSafety/VulnerableGroups"));
const HolidayEvents = lazy(() => import("./pages/FoodSafety/HolidayEvents"));
const ScienceOfSpoilage = lazy(() => import("./pages/FoodSafety/ScienceOfSpoilage"));
const EmergencyFoodSafety = lazy(() => import("./pages/FoodSafety/EmergencyFoodSafety"));
const UnderstandingFoodLabels = lazy(() => import("./pages/FoodSafety/UnderstandingFoodLabels"));

// Create a fallback loading component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-primary/30"></div>
      <div className="h-4 w-32 rounded bg-primary/20"></div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecallsProvider>
        <WebhookReceiver />
        <Toaster />
        <Sonner />
        <TooltipProvider>
          <Suspense fallback={<PageLoading />}>
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
              <Route path="/food-safety/cross-contamination" element={<PreventCrossContamination />} />
              <Route path="/food-safety/vulnerable-groups" element={<VulnerableGroups />} />
              <Route path="/food-safety/holiday-events" element={<HolidayEvents />} />
              <Route path="/food-safety/science-of-spoilage" element={<ScienceOfSpoilage />} />
              <Route path="/food-safety/emergency" element={<EmergencyFoodSafety />} />
              <Route path="/food-safety/understanding-food-labels" element={<UnderstandingFoodLabels />} />
              
              {/* Redirect paths to maintain backward compatibility */}
              <Route path="/food-safety/prevent-cross-contamination" element={<Navigate to="/food-safety/cross-contamination" replace />} />
              <Route path="/food-safety/holiday-event-safety" element={<Navigate to="/food-safety/holiday-events" replace />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </RecallsProvider>
    </QueryClientProvider>
  );
};

export default App;
