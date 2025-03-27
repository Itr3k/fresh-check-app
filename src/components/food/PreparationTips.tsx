
import React from 'react';
import { ChefHat } from 'lucide-react';

interface PreparationTipsProps {
  foodName: string;
  tips?: string[];
}

const PreparationTips: React.FC<PreparationTipsProps> = ({ 
  foodName,
  tips = [
    "Toast bread slices from frozen for quick preparation",
    "Revive stale bread by sprinkling with water and heating in the oven at 350°F for 10 minutes",
    "For softer crust, store bread in a plastic bag; for crispy crust, use a paper bag",
    "Stale bread makes a perfect base for French toast, bread pudding, or croutons"
  ] 
}) => {
  return (
    <div className="bg-white border rounded-md overflow-hidden mb-6">
      <h3 className="text-lg font-medium p-4 flex items-center gap-2">
        <ChefHat className="h-5 w-5 text-green-600" />
        Preparation Tips
      </h3>
      
      <div className="p-4">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-500 text-lg leading-tight">•</span>
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreparationTips;
