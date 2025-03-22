
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { foodData } from "../data/foodData";

interface FoodCardProps {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  index?: number;
}

const FoodCard = ({ id, name, imageUrl, category, index = 0 }: FoodCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Fixed fallback images for specific troublesome foods
  const getFixedFallbackImage = (foodId: string): string | null => {
    const fixedFallbacks: Record<string, string> = {
      "tofu": "/lovable-uploads/6c5503aa-28d2-470d-ad58-fbc91a069ea0.png", // Custom tofu image
      "eggs": "/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png", // Custom eggs image
      "bacon": "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=500&h=300&fit=crop", // Bacon frying in a pan
    };
    
    return fixedFallbacks[foodId] || null;
  };
  
  // Find related foods for fallback images with semantically meaningful matches
  const findRelatedImageUrl = (): string => {
    // First check if we have a fixed fallback for this specific food
    const fixedFallback = getFixedFallbackImage(id);
    if (fixedFallback) {
      return fixedFallback;
    }
    
    // Get the current food item to access its tags and name
    const currentFood = foodData.find(food => food.id === id);
    
    if (!currentFood) {
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop";
    }
    
    // Extract keywords from the food name
    const nameKeywords = currentFood.name.toLowerCase()
      .replace(/[()]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    // First priority: Find foods with matching keywords in name that contain our food name
    // (e.g., "Eggs Benedict" for "Eggs")
    const nameMatchingFoods = foodData.filter(food => 
      food.id !== id && 
      nameKeywords.some(keyword => 
        food.name.toLowerCase().includes(keyword) && 
        food.id !== currentFood.id
      )
    );
    
    if (nameMatchingFoods.length > 0) {
      return nameMatchingFoods[Math.floor(Math.random() * nameMatchingFoods.length)].imageUrl;
    }
    
    // Second priority: Try to find foods with matching tags, but prioritize exact tag matches
    if (currentFood.tags?.length) {
      // First try to find exact tag matches (e.g., "vegetarian" for tofu)
      for (const tag of currentFood.tags) {
        // Find foods that have this specific tag but aren't the current food
        const exactTagMatches = foodData.filter(food => 
          food.id !== id && 
          food.tags?.includes(tag)
        );
        
        if (exactTagMatches.length > 0) {
          return exactTagMatches[Math.floor(Math.random() * exactTagMatches.length)].imageUrl;
        }
      }
      
      // If no exact matches, try partial tag matches
      const tagMatchingFoods = foodData.filter(food => 
        food.id !== id && 
        food.tags?.some(foodTag => 
          currentFood.tags?.some(currentTag => 
            foodTag.includes(currentTag) || currentTag.includes(foodTag)
          )
        )
      );
      
      if (tagMatchingFoods.length > 0) {
        return tagMatchingFoods[Math.floor(Math.random() * tagMatchingFoods.length)].imageUrl;
      }
    }
    
    // Third priority: try same category but exclude drastically different items
    // Special case handling for specific categories that need careful matching
    if (category === "Specialty Items" && currentFood.tags?.includes("vegetarian")) {
      // For vegetarian items like tofu, ensure we don't show meat
      const vegetarianOptions = foodData.filter(food => 
        food.id !== id && 
        food.tags?.includes("vegetarian")
      );
      
      if (vegetarianOptions.length > 0) {
        return vegetarianOptions[Math.floor(Math.random() * vegetarianOptions.length)].imageUrl;
      }
    }
    
    // Regular category matching as fallback
    const sameCategoryFoods = foodData.filter(food => 
      food.id !== id && 
      food.category === category
    );
    
    if (sameCategoryFoods.length > 0) {
      return sameCategoryFoods[Math.floor(Math.random() * sameCategoryFoods.length)].imageUrl;
    }
    
    // Last resort: generic food image
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop";
  };
  
  const fallbackImageUrl = findRelatedImageUrl();
  
  const handleImageError = () => {
    console.error(`Image failed to load for ${name}:`, imageUrl);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/food/${id}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="h-32 w-full bg-gray-100 overflow-hidden">
            <img 
              src={imageError ? fallbackImageUrl : imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              onError={handleImageError}
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
};

export default FoodCard;
