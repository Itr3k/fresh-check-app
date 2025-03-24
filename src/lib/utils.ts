
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add performance monitoring utilities
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

// Add SEO helper
export function generateStructuredData(data: Record<string, any>): string {
  return JSON.stringify(data);
}

// Add accessibility helper
export function getAccessibleName(name: string, context?: string): string {
  return context ? `${name} ${context}` : name;
}
