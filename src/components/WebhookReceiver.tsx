
import { useEffect } from 'react';
import { useRecalls } from '../contexts/RecallsContext';

const WebhookReceiver = () => {
  const { processWebhookData } = useRecalls();

  useEffect(() => {
    // This function simulates receiving a webhook
    // In a real app, this would be an API endpoint
    const setupWebhookReceiver = () => {
      // Create a global window function that MindStudio can call
      // This is a simple approach for demonstration
      (window as any).receiveWebhookData = (data: any) => {
        console.log("Received webhook data:", data);
        return processWebhookData(data);
      };

      console.log("Webhook receiver is ready");
    };

    setupWebhookReceiver();

    // Cleanup
    return () => {
      (window as any).receiveWebhookData = undefined;
    };
  }, [processWebhookData]);

  // This component doesn't render anything
  return null;
};

export default WebhookReceiver;
