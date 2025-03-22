
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

// Array of food safety facts
const facts = [
  "Food left at room temperature for more than 2 hours can become unsafe to eat.",
  "The 'danger zone' for food is between 40°F and 140°F, where bacteria multiply rapidly.",
  "Refrigeration slows bacterial growth but doesn't stop it completely.",
  "Raw meat should always be stored on the bottom shelf of your refrigerator to prevent cross-contamination.",
  "Leftovers should generally be consumed within 3-4 days when stored properly in the refrigerator.",
  "Freezing food preserves it indefinitely, but quality can deteriorate over time.",
  "Cooked rice should be refrigerated within 1 hour to prevent Bacillus cereus bacteria growth.",
  "Wash your hands for at least 20 seconds with soap and water before handling food.",
  "Don't wash raw meat - it can spread bacteria around your kitchen.",
  "Use separate cutting boards for raw meat and vegetables to prevent cross-contamination.",
];

const FoodSafetyFacts = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Change fact every 8 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      
      // After fade out, change the fact and fade in
      setTimeout(() => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
        setIsVisible(true);
      }, 500); // Wait for fade out animation to complete
      
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 mb-8 p-6 bg-secondary/20 rounded-lg">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="bg-primary/20 p-3 rounded-full">
          <Info size={24} className="text-primary" />
        </div>
        <h2 className="text-xl font-medium mb-2">Food Safety Tip</h2>
        <div className="min-h-[80px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-medium text-center text-muted-foreground max-w-2xl"
              >
                {facts[currentFactIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FoodSafetyFacts;
