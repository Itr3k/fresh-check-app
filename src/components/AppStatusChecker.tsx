
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '../hooks/use-toast';
import { handleError } from '@/lib/errorUtils';
import { getEnvironmentName } from '@/lib/serviceWorkerUtils';

/**
 * Component that checks if the app is properly initialized and handles route changes
 * This helps debug issues when the app isn't rendering properly
 */
const AppStatusChecker = () => {
  const [initialized, setInitialized] = useState(false);
  const [environment, setEnvironment] = useState<string>('unknown');
  const location = useLocation();

  // Detect environment on mount
  useEffect(() => {
    try {
      const detectedEnv = getEnvironmentName();
      setEnvironment(detectedEnv);
      console.log(`AppStatusChecker: Environment detected: ${detectedEnv}`);
    } catch (error) {
      handleError(error, 'environment-detection');
    }
  }, []);

  useEffect(() => {
    try {
      console.log(`AppStatusChecker: App initializing on route: ${location.pathname} in environment: ${environment}`);
      
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
        console.warn(`Error parameter found in URL (${environment}):`, errorParam);
        
        // Report to analytics if available
        if (window.gtag) {
          window.gtag('event', 'error', {
            event_category: 'URL Parameter Error',
            event_label: errorParam,
            non_interaction: true,
            environment: environment
          });
        }
      }
      
      // Log successful initialization to analytics
      if (window.gtag) {
        window.gtag('event', 'app_initialized', {
          event_category: 'App Lifecycle',
          event_label: location.pathname,
          non_interaction: true,
          environment: environment
        });
      }
      
    } catch (error) {
      console.error('Error in AppStatusChecker initialization:', error);
      handleError(error, 'app-status-init');
    }
  }, [location.pathname, environment]);

  // Log route changes
  useEffect(() => {
    try {
      if (initialized) {
        console.log(`AppStatusChecker: Route changed to: ${location.pathname} in ${environment}`);
        
        // Reset scroll position on route change
        window.scrollTo(0, 0);
        
        // Track page view in analytics
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: location.pathname,
            environment: environment
          });
        }
      }
    } catch (error) {
      console.error('Error in AppStatusChecker route change:', error);
      handleError(error, 'route-change');
    }
  }, [location.pathname, initialized, environment]);

  return null; // This component doesn't render anything
};

export default AppStatusChecker;
