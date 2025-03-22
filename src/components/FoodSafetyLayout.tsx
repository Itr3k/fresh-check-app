
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { cn } from '@/lib/utils';

interface FoodSafetyLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  children: React.ReactNode;
  keywords?: string;
}

const FoodSafetyLayout = ({
  title,
  description,
  icon,
  iconBgColor,
  iconTextColor,
  children,
  keywords = ''
}: FoodSafetyLayoutProps) => {
  return (
    <PageTransition>
      <Helmet>
        <title>{title} | FoodSafe</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`food safety, ${keywords}`} />
      </Helmet>
      
      <div className="container px-4 py-6 mx-auto max-w-5xl">
        <Link to="/" className="inline-block mb-4">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="mb-6">
          <div className={cn("inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full", iconBgColor, iconTextColor)}>
            {icon}
            <span className="ml-1.5">Food Safety Education</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-base md:text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {children}

        <div className="mt-12 pt-6 border-t">
          <h2 className="text-lg font-medium mb-4">More Food Safety Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <RelatedLink
              title="Temperature Danger Zone"
              url="/food-safety/temperature-danger-zone"
              currentPage={title}
            />
            <RelatedLink
              title="Foodborne Illness Prevention"
              url="/food-safety/foodborne-illness-prevention"
              currentPage={title}
            />
            <RelatedLink
              title="Prevent Cross-Contamination"
              url="/food-safety/prevent-cross-contamination"
              currentPage={title}
            />
            <RelatedLink
              title="Food Safety for Vulnerable Groups"
              url="/food-safety/vulnerable-groups"
              currentPage={title}
            />
            <RelatedLink
              title="Holiday & Event Safety"
              url="/food-safety/holiday-events"
              currentPage={title}
            />
            <RelatedLink
              title="Science of Food Spoilage"
              url="/food-safety/science-of-spoilage"
              currentPage={title}
            />
            <RelatedLink
              title="Emergency Food Safety"
              url="/food-safety/emergency"
              currentPage={title}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const RelatedLink = ({ title, url, currentPage }: { title: string; url: string; currentPage: string }) => {
  if (title === currentPage) return null;
  
  return (
    <Link 
      to={url} 
      className="p-3 rounded-md border border-border hover:bg-muted/50 transition-colors flex items-center"
    >
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

export default FoodSafetyLayout;
