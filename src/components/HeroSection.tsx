
import React from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
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
      className="w-full rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-[#F2FCE2] to-[#D3E4FD] mb-12 mt-4"
    >
      <div className="px-6 py-10 md:px-12 md:py-16 text-center relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 opacity-10 -translate-x-1/4 -translate-y-1/4">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7C7.55228 7 8 6.55228 8 6C8 5.44772 7.55228 5 7 5C3.13401 5 0 8.13401 0 12C0 15.866 3.13401 19 7 19C7.55228 19 8 18.5523 8 18C8 17.4477 7.55228 17 7 17Z" fill="#4CAF50"/>
            <path d="M17 7C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19C20.866 19 24 15.866 24 12C24 8.13401 20.866 5 17 5C16.4477 5 16 5.44772 16 6C16 6.55228 16.4477 7 17 7Z" fill="#4CAF50"/>
            <path d="M12 22C9.23858 22 7 19.7614 7 17C7 16.4477 6.55228 16 6 16C5.44772 16 5 16.4477 5 17C5 20.866 8.13401 24 12 24C15.866 24 19 20.866 19 17C19 16.4477 18.5523 16 18 16C17.4477 16 17 16.4477 17 17C17 19.7614 14.7614 22 12 22Z" fill="#4CAF50"/>
            <path d="M12 2C14.7614 2 17 4.23858 17 7C17 7.55228 17.4477 8 18 8C18.5523 8 19 7.55228 19 7C19 3.13401 15.866 0 12 0C8.13401 0 5 3.13401 5 7C5 7.55228 5.44772 8 6 8C6.55228 8 7 7.55228 7 7C7 4.23858 9.23858 2 12 2Z" fill="#4CAF50"/>
          </svg>
        </div>
        
        <div className="absolute bottom-0 right-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.75 1.5C12.75 1.08579 12.4142 0.75 12 0.75C11.5858 0.75 11.25 1.08579 11.25 1.5V11.25H1.5C1.08579 11.25 0.75 11.5858 0.75 12C0.75 12.4142 1.08579 12.75 1.5 12.75H11.25V22.5C11.25 22.9142 11.5858 23.25 12 23.25C12.4142 23.25 12.75 22.9142 12.75 22.5V12.75H22.5C22.9142 12.75 23.25 12.4142 23.25 12C23.25 11.5858 22.9142 11.25 22.5 11.25H12.75V1.5Z" fill="#4CAF50"/>
          </svg>
        </div>

        {/* Main content */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
        >
          How Long Does Food Last?
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Save money, reduce waste, and keep your family safe with expert food storage guidelines
        </motion.p>
        
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-6">
          <SearchBar 
            onSearch={onSearch} 
            placeholder="Search for any food..."
            id="hero-search-bar"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/about"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            How We Research Food Storage Guidelines <ArrowRight size={16} className="ml-1" />
          </Link>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <CheckCircle size={16} className="text-primary" />
          <span>Information verified using FDA, USDA, and CDC guidelines</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
