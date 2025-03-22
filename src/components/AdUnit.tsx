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
  const [adSenseAttempted, setAdSenseAttempted] = useState(false);
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
    
    // Always show the placeholder immediately to prevent white screen
    // We'll keep it visible until AdSense loads successfully
    setAdLoaded(true);
    
    // Safety check for ad blockers and AdSense availability
    const checkAdSenseAvailability = () => {
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
              // No need to set adLoaded since we've already set it to true initially
              
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
              attemptLoadAdSense();
            }
          } catch (e) {
            console.log("Error in ad blocker check:", e);
            setIsError(true);
          }
        }, 100);
      } catch (e) {
        console.log("Error setting up ad blocker check:", e);
        setIsError(true);
      }
    };
    
    const attemptLoadAdSense = () => {
      try {
        // Mark that we attempted to load AdSense
        setAdSenseAttempted(true);
        
        // Safety checks
        if (!adRef.current) {
          console.log(`AdUnit (${slotId}): No ref available, skipping ad load`);
          setIsError(true);
          return;
        }
        
        if (!document.body.contains(adRef.current)) {
          console.log(`AdUnit (${slotId}): Container not in DOM, skipping ad load`);
          setIsError(true);
          return;
        }
        
        // Only proceed if window.adsbygoogle is available
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          try {
            // Create a new div for AdSense to target
            const adContainer = document.createElement('div');
            adContainer.className = 'adsense-container';
            adContainer.style.width = '100%';
            adContainer.style.height = '100%';
            adContainer.style.position = 'relative';
            adContainer.style.zIndex = '1'; // Lower z-index than the placeholder
            
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
            
            // Add AdSense element to the container
            adContainer.appendChild(adElement);
            
            // Double-check DOM connection again before appending
            if (adRef.current && document.body.contains(adRef.current)) {
              // Add the ad container but don't remove the placeholder yet
              adRef.current.appendChild(adContainer);
              
              // Push to adsbygoogle with error handling
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                console.log(`AdSense ad ${slotId} initialized`);
                
                // Add an event listener to track when AdSense loads
                const checkAdLoaded = setInterval(() => {
                  try {
                    const adIframe = adContainer.querySelector('iframe');
                    if (adIframe) {
                      clearInterval(checkAdLoaded);
                      // Only hide the placeholder once AdSense loads successfully
                      setIsError(false);
                      console.log(`AdUnit (${slotId}): Ad successfully loaded`);
                    }
                  } catch (error) {
                    console.error(`Error checking ad loaded: ${error}`);
                  }
                }, 300);
                
                // Clear interval after 5 seconds to prevent memory leaks
                // If AdSense hasn't loaded by then, keep showing the placeholder
                setTimeout(() => {
                  clearInterval(checkAdLoaded);
                  // We don't set isError here because we're leaving the placeholder visible regardless
                }, 5000);
                
              } catch (error) {
                console.error('Error pushing ad to adsbygoogle:', error);
                setIsError(true);
              }
            } else {
              setIsError(true);
            }
          } catch (e) {
            console.log("Error creating ad element:", e);
            setIsError(true);
          }
        } else {
          console.log('AdSense not available (window.adsbygoogle undefined)');
          setIsError(true);
        }
      } catch (error) {
        console.error('Error initializing AdSense ad:', error);
        setIsError(true);
      }
    };
    
    // Start the ad blocker check after a short delay
    timeoutRef.current = setTimeout(checkAdSenseAvailability, 500);
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, slotId, isDevelopment, toast]);
  
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

  const renderPlaceholder = () => (
    <div className="text-center p-4 h-full w-full flex flex-col items-center justify-center bg-secondary/30 rounded-lg">
      <p className="text-xs text-muted-foreground mb-2 font-semibold">
        {isDevelopment ? "Advertisement Placeholder" : "Advertisement"}
      </p>
      <Skeleton className={`w-[90%] h-[75%] rounded-md`} />
      {isDevelopment && (
        <p className="text-xs text-muted-foreground mt-2">ID: {slotId} ({format})</p>
      )}
    </div>
  );

  return (
    <ScrollArea className={`overflow-hidden ${sizeClass} ${className}`}>
      <div className="relative h-full w-full">
        {/* Always render placeholder initially and when there's an error */}
        {(isError || !adSenseAttempted || isDevelopment) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="absolute inset-0 z-10"
          >
            {renderPlaceholder()}
          </motion.div>
        )}
        
        {/* This is the container for AdSense */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className={`bg-secondary/30 border border-border rounded-lg overflow-hidden h-full w-full`}
          id={`ad-container-${slotId}`}
          ref={adRef}
        >
          {/* AdSense content will be dynamically inserted here */}
        </motion.div>
      </div>
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
