import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, Zap, CloudRain, Thermometer } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdUnit from '@/components/AdUnit';

const EmergencyFoodSafety = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Emergency Food Safety"
        description="Learn how to safely handle and store food during natural disasters, power outages, and other emergencies to prevent foodborne illness."
        icon={<AlertTriangle className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="food safety, emergency preparedness, power outage, natural disaster, food storage, safe handling"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">Preparing for Food Emergencies</h2>
          
          <p>
            During natural disasters, power outages, and other emergencies, knowing how to safely 
            handle and store food becomes even more critical. Proper preparation before an emergency 
            and knowing what to do during and after can help prevent foodborne illness.
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="emergency-top" format="leaderboard" />
          </div>
          
          <Alert className="mb-6">
            <AlertTitle>Be Prepared</AlertTitle>
            <AlertDescription>
              Create an emergency food and water supply kit before disaster strikes.
            </AlertDescription>
          </Alert>
          
          <h3 className="text-lg font-semibold mb-3">Emergency Food and Water Supply Kit</h3>
          <p>
            A well-stocked emergency kit should include:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Non-perishable food items (canned goods, dried fruits, nuts, etc.)</li>
            <li>Bottled water (at least 1 gallon per person per day)</li>
            <li>Manual can opener</li>
            <li>Utensils and disposable plates/cups</li>
          </ul>
          <p>
            Store your kit in a cool, dry place and check expiration dates regularly. Replace items as needed.
          </p>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">During an Emergency</h2>
          
          <p>
            During an emergency, it's crucial to prioritize food safety to prevent illness.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">Power Outages</h3>
          <p>
            Power outages can compromise the safety of refrigerated and frozen foods. Here's what to do:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Keep refrigerator and freezer doors closed as much as possible. A full freezer can keep food safe for up to 48 hours (24 hours if half full).</li>
            <li>Use a food thermometer to check the temperature of food. Discard any perishable food that has been above 40°F (4°C) for more than 2 hours.</li>
            <li>Never taste food to determine its safety. When in doubt, throw it out.</li>
          </ul>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="emergency-middle" format="rectangle" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">After an Emergency</h2>
          
          <p>
            After an emergency, assess the safety of your food supply carefully.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">Assessing Food Safety</h3>
          <p>
            Follow these guidelines to determine if food is safe to consume:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Discard any food that may have come into contact with floodwater or rainwater.</li>
            <li>Check canned goods for damage (dents, swelling, rust). Discard any damaged cans.</li>
            <li>Boil water for at least 1 minute before drinking, cooking, or cleaning.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3 mt-6">Flooded Areas</h3>
          <Alert className="mb-6">
            <AlertTitle>Caution: Flood Safety</AlertTitle>
            <AlertDescription>
              Food and water in flooded areas are likely contaminated. Exercise extreme caution.
            </AlertDescription>
          </Alert>
          <p>
            If your home has been flooded:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Do not use food or water that has been exposed to floodwater.</li>
            <li>Clean and sanitize all surfaces that may have come into contact with floodwater.</li>
            <li>Wash your hands thoroughly with soap and water after contact with floodwater.</li>
          </ul>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="emergency-bottom" format="leaderboard" lazyLoad={true} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Special Considerations for Common Emergencies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 border border-border rounded-md">
              <div className="flex items-center mb-2">
                <Zap className="text-yellow-500 mr-2 h-5 w-5" />
                <h3 className="text-base font-medium">Power Outages</h3>
              </div>
              <p className="text-sm">Keep fridge/freezer doors closed. Use a thermometer to check food temps. Discard if above 40°F for over 2 hours.</p>
            </div>
            
            <div className="p-4 border border-border rounded-md">
              <div className="flex items-center mb-2">
                <CloudRain className="text-blue-500 mr-2 h-5 w-5" />
                <h3 className="text-base font-medium">Floods</h3>
              </div>
              <p className="text-sm">Do not use food or water exposed to floodwater. Sanitize surfaces. Boil water for drinking/cooking.</p>
            </div>
            
            <div className="p-4 border border-border rounded-md">
              <div className="flex items-center mb-2">
                <Thermometer className="text-red-500 mr-2 h-5 w-5" />
                <h3 className="text-base font-medium">Heat Waves</h3>
              </div>
              <p className="text-sm">Limit oven use to avoid overheating your home. Store food properly to prevent spoilage.</p>
            </div>
            
            <div className="p-4 border border-border rounded-md">
              <div className="flex items-center mb-2">
                <AlertTriangle className="text-orange-500 mr-2 h-5 w-5" />
                <h3 className="text-base font-medium">General Emergencies</h3>
              </div>
              <p className="text-sm">Have a well-stocked emergency kit. Know how to safely store and handle food and water.</p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Resources</h2>
          <ul className="list-disc pl-5">
            <li><a href="https://www.ready.gov/food" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ready.gov - Food and Water Safety During Power Outages and Disasters</a></li>
            <li><a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-safety-during-power" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">USDA - Food Safety During Power Outages</a></li>
          </ul>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default EmergencyFoodSafety;
