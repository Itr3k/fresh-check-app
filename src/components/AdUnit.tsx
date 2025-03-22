
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
  
  // Size based on format
  let sizeClass = "h-[250px] w-full"; // default rectangle (300x250)
  let adSize = [300, 250];

  if (format === "leaderboard") {
    sizeClass = "h-[90px] w-full";
    adSize = [728, 90];
  } else if (format === "skyscraper") {
    sizeClass = "h-[600px] w-[160px] md:w-[300px]";
    adSize = [300, 600];
  }
  
  // Handle lazy loading
  useEffect(() => {
    if (typeof window === "undefined" || !lazyLoad || isVisible) return;
    
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
  
  // Initialize the ad - with additional safety checks
  useEffect(() => {
    // Only run if the ad is visible and hasn't been loaded yet
    if (typeof window === "undefined" || !isVisible || adLoaded) return;
    
    // Reference to the current adRef element for cleanup
    const currentAdRef = adRef.current;
    
    try {
      // Check if AdSense is loaded
      if (currentAdRef && (window as any).adsbygoogle) {
        // Create new ins element for AdSense
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.style.width = '100%';
        adElement.style.height = '100%';
        adElement.setAttribute('data-ad-client', 'ca-pub-4704318106426851');
        adElement.setAttribute('data-ad-slot', slotId);
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'true');
        
        // Double check element is still in DOM before manipulating it
        if (currentAdRef && document.body.contains(currentAdRef)) {
          // Safely clear the container
          while (currentAdRef.firstChild) {
            try {
              currentAdRef.firstChild.remove();
            } catch (e) {
              console.warn('Error removing child:', e);
              break; // Prevent infinite loop if removal fails
            }
          }
          
          // Append the ad element
          try {
            currentAdRef.appendChild(adElement);
            
            // Push the ad to AdSense for display
            const adsbygoogle = (window as any).adsbygoogle || [];
            adsbygoogle.push({});
            
            console.log(`AdSense ad ${slotId} initialized`);
            setAdLoaded(true);
          } catch (e) {
            console.error('Error appending ad element:', e);
          }
        }
      } else {
        console.log('AdSense not available yet, will retry on next render');
      }
    } catch (error) {
      console.error('Error initializing AdSense ad:', error);
    }
    
    // No DOM manipulation in cleanup - we'll handle that in the unmount effect
  }, [slotId, isVisible, adLoaded]);
  
  // Separate cleanup effect that runs on unmount only
  useEffect(() => {
    // This function runs on component unmount
    return () => {
      try {
        const currentAdRef = adRef.current;
        // Check if the element is still in the DOM before manipulating it
        if (currentAdRef && document.body.contains(currentAdRef)) {
          // Use a safer method to clear children
          try {
            // Use modern approach - remove() method on the element itself
            while (currentAdRef.firstChild) {
              currentAdRef.firstChild.remove();
            }
          } catch (e) {
            console.warn('Error during cleanup, using alternative method:', e);
            // Fallback to simple content replacement if removal fails
            currentAdRef.textContent = '';
          }
        }
        setAdLoaded(false);
      } catch (error) {
        console.error('Error cleaning up ad unit:', error);
      }
    };
  }, []); // Empty dependency array means this only runs on unmount
  
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

export default AdUnit;
