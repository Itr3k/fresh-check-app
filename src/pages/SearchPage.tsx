
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import FoodCard from '@/components/FoodCard';
import { foodData, searchFoods } from '@/data/foodData';
import PageTransition from '@/components/PageTransition';
import { FoodItem } from '@/types';
import AdUnit from '@/components/AdUnit';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [searchInput, setSearchInput] = useState(query);
  
  useEffect(() => {
    setSearchInput(query);
    
    if (query) {
      const filtered = searchFoods(query);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchInput });
  };
  
  // Get unique categories from search results
  const categories = [...new Set(searchResults.map(food => food.category))].filter(Boolean) as string[];
  
  return (
    <PageTransition>
      <Helmet>
        <title>Search Foods | FreshCheck - Food Shelf Life Guide</title>
        <meta name="description" content="Search for food items to learn about their shelf life, storage tips, and signs of spoilage." />
        <meta name="keywords" content="food search, shelf life search, food storage search" />
        <link rel="canonical" href="https://freshcheck.app/search" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Foods</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for food items..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </div>
        </form>
        
        {/* First ad placement - top of content */}
        <div className="my-6">
          <AdUnit slotId="search-top" format="leaderboard" />
        </div>
        
        {query && searchResults.length === 0 && (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>
              We couldn't find any results for "{query}". Try a different search term or browse our categories below.
            </AlertDescription>
          </Alert>
        )}
        
        {query && searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map(food => (
                <FoodCard 
                  key={food.id} 
                  id={food.id} 
                  name={food.name} 
                  imageUrl={food.image || ''} 
                  category={food.category || ''} 
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Second ad placement - middle of content */}
        <div className="my-6">
          <AdUnit slotId="search-middle" format="rectangle" />
        </div>
        
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Link key={category} to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge className="px-3 py-1" variant="secondary">{category}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/food/chicken" className="group block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium">Chicken</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
            <Link to="/food/eggs" className="group block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium">Eggs</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
            <Link to="/food/milk" className="group block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium">Milk</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Third ad placement - bottom of content */}
        <div className="my-6">
          <AdUnit slotId="search-bottom" format="leaderboard" lazyLoad={true} />
        </div>
      </div>
    </PageTransition>
  );
};

export default SearchPage;
