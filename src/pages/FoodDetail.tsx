
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format, addDays } from 'date-fns';
import { Calendar, Refrigerator, Snowflake, Home, AlertCircle, Clock } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import { getFoodById } from '@/data/foodData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import StatusIndicator from '@/components/StatusIndicator';
import { cn } from '@/lib/utils';

interface StorageOption {
  name: string;
  icon: React.ReactNode;
  shelfLife: number;
  description: string;
}

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(new Date());
  const [selectedStorage, setSelectedStorage] = useState<string>("refrigerator");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  
  // Get food information from the database or use a formatted name from the ID
  const foodItem = getFoodById(id || '');
  const foodName = id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Food Item';
  
  // Default food info if not found in database
  const foodInfo = foodItem || {
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

  // Storage options with icons
  const storageOptions: StorageOption[] = [
    {
      name: "refrigerator",
      icon: <Refrigerator size={20} />,
      shelfLife: 7,
      description: foodInfo.storageInfo?.refrigerator?.tips || "Keep refrigerated at 40°F or below."
    },
    {
      name: "freezer",
      icon: <Snowflake size={20} />,
      shelfLife: 90,
      description: foodInfo.storageInfo?.freezer?.tips || "Freeze at 0°F or below for longer storage."
    },
    {
      name: "pantry",
      icon: <Home size={20} />,
      shelfLife: 3,
      description: foodInfo.storageInfo?.pantry?.tips || "Store in a cool, dry place."
    }
  ];

  // Get the selected storage option details
  const getSelectedStorageOption = () => {
    return storageOptions.find(option => option.name === selectedStorage) || storageOptions[0];
  };

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!purchaseDate) return 0;
    
    const storageOption = getSelectedStorageOption();
    let shelfLife = storageOption.shelfLife;
    
    // Reduce shelf life if the package is opened
    if (isOpened && selectedStorage !== "freezer") {
      shelfLife = Math.floor(shelfLife / 2);
    }
    
    const expiryDate = addDays(purchaseDate, shelfLife);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();
  const selectedOption = getSelectedStorageOption();

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{foodInfo.name} | Food Storage & Shelf Life</title>
        <meta name="description" content={`Learn about ${foodInfo.name} storage, shelf life, and food safety information.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{foodInfo.name}</h1>
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={foodInfo.imageUrl} 
                alt={foodInfo.name} 
                className="rounded-md w-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="md:w-2/3">
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {foodInfo.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {foodInfo.description}
              </p>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center mb-2">
                  <Calendar size={20} className="mr-2 text-primary" />
                  <h2 className="text-xl font-semibold">Typical Shelf Life</h2>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">
                    {foodInfo.storageInfo?.refrigerator?.days || "5-7"} days when refrigerated properly.
                  </p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        {purchaseDate ? format(purchaseDate, 'PPP') : "Set purchase date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={purchaseDate}
                        onSelect={setPurchaseDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <AlertCircle size={20} className="mr-2 text-primary" />
              <h2 className="text-xl font-semibold">Signs of Spoilage</h2>
            </div>
            <p className="text-gray-600 mb-6">
              {foodInfo.spoilage}
            </p>

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
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t pt-4">
              <div>
                <h3 className="text-lg font-medium">Shelf Life</h3>
                <p className="text-gray-600">
                  {isOpened && selectedStorage !== "freezer" 
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
          </CardContent>
        </Card>

        {/* Ad placement with required publisher content */}
        <div className="my-8">
          <h3 className="text-xl font-medium mb-4">Recommended Storage Guidelines</h3>
          <AdUnit 
            slotId="food-detail-leaderboard"
            format="leaderboard"
            mobileFormat="rectangle"
            contentBefore={
              <p className="text-sm text-muted-foreground mb-2">
                Proper storage is essential for food safety and reducing waste.
              </p>
            }
            contentAfter={
              <p className="text-xs text-muted-foreground mt-2">
                These guidelines are general recommendations. Always use your best judgment.
              </p>
            }
          />
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold">Actions</h2>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2 mb-2">
              <Calendar />
              Save to My Foods
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodDetail;
