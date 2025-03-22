
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { foodData } from '../data/foodData';

interface SavedFood {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  savedAt: string;
}

const SavedFoods = () => {
  const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);

  useEffect(() => {
    const loadSavedFoods = () => {
      const foods: SavedFood[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('saved-food-')) {
          try {
            const foodData = JSON.parse(localStorage.getItem(key) || '');
            foods.push(foodData);
          } catch (error) {
            console.error('Error parsing saved food data:', error);
          }
        }
      }
      
      foods.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
      setSavedFoods(foods);
    };

    loadSavedFoods();
    
    window.addEventListener('storage', loadSavedFoods);
    
    return () => {
      window.removeEventListener('storage', loadSavedFoods);
    };
  }, []);

  // Fixed fallback images for specific troublesome foods
  const getFixedFallbackImage = (foodId: string): string | null => {
    const fixedFallbacks: Record<string, string> = {
      "tofu": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop", // Green salad as fallback for tofu
      "eggs": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=300&fit=crop", // Muffins (which often contain eggs)
    };
    
    return fixedFallbacks[foodId] || null;
  };

  const findRelatedImageUrl = (foodId: string, category: string): string => {
    // First check if we have a fixed fallback for this specific food
    const fixedFallback = getFixedFallbackImage(foodId);
    if (fixedFallback) {
      return fixedFallback;
    }
    
    // Get the current food item to access its tags and name
    const currentFood = foodData.find(food => food.id === foodId);
    
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
      food.id !== foodId && 
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
          food.id !== foodId && 
          food.tags?.includes(tag)
        );
        
        if (exactTagMatches.length > 0) {
          return exactTagMatches[Math.floor(Math.random() * exactTagMatches.length)].imageUrl;
        }
      }
      
      // If no exact matches, try partial tag matches
      const tagMatchingFoods = foodData.filter(food => 
        food.id !== foodId && 
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
        food.id !== foodId && 
        food.tags?.includes("vegetarian")
      );
      
      if (vegetarianOptions.length > 0) {
        return vegetarianOptions[Math.floor(Math.random() * vegetarianOptions.length)].imageUrl;
      }
    }
    
    // Regular category matching as fallback
    const sameCategoryFoods = foodData.filter(food => 
      food.id !== foodId && 
      food.category === category
    );
    
    if (sameCategoryFoods.length > 0) {
      return sameCategoryFoods[Math.floor(Math.random() * sameCategoryFoods.length)].imageUrl;
    }
    
    // Last resort: generic food image
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop";
  };

  const removeSavedFood = (id: string) => {
    localStorage.removeItem(`saved-food-${id}`);
    setSavedFoods(prev => prev.filter(food => food.id !== id));
    toast.success('Removed from saved foods');
  };

  if (savedFoods.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold mb-4"
      >
        My Saved Foods
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {savedFoods.map((food) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative group"
          >
            <Link
              to={`/food/${food.id}`}
              className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-36 bg-gray-100">
                <img
                  src={food.imageUrl}
                  alt={`${food.name} storage information`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Image failed to load for ${food.name}:`, food.imageUrl);
                    (e.target as HTMLImageElement).src = findRelatedImageUrl(food.id, food.category);
                  }}
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium">{food.name}</h3>
                <p className="text-xs text-muted-foreground">{food.category}</p>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeSavedFood(food.id);
              }}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Remove ${food.name} from saved foods`}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SavedFoods;
