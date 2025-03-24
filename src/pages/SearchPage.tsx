
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";
import { searchFoods, FoodItem } from "../data/foodData";
import BreadcrumbNav from "../components/BreadcrumbNav";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(!!initialQuery);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Search", current: query ? false : true },
  ];

  if (query) {
    breadcrumbItems.push({ label: query, current: true });
  }

  // Initialize search results if there's a query parameter
  useEffect(() => {
    if (initialQuery) {
      const results = searchFoods(initialQuery);
      setSearchResults(results);
      setHasSearched(true);
    }
  }, [initialQuery]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setHasSearched(true);
    setSearchParams(searchQuery ? { q: searchQuery } : {});

    // Search foods based on query
    const results = searchFoods(searchQuery);
    setSearchResults(results);
  };

  // Generate structured data for the search results
  const generateSearchResultsSchema = () => {
    if (!hasSearched || searchResults.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": searchResults.map((food, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "FoodEntity",
          "name": food.name,
          "url": `https://freshcheck.app/food/${food.id}`
        }
      }))
    };
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{query ? `"${query}" - Search Foods` : "Search Foods"} - Fresh Check</title>
        <meta name="description" content="Search for any food to check if it's still fresh and good to eat. Get expiration dates, storage tips, and freshness indicators." />
        <meta property="og:title" content={`${query ? `${query} - ` : ""}Search Foods - Fresh Check`} />
        <meta property="og:description" content="Search for any food to check if it's still fresh and good to eat." />
        <link rel="canonical" href={`https://freshcheck.app/search${query ? `?q=${encodeURIComponent(query)}` : ""}`} />
      </Helmet>

      {hasSearched && searchResults.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(generateSearchResultsSchema())}
        </script>
      )}

      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
        </div>

        <div className="mb-4">
          <BreadcrumbNav items={breadcrumbItems} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">Search Foods</h1>
          <SearchBar 
            onSearch={handleSearch} 
            initialValue={query}
            placeholder="Search for any food (e.g., apple, duck, cheese)"
            realTimeSearch={true}
          />
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
              <p className="mt-2 text-sm">Try searching for: apple, duck, milk, cheese, etc.</p>
            </div>
          )}
        </div>

        <AdUnit slotId="search-bottom" className="mt-8" format="rectangle" />
      </div>
    </PageTransition>
  );
};

export default SearchPage;
