
import { motion } from "framer-motion";
import FoodCard from "./FoodCard";

// Updated data for popular foods with more reliable image URLs
const popularFoods = [
  {
    id: "chicken",
    name: "Chicken",
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop",
    category: "Meat"
  },
  {
    id: "milk",
    name: "Milk",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop",
    category: "Dairy"
  },
  {
    id: "eggs",
    name: "Eggs",
    imageUrl: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=500&h=300&fit=crop",
    category: "Dairy"
  },
  {
    id: "bread",
    name: "Bread",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop",
    category: "Bakery"
  },
  {
    id: "bananas",
    name: "Bananas",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=300&fit=crop",
    category: "Fruit"
  },
  {
    id: "lettuce",
    name: "Lettuce",
    imageUrl: "https://images.unsplash.com/photo-1621262331122-118f92d4d795?w=500&h=300&fit=crop",
    category: "Vegetables"
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=300&fit=crop",
    category: "Vegetables"
  },
  {
    id: "avocados",
    name: "Avocados",
    imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=500&h=300&fit=crop",
    category: "Fruit"
  }
];

const PopularFoods = () => {
  return (
    <div className="mt-8">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold mb-4"
      >
        Popular Foods
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {popularFoods.map((food, index) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            imageUrl={food.imageUrl}
            category={food.category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularFoods;
