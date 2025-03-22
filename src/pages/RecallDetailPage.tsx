
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, AlertOctagon, AlertCircle, AlertTriangle, Share2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AdUnit from "../components/AdUnit";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for recalls - this would come from the AI service in the real implementation
const mockRecalls = [
  {
    id: "rec001",
    product_name: "Organic Baby Spinach",
    brand: "Fresh Greens",
    category: "vegetables",
    recall_date: "2023-11-15",
    publish_date: "2023-11-16",
    severity: "high",
    reason: "E. coli contamination",
    details: "Fresh Greens Organic Baby Spinach has been recalled due to potential contamination with E. coli O157:H7. The affected products were distributed nationwide in 5oz plastic containers with 'best if used by' dates of 11/20/2023 through 11/25/2023.",
    affected_products: ["5oz containers", "10oz containers", "16oz family size"],
    geographic_scope: "Nationwide",
    source_url: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
    source_agency: "FDA",
    instructions: "Consumers who have purchased Fresh Greens Organic Baby Spinach are urged not to consume the product and to return it to the place of purchase for a full refund. Consumers with questions may contact the company at 1-800-555-1234.",
    status: "active",
    ai_confidence: 0.95,
    human_verified: true
  },
  {
    id: "rec002",
    product_name: "Chocolate Chip Cookies",
    brand: "Sweet Treats",
    category: "desserts",
    recall_date: "2023-11-10",
    publish_date: "2023-11-11",
    severity: "medium",
    reason: "Undeclared peanut allergen",
    details: "Sweet Treats is recalling its 12 oz packages of Chocolate Chip Cookies because they may contain undeclared peanuts. People who have allergies to peanuts run the risk of serious or life-threatening allergic reaction if they consume these products.",
    affected_products: ["12oz packages with lot codes 234A through 238C"],
    geographic_scope: "California, Nevada, Arizona",
    source_url: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
    source_agency: "FDA",
    instructions: "Consumers who have purchased 12 oz packages of Chocolate Chip Cookies are urged to return them to the place of purchase for a full refund. Consumers with questions may contact the company at 1-800-555-5678.",
    status: "active",
    ai_confidence: 0.92,
    human_verified: true
  },
  {
    id: "rec003",
    product_name: "Ground Beef",
    brand: "Prime Meats",
    category: "meat",
    recall_date: "2023-11-05",
    publish_date: "2023-11-06",
    severity: "high",
    reason: "Possible foreign matter contamination",
    details: "Prime Meats is recalling approximately 28,356 pounds of ground beef products that may be contaminated with extraneous materials, specifically small pieces of metal. The products were shipped to retail locations nationwide.",
    affected_products: ["1lb packages with use by dates of 11/15/2023", "5lb family packs with use by dates of 11/15/2023"],
    geographic_scope: "Nationwide",
    source_url: "https://www.fsis.usda.gov/recalls",
    source_agency: "USDA",
    instructions: "Consumers who have purchased these products are urged not to consume them. These products should be thrown away or returned to the place of purchase. Consumers with food safety questions can call the toll-free USDA Meat and Poultry Hotline at 1-888-MPHotline.",
    status: "active",
    ai_confidence: 0.98,
    human_verified: true
  },
  {
    id: "rec004",
    product_name: "Protein Bars",
    brand: "Fitness Fuel",
    category: "snacks",
    recall_date: "2023-10-28",
    publish_date: "2023-10-29",
    severity: "low",
    reason: "Mislabeled nutrition information",
    details: "Fitness Fuel is recalling certain lots of its Protein Bars due to mislabeled nutrition information. The product contains 15g of protein per bar instead of the labeled 20g.",
    affected_products: ["Chocolate, Vanilla, and Peanut Butter flavors with lot codes P7845 through P7865"],
    geographic_scope: "All 50 states",
    source_url: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
    source_agency: "FDA",
    instructions: "Consumers who have purchased the affected products can continue to consume them or return them for a replacement. For questions, contact customer service at 1-800-555-9876.",
    status: "active",
    ai_confidence: 0.89,
    human_verified: true
  },
  {
    id: "rec005",
    product_name: "Almond Milk",
    brand: "Nature's Best",
    category: "dairy-alternatives",
    recall_date: "2023-10-20",
    publish_date: "2023-10-21",
    severity: "medium",
    reason: "Potential bacterial contamination",
    details: "Nature's Best is recalling its Unsweetened Almond Milk because it has the potential to be contaminated with Listeria monocytogenes, an organism which can cause serious and sometimes fatal infections.",
    affected_products: ["Half gallon containers with best by dates of 12/15/2023 through 01/15/2024"],
    geographic_scope: "Northeast and Mid-Atlantic states",
    source_url: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
    source_agency: "FDA",
    instructions: "Consumers who have purchased Nature's Best Unsweetened Almond Milk are urged to return it to the store where it was purchased for a full refund. Consumers with questions may contact the company at 1-800-555-7890.",
    status: "active",
    ai_confidence: 0.94,
    human_verified: true
  }
];

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
  
  // Find the recall with the matching ID
  const recall = mockRecalls.find(r => r.id === id);
  
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
