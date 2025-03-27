import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, memo, useRef } from "react";
import { foodData } from "../data/foodData";
import { useImages } from "../contexts/ImagesContext";

// Centralized food images mapping for consistent imagery across the app
export const FOOD_IMAGES: Record<string, string> = {
  chicken: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=400&fit=crop",
  "chicken-raw": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop&auto=format&q=75",
  milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop",
  eggs: "/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
  bananas: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=400&fit=crop",
  lettuce: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=800&h=400&fit=crop",
  tomatoes: "https://images.unsplash.com/photo-1546093787-af9955702365?w=800&h=400&fit=crop", // High-quality tomatoes image
  avocados: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&h=400&fit=crop",
  apples: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=400&fit=crop",
  tofu: "/lovable-uploads/6c5503aa-28d2-470d-ad58-fbc91a069ea0.png",
  bacon: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=500&h=300&fit=crop",
  cheese: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&h=400&fit=crop",
  yogurt: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=400&fit=crop", // High-quality yogurt image
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
  const { getImageUrl, preloadImage } = useImages();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Preload this image and any related foods - only when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          preloadImage(id);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    const currentElement = document.getElementById(`food-card-${id}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      observer.disconnect();
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [id, preloadImage]);
  
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

  // Get the appropriate image URL for this food item
  const displayImageUrl = FOOD_IMAGES[id] || imageUrl;
  const fallbackImageUrl = FOOD_IMAGES.default;

  // Performance optimization: reduce motion for users with reduced motion preference
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Prepare structured data for this food item
  const foodItemSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "category": category,
    "image": imageError ? fallbackImageUrl : displayImageUrl,
    "url": `https://freshcheck.app/food/${id}`
  };

  return (
    <motion.div
      id={`food-card-${id}`}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.2) }}
      className="food-card-container"
    >
      {/* Structured data for this food product - limit to first 10 for performance */}
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
              src={imageError ? fallbackImageUrl : displayImageUrl}
              alt={`${name} - food storage information`}
              width="500"
              height="300"
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
