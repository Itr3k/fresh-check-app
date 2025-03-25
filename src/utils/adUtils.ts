
import { reportPerformance } from "@/lib/utils";

// Check if AdSense is loaded
export const isAdSenseLoaded = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.adsbygoogle !== 'undefined' && 
         window.adsenseLoaded === true;
};

// Initialize an ad slot
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
