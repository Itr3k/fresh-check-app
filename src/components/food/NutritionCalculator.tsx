
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface NutritionCalculatorProps {
  foodName: string;
}

const NutritionCalculator: React.FC<NutritionCalculatorProps> = ({ foodName }) => {
  const [servingSize, setServingSize] = useState(30); // Default serving size in grams
  
  // Sample nutrition data per 100g
  const nutritionPer100g = {
    calories: 265,
    totalFat: 3.2,
    carbs: 49.9,
    fiber: 3.2,
    sugars: 5.0,
    protein: 9.0,
    sodium: 605, // mg
  };
  
  // Calculate nutrition based on serving size
  const calculateNutrition = (value: number, servingSize: number) => {
    return Math.round((value * servingSize / 100) * 10) / 10;
  };

  return (
    <div className="border rounded-md p-4 bg-white">
      <h3 className="text-base font-medium flex items-center gap-2 mb-4">
        <span className="bg-[#f3f4f6] text-[#4b5563] w-6 h-6 flex items-center justify-center rounded-full text-sm">1</span>
        Nutrition Calculator
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Get nutritional information based on amount eaten, or what'll be in your serving
      </p>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Serving Size</span>
        <span className="text-sm text-gray-600">Per Serving</span>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm">Set Your Size (grams):</span>
        <div className="flex-1">
          <Slider
            value={[servingSize]}
            min={0}
            max={200}
            step={1}
            onValueChange={(value) => setServingSize(value[0])}
            className="flex-1"
          />
        </div>
        <span className="bg-[#f1f5f9] px-2 py-1 rounded text-sm font-medium min-w-[35px] text-center">
          {servingSize}
        </span>
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        1 standard slice of {foodName} weighs ~30g (about 1oz)
      </div>
      
      <div className="bg-[#f9fafb] rounded-md p-3">
        <h4 className="text-sm font-medium mb-2">Nutrition Facts</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Calories</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.calories, servingSize)} <span className="text-xs text-gray-500">kcal</span></span>
          </div>
          
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Total Fat</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.totalFat, servingSize)}g <span className="text-xs text-gray-500">4% DV</span></span>
          </div>
          
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Total Carbohydrates</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.carbs, servingSize)}g <span className="text-xs text-gray-500">15% DV</span></span>
          </div>
          
          <div className="flex justify-between border-b pb-1 pl-4">
            <span className="text-sm">Dietary Fiber</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.fiber, servingSize)}g <span className="text-xs text-gray-500">11% DV</span></span>
          </div>
          
          <div className="flex justify-between border-b pb-1 pl-4">
            <span className="text-sm">Sugars</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.sugars, servingSize)}g <span className="text-xs text-gray-500">10% DV</span></span>
          </div>
          
          <div className="flex justify-between border-b pb-1">
            <span className="text-sm">Protein</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.protein, servingSize)}g <span className="text-xs text-gray-500">18% DV</span></span>
          </div>
          
          <div className="flex justify-between pb-1">
            <span className="text-sm">Sodium</span>
            <span className="text-sm">{calculateNutrition(nutritionPer100g.sodium, servingSize)}mg <span className="text-xs text-gray-500">26% DV</span></span>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          * Percent Daily Values (DV) are based on a 2,000 calorie diet. Individual needs may vary.
        </div>
      </div>
    </div>
  );
};

export default NutritionCalculator;
