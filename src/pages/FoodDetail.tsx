
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
    "lettuce": "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=500&h=300&fit=crop",
    "tomatoes": "https://images.unsplash.com/photo-1546093787-6b4e0a75ddbd?w=500&h=300&fit=crop",
  };
  
  return fixedFallbacks[foodId] || null;
};

const getFoodDetails = (id: string) => {
  const foodFromDatabase = getFoodById(id);
  const foodImages: Record<string, string> = {
    chicken: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=400&fit=crop",
    milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop",
    eggs: "/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png",
    bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
    bananas: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=400&fit=crop",
    lettuce: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=800&h=200&fit=crop",
    tomatoes: "https://images.unsplash.com/photo-1546093787-6b4e0a75ddbd?w=800&h=200&fit=crop",
    avocados: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&h=200&fit=crop",
    apples: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=200&fit=crop",
    tofu: "/lovable-uploads/6c5503aa-28d2-470d-ad58-fbc91a069ea0.png",
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
    
    if (id === "bananas") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 5,
            maxDays: 7,
            notes: "Refrigeration slows ripening but may affect flavor and texture. Better for overripe bananas."
          },
          opened: {
            minDays: 1,
            maxDays: 3,
            notes: "For cut bananas, store in airtight container with lemon juice to prevent browning."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Peel and slice before freezing for best results. Great for smoothies or baking."
          },
          opened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze sliced in airtight container or freezer bag."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 2,
            maxDays: 7,
            notes: "Store at room temperature away from direct sunlight. Hang if possible."
          },
          opened: {
            minDays: 1,
            maxDays: 2,
            notes: "Best eaten immediately once peeled. Will brown rapidly."
          }
        }
      ];
    }
    
    if (id === "ice-cream") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 0,
            maxDays: 1,
            notes: "Regular refrigerator is too warm - ice cream will become soft and melty."
          },
          opened: {
            minDays: 0,
            maxDays: 1,
            notes: "Will become soupy and develop ice crystals when refrozen."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 60,
            maxDays: 180,
            notes: "Store in back of freezer where temperature is most stable."
          },
          opened: {
            minDays: 21,
            maxDays: 60,
            notes: "Cover with plastic wrap touching surface to prevent ice crystals. Keep in original container."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - will melt immediately."
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - will melt immediately."
          }
        }
      ];
    }
    
    if (id === "pizza") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 3,
            maxDays: 4,
            notes: "Store in airtight container or wrap tightly in aluminum foil."
          },
          opened: {
            minDays: 3,
            maxDays: 4,
            notes: "Store in airtight container or wrap tightly in aluminum foil."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 30,
            maxDays: 60,
            notes: "Wrap individual slices in plastic wrap, then aluminum foil."
          },
          opened: {
            minDays: 30,
            maxDays: 60,
            notes: "Wrap individual slices in plastic wrap, then aluminum foil."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 1,
            notes: "Not recommended for more than a few hours at room temperature."
          },
          opened: {
            minDays: 0,
            maxDays: 1,
            notes: "Not recommended for more than a few hours at room temperature."
          }
        }
      ];
    }
    
    if (id === "yogurt") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 14,
            maxDays: 21,
            notes: "Keep refrigerated in original container. Check best-by date."
          },
          opened: {
            minDays: 5,
            maxDays: 10,
            notes: "Keep tightly covered and refrigerated. Avoid cross-contamination."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 30,
            maxDays: 60,
            notes: "Texture may change when frozen, better for smoothies or cooking after thawing."
          },
          opened: {
            minDays: 30,
            maxDays: 60,
            notes: "Store in airtight container with minimal air. Texture will change."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration."
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Not recommended - requires refrigeration."
          }
        }
      ];
    }
    
    if (id === "oranges") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 14,
            maxDays: 28,
            notes: "Store in crisper drawer in a mesh bag for air circulation."
          },
          opened: {
            minDays: 3,
            maxDays: 5,
            notes: "Store cut oranges in airtight container or wrap tightly."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze sections or juice, not whole fruit."
          },
          opened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze cut segments in syrup or juice, or freeze juice in containers."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 7,
            maxDays: 14,
            notes: "Store in cool, dry place away from direct sunlight."
          },
          opened: {
            minDays: 1,
            maxDays: 2,
            notes: "Cut oranges should be refrigerated, not left at room temperature."
          }
        }
      ];
    }
    
    if (id === "avocados") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 3,
            maxDays: 7,
            notes: "Refrigerate ripe avocados to slow further ripening."
          },
          opened: {
            minDays: 1,
            maxDays: 3,
            notes: "Store cut avocado with pit in, brush with lemon juice, wrap tightly."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 180,
            notes: "Puree flesh with lemon juice before freezing. Best for cooking or guacamole."
          },
          opened: {
            minDays: 90,
            maxDays: 180,
            notes: "Freeze mashed with lemon juice in airtight container."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 2,
            maxDays: 7,
            notes: "Store unripe avocados at room temperature until ripened."
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Cut avocados must be refrigerated or used immediately."
          }
        }
      ];
    }
    
    if (id === "tomatoes") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 5,
            maxDays: 10,
            notes: "Only refrigerate fully ripe tomatoes; cold temperatures affect flavor."
          },
          opened: {
            minDays: 2,
            maxDays: 5,
            notes: "Store cut tomatoes in airtight container."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 90,
            maxDays: 365,
            notes: "Blanch, remove skins, and freeze whole or diced. Best for cooking."
          },
          opened: {
            minDays: 90,
            maxDays: 365,
            notes: "Freeze cut tomatoes in airtight containers. Only use for cooking after thawing."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 3,
            maxDays: 7,
            notes: "Store stem-side down at room temperature away from direct sunlight."
          },
          opened: {
            minDays: 0,
            maxDays: 1,
            notes: "Cut tomatoes should be refrigerated, not left at room temperature."
          }
        }
      ];
    }
    
    if (id === "onions") {
      return [
        {
          storageType: "refrigerator",
          unopened: {
            minDays: 30,
            maxDays: 60,
            notes: "Whole onions should be kept in pantry. Refrigeration can make them soft and moldy."
          },
          opened: {
            minDays: 7,
            maxDays: 14,
            notes: "Store cut onions in airtight container, away from other foods to prevent odor transfer."
          }
        },
        {
          storageType: "freezer",
          unopened: {
            minDays: 180,
            maxDays: 365,
            notes: "Peel, chop, and freeze in airtight containers. Best for cooking."
          },
          opened: {
            minDays: 180,
            maxDays: 365,
            notes: "Freeze chopped onions in airtight containers or freezer bags."
          }
        },
        {
          storageType: "pantry",
          unopened: {
            minDays: 30,
            maxDays: 90,
            notes: "Store in mesh bag or open container in cool, dry, well-ventilated area."
          },
          opened: {
            minDays: 0,
            maxDays: 0,
            notes: "Cut onions must be refrigerated."
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
          notes: "Store in refrigerator in original packaging"
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
          notes: "Freeze in airtight container"
        },
        opened: {
          minDays: 30,
          maxDays: 90,
          notes: "Freeze in airtight container"
        }
      },
      {
        storageType: "pantry",
        unopened: {
          minDays: 1,
          maxDays: 5,
          notes: "Store in cool, dry place"
        },
        opened: {
          minDays: 1,
          maxDays: 3,
          notes: "Best eaten fresh"
        }
      }
    ];
  };

  const getFreshness = (id: string, storageType?: string, isOpened?: boolean) => {
    const currentDate = new Date();
    const randomBoughtDate = new Date(currentDate);
    randomBoughtDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 10) - 1);
    
    const storageOptions = getStorageOptions(id, foodFromDatabase?.category);
    let selectedStorageOption = storageOptions[0]; // Default to refrigerator
    
    if (storageType) {
      const option = storageOptions.find(opt => opt.storageType === storageType);
      if (option) {
        selectedStorageOption = option;
      }
    }
    
    const storageDetails = isOpened ? selectedStorageOption.opened : selectedStorageOption.unopened;
    const maxDays = storageDetails.maxDays;
    
    const expirationDate = new Date(randomBoughtDate);
    expirationDate.setDate(randomBoughtDate.getDate() + maxDays);
    
    const today = new Date();
    const daysRemaining = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    let status: "fresh" | "use-soon" | "expired" = "fresh";
    if (daysRemaining <= 0) {
      status = "expired";
    } else if (daysRemaining < maxDays * 0.3) {
      status = "use-soon";
    }
    
    return {
      boughtDate: randomBoughtDate,
      expirationDate,
      daysRemaining,
      status,
      storageDetails,
      maxDays
    };
  };

  const getRelatedFoods = (id: string) => {
    // For demonstration purposes, return 3 random but relevant food items
    const allFoods = [
      { id: "chicken", name: "Chicken", category: "Meat", imageUrl: foodImages.chicken || foodImages.default },
      { id: "milk", name: "Milk", category: "Dairy", imageUrl: foodImages.milk || foodImages.default },
      { id: "eggs", name: "Eggs", category: "Dairy", imageUrl: foodImages.eggs || foodImages.default },
      { id: "bread", name: "Bread", category: "Bakery", imageUrl: foodImages.bread || foodImages.default },
      { id: "bananas", name: "Bananas", category: "Fruits", imageUrl: foodImages.bananas || foodImages.default },
      { id: "apples", name: "Apples", category: "Fruits", imageUrl: foodImages.apples || foodImages.default },
      { id: "cheese", name: "Cheese", category: "Dairy", imageUrl: foodImages.cheese || foodImages.default },
      { id: "lettuce", name: "Lettuce", category: "Vegetables", imageUrl: foodImages.lettuce || foodImages.default },
      { id: "tomatoes", name: "Tomatoes", category: "Vegetables", imageUrl: foodImages.tomatoes || foodImages.default },
      { id: "bacon", name: "Bacon", category: "Meat", imageUrl: foodImages.bacon || foodImages.default },
      { id: "yogurt", name: "Yogurt", category: "Dairy", imageUrl: foodImages.yogurt || foodImages.default },
      { id: "tofu", name: "Tofu", category: "Specialty Items", imageUrl: foodImages.tofu || foodImages.default },
      { id: "oranges", name: "Oranges", category: "Fruits", imageUrl: foodImages.oranges || foodImages.default },
      { id: "onions", name: "Onions", category: "Vegetables", imageUrl: foodImages.onions || foodImages.default }
    ].filter(food => food.id !== id);
    
    // Prioritize foods from the same category
    const sameCategory = allFoods.filter(food => foodFromDatabase && food.category === foodFromDatabase.category);
    
    if (sameCategory.length >= 3) {
      // Randomly select 3 foods from the same category
      const shuffled = [...sameCategory].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    } else {
      // If we don't have enough foods from the same category, fill with other random foods
      const otherFoods = allFoods.filter(food => foodFromDatabase && food.category !== foodFromDatabase.category);
      const shuffledOthers = [...otherFoods].sort(() => 0.5 - Math.random());
      return [...sameCategory, ...shuffledOthers].slice(0, 3);
    }
  };

  const imageUrl = foodImages[id] || foodImages.default;
  const storageOptions = getStorageOptions(id, foodFromDatabase?.category);
  const freshness = getFreshness(id);
  const relatedFoods = getRelatedFoods(id);

  return {
    id,
    name: foodFromDatabase?.name || id.charAt(0).toUpperCase() + id.slice(1),
    imageUrl,
    category: foodFromDatabase?.category || "Unknown",
    storageOptions,
    freshness,
    relatedFoods
  };
};

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [foodDetails, setFoodDetails] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>("refrigerator");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call with a slight delay
      const timer = setTimeout(() => {
        const details = getFoodDetails(id);
        setFoodDetails(details);
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [id]);
  
  useEffect(() => {
    // Update freshness whenever storage type or opened status changes
    if (foodDetails) {
      const updatedFreshness = getFoodDetails(id!).freshness;
      setFoodDetails({
        ...foodDetails,
        freshness: updatedFreshness
      });
    }
  }, [selectedStorage, isOpened]);
  
  const handleStorageChange = (storageType: string) => {
    setSelectedStorage(storageType);
  };
  
  const handleOpenedChange = () => {
    setIsOpened(!isOpened);
  };
  
  const saveToMyFoods = () => {
    toast.success(`${foodDetails?.name} added to your foods!`);
  };
  
  const printInfo = () => {
    window.print();
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto p-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!foodDetails) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Food not found</h1>
          <p>The food you're looking for does not exist in our database.</p>
          <Link to="/" className="text-blue-500 hover:underline flex items-center mt-4">
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`${foodDetails.name} Storage Guide - FreshTracker`}</title>
        <meta name="description" content={`Learn how to properly store ${foodDetails.name} and how long it lasts in the refrigerator, freezer, and pantry.`} />
      </Helmet>
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link to={`/category/${foodDetails.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {foodDetails.category}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium truncate">{foodDetails.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left column - Image and basic info */}
          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-2">{foodDetails.name}</h1>
            <p className="text-muted-foreground mb-4">{foodDetails.category}</p>
            
            <div className="rounded-lg overflow-hidden mb-4 bg-gray-100">
              <img 
                src={foodDetails.imageUrl} 
                alt={foodDetails.name}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallbackImage = getFixedFallbackImage(id!);
                  if (fallbackImage && target.src !== fallbackImage) {
                    target.src = fallbackImage;
                  } else if (target.src !== foodDetails.foodImages?.default) {
                    target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop";
                  }
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Best Storage</h3>
                  <Refrigerator size={18} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Keep refrigerated in original packaging until ready to use.</p>
              </div>
              
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Typical Shelf Life</h3>
                  <Calendar size={18} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">5-7 days when refrigerated properly.</p>
              </div>
              
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Signs of Spoilage</h3>
                  <Info size={18} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Mold, discoloration, sour smell, or slimy texture.</p>
              </div>
            </div>
            
            {/* Storage method selection */}
            <div className="bg-card rounded-lg border shadow-sm mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold mb-1">Storage Options</h2>
                <p className="text-sm text-muted-foreground">Select storage method to see detailed recommendations</p>
              </div>
              
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => handleStorageChange("refrigerator")}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      selectedStorage === "refrigerator" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Refrigerator size={16} className="mr-2" />
                    Refrigerator
                  </button>
                  
                  <button
                    onClick={() => handleStorageChange("freezer")}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      selectedStorage === "freezer" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Snowflake size={16} className="mr-2" />
                    Freezer
                  </button>
                  
                  <button
                    onClick={() => handleStorageChange("pantry")}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      selectedStorage === "pantry" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Home size={16} className="mr-2" />
                    Pantry
                  </button>
                </div>
                
                <div className="flex items-center mb-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOpened}
                      onChange={handleOpenedChange}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-muted-foreground">Opened/Cut</span>
                  </label>
                </div>
                
                {foodDetails.storageOptions.map((option: any) => {
                  if (option.storageType === selectedStorage) {
                    const storageInfo = isOpened ? option.opened : option.unopened;
                    return (
                      <div key={option.storageType} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Shelf Life</h3>
                            <p className="text-sm text-muted-foreground">
                              {storageInfo.minDays === storageInfo.maxDays
                                ? `${storageInfo.maxDays} days`
                                : `${storageInfo.minDays}-${storageInfo.maxDays} days`}
                            </p>
                          </div>
                          <StatusIndicator 
                            daysRemaining={foodDetails.freshness.daysRemaining} 
                            maxDays={storageInfo.maxDays}
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-1">Storage Tips</h3>
                          <p className="text-sm text-muted-foreground">{storageInfo.notes}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          
          {/* Right column - Additional info and related foods */}
          <div className="md:col-span-2">
            {!isMobile && <AdUnit adId="detail-sidebar" className="mb-6" />}
            
            <div className="bg-card rounded-lg border shadow-sm mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={saveToMyFoods}
                >
                  <Save size={16} className="mr-2" />
                  Save to My Foods
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={printInfo}
                >
                  <Printer size={16} className="mr-2" />
                  Print Storage Guide
                </Button>
                
                <Link to={`/food-safety/science-of-spoilage?food=${id}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen size={16} className="mr-2" />
                    Detailed Storage Info
                  </Button>
                </Link>
                
                <Link to="/food-safety/foodborne-illness">
                  <Button variant="outline" className="w-full justify-start">
                    <ShieldAlert size={16} className="mr-2" />
                    Food Safety Tips
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm mb-6">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Related Foods</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4">
                  {foodDetails.relatedFoods.map((food: any) => (
                    <Link to={`/food/${food.id}`} key={food.id} className="block">
                      <div className="bg-background rounded overflow-hidden border hover:shadow-md transition-all">
                        <div className="h-20 overflow-hidden">
                          <img 
                            src={food.imageUrl} 
                            alt={food.name} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{food.name}</p>
                          <p className="text-xs text-muted-foreground">{food.category}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">External Resources</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li>
                    <a 
                      href={`https://www.foodsafety.gov/keep-food-safe/foodkeeper-app`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <ExternalLink size={14} className="mr-2" />
                      <span>USDA FoodKeeper App</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href={`https://www.fda.gov/food/buy-store-serve-safe-food/storing-food-safely`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <ExternalLink size={14} className="mr-2" />
                      <span>FDA Safe Food Storage Guidelines</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href={`https://www.stilltasty.com/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <ExternalLink size={14} className="mr-2" />
                      <span>StillTasty Food Storage Database</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FoodDetail;
