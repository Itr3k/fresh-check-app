
// Types of affiliate ads we support
export type AffiliateAdType = 'amazon' | 'walmart' | 'target';

// Configuration for each affiliate ad placement
export interface AffiliateAd {
  id: string;
  type: AffiliateAdType;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl: string;
  couponCode?: string;
}

// Sample affiliate ads for different categories
export const FOOD_STORAGE_ADS: AffiliateAd[] = [
  {
    id: 'amazon-containers-1',
    type: 'amazon',
    title: 'Rubbermaid FreshWorks Containers',
    description: 'Keep produce fresher longer with these storage containers',
    linkUrl: 'https://www.amazon.com/dp/B01JCNEJSO?tag=freshcheck-20',
    imageUrl: '/affiliate-ads/food-containers.jpg'
  },
  {
    id: 'walmart-containers-1',
    type: 'walmart',
    title: 'Pyrex Glass Food Storage Set',
    description: '18-piece set with airtight lids for meal prep',
    linkUrl: 'https://www.walmart.com/ip/555062298',
    imageUrl: '/affiliate-ads/pyrex-containers.jpg'
  },
  {
    id: 'target-thermometer-1',
    type: 'target',
    title: 'Digital Food Thermometer',
    description: 'Ensure food safety with accurate temperature readings',
    linkUrl: 'https://www.target.com/p/digital-food-thermometer/-/A-83821',
    couponCode: 'FRESH15'
  }
];

export const KITCHEN_TOOL_ADS: AffiliateAd[] = [
  {
    id: 'amazon-knife-1',
    type: 'amazon',
    title: 'Chef's Knife Set',
    description: 'Professional 8-inch knife with sharpener',
    linkUrl: 'https://www.amazon.com/dp/B085LVL1QF?tag=freshcheck-20',
    imageUrl: '/affiliate-ads/chef-knife.jpg'
  },
  {
    id: 'walmart-blender-1',
    type: 'walmart',
    title: 'High-Speed Blender',
    description: 'Perfect for smoothies and food prep',
    linkUrl: 'https://www.walmart.com/ip/969598231',
    imageUrl: '/affiliate-ads/blender.jpg'
  }
];

export const COOKWARE_ADS: AffiliateAd[] = [
  {
    id: 'amazon-pan-1',
    type: 'amazon',
    title: 'Cast Iron Skillet',
    description: 'Pre-seasoned 12-inch pan for perfect cooking',
    linkUrl: 'https://www.amazon.com/dp/B00063RWYI?tag=freshcheck-20',
    imageUrl: '/affiliate-ads/cast-iron.jpg'
  },
  {
    id: 'target-pot-1',
    type: 'target',
    title: 'Stainless Steel Cookware Set',
    description: '10-piece set for all your cooking needs',
    linkUrl: 'https://www.target.com/p/stainless-steel-cookware-set/-/A-79591',
    couponCode: 'COOK20'
  }
];

// Function to get a random ad from a specific category
export const getRandomAd = (adArray: AffiliateAd[]): AffiliateAd => {
  const randomIndex = Math.floor(Math.random() * adArray.length);
  return adArray[randomIndex];
};

// Function to get a random ad from any category
export const getRandomAdFromAll = (): AffiliateAd => {
  const allAds = [...FOOD_STORAGE_ADS, ...KITCHEN_TOOL_ADS, ...COOKWARE_ADS];
  const randomIndex = Math.floor(Math.random() * allAds.length);
  return allAds[randomIndex];
};
