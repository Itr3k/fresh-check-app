
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getFoodById } from '@/data/foodData';
import AdBanner from '@/components/ads/AdBanner';
import FoodDetailHeader from '@/components/food/FoodDetailHeader';
import NutritionCalculator from '@/components/food/NutritionCalculator';
import FreshnessCalculator from '@/components/food/FreshnessCalculator';
import StorageGuidelines from '@/components/food/StorageGuidelines';
import SpoilageIndicators from '@/components/food/SpoilageIndicators';
import SafetyTips from '@/components/food/SafetyTips';
import PreparationTips from '@/components/food/PreparationTips';
import RelatedFoodsSection from '@/components/food/RelatedFoodsSection';

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const foodName = id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Food Item';
  
  const foodInfo = getFoodById(id || '') || {
    id: id || 'unknown',
    name: foodName,
    category: 'General',
    imageUrl: '/placeholder.svg',
    description: 'Learn about proper storage and shelf life for this food item to reduce waste and ensure food safety.',
    storageInfo: {
      refrigerator: { days: '5-7', tips: 'Store in the main compartment of your refrigerator.' },
      freezer: { days: '30-90', tips: 'Freeze immediately for best quality.' },
      pantry: { days: '2-3', tips: 'Store in a cool, dry place.' }
    },
    spoilage: 'Look for mold, discoloration, sour smell, or slimy texture.'
  };

  // Spoilage indicators specific to this food
  const spoilageIndicators = [
    "Visible mold or spots",
    "Unpleasant odor",
    "Unusual hardness or texture",
    "Strange taste"
  ];
  
  // Food safety tips for this specific food
  const safetyTips = [
    "Store bread away from direct sunlight to keep the texture perfect",
    "Keep bread properly sealed to avoid air and moisture",
    "Use clean tools when slicing bread to prevent contamination",
    "Check bread regularly for any signs of spoilage to avoid waste"
  ];
  
  // Preparation tips for this food
  const preparationTips = [
    "Toast bread slices from frozen for quick preparation",
    "Revive stale bread by sprinkling with water and heating in the oven at 350°F for 10 minutes",
    "For softer crust, store bread in a plastic bag; for crispy crust, use a paper bag",
    "Stale bread makes a perfect base for French toast, bread pudding, or croutons"
  ];
  
  // Related foods
  const relatedFoods = [
    { id: "white-bread", name: "White Bread", category: "Bakery", duration: "5-7 days" },
    { id: "rice", name: "Rice", category: "Grains", duration: "3-5 days cooked" },
    { id: "tortillas", name: "Tortillas", category: "Flatbreads", duration: "7 days" },
    { id: "bagels", name: "Bagels", category: "Bakery", duration: "2-3 days" }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>{foodInfo.name} | Food Storage & Shelf Life</title>
        <meta name="description" content={`Learn about ${foodInfo.name} storage, shelf life, and food safety information.`} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <FoodDetailHeader foodInfo={foodInfo} />
        
        <AdBanner id="food-detail-top" label="Fresh food requires proper storage" />
        
        <h2 className="text-2xl font-bold mb-6">Food Calculators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <NutritionCalculator foodName={foodInfo.name} />
          <FreshnessCalculator foodName={foodInfo.name} />
        </div>
        
        <StorageGuidelines foodName={foodInfo.name} />
        
        <h2 className="text-2xl font-bold mt-10 mb-6">How to Tell If {foodInfo.name} Has Gone Bad</h2>
        
        <SpoilageIndicators 
          foodName={foodInfo.name}
          indicators={spoilageIndicators}
        />
        
        <SafetyTips 
          foodName={foodInfo.name}
          tips={safetyTips}
        />
        
        <h2 className="text-2xl font-bold mt-10 mb-6">Preparation Tips</h2>
        
        <PreparationTips 
          foodName={foodInfo.name}
          tips={preparationTips}
        />
        
        <AdBanner id="food-detail-middle" />
        
        <RelatedFoodsSection 
          foodName={foodInfo.name}
          relatedFoods={relatedFoods}
        />
        
        <AdBanner id="food-detail-bottom" className="mt-10" />
      </div>
    </div>
  );
};

export default FoodDetail;
