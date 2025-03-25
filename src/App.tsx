
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// Contexts
import { ImagesProvider } from './contexts/ImagesContext'
import { RecallsProvider } from './contexts/RecallsContext'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import SkipToContent from './components/SkipToContent'
import ErrorBoundary from './components/ErrorBoundary'

// Core pages
import Index from './pages/Index'
import NotFound from './pages/NotFound'

// Food Safety pages
import TemperatureDangerZone from './pages/FoodSafety/TemperatureDangerZone'
import FoodborneIllnessPrevention from './pages/FoodSafety/FoodborneIllnessPrevention'
import PreventCrossContamination from './pages/FoodSafety/PreventCrossContamination'
import VulnerableGroups from './pages/FoodSafety/VulnerableGroups'
import HolidayEvents from './pages/FoodSafety/HolidayEvents'
import ScienceOfSpoilage from './pages/FoodSafety/ScienceOfSpoilage'
import EmergencyFoodSafety from './pages/FoodSafety/EmergencyFoodSafety'
import UnderstandingFoodLabels from './pages/FoodSafety/UnderstandingFoodLabels'

// Ingredients pages
import IngredientsPage from './pages/IngredientsPage'
import BHAArticle from './pages/ingredients/BHAArticle'
import Red40Article from './pages/ingredients/Red40Article'

// Use dynamic imports for non-critical pages
const FoodDetail = lazy(() => import('./pages/FoodDetail'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const RecallsPage = lazy(() => import('./pages/RecallsPage'))
const RecallDetailPage = lazy(() => import('./pages/RecallDetailPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

// Lazy load ingredient articles
const NaturalFlavorsArticle = lazy(() => import('./pages/ingredients/NaturalFlavorsArticle'))
const AspartameArticle = lazy(() => import('./pages/ingredients/AspartameArticle'))

// Simple loading fallback with better visibility
const loadingFallback = (
  <div className="p-8 flex items-center justify-center min-h-[200px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
      <p>Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <RecallsProvider>
        <ImagesProvider>
          <div className="flex flex-col min-h-screen">
            <SkipToContent />
            <Header />
            <main id="main-content" className="flex-grow">
              <ErrorBoundary fallback={
                <div className="p-8 text-center">
                  <h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong</h2>
                  <p>Please try refreshing the page.</p>
                </div>
              }>
                <Suspense fallback={loadingFallback}>
                  <Routes>
                    {/* Core pages */}
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    
                    {/* Food pages */}
                    <Route path="/food/:foodId" element={<FoodDetail />} />
                    <Route path="/categories/:categoryId?" element={<CategoryPage />} />
                    
                    {/* Recalls pages */}
                    <Route path="/recalls" element={<RecallsPage />} />
                    <Route path="/recalls/:recallId" element={<RecallDetailPage />} />
                    
                    {/* Food Safety pages */}
                    <Route path="/food-safety/temperature-danger-zone" element={<TemperatureDangerZone />} />
                    <Route path="/food-safety/foodborne-illness-prevention" element={<FoodborneIllnessPrevention />} />
                    <Route path="/food-safety/cross-contamination" element={<PreventCrossContamination />} />
                    <Route path="/food-safety/vulnerable-groups" element={<VulnerableGroups />} />
                    <Route path="/food-safety/holiday-events" element={<HolidayEvents />} />
                    <Route path="/food-safety/science-of-spoilage" element={<ScienceOfSpoilage />} />
                    <Route path="/food-safety/emergency" element={<EmergencyFoodSafety />} />
                    <Route path="/food-safety/understanding-food-labels" element={<UnderstandingFoodLabels />} />
                    
                    {/* Food Ingredients pages */}
                    <Route path="/ingredients" element={<IngredientsPage />} />
                    <Route path="/ingredients/bha-butylated-hydroxyanisole" element={<BHAArticle />} />
                    <Route path="/ingredients/red-40-food-coloring" element={<Red40Article />} />
                    <Route path="/ingredients/natural-flavors" element={<NaturalFlavorsArticle />} />
                    <Route path="/ingredients/aspartame" element={<AspartameArticle />} />
                    
                    {/* Catch all 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </ImagesProvider>
      </RecallsProvider>
    </ErrorBoundary>
  )
}

export default App
