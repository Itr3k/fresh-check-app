
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { CalendarIcon, Barcode, Info } from 'lucide-react';
import { Button } from './ui/button';
import { FoodInfo } from '@/utils/imageProcessingService';

interface FoodInfoResultProps {
  foodInfo: FoodInfo;
  onSearch?: (query: string) => void;
  onReset: () => void;
}

const FoodInfoResult: React.FC<FoodInfoResultProps> = ({ 
  foodInfo, 
  onSearch, 
  onReset 
}) => {
  const hasExpiryDate = !!foodInfo.expiryDate;
  const hasBarcode = !!foodInfo.barcode;
  const hasNutrition = !!foodInfo.nutritionInfo;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="overflow-hidden">
        {foodInfo.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <img 
              src={foodInfo.imageUrl} 
              alt={foodInfo.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{foodInfo.name}</CardTitle>
            {hasExpiryDate && (
              <Badge variant="outline" className="flex items-center gap-1">
                <CalendarIcon size={14} />
                Expires: {foodInfo.expiryDate}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {hasBarcode && (
            <div className="flex items-center gap-2 text-sm">
              <Barcode size={16} className="text-muted-foreground" />
              <span>Barcode: {foodInfo.barcode}</span>
            </div>
          )}
          
          {hasNutrition && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Info size={16} className="text-muted-foreground" />
                  Nutrition Facts
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {foodInfo.nutritionInfo?.calories !== undefined && (
                    <div>Calories: {foodInfo.nutritionInfo.calories}</div>
                  )}
                  {foodInfo.nutritionInfo?.protein !== undefined && (
                    <div>Protein: {foodInfo.nutritionInfo.protein}g</div>
                  )}
                  {foodInfo.nutritionInfo?.carbs !== undefined && (
                    <div>Carbs: {foodInfo.nutritionInfo.carbs}g</div>
                  )}
                  {foodInfo.nutritionInfo?.fat !== undefined && (
                    <div>Fat: {foodInfo.nutritionInfo.fat}g</div>
                  )}
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-between gap-4 pt-2">
            <Button 
              variant="outline" 
              onClick={onReset}
              className="flex-1"
            >
              New Scan
            </Button>
            <Button 
              onClick={() => onSearch && onSearch(foodInfo.name)}
              className="flex-1"
            >
              Find Similar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FoodInfoResult;
