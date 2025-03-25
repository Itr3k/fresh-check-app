import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Utensils, Clock, AlertTriangle, Check, Refrigerator } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdUnit from '@/components/AdUnit';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HolidayEvents = () => {
  return (
    <>
      <Helmet>
        <title>Holiday & Event Food Safety Guide | Fresh Check</title>
        <meta 
          name="description" 
          content="Ensure food safety during holidays and special events with expert guidelines for safe food preparation, handling, buffet service, and leftover storage." 
        />
        <meta
          name="keywords"
          content="holiday food safety, event food safety, party food safety, safe food handling, holiday cooking, buffet safety, Thanksgiving food safety, Christmas dinner safety"
        />
        <link rel="canonical" href="https://freshcheck.app/food-safety/holiday-events" />
        
        {/* Schema.org markup for food safety article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Keep Food Safe During Holiday Events",
            "description": "A comprehensive guide to maintaining food safety during holidays and special events.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Plan Ahead",
                "text": "Plan your menu, shopping, and preparation timeline to ensure food safety."
              },
              {
                "@type": "HowToStep",
                "name": "Safe Food Handling",
                "text": "Follow proper hand washing, prevent cross-contamination, and cook to safe temperatures."
              },
              {
                "@type": "HowToStep",
                "name": "Buffet Table Safety",
                "text": "Keep hot foods hot and cold foods cold, use small portions, and limit time at room temperature."
              },
              {
                "@type": "HowToStep",
                "name": "Handle Leftovers Properly",
                "text": "Refrigerate leftovers within 2 hours and use within 3-4 days."
              }
            ]
          })}
        </script>
      </Helmet>
      
      <FoodSafetyLayout
        title="Holiday & Event Food Safety"
        description="Ensure food safety during holidays and special events with these guidelines for safe food preparation, handling, and storage."
        icon={<Calendar className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="holiday food safety, event food safety, party food safety, safe food handling, holiday cooking, buffet safety"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-500" />
            <span>Holiday Food Safety Challenges</span>
          </h2>
          
          <p className="mb-4">
            Holidays and special events often involve preparing larger quantities of food, 
            cooking unfamiliar dishes, and managing complex timing with multiple dishes. 
            These factors can increase food safety risks if proper precautions aren't taken.
          </p>
          
          <p className="mb-4">
            The holidays are a time for celebration with family and friends, but they also present unique food safety challenges. 
            With multiple dishes being prepared simultaneously and often by different people, it's essential to be vigilant about 
            food safety practices to prevent foodborne illness from spoiling your festivities.
          </p>
          
          <Alert variant="destructive" className="my-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Increased Risk During Holidays</AlertTitle>
            <AlertDescription>
              During holidays, the risk of foodborne illness increases due to large-scale cooking, extended serving times, and multiple food handlers.
            </AlertDescription>
          </Alert>
          
          {/* First ad placement with substantial publisher content */}
          <div className="my-6">
            <AdUnit 
              slotId="holiday-top" 
              format="leaderboard" 
              mobileFormat="rectangle"
              contentBefore={
                <div className="mb-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Food Safety Resource</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our holiday food safety guides help you prepare and serve meals safely for large gatherings and special occasions.
                  </p>
                </div>
              }
              contentAfter={
                <div className="mt-3 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    According to the CDC, food poisoning is more common during the holidays due to cooking large meals and leaving food out for extended periods.
                  </p>
                </div>
              }
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <span>Planning Ahead for Food Safety</span>
          </h2>
          
          <p className="mb-4">
            Proper planning is essential for ensuring food safety during holidays and events. 
            Consider these steps:
          </p>
          
          <div className="bg-secondary/20 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">Holiday Food Safety Planning Checklist</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Menu Planning:</strong> Choose dishes that can be safely prepared and held at proper temperatures. Consider making some dishes ahead of time to reduce day-of stress and rushed preparation.</li>
              <li><strong>Shopping:</strong> Buy perishable foods last and refrigerate them promptly. Don't buy more than you can safely store in your refrigerator or freezer.</li>
              <li><strong>Preparation Timeline:</strong> Create a detailed timeline for thawing, prepping, and cooking to avoid cross-contamination and ensure foods are cooked to safe internal temperatures.</li>
              <li><strong>Equipment Check:</strong> Make sure you have enough refrigerator space, serving dishes, warming trays, and food thermometers to handle all the food safely.</li>
            </ul>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-orange-500" />
            <span>Safe Food Handling for Large Gatherings</span>
          </h2>
          
          <p className="mb-4">
            When preparing food for a large group, follow these guidelines to minimize the risk of foodborne illness:
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">The Core Four Food Safety Practices</CardTitle>
              <CardDescription>Follow these principles for all holiday food preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 mb-6 space-y-3">
                <li><strong>Clean:</strong> Wash hands thoroughly with soap and warm water for at least 20 seconds before and after handling food. Clean surfaces, cutting boards, and utensils between uses.</li>
                <li><strong>Separate:</strong> Use separate cutting boards and utensils for raw and cooked foods to prevent cross-contamination. Keep raw meat, poultry, seafood, and eggs away from ready-to-eat foods.</li>
                <li><strong>Cook:</strong> Use a food thermometer to ensure foods reach safe internal temperatures:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Poultry, stuffing, casseroles, and leftovers: 165°F (74°C)</li>
                    <li>Ground meats: 160°F (71°C)</li>
                    <li>Beef, pork, lamb, and veal (roasts, steaks, chops): 145°F (63°C) with a 3-minute rest</li>
                    <li>Ham (raw): 145°F (63°C) with a 3-minute rest</li>
                    <li>Ham (pre-cooked, to reheat): 140°F (60°C)</li>
                    <li>Fish and shellfish: 145°F (63°C)</li>
                  </ul>
                </li>
                <li><strong>Chill:</strong> Keep cold foods at 40°F (4°C) or lower and hot foods at 140°F (60°C) or higher. Refrigerate or freeze perishables within 2 hours (1 hour if the temperature is above 90°F/32°C).</li>
              </ol>
            </CardContent>
          </Card>
          
          <h3 className="text-lg font-semibold mb-3">Buffet Table Safety</h3>
          
          <p className="mb-4">
            Buffet tables can be a breeding ground for bacteria if not managed properly. Follow these tips for safe buffet service:
          </p>
          
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li><strong>Use Chafing Dishes and Ice Baths:</strong> Keep hot foods hot with chafing dishes, slow cookers, or warming trays. Keep cold foods cold by nesting dishes in bowls of ice or using small serving dishes and replacing them frequently.</li>
            <li><strong>Small Portions:</strong> Serve food in small portions and replenish frequently from properly stored backups to ensure freshness and maintain appropriate temperatures.</li>
            <li><strong>Time Limit:</strong> Don't leave perishable food at room temperature for more than 2 hours (1 hour if the temperature is above 90°F/32°C). Set a timer to track how long food has been sitting out.</li>
            <li><strong>Label Foods:</strong> Clearly label each dish with its name and ingredients to avoid confusion and prevent allergic reactions. Include serving instructions if special handling is required.</li>
            <li><strong>Separate Serving Utensils:</strong> Provide a separate serving utensil for each dish to prevent cross-contamination between foods.</li>
          </ul>
          
          <Separator className="my-8" />
          
          {/* Second ad placement with substantial publisher content */}
          <div className="my-6">
            <AdUnit 
              slotId="holiday-middle" 
              format="leaderboard" 
              mobileFormat="rectangle"
              contentBefore={
                <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>Holiday Food Safety Reminder</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Remember the 2-hour rule: perishable food should not sit at room temperature for more than 2 hours. After that time, bacteria can multiply rapidly.
                  </p>
                </div>
              }
              contentAfter={
                <div className="mt-3 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    The temperature danger zone for food is between 40°F and 140°F (4°C and 60°C). In this range, bacteria can double in number in as little as 20 minutes.
                  </p>
                </div>
              }
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Specific Holiday Food Safety Tips</h2>
          
          <h3 className="text-lg font-semibold mb-3">Thanksgiving</h3>
          
          <div className="bg-secondary/10 p-4 rounded-lg mb-6">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Thawing Turkey:</strong> Thaw turkey safely in the refrigerator (allow 24 hours for every 4-5 pounds), in cold water (changing every 30 minutes), or in the microwave. Never thaw at room temperature, which allows bacteria to multiply rapidly.</li>
              <li><strong>Stuffing:</strong> For optimal safety, cook stuffing separately. If you prefer to stuff your turkey, stuff it loosely just before cooking and ensure the stuffing reaches 165°F (74°C).</li>
              <li><strong>Turkey Cooking:</strong> Cook turkey to an internal temperature of 165°F (74°C) in the thickest part of the thigh and the innermost part of the wing and breast. Use a food thermometer to verify.</li>
              <li><strong>Resting Time:</strong> Let the turkey rest for 20 minutes before carving to allow juices to redistribute and make carving easier. This resting time is not a food safety concern if the turkey has reached 165°F (74°C).</li>
            </ul>
          </div>
          
          <h3 className="text-lg font-semibold mb-3">Christmas / Hanukkah</h3>
          
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li><strong>Ham and Roasts:</strong> Cook ham and roasts to safe internal temperatures (see temperature chart above). For ham that's labeled "fully cooked," heat to 140°F (60°C) for serving.</li>
            <li><strong>Potluck Dishes:</strong> Ensure potluck dishes are transported and held at safe temperatures. Hot dishes should arrive hot (above 140°F/60°C) and cold dishes cold (below 40°F/4°C).</li>
            <li><strong>Eggnog and Hollandaise:</strong> Use pasteurized eggs for homemade eggnog, hollandaise sauce, and other recipes calling for raw eggs to avoid Salmonella. Commercial eggnog is made with pasteurized eggs and is safe.</li>
            <li><strong>Cookie Dough:</strong> Avoid tasting raw cookie dough that contains eggs, as it may contain harmful bacteria. Consider using pasteurized egg products or egg substitutes for recipes where the dough might be tasted.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3">Summer BBQs</h3>
          
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li><strong>Marinating:</strong> Marinate foods in the refrigerator, not at room temperature. If you want to use marinade as a sauce, reserve a portion before adding raw meat or make a fresh batch.</li>
            <li><strong>Grilling:</strong> Use a food thermometer to ensure meats are cooked to safe internal temperatures. Clean the grill before and after use to prevent cross-contamination.</li>
            <li><strong>Picnic Safety:</strong> Keep cold foods cold in insulated coolers with ice packs. Keep the cooler in the shade and open it as little as possible. Consider using two coolers: one for drinks and another for perishable foods.</li>
            <li><strong>Outdoor Serving:</strong> Don't leave food out in the hot sun. Keep it in coolers or refrigerators until serving time, and then put it away promptly.</li>
          </ul>
          
          {/* Third ad placement with substantial publisher content */}
          <div className="my-6">
            <AdUnit 
              slotId="holiday-bottom" 
              format="leaderboard" 
              mobileFormat="rectangle" 
              lazyLoad={true}
              contentBefore={
                <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Refrigerator className="h-4 w-4 text-blue-500" />
                    <span>Leftover Food Storage Tips</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn how to safely store and reheat holiday leftovers to enjoy them safely in the days following your celebration.
                  </p>
                </div>
              }
              contentAfter={
                <div className="mt-3 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Use the FreshCheck food expiration calculator to determine how long your holiday leftovers will remain safe to eat when properly stored.
                  </p>
                </div>
              }
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8 flex items-center gap-2">
            <Refrigerator className="h-5 w-5 text-blue-500" />
            <span>Safely Handling Leftovers</span>
          </h2>
          
          <p className="mb-4">
            Leftovers can be a delicious reminder of a great meal, but they must be handled properly to prevent foodborne illness:
          </p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Leftover Safety Guidelines</CardTitle>
              <CardDescription>Follow these steps to ensure your holiday leftovers remain safe to eat</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cool Quickly:</strong> Divide large amounts of leftovers into shallow containers (2 inches deep or less) to cool more quickly. This prevents the food from staying in the temperature danger zone (40°F-140°F/4°C-60°C) for too long.</li>
                <li><strong>Refrigerate Promptly:</strong> Refrigerate or freeze leftovers within 2 hours of cooking. If the room temperature is above 90°F (32°C), refrigerate within 1 hour.</li>
                <li><strong>Use Within 3-4 Days:</strong> Use refrigerated leftovers within 3-4 days. After that, either freeze them or discard them. Frozen leftovers can be kept much longer but will decline in quality over time.</li>
                <li><strong>Reheat Thoroughly:</strong> Reheat leftovers to 165°F (74°C) before serving. Bring sauces, soups, and gravies to a rolling boil. If reheating in a microwave, stir, cover, and rotate for even heating.</li>
                <li><strong>When in Doubt, Throw it Out:</strong> If you're unsure about the safety of leftovers, it's better to discard them than risk foodborne illness. Food that has been left at room temperature for more than 2 hours or that looks or smells suspicious should be discarded.</li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="bg-primary/10 p-4 rounded-lg my-6 border border-primary/20">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Holiday Food Safety Takeaways</span>
            </h3>
            <p className="mb-4">
              By following these food safety guidelines, you can help ensure that your holidays and special events are remembered for the right reasons – good food and good company, not foodborne illness.
            </p>
            <p>
              Remember the core principles: clean hands and surfaces often, separate raw and cooked foods, cook to proper temperatures, and chill foods promptly. With proper planning and attention to food safety, you can enjoy stress-free holiday entertaining.
            </p>
          </div>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default HolidayEvents;
