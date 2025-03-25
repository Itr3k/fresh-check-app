
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that scrolls the window to the top on route changes
 * This should be placed near the root of the application
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the pathname changes
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Use 'instant' instead of 'smooth' to avoid visual lag
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
