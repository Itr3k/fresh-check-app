
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface SafetyTipProps {
  foodName: string;
  tips?: string[];
}

const SafetyTips: React.FC<SafetyTipProps> = ({ 
  foodName,
  tips = [
    "Store bread away from direct sunlight to keep the texture perfect",
    "Keep bread properly sealed to avoid air and moisture",
    "Use clean tools when slicing bread to prevent contamination",
    "Check bread regularly for any signs of spoilage to avoid waste"
  ] 
}) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden mb-6">
      <h3 className="text-lg font-medium p-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-blue-600" />
        Food Safety Tips
      </h3>
      
      <div className="p-4">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 text-lg leading-tight">•</span>
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SafetyTips;
