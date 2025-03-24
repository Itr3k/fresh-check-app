import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Refrigerator, Snowflake, Home, Calendar, Info, BookOpen, ShieldAlert, ExternalLink, Save, Printer, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import StatusIndicator from "../components/StatusIndicator";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getFoodById } from "../data/foodData";
import { useImages } from "../contexts/ImagesContext";

const getFoodDetails = (id: string, getImageUrl: (id: string) => string) => {
  const foodFromDatabase = getFoodById(id);

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

  const getSpoilageSigns = (id: string, category?: string) => {
    // Define food-specific spoilage signs
    if (id === "milk") {
      return "Sour smell, curdled texture, yellow discoloration, or unusual thickness.";
    }
    
    if (id === "eggs") {
      return "Foul odor when cracked, discolored yolk, or floating in water (fresh eggs sink).";
    }
    
    if (id === "chicken-raw" || id === "chicken") {
      return "Slimy texture, grayish color, strong ammonia-like odor, or sticky film on the surface.";
    }
    
    if (id === "chicken-cooked") {
      return "Sour smell, slimy texture, mold, or discoloration.";
    }
    
    if (id === "tomatoes") {
      return "Mold spots, leaking fluid, wrinkled skin, or fermented smell.";
    }
    
    if (id === "bananas") {
      return "Black skin (beyond normal ripening), mold, fruit flies, fermented smell, or liquid leakage.";
    }
    
    if (id === "avocados") {
      return "Brown stringy flesh, rancid smell, excessive mushiness, or visible mold.";
    }
    
    if (id === "bread") {
      return "Visible mold spots (any color), stale texture, sour or strange smell.";
    }
    
    if (id === "cheese") {
      return "Mold not typical for the cheese type, ammonia smell, slimy texture, or changed color.";
    }
    
    if (id === "yogurt") {
      return "Excessive liquid, mold, off-putting smell, or curdled appearance beyond normal separation.";
    }
    
    if (id === "salmon" || id === "tuna" || id === "shrimp" || id === "cod") {
      return "Fishy or ammonia-like smell, slimy texture, dull or discolored flesh, or milky residue.";
    }
    
    if (id === "lettuce" || id === "spinach") {
      return "Slimy texture, brown or black discoloration, wilting beyond normal, or foul odor.";
    }
    
    if (id === "apples") {
      return "Soft spots, wrinkled skin, brown flesh discoloration, fermented smell, or visible mold.";
    }
    
    if (id === "oranges") {
      return "Soft spots, white or green mold, unusual softness, fermented smell, or dried out appearance.";
    }
    
    // Category-based spoilage signs
    if (category === "Meat & Poultry") {
      return "Slimy texture, discoloration (gray/green/brown), sour smell, or unusual stickiness.";
    }
    
    if (category === "Seafood") {
      return "Fishy or ammonia-like smell, slimy texture, dull or discolored flesh, or milky residue.";
    }
    
    if (category === "Dairy") {
      return "Sour smell, unusual texture, curdling, mold, or discoloration.";
    }
    
    if (category === "Fruit") {
      return "Mold growth, unusual softness or mushiness, fermented smell, or leaking fluids.";
    }
    
    if (category === "Vegetables") {
      return "Slimy texture, discoloration, wilting, strong odor, or visible mold.";
    }
    
    if (category === "Bakery") {
      return "Mold growth, stale texture, off-putting smell, or unusual hardness.";
    }
    
    // Default spoilage signs if no specific food or category match is found
    return "Mold, discoloration, sour smell, or slimy texture.";
  };
  
  const getBestStorageTip = (id: string, category?: string) => {
    if (id === "milk") {
      return "Store on interior refrigerator shelf, not in the door where temperature fluctuates.";
    }
    
    if (id === "eggs") {
      return "Keep in original carton on interior refrigerator shelf to maintain humidity and prevent odor absorption.";
    }
    
    if (id === "chicken-raw" || id === "chicken") {
      return "Store on bottom shelf of refrigerator in original packaging or airtight container to prevent cross-contamination.";
    }
    
    if (id === "bananas") {
      return "Store at room temperature until ripe, then refrigerate to extend shelf life if needed.";
    }
    
    if (id === "avocados") {
      return "Ripen at room temperature, then refrigerate to slow further ripening.";
    }
    
    if (id === "cheese") {
      return "Wrap in cheese paper or wax paper, then loosely in plastic wrap to allow breathing while preventing drying.";
    }
    
    if (id === "bread") {
      return "Store in a cool, dry place in paper bag or bread box. Freeze sliced bread for longer storage.";
    }
    
    if (id === "tomatoes") {
      return "Store at room temperature stem-side down until fully ripe, then refrigerate if needed.";
    }
    
    if (id === "lettuce") {
      return "Wrap in paper towel and store in perforated plastic bag in crisper drawer.";
    }
    
    if (category === "Meat & Poultry") {
      return "Store on lowest shelf of refrigerator in original packaging or airtight container.";
    }
    
    if (category === "Seafood") {
      return "Keep on ice or in coldest part of refrigerator and use within 1-2 days of purchase.";
    }
    
    if (category === "Fruit") {
      return "Most fruits should be stored in the crisper drawer. Keep ethylene-producing fruits separate from ethylene-sensitive ones.";
    }
    
    if (category === "Vegetables") {
      return "Store most vegetables in crisper drawer with appropriate humidity settings.";
    }
    
    if (category === "Bakery") {
      return "Store in airtight container at room temperature or freeze for longer preservation.";
    }
    
    // Default tip if no specific match is found
    return "Keep refrigerated in original packaging until ready to use.";
  };

  const calculateFreshness = (storageType: string, isOpened: boolean) => {
    const currentDate = new Date();
    const randomBoughtDate = new Date(currentDate);
    randomBoughtDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 10) - 1);
    
    const storageOptions = getStorageOptions(id, foodFromDatabase?.category);
    const selectedOption = storageOptions.find(opt => opt.storageType === storageType) || storageOptions[0];
    const storageDetails = isOpened ? selectedOption.opened : selectedOption.unopened;
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
      maxDays,
      storageDetails
    };
  };

  const getRelatedFoods = (id: string) => {
    const allFoods = [
      { id: "chicken", name: "Chicken", category: "Meat" },
      { id: "milk", name: "Milk", category: "Dairy" },
      { id: "eggs", name: "Eggs", category: "Dairy" },
      { id: "bread", name: "Bread", category: "Bakery" },
      { id: "bananas", name: "Bananas", category: "Fruits" },
      { id: "apples", name: "Apples", category: "Fruits" },
      { id: "cheese", name: "Cheese", category: "Dairy" },
      { id: "lettuce", name: "Lettuce", category: "Vegetables" },
      { id: "tomatoes", name: "Tomatoes", category: "Vegetables" },
      { id: "bacon", name: "Bacon", category: "Meat" },
      { id: "yogurt", name: "Yogurt", category: "Dairy" },
      { id: "tofu", name: "Tofu", category: "Specialty Items" },
      { id: "oranges", name: "Oranges", category: "Fruits" },
      { id: "onions", name: "Onions", category: "Vegetables" }
    ].filter(food => food.id !== id);
    
    const sameCategory = allFoods.filter(food => foodFromDatabase && food.category === foodFromDatabase.category);
    
    if (sameCategory.length >= 3) {
      const shuffled = [...sameCategory].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    } else {
      const otherFoods = allFoods.filter(food => foodFromDatabase && food.category !== foodFromDatabase.category);
      const shuffledOthers = [...otherFoods].sort(() => 0.5 - Math.random());
      return [...sameCategory, ...shuffledOthers].slice(0, 3);
    }
  };

  const imageUrl = getImageUrl(id);
  const storageOptions = getStorageOptions(id, foodFromDatabase?.category);
  const freshness = calculateFreshness("refrigerator", false);
  const relatedFoods = getRelatedFoods(id);
  const spoilageSigns = getSpoilageSigns(id, foodFromDatabase?.category);
  const bestStorageTip = getBestStorageTip(id, foodFromDatabase?.category);

  return {
    id,
    name: foodFromDatabase?.name || id.charAt(0).toUpperCase() + id.slice(1),
    imageUrl,
    category: foodFromDatabase?.category || "Unknown",
    storageOptions,
    freshness,
    relatedFoods,
    calculateFreshness,
    spoilageSigns,
    bestStorageTip
  };
};

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [foodDetails, setFoodDetails] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>("refrigerator");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [freshness, setFreshness] = useState<any>(null);
  const isMobile = useIsMobile();
  const { getImageUrl } = useImages();

  useEffect(() => {
    if (id) {
      const details = getFoodDetails(id, getImageUrl);
      setFoodDetails(details);
      // Calculate initial freshness state
      const initialFreshness = details.calculateFreshness(selectedStorage, isOpened);
      setFreshness(initialFreshness);
    }
  }, [id, getImageUrl]);

  // Update freshness when storage type or opened state changes
  useEffect(() => {
    if (foodDetails) {
      const newFreshness = foodDetails.calculateFreshness(selectedStorage, isOpened);
      setFreshness(newFreshness);
    }
  }, [selectedStorage, isOpened, foodDetails]);

  if (!foodDetails || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/30"></div>
          <div className="h-4 w-32 rounded bg-primary/20"></div>
        </div>
      </div>
    );
  }

  const { 
    name, 
    category, 
    storageOptions, 
    relatedFoods,
    spoilageSigns,
    bestStorageTip 
  } = foodDetails;

  const handlePrintInfo = () => {
    window.print();
    toast.success("Printing food storage information");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{`${name} Storage Guide - FreshCheck`}</title>
        <meta 
          name="description" 
          content={`Learn how to properly store ${name} in your refrigerator, freezer, or pantry to maximize freshness and minimize food waste.`}
        />
        <meta property="og:title" content={`${name} Storage Guide - FreshCheck`} />
        <meta property="og:description" content={`Learn how to properly store ${name}.`} />
        <meta property="og:image" content={getImageUrl(id)} />
        <link rel="canonical" href={`https://freshcheck.app/food/${id}`} />
      </Helmet>
      
      {isMobile ? (
        <div className="pb-16">
          <div className="p-3 bg-gray-50 border-b">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground">
              <ArrowLeft className="h-3 w-3 mr-1" />
              <span>Home</span>
              <span className="mx-1">/</span>
              {category && <span>{category}</span>}
              <span className="mx-1">/</span>
              <span className="font-medium text-foreground">{name}</span>
            </Link>
          </div>
          
          <div className="my-2 px-3">
            <AdUnit format="mobile_banner" responsive={true} className="w-full" />
          </div>
          
          <div className="px-4 py-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            {category && (
              <div className="text-sm text-muted-foreground">{category}</div>
            )}
          </div>
          
          <div className="px-4 mb-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={getImageUrl(id)}
                alt={`${name} - food storage information`}
                className="w-full h-auto object-cover aspect-video"
                loading="eager"
              />
            </div>
          </div>
          
          <div className="px-4 mb-3">
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold">Best Storage</h2>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                {bestStorageTip}
              </p>
            </div>
          </div>
          
          <div className="px-4 mb-3">
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold">Typical Shelf Life</h2>
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              {freshness && (
                <p className="text-sm text-muted-foreground">
                  {isOpened ? 
                    `${freshness.storageDetails.minDays}-${freshness.storageDetails.maxDays} days when opened.` : 
                    `${freshness.storageDetails.minDays}-${freshness.storageDetails.maxDays} days when stored properly.`}
                </p>
              )}
            </div>
          </div>
          
          <div className="px-4 mb-3">
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold">Signs of Spoilage</h2>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <p className="text-sm text-muted-foreground">
                {spoilageSigns}
              </p>
            </div>
          </div>
          
          <div className="px-4 mb-4">
            <div className="border rounded-lg p-3 bg-white">
              <h2 className="font-semibold mb-2">Storage Options</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Select storage method to see detailed recommendations
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {storageOptions.map((option: any) => (
                  <Button
                    key={option.storageType}
                    variant={selectedStorage === option.storageType ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStorage(option.storageType)}
                    className="flex items-center gap-1.5 py-1 h-8"
                  >
                    {option.storageType === "refrigerator" && <Refrigerator className="h-3.5 w-3.5" />}
                    {option.storageType === "freezer" && <Snowflake className="h-3.5 w-3.5" />}
                    {option.storageType === "pantry" && <Home className="h-3.5 w-3.5" />}
                    <span className="capitalize">{option.storageType}</span>
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="opened"
                    checked={isOpened}
                    onChange={(e) => setIsOpened(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="opened" className="ml-2 text-sm">
                    Opened/Cut
                  </label>
                </div>
              </div>
              
              {freshness && (
                <div className="flex items-center justify-between border-t pt-3 text-sm">
                  <div>
                    <div className="font-medium">Shelf Life</div>
                    <div className="text-muted-foreground">
                      ~{freshness.daysRemaining > 0 ? freshness.daysRemaining : 0} days
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-right">Status</div>
                    <div className={`
                      ${freshness.status === "fresh" ? "text-green-600" : ""}
                      ${freshness.status === "use-soon" ? "text-orange-600" : ""}
                      ${freshness.status === "expired" ? "text-red-600" : ""}
                    `}>
                      {freshness.status === "fresh" && "Fresh"}
                      {freshness.status === "use-soon" && "Use Soon"}
                      {freshness.status === "expired" && "Expired"}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-t pt-3 mt-3">
                <div className="font-medium mb-1">Storage Tips</div>
                <p className="text-sm text-muted-foreground">
                  {freshness?.storageDetails.notes}
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-4 mb-4">
            <div className="border rounded-lg p-3 bg-white">
              <h2 className="font-semibold mb-3">Actions</h2>
              
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="flex items-center w-full justify-start gap-2 h-10">
                  <Save className="h-4 w-4" />
                  <span>Save to My Foods</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center w-full justify-start gap-2 h-10" onClick={handlePrintInfo}>
                  <Printer className="h-4 w-4" />
                  <span>Print Storage Guide</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center w-full justify-start gap-2 h-10">
                  <Info className="h-4 w-4" />
                  <span>Detailed Storage Info</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center w-full justify-start gap-2 h-10">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Food Safety Tips</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="px-4 mb-4">
            <div className="border rounded-lg p-3 bg-white">
              <h2 className="font-semibold mb-3">Related Foods</h2>
              
              <div className="space-y-2">
                {relatedFoods.map((food: any) => (
                  <Link 
                    key={food.id} 
                    to={`/food/${food.id}`} 
                    className="flex items-center border rounded-md p-2 hover:bg-gray-50"
                  >
                    <div className="w-16 h-12 rounded overflow-hidden mr-3">
                      <img 
                        src={getImageUrl(food.id)} 
                        alt={food.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-xs text-muted-foreground">{food.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="px-4 mb-8">
            <div className="border rounded-lg p-3 bg-white">
              <h2 className="font-semibold mb-3">External Resources</h2>
              
              <div className="space-y-2">
                <a 
                  href="https://www.foodsafety.gov/foodkeeper-app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  <span>USDA FoodKeeper App</span>
                </a>
                
                <a 
                  href="https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  <span>FDA Safe Food Storage Guidelines</span>
                </a>
                
                <a 
                  href="https://www.stilltasty.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  <span>StillTasty Food Storage Database</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="px-4 mb-8">
            <AdUnit format="rectangle" responsive={true} className="w-full" />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to all foods</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img 
                  src={getImageUrl(id)}
                  alt={`${name} - food storage information`}
                  width="800"
                  height="500"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="print:hidden mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrintInfo} 
                    className="flex items-center gap-1"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard.writeText(url);
                      toast.success("Link copied to clipboard");
                    }}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              {category && (
                <div className="text-muted-foreground mb-4">{category}</div>
              )}
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Storage Location</h2>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {storageOptions.map((option: any) => (
                    <Button
                      key={option.storageType}
                      variant={selectedStorage === option.storageType ? "default" : "outline"}
                      onClick={() => setSelectedStorage(option.storageType)}
                      className="flex items-center gap-2"
                    >
                      {option.storageType === "refrigerator" && <Refrigerator className="h-4 w-4" />}
                      {option.storageType === "freezer" && <Snowflake className="h-4 w-4" />}
                      {option.storageType === "pantry" && <Home className="h-4 w-4" />}
                      <span className="capitalize">{option.storageType}</span>
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="opened"
                      checked={isOpened}
                      onChange={(e) => setIsOpened(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="opened" className="ml-2 text-sm font-medium">
                      Opened/Cut
                    </label>
                  </div>
                </div>
              </div>
              
              {freshness && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Freshness Timeline</h2>
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-100">
                    <StatusIndicator 
                      status={freshness.status} 
                      daysRemaining={freshness.daysRemaining} 
                      maxDays={freshness.maxDays}
                    />
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p className="mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        <span>Storage Time: {freshness.storageDetails.minDays}-{freshness.storageDetails.maxDays} days</span>
                      </p>
                      <p>{freshness.storageDetails.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Signs of Spoilage</h2>
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-100">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{spoilageSigns}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Best Storage Practices</h2>
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-100">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{bestStorageTip}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Storage Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {storageOptions.map((option: any) => (
                <div key={option.storageType} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center mb-3">
                    {option.storageType === "refrigerator" && <Refrigerator className="h-5 w-5 mr-2 text-blue-500" />}
                    {option.storageType === "freezer" && <Snowflake className="h-5 w-5 mr-2 text-cyan-500" />}
                    {option.storageType === "pantry" && <Home className="h-5 w-5 mr-2 text-amber-500" />}
                    <h3 className="text-lg font-medium capitalize">{option.storageType}</h3>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Unopened</p>
                    {option.unopened.maxDays > 0 ? (
                      <p className="text-sm">{option.unopened.minDays !== option.unopened.maxDays ? `${option.unopened.minDays}-` : ''}{option.unopened.maxDays} days</p>
                    ) : (
                      <p className="text-sm">Not recommended</p>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Opened/Cut</p>
                    {option.opened.maxDays > 0 ? (
                      <p className="text-sm">{option.opened.minDays !== option.opened.maxDays ? `${option.opened.minDays}-` : ''}{option.opened.maxDays} days</p>
                    ) : (
                      <p className="text-sm">Not recommended</p>
                    )}
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <Info className="inline h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{option.unopened.notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="print:hidden my-8">
            <AdUnit className="mx-auto" />
          </div>
          
          <div className="print:hidden mt-10">
            <h2 className="text-2xl font-semibold mb-4">Related Foods</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedFoods.map((food: any, index: number) => (
                <Link to={`/food/${food.id}`} key={food.id} className="block">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="h-24 md:h-32 overflow-hidden">
                      <img 
                        src={getImageUrl(food.id)}
                        alt={food.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium truncate">{food.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="print:hidden mt-16 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Food Safety Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/food-safety/temperature-danger-zone" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Temperature Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">Learn about safe temperature ranges for food storage</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/food-safety/cross-contamination" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-start">
                  <ShieldAlert className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Preventing Cross-Contamination</h3>
                    <p className="text-sm text-muted-foreground">Tips to avoid the spread of harmful bacteria</p>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="mt-4">
              <a 
                href="https://www.foodsafety.gov/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <span>More food safety information</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default FoodDetail;
