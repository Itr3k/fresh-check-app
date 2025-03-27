
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FoodItem } from '@/data/foodData';

interface FoodDetailHeaderProps {
  foodInfo: FoodItem;
}

const FoodDetailHeader: React.FC<FoodDetailHeaderProps> = ({ foodInfo }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Link to="/" className="text-sm text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-gray-300" />
        <Link to="/foods" className="text-sm text-gray-500 hover:text-primary">
          Foods
        </Link>
        <ChevronRight className="h-3 w-3 text-gray-300" />
        <span className="text-sm text-gray-700 font-medium">
          {foodInfo.name}
        </span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <Link 
                to="/bread-group" 
                className="bg-[#e5f7ff] text-blue-600 px-2 py-0.5 rounded-full text-xs"
              >
                Bread & Bread
              </Link>
              <Link 
                to="/category/bakery" 
                className="bg-[#fff9eb] text-amber-600 px-2 py-0.5 rounded-full text-xs"
              >
                Category
              </Link>
              <Link 
                to="/preservation-tips" 
                className="bg-[#f3f4f6] text-gray-600 px-2 py-0.5 rounded-full text-xs"
              >
                Preservation Tips
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{foodInfo.name}</h1>
            
            <p className="text-gray-600 mb-4">
              {foodInfo.description || `${foodInfo.name} is a staple food prepared from a dough of flour and water. It comes in countless varieties, textures, and flavors. Your soft sandwich bread to crusty artisanal loaves.`}
            </p>
            
            <div className="text-xs text-gray-500">
              Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-[400px] aspect-square bg-gray-100 rounded-md flex items-center justify-center">
          <img 
            src={foodInfo.imageUrl || '/placeholder.svg'} 
            alt={foodInfo.name}
            className="object-cover w-full h-full rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodDetailHeader;
