
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FoodCard from '@/components/FoodCard';
import { foodData } from '@/data/foodData';
import { FoodItem } from '@/types';
import PageTransition from '@/components/PageTransition';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import AdUnit from '@/components/AdUnit';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryFoods, setCategoryFoods] = useState<FoodItem[]>([]);
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (categoryId) {
      // Convert categoryId to a readable category name
      const formattedName = categoryId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setCategoryName(formattedName);
      
      // Filter foods by the category
      const filtered = foodData.filter(food => 
        food.category && food.category.toLowerCase() === formattedName.toLowerCase()
      );
      setCategoryFoods(filtered);
    }
  }, [categoryId]);
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/' },
    { label: categoryName, current: true }
  ];
  
  return (
    <PageTransition>
      <Helmet>
        <title>{categoryName} | FreshCheck - Food Shelf Life Guide</title>
        <meta name="description" content={`Learn about the shelf life, storage tips, and signs of spoilage for ${categoryName}.`} />
        <meta name="keywords" content={`${categoryName}, shelf life, food storage, spoilage, freshness, food safety`} />
        <link rel="canonical" href={`https://freshcheck.app/categories/${categoryId}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="inline-block">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <BreadcrumbNav items={breadcrumbItems} className="mb-4" />
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground mb-6">
          Learn about shelf life, storage, and spoilage for {categoryName} items.
        </p>
        
        {/* First ad placement - top of content */}
        <div className="my-6">
          <AdUnit slotId={`category-${categoryId}-top`} format="leaderboard" />
        </div>
        
        {categoryFoods.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {categoryFoods.map((food) => (
                <FoodCard key={food.id} id={food.id} name={food.name} imageUrl={food.image || ''} category={food.category || ''} />
              ))}
            </div>
            
            {/* Second ad placement - middle of content */}
            <div className="my-6">
              <AdUnit slotId={`category-${categoryId}-middle`} format="rectangle" />
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Food Safety Tips for {categoryName}</h2>
              <div className="prose prose-sm sm:prose text-foreground">
                <p>
                  Always make sure to handle, store, and cook {categoryName.toLowerCase()} properly to 
                  maintain quality and prevent foodborne illness. Check the details of each food item 
                  for specific storage guidelines and shelf life information.
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>No foods found in this category. Try browsing our other categories.</p>
        )}
        
        {/* Third ad placement - bottom of content */}
        <div className="my-6">
          <AdUnit slotId={`category-${categoryId}-bottom`} format="leaderboard" lazyLoad={true} />
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-medium mb-4">Food Safety Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link 
              to="/food-safety/temperature-danger-zone" 
              className="p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm font-medium">Temperature Danger Zone</span>
            </Link>
            <Link 
              to="/food-safety/foodborne-illness-prevention" 
              className="p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm font-medium">Foodborne Illness Prevention</span>
            </Link>
            <Link 
              to="/food-safety/cross-contamination" 
              className="p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm font-medium">Prevent Cross-Contamination</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CategoryPage;
