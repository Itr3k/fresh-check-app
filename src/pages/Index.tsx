
import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PopularFoods from "../components/PopularFoods";
import SavedFoods from "../components/SavedFoods";
import CategoryCards from "../components/CategoryCards";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";
import FoodSafetyFacts from "../components/FoodSafetyFacts";
import FoodSafetyEducation from "../components/FoodSafetyEducation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>FreshCheck - Food Storage Guide & Expiration Calculator</title>
        <meta
          name="description"
          content="Learn how long food lasts in the refrigerator, freezer, and pantry. Get accurate storage times, spoilage indicators, and a free expiration calculator."
        />
        <meta
          property="og:title"
          content="FreshCheck - Food Storage Guide & Expiration Calculator"
        />
        <meta
          property="og:description"
          content="Learn how long food lasts in the refrigerator, freezer, and pantry. Get accurate storage times, spoilage indicators, and a free expiration calculator."
        />
        <link rel="canonical" href="https://freshcheck.app/" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="container mx-auto px-4 py-8 pt-24 flex-grow">
          <h1 className="text-3xl font-bold mb-2 text-center">
            How Long Does Food Last?
          </h1>
          <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
            Get accurate storage times, spoilage indicators, and a free
            expiration calculator for any food.
          </p>

          <div className="max-w-xl mx-auto mb-8" ref={searchRef}>
            <SearchBar id="search-bar" onSearch={handleSearch} />
          </div>

          <div className="flex justify-center mb-6">
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:underline"
            >
              How We Research Food Storage Guidelines →
            </Link>
          </div>

          {/* Popular Foods section */}
          <PopularFoods />

          {/* AdUnit - safely implemented */}
          <div className="my-8">
            <AdUnit slotId="home-top" format="leaderboard" />
          </div>

          {/* CategoryCards below AdUnit */}
          <CategoryCards />
          
          {/* Food Safety Education section */}
          <FoodSafetyEducation />

          {/* Food Safety Facts section */}
          <FoodSafetyFacts />
          
          {/* SavedFoods after Food Safety Facts */}
          <SavedFoods />

          {/* AdUnit - safely implemented */}
          <div className="mt-8">
            <AdUnit slotId="home-bottom" format="leaderboard" lazyLoad={true} />
          </div>

          <div 
            className="mt-8 p-4 bg-secondary/30 rounded-lg cursor-pointer"
            onClick={scrollToSearch}
          >
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Search size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-1">Can't find what you're looking for?</h2>
                <p className="text-sm text-muted-foreground">
                  Try searching for a specific food or browse our categories. We have storage
                  information for hundreds of food items.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
