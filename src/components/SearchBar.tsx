
import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  id?: string;
  initialValue?: string;
  placeholder?: string;
  realTimeSearch?: boolean;
}

const SearchBar = ({ 
  onSearch, 
  id = "search-bar", 
  initialValue = "",
  placeholder = "Search for any food...",
  realTimeSearch = false
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Call onSearch on every change only if realTimeSearch is enabled
    if (onSearch && realTimeSearch) {
      onSearch(newQuery);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full max-w-2xl mx-auto"
      id={id}
    >
      <form 
        onSubmit={handleSearch}
        className={`flex items-center w-full relative overflow-hidden transition-all duration-300 ${
          isFocused 
            ? "bg-white shadow-lg rounded-xl ring-2 ring-primary/30" 
            : "bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg rounded-xl"
        }`}
      >
        <div className="absolute left-4 text-muted-foreground">
          <Search size={22} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-5 px-14 bg-transparent focus:outline-none text-base"
        />
        <button 
          type="submit" 
          className={`absolute right-3 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
        >
          Search
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
