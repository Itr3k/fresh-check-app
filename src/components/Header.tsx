
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass px-6 py-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SG</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">StillGood</h1>
        </Link>
        <div className="flex items-center space-x-4">
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
