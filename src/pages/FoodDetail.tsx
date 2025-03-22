
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Refrigerator, Snowflake, Home, Calendar, Info, BookOpen, ShieldAlert } from "lucide-react";
import StatusIndicator from "../components/StatusIndicator";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";
import { useIsMobile } from "../hooks/use-mobile";

const getFoodDetails = (id: string) => {
  const foodImages: Record<string, string> = {
    chicken: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=400&fit=crop",
    milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop",
    eggs: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=800&h=400&fit=crop",
    bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
    bananas: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=400&fit=crop",
    lettuce: "https://images.unsplash.com/photo-1621262331122-118f92d4d795?w=800&h=400&fit=crop",
    tomatoes: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=400&fit=crop",
    avocados: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&h=400&fit=crop",
    default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop"
  };

  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    imageUrl: foodImages[id] || foodImages.default,
    category: "Food",
    storageOptions: [
      {
        storageType: "refrigerator",
        unopened: {
          minDays: 7,
          maxDays: 14,
          notes: "Keep in original packaging"
        },
        opened: {
          minDays: 3,
          maxDays: 7,
          notes: "Store in airtight container"
        }
      },
      {
        storageType: "freezer",
        unopened: {
          minDays: 30,
          maxDays: 90,
          notes: "Freeze immediately"
        },
        opened: {
          minDays: 30,
          maxDays: 60,
          notes: "Wrap tightly before freezing"
        }
      },
      {
        storageType: "pantry",
        unopened: {
          minDays: 1,
          maxDays: 3,
          notes: "Store in a cool, dry place"
        },
        opened: {
          minDays: 1,
          maxDays: 2,
          notes: "Not recommended for long storage"
        }
      }
    ],
    spoilageIndicators: {
      visual: ["Discoloration", "Mold growth"],
      smell: ["Sour odor", "Ammonia-like smell"],
      texture: ["Slimy surface", "Unusual softness"]
    },
    tips: [
      "Check packaging for manufacturer's recommendations",
      "When in doubt, throw it out",
      "Store away from ethylene-producing fruits"
    ]
  };
};

type StorageType = "refrigerator" | "freezer" | "pantry";

// Function to get related foods based on the current food
const getRelatedFoods = (currentFoodId: string) => {
  // Map foods to their related foods
  const relatedFoodsMap: Record<string, {id: string, name: string, imageUrl: string}[]> = {
    chicken: [
      { id: "turkey", name: "Turkey", imageUrl: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=300&h=200&fit=crop" },
      { id: "beef", name: "Beef", imageUrl: "https://images.unsplash.com/photo-1551355716-22e3db76b265?w=300&h=200&fit=crop" },
      { id: "eggs", name: "Eggs", imageUrl: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=300&h=200&fit=crop" }
    ],
    milk: [
      { id: "eggs", name: "Eggs", imageUrl: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=300&h=200&fit=crop" },
      { id: "cheese", name: "Cheese", imageUrl: "https://images.unsplash.com/photo-1552767059-ce182eda88cc?w=300&h=200&fit=crop" },
      { id: "yogurt", name: "Yogurt", imageUrl: "https://images.unsplash.com/photo-1571212515416-fca988083f35?w=300&h=200&fit=crop" }
    ],
    eggs: [
      { id: "milk", name: "Milk", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop" },
      { id: "chicken", name: "Chicken", imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop" },
      { id: "cheese", name: "Cheese", imageUrl: "https://images.unsplash.com/photo-1552767059-ce182eda88cc?w=300&h=200&fit=crop" }
    ],
    bread: [
      { id: "flour", name: "Flour", imageUrl: "https://images.unsplash.com/photo-1608197492882-e49d08228f4e?w=300&h=200&fit=crop" },
      { id: "pasta", name: "Pasta", imageUrl: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&h=200&fit=crop" },
      { id: "rice", name: "Rice", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=300&h=200&fit=crop" }
    ],
    bananas: [
      { id: "apples", name: "Apples", imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=200&fit=crop" },
      { id: "oranges", name: "Oranges", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9b834c8?w=300&h=200&fit=crop" },
      { id: "strawberries", name: "Strawberries", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=200&fit=crop" }
    ],
    lettuce: [
      { id: "spinach", name: "Spinach", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop" },
      { id: "kale", name: "Kale", imageUrl: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=300&h=200&fit=crop" },
      { id: "tomatoes", name: "Tomatoes", imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop" }
    ],
    tomatoes: [
      { id: "peppers", name: "Peppers", imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop" },
      { id: "onions", name: "Onions", imageUrl: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=300&h=200&fit=crop" },
      { id: "lettuce", name: "Lettuce", imageUrl: "https://images.unsplash.com/photo-1621262331122-118f92d4d795?w=300&h=200&fit=crop" }
    ],
    avocados: [
      { id: "tomatoes", name: "Tomatoes", imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop" },
      { id: "limes", name: "Limes", imageUrl: "https://images.unsplash.com/photo-1622957435923-ae8f70cb0ea3?w=300&h=200&fit=crop" },
      { id: "onions", name: "Onions", imageUrl: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=300&h=200&fit=crop" }
    ],
    // Default related foods for any food not explicitly mapped
    default: [
      { id: "chicken", name: "Chicken", imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop" },
      { id: "milk", name: "Milk", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop" },
      { id: "bananas", name: "Bananas", imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop" }
    ]
  };

  return relatedFoodsMap[currentFoodId] || relatedFoodsMap.default;
};

// Function to get food descriptions and safety information
const getFoodContentDetails = (id: string) => {
  const contentMap: Record<string, { about: string, safety: string }> = {
    chicken: {
      about: "Chicken is one of the most popular protein sources worldwide, valued for its versatility and lean protein content. It's rich in essential nutrients including B vitamins, particularly niacin and B6, as well as minerals like phosphorus and selenium. A 3-ounce serving of skinless chicken breast provides approximately 26 grams of protein with relatively low fat content.",
      safety: "Raw chicken requires careful handling to prevent foodborne illness, particularly from bacteria like Salmonella and Campylobacter. Always store raw chicken at temperatures below 40°F (4°C), use separate cutting boards for preparation, and ensure it reaches an internal temperature of 165°F (74°C) when cooking. Never wash raw chicken as this can spread bacteria around your kitchen surfaces."
    },
    milk: {
      about: "Milk is a nutrient-rich liquid food produced by mammals. Cow's milk, the most commonly consumed variety, provides essential nutrients including calcium, vitamin D, riboflavin, and protein. A single cup (240ml) contains approximately 8 grams of protein and 300mg of calcium, making it an important dietary component for bone health.",
      safety: "Pasteurized milk should be stored at temperatures below 40°F (4°C) at all times. Once opened, milk should be consumed within 5-7 days. Ultra-pasteurized and shelf-stable milk varieties have longer shelf lives but should be refrigerated after opening. Never consume milk that smells sour or appears curdled, as these are signs of spoilage."
    },
    eggs: {
      about: "Eggs are among the most nutritious foods available, containing high-quality protein and a wide range of vitamins and minerals. A single large egg contains about 6 grams of protein and essential nutrients like vitamin D, B12, phosphorus, and antioxidants. Despite past concerns, moderate egg consumption is now considered part of a healthy diet for most people.",
      safety: "Always store eggs in their original carton in the refrigerator at 40°F (4°C) or below. In the US, eggs must be refrigerated due to washing processes that remove the natural protective coating. Never consume eggs with cracked shells, and cook eggs thoroughly until both whites and yolks are firm to reduce the risk of Salmonella. The FDA recommends cooking eggs until the yolk is firm for vulnerable populations."
    },
    bread: {
      about: "Bread is a staple food prepared from a dough of flour and water. It comes in countless varieties worldwide, from whole grain to refined white bread. While whole grain breads provide fiber, protein, and various nutrients like B vitamins and minerals, refined varieties offer less nutritional value but longer shelf life.",
      safety: "Store bread in a cool, dry place away from direct sunlight to prevent mold growth. While commercial bread contains preservatives to extend shelf life, homemade or artisanal breads spoil more quickly. Refrigeration can actually accelerate staling due to starch retrogradation, though freezing is effective for long-term storage. Always inspect bread for mold before consumption and discard the entire loaf if any is found."
    },
    bananas: {
      about: "Bananas are one of the world's most popular fruits, known for their convenient natural packaging and sweet flavor. They're an excellent source of potassium, vitamin B6, vitamin C, and dietary fiber. A medium banana contains about 105 calories and 3 grams of fiber, making it an ideal snack for quick energy and digestive health.",
      safety: "Unlike many fruits, bananas continue to ripen after harvesting due to ethylene gas production. They're best stored at room temperature until they reach your preferred ripeness, after which refrigeration can slow further ripening (though it will darken the peel). Overripe bananas with brown spots are safe to eat and actually contain more antioxidants, though bananas with mold should be discarded."
    },
    lettuce: {
      about: "Lettuce is a leafy green vegetable that comes in numerous varieties, from crisp iceberg to nutrient-dense romaine and loose-leaf types. It's low in calories but provides significant amounts of vitamin A, vitamin K, folate, and water content. Darker varieties generally offer more nutrients than lighter ones like iceberg.",
      safety: "Store lettuce in the refrigerator at temperatures between 35-40°F (1.6-4.4°C) with high humidity. To extend shelf life, wash lettuce only before using, not before storage. Lettuce has been linked to several foodborne illness outbreaks in recent years, so proper washing under cool running water is essential. Discard any lettuce with slimy texture, foul odor, or significant discoloration."
    },
    tomatoes: {
      about: "Tomatoes are technically fruits but commonly used as vegetables in cooking. They're rich in vitamin C, potassium, folate, and vitamin K. Tomatoes are also one of the best sources of lycopene, a powerful antioxidant associated with reduced risk of heart disease and certain cancers, especially when cooked.",
      safety: "Ripe tomatoes should be stored at room temperature, not refrigerated, to maintain flavor and texture. Once cut, refrigerate tomatoes and use within 2-3 days. Always wash tomatoes before consumption, even if you plan to peel them, to remove potential surface contaminants. Cut away any bruised or damaged areas before consuming."
    },
    avocados: {
      about: "Avocados are nutrient-dense fruits known for their high healthy fat content. They provide monounsaturated fatty acids, fiber, potassium, and vitamins K, E, C, and B. Unlike most fruits that are high in carbohydrates, avocados are low in sugar and high in fat, making them popular in various dietary patterns including ketogenic diets.",
      safety: "Unripe avocados should be stored at room temperature until they yield to gentle pressure. Once ripe, refrigeration can extend shelf life by 2-3 days. Cut avocados brown quickly due to oxidation; this discoloration is safe but can be minimized by leaving the pit in unused portions or applying lemon juice to exposed surfaces. Avocados with large moldy areas or an off smell should be discarded."
    },
    default: {
      about: "This food item is part of a balanced diet and provides essential nutrients your body needs. Proper storage is key to maintaining its freshness, flavor, and nutritional value. Always check packaging for specific storage instructions from the manufacturer.",
      safety: "Always follow food safety guidelines when handling and storing this food item. Keep perishable foods refrigerated or frozen at proper temperatures, and be vigilant about cross-contamination when preparing raw and ready-to-eat foods. When in doubt about a food's safety, remember the adage: 'When in doubt, throw it out.'"
    }
  };
  
  return contentMap[id] || contentMap.default;
};

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [storageType, setStorageType] = useState<StorageType>("refrigerator");
  const [isOpened, setIsOpened] = useState(true);
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<"fresh" | "use-soon" | "expired">("fresh");
  const [daysText, setDaysText] = useState("");
  const isMobile = useIsMobile();
  const [relatedFoods, setRelatedFoods] = useState<any[]>([]);
  const [contentDetails, setContentDetails] = useState<{about: string, safety: string} | null>(null);

  useEffect(() => {
    console.log("Loading food details for:", id);
    
    setTimeout(() => {
      if (id) {
        const details = getFoodDetails(id);
        console.log("Food details loaded:", details);
        console.log("Image URL:", details.imageUrl);
        setFood(details);
        setRelatedFoods(getRelatedFoods(id));
        setContentDetails(getFoodContentDetails(id));
        setLoading(false);
      }
    }, 500);
  }, [id]);

  useEffect(() => {
    if (food) {
      calculateExpiration();
    }
  }, [food, storageType, isOpened, purchaseDate]);

  const calculateExpiration = () => {
    if (!food) return;
    
    const storage = food.storageOptions.find((s: any) => s.storageType === storageType);
    const daysData = isOpened ? storage.opened : storage.unopened;
    
    const minExpiryDate = new Date(purchaseDate);
    minExpiryDate.setDate(minExpiryDate.getDate() + daysData.minDays);
    
    const maxExpiryDate = new Date(purchaseDate);
    maxExpiryDate.setDate(maxExpiryDate.getDate() + daysData.maxDays);
    
    const today = new Date();
    
    if (today < minExpiryDate) {
      setStatus("fresh");
      const days = Math.round((minExpiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setDaysText(`${days} days until best`);
    } else if (today <= maxExpiryDate) {
      setStatus("use-soon");
      const days = Math.round((maxExpiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      setDaysText(`Use within ${days} days`);
    } else {
      setStatus("expired");
      const days = Math.round((today.getTime() - maxExpiryDate.getTime()) / (1000 * 60 * 60 * 24));
      setDaysText(`${days} days past expiration`);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseDate(new Date(e.target.value));
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Food not found</h2>
          <p className="text-muted-foreground mb-4">We couldn't find the food you're looking for.</p>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Create the spoilage indicators text for schema
  const spoilageIndicatorsText = `Signs that ${food.name.toLowerCase()} has gone bad include: ${food.spoilageIndicators.visual.join(", ")} (visual); ${food.spoilageIndicators.smell.join(", ")} (smell); and ${food.spoilageIndicators.texture.join(", ")} (texture).`;
  
  // Create storage requirements text for schema
  const storageRequirementsText = `${food.name} should be stored in the ${storageType}. ${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.notes}. Shelf life: ${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.minDays}-${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.maxDays} days when opened.`;
  
  // Create storage tips text for schema
  const storageTipsText = food.tips.join(" ");
  
  // Refrigerator shelf life text for schema
  const refrigeratorShelfLifeText = `${food.name} lasts ${food.storageOptions[0].unopened.minDays}-${food.storageOptions[0].unopened.maxDays} days unopened and ${food.storageOptions[0].opened.minDays}-${food.storageOptions[0].opened.maxDays} days after opening when stored in the refrigerator. ${food.storageOptions[0].opened.notes}.`;
  
  // Freezer shelf life text for schema
  const freezerShelfLifeText = `${food.name} lasts ${food.storageOptions[1].unopened.minDays}-${food.storageOptions[1].unopened.maxDays} days unopened and ${food.storageOptions[1].opened.minDays}-${food.storageOptions[1].opened.maxDays} days after opening when stored in the freezer. ${food.storageOptions[1].opened.notes}.`;

  // Create schema markup
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How Long Does ${food.name} Last?`,
    "description": `Learn how to store ${food.name} properly and determine if it's still fresh.`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Check storage conditions",
        "text": storageRequirementsText
      },
      {
        "@type": "HowToStep",
        "name": "Look for signs of spoilage",
        "text": spoilageIndicatorsText
      },
      {
        "@type": "HowToStep",
        "name": "Follow storage tips",
        "text": storageTipsText
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How long does ${food.name.toLowerCase()} last in the refrigerator?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": refrigeratorShelfLifeText
        }
      },
      {
        "@type": "Question",
        "name": `How long does ${food.name.toLowerCase()} last in the freezer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": freezerShelfLifeText
        }
      },
      {
        "@type": "Question",
        "name": `How can I tell if ${food.name.toLowerCase()} has gone bad?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": spoilageIndicatorsText
        }
      },
      {
        "@type": "Question",
        "name": `What's the best way to store ${food.name.toLowerCase()}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": storageRequirementsText
        }
      }
    ]
  };

  const pageTitle = `How Long Does ${food?.name} Last? Storage Guide & Expiration | Fresh Check`;
  const pageDescription = `Learn how long ${food?.name?.toLowerCase()} lasts in the refrigerator, freezer, and pantry. Signs of spoilage, storage tips, and a free calculator to check if your ${food?.name?.toLowerCase()} is still fresh.`;

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://freshcheck.app/food/${id}`} />
        <link rel="canonical" href={`https://freshcheck.app/food/${id}`} />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
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
          <div className="h-56 w-full rounded-xl overflow-hidden relative mb-4">
            <img 
              src={food.imageUrl} 
              alt={`Fresh ${food.name.toLowerCase()} - storage and expiration guide`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", food.imageUrl);
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <h1 className="absolute bottom-4 left-4 text-3xl font-semibold text-white">How Long Does {food.name} Last?</h1>
          </div>
        </motion.div>

        <AdUnit slotId="food-detail-top" className="mb-6" format="leaderboard" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2"
          >
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen size={18} className="text-muted-foreground" />
                <h2 className="text-xl font-semibold">About {food.name}</h2>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{contentDetails?.about}</p>
            </div>

            {/* Storage Options Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Storage Options</h2>
              
              <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'} mb-6`}>
                <button
                  onClick={() => setStorageType("refrigerator")}
                  className={`${isMobile ? 'w-full' : 'flex-1'} py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                    storageType === "refrigerator"
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Refrigerator size={18} />
                  <span>{food.name} in the Refrigerator</span>
                </button>
                <button
                  onClick={() => setStorageType("freezer")}
                  className={`${isMobile ? 'w-full' : 'flex-1'} py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                    storageType === "freezer"
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Snowflake size={18} />
                  <span>{food.name} in the Freezer</span>
                </button>
                <button
                  onClick={() => setStorageType("pantry")}
                  className={`${isMobile ? 'w-full' : 'flex-1'} py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                    storageType === "pantry"
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Home size={18} />
                  <span>{food.name} in the Pantry</span>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Packaging Status</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsOpened(false)}
                    className={`flex-1 py-2 px-4 rounded-lg text-center transition-all ${
                      !isOpened
                        ? "bg-primary text-white"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Unopened
                  </button>
                  <button
                    onClick={() => setIsOpened(true)}
                    className={`flex-1 py-2 px-4 rounded-lg text-center transition-all ${
                      isOpened
                        ? "bg-primary text-white"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Opened
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <h3 className="text-lg font-medium mb-3">Storage Requirements</h3>
                <div className="bg-secondary/50 rounded-lg p-4 text-sm">
                  <p className="mb-2">
                    <span className="font-medium">Storage:</span>{" "}
                    {food.storageOptions.find((s: any) => s.storageType === storageType)?.[isOpened ? "opened" : "unopened"].notes}
                  </p>
                  <p>
                    <span className="font-medium">Shelf life:</span>{" "}
                    {food.storageOptions.find((s: any) => s.storageType === storageType)?.[isOpened ? "opened" : "unopened"].minDays}-
                    {food.storageOptions.find((s: any) => s.storageType === storageType)?.[isOpened ? "opened" : "unopened"].maxDays} days
                  </p>
                </div>
              </div>
            </div>

            {/* Food Safety Information Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <ShieldAlert size={18} className="text-muted-foreground" />
                <h2 className="text-xl font-semibold">Food Safety Information</h2>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{contentDetails?.safety}</p>
            </div>

            {/* Spoilage Indicators Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info size={18} className="text-muted-foreground" />
                <h2 className="text-xl font-semibold">How to Tell if {food.name} Has Gone Bad</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Look</h3>
                  <ul className="space-y-1">
                    {food.spoilageIndicators.visual.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-xs mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Smell</h3>
                  <ul className="space-y-1">
                    {food.spoilageIndicators.smell.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-xs mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Touch</h3>
                  <ul className="space-y-1">
                    {food.spoilageIndicators.texture.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-xs mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Storage Tips Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info size={18} className="text-muted-foreground" />
                <h2 className="text-xl font-semibold">Storage Tips</h2>
              </div>

              <ul className="space-y-2 text-sm">
                {food.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start bg-secondary/30 p-3 rounded-lg">
                    <span className="font-medium mr-2">{index + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Foods Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Related Foods</h2>
              <div className="grid grid-cols-3 gap-3">
                {relatedFoods.map((relatedFood, index) => (
                  <Link 
                    key={index}
                    to={`/food/${relatedFood.id}`} 
                    className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    <div className="h-24 bg-gray-100">
                      <img 
                        src={relatedFood.imageUrl} 
                        alt={`${relatedFood.name} storage information`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop";
                        }}
                      />
                    </div>
                    <div className="p-2 text-center">
                      <span className="text-sm font-medium">{relatedFood.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Expiration Calculator Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 mb-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar size={18} className="text-muted-foreground" />
                <h2 className="text-xl font-semibold">Expiration Calculator</h2>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">When did you buy it?</label>
                <input
                  type="date"
                  value={formatDate(purchaseDate)}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <StatusIndicator status={status} daysText={daysText} />
              </div>
            </div>
            
            <AdUnit slotId="food-detail-sidebar" format="rectangle" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FoodDetail;
