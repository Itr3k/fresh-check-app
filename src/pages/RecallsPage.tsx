
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, AlertTriangle, AlertCircle, AlertOctagon, RefreshCw, Info } from "lucide-react";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RecallsList from "../components/RecallsList";
import AdUnit from "../components/AdUnit";
import { useRecalls } from "../contexts/RecallsContext";
import { toast } from "@/hooks/use-toast";
import WebhookDocs from "../components/WebhookDocs";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from 'emailjs-com';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Email validation schema
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_freshcheck';
const EMAILJS_TEMPLATE_ID = 'template_recall_signup';
const EMAILJS_USER_ID = 'user_freshcheck';

const RecallsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDocs, setShowDocs] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lastUpdated, refreshRecalls, loading } = useRecalls();
  
  // Initialize form with validation
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleRefresh = () => {
    refreshRecalls();
    toast({
      title: "Recalls Updated",
      description: "Recall information has been refreshed",
    });
  };

  const onSubmitEmail = async (data: EmailFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the template parameters
      const templateParams = {
        from_email: data.email,
        to_email: 'korra@elevatedai.co',
        subject: 'New Recall Alert Subscription',
        message: `${data.email} came from FreshCheck.app submission form`,
      };

      // Send the email using EmailJS
      // Note: In production, you would replace the placeholders with actual IDs
      // and properly set up EmailJS in your account
      console.log("Sending email with params:", templateParams);
      
      // In development/demo mode, we'll simulate the API call
      setTimeout(() => {
        console.log("Email submitted:", data.email);
        
        // Show success toast
        toast({
          title: "Subscription Successful",
          description: "You'll receive recall alerts at " + data.email,
        });
        
        // Reset form
        form.reset();
        setIsSubmitting(false);
      }, 1000);
      
      /* 
      // In production, uncomment this code and replace with actual EmailJS IDs
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      );
      */
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to recall alerts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageTransition>
      <Helmet>
        <title>Food Recalls - Current FDA & USDA Safety Alerts | FreshCheck</title>
        <meta 
          name="description" 
          content="Stay informed about the latest food recalls and safety alerts from FDA, USDA, and other agencies. Check if products in your kitchen have been recalled."
        />
        <meta 
          name="keywords" 
          content="food recall, product recall, food safety, FDA recall, USDA recall, food alert, foodborne illness, contamination, allergen alert"
        />
        <link rel="canonical" href="https://freshcheck.app/recalls" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "headline": "Current Food Recalls & Safety Alerts",
              "description": "Stay informed about the latest food recalls and safety alerts from FDA, USDA, and other agencies.",
              "publisher": {
                "@type": "Organization",
                "name": "FreshCheck",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://freshcheck.app/logo.png"
                }
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@type": "Thing",
                      "name": "Food Recall Alerts",
                      "description": "Critical food safety recall information from government agencies"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@type": "Thing",
                      "name": "Product Safety Information",
                      "description": "Details about recalled products including affected lot numbers and dates"
                    }
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Current Food Recalls & Safety Alerts
          </h1>
          <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
            Stay informed about the latest food recalls and safety alerts from official government agencies.
            Check if products in your kitchen have been affected by recent recalls.
          </p>
          
          {/* Educational Content for Recalls */}
          <Card className="max-w-3xl mx-auto mb-8 bg-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <span>Why Food Recalls Matter</span>
              </CardTitle>
              <CardDescription>
                Food recalls are issued when there's a potential risk to consumer health or when products don't meet safety standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Food recalls are typically issued for one of three main reasons:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm mb-4">
                <li><strong>Contamination:</strong> Presence of harmful bacteria like E. coli, Salmonella, or Listeria; physical contaminants like plastic or metal; or chemical contaminants.</li>
                <li><strong>Mislabeling:</strong> Undeclared allergens that pose serious health risks to those with allergies or food sensitivities.</li>
                <li><strong>Quality/Manufacturing Issues:</strong> Products that don't meet quality or manufacturing standards and may pose safety risks.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Checking for recalls regularly helps protect you and your family from potentially hazardous food products.
              </p>
            </CardContent>
          </Card>
          
          {/* Coming Soon Banner */}
          <div className="max-w-3xl mx-auto mb-8 bg-primary/10 border-2 border-primary/30 rounded-lg p-4 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">
              We're working hard to bring you comprehensive food recall information.
              The full functionality of this page will be available shortly.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col gap-4 sm:flex-row items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  className="w-full pl-10"
                  type="text"
                  placeholder="Search for a product or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <AlertOctagon size={16} className="text-destructive" />
                <span className="text-sm">High Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle size={16} className="text-yellow-500" />
                <span className="text-sm">Medium Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={16} className="text-blue-500" />
                <span className="text-sm">Low Risk</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </div>
          </div>
          
          <Separator className="max-w-3xl mx-auto mb-6" />
          
          <RecallsList searchQuery={searchQuery} />
          
          {/* Publisher content and relevant AdUnit */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <span>What To Do If You Have a Recalled Product</span>
              </h3>
              <p className="text-muted-foreground mb-3">
                If you discover that you have purchased a recalled food product, follow these steps to protect yourself and your family:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li><strong>Stop using the product immediately</strong> and do not consume it</li>
                <li><strong>Check the recall details</strong> to confirm if your specific product is affected (lot numbers, expiration dates, etc.)</li>
                <li><strong>Follow the recall instructions</strong> for returning or disposing of the product</li>
                <li><strong>Keep proof of purchase</strong> if you plan to request a refund</li>
                <li><strong>Monitor for symptoms</strong> if you've already consumed the product</li>
                <li><strong>Contact your healthcare provider</strong> if you experience any illness symptoms</li>
              </ol>
            </div>
            
            <AdUnit 
              slotId="recalls-bottom" 
              className="mt-4" 
              format="leaderboard" 
              lazyLoad={true} 
              contentBefore={
                <div className="mb-3 p-3 bg-secondary/20 rounded-lg">
                  <h3 className="text-sm font-medium">Food Recall Resources</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Stay informed with the latest recall information from government agencies to keep your family safe.
                  </p>
                </div>
              }
              contentAfter={
                <div className="mt-3 p-3 bg-secondary/20 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    According to the CDC, 1 in 6 Americans gets sick from contaminated food each year, making food recall awareness critical for public health.
                  </p>
                </div>
              }
            />
          </div>
          
          <div className="mt-8 mb-6 max-w-lg mx-auto p-6 bg-secondary/20 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Stay Updated on Food Recalls</h2>
            <p className="text-muted-foreground mb-4">
              Get alerts when new recalls are issued for the foods you care about.
              We'll notify you about important recalls that could affect your health.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEmail)} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input 
                          placeholder="Your email address" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-muted-foreground mt-3">
              We'll only email you about relevant recalls. You can unsubscribe at any time.
            </p>
          </div>
          
          {/* Hidden developer tools (would be access controlled in production) */}
          <div className="text-center mt-16 mb-4">
            <Button 
              variant="link" 
              size="sm" 
              className="text-muted-foreground"
              onClick={() => setShowDocs(!showDocs)}
            >
              {showDocs ? "Hide" : "Show"} Integration Documentation
            </Button>
          </div>
          
          {showDocs && <WebhookDocs />}
        </main>
      </div>
    </PageTransition>
  );
};

export default RecallsPage;
