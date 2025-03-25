
import React from 'react';
import StatusIndicator from '@/components/StatusIndicator';
import { StorageOption } from './StorageOptions';

interface StorageRecommendationProps {
  selectedOption: StorageOption;
  isOpened: boolean;
  daysRemaining: number;
}

const StorageRecommendation: React.FC<StorageRecommendationProps> = ({
  selectedOption,
  isOpened,
  daysRemaining
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t pt-4">
      <div>
        <h3 className="text-lg font-medium">Shelf Life</h3>
        <p className="text-gray-600">
          {isOpened && selectedOption.name !== "freezer" 
            ? `${Math.floor(selectedOption.shelfLife / 2)} days when opened`
            : `${selectedOption.shelfLife} days`}
        </p>
        <p className="text-sm text-gray-500 mt-2">{selectedOption.description}</p>
      </div>
      <StatusIndicator 
        size="large"
        daysRemaining={daysRemaining}
        maxDays={selectedOption.shelfLife}
        daysText={daysRemaining === 1 ? "1 day" : `${daysRemaining} days`}
      />
    </div>
  );
};

export default StorageRecommendation;
