
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that checks if the app is properly initialized and handles route changes
 * This helps debug issues when the app isn't rendering properly
 */
const AppStatusChecker = () => {
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('AppStatusChecker: App initialized on route:', location.pathname);
    
    // Set a flag to indicate the app is running
    window.appLoaded = true;
    setInitialized(true);

    // Hide the loading indicator
    const loader = document.getElementById('loading-indicator');
    if (loader) {
      loader.style.display = 'none';
    }

    // Hide the error message if it was shown
    const appError = document.getElementById('app-error');
    if (appError) {
      appError.classList.add('hidden');
    }
  }, []);

  // Log route changes
  useEffect(() => {
    console.log('AppStatusChecker: Route changed to:', location.pathname);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default AppStatusChecker;
