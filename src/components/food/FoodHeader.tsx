
import React from 'react';
import { FoodItem } from '@/data/foodData';

interface FoodHeaderProps {
  foodInfo: FoodItem;
}

const FoodHeader: React.FC<FoodHeaderProps> = ({ foodInfo }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <img 
          src={foodInfo.imageUrl} 
          alt={foodInfo.name} 
          className="rounded-md w-full object-cover"
          width={300}
          height={300}
        />
      </div>
      <div className="md:w-2/3">
        <div className="mb-4">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {foodInfo.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          {foodInfo.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default FoodHeader;
