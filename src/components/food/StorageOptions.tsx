
import React from 'react';
import { CheckCircle2, Snowflake, Timer } from 'lucide-react';

export interface StorageOption {
  id: string;
  name: string;
  shelfLife: number;
  description: string;
  icon: React.ReactNode;
}

interface StorageOptionsProps {
  selectedOption: string;
  onOptionChange: (option: string) => void;
  options?: StorageOption[];
}

const defaultOptions: StorageOption[] = [
  {
    id: 'refrigerator',
    name: 'refrigerator',
    shelfLife: 7,
    description: 'Keep refrigerated at 40°F (4°C) or below',
    icon: <Timer className="h-5 w-5" />
  },
  {
    id: 'freezer',
    name: 'freezer',
    shelfLife: 90,
    description: 'Store at 0°F (-18°C) to maintain quality',
    icon: <Snowflake className="h-5 w-5" />
  },
  {
    id: 'pantry',
    name: 'pantry',
    shelfLife: 14,
    description: 'Store in a cool, dry place away from sunlight',
    icon: <CheckCircle2 className="h-5 w-5" />
  }
];

const StorageOptions: React.FC<StorageOptionsProps> = ({
  selectedOption,
  onOptionChange,
  options = defaultOptions
}) => {
  console.log('StorageOptions rendering, selected:', selectedOption);
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onOptionChange(option.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            selectedOption === option.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          aria-pressed={selectedOption === option.id}
        >
          <span className={selectedOption === option.id ? 'text-primary-foreground' : 'text-primary'}>
            {option.icon}
          </span>
          <span className="capitalize">{option.name}</span>
        </button>
      ))}
    </div>
  );
};

export default StorageOptions;
