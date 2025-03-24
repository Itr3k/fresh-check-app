
import { useLocation, Link } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

const NotFound = () => {
  const location = useLocation();
  const isFoodSafetyPath = location.pathname.includes('/food-safety/');

  useEffect(() => {
    // Log 404 errors
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Create structured data for 404 page
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
        
        {/* First ad placement - top - always leaderboard (desktop) or rectangle (mobile) */}
        <div className="my-6 flex justify-center">
          <Suspense fallback={<Skeleton className="h-[90px] w-full md:h-[90px] max-w-[728px] mx-auto" />}>
            <AdUnit slotId={AD_SLOTS.TOP} format="leaderboard" mobileFormat="rectangle" />
          </Suspense>
        </div>
        
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
        
        {/* Second ad placement - middle - always leaderboard (desktop) or rectangle (mobile) */}
        <div className="my-6 flex justify-center">
          <Suspense fallback={<Skeleton className="h-[90px] w-full md:h-[90px] max-w-[728px] mx-auto" />}>
            <AdUnit slotId={AD_SLOTS.MIDDLE} format="leaderboard" mobileFormat="rectangle" />
          </Suspense>
        </div>
        
        <footer className="mt-6">
          <Link 
            to="/" 
            className="bg-primary text-white px-6 py-2 rounded-md inline-block hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </Link>
        </footer>
      </article>
      
      {/* Third ad placement - bottom - always leaderboard (desktop) or rectangle (mobile) */}
      <div className="max-w-[728px] w-full flex justify-center">
        <Suspense fallback={<Skeleton className="h-[90px] w-full md:h-[90px] max-w-[728px] mx-auto" />}>
          <AdUnit slotId={AD_SLOTS.BOTTOM} format="leaderboard" mobileFormat="rectangle" lazyLoad={true} />
        </Suspense>
      </div>
    </div>
  );
};

export default NotFound;
