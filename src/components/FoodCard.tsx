
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

interface FoodCardProps {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  index?: number;
}

const FoodCard = ({ id, name, imageUrl, category, index = 0 }: FoodCardProps) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop";
  
  const handleImageError = () => {
    console.error(`Image failed to load for ${name}:`, imageUrl);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/food/${id}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="h-32 w-full bg-gray-100 overflow-hidden">
            <img 
              src={imageError ? fallbackImageUrl : imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-foreground truncate">{name}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;
