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
    if (id === "salmon") {
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
            minDays: 60,
            maxDays: 90,
            notes: "Wrap tightly in freezer paper or vacuum seal"
          },
          opened: {
            minDays: 60,
            maxDays: 90,
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
    
    if (id === "chicken-raw" || id === "chicken") {
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
    
    if (id === "chicken-cooked") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 3,
            maxDays: 4,
            notes: "Store in airtight container on upper shelf"
          },
          opened: {
            minDays: 3,
            maxDays: 4,
            notes: "Store in airtight container on upper shelf"
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze in airtight containers or freezer bags"
          },
          opened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze in airtight containers or freezer bags"
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
    if (id === "salmon") {
      return {
        visual: ["Gray or dull color instead of vibrant pink/red", "Milky white residue or slime", "Dark spots or discoloration"],
        smell: ["Strong fishy or ammonia-like odor", "Sour or rotten smell"],
        texture: ["Soft, mushy flesh", "Flesh that doesn't spring back when pressed", "Sticky or tacky surface"]
      };
    }
    
    if (id === "chicken-raw" || id === "chicken") {
      return {
        visual: ["Pink or gray discoloration", "Mold spots", "Excessive sliminess"],
        smell: ["Strong sour odor", "Ammonia-like smell", "Rotten egg odor"],
        texture: ["Sticky or tacky surface", "Unusually soft flesh"]
      };
    }
    
    if (id === "chicken-cooked") {
      return {
        visual: ["Mold spots", "Discoloration (especially green or gray)", "Dried out appearance"],
        smell: ["Sour or rotten smell", "Fermented odor"],
        texture: ["Slimy surface", "Unusually dry or tough texture"]
      };
    }
    
    if (category === "Seafood") {
      return {
        visual: ["Milky, cloudy appearance", "Unusual discoloration", "Excessive slime"],
        smell: ["Strong fishy or ammonia-like odor", "Sour or rotten smell"],
        texture: ["Soft, mushy flesh", "Flesh that doesn't spring back when pressed"]
      };
    }
    
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
      { id: "kale", name: "Kale", imageUrl: "https://images.unsplash.com/photo-1524179091875-bf99a9
