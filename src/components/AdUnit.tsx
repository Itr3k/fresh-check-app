
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { reportPerformance } from "@/lib/utils";
import PlaceholderAd from "./ads/PlaceholderAd";
import { AD_FORMAT_DIMENSIONS, isDevelopmentEnv } from "@/constants/adConstants";
import { isAdSenseLoaded, initializeAdSlot } from "@/utils/adUtils";

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
  const isDevelopment = isDevelopmentEnv();
  
  // Handle AdSense script loaded event
  useEffect(() => {
    const handleAdsenseLoaded = () => {
      if (adRef.current && initializedRef.current && !adLoaded) {
        initializeAdSlot(
          adRef,
          slotId,
          responsive,
          () => setAdLoaded(true),
          () => setIsError(true)
        );
      }
    };

    window.addEventListener('adsenseLoaded', handleAdsenseLoaded);
    return () => {
      window.removeEventListener('adsenseLoaded', handleAdsenseLoaded);
    };
  }, [adLoaded, slotId, responsive]);
  
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
      initializeAdSlot(
        adRef,
        slotId,
        responsive,
        () => setAdLoaded(true),
        () => setIsError(true)
      );
    }, loadWaitTime);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, isDevelopment, slotId, responsive]);

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
              {(isError || isDevelopment) && 
                <PlaceholderAd 
                  adName={adDimensions.name} 
                  width={adDimensions.width} 
                  height={adDimensions.height} 
                />
              }
              
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
            {(isError || isDevelopment) && 
              <PlaceholderAd 
                adName={adDimensions.name} 
                width={adDimensions.width} 
                height={adDimensions.height} 
              />
            }
            
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

export default AdUnit;
