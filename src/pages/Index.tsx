
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PopularFoods from "../components/PopularFoods";
import PageTransition from "../components/PageTransition";

const Index = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    // In a real app, this would search through the database
    // For now, we'll just navigate to a fixed food item
    navigate(`/food/${query.toLowerCase()}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        
        <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-semibold mb-3"
            >
              Is your food still good?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Check if your food is fresh, needs to be used soon, or should be discarded.
            </motion.p>
          </motion.div>
          
          <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="mb-12">
            <PopularFoods />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold text-primary">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Search Your Food</h3>
                  <p className="text-sm text-muted-foreground">Type the name of any food or scan a barcode to find it in our database.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold text-primary">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Enter Purchase Date</h3>
                  <p className="text-sm text-muted-foreground">Tell us when you bought it and if it's been opened or not.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold text-primary">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Get Results</h3>
                  <p className="text-sm text-muted-foreground">Learn if your food is fresh, needs to be used soon, or should be discarded.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <footer className="bg-white py-8 border-t">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StillGood. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
