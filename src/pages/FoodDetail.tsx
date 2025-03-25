
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { addDays } from 'date-fns';
import { Calendar, Refrigerator, Snowflake, Home } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import { getFoodById } from '@/data/foodData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FoodHeader from '@/components/food/FoodHeader';
import PurchaseDateSelector from '@/components/food/PurchaseDateSelector';
import StorageOptions, { StorageOption } from '@/components/food/StorageOptions';
import StorageRecommendation from '@/components/food/StorageRecommendation';
import SpoilageInfo from '@/components/food/SpoilageInfo';

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

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Food Storage', href: '/#food-categories' },
    { label: foodInfo.category, href: `/categories/${foodInfo.category.toLowerCase()}` },
    { label: foodInfo.name, current: true }
  ];

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
        <BreadcrumbNav items={breadcrumbItems} className="mb-4" />
        
        <h1 className="text-3xl font-bold mb-4">{foodInfo.name}</h1>
        
        <Card className="p-6 mb-6">
          <FoodHeader foodInfo={foodInfo} />
          <PurchaseDateSelector purchaseDate={purchaseDate} setPurchaseDate={setPurchaseDate} />
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <SpoilageInfo spoilageText={foodInfo.spoilage || ''} />

            <StorageOptions 
              selectedStorage={selectedStorage}
              setSelectedStorage={setSelectedStorage}
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              storageOptions={storageOptions}
            />
            
            <StorageRecommendation 
              selectedOption={selectedOption}
              isOpened={isOpened}
              daysRemaining={daysRemaining}
            />
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
