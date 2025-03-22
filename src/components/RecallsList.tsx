
import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertOctagon, AlertCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecalls } from "../contexts/RecallsContext";

// Helper to render severity icon
const getSeverityIcon = (severity: string) => {
  switch(severity) {
    case "high":
      return <AlertOctagon size={20} className="text-destructive" />;
    case "medium":
      return <AlertCircle size={20} className="text-yellow-500" />;
    case "low":
      return <AlertTriangle size={20} className="text-blue-500" />;
    default:
      return <AlertTriangle size={20} className="text-blue-500" />;
  }
};

// Helper to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

interface RecallsListProps {
  searchQuery: string;
}

const RecallsList = ({ searchQuery }: RecallsListProps) => {
  const { loading, error, searchRecalls } = useRecalls();
  
  // Filter recalls based on search query
  const filteredRecalls = searchRecalls(searchQuery);
  
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-3" />
        <h3 className="text-xl font-medium mb-2">Error Loading Recalls</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }
  
  if (filteredRecalls.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-xl font-medium mb-2">No recalls found</h3>
        <p className="text-muted-foreground">
          {searchQuery ? `No recalls match "${searchQuery}". Try a different search term.` : 
            "There are currently no active recalls in our system."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto space-y-4 mb-8">
      {filteredRecalls.map(recall => (
        <Link to={`/recalls/${recall.id}`} key={recall.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  {getSeverityIcon(recall.severity)}
                  <Badge variant={recall.severity === "high" ? "destructive" : recall.severity === "medium" ? "default" : "secondary"}>
                    {recall.severity.charAt(0).toUpperCase() + recall.severity.slice(1)} Risk
                  </Badge>
                  <Badge variant="outline">{recall.source_agency}</Badge>
                </div>
                <h3 className="text-lg font-semibold line-clamp-1">{recall.product_name}</h3>
                <p className="text-sm text-muted-foreground mb-1">by {recall.brand}</p>
                <p className="text-sm line-clamp-2">{recall.reason}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-muted-foreground">Recalled on {formatDate(recall.recall_date)}</span>
                  <div className="flex items-center text-sm font-medium text-primary">
                    View Details
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecallsList;
