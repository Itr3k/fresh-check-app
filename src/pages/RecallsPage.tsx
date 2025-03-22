
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Filter, AlertTriangle, AlertCircle, AlertOctagon, RefreshCw } from "lucide-react";
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

const RecallsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDocs, setShowDocs] = useState(false);
  const { lastUpdated, refreshRecalls, loading } = useRecalls();
  
  const handleRefresh = () => {
    refreshRecalls();
    toast({
      title: "Recalls Updated",
      description: "Recall information has been refreshed",
    });
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
          content="food recall, product recall, food safety, FDA recall, USDA recall"
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
            Check if products in your kitchen have been affected.
          </p>
          
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
          
          <AdUnit slotId="recalls-bottom" className="mt-8" format="leaderboard" lazyLoad={true} />
          
          <div className="mt-8 mb-6 max-w-lg mx-auto p-6 bg-secondary/20 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Stay Updated on Food Recalls</h2>
            <p className="text-muted-foreground mb-4">
              Get alerts when new recalls are issued for the foods you care about.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Your email address" type="email" />
              <Button>Sign Up</Button>
            </div>
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
