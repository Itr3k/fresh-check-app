
// This file contains shared food data for searching and displaying across the app

export interface FoodItem {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  tags?: string[]; // Optional tags for better searching
}

// Combined food data for the application
export const foodData: FoodItem[] = [
  {
    id: "chicken",
    name: "Chicken",
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop",
    category: "Meat",
    tags: ["poultry", "protein", "meat"]
  },
  {
    id: "milk",
    name: "Milk",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["drink", "calcium"]
  },
  {
    id: "eggs",
    name: "Eggs",
    imageUrl: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["protein", "breakfast"]
  },
  {
    id: "bread",
    name: "Bread",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["grain", "wheat", "carbs"]
  },
  {
    id: "bananas",
    name: "Bananas",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["potassium", "fruit", "yellow"]
  },
  {
    id: "lettuce",
    name: "Lettuce",
    imageUrl: "https://images.unsplash.com/photo-1621262331122-118f92d4d795?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["greens", "salad", "leafy"]
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["red", "sauce", "salad"]
  },
  {
    id: "avocados",
    name: "Avocados",
    imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["healthy fats", "guacamole", "green"]
  },
  {
    id: "beef",
    name: "Beef",
    imageUrl: "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=500&h=300&fit=crop",
    category: "Meat",
    tags: ["red meat", "protein", "steak"]
  },
  {
    id: "duck",
    name: "Duck",
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500&h=300&fit=crop",
    category: "Meat",
    tags: ["poultry", "game", "protein"]
  },
  {
    id: "apple",
    name: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["sweet", "fiber", "red", "green"]
  },
  {
    id: "cheese",
    name: "Cheese",
    imageUrl: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["protein", "calcium", "cheddar", "swiss"]
  }
];

// Helper function to search food data
export const searchFoods = (query: string): FoodItem[] => {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return foodData.filter(food => {
    // Check name match
    if (food.name.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check category match
    if (food.category.toLowerCase().includes(query.toLowerCase())) return true;
    
    // Check tag matches if available
    if (food.tags && food.tags.some(tag => 
      searchTerms.some(term => tag.toLowerCase().includes(term))
    )) return true;
    
    return false;
  });
};
