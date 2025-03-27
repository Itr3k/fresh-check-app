
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FreshnessCalculatorProps {
  foodName: string;
}

const FreshnessCalculator: React.FC<FreshnessCalculatorProps> = ({ foodName }) => {
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [isOpened, setIsOpened] = useState<string>("unopened");
  const [storageMethod, setStorageMethod] = useState<string>("pantry");
  
  // Calculate freshness status
  const getFreshnessStatus = () => {
    const daysUntilExpiry = 7; // Default for bread in pantry
    
    const expiryDate = new Date(purchaseDate);
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);
    
    // If opened, reduce shelf life by half
    if (isOpened === "opened") {
      expiryDate.setDate(purchaseDate.getDate() + Math.floor(daysUntilExpiry / 2));
    }
    
    // Adjust based on storage method
    if (storageMethod === "refrigerator") {
      expiryDate.setDate(expiryDate.getDate() + 5); // Extra days for refrigeration
    } else if (storageMethod === "freezer") {
      expiryDate.setDate(expiryDate.getDate() + 80); // Much longer for freezer
    }
    
    return {
      expiryDate,
      status: new Date() < expiryDate ? "fresh" : "expired"
    };
  };
  
  const { expiryDate, status } = getFreshnessStatus();

  return (
    <div className="border rounded-md p-4 bg-white">
      <h3 className="text-base font-medium flex items-center gap-2 mb-4">
        <span className="bg-[#f3f4f6] text-[#4b5563] w-6 h-6 flex items-center justify-center rounded-full text-sm">2</span>
        Freshness Calculator
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Calculate how long your {foodName} is good for based on purchase date, whether it's open, and storage method
      </p>
      
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Purchase Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start gap-2 text-left">
                <Calendar className="h-4 w-4" />
                {format(purchaseDate, 'MMM dd, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={purchaseDate}
                onSelect={(date) => date && setPurchaseDate(date)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block">Status</Label>
          <RadioGroup 
            defaultValue={isOpened} 
            className="flex gap-4" 
            onValueChange={setIsOpened}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unopened" id="unopened" />
              <Label htmlFor="unopened" className="text-sm">Unopened</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="opened" id="opened" />
              <Label htmlFor="opened" className="text-sm">Opened</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block">Storage Method</Label>
          <Select defaultValue={storageMethod} onValueChange={setStorageMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select storage method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pantry">Pantry</SelectItem>
              <SelectItem value="refrigerator">Refrigerator</SelectItem>
              <SelectItem value="freezer">Freezer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Calculate Freshness
        </Button>
        
        <div className="bg-[#f9fafb] p-4 rounded-md mt-4 border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Results</span>
            <span className={`text-sm font-medium ${status === 'fresh' ? 'text-green-600' : 'text-red-600'}`}>
              {status === 'fresh' ? 'Still Fresh' : 'Past Prime'}
            </span>
          </div>
          <p className="text-sm mt-2">
            Your {foodName} should stay fresh until: <strong>{format(expiryDate, 'MMMM d, yyyy')}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreshnessCalculator;
