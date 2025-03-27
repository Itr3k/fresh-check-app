
// Standard AdSense display ad sizes
export const AD_FORMAT_DIMENSIONS = {
  rectangle: { width: 300, height: 250, name: "Medium Rectangle" },
  leaderboard: { width: 728, height: 90, name: "Leaderboard" },
  skyscraper: { width: 160, height: 600, name: "Wide Skyscraper" },
  large_mobile: { width: 320, height: 100, name: "Large Mobile Banner" },
  mobile_banner: { width: 320, height: 50, name: "Mobile Banner" },
  billboard: { width: 970, height: 250, name: "Billboard" }
};

// Environment helper - using hostname detection instead of process.env
export const isDevelopmentEnv = (): boolean => {
  return window.location.hostname === 'localhost' ||
         window.location.hostname.includes('lovableproject.com');
};
