import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Refrigerator, Snowflake, Home, Calendar, Info, BookOpen, ShieldAlert, ExternalLink, Save, Printer, CheckCircle, AlertTriangle, AlertCircle, CalendarIcon } from "lucide-react";
import StatusIndicator from "../components/StatusIndicator";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getFoodById } from "../data/foodData";
import { useImages } from "../contexts/ImagesContext";
import { format, addDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
      return "Mold spots, leaking fluid, wrinkled skin, or fermented smell.";
    }
    
    // Default generic spoilage signs as fallback
    if (category === "Dairy") {
      return "Sour smell, mold growth, change in texture or color.";
    }
    
    if (category === "Meat") {
      return "Slimy texture, off-color (greyish or greenish), sour or ammonia smell.";
    }
    
    if (category === "Fruits") {
      return "Mold growth, fermented smell, excessive softening, leaking fluid.";
    }
    
    if (category === "Vegetables") {
      return "Sliminess, unusual color, strong odor, wilting beyond normal.";
    }
    
    return "Unusual smell, texture changes, discoloration, mold growth.";
  };

  const getBestStorageTip = (id: string, category?: string) => {
    const storageOptions = getStorageOptions(id, category);
    let bestOption = storageOptions[0];
    
    // Find storage type with longest shelf life for unopened product
    for (const option of storageOptions) {
      if (option.unopened.maxDays > bestOption.unopened.maxDays) {
        bestOption = option;
      }
    }
    
    return {
      storageType: bestOption.storageType,
      days: bestOption.unopened.maxDays,
      notes: bestOption.unopened.notes
    };
  };

  // Use the food data if found, otherwise create generic data
  if (foodFromDatabase) {
    const imageUrl = getImageUrl(id);
    
    return {
      id,
      name: foodFromDatabase.name,
      category: foodFromDatabase.category,
      image: imageUrl || '/placeholder.svg', 
      description: foodFromDatabase.description || `Information about ${foodFromDatabase.name} storage and shelf life.`,
      storageOptions: getStorageOptions(id, foodFromDatabase.category),
      spoilageSigns: getSpoilageSigns(id, foodFromDatabase.category),
      bestStorageTip: getBestStorageTip(id, foodFromDatabase.category)
    };
  }

  // Fallback for when food isn't found
  return {
    id,
    name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    category: 'General',
    image: '/placeholder.svg',
    description: 'Information about food storage
