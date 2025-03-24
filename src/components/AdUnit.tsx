
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Square } from "lucide-react";

// Standard AdSense display ad sizes
const AD_FORMAT_DIMENSIONS = {
  rectangle: { width: 300, height: 250, name: "Medium Rectangle" },
  leaderboard: { width: 728, height: 90, name: "Leaderboard" },
  skyscraper: { width: 160, height: 600, name: "Wide Skyscraper" },
  large_mobile: { width: 320, height: 100, name: "Large Mobile Banner" },
  mobile_banner: { width: 320, height: 50, name: "Mobile Banner" },
  billboard: { width: 970, height: 250, name: "Billboard" }
};

interface AdUnitProps {
  slotId?: string;
  className?: string;
  format?: keyof typeof AD_FORMAT_DIMENSIONS;
  lazyLoad?: boolean;
  responsive?: boolean;
  mobileFormat?: keyof typeof AD_FORMAT_DIMENSIONS;
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slotId = "default-ad-slot", 
  className = "",
  format = "leaderboard",
  mobileFormat = "rectangle",
  lazyLoad = true,
  responsive = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const initializedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();
  
  // Get dimensions for the selected format based on device
  const activeFormat = isMobile ? mobileFormat : format;
  const adDimensions = AD_FORMAT_DIMENSIONS[activeFormat];
  
  // Generate responsive or fixed size classes
  const sizeClass = responsive
    ? `h-auto w-full max-w-[${adDimensions.width}px] mx-auto aspect-[${adDimensions.width}/${adDimensions.height}]`
    : `h-[${adDimensions.height}px] w-[${adDimensions.width}px] mx-auto`;
  
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
            // Add data-ad-test attribute in development or staging environments
            if (window.location.hostname !== 'freshcheck.app') {
              adElement.setAttribute('data-adtest', 'on');
            }
            
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

  // Enhanced placeholder with ad size information and visual representation
  const renderPlaceholder = () => (
    <div className="text-center p-3 h-full w-full flex flex-col items-center justify-center bg-secondary/20 rounded-lg border border-border/40">
      <p className="text-xs text-muted-foreground mb-1 font-medium">
        Advertisement
      </p>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-[90%] h-[70%] bg-secondary/30 rounded-md border border-dashed border-border/50">
          <Square className="w-6 h-6 text-muted-foreground/60" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 italic">
          {adDimensions.name} ({adDimensions.width}×{adDimensions.height})
        </p>
      </div>
    </div>
  );

  // Use a more efficient DOM structure with improved centering
  return (
    <div 
      className={`flex justify-center items-center overflow-hidden ${className} print:hidden ad-unit ad-${activeFormat}`} 
      role="complementary" 
      aria-label="Advertisement"
      data-ad-pending={isVisible && !adLoaded ? "true" : undefined}
      data-ad-format={activeFormat}
      style={{
        width: '100%',
        maxWidth: responsive ? undefined : `${adDimensions.width}px`,
        margin: '0 auto'
      }}
    >
      <div 
        className="relative"
        style={{
          width: responsive ? '100%' : `${adDimensions.width}px`,
          height: responsive ? 'auto' : `${adDimensions.height}px`,
          maxWidth: responsive ? `${adDimensions.width}px` : undefined,
          aspectRatio: responsive ? `${adDimensions.width}/${adDimensions.height}` : undefined
        }}
      >
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
