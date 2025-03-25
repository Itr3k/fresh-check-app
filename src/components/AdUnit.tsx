
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Square } from "lucide-react";
import { reportPerformance } from "@/lib/utils";

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
  waitForViewport?: boolean;
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slotId = "default-ad-slot", 
  className = "",
  format = "leaderboard",
  mobileFormat = "rectangle",
  lazyLoad = true,
  responsive = true,
  waitForViewport = true,
  contentBefore,
  contentAfter
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const initializedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();
  
  // Get dimensions for the selected format based on device
  const activeFormat = isMobile ? mobileFormat : format;
  const adDimensions = AD_FORMAT_DIMENSIONS[activeFormat];
  
  // Check if in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' ||
                         window.location.hostname.includes('lovableproject.com');
  
  // Faster way to check if AdSense is loaded
  const isAdSenseLoaded = useCallback(() => {
    return typeof window.adsbygoogle !== 'undefined' && window.adsenseLoaded === true;
  }, []);

  // Handle AdSense script loaded event
  useEffect(() => {
    const handleAdsenseLoaded = () => {
      if (adRef.current && initializedRef.current && !adLoaded) {
        initializeAd();
      }
    };

    window.addEventListener('adsenseLoaded', handleAdsenseLoaded);
    return () => {
      window.removeEventListener('adsenseLoaded', handleAdsenseLoaded);
    };
  }, [adLoaded]);
  
  // Listen for viewport visibility with intersection observer
  useEffect(() => {
    if (!lazyLoad || isVisible || !waitForViewport) return;
    
    try {
      // Cleanup previous observer if exists
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      
      // Create new observer that triggers when ad becomes visible
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current?.disconnect();
            observerRef.current = null;
            
            // Track performance
            reportPerformance(`ad-visible-${slotId}`, performance.now());
          }
        },
        // Use more aggressive rootMargin but lower threshold to start loading earlier
        { threshold: 0.01, rootMargin: "200px" }
      );
      
      if (adRef.current) {
        observerRef.current.observe(adRef.current);
      }
    } catch (e) {
      // Fallback to visible if observer fails
      setIsVisible(true);
      console.warn("AdUnit: IntersectionObserver not available");
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [lazyLoad, isVisible, waitForViewport, slotId]);
  
  // Function to initialize the ad
  const initializeAd = useCallback(() => {
    if (!adRef.current || !document.body.contains(adRef.current)) {
      return; // Skip if component unmounted
    }
    
    try {
      // Track ad initialization
      reportPerformance(`ad-init-${slotId}`, performance.now());
      
      // Only proceed if AdSense is loaded
      if (isAdSenseLoaded()) {
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
          adElement.setAttribute('data-full-width-responsive', responsive ? 'true' : 'false');
          
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
            setAdLoaded(true);
            setIsError(false);
            
            // Track successful ad push
            reportPerformance(`ad-pushed-${slotId}`, performance.now());
          } catch (error) {
            console.warn('AdUnit: Error initializing ad slot', error);
            setIsError(true);
          }
        }
      } else if (window.loadAdSense && typeof window.loadAdSense === 'function') {
        // Try to load AdSense if not already loaded
        window.loadAdSense();
      }
    } catch (error) {
      console.warn('AdUnit: Error creating ad element', error);
      setIsError(true);
    }
  }, [isAdSenseLoaded, slotId, responsive]);
  
  // Load ad when visible
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
      initializeAd();
    }, loadWaitTime);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, isDevelopment, initializeAd]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
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

  // Default publisher content if none provided
  const defaultContentBefore = !contentBefore ? (
    <div className="mb-2 p-2 bg-secondary/10 rounded text-sm">
      <h4 className="text-xs font-medium">Food Storage Information</h4>
      <p className="text-xs text-muted-foreground">Learn about safe storage times for your food.</p>
    </div>
  ) : contentBefore;

  const defaultContentAfter = !contentAfter ? (
    <div className="mt-2 p-2 bg-secondary/10 rounded text-xs text-muted-foreground">
      <p>Always check food for signs of spoilage before consuming.</p>
    </div>
  ) : contentAfter;

  // Use AspectRatio for responsive ads to prevent layout shifts
  return (
    <div className="ad-wrapper my-4 px-2 w-full flex flex-col items-center">
      {/* Required publisher content before ad */}
      {defaultContentBefore}
      
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
        {responsive ? (
          <div 
            className="relative w-full flex justify-center"
            style={{
              maxWidth: `${adDimensions.width}px`,
            }}
          >
            <AspectRatio 
              ratio={adDimensions.width / adDimensions.height}
              className="w-full"
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
            </AspectRatio>
          </div>
        ) : (
          <div 
            className="relative"
            style={{
              width: `${adDimensions.width}px`,
              height: `${adDimensions.height}px`,
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
        )}
      </div>
      
      {/* Required publisher content after ad */}
      {defaultContentAfter}
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
    adsenseRetries: number;
    MAX_ADSENSE_RETRIES: number;
  }
}

export default AdUnit;
