
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AdUnit from "../components/AdUnit";
import { AlertTriangle } from "lucide-react";

// Define ad slot IDs as constants to ensure consistency
const AD_SLOTS = {
  MAIN: "404-main",
  BOTTOM: "404-bottom"
};

// Food safety links to suggest on 404 pages
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
  },
  { 
    title: "Holiday & Event Food Safety", 
    url: "/food-safety/holiday-events" 
  }
];

const NotFound = () => {
  const location = useLocation();
  const isFoodSafetyPath = location.pathname.includes('/food-safety/');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Helmet>
        <title>Page Not Found - Fresh Check</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Fresh Check to check if your food is still fresh." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="text-center mb-8 max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-4">
          We couldn't find the page you're looking for.
        </p>
        
        {isFoodSafetyPath && (
          <div className="mb-6 text-left bg-blue-50 p-4 rounded-lg border border-blue-100">
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
          </div>
        )}
        
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-2 rounded-md inline-block hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
      
      {/* First Ad Unit - Using consistent slot ID constants */}
      <div className="max-w-md w-full mb-8">
        <AdUnit slotId={AD_SLOTS.MAIN} />
      </div>
      
      {/* Second Ad Unit - Using consistent slot ID constants */}
      <div className="max-w-md w-full">
        <AdUnit slotId={AD_SLOTS.BOTTOM} format="leaderboard" />
      </div>
    </div>
  );
};

export default NotFound;
