
import React, { useEffect, useState } from 'react';
import { ExternalLink, X, Tag, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AffiliateAd, 
  AffiliateAdType,
  FOOD_STORAGE_ADS,
  KITCHEN_TOOL_ADS,
  COOKWARE_ADS,
  getRandomAd,
  getRandomAdFromAll
} from '@/constants/affiliateAdConstants';

interface AffiliateAdUnitProps {
  category?: 'food-storage' | 'kitchen-tools' | 'cookware' | 'random';
  className?: string;
  hideLabel?: boolean;
  hideCloseButton?: boolean;
  onClose?: () => void;
}

const getAdForCategory = (category?: string): AffiliateAd => {
  switch (category) {
    case 'food-storage':
      return getRandomAd(FOOD_STORAGE_ADS);
    case 'kitchen-tools':
      return getRandomAd(KITCHEN_TOOL_ADS);
    case 'cookware':
      return getRandomAd(COOKWARE_ADS);
    case 'random':
    default:
      return getRandomAdFromAll();
  }
};

const getAdIcon = (type: AffiliateAdType) => {
  switch (type) {
    case 'amazon':
      return '/affiliate-ads/amazon-icon.png';
    case 'walmart':
      return '/affiliate-ads/walmart-icon.png';
    case 'target':
      return '/affiliate-ads/target-icon.png';
    default:
      return null;
  }
};

const AffiliateAdUnit: React.FC<AffiliateAdUnitProps> = ({
  category = 'random',
  className = '',
  hideLabel = false,
  hideCloseButton = false,
  onClose
}) => {
  const [ad, setAd] = useState<AffiliateAd | null>(null);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    // Get a random ad based on the selected category
    setAd(getAdForCategory(category));
  }, [category]);
  
  if (dismissed || !ad) return null;
  
  const handleClose = () => {
    setDismissed(true);
    if (onClose) onClose();
    
    // Record in localStorage to avoid showing this ad too frequently
    try {
      const viewedAds = JSON.parse(localStorage.getItem('viewedAffiliateAds') || '[]');
      viewedAds.push({
        id: ad.id,
        timestamp: Date.now()
      });
      localStorage.setItem('viewedAffiliateAds', JSON.stringify(viewedAds.slice(-10)));
    } catch (error) {
      console.error('Error storing viewed ad:', error);
    }
  };
  
  const trackClick = () => {
    // Track affiliate link click
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        event_category: 'Affiliate',
        event_label: ad.id,
        non_interaction: false
      });
    }
  };
  
  const adIcon = getAdIcon(ad.type);
  
  return (
    <div className={`affiliate-ad-unit border rounded-lg p-4 bg-background shadow-sm ${className}`}>
      {!hideLabel && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            <span>Affiliate Recommendation</span>
          </div>
          
          {!hideCloseButton && (
            <button 
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground" 
              aria-label="Close advertisement"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3">
        {ad.imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={ad.imageUrl} 
              alt={ad.title}
              className="w-full sm:w-24 h-auto rounded-md object-cover" 
              loading="lazy"
            />
          </div>
        )}
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-sm">{ad.title}</h3>
            {adIcon && (
              <img 
                src={adIcon} 
                alt={`${ad.type} affiliate`} 
                className="h-4 w-auto" 
                loading="lazy"
              />
            )}
          </div>
          
          {ad.description && (
            <p className="text-xs text-muted-foreground mb-2">{ad.description}</p>
          )}
          
          {ad.couponCode && (
            <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
              <Gift className="h-3 w-3" />
              <span>Use code: <strong>{ad.couponCode}</strong></span>
            </div>
          )}
          
          <Button 
            size="sm" 
            className="w-full sm:w-auto text-xs mt-1"
            onClick={trackClick}
            asChild
          >
            <a 
              href={ad.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1"
            >
              Shop Now
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </div>
      
      <div className="text-[10px] text-muted-foreground mt-2 text-center">
        As an affiliate, we may earn from qualifying purchases
      </div>
    </div>
  );
};

export default AffiliateAdUnit;
