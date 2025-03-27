
import React from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import BreadcrumbNav from "./BreadcrumbNav";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{label: string; href?: string; current?: boolean}>;
}

const HeroSection = ({ 
  onSearch, 
  showBreadcrumbs = false, 
  breadcrumbItems = [] 
}: HeroSectionProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full mb-12 mt-4"
    >
      {showBreadcrumbs && breadcrumbItems.length > 0 && (
        <div className="px-6 pt-4 pb-0">
          <BreadcrumbNav items={breadcrumbItems} />
        </div>
      )}
      
      <div className="px-6 py-10 md:px-12 md:py-16 text-center relative">
        {/* Main content */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
        >
          How Long Does Food Last?
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
        >
          Get accurate storage times, spoilage indicators, and a free expiration calculator for any food. Protect your health and reduce waste.
        </motion.p>
        
        <motion.div variants={itemVariants} className="max-w-xl mx-auto mb-5">
          <SearchBar 
            onSearch={onSearch} 
            placeholder="Search for any food..."
            id="hero-search-bar"
          />
        </motion.div>
        
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm mb-6">
          <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-gray-600 shadow-sm">
            <span>Backed by FDA, USDA, and CDC guidelines</span>
          </div>
          <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-gray-600 shadow-sm">
            <span>Free nutrition & expiration calculator</span>
          </div>
          <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-gray-600 shadow-sm">
            <span>No sign-up required</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-3">
          <Link
            to="/about"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            How We Research Food Storage Guidelines <ArrowRight size={16} className="ml-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
