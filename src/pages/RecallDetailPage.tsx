import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, AlertOctagon, AlertCircle, AlertTriangle, Share2, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AdUnit from "../components/AdUnit";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRecalls } from "../contexts/RecallsContext";

// Helper to render severity icon and color
const getSeverityData = (severity: string) => {
  switch(severity) {
    case "high":
      return {
        icon: <AlertOctagon size={20} className="text-destructive" />,
        color: "bg-destructive/10 border-destructive/30",
        textColor: "text-destructive"
      };
    case "medium":
      return {
        icon: <AlertCircle size={20} className="text-yellow-500" />,
        color: "bg-yellow-500/10 border-yellow-500/30",
        textColor: "text-yellow-600"
      };
    case "low":
      return {
        icon: <AlertTriangle size={20} className="text-blue-500" />,
        color: "bg-blue-500/10 border-blue-500/30",
        textColor: "text-blue-600"
      };
    default:
      return {
        icon: <AlertTriangle size={20} className="text-blue-500" />,
        color: "bg-blue-500/10 border-blue-500/30",
        textColor: "text-blue-600"
      };
  }
};

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const RecallDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecallById, loading } = useRecalls();
  
  // Find the recall with the matching ID
  const recall = id ? getRecallById(id) : undefined;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-secondary rounded w-32"></div>
              <div className="h-10 bg-secondary rounded w-3/4"></div>
              <div className="h-4 bg-secondary rounded w-1/2"></div>
              <div className="h-20 bg-secondary rounded"></div>
              <div className="h-40 bg-secondary rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!recall) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Recall Not Found</h2>
            <p className="mb-6">The recall you're looking for doesn't exist or has been removed.</p>
            <Link to="/recalls">
              <Button>View All Recalls</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const severityData = getSeverityData(recall.severity);
  
  return (
    <PageTransition>
      <Helmet>
        <title>{recall.product_name} Recall: {recall.reason} | FreshCheck Food Safety Alert</title>
        <meta
          name="description"
          content={`Food safety alert: ${recall.product_name} has been recalled due to ${recall.reason}. Check if your purchase is affected.`}
        />
        <meta
          name="keywords"
          content={`food recall, ${recall.product_name} recall, ${recall.brand} recall, food safety, FDA recall, USDA recall`}
        />
        <link rel="canonical" href={`https://freshcheck.app/recalls/${recall.id}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": "${recall.product_name} Recall Due to ${recall.reason}",
              "datePublished": "${new Date(recall.publish_date).toISOString()}",
              "dateModified": "${new Date(recall.publish_date).toISOString()}",
              "description": "Food safety alert: ${recall.product_name} has been recalled due to ${recall.reason}. Check if your purchase is affected.",
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
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link to="/recalls" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft size={16} className="mr-1" />
                Back to All Recalls
              </Link>
            </div>
            
            <div className={`p-4 border rounded-lg mb-6 ${severityData.color}`}>
              <div className="flex items-center gap-2">
                {severityData.icon}
                <span className={`font-medium ${severityData.textColor}`}>
                  {recall.severity.charAt(0).toUpperCase() + recall.severity.slice(1)} Risk Recall
                </span>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{recall.product_name} Recall</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {recall.brand} • Recalled on {formatDate(recall.recall_date)}
            </p>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="outline">{recall.source_agency}</Badge>
              <Badge variant="outline">{recall.category.charAt(0).toUpperCase() + recall.category.slice(1)}</Badge>
              <Badge variant="outline">{recall.status.charAt(0).toUpperCase() + recall.status.slice(1)}</Badge>
              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 size={14} className="mr-1" />
                Share
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recall Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Reason for Recall</h3>
                    <p>{recall.reason}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Product Information</h3>
                    <p>{recall.details}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Affected Products</h3>
                    <ul className="list-disc list-inside">
                      {recall.affected_products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Geographic Scope</h3>
                    <p>{recall.geographic_scope}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">What Should You Do?</h2>
                <p className="mb-4">{recall.instructions}</p>
                
                <a 
                  href={recall.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  View original recall notice
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </CardContent>
            </Card>
            
            <div className="text-xs text-muted-foreground mb-8 flex items-center justify-between">
              <div>
                Information processed by FreshCheck AI from {recall.source_agency}
                {recall.human_verified && <span className="ml-1">• Verified by our team</span>}
              </div>
              <div>
                Published: {formatDate(recall.publish_date)}
              </div>
            </div>
            
            <Separator className="mb-8" />
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Related Foods</h2>
              <p className="text-muted-foreground">
                Check expiration information for foods similar to {recall.product_name}:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-medium">View {recall.category.charAt(0).toUpperCase() + recall.category.slice(1)}</h3>
                    <p className="text-sm text-muted-foreground">See storage guidelines</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <AdUnit slotId="recall-detail" className="mt-8" format="leaderboard" lazyLoad={true} />
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default RecallDetailPage;
