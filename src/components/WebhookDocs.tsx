
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WebhookDocs = () => {
  return (
    <Card className="max-w-3xl mx-auto mt-8 mb-8">
      <CardHeader>
        <CardTitle>MindStudio AI Webhook Integration</CardTitle>
        <CardDescription>
          Use this documentation to connect MindStudio AI to FreshCheck's webhook endpoint
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="integration">
          <TabsList className="mb-4">
            <TabsTrigger value="integration">Integration Guide</TabsTrigger>
            <TabsTrigger value="payload">Payload Format</TabsTrigger>
            <TabsTrigger value="test">Test Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integration">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">How to Connect MindStudio AI</h3>
                <p className="text-muted-foreground mb-2">
                  To send food recall data from MindStudio AI to FreshCheck, configure your MindStudio workflow 
                  to call our global JavaScript function when new recall data is processed.
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Configure MindStudio AI to scrape and process recall data</li>
                  <li>Format the data according to our payload schema</li>
                  <li>Call our global webhook function <code>window.receiveWebhookData(payload)</code></li>
                  <li>Check the return value to verify successful delivery</li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payload">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Webhook Payload Format</h3>
              <p className="text-muted-foreground mb-2">
                Your webhook data should follow this structure:
              </p>
              <pre className="bg-secondary/20 p-4 rounded-md overflow-x-auto text-sm">
{`{
  "recalls": [
    {
      "id": "string",
      "product_name": "string",
      "brand": "string",
      "category": "string",
      "recall_date": "YYYY-MM-DD",
      "publish_date": "YYYY-MM-DD",
      "severity": "high" | "medium" | "low",
      "reason": "string",
      "details": "string",
      "affected_products": ["string"],
      "geographic_scope": "string",
      "source_url": "string",
      "source_agency": "string",
      "instructions": "string",
      "status": "active" | "resolved",
      "ai_confidence": number,
      "human_verified": boolean
    }
  ],
  "lastUpdated": "ISO date string"
}`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="test">
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Test Your Integration</h3>
              <p className="text-muted-foreground mb-2">
                You can test the integration by running this code in your browser console:
              </p>
              <pre className="bg-secondary/20 p-4 rounded-md overflow-x-auto text-sm">
{`// Test webhook with sample data
const testData = {
  recalls: [
    {
      id: "test-001",
      product_name: "Test Product",
      brand: "Test Brand",
      category: "test-category",
      recall_date: "2023-12-01",
      publish_date: "2023-12-02",
      severity: "high",
      reason: "Test recall reason",
      details: "This is a test recall for integration testing.",
      affected_products: ["Test size", "Test package"],
      geographic_scope: "Test Region",
      source_url: "https://example.com",
      source_agency: "TEST",
      instructions: "This is a test. No action required.",
      status: "active",
      ai_confidence: 0.99,
      human_verified: false
    }
  ],
  lastUpdated: new Date().toISOString()
};

// Call the webhook function
const result = window.receiveWebhookData(testData);
console.log("Webhook test result:", result);`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WebhookDocs;
