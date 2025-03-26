
// Type declarations for Google Analytics gtag
interface Window {
  gtag?: (
    command: 'event',
    action: string,
    params: {
      event_category: string;
      event_label: string;
      non_interaction: boolean;
      page_path?: string;
      [key: string]: any;
    }
  ) => void;
  appLoaded?: boolean;
  adsenseLoaded?: boolean;
  adsenseLoading?: boolean;
  adsenseRetries?: number;
  MAX_ADSENSE_RETRIES?: number;
  loadAdSense?: () => void;
  adsbygoogle?: any[];
  doNotTrack?: string;
}
