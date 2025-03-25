
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { reportPerformance } from '@/lib/utils';

/**
 * ScrollToTop component that scrolls the window to the top on route changes
 * This should be placed near the root of the application
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Performance mark for page navigation
    performance.mark(`page-navigation-${pathname}`);
    
    // Don't scroll to top if there's a hash in the URL (anchor link)
    if (hash) return;

    // Use setTimeout to defer scrolling to next tick for better performance
    const scrollTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Use 'instant' instead of 'smooth' to avoid visual lag
      });
      
      // Report navigation performance
      reportPerformance('page-navigation', performance.now());
    }, 0);
    
    // Also report to analytics that a page navigation occurred
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        event_category: 'engagement',
        event_label: `Page: ${pathname}`,
        non_interaction: false
      });
    }
    
    return () => clearTimeout(scrollTimer);
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
