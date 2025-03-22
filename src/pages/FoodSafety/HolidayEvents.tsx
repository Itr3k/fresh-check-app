
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Gift, UtensilsCrossed, Tent, Thermometer, ClockIcon, AlertTriangle } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';

const HolidayEvents = () => {
  return (
    <FoodSafetyLayout
      title="Holiday & Event Food Safety"
      description="Keep your celebrations safe with proper food handling during holidays, picnics, and special events."
      icon={<Calendar className="w-4 h-4 mr-1.5" />}
      iconBgColor="bg-yellow-100"
      iconTextColor="text-yellow-800"
      keywords="holiday food safety, picnic safety, buffet food safety, thanksgiving, christmas dinner, event food safety"
    >
      <Tabs defaultValue="holidays" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="holidays">
            <Gift className="mr-2 h-4 w-4" />
            Holiday Meals
          </TabsTrigger>
          <TabsTrigger value="picnics">
            <Tent className="mr-2 h-4 w-4" />
            Picnics & Outdoors
          </TabsTrigger>
          <TabsTrigger value="buffets">
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Parties & Buffets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="holidays" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Holiday Meal Safety</h2>
              <p className="mb-4">
                During the holidays, we often prepare large meals for many people. This increases the risk of foodborne illness 
                from improper storage, handling, and cooking of food.
              </p>
              
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="thanksgiving">
                  <AccordionTrigger>Thanksgiving & Christmas Dinner Safety</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
                        <h3 className="font-medium text-amber-800 flex items-center">
                          <Thermometer className="mr-2 h-4 w-4" /> Turkey Safety
                        </h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li>• Thaw turkey safely in the refrigerator, not on the counter</li>
                          <li>• Allow 24 hours of thawing time for every 4-5 pounds of turkey</li>
                          <li>• Cook turkey to an internal temperature of 165°F (74°C)</li>
                          <li>• Use a food thermometer to check the innermost part of the thigh and wing and the thickest part of the breast</li>
                        </ul>
                      </div>
                      
                      <p>For stuffing, it's safest to cook it separately from the turkey. If you stuff your turkey:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Stuff loosely – about ¾ cup per pound of turkey</li>
                        <li>Ensure stuffing reaches 165°F (74°C)</li>
                        <li>Stuff the turkey just before cooking, never in advance</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="leftovers">
                  <AccordionTrigger>Managing Holiday Leftovers</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <ClockIcon className="mt-1 mr-3 h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">The Two-Hour Rule</h4>
                          <p>Refrigerate or freeze leftovers within two hours of cooking to prevent bacteria growth.</p>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">Proper Storage:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Divide large amounts of food into shallow containers for quicker cooling</li>
                          <li>• Remove stuffing from turkey and refrigerate separately</li>
                          <li>• Use leftovers within 3-4 days or freeze for longer storage</li>
                          <li>• Reheat all leftovers to 165°F (74°C) before eating</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="picnics" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Picnic & Outdoor Event Safety</h2>
              <p className="mb-4">
                Outdoor events present unique food safety challenges. Higher temperatures and limited 
                refrigeration increase the risk of foodborne illness.
              </p>

              <div className="grid gap-6 mt-6">
                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Packing & Transportation</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Use insulated coolers with plenty of ice or freezer packs</li>
                    <li>• Pack raw meat separately from ready-to-eat foods</li>
                    <li>• Keep coolers in the air-conditioned car, not the hot trunk</li>
                    <li>• Keep coolers in the shade and closed as much as possible</li>
                  </ul>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Max Time Food Can Be Left Out</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Below 90°F (32°C)</TableCell>
                      <TableCell>2 hours</TableCell>
                      <TableCell>Medium</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Above 90°F (32°C)</TableCell>
                      <TableCell>1 hour</TableCell>
                      <TableCell className="text-red-500 font-medium">High</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                    <h3 className="font-medium text-orange-800">Foods That Need Extra Caution</h3>
                  </div>
                  <p className="text-sm mb-2">These foods are particularly risky at outdoor events:</p>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li>• Meat salads (chicken, tuna, egg)</li>
                    <li>• Dairy products</li>
                    <li>• Cut melons</li>
                    <li>• Potato and pasta salads</li>
                    <li>• Seafood</li>
                    <li>• Dips and sauces</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buffets" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Party & Buffet Safety</h2>
              <p className="mb-4">
                Buffets and party spreads often involve food sitting at room temperature for extended periods, 
                creating an opportunity for bacteria to multiply.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Temperature Control for Buffets</h3>
                <div className="space-y-2 text-sm">
                  <p>• Hot foods should be kept at or above 140°F (60°C)</p>
                  <p>• Cold foods should be kept at or below 40°F (4°C)</p>
                  <p>• Replace empty platters rather than adding fresh food to a dish that already had food in it</p>
                  <p>• Use chafing dishes, slow cookers, and warming trays to keep hot foods hot</p>
                  <p>• Use ice or commercial freezer packs to keep cold foods cold</p>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-3">Buffet Service Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Provide serving utensils for each dish to prevent cross-contamination</li>
                  <li>• Arrange food in small serving dishes and replenish them frequently</li>
                  <li>• Monitor how long food has been sitting out and remove items after 2 hours</li>
                  <li>• Consider using smaller plates to encourage guests to take less at once and return for seconds</li>
                  <li>• Assign a "food safety" person to monitor time and temperatures during the event</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </FoodSafetyLayout>
  );
};

export default HolidayEvents;
