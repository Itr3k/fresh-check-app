
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Refrigerator, Snowflake, Home } from 'lucide-react';

interface StorageGuidelinesProps {
  foodName: string;
}

const StorageGuidelines: React.FC<StorageGuidelinesProps> = ({ foodName }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-6">Storage Guidelines</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-md overflow-hidden">
          <div className="bg-gray-100 py-2 text-center">
            <span className="text-sm font-medium">Room Temperature</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Home className="h-4 w-4 text-gray-600" />
              <span>5-7 days, away from moisture</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-md overflow-hidden">
          <div className="bg-gray-100 py-2 text-center">
            <span className="text-sm font-medium">Refrigerator</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Refrigerator className="h-4 w-4 text-gray-600" />
              <span>7-12 days at 40°F (4°C)</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-md overflow-hidden">
          <div className="bg-gray-100 py-2 text-center">
            <span className="text-sm font-medium">Freezer</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Snowflake className="h-4 w-4 text-gray-600" />
              <span>Up to 3 months at 0°F (-18°C)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border rounded-md overflow-hidden mb-6">
        <h3 className="text-base font-medium p-4 border-b flex items-center gap-2">
          <Refrigerator className="h-5 w-5 text-blue-600" />
          Refrigerator Storage (40°F / 4°C)
        </h3>
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium">Days</span>
            <span className="text-sm font-medium">FDA recommended usage rating</span>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
            <span className="text-sm">7-12 days</span>
            <span className="text-sm">N/A</span>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Storage Tips</h4>
            <p className="text-sm text-gray-600">
              Refrigeration actually accelerates bread going stale. Wrap in foil if you plan to reheat.
            </p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <span className="text-xs bg-[#ebf7ed] text-[#16a34a] px-2 py-0.5 rounded-full">
              Calculator: 0.2 (10ms/99%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageGuidelines;
