
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Drumstick, Milk, Apple, Croissant } from 'lucide-react';

export const categories = [
  {
    id: 'meat',
    name: 'Meat & Poultry',
    description: 'Storage guide for chicken, beef, and more',
    icon: Drumstick,
    color: 'bg-red-100',
    ariaLabel: 'Browse meat and poultry storage guides'
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    description: 'Storage guide for milk, cheese, eggs, and more',
    icon: Milk,
    color: 'bg-blue-100',
    ariaLabel: 'Browse dairy products storage guides'
  },
  {
    id: 'produce',
    name: 'Fruits & Vegetables',
    description: 'Storage guide for fresh produce',
    icon: Apple,
    color: 'bg-green-100',
    ariaLabel: 'Browse fruits and vegetables storage guides'
  },
  {
    id: 'baked-goods',
    name: 'Baked Goods',
    description: 'Storage guide for bread, pastries, and more',
    icon: Croissant,
    color: 'bg-yellow-100',
    ariaLabel: 'Browse baked goods storage guides'
  }
];

const CategoryCards = () => {
  return (
    <section className="mt-8" aria-labelledby="category-heading">
      <motion.h2 
        id="category-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold mb-4"
      >
        Browse by Category
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/categories/${category.id}`}
                className="flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all bg-white border border-border"
                aria-label={category.ariaLabel}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${category.color}`} aria-hidden="true">
                  <Icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryCards;
