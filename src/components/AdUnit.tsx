
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

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
  const initializedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();
  
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
  
  // Load ad script safely
  useEffect(() => {
    // Only run this effect if the component is visible and not already initialized
    if (!isVisible || initializedRef.current) return;
    
    // Mark as initialized to prevent multiple attempts
    initializedRef.current = true;
    
    const loadAd = () => {
      try {
        // Make sure element is still in the DOM
        if (!adRef.current || !document.body.contains(adRef.current)) {
          console.log(`AdUnit (${slotId}): Container not in DOM, skipping ad load`);
          return;
        }
        
        // Clear any existing content
        if (adRef.current) {
          adRef.current.innerHTML = '';
        }
        
        // Only proceed if window.adsbygoogle is available
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // Create the ad element
          const adElement = document.createElement('ins');
          adElement.className = 'adsbygoogle';
          adElement.style.display = 'block';
          adElement.style.width = '100%';
          adElement.style.height = '100%';
          adElement.setAttribute('data-ad-client', 'ca-pub-4704318106426851');
          adElement.setAttribute('data-ad-slot', slotId);
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
          
          // Double-check DOM connection again before appending
          if (adRef.current && document.body.contains(adRef.current)) {
            adRef.current.appendChild(adElement);
            
            // Push to adsbygoogle with error handling
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              console.log(`AdSense ad ${slotId} initialized`);
              setAdLoaded(true);
            } catch (error) {
              console.error('Error pushing ad to adsbygoogle:', error);
            }
          }
        } else {
          console.log('AdSense not available (window.adsbygoogle undefined)');
        }
      } catch (error) {
        console.error('Error initializing AdSense ad:', error);
      }
    };
    
    // Add a significant delay to ensure the component is fully mounted and stable
    // This helps avoid race conditions with React's rendering lifecycle
    timeoutRef.current = setTimeout(loadAd, 1500);
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, slotId]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Clear any active timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Reset initialized state if component unmounts
      initializedRef.current = false;
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={`bg-secondary/30 border border-border rounded-lg overflow-hidden ${sizeClass} ${className}`}
      id={`ad-container-${slotId}`}
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
