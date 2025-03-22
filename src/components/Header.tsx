
import { Search, Bell, AlertOctagon } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Header = () => {
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
            <Link to="/recalls">
              <Button 
                variant="destructive" 
                size="sm" 
                className="gap-1 px-3 py-1.5 rounded-full"
              >
                <AlertOctagon size={16} />
                <span className="text-xs font-medium">Recalls</span>
              </Button>
            </Link>
          ) : (
            <Link 
              to="/recalls" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors"
            >
              <AlertOctagon size={16} />
              <span className="text-sm font-medium">Recalls</span>
            </Link>
          )}
          <Link 
            to="/search" 
            className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
          >
            <Search size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
