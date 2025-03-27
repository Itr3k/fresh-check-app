
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FoodItem } from '@/data/foodData';

interface FoodHeaderProps {
  foodInfo: FoodItem;
}

const FoodHeader: React.FC<FoodHeaderProps> = ({ foodInfo }) => {
  return (
    <div className="mb-6">
      <nav className="flex items-center text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3 mx-1" />
        <Link to="/foods" className="hover:text-primary">Foods</Link>
        <ChevronRight className="h-3 w-3 mx-1" />
        <span className="font-medium text-gray-700">{foodInfo.name}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center space-x-1 text-sm">
          <Link to="/bread-group" className="bg-[#e5f7ff] text-blue-600 px-2 py-0.5 rounded-full text-xs">
            Bread & Bread
          </Link>
          <span className="text-gray-400 mx-1">|</span>
          <Link to="/category" className="bg-[#fff9eb] text-amber-600 px-2 py-0.5 rounded-full text-xs">
            Category
          </Link>
          <span className="text-gray-400 mx-1">|</span>
          <Link to="/preservation-tips" className="bg-[#f3f4f6] text-gray-600 px-2 py-0.5 rounded-full text-xs">
            Preservation Tips
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">{foodInfo.name}</h1>

        <p className="text-gray-600">
          {foodInfo.description || `${foodInfo.name} is a staple food prepared from a dough of flour and water. It comes in countless varieties, textures, and flavors. Your soft sandwich bread to crusty artisanal loaves.`}
        </p>

        <div className="text-sm text-gray-500">
          Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default FoodHeader;
