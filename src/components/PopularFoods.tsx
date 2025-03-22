
import { motion } from "framer-motion";
import FoodCard from "./FoodCard";
import { foodData } from "../data/foodData";

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
        {foodData.slice(0, 8).map((food, index) => (
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
