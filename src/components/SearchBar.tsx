
import { useState } from "react";
import { Search, Camera } from "lucide-react";
import { motion } from "framer-motion";
import CameraCapture from "./CameraCapture";
import { toast } from "../hooks/use-toast";

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
    // Check if the device has camera capabilities
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Camera Not Available",
        description: "Your device or browser doesn't support camera access.",
        variant: "destructive",
      });
      return;
    }
    
    // Open camera in fullscreen mode
    setShowCameraCapture(true);
    // Prevent scrolling when camera is open
    document.body.style.overflow = 'hidden';
  };

  const handleCapture = (imageSrc: string) => {
    console.log("Image captured:", imageSrc);
    
    // Reset body overflow
    document.body.style.overflow = '';
    
    // For now, we'll just set a placeholder query
    // In a real application, this would send the image to a backend for processing
    setQuery("Scanned food item");
    setShowCameraCapture(false);
    
    toast({
      title: "Image Captured",
      description: "Processing the food image...",
    });
    
    // Simulate a delay before "recognizing" the food
    setTimeout(() => {
      if (onSearch) {
        onSearch("Scanned food item");
      }
    }, 1000);
  };

  const handleCloseCamera = () => {
    setShowCameraCapture(false);
    // Reset body overflow
    document.body.style.overflow = '';
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
              aria-label="Take a photo of food"
            >
              <Camera size={18} />
            </button>
          )}
        </form>
      </motion.div>

      {showCameraCapture && (
        <CameraCapture 
          onCapture={handleCapture} 
          onClose={handleCloseCamera} 
        />
      )}
    </>
  );
};

export default SearchBar;
