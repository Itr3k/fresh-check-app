
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Thermometer, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  FileDown,
  ExternalLink
} from "lucide-react";
import PageTransition from "../../components/PageTransition";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AdUnit from "../../components/AdUnit";

const TemperatureDangerZone = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Schema.org structured data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Avoid the Food Temperature Danger Zone",
    "description": "Learn how to keep food out of the temperature danger zone (40°F-140°F/4°C-60°C) to prevent bacterial growth and foodborne illness.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Keep cold foods cold",
        "text": "Keep cold foods at or below 40°F (4°C) by storing them in the refrigerator or on ice."
      },
      {
        "@type": "HowToStep",
        "name": "Keep hot foods hot",
        "text": "Keep hot foods at or above 140°F (60°C) by using chafing dishes, slow cookers, or warming trays."
      },
      {
        "@type": "HowToStep",
        "name": "Cool foods rapidly",
        "text": "Cool cooked foods from 140°F to 70°F (60°C to 21°C) within 2 hours and from 70°F to 40°F (21°C to 4°C) within 4 hours."
      },
      {
        "@type": "HowToStep",
        "name": "Use the 2-hour rule",
        "text": "Never leave perishable food out at room temperature for more than 2 hours (1 hour if the temperature is above 90°F/32°C)."
      }
    ]
  };
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the temperature danger zone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The temperature danger zone is the range between 40°F and 140°F (4°C and 60°C) where bacteria multiply most rapidly, potentially doubling in number every 20 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "How long can food stay in the danger zone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Food should not remain in the temperature danger zone for more than 2 hours. If the ambient temperature is above 90°F (32°C), the time limit drops to 1 hour."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 2-hour rule in food safety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 2-hour rule states that perishable food left at room temperature for more than 2 hours should be discarded. In hot weather (above 90°F/32°C), this time reduces to 1 hour."
        }
      }
    ]
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Food Temperature Danger Zone - Complete Guide | FreshCheck</title>
        <meta 
          name="description" 
          content="The temperature danger zone (40°F-140°F) allows rapid bacteria growth. Learn safe cooking temperatures, cooling methods, and how to prevent foodborne illness."
        />
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link to="/food-safety" className="text-muted-foreground hover:text-primary">Food Safety</Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-primary font-medium">Temperature Danger Zone</li>
            </ol>
          </nav>

          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Understanding the Food Temperature Danger Zone
            </h1>
            
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer size={16} className="mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <FileDown size={16} className="mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <Calendar size={16} className="mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Last updated: September 15, 2023</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-muted-foreground">Information verified by USDA and FDA guidelines</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    <strong>Key Food Safety Alert:</strong> Bacteria multiply most rapidly between 40°F and 140°F (4°C and 60°C), 
                    doubling in as little as 20 minutes. Keep hot foods hot and cold foods cold!
                  </p>
                </div>
              </div>
              
              <h2 id="what-is-temperature-danger-zone" className="text-2xl font-semibold mt-8 mb-4 flex items-center">
                <Thermometer className="mr-2 text-primary" />
                What is the Temperature Danger Zone?
              </h2>
              
              <p>
                The <strong>Temperature Danger Zone</strong> refers to the temperature range between 40°F and 140°F (4°C and 60°C) 
                where bacteria grow most rapidly on food. At these temperatures, bacteria can double in number every 20 minutes, 
                quickly reaching levels that can cause foodborne illness.
              </p>
              
              <div className="my-8 relative">
                <div className="bg-gradient-to-r from-blue-500 to-red-500 h-24 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-[20%] text-white text-sm font-bold">
                      40°F (4°C)
                    </div>
                    <div className="absolute top-2 right-[20%] text-white text-sm font-bold">
                      140°F (60°C)
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/20 px-3 py-1 rounded text-white font-bold">
                      DANGER ZONE
                    </div>
                    <div className="absolute left-[20%] h-full border-l-2 border-dashed border-white" />
                    <div className="absolute right-[20%] h-full border-l-2 border-dashed border-white" />
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <div className="text-blue-600">
                    <span className="font-semibold">Cold Zone</span>
                    <br />
                    Bacteria growth slows
                  </div>
                  <div className="text-yellow-700">
                    <span className="font-semibold">Danger Zone</span>
                    <br />
                    Rapid bacteria growth
                  </div>
                  <div className="text-red-600">
                    <span className="font-semibold">Hot Zone</span>
                    <br />
                    Bacteria are killed
                  </div>
                </div>
              </div>
              
              <h2 id="why-its-important" className="text-2xl font-semibold mt-8 mb-4">
                Why the Danger Zone Matters
              </h2>
              
              <p>
                Understanding the temperature danger zone is crucial for food safety because:
              </p>
              
              <ul>
                <li><strong>Bacterial Growth:</strong> Pathogenic bacteria that cause foodborne illness multiply most rapidly in the danger zone</li>
                <li><strong>Toxin Production:</strong> Some bacteria produce heat-resistant toxins that aren't destroyed by cooking</li>
                <li><strong>Food Quality:</strong> Extended time in the danger zone affects taste, texture, and nutritional value</li>
              </ul>
              
              <h2 id="bacteria-growth-chart" className="text-2xl font-semibold mt-8 mb-4">
                Bacteria Growth Rate Chart
              </h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="py-2 px-4 border-b text-left">Time in Danger Zone</th>
                      <th className="py-2 px-4 border-b text-left">Potential Bacteria Growth</th>
                      <th className="py-2 px-4 border-b text-left">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">20 minutes</td>
                      <td className="py-2 px-4 border-b">2x initial amount</td>
                      <td className="py-2 px-4 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <CheckCircle2 size={12} className="mr-1" /> Low
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">1 hour</td>
                      <td className="py-2 px-4 border-b">8x initial amount</td>
                      <td className="py-2 px-4 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          <AlertTriangle size={12} className="mr-1" /> Medium
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">2 hours</td>
                      <td className="py-2 px-4 border-b">64x initial amount</td>
                      <td className="py-2 px-4 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                          <AlertTriangle size={12} className="mr-1" /> Medium-High
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">4 hours</td>
                      <td className="py-2 px-4 border-b">4,096x initial amount</td>
                      <td className="py-2 px-4 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          <XCircle size={12} className="mr-1" /> High
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">6 hours</td>
                      <td className="py-2 px-4 border-b">262,144x initial amount</td>
                      <td className="py-2 px-4 border-b">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                          <XCircle size={12} className="mr-1" /> Extreme
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h2 id="the-two-hour-rule" className="text-2xl font-semibold mt-8 mb-4">
                The 2-Hour / 1-Hour Rule
              </h2>
              
              <p>
                To prevent foodborne illness, follow these important time guidelines:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Standard Conditions</h3>
                    <p className="text-sm mb-4">When ambient temperature is below 90°F (32°C)</p>
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-yellow-50 flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-yellow-600">2hr</span>
                      </div>
                      <div>
                        <p className="text-sm">Perishable food should not remain in the danger zone for more than <strong>2 hours</strong></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Hot Weather</h3>
                    <p className="text-sm mb-4">When ambient temperature is above 90°F (32°C)</p>
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-red-600">1hr</span>
                      </div>
                      <div>
                        <p className="text-sm">Perishable food should not remain in the danger zone for more than <strong>1 hour</strong></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h2 id="safe-cooking-temperatures" className="text-2xl font-semibold mt-8 mb-4">
                Safe Cooking Temperatures
              </h2>
              
              <p>
                To ensure harmful bacteria are destroyed, cook foods to these minimum internal temperatures:
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="py-2 px-4 border-b text-left">Food</th>
                      <th className="py-2 px-4 border-b text-left">Safe Minimum Temperature</th>
                      <th className="py-2 px-4 border-b text-left">Rest Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">Ground Meat (beef, pork, veal, lamb)</td>
                      <td className="py-2 px-4 border-b">160°F (71°C)</td>
                      <td className="py-2 px-4 border-b">None</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Ground Poultry (chicken, turkey)</td>
                      <td className="py-2 px-4 border-b">165°F (74°C)</td>
                      <td className="py-2 px-4 border-b">None</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Beef, Pork, Veal, Lamb (steaks, roasts, chops)</td>
                      <td className="py-2 px-4 border-b">145°F (63°C)</td>
                      <td className="py-2 px-4 border-b">3 minutes</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Poultry (whole or parts)</td>
                      <td className="py-2 px-4 border-b">165°F (74°C)</td>
                      <td className="py-2 px-4 border-b">None</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Fish & Shellfish</td>
                      <td className="py-2 px-4 border-b">145°F (63°C)</td>
                      <td className="py-2 px-4 border-b">None</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Eggs</td>
                      <td className="py-2 px-4 border-b">160°F (71°C)</td>
                      <td className="py-2 px-4 border-b">None</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">Leftovers & Casseroles</td>
                      <td className="py-2 px-4 border-b">165°F (74°C)</td>
                      <td className="py-2 px-4 border-b">None</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center mb-6 mt-4 text-sm">
                <ExternalLink size={16} className="mr-2 text-primary" />
                <a 
                  href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Source: USDA Safe Temperature Chart
                </a>
              </div>
              
              <h2 id="proper-cooling-methods" className="text-2xl font-semibold mt-8 mb-4">
                Proper Cooling Methods
              </h2>
              
              <p>
                When cooling cooked foods, follow the "two-stage cooling process" recommended by the FDA:
              </p>
              
              <ol className="space-y-4 mt-4">
                <li className="p-4 bg-muted rounded-lg">
                  <span className="font-semibold block mb-1">Stage 1:</span> 
                  Cool food from 140°F to 70°F (60°C to 21°C) within 2 hours
                </li>
                <li className="p-4 bg-muted rounded-lg">
                  <span className="font-semibold block mb-1">Stage 2:</span> 
                  Cool food from 70°F to 40°F (21°C to 4°C) within an additional 4 hours
                </li>
              </ol>
              
              <div className="mt-6 mb-8">
                <h3 className="text-lg font-medium mb-3">Safe Cooling Methods:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 size={20} className="text-green-600 mr-2 mt-0.5" />
                    <span>Divide large amounts of food into smaller, shallow containers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={20} className="text-green-600 mr-2 mt-0.5" />
                    <span>Use ice water baths to quickly cool containers of hot food</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={20} className="text-green-600 mr-2 mt-0.5" />
                    <span>Use ice paddles or frozen gel packs when stirring large containers of liquid foods</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 size={20} className="text-green-600 mr-2 mt-0.5" />
                    <span>Arrange food in containers to maximize heat transfer</span>
                  </li>
                </ul>
              </div>
              
              <h2 id="frequently-asked-questions" className="text-2xl font-semibold mt-8 mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">What happens if food stays in the danger zone too long?</h3>
                  <p className="text-sm">
                    Food left in the danger zone for too long allows bacteria to multiply to dangerous levels, increasing the risk of foodborne illness.
                    Even if the food looks and smells normal, it could contain enough bacteria to make people sick.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Can I tell if food has been in the danger zone too long by smell or appearance?</h3>
                  <p className="text-sm">
                    No, you cannot reliably detect dangerous bacterial growth through smell, taste, or appearance. 
                    Some harmful bacteria produce no noticeable changes to food, while still making it unsafe to eat.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Is it safe to thaw food at room temperature?</h3>
                  <p className="text-sm">
                    No, thawing food at room temperature is not safe because the outer portions of the food can enter the danger zone while the center remains frozen.
                    Always thaw food in the refrigerator, in cold water (changing water every 30 minutes), or in the microwave.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">What is the best way to reheat leftovers safely?</h3>
                  <p className="text-sm">
                    Reheat leftovers to an internal temperature of 165°F (74°C) throughout. For liquids like soups and sauces, bring them to a rolling boil.
                    Use a food thermometer to verify the temperature.
                  </p>
                </div>
              </div>
              
              <h2 id="related-resources" className="text-2xl font-semibold mt-8 mb-4">
                Related Food Safety Resources
              </h2>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <Link to="/food-safety/foodborne-illness-prevention" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Common Foodborne Illnesses: Symptoms and Prevention</h3>
                    <p className="text-sm text-muted-foreground">Learn about major pathogens and how to prevent food poisoning</p>
                  </Link>
                </li>
                <li>
                  <Link to="/food-safety/prevent-cross-contamination" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Cross-Contamination: How to Keep Your Kitchen Safe</h3>
                    <p className="text-sm text-muted-foreground">Techniques to prevent spreading bacteria between foods</p>
                  </Link>
                </li>
                <li>
                  <Link to="/food-safety/emergency" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Emergency Food Safety: Power Outages and Disasters</h3>
                    <p className="text-sm text-muted-foreground">What to do when refrigeration is compromised</p>
                  </Link>
                </li>
                <li>
                  <Link to="/food-safety/vulnerable-groups" className="block p-4 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                    <h3 className="font-medium mb-1">Food Safety for Special Populations</h3>
                    <p className="text-sm text-muted-foreground">Extra precautions for vulnerable groups</p>
                  </Link>
                </li>
              </ul>
              
              <div className="mt-8 mb-4">
                <h3 className="text-lg font-medium mb-2">Authoritative Sources</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <ExternalLink size={16} className="mr-2 text-primary" />
                    <a 
                      href="https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      FDA Safe Food Handling
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink size={16} className="mr-2 text-primary" />
                    <a 
                      href="https://www.usda.gov/media/blog/2020/03/02/how-temperatures-affect-food" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      USDA: How Temperatures Affect Food
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink size={16} className="mr-2 text-primary" />
                    <a 
                      href="https://www.cdc.gov/foodsafety/keep-food-safe.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      CDC Food Safety Guidelines
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="print:hidden my-8 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-4">Find Safe Storage Times for Specific Foods</h3>
                <p className="mb-4">
                  Now that you understand temperature safety, check how long your specific foods last in different storage conditions:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Link to="/food/chicken" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Chicken</Link>
                  <Link to="/food/beef" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Beef</Link>
                  <Link to="/food/fish" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Fish</Link>
                  <Link to="/food/eggs" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Eggs</Link>
                  <Link to="/food/milk" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Milk</Link>
                  <Link to="/food/cheese" className="block p-2 bg-background border border-border rounded hover:bg-primary/5 text-center">Cheese</Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1 print:hidden">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AdUnit slotId="food-safety-sidebar" />
                
                <div className="mt-6 bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Quick Navigation</h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <a href="#what-is-temperature-danger-zone" className="text-primary hover:underline">
                        What is the Temperature Danger Zone?
                      </a>
                    </li>
                    <li>
                      <a href="#why-its-important" className="text-primary hover:underline">
                        Why It's Important
                      </a>
                    </li>
                    <li>
                      <a href="#bacteria-growth-chart" className="text-primary hover:underline">
                        Bacteria Growth Chart
                      </a>
                    </li>
                    <li>
                      <a href="#the-two-hour-rule" className="text-primary hover:underline">
                        The 2-Hour Rule
                      </a>
                    </li>
                    <li>
                      <a href="#safe-cooking-temperatures" className="text-primary hover:underline">
                        Safe Cooking Temperatures
                      </a>
                    </li>
                    <li>
                      <a href="#proper-cooling-methods" className="text-primary hover:underline">
                        Proper Cooling Methods
                      </a>
                    </li>
                    <li>
                      <a href="#frequently-asked-questions" className="text-primary hover:underline">
                        FAQs
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-medium mb-2 text-green-800">Download Our Free Resources</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FileDown size={16} className="mr-2 text-green-600" />
                      <a href="#" className="text-green-700 hover:underline text-sm">
                        Temperature Danger Zone Printable Chart
                      </a>
                    </li>
                    <li className="flex items-center">
                      <FileDown size={16} className="mr-2 text-green-600" />
                      <a href="#" className="text-green-700 hover:underline text-sm">
                        Safe Cooking Temperatures Quick Guide
                      </a>
                    </li>
                    <li className="flex items-center">
                      <FileDown size={16} className="mr-2 text-green-600" />
                      <a href="#" className="text-green-700 hover:underline text-sm">
                        Refrigerator Storage Checklist
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Related Food Items</h3>
                  <div className="space-y-3">
                    <Link to="/food/chicken" className="flex items-center bg-background p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=100&h=100&fit=crop" 
                        alt="Chicken" 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Chicken Storage Guide</h4>
                        <p className="text-xs text-muted-foreground">Safe storage times & temperatures</p>
                      </div>
                    </Link>
                    
                    <Link to="/food/eggs" className="flex items-center bg-background p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1607690424560-35d967d6ad7f?w=100&h=100&fit=crop" 
                        alt="Eggs" 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Egg Safety Guide</h4>
                        <p className="text-xs text-muted-foreground">Proper storage & handling tips</p>
                      </div>
                    </Link>
                    
                    <Link to="/food/milk" className="flex items-center bg-background p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop" 
                        alt="Milk" 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-sm">Milk & Dairy Storage</h4>
                        <p className="text-xs text-muted-foreground">Keep dairy products fresh longer</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TemperatureDangerZone;
