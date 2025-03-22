
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AdUnit from "../components/AdUnit";

// Define ad slot IDs as constants to ensure consistency
const AD_SLOTS = {
  MAIN: "404-main",
  BOTTOM: "404-bottom"
};

const NotFound = () => {
  const location = useLocation();

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
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
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
