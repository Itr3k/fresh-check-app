
import React, { useRef, lazy, Suspense, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PopularFoods from "../components/PopularFoods";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Skeleton } from "@/components/ui/skeleton";
import FoodLabelsPreview from "../components/FoodLabelsPreview";
import SkipToContent from "../components/SkipToContent";

const SavedFoods = lazy(() => import("../components/SavedFoods"));
const CategoryCards = lazy(() => import("../components/CategoryCards"));
const FoodSafetyFacts = lazy(() => import("../components/FoodSafetyFacts"));
const FoodSafetyEducation = lazy(() => import("../components/FoodSafetyEducation"));
const AdUnit = lazy(() => import("../components/AdUnit"));

const SkeletonLoader = ({ height = "200px", className = "" }) => (
  <Skeleton className={`w-full rounded-lg ${className}`} style={{ height }} />
);

const Index = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const adsInitializedRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (!adsInitializedRef.current) {
      adsInitializedRef.current = true;

      const adsViewed = sessionStorage.getItem('homepage-ads-viewed');
      if (!adsViewed) {
        sessionStorage.setItem('homepage-ads-viewed', 'true');
      }
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const scrollToSearch = useCallback(() => {
    heroSearchRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [navigate]);

  // Schema.org structured data
  const foodItemSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Food",
          "name": "Chicken",
          "description": "Storage guidelines for raw and cooked chicken",
          "url": "https://freshcheck.app/food/chicken"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Food",
          "name": "Milk",
          "description": "Storage guidelines for dairy products",
          "url": "https://freshcheck.app/food/milk"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Food",
          "name": "Eggs",
          "description": "Storage guidelines for fresh eggs",
          "url": "https://freshcheck.app/food/eggs"
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://freshcheck.app/"
      }
    ]
  };

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
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(foodItemSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <SkipToContent />
        <Header />

        <main id="main-content" className="container mx-auto px-4 py-8 pt-24 flex-grow" aria-label="Main content">
          <div ref={heroSearchRef}>
            <HeroSection onSearch={handleSearch} />
          </div>

          <div className="mb-8">
            <PopularFoods />
          </div>

          {/* Mid-content ad unit */}
          <div className="my-6 print:hidden flex justify-center">
            <Suspense fallback={<SkeletonLoader height="90px" />}>
              <AdUnit 
                slotId="home-content-ad" 
                format="leaderboard"
                mobileFormat="rectangle" 
                lazyLoad={true}
                responsive={true}
                contentBefore={
                  <div className="text-xs text-center text-green-600 uppercase tracking-wider font-medium mb-1">
                    Advertisement
                  </div>
                }
              />
            </Suspense>
          </div>
          
          <div id="browse-categories" className="my-10">
            <h2 className="text-2xl font-bold mb-6 text-left">Explore Food Categories</h2>
            <Suspense fallback={<SkeletonLoader height="300px" />}>
              <CategoryCards />
            </Suspense>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div id="food-safety-education">
              <h2 className="text-2xl font-bold mb-6 text-left">Food Safety Education</h2>
              <Suspense fallback={<SkeletonLoader height="200px" />}>
                <FoodSafetyEducation />
              </Suspense>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-left">Food Safety Facts</h2>
              <Suspense fallback={<SkeletonLoader height="200px" />}>
                <FoodSafetyFacts />
              </Suspense>
            </div>
          </div>
          
          <div className="my-10">
            <FoodLabelsPreview />
          </div>
          
          <Suspense fallback={<SkeletonLoader height="200px" className="mt-8" />}>
            <SavedFoods />
          </Suspense>

          {/* Search prompt */}
          <div 
            className="mt-8 p-6 bg-white rounded-lg shadow-sm cursor-pointer border border-gray-100"
            onClick={scrollToSearch}
            ref={searchRef}
          >
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Search size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-medium mb-1">Can't find what you're looking for?</h2>
                <p className="text-sm text-muted-foreground">
                  Try searching for a specific food or browse our categories. We have storage
                  information for hundreds of food items.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom leaderboard ad with proper spacing */}
          <div className="mt-10 mb-4 print:hidden flex justify-center">
            <Suspense fallback={<SkeletonLoader height="90px" />}>
              <AdUnit 
                slotId="home-bottom-leaderboard" 
                format="leaderboard"
                mobileFormat="rectangle" 
                lazyLoad={true}
                responsive={true}
                contentBefore={
                  <div className="text-xs text-center text-green-600 uppercase tracking-wider font-medium mb-1">
                    Advertisement
                  </div>
                }
              />
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
