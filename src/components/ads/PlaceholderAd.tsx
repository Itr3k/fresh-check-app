
import React from "react";
import { Square, Rows3 } from "lucide-react";

interface PlaceholderAdProps {
  adName: string;
  width: number;
  height: number;
}

const PlaceholderAd: React.FC<PlaceholderAdProps> = ({ adName, width, height }) => {
  // Use a more specific icon based on ad format
  const isRectangular = width > height * 1.5;
  const Icon = isRectangular ? Rows3 : Square;
  
  return (
    <div className="text-center p-3 h-full w-full flex flex-col items-center justify-center bg-gray-100 rounded-md">
      <p className="text-xs text-gray-500 mb-1">
        Advertisement
      </p>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-[90%] h-[70%] bg-gray-200 rounded-md border border-dashed border-gray-300">
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 mt-2 italic">
          {adName} ({width}×{height})
        </p>
      </div>
    </div>
  );
};

export default PlaceholderAd;
