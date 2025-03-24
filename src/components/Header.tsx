
import { Search, AlertOctagon, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { memo } from "react";

// Optimize icons to reduce bundle size
const OptimizedIcons = {
  Search: memo(Search),
  AlertOctagon: memo(AlertOctagon),
  Tag: memo(Tag)
};

// Extract navigation items to prevent unnecessary re-renders
const foodSafetyLinks = [
  {
    to: "/food-safety/understanding-food-labels",
    icon: <OptimizedIcons.Tag className="h-4 w-4 text-primary" />,
    title: "Understanding Food Labels",
    description: 'Learn the difference between "Best By," "Use By," and "Sell By" dates'
  },
  {
    to: "/food-safety/temperature-danger-zone",
    icon: <OptimizedIcons.AlertOctagon className="h-4 w-4 text-primary" />,
    title: "Temperature Danger Zone",
    description: "Safe food temperatures and avoiding bacterial growth"
  }
];

// Memoize the header to prevent unnecessary rerenders
const Header = memo(() => {
  const isMobile = useIsMobile();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass px-6 py-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-sm">FC</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Fresh Check</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {isMobile ? (
            <>
              <Link to="/recalls">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="gap-1 px-3 py-1.5 rounded-full"
                >
                  <OptimizedIcons.AlertOctagon size={16} />
                  <span className="text-xs font-medium">Recalls</span>
                </Button>
              </Link>
              <Link 
                to="/food-safety/understanding-food-labels" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Food Labels Guide"
              >
                <OptimizedIcons.Tag size={16} />
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/recalls" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors"
              >
                <OptimizedIcons.AlertOctagon size={16} />
                <span className="text-sm font-medium">Recalls</span>
              </Link>
            </>
          )}
          <Link 
            to="/search" 
            className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Search for foods"
          >
            <OptimizedIcons.Search size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
