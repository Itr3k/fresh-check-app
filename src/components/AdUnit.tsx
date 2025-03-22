
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
  const [adElementCreated, setAdElementCreated] = useState(false);
  
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
    if (typeof window === "undefined" || !isVisible || adLoaded || adElementCreated) return;
    
    try {
      // Check if AdSense is loaded and reference is valid
      if (adRef.current && (window as any).adsbygoogle) {
        // Flag that we're in the process of creating the ad
        setAdElementCreated(true);
        
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
        
        // Safely clear the container first
        if (adRef.current.isConnected) {
          // Use textContent = '' as a safer way to clear children
          adRef.current.textContent = '';
          
          // Append the ad element
          adRef.current.appendChild(adElement);
          
          // Push the ad to AdSense for display
          try {
            const adsbygoogle = (window as any).adsbygoogle || [];
            adsbygoogle.push({});
            
            console.log(`AdSense ad ${slotId} initialized`);
            setAdLoaded(true);
          } catch (e) {
            console.error('Error initializing AdSense:', e);
          }
        }
      } else {
        console.log('AdSense not available yet');
      }
    } catch (error) {
      console.error('Error setting up AdSense ad:', error);
      setAdElementCreated(false);
    }
  }, [slotId, isVisible, adLoaded, adElementCreated]);
  
  // Clean up effect - using a more robust approach
  useEffect(() => {
    return () => {
      try {
        if (adRef.current && adRef.current.isConnected) {
          // Using textContent clearing instead of node removal
          // This avoids "NotFoundError: The object can not be found here" errors
          adRef.current.textContent = '';
        }
        
        // Reset states (though component is unmounting, this can help if 
        // the component is conditionally rendered instead of fully unmounted)
        setAdLoaded(false);
        setAdElementCreated(false);
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

export default AdUnit;
