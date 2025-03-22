
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Refrigerator, Snowflake, Home, Calendar, Info, BookOpen, ShieldAlert, ExternalLink, Save, Printer } from "lucide-react";
import StatusIndicator from "../components/StatusIndicator";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getFoodById } from "../data/foodData";

const getFixedFallbackImage = (foodId: string): string | null => {
  const fixedFallbacks: Record<string, string> = {
    "tofu": "/lovable-uploads/6c5503aa-28d2-470d-ad58-fbc91a069ea0.png",
    "eggs": "/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png",
    "bacon": "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=500&h=300&fit=crop",
  };
  
  return fixedFallbacks[foodId] || null;
};

const getFoodDetails = (id: string) => {
  const foodFromDatabase = getFoodById(id);
  const foodImages: Record<string, string> = {
    chicken: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=400&fit=crop",
    milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop",
    eggs: "https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=800&h=400&fit=crop",
    bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
    bananas: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=400&fit=crop",
    lettuce: "https://images.unsplash.com/photo-1621262331122-118f92d4d795?w=800&h=400&fit=crop",
    tomatoes: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=400&fit=crop",
    avocados: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&h=400&fit=crop",
    apples: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=400&fit=crop",
    tofu: "https://images.unsplash.com/photo-1626711934535-9749ea933616?w=500&h=300&fit=crop",
    bacon: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=500&h=300&fit=crop",
    cheese: "https://images.unsplash.com/photo-1552767059-ce182eda88cc?w=800&h=400&fit=crop",
    yogurt: "https://images.unsplash.com/photo-1571212515416-fca988083f35?w=800&h=400&fit=crop",
    oranges: "https://images.unsplash.com/photo-1611080626919-7cf5a9b834c8?w=800&h=400&fit=crop",
    peppers: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&h=400&fit=crop",
    onions: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=800&h=400&fit=crop",
    default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop"
  };

  const getStorageOptions = (id: string, category?: string) => {
    if (category === "Fruits") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 7,
            maxDays: 14,
            notes: "Store in crisper drawer"
          },
          opened: {
            minDays: 7,
            maxDays: 14,
            notes: "Store in crisper drawer"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 180,
            maxDays: 365,
            notes: "Freeze in airtight container"
          },
          opened: {
            minDays: 180,
            maxDays: 365,
            notes: "Freeze cut pieces in airtight container"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 2,
            maxDays: 7,
            notes: "Store in cool, dry place"
          },
          opened: {
            minDays: 2,
            maxDays: 7,
            notes: "Best eaten fresh"
          }
        }
      ];
    }
    
    if (category === "Dairy") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 5,
            maxDays: 10,
            notes: "Keep refrigerated at all times"
          },
          opened: {
            minDays: 3,
            maxDays: 7,
            notes: "Keep tightly sealed"
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
            notes: "Quality may decrease after thawing"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended"
          }
        }
      ];
    }
    
    if (category === "Vegetables") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 5,
            maxDays: 10,
            notes: "Store in crisper drawer"
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
            minDays: 180,
            maxDays: 365,
            notes: "Blanch before freezing for best results"
          },
          opened: {
            minDays: 180,
            maxDays: 365,
            notes: "Store in freezer-safe container"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 2,
            maxDays: 5,
            notes: "Some root vegetables store well in cool, dark places"
          },
          opened: {
            minDays: 1,
            maxDays: 3,
            notes: "Limited shelf life at room temperature"
          }
        }
      ];
    }
    
    if (id === "apples") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 21,
            maxDays: 42,
            notes: "Store in crisper drawer"
          },
          opened: {
            minDays: 3,
            maxDays: 7,
            notes: "Once cut, cover exposed surface with lemon juice"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 180,
            maxDays: 365,
            notes: "Better for cooking than fresh eating after thawing"
          },
          opened: {
            minDays: 180,
            maxDays: 365,
            notes: "Freeze slices with sugar or syrup for best results"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 5,
            maxDays: 14,
            notes: "Store in cool, dark place away from other fruits"
          },
          opened: {
            minDays: 1,
            maxDays: 3,
            notes: "Cut apples brown quickly at room temperature"
          }
        }
      ];
    }
    
    if (id === "tofu") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 3,
            maxDays: 5,
            notes: "Keep refrigerated in original packaging"
          },
          opened: {
            minDays: 3,
            maxDays: 5,
            notes: "Store in water, change water daily"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 150,
            notes: "Drain and pat dry before freezing"
          },
          opened: {
            minDays: 90,
            maxDays: 150,
            notes: "Freeze in airtight container with minimal water"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          }
        }
      ];
    }
    
    if (id === "bacon") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 7,
            maxDays: 14,
            notes: "Keep in original sealed packaging"
          },
          opened: {
            minDays: 5,
            maxDays: 7,
            notes: "Store in airtight container or tightly wrapped"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 30,
            maxDays: 90,
            notes: "Freeze in original packaging"
          },
          opened: {
            minDays: 30,
            maxDays: 90,
            notes: "Wrap tightly in plastic wrap, then aluminum foil"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          }
        }
      ];
    }
    
    if (id === "eggs") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 21,
            maxDays: 35,
            notes: "Store in original carton on interior shelf, not door"
          },
          opened: {
            minDays: 2,
            maxDays: 4,
            notes: "For cracked eggs, store in covered container"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Whole eggs in shells cannot be frozen"
          },
          opened: {
            minDays: 90,
            maxDays: 365,
            notes: "Freeze beaten eggs in airtight container"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended in the US - requires refrigeration"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          }
        }
      ];
    }
    
    if (id === "milk") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 5,
            maxDays: 10,
            notes: "Keep refrigerated at 40°F or below"
          },
          opened: {
            minDays: 3,
            maxDays: 7,
            notes: "Store tightly sealed on interior shelf, not door"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze in airtight container with room for expansion"
          },
          opened: {
            minDays: 90,
            maxDays: 180,
            notes: "Texture may change after thawing, best for cooking"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Only shelf-stable UHT milk can be stored unopened"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration after opening"
          }
        }
      ];
    }
    
    if (id === "cheese") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 14,
            maxDays: 28,
            notes: "Keep in original packaging until ready to use"
          },
          opened: {
            minDays: 5,
            maxDays: 14,
            notes: "Wrap in wax paper, then loosely in plastic wrap"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 60,
            maxDays: 180,
            notes: "Texture may change, best for cooking after freezing"
          },
          opened: {
            minDays: 60,
            maxDays: 180,
            notes: "Grate hard cheese before freezing for best results"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          }
        }
      ];
    }
    
    if (id === "chicken") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 1,
            maxDays: 2,
            notes: "Keep in original packaging on bottom shelf"
          },
          opened: {
            minDays: 1,
            maxDays: 2,
            notes: "Store in airtight container on bottom shelf"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 270,
            notes: "Freeze in original packaging for short-term storage"
          },
          opened: {
            minDays: 90,
            maxDays: 270,
            notes: "Wrap tightly in freezer paper or vacuum seal"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration"
          }
        }
      ];
    }
    
    if (id === "bread") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 7,
            maxDays: 14,
            notes: "Can slow mold growth but accelerates staling"
          },
          opened: {
            minDays: 7,
            maxDays: 14,
            notes: "Keep tightly wrapped to prevent drying out"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze in original packaging or freezer bag"
          },
          opened: {
            minDays: 90,
            maxDays: 180,
            notes: "Slice before freezing for easier portioning"
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 3,
            maxDays: 7,
            notes: "Store in bread box or paper bag, not plastic"
          },
          opened: {
            minDays: 2,
            maxDays: 5,
            notes: "Keep tightly wrapped in cool, dry place"
          }
        }
      ];
    }
    
    // Default generic storage options as fallback
    return [
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
    ];
  };

  const getSpoilageIndicators = (id: string, category?: string) => {
    if (category === "Fruits") {
      return {
        visual: ["Mold spots", "Unusual discoloration", "Wrinkled or soft skin"],
        smell: ["Fermented or alcoholic odor", "Off or musty smell"],
        texture: ["Extremely soft", "Mushy texture", "Leaking juice"]
      };
    }
    
    if (id === "apples") {
      return {
        visual: ["Brown or soft spots", "Wrinkled skin", "Mold growth"],
        smell: ["Fermented or alcoholic odor", "Overly sweet smell"],
        texture: ["Extremely soft flesh", "Mealy or grainy texture", "Flesh browning"]
      };
    }
    
    if (id === "tofu") {
      return {
        visual: ["Slimy surface", "Pink or yellowish discoloration", "Mold growth"],
        smell: ["Sour or ammonia-like odor", "Strong fermented smell"],
        texture: ["Excessively soft or mushy", "Crumbly or brittle when firm tofu"]
      };
    }
    
    if (id === "bacon") {
      return {
        visual: ["Discoloration (gray, green, or brown)", "Slimy film", "Mold spots"],
        smell: ["Sour or rotting smell", "Rancid or fishy odor"],
        texture: ["Sticky or tacky surface", "Unusually soft or mushy"]
      };
    }
    
    if (id === "eggs") {
      return {
        visual: ["Cracks in shell", "Powdery residue on shell", "Cloudy whites or pink/green yolks"],
        smell: ["Sulfur or rotten odor", "Strong unpleasant smell when cracked"],
        texture: ["Watery whites", "Yolk breaks easily when fresh", "Stuck to shell"]
      };
    }
    
    if (id === "milk") {
      return {
        visual: ["Chunky texture", "Separation of solids", "Yellow tinge"],
        smell: ["Sour or rancid odor", "Unpleasant sharp smell"],
        texture: ["Lumpy or curdled", "Slimy or unusually thick consistency"]
      };
    }
    
    if (id === "cheese") {
      return {
        visual: ["Mold (except for blue cheese)", "Unusual discoloration", "Dried, cracked edges"],
        smell: ["Ammonia-like odor", "Rancid smell (different from normal cheese odor)"],
        texture: ["Slimy surface", "Excessively hard or dry", "Unusual softening"]
      };
    }
    
    if (id === "chicken") {
      return {
        visual: ["Grayish-green color", "Mold spots", "Excessive sliminess"],
        smell: ["Strong sour odor", "Ammonia-like smell", "Rotten egg odor"],
        texture: ["Sticky or tacky surface", "Unusually soft flesh"]
      };
    }
    
    if (id === "bread") {
      return {
        visual: ["Mold spots (white, green, black, or pink)", "Unusual discoloration"],
        smell: ["Musty or sour odor", "Alcohol-like smell"],
        texture: ["Unusually hard and dry", "Slimy or wet spots"]
      };
    }
    
    // Default generic spoilage indicators as fallback
    return {
      visual: ["Discoloration", "Mold growth"],
      smell: ["Sour odor", "Ammonia-like smell"],
      texture: ["Slimy surface", "Unusual softness"]
    };
  };

  if (foodFromDatabase) {
    return {
      id,
      name: foodFromDatabase.name,
      imageUrl: foodFromDatabase.imageUrl || foodImages[id] || foodImages.default,
      category: foodFromDatabase.category,
      storageOptions: getStorageOptions(id, foodFromDatabase.category),
      spoilageIndicators: getSpoilageIndicators(id, foodFromDatabase.category),
      tips: [
        "Check packaging for manufacturer's recommendations",
        "When in doubt, throw it out",
        "Store away from ethylene-producing fruits"
      ]
    };
  }

  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    imageUrl: foodImages[id] || foodImages.default,
    category: "Food",
    storageOptions: getStorageOptions(id),
    spoilageIndicators: getSpoilageIndicators(id),
    tips: [
      "Check packaging for manufacturer's recommendations",
      "When in doubt, throw it out",
      "Store away from ethylene-producing fruits"
    ]
  };
};

type StorageType = "refrigerator" | "freezer" | "pantry";

const getRelatedFoods = (currentFoodId: string) => {
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
    default: [
      { id: "chicken", name: "Chicken", imageUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop" },
      { id: "milk", name: "Milk", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop" },
      { id: "bananas", name: "Bananas", imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop" }
    ]
  };

  return relatedFoodsMap[currentFoodId] || relatedFoodsMap.default;
};

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
    tofu: {
      about: "Tofu is a protein-rich food made from condensed soy milk that's been pressed into solid white blocks. It's an excellent source of plant-based protein, containing all nine essential amino acids. Tofu is also rich in iron, calcium (especially if calcium-sulfate is used in processing), manganese, and phosphorus. It's low in calories and contains no cholesterol, making it a popular protein alternative for many dietary patterns.",
      safety: "Fresh tofu requires refrigeration at all times at temperatures below 40°F (4°C). Store unopened tofu in its original packaging until the expiration date. Once opened, keep tofu submerged in fresh, clean water in an airtight container, changing the water daily to prevent bacterial growth. Tofu can spoil quickly when not properly stored. Firm and extra-firm varieties tend to last longer than silken or soft tofu. Freezing changes tofu's texture, making it more porous and chewier after thawing."
    },
    bacon: {
      about: "Bacon is a cured meat prepared from pork belly or back cuts. It's known for its distinctive smoky flavor and high fat content. While not considered a health food due to its saturated fat and sodium levels, bacon contains protein, B vitamins (especially B12), zinc, and selenium. Modern processing methods have reduced nitrate and nitrite levels in many commercial bacon products.",
      safety: "Always store bacon in the refrigerator at 40°F (4°C) or below and use by the package 'use-by' date. Once opened, bacon should be tightly wrapped or stored in an airtight container and used within 7 days. Cooked bacon can be refrigerated for up to 4-5 days. Bacon can be frozen for 1-3 months for best quality. Always cook bacon thoroughly to an internal temperature of 145°F (63°C) with a rest time of 3 minutes to kill potential pathogens."
    },
    cheese: {
      about: "Cheese is a dairy product made from the milk of cows, goats, sheep, or other mammals. It's rich in calcium, protein, phosphorus, zinc, and vitamins A and B12. The nutritional profile varies widely between types - from high-fat, creamy varieties to harder, aged cheeses with higher protein content. Cheese contains beneficial compounds like conjugated linoleic acid (CLA) and provides probiotics in some varieties.",
      safety: "Different cheese varieties have different storage requirements. Soft cheeses should be refrigerated at 35-40°F (1.6-4.4°C) and consumed relatively quickly, while hard, aged cheeses can last longer. For most cheeses, wrap in cheese paper, parchment, or wax paper rather than plastic wrap to allow them to breathe. Remove cheese from refrigeration 30-60 minutes before serving for best flavor. Discard any cheese with unusual mold growth (except for blue cheeses, where mold is part of the aging process)."
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
  const [isSaved, setIsSaved] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log("Loading food details for:", id);
    
    if (id && localStorage.getItem(`saved-food-${id}`)) {
      setIsSaved(true);
    }
    
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

  const handleImageError = () => {
    console.error(`Image failed to load for ${food?.name}:`, food?.imageUrl);
    setImageError(true);
  };

  const calculateExpiration = () => {
    if (!food) return;
    
    const storage = food.storageOptions.find((s: any) => s.storageType === storageType);
    if (!storage) return;
    
    const daysData = isOpened ? storage.opened : storage.unopened;
    
    const today = new Date();
    const daysSincePurchase = Math.round((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const minFreshDays = daysData.minDays - daysSincePurchase;
    const maxFreshDays = daysData.maxDays - daysSincePurchase;
    
    if (daysSincePurchase < 0) {
      setStatus("fresh");
      setDaysText("Invalid purchase date");
    } else if (maxFreshDays <= 0) {
      setStatus("expired");
      setDaysText(`${Math.abs(maxFreshDays)} days past expiration`);
    } else if (minFreshDays <= 0) {
      setStatus("use-soon");
      setDaysText(`Use within ${maxFreshDays} days`);
    } else {
      setStatus("fresh");
      setDaysText(`${minFreshDays} days until best use`);
    }
    
    console.log(`Storage calculation for ${food.name}:`, {
      storageType,
      isOpened,
      daysData,
      daysSincePurchase,
      minFreshDays,
      maxFreshDays,
      status
    });
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

  const spoilageIndicatorsText = `Signs that ${food.name.toLowerCase()} has gone bad include: ${food.spoilageIndicators.visual.join(", ")} (visual); ${food.spoilageIndicators.smell.join(", ")} (smell); and ${food.spoilageIndicators.texture.join(", ")} (texture).`;
  
  const storageRequirementsText = `${food.name} should be stored in the ${storageType}. ${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.notes}. Shelf life: ${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.minDays}-${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.maxDays} days when opened.`;
  
  const storageTipsText = food.tips.join(" ");
  
  const refrigeratorShelfLifeText = `${food.name} lasts ${food.storageOptions[0].unopened.minDays}-${food.storageOptions[0].unopened.maxDays} days unopened and ${food.storageOptions[0].opened.minDays}-${food.storageOptions[0].opened.maxDays} days after opening when stored in the refrigerator. ${food.storageOptions[0].opened.notes}.`;
  
  const freezerShelfLifeText = `${food.name} lasts ${food.storageOptions[1].unopened.minDays}-${food.storageOptions[1].unopened.maxDays} days unopened and ${food.storageOptions[1].opened.minDays}-${food.storageOptions[1].opened.maxDays} days after opening when stored in the freezer. ${food.storageOptions[1].opened.notes}.`;

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
        "name": `How long does ${food.name} last in the refrigerator?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": refrigeratorShelfLifeText
        }
      },
      {
        "@type": "Question",
        "name": `How long does ${food.name} last in the freezer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": freezerShelfLifeText
        }
      },
      {
        "@type": "Question",
        "name": `How can I tell if ${food.name} has gone bad?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": spoilageIndicatorsText
        }
      }
    ]
  };

  const handleSaveFood = () => {
    if (id) {
      if (isSaved) {
        localStorage.removeItem(`saved-food-${id}`);
        setIsSaved(false);
        toast.success(`${food.name} removed from saved foods`);
      } else {
        localStorage.setItem(`saved-food-${id}`, JSON.stringify({
          id,
          name: food.name,
          imageUrl: food.imageUrl,
          category: food.category,
          savedAt: new Date().toISOString()
        }));
        setIsSaved(true);
        toast.success(`${food.name} saved for quick access`);
      }
    }
  };

  const handlePrintMode = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 100);
  };

  const fallbackImageUrl = id ? getFixedFallbackImage(id) : null;

  return (
    <PageTransition>
      <Helmet>
        <title>{`How Long Does ${food.name} Last? | Food Storage Guide`}</title>
        <meta name="description" content={`Learn how long ${food.name} lasts in the refrigerator, freezer, or pantry, and how to tell if it's gone bad.`} />
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className={`container mx-auto px-4 py-6 ${isPrintMode ? 'print-mode' : ''}`}>
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Home</span>
          </Link>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveFood}
              className="print:hidden"
            >
              <Save size={16} className="mr-2" />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrintMode}
              className="print:hidden"
            >
              <Printer size={16} className="mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="relative aspect-video">
                <img 
                  src={imageError && fallbackImageUrl ? fallbackImageUrl : food.imageUrl} 
                  alt={food.name} 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{food.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 bg-primary/90 text-white text-sm rounded-full">{food.category}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Calendar className="mr-2 text-primary" />
                    Storage Calculator
                  </h2>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Storage Location</label>
                        <div className="flex rounded-lg overflow-hidden border">
                          <button 
                            className={`flex-1 py-2 px-3 text-sm flex items-center justify-center ${storageType === 'refrigerator' ? 'bg-primary text-white' : 'bg-background'}`}
                            onClick={() => setStorageType('refrigerator')}
                          >
                            <Refrigerator size={16} className="mr-1" />
                            Fridge
                          </button>
                          <button 
                            className={`flex-1 py-2 px-3 text-sm flex items-center justify-center ${storageType === 'freezer' ? 'bg-primary text-white' : 'bg-background'}`}
                            onClick={() => setStorageType('freezer')}
                          >
                            <Snowflake size={16} className="mr-1" />
                            Freezer
                          </button>
                          <button 
                            className={`flex-1 py-2 px-3 text-sm flex items-center justify-center ${storageType === 'pantry' ? 'bg-primary text-white' : 'bg-background'}`}
                            onClick={() => setStorageType('pantry')}
                          >
                            <Home size={16} className="mr-1" />
                            Pantry
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Package Status</label>
                        <div className="flex rounded-lg overflow-hidden border">
                          <button 
                            className={`flex-1 py-2 px-3 text-sm ${!isOpened ? 'bg-primary text-white' : 'bg-background'}`}
                            onClick={() => setIsOpened(false)}
                          >
                            Unopened
                          </button>
                          <button 
                            className={`flex-1 py-2 px-3 text-sm ${isOpened ? 'bg-primary text-white' : 'bg-background'}`}
                            onClick={() => setIsOpened(true)}
                          >
                            Opened
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Purchase Date</label>
                        <input
                          type="date"
                          value={formatDate(purchaseDate)}
                          onChange={handleDateChange}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-background p-4 rounded-lg border">
                      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="font-medium">Current Status:</h3>
                          <p className="text-sm text-muted-foreground">Based on your settings</p>
                        </div>
                        <div className="flex items-center">
                          <StatusIndicator status={status} daysText={daysText} size="large" />
                          <div className="ml-3">
                            <p className="font-semibold">
                              {status === 'fresh' ? 'Fresh' : status === 'use-soon' ? 'Use Soon' : 'Expired'}
                            </p>
                            <p className="text-sm">{daysText}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>
                      {isOpened 
                        ? `Opened ${food.name.toLowerCase()} lasts ${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.minDays}-${food.storageOptions.find((s: any) => s.storageType === storageType)?.opened.maxDays} days when stored in the ${storageType}.`
                        : `Unopened ${food.name.toLowerCase()} lasts ${food.storageOptions.find((s: any) => s.storageType === storageType)?.unopened.minDays}-${food.storageOptions.find((s: any) => s.storageType === storageType)?.unopened.maxDays} days when stored in the ${storageType}.`
                      }
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <ShieldAlert className="mr-2 text-primary" />
                    Signs of Spoilage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Visual Signs</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {food.spoilageIndicators.visual.map((sign: string, index: number) => (
                          <li key={index}>{sign}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Smell</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {food.spoilageIndicators.smell.map((sign: string, index: number) => (
                          <li key={index}>{sign}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Texture</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {food.spoilageIndicators.texture.map((sign: string, index: number) => (
                          <li key={index}>{sign}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {contentDetails && (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <Info className="mr-2 text-primary" />
                        About {food.name}
                      </h2>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm leading-relaxed">{contentDetails.about}</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <BookOpen className="mr-2 text-primary" />
                        Safety Information
                      </h2>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm leading-relaxed">{contentDetails.safety}</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Storage Tips</h2>
                  <ul className="space-y-2">
                    {food.tips.map((tip: string, index: number) => (
                      <li key={index} className="bg-muted p-3 rounded-lg text-sm flex items-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-5 w-5 text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1 print:hidden">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AdUnit slotId="food-detail-sidebar" />
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Related Foods</h2>
                  <div className="space-y-4">
                    {relatedFoods.map((relatedFood) => (
                      <Link 
                        key={relatedFood.id} 
                        to={`/food/${relatedFood.id}`} 
                        className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={relatedFood.imageUrl} 
                          alt={relatedFood.name} 
                          className="w-16 h-12 object-cover rounded-md mr-3"
                          onError={(e) => {
                            const fallback = getFixedFallbackImage(relatedFood.id);
                            if (fallback) {
                              (e.target as HTMLImageElement).src = fallback;
                            }
                          }}
                        />
                        <div>
                          <h3 className="font-medium">{relatedFood.name}</h3>
                          <p className="text-xs text-muted-foreground">View storage info</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 bg-muted p-4 rounded-lg text-center text-sm">
                  <p className="mb-2">Want to learn more about food safety?</p>
                  <a 
                    href="https://www.fda.gov/food/consumers/food-safety-education-consumers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center justify-center"
                  >
                    Visit FDA Food Safety <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FoodDetail;
