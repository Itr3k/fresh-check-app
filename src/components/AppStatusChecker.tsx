
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

/**
 * Component that checks if the app is properly initialized and handles route changes
 * This helps debug issues when the app isn't rendering properly
 */
const AppStatusChecker = () => {
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
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

      // Check for any URL parameters that might indicate an error
      const urlParams = new URLSearchParams(window.location.search);
      const errorParam = urlParams.get('error');
      
      if (errorParam) {
        toast({
          title: "Error Reported",
          description: `Error parameter found: ${errorParam}`,
          variant: "destructive",
        });
        console.warn("Error parameter found in URL:", errorParam);
      }
    } catch (error) {
      console.error('Error in AppStatusChecker initialization:', error);
    }
  }, []);

  // Log route changes
  useEffect(() => {
    try {
      console.log('AppStatusChecker: Route changed to:', location.pathname);
      
      // Reset scroll position on route change
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error in AppStatusChecker route change:', error);
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default AppStatusChecker;
