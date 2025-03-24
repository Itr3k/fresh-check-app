
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import FoodInfoResult from '@/components/FoodInfoResult';
import { foodData } from '@/data/foodData';
import { FoodItem } from '@/types';
import PageTransition from '@/components/PageTransition';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import AdUnit from '@/components/AdUnit';

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [food, setFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foodItem = foodData.find(f => f.id === id);
      if (foodItem) {
        setFood(foodItem);
      } else {
        navigate('/not-found');
      }
    }
  }, [id, navigate]);

  if (!food) {
    return <div>Loading...</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Foods', href: '/' },
    { label: food.name, current: true }
  ];

  // Convert food object to match FoodInfo interface expected by FoodInfoResult
  const foodInfo = {
    name: food.name,
    imageUrl: food.image,
    storageInstructions: food.tips,
    // Add any other fields needed by FoodInfoResult
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{food.name} | FreshCheck - Food Shelf Life Guide</title>
        <meta name="description" content={`Learn about the shelf life, storage tips, and signs of spoilage for ${food.name}.`} />
        <meta name="keywords" content={`${food.name}, shelf life, food storage, spoilage, freshness, food safety`} />
        <link rel="canonical" href={`https://freshcheck.app/food/${id}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="inline-block">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Foods
            </Button>
          </Link>
        </div>
        
        <BreadcrumbNav items={breadcrumbItems} className="mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-6">
              {/* Food Details */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{food.name}</h1>
                    <p className="text-muted-foreground mt-1">{food.category}</p>
                  </div>
                  {food.image && (
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="h-24 w-24 object-cover rounded-md ml-4 hidden sm:block" 
                    />
                  )}
                </div>
                
                {/* First ad placement - top of content */}
                <div className="my-6">
                  <AdUnit slotId={`food-detail-${id}-top`} format="leaderboard" />
                </div>
                
                {food.description && (
                  <div className="mt-4 text-foreground prose prose-sm sm:prose">
                    <p>{food.description}</p>
                  </div>
                )}
              </div>
              
              {/* Shelf Life Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Shelf Life</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {food.storage && food.storage.map((item, index) => (
                    <div key={index} className="bg-secondary/20 p-4 rounded-lg">
                      <div className="font-medium mb-1">{item.method}</div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Storage Tips */}
              {food.tips && food.tips.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Storage Tips</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {food.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Second ad placement - middle of content */}
              <div className="my-6">
                <AdUnit slotId={`food-detail-${id}-middle`} format="rectangle" />
              </div>
              
              {/* Signs of Spoilage */}
              {food.spoilage && food.spoilage.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Signs of Spoilage</h2>
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      When in doubt, throw it out. Food safety is more important than avoiding waste.
                    </AlertDescription>
                  </Alert>
                  <ul className="list-disc pl-5 space-y-2">
                    {food.spoilage.map((sign, index) => (
                      <li key={index}>{sign}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Related Information */}
              {food.notes && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                  <div className="prose prose-sm sm:prose text-foreground">
                    <p>{food.notes}</p>
                  </div>
                </div>
              )}
              
              {/* Third ad placement - bottom of content */}
              <div className="my-6">
                <AdUnit slotId={`food-detail-${id}-bottom`} format="leaderboard" lazyLoad={true} />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="sticky top-4 space-y-6">
              <FoodInfoResult foodInfo={foodInfo} onReset={() => {}} />
              
              {/* Food Safety Resources */}
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3">Food Safety Resources</h3>
                <div className="space-y-2">
                  <Link to="/food-safety/temperature-danger-zone" className="block text-sm text-primary hover:underline">
                    Temperature Danger Zone
                  </Link>
                  <Link to="/food-safety/foodborne-illness-prevention" className="block text-sm text-primary hover:underline">
                    Prevent Foodborne Illness
                  </Link>
                  <Link to="/food-safety/cross-contamination" className="block text-sm text-primary hover:underline">
                    Prevent Cross-Contamination
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FoodDetail;
