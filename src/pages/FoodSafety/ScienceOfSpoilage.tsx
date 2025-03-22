
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, FlaskConical, Droplet, AlertTriangle, Clock, Thermometer, Fish, Salad } from 'lucide-react';

const ScienceOfSpoilage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Science of Food Spoilage | FoodSafe</title>
        <meta name="description" content="Understanding the biological mechanisms behind food spoilage and how to prevent it." />
      </Helmet>
      
      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-teal-100 text-teal-800">
            <BookOpen className="w-4 h-4 mr-2" />
            Food Safety Education
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Science of Food Spoilage</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Understanding the biological and chemical processes that cause food to spoil and how to delay them.
          </p>
        </div>

        <Tabs defaultValue="microorganisms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="microorganisms">
              <FlaskConical className="mr-2 h-4 w-4" />
              Microorganisms
            </TabsTrigger>
            <TabsTrigger value="chemical">
              <Droplet className="mr-2 h-4 w-4" />
              Chemical Changes
            </TabsTrigger>
            <TabsTrigger value="prevention">
              <Clock className="mr-2 h-4 w-4" />
              Preservation Methods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="microorganisms" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Microorganisms and Food Spoilage</h2>
                <p className="mb-4">
                  Most food spoilage is caused by microorganisms such as bacteria, yeasts, and molds. These organisms break down food 
                  components, causing changes in texture, smell, taste, and appearance.
                </p>
                
                <div className="grid gap-6 mt-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                      <Fish className="mr-2 h-4 w-4" /> Bacteria
                    </h3>
                    <p className="text-sm mb-2">
                      Bacteria are the most common cause of food spoilage and foodborne illness. They reproduce rapidly in favorable conditions.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Examples:</span> Salmonella, E. coli, Listeria, Clostridium botulinum</li>
                      <li><span className="font-medium">Signs of bacterial spoilage:</span> Sliminess, off-odors, discoloration</li>
                      <li><span className="font-medium">Foods commonly affected:</span> Meat, poultry, seafood, dairy, eggs</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2 flex items-center">
                      <Salad className="mr-2 h-4 w-4" /> Molds and Yeasts
                    </h3>
                    <p className="text-sm mb-2">
                      Molds and yeasts can grow at lower moisture levels and more acidic conditions than many bacteria.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Mold signs:</span> Fuzzy growths of various colors (white, blue, green, black)</li>
                      <li><span className="font-medium">Yeast signs:</span> Slime, bubbles, or a fermented smell</li>
                      <li><span className="font-medium">Foods commonly affected:</span> Bread, cheese, fruits, jams, acidic foods</li>
                    </ul>
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="growth-factors">
                    <AccordionTrigger>Factors Affecting Microbial Growth</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>The acronym "FAT TOM" helps remember the key factors that affect microbial growth in food:</p>
                        
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="p-3 rounded-md bg-gray-50 border">
                            <p className="font-medium">F - Food</p>
                            <p className="text-sm">Microorganisms need nutrients to grow. Protein-rich foods are particularly susceptible.</p>
                          </div>
                          <div className="p-3 rounded-md bg-gray-50 border">
                            <p className="font-medium">A - Acidity (pH)</p>
                            <p className="text-sm">Most pathogens prefer neutral pH (6.6-7.5). High acidity inhibits growth.</p>
                          </div>
                          <div className="p-3 rounded-md bg-gray-50 border">
                            <p className="font-medium">T - Temperature</p>
                            <p className="text-sm">Danger zone: 40°F to 140°F (4°C to 60°C) where bacteria multiply rapidly.</p>
                          </div>
                          <div className="p-3 rounded-md bg-gray-50 border">
                            <p className="font-medium">T - Time</p>
                            <p className="text-sm">Given favorable conditions, bacteria can double every 20 minutes.</p>
                          </div>
                          <div className="p-3 rounded-md bg-gray-50 border">
                            <p className="font-medium">O - Oxygen</p>
                            <p className="text-sm">Some bacteria need oxygen (aerobic), others grow without it (anaerobic).</p>
                          </div>
                          <div className="p-3 rounded-md bg-gray-50 border">
                            <p className="font-medium">M - Moisture</p>
                            <p className="text-sm">Water activity (aw) above 0.85 supports most bacterial growth.</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chemical" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Chemical Changes in Food</h2>
                <p className="mb-4">
                  Beyond microbial spoilage, foods can deteriorate due to chemical reactions that affect quality, 
                  nutrition, and safety. These reactions can occur even when microorganisms are not present.
                </p>
                
                <div className="grid gap-6 mt-6">
                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                    <h3 className="font-medium text-yellow-800 mb-2">Oxidation</h3>
                    <p className="text-sm mb-3">
                      Oxidation occurs when food molecules react with oxygen, causing deterioration in quality and nutrition.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Rancidity in Fats and Oils</h4>
                        <p className="text-xs">
                          Fats and oils become rancid when exposed to oxygen, developing off-flavors and potentially harmful compounds.
                          Foods high in unsaturated fats (like vegetable oils, nuts, seeds) are most susceptible.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Vitamin Loss</h4>
                        <p className="text-xs">
                          Vitamins A, C, E, and some B vitamins are particularly vulnerable to oxidation, reducing nutritional value.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Signs of Oxidation</h4>
                        <ul className="text-xs list-disc pl-4">
                          <li>Off or "cardboard-like" flavors</li>
                          <li>Changes in color (browning)</li>
                          <li>Development of strong odors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                    <h3 className="font-medium text-purple-800 mb-2">Enzymatic Browning</h3>
                    <p className="text-sm mb-3">
                      Enzymes naturally present in foods can cause browning reactions when food cells are damaged, 
                      exposing the enzymes to oxygen.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs">
                        <span className="font-medium">Common examples:</span> Sliced apples, avocados, bananas, and potatoes turning brown when cut
                      </p>
                      <p className="text-xs">
                        <span className="font-medium">Prevention methods:</span> Adding acid (lemon juice), blanching, or using antioxidants like vitamin C
                      </p>
                      <p className="text-xs">
                        This type of browning affects appearance but usually doesn't make food unsafe to eat.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                    <h3 className="font-medium text-red-800 mb-2">Maillard Reaction</h3>
                    <p className="text-sm mb-3">
                      Unlike enzymatic browning, the Maillard reaction is a non-enzymatic browning that occurs when proteins 
                      and sugars react at higher temperatures.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs">
                        <span className="font-medium">Desired effect:</span> Creates flavors and aromas in toasted bread, 
                        seared meat, coffee beans, and roasted vegetables
                      </p>
                      <p className="text-xs">
                        <span className="font-medium">Undesired effect:</span> Can produce potentially harmful compounds called 
                        acrylamides when starchy foods are overheated
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Food Preservation Methods</h2>
                <p className="mb-4">
                  Food preservation techniques work by preventing or slowing the mechanisms of spoilage. Each method targets specific 
                  factors that contribute to food deterioration.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-3">
                      <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="font-medium">Temperature Control</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Refrigeration (32-40°F / 0-4°C)</h4>
                        <p className="text-xs">
                          Slows microbial growth and enzymatic reactions without killing most microorganisms.
                          Effective for short-term storage of most perishable foods.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Freezing (0°F / -18°C or below)</h4>
                        <p className="text-xs">
                          Halts microbial growth and slows enzymatic activity significantly.
                          Can preserve food for months to years, though quality may gradually decline.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Heat Treatment</h4>
                        <p className="text-xs">
                          Pasteurization (heating to specific temperatures) kills pathogens but not all microorganisms.
                          Sterilization (more intense heat) eliminates all microorganisms and enzymes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-3">
                      <Droplet className="h-5 w-5 text-green-500 mr-2" />
                      <h3 className="font-medium">Water Activity Reduction</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Drying/Dehydration</h4>
                        <p className="text-xs">
                          Removes water needed for microbial growth. Examples include dried fruits, jerky, herbs.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Adding Solutes</h4>
                        <p className="text-xs">
                          Sugar (jams, jellies) or salt (curing) bind water molecules, making them unavailable for microbes.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Freeze-drying</h4>
                        <p className="text-xs">
                          Freezes food then removes water through sublimation (ice directly to vapor), preserving structure better than conventional drying.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-3">
                      <FlaskConical className="h-5 w-5 text-purple-500 mr-2" />
                      <h3 className="font-medium">Chemical Preservation</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">pH Modification</h4>
                        <p className="text-xs">
                          Adding acids (vinegar in pickling) creates environments hostile to many microorganisms.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Fermentation</h4>
                        <p className="text-xs">
                          Controlled growth of beneficial microorganisms that produce acids or alcohols (yogurt, sauerkraut, kimchi).
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Preservatives</h4>
                        <p className="text-xs">
                          Natural (salt, sugar, vinegar) or synthetic substances that inhibit microbial growth or oxidation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      <h3 className="font-medium">Modern Technologies</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Modified Atmosphere Packaging</h4>
                        <p className="text-xs">
                          Alters the gas composition inside packaging to slow spoilage (less oxygen, more CO2/nitrogen).
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Irradiation</h4>
                        <p className="text-xs">
                          Uses ionizing radiation to kill microorganisms and insects, and inhibit sprouting in some produce.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">High Pressure Processing</h4>
                        <p className="text-xs">
                          Subjects food to extreme pressure to inactivate microorganisms while maintaining freshness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mt-6">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-amber-600 mr-2" />
                    <h3 className="font-medium text-amber-800">Understanding "Best By" Dates</h3>
                  </div>
                  <p className="text-sm mb-2">
                    Date labels on foods are often misunderstood and contribute to unnecessary food waste.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li><span className="font-medium">"Best By"/"Best Before":</span> Indicates quality, not safety. Food is usually safe to eat after this date but may have declined in quality.</li>
                    <li><span className="font-medium">"Use By":</span> More safety-oriented, especially for highly perishable foods.</li>
                    <li><span className="font-medium">"Sell By":</span> Guide for retailers, not consumers. Products are generally good for days or weeks after this date.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ScienceOfSpoilage;
