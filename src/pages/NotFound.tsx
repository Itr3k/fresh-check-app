
import { useLocation, Link } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, Home, Search, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Lazy load AdUnit component to improve initial rendering
const AdUnit = lazy(() => import("../components/AdUnit"));

// Define ad slot IDs as constants to ensure consistency
const AD_SLOTS = {
  TOP: "404-top",
  MIDDLE: "404-middle",
  BOTTOM: "404-bottom"
};

// Reduced number of links to improve render speed
const FOOD_SAFETY_LINKS = [
  { 
    title: "Temperature Danger Zone", 
    url: "/food-safety/temperature-danger-zone" 
  },
  { 
    title: "Foodborne Illness Prevention", 
    url: "/food-safety/foodborne-illness-prevention" 
  },
  { 
    title: "Cross-Contamination", 
    url: "/food-safety/cross-contamination" 
  },
  { 
    title: "Food Safety for Vulnerable Groups", 
    url: "/food-safety/vulnerable-groups" 
  }
];

// Top food pages for suggesting alternatives
const POPULAR_FOOD_LINKS = [
  { title: "Chicken", url: "/food/chicken" },
  { title: "Milk", url: "/food/milk" },
  { title: "Eggs", url: "/food/eggs" },
  { title: "Bread", url: "/food/bread" }
];

const NotFound = () => {
  const location = useLocation();
  const isFoodSafetyPath = location.pathname.includes('/food-safety/');
  const isFoodPath = location.pathname.includes('/food/');
  const isRecallPath = location.pathname.includes('/recalls/');
  
  // Get the keyword from the current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || '';
  const searchKeyword = lastSegment.replace(/-/g, ' ');

  useEffect(() => {
    // Log 404 errors and send to analytics if available
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Send to Google Analytics if available - fixed type checking
    if (typeof window.gtag === 'function') {
      window.gtag('event', '404_error', {
        'event_category': 'Error',
        'event_label': location.pathname,
        'non_interaction': true
      });
    }
  }, [location.pathname]);

  // Create structured data for better indexing of 404 page
  const notFoundSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://freshcheck.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Page Not Found",
        "item": "https://freshcheck.app/404"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Helmet>
        <title>Page Not Found - Fresh Check</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Fresh Check to check if your food is still fresh." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://freshcheck.app/404" />
        <script type="application/ld+json">
          {JSON.stringify(notFoundSchema)}
        </script>
      </Helmet>
      
      <article className="text-center mb-8 max-w-md w-full">
        <header className="mb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-amber-600" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-4">
            We couldn't find the page you're looking for.
          </p>
        </header>
        
        {/* First ad placement - top */}
        <div className="my-6 flex justify-center">
          <Suspense fallback={<Skeleton className="h-[90px] w-full md:h-[90px] max-w-[728px] mx-auto" />}>
            <AdUnit slotId={AD_SLOTS.TOP} format="leaderboard" mobileFormat="rectangle" />
          </Suspense>
        </div>
        
        {/* Contextual suggestions based on URL path */}
        {searchKeyword && (
          <div className="mb-6 text-left bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="font-medium text-blue-800 mb-2">Looking for "{searchKeyword}"?</h2>
            <p className="text-blue-700 mb-3">
              Try searching for it or check our related content:
            </p>
            <div className="flex items-center justify-center mt-3 mb-2">
              <Link to={`/search?q=${encodeURIComponent(searchKeyword)}`} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                <Search className="mr-2 h-4 w-4" />
                Search for "{searchKeyword}"
              </Link>
            </div>
          </div>
        )}
        
        {isFoodSafetyPath && (
          <nav className="mb-6 text-left bg-blue-50 p-4 rounded-lg border border-blue-100" aria-label="Alternative food safety resources">
            <h2 className="font-medium text-blue-800 mb-2">Looking for food safety information?</h2>
            <p className="text-blue-700 mb-3">
              The URL might have changed. Try one of these food safety resources:
            </p>
            <ul className="space-y-2">
              {FOOD_SAFETY_LINKS.map((link) => (
                <li key={link.url}>
                  <Link 
                    to={link.url} 
                    className="text-primary hover:underline inline-block py-1"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        
        {isFoodPath && (
          <nav className="mb-6 text-left bg-blue-50 p-4 rounded-lg border border-blue-100" aria-label="Popular food pages">
            <h2 className="font-medium text-blue-800 mb-2">Looking for food storage information?</h2>
            <p className="text-blue-700 mb-3">
              The food you're looking for may be listed under a different name. Try these popular foods:
            </p>
            <ul className="space-y-2">
              {POPULAR_FOOD_LINKS.map((link) => (
                <li key={link.url}>
                  <Link 
                    to={link.url} 
                    className="text-primary hover:underline inline-block py-1"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link 
                to="/categories" 
                className="text-sm text-primary hover:underline flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Browse all food categories
              </Link>
            </div>
          </nav>
        )}
        
        {isRecallPath && (
          <div className="mb-6 text-left bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="font-medium text-blue-800 mb-2">Looking for food recall information?</h2>
            <p className="text-blue-700 mb-3">
              This specific recall may no longer be active. Check our current recalls page:
            </p>
            <div className="mt-3">
              <Link 
                to="/recalls/current" 
                className="text-primary hover:underline flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                View current food recalls
              </Link>
            </div>
          </div>
        )}
        
        {/* Second ad placement - middle */}
        <div className="my-6 flex justify-center">
          <Suspense fallback={<Skeleton className="h-[90px] w-full md:h-[90px] max-w-[728px] mx-auto" />}>
            <AdUnit slotId={AD_SLOTS.MIDDLE} format="leaderboard" mobileFormat="rectangle" />
          </Suspense>
        </div>
        
        <footer className="mt-6 flex flex-col items-center">
          <div className="space-x-4 flex">
            <Button 
              variant="default"
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/search">
                <Search className="h-4 w-4" />
                Search
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            If you believe this is an error, please <a href="mailto:support@freshcheck.app" className="text-primary hover:underline">contact us</a>.
          </p>
        </footer>
      </article>
      
      {/* Third ad placement - bottom */}
      <div className="max-w-[728px] w-full flex justify-center">
        <Suspense fallback={<Skeleton className="h-[90px] w-full md:h-[90px] max-w-[728px] mx-auto" />}>
          <AdUnit slotId={AD_SLOTS.BOTTOM} format="leaderboard" mobileFormat="rectangle" lazyLoad={true} />
        </Suspense>
      </div>
    </div>
  );
};

export default NotFound;
