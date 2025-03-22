
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
  // Meat & Poultry
  {
    id: "chicken-raw",
    name: "Chicken (Raw)",
    imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["poultry", "protein", "raw"]
  },
  {
    id: "chicken-cooked",
    name: "Chicken (Cooked)",
    imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["poultry", "protein", "cooked", "leftovers"]
  },
  {
    id: "ground-beef",
    name: "Ground Beef",
    imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["beef", "raw", "protein"]
  },
  {
    id: "steak",
    name: "Steak",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["beef", "protein", "red meat"]
  },
  {
    id: "pork-chops",
    name: "Pork Chops",
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f7c9a6559?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["pork", "protein"]
  },
  {
    id: "bacon",
    name: "Bacon",
    imageUrl: "https://images.unsplash.com/photo-1606851091851-e8c8c0fca9fa?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["pork", "breakfast", "cured"]
  },
  {
    id: "ham",
    name: "Ham",
    imageUrl: "https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["pork", "cured", "deli"]
  },
  {
    id: "turkey-raw",
    name: "Turkey (Raw)",
    imageUrl: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["poultry", "protein", "thanksgiving", "raw"]
  },
  {
    id: "turkey-cooked",
    name: "Turkey (Cooked)",
    imageUrl: "https://images.unsplash.com/photo-1574672280895-2f44a9fa6555?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["poultry", "protein", "thanksgiving", "cooked", "leftovers"]
  },
  {
    id: "sausage",
    name: "Sausage",
    imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["pork", "beef", "processed", "breakfast"]
  },
  {
    id: "hot-dogs",
    name: "Hot Dogs",
    imageUrl: "https://images.unsplash.com/photo-1619740455993-9e612b1dad68?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["processed", "beef", "pork", "quick meal"]
  },
  {
    id: "deli-meats",
    name: "Deli Meats",
    imageUrl: "https://images.unsplash.com/photo-1621727206928-8e8b67614d55?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["processed", "sandwich", "lunch", "sliced"]
  },
  {
    id: "duck",
    name: "Duck",
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500&h=300&fit=crop",
    category: "Meat & Poultry",
    tags: ["poultry", "game", "protein"]
  },
  
  // Seafood
  {
    id: "salmon",
    name: "Salmon",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["fish", "omega-3", "protein"]
  },
  {
    id: "tuna",
    name: "Tuna",
    imageUrl: "https://images.unsplash.com/photo-1597733153203-a54d0c2cf3a8?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["fish", "protein", "omega-3"]
  },
  {
    id: "shrimp",
    name: "Shrimp",
    imageUrl: "https://images.unsplash.com/photo-1565280654386-467de9c95467?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["shellfish", "protein", "quick cooking"]
  },
  {
    id: "cod",
    name: "Cod",
    imageUrl: "https://images.unsplash.com/photo-1614626740168-7e218c2a1b8b?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["fish", "white fish", "protein"]
  },
  {
    id: "tilapia",
    name: "Tilapia",
    imageUrl: "https://images.unsplash.com/photo-1595504591003-288c9c5d078c?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["fish", "white fish", "mild flavor"]
  },
  {
    id: "crab",
    name: "Crab",
    imageUrl: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["shellfish", "protein", "special occasion"]
  },
  {
    id: "lobster",
    name: "Lobster",
    imageUrl: "https://images.unsplash.com/photo-1545778083-a8add216d07b?w=500&h=300&fit=crop",
    category: "Seafood",
    tags: ["shellfish", "protein", "luxury"]
  },
  
  // Dairy Products
  {
    id: "milk",
    name: "Milk",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["drink", "calcium", "protein"]
  },
  {
    id: "eggs",
    name: "Eggs",
    imageUrl: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["protein", "breakfast", "baking"]
  },
  {
    id: "butter",
    name: "Butter",
    imageUrl: "https://images.unsplash.com/photo-1589985270958-bf087f81139a?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["fat", "baking", "cooking"]
  },
  {
    id: "yogurt",
    name: "Yogurt",
    imageUrl: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["probiotic", "breakfast", "snack", "protein"]
  },
  {
    id: "cream-cheese",
    name: "Cream Cheese",
    imageUrl: "https://images.unsplash.com/photo-1650545015432-d4b987c63d20?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["cheese", "spread", "bagel", "breakfast"]
  },
  {
    id: "cheddar-cheese",
    name: "Cheddar Cheese",
    imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["cheese", "hard cheese", "snack"]
  },
  {
    id: "mozzarella",
    name: "Mozzarella",
    imageUrl: "https://images.unsplash.com/photo-1570991210395-5dfc60f7bb3a?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["cheese", "pizza", "italian", "fresh cheese"]
  },
  {
    id: "cheese",
    name: "Cheese",
    imageUrl: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&h=300&fit=crop",
    category: "Dairy",
    tags: ["protein", "calcium", "cheddar", "swiss"]
  },
  
  // Fruits
  {
    id: "apple",
    name: "Apple",
    imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["sweet", "fiber", "red", "green"]
  },
  {
    id: "bananas",
    name: "Bananas",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["potassium", "fruit", "yellow"]
  },
  {
    id: "oranges",
    name: "Oranges",
    imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9041525?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["citrus", "vitamin c", "orange"]
  },
  {
    id: "grapes",
    name: "Grapes",
    imageUrl: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["sweet", "snack", "green", "red", "purple"]
  },
  {
    id: "strawberries",
    name: "Strawberries",
    imageUrl: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["berries", "red", "sweet", "vitamin c"]
  },
  {
    id: "blueberries",
    name: "Blueberries",
    imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["berries", "blue", "antioxidants", "small"]
  },
  {
    id: "avocados",
    name: "Avocados",
    imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=500&h=300&fit=crop",
    category: "Fruit",
    tags: ["healthy fats", "guacamole", "green"]
  },
  
  // Vegetables
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
    id: "potatoes",
    name: "Potatoes",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["starchy", "side dish", "root vegetable"]
  },
  {
    id: "onions",
    name: "Onions",
    imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["aromatic", "cooking base", "savory"]
  },
  {
    id: "carrots",
    name: "Carrots",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["orange", "root vegetable", "crunchy"]
  },
  {
    id: "broccoli",
    name: "Broccoli",
    imageUrl: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["green", "cruciferous", "florets"]
  },
  {
    id: "spinach",
    name: "Spinach",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=300&fit=crop",
    category: "Vegetables",
    tags: ["green", "leafy", "iron", "salad"]
  },
  
  // Baked Goods
  {
    id: "bread",
    name: "Bread",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["grain", "wheat", "carbs"]
  },
  {
    id: "bagels",
    name: "Bagels",
    imageUrl: "https://images.unsplash.com/photo-1592248514136-67444372bd39?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["breakfast", "bread", "toasted"]
  },
  {
    id: "cookies",
    name: "Cookies",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["dessert", "sweet", "baked", "snack"]
  },
  {
    id: "cake",
    name: "Cake",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["dessert", "sweet", "celebration", "birthday"]
  },
  {
    id: "donuts",
    name: "Donuts",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["sweet", "breakfast", "fried", "glazed"]
  },
  {
    id: "muffins",
    name: "Muffins",
    imageUrl: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=300&fit=crop",
    category: "Bakery",
    tags: ["breakfast", "sweet", "baked", "blueberry"]
  },
  
  // Prepared Foods & Leftovers
  {
    id: "pizza",
    name: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop",
    category: "Prepared Foods",
    tags: ["italian", "fast food", "cheese", "takeout", "leftovers"]
  },
  {
    id: "pasta",
    name: "Pasta",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=300&fit=crop",
    category: "Prepared Foods",
    tags: ["italian", "dinner", "leftovers", "sauce"]
  },
  {
    id: "rice",
    name: "Rice (Cooked)",
    imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&h=300&fit=crop",
    category: "Prepared Foods",
    tags: ["grain", "side dish", "leftovers"]
  },
  {
    id: "soup",
    name: "Soup",
    imageUrl: "https://images.unsplash.com/photo-1605709303005-0ceacc0c5ca9?w=500&h=300&fit=crop",
    category: "Prepared Foods",
    tags: ["hot", "comfort food", "leftovers"]
  },
  
  // Pantry & Dry Goods
  {
    id: "flour",
    name: "Flour",
    imageUrl: "https://images.unsplash.com/photo-1621955964441-c173e01c6eca?w=500&h=300&fit=crop",
    category: "Pantry",
    tags: ["baking", "dry goods", "wheat"]
  },
  {
    id: "sugar",
    name: "Sugar",
    imageUrl: "https://images.unsplash.com/photo-1625525652558-f10e7004d11d?w=500&h=300&fit=crop",
    category: "Pantry",
    tags: ["baking", "sweet", "granulated"]
  },
  {
    id: "rice-dry",
    name: "Rice (Uncooked)",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&h=300&fit=crop",
    category: "Pantry",
    tags: ["grain", "dry goods", "staple"]
  },
  
  // Condiments & Sauces
  {
    id: "ketchup",
    name: "Ketchup",
    imageUrl: "https://images.unsplash.com/photo-1613519524584-26a191b9cd71?w=500&h=300&fit=crop",
    category: "Condiments",
    tags: ["sauce", "tomato", "fast food"]
  },
  {
    id: "mayonnaise",
    name: "Mayonnaise",
    imageUrl: "https://images.unsplash.com/photo-1642296465105-c14bb5fefef1?w=500&h=300&fit=crop",
    category: "Condiments",
    tags: ["sauce", "egg-based", "sandwich"]
  },
  {
    id: "mustard",
    name: "Mustard",
    imageUrl: "https://images.unsplash.com/photo-1528750717929-32abb73d3bd9?w=500&h=300&fit=crop",
    category: "Condiments",
    tags: ["sauce", "tangy", "yellow"]
  },
  
  // Beverages
  {
    id: "orange-juice",
    name: "Orange Juice",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=300&fit=crop",
    category: "Beverages",
    tags: ["drink", "breakfast", "vitamin c"]
  },
  {
    id: "apple-juice",
    name: "Apple Juice",
    imageUrl: "https://images.unsplash.com/photo-1620830408053-473886aacda2?w=500&h=300&fit=crop",
    category: "Beverages",
    tags: ["drink", "sweet", "fruit juice"]
  },
  
  // Frozen Foods
  {
    id: "ice-cream",
    name: "Ice Cream",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=300&fit=crop",
    category: "Frozen Foods",
    tags: ["dessert", "sweet", "cold", "treat"]
  },
  {
    id: "frozen-vegetables",
    name: "Frozen Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1599210692478-d0513d4abd36?w=500&h=300&fit=crop",
    category: "Frozen Foods",
    tags: ["vegetables", "quick", "preserved"]
  },
  
  // Specialty Items
  {
    id: "tofu",
    name: "Tofu",
    imageUrl: "https://images.unsplash.com/photo-1626711934535-9749ea933616?w=500&h=300&fit=crop",
    category: "Specialty Items",
    tags: ["vegetarian", "protein", "soy", "plant-based"]
  },
  {
    id: "kimchi",
    name: "Kimchi",
    imageUrl: "https://images.unsplash.com/photo-1583224565226-200f709694a4?w=500&h=300&fit=crop",
    category: "Specialty Items",
    tags: ["fermented", "korean", "spicy", "probiotic"]
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
