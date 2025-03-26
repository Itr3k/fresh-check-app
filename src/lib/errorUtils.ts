
/**
 * Safely handles errors and logs them for debugging
 * @param error The error to handle
 * @param context Additional context about where the error occurred
 */
export const handleError = (error: unknown, context: string = 'unknown'): void => {
  console.error(`[Error in ${context}]:`, error);
  
  // Report to analytics if available
  if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'error', {
      error_message: error instanceof Error ? error.message : String(error),
      error_context: context,
      event_category: 'Error',
      event_label: context,
      non_interaction: true
    });
  }
  
  // If we have a DOM, update the UI to show the error
  if (typeof document !== 'undefined') {
    const appError = document.getElementById('app-error');
    const loader = document.getElementById('loading-indicator');
    
    if (appError && loader) {
      loader.style.display = 'none';
      appError.classList.remove('hidden');
    }
  }
};

/**
 * Creates a wrapper function that handles errors for async operations
 * @param fn The function to wrap with error handling
 * @param context Context for the error
 */
export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context: string
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, context);
      throw error;
    }
  };
};

/**
 * Helper to check if the app is running in production
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Helper to determine if we're running in a browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

// Remove the conflicting declaration and rely on the one in src/types/gtag.d.ts
// The global interface declaration was causing the TypeScript error
