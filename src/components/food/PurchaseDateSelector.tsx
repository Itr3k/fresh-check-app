
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface PurchaseDateSelectorProps {
  purchaseDate: Date | undefined;
  setPurchaseDate: (date: Date | undefined) => void;
}

const PurchaseDateSelector: React.FC<PurchaseDateSelectorProps> = ({ 
  purchaseDate, 
  setPurchaseDate 
}) => {
  return (
    <div className="border-t pt-4 mt-4">
      <div className="flex items-center mb-2">
        <Calendar size={20} className="mr-2 text-primary" />
        <h2 className="text-xl font-semibold">Typical Shelf Life</h2>
      </div>
      <p className="text-gray-600 mb-3">
        Select when you purchased this item to calculate remaining shelf life. The purchase date helps determine how long your food will stay fresh based on the storage method.
      </p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Varies based on storage method
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              {purchaseDate ? format(purchaseDate, 'PPP') : "Set purchase date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={purchaseDate}
              onSelect={setPurchaseDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PurchaseDateSelector;
