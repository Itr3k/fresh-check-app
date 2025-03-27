
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
}
