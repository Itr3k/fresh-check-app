
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { FOOD_IMAGES } from '../components/FoodCard';

type ImagesContextType = {
  getImageUrl: (foodId: string) => string;
  preloadImage: (foodId: string) => void;
  isImageLoaded: (foodId: string) => boolean;
};

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export function ImagesProvider({ children }: { children: ReactNode }) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Preload the most common food images on mount
  useEffect(() => {
    const commonFoods = ['milk', 'eggs', 'bread', 'chicken', 'apples', 'bananas', 'tomatoes', 'cheese'];
    commonFoods.forEach(foodId => {
      preloadImage(foodId);
    });
  }, []);

  const getImageUrl = (foodId: string): string => {
    // First check if we have a direct match in our central mapping
    if (FOOD_IMAGES[foodId]) {
      return FOOD_IMAGES[foodId];
    }

    // If no direct match, return the default image
    return FOOD_IMAGES.default;
  };

  const preloadImage = (foodId: string) => {
    const imageUrl = getImageUrl(foodId);
    
    if (imageUrl && !loadedImages[foodId]) {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [foodId]: true
        }));
      };
      img.src = imageUrl;
    }
  };

  const isImageLoaded = (foodId: string): boolean => {
    return !!loadedImages[foodId];
  };

  return (
    <ImagesContext.Provider value={{ getImageUrl, preloadImage, isImageLoaded }}>
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
