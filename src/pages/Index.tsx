
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
import HeroSection from "../components/HeroSection";

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

  // FAQ schema for the homepage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does food last in the refrigerator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Food storage times vary by type. Most raw meats last 1-3 days, vegetables 3-7 days, and leftovers 3-4 days when properly stored below 40°F (4°C)."
        }
      },
      {
        "@type": "Question",
        "name": "How can I tell if food has gone bad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Look for visible mold, discoloration, sliminess, or off smells. When in doubt, remember the food safety rule: 'When in doubt, throw it out.'"
        }
      },
      {
        "@type": "Question",
        "name": "What is the temperature danger zone for food?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The temperature danger zone is between 40°F and 140°F (4°C to 60°C). Bacteria multiply rapidly in this range, so food should not be left at these temperatures for more than 2 hours."
        }
      },
      {
        "@type": "Question",
        "name": "How long can I freeze food?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most foods remain safe indefinitely in the freezer, but quality deteriorates over time. Meat and poultry can maintain quality for 3-12 months, while fruits and vegetables typically last 8-12 months when properly wrapped."
        }
      }
    ]
  };

  // Website schema for organization information
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://freshcheck.app/",
    "name": "FreshCheck",
    "description": "Learn how long food lasts in the refrigerator, freezer, and pantry. Get accurate storage times, spoilage indicators, and a free expiration calculator.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://freshcheck.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
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

      {/* Add structured data */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="container mx-auto px-4 py-8 pt-24 flex-grow">
          {/* New Hero Section */}
          <HeroSection onSearch={handleSearch} />

          {/* Popular Foods section */}
          <PopularFoods />

          {/* AdUnit - optimized size */}
          <div className="my-8">
            <AdUnit slotId="home-top" format="leaderboard" />
          </div>

          {/* CategoryCards below AdUnit */}
          <div id="browse-categories">
            <CategoryCards />
          </div>
          
          {/* Food Safety Education section */}
          <div id="food-safety-education">
            <FoodSafetyEducation />
          </div>

          {/* Food Safety Facts section */}
          <FoodSafetyFacts />
          
          {/* SavedFoods after Food Safety Facts */}
          <SavedFoods />

          {/* AdUnit - optimized size */}
          <div className="mt-8">
            <AdUnit slotId="home-bottom" format="leaderboard" lazyLoad={true} />
          </div>

          <div 
            className="mt-8 p-4 bg-secondary/30 rounded-lg cursor-pointer"
            onClick={scrollToSearch}
            ref={searchRef}
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
