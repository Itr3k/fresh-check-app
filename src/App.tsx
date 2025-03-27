
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { RecallsProvider } from "./contexts/RecallsContext";
import WebhookReceiver from "./components/WebhookReceiver";
import { ImagesProvider } from './contexts/ImagesContext';
import ScrollToTop from "./components/ScrollToTop";
import Debug from "./components/Debug";
import DiagnosticPage from "./pages/DiagnosticPage";

// Enhanced debug component to ensure React is rendering
const DebugRender = () => {
  const timestamp = new Date().toISOString();
  
  useEffect(() => {
    console.log(`DebugRender component mounted at ${timestamp}`);
    return () => {
      console.log(`DebugRender component unmounted`);
    };
  }, [timestamp]);
  
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 9999,
      background: 'green',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontFamily: 'monospace',
      fontSize: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    }}>
      React is rendering (timestamp: {timestamp})
    </div>
  );
};

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

function App() {
  console.log("App component rendering");
  
  useEffect(() => {
    console.log("App component mounted");
    return () => {
      console.log("App component unmounted");
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RecallsProvider>
          <ImagesProvider>
            {/* Add debug render component in development */}
            {process.env.NODE_ENV === 'development' && <DebugRender />}
            {process.env.NODE_ENV === 'development' && <Debug />}
            <WebhookReceiver />
            <ScrollToTop />
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
                  <Route path="/diagnostic" element={<DiagnosticPage />} />
                  
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
          </ImagesProvider>
        </RecallsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
