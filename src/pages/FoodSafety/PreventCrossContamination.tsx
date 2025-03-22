import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Utensils, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Snowflake, 
  Thermometer, 
  XCircle,
  Printer, 
  FileDown,
  ExternalLink,
  Scissors,
  Salad
} from "lucide-react";
import PageTransition from "../../components/PageTransition";
import { Button } from "@/components/ui/button";
import Header from "../../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AdUnit from "../../components/AdUnit";

const PreventCrossContamination = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Prevent Cross-Contamination - FreshCheck Food Safety</title>
        <meta
          name="description"
          content="Learn how to prevent cross-contamination in the kitchen. Essential tips for proper food handling, cutting board safety, and preventing the spread of harmful bacteria."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Prevent Cross-Contamination in the Kitchen",
            "description": "Step-by-step guide to prevent cross-contamination and keep your kitchen safe",
            "image": "https://freshcheck.app/images/cross-contamination-prevention.jpg",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Clean surfaces and utensils",
                "text": "Clean and sanitize all surfaces, cutting boards, and utensils after each use, especially after handling raw meat, poultry, seafood, or eggs"
              },
              {
                "@type": "HowToStep",
                "name": "Separate raw and ready-to-eat foods",
                "text": "Keep raw meat, poultry, seafood, and eggs separate from ready-to-eat foods in your shopping cart, bags, and refrigerator"
              },
              {
                "@type": "HowToStep",
                "name": "Use separate cutting boards",
                "text": "Use one cutting board for fresh produce and a separate one for raw meat, poultry, and seafood"
              },
              {
                "@type": "HowToStep",
                "name": "Wash hands properly",
                "text": "Wash hands with soap and warm water for at least 20 seconds before and after handling food, especially raw items"
              }
            ],
            "tool": [
              "Cutting boards (separate for meat and produce)",
              "Soap and water",
              "Paper towels",
              "Kitchen sanitizer"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 pt-24 pb-16">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <Utensils size={24} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Prevent Cross-Contamination</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Keep your kitchen safe with proper food handling techniques
            </p>
          </div>

          <section className="mb-10">
            <div className="bg-secondary/30 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">What is Cross-Contamination?</h2>
              <p>
                Cross-contamination is the transfer of harmful bacteria, viruses, or other microorganisms from one food, 
                surface, or object to another. This is one of the most common causes of foodborne illness 
                and can happen at any stage of food handling, from shopping to serving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={20} className="text-destructive" />
                  <h3 className="font-semibold">Common Cross-Contamination Sources</h3>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Raw meat, poultry, and seafood juices</li>
                  <li>Unwashed hands after handling raw foods</li>
                  <li>Contaminated cutting boards and kitchen tools</li>
                  <li>Countertops and other food preparation surfaces</li>
                  <li>Reused marinade from raw meat</li>
                  <li>Kitchen cloths, sponges, and towels</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={20} className="text-primary" />
                  <h3 className="font-semibold">Why Prevention Matters</h3>
                </div>
                <p className="mb-2">
                  Proper cross-contamination prevention is crucial because:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>It prevents foodborne illness that can cause serious symptoms</li>
                  <li>Some bacteria like Salmonella and E. coli can cause severe illness even in small amounts</li>
                  <li>High-risk individuals (elderly, pregnant women, children, immunocompromised) are especially vulnerable</li>
                  <li>It maintains food quality and extends shelf life</li>
                </ul>
              </div>
            </div>
          </section>

          <AdUnit slotId="cross-contamination-top" className="my-8" format="leaderboard" />

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Core Prevention Strategies</h2>

            <Tabs defaultValue="clean" className="mb-8">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="clean">Clean</TabsTrigger>
                <TabsTrigger value="separate">Separate</TabsTrigger>
                <TabsTrigger value="cook">Cook</TabsTrigger>
                <TabsTrigger value="chill">Chill</TabsTrigger>
              </TabsList>
              
              <TabsContent value="clean">
                <div className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={24} className="text-blue-500" />
                    <h3 className="text-xl font-medium">Clean</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Keeping your hands, utensils, and surfaces clean is the first defense against cross-contamination.
                    </p>
                    
                    <div className="rounded-md bg-secondary/50 p-4">
                      <h4 className="font-semibold mb-2">Proper Hand Washing Technique</h4>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Wet hands with clean, running water (warm or cold)</li>
                        <li>Apply soap and lather by rubbing hands together</li>
                        <li>Scrub all surfaces for at least 20 seconds</li>
                        <li>Rinse hands thoroughly under running water</li>
                        <li>Dry hands using a clean towel or air dry</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">When to Wash Hands</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Before, during, and after preparing food</li>
                        <li>After handling raw meat, poultry, seafood, or eggs</li>
                        <li>Before eating</li>
                        <li>After touching garbage</li>
                        <li>After using the bathroom, blowing your nose, or changing diapers</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Surface and Utensil Cleaning</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Wash cutting boards, dishes, utensils, and countertops with hot, soapy water after each use</li>
                        <li>Consider using paper towels to clean kitchen surfaces or wash cloth towels frequently</li>
                        <li>Sanitize cutting boards and countertops regularly with a solution of 1 tablespoon of unscented liquid chlorine bleach in 1 gallon of water</li>
                        <li>Let sanitized surfaces air dry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="separate">
                <div className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Scissors size={24} className="text-red-500" />
                    <h3 className="text-xl font-medium">Separate</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Keep raw meat, poultry, seafood, and eggs separate from ready-to-eat foods to prevent cross-contamination.
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Cutting Board Safety</h4>
                      <div className="mb-4">
                        <p className="mb-2">Use separate cutting boards for:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-red-50 p-3 rounded-md">
                            <p className="font-medium text-red-700">Raw meat, poultry, and seafood</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-md">
                            <p className="font-medium text-green-700">Fresh produce and bread</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Consider color-coded cutting boards to easily distinguish between uses 
                        (e.g., red for raw meat, green for produce).
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Shopping and Storage</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Separate raw meat, poultry, seafood, and eggs from other foods in your shopping cart</li>
                        <li>Place raw meat, poultry, and seafood in plastic bags to prevent their juices from dripping onto other foods</li>
                        <li>Store raw meat, poultry, and seafood on the bottom shelf of the refrigerator to prevent juices from dripping onto other foods</li>
                        <li>Keep eggs in their original carton and store them in the main compartment of the refrigerator, not in the door</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Food Preparation</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use separate plates and utensils for raw foods and cooked foods</li>
                        <li>Never place cooked food on a plate that previously held raw meat, poultry, seafood, or eggs</li>
                        <li>Don't reuse marinades that have been used on raw foods unless you bring them to a boil first</li>
                        <li>Consider using different colored utensils for different types of food</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cook">
                <div className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer size={24} className="text-orange-500" />
                    <h3 className="text-xl font-medium">Cook</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Cooking food to the proper internal temperature kills harmful bacteria that cause foodborne illness.
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Safe Minimum Internal Temperatures</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Food</TableHead>
                            <TableHead>Temperature (°F)</TableHead>
                            <TableHead>Temperature (°C)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Beef, pork, veal, lamb (steaks, chops, roasts)</TableCell>
                            <TableCell>145°F with 3-minute rest</TableCell>
                            <TableCell>63°C with 3-minute rest</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Ground meats (beef, pork, veal, lamb)</TableCell>
                            <TableCell>160°F</TableCell>
                            <TableCell>71°C</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Poultry (whole, parts, ground)</TableCell>
                            <TableCell>165°F</TableCell>
                            <TableCell>74°C</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Fish & Shellfish</TableCell>
                            <TableCell>145°F</TableCell>
                            <TableCell>63°C</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Eggs</TableCell>
                            <TableCell>160°F (yolk and white firm)</TableCell>
                            <TableCell>71°C (yolk and white firm)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Leftovers & Casseroles</TableCell>
                            <TableCell>165°F</TableCell>
                            <TableCell>74°C</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-md">
                      <h4 className="font-semibold mb-2">Using a Food Thermometer</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Insert the thermometer into the thickest part of the food, away from bone, fat, or gristle</li>
                        <li>Clean the thermometer with hot, soapy water between uses</li>
                        <li>Digital thermometers provide faster, more accurate readings</li>
                        <li>Wait the recommended time for your thermometer to register temperature</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="chill">
                <div className="bg-background border border-border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Snowflake size={24} className="text-blue-500" />
                    <h3 className="text-xl font-medium">Chill</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p>
                      Refrigerate foods promptly and properly to slow the growth of harmful bacteria.
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Refrigerator and Freezer Temperatures</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-secondary/50 p-4 rounded-md">
                          <p className="font-medium mb-1">Refrigerator</p>
                          <p>40°F (4°C) or below</p>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-md">
                          <p className="font-medium mb-1">Freezer</p>
                          <p>0°F (-18°C) or below</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Refrigeration Guidelines</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Refrigerate perishable foods within 2 hours (1 hour if temperature is above 90°F/32°C)</li>
                        <li>Don't overstuff your refrigerator—cold air must circulate to keep food safe</li>
                        <li>Store raw meat, poultry, and seafood on the bottom shelf to prevent juices from dripping</li>
                        <li>Keep a thermometer in your refrigerator and freezer to monitor temperatures</li>
                        <li>Divide large amounts of leftovers into shallow containers for quicker cooling</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Thawing Safety</h4>
                      <p className="mb-2">Never thaw food at room temperature. Safe ways to thaw include:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>In the refrigerator</li>
                        <li>In cold water (change water every 30 minutes)</li>
                        <li>In the microwave (cook immediately after thawing)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Special Considerations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-3">Commercial Kitchens</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Follow HACCP (Hazard Analysis Critical Control Point) principles</li>
                  <li>Use color-coded equipment for different food types</li>
                  <li>Implement strict employee handwashing protocols</li>
                  <li>Train staff regularly on food safety procedures</li>
                  <li>Maintain separate preparation areas for raw and ready-to-eat foods</li>
                </ul>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-3">Kitchens Serving High-Risk Populations</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Consider using more disposable products to reduce cross-contamination</li>
                  <li>Implement more frequent sanitizing schedules</li>
                  <li>Cook foods to higher temperatures when appropriate</li>
                  <li>Consider dedicated equipment for allergenic foods</li>
                  <li>Maintain detailed logs of cleaning and food handling procedures</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Salad size={24} className="text-primary" />
                <h3 className="text-lg font-medium">Produce Safety</h3>
              </div>
              <p className="mb-3">
                Even fresh produce can be a source of contamination. Follow these guidelines:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Wash all fruits and vegetables under running water before eating, cutting, or cooking</li>
                <li>Use a clean produce brush to scrub firm produce like melons and cucumbers</li>
                <li>Dry produce with a clean paper towel</li>
                <li>Cut away damaged or bruised areas before preparing or eating</li>
                <li>Remove the outermost leaves of lettuce and cabbage heads</li>
                <li>Store washed produce separately from unwashed produce</li>
              </ul>
            </div>
          </section>

          <AdUnit slotId="cross-contamination-middle" className="my-8" format="leaderboard" />

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="mb-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Can I use the same cutting board for meat and vegetables if I wash it in between?
                </AccordionTrigger>
                <AccordionContent>
                  While washing a cutting board between uses can reduce the risk of cross-contamination, 
                  it's still recommended to use separate cutting boards for raw meat and vegetables. 
                  This is because bacteria can hide in knife scarring, cracks, and crevices of cutting boards, 
                  making them difficult to clean completely. If you must use the same cutting board, 
                  wash it thoroughly with hot, soapy water, rinse, and then sanitize it with a bleach solution 
                  (1 tablespoon unscented chlorine bleach per gallon of water) or run it through the dishwasher 
                  (if dishwasher safe) between uses.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is it safe to wash raw meat before cooking?
                </AccordionTrigger>
                <AccordionContent>
                  No, it is not recommended to wash raw meat, poultry, or eggs before cooking. Washing these foods 
                  can actually increase the risk of cross-contamination by spreading bacteria to your sink, countertops, 
                  and other surfaces through splashing water. The only way to kill harmful bacteria in meat, poultry, 
                  and eggs is to cook them to the appropriate internal temperature. If you want to remove anything from 
                  the surface of meat or poultry, use a paper towel to pat it dry.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What's the best way to clean a sponge to prevent cross-contamination?
                </AccordionTrigger>
                <AccordionContent>
                  Kitchen sponges can harbor many bacteria and are difficult to clean completely. To reduce bacteria:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Microwave a wet sponge for 1 minute</li>
                    <li>Run it through a dishwasher with a hot dry cycle</li>
                    <li>Soak in a bleach solution (3/4 cup bleach to 1 gallon of water) for 5 minutes</li>
                  </ul>
                  However, even with these methods, it's best to replace sponges regularly, ideally every 1-2 weeks 
                  depending on use. Consider using disposable paper towels or dishcloths that can be washed in hot water 
                  for cleaning up after raw meat, poultry, and seafood.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How should I handle raw meat in the refrigerator to prevent dripping?
                </AccordionTrigger>
                <AccordionContent>
                  To prevent raw meat juices from dripping onto other foods in your refrigerator:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Store raw meat, poultry, and seafood in sealed containers or plastic bags</li>
                    <li>Place these items on the lowest shelf of your refrigerator</li>
                    <li>Use containers that can catch any leaks or drips</li>
                    <li>If using plastic bags, place them in a bowl or on a plate to catch any potential leaks</li>
                    <li>Keep raw meat separate from ready-to-eat foods and produce</li>
                  </ul>
                  This storage method helps prevent the spread of harmful bacteria to other foods in your refrigerator.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  How do I prevent cross-contamination when grilling outdoors?
                </AccordionTrigger>
                <AccordionContent>
                  When grilling outdoors:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Use separate plates and utensils for raw and cooked foods</li>
                    <li>Never place cooked food back on the same plate that held raw meat</li>
                    <li>Use different tongs or spatulas for handling raw and cooked foods</li>
                    <li>Consider color-coded tools to help keep them separate</li>
                    <li>Keep a spray bottle with water nearby to control flare-ups rather than using a marinade brush that touched raw meat</li>
                    <li>Have a handwashing station or hand sanitizer available</li>
                  </ul>
                  Remember to keep cold foods cold (below 40°F/4°C) and hot foods hot (above 140°F/60°C) when serving outdoors.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a 
                href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-clean-separate-cook" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">USDA: Clean, Separate, Cook, Chill</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  Comprehensive resource from the USDA about food safety basics and preventing cross-contamination.
                </p>
              </a>
              
              <a 
                href="https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">FDA: Are You Storing Food Safely?</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  FDA guidelines on proper food storage techniques to prevent contamination.
                </p>
              </a>
              
              <a 
                href="https://www.cdc.gov/foodsafety/keep-food-safe.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">CDC: Keeping Food Safe</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  CDC's recommendations for handling, preparing, and storing food safely.
                </p>
              </a>
              
              <a 
                href="https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">FoodSafety.gov: 4 Steps to Food Safety</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  Federal food safety information on the four steps to food safety: clean, separate, cook, and chill.
                </p>
              </a>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">References</h2>
            
            <div className="bg-secondary/20 p-6 rounded-lg">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <p>USDA Food Safety and Inspection Service. (2023). <em>Be Smart. Keep Foods Apart. Don't Cross-Contaminate.</em> Retrieved from https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-clean-separate-cook</p>
                </li>
                <li>
                  <p>FDA. (2023). <em>Are You Storing Food Safely?</em> Consumer Updates. Retrieved from https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely</p>
                </li>
                <li>
                  <p>Centers for Disease Control and Prevention. (2022). <em>Four Steps to Food Safety: Clean, Separate, Cook, Chill.</em> Retrieved from https://www.cdc.gov/foodsafety/keep-food-safe.html</p>
                </li>
                <li>
                  <p>Partnership for Food Safety Education. (2023). <em>The Core Four Practices.</em> Retrieved from https://www.fightbac.org/food-safety-basics/the-core-four-practices/</p>
                </li>
                <li>
                  <p>World Health Organization. (2020). <em>Five Keys to Safer Food Manual.</em> Retrieved from https://www.who.int/foodsafety/publications/consumer/manual_keys.pdf</p>
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer size={16} />
                <span>Print this guide</span>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <FileDown size={16} />
                <span>Download as PDF</span>
              </Button>
            </div>
          </section>

          <AdUnit slotId="cross-contamination-bottom" className="mt-8" format="leaderboard" />
        </main>
      </div>
    </PageTransition>
  );
};

export default PreventCrossContamination;
