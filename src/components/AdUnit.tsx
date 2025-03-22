
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
  
  if (format === "leaderboard") {
    sizeClass = "h-[90px] w-full";
  } else if (format === "skyscraper") {
    sizeClass = "h-[600px] w-[160px] md:w-[300px]";
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
  
  // Initialize the ad - using a declarative approach
  useEffect(() => {
    // Only run if the ad is visible and hasn't been loaded yet
    if (typeof window === "undefined" || !isVisible || adLoaded || !adRef.current) return;
    
    // Safety function to avoid manipulating disconnected DOM nodes
    const safelyInitAd = () => {
      try {
        if (!adRef.current || !document.body.contains(adRef.current)) return;
        
        // Check if AdSense is loaded
        if (window.hasOwnProperty('adsbygoogle')) {
          // Create a clean slate
          if (adRef.current.children.length > 0) {
            adRef.current.innerHTML = '';
          }
          
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
          
          // Safely append to DOM only if ref is still in document
          if (adRef.current && document.body.contains(adRef.current)) {
            adRef.current.appendChild(adElement);
            
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
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
      }
    };

    // Small timeout to ensure DOM stability
    const timerId = setTimeout(safelyInitAd, 50);
    return () => clearTimeout(timerId);
  }, [slotId, isVisible, adLoaded]);
  
  // Clean up effect - without direct node removal
  useEffect(() => {
    return () => {
      try {
        // Only manipulate DOM if the element is still connected to the document
        if (adRef.current && document.body.contains(adRef.current)) {
          // Set innerHTML to empty string instead of removing children
          adRef.current.innerHTML = '';
        }
      } catch (error) {
        console.error('Error during ad unit cleanup:', error);
      }
    };
  }, []);

  // Add window type definition to prevent TypeScript errors
  useEffect(() => {
    // This is just to ensure the types are available
    // The actual functionality is implemented in the hooks above
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
