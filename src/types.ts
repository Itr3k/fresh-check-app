
// Global types for the application

export interface FoodItem {
  id: string;
  name: string;
  category?: string;
  description?: string;
  image?: string;
  storage?: Array<{
    method: string;
    time: string;
  }>;
  tips?: string[];
  spoilage?: string[];
  notes?: string;
}
