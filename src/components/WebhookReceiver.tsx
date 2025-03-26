
import { useEffect, useState } from 'react';
import { useRecalls } from '../contexts/RecallsContext';
import { toast } from '../hooks/use-toast';
import { handleError } from '@/lib/errorUtils';

const WebhookReceiver = () => {
  const { processWebhookData } = useRecalls();
  const [environment, setEnvironment] = useState<string>('unknown');

  useEffect(() => {
    // Detect environment
    try {
      const hostname = window.location.hostname;
      let detectedEnv = 'unknown';
      
      if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        detectedEnv = 'local';
      } else if (hostname.includes('lovableproject.com')) {
        detectedEnv = 'lovable-sandbox';
      } else if (hostname.includes('preview')) {
        detectedEnv = 'preview';
      } else if (hostname.includes('freshcheck.app')) {
        detectedEnv = 'production';
      }
      
      setEnvironment(detectedEnv);
      console.log(`WebhookReceiver: Environment detected: ${detectedEnv}`);
    } catch (error) {
      handleError(error, 'webhook-env-detection');
    }
  }, []);

  useEffect(() => {
    // This function simulates receiving a webhook
    // In a real app, this would be an API endpoint
    const setupWebhookReceiver = () => {
      try {
        // Create a global window function that MindStudio can call
        // This is a simple approach for demonstration
        (window as any).receiveWebhookData = (data: any) => {
          console.log(`Received webhook data in ${environment}:`, data);
          
          try {
            if (!data) {
              console.error("Webhook received null or undefined data");
              toast({
                title: "Webhook Error",
                description: "Received empty webhook data",
                variant: "destructive",
              });
              return false;
            }
            
            const result = processWebhookData(data);
            
            // Log successful webhook to analytics if available
            if (window.gtag) {
              window.gtag('event', 'webhook_received', {
                event_category: 'Webhook',
                event_label: data.type || 'unknown',
                non_interaction: false,
                environment: environment
              });
            }
            
            return result;
          } catch (error) {
            console.error("Error processing webhook data:", error);
            handleError(error, 'webhook-processing');
            
            toast({
              title: "Error",
              description: "Failed to process webhook data",
              variant: "destructive",
            });
            return false;
          }
        };

        console.log(`Webhook receiver is ready in ${environment}`);
      } catch (error) {
        console.error("Failed to set up webhook receiver:", error);
        handleError(error, 'webhook-setup');
      }
    };

    setupWebhookReceiver();

    // Cleanup
    return () => {
      try {
        (window as any).receiveWebhookData = undefined;
        console.log("Webhook receiver removed during cleanup");
      } catch (error) {
        console.error("Error during webhook receiver cleanup:", error);
        handleError(error, 'webhook-cleanup');
      }
    };
  }, [processWebhookData, environment]);

  // This component doesn't render anything
  return null;
};

export default WebhookReceiver;
