
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AdUnit from "@/components/AdUnit";
import FoodCard from "@/components/FoodCard";

interface CategoryInfo {
  title: string;
  description: string;
  intro: string;
  metaDescription: string;
  foodItems: {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
  }[];
}

const getCategoryInfo = (categoryId: string): CategoryInfo => {
  const categories: Record<string, CategoryInfo> = {
    "meat": {
      title: "Meat & Poultry Storage Guide",
      description: "Food Storage Guide: Meat Products",
      intro: "Proper storage of meat and poultry is essential for food safety. These protein-rich foods are highly perishable and require specific temperature controls to prevent bacterial growth and foodborne illness. Follow our expert guidelines for storing different types of meat and poultry safely.",
      metaDescription: "Learn how to properly store meat and poultry. Expert storage guidelines for chicken, beef, pork, and other meat products to prevent spoilage and foodborne illness.",
      foodItems: [
        {
          id: "chicken",
          name: "Chicken",
          imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=300&fit=crop",
          category: "Meat"
        },
        {
          id: "beef",
          name: "Beef",
          imageUrl: "https://images.unsplash.com/photo-1551355716-22e3db76b265?w=500&h=300&fit=crop",
          category: "Meat"
        },
        {
          id: "turkey",
          name: "Turkey",
          imageUrl: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=500&h=300&fit=crop",
          category: "Meat"
        },
        {
          id: "pork",
          name: "Pork",
          imageUrl: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962fd?w=500&h=300&fit=crop",
          category: "Meat"
        }
      ]
    },
    "dairy": {
      title: "Dairy Products Storage Guide",
      description: "Food Storage Guide: Dairy Products",
      intro: "Dairy products require careful storage to maintain freshness and prevent spoilage. Temperature control is crucial for dairy items, which can quickly develop harmful bacteria when stored improperly. Use our storage guidelines to maximize the shelf life of your milk, cheese, yogurt, and other dairy products.",
      metaDescription: "Learn how to properly store dairy products like milk, cheese, yogurt, and eggs. Expert storage guidelines to keep dairy fresh and prevent spoilage.",
      foodItems: [
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
          id: "cheese",
          name: "Cheese",
          imageUrl: "https://images.unsplash.com/photo-1552767059-ce182eda88cc?w=500&h=300&fit=crop",
          category: "Dairy"
        },
        {
          id: "yogurt",
          name: "Yogurt",
          imageUrl: "https://images.unsplash.com/photo-1571212515416-fca988083f35?w=500&h=300&fit=crop",
          category: "Dairy"
        }
      ]
    },
    "produce": {
      title: "Fruits & Vegetables Storage Guide",
      description: "Food Storage Guide: Fruits & Vegetables",
      intro: "Fresh fruits and vegetables require different storage methods to maximize freshness and prevent early spoilage. Some produce items emit ethylene gas, which can speed ripening in other fruits and vegetables. Our storage guide helps you understand which items to refrigerate, which to keep at room temperature, and how to keep your produce fresh longer.",
      metaDescription: "Expert guide on storing fruits and vegetables properly. Learn which produce to refrigerate and which to keep at room temperature for maximum freshness and shelf life.",
      foodItems: [
        {
          id: "bananas",
          name: "Bananas",
          imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&h=300&fit=crop",
          category: "Fruit"
        },
        {
          id: "tomatoes",
          name: "Tomatoes",
          imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&h=300&fit=crop",
          category: "Vegetables"
        },
        {
          id: "lettuce",
          name: "Lettuce",
          imageUrl: "https://images.unsplash.com/photo-1621262331122-118f92d4d795?w=500&h=300&fit=crop",
          category: "Vegetables"
        },
        {
          id: "avocados",
          name: "Avocados",
          imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=500&h=300&fit=crop",
          category: "Fruit"
        },
        {
          id: "apples",
          name: "Apples",
          imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&h=300&fit=crop",
          category: "Fruit"
        },
        {
          id: "oranges",
          name: "Oranges",
          imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9b834c8?w=500&h=300&fit=crop",
          category: "Fruit"
        }
      ]
    },
    "baked-goods": {
      title: "Baked Goods Storage Guide",
      description: "Food Storage Guide: Baked Goods",
      intro: "Baked goods like bread, pastries, and cakes have varying shelf lives and storage requirements. Proper storage is essential to prevent them from becoming stale or moldy. Our guide provides expert tips on storing different types of baked goods to maintain freshness, texture, and flavor for as long as possible.",
      metaDescription: "Expert guide on storing bread, pastries, and other baked goods. Learn how to keep baked items fresh and prevent mold and staleness.",
      foodItems: [
        {
          id: "bread",
          name: "Bread",
          imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop",
          category: "Bakery"
        },
        {
          id: "flour",
          name: "Flour",
          imageUrl: "https://images.unsplash.com/photo-1608197492882-e49d08228f4e?w=500&h=300&fit=crop",
          category: "Bakery"
        },
        {
          id: "pastries",
          name: "Pastries",
          imageUrl: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500&h=300&fit=crop",
          category: "Bakery"
        },
        {
          id: "cookies",
          name: "Cookies",
          imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=300&fit=crop",
          category: "Bakery"
        }
      ]
    }
  };

  return categories[categoryId] || {
    title: "Food Category",
    description: "Food Storage Guide",
    intro: "Proper food storage is essential for maintaining freshness and preventing foodborne illness. Follow our expert guidelines for storing different types of foods safely.",
    metaDescription: "Learn how to properly store food items. Expert storage guidelines to prevent spoilage and foodborne illness.",
    foodItems: []
  };
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      setCategory(getCategoryInfo(categoryId));
      setLoading(false);
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Category not found</h2>
          <p className="text-muted-foreground mb-4">We couldn't find the category you're looking for.</p>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Schema markup for CategoryPage
  const foodItemSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": category.foodItems.map((food, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "name": `How Long Does ${food.name} Last?`,
        "url": `https://freshcheck.app/food/${food.id}`
      }
    }))
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{category.title} | FreshCheck</title>
        <meta name="description" content={category.metaDescription} />
        <meta property="og:title" content={category.title} />
        <meta property="og:description" content={category.metaDescription} />
        <link rel="canonical" href={`https://freshcheck.app/categories/${categoryId}`} />
        <script type="application/ld+json">{JSON.stringify(foodItemSchema)}</script>
      </Helmet>

      <div className="pt-20 pb-12 max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-semibold mb-4">{category.description}</h1>
          <p className="text-muted-foreground mb-6">{category.intro}</p>
        </motion.div>

        <AdUnit slotId={`category-${categoryId}-top`} className="mb-6" format="leaderboard" />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Storage Guide for {category.title.split("Storage Guide")[0].trim()}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {category.foodItems.map((food, index) => (
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

        <AdUnit slotId={`category-${categoryId}-bottom`} className="mb-6" format="leaderboard" lazyLoad={true} />

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Common Storage Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">How do I know if my {categoryId === 'produce' ? 'fruits and vegetables' : categoryId} have gone bad?</h3>
              <p className="text-sm">
                Look for visual cues like discoloration, mold, or unusual texture. Trust your nose - most spoiled foods develop off odors. 
                When in doubt, it's safer to discard food that might be spoiled than risk foodborne illness.
              </p>
            </div>
            
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What's the best way to store {categoryId === 'produce' ? 'fruits and vegetables' : categoryId}?</h3>
              <p className="text-sm">
                {categoryId === 'meat' && "Most meat products should be stored in the refrigerator at temperatures below 40°F (4°C) and used within a few days of purchase. For longer storage, freezing at 0°F (-18°C) is recommended."}
                {categoryId === 'dairy' && "Dairy products should be stored in the refrigerator at temperatures between 34-40°F (1-4°C). Keep dairy products in their original containers and store them away from strongly flavored foods as they can absorb odors."}
                {categoryId === 'produce' && "Some produce like tomatoes, bananas and avocados should be stored at room temperature until ripe. Most others benefit from refrigeration. Store fruits and vegetables separately, as many fruits emit ethylene gas which can speed up ripening or spoilage of vegetables."}
                {categoryId === 'baked-goods' && "Most breads and baked goods can be stored at room temperature in airtight containers for a few days. For longer storage, many baked goods freeze well. Avoid refrigerating bread as it can actually accelerate staling."}
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground mt-8">
          Information verified using USDA and FDA guidelines
        </div>
      </div>
    </PageTransition>
  );
};

export default CategoryPage;
