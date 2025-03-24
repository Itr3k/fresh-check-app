
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Search } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import AdUnit from '@/components/AdUnit';

const NotFound = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Page Not Found | FreshCheck</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* First ad placement - top of content */}
        <div className="my-6">
          <AdUnit slotId="not-found-top" format="leaderboard" />
        </div>
        
        <div className="space-y-8 mb-12">
          <div className="bg-muted/30 border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">You might be looking for:</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary hover:underline flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-primary hover:underline flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search Foods
                </Link>
              </li>
              <li>
                <Link to="/food-safety/temperature-danger-zone" className="text-primary hover:underline flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Food Safety Guides
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="not-found-middle" format="rectangle" />
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Popular Food Categories</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" asChild size="sm">
                <Link to="/categories/dairy">Dairy</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link to="/categories/fruits">Fruits</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link to="/categories/vegetables">Vegetables</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link to="/categories/meat">Meat</Link>
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link to="/categories/seafood">Seafood</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Third ad placement - bottom of content */}
        <div className="my-6">
          <AdUnit slotId="not-found-bottom" format="leaderboard" lazyLoad={true} />
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/">Return to Home Page</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
