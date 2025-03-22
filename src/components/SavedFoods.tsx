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

  const findRelatedImageUrl = (foodId: string, category: string): string => {
    const currentFood = foodData.find(food => food.id === foodId);
    
    if (currentFood?.tags?.length) {
      const tagMatchingFoods = foodData.filter(food => 
        food.id !== foodId && 
        food.tags?.some(tag => currentFood.tags?.includes(tag))
      );
      
      if (tagMatchingFoods.length > 0) {
        return tagMatchingFoods[Math.floor(Math.random() * tagMatchingFoods.length)].imageUrl;
      }
    }
    
    const sameCategoryFoods = foodData.filter(food => 
      food.id !== foodId && 
      food.category === category
    );
    
    if (sameCategoryFoods.length > 0) {
      return sameCategoryFoods[Math.floor(Math.random() * sameCategoryFoods.length)].imageUrl;
    }
    
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
