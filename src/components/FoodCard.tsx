
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, memo, useRef } from "react";
import { foodData } from "../data/foodData";

interface FoodCardProps {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  index?: number;
}

// Memoize FoodCard to prevent unnecessary re-renders
const FoodCard = memo(({ id, name, imageUrl, category, index = 0 }: FoodCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Dedicated high-quality fallback images for specific food items
  const getDedicatedFallbackImage = (foodId: string): string | null => {
    const dedicatedFallbacks: Record<string, string> = {
      // Previously troublesome foods with quality replacements
      "tofu": "/lovable-uploads/6c5503aa-28d2-470d-ad58-fbc91a069ea0.png", 
      "eggs": "/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png",
      
      // Add dedicated fallbacks for foods shown in the screenshot
      "chicken-raw": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop&auto=format&q=75",
      "bacon": "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=500&h=300&fit=crop&auto=format&q=75",
      "salmon": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=300&fit=crop&auto=format&q=75",
      "milk": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop&auto=format&q=75",
      "cheddar-cheese": "https://images.unsplash.com/photo-1552767059-ce182eda88cc?w=500&h=300&fit=crop&auto=format&q=75",
      "apple": "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=500&h=300&fit=crop&auto=format&q=75",
      "bananas": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=300&fit=crop&auto=format&q=75",
      "lettuce": "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=500&h=300&fit=crop&auto=format&q=75",
      "tomatoes": "https://images.unsplash.com/photo-1546093787-6b4e0a75ddbd?w=500&h=300&fit=crop&auto=format&q=75",
      "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop&auto=format&q=75",
      "pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop&auto=format&q=75",
      "rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&h=300&fit=crop&auto=format&q=75",
      "orange-juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=300&fit=crop&auto=format&q=75",
      "ice-cream": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=300&fit=crop&auto=format&q=75"
    };
    
    return dedicatedFallbacks[foodId] || null;
  };
  
  // Find alternative image when primary image fails
  const findFallbackImage = (): string => {
    // First check if we have a dedicated high-quality fallback for this specific food
    const dedicatedFallback = getDedicatedFallbackImage(id);
    if (dedicatedFallback) {
      return dedicatedFallback;
    }
    
    // If no dedicated fallback exists, find a food with a similar category
    const sameCategoryFoods = foodData.filter(food => 
      food.id !== id && 
      food.category === category &&
      food.imageUrl && 
      food.imageUrl.length > 10
    );
    
    if (sameCategoryFoods.length > 0) {
      return sameCategoryFoods[0].imageUrl;
    }
    
    // Last resort fallback - generic food image
    return "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=300&fit=crop&auto=format&q=75";
  };
  
  const fallbackImageUrl = findFallbackImage();
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  // Set a timeout to show fallback if image takes too long to load
  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      if (!imageLoaded) {
        setImageError(true);
      }
    }, 2000);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [imageLoaded]);

  // Optimize and normalize image URLs
  const optimizeImageUrl = (url: string): string => {
    if (!url) return fallbackImageUrl;
    
    // Replace problematic URLs
    if (url.includes('photo-160') || url.includes('photo-162')) {
      return fallbackImageUrl;
    }
    
    // Optimize Unsplash URLs
    if (url.includes('unsplash.com') && !url.includes('auto=format')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}auto=format&q=75&w=500&h=300&fit=crop`;
    }
    
    return url;
  };

  // Performance optimization: reduce motion for users with reduced motion preference
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Prepare structured data for this food item
  const foodItemSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "category": category,
    "image": imageError ? optimizeImageUrl(fallbackImageUrl) : optimizeImageUrl(imageUrl),
    "url": `https://freshcheck.app/food/${id}`
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.2) }}
      className="food-card-container"
    >
      {/* Structured data for this food product */}
      {index < 10 && (
        <script type="application/ld+json">
          {JSON.stringify(foodItemSchema)}
        </script>
      )}
      
      <Link to={`/food/${id}`} className="block" aria-label={`View details about ${name}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="h-32 w-full bg-gray-100 overflow-hidden relative" style={{ aspectRatio: '16/9' }}>
            {/* Placeholder with exact dimensions to prevent layout shift */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true"></div>
            )}
            
            <img 
              src={imageError ? optimizeImageUrl(fallbackImageUrl) : optimizeImageUrl(imageUrl)}
              alt={`${name} - food storage information`}
              width="500"
              height="300"
              className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading={index > 2 ? "lazy" : "eager"} 
              onError={handleImageError}
              onLoad={handleImageLoad}
              fetchPriority={index < 3 ? "high" : "auto"}
              decoding={index < 3 ? "sync" : "async"}
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-foreground truncate">{name}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

FoodCard.displayName = "FoodCard";

export default FoodCard;
