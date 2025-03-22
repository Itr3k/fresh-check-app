
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Users, 
  Baby, 
  Heart, 
  ShieldAlert, 
  ChevronLeft,
  Utensils
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const VulnerableGroups = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Food Safety for Vulnerable Groups | Food Safety App</title>
        <meta
          name="description"
          content="Learn about food safety guidelines for pregnant women, older adults, children, and people with weakened immune systems."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ChevronLeft size={16} /> Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Food Safety for Vulnerable Groups</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specific food safety guidelines for pregnant women, older adults, children, and people with weakened immune systems.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="space-y-8">
          <Alert className="bg-amber-50 border-amber-200">
            <ShieldAlert className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">Why some people are at greater risk</AlertTitle>
            <AlertDescription className="text-amber-700">
              Certain groups face higher risks from foodborne illness due to differences in immune function, 
              physiological changes, or developing systems. Extra precautions can help protect these vulnerable populations.
            </AlertDescription>
          </Alert>

          {/* Vulnerable groups cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-l-4 border-l-pink-400">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-pink-500" />
                  </div>
                  <CardTitle>Pregnant Women</CardTitle>
                </div>
                <CardDescription>
                  Pregnancy alters the immune system, making women more susceptible to foodborne illness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-blue-400">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Baby className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Young Children</CardTitle>
                </div>
                <CardDescription>
                  Developing immune systems make children under 5 especially vulnerable to foodborne pathogens.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-amber-400">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-amber-500" />
                  </div>
                  <CardTitle>Older Adults</CardTitle>
                </div>
                <CardDescription>
                  Adults 65+ have weakening immune systems and may have underlying conditions that increase risk.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-emerald-400">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <ShieldAlert className="h-5 w-5 text-emerald-500" />
                  </div>
                  <CardTitle>Immunocompromised People</CardTitle>
                </div>
                <CardDescription>
                  Those with conditions like diabetes, cancer, HIV/AIDS, or on certain medications have reduced immunity.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Detailed guidance */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pregnant-women">
              <AccordionTrigger className="text-lg font-medium">
                Guidelines for Pregnant Women
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Pregnancy affects your immune system, making you and your unborn baby more susceptible to the bacteria, viruses, and parasites that cause foodborne illness.
                </p>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-100 mb-4">
                  <h4 className="font-medium text-red-800 mb-2">Foods to Avoid During Pregnancy</h4>
                  <ul className="list-disc list-inside space-y-1 text-red-700">
                    <li>Raw or undercooked meat, poultry, seafood, and eggs</li>
                    <li>Unpasteurized (raw) milk and products made with raw milk</li>
                    <li>Soft cheeses like queso fresco, Brie, Camembert, feta, and blue-veined cheeses unless labeled as made with pasteurized milk</li>
                    <li>Raw sprouts (including alfalfa, clover, radish, and mung bean)</li>
                    <li>Deli meats and hot dogs unless heated until steaming hot</li>
                    <li>High-mercury fish like shark, swordfish, king mackerel, and tilefish</li>
                  </ul>
                </div>
                
                <p>
                  Pregnant women are particularly susceptible to <strong>Listeria monocytogenes</strong>, which can cause miscarriage, stillbirth, or severe illness in newborns. Listeria can grow even in refrigerated temperatures.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="children">
              <AccordionTrigger className="text-lg font-medium">
                Guidelines for Young Children
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Children under 5 years old are at an increased risk of foodborne illness because their immune systems are still developing. Additionally, young children produce less stomach acid, making it easier for harmful bacteria to survive in their digestive systems.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">Foods to Avoid for Young Children</h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Raw or undercooked eggs or foods containing raw eggs</li>
                    <li>Raw or undercooked meat, poultry, or seafood</li>
                    <li>Raw milk or products made from raw milk</li>
                    <li>Raw or partially cooked sprouts</li>
                    <li>Honey (for infants under 12 months) - risk of botulism</li>
                    <li>Unpasteurized juices</li>
                  </ul>
                </div>
                
                <p>
                  Children are especially vulnerable to <strong>E. coli O157:H7</strong>, which can cause severe complications including hemolytic uremic syndrome (HUS), a type of kidney failure.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="older-adults">
              <AccordionTrigger className="text-lg font-medium">
                Guidelines for Older Adults (65+)
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  As adults age, their immune systems and organs don't recognize and get rid of harmful bacteria as well as they once did. The digestive system holds food longer, allowing bacteria to grow, while the stomach may not produce enough acid to limit the number of intestinal bacteria.
                </p>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 mb-4">
                  <h4 className="font-medium text-amber-800 mb-2">Recommendations for Older Adults</h4>
                  <ul className="list-disc list-inside space-y-1 text-amber-700">
                    <li>Avoid raw or undercooked seafood</li>
                    <li>Cook eggs until both the yolk and white are firm</li>
                    <li>Do not consume unpasteurized milk or juices</li>
                    <li>Avoid soft cheeses made from unpasteurized milk</li>
                    <li>Heat deli meats and hot dogs until steaming hot</li>
                    <li>Be particularly careful with leftovers - reheat to 165°F</li>
                  </ul>
                </div>
                
                <p>
                  Older adults are at particular risk from <strong>Listeria</strong> infections, which have a higher fatality rate among the elderly.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="immunocompromised">
              <AccordionTrigger className="text-lg font-medium">
                Guidelines for People with Weakened Immune Systems
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  People with weakened immune systems are more susceptible to foodborne illnesses and may experience more severe symptoms. This includes individuals with HIV/AIDS, cancer, diabetes, kidney disease, organ transplants, or those taking certain medications (steroids, immunosuppressants, some arthritis drugs).
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-md border border-emerald-100 mb-4">
                  <h4 className="font-medium text-emerald-800 mb-2">Special Precautions</h4>
                  <ul className="list-disc list-inside space-y-1 text-emerald-700">
                    <li>Avoid raw or undercooked eggs, meat, poultry, fish, and shellfish</li>
                    <li>Avoid all unpasteurized dairy products and juices</li>
                    <li>Avoid raw sprouts of any kind</li>
                    <li>Heat deli meats and hot dogs to steaming hot</li>
                    <li>Be extra vigilant about keeping food preparation areas clean</li>
                    <li>Separate raw meats from other foods completely</li>
                    <li>Consider using separate cutting boards for meat and produce</li>
                  </ul>
                </div>
                
                <p>
                  People with compromised immune systems should be particularly cautious about <strong>Cryptosporidium</strong>, <strong>Cyclospora</strong>, <strong>Listeria</strong>, and <strong>Toxoplasma</strong> infections.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Core Safety Practices */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Utensils className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Core Food Safety Practices for Everyone</CardTitle>
              </div>
              <CardDescription>
                These fundamental practices are especially important for vulnerable populations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Practice</TableHead>
                    <TableHead>Key Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Clean</TableCell>
                    <TableCell>
                      Wash hands for 20 seconds with soap and water before, during, and after preparing food. 
                      Clean surfaces and utensils after each use.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Separate</TableCell>
                    <TableCell>
                      Use separate cutting boards for meat, poultry, seafood and produce.
                      Keep raw meat away from other foods in shopping cart and refrigerator.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cook</TableCell>
                    <TableCell>
                      Use a food thermometer to ensure foods are cooked to a safe internal temperature.
                      For vulnerable groups, eggs should be cooked until yolks are firm.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Chill</TableCell>
                    <TableCell>
                      Refrigerate perishable food within 2 hours (1 hour if temperature is above 90°F).
                      Thaw food in the refrigerator, not on the counter.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Sources section */}
          <div className="bg-muted/40 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-medium mb-3">Sources and Further Information</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span>•</span>
                <a href="https://www.fda.gov/food/people-risk-foodborne-illness" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Food Safety for People at Higher Risk
                </a>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <a href="https://www.cdc.gov/foodsafety/people-at-risk-food-poisoning.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  CDC: Food Safety During Pregnancy and for Other At-Risk Groups
                </a>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <a href="https://www.foodsafety.gov/people-at-risk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FoodSafety.gov: People at Risk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default VulnerableGroups;
