
import React from 'react';
import { Link } from 'react-router-dom';
import { FOOD_IMAGES } from '@/components/FoodCard';

interface RelatedFoodItem {
  id: string;
  name: string;
  category: string;
  duration?: string;
}

interface RelatedFoodsSectionProps {
  foodName: string;
  relatedFoods: RelatedFoodItem[];
}

const RelatedFoodsSection: React.FC<RelatedFoodsSectionProps> = ({ 
  foodName,
  relatedFoods = [
    { id: "white-bread", name: "White Bread", category: "Bakery", duration: "5-7 days" },
    { id: "rice", name: "Rice", category: "Grains", duration: "3-5 days cooked" },
    { id: "tortillas", name: "Tortillas", category: "Flatbreads", duration: "7 days" },
    { id: "bagels", name: "Bagels", category: "Bakery", duration: "2-3 days" }
  ]
}) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Content</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md overflow-hidden bg-white p-4">
          <h3 className="font-medium mb-3">Similar Foods</h3>
          
          <div className="space-y-2">
            {relatedFoods.map((food) => (
              <Link 
                key={food.id} 
                to={`/food/${food.id}`}
                className="flex items-center p-2 border rounded hover:bg-gray-50"
              >
                <img 
                  src={FOOD_IMAGES[food.id] || FOOD_IMAGES.default} 
                  alt={food.name} 
                  className="w-10 h-10 object-cover rounded mr-3"
                />
                <div>
                  <div className="font-medium text-sm">{food.name}</div>
                  <div className="text-xs text-gray-500">{food.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden bg-white p-4">
          <h3 className="font-medium mb-3">Seasonality</h3>
          <p className="text-sm text-gray-600">
            Available year-round
          </p>
          
          <h3 className="font-medium mt-4 mb-3">Quick Facts</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Category:</span> Bakery / Bread
            </div>
            <div>
              <span className="font-medium">Standard serving size:</span> 1 slice (30g), entire loaf
            </div>
            <div>
              <span className="font-medium">Calories per serving:</span> ~80 kcal
            </div>
            <div>
              <span className="font-medium">Optimal storage:</span> 7 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedFoodsSection;
