
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, memo, useRef } from "react";
import { foodData } from "../data/foodData";

// Import shared FOOD_IMAGES from somewhere if possible
// For consistency, this should ideally be in a shared module
const FOOD_IMAGES: Record<string, string> = {
  chicken: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=400&fit=crop",
  "chicken-raw": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop&auto=format&q=75",
  milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop",
  eggs: "/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
  bananas: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=400&fit=crop",
  lettuce: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=800&h=200&fit=crop",
  tomatoes: "https://images.unsplash.com/photo-1546093787-6b4e0a75ddbd?w=800&h=200&fit=crop",
  avocados: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&h=200&fit=crop",
  apples: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=200&fit=crop",
  tofu: "/lovable-uploads/6c5503aa-28d2-470d-ad58-fbc91a069ea0.png",
  bacon: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=500&h=300&fit=crop",
  cheese: "https://images.unsplash.com/photo-1552767059-ce182eda88cc?w=800&h=400&fit=crop",
  yogurt: "https://images.unsplash.com/photo-1571212515416-fca988083f35?w=800&h=400&fit=crop",
  oranges: "https://images.unsplash.com/photo-1611080626919-7cf5a9b834c8?w=800&h=400&fit=crop",
  peppers: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&h=400&fit=crop",
  onions: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=800&h=400&fit=crop",
  "orange-juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=300&fit=crop&auto=format&q=75",
  "ice-cream": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=300&fit=crop&auto=format&q=75",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop&auto=format&q=75",
  rice: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&h=300&fit=crop&auto=format&q=75",
  salmon: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=300&fit=crop&auto=format&q=75",
  default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop"
};

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
  
  // Use centralized mapping for consistent images
  const getConsistentImage = (foodId: string): string => {
    if (FOOD_IMAGES[foodId]) {
      return FOOD_IMAGES[foodId];
    }
    
    // If no direct match in our mapping, use the provided imageUrl
    return imageUrl;
  };
  
  // Find alternative image when primary image fails
  const findFallbackImage = (): string => {
    // First check if we have a dedicated high-quality fallback for this specific food
    if (FOOD_IMAGES[id]) {
      return FOOD_IMAGES[id];
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
    return FOOD_IMAGES.default;
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
    
    // First check if we have this food in our mapping for consistency
    if (FOOD_IMAGES[id]) {
      return FOOD_IMAGES[id];
    }
    
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

  // Use consistent image from our mapping if available
  const displayImageUrl = FOOD_IMAGES[id] || optimizeImageUrl(imageUrl);

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
              src={imageError ? optimizeImageUrl(fallbackImageUrl) : displayImageUrl}
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
