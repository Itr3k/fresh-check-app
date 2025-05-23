
import { motion } from "framer-motion";
import FoodCard from "./FoodCard";
import { foodData } from "../data/foodData";

const PopularFoods = () => {
  // Select a diverse set of popular foods to display
  const popularFoods = foodData.filter(food => 
    ["chicken-raw", "milk", "eggs", "bread", "apple", "bananas", "lettuce", 
     "tomatoes", "cheddar-cheese", "salmon", "rice", "pizza", "ice-cream", 
     "orange-juice", "bacon", "tofu"].includes(food.id)
  );

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
