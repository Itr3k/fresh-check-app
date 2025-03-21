
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";

// Mock search results data
const mockSearchData = [
  {
    id: "chicken",
    name: "Chicken",
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop",
    category: "Meat"
  },
  {
    id: "milk",
    name: "Milk",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop",
    category: "Dairy"
  },
  {
    id: "eggs",
    name: "Eggs",
    imageUrl: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=500&h=300&fit=crop",
    category: "Dairy"
  },
  {
    id: "bread",
    name: "Bread",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop",
    category: "Bakery"
  }
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockSearchData>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setHasSearched(true);

    // Filter mock data based on search query
    // In a real app, this would be an API call
    const results = mockSearchData.filter(food => 
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Search Foods - Fresh Check</title>
        <meta name="description" content="Search for any food to check if it's still fresh and good to eat. Get expiration dates, storage tips, and freshness indicators." />
        <meta property="og:title" content="Search Foods - Fresh Check" />
        <meta property="og:description" content="Search for any food to check if it's still fresh and good to eat." />
        <link rel="canonical" href="https://freshcheck.app/search" />
      </Helmet>

      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">Search Foods</h1>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <AdUnit slotId="search-top" className="mb-8" format="leaderboard" />

        <div className="mb-8">
          {hasSearched && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-medium mb-4">
                {searchResults.length === 0 
                  ? `No results found for "${query}"` 
                  : `Search results for "${query}"`}
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {searchResults.map((food, index) => (
                    <FoodCard
                      key={food.id}
                      id={food.id}
                      name={food.name}
                      imageUrl={food.imageUrl}
                      category={food.category}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-secondary/50 rounded-lg p-6 text-center">
                  <p className="mb-3">Try searching for a different food item or check our popular foods.</p>
                  <Link to="/" className="text-primary hover:underline">
                    View popular foods
                  </Link>
                </div>
              )}
            </motion.div>
          )}
          
          {!hasSearched && (
            <div className="text-center text-muted-foreground">
              <p>Search for any food to check its shelf life and freshness.</p>
            </div>
          )}
        </div>

        <AdUnit slotId="search-bottom" className="mt-8" format="rectangle" />
      </div>
    </PageTransition>
  );
};

export default SearchPage;
