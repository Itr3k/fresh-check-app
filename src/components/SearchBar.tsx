
import { useState } from "react";
import { Search, Camera } from "lucide-react";
import { motion } from "framer-motion";
import CameraCapture from "./CameraCapture";
import { toast } from "../hooks/use-toast";
import { ImageProcessingService, FoodInfo } from "../utils/imageProcessingService";
import FoodInfoResult from "./FoodInfoResult";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  showCamera?: boolean;
}

const SearchBar = ({ onSearch, showCamera = true }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showCameraCapture, setShowCameraCapture] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [foodInfo, setFoodInfo] = useState<FoodInfo | null>(null);

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

  const handleCapture = async (imageSrc: string) => {
    console.log("Image captured:", imageSrc.substring(0, 50) + "...");
    
    // Close camera capture component
    setShowCameraCapture(false);
    
    // Reset body overflow
    document.body.style.overflow = '';
    
    // Show processing toast
    toast({
      title: "Processing Image",
      description: "Analyzing food image...",
    });
    
    // Start processing
    setIsProcessing(true);
    
    try {
      // Process the image to extract food information
      const result = await ImageProcessingService.processImage(imageSrc);
      
      if (result) {
        // Set the food info from the processing result
        setFoodInfo(result);
        setQuery(result.name); // Update search query with food name
        
        toast({
          title: "Analysis Complete",
          description: `Identified: ${result.name}`,
        });
      } else {
        toast({
          title: "No Results",
          description: "Could not identify food in the image. Try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error processing food image:", error);
      toast({
        title: "Processing Error",
        description: "An error occurred while analyzing the image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseCamera = () => {
    console.log("Closing camera from SearchBar");
    setShowCameraCapture(false);
    // Reset body overflow
    document.body.style.overflow = '';
  };
  
  const handleReset = () => {
    setFoodInfo(null);
    setQuery("");
  };

  // Show food info result if we have processed food information
  if (foodInfo) {
    return (
      <FoodInfoResult 
        foodInfo={foodInfo} 
        onSearch={onSearch}
        onReset={handleReset}
      />
    );
  }

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
            disabled={isProcessing}
          />
          {showCamera && (
            <button 
              type="button"
              onClick={handleCameraClick}
              className="absolute right-4 h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white"
              aria-label="Take a photo of food"
              disabled={isProcessing}
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
