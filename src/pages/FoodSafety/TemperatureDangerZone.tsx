import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Thermometer, FileCheck, XCircle } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdUnit from '@/components/AdUnit';

const TemperatureDangerZone = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Temperature Danger Zone"
        description="Understand the temperature danger zone and how to keep food safe from harmful bacteria."
        icon={<Thermometer className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="temperature danger zone, food safety, safe food temperatures, prevent food poisoning, food thermometer"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">What is the Temperature Danger Zone?</h2>
          
          <p>
            The Temperature Danger Zone is the temperature range between 40°F and 140°F (4°C and 60°C) 
            where bacteria multiply rapidly. Food should not be kept in this temperature range for more than 2 hours 
            (or 1 hour if the ambient temperature is above 90°F/32°C).
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="temp-zone-top" format="leaderboard" />
          </div>

          <Alert variant="destructive">
            <AlertTitle>Danger Zone Alert!</AlertTitle>
            <AlertDescription>
              Harmful bacteria multiply rapidly in the temperature danger zone. Always ensure food is cooked to a safe internal temperature.
            </AlertDescription>
          </Alert>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Using a Food Thermometer</h2>
          
          <p>
            A food thermometer is your best tool for ensuring food safety. Always use a calibrated thermometer 
            to check the internal temperature of cooked foods, especially meat, poultry, and seafood.
          </p>
          
          <div className="bg-muted/30 p-6 rounded-lg mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <img 
                  src="/lovable-uploads/09f94417-49e3-4967-8583-37449189999b.png" 
                  alt="Example of using a food thermometer to check meat temperature" 
                  className="rounded-md shadow-sm max-w-full h-auto"
                  width="400"
                  height="300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-3">How to Use a Food Thermometer</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Insert the thermometer into the thickest part of the food, away from bone, fat, or gristle.</li>
                  <li>Ensure the thermometer is clean and calibrated for accurate readings.</li>
                  <li>Wait for the temperature to stabilize before reading.</li>
                  <li>Refer to a safe cooking temperature chart for specific foods.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Safe Temperature Guidelines</h2>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left text-sm font-medium border border-border">Food Item</th>
                  <th className="p-3 text-left text-sm font-medium border border-border">Safe Internal Temperature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-sm border border-border font-medium">Poultry (Chicken, Turkey)</td>
                  <td className="p-3 text-sm border border-border">165°F (74°C)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm border border-border font-medium">Ground Meat (Beef, Pork)</td>
                  <td className="p-3 text-sm border border-border">160°F (71°C)</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm border border-border font-medium">Beef, Pork, Lamb (Steaks, Roasts)</td>
                  <td className="p-3 text-sm border border-border">145°F (63°C) (followed by a 3-minute rest time)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm border border-border font-medium">Fish & Seafood</td>
                  <td className="p-3 text-sm border border-border">145°F (63°C)</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm border border-border font-medium">Eggs</td>
                  <td className="p-3 text-sm border border-border">160°F (71°C) (cook until yolk and white are firm)</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm border border-border font-medium">Leftovers</td>
                  <td className="p-3 text-sm border border-border">165°F (74°C)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="temp-zone-middle" format="rectangle" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">The Science Behind the Danger Zone</h2>
          
          <p>
            Bacteria need warmth, moisture, and nutrients to thrive. The temperature danger zone provides 
            the ideal conditions for rapid bacterial growth. At these temperatures, bacteria can double in 
            number in as little as 20 minutes, increasing the risk of foodborne illness.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">Do's and Don'ts</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 border border-green-200 rounded-md bg-green-50">
              <h4 className="text-base font-medium mb-2 text-green-800">Do:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Keep cold foods cold (below 40°F/4°C).</li>
                <li>Keep hot foods hot (above 140°F/60°C).</li>
                <li>Use a food thermometer to verify internal temperatures.</li>
                <li>Refrigerate or freeze leftovers promptly.</li>
              </ul>
            </div>
            <div className="p-4 border border-red-200 rounded-md bg-red-50">
              <h4 className="text-base font-medium mb-2 text-red-800">Don't:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Leave food at room temperature for more than 2 hours.</li>
                <li>Partially cook food and then let it sit.</li>
                <li>Rely on visual cues to determine if food is safe.</li>
                <li>Thaw food at room temperature.</li>
              </ul>
            </div>
          </div>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="temp-zone-bottom" format="leaderboard" lazyLoad={true} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Special Considerations</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">High-Risk Foods</h3>
            <p>
              Certain foods are more prone to bacterial growth and require extra caution:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Raw or undercooked meat, poultry, and seafood</li>
              <li>Dairy products</li>
              <li>Cooked rice</li>
              <li>Cut fruits and vegetables</li>
            </ul>
          </div>
          
          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-3">Important Note on Food Safety</h3>
            <p className="text-sm">
              While following safe temperature guidelines is crucial, proper food handling practices are also essential. 
              Always wash your hands, use clean utensils, and prevent cross-contamination to minimize the risk of foodborne illness.
            </p>
          </div>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default TemperatureDangerZone;
