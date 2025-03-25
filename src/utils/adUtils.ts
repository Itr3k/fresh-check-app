import { reportPerformance } from "@/lib/utils";

// Check if AdSense is loaded
export const isAdSenseLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.adsbygoogle !== 'undefined' && 
         window.adsenseLoaded === true;
};

// Check if we're in an environment where ads should be shown
export const shouldShowAds = (): boolean => {
  // Don't show ads in development or if user opted out
  if (process.env.NODE_ENV === 'development') {
    return false;
  }
  
  // Check for ad blockers or user's DNT preference
  const dntEnabled = 
    navigator.doNotTrack === "1" || 
    navigator.doNotTrack === "yes" ||
    window.doNotTrack === "1";
    
  if (dntEnabled) {
    console.log('AdUnit: User has Do Not Track enabled, respecting preference');
    return false;
  }
  
  return true;
};

// Initialize an ad slot with proper error handling and compliance
export const initializeAdSlot = (
  adRef: React.RefObject<HTMLDivElement>,
  slotId: string,
  responsive: boolean,
  onSuccess: () => void,
  onError: () => void
): void => {
  if (!adRef.current || !document.body.contains(adRef.current)) {
    console.log(`AdUnit: Skipping initialization for ${slotId}, container not ready`);
    return; // Skip if component unmounted
  }
  
  try {
    // Track ad initialization
    reportPerformance(`ad-init-${slotId}`, performance.now());
    
    // Only proceed if AdSense is loaded
    if (isAdSenseLoaded()) {
      console.log(`AdUnit: Initializing ad slot ${slotId}`);
      
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
        
        // Add clear labeling for ad (AdSense compliance)
        adElement.setAttribute('aria-label', 'Advertisement');
        
        // Add data-ad-test attribute in development or staging environments
        if (window.location.hostname !== 'freshcheck.app') {
          adElement.setAttribute('data-adtest', 'on');
        }
        
        // Append ad to container
        adRef.current.appendChild(adElement);
        
        // Push to adsbygoogle queue
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          onSuccess();
          
          // Track successful ad push
          reportPerformance(`ad-pushed-${slotId}`, performance.now());
          console.log(`AdUnit: Successfully pushed ad ${slotId} to queue`);
        } catch (error) {
          console.warn('AdUnit: Error initializing ad slot', error);
          onError();
        }
      }
    } else {
      console.log(`AdUnit: AdSense not loaded for ${slotId}, trying to load it`);
      if (window.loadAdSense && typeof window.loadAdSense === 'function') {
        // Try to load AdSense if not already loaded
        window.loadAdSense();
      }
    }
  } catch (error) {
    console.warn('AdUnit: Error creating ad element', error);
    onError();
  }
};

// Detect ad blockers (for analytics, not to block content)
export const detectAdBlocker = (callback: (blocked: boolean) => void): void => {
  if (typeof window === 'undefined') return;
  
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox';
  testAd.style.position = 'absolute';
  testAd.style.top = '-999px';
  testAd.style.left = '-999px';
  testAd.style.height = '1px';
  testAd.style.width = '1px';
  
  document.body.appendChild(testAd);
  
  window.setTimeout(() => {
    let blocked = true;
    
    if (testAd.offsetHeight === 0) {
      console.log('AdBlocker detected');
      blocked = true;
    } else {
      console.log('No AdBlocker detected');
      blocked = false;
    }
    
    if (testAd.parentNode) {
      testAd.parentNode.removeChild(testAd);
    }
    
    callback(blocked);
  }, 100);
};
