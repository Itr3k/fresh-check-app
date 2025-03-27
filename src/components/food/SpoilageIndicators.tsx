
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SpoilageIndicatorsProps {
  foodName: string;
  indicators?: string[];
}

const SpoilageIndicators: React.FC<SpoilageIndicatorsProps> = ({ 
  foodName,
  indicators = [
    "Visible mold or spots",
    "Unpleasant odor",
    "Unusual hardness or texture",
    "Strange taste"
  ]
}) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden mb-6">
      <h3 className="text-lg font-medium p-4 flex items-center gap-2">
        <span className="text-amber-500">
          <AlertTriangle className="h-5 w-5" />
        </span>
        Spoilage Indicators
      </h3>
      
      <div className="p-4">
        <ul className="space-y-2">
          {indicators.map((indicator, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-500 text-lg leading-tight">•</span>
              <span className="text-sm">{indicator}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpoilageIndicators;
