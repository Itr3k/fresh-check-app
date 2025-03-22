
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define ad format dimensions
const AD_FORMAT_DIMENSIONS = {
  rectangle: { width: "300px", height: "250px" },
  leaderboard: { width: "728px", height: "90px" },
  skyscraper: { width: "160px", height: "600px" }
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
  const { toast } = useToast();
  
  // Size based on format
  let sizeClass = "h-[250px] w-full max-w-[300px] mx-auto"; // default rectangle
  
  if (format === "leaderboard") {
    sizeClass = "h-[90px] w-full max-w-[728px] mx-auto";
  } else if (format === "skyscraper") {
    sizeClass = "h-[600px] w-[160px] md:w-[300px]";
  }

  // Determine if we're in development mode or if the host is a lovable preview
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' ||
                         window.location.hostname.includes('lovableproject.com');
  
  // Handle intersection observer for lazy loading with error boundary
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
        { threshold: 0.1, rootMargin: "200px" }
      );
      
      if (adRef.current) {
        observer.observe(adRef.current);
      }
      
      return () => {
        try {
          observer.disconnect();
        } catch (e) {
          console.log("Error disconnecting observer:", e);
        }
      };
    } catch (e) {
      console.log("Error setting up intersection observer:", e);
      setIsVisible(true); // Fallback to visible if observer fails
    }
  }, [lazyLoad, isVisible]);
  
  // Safe ad loading with fall-back content
  useEffect(() => {
    if (!isVisible || initializedRef.current) return;
    
    // Mark as initialized to prevent multiple attempts
    initializedRef.current = true;
    
    // If we're in development or on lovable preview, show placeholder
    if (isDevelopment) {
      console.log(`AdUnit (${slotId}): Development mode - showing placeholder`);
      timeoutRef.current = setTimeout(() => {
        setAdLoaded(true);
      }, 1000);
      return;
    }
    
    // Safe ad blocker detection
    const safeCheckAdBlocker = () => {
      try {
        // Create a bait element that ad blockers typically hide
        const bait = document.createElement('div');
        bait.className = 'ad-placement ad-banner adsbox';
        bait.style.position = 'absolute';
        bait.style.opacity = '0';
        bait.style.height = '1px';
        bait.style.width = '1px';
        document.body.appendChild(bait);
        
        // Check if the bait was hidden by an ad blocker
        timeoutRef.current = setTimeout(() => {
          try {
            const isBlocked = bait.offsetHeight === 0 || 
                            window.getComputedStyle(bait).display === 'none' ||
                            !window.adsbygoogle;
            
            // Clean up bait element
            if (document.body.contains(bait)) {
              try {
                document.body.removeChild(bait);
              } catch (e) {
                console.log("Error removing bait element:", e);
              }
            }
            
            if (isBlocked) {
              console.log(`AdUnit (${slotId}): Ad blocker or AdSense unavailable detected`);
              setIsError(true);
              setAdLoaded(true); // Consider the ad "loaded" so we show fallback content
              
              // Only show toast in production, not dev/preview
              if (!isDevelopment) {
                toast({
                  title: "Ad content unavailable",
                  description: "Some content may not display correctly",
                  variant: "default" // Use default instead of destructive for less intrusive message
                });
              }
            } else {
              // Only attempt to load ads if no ad blocker detected
              safeTryLoadAd();
            }
          } catch (e) {
            console.log("Error in ad blocker check:", e);
            setAdLoaded(true); // Consider the ad "loaded" so we don't show loading indefinitely
            setIsError(true);
          }
        }, 100);
      } catch (e) {
        console.log("Error setting up ad blocker check:", e);
        setAdLoaded(true);
        setIsError(true);
      }
    };
    
    const safeTryLoadAd = () => {
      try {
        // Safety checks
        if (!adRef.current) {
          console.log(`AdUnit (${slotId}): No ref available, skipping ad load`);
          setAdLoaded(true);
          return;
        }
        
        if (!document.body.contains(adRef.current)) {
          console.log(`AdUnit (${slotId}): Container not in DOM, skipping ad load`);
          setAdLoaded(true);
          return;
        }
        
        // Clear any existing content
        if (adRef.current) {
          try {
            // Safely clear content
            while (adRef.current.firstChild) {
              adRef.current.removeChild(adRef.current.firstChild);
            }
          } catch (e) {
            console.log("Error clearing ad container:", e);
          }
        }
        
        // Only proceed if window.adsbygoogle is available
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          try {
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
                setAdLoaded(true);
                setIsError(true);
              }
            } else {
              setAdLoaded(true);
              setIsError(true);
            }
          } catch (e) {
            console.log("Error creating ad element:", e);
            setAdLoaded(true);
            setIsError(true);
          }
        } else {
          console.log('AdSense not available (window.adsbygoogle undefined)');
          setAdLoaded(true);
          setIsError(true);
        }
      } catch (error) {
        console.error('Error initializing AdSense ad:', error);
        setAdLoaded(true);
        setIsError(true);
      }
    };
    
    // Start the ad blocker check after a short delay
    // Use shorter timeout to prevent lengthy white screens
    timeoutRef.current = setTimeout(safeCheckAdBlocker, 500);
    
    // Fallback timeout to ensure we always show something after a maximum wait time
    const fallbackTimeout = setTimeout(() => {
      if (!adLoaded) {
        console.log(`AdUnit (${slotId}): Fallback timeout reached, showing error state`);
        setAdLoaded(true);
        setIsError(true);
      }
    }, 3000);
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      clearTimeout(fallbackTimeout);
    };
  }, [isVisible, slotId, isDevelopment, toast, adLoaded]);
  
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

  // For development, show a clearer placeholder
  if (isDevelopment) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`bg-secondary/30 border border-border rounded-lg overflow-hidden flex flex-col items-center justify-center ${sizeClass} ${className}`}
        ref={adRef}
      >
        <div className="text-center p-4 h-full w-full flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">Advertisement Placeholder</p>
          <Skeleton className={`w-[90%] h-[75%] rounded-md`} />
          <p className="text-xs text-muted-foreground mt-2">ID: {slotId} ({format})</p>
        </div>
      </motion.div>
    );
  }

  // Wrap in a ScrollArea to prevent any scroll issues
  return (
    <ScrollArea className={`overflow-hidden ${sizeClass} ${className}`}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={`bg-secondary/30 border border-border rounded-lg overflow-hidden h-full`}
        id={`ad-container-${slotId}`}
        ref={adRef}
      >
        {/* Fallback content shown only before ads load */}
        {!adLoaded && !isError && (
          <div className="text-center p-4 h-full flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground">Advertisement</p>
            <Skeleton className="w-[90%] h-[70%] mt-2 rounded-md" />
          </div>
        )}
        
        {/* Error state - More friendly message for ad blockers */}
        {isError && (
          <div className="text-center p-4 h-full flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground">Advertisement space</p>
            <p className="text-xs text-muted-foreground mt-1 opacity-70">
              Content unavailable
            </p>
          </div>
        )}
      </motion.div>
    </ScrollArea>
  );
};

// Add window augmentation for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdUnit;
