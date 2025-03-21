
import { useState } from "react";
import { Search, Camera } from "lucide-react";
import { motion } from "framer-motion";
import CameraCapture from "./CameraCapture";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  showCamera?: boolean;
}

const SearchBar = ({ onSearch, showCamera = true }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showCameraCapture, setShowCameraCapture] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const handleCameraClick = () => {
    setShowCameraCapture(true);
  };

  const handleCapture = (imageSrc: string) => {
    console.log("Image captured:", imageSrc);
    // Here you would typically send the image to a backend for processing
    // For demo purposes, we'll just set a default query
    setQuery("Scanned food item");
    setShowCameraCapture(false);
    if (onSearch) {
      onSearch("Scanned food item");
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-2xl mx-auto"
      >
        <form 
          onSubmit={handleSearch}
          className={`flex items-center w-full relative overflow-hidden transition-all duration-300 ${
            isFocused 
              ? "bg-white shadow-lg rounded-xl ring-2 ring-primary/20" 
              : "bg-white/80 backdrop-blur-sm shadow-md rounded-xl"
          }`}
        >
          <div className="absolute left-4 text-muted-foreground">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for any food..."
            className="w-full py-4 px-12 bg-transparent focus:outline-none text-base"
          />
          {showCamera && (
            <button 
              type="button"
              onClick={handleCameraClick}
              className="absolute right-4 h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white"
            >
              <Camera size={18} />
            </button>
          )}
        </form>
      </motion.div>

      {showCameraCapture && (
        <CameraCapture 
          onCapture={handleCapture} 
          onClose={() => setShowCameraCapture(false)} 
        />
      )}
    </>
  );
};

export default SearchBar;
