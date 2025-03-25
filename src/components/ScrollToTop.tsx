
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top on route changes
 * This should be placed near the root of the application
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Don't scroll to top if there's a hash in the URL (anchor link)
    if (hash) return;

    // Scroll to top when the pathname changes
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Use 'instant' instead of 'smooth' to avoid visual lag
    });
    
    // Also report to analytics that a page navigation occurred
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        event_category: 'engagement',
        event_label: `Page: ${pathname}`,
        non_interaction: false
      });
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
