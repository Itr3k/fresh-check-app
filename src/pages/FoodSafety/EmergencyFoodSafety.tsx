
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Zap, 
  Droplets, 
  Wind, 
  Flame, 
  CheckSquare, 
  Refrigerator, 
  X, 
  Clock, 
  ShieldAlert, 
  HelpCircle,
  Snowflake,
  Package,
  ExternalLink
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import AdUnit from "@/components/AdUnit";

const EmergencyFoodSafety = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Emergency Food Safety - FreshCheck Food Safety</title>
        <meta
          name="description"
          content="Learn how to maintain food safety during emergencies like power outages, natural disasters, and evacuations. Essential tips for preparing, storing, and evaluating food during crisis situations."
        />
        <meta name="keywords" content="emergency food safety, power outage food safety, disaster food planning, food safety during floods, evacuation food safety" />
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
              <div className="bg-orange-100 p-2 rounded-full">
                <AlertTriangle size={24} className="text-orange-600" />
              </div>
              <h1 className="text-3xl font-bold">Emergency Food Safety</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Handling food safely during power outages and natural disasters
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-2">
              <ShieldAlert className="text-red-600 h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-red-800 mb-1">When in doubt, throw it out!</h2>
                <p className="text-red-700">
                  Never taste food to determine if it's safe. You can't see, smell, or taste many harmful bacteria that cause food poisoning.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Before an Emergency</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Refrigerator className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Know Your Appliances</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Keep appliance thermometers in refrigerator and freezer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Refrigerator should be at or below 40°F (4°C)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Freezer should be at or below 0°F (-18°C)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Freeze containers of water to help keep food cold during power outages</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Build Emergency Food Supplies</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Stock non-perishable foods that don't require cooking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Choose low-sodium canned goods and dry mixes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Include protein sources: canned tuna, beans, peanut butter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Store at least 1 gallon of water per person per day</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-secondary/30 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Essential Non-Food Emergency Supplies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-md p-3 border border-border">
                  <p className="font-medium mb-2">Food Safety Items</p>
                  <ul className="text-sm space-y-1">
                    <li>Manual can opener</li>
                    <li>Disposable plates, cups, utensils</li>
                    <li>Paper towels</li>
                    <li>Hand sanitizer or wipes</li>
                  </ul>
                </div>
                <div className="bg-background rounded-md p-3 border border-border">
                  <p className="font-medium mb-2">Cooking & Heating</p>
                  <ul className="text-sm space-y-1">
                    <li>Camp stove or grill (outdoor use only)</li>
                    <li>Fuel for cooking</li>
                    <li>Matches or lighter in waterproof container</li>
                    <li>Aluminum foil</li>
                  </ul>
                </div>
                <div className="bg-background rounded-md p-3 border border-border">
                  <p className="font-medium mb-2">Other Essentials</p>
                  <ul className="text-sm space-y-1">
                    <li>Flashlights and batteries</li>
                    <li>Battery-powered or hand-crank radio</li>
                    <li>First-aid kit</li>
                    <li>Coolers for food storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <AdUnit slotId="emergency-food-top" className="my-8" format="leaderboard" />

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">During An Emergency</h2>

            <Tabs defaultValue="power" className="mb-8">
              <TabsList className={isMobile ? "grid w-full grid-cols-1 gap-1" : "grid w-full grid-cols-4 gap-2"}>
                <TabsTrigger value="power">Power Outage</TabsTrigger>
                <TabsTrigger value="flood">Flooding</TabsTrigger>
                <TabsTrigger value="fire">Fire</TabsTrigger>
                <TabsTrigger value="evacuation">Evacuation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="power" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      <CardTitle>Power Outage Food Safety</CardTitle>
                    </div>
                    <CardDescription>
                      Keep food safe when the power goes out by following these guidelines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Refrigerator & Freezer Guidelines</h3>
                      <div className="relative overflow-x-auto rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">Appliance</TableHead>
                              <TableHead className="w-1/3">Stays Safe For</TableHead>
                              <TableHead className="w-1/3">Temperature</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Refrigerator</TableCell>
                              <TableCell>About 4 hours</TableCell>
                              <TableCell>Below 40°F (4°C)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Full Freezer</TableCell>
                              <TableCell>About 48 hours</TableCell>
                              <TableCell>Below 0°F (-18°C)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Half-Full Freezer</TableCell>
                              <TableCell>About 24 hours</TableCell>
                              <TableCell>Below 0°F (-18°C)</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Do's During a Power Outage:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Keep refrigerator and freezer doors closed as much as possible</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Use a cooler with ice if the power outage is more than 4 hours</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Group foods together in the freezer to help them stay cold longer</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>Use dry or block ice to keep refrigerator cold</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Don'ts During a Power Outage:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>Don't place food outside in snow (temperatures vary and animals may contaminate it)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>Don't taste food to determine if it's safe</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>Don't rely on appearance or odor to determine safety</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="flood" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      <CardTitle>Flood Safety</CardTitle>
                    </div>
                    <CardDescription>
                      Floods can contaminate food and water supplies with harmful pathogens
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-red-600 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-red-800 mb-1">Discard ALL:</h3>
                          <ul className="text-red-700 space-y-1">
                            <li>Food that may have come in contact with flood water</li>
                            <li>Food with an unusual odor, color, or texture</li>
                            <li>Perishable foods that have been above 40°F for more than 2 hours</li>
                            <li>Canned foods that are bulging, open, or damaged</li>
                            <li>Food containers with screw-caps, snap-lids, crimped caps, twist caps, flip tops, and snap-open tops</li>
                            <li>Home-canned foods</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Salvageable Items</h3>
                      <p className="mb-3">These items may be safe if thoroughly cleaned and sanitized:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Undamaged, commercially prepared foods in all-metal cans or retort pouches</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Cleaning Salvageable Canned Food:</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Remove labels (they can harbor dirt and bacteria)</li>
                        <li>Wash cans with soap and clean water</li>
                        <li>Rinse with clean water</li>
                        <li>Sanitize by immersing in a solution of 1 cup (8 oz/250 mL) of unscented household chlorine bleach per 5 gallons of water for 15 minutes</li>
                        <li>Air dry before opening or storing</li>
                        <li>Re-label cans with a marker (include expiration date)</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Water Safety During Floods:</h3>
                      <p className="mb-3">
                        Assume all water sources are contaminated until authorities say otherwise. To make water safe:
                      </p>
                      <ul className="space-y-3">
                        <li>
                          <span className="font-medium">Boiling:</span> Most effective method. Boil water for at least 1 minute (3 minutes at elevations above 6,500 feet).
                        </li>
                        <li>
                          <span className="font-medium">Disinfecting:</span> If boiling isn't possible, add 1/8 teaspoon (8 drops) of unscented household liquid bleach per gallon of water. Stir and let stand for 30 minutes.
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="fire" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-red-500" />
                      <CardTitle>Fire Emergencies</CardTitle>
                    </div>
                    <CardDescription>
                      Food exposed to fire can be damaged by heat, smoke, chemicals, and water
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-orange-600 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-orange-800 mb-1">Discard:</h3>
                          <ul className="text-orange-700 space-y-1">
                            <li>Food stored in permeable packaging (cardboard, plastic wrap, etc.)</li>
                            <li>Raw foods stored outside the refrigerator (like potatoes or fruit)</li>
                            <li>Any food with an off-flavor or smell</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Fire-Fighting Chemicals</h3>
                      <p className="mb-3">
                        Chemicals used to fight fires contain toxic materials that can contaminate food and cookware.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>Discard any foods exposed to chemicals from fire extinguishers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>Throw away any food that has been near a fire</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>Dispose of canned foods exposed to high heat (they may appear fine, but heat damages seals)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Cleaning After a Fire:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Wash all cookware, dishes, and utensils with hot, soapy water</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Disinfect by boiling in clean water or soaking for 15 minutes in a bleach solution (1 tablespoon unscented liquid chlorine bleach per gallon of water)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Clean all countertops with soap and water, then sanitize with bleach solution</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="evacuation" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Wind className="h-5 w-5 text-purple-500" />
                      <CardTitle>Evacuation Situations</CardTitle>
                    </div>
                    <CardDescription>
                      Food safety considerations when evacuating your home
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Before Evacuation</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Turn refrigerator and freezer to the coldest settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Pack refrigerated items that don't need cooking into coolers with ice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Group frozen foods to help them stay cold longer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Take only ready-to-eat foods that do not require refrigeration</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Portable Food Kit for Evacuation:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-secondary/30 rounded-md p-4">
                          <p className="font-medium mb-2">Ready-to-eat Foods</p>
                          <ul className="space-y-1 text-sm">
                            <li>Canned foods with pull-tops</li>
                            <li>Protein or fruit bars</li>
                            <li>Dry cereal or granola</li>
                            <li>Peanut butter or nuts</li>
                            <li>Dried fruit</li>
                            <li>Crackers</li>
                            <li>Canned juices</li>
                            <li>Non-perishable pasteurized milk</li>
                            <li>High-energy foods</li>
                            <li>Comfort/stress foods</li>
                          </ul>
                        </div>
                        <div className="bg-secondary/30 rounded-md p-4">
                          <p className="font-medium mb-2">Considerations</p>
                          <ul className="space-y-1 text-sm">
                            <li>Choose foods that don't require refrigeration, cooking, or much water</li>
                            <li>Include familiar foods that can lift morale</li>
                            <li>Remember special needs for infants, elderly, or those with dietary restrictions</li>
                            <li>Avoid foods that make you thirsty (high in salt)</li>
                            <li>Include some comfort foods for stress relief</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Food Safety Upon Return:</h3>
                      <p className="mb-3">
                        When returning home after evacuation:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Discard refrigerated perishable foods</span> if power has been out for more than 4 hours
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Discard any food</span> that has an unusual odor, color, or texture
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Check frozen food</span> for ice crystals - if still frozen hard, it can be refrozen
                          </div>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          <AdUnit slotId="emergency-food-middle" className="my-8" format="leaderboard" />

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">After an Emergency</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assessing Food Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Refrigerated Food Safety After Power Loss</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type of Food</TableHead>
                            <TableHead>Held above 40°F for over 2 hours</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Meat, poultry, seafood, milk, eggs, soft cheeses</TableCell>
                            <TableCell className="text-red-600">Discard</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Hard cheeses, processed cheeses</TableCell>
                            <TableCell className="text-green-600">Safe</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Butter, margarine</TableCell>
                            <TableCell className="text-green-600">Safe</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Fresh fruits and vegetables</TableCell>
                            <TableCell className="text-green-600">Safe, unless mold or slime developed</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Opened fruit juices, opened canned fruits</TableCell>
                            <TableCell className="text-green-600">Safe</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Opened mayonnaise, tartar sauce, horseradish</TableCell>
                            <TableCell className="text-red-600">Discard if above 50°F for over 8 hrs</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Peanut butter, jelly, ketchup, olives</TableCell>
                            <TableCell className="text-green-600">Safe</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Opened salad dressings, opened sauces</TableCell>
                            <TableCell className="text-red-600">Discard</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Bread, rolls, cakes, muffins, hard pastries</TableCell>
                            <TableCell className="text-green-600">Safe</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Cooked pasta, potatoes, rice</TableCell>
                            <TableCell className="text-red-600">Discard</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Casseroles, soups, stews</TableCell>
                            <TableCell className="text-red-600">Discard</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Frozen Food Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Is Your Frozen Food Still Safe?</h3>
                      <p className="mb-4">Check the condition of frozen food after a power outage:</p>

                      <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                        <div className="flex items-start gap-2">
                          <Snowflake className="text-blue-600 h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium mb-1">If ice crystals are still visible and food feels cold:</h4>
                            <p>The food can be refrozen or cooked and eaten</p>
                          </div>
                        </div>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type of Food</TableHead>
                            <TableHead>Thawed but held at refrigerator temperature (below 40°F)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Meat, poultry, seafood</TableCell>
                            <TableCell>Refreeze if ice crystals remain. If completely thawed, cook before refreezing.</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Dairy (milk, soft cheeses)</TableCell>
                            <TableCell>Discard if completely thawed</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Hard cheeses, butter</TableCell>
                            <TableCell>Refreeze</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Fruits (with no mold/strange odor)</TableCell>
                            <TableCell>Refreeze</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Vegetables</TableCell>
                            <TableCell>Refreeze if ice crystals remain. If completely thawed, discard.</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Bread, baked goods</TableCell>
                            <TableCell>Refreeze</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Prepared dishes, casseroles</TableCell>
                            <TableCell>Discard if completely thawed</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex items-start gap-2">
                          <Clock className="text-red-600 h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-800 mb-1">If food has been at room temperature for more than 2 hours:</h4>
                            <p className="text-red-700">Discard all perishable foods</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="mb-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What if my freezer thermometer reads above 40°F but the food is still partially frozen?
                </AccordionTrigger>
                <AccordionContent>
                  If the food still contains ice crystals, it can be safely refrozen, even if the thermometer temporarily 
                  registered above 40°F. The presence of ice crystals means that at least part of the food remained at 
                  safe temperatures. However, the quality might be reduced due to partial thawing and refreezing. 
                  For best quality, cook these items instead of refreezing them.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is it safe to use my gas stove or oven during a power outage?
                </AccordionTrigger>
                <AccordionContent>
                  Many gas appliances with electronic ignition systems won't work during a power outage, though some gas stovetops 
                  can be lit manually with a match. Check your owner's manual before attempting to use any gas appliance without power. 
                  Never use gas ovens as a heat source for your home, as this can lead to carbon monoxide poisoning. 
                  Always ensure proper ventilation when using any gas appliance, and maintain a working carbon monoxide detector 
                  with battery backup in your home.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How long can unopened bottles of water be stored safely?
                </AccordionTrigger>
                <AccordionContent>
                  Commercially bottled water can be stored indefinitely if properly sealed and kept in a cool, dark place. 
                  However, bottled water manufacturers typically list a "best by" date of 1-2 years after production. 
                  This is primarily for taste quality, not safety. For emergency preparedness, it's recommended to rotate 
                  your water supply every 6-12 months for best taste. If you bottle your own water, replace it every 6 months.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What's the best way to sanitize my kitchen after a flood?
                </AccordionTrigger>
                <AccordionContent>
                  After a flood, thoroughly clean and sanitize all surfaces:
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li>Wash surfaces with hot, soapy water</li>
                    <li>Rinse with clean water</li>
                    <li>Sanitize with a solution of 1 tablespoon unscented liquid chlorine bleach per gallon of water</li>
                    <li>Allow to air dry</li>
                  </ol>
                  For cutting boards, countertops, and other food preparation surfaces, sanitize with a stronger solution 
                  of 1 cup bleach per 5 gallons of water. Discard wooden cutting boards, plastic utensils, baby bottle nipples, 
                  and pacifiers that have come in contact with flood water, as they cannot be properly sanitized.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  How can I prepare emergency food supplies for someone with dietary restrictions?
                </AccordionTrigger>
                <AccordionContent>
                  For people with dietary restrictions:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Food allergies:</strong> Carefully read labels and store allergen-free alternatives</li>
                    <li><strong>Diabetes:</strong> Include low-sugar/low-carb options with longer shelf life</li>
                    <li><strong>Heart conditions:</strong> Store low-sodium canned goods and dried foods</li>
                    <li><strong>Gluten sensitivities:</strong> Stock gluten-free grains like rice and certified gluten-free products</li>
                    <li><strong>Medication requirements:</strong> Keep a 2-week supply of critical medications</li>
                  </ul>
                  Label all special dietary items clearly and keep them separated from other emergency supplies. 
                  Include instructions for anyone who might need to prepare food for the person with restrictions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a 
                href="https://www.foodsafety.gov/keep-food-safe/food-safety-during-emergency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">FoodSafety.gov: Emergency Food Safety</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  Comprehensive resource for food safety during various emergencies including power outages and natural disasters.
                </p>
              </a>
              
              <a 
                href="https://www.fema.gov/pdf/library/f&web.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">FEMA: Food and Water in an Emergency</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  FEMA's guide on how to store, handle, and prepare food and water during emergencies.
                </p>
              </a>
              
              <a 
                href="https://www.cdc.gov/foodsafety/keep-food-safe.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">CDC: Keeping Food and Water Safe</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  CDC's recommendations for handling, preparing, and storing food and water safely during emergencies.
                </p>
              </a>
              
              <a 
                href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Red Cross: Emergency Preparedness</h3>
                  <ExternalLink size={18} className="text-primary" />
                </div>
                <p className="text-muted-foreground mt-2">
                  Red Cross guides on how to prepare for different types of emergencies, including food and water safety.
                </p>
              </a>
            </div>
          </section>

          <AdUnit slotId="emergency-food-bottom" className="mt-8" format="leaderboard" />

          <div className="mt-12 flex justify-center">
            <Link to="/" className="inline-flex items-center">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default EmergencyFoodSafety;
