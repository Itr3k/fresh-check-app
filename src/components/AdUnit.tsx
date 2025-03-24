
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Reduced height dimensions for better performance
const AD_FORMAT_DIMENSIONS = {
  rectangle: { width: "300px", height: "180px" },
  leaderboard: { width: "728px", height: "60px" },
  skyscraper: { width: "160px", height: "400px" }
};

interface AdUnitProps {
  slotId?: string;
  className?: string;
  format?: "rectangle" | "leaderboard" | "skyscraper";
  lazyLoad?: boolean;
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slotId = "default-ad-slot", 
  className = "",
  format = "rectangle",
  lazyLoad = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const initializedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Size based on optimized format (reduced height)
  let sizeClass = "h-[180px] w-full max-w-[300px] mx-auto"; // default rectangle
  
  if (format === "leaderboard") {
    sizeClass = "h-[60px] w-full max-w-[728px] mx-auto";
  } else if (format === "skyscraper") {
    sizeClass = "h-[400px] w-[160px] md:w-[300px]";
  }

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' ||
                         window.location.hostname.includes('lovableproject.com');
  
  // Use IntersectionObserver for lazy loading
  useEffect(() => {
    if (!lazyLoad || isVisible) return;
    
    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        // Increased rootMargin to start loading earlier
        { threshold: 0.1, rootMargin: "350px" }
      );
      
      if (adRef.current) {
        observer.observe(adRef.current);
      }
      
      return () => {
        observer.disconnect();
      };
    } catch (e) {
      // Fallback to visible if observer fails
      setIsVisible(true);
      console.log("Error setting up intersection observer:", e);
    }
  }, [lazyLoad, isVisible]);
  
  // Load ad or placeholder
  useEffect(() => {
    if (!isVisible || initializedRef.current) return;
    
    // Mark as initialized to prevent multiple attempts
    initializedRef.current = true;
    
    // If in development, show placeholder
    if (isDevelopment) {
      timeoutRef.current = setTimeout(() => {
        setAdLoaded(true);
      }, 500);
      return;
    }
    
    // Show the placeholder immediately
    setAdLoaded(true);
    
    // Use the centralized AdSense loader
    if (typeof window !== 'undefined' && !isDevelopment) {
      // Ensure the AdSense script is loaded
      if (window.loadAdSense && typeof window.loadAdSense === 'function') {
        window.loadAdSense();
      }
      
      timeoutRef.current = setTimeout(() => {
        try {
          if (!adRef.current) return;

          // Create new ad element
          const adElement = document.createElement('ins');
          adElement.className = 'adsbygoogle';
          adElement.style.display = 'block';
          adElement.style.width = '100%';
          adElement.style.height = '100%';
          adElement.setAttribute('data-ad-client', 'ca-pub-4704318106426851');
          adElement.setAttribute('data-ad-slot', slotId);
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
          // Add performance hints
          adElement.setAttribute('data-ad-region', `ad-${slotId}-${Date.now()}`);
          
          // Clear existing content and append ad
          if (adRef.current) {
            // Only append if the element is still in the DOM
            if (document.body.contains(adRef.current)) {
              adRef.current.innerHTML = '';
              adRef.current.appendChild(adElement);
              
              // Push to adsbygoogle queue with error handling
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (error) {
                setIsError(true);
                console.error('Error pushing ad to adsbygoogle:', error);
              }
            }
          }
        } catch (error) {
          setIsError(true);
          console.error('Error initializing ad:', error);
        }
      }, 150); // Slightly delayed to ensure main content loads first
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, slotId, isDevelopment]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Placeholder component
  const renderPlaceholder = () => (
    <div className="text-center p-3 h-full w-full flex flex-col items-center justify-center bg-secondary/20 rounded-lg border border-border/30">
      <p className="text-xs text-muted-foreground mb-1 font-medium">
        {isDevelopment ? "Advertisement Placeholder" : "Advertisement"}
      </p>
      <Skeleton className={`w-[90%] h-[70%] rounded-md`} />
      {isDevelopment && (
        <p className="text-xs text-muted-foreground mt-1">ID: {slotId} ({format})</p>
      )}
    </div>
  );

  // Use a simpler, more performant render approach
  return (
    <div 
      className={`overflow-hidden ${sizeClass} ${className}`} 
      role="complementary" 
      aria-label="Advertisement"
      data-ad-pending={isVisible && !adLoaded ? "true" : undefined}
    >
      <div className="relative h-full w-full">
        {(isError || isDevelopment) && renderPlaceholder()}
        
        {/* Container for actual ad */}
        <div 
          className={`bg-secondary/20 border border-border/30 rounded-lg overflow-hidden h-full w-full ${
            isError || isDevelopment ? 'hidden' : ''
          }`}
          id={`ad-container-${slotId}`}
          ref={adRef}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// Add window augmentation for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
    loadAdSense: () => void;
    adsenseLoading: boolean;
    adsenseLoaded: boolean;
  }
}

export default AdUnit;
