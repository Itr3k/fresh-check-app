
interface Window {
  appEnvironment?: string;
  appVersion?: string;
  appBuildId?: string;
  appLoaded?: boolean;
  gtag?: (...args: any[]) => void;
  adsbygoogle?: any[];
  adsenseLoaded?: boolean;
  loadAdSense?: () => void;
  __reportWebVitals?: (metric: any) => void;
  doNotTrack?: string;
}
