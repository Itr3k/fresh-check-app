
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Optimized dimensions for better performance
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
  
  // Size based on format
  let sizeClass = "h-[180px] w-full max-w-[300px] mx-auto"; // default rectangle
  
  if (format === "leaderboard") {
    sizeClass = "h-[60px] w-full max-w-[728px] mx-auto";
  } else if (format === "skyscraper") {
    sizeClass = "h-[400px] w-[160px] md:w-[300px]";
  }

  // Check if in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' ||
                         window.location.hostname.includes('lovableproject.com');
  
  // Faster way to check if AdSense is loaded
  const isAdSenseLoaded = () => {
    return typeof window.adsbygoogle !== 'undefined';
  };
  
  // Use IntersectionObserver for lazy loading with low-resource approach
  useEffect(() => {
    if (!lazyLoad || isVisible) return;
    
    let observer: IntersectionObserver | null = null;
    
    try {
      // Create observer that triggers when ad becomes 10% visible
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.disconnect();
            observer = null;
          }
        },
        // Use more aggressive rootMargin but lower threshold to start loading earlier
        { threshold: 0.01, rootMargin: "200px" }
      );
      
      if (adRef.current) {
        observer.observe(adRef.current);
      }
    } catch (e) {
      // Fallback to visible if observer fails
      setIsVisible(true);
      console.warn("AdUnit: IntersectionObserver not available");
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [lazyLoad, isVisible]);
  
  // Load ad with performance optimization
  useEffect(() => {
    if (!isVisible || initializedRef.current) return;
    
    // Flag to prevent multiple initializations
    initializedRef.current = true;
    
    // Development fallback
    if (isDevelopment) {
      // Quick placeholder in dev mode
      setAdLoaded(true);
      return;
    }
    
    // Set placeholder immediately
    setAdLoaded(true);
    
    // Adaptive timeout depending on if page is still loading
    const loadWaitTime = document.readyState === 'complete' ? 100 : 1000;
    
    // Delayed ad load to avoid competing with critical resources
    timeoutRef.current = setTimeout(() => {
      if (!adRef.current || !document.body.contains(adRef.current)) {
        return; // Skip if component unmounted
      }
      
      try {
        // Only proceed if AdSense loader function exists
        if (window.loadAdSense && typeof window.loadAdSense === 'function') {
          // Call the central loader
          if (!isAdSenseLoaded()) {
            window.loadAdSense();
          }
          
          // Clear existing content
          if (adRef.current) {
            adRef.current.innerHTML = '';
            
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
            // Add unique ID to prevent duplicate ads
            const uniqueId = `ad-${slotId}-${Math.random().toString(36).substring(2, 11)}`;
            adElement.setAttribute('data-ad-region', uniqueId);
            
            // Append ad to container
            adRef.current.appendChild(adElement);
            
            // Push to adsbygoogle queue with minimal retry
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
              console.warn('AdUnit: Error initializing ad slot', error);
              setIsError(true);
            }
          }
        }
      } catch (error) {
        console.warn('AdUnit: Error creating ad element', error);
        setIsError(true);
      }
    }, loadWaitTime);
    
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

  // Lightweight placeholder
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

  // Use a more efficient DOM structure
  return (
    <div 
      className={`overflow-hidden ${sizeClass} ${className} print:hidden`} 
      role="complementary" 
      aria-label="Advertisement"
      data-ad-pending={isVisible && !adLoaded ? "true" : undefined}
    >
      <div className="relative h-full w-full">
        {(isError || isDevelopment) && renderPlaceholder()}
        
        <div 
          className={`bg-secondary/20 border border-border/30 rounded-lg overflow-hidden h-full w-full ${
            isError || isDevelopment ? 'hidden' : ''
          }`}
          id={`ad-container-${slotId}`}
          ref={adRef}
          aria-hidden="true"
          data-ad-slot={slotId}
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
