
import React from 'react';
import { Refrigerator, Snowflake, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export interface StorageOption {
  name: string;
  icon: React.ReactNode;
  shelfLife: number;
  description: string;
}

interface StorageOptionsProps {
  selectedStorage: string;
  setSelectedStorage: (storage: string) => void;
  isOpened: boolean;
  setIsOpened: (opened: boolean) => void;
  storageOptions: StorageOption[];
}

const StorageOptions: React.FC<StorageOptionsProps> = ({
  selectedStorage,
  setSelectedStorage,
  isOpened,
  setIsOpened,
  storageOptions
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Storage Options</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Select storage method to see detailed recommendations
      </p>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {storageOptions.map((option) => (
          <Button
            key={option.name}
            variant={selectedStorage === option.name ? "default" : "outline"}
            className="gap-2"
            onClick={() => setSelectedStorage(option.name)}
          >
            {option.icon}
            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <Label htmlFor="opened-toggle" className="cursor-pointer">Opened/Cut</Label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            type="checkbox"
            id="opened-toggle"
            checked={isOpened}
            onChange={() => setIsOpened(!isOpened)}
            className="sr-only"
          />
          <div className={`block h-6 rounded-full w-10 ${isOpened ? 'bg-primary' : 'bg-gray-300'}`}>
            <div className={`absolute left-0.5 top-0.5 bg-white rounded-full h-5 w-5 transition-transform ${isOpened ? 'transform translate-x-4' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageOptions;
