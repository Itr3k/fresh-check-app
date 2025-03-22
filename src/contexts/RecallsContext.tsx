
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { webhookService, RecallData } from '../services/webhookService';
import { toast } from '../hooks/use-toast';

interface RecallsContextType {
  recalls: RecallData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string;
  searchRecalls: (query: string) => RecallData[];
  getRecallById: (id: string) => RecallData | undefined;
  refreshRecalls: () => void;
  processWebhookData: (data: any) => boolean;
}

const RecallsContext = createContext<RecallsContextType | undefined>(undefined);

export const RecallsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recalls, setRecalls] = useState<RecallData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(webhookService.getLastUpdated());

  // Load initial data
  useEffect(() => {
    try {
      const data = webhookService.getAllRecalls();
      setRecalls(data);
      setLastUpdated(webhookService.getLastUpdated());
      setLoading(false);
    } catch (err) {
      setError('Failed to load recall data');
      setLoading(false);
      console.error('Error loading recalls:', err);
    }
  }, []);

  // Function to process webhook data
  const processWebhookData = (payload: any) => {
    try {
      const success = webhookService.processWebhook(payload);
      
      if (success) {
        // Update state with new data
        setRecalls(webhookService.getAllRecalls());
        setLastUpdated(webhookService.getLastUpdated());
        
        // Show toast notification
        toast({
          title: "Recalls Updated",
          description: `Received ${payload.recalls?.length || 0} recalls from MindStudio AI`,
        });
        
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to process webhook data');
      console.error('Error processing webhook:', err);
      return false;
    }
  };

  // Function to refresh recalls data
  const refreshRecalls = () => {
    setLoading(true);
    try {
      const data = webhookService.getAllRecalls();
      setRecalls(data);
      setLastUpdated(webhookService.getLastUpdated());
      setLoading(false);
    } catch (err) {
      setError('Failed to refresh recall data');
      setLoading(false);
      console.error('Error refreshing recalls:', err);
    }
  };

  // Search function
  const searchRecalls = (query: string) => {
    return webhookService.searchRecalls(query);
  };

  // Get recall by ID
  const getRecallById = (id: string) => {
    return webhookService.getRecallById(id);
  };

  return (
    <RecallsContext.Provider
      value={{
        recalls,
        loading,
        error,
        lastUpdated,
        searchRecalls,
        getRecallById,
        refreshRecalls,
        processWebhookData
      }}
    >
      {children}
    </RecallsContext.Provider>
  );
};

export const useRecalls = () => {
  const context = useContext(RecallsContext);
  if (context === undefined) {
    throw new Error('useRecalls must be used within a RecallsProvider');
  }
  return context;
};
