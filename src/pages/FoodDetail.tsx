
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { addDays } from 'date-fns';
import { Calendar, Refrigerator, Snowflake, Home, Printer, Info, Shield, ExternalLink } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import { getFoodById } from '@/data/foodData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  
  // Default food info if not found in database - now includes id property to fix TypeScript error
  const foodInfo = foodItem || {
    id: id || 'unknown',  // Add the required id property
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

  // Generate specific spoilage text for the food item
  const getSpoilageText = () => {
    if (foodInfo.spoilage) {
      return foodInfo.spoilage;
    }
    
    // Generate more specific spoilage info based on food category if none provided
    const categorySpecificSpoilage = {
      'Meat & Poultry': 'Look for discoloration, slimy texture, or a sour, ammonia-like smell. If the meat feels sticky or has a grayish color, it has likely spoiled.',
      'Seafood': 'Fresh fish should not smell fishy. Look for cloudy eyes, discoloration, slimy texture, or a strong ammonia-like odor.',
      'Dairy': 'Check for mold growth, sour smell, curdling, or unusual texture changes.',
      'Fruit': 'Look for mold, unusual soft spots, fermented smell, or dramatic color changes.',
      'Vegetables': 'Watch for wilting, sliminess, mold, or strong off-odors.',
      'Bakery': 'Check for mold growth, hard texture, or unusual odor. Stale bread is not necessarily spoiled.',
      'Prepared Foods': "If it smells off, looks discolored, or has been in the refrigerator longer than 3-4 days, it's best to discard it.",
      'Pantry': 'Look for rancid odors, mold, or insect activity. Check for broken seals on packages.',
      'Frozen Foods': 'Severe freezer burn, unusual odors, or changes in texture may indicate quality loss.',
      'Condiments': 'Watch for separation, discoloration, unusual odors, or mold growth on the surface.'
    };
    
    return categorySpecificSpoilage[foodInfo.category as keyof typeof categorySpecificSpoilage] || 
      'Look for mold, discoloration, sour smell, or slimy texture. When in doubt, throw it out.';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{foodInfo.name} | Food Storage & Shelf Life</title>
        <meta name="description" content={`Learn about ${foodInfo.name} storage, shelf life, and food safety information.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <BreadcrumbNav items={breadcrumbItems} className="mb-4" />
        
        <h1 className="text-3xl font-bold mb-4">{foodInfo.name}</h1>
        
        {/* First ad space at the top */}
        <div className="mb-6 text-center">
          <AdUnit 
            slotId="food-detail-top"
            format="rectangle"
            mobileFormat="rectangle"
            contentBefore={
              <p className="text-sm text-muted-foreground mb-2 text-center">
                Proper food storage helps prevent foodborne illness
              </p>
            }
            contentAfter={
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Recommendations may vary by brand and processing method
              </p>
            }
          />
        </div>
        
        <Card className="p-6 mb-6">
          <FoodHeader foodInfo={foodInfo} />
          <PurchaseDateSelector purchaseDate={purchaseDate} setPurchaseDate={setPurchaseDate} />
        </Card>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <SpoilageInfo spoilageText={getSpoilageText()} />

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

        {/* Second ad placement in the middle */}
        <div className="my-8 text-center">
          <h3 className="text-xl font-medium mb-4 text-center">Recommended Storage Guidelines</h3>
          <AdUnit 
            slotId="food-detail-middle"
            format="leaderboard"
            mobileFormat="rectangle"
            contentBefore={
              <p className="text-sm text-muted-foreground mb-2 text-center">
                Proper storage is essential for food safety and reducing waste
              </p>
            }
            contentAfter={
              <p className="text-xs text-muted-foreground mt-2 text-center">
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
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar size={18} />
                Save to My Foods
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-2">
                <Printer size={18} />
                Print Storage Guide
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-2">
                <Info size={18} />
                Detailed Storage Info
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield size={18} />
                Food Safety Tips
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Related Foods Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Related Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/food/milk" className="flex items-center p-2 border rounded-md hover:bg-muted/30">
                <img src="/placeholder.svg" alt="Milk" className="w-16 h-16 object-cover rounded-md mr-3" />
                <div>
                  <h3 className="font-medium">Milk</h3>
                  <p className="text-sm text-muted-foreground">Dairy</p>
                </div>
              </Link>
              
              <Link to="/food/chicken" className="flex items-center p-2 border rounded-md hover:bg-muted/30">
                <img src="/placeholder.svg" alt="Chicken" className="w-16 h-16 object-cover rounded-md mr-3" />
                <div>
                  <h3 className="font-medium">Chicken</h3>
                  <p className="text-sm text-muted-foreground">Meat & Poultry</p>
                </div>
              </Link>
              
              <Link to="/food/bread" className="flex items-center p-2 border rounded-md hover:bg-muted/30">
                <img src="/placeholder.svg" alt="Bread" className="w-16 h-16 object-cover rounded-md mr-3" />
                <div>
                  <h3 className="font-medium">Bread</h3>
                  <p className="text-sm text-muted-foreground">Bakery</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* External Resources Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">External Resources</h2>
            <div className="space-y-2">
              <a href="https://www.foodkeeper.app/" target="_blank" rel="noopener noreferrer" 
                className="flex items-center text-primary hover:underline">
                <ExternalLink size={16} className="mr-2" />
                USDA FoodKeeper App
              </a>
              <a href="https://www.fda.gov/food/buy-store-serve-safe-food/storing-food-safely" target="_blank" rel="noopener noreferrer" 
                className="flex items-center text-primary hover:underline">
                <ExternalLink size={16} className="mr-2" />
                FDA Safe Food Storage Guidelines
              </a>
              <a href="https://www.stilltasty.com/" target="_blank" rel="noopener noreferrer" 
                className="flex items-center text-primary hover:underline">
                <ExternalLink size={16} className="mr-2" />
                StillTasty Food Storage Database
              </a>
            </div>
          </CardContent>
        </Card>
        
        {/* Third ad placement at the bottom */}
        <div className="my-8 text-center">
          <AdUnit 
            slotId="food-detail-bottom"
            format="rectangle"
            mobileFormat="rectangle"
            contentBefore={
              <p className="text-sm text-muted-foreground mb-2 text-center">
                Learn more about food preservation techniques
              </p>
            }
            contentAfter={
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Food safety starts with proper storage and handling
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
