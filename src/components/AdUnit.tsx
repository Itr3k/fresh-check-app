
import React, { useEffect, useRef, useState } from "react";
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
  
  const activeFormat = isMobile ? mobileFormat : format;
  const adDimensions = AD_FORMAT_DIMENSIONS[activeFormat];
  
  const isDevelopment = isDevelopmentEnv();
  
  // Handle ads that are already loaded when the component mounts
  useEffect(() => {
    const handleAdsenseLoaded = () => {
      if (adRef.current && initializedRef.current && !adLoaded) {
        console.log(`AdUnit: AdSense loaded event for ${slotId}`);
        try {
          initializeAdSlot(
            adRef,
            slotId,
            responsive,
            () => setAdLoaded(true),
            () => setIsError(true)
          );
        } catch (e) {
          console.error("Error initializing ad slot:", e);
          setIsError(true);
        }
      }
    };

    window.addEventListener('adsenseLoaded', handleAdsenseLoaded);
    return () => {
      window.removeEventListener('adsenseLoaded', handleAdsenseLoaded);
    };
  }, [adLoaded, slotId, responsive]);
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || isVisible || !waitForViewport) {
      setIsVisible(true);
      return;
    }
    
    try {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log(`AdUnit: ${slotId} is now visible`);
            setIsVisible(true);
            observerRef.current?.disconnect();
            observerRef.current = null;
            
            reportPerformance(`ad-visible-${slotId}`, performance.now());
          }
        },
        { threshold: 0.01, rootMargin: "200px" }
      );
      
      if (adRef.current) {
        observerRef.current.observe(adRef.current);
      }
    } catch (e) {
      console.error("IntersectionObserver error:", e);
      setIsVisible(true);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [lazyLoad, isVisible, waitForViewport, slotId]);
  
  // Initialize ad when visible
  useEffect(() => {
    if (!isVisible || initializedRef.current) return;
    
    initializedRef.current = true;
    console.log(`AdUnit: Initializing ${slotId} (development: ${isDevelopment})`);
    
    if (isDevelopment) {
      console.log(`AdUnit: In development mode, showing placeholder for ${slotId}`);
      setAdLoaded(true);
      return;
    }
    
    if (isAdSenseLoaded()) {
      console.log(`AdUnit: AdSense already loaded, initializing ${slotId}`);
      try {
        initializeAdSlot(
          adRef,
          slotId,
          responsive,
          () => setAdLoaded(true),
          () => setIsError(true)
        );
      } catch (e) {
        console.error("Error initializing ad slot:", e);
        setIsError(true);
      }
    } else {
      console.log(`AdUnit: AdSense not loaded, setting timeout for ${slotId}`);
      // Set a timeout to initialize the ad slot if AdSense is not yet loaded
      timeoutRef.current = setTimeout(() => {
        try {
          console.log(`AdUnit: Trying to initialize ${slotId} after timeout`);
          initializeAdSlot(
            adRef,
            slotId,
            responsive,
            () => setAdLoaded(true),
            () => setIsError(true)
          );
        } catch (e) {
          console.error("Error initializing ad slot:", e);
          setIsError(true);
        }
      }, document.readyState === 'complete' ? 100 : 1000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, isDevelopment, slotId, responsive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log(`AdUnit: Cleaning up ${slotId}`);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [slotId]);

  const defaultContentBefore = !contentBefore ? (
    <div className="mb-2 p-2 bg-secondary/10 rounded text-sm">
      <h4 className="text-xs font-medium text-center">Food Storage Information</h4>
      <p className="text-xs text-muted-foreground text-center">Learn about safe storage times for your food.</p>
    </div>
  ) : contentBefore;

  const defaultContentAfter = !contentAfter ? (
    <div className="mt-2 p-2 bg-secondary/10 rounded text-xs text-muted-foreground text-center">
      <p>Always check food for signs of spoilage before consuming.</p>
    </div>
  ) : contentAfter;

  return (
    <div className="ad-wrapper my-4 w-full flex flex-col items-center">
      {defaultContentBefore}
      
      <div 
        className={`flex justify-center items-center overflow-hidden ${className} print:hidden ad-unit ad-${activeFormat} w-full`} 
        role="complementary" 
        aria-label="Advertisement"
        data-ad-pending={isVisible && !adLoaded ? "true" : undefined}
        data-ad-format={activeFormat}
      >
        {responsive ? (
          <div 
            className="relative w-full flex justify-center items-center"
            style={{
              maxWidth: `${adDimensions.width}px`,
              margin: '0 auto',
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
                className={`bg-secondary/20 border border-border/30 rounded-lg overflow-hidden h-full w-full flex items-center justify-center ${
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
            className="relative flex items-center justify-center"
            style={{
              width: `${adDimensions.width}px`,
              height: `${adDimensions.height}px`,
              margin: '0 auto',
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
              className={`bg-secondary/20 border border-border/30 rounded-lg overflow-hidden h-full w-full flex items-center justify-center ${
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
      
      {defaultContentAfter}
    </div>
  );
};

export default AdUnit;
