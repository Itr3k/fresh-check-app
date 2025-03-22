
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
  
  // Find related foods for fallback images with improved relevance
  const findRelatedImageUrl = (): string => {
    // Get the current food item to access its tags
    const currentFood = foodData.find(food => food.id === id);
    
    if (currentFood?.tags?.length) {
      // Try to find foods with matching tags first (most relevant)
      const tagMatchingFoods = foodData.filter(food => 
        food.id !== id && 
        food.tags?.some(tag => currentFood.tags?.includes(tag))
      );
      
      if (tagMatchingFoods.length > 0) {
        // Return a random image from tag-matching foods
        return tagMatchingFoods[Math.floor(Math.random() * tagMatchingFoods.length)].imageUrl;
      }
    }
    
    // If no tag matches or no tags, try same category (second most relevant)
    const sameCategoryFoods = foodData.filter(food => 
      food.id !== id && 
      food.category === category
    );
    
    if (sameCategoryFoods.length > 0) {
      // Return a random image from the same category
      return sameCategoryFoods[Math.floor(Math.random() * sameCategoryFoods.length)].imageUrl;
    }
    
    // If no related foods found, use a generic food image as last resort
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
