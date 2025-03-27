
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Enhanced performance monitoring utilities
export function reportPerformance(metricName: string, value: number): void {
  if (window.performance && window.performance.mark) {
    window.performance.mark(`${metricName}-start`);
    
    // Report to analytics in production
    if (process.env.NODE_ENV === 'production') {
      try {
        // Use Web Vitals API if available
        const metric = {
          name: metricName,
          value: value,
          delta: 0,
          id: new Date().getTime().toString(),
        };
        
        // Also capture ad-specific metrics
        if (metricName.includes('ad-')) {
          // Store ad metrics for later analysis
          const adMetrics = JSON.parse(localStorage.getItem('ad-metrics') || '{}');
          adMetrics[metricName] = {
            value,
            timestamp: Date.now()
          };
          localStorage.setItem('ad-metrics', JSON.stringify(adMetrics));
        }
        
        // @ts-ignore - Assuming reportWebVitals might be available
        if (window.__reportWebVitals) {
          // @ts-ignore
          window.__reportWebVitals(metric);
        }
      } catch (e) {
        console.error('Failed to report performance metric:', e);
      }
    }
    
    window.performance.mark(`${metricName}-end`);
    window.performance.measure(metricName, `${metricName}-start`, `${metricName}-end`);
  }
}

// Ad-specific performance monitoring
export const monitorAdPerformance = (adSlot: string): void => {
  if (typeof window === 'undefined' || !window.performance || !window.performance.now) return;
  
  const metrics = {
    slot: adSlot,
    pageLoadTime: window.performance.now(),
    adLoadStartTime: 0,
    adLoadEndTime: 0,
    adRenderTime: 0,
    adViewabilityTime: 0
  };
  
  // Watch for ad-specific events
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Ad iframe has been added
        if (metrics.adLoadStartTime === 0) {
          metrics.adLoadStartTime = window.performance.now();
        }
        
        // Look for ad iframe completion
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLIFrameElement) {
            metrics.adRenderTime = window.performance.now();
            reportPerformance(`ad-render-${adSlot}`, metrics.adRenderTime - metrics.adLoadStartTime);
            
            // Set up viewability detection once iframe is loaded
            node.addEventListener('load', () => {
              metrics.adLoadEndTime = window.performance.now();
              reportPerformance(`ad-load-complete-${adSlot}`, metrics.adLoadEndTime - metrics.adLoadStartTime);
              
              // Set up intersection observer for viewability
              const viewabilityObserver = new IntersectionObserver(
                (entries) => {
                  if (entries[0].isIntersecting && metrics.adViewabilityTime === 0) {
                    metrics.adViewabilityTime = window.performance.now();
                    reportPerformance(`ad-viewable-${adSlot}`, metrics.adViewabilityTime - metrics.pageLoadTime);
                    viewabilityObserver.disconnect();
                  }
                },
                { threshold: 0.5 }
              );
              
              viewabilityObserver.observe(node);
            });
            
            // We found the iframe, can stop observing
            observer.disconnect();
            break;
          }
        }
      }
    }
  });
  
  // Look for the ad container and observe changes
  setTimeout(() => {
    const adContainer = document.getElementById(`ad-container-${adSlot}`);
    if (adContainer) {
      observer.observe(adContainer, { childList: true, subtree: true });
    }
  }, 100);
};

// Add SEO helper
export function generateStructuredData(data: Record<string, any>): string {
  return JSON.stringify(data);
}

// Add accessibility helper
export function getAccessibleName(name: string, context?: string): string {
  return context ? `${name} ${context}` : name;
}
