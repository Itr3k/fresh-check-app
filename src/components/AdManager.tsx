
import React, { useEffect, useState } from 'react';
import AdUnit from './AdUnit';
import AffiliateAdUnit from './AffiliateAdUnit';
import { AD_FORMAT_DIMENSIONS } from '@/constants/adConstants';

interface AdManagerProps {
  slotId?: string;
  className?: string;
  format?: keyof typeof AD_FORMAT_DIMENSIONS;
  mobileFormat?: keyof typeof AD_FORMAT_DIMENSIONS;
  affiliateCategory?: 'food-storage' | 'kitchen-tools' | 'cookware' | 'random';
  adType?: 'adsense' | 'affiliate' | 'mixed';
  affiliateRatio?: number; // 0-1, chance of showing affiliate ads when type is 'mixed'
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
}

const AdManager: React.FC<AdManagerProps> = ({
  slotId = "default-ad-slot",
  className = "",
  format = "leaderboard",
  mobileFormat = "rectangle",
  affiliateCategory = 'random',
  adType = 'mixed',
  affiliateRatio = 0.3, // 30% chance of affiliate ads by default
  contentBefore,
  contentAfter
}) => {
  const [showAffiliateAd, setShowAffiliateAd] = useState(false);
  
  useEffect(() => {
    // Decide which type of ad to show
    if (adType === 'adsense') {
      setShowAffiliateAd(false);
    } else if (adType === 'affiliate') {
      setShowAffiliateAd(true);
    } else {
      // For mixed type, randomly decide based on ratio
      const shouldShowAffiliate = Math.random() < affiliateRatio;
      
      // Check if we've shown too many affiliate ads to this user recently
      try {
        const viewedAds = JSON.parse(localStorage.getItem('viewedAffiliateAds') || '[]');
        const recentAds = viewedAds.filter((ad: any) => {
          // Ads viewed in the last 30 minutes
          return Date.now() - ad.timestamp < 30 * 60 * 1000;
        });
        
        // If user has seen more than 2 affiliate ads in the last 30 min, reduce chance
        if (recentAds.length > 2) {
          setShowAffiliateAd(Math.random() < affiliateRatio / 2);
        } else {
          setShowAffiliateAd(shouldShowAffiliate);
        }
      } catch (error) {
        setShowAffiliateAd(shouldShowAffiliate);
      }
    }
  }, [adType, affiliateRatio]);
  
  // Track ad impression
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', showAffiliateAd ? 'affiliate_impression' : 'adsense_impression', {
        event_category: 'Ad',
        event_label: slotId,
        non_interaction: true
      });
    }
  }, [showAffiliateAd, slotId]);
  
  return (
    <>
      {showAffiliateAd ? (
        <AffiliateAdUnit
          category={affiliateCategory}
          className={className}
        />
      ) : (
        <AdUnit
          slotId={slotId}
          className={className}
          format={format}
          mobileFormat={mobileFormat}
          lazyLoad={true}
          responsive={true}
          contentBefore={contentBefore}
          contentAfter={contentAfter}
        />
      )}
    </>
  );
};

export default AdManager;
