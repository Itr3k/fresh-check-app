
interface WebhookPayload {
  recalls: RecallData[];
  lastUpdated: string;
}

export interface RecallData {
  id: string;
  product_name: string;
  brand: string;
  category: string;
  recall_date: string;
  publish_date: string;
  severity: "high" | "medium" | "low";
  reason: string;
  details: string;
  affected_products: string[];
  geographic_scope: string;
  source_url: string;
  source_agency: string;
  instructions: string;
  status: "active" | "resolved";
  ai_confidence: number;
  human_verified: boolean;
}

// In-memory storage for recalls (would be replaced with a database in production)
let recallsStore: RecallData[] = [];
let lastUpdatedTimestamp: string = new Date().toISOString();

export const webhookService = {
  // Process incoming webhook data
  processWebhook: (payload: WebhookPayload): boolean => {
    try {
      if (!payload || !Array.isArray(payload.recalls)) {
        console.error("Invalid webhook payload format");
        return false;
      }

      // Update our store with the new data
      recallsStore = payload.recalls;
      lastUpdatedTimestamp = payload.lastUpdated || new Date().toISOString();
      
      console.log(`Processed ${recallsStore.length} recalls from webhook`);
      return true;
    } catch (error) {
      console.error("Error processing webhook data:", error);
      return false;
    }
  },

  // Get all recalls
  getAllRecalls: (): RecallData[] => {
    return [...recallsStore];
  },

  // Get a single recall by ID
  getRecallById: (id: string): RecallData | undefined => {
    return recallsStore.find(recall => recall.id === id);
  },

  // Get last updated timestamp
  getLastUpdated: (): string => {
    return lastUpdatedTimestamp;
  },

  // Search recalls
  searchRecalls: (query: string): RecallData[] => {
    if (!query) return [...recallsStore];
    
    const lowercaseQuery = query.toLowerCase();
    return recallsStore.filter(recall => 
      recall.product_name.toLowerCase().includes(lowercaseQuery) || 
      recall.brand.toLowerCase().includes(lowercaseQuery) ||
      recall.reason.toLowerCase().includes(lowercaseQuery)
    );
  }
};

// Initialize with sample data for demonstration
import { mockRecalls } from "../data/mockRecalls";
recallsStore = mockRecalls;
