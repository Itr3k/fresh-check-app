
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { addDays, format } from 'date-fns';
import { Calendar, Refrigerator, Snowflake, Home, Printer, Info, Shield, ExternalLink } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import { getFoodById, foodData, FoodItem } from '@/data/foodData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FoodHeader from '@/components/food/FoodHeader';
import PurchaseDateSelector from '@/components/food/PurchaseDateSelector';
import StorageOptions, { StorageOption } from '@/components/food/StorageOptions';
import StorageRecommendation from '@/components/food/StorageRecommendation';
import SpoilageInfo from '@/components/food/SpoilageInfo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import PdfExportButton from '@/components/PdfExportButton';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import StatusIndicator from '@/components/StatusIndicator';

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(new Date());
  const [selectedStorage, setSelectedStorage] = useState<string>("refrigerator");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);
  const [showSafetyTips, setShowSafetyTips] = useState<boolean>(false);
  
  const foodItem = getFoodById(id || '');
  const foodName = id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Food Item';
  
  const foodInfo = foodItem || {
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

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Food Storage', href: '/#food-categories' },
    { label: foodInfo.category, href: `/categories/${foodInfo.category.toLowerCase()}` },
    { label: foodInfo.name, current: true }
  ];

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

  const getSelectedStorageOption = () => {
    return storageOptions.find(option => option.name === selectedStorage) || storageOptions[0];
  };

  const calculateDaysRemaining = () => {
    if (!purchaseDate) return 0;
    
    const storageOption = getSelectedStorageOption();
    let shelfLife = storageOption.shelfLife;
    
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

  const getSpoilageText = () => {
    if (foodInfo.spoilage) {
      return foodInfo.spoilage;
    }
    
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

  const relatedFoods = useMemo(() => {
    return foodData
      .filter(food => food.category === foodInfo.category && food.id !== foodInfo.id)
      .slice(0, 3);
  }, [foodInfo.id, foodInfo.category]);

  const handleSaveToMyFoods = () => {
    // In a real app, this would save to localStorage or a database
    toast({
      title: "Food Saved",
      description: `${foodInfo.name} has been added to your saved foods.`,
      duration: 3000,
    });
  };

  const handlePrintGuide = () => {
    window.print();
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
        
        <div className="mb-6 text-center">
          <AdUnit 
            slotId="food-detail-top"
            format="leaderboard"
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
        
        {/* Food info and storage selection */}
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

        {/* Action buttons */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold">Actions</h2>
            </div>
            
            <div id="printable-content" className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2" 
                onClick={handleSaveToMyFoods}
              >
                <Calendar size={18} />
                Save to My Foods
              </Button>
              
              <PdfExportButton 
                contentId="printable-content" 
                fileName={`${foodInfo.name}-storage-guide.pdf`}
                className="w-full"
              />
              
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setShowDetailedInfo(true)}
              >
                <Info size={18} />
                Detailed Storage Info
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setShowSafetyTips(true)}
              >
                <Shield size={18} />
                Food Safety Tips
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Related foods */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Related Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedFoods.length > 0 ? (
                relatedFoods.map((food) => (
                  <Link key={food.id} to={`/food/${food.id}`} className="flex items-center p-2 border rounded-md hover:bg-muted/30">
                    <img src={food.imageUrl} alt={food.name} className="w-16 h-16 object-cover rounded-md mr-3" />
                    <div>
                      <h3 className="font-medium">{food.name}</h3>
                      <p className="text-sm text-muted-foreground">{food.category}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground col-span-2 text-center py-4">No related foods found</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* External resources */}
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
        
        <div className="my-8 text-center">
          <AdUnit 
            slotId="food-detail-bottom"
            format="leaderboard"
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

      {/* Detailed Storage Info Sheet */}
      <Sheet open={showDetailedInfo} onOpenChange={setShowDetailedInfo}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>{foodInfo.name} Storage Details</SheetTitle>
            <SheetDescription>
              Comprehensive storage information for optimal freshness
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Refrigerator Storage</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {foodInfo.storageInfo?.refrigerator?.tips || "Store in the main compartment of your refrigerator at 40°F (4°C) or below."}
              </p>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <StatusIndicator status="fresh" daysText={foodInfo.storageInfo?.refrigerator?.days + " days"} size="small" />
                <div>
                  <p className="font-medium">Unopened: {foodInfo.storageInfo?.refrigerator?.days || "5-7"} days</p>
                  <p className="text-sm text-muted-foreground">After opening: Approximately {Math.floor(parseInt(foodInfo.storageInfo?.refrigerator?.days?.split('-')?.[0] || "5") / 2)}-{Math.floor(parseInt(foodInfo.storageInfo?.refrigerator?.days?.split('-')?.[1] || "7") / 2)} days</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Freezer Storage</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {foodInfo.storageInfo?.freezer?.tips || "Freeze at 0°F (-18°C) or below for long-term storage."}
              </p>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                <StatusIndicator status="fresh" daysText={foodInfo.storageInfo?.freezer?.days + " days"} size="small" />
                <div>
                  <p className="font-medium">Best quality: {foodInfo.storageInfo?.freezer?.days || "30-90"} days</p>
                  <p className="text-sm text-muted-foreground">Still safe beyond this time, but quality may decline</p>
                </div>
              </div>
            </div>
            
            {foodInfo.storageInfo?.pantry && (
              <div>
                <h3 className="text-lg font-medium mb-2">Pantry Storage</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {foodInfo.storageInfo?.pantry?.tips || "Store in a cool, dry place away from direct sunlight."}
                </p>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
                  <StatusIndicator status="fresh" daysText={foodInfo.storageInfo?.pantry?.days + " days"} size="small" />
                  <div>
                    <p className="font-medium">Unopened: {foodInfo.storageInfo?.pantry?.days || "2-3"} days</p>
                    <p className="text-sm text-muted-foreground">Store at room temperature (below 85°F/29°C)</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium mb-2">Storage Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Always check for signs of spoilage before consuming</li>
                <li>Keep in original packaging or airtight containers</li>
                <li>Store raw meat on the bottom shelf of your refrigerator</li>
                <li>For freezer storage, wrap tightly to prevent freezer burn</li>
                <li>Label items with the date of purchase or freezing</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <PdfExportButton
              contentId="printable-content"
              fileName={`${foodInfo.name}-storage-guide.pdf`}
            />
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Food Safety Tips Sheet */}
      <Sheet open={showSafetyTips} onOpenChange={setShowSafetyTips}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Food Safety Tips</SheetTitle>
            <SheetDescription>
              Important safety guidelines for {foodInfo.name}
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Safe Handling</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Wash hands with soap and water for 20 seconds before and after handling food</li>
                <li>Use separate cutting boards for raw meat, poultry, seafood, and produce</li>
                <li>Never place cooked food on a plate that previously held raw food</li>
                <li>Use a food thermometer to ensure safe cooking temperatures</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Temperature Control</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Keep cold foods cold (below 40°F/4°C) and hot foods hot (above 140°F/60°C)
              </p>
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="font-medium mb-2">Temperature Danger Zone: 40°F to 140°F (4°C to 60°C)</p>
                <p className="text-sm text-muted-foreground">Bacteria multiply rapidly in this range. Don't leave food out for more than 2 hours (1 hour if above 90°F/32°C)</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Proper Thawing</h3>
              <p className="text-sm text-muted-foreground mb-1">Safe methods to thaw frozen food:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>In the refrigerator (slowest but safest method)</li>
                <li>In cold water, changing water every 30 minutes</li>
                <li>In the microwave using the defrost setting</li>
                <li>Never thaw food at room temperature</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Signs of Spoilage</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {getSpoilageText()}
              </p>
              <p className="text-sm font-medium text-red-500">When in doubt, throw it out!</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/food-safety/temperature-danger-zone">
              <Button variant="outline" className="w-full justify-start gap-2 mb-2">
                <Info size={18} />
                Learn About Temperature Danger Zone
              </Button>
            </Link>
            <Link to="/food-safety/cross-contamination">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield size={18} />
                Prevent Cross-Contamination
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FoodDetail;
