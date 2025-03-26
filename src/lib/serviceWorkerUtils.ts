
/**
 * Utility functions for service worker registration and management
 */

import { handleError } from './errorUtils';

/**
 * Attempt to register the service worker for production environments,
 * but bypass it in development and preview environments
 */
export const registerServiceWorker = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers are not supported in this browser');
    return;
  }

  try {
    const hostname = window.location.hostname;
    
    // Skip service worker registration in development environments
    if (hostname.includes('localhost') || 
        hostname.includes('127.0.0.1') || 
        hostname.includes('lovableproject.com') ||
        hostname.includes('preview')) {
      console.log('Skipping service worker registration in development/preview environment');
      unregisterServiceWorker(); // Unregister existing service workers in dev
      return;
    }
    
    // Only register in production environments
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('ServiceWorker registration successful:', registration.scope);
    
    // Set the app build ID for debugging
    if (registration.active) {
      try {
        const message = { type: 'GET_VERSION' };
        const messageChannel = new MessageChannel();
        registration.active.postMessage(message, [messageChannel.port2]);
        
        messageChannel.port1.onmessage = (event) => {
          if (event.data && event.data.version) {
            window.appBuildId = event.data.version;
            console.log('Service worker version:', event.data.version);
          }
        };
      } catch (error) {
        console.error('Error getting service worker version:', error);
      }
    }
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
    handleError(error, 'sw-registration');
    
    // Try to unregister any existing service worker on error
    unregisterServiceWorker();
  }
};

/**
 * Unregister all service workers
 * Useful for development or when switching environments
 */
export const unregisterServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (const registration of registrations) {
        await registration.unregister();
        console.log('ServiceWorker unregistered');
      }
    } catch (error) {
      console.error('Error unregistering service worker:', error);
    }
  }
};

/**
 * Check if the app is running in a production environment
 */
export const isProductionEnvironment = (): boolean => {
  const hostname = window.location.hostname;
  return !hostname.includes('localhost') && 
         !hostname.includes('127.0.0.1') && 
         !hostname.includes('lovableproject.com') &&
         !hostname.includes('preview');
};

/**
 * Get the current environment name
 */
export const getEnvironmentName = (): string => {
  const hostname = window.location.hostname;
  
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return 'local';
  } else if (hostname.includes('lovableproject.com')) {
    return 'lovable-sandbox';
  } else if (hostname.includes('preview')) {
    return 'preview';
  } else if (hostname.includes('freshcheck.app')) {
    return 'production';
  }
  
  return 'unknown';
};
