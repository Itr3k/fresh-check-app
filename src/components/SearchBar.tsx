
import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  id?: string;
  initialValue?: string;
  placeholder?: string;
}

const SearchBar = ({ 
  onSearch, 
  id = "search-bar", 
  initialValue = "",
  placeholder = "Search for any food..."
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
    
    // Call onSearch on every change to provide real-time filtering
    if (onSearch) {
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
            ? "bg-white shadow-lg rounded-xl ring-2 ring-primary/20" 
            : "bg-white/80 backdrop-blur-sm shadow-md rounded-xl"
        }`}
      >
        <div className="absolute left-4 text-muted-foreground">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-4 px-12 bg-transparent focus:outline-none text-base"
        />
      </form>
    </motion.div>
  );
};

export default SearchBar;
