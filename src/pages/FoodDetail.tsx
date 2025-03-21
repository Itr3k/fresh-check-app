import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Refrigerator, Snowflake, Home, Calendar, Info } from "lucide-react";
import StatusIndicator from "../components/StatusIndicator";
import PageTransition from "../components/PageTransition";
import AdUnit from "../components/AdUnit";

const getFoodDetails = (id: string) => {
  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    imageUrl: `https://images.unsplash.com/photo-1546069901-${id}?w=800&h=400&fit=crop`,
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

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [storageType, setStorageType] = useState<StorageType>("refrigerator");
  const [isOpened, setIsOpened] = useState(true);
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<"fresh" | "use-soon" | "expired">("fresh");
  const [daysText, setDaysText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (id) {
        setFood(getFoodDetails(id));
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

  const pageTitle = `How Long Does ${food?.name} Last? - Fresh Check`;
  const pageDescription = `Learn if your ${food?.name?.toLowerCase()} is still good to eat. Check storage times, expiration guidelines, and freshness indicators.`;
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How long does ${food?.name?.toLowerCase()} last in the refrigerator?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${food?.name} lasts ${food?.storageOptions[0].unopened.minDays}-${food?.storageOptions[0].unopened.maxDays} days unopened and ${food?.storageOptions[0].opened.minDays}-${food?.storageOptions[0].opened.maxDays} days after opening when stored in the refrigerator.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does ${food?.name?.toLowerCase()} last in the freezer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${food?.name} lasts ${food?.storageOptions[1].unopened.minDays}-${food?.storageOptions[1].unopened.maxDays} days unopened and ${food?.storageOptions[1].opened.minDays}-${food?.storageOptions[1].opened.maxDays} days after opening when stored in the freezer.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I tell if ${food?.name?.toLowerCase()} has gone bad?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Signs that ${food?.name?.toLowerCase()} has gone bad include: ${food?.spoilageIndicators.visual.join(", ")} (visual); ${food?.spoilageIndicators.smell.join(", ")} (smell); and ${food?.spoilageIndicators.texture.join(", ")} (texture).`
        }
      }
    ]
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://freshcheck.app/food/${id}`} />
        <link rel="canonical" href={`https://freshcheck.app/food/${id}`} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
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
              src={food.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
              alt={`Fresh ${food.name.toLowerCase()} - storage and expiration guide`} 
              className="w-full h-full object-cover"
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
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Storage Options</h2>
              
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setStorageType("refrigerator")}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
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
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
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
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
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

            <div className="bg-white rounded-xl shadow-sm p-6">
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
