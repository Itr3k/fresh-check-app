
import { useEffect } from 'react';
import { useRecalls } from '../contexts/RecallsContext';
import { toast } from '../hooks/use-toast';

const WebhookReceiver = () => {
  const { processWebhookData } = useRecalls();

  useEffect(() => {
    // This function simulates receiving a webhook
    // In a real app, this would be an API endpoint
    const setupWebhookReceiver = () => {
      try {
        // Create a global window function that MindStudio can call
        // This is a simple approach for demonstration
        (window as any).receiveWebhookData = (data: any) => {
          console.log("Received webhook data:", data);
          
          try {
            const result = processWebhookData(data);
            return result;
          } catch (error) {
            console.error("Error processing webhook data:", error);
            toast({
              title: "Error",
              description: "Failed to process webhook data",
              variant: "destructive",
            });
            return false;
          }
        };

        console.log("Webhook receiver is ready");
      } catch (error) {
        console.error("Failed to set up webhook receiver:", error);
      }
    };

    setupWebhookReceiver();

    // Cleanup
    return () => {
      try {
        (window as any).receiveWebhookData = undefined;
      } catch (error) {
        console.error("Error during webhook receiver cleanup:", error);
      }
    };
  }, [processWebhookData]);

  // This component doesn't render anything
  return null;
};

export default WebhookReceiver;
