
import { createContext, useContext, ReactNode, useEffect, useState, useCallback, useMemo } from 'react';
import { FOOD_IMAGES } from '../components/FoodCard';

type ImagesContextType = {
  getImageUrl: (foodId: string) => string;
  preloadImage: (foodId: string) => void;
  isImageLoaded: (foodId: string) => boolean;
};

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

// Use a cache outside component to persist between re-renders
const IMAGE_CACHE: Record<string, boolean> = {};

export function ImagesProvider({ children }: { children: ReactNode }) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>(IMAGE_CACHE);

  // Preload the most common food images on mount - with idle callback
  useEffect(() => {
    const commonFoods = ['milk', 'eggs', 'bread', 'chicken', 'apples', 'bananas'];
    
    // Use requestIdleCallback for better performance
    const preloadQueue = () => {
      if (commonFoods.length === 0) return;
      
      const foodId = commonFoods.shift();
      if (foodId) {
        preloadImage(foodId);
      }
      
      // Schedule next preload in queue
      if (commonFoods.length > 0) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(preloadQueue, { timeout: 1000 });
        } else {
          setTimeout(preloadQueue, 150);
        }
      }
    };
    
    // Start preloading when browser is idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadQueue, { timeout: 1000 });
    } else {
      setTimeout(preloadQueue, 150);
    }
  }, []);

  // Memoize getImageUrl to prevent unnecessary re-renders
  const getImageUrl = useCallback((foodId: string): string => {
    // First check if we have a direct match in our central mapping
    if (FOOD_IMAGES[foodId]) {
      return FOOD_IMAGES[foodId];
    }

    // If no direct match, return the default image
    return FOOD_IMAGES.default;
  }, []);

  // Memoize preloadImage to prevent unnecessary re-renders
  const preloadImage = useCallback((foodId: string) => {
    const imageUrl = getImageUrl(foodId);
    
    // Skip if already loaded or loading
    if (imageUrl && !loadedImages[foodId] && !IMAGE_CACHE[foodId]) {
      // Mark as loading to prevent duplicate loads
      IMAGE_CACHE[foodId] = true;
      
      const img = new Image();
      img.onload = () => {
        IMAGE_CACHE[foodId] = true;
        setLoadedImages(prev => ({
          ...prev,
          [foodId]: true
        }));
      };
      img.src = imageUrl;
    }
  }, [getImageUrl, loadedImages]);

  const isImageLoaded = useCallback((foodId: string): boolean => {
    return !!loadedImages[foodId];
  }, [loadedImages]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    getImageUrl,
    preloadImage,
    isImageLoaded
  }), [getImageUrl, preloadImage, isImageLoaded]);

  return (
    <ImagesContext.Provider value={contextValue}>
      {children}
    </ImagesContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImagesContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImagesProvider');
  }
  return context;
}
