
/**
 * Safely handles errors and logs them for debugging
 * @param error The error to handle
 * @param context Additional context about where the error occurred
 */
export const handleError = (error: unknown, context: string = 'unknown'): void => {
  console.error(`[Error in ${context}]:`, error);
  
  // Report to analytics if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'error', {
      error_message: error instanceof Error ? error.message : String(error),
      error_context: context,
      non_interaction: true
    });
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
