
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
  const [adInitialized, setAdInitialized] = useState(false);
  const timerRef = useRef<number | null>(null);
  
  // Size based on format
  let sizeClass = "h-[250px] w-full"; // default rectangle (300x250)
  
  if (format === "leaderboard") {
    sizeClass = "h-[90px] w-full";
  } else if (format === "skyscraper") {
    sizeClass = "h-[600px] w-[160px] md:w-[300px]";
  }
  
  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || isVisible) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    
    if (adRef.current) {
      observer.observe(adRef.current);
    }
    
    return () => observer.disconnect();
  }, [lazyLoad, isVisible]);
  
  // Initialize ad safely
  useEffect(() => {
    if (!isVisible || adInitialized || !adRef.current) return;
    
    const initializeAd = () => {
      // Set flag to prevent multiple initializations
      setAdInitialized(true);
      
      // Safety check to ensure component is still mounted and in document
      if (!adRef.current || !document.body.contains(adRef.current)) {
        console.log(`AdUnit ${slotId}: Element not in DOM, skipping initialization`);
        return;
      }
      
      try {
        // Instead of removing children which can cause "NotFoundError",
        // use safer innerHTML method to clear the container
        if (adRef.current) {
          adRef.current.innerHTML = '';
        }
        
        // Check if AdSense is available
        if (window.hasOwnProperty('adsbygoogle')) {
          // Create new ins element
          const adElement = document.createElement('ins');
          adElement.className = 'adsbygoogle';
          adElement.style.display = 'block';
          adElement.style.width = '100%';
          adElement.style.height = '100%';
          adElement.setAttribute('data-ad-client', 'ca-pub-4704318106426851');
          adElement.setAttribute('data-ad-slot', slotId);
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
          
          // Another safety check before appending to DOM
          if (adRef.current && document.body.contains(adRef.current)) {
            adRef.current.appendChild(adElement);
            
            // Push to adsbygoogle
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              console.log(`AdSense ad ${slotId} initialized`);
              setAdLoaded(true);
            } catch (error) {
              console.error('Error initializing AdSense:', error);
            }
          } else {
            console.log(`AdUnit ${slotId}: Element not in DOM during ad creation`);
          }
        } else {
          console.log('AdSense not available');
        }
      } catch (error) {
        console.error('Error setting up AdSense ad:', error);
      }
    };
    
    // Delay initialization slightly to ensure DOM stability
    // Store timer reference for cleanup
    timerRef.current = window.setTimeout(initializeAd, 300);
    
    return () => {
      // Clean up timer if component unmounts before timer fires
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [slotId, isVisible, adInitialized]);
  
  // Component unmount cleanup
  useEffect(() => {
    return () => {
      try {
        // Clean up timers
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        
        // Set state flags to prevent further operations
        setAdInitialized(false);
        setAdLoaded(false);
      } catch (error) {
        console.error('Error during ad unit cleanup:', error);
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={`bg-secondary/30 border border-border rounded-lg overflow-hidden ${sizeClass} ${className}`}
      id={`ad-slot-${slotId}`}
      ref={adRef}
    >
      {/* Fallback content shown only before ads load */}
      {!adLoaded && (
        <div className="text-center p-4 h-full flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground">Advertisement</p>
          <p className="text-sm text-muted-foreground opacity-70">Ad ID: {slotId}</p>
        </div>
      )}
    </motion.div>
  );
};

// Add window augmentation for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdUnit;
