
// This file contains data for all ingredient articles
// It can be expanded as more articles are added

export interface IngredientArticle {
  slug: string;
  title: string;
  description: string;
  category: 'preservative' | 'color' | 'sweetener' | 'flavor' | 'additive' | 'other';
  safetyLevel: 'safe' | 'caution' | 'avoid';
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
  imageAlt?: string;
}

export const ingredientArticles: IngredientArticle[] = [
  {
    slug: "bha-butylated-hydroxyanisole",
    title: "What is BHA? Why This Common Preservative Is Controversial",
    description: "Learn about BHA (Butylated Hydroxyanisole), a common food preservative used to prevent rancidity, its potential health concerns, regulatory status, and natural alternatives.",
    category: "preservative",
    safetyLevel: "caution",
    datePublished: "2024-05-17",
    dateModified: "2024-05-17",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    imageAlt: "Packaged food products that commonly contain BHA preservative"
  },
  {
    slug: "red-40-food-coloring",
    title: "The Truth About Red 40: Food Coloring and ADHD",
    description: "Explore Red 40 (Allura Red), a common synthetic food dye and its potential links to hyperactivity, ADHD, and other health concerns. Learn where it's found and natural alternatives.",
    category: "color",
    safetyLevel: "avoid",
    datePublished: "2024-05-17",
    dateModified: "2024-05-17",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    imageAlt: "Various brightly colored foods and candies containing artificial food dyes"
  },
  {
    slug: "natural-flavors",
    title: "Natural Flavors: What the Label Doesn't Tell You",
    description: "Discover what 'natural flavors' on food labels really means, how these ingredients are made, potential concerns, and why they aren't always as natural as they sound.",
    category: "flavor",
    safetyLevel: "caution",
    datePublished: "2024-05-17", 
    dateModified: "2024-05-17",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    imageAlt: "Assortment of spices and flavor ingredients used in food production"
  },
  {
    slug: "aspartame",
    title: "Aspartame in Diet Drinks: Safe or Risky?",
    description: "Examine the science behind aspartame, one of the most studied and controversial artificial sweeteners used in diet sodas and low-calorie products.",
    category: "sweetener",
    safetyLevel: "caution",
    datePublished: "2024-05-17",
    dateModified: "2024-05-17",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    imageAlt: "Diet soda cans and bottles containing aspartame sweetener"
  }
];

// Export a function to get an article by slug
export const getIngredientBySlug = (slug: string): IngredientArticle | undefined => {
  return ingredientArticles.find(article => article.slug === slug);
};
