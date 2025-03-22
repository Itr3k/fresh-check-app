
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
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Lazy loading implementation
    if (lazyLoad && !isVisible) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      if (adRef.current) {
        observer.observe(adRef.current);
      }
      
      return () => {
        observer.disconnect();
      };
    }
  }, [lazyLoad, isVisible]);
  
  useEffect(() => {
    // Only run on client side and when the ad is visible
    if (typeof window === "undefined" || !isVisible) return;
    
    try {
      if (adRef.current && (window as any).adsbygoogle) {
        // Clear existing ad content if any
        adRef.current.innerHTML = '';
        
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
        
        // Append the ad element to our container
        adRef.current.appendChild(adElement);
        
        // Push the ad to AdSense for display
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        
        console.log(`AdSense ad ${slotId} initialized`);
      }
    } catch (error) {
      console.error('Error initializing AdSense ad:', error);
    }
    
    // Cleanup function
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [slotId, format, isVisible]);
  
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
      <div className="text-center p-4 ad-placeholder">
        <p className="text-xs text-muted-foreground">Advertisement</p>
        <p className="text-sm text-muted-foreground opacity-70">Ad ID: {slotId}</p>
      </div>
    </motion.div>
  );
};

export default AdUnit;
